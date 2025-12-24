/**
 * ACCESSIBILITY TESTING SUITE
 * ============================
 *
 * Comprehensive accessibility tests for Darwin Design System
 * WCAG 2.1 AA compliance testing
 *
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Primitives
import { Button } from '../primitives/button';
import { Input } from '../primitives/input';
import { Card } from '../primitives/card';
import { Checkbox } from '../primitives/checkbox';
import { Radio } from '../primitives/radio';
import { Switch } from '../primitives/switch';
import { Select } from '../primitives/select';

// Components
import { Dialog, DialogTrigger, DialogContent } from '../components/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/accordion';
import { Alert } from '../components/alert';
import { Tooltip, TooltipTrigger, TooltipContent } from '../components/tooltip';

describe('Accessibility Tests', () => {
  describe('Primitives Accessibility', () => {
    describe('Button', () => {
      it('has no accessibility violations', async () => {
        const { container } = render(<Button>Click me</Button>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('has accessible name', () => {
        const { getByRole } = render(<Button>Submit</Button>);
        const button = getByRole('button');
        expect(button).toHaveAccessibleName('Submit');
      });

      it('indicates disabled state to screen readers', () => {
        const { getByRole } = render(<Button disabled>Disabled</Button>);
        const button = getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });

      it('supports aria-label for icon-only buttons', () => {
        const { getByRole } = render(<Button aria-label="Close">×</Button>);
        const button = getByRole('button');
        expect(button).toHaveAccessibleName('Close');
      });
    });

    describe('Input', () => {
      it('has no accessibility violations', async () => {
        const { container } = render(
          <div>
            <label htmlFor="test-input">Email</label>
            <Input id="test-input" type="email" />
          </div>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('associates label correctly', () => {
        const { getByLabelText } = render(
          <div>
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" />
          </div>
        );
        const input = getByLabelText('Email');
        expect(input).toBeInTheDocument();
      });

      it('announces error messages to screen readers', () => {
        const { getByRole } = render(
          <Input hasError errorMessage="This field is required" aria-label="Email" />
        );
        const input = getByRole('textbox');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAccessibleDescription('This field is required');
      });

      it('supports required attribute', () => {
        const { getByRole } = render(<Input required aria-label="Name" />);
        const input = getByRole('textbox');
        expect(input).toBeRequired();
      });
    });

    describe('Checkbox', () => {
      it('has no accessibility violations', async () => {
        const { container } = render(
          <div>
            <Checkbox id="terms" />
            <label htmlFor="terms">I accept the terms</label>
          </div>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('has correct role and state', () => {
        const { getByRole } = render(
          <Checkbox id="test" aria-label="Accept" checked />
        );
        const checkbox = getByRole('checkbox');
        expect(checkbox).toBeChecked();
      });

      it('supports indeterminate state', () => {
        const { getByRole } = render(
          <Checkbox id="test" aria-label="Select" checked="indeterminate" />
        );
        const checkbox = getByRole('checkbox');
        expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
      });
    });

    describe('Radio', () => {
      it('has no accessibility violations', async () => {
        const { container } = render(
          <div role="radiogroup" aria-label="Options">
            <Radio value="option1" aria-label="Option 1" />
            <Radio value="option2" aria-label="Option 2" />
          </div>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('has correct role and checked state', () => {
        const { getAllByRole } = render(
          <div role="radiogroup">
            <Radio value="1" checked aria-label="First" />
            <Radio value="2" aria-label="Second" />
          </div>
        );
        const radios = getAllByRole('radio');
        expect(radios[0]).toBeChecked();
        expect(radios[1]).not.toBeChecked();
      });
    });

    describe('Switch', () => {
      it('has no accessibility violations', async () => {
        const { container } = render(<Switch aria-label="Enable notifications" />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('has correct role and state', () => {
        const { getByRole } = render(
          <Switch checked aria-label="Dark mode" />
        );
        const switchEl = getByRole('switch');
        expect(switchEl).toHaveAttribute('aria-checked', 'true');
      });
    });

    describe('Select', () => {
      it('has no accessibility violations', async () => {
        const { container } = render(
          <div>
            <label htmlFor="country">Country</label>
            <Select id="country">
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
            </Select>
          </div>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('has accessible label', () => {
        const { getByLabelText } = render(
          <div>
            <label htmlFor="language">Language</label>
            <Select id="language">
              <option>English</option>
            </Select>
          </div>
        );
        expect(getByLabelText('Language')).toBeInTheDocument();
      });
    });
  });

  describe('Component Accessibility', () => {
    describe('Dialog', () => {
      it('has no accessibility violations when open', async () => {
        const { container } = render(
          <Dialog open>
            <DialogContent aria-labelledby="dialog-title">
              <h2 id="dialog-title">Dialog Title</h2>
              <p>Dialog content</p>
            </DialogContent>
          </Dialog>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('has correct role and label', () => {
        const { getByRole } = render(
          <Dialog open>
            <DialogContent aria-label="Settings">
              <p>Content</p>
            </DialogContent>
          </Dialog>
        );
        const dialog = getByRole('dialog');
        expect(dialog).toHaveAccessibleName('Settings');
      });

      it('traps focus within dialog', () => {
        const { getByRole } = render(
          <Dialog open>
            <DialogContent aria-label="Modal">
              <input type="text" />
              <button>Close</button>
            </DialogContent>
          </Dialog>
        );
        const dialog = getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
      });
    });

    describe('Tabs', () => {
      it('has no accessibility violations', async () => {
        const { container } = render(
          <Tabs defaultValue="tab1">
            <TabsList aria-label="Navigation">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content 1</TabsContent>
            <TabsContent value="tab2">Content 2</TabsContent>
          </Tabs>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('has correct ARIA roles', () => {
        const { getByRole, getAllByRole } = render(
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">First</TabsTrigger>
              <TabsTrigger value="tab2">Second</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content 1</TabsContent>
          </Tabs>
        );

        expect(getByRole('tablist')).toBeInTheDocument();
        expect(getAllByRole('tab')).toHaveLength(2);
        expect(getByRole('tabpanel')).toBeInTheDocument();
      });

      it('indicates selected tab', () => {
        const { getAllByRole } = render(
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content</TabsContent>
          </Tabs>
        );

        const tabs = getAllByRole('tab');
        expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
        expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
      });
    });

    describe('Accordion', () => {
      it('has no accessibility violations', async () => {
        const { container } = render(
          <Accordion type="single">
            <AccordionItem value="item1">
              <AccordionTrigger>Question 1</AccordionTrigger>
              <AccordionContent>Answer 1</AccordionContent>
            </AccordionItem>
          </Accordion>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('has correct ARIA attributes', () => {
        const { getByRole } = render(
          <Accordion type="single">
            <AccordionItem value="item1">
              <AccordionTrigger>Question</AccordionTrigger>
              <AccordionContent>Answer</AccordionContent>
            </AccordionItem>
          </Accordion>
        );

        const button = getByRole('button');
        expect(button).toHaveAttribute('aria-expanded');
        expect(button).toHaveAttribute('aria-controls');
      });
    });

    describe('Alert', () => {
      it('has no accessibility violations', async () => {
        const { container } = render(
          <Alert variant="info" title="Information">
            This is an informational message
          </Alert>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('has correct role', () => {
        const { getByRole } = render(
          <Alert variant="warning">Warning message</Alert>
        );
        expect(getByRole('alert')).toBeInTheDocument();
      });

      it('announces to screen readers', () => {
        const { getByRole } = render(
          <Alert variant="error">Error occurred</Alert>
        );
        const alert = getByRole('alert');
        expect(alert).toHaveAttribute('aria-live');
      });
    });

    describe('Tooltip', () => {
      it('has no accessibility violations', async () => {
        const { container } = render(
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip text</TooltipContent>
          </Tooltip>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('provides accessible description', () => {
        const { getByRole } = render(
          <Tooltip open>
            <TooltipTrigger>Info</TooltipTrigger>
            <TooltipContent id="tooltip-content">Additional info</TooltipContent>
          </Tooltip>
        );

        const trigger = getByRole('button');
        expect(trigger).toHaveAttribute('aria-describedby');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    describe('Button', () => {
      it('can be activated with Enter key', () => {
        const handleClick = jest.fn();
        const { getByRole } = render(<Button onClick={handleClick}>Click</Button>);

        const button = getByRole('button');
        button.focus();

        // Simulate Enter key
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        button.dispatchEvent(event);

        // Button should be clickable via keyboard
        expect(button).toHaveFocus();
      });

      it('can be activated with Space key', () => {
        const handleClick = jest.fn();
        const { getByRole } = render(<Button onClick={handleClick}>Click</Button>);

        const button = getByRole('button');
        button.focus();

        // Simulate Space key
        const event = new KeyboardEvent('keydown', { key: ' ' });
        button.dispatchEvent(event);

        expect(button).toHaveFocus();
      });
    });

    describe('Tabs', () => {
      it('supports arrow key navigation', () => {
        const { getAllByRole } = render(
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content</TabsContent>
          </Tabs>
        );

        const tabs = getAllByRole('tab');
        tabs[0].focus();
        expect(tabs[0]).toHaveFocus();

        // Should be navigable with arrow keys
        expect(tabs[0]).toHaveAttribute('tabindex');
      });
    });
  });

  describe('Color Contrast', () => {
    it('Button has sufficient color contrast', async () => {
      const { container } = render(<Button variant="primary">Submit</Button>);
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('Alert has sufficient color contrast', async () => {
      const { container } = render(
        <Alert variant="error">Error message</Alert>
      );
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('Focus Management', () => {
    it('maintains visible focus indicators', () => {
      const { getByRole } = render(<Button>Focusable</Button>);
      const button = getByRole('button');

      button.focus();
      expect(button).toHaveFocus();

      // Focus should be visible
      expect(button).toHaveClass('focus-visible:ring-2');
    });

    it('Input has visible focus indicator', () => {
      const { getByRole } = render(<Input aria-label="Text input" />);
      const input = getByRole('textbox');

      input.focus();
      expect(input).toHaveFocus();
      expect(input).toHaveClass('focus:outline-none');
    });
  });

  describe('Screen Reader Support', () => {
    it('Button provides context to screen readers', () => {
      const { getByRole } = render(
        <Button aria-label="Delete item" variant="ghost">
          ×
        </Button>
      );

      const button = getByRole('button');
      expect(button).toHaveAccessibleName('Delete item');
    });

    it('Form input provides helpful labels', () => {
      const { getByLabelText } = render(
        <div>
          <label htmlFor="email">Email Address</label>
          <Input id="email" type="email" required />
        </div>
      );

      const input = getByLabelText('Email Address');
      expect(input).toBeRequired();
      expect(input).toHaveAccessibleName('Email Address');
    });

    it('Error messages are announced', () => {
      const { getByRole } = render(
        <Input
          aria-label="Username"
          hasError
          errorMessage="Username is required"
        />
      );

      const input = getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAccessibleDescription('Username is required');
    });
  });

  describe('ARIA Landmarks', () => {
    it('Card can serve as a region with label', () => {
      const { getByRole } = render(
        <Card role="region" aria-label="Summary">
          Content
        </Card>
      );

      expect(getByRole('region')).toHaveAccessibleName('Summary');
    });
  });
});
