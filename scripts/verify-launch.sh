#!/bin/bash

# Darwin Design System - Launch Verification Script
# Version 1.0.0

echo "🚀 Darwin Design System - Launch Verification"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0

# Function to check command status
check_status() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ $1${NC}"
    ((PASSED++))
  else
    echo -e "${RED}❌ $1${NC}"
    ((FAILED++))
  fi
}

# 1. TypeScript Check
echo "Checking TypeScript..."
npm run type-check > /dev/null 2>&1
check_status "TypeScript"

# 2. ESLint Check
echo "Checking ESLint..."
npm run lint > /dev/null 2>&1
check_status "ESLint"

# 3. Security Audit
echo "Running security audit..."
npm audit --production > /dev/null 2>&1
check_status "Security Audit"

# 4. Build Test
echo "Testing production build..."
npm run build > /dev/null 2>&1
check_status "Build"

# 5. Test Suite
echo "Running tests..."
npm test > /dev/null 2>&1
check_status "Tests"

# 6. Check Required Files
echo "Checking required files..."
REQUIRED_FILES=(
  "README.md"
  "CHANGELOG.md"
  "DEPLOYMENT.md"
  "PRODUCTION_READINESS.md"
  "lib/design-system/README.md"
  "lib/design-system/MIGRATION_GUIDE.md"
  "lib/design-system/TROUBLESHOOTING.md"
  "lib/design-system/MONITORING.md"
  "public/manifest.json"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    ((PASSED++))
  else
    echo -e "${RED}❌ Missing: $file${NC}"
    ((FAILED++))
  fi
done

# 7. Check PWA Icons
echo "Checking PWA icons..."
REQUIRED_ICONS=(
  "public/icons/icon-192x192.png"
  "public/icons/icon-512x512.png"
)

for icon in "${REQUIRED_ICONS[@]}"; do
  if [ -f "$icon" ]; then
    ((PASSED++))
  else
    echo -e "${YELLOW}⚠️  Missing: $icon${NC}"
    ((FAILED++))
  fi
done

# Summary
TOTAL=$((PASSED + FAILED))
PERCENTAGE=$((PASSED * 100 / TOTAL))

echo ""
echo "📊 Verification Results:"
echo "Passed: $PASSED/$TOTAL ($PERCENTAGE%)"

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}🎉 All checks passed! Ready for production launch.${NC}"
  exit 0
else
  echo -e "${YELLOW}⚠️  $FAILED check(s) failed. Please fix issues before launching.${NC}"
  exit 1
fi
