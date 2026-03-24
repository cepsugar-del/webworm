const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2]:4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Creaet a user
apiRouter.post('/auth/create', async(req, res) => {
    if(await findUser('email', req.body.email)) {
        res.status(409).send({msg: 'Existing User'});
    }else {
        const user = await createUser(req.body.email, req.body.password);
        setAuthCookie(res, user.token);
        res.send({email: user.email});
    }
});

//Login an exisiting user
apiRouter.post('/auth/login', async(req,res) =>{
    const user = await findUser('email', req.body.email);
    if(user){
        if (await bcrypt.compare(req.body.password, user.password)){
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({email:user.email});
            return;
        }
    }
    res.status(401).send({msg: 'Unauthorized'});
});

//Logout a user
apiRouter.delete('/auth/logout',async (req,res)=>{
    const user = await findUser('token', req.cookies[authCookieName]);
    if(user){
        await DB.updateUserRemoveAuth(user);
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
    const scores = DB.getHighScores();
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

async function updateScores(newScore){
    await DB.addScore(newScore);
    return DB.getHighScores();
}

async function createUser(email,password){
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email, password: passwordHash, token: uuid.v4(),};
    
    DB.addUser(user);
    return user;
}

async function findUser(field, value) {
    if (!value) return null;
    if(field === 'token'){
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken,{ maxAge: 1000 * 60 * 60 * 24 * 365, secure: true, httpOnly: true, sameSite: 'strict',});
};

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
