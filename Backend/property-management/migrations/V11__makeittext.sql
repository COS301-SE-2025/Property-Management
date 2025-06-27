ALTER TABLE building
ALTER COLUMN primary_contractors TYPE uuid USING primary_contractors::uuid;
