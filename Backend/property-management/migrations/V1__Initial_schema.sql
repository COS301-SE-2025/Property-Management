CREATE TABLE public.budget (
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
ALTER TABLE public.budget OWNER TO postgres;

CREATE TABLE public.building (
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
ALTER TABLE public.building OWNER TO postgres;

CREATE SEQUENCE public.building_building_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.building_building_id_seq OWNER TO postgres;

ALTER SEQUENCE public.building_building_id_seq OWNED BY public.building.building_id;

CREATE TABLE public.buildingowner (
    id integer NOT NULL,
    trustee_id integer,
    building_id integer
);

ALTER TABLE public.buildingowner OWNER TO postgres;

ALTER TABLE public.buildingowner ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.buildingowner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.contractor (
    contractor_id integer NOT NULL,
    name character varying(255),
    phone character varying(10),
    banned boolean DEFAULT false,
    apikey character varying(255),
    email character varying(255)
);

ALTER TABLE public.contractor OWNER TO postgres;

CREATE SEQUENCE public.contractor_contractor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contractor_contractor_id_seq OWNER TO postgres;

ALTER SEQUENCE public.contractor_contractor_id_seq OWNED BY public.contractor.contractor_id;

CREATE TABLE public.contractorrating (
    rating_id integer NOT NULL,
    contractor_id integer,
    task_id integer,
    rated_by integer,
    rating integer,
    comment text,
    date_rated date,
    CONSTRAINT contractorrating_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);

ALTER TABLE public.contractorrating OWNER TO postgres;

CREATE SEQUENCE public.contractorrating_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contractorrating_rating_id_seq OWNER TO postgres;

--
-- Name: contractorrating_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contractorrating_rating_id_seq OWNED BY public.contractorrating.rating_id;


--
-- Name: inventoryitem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventoryitem (
    item_id integer NOT NULL,
    name character varying(255),
    unit character varying(50),
    quantity_in_stock integer,
    building_id integer
);


ALTER TABLE public.inventoryitem OWNER TO postgres;

--
-- Name: inventoryitem_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventoryitem_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventoryitem_item_id_seq OWNER TO postgres;

--
-- Name: inventoryitem_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventoryitem_item_id_seq OWNED BY public.inventoryitem.item_id;


--
-- Name: inventoryusage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventoryusage (
    usage_id integer NOT NULL,
    task_id integer,
    item_id integer,
    quantity_used integer,
    used_by_contractor_id integer,
    trustee_approved boolean DEFAULT false,
    approval_date date
);


ALTER TABLE public.inventoryusage OWNER TO postgres;

--
-- Name: inventoryusage_usage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventoryusage_usage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventoryusage_usage_id_seq OWNER TO postgres;

--
-- Name: inventoryusage_usage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventoryusage_usage_id_seq OWNED BY public.inventoryusage.usage_id;


--
-- Name: maintenancetask; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.maintenancetask (
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


ALTER TABLE public.maintenancetask_task_id_seq OWNER TO postgres;

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
    details jsonb
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


ALTER TABLE public.projecthistory_history_id_seq OWNER TO postgres;

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
    submitted_on timestamp with time zone,
    type character varying(255)
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


ALTER TABLE public.quote_quote_id_seq OWNER TO postgres;

--
-- Name: quote_quote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quote_quote_id_seq OWNED BY public.quote.quote_id;


--
-- Name: tenyearplan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenyearplan (
    plan_id integer NOT NULL,
    building_id integer,
    year integer,
    projected_maintenance_cost numeric(12,2),
    projected_inventory_cost numeric(12,2),
    notes text,
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


ALTER TABLE public.tenyearplan_plan_id_seq OWNER TO postgres;

--
-- Name: tenyearplan_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tenyearplan_plan_id_seq OWNED BY public.tenyearplan.plan_id;


--
-- Name: trustee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trustee (
    trustee_id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    phone character varying(10),
    apikey character varying(255)
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


ALTER TABLE public.trustee_trustee_id_seq OWNER TO postgres;

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
    vote boolean
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


ALTER TABLE public.trusteeapproval_approval_id_seq OWNER TO postgres;

--
-- Name: trusteeapproval_approval_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trusteeapproval_approval_id_seq OWNED BY public.trusteeapproval.approval_id;


--
-- Name: building building_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.building ALTER COLUMN building_id SET DEFAULT nextval('public.building_building_id_seq'::regclass);


--
-- Name: contractor contractor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contractor ALTER COLUMN contractor_id SET DEFAULT nextval('public.contractor_contractor_id_seq'::regclass);


--
-- Name: contractorrating rating_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contractorrating ALTER COLUMN rating_id SET DEFAULT nextval('public.contractorrating_rating_id_seq'::regclass);


--
-- Name: inventoryitem item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryitem ALTER COLUMN item_id SET DEFAULT nextval('public.inventoryitem_item_id_seq'::regclass);


--
-- Name: inventoryusage usage_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryusage ALTER COLUMN usage_id SET DEFAULT nextval('public.inventoryusage_usage_id_seq'::regclass);


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
-- Data for Name: budget; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.budget (budget_id, building_id, year, total_budget, maintenance_budget, inventory_budget, approved_by, approval_date, notes, inventory_spent, maintenance_spent) FROM stdin;
\.


--
-- Data for Name: building; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.building (building_id, name, address, complex_name, trustees, property_value, primary_contractors, latest_inspection_date, type, property_image) FROM stdin;
1	Sunset Towers	123 Main St, Pretoria	Green Valley Complex	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: buildingowner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buildingowner (id, trustee_id, building_id) FROM stdin;
\.


--
-- Data for Name: contractor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contractor (contractor_id, name, phone, banned, apikey, email) FROM stdin;
3	Jack	0123456789	f	d6q5d46qw54dq	jackfitnesss@gmail.com
\.


--
-- Data for Name: contractorrating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contractorrating (rating_id, contractor_id, task_id, rated_by, rating, comment, date_rated) FROM stdin;
\.


--
-- Data for Name: inventoryitem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventoryitem (item_id, name, unit, quantity_in_stock, building_id) FROM stdin;
\.


--
-- Data for Name: inventoryusage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventoryusage (usage_id, task_id, item_id, quantity_used, used_by_contractor_id, trustee_approved, approval_date) FROM stdin;
\.


--
-- Data for Name: maintenancetask; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.maintenancetask (task_id, building_id, title, description, status, scheduled_date, created_by, approved, proof_images) FROM stdin;
101	1	Fix Roof Leak	Leak in top floor apartment ceiling	PENDING	2025-06-01	3	f	{leak1.jpg,leak2.jpg}
\.


--
-- Data for Name: projecthistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projecthistory (history_id, task_id, event, "timestamp", details) FROM stdin;
\.


--
-- Data for Name: quote; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quote (quote_id, task_id, contractor_id, amount, submitted_on, type) FROM stdin;
\.


--
-- Data for Name: tenyearplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenyearplan (plan_id, building_id, year, projected_maintenance_cost, projected_inventory_cost, notes) FROM stdin;
\.


--
-- Data for Name: trustee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trustee (trustee_id, name, email, phone, apikey) FROM stdin;
3	Karabelo	ktaole04.w@gmail.com	0123456789	d65qw4d65aw4d6w4ad
4	Sean	seanM03@gmail.com	0987456321	65f465f13w84fe238
\.


--
-- Data for Name: trusteeapproval; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trusteeapproval (approval_id, quote_id, trustee_id, vote) FROM stdin;
\.


--
-- Name: building_building_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.building_building_id_seq', 2, true);


--
-- Name: buildingowner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.buildingowner_id_seq', 1, false);


--
-- Name: contractor_contractor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contractor_contractor_id_seq', 3, true);


--
-- Name: contractorrating_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contractorrating_rating_id_seq', 2, true);


--
-- Name: inventoryitem_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventoryitem_item_id_seq', 4, true);


--
-- Name: inventoryusage_usage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventoryusage_usage_id_seq', 2, true);


--
-- Name: maintenancetask_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.maintenancetask_task_id_seq', 2, true);


--
-- Name: projecthistory_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projecthistory_history_id_seq', 3, true);


--
-- Name: quote_quote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quote_quote_id_seq', 4, true);


--
-- Name: tenyearplan_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tenyearplan_plan_id_seq', 1, false);


--
-- Name: trustee_trustee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trustee_trustee_id_seq', 2, true);


--
-- Name: trusteeapproval_approval_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trusteeapproval_approval_id_seq', 2, true);


--
-- Name: building building_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.building
    ADD CONSTRAINT building_pkey PRIMARY KEY (building_id);


--
-- Name: buildingowner buildingowner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buildingowner
    ADD CONSTRAINT buildingowner_pkey PRIMARY KEY (id);


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
-- Name: inventoryitem inventoryitem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryitem
    ADD CONSTRAINT inventoryitem_pkey PRIMARY KEY (item_id);


--
-- Name: inventoryusage inventoryusage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryusage
    ADD CONSTRAINT inventoryusage_pkey PRIMARY KEY (usage_id);


--
-- Name: maintenancetask maintenancetask_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenancetask
    ADD CONSTRAINT maintenancetask_pkey PRIMARY KEY (task_id);


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
-- Name: tenyearplan tenyearplan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenyearplan
    ADD CONSTRAINT tenyearplan_pkey PRIMARY KEY (plan_id);


--
-- Name: trustee trustee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trustee
    ADD CONSTRAINT trustee_pkey PRIMARY KEY (trustee_id);


--
-- Name: trusteeapproval trusteeapproval_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trusteeapproval
    ADD CONSTRAINT trusteeapproval_pkey PRIMARY KEY (approval_id);


--
-- Name: buildingowner buildingowner_building_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buildingowner
    ADD CONSTRAINT buildingowner_building_id_fkey FOREIGN KEY (building_id) REFERENCES public.building(building_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: buildingowner buildingowner_trustee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buildingowner
    ADD CONSTRAINT buildingowner_trustee_id_fkey FOREIGN KEY (trustee_id) REFERENCES public.trustee(trustee_id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: inventoryitem inventoryitem_building_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryitem
    ADD CONSTRAINT inventoryitem_building_id_fkey FOREIGN KEY (building_id) REFERENCES public.building(building_id);


--
-- Name: inventoryusage inventoryusage_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryusage
    ADD CONSTRAINT inventoryusage_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.inventoryitem(item_id);


--
-- Name: inventoryusage inventoryusage_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryusage
    ADD CONSTRAINT inventoryusage_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.maintenancetask(task_id);


--
-- Name: inventoryusage inventoryusage_used_by_contractor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryusage
    ADD CONSTRAINT inventoryusage_used_by_contractor_id_fkey FOREIGN KEY (used_by_contractor_id) REFERENCES public.contractor(contractor_id);


--
-- Name: maintenancetask maintenancetask_building_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenancetask
    ADD CONSTRAINT maintenancetask_building_id_fkey FOREIGN KEY (building_id) REFERENCES public.building(building_id);


--
-- Name: maintenancetask maintenancetask_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenancetask
    ADD CONSTRAINT maintenancetask_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.trustee(trustee_id);

ALTER TABLE ONLY public.projecthistory
    ADD CONSTRAINT projecthistory_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.maintenancetask(task_id);
ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES public.contractor(contractor_id);
ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.maintenancetask(task_id);
ALTER TABLE ONLY public.tenyearplan
    ADD CONSTRAINT tenyearplan_building_id_fkey FOREIGN KEY (building_id) REFERENCES public.building(building_id);
ALTER TABLE ONLY public.trusteeapproval
    ADD CONSTRAINT trusteeapproval_quote_id_fkey FOREIGN KEY (quote_id) REFERENCES public.quote(quote_id);

ALTER TABLE ONLY public.trusteeapproval
    ADD CONSTRAINT trusteeapproval_trustee_id_fkey FOREIGN KEY (trustee_id) REFERENCES public.trustee(trustee_id);
