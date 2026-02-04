'use client';

import { useTranslations } from 'next-intl';
import { User, Github, Linkedin, ExternalLink } from 'lucide-react';

interface AuthorProfile {
  id: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  orcidUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  zenodoUrl?: string;
}

const AUTHORS: AuthorProfile[] = [
  {
    id: 'demetrios',
    initials: 'DA',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-purple-600',
    borderColor: 'border-blue-600 dark:border-blue-500',
    orcidUrl: 'https://orcid.org/0009-0001-8671-8878',
    githubUrl: 'https://github.com/agourakis82',
    linkedinUrl: 'https://www.linkedin.com/in/demetrios-agourakis',
    zenodoUrl: 'https://zenodo.org',
  },
  {
    id: 'isadora',
    initials: 'ICA',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-teal-600',
    borderColor: 'border-emerald-600 dark:border-emerald-500',
    orcidUrl: 'https://orcid.org/0009-0005-6883-1809',
  },
];

export default function AboutAuthor() {
  const t = useTranslations();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {t('about.title')}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Authors Grid */}
      <div className="space-y-16">
        {AUTHORS.map((author) => (
          <div key={author.id} className="border-b border-neutral-200 dark:border-neutral-800 last:border-b-0 pb-16 last:pb-0">
            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Photo Placeholder / Initials Circle */}
              <div className="flex justify-center md:justify-start">
                <div className={`w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br ${author.gradientFrom} ${author.gradientTo} flex items-center justify-center border-4 ${author.borderColor}`}>
                  <span className="text-6xl md:text-7xl font-bold text-white">
                    {author.initials}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {t(`about.authors.${author.id}.name`)}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {t(`about.authors.${author.id}.credentials`)}
                  </p>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {t(`about.authors.${author.id}.bio`)}
                </p>
                {t.has(`about.authors.${author.id}.motivation`) && (
                  <p className="text-neutral-600 dark:text-neutral-400 italic">
                    {t(`about.authors.${author.id}.motivation`)}
                  </p>
                )}
              </div>
            </div>

            {/* Cards Grid - Only for authors with these sections */}
            {(t.has(`about.authors.${author.id}.credentialsList.title`) ||
              t.has(`about.authors.${author.id}.expertise.title`)) && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Credentials Card */}
                {t.has(`about.authors.${author.id}.credentialsList.title`) && (
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-900">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      {t(`about.authors.${author.id}.credentialsList.title`)}
                    </h3>
                    <ul className="space-y-2">
                      {(['0', '1', '2', '3'] as const).map((index) => {
                        const key = `about.authors.${author.id}.credentialsList.items.${index}`;
                        if (!t.has(key)) return null;
                        return (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                          >
                            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                            <span>{t(key)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Expertise Card */}
                {t.has(`about.authors.${author.id}.expertise.title`) && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-900">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                      {t(`about.authors.${author.id}.expertise.title`)}
                    </h3>
                    <ul className="space-y-2">
                      {(['0', '1', '2', '3', '4'] as const).map((index) => {
                        const key = `about.authors.${author.id}.expertise.items.${index}`;
                        if (!t.has(key)) return null;
                        return (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                          >
                            <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                            <span>{t(key)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Links Card */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                {t('about.links.orcid')} & Links
              </h3>
              <div className="flex flex-wrap gap-4">
                {author.orcidUrl && (
                  <a
                    href={author.orcidUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{t('about.links.orcid')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {author.githubUrl && (
                  <a
                    href={author.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-800 dark:bg-neutral-700 text-white rounded-lg hover:bg-neutral-900 dark:hover:bg-neutral-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t('about.links.github')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {author.linkedinUrl && (
                  <a
                    href={author.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>{t('about.links.linkedin')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {author.zenodoUrl && (
                  <a
                    href={author.zenodoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t('about.links.zenodo')}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Note */}
      <div className="mt-8 text-center text-neutral-600 dark:text-neutral-400">
        <p>{t('about.projectNote')}</p>
      </div>
    </div>
  );
}

