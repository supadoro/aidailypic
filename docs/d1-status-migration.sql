-- Run only if the D1 submissions table was already created with the old
-- status CHECK constraint: ('new', 'reviewing', 'done').

PRAGMA foreign_keys = off;

CREATE TABLE IF NOT EXISTS submissions_new (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('tool', 'contact', 'newsletter')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'candidate', 'reviewing', 'done', 'featured', 'hold')),
  created_at TEXT NOT NULL,
  email TEXT,
  name TEXT,
  title TEXT,
  url TEXT,
  category TEXT,
  audience TEXT,
  source TEXT,
  interest TEXT,
  summary TEXT,
  details TEXT,
  message TEXT,
  payload_json TEXT NOT NULL
);

INSERT INTO submissions_new (
  id, type, status, created_at, email, name, title, url, category,
  audience, source, interest, summary, details, message, payload_json
)
SELECT
  id, type, status, created_at, email, name, title, url, category,
  audience, source, interest, summary, details, message, payload_json
FROM submissions;

DROP TABLE submissions;

ALTER TABLE submissions_new RENAME TO submissions;

CREATE INDEX IF NOT EXISTS idx_submissions_type_created_at
  ON submissions (type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_submissions_status_created_at
  ON submissions (status, created_at DESC);

PRAGMA foreign_keys = on;
