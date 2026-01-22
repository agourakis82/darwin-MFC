/**
 * PUBMED FETCHER
 * ==============
 * 
 * Fetches articles from PubMed using E-utilities API.
 * API Documentation: https://www.ncbi.nlm.nih.gov/books/NBK25501/
 * 
 * FREE - No API key required for <3 requests/second
 */

import type {
  Fetcher,
  FetchQuery,
  FetchResult,
  LiteratureData,
  Article,
  Author,
  StudyType,
} from '../types';

const PUBMED_BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const RATE_LIMIT_MS = 350; // ~3 requests/second (safe limit)

export class PubMedFetcher implements Fetcher {
  name = 'PubMed';
  source = 'literature' as const;
  priority = 9; // High priority for SOTA literature

  /**
   * Check if PubMed API is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${PUBMED_BASE_URL}/esearch.fcgi?db=pubmed&term=test&retmode=json`);
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Fetch articles from PubMed
   */
  async fetch(query: FetchQuery): Promise<FetchResult> {
    const startTime = Date.now();
    
    // Step 1: Search for article IDs
    const pmids = await this.searchArticles(query);
    
    if (pmids.length === 0) {
      return {
        source: this.name,
        sourceType: this.source,
        data: { articles: [] },
        metadata: {
          fetchedAt: new Date(),
          resultCount: 0,
        },
      };
    }

    // Step 2: Fetch article details
    await this.rateLimitDelay();
    const articles = await this.fetchArticleDetails(pmids);

    console.log(`✅ PubMed: Fetched ${articles.length} articles in ${Date.now() - startTime}ms`);

    return {
      source: this.name,
      sourceType: this.source,
      data: { articles },
      metadata: {
        fetchedAt: new Date(),
        url: `${PUBMED_BASE_URL}/esearch.fcgi`,
        apiVersion: 'E-utilities',
        resultCount: articles.length,
      },
    };
  }

  /**
   * Search for article IDs using esearch
   */
  private async searchArticles(query: FetchQuery): Promise<string[]> {
    const searchTerm = this.buildSearchTerm(query);
    const maxResults = query.filters?.maxResults || 20;
    
    const url = new URL(`${PUBMED_BASE_URL}/esearch.fcgi`);
    url.searchParams.set('db', 'pubmed');
    url.searchParams.set('term', searchTerm);
    url.searchParams.set('retmode', 'json');
    url.searchParams.set('retmax', maxResults.toString());
    url.searchParams.set('sort', 'relevance');

    console.log(`🔍 PubMed search: ${searchTerm}`);

    const response = await fetch(url.toString());
    const data = await response.json();

    const pmids = data.esearchresult?.idlist || [];
    console.log(`📊 Found ${pmids.length} articles`);

    return pmids;
  }

  /**
   * Fetch article details using efetch
   */
  private async fetchArticleDetails(pmids: string[]): Promise<Article[]> {
    const url = new URL(`${PUBMED_BASE_URL}/efetch.fcgi`);
    url.searchParams.set('db', 'pubmed');
    url.searchParams.set('id', pmids.join(','));
    url.searchParams.set('retmode', 'xml');

    const response = await fetch(url.toString());
    const xmlText = await response.text();

    return this.parseXML(xmlText);
  }

  /**
   * Build search term with filters
   */
  private buildSearchTerm(query: FetchQuery): string {
    let term = query.topic;

    // Add study type filters
    if (query.filters?.studyTypes && query.filters.studyTypes.length > 0) {
      const studyTypeTerms = query.filters.studyTypes.map(type => {
        switch (type) {
          case 'meta_analysis': return 'meta-analysis[pt]';
          case 'systematic_review': return 'systematic review[pt]';
          case 'rct': return 'randomized controlled trial[pt]';
          case 'cohort': return 'cohort study[pt]';
          case 'case_control': return 'case-control study[pt]';
          default: return '';
        }
      }).filter(Boolean);

      if (studyTypeTerms.length > 0) {
        term += ` AND (${studyTypeTerms.join(' OR ')})`;
      }
    }

    // Add date filter
    if (query.filters?.publicationDateFrom) {
      const year = query.filters.publicationDateFrom.getFullYear();
      term += ` AND ${year}:3000[dp]`; // dp = date of publication
    }

    // Add guideline filter for high-quality sources
    term += ' AND (guideline[pt] OR practice guideline[pt] OR consensus development conference[pt])';

    return term;
  }

