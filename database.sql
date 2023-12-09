CREATE TABLE Customers (
	MembershipID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	age INT NOT NULL,
	phone_number varchar(255) NOT NULL,
	points FLOAT NOT NULL,
	customer_city varchar(255) NOT NULL,
	customer_country varchar(255) NOT NULL,
	customer_street_address varchar(255) NOT NULL,
	customer_plot_number varchar(255) NOT NULL
);

CREATE TABLE Suppliers (
	SupplierID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	supplier_first_name varchar(255) NOT NULL,
	supplier_last_name varchar(255) NOT NULL,
	supplier_phone_number varchar(255) NOT NULL,
	supplier_email varchar(255) NOT NULL,
	supplier_city varchar(255) NOT NULL,
	supplier_country varchar(255) NOT NULL,
	supplier_street_address varchar(255) NOT NULL,
	supplier_plot_number varchar(255) NOT NULL
);

CREATE TABLE Employees (
	EmployeeID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	employee_first_name varchar(255) NOT NULL,
	employee_last_name varchar(255) NOT NULL,
	employee_email varchar(255) NOT NULL,
	employee_phone_number varchar(255) NOT NULL,
	employee_joining_date DATE NOT NULL
);

CREATE TABLE Categories (
	CategoryID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	category_name varchar(255) NOT NULL
);

CREATE TABLE Products (
	ProductID INT PRIMARY KEY,
	SupplierID INT NOT NULL,
	CategoryID INT NOT NULL,
	product_name varchar(255) NOT NULL,
	cost_price FLOAT NOT NULL,
	selling_price FLOAT NOT NULL,
	stock_quantity INT NOT NULL,
    CONSTRAINT FK_prod_supp FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID),
    CONSTRAINT FK_prod_cat FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE Receipts (
	ReceiptID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	EmployeeID INT NOT NULL,
	MembershipID INT NOT NULL,
	date_receipt DATE NOT NULL,
    time_receipt varchar(255) NOT NULL,
	total_cost FLOAT NOT NULL,
	total_sale FLOAT NOT NULL,
	points_redeemed FLOAT NOT NULL,
	points_received FLOAT NOT NULL,
	sales_final FLOAT NOT NULL,
    CONSTRAINT FK_rec_emp FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    CONSTRAINT FK_rec_mem FOREIGN KEY (MembershipID) REFERENCES Customers(MembershipID)
);

CREATE TABLE SaleItems (
	ReceiptID INT NOT NULL,
	ProductID INT NOT NULL,
	quantity_purchased INT NOT NULL,
	line_total FLOAT NOT NULL,
	CONSTRAINT pk_SaleItems_ReceiptID PRIMARY KEY (ReceiptID, ProductID),
    CONSTRAINT FK_si_rec FOREIGN KEY (ReceiptID) REFERENCES Receipts(ReceiptID),
    CONSTRAINT FK_si_prod FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

 -- Drop all tables
DROP TABLE SaleItems;
DROP TABLE Receipts;
DROP TABLE Products;
DROP TABLE Categories;
DROP TABLE Employees;
DROP TABLE Suppliers;
DROP TABLE Customers;

-- Insert dummy data in Employees tables
INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone_number, employee_joining_date) 
VALUES ('Shehzad', 'Aslam', 'shehzadaslamoza@gmail.com', '03001234567', '04-MAR-2021');

INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone_number, employee_joining_date) 
VALUES ('Haider', 'Khan', 'haidercalculus@gmail.com', '03001234567', '04-MAR-2021');

INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone_number, employee_joining_date) 
VALUES ('Hazim', 'IBA', 'hazimghulamfarooq19@gmail.com', '03001234567', '04-MAR-2021');

SELECT * FROM Employees;

-- Insert dummy data in Customer tables
INSERT INTO Customers (first_name, last_name, email, age, phone_number, points, customer_city, customer_country, customer_street_address, customer_plot_number)
VALUES ('C1', 'C1', 'email', 20, '03001234567', 0, 'Karachi', 'Pakistan', 'Street 1', 'Plot 1');

