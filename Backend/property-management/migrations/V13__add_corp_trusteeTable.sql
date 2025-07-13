CREATE TABLE trustee_bodycoporate_invite (
    invite_uuid uuid NOT NULL DEFAULT gen_random_uuid(),
    trustee_uuid uuid NOT NULL,
    coporate_uuid uuid NOT NULL,
    status varchar(50) NOT NULL DEFAULT 'PENDING', 
    invited_on timestamp DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(invite_uuid),
    CONSTRAINT fk_invite_trustee FOREIGN KEY (trustee_uuid) REFERENCES trustee(trustee_uuid),
    CONSTRAINT fk_invite_bodycoporate FOREIGN KEY (coporate_uuid) REFERENCES bodycoporate(coporate_uuid),
    
    UNIQUE (trustee_uuid, coporate_uuid) 
);

