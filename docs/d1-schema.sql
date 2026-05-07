CREATE TABLE IF NOT EXISTS submissions (
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

CREATE INDEX IF NOT EXISTS idx_submissions_type_created_at
  ON submissions (type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_submissions_status_created_at
  ON submissions (status, created_at DESC);

CREATE TABLE IF NOT EXISTS outbound_clicks (
  id TEXT PRIMARY KEY,
  tool_slug TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  source TEXT,
  clicked_at TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_outbound_clicks_tool_clicked_at
  ON outbound_clicks (tool_slug, clicked_at DESC);

CREATE INDEX IF NOT EXISTS idx_outbound_clicks_source_clicked_at
  ON outbound_clicks (source, clicked_at DESC);
