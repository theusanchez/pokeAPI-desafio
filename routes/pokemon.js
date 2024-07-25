const express = require('express');
const axios = require('axios');
const {Pokemon} = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {

    try {
        const { name } = req.body
        console.log(name)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const {height, weight, base_experience} = response.data

        const pokemon = await Pokemon.create({name, height, weight, base_experience})
        res.status(201).json(pokemon);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
        
});

router.get('/', async (req, res) => {
    try {
        const pokemons = await Pokemon.findAll();
        res.json(pokemons);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id)
        if (!pokemon) {
            return res.status(404).json({
                error: 'Pokemon nao encontrado'
            });
        }
        res.json(pokemon);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const {height, weight, base_experience} = response.data
        
        const pokemon = await Pokemon.findByPk(req.params.id);

        if (!pokemon) {
            return res.status(404).json({
                error: 'Pokemon nao encontrado'
            });
        }

        await pokemon.update({name, height, weight, base_experience});

        res.json(pokemon);

    } catch (err) {

        res.status(500).json({ error: err.message })

    }
});


router.delete('/:id', async (req, res) => {

    try {
        const pokemon = await Pokemon.findByPk(req.params.id)

        if(!pokemon) {
            return res.status(404).json({
                error: 'Pokemon nao encontrado'
            });
        }

        await pokemon.destroy();
        res.status(204).end();

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
});

module.exports = router;