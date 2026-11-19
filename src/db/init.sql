-- Digital Pandharpur - SQLite Schema
-- Mirrors postgres_schema.sql with SQLite-compatible syntax

-- Saints (Venerable poets)
CREATE TABLE IF NOT EXISTS saints (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name_marathi TEXT NOT NULL,
    name_transliteration TEXT NOT NULL,
    period TEXT,
    biography TEXT,
    region TEXT,
    image_url TEXT,
    slug TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Deities (Vitthal, Shiva, Devi, etc.)
CREATE TABLE IF NOT EXISTS deities (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name_marathi TEXT NOT NULL,
    name_transliteration TEXT NOT NULL,
    icon_name TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- Festivals (Ashadhi Ekadashi, etc.)
CREATE TABLE IF NOT EXISTS festivals (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name_marathi TEXT NOT NULL,
    name_transliteration TEXT NOT NULL,
    date_rule TEXT,
    month_day_rule TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- Categories (Nested classification)
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name_marathi TEXT NOT NULL,
    name_transliteration TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    parent_category_id TEXT REFERENCES categories(id),
    description TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- Compositions (Core content)
CREATE TABLE IF NOT EXISTS compositions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    title_marathi TEXT NOT NULL,
    title_transliteration TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK(type IN (
        'abhang', 'aarti', 'bhajan', 'stotra', 'haripath',
        'gaulani', 'deviche_gane', 'bharud', 'kirtan',
        'namasmaran', 'powada'
    )),
    full_text TEXT NOT NULL,
    meaning TEXT,
    saint_id TEXT REFERENCES saints(id),
    deity_id TEXT REFERENCES deities(id),
    region TEXT,
    source_attribution TEXT,
    source_url TEXT,
    audio_links TEXT, -- JSON stored as TEXT (replaces JSONB)
    is_verified INTEGER DEFAULT 0, -- 0=false, 1=true (SQLite has no BOOLEAN)
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Junction tables for many-to-many relationships
CREATE TABLE IF NOT EXISTS composition_festivals (
    composition_id TEXT REFERENCES compositions(id) ON DELETE CASCADE,
    festival_id TEXT REFERENCES festivals(id) ON DELETE CASCADE,
    PRIMARY KEY (composition_id, festival_id)
);

CREATE TABLE IF NOT EXISTS composition_categories (
    composition_id TEXT REFERENCES compositions(id) ON DELETE CASCADE,
    category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (composition_id, category_id)
);

-- Saint relationships (related saints)
CREATE TABLE IF NOT EXISTS saint_relationships (
    saint_id TEXT REFERENCES saints(id) ON DELETE CASCADE,
    related_saint_id TEXT REFERENCES saints(id) ON DELETE CASCADE,
    relationship_type TEXT,
    PRIMARY KEY (saint_id, related_saint_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_compositions_type ON compositions(type);
CREATE INDEX IF NOT EXISTS idx_compositions_saint ON compositions(saint_id);
CREATE INDEX IF NOT EXISTS idx_compositions_search ON compositions(title_marathi, title_transliteration);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_category_id);

-- ============================================================
-- Seed Data
-- ============================================================

-- Deities
INSERT INTO deities (name_marathi, name_transliteration, icon_name) VALUES
('विठ्ठल', 'Vitthal', '🚩'),
('राम', 'Ram', '🌙'),
('कृष्ण', 'Krishna', '🐚'),
('शिव', 'Shiva', 'ॐ'),
('देवी', 'Devi', '🙏'),
('गणपती', 'Ganpati', '🌸'),
('अन्य', 'Other', '🕉️');

-- Festivals
INSERT INTO festivals (name_marathi, name_transliteration, date_rule, month_day_rule) VALUES
('आषाढी एकादशी', 'Ashadhi Ekadashi', 'आशाढी कृष्ण पक्षाची एकादशी', 'अशा एकादशी'),
('कार्तिकी एकादशी', 'Kartiki Ekadashi', 'कार्तिक कृष्ण पक्षाची एकादशी', 'कार्तिक एकादशी'),
('गणेश चतुर्थी', 'Ganesh Chaturthi', 'भाद्रपद शुक्ल चतुर्थी', 'गणेश चतुर्थी'),
('नवरात्री', 'Navratri', 'अश्विन शुक्ल पक्षाची पहिली दिवशी पाडवा', 'नवरात्री'),
('दत्त जयंती', 'Datta Jayanti', 'अश्विन कृष्ण पक्षाच्या पंचमी', 'दत्त जयंती'),
('राम नवमी', 'Ram Navami', 'चैत्र कृष्ण पक्षाची नवमी', 'राम नवमी'),
('हनुमान जयंती', 'Hanuman Jayanti', 'चैत्र शुक्ल पक्षाची पंचमी', 'हनुमान जयंती');

-- Categories
INSERT INTO categories (name_marathi, name_transliteration, slug, description) VALUES
('विठ्ठल', 'Vitthal', 'vitthal', 'विठ्ठल वर्षा आणि वारकरी सम्बन्धी साहित्य'),
('अभंग', 'Abhang', 'abhang', 'तुकाराम, ज्ञानेश्वर यांचे अभंग'),
('हरिपाठ', 'Haripath', 'haripath', 'नामदेव महाराजांचे हरिपाठ'),
('आरती', 'Aarti', 'aarti', 'देवी, देवतांच्या आरती'),
('स्तोत्र', 'Stotra', 'stotra', 'प्रार्थना आणि स्तोत्रगाथा'),
('भजन', 'Bhajan', 'bhajan', 'भक्ती भजने'),
('गौळणी', 'Gaulani', 'gaulani', 'गौळणी काव्ये'),
('देवीचे गाणे', 'Deviche Gane', 'deviche-gane', 'देवीची गाणी आणि स्तोत्रे'),
('कीर्तन', 'Kirtan', 'kirtan', 'कीर्तन साहित्य');

-- Saints (from seed.ts)
INSERT INTO saints (name_marathi, name_transliteration, period, region, biography) VALUES
('तुकाराम महाराज', 'Tukaram Maharaj', '१७वे शतक', 'देहू',
 'जगद्गुरू संत तुकाराम महाराज हे वारकरी संप्रदायातील शिरोमणी संत आहेत. त्यांचे अभंग विठ्ठलभक्ती, आत्मशोध आणि समाजप्रबोधनाने ओतप्रोत भरलेले आहेत. तुकाराम गाथा ही वारकरी भक्ती साहित्याचा अनमोल ठेवा आहे.'),
('ज्ञानेश्वर महाराज', 'Dnyaneshwar Maharaj', '१३वे शतक', 'आळंदी',
 'संत ज्ञानेश्वर महाराज (ज्ञानोबा माउली) हे वारकरी संप्रदायाचे आधारस्तंभ आहेत. त्यांनी भावार्थदीपिका (ज्ञानेश्वरी), अमृतानुभव आणि हरिपाठाची रचना करून भागवत धर्माचा पाया घातला.'),
('नामदेव महाराज', 'Namdev Maharaj', '१३-१४वे शतक', 'नरसी नामदेव, हिंगोली',
 'संत नामदेव महाराज हे वारकरी संप्रदायातील आद्य प्रचारक आणि कीर्तनाचे जनक मानले जातात. त्यांनी संपूर्ण भारतात भागवत धर्माची पताका फडकवली.'),
('एकनाथ महाराज', 'Eknath Maharaj', '१६वे शतक', 'पैठण',
 'संत एकनाथ महाराज हे पैठणचे थोर संत असून त्यांनी एकनाथी भागवत, भावार्थ रामायण, रुक्मिणी स्वयंवर आणि भारुडांची रचना केली.');
