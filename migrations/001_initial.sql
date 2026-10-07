CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  email_verified_at TEXT,
  membership_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (membership_status IN ('pending', 'active', 'ended', 'anonymized')),
  joined_at TEXT,
  ended_at TEXT,
  deletion_due_at TEXT,
  policy_version TEXT NOT NULL,
  policy_accepted_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

CREATE TABLE account_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  purpose TEXT NOT NULL CHECK (purpose IN ('verify_email', 'reset_password')),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_account_tokens_user_purpose ON account_tokens(user_id, purpose);

CREATE TABLE communication_consents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('newsletter')),
  granted INTEGER NOT NULL CHECK (granted IN (0, 1)),
  source TEXT NOT NULL,
  recorded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_consents_user_channel ON communication_consents(user_id, channel, recorded_at);

CREATE TABLE content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL CHECK (type IN ('page', 'proposal', 'article', 'member')),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  body_markdown TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'unpublished'
    CHECK (status IN ('unpublished', 'published')),
  hero_image_path TEXT,
  published_at TEXT,
  created_by INTEGER,
  updated_by INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_content_public_listing ON content(type, status, published_at DESC);

CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_by INTEGER,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE audit_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor_user_id INTEGER,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (actor_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_audit_events_created_at ON audit_events(created_at DESC);

INSERT INTO content (type, slug, title, summary, body_markdown, status, published_at)
VALUES
  (
    'proposal',
    'kunskap-som-haller',
    'Kunskap som håller över tid',
    'Skolans uppdrag behöver vara tydligt, långsiktigt och möjligt att följa upp.',
    'Ersätt den här texten med organisationens beslutade reformförslag.',
    'published',
    CURRENT_TIMESTAMP
  ),
  (
    'proposal',
    'likvardiga-villkor',
    'Likvärdiga villkor i hela landet',
    'Elevers möjligheter ska inte avgöras av postnummer eller huvudman.',
    'Ersätt den här texten med organisationens beslutade reformförslag.',
    'published',
    CURRENT_TIMESTAMP
  ),
  (
    'proposal',
    'professionens-utrymme',
    'Större utrymme för professionen',
    'Lärare och skolledare behöver mandat att ta ansvar för undervisningens kvalitet.',
    'Ersätt den här texten med organisationens beslutade reformförslag.',
    'published',
    CURRENT_TIMESTAMP
  );