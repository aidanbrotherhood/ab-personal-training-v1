CREATE TABLE IF NOT EXISTS enquiry_notifications (
 enquiry_id TEXT PRIMARY KEY REFERENCES enquiries(id) ON DELETE CASCADE,
 state TEXT NOT NULL DEFAULT 'pending', attempts INTEGER NOT NULL DEFAULT 0,
 next_attempt INTEGER NOT NULL DEFAULT (unixepoch()),
 created_at INTEGER NOT NULL DEFAULT (unixepoch()), updated_at INTEGER,
 provider_id TEXT
);
CREATE INDEX IF NOT EXISTS notification_pending ON enquiry_notifications(state,next_attempt);
