# GA4 Setup + Default Event Schema (Core Point Templates)

This guide covers:
- A solid default GA4 event schema for the current template pages
- Exactly where to get each required ID and permission

## 1) Recommended Tracking Architecture

Use **Google Tag Manager (GTM)** + **GA4**.
- Easier to maintain than hardcoding `gtag.js` in every template
- Lets you add/edit events without redeploying site code
- Better for scaling tracking across `Bootslander`, `bootslander-greenblue`, `Multi`, `QuickStart`, and `Serenity`

## 2) What You Need Before Implementation

1. GA4 Measurement ID (`G-XXXXXXXXXX`)
2. GTM Container ID (`GTM-XXXXXXX`) if using GTM
3. GA4 access (at least **Analyst** to verify, **Editor** to configure events/conversions)
4. GTM access (at least **Container Editor** + **Publish** for deployment)
5. Production domain list (and staging domain if any)

---

## 3) Where To Get Each Item

### A) GA4 Measurement ID
In Google Analytics:
1. Open **Admin** (gear icon)
2. Under **Property**, click **Data streams**
3. Open your **Web stream**
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### B) GA4 Access (who can view/configure)
If you need access from your admin:
1. In GA4, go to **Admin**
2. Choose either:
   - **Account Access Management** (broad access), or
   - **Property Access Management** (recommended scoped access)
3. Click **+** (Add users)
4. Enter your email and assign role:
   - **Analyst**: can validate reports/debug outcomes
   - **Editor**: can create/modify events and key events
   - **Administrator**: full control (only if needed)

### C) GTM Container ID + Access
In Google Tag Manager:
1. Open your container in tagmanager.google.com
2. Container ID appears as `GTM-XXXXXXX` (top area)
3. For access, admin goes to **Admin > User Management**
4. Add your email with:
   - **Container permissions**: Edit + Publish

### D) Verify Terms and Stream Health
- Confirm GA4 property is active and receiving data in **Realtime**
- Confirm your web stream exists for the correct domain

---

## 4) Default GA4 Event Schema (Recommended)

Keep names lowercase with underscores. Reuse GA4 recommended event names where possible.

## Core Events

| Event name | Trigger | Required params | Optional params | Mark as Key Event? |
|---|---|---|---|---|
| `page_view` | Automatic (Google tag) on each page load | `page_location`, `page_title` | `template_name`, `page_type` | No |
| `view_search_results` | If site search exists later | `search_term` | `results_count` | No |
| `scroll` | Enhanced Measurement (90% default) | `percent_scrolled` | `template_name`, `page_type` | No |
| `click_cta` | Any major CTA button click (hero/section/footer) | `cta_text`, `cta_location`, `destination_url` | `template_name`, `page_type` | No |
| `contact` | Click on contact intent actions (`mailto:`, `tel:`, WhatsApp) | `contact_method` (`email`/`phone`/`whatsapp`) | `link_text`, `destination` | Optional |
| `form_start` | User focuses first form input | `form_id`, `form_name` | `page_type` | No |
| `generate_lead` | Successful contact/newsletter form submit | `form_id`, `form_name` | `lead_type`, `page_type`, `template_name` | **Yes** |
| `form_error` | Form submit attempt returns validation/server error | `form_id`, `error_type` | `error_message` | No |
| `view_team_profile` | Click “View Profile” on leadership cards/modals | `profile_name`, `profile_role` | `template_name` | No |
| `select_service` | Click on service card / service detail link | `service_name` | `service_category`, `page_type` | Optional |
| `faq_expand` | FAQ item opened | `faq_question` | `faq_section` | No |
| `file_download` | Any downloadable file click (PDF, doc, etc.) | `file_name`, `file_extension` | `link_url` | Optional |

## Recommended Standard Params for Custom Events

Include these where applicable for consistency:
- `template_name` (`bootslander`, `bootslander_greenblue`, `multi`, `quickstart`, `serenity`)
- `page_type` (`home`, `about`, `services`, `team`, `contact`, `redirect`)
- `section_name` (`hero`, `about`, `services`, `team`, `faq`, `footer`)
- `cta_text`
- `destination_url`

## Suggested Key Events (Conversions)

Start with:
1. `generate_lead` (primary conversion)
2. `contact` where `contact_method=phone` (optional)
3. `contact` where `contact_method=whatsapp` (optional)

If you want stricter conversion quality, keep only `generate_lead` as Key Event initially.

---

## 5) Mapping for Current Templates

For current pages in this repo, implement at minimum:
- Contact forms: `form_start`, `generate_lead`, `form_error`
- CTA buttons: `click_cta`
- Leadership profile open: `view_team_profile`
- Service card/details clicks: `select_service`
- Contact links (`tel:`, `mailto:`, WhatsApp): `contact`
- FAQ accordion opens: `faq_expand`

---

## 6) QA Checklist After Setup

1. Open site with GA Debug enabled (Tag Assistant)
2. Confirm events appear in **GA4 Realtime** and **DebugView**
3. Test each critical flow:
   - CTA click
   - Form start + successful submit
   - Contact link clicks
   - Team profile modal open
4. In GA4 Admin, mark selected events as **Key events**
5. Validate event parameter names are consistent and typo-free

---

## 7) What To Send Me Next

To implement immediately, send:
1. `Measurement ID` (`G-...`)
2. `GTM Container ID` (`GTM-...`) or confirm direct `gtag.js` approach
3. Which events from this schema you want enabled on day 1
4. Which events to mark as Key Events
