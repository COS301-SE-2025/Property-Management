--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    phone character varying(50),
    cognito_id character varying(255),
    user_uuid uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: User_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_user_id_seq" OWNER TO postgres;

--
-- Name: User_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_user_id_seq" OWNED BY public."user".user_id;


--
-- Name: budget; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.budget (
    budget_id integer NOT NULL,
    year integer,
    total_budget numeric(12,2),
    maintenance_budget numeric(12,2),
    inventory_budget numeric(12,2),
    approved_by integer,
    approval_date date,
    notes text,
    inventory_spent numeric(10,2) DEFAULT 0.00,
    maintenance_spent numeric(10,2) DEFAULT 0.00,
    budget_uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    building_uuid_fk uuid,
    CONSTRAINT budget_year_check CHECK ((year >= 2000))
);


ALTER TABLE public.budget OWNER TO postgres;

--
-- Name: budget_budget_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.budget_budget_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.budget_budget_id_seq OWNER TO postgres;

--
-- Name: budget_budget_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.budget_budget_id_seq OWNED BY public.budget.budget_id;


--
-- Name: building; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.building (
    name character varying(255),
    address text,
    type character varying(255),
    property_value double precision,
    primary_contractors integer[],
    latest_inspection_date date,
    property_image text,
    complex_name character varying(255),
    building_uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    trustee_uuid uuid
);


ALTER TABLE public.building OWNER TO postgres;

