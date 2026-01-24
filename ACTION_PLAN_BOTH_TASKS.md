# 🎯 Action Plan: Tasks A & C in Parallel

**Date:** January 21, 2026  
**Status:** Both tasks in progress - here's your roadmap! 🚀

---

## 📋 **YOUR ACTION ITEMS (Next 30 Minutes)**

### **Task C: Set Up Google Sheets (10 min) - DO THIS FIRST!**

1. **Open Google Sheets** → [sheets.google.com](https://sheets.google.com)
2. **Create new spreadsheet** → Name: "Darwin-MFC Medical Translations - 2026"
3. **Import CSV:**
   - File → Import → Upload
   - Select: `lib/content-generation/output/translations/translation-template.csv`
   - Settings: Comma separator, DON'T convert text to numbers
   - Click Import
4. **Format (follow GOOGLE_SHEETS_SETUP_GUIDE.md):**
   - Freeze row 1 and columns A-E
   - Color header (dark blue), Portuguese column (yellow), translation columns (green)
   - Add data validation to translation columns
5. **Share link with me** → I'll verify it's set up correctly!

**Time:** 10 minutes  
**File to reference:** `GOOGLE_SHEETS_SETUP_GUIDE.md`

---

### **Task C: Start Translator Recruitment (20 min) - DO THIS SECOND!**

**Option 1: Upwork (Recommended - Fastest)**

1. Go to [upwork.com](https://upwork.com)
2. Post 8 jobs (one per language):
   - English, Spanish, French, Russian, Arabic, Chinese, Greek, Hindi
3. Use this template:

```
Title: Medical Translator - Portuguese to [LANGUAGE] - 288 Strings

Description:
Translate 288 medical strings for Darwin-MFC academic platform.

Domain: Primary care (diabetes, hypertension, asthma, etc.)
Format: Google Sheets (collaborative)
Volume: ~5,760 words
Rate: $0.10-0.15/word ($576-864 total)
Deadline: 1-2 weeks

Requirements:
- Native [LANGUAGE] speaker
- Medical background (student/professional preferred)
- Experience with medical terminology
- Preserve inline citations [1,2,3]

To apply: Translate these 3 sample strings:
1. "Diabetes mellitus tipo 2 é uma doença metabólica crônica [1,2]."
2. "Rastreamento recomendado para adultos ≥35 anos [3]."
3. "Prevalência global de 10,5% em adultos [4,5]."

Budget: $576-864
Timeline: 1-2 weeks
```

**Time:** 20 minutes (2-3 min per job post)  
**Cost:** $576-864 per language × 8 = $4,608-6,912 total  
**Timeline:** Translators respond in 1-2 days

---

**Option 2: Medical Schools (Free but slower)**

1. Email medical schools in target countries
2. Use template in `GOOGLE_SHEETS_SETUP_GUIDE.md`
3. Offer co-authorship credit

**Time:** 30 minutes  
**Cost:** Free  
**Timeline:** 3-5 days to recruit, 1-2 weeks to translate

---

## 🤖 **MY ACTION ITEMS (Next 2 Hours) - I'LL DO THESE!**

### **Task A: Integration Automation**

While you set up Google Sheets and recruit translators, I'll:

1. **✅ Fix validation script** (already created)
2. **⏳ Create merge script** to automatically add modules to `lib/data/rastreamentos.ts`
3. **⏳ Create reference extraction script** to add to `lib/data/references.ts`
4. **⏳ Test integration** with `npm run dev`
5. **⏳ Create deployment checklist**

**Estimated time:** 2 hours  
**Your involvement:** Review and approve before deployment

---

## 📊 **Progress Tracking**

### **Task A: Integration**
- [x] Integration script created
- [x] Modules transformed (32 modules, 299 references)
- [x] Validation script created
- [ ] Merge script created
- [ ] Reference extraction script created
- [ ] Merged into rastreamentos.ts
- [ ] References added to references.ts
- [ ] Tested in development
- [ ] Deployed to production

**Progress:** 40% → Target: 100% in 2.5 hours

---

### **Task C: Translations**
- [x] Translation infrastructure ready
- [x] Workflow guide created
- [x] Google Sheets setup guide created
- [ ] Google Sheet created and formatted ← **YOU DO THIS NOW!**
- [ ] Translators recruited ← **YOU DO THIS NOW!**
- [ ] Translations in progress
- [ ] Quality review complete
- [ ] Integrated into Darwin-MFC
- [ ] Deployed multilingual site

**Progress:** 20% → Target: 30% in 30 minutes (setup), 100% in 1-2 weeks (translation)

---

## ⏰ **Timeline**

### **Today (Next 30 min - YOU)**
- ✅ Set up Google Sheets (10 min)
- ✅ Post Upwork jobs or email medical schools (20 min)

### **Today (Next 2 hours - ME)**
- ✅ Create merge automation scripts
- ✅ Test integration
- ✅ Prepare for deployment

### **Tomorrow-3 Days**
- ✅ Review translator applications
- ✅ Select 8 translators
- ✅ Share Google Sheet and guidelines

### **Week 1-2**
- ✅ Translators work (parallel)
- ✅ Monitor progress weekly
- ✅ Answer questions

### **Week 2-3**
- ✅ Quality review translations
- ✅ Export and integrate
- ✅ Deploy multilingual site

---

## 🎯 **Success Criteria**

### **Task A (Integration)**
- [ ] All 32 modules in Darwin-MFC
- [ ] All 299 references added
- [ ] All modules searchable
- [ ] Production deployment successful
- [ ] No errors in console

### **Task C (Translations)**
- [ ] Google Sheet set up and shared
- [ ] 8 translators recruited
- [ ] 2,304 translations completed
- [ ] Quality review passed
- [ ] All 9 languages working

---

## 📁 **Files You Need**

**For Google Sheets Setup:**
- `lib/content-generation/output/translations/translation-template.csv` ← Upload this!
- `GOOGLE_SHEETS_SETUP_GUIDE.md` ← Follow this!

**For Translator Recruitment:**
- `TRANSLATION_WORKFLOW_GUIDE.md` ← Reference this!
- `lib/content-generation/output/translations/TRANSLATION_GUIDE.md` ← Send to translators!

**For Integration (I'll handle):**
- `lib/content-generation/output/darwin-mfc-modules.ts` ← Generated!
- `scripts/integrate-modules-to-darwin.ts` ← Created!

---

## 🚀 **START NOW!**

### **Step 1 (5 min):**
Open [sheets.google.com](https://sheets.google.com) and create the spreadsheet

### **Step 2 (5 min):**
Import `translation-template.csv` and format

### **Step 3 (20 min):**
Post Upwork jobs or email medical schools

### **Step 4:**
Reply here with "Google Sheet ready!" and share the link

---

## 💬 **Questions?**

**Q: Which recruitment option should I choose?**  
A: Upwork if you have budget ($4,608-6,912 total), medical schools if free/slower is OK

**Q: Can I do just a few languages first?**  
A: Yes! Start with English + Spanish (most users), add others later

**Q: How long will translations take?**  
A: 1-2 weeks with professional translators, 2-3 weeks with volunteers

**Q: What if I need help with Google Sheets?**  
A: Follow `GOOGLE_SHEETS_SETUP_GUIDE.md` step-by-step, or share your sheet and I'll help!

---

## ✅ **Ready? Let's Go!**

**Your next action:** Open Google Sheets and create the spreadsheet! 🚀

**My next action:** Create merge automation scripts while you work on Task C!

**Reply when done:** "Google Sheet ready!" or "Upwork jobs posted!" 🎉

