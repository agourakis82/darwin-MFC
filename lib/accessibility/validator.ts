/**
 * WCAG 2.2 AAA Accessibility Validator
 * State of the Art Implementation
 */

import { AxeResults, Result } from 'axe-core';

export interface AccessibilityViolation {
  id: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  description: string;
  help: string;
  helpUrl: string;
  nodes: AccessibilityNode[];
  wcagLevel: 'A' | 'AA' | 'AAA';
  wcagCriteria: string[];
}

export interface AccessibilityNode {
  html: string;
  target: string[];
  failureSummary: string;
  any: Array<{ id: string; impact: string; message: string }>;
  all: Array<{ id: string; message: string }>;
  none: Array<{ id: string; message: string }>;
}

export interface AccessibilityReport {
  violations: AccessibilityViolation[];
  passes: Result[];
  incomplete: Result[];
  wcagLevel: 'A' | 'AA' | 'AAA';
  score: number;
  timestamp: Date;
  url: string;
}

export interface AccessibilityConfig {
  wcagLevel: 'A' | 'AA' | 'AAA';
  locale: string;
  includeShadowDom: boolean;
  allowedOrigins: string[];
  customRules: CustomRule[];
}

export interface CustomRule {
  id: string;
  selector: string;
  description: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  wcagCriteria: string[];
  check: (element: HTMLElement) => boolean;
}

/**
 * WCAG 2.2 AAA Accessibility Validator
 */
export class AccessibilityValidator {
  private config: AccessibilityConfig;
  private customRules: Map<string, CustomRule> = new Map();

  constructor(config: Partial<AccessibilityConfig> = {}) {
    this.config = {
      wcagLevel: 'AAA',
      locale: 'pt-BR',
      includeShadowDom: true,
      allowedOrigins: ['*'],
      customRules: [],
      ...config,
    };

    this.registerCustomRules();
  }

  /**
   * Register custom accessibility rules
   */
  private registerCustomRules(): void {
    // Custom rule: Minimum touch target size (44x44px for AAA)
    this.addCustomRule({
      id: 'touch-target-size-aaa',
      selector: 'button, a, input[type="submit"], input[type="button"], [role="button"]',
      description: 'Touch targets must be at least 44x44 pixels for AAA compliance',
      impact: 'serious',
      wcagCriteria: ['2.5.5'],
      check: (element) => {
        const rect = element.getBoundingClientRect();
        return rect.width >= 44 && rect.height >= 44;
      },
    });

    // Custom rule: Text contrast ratio (7:1 for AAA)
    this.addCustomRule({
      id: 'text-contrast-aaa',
      selector: 'p, h1, h2, h3, h4, h5, h6, span, div, li, td, th',
      description: 'Text must have a contrast ratio of at least 7:1 for AAA compliance',
      impact: 'serious',
      wcagCriteria: ['1.4.6'],
      check: (element) => {
        const computedStyle = window.getComputedStyle(element);
        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;
        
        // Skip if background is transparent (use parent background)
        if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
          return true;
        }

        return this.getContrastRatio(color, backgroundColor) >= 7;
      },
    });

