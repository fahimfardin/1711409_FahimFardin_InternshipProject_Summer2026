

CREATE TABLE IF NOT EXISTS public.locations
(
    id integer NOT NULL DEFAULT nextval('locations_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    country character varying(100) COLLATE pg_catalog."default" NOT NULL,
    state_province character varying(100) COLLATE pg_catalog."default",
    address text COLLATE pg_catalog."default",
    city character varying(100) COLLATE pg_catalog."default",
    zip_code character varying(20) COLLATE pg_catalog."default",
    client character varying(255) COLLATE pg_catalog."default",
    location_type character varying(100) COLLATE pg_catalog."default",
    status character varying(50) COLLATE pg_catalog."default" DEFAULT 'Active'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    contact_name character varying(255) COLLATE pg_catalog."default",
    phone_number character varying(50) COLLATE pg_catalog."default",
    work_orders integer NOT NULL DEFAULT 0,
    providers integer NOT NULL DEFAULT 0,
    CONSTRAINT locations_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.locations
    OWNER to postgres;



CREATE TABLE IF NOT EXISTS public.profiles
(
    id integer NOT NULL,
    first_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(50) COLLATE pg_catalog."default",
    city character varying(100) COLLATE pg_catalog."default",
    country character varying(100) COLLATE pg_catalog."default",
    role character varying(100) COLLATE pg_catalog."default",
    department character varying(100) COLLATE pg_catalog."default",
    about text COLLATE pg_catalog."default",
    status character varying(50) COLLATE pg_catalog."default" DEFAULT 'Active'::character varying,
    member_since date DEFAULT CURRENT_DATE,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    password character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT profiles_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profiles
    OWNER to postgres;