  /**
   * Parse XML response to Article objects
   * Simplified parser - extracts key fields
   */
  private parseXML(xmlText: string): Article[] {
    // Note: In production, use a proper XML parser like 'fast-xml-parser'
    // For prototype, we'll use regex (not recommended for production!)

    const articles: Article[] = [];
    const articleMatches = xmlText.matchAll(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g);

    for (const match of articleMatches) {
      const articleXml = match[1];

      try {
        const article = this.parseArticleXML(articleXml);
        articles.push(article);
      } catch (error) {
        console.warn('Failed to parse article:', error);
      }
    }

    return articles;
  }

  /**
   * Parse individual article XML
   */
  private parseArticleXML(xml: string): Article {
    // Extract PMID
    const pmidMatch = xml.match(/<PMID[^>]*>(\d+)<\/PMID>/);
    const pmid = pmidMatch ? pmidMatch[1] : undefined;

    // Extract DOI
    const doiMatch = xml.match(/<ArticleId IdType="doi">([^<]+)<\/ArticleId>/);
    const doi = doiMatch ? doiMatch[1] : undefined;

    // Extract title
    const titleMatch = xml.match(/<ArticleTitle>([^<]+)<\/ArticleTitle>/);
    const title = titleMatch ? this.decodeHTML(titleMatch[1]) : 'No title';

    // Extract abstract
    const abstractMatch = xml.match(/<AbstractText[^>]*>([^<]+)<\/AbstractText>/);
    const abstract = abstractMatch ? this.decodeHTML(abstractMatch[1]) : '';

    // Extract authors
    const authors = this.parseAuthors(xml);

    // Extract journal
    const journalMatch = xml.match(/<Title>([^<]+)<\/Title>/);
    const journal = journalMatch ? this.decodeHTML(journalMatch[1]) : 'Unknown Journal';

    // Extract publication date
    const yearMatch = xml.match(/<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>/);
    const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();
    const publicationDate = new Date(year, 0, 1);

    // Extract MeSH terms
    const meshTerms = this.parseMeSHTerms(xml);

    // Determine study type from publication types
    const studyType = this.determineStudyType(xml);

    return {
      pmid,
      doi,
      title,
      abstract,
      authors,
      journal,
      publicationDate,
      studyType,
      meshTerms,
      url: pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : undefined,
    };
  }

  /**
   * Parse authors from XML
   */
  private parseAuthors(xml: string): Author[] {
    const authors: Author[] = [];
    const authorMatches = xml.matchAll(/<Author[^>]*>([\s\S]*?)<\/Author>/g);

    for (const match of authorMatches) {
      const authorXml = match[1];

      const lastNameMatch = authorXml.match(/<LastName>([^<]+)<\/LastName>/);
      const firstNameMatch = authorXml.match(/<ForeName>([^<]+)<\/ForeName>/);
      const initialsMatch = authorXml.match(/<Initials>([^<]+)<\/Initials>/);

      if (lastNameMatch) {
        authors.push({
          lastName: this.decodeHTML(lastNameMatch[1]),
          firstName: firstNameMatch ? this.decodeHTML(firstNameMatch[1]) : '',
          initials: initialsMatch ? initialsMatch[1] : undefined,
        });
      }
    }

    return authors;
  }

  /**
   * Parse MeSH terms from XML
   */
  private parseMeSHTerms(xml: string): string[] {
    const meshTerms: string[] = [];
    const meshMatches = xml.matchAll(/<DescriptorName[^>]*>([^<]+)<\/DescriptorName>/g);

    for (const match of meshMatches) {
      meshTerms.push(this.decodeHTML(match[1]));
    }

    return meshTerms;
  }

  /**
   * Determine study type from publication types
   */
  private determineStudyType(xml: string): StudyType | undefined {
    const pubTypeMatches = xml.matchAll(/<PublicationType[^>]*>([^<]+)<\/PublicationType>/g);

    for (const match of pubTypeMatches) {
      const pubType = match[1].toLowerCase();

      if (pubType.includes('meta-analysis')) return 'meta_analysis';
      if (pubType.includes('systematic review')) return 'systematic_review';
      if (pubType.includes('randomized controlled trial')) return 'rct';
      if (pubType.includes('cohort')) return 'cohort';
      if (pubType.includes('case-control')) return 'case_control';
    }

    return undefined;
  }

  /**
   * Decode HTML entities
   */
  private decodeHTML(text: string): string {
    return text
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  /**
   * Rate limiting delay
   */
  private async rateLimitDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, RATE_LIMIT_MS));
  }
}

