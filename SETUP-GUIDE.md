# GoSailor CMS — Setup Guide
## Decap CMS on Netlify · Zero backend · Free forever

---

## What You're Getting

A password-protected admin panel at **gosailor.in/admin** where you can:

- ✅ Write and edit blog posts with a rich text editor (no HTML)
- ✅ Change your contact email and it updates live
- ✅ Edit homepage headline, subheading, announcement banners
- ✅ Update SEO titles and meta descriptions
- ✅ Manage the About page content
- ✅ Upload images directly from the dashboard
- ✅ Draft → Review → Publish workflow (won't go live until you hit Publish)

Every save commits directly to your GitHub repo → Netlify deploys in ~30 seconds.

---

## Files in This Package

```
admin/
  index.html          ← The CMS admin UI (add to your repo root)
  config.yml          ← Defines every editable field (add to your repo root)
netlify.toml          ← Replace your existing netlify.toml with this
_data/
  settings.json       ← Site-wide settings (email, TP marker, etc.)
  homepage.json       ← Homepage content
  seo.json            ← SEO titles and meta descriptions
  contact.json        ← Contact page content
  about.json          ← About page content
SETUP-GUIDE.md        ← This file
```

---

## Step 1 — Add Files to Your GitHub Repo

Open your GoSailor GitHub repo. Add these files/folders exactly as structured:

1. Drag `admin/` folder → drop into repo root
2. Drag `_data/` folder → drop into repo root
3. Replace your existing `netlify.toml` with the new one in this package

**Commit message suggestion:** `feat: add Decap CMS admin panel`

Netlify will auto-deploy. The `/admin` path now exists but login isn't wired yet — do Step 2 first.

---

## Step 2 — Enable Netlify Identity

1. Go to your **Netlify dashboard** → select the GoSailor site
2. Click **Site configuration** (left sidebar)
3. Click **Identity** → click **Enable Identity**
4. Under **Registration preferences** → set to **Invite only**
   _(This means only you can log in — no random signups)_
5. Under **External providers** — optionally enable Google login for easier sign-in

---

## Step 3 — Enable Git Gateway

Still in Netlify dashboard:

1. Go to **Site configuration → Identity → Services**
2. Click **Enable Git Gateway**

This is what lets the CMS write back to GitHub on your behalf without sharing your GitHub password.

---

## Step 4 — Invite Yourself

1. Go to **Identity tab** in your Netlify dashboard
2. Click **Invite users**
3. Enter your email address
4. You'll receive an email → click the link → set your password
5. You're now the CMS admin

---

## Step 5 — Log In to Your CMS

Go to: **https://gosailor.in/admin**

Log in with the email/password you just set up.

You'll see the full dashboard with:
- **Blog Posts** — create/edit/delete all posts
- **Site Settings** — general, homepage, SEO
- **Pages** — About, Contact

---

## Step 6 — Add Identity Widget to index.html (Important!)

Add this script tag to your main `index.html` just before `</head>`:

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

And add this script just before `</body>`:

```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

This handles the redirect back to `/admin` after login.

---

## How the Editorial Workflow Works

When you create or edit content in the CMS:

1. **Draft** — saved but not live, only visible in CMS
2. **In Review** — ready to check, still not live
3. **Ready** → click **Publish** — commits to GitHub, Netlify deploys, live in ~30 seconds

You can see all drafts under the **Workflow** tab in the CMS.

---

## Making Your Static Pages Read from _data JSON

Right now the CMS saves changes to `_data/*.json` files in GitHub — but your existing static HTML pages don't read from those files yet (they're hardcoded HTML).

**Option A — Quick manual approach:**
When you change something in the CMS, also open the relevant HTML file (e.g. `contact.html`) and update the value manually. The CMS gives you one source of truth for what the value *should* be.

**Option B — Full automation (recommended for later):**
Switch to Netlify's build pipeline using a lightweight template engine like **Eleventy (11ty)**. This lets your HTML templates read from `_data/*.json` automatically at build time. Setup takes ~2 hours and I can build the full config for you whenever you're ready.

For now, Option A gets you up and running immediately. The CMS for **blog posts** is fully automated — create a post in the CMS and it writes the HTML file to `/blog/` automatically.

---

## Blog Posts — How They Work

When you create a blog post in the CMS:

- It saves as a `.html` file inside your `/blog/` folder in GitHub
- The frontmatter (title, date, author, etc.) is saved as HTML comments at the top
- Netlify deploys it automatically
- The post is live at `gosailor.in/blog/post-slug.html`

**To show new posts on your homepage blog grid:** You'll need to add the post to the JS array in `index.html` (the `blogPosts` array). I can automate this with a small Netlify build script — just ask when you're ready.

---

## Image Uploads

In the CMS, when editing a blog post:
- Click the image icon in the rich text editor
- Upload directly from your computer
- Image is saved to `/images/uploads/` in your GitHub repo
- URL is auto-inserted into your post

---

## Troubleshooting

**Admin page shows but login doesn't work:**
→ Make sure you completed Step 3 (Enable Git Gateway)

**Changes save in CMS but don't appear on site:**
→ Check Netlify deploy log — look for errors. Usually a YAML formatting issue in config.yml.

**"Not authorized" error in CMS:**
→ You haven't accepted the invite email yet, or the Git Gateway isn't enabled.

**CMS shows but fields look wrong:**
→ Hard refresh the admin page (Ctrl+Shift+R / Cmd+Shift+R)

---

## Cost

| Service | Cost |
|---|---|
| Netlify Identity | Free up to 1,000 users |
| Git Gateway | Free |
| Decap CMS | Free, open source |
| Netlify hosting | Free (you already use this) |
| **Total** | **₹0 / $0 forever** |

---

## Next Steps (Optional Upgrades)

Once this is running, I can build:

- **Auto-update blog grid** — new posts auto-appear on homepage without touching index.html
- **Netlify Forms** — make your contact form actually send emails (10 min fix)
- **Eleventy integration** — full data-driven templates (contact email, SEO, homepage all auto-update)
- **Price alerts page** — basic email capture with Netlify Forms + Zapier to Gmail

---

*Built for GoSailor.in · Hyderabad, India · 2025*