INSERT INTO Customers (first_name, last_name, email, age, phone_number, points, customer_city, customer_country, customer_street_address, customer_plot_number)
VALUES ('C2', 'C2', 'email', 20, '03001234567', 0, 'Karachi', 'Pakistan', 'Street 1', 'Plot 1');

INSERT INTO Customers (first_name, last_name, email, age, phone_number, points, customer_city, customer_country, customer_street_address, customer_plot_number)
VALUES ('C3', 'C3', 'email', 20, '03001234567', 0, 'Karachi', 'Pakistan', 'Street 1', 'Plot 1');

SELECT * FROM Customers;

-- Insert dummy data in Suppliers tables
INSERT INTO Suppliers (supplier_first_name, supplier_last_name, supplier_phone_number, supplier_email, supplier_city, supplier_country, supplier_street_address, supplier_plot_number)
VALUES ('S1', 'S1', '03001234567', 'email', 'Karachi', 'Pakistan', 'Street 2', 'Plot 1');

INSERT INTO Suppliers (supplier_first_name, supplier_last_name, supplier_phone_number, supplier_email, supplier_city, supplier_country, supplier_street_address, supplier_plot_number)
VALUES ('S2', 'S2', '03001234567', 'email', 'Karachi', 'Pakistan', 'Street 3', 'Plot 1');

INSERT INTO Suppliers (supplier_first_name, supplier_last_name, supplier_phone_number, supplier_email, supplier_city, supplier_country, supplier_street_address, supplier_plot_number)
VALUES ('S3', 'S3', '03001234567', 'email', 'Karachi', 'Pakistan', 'Street 4', 'Plot 1');

SELECT * FROM Suppliers;

-- Insert dummy data in Categories tables
INSERT INTO Categories (category_name)
VALUES ('Mens');

INSERT INTO Categories (category_name)
VALUES ('Womens');

SELECT * FROM Categories;

-- Insert dummy data in Products tables
INSERT INTO Products (ProductID, SupplierID, CategoryID, product_name, cost_price, selling_price, stock_quantity)
VALUES (111,1, 1, 'Trousers', 100, 200, 100);

INSERT INTO Products (ProductID, SupplierID, CategoryID, product_name, cost_price, selling_price, stock_quantity)
VALUES (222,2, 1, 'Shirts', 100, 200, 100);

INSERT INTO Products (ProductID, SupplierID, CategoryID, product_name, cost_price, selling_price, stock_quantity)
VALUES (333,3, 2, 'Hats', 100, 200, 100);

INSERT INTO Products (ProductID, SupplierID, CategoryID, product_name, cost_price, selling_price, stock_quantity)
VALUES (444,3, 2, 'Hats', 100, 200, 100);

INSERT INTO Products (ProductID, SupplierID, CategoryID, product_name, cost_price, selling_price, stock_quantity)
VALUES (555,3, 2, 'Hats', 100, 200, 100);

SELECT * FROM Products;

-- Trigers

-- Trigger for line_total SaleItems
CREATE OR REPLACE TRIGGER line_total
BEFORE INSERT ON SaleItems
FOR EACH ROW
DECLARE
	v_selling_price FLOAT;
	v_cost_price FLOAT;
	v_stock_quantity INT;
	v_total_sale FLOAT;
	v_total_cost FLOAT;
	v_points_received FLOAT;
BEGIN
	SELECT selling_price INTO v_selling_price FROM Products WHERE ProductID = :new.ProductID;
	SELECT cost_price INTO v_cost_price FROM Products WHERE ProductID = :new.ProductID;
	SELECT stock_quantity INTO v_stock_quantity FROM Products WHERE ProductID = :new.ProductID;
	SELECT total_sale INTO v_total_sale FROM Receipts WHERE ReceiptID = :new.ReceiptID;
	SELECT total_cost INTO v_total_cost FROM Receipts WHERE ReceiptID = :new.ReceiptID;



	if v_stock_quantity < :new.quantity_purchased THEN
		RAISE_APPLICATION_ERROR(-20001, 'Not enough stock');
		ROLLBACK;

	ELSE
	   -- updating stock quantity
		UPDATE Products
		SET stock_quantity = v_stock_quantity - :new.quantity_purchased
		WHERE ProductID = :new.ProductID;

		-- updating total sale
		UPDATE Receipts
		SET total_sale = v_total_sale + (:new.quantity_purchased * v_selling_price)
		WHERE ReceiptID = :new.ReceiptID;

		-- updating total cost
		UPDATE Receipts
		SET total_cost = v_total_cost + (:new.quantity_purchased * v_cost_price)
		WHERE ReceiptID = :new.ReceiptID;

		-- updating points received
		UPDATE Receipts
		SET points_received = (v_total_sale + (:new.quantity_purchased * v_selling_price)) * 0.01
		WHERE ReceiptID = :new.ReceiptID;


		:new.line_total := :new.quantity_purchased * v_selling_price;
	END IF;

