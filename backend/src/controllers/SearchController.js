const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {

  async index(req, res) {

    const { latitude, longitude, techs } = req.query

    let devs

    if (!techs || techs == undefined || techs == "" || techs.length == 0) {
      devs = await Dev.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000,
          },
        },
      })
    }
    else {
      const techsArray = parseStringAsArray(techs)

      devs = await Dev.find({
        techs: {
          $in: techsArray,
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000,
          },
        },
      })
    }
    return res.json({devs})
  }

}