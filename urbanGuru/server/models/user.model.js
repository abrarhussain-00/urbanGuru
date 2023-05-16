const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be at least 2 characters long"]
    }, 
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be at least 2 characters long"]
    },
    userName: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters long"], 
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Pasword must be at least 8 characters long"]
    },

    // favorites: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Favorite"
    // }]
}, { timestamps: true });

//*************************************************** conf password*******************/
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        console.log(this.password)
        console.log(this.confirmPassword)
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});


// this should go after 
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

UserSchema.plugin( uniqueValidator);


module.exports.User = mongoose.model("User", UserSchema);

//testing