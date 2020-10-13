const db = require('../database/models');

module.exports = {
  listar: function(req,res) {
    db.Peliculas.findAll()
    .then(pelicula =>{
        res.render('index',{
            title: 'Peliculas',
            pelicula:pelicula
        })
    })
},
    detalle: function(req,res) {
      let idMovies = req.params.id
        db.Peliculas.findByPk(idMovies)
        .then(function(pelicula){
          res.render('detail',{
            title: 'Detalle de la pelicula',
            pelicula:pelicula
          })
        })
      
    },

    new: function(req,res) {
      db.Peliculas.findAll({
        order: [["release_date","DESC"]]
     })
       .then(pelicula =>{
        res.render('index',{
          title: 'Peliculas nuevas',
          pelicula:pelicula
        })
     })
    },
    recomendado: function(req,res) {
      db.Peliculas.findAll({
        where: {rating : 9}
     })
       .then(pelicula =>{
        res.render('index',{
          title: 'Peliculas recomendadas',
          pelicula:pelicula
        })
     })

    },

    /*No me salio la busqueda*/ 
    busqueda: function(req,res) {
        let search = req.query.search
        db.Peliculas.findAll({
          where:{
            title: {[db.Sequelize.Op.like] : `%${search}%` }
          }
        })
        .then ((resultado) =>{
          res.render('index',{
            title: 'Resultado de la busqueda',
            resultado:resultado
          })
          .catch(error=>{
            res.send(error)
          })
        })
    },
    form: function(req,res) {
      res.render('forCarga',{
        title: 'Crear pelicula'
      })
    },
    create: function(req,res) {
      db.Peliculas.create({
        title:req.body.title,
        rating:req.body.rating,
        awards:req.body.awards,
        release_date:req.body.release_date,
        length:req.body.length,
        image: 'default.png'

      })
      .then(pelicula=>{
        res.redirect('/movies')
      })
      .catch(error =>{
        res.send(error)
      })
    },
    formu: function(req,res) {
     db.Peliculas.findByPk(req.params.id)
     .then(pelicula =>{
       res.render('forEdit',{
         title: 'Editar pelicula',
         pelicula:pelicula
       })
     })
    },
    edit: function(req,res) {
     db.Peliculas.update({
      title:req.body.title,
      rating:req.body.rating,
      awards:req.body.awards,
      release_date:req.body.release_date,
      length:req.body.length,
      image: 'default.png',
     },{

     where:{
       id: req.params.id
     }
    })
    .then(pelicula=>{
      res.redirect('/movies/detail/' + req.params.id)
    })
    },
    delete: function(req,res) {
    db.Peliculas.destroy({
      where:{
        id:req.params.id
      }
    })
    .then(pelicula =>{
      res.redirect('/movies')
    })
  }
}