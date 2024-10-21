/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

//Import do módulo 'firebase-admin'
const admin = require('firebase-admin');
//Import do módulo do sdk do firebase admin
var serviceAccount = require("Your_Json"); 

//Inicialização do firebase admin
var adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//export do firebase admin
module.exports = adminApp;