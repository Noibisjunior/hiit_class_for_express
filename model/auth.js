const mongoose = require('mongoose')

//module for hashing password
const Bcrypt = require('bcryptjs')

//creating a column inside a table
const authSchema = mongoose.Schema({
    email : {
        type : String
    },
    password : {
        type : String
    },
    
    username : {
        type : String
    }
})


authSchema.pre('save', async function () {
    const salt = await Bcrypt.genSalt(10)
    this.password = await Bcrypt.hash(this.password,salt)
})
authSchema.methods.comparePasswords = async function(candidatePassword){
    const isMatch = Bcrypt.compare(candidatePassword,this.password)
    return isMatch 
}
module.exports = mongoose.model('Auth', authSchema)