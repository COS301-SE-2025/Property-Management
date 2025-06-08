CREATE TABLE budget (
    budget_id integer NOT NULL,
    building_id integer,
    year integer,
    total_budget numeric(12,2),
    maintenance_budget numeric(12,2),
    inventory_budget numeric(12,2),
    approved_by integer,
    approval_date date,
    notes text,
    inventory_spent numeric(10,2) DEFAULT 0.00,
    maintenance_spent numeric(10,2) DEFAULT 0.00,
    CONSTRAINT budget_year_check CHECK ((year >= 2000))
);
ALTER TABLE budget OWNER TO postgres;

CREATE TABLE building (
    building_id integer NOT NULL,
    name character varying(255),
    address text,
    complex_name character varying(255),
    trustees integer[],
    property_value double precision,
    primary_contractors integer[],
    latest_inspection_date date,
    type character varying(255),
    property_image VARCHAR(255)
);
ALTER TABLE building OWNER TO postgres;

CREATE SEQUENCE building_building_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE building_building_id_seq OWNER TO postgres;

ALTER SEQUENCE building_building_id_seq OWNED BY building.building_id;

CREATE TABLE buildingowner (
    id integer NOT NULL,
    trustee_id integer,
    building_id integer
);

ALTER TABLE buildingowner OWNER TO postgres;

ALTER TABLE buildingowner ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME buildingowner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE contractor (
    contractor_id integer NOT NULL,
    name character varying(255),
    phone character varying(10),
    banned boolean DEFAULT false,
    apikey character varying(255),
    email character varying(255)
);

ALTER TABLE contractor OWNER TO postgres;

CREATE SEQUENCE contractor_contractor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractor_contractor_id_seq OWNER TO postgres;

ALTER SEQUENCE contractor_contractor_id_seq OWNED BY contractor.contractor_id;

CREATE TABLE contractorrating (
    rating_id integer NOT NULL,
    contractor_id integer,
    task_id integer,
    rated_by integer,
    rating integer,
    comment text,
    date_rated date,
    CONSTRAINT contractorrating_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);

ALTER TABLE contractorrating OWNER TO postgres;

CREATE SEQUENCE contractorrating_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contractorrating_rating_id_seq OWNER TO postgres;

--
-- Name: contractorrating_rating_id_seq; Type: SEQUENCE OWNED BY; Schema:  Owner: postgres
--

ALTER SEQUENCE contractorrating_rating_id_seq OWNED BY contractorrating.rating_id;


--
-- Name: inventoryitem; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE inventoryitem (
    item_id integer NOT NULL,
    name character varying(255),
    unit character varying(50),
    quantity_in_stock integer,
    building_id integer
);


ALTER TABLE inventoryitem OWNER TO postgres;

--
-- Name: inventoryitem_item_id_seq; Type: SEQUENCE; Schema:  Owner: postgres
--

CREATE SEQUENCE inventoryitem_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE inventoryitem_item_id_seq OWNER TO postgres;

--
-- Name: inventoryitem_item_id_seq; Type: SEQUENCE OWNED BY; Schema:  Owner: postgres
--

ALTER SEQUENCE inventoryitem_item_id_seq OWNED BY inventoryitem.item_id;


--
-- Name: inventoryusage; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE inventoryusage (
    usage_id integer NOT NULL,
    task_id integer,
    item_id integer,
    quantity_used integer,
    used_by_contractor_id integer,
    trustee_approved boolean DEFAULT false,
    approval_date date
);


ALTER TABLE inventoryusage OWNER TO postgres;

--
-- Name: inventoryusage_usage_id_seq; Type: SEQUENCE; Schema:  Owner: postgres
--

CREATE SEQUENCE inventoryusage_usage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE inventoryusage_usage_id_seq OWNER TO postgres;

--
-- Name: inventoryusage_usage_id_seq; Type: SEQUENCE OWNED BY; Schema:  Owner: postgres
--

ALTER SEQUENCE inventoryusage_usage_id_seq OWNED BY inventoryusage.usage_id;


