CREATE DATABASE "giphy_search_favorites";

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "category" VARCHAR (100) NOT NULL DEFAULT 'NotSet',
    "url" VARCHAR NOT NULL
);