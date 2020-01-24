const mongoose = require('mongoose')

const PointScheema = new mongoose.Schema({
    type : {
        type : String,
        enum : ['Point'],
        required : true
    },
    coordinates : {
        type : [Number],
        required : true
    },
})

module.exports = PointScheema