--
-- Name: contractor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contractor (
    contractor_id integer NOT NULL,
    name character varying(255),
    contact_info text,
    tools_provided jsonb,
    banned boolean DEFAULT false,
    apikey character varying(255),
    email character varying(255),
    phone character varying(255),
    contractor_uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.contractor OWNER TO postgres;

--
-- Name: contractor_contractor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contractor_contractor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contractor_contractor_id_seq OWNER TO postgres;

--
-- Name: contractor_contractor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contractor_contractor_id_seq OWNED BY public.contractor.contractor_id;


--
-- Name: contractorrating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contractorrating (
    rating_id integer NOT NULL,
    contractor_id integer,
    task_id integer,
    rated_by integer,
    rating integer,
    comment text,
    date_rated date,
    rating_uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    CONSTRAINT contractorrating_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.contractorrating OWNER TO postgres;

--
-- Name: contractorrating_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contractorrating_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contractorrating_rating_id_seq OWNER TO postgres;

--
-- Name: contractorrating_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contractorrating_rating_id_seq OWNED BY public.contractorrating.rating_id;


--
-- Name: image_meta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image_meta (
    id character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    url character varying(255) NOT NULL
);


ALTER TABLE public.image_meta OWNER TO postgres;

--
-- Name: inventoryitem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventoryitem (
    name character varying(255),
    unit character varying(50),
    quantity_in_stock integer,
    building_id integer,
    item_uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    building_uuid_fk uuid NOT NULL
);


ALTER TABLE public.inventoryitem OWNER TO postgres;

--
-- Name: inventoryusage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventoryusage (
    quantity_used integer,
    trustee_approved boolean DEFAULT false,
    approval_date date,
    usage_uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    item_uuid uuid,
    task_uuid uuid,
    used_by_contractor_uuid uuid
);


ALTER TABLE public.inventoryusage OWNER TO postgres;

--
-- Name: maintenancetask; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.maintenancetask (
    task_id integer NOT NULL,
    title character varying(255),
    description text,
    status character varying(100),
    scheduled_date date,
    approved boolean DEFAULT false,
    proof_images text[],
    image_id character varying(255),
    task_uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    building_uuid uuid,
    created_by_uuid uuid
);


ALTER TABLE public.maintenancetask OWNER TO postgres;

--
-- Name: maintenancetask_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.maintenancetask_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.maintenancetask_task_id_seq OWNER TO postgres;

--
-- Name: maintenancetask_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.maintenancetask_task_id_seq OWNED BY public.maintenancetask.task_id;


--
-- Name: projecthistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projecthistory (
    history_id integer NOT NULL,
    task_id integer,
    event text,
    "timestamp" timestamp without time zone,
    details jsonb,
    history_uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    task_uuid uuid
);


ALTER TABLE public.projecthistory OWNER TO postgres;

--
-- Name: projecthistory_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projecthistory_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projecthistory_history_id_seq OWNER TO postgres;

--
-- Name: projecthistory_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projecthistory_history_id_seq OWNED BY public.projecthistory.history_id;


--
-- Name: quote; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quote (
    quote_id integer NOT NULL,
    task_id integer,
    contractor_id integer,
    amount numeric(12,2),
    document_url text,
    submitted_on timestamp(6) without time zone,
    status character varying(100),
    type character varying(255),
    quote_uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    task_uuid uuid,
    contractor_uuid uuid
);


ALTER TABLE public.quote OWNER TO postgres;

--
-- Name: quote_quote_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quote_quote_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quote_quote_id_seq OWNER TO postgres;

--
-- Name: quote_quote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quote_quote_id_seq OWNED BY public.quote.quote_id;


--
-- Name: tenyearplan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenyearplan (
    plan_id integer NOT NULL,
    year integer,
    projected_maintenance_cost numeric(12,2),
    projected_inventory_cost numeric(12,2),
    notes text,
    plan_uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    building_uuid uuid,
    CONSTRAINT tenyearplan_year_check CHECK ((year >= 2000))
);


ALTER TABLE public.tenyearplan OWNER TO postgres;

--
-- Name: tenyearplan_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tenyearplan_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tenyearplan_plan_id_seq OWNER TO postgres;

--
-- Name: tenyearplan_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tenyearplan_plan_id_seq OWNED BY public.tenyearplan.plan_id;


--
-- Name: trustee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trustee (
    trustee_id integer NOT NULL,
    user_id integer,
    is_owner boolean,
    role character varying(100),
    apikey character varying(255),
    email character varying(255),
    name character varying(255),
    phone character varying(10),
    trustee_uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    building_uuid uuid,
    user_uuid uuid
);


ALTER TABLE public.trustee OWNER TO postgres;

--
-- Name: trustee_trustee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trustee_trustee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trustee_trustee_id_seq OWNER TO postgres;

--
-- Name: trustee_trustee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trustee_trustee_id_seq OWNED BY public.trustee.trustee_id;


--
-- Name: trusteeapproval; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trusteeapproval (
    approval_id integer NOT NULL,
    quote_id integer,
    trustee_id integer,
    vote character varying(10),
    vote_date date
);


ALTER TABLE public.trusteeapproval OWNER TO postgres;

--
-- Name: trusteeapproval_approval_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trusteeapproval_approval_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trusteeapproval_approval_id_seq OWNER TO postgres;

--
-- Name: trusteeapproval_approval_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trusteeapproval_approval_id_seq OWNED BY public.trusteeapproval.approval_id;


--
-- Name: budget budget_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.budget ALTER COLUMN budget_id SET DEFAULT nextval('public.budget_budget_id_seq'::regclass);


--
-- Name: contractor contractor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contractor ALTER COLUMN contractor_id SET DEFAULT nextval('public.contractor_contractor_id_seq'::regclass);


--
-- Name: contractorrating rating_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contractorrating ALTER COLUMN rating_id SET DEFAULT nextval('public.contractorrating_rating_id_seq'::regclass);


--
-- Name: maintenancetask task_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenancetask ALTER COLUMN task_id SET DEFAULT nextval('public.maintenancetask_task_id_seq'::regclass);


--
-- Name: projecthistory history_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projecthistory ALTER COLUMN history_id SET DEFAULT nextval('public.projecthistory_history_id_seq'::regclass);


--
-- Name: quote quote_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote ALTER COLUMN quote_id SET DEFAULT nextval('public.quote_quote_id_seq'::regclass);


--
-- Name: tenyearplan plan_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenyearplan ALTER COLUMN plan_id SET DEFAULT nextval('public.tenyearplan_plan_id_seq'::regclass);


--
-- Name: trustee trustee_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trustee ALTER COLUMN trustee_id SET DEFAULT nextval('public.trustee_trustee_id_seq'::regclass);


--
-- Name: trusteeapproval approval_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trusteeapproval ALTER COLUMN approval_id SET DEFAULT nextval('public.trusteeapproval_approval_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public."User_user_id_seq"'::regclass);


--
-- Name: user User_cognito_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "User_cognito_id_key" UNIQUE (cognito_id);


--
-- Name: user User_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- Name: user User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);


--
-- Name: budget budget_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.budget
    ADD CONSTRAINT budget_pkey PRIMARY KEY (budget_id);


--
-- Name: building building_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.building
    ADD CONSTRAINT building_pkey PRIMARY KEY (building_uuid);


--
-- Name: building building_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.building
    ADD CONSTRAINT building_uuid_unique UNIQUE (building_uuid);


--
-- Name: contractor contractor_contractor_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contractor
    ADD CONSTRAINT contractor_contractor_uuid_unique UNIQUE (contractor_uuid);


--
-- Name: contractor contractor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contractor
    ADD CONSTRAINT contractor_pkey PRIMARY KEY (contractor_id);


--
-- Name: contractorrating contractorrating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contractorrating
    ADD CONSTRAINT contractorrating_pkey PRIMARY KEY (rating_id);


--
-- Name: image_meta image_meta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_meta
    ADD CONSTRAINT image_meta_pkey PRIMARY KEY (id);


--
-- Name: inventoryitem inventoryitem_item_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryitem
    ADD CONSTRAINT inventoryitem_item_uuid_unique UNIQUE (item_uuid);


--
-- Name: inventoryitem inventoryitem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryitem
    ADD CONSTRAINT inventoryitem_pkey PRIMARY KEY (item_uuid);


--
-- Name: inventoryusage inventoryusage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryusage
    ADD CONSTRAINT inventoryusage_pkey PRIMARY KEY (usage_uuid);


--
-- Name: maintenancetask maintenancetask_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenancetask
    ADD CONSTRAINT maintenancetask_pkey PRIMARY KEY (task_id);


--
-- Name: projecthistory projecthistory_history_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projecthistory
    ADD CONSTRAINT projecthistory_history_uuid_unique UNIQUE (history_uuid);


--
-- Name: projecthistory projecthistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projecthistory
    ADD CONSTRAINT projecthistory_pkey PRIMARY KEY (history_id);


--
-- Name: quote quote_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_pkey PRIMARY KEY (quote_id);


--
-- Name: quote quote_quote_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_quote_uuid_unique UNIQUE (quote_uuid);


--
-- Name: maintenancetask task_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenancetask
    ADD CONSTRAINT task_uuid_unique UNIQUE (task_uuid);


--
-- Name: tenyearplan tenyearplan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenyearplan
    ADD CONSTRAINT tenyearplan_pkey PRIMARY KEY (plan_id);


--
-- Name: tenyearplan tenyearplan_plan_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenyearplan
    ADD CONSTRAINT tenyearplan_plan_uuid_unique UNIQUE (plan_uuid);


--
-- Name: trustee trustee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trustee
    ADD CONSTRAINT trustee_pkey PRIMARY KEY (trustee_id);


--
-- Name: trustee trustee_trustee_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trustee
    ADD CONSTRAINT trustee_trustee_uuid_unique UNIQUE (trustee_uuid);


--
-- Name: trusteeapproval trusteeapproval_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trusteeapproval
    ADD CONSTRAINT trusteeapproval_pkey PRIMARY KEY (approval_id);


--
-- Name: inventoryusage usage_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryusage
    ADD CONSTRAINT usage_uuid_unique UNIQUE (usage_uuid);


--
-- Name: user user_user_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_user_uuid_unique UNIQUE (user_uuid);


--
-- Name: budget budget_approved_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.budget
    ADD CONSTRAINT budget_approved_by_fkey FOREIGN KEY (approved_by) REFERENCES public.trustee(trustee_id);


--
-- Name: budget budget_building_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.budget
    ADD CONSTRAINT budget_building_uuid_fkey FOREIGN KEY (building_uuid_fk) REFERENCES public.building(building_uuid) ON DELETE CASCADE;


--
-- Name: building building_trustee_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.building
    ADD CONSTRAINT building_trustee_uuid_fkey FOREIGN KEY (trustee_uuid) REFERENCES public.trustee(trustee_uuid);


--
-- Name: contractorrating contractorrating_contractor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contractorrating
    ADD CONSTRAINT contractorrating_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES public.contractor(contractor_id);


--
-- Name: contractorrating contractorrating_rated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contractorrating
    ADD CONSTRAINT contractorrating_rated_by_fkey FOREIGN KEY (rated_by) REFERENCES public.trustee(trustee_id);


--
-- Name: contractorrating contractorrating_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contractorrating
    ADD CONSTRAINT contractorrating_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.maintenancetask(task_id);


--
-- Name: inventoryitem inventoryitem_building_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryitem
    ADD CONSTRAINT inventoryitem_building_uuid_fkey FOREIGN KEY (building_uuid_fk) REFERENCES public.building(building_uuid) ON DELETE CASCADE;


--
-- Name: inventoryusage inventoryusage_item_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryusage
    ADD CONSTRAINT inventoryusage_item_uuid_fkey FOREIGN KEY (item_uuid) REFERENCES public.inventoryitem(item_uuid);


--
-- Name: inventoryusage inventoryusage_task_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryusage
    ADD CONSTRAINT inventoryusage_task_uuid_fkey FOREIGN KEY (task_uuid) REFERENCES public.maintenancetask(task_uuid);


--
-- Name: inventoryusage inventoryusage_used_by_contractor_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryusage
    ADD CONSTRAINT inventoryusage_used_by_contractor_uuid_fkey FOREIGN KEY (used_by_contractor_uuid) REFERENCES public.contractor(contractor_uuid);


--
-- Name: maintenancetask maintenance_images; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenancetask
    ADD CONSTRAINT maintenance_images FOREIGN KEY (image_id) REFERENCES public.image_meta(id) ON UPDATE CASCADE;


--
-- Name: projecthistory projecthistory_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projecthistory
    ADD CONSTRAINT projecthistory_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.maintenancetask(task_id);


--
-- Name: projecthistory projecthistory_task_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projecthistory
    ADD CONSTRAINT projecthistory_task_uuid_fkey FOREIGN KEY (task_uuid) REFERENCES public.maintenancetask(task_uuid);


--
-- Name: quote quote_contractor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES public.contractor(contractor_id);


--
-- Name: quote quote_contractor_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_contractor_uuid_fkey FOREIGN KEY (contractor_uuid) REFERENCES public.contractor(contractor_uuid);


--
-- Name: quote quote_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.maintenancetask(task_id);


--
-- Name: quote quote_task_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_task_uuid_fkey FOREIGN KEY (task_uuid) REFERENCES public.maintenancetask(task_uuid);


--
-- Name: tenyearplan tenyearplan_building_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenyearplan
    ADD CONSTRAINT tenyearplan_building_uuid_fkey FOREIGN KEY (building_uuid) REFERENCES public.building(building_uuid);


--
-- Name: trustee trustee_building_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trustee
    ADD CONSTRAINT trustee_building_uuid_fkey FOREIGN KEY (building_uuid) REFERENCES public.building(building_uuid);


--
-- Name: trustee trustee_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trustee
    ADD CONSTRAINT trustee_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


--
-- Name: trustee trustee_user_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trustee
    ADD CONSTRAINT trustee_user_uuid_fkey FOREIGN KEY (user_uuid) REFERENCES public."user"(user_uuid);


--
-- Name: trusteeapproval trusteeapproval_quote_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trusteeapproval
    ADD CONSTRAINT trusteeapproval_quote_id_fkey FOREIGN KEY (quote_id) REFERENCES public.quote(quote_id);


--
-- Name: trusteeapproval trusteeapproval_trustee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trusteeapproval
    ADD CONSTRAINT trusteeapproval_trustee_id_fkey FOREIGN KEY (trustee_id) REFERENCES public.trustee(trustee_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

