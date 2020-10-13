const db = require('../database/models')


module.exports = {
    listar: function(req,res) {
        db.Peliculas.findAll({
            limit: 10,
            offset: 5
        })
        .then(pelicula =>{
            res.render('index',{
                title: 'Peliculas',
                pelicula:pelicula
            })
        })
    }

}