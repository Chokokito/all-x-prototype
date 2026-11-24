import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_categories_module_id" AS ENUM('treasury', 'gateway', 'compliance');
  CREATE TYPE "public"."enum_docs_pages_blocks_prerequisites_steps_highlight_type" AS ENUM('none', 'link', 'code');
  CREATE TYPE "public"."enum_docs_pages_blocks_api_endpoint_mode" AS ENUM('create', 'balance');
  CREATE TYPE "public"."enum_docs_pages_blocks_feature_grid_cards_variant" AS ENUM('green', 'copper');
  CREATE TYPE "public"."enum_docs_pages_method" AS ENUM('DOC', 'POST', 'GET', 'WSS', 'CORE', 'REST', 'SDK', 'v2.4');
  CREATE TYPE "public"."enum_docs_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__docs_pages_v_blocks_prerequisites_steps_highlight_type" AS ENUM('none', 'link', 'code');
  CREATE TYPE "public"."enum__docs_pages_v_blocks_api_endpoint_mode" AS ENUM('create', 'balance');
  CREATE TYPE "public"."enum__docs_pages_v_blocks_feature_grid_cards_variant" AS ENUM('green', 'copper');
  CREATE TYPE "public"."enum__docs_pages_v_version_method" AS ENUM('DOC', 'POST', 'GET', 'WSS', 'CORE', 'REST', 'SDK', 'v2.4');
  CREATE TYPE "public"."enum__docs_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_pt" varchar NOT NULL,
  	"title_en" varchar,
  	"module_id" "enum_categories_module_id" DEFAULT 'treasury' NOT NULL,
  	"order" numeric DEFAULT 1 NOT NULL,
  	"slug" varchar,
  	"accent" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "docs_pages_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bold_pt" varchar,
  	"text_pt" varchar,
  	"bold_en" varchar,
  	"text_en" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "docs_pages_blocks_intro_pillars_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bold_pt" varchar,
  	"text_pt" varchar,
  	"bold_en" varchar,
  	"text_en" varchar
  );
  
  CREATE TABLE "docs_pages_blocks_intro_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"p1_before_pt" varchar,
  	"p1_code" varchar DEFAULT 'wl_...',
  	"p1_after_pt" varchar,
  	"p1_before_en" varchar,
  	"p1_after_en" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "docs_pages_blocks_prerequisites_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"before_pt" varchar,
  	"highlight_pt" varchar,
  	"highlight_type" "enum_docs_pages_blocks_prerequisites_steps_highlight_type" DEFAULT 'none',
  	"after_pt" varchar,
  	"before_en" varchar,
  	"highlight_en" varchar,
  	"after_en" varchar
  );
  
  CREATE TABLE "docs_pages_blocks_prerequisites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_pt" varchar DEFAULT 'Pré-requisitos',
  	"box_title_pt" varchar DEFAULT 'Antes de começar, certifique-se de que:',
  	"comp_title_pt" varchar DEFAULT 'Validação de Identidade (KYB/KYC):',
  	"comp_before_pt" varchar DEFAULT 'A carteira só é liberada quando o titular possui ',
  	"pill_green" varchar DEFAULT 'kyc_status: approved',
  	"comp_or_pt" varchar DEFAULT ' ou ',
  	"pill_amber" varchar DEFAULT 'compliance_request',
  	"comp_after_pt" varchar DEFAULT ' validado pelo motor de risco da ALL X.',
  	"title_en" varchar DEFAULT 'Prerequisites',
  	"box_title_en" varchar,
  	"comp_title_en" varchar,
  	"comp_before_en" varchar,
  	"comp_or_en" varchar DEFAULT ' or ',
  	"comp_after_en" varchar,
  	"anchor_id" varchar DEFAULT 'sec-prereq',
  	"toc_label_pt" varchar DEFAULT 'Pré-requisitos',
  	"toc_label_en" varchar DEFAULT 'Prerequisites',
  	"block_name" varchar
  );
  
  CREATE TABLE "docs_pages_blocks_api_endpoint" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_pt" varchar,
  	"sub_pt" varchar,
  	"mode" "enum_docs_pages_blocks_api_endpoint_mode" DEFAULT 'create',
  	"resp_label" varchar DEFAULT 'Response 201 Created',
  	"req_label" varchar,
  	"resp_sub_pt" varchar,
  	"has_note" boolean DEFAULT false,
  	"note_before_pt" varchar DEFAULT 'Substitua ',
  	"note_code1" varchar DEFAULT 'YOUR_API_KEY',
  	"note_mid_pt" varchar DEFAULT ' pela sua chave real e ',
  	"note_code2" varchar DEFAULT 'in_000000000000',
  	"note_after_pt" varchar DEFAULT ' pelo ID do cliente.',
  	"snippets_curl" varchar,
  	"snippets_nodejs" varchar,
  	"snippets_python" varchar,
  	"snippets_go" varchar,
  	"snippets_response_json" varchar,
  	"title_en" varchar,
  	"sub_en" varchar,
  	"resp_sub_en" varchar,
  	"note_before_en" varchar,
  	"note_mid_en" varchar,
  	"note_after_en" varchar,
  	"anchor_id" varchar,
  	"toc_label_pt" varchar,
  	"toc_label_en" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "docs_pages_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_docs_pages_blocks_feature_grid_cards_variant" DEFAULT 'green',
  	"title_pt" varchar,
  	"text_before_pt" varchar,
  	"code_highlight" varchar,
  	"event_badge" varchar DEFAULT 'Event: payment.received',
  	"text_after_pt" varchar,
  	"title_en" varchar,
  	"text_before_en" varchar,
  	"text_after_en" varchar
  );
  
  CREATE TABLE "docs_pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_pt" varchar,
  	"sub_pt" varchar,
  	"title_en" varchar,
  	"sub_en" varchar,
  	"anchor_id" varchar DEFAULT 'sec-settlement',
  	"toc_label_pt" varchar,
  	"toc_label_en" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "docs_pages_blocks_metadata_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_pt" varchar,
  	"sub_pt" varchar,
  	"box_before_pt" varchar DEFAULT 'Você pode anexar chaves como ',
  	"code1" varchar DEFAULT 'customer_internal_id',
  	"box_mid_pt" varchar DEFAULT ', ',
  	"code2" varchar DEFAULT 'ledger_account',
  	"box_and_pt" varchar DEFAULT ' — ',
  	"box_after_pt" varchar,
  	"title_en" varchar,
  	"sub_en" varchar,
  	"box_before_en" varchar,
  	"box_mid_en" varchar DEFAULT ', ',
  	"box_and_en" varchar DEFAULT ' and ',
  	"box_after_en" varchar,
  	"anchor_id" varchar DEFAULT 'sec-cms',
  	"toc_label_pt" varchar,
  	"toc_label_en" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "docs_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_pt" varchar,
  	"category_id" integer,
  	"subtitle_pt" varchar,
  	"nav_label_pt" varchar,
  	"method" "enum_docs_pages_method" DEFAULT 'DOC',
  	"order" numeric DEFAULT 1,
  	"title_en" varchar,
  	"nav_label_en" varchar,
  	"subtitle_en" varchar,
  	"slug" varchar,
  	"badge" varchar,
  	"prev_slug" varchar,
  	"prev_title_pt" varchar,
  	"prev_title_en" varchar,
  	"next_slug" varchar,
  	"next_title_pt" varchar,
  	"next_title_en" varchar,
  	"breadcrumbs_pt" jsonb,
  	"breadcrumbs_en" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_docs_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_docs_pages_v_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bold_pt" varchar,
  	"text_pt" varchar,
  	"bold_en" varchar,
  	"text_en" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_docs_pages_v_blocks_intro_pillars_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bold_pt" varchar,
  	"text_pt" varchar,
  	"bold_en" varchar,
  	"text_en" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_docs_pages_v_blocks_intro_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"p1_before_pt" varchar,
  	"p1_code" varchar DEFAULT 'wl_...',
  	"p1_after_pt" varchar,
  	"p1_before_en" varchar,
  	"p1_after_en" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_docs_pages_v_blocks_prerequisites_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"before_pt" varchar,
  	"highlight_pt" varchar,
  	"highlight_type" "enum__docs_pages_v_blocks_prerequisites_steps_highlight_type" DEFAULT 'none',
  	"after_pt" varchar,
  	"before_en" varchar,
  	"highlight_en" varchar,
  	"after_en" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_docs_pages_v_blocks_prerequisites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_pt" varchar DEFAULT 'Pré-requisitos',
  	"box_title_pt" varchar DEFAULT 'Antes de começar, certifique-se de que:',
  	"comp_title_pt" varchar DEFAULT 'Validação de Identidade (KYB/KYC):',
  	"comp_before_pt" varchar DEFAULT 'A carteira só é liberada quando o titular possui ',
  	"pill_green" varchar DEFAULT 'kyc_status: approved',
  	"comp_or_pt" varchar DEFAULT ' ou ',
  	"pill_amber" varchar DEFAULT 'compliance_request',
  	"comp_after_pt" varchar DEFAULT ' validado pelo motor de risco da ALL X.',
  	"title_en" varchar DEFAULT 'Prerequisites',
  	"box_title_en" varchar,
  	"comp_title_en" varchar,
  	"comp_before_en" varchar,
  	"comp_or_en" varchar DEFAULT ' or ',
  	"comp_after_en" varchar,
  	"anchor_id" varchar DEFAULT 'sec-prereq',
  	"toc_label_pt" varchar DEFAULT 'Pré-requisitos',
  	"toc_label_en" varchar DEFAULT 'Prerequisites',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_docs_pages_v_blocks_api_endpoint" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_pt" varchar,
  	"sub_pt" varchar,
  	"mode" "enum__docs_pages_v_blocks_api_endpoint_mode" DEFAULT 'create',
  	"resp_label" varchar DEFAULT 'Response 201 Created',
  	"req_label" varchar,
  	"resp_sub_pt" varchar,
  	"has_note" boolean DEFAULT false,
  	"note_before_pt" varchar DEFAULT 'Substitua ',
  	"note_code1" varchar DEFAULT 'YOUR_API_KEY',
  	"note_mid_pt" varchar DEFAULT ' pela sua chave real e ',
  	"note_code2" varchar DEFAULT 'in_000000000000',
  	"note_after_pt" varchar DEFAULT ' pelo ID do cliente.',
  	"snippets_curl" varchar,
  	"snippets_nodejs" varchar,
  	"snippets_python" varchar,
  	"snippets_go" varchar,
  	"snippets_response_json" varchar,
  	"title_en" varchar,
  	"sub_en" varchar,
  	"resp_sub_en" varchar,
  	"note_before_en" varchar,
  	"note_mid_en" varchar,
  	"note_after_en" varchar,
  	"anchor_id" varchar,
  	"toc_label_pt" varchar,
  	"toc_label_en" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_docs_pages_v_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__docs_pages_v_blocks_feature_grid_cards_variant" DEFAULT 'green',
  	"title_pt" varchar,
  	"text_before_pt" varchar,
  	"code_highlight" varchar,
  	"event_badge" varchar DEFAULT 'Event: payment.received',
  	"text_after_pt" varchar,
  	"title_en" varchar,
  	"text_before_en" varchar,
  	"text_after_en" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_docs_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_pt" varchar,
  	"sub_pt" varchar,
  	"title_en" varchar,
  	"sub_en" varchar,
  	"anchor_id" varchar DEFAULT 'sec-settlement',
  	"toc_label_pt" varchar,
  	"toc_label_en" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_docs_pages_v_blocks_metadata_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_pt" varchar,
  	"sub_pt" varchar,
  	"box_before_pt" varchar DEFAULT 'Você pode anexar chaves como ',
  	"code1" varchar DEFAULT 'customer_internal_id',
  	"box_mid_pt" varchar DEFAULT ', ',
  	"code2" varchar DEFAULT 'ledger_account',
  	"box_and_pt" varchar DEFAULT ' — ',
  	"box_after_pt" varchar,
  	"title_en" varchar,
  	"sub_en" varchar,
  	"box_before_en" varchar,
  	"box_mid_en" varchar DEFAULT ', ',
  	"box_and_en" varchar DEFAULT ' and ',
  	"box_after_en" varchar,
  	"anchor_id" varchar DEFAULT 'sec-cms',
  	"toc_label_pt" varchar,
  	"toc_label_en" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_docs_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title_pt" varchar,
  	"version_category_id" integer,
  	"version_subtitle_pt" varchar,
  	"version_nav_label_pt" varchar,
  	"version_method" "enum__docs_pages_v_version_method" DEFAULT 'DOC',
  	"version_order" numeric DEFAULT 1,
  	"version_title_en" varchar,
  	"version_nav_label_en" varchar,
  	"version_subtitle_en" varchar,
  	"version_slug" varchar,
  	"version_badge" varchar,
  	"version_prev_slug" varchar,
  	"version_prev_title_pt" varchar,
  	"version_prev_title_en" varchar,
  	"version_next_slug" varchar,
  	"version_next_title_pt" varchar,
  	"version_next_title_en" varchar,
  	"version_breadcrumbs_pt" jsonb,
  	"version_breadcrumbs_en" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__docs_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'admin',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"docs_pages_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "docs_pages_blocks_callout" ADD CONSTRAINT "docs_pages_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."docs_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "docs_pages_blocks_intro_pillars_pillars" ADD CONSTRAINT "docs_pages_blocks_intro_pillars_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."docs_pages_blocks_intro_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "docs_pages_blocks_intro_pillars" ADD CONSTRAINT "docs_pages_blocks_intro_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."docs_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "docs_pages_blocks_prerequisites_steps" ADD CONSTRAINT "docs_pages_blocks_prerequisites_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."docs_pages_blocks_prerequisites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "docs_pages_blocks_prerequisites" ADD CONSTRAINT "docs_pages_blocks_prerequisites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."docs_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "docs_pages_blocks_api_endpoint" ADD CONSTRAINT "docs_pages_blocks_api_endpoint_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."docs_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "docs_pages_blocks_feature_grid_cards" ADD CONSTRAINT "docs_pages_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."docs_pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "docs_pages_blocks_feature_grid" ADD CONSTRAINT "docs_pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."docs_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "docs_pages_blocks_metadata_box" ADD CONSTRAINT "docs_pages_blocks_metadata_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."docs_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "docs_pages" ADD CONSTRAINT "docs_pages_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_docs_pages_v_blocks_callout" ADD CONSTRAINT "_docs_pages_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_docs_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_docs_pages_v_blocks_intro_pillars_pillars" ADD CONSTRAINT "_docs_pages_v_blocks_intro_pillars_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_docs_pages_v_blocks_intro_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_docs_pages_v_blocks_intro_pillars" ADD CONSTRAINT "_docs_pages_v_blocks_intro_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_docs_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_docs_pages_v_blocks_prerequisites_steps" ADD CONSTRAINT "_docs_pages_v_blocks_prerequisites_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_docs_pages_v_blocks_prerequisites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_docs_pages_v_blocks_prerequisites" ADD CONSTRAINT "_docs_pages_v_blocks_prerequisites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_docs_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_docs_pages_v_blocks_api_endpoint" ADD CONSTRAINT "_docs_pages_v_blocks_api_endpoint_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_docs_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_docs_pages_v_blocks_feature_grid_cards" ADD CONSTRAINT "_docs_pages_v_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_docs_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_docs_pages_v_blocks_feature_grid" ADD CONSTRAINT "_docs_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_docs_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_docs_pages_v_blocks_metadata_box" ADD CONSTRAINT "_docs_pages_v_blocks_metadata_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_docs_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_docs_pages_v" ADD CONSTRAINT "_docs_pages_v_parent_id_docs_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."docs_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_docs_pages_v" ADD CONSTRAINT "_docs_pages_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_docs_pages_fk" FOREIGN KEY ("docs_pages_id") REFERENCES "public"."docs_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "docs_pages_blocks_callout_order_idx" ON "docs_pages_blocks_callout" USING btree ("_order");
  CREATE INDEX "docs_pages_blocks_callout_parent_id_idx" ON "docs_pages_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "docs_pages_blocks_callout_path_idx" ON "docs_pages_blocks_callout" USING btree ("_path");
  CREATE INDEX "docs_pages_blocks_intro_pillars_pillars_order_idx" ON "docs_pages_blocks_intro_pillars_pillars" USING btree ("_order");
  CREATE INDEX "docs_pages_blocks_intro_pillars_pillars_parent_id_idx" ON "docs_pages_blocks_intro_pillars_pillars" USING btree ("_parent_id");
  CREATE INDEX "docs_pages_blocks_intro_pillars_order_idx" ON "docs_pages_blocks_intro_pillars" USING btree ("_order");
  CREATE INDEX "docs_pages_blocks_intro_pillars_parent_id_idx" ON "docs_pages_blocks_intro_pillars" USING btree ("_parent_id");
  CREATE INDEX "docs_pages_blocks_intro_pillars_path_idx" ON "docs_pages_blocks_intro_pillars" USING btree ("_path");
  CREATE INDEX "docs_pages_blocks_prerequisites_steps_order_idx" ON "docs_pages_blocks_prerequisites_steps" USING btree ("_order");
  CREATE INDEX "docs_pages_blocks_prerequisites_steps_parent_id_idx" ON "docs_pages_blocks_prerequisites_steps" USING btree ("_parent_id");
  CREATE INDEX "docs_pages_blocks_prerequisites_order_idx" ON "docs_pages_blocks_prerequisites" USING btree ("_order");
  CREATE INDEX "docs_pages_blocks_prerequisites_parent_id_idx" ON "docs_pages_blocks_prerequisites" USING btree ("_parent_id");
  CREATE INDEX "docs_pages_blocks_prerequisites_path_idx" ON "docs_pages_blocks_prerequisites" USING btree ("_path");
  CREATE INDEX "docs_pages_blocks_api_endpoint_order_idx" ON "docs_pages_blocks_api_endpoint" USING btree ("_order");
  CREATE INDEX "docs_pages_blocks_api_endpoint_parent_id_idx" ON "docs_pages_blocks_api_endpoint" USING btree ("_parent_id");
  CREATE INDEX "docs_pages_blocks_api_endpoint_path_idx" ON "docs_pages_blocks_api_endpoint" USING btree ("_path");
  CREATE INDEX "docs_pages_blocks_feature_grid_cards_order_idx" ON "docs_pages_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "docs_pages_blocks_feature_grid_cards_parent_id_idx" ON "docs_pages_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "docs_pages_blocks_feature_grid_order_idx" ON "docs_pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "docs_pages_blocks_feature_grid_parent_id_idx" ON "docs_pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "docs_pages_blocks_feature_grid_path_idx" ON "docs_pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "docs_pages_blocks_metadata_box_order_idx" ON "docs_pages_blocks_metadata_box" USING btree ("_order");
  CREATE INDEX "docs_pages_blocks_metadata_box_parent_id_idx" ON "docs_pages_blocks_metadata_box" USING btree ("_parent_id");
  CREATE INDEX "docs_pages_blocks_metadata_box_path_idx" ON "docs_pages_blocks_metadata_box" USING btree ("_path");
  CREATE INDEX "docs_pages_category_idx" ON "docs_pages" USING btree ("category_id");
  CREATE UNIQUE INDEX "docs_pages_slug_idx" ON "docs_pages" USING btree ("slug");
  CREATE INDEX "docs_pages_updated_at_idx" ON "docs_pages" USING btree ("updated_at");
  CREATE INDEX "docs_pages_created_at_idx" ON "docs_pages" USING btree ("created_at");
  CREATE INDEX "docs_pages__status_idx" ON "docs_pages" USING btree ("_status");
  CREATE INDEX "_docs_pages_v_blocks_callout_order_idx" ON "_docs_pages_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_docs_pages_v_blocks_callout_parent_id_idx" ON "_docs_pages_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_docs_pages_v_blocks_callout_path_idx" ON "_docs_pages_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_docs_pages_v_blocks_intro_pillars_pillars_order_idx" ON "_docs_pages_v_blocks_intro_pillars_pillars" USING btree ("_order");
  CREATE INDEX "_docs_pages_v_blocks_intro_pillars_pillars_parent_id_idx" ON "_docs_pages_v_blocks_intro_pillars_pillars" USING btree ("_parent_id");
  CREATE INDEX "_docs_pages_v_blocks_intro_pillars_order_idx" ON "_docs_pages_v_blocks_intro_pillars" USING btree ("_order");
  CREATE INDEX "_docs_pages_v_blocks_intro_pillars_parent_id_idx" ON "_docs_pages_v_blocks_intro_pillars" USING btree ("_parent_id");
  CREATE INDEX "_docs_pages_v_blocks_intro_pillars_path_idx" ON "_docs_pages_v_blocks_intro_pillars" USING btree ("_path");
  CREATE INDEX "_docs_pages_v_blocks_prerequisites_steps_order_idx" ON "_docs_pages_v_blocks_prerequisites_steps" USING btree ("_order");
  CREATE INDEX "_docs_pages_v_blocks_prerequisites_steps_parent_id_idx" ON "_docs_pages_v_blocks_prerequisites_steps" USING btree ("_parent_id");
  CREATE INDEX "_docs_pages_v_blocks_prerequisites_order_idx" ON "_docs_pages_v_blocks_prerequisites" USING btree ("_order");
  CREATE INDEX "_docs_pages_v_blocks_prerequisites_parent_id_idx" ON "_docs_pages_v_blocks_prerequisites" USING btree ("_parent_id");
  CREATE INDEX "_docs_pages_v_blocks_prerequisites_path_idx" ON "_docs_pages_v_blocks_prerequisites" USING btree ("_path");
  CREATE INDEX "_docs_pages_v_blocks_api_endpoint_order_idx" ON "_docs_pages_v_blocks_api_endpoint" USING btree ("_order");
  CREATE INDEX "_docs_pages_v_blocks_api_endpoint_parent_id_idx" ON "_docs_pages_v_blocks_api_endpoint" USING btree ("_parent_id");
  CREATE INDEX "_docs_pages_v_blocks_api_endpoint_path_idx" ON "_docs_pages_v_blocks_api_endpoint" USING btree ("_path");
  CREATE INDEX "_docs_pages_v_blocks_feature_grid_cards_order_idx" ON "_docs_pages_v_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "_docs_pages_v_blocks_feature_grid_cards_parent_id_idx" ON "_docs_pages_v_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_docs_pages_v_blocks_feature_grid_order_idx" ON "_docs_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_docs_pages_v_blocks_feature_grid_parent_id_idx" ON "_docs_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_docs_pages_v_blocks_feature_grid_path_idx" ON "_docs_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_docs_pages_v_blocks_metadata_box_order_idx" ON "_docs_pages_v_blocks_metadata_box" USING btree ("_order");
  CREATE INDEX "_docs_pages_v_blocks_metadata_box_parent_id_idx" ON "_docs_pages_v_blocks_metadata_box" USING btree ("_parent_id");
  CREATE INDEX "_docs_pages_v_blocks_metadata_box_path_idx" ON "_docs_pages_v_blocks_metadata_box" USING btree ("_path");
  CREATE INDEX "_docs_pages_v_parent_idx" ON "_docs_pages_v" USING btree ("parent_id");
  CREATE INDEX "_docs_pages_v_version_version_category_idx" ON "_docs_pages_v" USING btree ("version_category_id");
  CREATE INDEX "_docs_pages_v_version_version_slug_idx" ON "_docs_pages_v" USING btree ("version_slug");
  CREATE INDEX "_docs_pages_v_version_version_updated_at_idx" ON "_docs_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_docs_pages_v_version_version_created_at_idx" ON "_docs_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_docs_pages_v_version_version__status_idx" ON "_docs_pages_v" USING btree ("version__status");
  CREATE INDEX "_docs_pages_v_created_at_idx" ON "_docs_pages_v" USING btree ("created_at");
  CREATE INDEX "_docs_pages_v_updated_at_idx" ON "_docs_pages_v" USING btree ("updated_at");
  CREATE INDEX "_docs_pages_v_latest_idx" ON "_docs_pages_v" USING btree ("latest");
  CREATE INDEX "_docs_pages_v_autosave_idx" ON "_docs_pages_v" USING btree ("autosave");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_docs_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("docs_pages_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "categories" CASCADE;
  DROP TABLE "docs_pages_blocks_callout" CASCADE;
  DROP TABLE "docs_pages_blocks_intro_pillars_pillars" CASCADE;
  DROP TABLE "docs_pages_blocks_intro_pillars" CASCADE;
  DROP TABLE "docs_pages_blocks_prerequisites_steps" CASCADE;
  DROP TABLE "docs_pages_blocks_prerequisites" CASCADE;
  DROP TABLE "docs_pages_blocks_api_endpoint" CASCADE;
  DROP TABLE "docs_pages_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "docs_pages_blocks_feature_grid" CASCADE;
  DROP TABLE "docs_pages_blocks_metadata_box" CASCADE;
  DROP TABLE "docs_pages" CASCADE;
  DROP TABLE "_docs_pages_v_blocks_callout" CASCADE;
  DROP TABLE "_docs_pages_v_blocks_intro_pillars_pillars" CASCADE;
  DROP TABLE "_docs_pages_v_blocks_intro_pillars" CASCADE;
  DROP TABLE "_docs_pages_v_blocks_prerequisites_steps" CASCADE;
  DROP TABLE "_docs_pages_v_blocks_prerequisites" CASCADE;
  DROP TABLE "_docs_pages_v_blocks_api_endpoint" CASCADE;
  DROP TABLE "_docs_pages_v_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "_docs_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_docs_pages_v_blocks_metadata_box" CASCADE;
  DROP TABLE "_docs_pages_v" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_categories_module_id";
  DROP TYPE "public"."enum_docs_pages_blocks_prerequisites_steps_highlight_type";
  DROP TYPE "public"."enum_docs_pages_blocks_api_endpoint_mode";
  DROP TYPE "public"."enum_docs_pages_blocks_feature_grid_cards_variant";
  DROP TYPE "public"."enum_docs_pages_method";
  DROP TYPE "public"."enum_docs_pages_status";
  DROP TYPE "public"."enum__docs_pages_v_blocks_prerequisites_steps_highlight_type";
  DROP TYPE "public"."enum__docs_pages_v_blocks_api_endpoint_mode";
  DROP TYPE "public"."enum__docs_pages_v_blocks_feature_grid_cards_variant";
  DROP TYPE "public"."enum__docs_pages_v_version_method";
  DROP TYPE "public"."enum__docs_pages_v_version_status";
  DROP TYPE "public"."enum_users_role";`)
}
