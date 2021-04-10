import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            password: signinUser.password,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        })
    }
    else {
        res.status(401).send({msg: 'Invalid email or password'});
    }
})

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    });
    console.log(user);
    const newUser = await user.save();
    if(newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        });
    }
    else {
        res.status(401).send({msg: 'Invalid User Data'});
    }
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'mohan',
            email: 'mohankumar007gp@yahoo.com',
            password: 'qwer',
            isAdmin: true
        })
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({msg: error.message});
    }
})

router.get('/:id', async (req, res) => {
    console.log("user detail route..");
    const user = await User.findById(req.params.id);
    console.log("user detail got..", user.isAdmin);
    if(user) {
        console.log("user details being sent");
        res.send({data: user});
    } else {
        res.status(404).send("User Not found");
    }
})

export default router;