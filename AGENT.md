# AGENT.md — tuananalytic.com (static export)

Notes for AI agents / maintainers working on this statically-exported WordPress site.

## Site overview
- Static HTML export of a WordPress blog (Astra theme). Each post/page is `<slug>/index.html`.
- Content is Vietnamese: data analytics, SQL, Python, AI tutorials.
- Monetized with Google AdSense (`ads.txt`, pub-5877339755641507) + Google Analytics.
- Every page shares an identical `<meta name="robots" ...>` tag in `<head>`.

---

## 2025 — AdSense "Low value content" remediation

### Problem
Google flagged the site for **Low value content** during AdSense review
("site does not yet meet the criteria... minimum content requirements / thin content").

Diagnosis (measured actual article-body word counts across all 60 pages):
- 11 pages under 300 words; 24 of 60 under 600 words.
- Several "posts" were essentially content-free: a single image
  (`cheatsheet...` = 13 words), an embed-only page (`race-chart...` = 71 words),
  or just a download link (`tai-lieu-tu-hoc-python...`, `python-rat-can-ban...`).
- 36 auto-generated archive pages (tag/category/author) + 20 pagination pages,
  all indexable — inflating the ratio of thin, no-original-content URLs.
- `robots.txt` was a 1-byte file (single space), giving no crawl guidance.

Reference (Google's own criteria):
- AdSense: https://support.google.com/adsense/answer/7299563 (unique, original content + good UX)
- Thin/scaled content: https://developers.google.com/search/docs/essentials/spam-policies

### Fix applied
Goal: keep the ~30 substantial 600–2,300-word tutorials indexable, and remove
thin/no-value pages from the index so the domain clears the quality bar.

1. **Added `noindex, follow` to 50 low-value pages** by replacing
   `<meta name="robots" content="max-image-preview:large, ...">`
   with `<meta name="robots" content="noindex, follow, max-image-preview:large, ...">`.
   `follow` is used so internal link equity still flows.

   - **Thin posts (10):** cheatsheet-of-data-truc-quan-hoa-than-thoai,
     race-chart-bieu-do-so-ca-covid19-o-tam-dich, tai-lieu-tu-hoc-python-data-science,
     python-rat-can-ban-chia-se-tai-lieu, group-chia-se-tai-lieu-tu-hoc-data-analysis,
     covid-19-api-du-lieu-covid19-theo-tinh-thanh, lam-the-nao-de-bat-kip-trends,
     dummy-data-la-gi, data-analyst-junior-jd, tu-hoc-sql-ham-inner-join
   - **Utility pages (3):** about, hire-me, donate
   - **All archive/pagination (37):** every `tag/**`, `category/**`, `author/**`,
     and `page/**` index.html

2. **Rewrote `robots.txt`** (was 1 byte) with Allow-all, disallow of
   `/wp-content/plugins/` and `/cdn-cgi/`, and a `Sitemap:` reference.

### Verified
- Homepage (`index.html`) and good tutorials (e.g. `case-when-trong-sql`)
  remain **indexable** (robots meta unchanged).
- Thin/archive pages now carry `content="noindex, follow, ..."`.
- `grep -rl 'content="noindex' --include=index.html .` → 50 pages.

### NOT indexable = do not add these back to the index
The 50 pages above are intentionally `noindex`. If you later expand a thin post
with genuine original content (aim 500+ words of your own analysis, not just a
link/embed), remove the `noindex, follow, ` prefix from its robots meta to
re-index it.

### If reapplying to AdSense
After Google recrawls, the indexed set should be ~30 substantial tutorials.
Optionally expand borderline posts before requesting another review.

---

## How the robots meta is templated
All pages contain the exact string:
`<meta name="robots" content="max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
To toggle indexing, prepend/remove `noindex, follow, ` inside `content="..."`.
Re-run a targeted `str.replace` script (see git history for the batch script).