END;
/

-- Trigger for Reorder
CREATE OR REPLACE TRIGGER Reorder
AFTER INSERT ON SaleItems
FOR EACH ROW
DECLARE
	v_stock_quantity INT;
BEGIN
	SELECT stock_quantity INTO v_stock_quantity FROM Products WHERE ProductID = :new.ProductID;

	IF v_stock_quantity <= 10 THEN
		UPDATE Products
		SET stock_quantity = v_stock_quantity + 90
		WHERE ProductID = :new.ProductID;
	END IF;
END;
/

CREATE OR REPLACE TRIGGER delete_receipt
BEFORE DELETE ON Receipts
FOR EACH ROW
DECLARE
    v_stock_quantity_original INT;
    v_bill FLOAT;
    v_points_redeemed FLOAT;
    CURSOR cursor_items_to_restore IS SELECT * FROM SaleItems WHERE ReceiptID = :old.ReceiptID;
BEGIN
    -- Calculate the total bill amount
    SELECT SUM(line_total) INTO v_bill FROM SaleItems WHERE RECEIPTID = :old.ReceiptID;

    -- Delete from SaleItems
    DELETE FROM SaleItems
    WHERE ReceiptID = :old.ReceiptID;

    -- Restore stock for each item
    FOR var_item IN cursor_items_to_restore LOOP
        -- Add back to stock
        SELECT stock_quantity INTO v_stock_quantity_original FROM Products WHERE ProductID = var_item.ProductID;
        UPDATE Products
        SET stock_quantity = v_stock_quantity_original + var_item.quantity_purchased 
        WHERE ProductID = var_item.ProductID;
    END LOOP;

    -- Take back points
    v_points_redeemed := :old.points_redeemed;  -- Assuming points_redeemed is a column in Receipts
    UPDATE Customers
    SET points = points - (v_bill * 0.01) + v_points_redeemed
    WHERE MembershipID = :old.MembershipID;
END;
/

-- -- Trigger for deleting receipt
-- CREATE OR REPLACE TRIGGER delete_receipt
-- BEFORE DELETE ON Receipts
-- FOR EACH ROW
-- DECLARE
-- 	v_stock_quantity_original INT;
-- 	v_bill FLOAT;
-- 	CURSOR cursor_items_to_restore IS SELECT * FROM SaleItems WHERE ReceiptID = :old.ReceiptID;
-- BEGIN
-- 	SELECT SUM(line_total) INTO v_bill FROM SaleItems WHERE RECEIPTID = :old.ReceiptID; 
-- 	-- delete from SaleItems
-- 	DELETE FROM SaleItems
-- 	WHERE ReceiptID = :old.ReceiptID;

-- 	FOR var_item in cursor_items_to_restore LOOP
-- 	-- for each item
-- 		-- add back to stock
-- 		SELECT stock_quantity INTO v_stock_quantity_original FROM Products WHERE ProductID = var_item.ProductID;
-- 		UPDATE Products
-- 		SET stock_quantity = v_stock_quantity_original + var_item.quantity_purchased 
-- 		WHERE ProductID = var_item.ProductID;
-- 	END LOOP;

-- 	-- take back points
-- 	UPDATE Customers
-- 	SET points = points - (v_bill * 0.01)
-- 	WHERE MembershipID = :old.MembershipID;
-- END;


