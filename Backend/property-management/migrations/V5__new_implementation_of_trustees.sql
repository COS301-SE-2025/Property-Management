CREATE TABLE buildingtrustee (
    building_uuid UUID NOT NULL,
    trustee_uuid UUID NOT NULL,
    PRIMARY KEY (building_uuid, trustee_uuid),
    FOREIGN KEY (building_uuid) REFERENCES building(building_uuid),
    FOREIGN KEY (trustee_uuid) REFERENCES trustee(trustee_uuid)
);

