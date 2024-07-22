DROP DATABASE IF EXISTS cmsemployeetrackerdb;
CREATE DATABASE cmsemployeetrackerdb;

\c cmsemployeetrackerdb;

-- Creates scripts for department, roles, and employee tables.
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS public.roles
(
    id integer NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    title character varying(30) COLLATE pg_catalog."default" NOT NULL,
    department_id integer NOT NULL,
    salary numeric(8,2),
    CONSTRAINT roles_pkey PRIMARY KEY (id),
    CONSTRAINT department_fk FOREIGN KEY (department_id)
        REFERENCES public.departments (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.employees
(
    id integer NOT NULL DEFAULT nextval('employees_id_seq'::regclass),
    first_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    role_id integer,
    manager_id integer,
    CONSTRAINT employees_pkey PRIMARY KEY (id),
    CONSTRAINT manager_fk FOREIGN KEY (manager_id)
        REFERENCES public.employees (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT role_fk FOREIGN KEY (role_id)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

