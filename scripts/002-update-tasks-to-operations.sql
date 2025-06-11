-- Rename tasks table to operations and update schema
ALTER TABLE tasks RENAME TO operations;

-- Update column constraints to reflect security operations
ALTER TABLE operations 
  ALTER COLUMN title TYPE VARCHAR(150),
  ADD CONSTRAINT title_security_check CHECK (length(trim(title)) > 0 AND title !~ '[<>"\''&]'),
  ALTER COLUMN description TYPE TEXT,
  ADD CONSTRAINT description_security_check CHECK (description IS NULL OR (length(description) <= 1000 AND description !~ '[<>"\''&]')),
  DROP CONSTRAINT tasks_priority_check,
  ADD CONSTRAINT operations_priority_check CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  DROP CONSTRAINT tasks_status_check,
  ADD CONSTRAINT operations_status_check CHECK (status IN ('pending', 'active', 'monitoring', 'completed', 'failed'));

-- Add new security-specific columns
ALTER TABLE operations 
  ADD COLUMN operation_type VARCHAR(50) DEFAULT 'security_audit' CHECK (operation_type IN ('security_audit', 'threat_analysis', 'vulnerability_scan', 'incident_response', 'compliance_check', 'system_monitoring')),
  ADD COLUMN risk_level VARCHAR(20) DEFAULT 'medium' CHECK (risk_level IN ('minimal', 'low', 'medium', 'high', 'critical')),
  ADD COLUMN assigned_agent VARCHAR(100),
  ADD COLUMN estimated_duration INTEGER DEFAULT 60, -- in minutes
  ADD COLUMN completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100);

-- Update indexes
DROP INDEX IF EXISTS idx_tasks_user_id;
DROP INDEX IF EXISTS idx_tasks_status;
DROP INDEX IF EXISTS idx_tasks_priority;

CREATE INDEX IF NOT EXISTS idx_operations_user_id ON operations(user_id);
CREATE INDEX IF NOT EXISTS idx_operations_status ON operations(status);
CREATE INDEX IF NOT EXISTS idx_operations_priority ON operations(priority);
CREATE INDEX IF NOT EXISTS idx_operations_type ON operations(operation_type);
CREATE INDEX IF NOT EXISTS idx_operations_risk_level ON operations(risk_level);

-- Update RLS policies
DROP POLICY IF EXISTS "Users can only see their own tasks" ON operations;
DROP POLICY IF EXISTS "Users can only insert their own tasks" ON operations;
DROP POLICY IF EXISTS "Users can only update their own tasks" ON operations;
DROP POLICY IF EXISTS "Users can only delete their own tasks" ON operations;

CREATE POLICY "Users can only see their own operations" ON operations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own operations" ON operations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own operations" ON operations
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own operations" ON operations
    FOR DELETE USING (auth.uid() = user_id);

-- Update trigger
DROP TRIGGER IF EXISTS update_tasks_updated_at ON operations;
CREATE TRIGGER update_operations_updated_at 
    BEFORE UPDATE ON operations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