--
-- Name: maintenancetask; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE maintenancetask (
    task_id integer NOT NULL,
    building_id integer,
    title character varying(255),
    description text,
    status character varying(100),
    scheduled_date date,
    created_by integer,
    approved boolean DEFAULT false,
    proof_images text[]
);


ALTER TABLE maintenancetask OWNER TO postgres;

--
-- Name: maintenancetask_task_id_seq; Type: SEQUENCE; Schema:  Owner: postgres
--

CREATE SEQUENCE maintenancetask_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maintenancetask_task_id_seq OWNER TO postgres;

--
-- Name: maintenancetask_task_id_seq; Type: SEQUENCE OWNED BY; Schema:  Owner: postgres
--

ALTER SEQUENCE maintenancetask_task_id_seq OWNED BY maintenancetask.task_id;


--
-- Name: projecthistory; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE projecthistory (
    history_id integer NOT NULL,
    task_id integer,
    event text,
    "timestamp" timestamp without time zone,
    details jsonb
);


ALTER TABLE projecthistory OWNER TO postgres;

--
-- Name: projecthistory_history_id_seq; Type: SEQUENCE; Schema:  Owner: postgres
--

CREATE SEQUENCE projecthistory_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE projecthistory_history_id_seq OWNER TO postgres;

--
-- Name: projecthistory_history_id_seq; Type: SEQUENCE OWNED BY; Schema:  Owner: postgres
--

ALTER SEQUENCE projecthistory_history_id_seq OWNED BY projecthistory.history_id;


--
-- Name: quote; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE quote (
    quote_id integer NOT NULL,
    task_id integer,
    contractor_id integer,
    amount numeric(12,2),
    submitted_on timestamp with time zone,
    type character varying(255)
);


ALTER TABLE quote OWNER TO postgres;

--
-- Name: quote_quote_id_seq; Type: SEQUENCE; Schema:  Owner: postgres
--

CREATE SEQUENCE quote_quote_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE quote_quote_id_seq OWNER TO postgres;

--
-- Name: quote_quote_id_seq; Type: SEQUENCE OWNED BY; Schema:  Owner: postgres
--

ALTER SEQUENCE quote_quote_id_seq OWNED BY quote.quote_id;


--
-- Name: tenyearplan; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE tenyearplan (
    plan_id integer NOT NULL,
    building_id integer,
    year integer,
    projected_maintenance_cost numeric(12,2),
    projected_inventory_cost numeric(12,2),
    notes text,
    CONSTRAINT tenyearplan_year_check CHECK ((year >= 2000))
);


ALTER TABLE tenyearplan OWNER TO postgres;

--
-- Name: tenyearplan_plan_id_seq; Type: SEQUENCE; Schema:  Owner: postgres
--

CREATE SEQUENCE tenyearplan_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tenyearplan_plan_id_seq OWNER TO postgres;

--
-- Name: tenyearplan_plan_id_seq; Type: SEQUENCE OWNED BY; Schema:  Owner: postgres
--

ALTER SEQUENCE tenyearplan_plan_id_seq OWNED BY tenyearplan.plan_id;


--
-- Name: trustee; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE trustee (
    trustee_id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    phone character varying(10),
    apikey character varying(255)
);


ALTER TABLE trustee OWNER TO postgres;

--
-- Name: trustee_trustee_id_seq; Type: SEQUENCE; Schema:  Owner: postgres
--

CREATE SEQUENCE trustee_trustee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trustee_trustee_id_seq OWNER TO postgres;

--
-- Name: trustee_trustee_id_seq; Type: SEQUENCE OWNED BY; Schema:  Owner: postgres
--

ALTER SEQUENCE trustee_trustee_id_seq OWNED BY trustee.trustee_id;


--
-- Name: trusteeapproval; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE trusteeapproval (
    approval_id integer NOT NULL,
    quote_id integer,
    trustee_id integer,
    vote boolean
);


