CREATE TABLE FOO.customers
( customer_id number(10) NOT NULL,
  customer_name varchar2(50) NOT NULL,
  city varchar2(50)
);

CREATE TABLE FOO.products
( product_id number(10) not null,
  product_name varchar2(50) not null,
  category varchar2(50),
  CONSTRAINT products_pk PRIMARY KEY (product_id)
);

CREATE TABLE FOO.suppliers
( supplier_id number(10) not null,
  supplier_name varchar2(50) not null,
  city varchar2(25),
  CONSTRAINT suppliers_pk PRIMARY KEY (supplier_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON FOO.customers to foo;
GRANT SELECT, INSERT, UPDATE, DELETE ON FOO.products to foo;
GRANT SELECT, INSERT, UPDATE, DELETE ON FOO.suppliers to foo;

INSERT INTO FOO.CUSTOMERS (customer_id, customer_name, city) VALUES (4831500, 'larry111', 'MINNEAPOLIS');
INSERT INTO FOO.CUSTOMERS (customer_id, customer_name, city) VALUES (5216301, 'harry222', 'DEVER');
INSERT INTO FOO.CUSTOMERS (customer_id, customer_name, city) VALUES (9240075, 'bob333', 'ATLANTA');

INSERT INTO FOO.PRODUCTS (product_id, product_name, category) VALUES (4255103, 'bowling ball', 'sporting_goods');
INSERT INTO FOO.PRODUCTS (product_id, product_name, category) VALUES (4841518, 'fishing rod', 'sporting goods');
INSERT INTO FOO.PRODUCTS (product_id, product_name, category) VALUES (6846878, 'detergent', 'household_items');

INSERT INTO FOO.SUPPLIERS (supplier_id, supplier_name, city) VALUES (3656006, 'BIG CITY SPORTS', 'Galvaston');
INSERT INTO FOO.SUPPLIERS (supplier_id, supplier_name, city) VALUES (8579341, 'TOP LINE OUTDOORS', 'Hirshfield');
INSERT INTO FOO.SUPPLIERS (supplier_id, supplier_name, city) VALUES (8347123, 'HOMEFIELDS', 'PERRY');
