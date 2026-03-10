const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const port = process.argv.length > 2 ? process.argv[2]:3000;
app.use(express.json());

let users = [];
let scores = [];

let apiRouter = express.Router();
app.use('/api',apiRouter);

//Creaet a user
apiRouter.post('/auth/create', async(requestAnimationFrame, res) => {
    if(await findUser('email', requestAnimationFrame.body.email)) {
        res.status(409).send({msg: 'Existing User'});
    }else {
        const user = await createUser(requestAnimationFrame.body.email, requestAnimationFrame.body.password);
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
            setAuthCookie(res, user.token);
            res.send({email:user.email});
            return;
        }
    }
    res.status(401).send({msg: 'Unauthroized'});
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
    const user = await findUser('token', requestAnimationFrame.cookies[authCookieName]);
    if(user){
        next();
    }else{
        res.status(401).send({msg: 'Unauthroized'});
    }
};

//Get the scores
apiRouter.get('/scores',verifyAuth, (req,res) => {
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
app.use((requ, res) => {
    res.sendFile('index.html', {root: 'public'});
});