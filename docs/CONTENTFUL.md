# Contentful — blog setup

The blog reads from a single Contentful space. Production (static, on
Cloudflare) uses the Delivery API; the preview environment (local dev /
Vercel) uses the Preview API so drafts are visible instantly.

## Content model: `blogPost`

Create a content type with **API identifier** `blogPost` and these fields
(the field IDs must match exactly — the code reads them by ID):

| Field ID        | Type                         | Notes                                  |
| --------------- | ---------------------------- | -------------------------------------- |
| `title`         | Short text (Symbol)          | Post title. Used as the entry name.    |
| `slug`          | Short text (Symbol)          | URL slug, e.g. `matrice-eisenhower`. Unique. |
| `excerpt`       | Long text / Short text       | 1–2 sentence summary (cards + SEO).    |
| `body`          | Rich text                    | The article. Embedded images allowed.  |
| `coverImage`    | Media (one asset)            | Cover image. Optional.                 |
| `tags`          | Short text, **list**         | Topic tags → `/blog/tag/<tag>`. Optional. |
| `publishedDate` | Date & time                  | Sort key (newest first) + shown date.  |
| `author`        | Short text (Symbol)          | Author name. Optional.                 |

Recommended validations: mark `title`, `slug`, `excerpt`, `body`,
`publishedDate` as required; make `slug` unique.

## Environment variables

See `.env.example`. Local dev needs a `.env.local`:

```
CONTENTFUL_SPACE_ID=xxxx
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_PREVIEW_TOKEN=xxxx
CONTENTFUL_PREVIEW=true
```

Production (GitHub Actions secrets, no preview):

```
CONTENTFUL_SPACE_ID
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_DELIVERY_TOKEN
```

## Publish flow

Draft in Contentful → visible instantly on the **preview** site → click
**Publish** → Contentful webhook triggers a production rebuild (~1–2 min)
→ live on virtuslever.com.
