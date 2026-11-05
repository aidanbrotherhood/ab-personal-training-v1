-- AB Personal Training: anonymous first-party funnel counts.
-- No visitor IP, email, fitness answers, cookies or advertising identifiers are stored.
-- booking_hash is an optional SHA-256 digest of the Calendly invitee URI for deduplication.
CREATE TABLE IF NOT EXISTS funnel_events (
  event_id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  event_type TEXT NOT NULL CHECK (event_type IN (
    'coaching_fit_started','coaching_fit_completed','coaching_fit_reset',
    'consultation_cta_clicked','booking_destination_viewed',
    'booking_calendar_viewed','booking_time_selected',
    'booking_completed_client_signal','contact_fallback_clicked'
  )),
  page TEXT NOT NULL,
  placement TEXT NOT NULL,
  package_id TEXT,
  from_coaching_fit INTEGER NOT NULL DEFAULT 0 CHECK (from_coaching_fit IN (0,1)),
  booking_hash TEXT UNIQUE
);
CREATE INDEX IF NOT EXISTS idx_funnel_events_created_type ON funnel_events(created_at,event_type);
CREATE INDEX IF NOT EXISTS idx_funnel_events_package ON funnel_events(event_type,package_id,from_coaching_fit);