ALTER TABLE trusteeapproval OWNER TO postgres;

--
-- Name: trusteeapproval_approval_id_seq; Type: SEQUENCE; Schema:  Owner: postgres
--

CREATE SEQUENCE trusteeapproval_approval_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trusteeapproval_approval_id_seq OWNER TO postgres;

--
-- Name: trusteeapproval_approval_id_seq; Type: SEQUENCE OWNED BY; Schema:  Owner: postgres
--

ALTER SEQUENCE trusteeapproval_approval_id_seq OWNED BY trusteeapproval.approval_id;


--
-- Name: building building_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY building ALTER COLUMN building_id SET DEFAULT nextval('building_building_id_seq'::regclass);


--
-- Name: contractor contractor_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY contractor ALTER COLUMN contractor_id SET DEFAULT nextval('contractor_contractor_id_seq'::regclass);


--
-- Name: contractorrating rating_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY contractorrating ALTER COLUMN rating_id SET DEFAULT nextval('contractorrating_rating_id_seq'::regclass);


--
-- Name: inventoryitem item_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY inventoryitem ALTER COLUMN item_id SET DEFAULT nextval('inventoryitem_item_id_seq'::regclass);


--
-- Name: inventoryusage usage_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY inventoryusage ALTER COLUMN usage_id SET DEFAULT nextval('inventoryusage_usage_id_seq'::regclass);


--
-- Name: maintenancetask task_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY maintenancetask ALTER COLUMN task_id SET DEFAULT nextval('maintenancetask_task_id_seq'::regclass);


--
-- Name: projecthistory history_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY projecthistory ALTER COLUMN history_id SET DEFAULT nextval('projecthistory_history_id_seq'::regclass);


--
-- Name: quote quote_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY quote ALTER COLUMN quote_id SET DEFAULT nextval('quote_quote_id_seq'::regclass);


--
-- Name: tenyearplan plan_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY tenyearplan ALTER COLUMN plan_id SET DEFAULT nextval('tenyearplan_plan_id_seq'::regclass);


--
-- Name: trustee trustee_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY trustee ALTER COLUMN trustee_id SET DEFAULT nextval('trustee_trustee_id_seq'::regclass);


--
-- Name: trusteeapproval approval_id; Type: DEFAULT; Schema:  Owner: postgres
--

ALTER TABLE ONLY trusteeapproval ALTER COLUMN approval_id SET DEFAULT nextval('trusteeapproval_approval_id_seq'::regclass);


--
-- Data for Name: budget; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY budget (budget_id, building_id, year, total_budget, maintenance_budget, inventory_budget, approved_by, approval_date, notes, inventory_spent, maintenance_spent) FROM stdin;
\.


--
-- Data for Name: building; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY building (building_id, name, address, complex_name, trustees, property_value, primary_contractors, latest_inspection_date, type, property_image) FROM stdin;
1	Sunset Towers	123 Main St, Pretoria	Green Valley Complex	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: buildingowner; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY buildingowner (id, trustee_id, building_id) FROM stdin;
\.


--
-- Data for Name: contractor; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY contractor (contractor_id, name, phone, banned, apikey, email) FROM stdin;
3	Jack	0123456789	f	d6q5d46qw54dq	jackfitnesss@gmail.com
\.


--
-- Data for Name: contractorrating; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY contractorrating (rating_id, contractor_id, task_id, rated_by, rating, comment, date_rated) FROM stdin;
\.


--
-- Data for Name: inventoryitem; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY inventoryitem (item_id, name, unit, quantity_in_stock, building_id) FROM stdin;
\.


--
-- Data for Name: inventoryusage; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY inventoryusage (usage_id, task_id, item_id, quantity_used, used_by_contractor_id, trustee_approved, approval_date) FROM stdin;
\.


--
-- Data for Name: maintenancetask; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY maintenancetask (task_id, building_id, title, description, status, scheduled_date, created_by, approved, proof_images) FROM stdin;
101	1	Fix Roof Leak	Leak in top floor apartment ceiling	PENDING	2025-06-01	3	f	{leak1.jpg,leak2.jpg}
\.


