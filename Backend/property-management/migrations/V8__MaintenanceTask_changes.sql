-- change column type
ALTER TABLE maintenancetask 
    ALTER COLUMN scheduled_date TYPE timestamp with time zone;
-- change column name
ALTER TABLE maintenancetask 
    RENAME COLUMN scheduled_date TO scheduled_date;
-- Change column comment
COMMENT ON COLUMN maintenancetask.scheduled_date IS 'comment';