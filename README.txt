ACQUISORY CAREERS V3 — LIVE STATUS ADMIN

Deploy the entire extracted folder to Netlify using the project deployment interface (not just index.html). The project includes a Netlify Function and @netlify/blobs dependency.

1. In Netlify: Project configuration > Environment variables > Add variable.
   Key: ADMIN_PASSWORD
   Value: a unique, long private password of your choice. Never share it with candidates.
2. Deploy the full folder. For reliable dependency installation and function bundling, use a Git-connected Netlify deployment rather than a single-file Netlify Drop. Netlify Drop may not install dependencies or bundle the function.
3. Open https://YOUR-SITE.netlify.app/#admin
4. Enter the password, choose Open/Closed, click Save on each JD.
5. Public homepage displays every JD with status and filtering; each individual JD retains its link.

IMPORTANT: Initial state is CLOSED for all JDs until you approve them. This is intentional. All JDs remain visible. Backend status changes are stored in Netlify Blobs, not in the visitor's browser.

SECURITY: Password is validated server-side. This lightweight setup is for a single HR administrator, not a multi-user identity system. Netlify site project visibility is distinct from public deployment accessibility.