--
-- Data for Name: projecthistory; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY projecthistory (history_id, task_id, event, "timestamp", details) FROM stdin;
\.


--
-- Data for Name: quote; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY quote (quote_id, task_id, contractor_id, amount, submitted_on, type) FROM stdin;
\.


--
-- Data for Name: tenyearplan; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY tenyearplan (plan_id, building_id, year, projected_maintenance_cost, projected_inventory_cost, notes) FROM stdin;
\.


--
-- Data for Name: trustee; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY trustee (trustee_id, name, email, phone, apikey) FROM stdin;
3	Karabelo	ktaole04.w@gmail.com	0123456789	d65qw4d65aw4d6w4ad
4	Sean	seanM03@gmail.com	0987456321	65f465f13w84fe238
\.


--
-- Data for Name: trusteeapproval; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY trusteeapproval (approval_id, quote_id, trustee_id, vote) FROM stdin;
\.


--
-- Name: building_building_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('building_building_id_seq', 2, true);


--
-- Name: buildingowner_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('buildingowner_id_seq', 1, false);


--
-- Name: contractor_contractor_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('contractor_contractor_id_seq', 3, true);


--
-- Name: contractorrating_rating_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('contractorrating_rating_id_seq', 2, true);


--
-- Name: inventoryitem_item_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('inventoryitem_item_id_seq', 4, true);


--
-- Name: inventoryusage_usage_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('inventoryusage_usage_id_seq', 2, true);


--
-- Name: maintenancetask_task_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('maintenancetask_task_id_seq', 2, true);


--
-- Name: projecthistory_history_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('projecthistory_history_id_seq', 3, true);


--
-- Name: quote_quote_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('quote_quote_id_seq', 4, true);


--
-- Name: tenyearplan_plan_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('tenyearplan_plan_id_seq', 1, false);


--
-- Name: trustee_trustee_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('trustee_trustee_id_seq', 2, true);


--
-- Name: trusteeapproval_approval_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('trusteeapproval_approval_id_seq', 2, true);


--
-- Name: building building_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY building
    ADD CONSTRAINT building_pkey PRIMARY KEY (building_id);


--
-- Name: buildingowner buildingowner_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY buildingowner
    ADD CONSTRAINT buildingowner_pkey PRIMARY KEY (id);


--
-- Name: contractor contractor_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY contractor
    ADD CONSTRAINT contractor_pkey PRIMARY KEY (contractor_id);


--
-- Name: contractorrating contractorrating_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY contractorrating
    ADD CONSTRAINT contractorrating_pkey PRIMARY KEY (rating_id);


--
-- Name: inventoryitem inventoryitem_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY inventoryitem
    ADD CONSTRAINT inventoryitem_pkey PRIMARY KEY (item_id);


--
-- Name: inventoryusage inventoryusage_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY inventoryusage
    ADD CONSTRAINT inventoryusage_pkey PRIMARY KEY (usage_id);


--
-- Name: maintenancetask maintenancetask_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY maintenancetask
    ADD CONSTRAINT maintenancetask_pkey PRIMARY KEY (task_id);


--
-- Name: projecthistory projecthistory_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY projecthistory
    ADD CONSTRAINT projecthistory_pkey PRIMARY KEY (history_id);


--
-- Name: quote quote_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY quote
    ADD CONSTRAINT quote_pkey PRIMARY KEY (quote_id);


--
-- Name: tenyearplan tenyearplan_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY tenyearplan
    ADD CONSTRAINT tenyearplan_pkey PRIMARY KEY (plan_id);


--
-- Name: trustee trustee_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY trustee
    ADD CONSTRAINT trustee_pkey PRIMARY KEY (trustee_id);


--
-- Name: trusteeapproval trusteeapproval_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY trusteeapproval
    ADD CONSTRAINT trusteeapproval_pkey PRIMARY KEY (approval_id);


