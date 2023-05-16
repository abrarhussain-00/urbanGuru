const { model } = require('mongoose');
const { User } = require('../models/user.model')
// const { Favorite } = require('../models/favorite.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const generateID = () => Math.random().toString(36).substring(2, 10);

module.exports.register=(req,res) => {
    User.create(req.body)
    .then(user => {
        console.log(process.env.FIRST_SECRET_KEY)
        const userToken =jwt.sign({id:user._id}, process.env.FIRST_SECRET_KEY); 
        res
            .cookie("usertoken", userToken, {httpOnly:true})
            .json({ msg: "success!", user: user, id:user._id, firstName: user.firstName });

    })
    .catch(err => {
        console.log("in err" + err)
        res.status(400).json(err);
    })
}

module.exports.cookie =(req,res) => {
    res.cookie("test", "test", {httpOnly:true}).json("success")
}

module.exports.index =(req,res) => {
    User.find()
        .then(users => res.cookie("test", "test", {httpOnly:true}).json(users))
        .catch(err => res.json(err))
}

module.exports.login = async (req,res) => {
    const user = await User.findOne({userName:req.body.userName})

    if (user === null) {
        return res.sendStatus(400)
    }

    const correctPassword = await bcrypt.compare(req.body.password,user.password)


    if(!correctPassword){
        return res.sendStatus(400)
    }

    const userToken = jwt.sign({id:user._id}, process.env.FIRST_SECRET_KEY)

    res
        .cookie("usertoken", userToken, {httpOnly:true})
        .json({msg: "success!", id:user._id, firstName:user.firstName})
}


module.exports.logout = (req,res) => {
    res.clearCookie('usertoken')
    res.sendStatus(200)
}

module.exports.getUser = (req,res) => {
    const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true})
    User.findOne({_id: decodedJwt.payload.id})
        .then(oneUser => res.json(oneUser))
        .catch(err => res.status(500).json(err))
}

module.exports.findAll = (req, res) => {

    User.find()
        .then((users) => {
            res.json(users)
        })
        .catch((err) => {
            res.json({ message: 'Something went all wrong', error: err })
        });
}

module.exports.findOne = (req, res) => {
    User.findOne({ userName: req.params.userName })
        .then(user => {
            res.json({ user })
        })
        .catch((err) => {
            res.json({ message: 'Something went one wrong', error: err })
        });
}

module.exports.updateOne = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedUser => {
            res.json({user: updatedUser})
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}

module.exports.deleteOne = (req, res)=> {
    User.deleteOne({ _id: req.params.id })
    .then(result => {
        res.json({ result: result })
    })
    .catch((err) => {
        res.json({ message: 'Something went  wrong', error: err })
    });
}