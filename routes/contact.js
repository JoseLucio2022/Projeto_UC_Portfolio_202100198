/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

// Import do módulo 'express'
var express = require('express');

// Import do módulo 'path'
var path = require('path');

// Cria um router através do express
var router = express.Router();

/**
 * Rota para a página Contact
 * @name get/contact
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/contact',function(req,res){
res.sendFile(path.join(__dirname + "/../WWW/Contact.html"));
});

// Export do router do express
module.exports = router;