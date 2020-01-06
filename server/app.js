const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const Contact = require('./models/contact')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/contact-list', {useNewUrlParser: true,useUnifiedTopology: true})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',function (req,res) {
    Contact.find()
        .then(contacts => res.status(200).json(contacts))
        .catch(err => res.status(400).json(err))
})

app.post('/',function (req,res) {
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    })
        .then(contact => res.status(201).json(contact))
        .catch(err => res.status(400).json(err.errors.phone.message))
})

app.put('/',function (req,res) {
    console.log(req.body)
    Contact.updateOne({_id:req.body.id},{
        $set:
        {
            name:req.body.name,
            phone:req.body.phone
        }
    }, { runValidators:true })
        .then(result => {
            res.status(201).json(result)
            console.log(result)
        })
        .catch(err => res.status(400).json(err))
})

app.delete('/',function (req,res) {
    Contact.deleteOne({_id:req.body.id})
        .then(result => res.status(201).json(result))
        .catch(err => res.status(400).json(err))
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})