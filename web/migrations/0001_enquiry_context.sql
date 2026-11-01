-- The existing enquiries table and its records remain intact.
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  membership TEXT NOT NULL,
  availability TEXT,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'new'
);
CREATE TABLE IF NOT EXISTS enquiry_details (
  enquiry_id TEXT PRIMARY KEY REFERENCES enquiries(id) ON DELETE CASCADE,
  goal TEXT NOT NULL,
  package_interest TEXT NOT NULL,
  attribution TEXT NOT NULL DEFAULT '{}',
  notice_version TEXT NOT NULL,
  contact_acknowledged INTEGER NOT NULL CHECK (contact_acknowledged = 1)
);
CREATE INDEX IF NOT EXISTS enquiries_created_at ON enquiries(created_at);
