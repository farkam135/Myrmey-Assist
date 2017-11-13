--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 9.6.5

-- Started on 2017-10-30 00:14:31 PDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 185 (class 1259 OID 16413)
-- Name: completed_courses; Type: TABLE; Schema: public; Owner: myrmey
--

CREATE TABLE completed_courses (
    id character varying(255) NOT NULL,
    course character varying(50)
);

--
-- TOC entry 186 (class 1259 OID 16416)
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

--
-- TOC entry 187 (class 1259 OID 32770)
-- Name: planned_courses; Type: TABLE; Schema: public; Owner: myrmey
--

CREATE TABLE planned_courses (
    id character varying(255) NOT NULL,
    course character varying(50)
);

--
-- TOC entry 188 (class 1259 OID 40962)
-- Name: watchlist; Type: TABLE; Schema: public; Owner: myrmey
--

CREATE TABLE watchlist (
    email character varying(255) NOT NULL,
    code character varying(8) NOT NULL
);

--
-- TOC entry 2048 (class 2606 OID 16420)
-- Name: completed_courses completed_courses_pk; Type: CONSTRAINT; Schema: public; Owner: myrmey
--

ALTER TABLE ONLY completed_courses
    ADD CONSTRAINT completed_courses_pk PRIMARY KEY (id);


--
-- TOC entry 2050 (class 2606 OID 16422)
-- Name: grades grades_pk; Type: CONSTRAINT; Schema: public; Owner: myrmey
--

ALTER TABLE ONLY grades
    ADD CONSTRAINT grades_pk PRIMARY KEY (id, year_term, dept, num);


--
-- TOC entry 2052 (class 2606 OID 32774)
-- Name: planned_courses planned_courses_pk; Type: CONSTRAINT; Schema: public; Owner: myrmey
--

ALTER TABLE ONLY planned_courses
    ADD CONSTRAINT planned_courses_pk PRIMARY KEY (id);


--
-- TOC entry 2054 (class 2606 OID 40968)
-- Name: watchlist watchlist_pk; Type: CONSTRAINT; Schema: public; Owner: myrmey
--

ALTER TABLE ONLY watchlist
    ADD CONSTRAINT watchlist_pk PRIMARY KEY (email, code);


-- Completed on 2017-10-30 00:14:31 PDT

--
-- PostgreSQL database dump complete
--

