import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_doc_feedback_helpful" AS ENUM('yes', 'no');
  CREATE TYPE "public"."enum_doc_feedback_lang" AS ENUM('pt', 'en');
  CREATE TABLE "doc_feedback" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_slug" varchar NOT NULL,
  	"page_title" varchar,
  	"helpful" "enum_doc_feedback_helpful" NOT NULL,
  	"lang" "enum_doc_feedback_lang" DEFAULT 'pt',
  	"comment" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "doc_feedback_id" integer;
  CREATE INDEX "doc_feedback_page_slug_idx" ON "doc_feedback" USING btree ("page_slug");
  CREATE INDEX "doc_feedback_updated_at_idx" ON "doc_feedback" USING btree ("updated_at");
  CREATE INDEX "doc_feedback_created_at_idx" ON "doc_feedback" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_doc_feedback_fk" FOREIGN KEY ("doc_feedback_id") REFERENCES "public"."doc_feedback"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_doc_feedback_id_idx" ON "payload_locked_documents_rels" USING btree ("doc_feedback_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "doc_feedback" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "doc_feedback" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_doc_feedback_fk";
  
  DROP INDEX "payload_locked_documents_rels_doc_feedback_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "doc_feedback_id";
  DROP TYPE "public"."enum_doc_feedback_helpful";
  DROP TYPE "public"."enum_doc_feedback_lang";`)
}
