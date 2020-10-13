const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.listar)
router.get('/detail/:id', moviesController.detalle)

router.get('/create',moviesController.form)
router.post('/create',moviesController.create)

router.get('/edit/:id',moviesController.formu)
router.put('/edit/:id',moviesController.edit)

router.delete('/delete/:id',moviesController.delete)

router.get('/new', moviesController.new)
router.get('/recommended', moviesController.recomendado)
router.post('/search', moviesController.busqueda)

module.exports = router
