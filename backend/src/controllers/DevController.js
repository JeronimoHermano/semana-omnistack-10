const axios = require('axios')

const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

/*
index   - Mostrar lista do recurso
show    - Mostrar 1 único
store   - Adicionar novo
update  - Alterar
destroy - Deletar
*/

module.exports = {

    async index(req, res){
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(req, res) {
        // Desestrutura a requisição recebida para pagar o valor do item github_username diretamente
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            // Acessando dados através da API do GiHub
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
            // Seleciona apenas os dados de interesse
            const { name = login, avatar_url, bio } = response.data

            // Transforma a string de tecnologias em um vetor
            const techsArray = parseStringAsArray(techs)

            // Transforma latitude e longitude em PointScheema para que o MongoDB entenda
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
            // Filtrar conexões que estão buscando por um das tecnologias do novo dev e que esteja a até 10Km dele
            const sendSocketMessageTo = findConnections(
                {
                    latitude,
                    longitude
                },
                techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }


        return res.json(dev)
    },

    async update(){

    },

    async destroy(){

    }

}