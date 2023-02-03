# Ready Resonse

## Project Name: Ready Response

[Ready Response](https://ready-response.onrender.com)

Ready Response is designed to help responders before they arrive to an emergency. When dispatched to an address, responders are able to access owner information, google maps data, details from past inspections, and images/plans for the address. Sign up for Ready Response to be able manage addresses and inspections. Currently, all users are given add, update, and delete permissions. In a scalable version, these permissions would be limited to organization's admin or inspectors. Join our Ready Response community and be ready to respond!

## Tech Stack:
- Javascript
- Node.js
- Flask.js
- React
- Redux
- SQLalchemy
- Python 3
- Alembic
- JSX
- SQLite3
- Html/CSS
- Google Maps API
- Google API Address Validator
- AWS S3 Buckets

### Database:
[Postgres](https://www.postgresql.org/)

## Hosting:
[Render](https://render.com/)

## Core Features:
### Signup/Login
* Users can sign up, log in, and log out.
* Users can use a demo log-in to try the site.
* Users can only access splash/login/sign up when not logged in.
* Upon login User will be redirected to the home page.

### Addresses (CRUD)
* Logged-in users can create addresses.
* Logged-in users can view all addresses.
* Logged-in users can update the owner information of an address.
* Logged-in users can delete any address other than the 3 seed addresses.

### Inspections (CRUD)
* Logged-in users can create an inspection for any address.
* Logged-in users can read any past inspection for an address.
* Logged-in users can update any past inspection for an address.
* Logged-in users can delete any past inspection for an address.

### Address Plans/Images (CRD)
* Logged-in users can create/upload plans/images for addresses.
* Logged-in users can read all plans/images for addresses.
* Logged-in users can delete plans/images for addresses.

### Inspection Images (CRD)
* Logged-in users can create/upload images for failed inspection questions.
* Logged-in users can view images for failed inspection questions.
* Logged-in users can remove images for failed inspection questions by editing the inspection and changing the response to 'PASS'.

## Bonus Features
### Google API Address Validation
* All addresses and validated/updated by the Google API Address Validator before being sent to the database.
* Validation errors from the Google API Address Validator are displayed to the user prior to database submission.

### Google Maps API Integrations
* Logged-in users can view the integrated overhead satellite map and google street view when viewing addresses.

### AWS Photo Upload
* Logged-in users can upload photos/plans for an address via AWS.
* Logged-in users can read photos/plans for each address.
* Logged-in users can delete photos/plans for each address.

## Running the app locally:

1. Clone this repository

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db migrate
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, in a different terminal, cd inside the `react-app`, install dependence, and start the react app.

    ```bash
    cd react-app/
    ```

    ```bash
    npm install
    ```

    ```bash
    npm start
    ```

## Developer Contact:
Owen Shoop
- [LinkedIn](https://www.linkedin.com/in/owen-shoop-62ba36231/)
- [Github](https://github.com/owencshoop)
