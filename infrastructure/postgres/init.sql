-- DARWIN-MFC DATABASE INITIALIZATION
-- ====================================
--
-- PostgreSQL initial schema for Darwin-MFC backend.
-- This creates the core tables and extensions needed.

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================================================
-- KEYCLOAK DATABASE
-- =============================================================================

CREATE DATABASE keycloak;

-- =============================================================================
-- DARWIN-MFC CORE TABLES
-- =============================================================================

-- Users table (synced with Keycloak)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    keycloak_id VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255),
    locale VARCHAR(10) DEFAULT 'pt',
    country_code VARCHAR(3),
    is_mentor BOOLEAN DEFAULT FALSE,
    specialization VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for username search
CREATE INDEX IF NOT EXISTS idx_users_username ON users USING gin (username gin_trgm_ops);

-- =============================================================================
-- LEARNING PROGRESS
-- =============================================================================

CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    learning_path_id VARCHAR(100) NOT NULL,
    module_id VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    score DECIMAL(5,2),
    time_spent_seconds INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    synced_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, learning_path_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_path ON user_progress(learning_path_id);

-- =============================================================================
-- CERTIFICATES
-- =============================================================================

CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    learning_path_id VARCHAR(100) NOT NULL,
    certificate_number VARCHAR(50) UNIQUE NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verification_hash VARCHAR(64) NOT NULL,
    UNIQUE(user_id, learning_path_id)
);

-- =============================================================================
-- FAVORITES
-- =============================================================================

CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('disease', 'medication', 'protocol', 'screening', 'calculator')),
    item_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    synced_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, item_type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- =============================================================================
-- NOTES
-- =============================================================================

CREATE TABLE IF NOT EXISTS notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL,
    item_id VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    synced_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, item_type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_notes_user ON notes(user_id);

-- =============================================================================
-- FORUM
-- =============================================================================

CREATE TABLE IF NOT EXISTS forum_categories (
    id VARCHAR(50) PRIMARY KEY,
    name_key VARCHAR(100) NOT NULL,
    description_key VARCHAR(200),
    sort_order INTEGER DEFAULT 0
);

-- Insert default categories
INSERT INTO forum_categories (id, name_key, description_key, sort_order) VALUES
    ('clinical', 'forum.categories.clinical', 'forum.categories.clinical_desc', 1),
    ('cases', 'forum.categories.cases', 'forum.categories.cases_desc', 2),
    ('study', 'forum.categories.study', 'forum.categories.study_desc', 3),
    ('regional', 'forum.categories.regional', 'forum.categories.regional_desc', 4)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS forum_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id VARCHAR(50) NOT NULL REFERENCES forum_categories(id),
    locale VARCHAR(10) DEFAULT 'pt',
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    is_case BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_category ON forum_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_author ON forum_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_locale ON forum_posts(locale);
CREATE INDEX IF NOT EXISTS idx_posts_title ON forum_posts USING gin (title gin_trgm_ops);

CREATE TABLE IF NOT EXISTS forum_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_solution BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_replies_post ON forum_replies(post_id);

-- =============================================================================
-- CLINICAL CASES (Anonymized)
-- =============================================================================

CREATE TABLE IF NOT EXISTS clinical_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    locale VARCHAR(10) DEFAULT 'pt',
    title VARCHAR(300) NOT NULL,
    presentation TEXT NOT NULL,
    age_range VARCHAR(20),
    gender VARCHAR(20),
    diagnosis_codes TEXT[], -- Array of ICD/ICPC codes
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published', 'rejected')),
    review_notes TEXT,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cases_author ON clinical_cases(author_id);
CREATE INDEX IF NOT EXISTS idx_cases_status ON clinical_cases(status);

-- =============================================================================
-- MENTORSHIP
-- =============================================================================

CREATE TABLE IF NOT EXISTS mentorship (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mentee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    specialization VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'declined')),
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(mentor_id, mentee_id)
);

CREATE INDEX IF NOT EXISTS idx_mentorship_mentor ON mentorship(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_mentee ON mentorship(mentee_id);

CREATE TABLE IF NOT EXISTS mentorship_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentorship_id UUID NOT NULL REFERENCES mentorship(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_mentorship ON mentorship_messages(mentorship_id);

-- =============================================================================
-- SYNC QUEUE (Server-side)
-- =============================================================================

CREATE TABLE IF NOT EXISTS sync_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    store VARCHAR(50) NOT NULL,
    operation VARCHAR(20) NOT NULL CHECK (operation IN ('create', 'update', 'delete')),
    record_id VARCHAR(100) NOT NULL,
    payload JSONB,
    client_timestamp TIMESTAMP WITH TIME ZONE,
    server_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sync_user ON sync_log(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_timestamp ON sync_log(server_timestamp);

-- =============================================================================
-- FUNCTIONS
-- =============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON user_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON forum_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_replies_updated_at BEFORE UPDATE ON forum_replies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON clinical_cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update reply count on forum_posts
CREATE OR REPLACE FUNCTION update_reply_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE forum_posts SET reply_count = reply_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE forum_posts SET reply_count = reply_count - 1 WHERE id = OLD.post_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_post_reply_count
AFTER INSERT OR DELETE ON forum_replies
    FOR EACH ROW EXECUTE FUNCTION update_reply_count();

-- =============================================================================
-- GRANTS (for PocketBase connection)
-- =============================================================================

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO darwin_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO darwin_admin;
