# RiBLa development handoff

Last verified: 2026-10-07

## Project

- Public name: RiBLa - Riksförbundet för barns lärande
- Production domain: `https://ribla.org`
- Alternate hostname: `https://www.ribla.org`
- Framework: Next.js 16.3.8, React 19, JavaScript, App Router
- Database: SQLite through `better-sqlite3` 12.9.0
- Local project: `/Users/bjorn/dev/skolreform`

Read `AGENTS.md` before changing Next.js code. This project uses a newer Next.js version whose bundled documentation is under `node_modules/next/dist/docs/`.

## Raspberry Pi deployment

- Pi LAN address: `192.168.0.111`
- Application directory: `/home/bjorn/ribla/app`
- Database: `/home/bjorn/ribla/data/ribla.db`
- PM2 process: `ribla`
- Origin service: `http://localhost:3002`
- Another PM2 process, `shooting-tracker`, shares the Pi and must not be disturbed.

The application must be built on the Pi before PM2 is started. Verify that `.next/BUILD_ID` exists; starting without it previously caused a PM2 restart loop.

The database and other runtime data must remain outside the rsynced application tree. Exclude at least `.next`, `node_modules`, `.env*`, `data`, `uploads`, `.git`, and `.DS_Store` when syncing source.

## Cloudflare Tunnel

The tunnel is dashboard-managed. The existing `cloudflared` connector on the Pi needs no additional local configuration for these hostnames.

The tunnel has two published application routes:

| Public hostname | Service |
| --- | --- |
| `ribla.org` | `http://localhost:3002` |
| `www.ribla.org` | `http://localhost:3002` |

Both routes were verified through Cloudflare with HTTP 200. Cloudflare authoritative nameservers are `ada.ns.cloudflare.com` and `trey.ns.cloudflare.com`.

## Cloudflare error search

In the Cloudflare dashboard:

1. Open **DNS > Records**, search for `www`, and verify that the record exists and is proxied.
2. Open **Zero Trust > Networks > Connectors > Cloudflare Tunnels**.
3. Select the Raspberry Pi tunnel and confirm that the connector is healthy.
4. Inspect **Published application routes** and verify the hostnames and service above.
5. Open **Analytics & Logs > HTTP Traffic** for `ribla.org` and filter by hostname and status code.

Useful interpretations:

- No request in HTTP Traffic: DNS or client-side DNS cache problem.
- `1016`: missing or incorrect tunnel DNS route.
- `502`: Cloudflare reached the connector, but the service on port 3002 was unavailable.
- `404`: the request reached Next.js, but the requested path was not found.
- `200`: DNS, TLS, tunnel, and origin routing are working.

## Diagnostic commands

Check public DNS:

```bash
dig +short ribla.org A
dig +short www.ribla.org A
dig @ada.ns.cloudflare.com www.ribla.org A +noall +answer
```

Check public responses:

```bash
curl -sSIL --max-time 15 https://ribla.org
curl -sSIL --max-time 15 https://www.ribla.org
```

Bypass a stale local DNS cache and test Cloudflare directly:

```bash
curl -sSIL --max-time 15 \
  --resolve www.ribla.org:443:104.21.60.12 \
  https://www.ribla.org
```

Flush the macOS DNS cache if authoritative DNS works but the normal lookup does not:

```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

On the Pi, check the origin and PM2 without changing either process:

```bash
curl -sSIL http://localhost:3002
pm2 status
pm2 logs ribla --lines 100
```

## Local development

```bash
npm ci
npm run db:migrate
npm run dev
```

The local site is then available at `http://localhost:3000`.

Before deployment:

```bash
npm run lint
npm run build
```

## Current implementation state

- Public navigation and placeholder pages are implemented.
- Individual and organisation membership paths are present as placeholders.
- Authentication, member registration, administration, email, backups, and privacy lifecycle work are not implemented.
- The official root-level `logo.jpeg` is integrated locally and the local production build passes.
- Confirm whether the latest logo/header changes have been deployed to the Pi before assuming production matches the local tree.
- SQLite migrations are numbered under `migrations/` and applied with `npm run db:migrate`.

Do not rename the current default database filename without a migration plan; changing it can silently create a fresh empty database.