
-- CREATE TABLE image_meta(
--     id varchar(255) NOT NULL,
--     filename varchar(255) NOT NULL,
--     url varchar(255) NOT NULL,
--     PRIMARY KEY(id)
-- );

-- ALTER TABLE maintenancetask
-- ADD COLUMN image_id varchar(255);

-- ALTER TABLE maintenancetask
-- ADD CONSTRAINT maintenance_images
-- FOREIGN KEY (image_id)
-- REFERENCES image_meta(id)
-- ON UPDATE CASCADE
-- ON DELETE NO ACTION;
