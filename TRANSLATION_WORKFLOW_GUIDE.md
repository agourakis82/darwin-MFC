# 🌍 Translation Workflow Guide - 32 Modules → 8 Languages

**Date:** January 21, 2026  
**Status:** Ready to Start  
**Total Translations:** 2,304 (32 modules × 9 fields × 8 languages)

---

## 📊 Quick Stats

- **Source Language:** Portuguese (pt)
- **Target Languages:** 8 (en, es, fr, ru, ar, zh, el, hi)
- **Modules:** 32 medical condition modules
- **Fields per Module:** 9 translatable fields
- **Total Strings:** 288 (32 × 9)
- **Total Translations Needed:** 2,304 (288 × 8)

---

## 🚀 Recommended Workflow: Google Sheets (Collaborative)

### **Step 1: Upload Template to Google Sheets**

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet: "Darwin-MFC Medical Translations"
3. File → Import → Upload → Select `lib/content-generation/output/translations/translation-template.csv`
4. Import settings:
   - Separator: Comma
   - Convert text to numbers: NO
   - Encoding: UTF-8

### **Step 2: Format the Spreadsheet**

1. **Freeze header row:** View → Freeze → 1 row
2. **Freeze first 5 columns:** View → Freeze → 5 columns (Module ID, Name, Field, Context, Portuguese)
3. **Color code:**
   - Header row: Dark blue background, white text
   - Portuguese column: Light yellow (source language)
   - Target language columns: Light green (to be filled)
4. **Add data validation:**
   - Select all translation columns
   - Data → Data validation → Text length → Minimum 1 character
   - Show warning if empty

### **Step 3: Recruit Translators**

**Option A: Professional Translators**
- Post on Upwork/Fiverr/ProZ
- Budget: ~$0.10-0.20 per word × 288 strings × ~20 words avg = $576-1,152
- Timeline: 1-2 weeks
- Quality: High (medical background required)

**Option B: Medical Students/Residents**
- Contact medical schools in target countries
- Offer co-authorship credit on Darwin-MFC
- Timeline: 2-3 weeks
- Quality: High (medical knowledge + native language)

**Option C: Community Volunteers**
- Post on medical forums/Reddit/Discord
- Offer acknowledgment in Darwin-MFC credits
- Timeline: 3-4 weeks
- Quality: Variable (requires review)

### **Step 4: Assign Languages**

Share Google Sheet with translators:
- **English (en):** [Translator Name] - [email@example.com]
- **Spanish (es):** [Translator Name] - [email@example.com]
- **French (fr):** [Translator Name] - [email@example.com]
- **Russian (ru):** [Translator Name] - [email@example.com]
- **Arabic (ar):** [Translator Name] - [email@example.com]
- **Chinese (zh):** [Translator Name] - [email@example.com]
- **Greek (el):** [Translator Name] - [email@example.com]
- **Hindi (hi):** [Translator Name] - [email@example.com]

**Permissions:**
- Each translator: Edit access to their column only
- Project manager: Full edit access
- Use "Protected ranges" to prevent accidental edits

### **Step 5: Translation Guidelines**

Share these guidelines with translators:

**Medical Accuracy:**
- Preserve medical terminology accuracy
- Use standard medical terms in target language
- Maintain formal, academic tone (Q1 journal level)
- Do NOT translate: medication names, ontology codes, citations

**Formatting:**
- Preserve inline citations [1,2,3] exactly as in Portuguese
- Keep abbreviations consistent (e.g., IMC → BMI in English)
- Maintain sentence structure where possible
- Use UTF-8 encoding for special characters

**Context:**
- Read "Context" column for field purpose
- Refer to "Module Name" for medical condition
- Ask questions in Google Sheets comments if unclear

### **Step 6: Monitor Progress**

Create a tracking dashboard in Google Sheets:

| Language | Translator | Progress | Status | Deadline |
|----------|-----------|----------|--------|----------|
| English  | [Name]    | 0/288    | Not Started | [Date] |
| Spanish  | [Name]    | 0/288    | Not Started | [Date] |
| French   | [Name]    | 0/288    | Not Started | [Date] |
| Russian  | [Name]    | 0/288    | Not Started | [Date] |
| Arabic   | [Name]    | 0/288    | Not Started | [Date] |
| Chinese  | [Name]    | 0/288    | Not Started | [Date] |
| Greek    | [Name]    | 0/288    | Not Started | [Date] |
| Hindi    | [Name]    | 0/288    | Not Started | [Date] |

**Progress Formula:**
```
=COUNTIF(F2:F289,"<>"")/288
```
(Replace F with column letter for each language)

### **Step 7: Quality Review**

Before integration, review translations:

1. **Medical Accuracy:** Verify medical terms are correct
2. **Completeness:** Check all 288 fields translated
3. **Consistency:** Ensure terminology consistent across modules
4. **Formatting:** Verify citations preserved correctly

### **Step 8: Export and Integrate**

1. **Export from Google Sheets:**
   - File → Download → Comma-separated values (.csv)
   - Save as `translations-complete.csv`

2. **Convert to next-intl format:**
   ```bash
   npx tsx scripts/convert-translations-to-next-intl.ts
   ```

3. **Integrate into Darwin-MFC:**
   - Copy generated files to `messages/{locale}/protocols.json`
   - Test with `npm run dev`
   - Verify all languages display correctly

---

## 🔄 Alternative Workflow: Professional Service

### **Option 1: Crowdin**
- Upload `translation-template.json`
- Cost: ~$0.10/word × 5,760 words = $576
- Timeline: 1 week
- Quality: High (medical translators available)

### **Option 2: Lokalise**
- Upload `translation-template.json`
- Cost: ~$0.15/word × 5,760 words = $864
- Timeline: 1 week
- Quality: High (supports medical terminology)

### **Option 3: Phrase**
- Upload `translation-template.json`
- Cost: ~$0.12/word × 5,760 words = $691
- Timeline: 1 week
- Quality: High (TM + glossary support)

---

## 📁 Files Available

1. **translation-template.csv** (77 KB) - Google Sheets ready
2. **translation-template.json** (135 KB) - Professional services
3. **next-intl-template.json** (236 KB) - Darwin-MFC format
4. **TRANSLATION_GUIDE.md** (4.2 KB) - Detailed translator guide

---

## ✅ Checklist

### **Before Starting**
- [ ] Choose workflow (Google Sheets recommended)
- [ ] Upload template to Google Sheets
- [ ] Format spreadsheet (freeze, colors, validation)
- [ ] Recruit 8 translators
- [ ] Share guidelines with translators
- [ ] Set deadlines (1-2 weeks recommended)

### **During Translation**
- [ ] Monitor progress weekly
- [ ] Answer translator questions promptly
- [ ] Review completed sections
- [ ] Maintain terminology glossary

### **After Translation**
- [ ] Quality review all languages
- [ ] Export from Google Sheets
- [ ] Convert to next-intl format
- [ ] Integrate into Darwin-MFC
- [ ] Test all 9 languages
- [ ] Deploy to production

---

## 🎯 Success Criteria

- ✅ All 2,304 translations complete
- ✅ Medical accuracy verified
- ✅ Consistent terminology across modules
- ✅ Citations preserved correctly
- ✅ All languages display correctly in Darwin-MFC
- ✅ No encoding issues (UTF-8)

---

## 📞 Support

**Questions?** Contact project manager or post in Google Sheets comments.

**Timeline:** 1-2 weeks for complete translation workflow.

**Ready to start?** Upload `translation-template.csv` to Google Sheets now! 🚀

