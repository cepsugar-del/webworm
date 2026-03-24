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

function getUser(email){
    return userCollection.findOne({ email:email});
}

function getUserByToken(t){
    return userCollection.findOne({token: t});
}

async function addUser(u){
    await userCollection.insertOne(u);
}

async function addUser(u){
    await userCollection.insertOne(u);
}

async function updateUser(u){
    await userCollection.updateOne({email:u.email},{$set:u});
}

async function addScore(s){
    return scoreCollection.insertOne(s);
}

function getHighScores() {
    const q = { score: { $gt: 0, $lt: 900 } };
    const o = {sort:{score:-1}, limit: 10};
    const c = scoreCollection.find(q,o);
    return c.toArray();
}