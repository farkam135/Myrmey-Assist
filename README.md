![Myrmey the Anteater](https://image.ibb.co/mOvUkm/rsz_myrmey.png)
# Myrmey Assist
An all in one UCI SOC
## How To Run
### Database Setup
1. Install postgreSQL
2. Create a database, I named mine myrmey
3. Execute `setup/myrmeydb.sql` to create all required tables

### Web Server Setup
1. `cd ./project-myrmey`
2. Modify `config.json` to set your db options as well as the server's salt for hashing purposes
2. Start the web server: `npm i && npm start`

### Website Development
Start the react development server by running: `cd ./web && npm i && npm start`
Make sure the web server and database are running as well!
