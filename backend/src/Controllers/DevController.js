const axios = require('axios')
const Dev = require('../models/Dev')
const ParseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {
    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        try {
            if (!dev) {
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

                const { name = login, avatar_url, bio } = apiResponse.data

                const techsArray = ParseStringAsArray(techs)

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
            }
            return res.status(201).json(dev)
        }
        catch (err) {
            return res.status(500).json(err)
        }
        finally {
            const sendSocketMessageTo = findConnections({
                latitude, longitude
            }, techsArray)
            console.log(sendSocketMessageTo)
            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }
    },

    async updateDev() {
        //Mudar: Nome, avatarUrl, bio, coordenadas e tecnologias
        const { github_username } = req.params;

        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            return res.status(400).json({ message: "Usuário não encontrado!" });
        }

        const {
            name = dev.name,
            bio = dev.bio,
            longitude = dev.location.coordinates[0],
            latitude = dev.location.coordinates[1],
            avatar_url = dev.avatar_url } = req.body;

        const techs = req.body.techs ? parseStringAsArray(req.body.techs) : dev.techs;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
        try {
            let updatedDev = await Dev.findOneAndUpdate(github_username, { name, techs, bio, avatar_url, location }, {
                new: true
            });

            return res.json(updatedDev);
        }
        catch (err) {
            res.status(400).json({ message: 'Erro ao atualizar o usuário' + err })
        }
    },

    async deleteDev(req, res) {
        //apagar um dev
        try {
            const delDev = await Dev.findOneAndDelete(this.Dev)
            return res.status(200).json({ message: 'Usuário apagado: ' + delDev.github_username },
                { deleted: true }
            )

        } catch (err) {
            res.status(400).json({ message: 'Erro ao apagar o usuário' })
        }
    }
}