--
-- Name: buildingowner buildingowner_building_id_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY buildingowner
    ADD CONSTRAINT buildingowner_building_id_fkey FOREIGN KEY (building_id) REFERENCES building(building_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: buildingowner buildingowner_trustee_id_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY buildingowner
    ADD CONSTRAINT buildingowner_trustee_id_fkey FOREIGN KEY (trustee_id) REFERENCES trustee(trustee_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: contractorrating contractorrating_contractor_id_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY contractorrating
    ADD CONSTRAINT contractorrating_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES contractor(contractor_id);


--
-- Name: contractorrating contractorrating_rated_by_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY contractorrating
    ADD CONSTRAINT contractorrating_rated_by_fkey FOREIGN KEY (rated_by) REFERENCES trustee(trustee_id);


--
-- Name: contractorrating contractorrating_task_id_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY contractorrating
    ADD CONSTRAINT contractorrating_task_id_fkey FOREIGN KEY (task_id) REFERENCES maintenancetask(task_id);


--
-- Name: inventoryitem inventoryitem_building_id_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY inventoryitem
    ADD CONSTRAINT inventoryitem_building_id_fkey FOREIGN KEY (building_id) REFERENCES building(building_id);


--
-- Name: inventoryusage inventoryusage_item_id_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY inventoryusage
    ADD CONSTRAINT inventoryusage_item_id_fkey FOREIGN KEY (item_id) REFERENCES inventoryitem(item_id);


--
-- Name: inventoryusage inventoryusage_task_id_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY inventoryusage
    ADD CONSTRAINT inventoryusage_task_id_fkey FOREIGN KEY (task_id) REFERENCES maintenancetask(task_id);


--
-- Name: inventoryusage inventoryusage_used_by_contractor_id_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY inventoryusage
    ADD CONSTRAINT inventoryusage_used_by_contractor_id_fkey FOREIGN KEY (used_by_contractor_id) REFERENCES contractor(contractor_id);


--
-- Name: maintenancetask maintenancetask_building_id_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY maintenancetask
    ADD CONSTRAINT maintenancetask_building_id_fkey FOREIGN KEY (building_id) REFERENCES building(building_id);


--
-- Name: maintenancetask maintenancetask_created_by_fkey; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY maintenancetask
    ADD CONSTRAINT maintenancetask_created_by_fkey FOREIGN KEY (created_by) REFERENCES trustee(trustee_id);

ALTER TABLE ONLY projecthistory
    ADD CONSTRAINT projecthistory_task_id_fkey FOREIGN KEY (task_id) REFERENCES maintenancetask(task_id);
ALTER TABLE ONLY quote
    ADD CONSTRAINT quote_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES contractor(contractor_id);
ALTER TABLE ONLY quote
    ADD CONSTRAINT quote_task_id_fkey FOREIGN KEY (task_id) REFERENCES maintenancetask(task_id);
ALTER TABLE ONLY tenyearplan
    ADD CONSTRAINT tenyearplan_building_id_fkey FOREIGN KEY (building_id) REFERENCES building(building_id);
ALTER TABLE ONLY trusteeapproval
    ADD CONSTRAINT trusteeapproval_quote_id_fkey FOREIGN KEY (quote_id) REFERENCES quote(quote_id);

ALTER TABLE ONLY trusteeapproval
    ADD CONSTRAINT trusteeapproval_trustee_id_fkey FOREIGN KEY (trustee_id) REFERENCES trustee(trustee_id);


CREATE TABLE image_meta(
    id varchar(255) NOT NULL,
    filename varchar(255) NOT NULL,
    url varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

ALTER TABLE maintenancetask
ADD COLUMN image_id varchar(255);

ALTER TABLE maintenancetask
ADD CONSTRAINT maintenance_images
FOREIGN KEY (image_id)
REFERENCES image_meta(id)
ON UPDATE CASCADE
ON DELETE NO ACTION;
