CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) UNIQUE NOT NULL,
	"userzip" int NOT NULL,
	"user_image" varchar(300);
	"avatar_id" int NOT NULL DEFAULT 1,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"isBrewer" BOOLEAN NOT NULL DEFAULT 'false',
	"isAdmin" BOOLEAN NOT NULL DEFAULT 'false',
	"brewery_id" int REFERENCES "brewery"("id")),
	"user_since" DATE NOT NULL DEFAULT CURRENT_DATE;;

CREATE TABLE "brewery" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"address" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"zip" int NOT NULL,
	"website" varchar(100) NOT NULL,
	"logo_url" varchar(300) NOT NULL),
	"bio" TYPE varchar(2000);	

CREATE TABLE "beer" (
	"id" serial PRIMARY KEY NOT NULL,
	"brewery_id" int NOT NULL REFERENCES "brewery",
	"name" varchar(100) NOT NULL,
	"style" varchar(100) NOT NULL,
	"release" DATE NOT NULL),
	"image_url" varchar(300),
	"description" varchar(1000);

CREATE TABLE "comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" int NOT NULL REFERENCES "user",
	"comment" varchar(140) NOT NULL,
	"beer_id" int NOT NULL REFERENCES "beer");

CREATE TABLE "style" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag" varchar(50) NOT NULL);

CREATE TABLE "follow" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" int NOT NULL REFERENCES "user",
	"brewery_id" int REFERENCES "brewery",
	"followed_id" int REFERENCES "user");

CREATE TABLE "calendar" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" int NOT NULL REFERENCES "user",
	"beer_id" int NOT NULL REFERENCES "beer");

CREATE TABLE "style_beer" (
	"id" serial PRIMARY KEY NOT NULL,
	"style_id" int NOT NULL REFERENCES "style",
	"beer_id" int NOT NULL REFERENCES "beer");

CREATE TABLE "avatar" (
	"id" serial PRIMARY KEY NOT NULL,
	"avname" int NOT NULL);