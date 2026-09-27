# Digit Nepal Website

Company website and protected billing workspace for Digit Nepal built with Next.js, React, Tailwind CSS, Framer Motion, React Hook Form, and Zod.

## Structure

- `client/`: Next.js website and billing interface, deployed to Vercel.
- `server/`: billing API and authentication, deployed to Render.
- `shared/`: billing types, validation and calculations used by both.
- `scripts/`: billing integration checks and one-time SQLite migration.

## Requirements

- Node.js 24+
- npm 10+
- PostgreSQL 17+ (local or managed)

## Local development

Run `npm ci`, copy `.env.example` to `.env`, and set a dedicated PostgreSQL database URL plus a strong `ADMIN_PASSWORD`. Start the server with `npm run dev:server` and the client with `npm run dev` in separate terminals. The client runs at `http://localhost:3000`; the server runs at `http://localhost:4000`.

For Docker, set `POSTGRES_PASSWORD` and `ADMIN_PASSWORD` in `.env`, then run `docker compose up --build`. The client is available at `http://localhost:3001`. PostgreSQL data is stored in the named Docker volume.

## Deployment

1. Create a managed PostgreSQL database with production backups. Render's free PostgreSQL instances expire after 30 days, so use a lasting database plan/provider for billing data.
2. Create the Render web service from `render.yaml`. Set `DATABASE_URL` and a strong `ADMIN_PASSWORD` as secret environment variables. Keep `FRONTEND_ORIGIN=https://finance.digitnepal.com`.
3. Create a Vercel project from this repository. The root `vercel.json` builds `client/`. Set `BILLING_SERVER_URL` to the Render service HTTPS origin, with no trailing slash.
4. Attach `finance.digitnepal.com` to the Vercel project and add the DNS record Vercel specifies in Cloudflare. Verify the login, authenticated billing API, exports, and persistence after a Render restart.

The browser calls `/api/admin/*` on the Vercel domain; Next.js forwards those paths to Render. Sessions use an HttpOnly, Secure, SameSite=Strict cookie on the frontend domain. The Render API accepts state-changing requests only from `FRONTEND_ORIGIN`.

## Notes

- Public content is rendered by Next.js; admin authentication and billing requests are handled by the separate server.
- Contact, event registration, and career application forms work as frontend mailto flows.
- All public content is driven from local constants and fallback data inside `client/lib/`.


## Admin billing workspace

Open **Admin** beside **Start Your Project**, or `/admin`. The initial account is **admin** with the `ADMIN_PASSWORD` configured on the server. Set a unique password of at least 12 characters before the first login. Changing the environment later does not reset an existing account; change the password in Settings.

### Billing workflows

- **Quotations:** create/edit a draft, print or save PDF, record sent/accepted/declined status, and convert accepted quotations into invoice drafts once. Mark as sent records a status; it does not send email.
- **Invoices:** create/edit drafts, issue, duplicate, or void with a reason. Issued documents retain their client and company snapshots. Tax applies to the subtotal after the fixed discount; all amounts use NPR and are rounded to cents.
- **Payments:** record deposits and installments with date, method and reference. Overpayments are rejected. Each payment has a printable receipt. Reverse mistakes with an audit reason; reversing a record does not refund money.
- **Clients:** contact/PAN details, internal notes and printable statements showing all issued invoices and unreversed payments.
- **Projects and training:** agreed budgets with dated milestones/installments. Generate one draft per stage, review tax/terms, then issue it.
- **Service catalog:** reusable descriptions, rates and default tax. A single-line service selection fills the invoice tax rate; multi-line invoices use one editable tax rate across all lines.
- **Recurring:** monthly/yearly schedules based on issued invoices. When due, click Generate draft, then review and issue. Schedules do not run a background worker, charge clients, or send messages. Month-end dates retain the original day where possible.
- **Expenses and reports:** record costs by category/project; view collections, cash surplus and receivables aging. Date filters apply to invoice/quotation issue dates, payment dates and expense dates respectively. Outstanding balances are current; attention and aging cover all dates. Cash surplus is collections minus recorded expenses, not accounting profit.
- **Exports:** filtered invoice CSV, printable invoice/quotation/receipt/statement, and an Admin-only financial JSON export. Print dialogs support the browser's Save as PDF option.

New workspaces contain no demonstration transactions. Payment methods such as eSewa and Khalti describe manually recorded receipts; there is no payment gateway integration. Tax is user-entered; the app does not file taxes or integrate with government invoicing services.

### Accounts and storage

Admins manage company details, staff access and exports. Accountants manage billing records. Viewers can read and export financial records. Passwords are salted and scrypt-hashed; sessions are opaque, revocable, HttpOnly and SameSite=Strict, and expire after eight hours. Password changes and deactivation revoke existing sessions. Login throttling is stored in PostgreSQL.

Billing data, users, session hashes and the audit trail are stored in managed PostgreSQL. Billing updates lock the workspace row and commit with account changes in one transaction; request IDs prevent duplicate saves. Set up database backups and retention with the managed provider. The Admin JSON export contains billing records but not account credentials.

To migrate an existing version-2 SQLite workspace, keep the source database and its WAL file together, provision an empty PostgreSQL database, and run `SQLITE_PATH=/absolute/path/to/billing.sqlite DATABASE_URL=postgresql://... npm run migrate:billing` before the first production login. The importer refuses a destination containing accounts or billing records and does not copy sessions. Retain a separate copy of the SQLite database until the migrated workspace has been verified.

### Verification

Set `BILLING_TEST_DATABASE_URL` to a disposable PostgreSQL database whose name ends in `_test`, then run `npm run test:billing`. The suite clears that test database, starts the API on port 3101 (override with `BILLING_TEST_PORT`), and verifies authentication, roles, billing lifecycle, exports and persistence. Never point this variable at production data.
