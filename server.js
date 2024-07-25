const express = require('express')
const { sequelize } = require('./models')
const pokemonRoutes = require('./routes/pokemon')

const app = express();

app.use(express.json());
app.use('/pokemons', pokemonRoutes)

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`O servidor est'a rodando na porta ${PORT}`)
    })
})
