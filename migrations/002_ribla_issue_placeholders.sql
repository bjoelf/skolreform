UPDATE content
SET
  slug = 'barns-basta',
  title = 'Barns bästa',
  summary = 'Plats för RiBLas inriktning och kommande text.',
  body_markdown = 'Texten utvecklas i nästa steg.',
  updated_at = CURRENT_TIMESTAMP
WHERE type = 'proposal' AND slug = 'kunskap-som-haller';

UPDATE content
SET
  slug = 'larande',
  title = 'Lärande',
  summary = 'Plats för RiBLas inriktning och kommande text.',
  body_markdown = 'Texten utvecklas i nästa steg.',
  updated_at = CURRENT_TIMESTAMP
WHERE type = 'proposal' AND slug = 'likvardiga-villkor';

UPDATE content
SET
  slug = 'samverkan',
  title = 'Samverkan',
  summary = 'Plats för RiBLas inriktning och kommande text.',
  body_markdown = 'Texten utvecklas i nästa steg.',
  updated_at = CURRENT_TIMESTAMP
WHERE type = 'proposal' AND slug = 'professionens-utrymme';