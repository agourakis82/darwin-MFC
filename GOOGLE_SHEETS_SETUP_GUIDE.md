# 📊 Google Sheets Setup Guide - Quick Start (10 Minutes)

**Goal:** Set up collaborative translation spreadsheet for 32 modules → 8 languages

---

## 🚀 Step-by-Step Instructions

### **Step 1: Create Google Sheet (2 min)**

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **"+ Blank"** to create new spreadsheet
3. Rename to: **"Darwin-MFC Medical Translations - 2026"**

---

### **Step 2: Import CSV Template (2 min)**

1. In your new Google Sheet, click **File → Import**
2. Click **Upload** tab
3. Click **Browse** and select:
   ```
   lib/content-generation/output/translations/translation-template.csv
   ```
4. Import settings:
   - **Import location:** Replace spreadsheet
   - **Separator type:** Comma
   - **Convert text to numbers:** ❌ UNCHECK THIS!
   - Click **Import data**

---

### **Step 3: Format the Spreadsheet (3 min)**

**A. Freeze Header & Columns**
1. Click cell **F2** (first translation cell)
2. **View → Freeze → Up to row 1** (freeze header)
3. **View → Freeze → Up to column E** (freeze first 5 columns)

**B. Color Code Columns**
1. Select **Row 1** (header) → Right-click → **Format cells**
   - Background: Dark blue (#1a73e8)
   - Text: White
   - Bold

2. Select **Column E** (Portuguese source) → Right-click → **Format cells**
   - Background: Light yellow (#fff9c4)

3. Select **Columns F-M** (target languages) → Right-click → **Format cells**
   - Background: Light green (#d9ead3)

**C. Add Data Validation**
1. Select **Columns F-M** (all translation columns)
2. **Data → Data validation**
3. Settings:
   - Criteria: **Text** → **is not empty**
   - On invalid data: **Show warning**
   - Click **Save**

---

### **Step 4: Add Progress Tracking (2 min)**

1. Click **Sheet2** tab at bottom (or create new sheet)
2. Rename to: **"Progress Tracker"**
3. Copy this table:

| Language | Column | Translator | Email | Progress | Status | Deadline |
|----------|--------|-----------|-------|----------|--------|----------|
| English  | F      | [Name]    | [email] | 0/288 | Not Started | [Date] |
| Spanish  | G      | [Name]    | [email] | 0/288 | Not Started | [Date] |
| French   | H      | [Name]    | [email] | 0/288 | Not Started | [Date] |
| Russian  | I      | [Name]    | [email] | 0/288 | Not Started | [Date] |
| Arabic   | J      | [Name]    | [email] | 0/288 | Not Started | [Date] |
| Chinese  | K      | [Name]    | [email] | 0/288 | Not Started | [Date] |
| Greek    | L      | [Name]    | [email] | 0/288 | Not Started | [Date] |
| Hindi    | M      | [Name]    | [email] | 0/288 | Not Started | [Date] |

4. In **Progress** column (E2), add formula:
   ```
   =COUNTIF(Sheet1!F2:F289,"<>""")&"/288"
   ```
   (Replace F with column letter for each language)

---

### **Step 5: Share with Translators (1 min)**

1. Click **Share** button (top right)
2. Add translator emails
3. Set permissions:
   - **Option A:** Give each translator **Editor** access (they can edit their column)
   - **Option B:** Use **Protected ranges** (recommended):
     - **Data → Protect sheets and ranges**
     - Select each language column
     - Set permissions: Only specific translator can edit

4. Add message:
   ```
   Welcome to Darwin-MFC Medical Translation Project!
   
   Please translate the Portuguese text in Column E to [YOUR LANGUAGE] in Column [X].
   
   Guidelines:
   - Preserve medical accuracy
   - Keep inline citations [1,2,3] exactly as shown
   - Use formal, academic tone
   - Ask questions in comments if unclear
   
   Deadline: [DATE]
   
   Thank you!
   ```

---

## ✅ **You're Done! Sheet is Ready!**

**Next Steps:**
1. ✅ Google Sheet created and formatted
2. ⏳ Recruit translators (see recruitment guide below)
3. ⏳ Monitor progress weekly
4. ⏳ Quality review when complete

---

## 👥 **Quick Translator Recruitment Guide**

### **Option 1: Upwork (Fastest - 1-2 days)**

**Post Title:** "Medical Translator Needed - Portuguese to [LANGUAGE] - 288 Strings"

**Description:**
```
We need a medical translator for Darwin-MFC, an academic medical platform.

Task: Translate 288 medical strings from Portuguese to [LANGUAGE]
Domain: Primary care medical conditions (diabetes, hypertension, etc.)
Format: Google Sheets (collaborative)
Deadline: 1-2 weeks
Rate: $0.10-0.15 per word (~$150-200 total)

Requirements:
- Native [LANGUAGE] speaker
- Medical background (student/professional)
- Experience with medical terminology
- Attention to detail (preserve citations)

To apply: Send sample translation of 5 strings from attached CSV.
```

**Budget:** $150-200 per language × 8 = $1,200-1,600 total

---

### **Option 2: Medical Schools (Free - 3-5 days)**

**Email Template:**
```
Subject: Medical Translation Opportunity - Co-authorship Credit

Dear [Medical School/Department],

We're developing Darwin-MFC, an open-source academic medical platform 
for primary care (mfc.agourakis.med.br).

We're seeking medical students/residents who are native [LANGUAGE] 
speakers to translate 288 medical strings from Portuguese.

Benefits:
- Co-authorship credit on Darwin-MFC
- Portfolio piece for CV
- Contribute to global medical education
- ~10-15 hours work

Timeline: 1-2 weeks
Format: Google Sheets (collaborative)

Interested? Reply with your background and we'll send details.

Best regards,
Darwin-MFC Team
```

**Target:** Medical schools in Spain, France, Russia, China, Greece, India, Arab countries

---

### **Option 3: Reddit/Forums (Free - 1 week)**

**Post on:**
- r/medicalschool
- r/medicine
- r/translator
- Student Doctor Network
- Medical forums in target countries

**Post Template:**
```
[Volunteer Opportunity] Medical Translation for Open-Source Platform

We're building Darwin-MFC, an academic medical platform for primary care.

Need: Native [LANGUAGE] speakers with medical background to translate 
288 medical strings from Portuguese.

Time: ~10-15 hours over 1-2 weeks
Credit: Acknowledgment on Darwin-MFC platform
Format: Google Sheets (easy!)

Perfect for medical students building portfolio!

Interested? DM me!
```

---

## 📞 **Support**

**Questions?** Check `TRANSLATION_WORKFLOW_GUIDE.md` for detailed instructions.

**Ready to recruit?** Start with Upwork for fastest results! 🚀

---

**Estimated Setup Time:** 10 minutes  
**Estimated Recruitment Time:** 1-3 days  
**Estimated Translation Time:** 1-2 weeks

**You've got this! 💪**

