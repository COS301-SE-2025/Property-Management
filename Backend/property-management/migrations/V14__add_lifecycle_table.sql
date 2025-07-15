CREATE TABLE lifecycle_cost (
    cost_uuid uuid NOT NULL DEFAULT gen_random_uuid(),
    coporate_uuid uuid NOT NULL,
    type varchar(50) NOT NULL,
    description text,
    condition text,
    timeframe text,
    estimated_cost numeric(10, 2),

    PRIMARY KEY (cost_uuid),
    CONSTRAINT fk_cost_coporate FOREIGN KEY (coporate_uuid) REFERENCES bodycoporate(coporate_uuid)
);
