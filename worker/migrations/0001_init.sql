-- One row per heart: which browser (a random id it made itself) picked which
-- session. Nothing else about the person is stored.
CREATE TABLE picks (
  device  TEXT NOT NULL,
  session TEXT NOT NULL,
  PRIMARY KEY (device, session)
);
CREATE INDEX picks_session ON picks (session);

-- When each browser first and last synced, for the admin page's sign-ups by day.
CREATE TABLE devices (
  device TEXT PRIMARY KEY,
  first  INTEGER NOT NULL,
  last   INTEGER NOT NULL
);
