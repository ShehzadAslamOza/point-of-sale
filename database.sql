-- Drop all tables when needed
-- DROP TRIGGER line_total;
-- DROP TRIGGER delete_receipt;
-- DROP PROCEDURE update_points;
-- DROP TABLE SaleItems;
-- DROP TABLE Receipts;
-- DROP TABLE Products;
-- DROP TABLE Categories;
-- DROP TABLE Employees;
-- DROP TABLE Suppliers;
-- DROP TABLE Customers;


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

-- Trigger for deleting receipt
CREATE OR REPLACE TRIGGER delete_receipt
BEFORE DELETE ON Receipts
FOR EACH ROW
DECLARE
	v_stock_quantity_original INT;
	v_bill FLOAT;
	CURSOR cursor_items_to_restore IS SELECT * FROM SaleItems WHERE ReceiptID = :old.ReceiptID;
BEGIN
	SELECT SUM(line_total) INTO v_bill FROM SaleItems WHERE RECEIPTID = :old.ReceiptID; 
	-- delete from SaleItems
	
	FOR var_item in cursor_items_to_restore LOOP
	-- for each item
		-- add back to stock
		SELECT stock_quantity INTO v_stock_quantity_original FROM Products WHERE ProductID = var_item.ProductID;
		UPDATE Products
		SET stock_quantity = v_stock_quantity_original + var_item.quantity_purchased 
		WHERE ProductID = var_item.ProductID;
	END LOOP;

	DELETE FROM SaleItems
	WHERE ReceiptID = :old.ReceiptID;

	-- take back points
	UPDATE Customers
	SET points = points - :old.points_received + :old.points_redeemed
	WHERE MembershipID = :old.MembershipID;
END;
/




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


-- Insert dummy data in Employees tables
INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone_number, employee_joining_date) 
VALUES ('Shehzad', 'Aslam', 'shehzadaslamoza@gmail.com', '03001234567', '04-MAR-2021');

INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone_number, employee_joining_date) 
VALUES ('Haider', 'Khan', 'haidercalculus@gmail.com', '03331234567', '05-MAR-2021');

INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone_number, employee_joining_date) 
VALUES ('Hazim', 'G.Farooq', 'hazimghulamfarooq19@gmail.com', '03221234567', '06-MAR-2021');

INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone_number, employee_joining_date) 
VALUES ('M', 'Shehzad', 'shehzadaslamoza6@gmail.com', '03011234567', '07-MAR-2021');

INSERT INTO Employees (employee_first_name, employee_last_name, employee_email, employee_phone_number, employee_joining_date) 
VALUES ('M', 'TEST', 'sshpointofsale@gmail.com', '03101234567', '08-MAR-2021');

-- Insert dummy data in Customer tables
INSERT INTO Customers (first_name, last_name, email, age, phone_number, points, customer_city, customer_country, customer_street_address, customer_plot_number)
VALUES ('Super', 'Man', 'superman@gmail.com', 21, '03001234565', 0, 'Karachi', 'Pakistan', 'Street 1', 'Plot 1');

INSERT INTO Customers (first_name, last_name, email, age, phone_number, points, customer_city, customer_country, customer_street_address, customer_plot_number)
VALUES ('Bat', 'Man', 'batman@gmail.com', 22, '03331234565', 0, 'Karachi', 'Pakistan', 'Street 2', 'Plot 3');

INSERT INTO Customers (first_name, last_name, email, age, phone_number, points, customer_city, customer_country, customer_street_address, customer_plot_number)
VALUES ('Captain', 'Pak', 'cappak@gmail.com', 29, '03221234565', 0, 'Karachi', 'Pakistan', 'Street 3', 'Plot 2');


-- Insert dummy data in Suppliers tables
INSERT INTO Suppliers (supplier_first_name, supplier_last_name, supplier_phone_number, supplier_email, supplier_city, supplier_country, supplier_street_address, supplier_plot_number)
VALUES ('Snoop', 'Dogg', '03001234566', 'email', 'Karachi', 'Pakistan', 'Street 5', 'Plot 7');

INSERT INTO Suppliers (supplier_first_name, supplier_last_name, supplier_phone_number, supplier_email, supplier_city, supplier_country, supplier_street_address, supplier_plot_number)
VALUES ('Walter', 'White', '03331234566', 'email', 'Karachi', 'Pakistan', 'Street 4', 'Plot 9');

INSERT INTO Suppliers (supplier_first_name, supplier_last_name, supplier_phone_number, supplier_email, supplier_city, supplier_country, supplier_street_address, supplier_plot_number)
VALUES ('Ahmar', 'Ayaz', '03221234566', 'email', 'Karachi', 'Pakistan', 'Street 7', 'Plot 8');


-- Insert dummy data in Categories tables
INSERT INTO Categories (category_name)
VALUES ('Mens');

INSERT INTO Categories (category_name)
VALUES ('Womens');


-- Insert dummy data in Products tables
INSERT INTO Products (ProductID, SupplierID, CategoryID, product_name, cost_price, selling_price, stock_quantity)
VALUES (111,1, 1, 'Trousers', 100, 200, 100);

INSERT INTO Products (ProductID, SupplierID, CategoryID, product_name, cost_price, selling_price, stock_quantity)
VALUES (222,2, 1, 'Shirts', 100, 200, 100);

INSERT INTO Products (ProductID, SupplierID, CategoryID, product_name, cost_price, selling_price, stock_quantity)
VALUES (333,3, 2, 'Hats', 100, 200, 100);

COMMIT;
