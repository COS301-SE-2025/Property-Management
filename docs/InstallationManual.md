## Cloning Repository
1. Open a terminal or command prompt.
2. Clone the repository using the command:
   ```bash
   git clone https://github.com/COS301-SE-2025/Property-Management.git

3. Navigate to the project directory:
   ```bash
   cd Property-Management
   ```


## Running Backend
### Database Setup (PostgreSQL)

Follow the steps below to create the `property_management` database.

```bash
# 1. Switch to the postgres system user (if not already the current user)
sudo -i -u postgres

# 2. Enter the PostgreSQL interactive terminal
psql

# 3. Set the password for the 'postgres' user
ALTER USER postgres WITH PASSWORD 'pg123';

# 4. Create the new database
CREATE DATABASE property_management;

# 5. Grant all privileges on the database to the postgres user (optional, usually not needed as postgres is a superuser)
GRANT ALL PRIVILEGES ON DATABASE property_management TO postgres;

# 6. Exit the PostgreSQL terminal
\q

# 7. Return to your original user
exit
```
To run the back end, in your terminal run

```bash
make all
```

To run our unit tests, in your terminal run

```bash
make build
```
Afterwards, locate and run in your browser the index.html file to show the tests ran by in your terminal running

```bash
cd Backend/property-management/build/reports/tests/test
```


## Running Frontend
To run the full service, make sure that the backend is running in a separate terminal.

To run the Front end, in your terminal run
```bash
cd Frontend/Property-Manager
```

## Development server
To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to http://localhost:4200/.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the dist/ directory.

## Running unit tests

To execute unit tests with the karma test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```