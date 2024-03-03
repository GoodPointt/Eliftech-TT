To run project localy:

- 1. Download or clone repository.

- 2. "npm i" command to install dependencies.

- 3. "npm run install-all" command to install both, server and client packages.

- 4. Create .env file in server folder with values:
     DB_HOST=mongodb+srv://drugs_user:ItCVfZAAZtOkM6zg@cluster0.esxmebl.mongodb.net/db-drugs?retryWrites=true&w=majority
     API_TOKEN=wi8615CDgTI4R4AuVgGePakWJb8gVaRFKV7Hostj4dHRYWiPzS0btCV7dKmItOTZ
     DEV_PORT=5000
     REQ_URL=http://localhost:5000/api/health

- 5. Create .env file in client folder with values:
     VITE_API_URL=http://localhost:5000/api
     VITE_API_TOKEN=wi8615CDgTI4R4AuVgGePakWJb8gVaRFKV7Hostj4dHRYWiPzS0btCV7dKmItOTZ

- 6. "npm run start:dev" command to run both, server and client, into developers mode.
