-- =====================================================
-- DARWIN-MFC SEED DATA
-- =====================================================
--
-- Initial data for badges, achievements, and reference tables
--
-- =====================================================

-- =====================================================
-- BADGES
-- =====================================================

INSERT INTO public.badges (id, name, description, icon, category, criteria, xp_reward, rarity) VALUES
-- Learning badges
('first_case', 'First Case', 'Complete your first clinical case', '🎯', 'learning', '{"cases_completed": 1}', 50, 'common'),
('case_master', 'Case Master', 'Complete 50 clinical cases', '🏆', 'learning', '{"cases_completed": 50}', 500, 'rare'),
('pharmacology_novice', 'Pharmacology Novice', 'Study 10 different medications', '💊', 'learning', '{"medications_studied": 10}', 100, 'common'),
('pharmacology_expert', 'Pharmacology Expert', 'Study 100 different medications', '💉', 'learning', '{"medications_studied": 100}', 1000, 'epic'),
('disease_detective', 'Disease Detective', 'Study 20 different diseases', '🔬', 'learning', '{"diseases_studied": 20}', 200, 'uncommon'),
('protocol_master', 'Protocol Master', 'Review 15 clinical protocols', '📋', 'learning', '{"protocols_reviewed": 15}', 300, 'uncommon'),
('calculator_pro', 'Calculator Pro', 'Use 10 different clinical calculators', '🧮', 'learning', '{"calculators_used": 10}', 150, 'common'),

-- Practice badges
('daily_scholar', 'Daily Scholar', 'Study for 7 consecutive days', '📚', 'practice', '{"streak": 7}', 200, 'uncommon'),
('dedicated_learner', 'Dedicated Learner', 'Study for 30 consecutive days', '🔥', 'practice', '{"streak": 30}', 1000, 'rare'),
('marathon_student', 'Marathon Student', 'Study for 100 consecutive days', '⚡', 'practice', '{"streak": 100}', 5000, 'legendary'),
('quiz_ace', 'Quiz Ace', 'Score 100% on 5 quizzes', '✨', 'practice', '{"perfect_quizzes": 5}', 250, 'uncommon'),
('perfect_path', 'Perfect Path', 'Complete a learning path with 100% on all modules', '🌟', 'practice', '{"perfect_path_completion": 1}', 500, 'rare'),

-- Community badges
('helpful_peer', 'Helpful Peer', 'Receive 10 upvotes on comments', '🤝', 'community', '{"comment_upvotes": 10}', 150, 'common'),
('community_leader', 'Community Leader', 'Receive 100 upvotes on comments', '👑', 'community', '{"comment_upvotes": 100}', 1000, 'epic'),
('case_contributor', 'Case Contributor', 'Share 5 clinical cases', '📝', 'community', '{"cases_shared": 5}', 300, 'uncommon'),
('verified_educator', 'Verified Educator', 'Have 3 cases verified by moderators', '✓', 'community', '{"verified_cases": 3}', 500, 'rare'),

-- Milestone badges
('welcome', 'Welcome!', 'Create your account', '👋', 'milestone', '{"account_created": true}', 10, 'common'),
('level_10', 'Level 10 Reached', 'Reach level 10', '🎖️', 'milestone', '{"level": 10}', 500, 'uncommon'),
('level_25', 'Level 25 Reached', 'Reach level 25', '🏅', 'milestone', '{"level": 25}', 1500, 'rare'),
('level_50', 'Level 50 Reached', 'Reach level 50', '👨‍⚕️', 'milestone', '{"level": 50}', 5000, 'epic'),
('completionist', 'Completionist', 'Complete all available learning paths', '💯', 'milestone', '{"all_paths_completed": true}', 10000, 'legendary'),

-- Special badges
('early_adopter', 'Early Adopter', 'Join Darwin-MFC in its first year', '🚀', 'special', '{"joined_before": "2026-01-01"}', 1000, 'epic'),
('open_science_advocate', 'Open Science Advocate', 'Contribute to open medical education', '🔬', 'special', '{"contributions": 10}', 2000, 'legendary'),
('polyglot', 'Polyglot', 'Study content in 3 different languages', '🌍', 'special', '{"languages_used": 3}', 300, 'uncommon'),
('night_owl', 'Night Owl', 'Study between midnight and 6 AM on 5 occasions', '🦉', 'special', '{"night_sessions": 5}', 100, 'common'),
('weekend_warrior', 'Weekend Warrior', 'Study on 10 weekends', '⚔️', 'special', '{"weekend_sessions": 10}', 200, 'uncommon');

-- =====================================================
-- INITIAL MIGRATION TIMESTAMP
-- =====================================================

-- Track when seed was run
CREATE TABLE IF NOT EXISTS public.schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.schema_migrations (version) VALUES ('001_initial_schema');
INSERT INTO public.schema_migrations (version) VALUES ('002_seed_data');

-- =====================================================
-- END OF SEED DATA
-- =====================================================
