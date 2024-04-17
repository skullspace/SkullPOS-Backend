drop table if exists "staff" cascade;
drop table if exists "terminals" cascade;
drop table if exists "locations" cascade;
drop table if exists "transactions" cascade;
drop table if exists "transaction_types" cascade;
drop table if exists "transaction_status" cascade;
drop table if exists "products" cascade;
drop table if exists "categories" cascade;
drop table if exists "discounts" cascade;
drop table if exists "roles" cascade;
drop table if exists "customers" cascade;
drop table if exists "subscriptions" cascade;
drop table if exists "subscription_types" cascade;
drop table if exists "events" cascade;
drop table if exists "transfers" cascade;
drop table if exists "transfer_types" cascade;
drop table if exists "transfer_items" cascade;
drop table if exists "stock" cascade;
drop table if exists "event_counts" cascade;

CREATE TABLE "staff" (
"id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "username" varchar(4),
  "pin" varchar,
  "password" varchar,
  "role_id" integer NOT NULL,
  "active" boolean
);

CREATE TABLE "terminals" (
  "id" integer generated always as identity PRIMARY KEY,
  "terminal_name" varchar NOT NULL,
  "location_id" integer,
  "description" varchar
);

CREATE TABLE "locations" (
  "id" integer generated always as identity PRIMARY KEY,
  "location_name" varchar NOT NULL,
  "description" varchar
);

CREATE TABLE "transactions" (
  "id" integer generated always as identity PRIMARY KEY,
  "date" timestamp NOT NULL,
  "items" varchar,
  "amount_paid" decimal,
  "staff_id" integer,
  "stripe_payment_id" varchar,
  "status_id" integer NOT NULL,
  "terminal_id" integer NOT NULL,
  "type_id" integer NOT NULL,
  "customer_id" integer,
  "subscription_id" integer,
  "discount_id" integer,
  "event_id" integer
);

CREATE TABLE "transaction_types" (
  "id" integer generated always as identity PRIMARY KEY,
  "type_name" varchar NOT NULL
);

CREATE TABLE "transaction_status" (
  "id" integer generated always as identity PRIMARY KEY,
  "status_name" varchar NOT NULL
);

CREATE TABLE "products" (
  "id" integer PRIMARY KEY,
  "cost" decimal NOT NULL,
  "item_name" varchar NOT NULL,
  "item_image" varchar,
  "category_id" integer
);

CREATE TABLE "categories" (
  "id" integer generated always as identity PRIMARY KEY,
  "category_name" varchar NOT NULL,
  "description" varchar
);

CREATE TABLE "discounts" (
  "id" integer generated always as identity PRIMARY KEY,
  "discount_name" varchar NOT NULL,
  "role_id" integer,
  "description" varchar,
  "percentage" decimal NOT NULL
);

CREATE TABLE "roles" (
  "id" integer generated always as identity PRIMARY KEY,
  "role_name" varchar NOT NULL,
  "description" varchar
);

CREATE TABLE "customers" (
  "id" integer generated always as identity PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "phone_number" integer NOT NULL,
  "email" varchar,
  "member" boolean
);

CREATE TABLE "subscriptions" (
  "id" integer generated always as identity PRIMARY KEY,
  "type_id" integer NOT NULL,
  "customer_id" integer NOT NULL,
  "cost" decimal NOT NULL,
  "DESCRIPTIOn" varchar
);

CREATE TABLE "subscription_types" (
  "id" integer generated always as identity PRIMARY KEY,
  "type_name" varchar NOT NULL,
  "cost" decimal NOT NULL
);

CREATE TABLE "events" (
  "id" integer generated always as identity PRIMARY KEY,
  "event_name" varchar NOT NULL,
  "date_start" timestamp NOT NULL,
  "date_end" timestamp NOT NULL,
  "description" varchar
);


Create table "transfers" (
  "id" integer generated always as identity PRIMARY KEY,
  "date" timestamp NOT NULL,
  "from_location_id" integer NOT NULL,
  "to_location_id" integer NOT NULL,
  "staff_id" integer NOT NULL,
  "type_id" integer NOT NULL
);

create table "transfer_types" (
  "id" integer generated always as identity PRIMARY KEY,
  "type_name" varchar NOT NULL
);

create table "transfer_items" (
  "id" integer generated always as identity PRIMARY KEY,
  "transfer_id" integer NOT NULL,
  "product_id" integer NOT NULL,
  "quantity" integer NOT NULL
);

create table "stock" (
  "id" integer generated always as identity PRIMARY KEY,
  "product_id" integer NOT NULL,
  "location_id" integer NOT NULL,
  "quantity" integer NOT NULL
);

create table "event_counts" (
  "id" integer generated always as identity PRIMARY KEY,
  "event_id" integer NOT NULL,
  "product_id" integer NOT NULL,
  "start_count" integer NOT NULL,
  "end_count" integer NOT NULL
);

ALTER TABLE "staff" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("staff_id") REFERENCES "staff" ("id");
ALTER TABLE "transactions" ADD FOREIGN KEY ("status_id") REFERENCES "transaction_statuses" ("id");
ALTER TABLE "transactions" ADD FOREIGN KEY ("type_id") REFERENCES "transaction_types" ("id");
ALTER TABLE "transactions" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");
ALTER TABLE "transactions" ADD FOREIGN KEY ("terminal_id") REFERENCES "terminals" ("id");
ALTER TABLE "transactions" ADD FOREIGN KEY ("subscription_id") REFERENCES "subscriptions" ("id");

ALTER TABLE "terminals" ADD FOREIGN KEY ("location_id") REFERENCES "locations" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "discounts" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "subscriptions" ADD FOREIGN KEY ("type_id") REFERENCES "subscription_types" ("id");
ALTER TABLE "subscriptions" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "transfers" ADD FOREIGN KEY ("from_location_id") REFERENCES "locations" ("id");
ALTER TABLE "transfers" ADD FOREIGN KEY ("to_location_id") REFERENCES "locations" ("id");
ALTER TABLE "transfers" ADD FOREIGN KEY ("staff_id") REFERENCES "staff" ("id");
ALTER TABLE "transfers" ADD FOREIGN KEY ("type_id") REFERENCES "transfer_types" ("id");

ALTER TABLE "transfer_items" ADD FOREIGN KEY ("transfer_id") REFERENCES "transfers" ("id");
ALTER TABLE "transfer_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "stock" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE "stock" ADD FOREIGN KEY ("location_id") REFERENCES "locations" ("id");

ALTER TABLE "event_counts" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");
ALTER TABLE "event_counts" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