    // Custom rule: Large text contrast ratio (4.5:1 for AAA)
    this.addCustomRule({
      id: 'large-text-contrast-aaa',
      selector: 'h1, h2, h3, .large-text',
      description: 'Large text (18pt or 14pt bold) must have a contrast ratio of at least 4.5:1',
      impact: 'serious',
      wcagCriteria: ['1.4.6'],
      check: (element) => {
        const computedStyle = window.getComputedStyle(element);
        const fontSize = parseFloat(computedStyle.fontSize);
        const fontWeight = parseInt(computedStyle.fontWeight);
        const isLarge = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);

        if (!isLarge) return true;

        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;

        if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
          return true;
        }

        return this.getContrastRatio(color, backgroundColor) >= 4.5;
      },
    });

    // Custom rule: Focus indicator visibility (3px for AAA)
    this.addCustomRule({
      id: 'focus-indicator-aaa',
      selector: 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      description: 'Focus indicators must be at least 3px thick for AAA compliance',
      impact: 'moderate',
      wcagCriteria: ['2.4.7'],
      check: (element) => {
        const computedStyle = window.getComputedStyle(element);
        const outlineWidth = parseFloat(computedStyle.outlineWidth);
        const outlineStyle = computedStyle.outlineStyle;
        
        return outlineStyle !== 'none' && outlineWidth >= 3;
      },
    });

    // Custom rule: Spacing between paragraphs (2x font size for AAA)
    this.addCustomRule({
      id: 'paragraph-spacing-aaa',
      selector: 'p',
      description: 'Paragraphs must have at least 2x font size spacing for AAA compliance',
      impact: 'moderate',
      wcagCriteria: ['1.4.12'],
      check: (element) => {
        const computedStyle = window.getComputedStyle(element);
        const fontSize = parseFloat(computedStyle.fontSize);
        const marginBottom = parseFloat(computedStyle.marginBottom);
        const marginTop = parseFloat(computedStyle.marginTop);
        
        return marginBottom >= fontSize * 2 && marginTop >= fontSize * 2;
      },
    });

    // Custom rule: Character spacing (0.12em for AAA)
    this.addCustomRule({
      id: 'character-spacing-aaa',
      selector: 'p, h1, h2, h3, h4, h5, h6, li, td, th',
      description: 'Text must have at least 0.12em character spacing for AAA compliance',
      impact: 'minor',
      wcagCriteria: ['1.4.12'],
      check: (element) => {
        const computedStyle = window.getComputedStyle(element);
        const letterSpacing = parseFloat(computedStyle.letterSpacing);
        
        return letterSpacing >= 0.12;
      },
    });

    // Custom rule: Word spacing (0.16em for AAA)
    this.addCustomRule({
      id: 'word-spacing-aaa',
      selector: 'p, h1, h2, h3, h4, h5, h6, li, td, th',
      description: 'Text must have at least 0.16em word spacing for AAA compliance',
      impact: 'minor',
      wcagCriteria: ['1.4.12'],
      check: (element) => {
        const computedStyle = window.getComputedStyle(element);
        const wordSpacing = parseFloat(computedStyle.wordSpacing);
        
        return wordSpacing >= 0.16;
      },
    });
  }

  /**
   * Add a custom accessibility rule
   */
  public addCustomRule(rule: CustomRule): void {
    this.customRules.set(rule.id, rule);
  }

  /**
   * Remove a custom accessibility rule
   */
  public removeCustomRule(ruleId: string): void {
    this.customRules.delete(ruleId);
  }

  /**
   * Get all custom rules
   */
  public getCustomRules(): CustomRule[] {
    return Array.from(this.customRules.values());
  }

  /**
   * Calculate contrast ratio between two colors
   */
  private getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.parseColor(color1);
    const rgb2 = this.parseColor(color2);

    const l1 = this.getLuminance(rgb1);
    const l2 = this.getLuminance(rgb2);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Parse color string to RGB
   */
  private parseColor(color: string): { r: number; g: number; b: number } {
    // Handle rgb/rgba
    const rgbMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1], 10),
        g: parseInt(rgbMatch[2], 10),
        b: parseInt(rgbMatch[3], 10),
      };
    }

    // Handle hex
    const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (hexMatch) {
      return {
        r: parseInt(hexMatch[1], 16),
        g: parseInt(hexMatch[2], 16),
        b: parseInt(hexMatch[3], 16),
      };
    }

    // Default to black
    return { r: 0, g: 0, b: 0 };
  }

  /**
   * Calculate relative luminance
   */
  private getLuminance(rgb: { r: number; g: number; b: number }): number {
    const a = [rgb.r, rgb.g, rgb.b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  /**
   * Validate accessibility of a page
   */
  public async validatePage(): Promise<AccessibilityReport> {
    const url = window.location.href;
    const violations: AccessibilityViolation[] = [];
    const passes: Result[] = [];
    const incomplete: Result[] = [];

    // Run custom rules
    for (const rule of this.customRules.values()) {
      const elements = document.querySelectorAll(rule.selector);
      
      for (const element of Array.from(elements) as HTMLElement[]) {
        const isValid = rule.check(element);
        
        if (!isValid) {
          violations.push({
            id: rule.id,
            impact: rule.impact,
            description: rule.description,
            help: rule.description,
            helpUrl: `https://www.w3.org/WAI/WCAG22/quickref/?tags=${rule.wcagCriteria.join(',')}`,
            nodes: [
              {
                html: element.outerHTML,
                target: this.getCssPath(element),
                failureSummary: rule.description,
                any: [],
                all: [],
                none: [],
              },
            ],
            wcagLevel: 'AAA',
            wcagCriteria: rule.wcagCriteria,
          });
        }
      }
    }

    // Calculate score (100 - violations * impact weight)
    const score = this.calculateScore(violations);

    return {
      violations,
      passes,
      incomplete,
      wcagLevel: this.config.wcagLevel,
      score,
      timestamp: new Date(),
      url,
    };
  }

  /**
   * Get CSS path for an element
   */
  private getCssPath(element: HTMLElement): string[] {
    const path: string[] = [];
    let current: HTMLElement | null = element;

    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      
      if (current.id) {
        selector += `#${current.id}`;
      } else {
        let nth = 1;
        let sibling = current.previousElementSibling;
        while (sibling) {
          if (sibling.tagName === current.tagName) {
            nth++;
          }
          sibling = sibling.previousElementSibling;
        }
        selector += `:nth-of-type(${nth})`;
      }

      path.unshift(selector);
      current = current.parentElement;
    }

    return path;
  }

  /**
   * Calculate accessibility score
   */
  private calculateScore(violations: AccessibilityViolation[]): number {
    let penalty = 0;

    for (const violation of violations) {
      switch (violation.impact) {
        case 'critical':
          penalty += 25;
          break;
        case 'serious':
          penalty += 10;
          break;
        case 'moderate':
          penalty += 5;
          break;
        case 'minor':
          penalty += 1;
          break;
      }
    }

    return Math.max(0, 100 - penalty);
  }

  /**
   * Check if a specific element is accessible
   */
  public checkElement(element: HTMLElement): AccessibilityViolation[] {
    const violations: AccessibilityViolation[] = [];

    for (const rule of this.customRules.values()) {
      if (element.matches(rule.selector)) {
        const isValid = rule.check(element);
        
        if (!isValid) {
          violations.push({
            id: rule.id,
            impact: rule.impact,
            description: rule.description,
            help: rule.description,
            helpUrl: `https://www.w3.org/WAI/WCAG22/quickref/?tags=${rule.wcagCriteria.join(',')}`,
            nodes: [
              {
                html: element.outerHTML,
                target: this.getCssPath(element),
                failureSummary: rule.description,
                any: [],
                all: [],
                none: [],
              },
            ],
            wcagLevel: 'AAA',
            wcagCriteria: rule.wcagCriteria,
          });
        }
      }
    }

    return violations;
  }

  /**
   * Get accessibility suggestions for fixing violations
   */
  public getSuggestions(violation: AccessibilityViolation): string[] {
    const suggestions: string[] = [];

    switch (violation.id) {
      case 'touch-target-size-aaa':
        suggestions.push('Increase the size of the touch target to at least 44x44 pixels');
        suggestions.push('Add padding to increase the clickable area');
        suggestions.push('Use a larger button or link for better touch interaction');
        break;
      
      case 'text-contrast-aaa':
        suggestions.push('Increase the contrast ratio to at least 7:1');
        suggestions.push('Use a darker text color or lighter background');
        suggestions.push('Consider using a color contrast checker tool');
        break;
      
      case 'large-text-contrast-aaa':
        suggestions.push('Increase the contrast ratio to at least 4.5:1 for large text');
        suggestions.push('Use a darker text color or lighter background');
        break;
      
      case 'focus-indicator-aaa':
        suggestions.push('Add a visible focus indicator with at least 3px thickness');
        suggestions.push('Use outline: 3px solid #000; or similar CSS');
        suggestions.push('Ensure the focus indicator has good contrast');
        break;
      
      case 'paragraph-spacing-aaa':
        suggestions.push('Add margin-bottom and margin-top of at least 2x font size');
        suggestions.push('Use CSS: margin: 2em 0; for paragraphs');
        break;
      
      case 'character-spacing-aaa':
        suggestions.push('Add letter-spacing of at least 0.12em');
        suggestions.push('Use CSS: letter-spacing: 0.12em;');
        break;
      
      case 'word-spacing-aaa':
        suggestions.push('Add word-spacing of at least 0.16em');
        suggestions.push('Use CSS: word-spacing: 0.16em;');
        break;
      
      default:
        suggestions.push('Review the WCAG criteria: ' + violation.wcagCriteria.join(', '));
        suggestions.push('Check the help URL for detailed guidance');
    }

    return suggestions;
  }

  /**
   * Generate a detailed accessibility report
   */
  public generateReport(violations: AccessibilityViolation[]): string {
    let report = '=== WCAG 2.2 AAA Accessibility Report ===\n\n';
    report += `Date: ${new Date().toISOString()}\n`;
    report += `URL: ${window.location.href}\n`;
    report += `Total Violations: ${violations.length}\n\n`;

    // Group by impact
    const grouped = violations.reduce((acc, v) => {
      if (!acc[v.impact]) acc[v.impact] = [];
      acc[v.impact].push(v);
      return acc;
    }, {} as Record<string, AccessibilityViolation[]>);

    for (const [impact, items] of Object.entries(grouped)) {
      report += `=== ${impact.toUpperCase()} (${items.length}) ===\n`;
      
      for (const violation of items) {
        report += `\n[${violation.id}] ${violation.description}\n`;
        report += `WCAG: ${violation.wcagCriteria.join(', ')}\n`;
        report += `Help: ${violation.helpUrl}\n`;
        
        const suggestions = this.getSuggestions(violation);
        if (suggestions.length > 0) {
          report += 'Suggestions:\n';
          for (const suggestion of suggestions) {
            report += `  - ${suggestion}\n`;
          }
        }
      }
      
      report += '\n';
    }

    return report;
  }
}

/**
 * Singleton instance for easy access
 */
let validatorInstance: AccessibilityValidator | null = null;

export function getAccessibilityValidator(config?: Partial<AccessibilityConfig>): AccessibilityValidator {
  if (!validatorInstance) {
    validatorInstance = new AccessibilityValidator(config);
  }
  return validatorInstance;
}

/**
 * React hook for accessibility validation
 */
export function useAccessibilityValidator(config?: Partial<AccessibilityConfig>) {
  const validator = getAccessibilityValidator(config);
  
  return {
    validatePage: () => validator.validatePage(),
    checkElement: (element: HTMLElement) => validator.checkElement(element),
    getSuggestions: (violation: AccessibilityViolation) => validator.getSuggestions(violation),
    generateReport: (violations: AccessibilityViolation[]) => validator.generateReport(violations),
  };
}
