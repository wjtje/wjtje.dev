-- AlterTable
CREATE SEQUENCE "post_id_seq";
ALTER TABLE "Post" ALTER COLUMN "id" SET DEFAULT nextval('post_id_seq');
ALTER SEQUENCE "post_id_seq" OWNED BY "Post"."id";

-- AlterTable
CREATE SEQUENCE "user_id_seq";
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE "user_id_seq" OWNED BY "User"."id";
