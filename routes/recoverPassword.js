/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

// Import do módulo 'express'
const express = require('express');

// Cria um router através do express
const router = express.Router();

// Import do módulo 'path'
var path = require('path');

// Import de métodos 'getAuth','sendPasswordResetEmail' do módulo 'firebase/auth'
const { getAuth, sendPasswordResetEmail } = require('firebase/auth');

// Import da firebase
const firebaseApp = require('../config/connectionFirebase');

// Import da firebase admin
const adminApp = require('../config/connectionFirebase-admin');

// Import dos métodos 'check' e 'validationResult' do módulo express-validator
const { check, validationResult } = require('express-validator');

/**
 * Array de validadores para verificar o formato do endereço de e-mail fornecido.
 * Utiliza a biblioteca 'express-validator' para realizar a validação.
 * Verifica se o campo de e-mail está em um formato de e-mail válido.
 * 
 * @type {Array}
 */
const validator = [
  check('email')
    .isEmail()
    .withMessage('Endereço de correio eletrónico incorreto')
    .trim()
    .escape(),
];

/**
 * Rota para a página HomepageUser
 * @name get/recoverPassword
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/recoverPassword',function(req,res){
  res.sendFile(path.join(__dirname + "/../WWW/RecoverPassword.html"));
});

/**
 * Rota POST para processar o formulário de recuperação de senha.
 * Valida o email fornecido no corpo da solicitação e envia um email de redefinição de senha,
 * se o email estiver associado a uma conta de usuário.
 * 
 * @param {Object} req - Objeto de requisição HTTP contendo o email do usuário a ser recuperado.
 * @param {string} req.body.email - O email do usuário para recuperar a senha.
 * @param {Object} res - Objeto de resposta HTTP.
 * @returns {Object} - Retorna um objeto JSON indicando o sucesso ou falha do envio do email.
 */
router.post('/recoverPasswordForm', validator, async (req, res) => {
  const { email } = req.body;
  const auth = getAuth(firebaseApp);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      res.status(500).json({ success: false, message: 'Erro ao validar o email' });
    } else {
      // Verifica se o email está associado a uma conta de utilizador
      const userRecord = await adminApp.auth().getUserByEmail(email);
      // Se o email estiver associado a uma conta de usuário, envia o email de redefinição de senha
      if (userRecord) {
        await sendPasswordResetEmail(auth, email);
        // Retorna um JSON indicando que o email foi enviado com sucesso
        res.json({ success: true, message: 'Email enviado com sucesso' });
      } else {
        console.error('Erro ao recuperar métodos de login para o e-mail:', error);
        // Se ocorrer um erro, retorna um JSON indicando que ocorreu um erro ao enviar o email
        res.status(500).json({ success: false, message: 'Erro ao enviar o email de recuperação de senha' });
      }
    }
  } catch (error) {
    console.error('Erro ao recuperar métodos de login para o e-mail:', error);
    // Se ocorrer um erro, retorna um JSON indicando que ocorreu um erro ao enviar o email
    res.status(500).json({ success: false, message: 'Erro ao enviar o email de recuperação de senha' });
  }
});

// Export do router do express
module.exports = router;


