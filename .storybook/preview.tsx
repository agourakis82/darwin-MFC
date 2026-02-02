'use client';

import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@/app/components/Layout/ThemeProvider';
import '../app/globals.css';

// Global decorators for theme and internationalization
export const decorators = [
  (Story) => (
    <ThemeProvider>
      <div className="dark bg-neutral-950 text-neutral-50 p-8">
        <Story />
      </div>
    </ThemeProvider>
  ),
];

const preview: Preview = {
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for all stories',
      defaultValue: 'dark',
      toolbar: {
        icon: 'sun',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
