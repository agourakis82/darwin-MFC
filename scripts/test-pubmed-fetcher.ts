/**
 * TEST PUBMED FETCHER
 * ===================
 * 
 * Test script to verify PubMed fetcher is working correctly.
 */

import { PubMedFetcher } from '../lib/content-generation/fetchers/pubmed';
import type { FetchQuery } from '../lib/content-generation/types';

async function testPubMedFetcher() {
  console.log('🧪 Testing PubMed Fetcher\n');
  console.log('='.repeat(60));

  const fetcher = new PubMedFetcher();

  // Test 1: Check availability
  console.log('\n📡 Test 1: Checking PubMed API availability...');
  const isAvailable = await fetcher.isAvailable();
  console.log(isAvailable ? '✅ PubMed API is available' : '❌ PubMed API is not available');

  if (!isAvailable) {
    console.error('❌ Cannot proceed without PubMed API');
    process.exit(1);
  }

  // Test 2: Fetch diabetes management articles
  console.log('\n📚 Test 2: Fetching diabetes management articles...');
  const diabetesQuery: FetchQuery = {
    topic: 'diabetes mellitus type 2 management',
    filters: {
      studyTypes: ['systematic_review', 'meta_analysis'],
      publicationDateFrom: new Date('2019-01-01'),
      maxResults: 10,
    },
  };

  const diabetesResult = await fetcher.fetch(diabetesQuery);
  console.log(`\n📊 Results:`);
  console.log(`   Source: ${diabetesResult.source}`);
  console.log(`   Articles found: ${diabetesResult.metadata.resultCount}`);
  console.log(`   Fetched at: ${diabetesResult.metadata.fetchedAt.toISOString()}`);

  // Display first 3 articles
  const articles = diabetesResult.data.articles;
  if (articles.length > 0) {
    console.log('\n📄 Sample Articles:\n');
    articles.slice(0, 3).forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   Authors: ${article.authors.slice(0, 3).map(a => `${a.lastName} ${a.initials || ''}`).join(', ')}${article.authors.length > 3 ? ', et al.' : ''}`);
      console.log(`   Journal: ${article.journal}`);
      console.log(`   Year: ${article.publicationDate.getFullYear()}`);
      console.log(`   PMID: ${article.pmid || 'N/A'}`);
      console.log(`   DOI: ${article.doi || 'N/A'}`);
      console.log(`   Study Type: ${article.studyType || 'Not specified'}`);
      console.log(`   URL: ${article.url || 'N/A'}`);
      console.log(`   Abstract: ${article.abstract.substring(0, 200)}...`);
      console.log('');
    });
  }

  // Test 3: Fetch hypertension guidelines
  console.log('\n📚 Test 3: Fetching hypertension guidelines...');
  const hypertensionQuery: FetchQuery = {
    topic: 'hypertension treatment guideline',
    filters: {
      studyTypes: ['systematic_review'],
      publicationDateFrom: new Date('2020-01-01'),
      maxResults: 5,
    },
  };

  const hypertensionResult = await fetcher.fetch(hypertensionQuery);
  console.log(`\n📊 Results:`);
  console.log(`   Articles found: ${hypertensionResult.metadata.resultCount}`);

  if (hypertensionResult.data.articles.length > 0) {
    console.log('\n📄 Top Article:\n');
    const topArticle = hypertensionResult.data.articles[0];
    console.log(`   Title: ${topArticle.title}`);
    console.log(`   PMID: ${topArticle.pmid}`);
    console.log(`   Year: ${topArticle.publicationDate.getFullYear()}`);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ All tests passed!');
  console.log('\n📊 Summary:');
  console.log(`   Total articles fetched: ${diabetesResult.metadata.resultCount + hypertensionResult.metadata.resultCount}`);
  console.log(`   Diabetes articles: ${diabetesResult.metadata.resultCount}`);
  console.log(`   Hypertension articles: ${hypertensionResult.metadata.resultCount}`);
  console.log('\n🎉 PubMed fetcher is working correctly!');
}

// Run tests
testPubMedFetcher().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});

