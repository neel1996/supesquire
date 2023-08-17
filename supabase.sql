-- Supabase project setup --
-- enable vector extension --
create extension vector;

-- create tables --
-- documents table to hold the document details --
create table public.documents (
    checksum character varying not null,
    content text null,
    embedding public.vector null,
    created_time timestamp without time zone null default (now() at time zone 'utc' :: text),
    document_name character varying not null,
    title character varying not null,
    created_by uuid null default auth.uid (),
    uploaded_object_id uuid null,
    constraint documents_pkey primary key (checksum),
    constraint documents_created_by_fkey foreign key (created_by) references auth.users (id) on delete cascade,
    constraint documents_uploaded_object_id_fkey foreign key (uploaded_object_id) references storage.objects (id) on delete cascade
) tablespace pg_default;

-- chat_records table to hold the chat messages --
create table public.chat_records (
    message text null,
    actor character varying not null,
    checksum character varying null,
    created_at timestamp with time zone not null default now(),
    id uuid not null default gen_random_uuid (),
    created_by uuid null default auth.uid (),
    constraint chat_records_pkey primary key (id),
    constraint chat_records_checksum_fkey foreign key (checksum) references documents (checksum) on delete cascade,
    constraint chat_records_created_by_fkey foreign key (created_by) references auth.users (id)
) tablespace pg_default;

-- creating the storage bucket to store the uploaded documents --
insert into
    storage.buckets (id, name, file_size_limit, allowed_mime_types)
values
    (
        'documents',
        'documents',
        52428800,
        ARRAY ['application/pdf']
    );

-- security policies for tables --
-- The application does not perform any update or delete operations on the tables --
-- so those are not included in the policies --
CREATE POLICY "Enable read access for authenticated users only" ON "public"."documents" AS PERMISSIVE FOR
SELECT
    TO authenticated USING (auth.uid() = created_by);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."documents" AS PERMISSIVE FOR
INSERT
    TO authenticated WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users only" ON "public"."chat_records" AS PERMISSIVE FOR
SELECT
    TO authenticated USING (auth.uid() = created_by);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."chat_records" AS PERMISSIVE FOR
INSERT
    TO authenticated WITH CHECK (true);

-- security policies for storage --
CREATE POLICY "Enable all for authenticated users only" ON "storage"."buckets" AS PERMISSIVE FOR ALL TO authenticated USING (true);

CREATE POLICY "Enable all for authenticated users only" ON "storage"."objects" AS PERMISSIVE FOR ALL TO authenticated USING (true);