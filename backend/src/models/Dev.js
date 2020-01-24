const mongoose = require('mongoose')
const PointScheema = require('./utils/PointScheema')

const DevSchema = new mongoose.Schema({
    name : String,
    github_username : String,
    bio : String,
    avatar_url : String,
    techs : [String],
    location : {
        type : PointScheema,
        index : '2dsphere'
    }
})

module.exports = mongoose.model('Dev', DevSchema)
