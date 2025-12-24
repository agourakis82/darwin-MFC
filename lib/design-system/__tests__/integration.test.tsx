/**
 * DESIGN SYSTEM INTEGRATION TESTS
 * =================================
 *
 * Comprehensive integration tests for the Darwin Design System
 * Tests component interactions, state management, and workflows
 *
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Primitives
import { Button } from '../primitives/button';
import { Input } from '../primitives/input';
import { Card } from '../primitives/card';
import { Checkbox } from '../primitives/checkbox';
import { Radio } from '../primitives/radio';
import { Switch } from '../primitives/switch';

// Components
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../components/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/accordion';
import { Alert } from '../components/alert';
import { Tooltip, TooltipTrigger, TooltipContent } from '../components/tooltip';

describe('Design System Integration Tests', () => {
  describe('Primitives Integration', () => {
    describe('Button', () => {
      it('renders with all variants', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>);
        expect(screen.getByText('Primary')).toBeInTheDocument();

        rerender(<Button variant="secondary">Secondary</Button>);
        expect(screen.getByText('Secondary')).toBeInTheDocument();

        rerender(<Button variant="outline">Outline</Button>);
        expect(screen.getByText('Outline')).toBeInTheDocument();

        rerender(<Button variant="ghost">Ghost</Button>);
        expect(screen.getByText('Ghost')).toBeInTheDocument();
      });

      it('handles click events', async () => {
        const handleClick = jest.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Click me</Button>);

        await user.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it('respects disabled state', async () => {
        const handleClick = jest.fn();
        const user = userEvent.setup();

        render(
          <Button onClick={handleClick} disabled>
            Disabled
          </Button>
        );

        await user.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
      });

      it('renders with different sizes', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        expect(screen.getByText('Small')).toHaveClass('h-8');

        rerender(<Button size="md">Medium</Button>);
        expect(screen.getByText('Medium')).toHaveClass('h-10');

        rerender(<Button size="lg">Large</Button>);
        expect(screen.getByText('Large')).toHaveClass('h-12');
      });
    });

    describe('Input', () => {
      it('accepts user input', async () => {
        const user = userEvent.setup();
        render(<Input placeholder="Enter text" />);

        const input = screen.getByPlaceholderText('Enter text');
        await user.type(input, 'Hello World');

        expect(input).toHaveValue('Hello World');
      });

      it('shows error state', () => {
        render(<Input hasError errorMessage="This field is required" />);

        expect(screen.getByText('This field is required')).toBeInTheDocument();
      });

      it('handles controlled input', async () => {
        const user = userEvent.setup();
        const TestComponent = () => {
          const [value, setValue] = React.useState('');
          return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
        };

        render(<TestComponent />);
        const input = screen.getByRole('textbox');

        await user.type(input, 'Test');
        expect(input).toHaveValue('Test');
      });
    });

    describe('Card', () => {
      it('renders children correctly', () => {
        render(
          <Card>
            <h2>Card Title</h2>
            <p>Card content</p>
          </Card>
        );

        expect(screen.getByText('Card Title')).toBeInTheDocument();
        expect(screen.getByText('Card content')).toBeInTheDocument();
      });

      it('applies custom className', () => {
        const { container } = render(<Card className="custom-class">Content</Card>);

        expect(container.firstChild).toHaveClass('custom-class');
      });
    });

    describe('Checkbox', () => {
      it('toggles checked state', async () => {
        const user = userEvent.setup();
        const TestComponent = () => {
          const [checked, setChecked] = React.useState(false);
          return (
            <div>
              <Checkbox checked={checked} onCheckedChange={setChecked} id="test" />
              <label htmlFor="test">Accept terms</label>
              <p>{checked ? 'Checked' : 'Unchecked'}</p>
            </div>
          );
        };

        render(<TestComponent />);

        expect(screen.getByText('Unchecked')).toBeInTheDocument();

        await user.click(screen.getByRole('checkbox'));
        await waitFor(() => {
          expect(screen.getByText('Checked')).toBeInTheDocument();
        });
      });
    });

    describe('Radio', () => {
      it('allows single selection in group', async () => {
        const user = userEvent.setup();
        const TestComponent = () => {
          const [value, setValue] = React.useState('');
          return (
            <div>
              <Radio value="option1" checked={value === 'option1'} onCheckedChange={() => setValue('option1')} />
              <Radio value="option2" checked={value === 'option2'} onCheckedChange={() => setValue('option2')} />
              <p>Selected: {value}</p>
            </div>
          );
        };

        render(<TestComponent />);

        const radios = screen.getAllByRole('radio');

        await user.click(radios[0]);
        expect(screen.getByText('Selected: option1')).toBeInTheDocument();

        await user.click(radios[1]);
        expect(screen.getByText('Selected: option2')).toBeInTheDocument();
      });
    });

    describe('Switch', () => {
      it('toggles on and off', async () => {
        const user = userEvent.setup();
        const TestComponent = () => {
          const [enabled, setEnabled] = React.useState(false);
          return (
            <div>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
              <p>{enabled ? 'ON' : 'OFF'}</p>
            </div>
          );
        };

        render(<TestComponent />);

        expect(screen.getByText('OFF')).toBeInTheDocument();

        await user.click(screen.getByRole('switch'));
        await waitFor(() => {
          expect(screen.getByText('ON')).toBeInTheDocument();
        });
      });
    });
  });

  describe('Component Integration', () => {
    describe('Dialog', () => {
      it('opens and closes dialog', async () => {
        const user = userEvent.setup();

        render(
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
              </DialogHeader>
              <p>Dialog content</p>
            </DialogContent>
          </Dialog>
        );

        // Dialog should be closed initially
        expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();

        // Open dialog
        await user.click(screen.getByText('Open Dialog'));
        await waitFor(() => {
          expect(screen.getByText('Dialog Title')).toBeInTheDocument();
        });

        // Close dialog
        const closeButton = screen.getByRole('button', { name: /close/i });
        await user.click(closeButton);
        await waitFor(() => {
          expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
        });
      });

      it('closes on escape key', async () => {
        const user = userEvent.setup();

        render(
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open</Button>
            </DialogTrigger>
            <DialogContent>
              <p>Content</p>
            </DialogContent>
          </Dialog>
        );

        await user.click(screen.getByText('Open'));
        await waitFor(() => {
          expect(screen.getByText('Content')).toBeInTheDocument();
        });

        await user.keyboard('{Escape}');
        await waitFor(() => {
          expect(screen.queryByText('Content')).not.toBeInTheDocument();
        });
      });
    });

    describe('Tabs', () => {
      it('switches between tabs', async () => {
        const user = userEvent.setup();

        render(
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content 1</TabsContent>
            <TabsContent value="tab2">Content 2</TabsContent>
          </Tabs>
        );

        // Tab 1 should be active by default
        expect(screen.getByText('Content 1')).toBeVisible();
        expect(screen.queryByText('Content 2')).not.toBeVisible();

        // Switch to Tab 2
        await user.click(screen.getByText('Tab 2'));
        await waitFor(() => {
          expect(screen.getByText('Content 2')).toBeVisible();
          expect(screen.queryByText('Content 1')).not.toBeVisible();
        });
      });
    });

    describe('Accordion', () => {
      it('expands and collapses items', async () => {
        const user = userEvent.setup();

        render(
          <Accordion type="single" collapsible>
            <AccordionItem value="item1">
              <AccordionTrigger>Question 1</AccordionTrigger>
              <AccordionContent>Answer 1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item2">
              <AccordionTrigger>Question 2</AccordionTrigger>
              <AccordionContent>Answer 2</AccordionContent>
            </AccordionItem>
          </Accordion>
        );

        // Content should be hidden initially
        expect(screen.queryByText('Answer 1')).not.toBeVisible();

        // Expand first item
        await user.click(screen.getByText('Question 1'));
        await waitFor(() => {
          expect(screen.getByText('Answer 1')).toBeVisible();
        });

        // Collapse first item
        await user.click(screen.getByText('Question 1'));
        await waitFor(() => {
          expect(screen.queryByText('Answer 1')).not.toBeVisible();
        });
      });

      it('allows multiple items open in multiple mode', async () => {
        const user = userEvent.setup();

        render(
          <Accordion type="multiple">
            <AccordionItem value="item1">
              <AccordionTrigger>Q1</AccordionTrigger>
              <AccordionContent>A1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item2">
              <AccordionTrigger>Q2</AccordionTrigger>
              <AccordionContent>A2</AccordionContent>
            </AccordionItem>
          </Accordion>
        );

        await user.click(screen.getByText('Q1'));
        await user.click(screen.getByText('Q2'));

        await waitFor(() => {
          expect(screen.getByText('A1')).toBeVisible();
          expect(screen.getByText('A2')).toBeVisible();
        });
      });
    });

    describe('Alert', () => {
      it('renders different variants', () => {
        const { rerender } = render(
          <Alert variant="default" title="Info">
            Information message
          </Alert>
        );
        expect(screen.getByText('Info')).toBeInTheDocument();

        rerender(
          <Alert variant="success" title="Success">
            Success message
          </Alert>
        );
        expect(screen.getByText('Success')).toBeInTheDocument();

        rerender(
          <Alert variant="warning" title="Warning">
            Warning message
          </Alert>
        );
        expect(screen.getByText('Warning')).toBeInTheDocument();

        rerender(
          <Alert variant="error" title="Error">
            Error message
          </Alert>
        );
        expect(screen.getByText('Error')).toBeInTheDocument();
      });
    });

    describe('Tooltip', () => {
      it('shows tooltip on hover', async () => {
        const user = userEvent.setup();

        render(
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip text</TooltipContent>
          </Tooltip>
        );

        // Tooltip should not be visible initially
        expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();

        // Hover over trigger
        await user.hover(screen.getByText('Hover me'));

        await waitFor(() => {
          expect(screen.getByText('Tooltip text')).toBeInTheDocument();
        });
      });
    });
  });

  describe('Form Integration', () => {
    it('handles form submission with validation', async () => {
      const user = userEvent.setup();
      const handleSubmit = jest.fn((e) => e.preventDefault());

      const TestForm = () => {
        const [email, setEmail] = React.useState('');
        const [error, setError] = React.useState('');

        const validate = () => {
          if (!email.includes('@')) {
            setError('Invalid email');
            return false;
          }
          setError('');
          return true;
        };

        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validate()) {
                handleSubmit(e);
              }
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hasError={!!error}
              errorMessage={error}
              placeholder="Email"
            />
            <Button type="submit">Submit</Button>
          </form>
        );
      };

      render(<TestForm />);

      const input = screen.getByPlaceholderText('Email');
      const submit = screen.getByText('Submit');

      // Submit invalid email
      await user.type(input, 'invalid');
      await user.click(submit);

      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(handleSubmit).not.toHaveBeenCalled();

      // Submit valid email
      await user.clear(input);
      await user.type(input, 'test@example.com');
      await user.click(submit);

      expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Complex Workflows', () => {
    it('handles multi-step dialog workflow', async () => {
      const user = userEvent.setup();

      const MultiStepDialog = () => {
        const [step, setStep] = React.useState(1);

        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Start Workflow</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Step {step} of 3</DialogTitle>
              </DialogHeader>

              {step === 1 && (
                <div>
                  <p>Step 1 content</p>
                  <Button onClick={() => setStep(2)}>Next</Button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p>Step 2 content</p>
                  <Button onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)}>Next</Button>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p>Step 3 content</p>
                  <Button onClick={() => setStep(2)}>Back</Button>
                  <Button>Finish</Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        );
      };

      render(<MultiStepDialog />);

      // Open dialog
      await user.click(screen.getByText('Start Workflow'));

      await waitFor(() => {
        expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
      });

      // Navigate to step 2
      await user.click(screen.getByText('Next'));
      expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();

      // Navigate to step 3
      await user.click(screen.getAllByText('Next')[0]);
      expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();

      // Navigate back
      await user.click(screen.getAllByText('Back')[0]);
      expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    });
  });
});
