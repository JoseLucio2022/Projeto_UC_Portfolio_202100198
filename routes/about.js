/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

//Import do módulo 'express'
var express = require('express');
//Import do módulo 'path'
var path = require('path');

//Cria um novo router com a utilização do express
var router = express.Router();

/**
 * Rota para a página About
 * @name get/about
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/about',function(req,res){
    const currentUser =  req.session.user;
    if(currentUser){
        res.redirect('/aboutUser');
    }else{
        res.sendFile(path.join(__dirname + "/../WWW/About.html"));}
});

//Export do router
module.exports = router;