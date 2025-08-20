CREATE TABLE public.contractor_rating
(
    uuid uuid NOT NULL,
    contractor_uuid uuid,
    comment character varying(255),
    rating bigint,
    task_uuid uuid,
    trustee_uuid uuid,
    PRIMARY KEY (uuid),
    CONSTRAINT contractor FOREIGN KEY (contractor_uuid)
        REFERENCES public.contractor (contractor_uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "Trustee" FOREIGN KEY (trustee_uuid)
        REFERENCES public.trustee (trustee_uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "Task" FOREIGN KEY (task_uuid)
        REFERENCES public.maintenancetask (task_uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.contractor_rating
    OWNER to postgres;