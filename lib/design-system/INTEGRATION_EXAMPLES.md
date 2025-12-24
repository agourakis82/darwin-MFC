# Darwin Design System - Integration Examples

**Version 1.0.0** | **Complete Implementation Guide**

This guide provides comprehensive, production-ready examples for integrating the Darwin Design System into your applications.

---

## Table of Contents

1. [Basic Integration](#basic-integration)
2. [Form Examples](#form-examples)
3. [Dashboard Examples](#dashboard-examples)
4. [Clinical Tools Examples](#clinical-tools-examples)
5. [Mobile Examples](#mobile-examples)
6. [Animation Examples](#animation-examples)
7. [Advanced Patterns](#advanced-patterns)
8. [Performance Optimization](#performance-optimization)

---

## Basic Integration

### Simple Page with Components

```tsx
// app/[locale]/example/page.tsx
'use client';

import { Button, Card, Input, Select } from '@/lib/design-system';
import { useState } from 'react';

export default function ExamplePage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome to Darwin-MFC</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Your Role
            </label>
            <Select
              value={role}
              onValueChange={setRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physician">Physician</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="student">Medical Student</SelectItem>
                <SelectItem value="researcher">Researcher</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!name || !role}
          >
            Get Started
          </Button>
        </div>
      </Card>
    </div>
  );
}
```

### Dialog with Form

```tsx
// app/components/UserDialog.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  Button,
  Input,
} from '@/lib/design-system';
import { useState } from 'react';

export function UserDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', { email, password });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to your account</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Form Examples

### Complete Form with Validation

```tsx
// app/components/Forms/PatientForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Card,
} from '@/lib/design-system';

const patientSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  allergies: z.boolean(),
  allergyDetails: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

export function PatientForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const hasAllergies = watch('allergies');

  const onSubmit = async (data: PatientFormData) => {
    console.log('Form data:', data);
    // Submit to API
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Patient Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('firstName')}
              hasError={!!errors.firstName}
              errorMessage={errors.firstName?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('lastName')}
              hasError={!!errors.lastName}
              errorMessage={errors.lastName?.message}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              {...register('dateOfBirth')}
              hasError={!!errors.dateOfBirth}
              errorMessage={errors.dateOfBirth?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <Select {...register('gender')}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                {...register('email')}
                hasError={!!errors.email}
                errorMessage={errors.email?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <Input
                type="tel"
                placeholder="1234567890"
                {...register('phone')}
                hasError={!!errors.phone}
                errorMessage={errors.phone?.message}
              />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Medical Information</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox {...register('allergies')} id="allergies" />
              <label htmlFor="allergies" className="text-sm font-medium">
                Patient has known allergies
              </label>
            </div>

            {hasAllergies && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Allergy Details
                </label>
                <Input
                  {...register('allergyDetails')}
                  placeholder="List allergies..."
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
```

### Multi-Step Form Wizard

```tsx
// app/components/Forms/ScreeningWizard.tsx
'use client';

import { useState } from 'react';
import { Button, Card, Progress, Input, Select } from '@/lib/design-system';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { id: 1, title: 'Personal Info', description: 'Basic information' },
  { id: 2, title: 'Medical History', description: 'Health background' },
  { id: 3, title: 'Risk Factors', description: 'Screening criteria' },
  { id: 4, title: 'Review', description: 'Confirm details' },
];

export function ScreeningWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    age: '',
    gender: '',
    // Step 2
    familyHistory: '',
    conditions: '',
    // Step 3
    smoking: '',
    alcohol: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Age</label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <Select
                value={formData.gender}
                onValueChange={(value) => updateFormData('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medical History</h3>
            <div>
              <label className="block text-sm font-medium mb-2">
                Family History
              </label>
              <Input
                value={formData.familyHistory}
                onChange={(e) => updateFormData('familyHistory', e.target.value)}
                placeholder="Any family history of cancer?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Existing Conditions
              </label>
              <Input
                value={formData.conditions}
                onChange={(e) => updateFormData('conditions', e.target.value)}
                placeholder="List any existing conditions"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Risk Factors</h3>
            <div>
              <label className="block text-sm font-medium mb-2">
                Smoking Status
              </label>
              <Select
                value={formData.smoking}
                onValueChange={(value) => updateFormData('smoking', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="former">Former</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Alcohol Consumption
              </label>
              <Select
                value={formData.alcohol}
                onValueChange={(value) => updateFormData('alcohol', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Information</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded space-y-2">
              <p><strong>Age:</strong> {formData.age}</p>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <p><strong>Family History:</strong> {formData.familyHistory}</p>
              <p><strong>Conditions:</strong> {formData.conditions}</p>
              <p><strong>Smoking:</strong> {formData.smoking}</p>
              <p><strong>Alcohol:</strong> {formData.alcohol}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                step.id === currentStep
                  ? 'text-blue-600 dark:text-blue-400'
                  : step.id < currentStep
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-400'
              }`}
            >
              <div className="text-xs font-medium">{step.title}</div>
            </div>
          ))}
        </div>
        <Progress value={progress} />
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={currentStep === steps.length ? () => console.log('Submit') : nextStep}
        >
          {currentStep === steps.length ? 'Submit' : 'Next'}
        </Button>
      </div>
    </Card>
  );
}
```

---

## Dashboard Examples

### Analytics Dashboard

```tsx
// app/[locale]/dashboard/page.tsx
'use client';

import {
  Card,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/lib/design-system';
import { LineChart, BarChart, PieChart } from '@/lib/design-system/components/charts';

const screeningData = [
  { month: 'Jan', mammography: 120, colonoscopy: 80, psa: 45 },
  { month: 'Feb', mammography: 140, colonoscopy: 95, psa: 52 },
  { month: 'Mar', mammography: 165, colonoscopy: 110, psa: 61 },
  { month: 'Apr', mammography: 180, colonoscopy: 125, psa: 68 },
  { month: 'May', mammography: 195, colonoscopy: 140, psa: 75 },
  { month: 'Jun', mammography: 210, colonoscopy: 155, psa: 82 },
];

const convergenceData = [
  { name: 'Convergent', value: 12, color: '#10b981' },
  { name: 'Partial', value: 8, color: '#f59e0b' },
  { name: 'Divergent', value: 5, color: '#ef4444' },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Screening Dashboard</h1>
        <Button variant="primary">Export Report</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Screenings</h3>
          <p className="text-3xl font-bold mt-2">1,245</p>
          <p className="text-sm text-green-500 mt-1">↑ 12% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Patients</h3>
          <p className="text-3xl font-bold mt-2">892</p>
          <p className="text-sm text-green-500 mt-1">↑ 8% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Convergence Rate</h3>
          <p className="text-3xl font-bold mt-2">48%</p>
          <p className="text-sm text-yellow-500 mt-1">→ No change</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Coverage</h3>
          <p className="text-3xl font-bold mt-2">76%</p>
          <p className="text-sm text-green-500 mt-1">↑ 5% from last month</p>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Screening Trends</TabsTrigger>
          <TabsTrigger value="convergence">Convergence Analysis</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Monthly Screening Volume
            </h3>
            <LineChart
              data={screeningData}
              xKey="month"
              yKeys={['mammography', 'colonoscopy', 'psa']}
              height={400}
            />
          </Card>
        </TabsContent>

        <TabsContent value="convergence">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Guideline Convergence
              </h3>
              <PieChart data={convergenceData} height={300} />
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                By Screening Type
              </h3>
              <BarChart
                data={screeningData}
                xKey="month"
                yKeys={['mammography', 'colonoscopy']}
                height={300}
              />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coverage">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Coverage Progress</h3>
            <LineChart
              data={screeningData}
              xKey="month"
              yKeys={['mammography']}
              height={400}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## Clinical Tools Examples

### Drug Interaction Checker

```tsx
// app/components/Clinical/DrugChecker.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Alert,
  Badge,
} from '@/lib/design-system';

interface Drug {
  id: string;
  name: string;
}

interface Interaction {
  severity: 'major' | 'moderate' | 'minor';
  description: string;
}

export function DrugInteractionChecker() {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  const addDrug = (drug: Drug) => {
    setSelectedDrugs([...selectedDrugs, drug]);
    setSearchQuery('');
    // Simulate checking interactions
    checkInteractions([...selectedDrugs, drug]);
  };

  const removeDrug = (drugId: string) => {
    const updated = selectedDrugs.filter((d) => d.id !== drugId);
    setSelectedDrugs(updated);
    checkInteractions(updated);
  };

  const checkInteractions = (drugs: Drug[]) => {
    // Simulated interaction checking
    if (drugs.length >= 2) {
      setInteractions([
        {
          severity: 'major',
          description: 'Major interaction between Drug A and Drug B',
        },
        {
          severity: 'moderate',
          description: 'Moderate interaction: Monitor patient closely',
        },
      ]);
    } else {
      setInteractions([]);
    }
  };

  const getSeverityColor = (severity: Interaction['severity']) => {
    switch (severity) {
      case 'major':
        return 'bg-red-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'minor':
        return 'bg-blue-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Drug Interaction Checker
        </h2>

        {/* Drug Search */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Add Medication
            </label>
            <div className="flex space-x-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for drug..."
                className="flex-1"
              />
              <Button
                variant="primary"
                onClick={() =>
                  addDrug({
                    id: `drug-${Date.now()}`,
                    name: searchQuery,
                  })
                }
                disabled={!searchQuery}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Selected Drugs */}
          {selectedDrugs.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">
                Selected Medications ({selectedDrugs.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedDrugs.map((drug) => (
                  <Badge
                    key={drug.id}
                    variant="secondary"
                    className="flex items-center space-x-2"
                  >
                    <span>{drug.name}</span>
                    <button
                      onClick={() => removeDrug(drug.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Interactions */}
      {interactions.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Detected Interactions
          </h3>
          <div className="space-y-3">
            {interactions.map((interaction, index) => (
              <Alert
                key={index}
                variant={
                  interaction.severity === 'major'
                    ? 'destructive'
                    : interaction.severity === 'moderate'
                    ? 'warning'
                    : 'info'
                }
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-1 ${getSeverityColor(
                      interaction.severity
                    )}`}
                  />
                  <div>
                    <p className="font-medium capitalize">
                      {interaction.severity} Interaction
                    </p>
                    <p className="text-sm mt-1">{interaction.description}</p>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
```

### Clinical Calculator

```tsx
// app/components/Clinical/BMICalculator.tsx
'use client';

import { useState } from 'react';
import { Card, Input, Button, Badge } from '@/lib/design-system';
import { motion } from 'framer-motion';

export function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m

    if (w > 0 && h > 0) {
      const calculated = w / (h * h);
      setBMI(parseFloat(calculated.toFixed(1)));
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-500' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">BMI Calculator</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Weight (kg)
          </label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Height (cm)
          </label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
          />
        </div>

        <Button
          variant="primary"
          className="w-full"
          onClick={calculateBMI}
          disabled={!weight || !height}
        >
          Calculate BMI
        </Button>
      </div>

      {bmi !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded"
        >
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Your BMI</p>
            <p className="text-4xl font-bold">{bmi}</p>
            <Badge
              variant="secondary"
              className={`mt-2 ${getBMICategory(bmi).color}`}
            >
              {getBMICategory(bmi).label}
            </Badge>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-2">BMI Categories:</p>
            <ul className="space-y-1">
              <li>• Underweight: &lt; 18.5</li>
              <li>• Normal: 18.5 - 24.9</li>
              <li>• Overweight: 25 - 29.9</li>
              <li>• Obese: ≥ 30</li>
            </ul>
          </div>
        </motion.div>
      )}
    </Card>
  );
}
```

---

## Mobile Examples

### Mobile-First Layout

```tsx
// app/components/Mobile/MobileLayout.tsx
'use client';

import { useState } from 'react';
import {
  BottomNavBar,
  MobileHeader,
  HamburgerMenu,
} from '@/lib/pwa/components';
import { motion } from 'framer-motion';

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header */}
      <MobileHeader
        title="Darwin-MFC"
        onMenuClick={() => setMenuOpen(true)}
      />

      {/* Hamburger Menu */}
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)}>
        <nav className="p-4 space-y-2">
          <a href="/doencas" className="block p-3 rounded hover:bg-gray-100">
            Diseases
          </a>
          <a href="/medicamentos" className="block p-3 rounded hover:bg-gray-100">
            Medications
          </a>
          <a href="/protocolos" className="block p-3 rounded hover:bg-gray-100">
            Protocols
          </a>
          <a href="/calculadoras" className="block p-3 rounded hover:bg-gray-100">
            Calculators
          </a>
        </nav>
      </HamburgerMenu>

      {/* Main Content */}
      <main className="flex-1 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
}
```

### Pull-to-Refresh

```tsx
// app/components/Mobile/RefreshableList.tsx
'use client';

import { useState } from 'react';
import { PullToRefresh } from '@/lib/pwa/components';
import { Card } from '@/lib/design-system';

export function RefreshableList() {
  const [items, setItems] = useState([
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
  ]);

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setItems([
      { id: Date.now(), title: 'New Item' },
      ...items,
    ]);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-2 p-4">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <h3 className="font-medium">{item.title}</h3>
          </Card>
        ))}
      </div>
    </PullToRefresh>
  );
}
```

---

## Animation Examples

### Page Transition

```tsx
// app/components/Animation/PageTransition.tsx
'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/design-system/animations/presets';

export function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      {...fadeInUp}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
```

### Stagger List Animation

```tsx
// app/components/Animation/StaggerList.tsx
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/lib/design-system';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function StaggerList({ items }: { items: any[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {items.map((data, index) => (
        <motion.div key={index} variants={item}>
          <Card className="p-4">
            <h3 className="font-medium">{data.title}</h3>
            <p className="text-sm text-gray-500">{data.description}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## Advanced Patterns

### Data Table with Server Actions

```tsx
// app/components/Advanced/ServerDataTable.tsx
'use client';

import { useState, useEffect } from 'react';
import { DataTable, Button, Input } from '@/lib/design-system';

export function ServerDataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const fetchData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setData([
      { id: 1, name: 'Breast Cancer Screening', coverage: 76, status: 'Active' },
      { id: 2, name: 'Colon Cancer Screening', coverage: 68, status: 'Active' },
      { id: 3, name: 'Cervical Cancer Screening', coverage: 82, status: 'Active' },
    ]);
    setLoading(false);
  };

  const columns = [
    { key: 'name', label: 'Screening Name', sortable: true },
    { key: 'coverage', label: 'Coverage (%)', sortable: true },
    { key: 'status', label: 'Status', sortable: false },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: any) => (
        <Button variant="ghost" size="sm">View</Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search screenings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="primary">Add Screening</Button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        pagination={{
          page,
          pageSize: 10,
          total: 100,
          onPageChange: setPage,
        }}
        sorting
        filtering
      />
    </div>
  );
}
```

### Command Palette Integration

```tsx
// app/components/Advanced/GlobalCommandPalette.tsx
'use client';

import { useEffect, useState } from 'react';
import { Command } from '@/lib/design-system';
import { useRouter } from 'next/navigation';

export function GlobalCommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <Command open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => navigate('/doencas')}>
            Diseases
          </CommandItem>
          <CommandItem onSelect={() => navigate('/medicamentos')}>
            Medications
          </CommandItem>
          <CommandItem onSelect={() => navigate('/protocolos')}>
            Protocols
          </CommandItem>
          <CommandItem onSelect={() => navigate('/calculadoras')}>
            Calculators
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => console.log('Export')}>
            Export Data
          </CommandItem>
          <CommandItem onSelect={() => console.log('Print')}>
            Print Report
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

---

## Performance Optimization

### Lazy Loading Components

```tsx
// app/components/Performance/LazyComponents.tsx
'use client';

import { lazy, Suspense } from 'react';
import { Spinner } from '@/lib/design-system/animations/loading';

// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'));
const HeavyDataTable = lazy(() => import('./HeavyDataTable'));

export function OptimizedPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Immediately loaded content */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <h3>Quick Stat 1</h3>
        </Card>
        <Card className="p-4">
          <h3>Quick Stat 2</h3>
        </Card>
        <Card className="p-4">
          <h3>Quick Stat 3</h3>
        </Card>
      </div>

      {/* Lazy loaded heavy components */}
      <Suspense fallback={<Spinner size="lg" />}>
        <HeavyChart />
      </Suspense>

      <Suspense fallback={<Spinner size="lg" />}>
        <HeavyDataTable />
      </Suspense>
    </div>
  );
}
```

### Virtualized List

```tsx
// app/components/Performance/VirtualList.tsx
'use client';

import { useVirtual } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { Card } from '@/lib/design-system';

export function VirtualList({ items }: { items: any[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize: () => 80,
  });

  return (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <Card className="p-4 m-2">
              <h3 className="font-medium">
                {items[virtualRow.index].title}
              </h3>
              <p className="text-sm text-gray-500">
                {items[virtualRow.index].description}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Best Practices

### Error Boundary

```tsx
// app/components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';
import { Alert, Button } from '@/lib/design-system';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <Alert variant="destructive" className="max-w-lg">
            <h2 className="text-lg font-semibold mb-2">
              Something went wrong
            </h2>
            <p className="text-sm mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button
              variant="outline"
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Loading States

```tsx
// app/components/LoadingStates.tsx
'use client';

import { Skeleton, Spinner } from '@/lib/design-system';

export function LoadingCard() {
  return (
    <Card className="p-6">
      <Skeleton className="h-6 w-48 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </Card>
  );
}

export function LoadingTable() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

export function CenteredSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Spinner size="lg" />
    </div>
  );
}
```

---

## Conclusion

These integration examples demonstrate:

- ✅ **Real-world patterns** for common use cases
- ✅ **Production-ready code** with error handling
- ✅ **Performance optimization** techniques
- ✅ **Accessibility** best practices
- ✅ **Mobile-first** responsive design
- ✅ **Animation** integration
- ✅ **State management** patterns

For more examples, see:
- [Design System README](./README.md)
- [Migration Guide](./MIGRATION_GUIDE.md)
- [API Reference](./API.md)
- [Animation Guide](./animations/README.md)

---

**Darwin Design System v1.0.0**
*Building accessible, performant healthcare applications*
