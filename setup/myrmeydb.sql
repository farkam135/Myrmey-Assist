--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 9.6.5

-- Started on 2017-10-20 20:09:19 PDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2164 (class 1262 OID 16385)
-- Name: myrmey; Type: DATABASE; Schema: -; Owner: myrmey
--

CREATE DATABASE myrmey WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE myrmey OWNER TO myrmey;

\connect myrmey

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12425)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2166 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 186 (class 1259 OID 16403)
-- Name: completed_courses; Type: TABLE; Schema: public; Owner: myrmey
--

CREATE TABLE completed_courses (
    id character varying(255) NOT NULL,
    course character varying(50)
);


ALTER TABLE completed_courses OWNER TO myrmey;

--
-- TOC entry 185 (class 1259 OID 16395)
-- Name: grades; Type: TABLE; Schema: public; Owner: myrmey
--

CREATE TABLE grades (
    id character varying(255) NOT NULL,
    year_term character varying(8) NOT NULL,
    dept character varying(15) NOT NULL,
    num character varying(6) NOT NULL,
    instructor character varying(50),
    grade character varying(2)
);


ALTER TABLE grades OWNER TO myrmey;

--
-- TOC entry 2042 (class 2606 OID 16407)
-- Name: completed_courses completed_courses_pk; Type: CONSTRAINT; Schema: public; Owner: myrmey
--

ALTER TABLE ONLY completed_courses
    ADD CONSTRAINT completed_courses_pk PRIMARY KEY (id);


--
-- TOC entry 2040 (class 2606 OID 16409)
-- Name: grades grades_pk; Type: CONSTRAINT; Schema: public; Owner: myrmey
--

ALTER TABLE ONLY grades
    ADD CONSTRAINT grades_pk PRIMARY KEY (id, year_term, dept, num);


-- Completed on 2017-10-20 20:09:19 PDT

--
-- PostgreSQL database dump complete
--

