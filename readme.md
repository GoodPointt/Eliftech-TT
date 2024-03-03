## How to Run the Project Locally

### 1. Download or Clone Repository

### 2. Install Dependencies
Run the following command to install dependencies:

`npm i`

   
### 3. Install Server and Client Packages
Run the following command to install both server and client packages:

`npm run install-all`

   
### 4. Configure Server Environment Variables
Create a `.env` file in the `server` folder with the following values:

`DB_HOST=mongodb+srv://drugs_user:ItCVfZAAZtOkM6zg@cluster0.esxmebl.mongodb.net/db-drugs?retryWrites=true&w=majority`
`API_TOKEN=wi8615CDgTI4R4AuVgGePakWJb8gVaRFKV7Hostj4dHRYWiPzS0btCV7dKmItOTZ`
`DEV_PORT=5000`
`REQ_URL=http://localhost:5000/api/health`

### 5. Configure Client Environment Variables
Create a `.env` file in the `client` folder with the following values:

`VITE_API_URL=http://localhost:5000/api`
`VITE_API_TOKEN=wi8615CDgTI4R4AuVgGePakWJb8gVaRFKV7Hostj4dHRYWiPzS0btCV7dKmItOTZ`

### 6. Start Development Servers
Run the following command to start both the server and client in developer mode:

`npm run start:dev`
