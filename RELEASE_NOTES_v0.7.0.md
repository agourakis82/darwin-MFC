# Release Notes - Darwin-MFC v0.7.0 "Hindi Global Edition"

**Release Date**: December 25, 2025  
**Version**: 0.7.0  
**Codename**: Hindi Global Edition

---

## 🎉 Major Release Highlights

This release elevates Darwin-MFC to a **global open-source reference product** in Family and Community Medicine, with complete Hindi language support and integration of Indian NP-NCD guidelines.

### 🌍 Global Expansion

- **9th Language Added**: Full Hindi (हिंदी) support with Devanagari font rendering
- **Indian Guidelines Integration**: NP-NCD 2023-2030 operational guidelines for cancer screening
- **Comparative Analysis**: Brazil (SUS) vs USA (USPSTF) vs UK (NHS) vs India (NP-NCD)

### 📚 Academic Excellence

- **FORCE11-Compliant Citation**: Complete `CITATION.cff` (v1.2.0) for academic citation
- **Dual Licensing**: MIT (code) + CC-BY-4.0 (clinical content)
- **Graphical Abstracts**: 6 high-quality SVG abstracts for core modules
- **Professional Documentation**: Bilingual (EN-PT) README with international best practices

### 🎨 New Features

#### Hindi Language Support
- Complete UI translations (common, nav, header, sidebar, footer)
- Medical terminology for 145+ diseases
- 50+ medications with indications/contraindications
- Clinical protocols and cases
- Devanagari font support (Noto Sans Devanagari, Mukta)

#### Indian Guidelines (NP-NCD)
- **Breast Cancer**: CBE (Clinical Breast Examination) from 30+ years, annual
- **Cervical Cancer**: VIA (Visual Inspection with Acetic Acid) 30-65 years, every 3-5 years
- **Oral Cancer**: OVI (Oral Visual Inspection) from 30+ years, annual/biennial (new screening)
- **Hypertension**: Universal screening from 18+ years
- **Diabetes Type 2**: Screening from 30+ years with risk factors

#### Critical Analysis - Indian Context
- Low-cost methods emphasis (VIA, CBE, OVI)
- ASHA workers integration
- Rural access challenges
- High out-of-pocket costs analysis
- Comparison with Brazil, USA, and WHO guidelines

#### About the Author Section
- New `/about` page with author information
- Professional headshot placeholder
- ORCID, GitHub, LinkedIn/X links
- Multilingual support

### 📊 Graphical Abstracts

1. **Breast Cancer Screening Global Comparison** - Brazil/USA/UK/India/WHO
2. **Cervical Cancer Screening** - VIA (India) vs HPV-DNA (USA/Brazil) vs Cytology (Legacy)
3. **Oral Cancer Screening** - India Priority (Hindi + English)
4. **Hypertension Management in Primary Care** - Global guidelines alignment
5. **Interactive Genogram/Ecomap** - Family tools visualization
6. **Platform Overview** - Dual view + traffic lights + multilingual

### 🔧 Technical Improvements

#### Build Fixes
- Fixed multiple syntax errors in `expansao-nova-fase.ts`
- Corrected type mismatches in medication subclasses
- Fixed reference type issues
- Resolved import errors in disease index

#### Data Structure
- Extended `Recommendations` type with optional `india` field
- Added new `cancer-oral` screening
- Integrated Indian references (NP-NCD, MoHFW, ICMR, WHO India)

### 📁 New Files

```
messages/hi/
├── common.json
├── diseases.json
├── medications.json
├── protocols.json
└── clinical-cases.json

app/about/
└── page.tsx

app/components/About/
└── AboutAuthor.tsx

public/graphical-abstracts/
├── breast-cancer-global-comparison.svg
├── cervical-cancer-screening.svg
├── oral-cancer-screening-india.svg
├── hypertension-primary-care.svg
├── genogram-ecomap-interactive.svg
├── platform-overview.svg
└── README.md

CITATION.cff
LICENSE
CONTENT_LICENSE
.zenodo.json
```

### 📈 Statistics

- **9 languages** supported (PT, EN, ES, FR, RU, AR, ZH, EL, HI)
- **25 screenings** (including new oral cancer)
- **4 countries/systems** compared (Brazil/SUS, USA/USPSTF, UK/NHS, India/NP-NCD)
- **6 graphical abstracts** created
- **FORCE11-compliant** citation metadata

### 🔗 Links

- **Live Demo**: https://mfc.agourakis.med.br
- **Repository**: https://github.com/agourakis82/darwin-mfc
- **Zenodo DOI**: (to be added after upload)

### 🙏 Acknowledgments

Special thanks to the Indian medical community and NP-NCD developers for providing open guidelines that enabled this integration.

### 📝 Migration Notes

No breaking changes. All existing functionality remains intact. Hindi is available as a new language option.

### 🐛 Known Issues

None reported.

### 🔮 Next Steps (v1.0.0)

- PWA offline support
- Collaborative backend
- Additional country guidelines
- Enhanced graphical abstracts
- Mobile app (future)

---

**Full Changelog**: See [CHANGELOG.md](CHANGELOG.md)


