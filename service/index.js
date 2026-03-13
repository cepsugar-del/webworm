const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2]:4000;
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
let users = [];
let scores = [];

var apiRouter = express.Router();
app.use(`/api`,apiRouter);
//Creaet a user
apiRouter.post('/auth/create', async(req, res) => {
    console.log("Making user");
    if(await findUser('email', req.body.email)) {
        res.status(409).send({msg: 'Existing User'});
    }else {
        console.log("Ready");
        const user = await createUser(req.body.email, req.body.password);
        console.log(`User: ${user}`);
        setAuthCookie(res, user.token);
        console.log("cookies! " + user.token)
        res.send({email: user.email});
        console.log("Pretty much done: "+user.email);
    }
    console.log(`users: ${users}`);
});

//Login an exisiting user
apiRouter.post('/auth/login', async(req,res) =>{
    console.log("Logging in");
    const user = await findUser('email', req.body.email);
    console.log(`Found user ${user}`);
    if(user){
        console.log("That user exists");
        if (await bcrypt.compare(req.body.password, user.password)){
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({email:user.email});
            return;
        }
    }
    res.status(401).send({msg: 'Unauthorized'});
    console.log("Log in atttempt complete");
});

//Logout a user
apiRouter.delete('/auth/logout',async (req,res)=>{
    const user = await findUser('token', req.cookies[authCookieName]);
    if(user){
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

//Make sure the user is allowed to be there
const verifyAuth = async (req, res, next) =>{
    const user = await findUser('token', req.cookies[authCookieName]);
    if(user){
        next();
    }else{
        res.status(401).send({msg: 'Unauthroized'});
    }
};

//Get the scores
apiRouter.get('/score',verifyAuth, (req,res) => {
    res.send(scores);
});

//Submit the scores
apiRouter.post('/score', verifyAuth, (req,res) =>{
    scores = updateScores(req.body);
    res.send(scores);
});

//Error Handler
app.use(function (err,req,res,next) {
    res.status(500).send({type: err.name, message: err.message});
});

//Returns to default if it enters the unknown
app.use((req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

function updateScores(newScore){
    let found = false;
    for (const [i, prevScore] of scores.entries()){
        if(newScore.score > prevScore.score){
            scores.splice(i,0,newScore.score);
            found = true;
            break;
        }
    }
    if (!found){
        scores.push(newScore);
    }
    if(scores.length >10){
        scores.length = 10;
    }
    return scores;
}

async function createUser(email,password){
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email, password: passwordHash, token: uuid.v4(),};
    
    users.push(user);
    return user;
}

async function findUser(field, value) {
    if (!value) return null;
    console.log(`Field: ${field}, Value: ${value}`);
    for (const u in users){
        console.log(users[u][field]);
        if (users[u][field] === value){
            return users[u];
        }
    }
    return undefined;
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken,{ secure: true, httpOnly: true, sameSite: 'strict',});
};