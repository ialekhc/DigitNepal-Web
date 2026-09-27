# Digit Nepal Website

Company website and protected billing workspace for Digit Nepal built with Next.js, React, Tailwind CSS, Framer Motion, React Hook Form, and Zod.

## Structure

```text
DigitNepal-Web/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── layouts/
│   ├── lib/
│   ├── public/
│   └── package.json
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

## Requirements

- Node.js 24+ (built-in SQLite support)
- npm 10+

## Local Development

```bash
npm install
npm run dev
```

Website runs at `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Docker

```bash
docker compose up --build
```

Website runs at `http://localhost:3001`.

## Notes

- Public content is frontend-rendered; admin authentication and billing use Next.js server routes.
- Contact, event registration, and career application forms work as frontend mailto flows.
- All public content is driven from local constants and fallback data inside `frontend/lib/`.


## Admin billing workspace

Open **Admin** beside **Start Your Project**, or `/admin`. The initial account is **admin** with password **Argentina** (case-sensitive). Change the password in Settings. `ADMIN_PASSWORD` can override the initial password before the database is created; changing the environment later does not reset an existing account.

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

Admins manage company details, staff access and backups. Accountants manage billing records. Viewers can read and export financial records. Each user can change their own password. Passwords are salted and scrypt-hashed; sessions are opaque, revocable, HttpOnly and SameSite=Strict, and expire after eight hours. Password changes and deactivation revoke existing sessions. Login throttling is stored in SQLite (five failed attempts per username in 15 minutes). Serve production over HTTPS for Secure session cookies.

Billing data, accounts, session hashes and the audit trail live in `frontend/.billing-data/billing.sqlite` when started through workspace commands. `BILLING_DATA_DIR` can select another absolute persistent directory. Docker Compose uses a named volume. The SQLite database uses WAL and transactional writes, unique numbering, request deduplication and optimistic checks when editing drafts/company details. Use one Node.js 24+ deployment with persistent local storage. Separate replicas or ephemeral/serverless hosts require a shared database design.

On the first load, an existing version-1 `billing.json` is validated and migrated automatically. The original is preserved and copied to `backups/legacy-*.json`. Previously paid invoices become issued invoices with payment receipts. Invalid legacy files are left untouched and reported as a storage error rather than overwritten.

### Backups and restore

After initialization and every successful billing mutation, SQLite creates a consistent full snapshot at `backups/billing-YYYY-MM-DD.sqlite`. Today's snapshot is replaced with the latest successful copy; previous days remain. Settings shows the latest backup date and any backup failure. These copies are on the same disk: copy snapshots to a separate secure location for device-failure recovery and manage retention according to your needs. Full snapshots contain password hashes and session records; restrict access to them.

To restore a full snapshot: stop the application, preserve the current data directory, place the chosen snapshot at `BILLING_DATA_DIR/billing.sqlite` in a clean directory (do not reuse an old `-wal` or `-shm` file), then restart with that directory. Restoring rolls the entire workspace and accounts back to that snapshot. With the server stopped, clear restored sessions using Node 24 to require fresh logins:

```js
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('/absolute/path/to/billing.sqlite');
db.exec('DELETE FROM sessions');
db.close();
```

The downloadable JSON is a portable financial export, not a full account/database restore file. No web restore endpoint is exposed.

### Verification

After `npm run build`, run `npm run test:billing`. The suite starts an isolated production server on port 3101 (override with `BILLING_TEST_PORT`) and verifies authentication, role enforcement, legacy migration, invoice lifecycle, payment boundaries, quotations, milestones, recurring dates, exports, backups and persistence. It never uses the live workspace data.
