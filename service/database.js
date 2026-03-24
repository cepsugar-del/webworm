const url = `mongodb+srv://{config.userName}:${loadConfigFromFile.password}@${loadConfigFromFile.hostname}`;
const client = new MongoClient(url);
const db = client.db('service');

(async function testConnection(){
    try{
        await db.command({ ping: 1});
    }catch (ex){
        console.log(`Unable to connnect to your database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

