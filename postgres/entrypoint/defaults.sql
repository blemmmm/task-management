/* SCHEMA */

DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public;

/* TABLES */

CREATE TABLE public.tasks (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  "name" text,
  "description" text,
  "status" text,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

INSERT INTO public.tasks ("name", "description", "status", "created_at")
VALUES ('Paint a portrait', 'I want to paint a portrait.', 'completed', now()); 

INSERT INTO public.tasks ("name", "description", "status", "created_at")
VALUES ('Build a house', 'I want to build a house.', 'in_progress', now());

INSERT INTO public.tasks ("name", "description", "status", "created_at")
VALUES ('Write a book', 'I want to write a book.', 'planned', now());