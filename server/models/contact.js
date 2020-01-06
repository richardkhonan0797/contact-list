const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    name:{
        type:String,
        required:[true,'name required']
    },
    phone:{
        type:String,
        required:[true,'Phone number required'],
        min:[10,'must be more than 9 digits'],
        max:[12,'must be less than 13 digits']
    }
})

const Contact = mongoose.model('Contact',contactSchema)

module.exports = Contact