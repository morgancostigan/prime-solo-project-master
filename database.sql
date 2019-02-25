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

--STYLE TAGS, an ever expanding list

INSERT INTO "style" ("tag")
VALUES ('Amber'),('American'),('Pale Ale'),('Barleywine'),
('Black Ale'),('Black Lager'),('Schwarzbier'),('Black'),('Brett'),
    ('Baltic Porter'), ('Baltic'), ('Russian Imperial'), ('Imperial'), ('Brown'),
    ('Red'), ('Blonde'), ('Rose'), ('Pale'), ('Gold'), ('Cream'), ('Milkshake'),
    ('Ale'), ('Lager'), ('Stout'), ('Porter'), ('Wheat'), ('Rye'), ('India Pale Ale'),
    ('Barrel Aged'), ('Belgian'), ('Dubbel'), ('Tripel'), ('Double'), ('Quadrupel'),
    ('Strong Ale'), ('Lambic'), ('Flanders'), ('Gueuze'), ('Saison'), ('Weisse'), ('White'),
    ('Biere de Garde'), ('Witbier'), ('Bohemian'), ('English'), ('German'), ('Czech'),
    ('French'), ('Polish'), ('British'), ('Scottish'), ('Scotch'), ('Irish'), ('Norse'),
    ('Extra Special Bitter'), ('Bitter'), ('Sour'), ('Gose'), ('California Common'),
    ('Coffee'), ('Chocolate'), ('Coconut'), ('Vanilla'), ('Lactose'), ('Pilsener'),
    ('Mild'), ('Oatmeal'), ('Milk Stout'), ('Sweet Stout'), ('Old Ale'), ('Altbier'),
    ('Bock'), ('Dopplebock'), ('Export'), ('Fruit and Field'), ('Dunkel'),
    ('Dunkelweizen'), ('Hefeweizen'), ('Maibock'), ('Helles'), ('Kolsch'),
    ('Marzen'), ('Oktoberfest'), ('N/A'), ('Non Alcoholic'), ('Brown'), ('Pilsner'),
    ('Weizenbock'), ('Herb and Spice'), ('Gluten Free'), ('Honey'), ('Mead'), ('Cider'),
    ('Dry'), ('Dry Stout'), ('Brut'), ('New England'), ('Hazy'), ('Juicy'), ('Robust'),
    ('Session'), ('Autumn'), ('Harvest'), ('Pumpkin'), ('Wee Heavy'), ('Smoke'),
    ('Rauchbier'), ('Vienna'), ('Specialty'), ('Fruit'), ('Apricot'), ('Sweet'),
    ('Medium'), ('Apple'), ('Pear'), ('Berry'), ('Blueberry'), ('Raspberry'),
    ('Cherry'), ('Kriek'), ('Frambois'), ('Blackberry'), ('Peach'), ('Peppered'),
    ('Chili'), ('Hot Sauce Aged'), ('Whiskey Aged'), ('Cask'), ('Plum'), ('Watermelon'),
    ('Earl Grey'), ('Green Tea'), ('Black Tea'), ('Barrel Aged'), ('Aged'), ('Port Aged'),
    ('Rum Aged'), ('Islay'), ('Peated'), ('Tequila Aged'), ('Kentucky Common'),
    ('Wine Aged'), ('Sherry Aged'), ('Cognac'), ('Rum Aged'), ('Oak'), ('Maple'),
    ('Light'), ('Dark'), ('Heavy'), ('Dortmunder'), ('Berliner Weisse'), ('Steam Beer'),
    ('Summer'), ('Spring'), ('Winter'), ('Farmhouse'), ('Eisbock'), ('Earthy'),
    ('Oud Bruin'), ('Roggenbier'), ('Wild'), ('Mixed Culture'), ('Spontaneous Fermentation'),
    ('Mixed Fermentation'), ('Keller'), ('Best Bitter'), ('London'), ('Kettle Sour'),
    ('Passion Fruit'), ('Mango'), ('Strawberry'), ('Guava'), ('Kiwi'), ('Kvass'),
    ('Wood Aged'), ('Gruit'), ('Biere de Champagne'), ('Braggot'), ('Adjunct'),
    ('Zwickel'), ('Malt Liquor'), ('Sahti'), ('Happoshu'), ('India Pale Lager'), ('Faro'),
    ('Wheatwine'), ('Kristalweizen'), ('Yuzu'), ('Leichtbier'), ('Australian'),
    ('Sparkling'), ('Trappist'), ('Single'), ('Smash'), ('Single Malt'), ('Single Hop'),
    ('Lichtenhainer'), ('Piwo Grodziskie'), ('Munich'), ('Pre-Prohibition'),
    ('Tropical'), ('Cinnamon'), ('Peanut Butter'), ('Boysenberry'), ('Banana'), 
    ('West Coast'), ('Clove'), ('Lemon'), ('Grapefruit'), ('Tangerine'), ('Melon'), 
    ('Cacao'), ('Walnut'), ('Blood Orange'), ('Ginger'), ('Chai'), ('Roasty'), 
    ('Wet Hopped'), ('Dry Hopped'), ('Fresh Hopped'), ('Cryo'), ('Pineapple'), ('Crisp'), 
    ('Stone Fruit'), ('Funky'), ('Hoppy'), ('Bready'), ('Spices'), ('Citrus'), ('Corn'), 
    ('Pomegranate'), ('American Pale Ale'), ('New Zealand'), ('Northern'), ('Southern'), 
    ('Experimental'), ('Mint'), ('Ancient');