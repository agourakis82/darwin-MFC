# Zenodo Upload Guide - Darwin-MFC v0.7.0

This guide provides step-by-step instructions for uploading Darwin-MFC v0.7.0 to Zenodo for DOI assignment.

## Prerequisites

1. **Zenodo Account**: Create an account at https://zenodo.org (or use ORCID login)
2. **GitHub Release**: Ensure the tag `v0.7.0` is pushed to GitHub
3. **Files Ready**: All documentation files are in place

## Step-by-Step Instructions

### 1. Access Zenodo

- Go to https://zenodo.org
- Login with your account (ORCID recommended)

### 2. Create New Upload

- Click "Upload" in the top menu
- Select "New Upload"

### 3. Fill Metadata

#### Basic Information

- **Upload Type**: Software
- **Title**: `Darwin-MFC: Interactive Global Guide for Family and Community Medicine Screening Guidelines`
- **Version**: `0.7.0`
- **Release Date**: `2025-12-25`
- **Description**: 
  ```
  Interactive web application for comparative analysis of population screening guidelines in Family and Community Medicine. Supports 9 languages (Portuguese, English, Spanish, French, Russian, Arabic, Chinese, Greek, Hindi) with health-system-specific adaptations. Features dual view (descriptive vs. critical analysis), traffic-light comparisons, integrated clinical calculators, interactive genogram/ecomap, and academic export (PDF, BibTeX, CSV). Content includes oncology/child/adult/neonatal/prenatal screenings, ~145 diseases, 50+ medications, and CID-11/HPO ontologies.
  ```

#### Creators

- **Name**: `Agourakis, Demetrios Chiuratto`
- **ORCID**: `0009-0001-8671-8878`
- **Affiliation**: `PUC-SP, Brazil`

#### Keywords

Add the following keywords (one per line):
```
family-medicine
primary-care
cancer-screening
global-health
open-science
nextjs
multilingual
hindi
np-ncd
india
medicina-de-familia
atencao-primaria
rastreamento-cancer
saude-global
ciencia-aberta
```

#### License

- **License**: `MIT`
- **Note**: Code is MIT, clinical content is CC-BY-4.0 (specify in description)

#### Related Identifiers

- **Relation**: `IsSupplementTo`
- **Identifier**: `https://github.com/agourakis82/darwin-mfc`
- **Relation Type**: `Repository`

### 4. Upload Files

You have two options:

#### Option A: Upload from GitHub (Recommended)

1. In Zenodo, go to "GitHub" section
2. Connect your GitHub account if not already connected
3. Select repository: `agourakis82/darwin-MFC`
4. Select release: `v0.7.0`
5. Zenodo will automatically create a new version with the release files

#### Option B: Manual Upload

1. Download the release as ZIP from GitHub:
   - Go to: https://github.com/agourakis82/darwin-MFC/releases/tag/v0.7.0
   - Click "Source code (zip)"
2. Upload the ZIP file to Zenodo
3. Ensure `CITATION.cff` is included in the root

### 5. Communities (Optional)

Add to communities:
- `medical-informatics` (if available)
- `open-science` (if available)

### 6. Review and Publish

1. Review all metadata
2. Ensure `CITATION.cff` is properly recognized
3. Click "Publish" (or "Reserve DOI" if you want to publish later)

### 7. Update CITATION.cff

After receiving the DOI:

1. The DOI will be in format: `10.5281/zenodo.XXXXXXX`
2. Update `CITATION.cff` in the repository:
   ```yaml
   doi: 10.5281/zenodo.XXXXXXX
   identifiers:
     - type: doi
       value: 10.5281/zenodo.XXXXXXX
   ```
3. Commit and push the update
4. Create a new patch release (v0.7.1) with the updated DOI

### 8. Update README

Add the Zenodo badge to README.md:

```markdown
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.XXXXXXX.svg)](https://doi.org/10.5281/zenodo.XXXXXXX)
```

## Verification Checklist

- [ ] All metadata fields completed
- [ ] ORCID linked
- [ ] Keywords added
- [ ] License specified (MIT)
- [ ] Related identifier to GitHub repository
- [ ] Files uploaded (or GitHub release connected)
- [ ] CITATION.cff included
- [ ] Description is comprehensive
- [ ] Version number matches (0.7.0)
- [ ] Release date is correct (2025-12-25)

## Post-Upload Actions

1. **Update Repository**:
   - Add Zenodo DOI badge to README
   - Update CITATION.cff with actual DOI
   - Create v0.7.1 patch release with DOI update

2. **Announce Release**:
   - Update project website
   - Share on social media (if applicable)
   - Notify relevant communities

3. **Documentation**:
   - Update any documentation referencing the DOI placeholder
   - Add DOI to project website

## Troubleshooting

### CITATION.cff Not Recognized

- Ensure file is in repository root
- Check file format (YAML syntax)
- Verify cff-version is 1.2.0

### DOI Not Assigned

- Check if upload is published (not just reserved)
- Verify all required fields are filled
- Contact Zenodo support if issues persist

### GitHub Integration Issues

- Ensure GitHub account is connected in Zenodo settings
- Verify repository is public
- Check that release tag exists on GitHub

## Additional Resources

- [Zenodo Documentation](https://help.zenodo.org/)
- [CITATION.cff Specification](https://citation-file-format.github.io/)
- [FORCE11 Software Citation Principles](https://www.force11.org/software-citation-principles)

## Support

For issues with Zenodo upload:
- Zenodo Help: https://help.zenodo.org/
- Email: info@zenodo.org

For Darwin-MFC specific questions:
- GitHub Issues: https://github.com/agourakis82/darwin-mfc/issues
- ORCID: https://orcid.org/0009-0001-8671-8878

---

**Last Updated**: 2025-12-25  
**Version**: 0.7.0