-- Procedures for fetching points
CREATE OR REPLACE PROCEDURE update_points (p_isTicked IN BOOLEAN,p_membershipID IN INT, p_receiptID IN INT)
IS
	-- v_points FLOAT;
	v_total_sale FLOAT;
	v_points FLOAT;
	v_sales_final FLOAT;
	v_points_received FLOAT;
	v_points_redeeed FLOAT;
BEGIN
	Select total_sale INTO v_total_sale FROM Receipts WHERE ReceiptID = p_receiptID;
	SELECT points_received INTO v_points_received FROM Receipts WHERE ReceiptID = p_receiptID;
	SELECT points INTO v_points FROM Customers WHERE MembershipID = p_membershipID;

	IF (p_isTicked = TRUE) THEN
	
		IF (v_points >= v_total_sale) THEN
			v_points := v_points - v_total_sale;
			v_points_redeeed := v_total_sale;
			v_sales_final := 0;
		ELSE
			v_sales_final := v_total_sale - v_points;
			v_points_redeeed := v_points;
			v_points := 0;
		END IF;

		UPDATE Receipts
		SET points_redeemed = v_points_redeeed
		WHERE ReceiptID = p_receiptID;

		UPDATE Receipts
		SET sales_final = v_sales_final
		WHERE ReceiptID = p_receiptID;

		
	ELSE 
		UPDATE Receipts
		SET sales_final = v_total_sale
		WHERE ReceiptID = p_receiptID;
	END IF;

	Update CUSTOMERS
	SET points = v_points + v_points_received
	WHERE MembershipID = p_membershipID;

	Commit;
END;
/



-- Select 
SELECT * FROM SaleItems;
SELECT * FROM Products;
SELECT * FROM Receipts;
Select * FROM Customers;


-- Dummy data for Receipts
INSERT INTO Receipts (EmployeeID, MembershipID, date_receipt, time_receipt, total_cost, total_sale, points_redeemed, points_received, sales_final)
VALUES (1, 1, '04-MAR-2021', '12:00', 0, 0, 0, 0, 0);



-- Insert dummy data in SaleItems tables
INSERT INTO SaleItems (ReceiptID, ProductID, quantity_purchased)
VALUES (67, 444, 30);

exec update_points(true, 1, 67);

--return the recieptid of last receipt
SELECT ReceiptID FROM Receipts ORDER BY ReceiptID DESC FETCH FIRST 1 ROWS ONLY;

select * from RECEIPTS where RECEIPTID = 69;
select * from SaleItems where RECEIPTID = 59;
select * from CUSTOMERS where MEMBERSHIPID = 1;

-- Update all fields in product table
UPDATE Products
SET SupplierID = 1, CategoryID = 1, product_name = 'Trousers', cost_price = 100, selling_price = 200, stock_quantity = 100
WHERE ProductID = 111;


-- Hazim Checking Receipts Deletion
-- Dummy data for Receipts
INSERT INTO Receipts (EmployeeID, MembershipID, date_receipt, time_receipt, total_cost, total_sale, points_redeemed, points_received, sales_final)
VALUES (2, 2, '04-MAR-2021', '12:00', 0, 0, 0, 0, 0);

INSERT INTO SaleItems (ReceiptID, ProductID, quantity_purchased)
VALUES (1, 111, 10);

exec update_points(FALSE, 2, 1);

INSERT INTO Receipts (EmployeeID, MembershipID, date_receipt, time_receipt, total_cost, total_sale, points_redeemed, points_received, sales_final)
VALUES (2, 2, '04-MAR-2021', '12:00', 0, 0, 0, 0, 0);

INSERT INTO SaleItems (ReceiptID, ProductID, quantity_purchased)
VALUES (2, 111, 25);

exec update_points(TRUE, 2, 2);

INSERT INTO Receipts (EmployeeID, MembershipID, date_receipt, time_receipt, total_cost, total_sale, points_redeemed, points_received, sales_final)
VALUES (2, 2, '04-MAR-2021', '12:00', 0, 0, 0, 0, 0);

INSERT INTO SaleItems (ReceiptID, ProductID, quantity_purchased)
VALUES (3, 111, 10);

exec update_points(TRUE, 2, 3);

DELETE FROM Receipts
WHERE ReceiptID = 2;
