## Realized functionality:
- The Stores page where users can choose a drug store, then add medicines to the cart
(get data from the database)
- Add the ability to sort medicines by price and/or date added
- Add the ability to mark medicines as favorites. The following drugs should be
displayed first when sorting
- The Cart page where the user can check all added products, remove some of them
or change the count. And add an email, a phone number, and an address (in
inputs)
- The order should be saved in the database after the user clicks the “submit”
button
- The cart should be saved in local storage.
- Add google maps
- users can choose their address using a pin on the map or just enter an
address and show it will be shown on the map
- show a shop where the user ordered medicines from on the map
- *(extra) show route from shop to user’s address and approximately time
- *(extra) ask to enter a captcha after clicking on the “Create order” button
- users can find their orders on History page using their email and phone number
- additionaly added search medicine by name


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

DB_HOST=mongodb+srv://drugs_user:ItCVfZAAZtOkM6zg@cluster0.esxmebl.mongodb.net/db-drugs?retryWrites=true&w=majority
API_TOKEN=wi8615CDgTI4R4AuVgGePakWJb8gVaRFKV7Hostj4dHRYWiPzS0btCV7dKmItOTZ
DEV_PORT=5000
REQ_URL=http://localhost:5000/api/health

### 5. Configure Client Environment Variables

Create a `.env` file in the `client` folder with the following values:

VITE_API_URL=http://localhost:5000/api
VITE_API_TOKEN=wi8615CDgTI4R4AuVgGePakWJb8gVaRFKV7Hostj4dHRYWiPzS0btCV7dKmItOTZ
VITE_GOOGLE_API_KEY=AIzaSyA_gokE1Q7eDebRvLkpsFvDsX11UG55z4A

### 6. Start Development Servers

Run the following command to start both the server and client in developer mode:

`npm run start:dev`
