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

// Import de métodos 'getFirestore','collection','doc','setDoc' do módulo 'firebase/firestore
const { getFirestore, collection, setDoc, doc } = require('firebase/firestore');

// Import da firebase
const firebaseApp = require('../config/connectionFirebase');

// Import de métodos 'getAuth','createUserWithEmailAndPassword','sendEmailVerification' do módulo 'firebase/auth'
const { getAuth, createUserWithEmailAndPassword,sendEmailVerification} = require('firebase/auth');

// Import dos métodos 'check' e 'validationResult' do módulo express-validator
const { check, validationResult } = require('express-validator');

// Import do módulo axios
const axios = require('axios');


/**
 * Array de validadores para verificar o formato do endereço de e-mail fornecido.
 * Utiliza a biblioteca 'express-validator' para realizar a validação.
 * Verifica se o campo de e-mail está em um formato de e-mail válido.
 * 
 * @type {Array}
 */
const validator = [
    check('password')
        .isLength({ min: 8, max: 32 })
        .withMessage('A senha deve ter entre 8 e 32 caracteres')
        .trim()
        .escape(),
    check('email')
        .isEmail()
        .withMessage('Endereço de email inválido')
        .trim()
        .escape(),
    check('userName')
        .isLength({ min: 4, max: 32 })
        .withMessage('O nome de usuário deve ter entre 4 e 32 caracteres')
        .trim()
        .escape(),
];

/**
 * Rota para a página signUp
 * @name get/signUp
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/signUp',function(req,res){
    res.sendFile(path.join(__dirname + "/../WWW/SignUp.html"));
});

/**
 * Rota para enviar o form de registo
 * @name post/signUpForm
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/signUpForm', validator, async (req, res) => {
    const db = getFirestore(firebaseApp);
    try {
        // Verifica se há erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Erro no validator', errors: errors.array() });
        }

        const { email, password, phoneNumber, userName, name } = req.body;

        // Obter o token reCAPTCHA do corpo da solicitação
        const recaptchaToken = req.body['g-recaptcha-response'];
        if (!recaptchaToken) {
            return res.status(400).json({ success: false, message: 'Token reCAPTCHA não fornecido.' });
        }

        // Verificar o token reCAPTCHA
        const secretKey = 'YOUR_RECAPTCHA_SECRET_KEY'; // Substitua pelo sua chave secreta do reCAPTCHA
        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

        const response = await axios.post(verificationUrl);
        const data = await response.data;

        // Verifica se a resposta do reCAPTCHA é válida
        if (!data.success || data.score < 0.7) { 
            return res.status(400).json({ success: false, message: 'Falha na verificação reCAPTCHA. Demasiadas tentativas de criação de conta erradas' });
        }

        const auth = getAuth(firebaseApp);

        // Cria o utilizador no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Verifica se o utilizador foi criado com sucesso
        if (userCredential && userCredential.user) {
            const user = userCredential.user;
            const userData = {
                uid: user.uid,
                userType: 'User',
                name: name,
                email: email,
                userName: userName,
                phoneNumber: phoneNumber,
                country: '',
                postalCode:'',
                region:'',
                city:'',
                address:'',
                address1:'',
                termsAndPrivacyPolitics:'Aceito',
                createdAt: new Date(),
                emailVerified: false,
            };

       
            // Adiciona os dados do utilizador ao Firestore
            const mycollection = collection(db, 'users');
            await setDoc(doc(mycollection, user.uid), userData);

            await sendEmailVerification(user);

            return res.status(200).json({ success: true, message: 'Usuário criado com sucesso' });
        } 
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Este Email já tem conta!' });
    }
});

// Export do router do express
module.exports = router;

