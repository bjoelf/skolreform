# RiBLa

Webbplats och medlemsregister för Riksförbundet för barns lärande.

## Teknik

- Next.js med App Router och JavaScript
- React och Tailwind CSS
- SQLite via `better-sqlite3`
- Numrerade, transaktionella SQL-migreringar

## Lokal utveckling

Krav: Node.js 22 eller senare och npm.

```bash
npm install
cp .env.example .env.local
npm run db:migrate
npm run dev
```

Öppna `http://localhost:3000`.

## Kontroller

```bash
npm run lint
npm run build
```

Migreringar körs uttryckligen och ska köras före produktionsstart:

```bash
npm run db:migrate
npm start
```

Databas och uppladdade filer under `data/` respektive `uploads/` är lokala
driftdata och versionshanteras inte.

## Status

Den första publika ytan och databasschemat är implementerade. Registrering,
e-postverifiering, inloggning, medlemssidor och administration är ännu inte
aktiverade. Platshållartexter måste ersättas med organisationens godkända
underlag före lansering.
