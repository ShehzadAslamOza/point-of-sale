## Application Setup Instructions

**Before you begin:**

- Ensure you have the following installed:
  - Git
  - Node.js
  - Oracle SQL
  - A text editor (e.g., Sublime Text, Visual Studio Code)
  - SQL Developer
  - A web browser

**Step 1: Database Setup**

1. **Create a new Oracle SQL user:**

   - Open Oracle SQL PLUS.
   - Execute the following SQL statement:

   ```sql
   CREATE USER c##pointofsale IDENTIFIED BY 123;
   GRANT UNLIMITED TABLESPACE TO c##pointofsale;
   GRANT CONNECT, RESOURCE, DBA TO c##pointofsale;
   ```

2. **Import the database schema:**
   - Open the `database.sql` file in SQL Developer.
   - Run the entire script to create the database tables and populate them with initial data.

**Step 2: Backend Setup**

1. Navigate to the `backend` folder using your terminal.
2. Run the following command to install dependencies:

```
npm install
```

3. After the installation is complete, start the backend server in development mode by running:

```
npm run dev
```

**Step 3: Frontend Setup**

1. Navigate to the `frontend` folder using your terminal.
2. Run the following command to install dependencies:

```
npm install
```

3. Start the development server by running:

```
npm run dev
```

**Step 4: Accessing the application**

1. Open your web browser and navigate to `http://localhost:8081/`.
2. You should now be able to access the application.

**Step 5: Login with Google Account**

1. Click on the "Sign in with Google" button.
2. You will be redirected to the Google login page.
3. **Enter the following email address:** `sshpointofsale@gmail.com`
4. Click on the "Next" button.
5. Enter the password for the `sshpointofsale@gmail.com` account.
6. Password is `databasepointofsale`
7. Click on the "Sign in" button.

You will be automatically logged in to the application.
