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

// Import de métodos 'getAuth','signInWithEmailAndPassword','signInWithCustomToken' do módulo 'firebase/auth'
const { getAuth, signInWithEmailAndPassword,signInWithCustomToken } = require('firebase/auth');

// Import de métodos 'getFirestore','collection','doc','getDocs','setDoc','updateDoc','addDoc' do módulo 'firebase/firestore
const { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, getDocs, collection } = require('firebase/firestore');

// Import da firebase
const firebaseApp = require('../config/connectionFirebase');

// Import dos métodos 'check' e 'validationResult' do módulo express-validator
const { check, validationResult } = require('express-validator');

// Import dos métodos 'OAuth2Client' do módulo google-auth-library
const { OAuth2Client } = require('google-auth-library');

// Import do módulo axios
const axios = require('axios');

// Import da firebase admin
const adminApp  = require('../config/connectionFirebase-admin');


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
    .withMessage('No mínimo deve conter 8 caracteres e no máximo 32')
    .trim()
    .escape(),
  check('email')
    .isEmail()
    .withMessage('Endereço de correio eletrónico incorreto')
    .trim()
    .escape(),
];

/**
 * Rota para a página de login
 * @name get/login
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname + "/../WWW/Login.html"));
});


/**
 * Rota para realizar o login
 * @name post/loginForm
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.email - O email do utilizador.
 * @param {string} req.body.password - A password do utilizador.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/loginForm', validator, async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(500).json({ success: false, message: 'Erro ao validar o formulário' });
  } else {
    try {

      const recaptchaToken = req.body['g-recaptcha-response'];
      if (!recaptchaToken) {
        return res.status(400).json({ success: false, message: 'Token reCAPTCHA não fornecido.' });
      }

      // Verifica o token reCAPTCHA
      const secretKey = 'YOUR_RECAPTCHA_SECRET_KEY'; // Substitua pelo sua chave secreta do reCAPTCHA
      const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

      const response = await axios.post(verificationUrl);
      const data = await response.data;

      // Verifica se a resposta do reCAPTCHA é válida
      if (!data.success || data.score < 0.7) { 
        return res.status(400).json({ success: false, message: 'Falha na verificação reCAPTCHA.' });
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const emailVerified = userDoc.data().emailVerified;

      if ((user && emailVerified) || (user && user.emailVerified)) {
        await updateDoc(doc(db, 'users', user.uid), {
          emailVerified: true
        });

        if (userDoc.exists()) {
          const userType = userDoc.data().userType;
          if (userType === 'User' || userType === 'Admin') {
            // Armazene os dados do utilizador na sessão do Express
            req.session.user = {
              uid: user.uid,
              email: user.email,
              userType: userType,
              emailVerified:user.emailVerified,
            };
            res.status(200).json({ success: true, message: `Login de ${userType.toLowerCase()} executado com sucesso` });
          } else {
            res.status(500).json({ success: false, message: 'Tipo de usuário desconhecido' });
          }
        } else {
          res.status(500).json({ success: false, message: 'Documento do usuário não encontrado' });
        }
      } else {
        res.status(500).json({ success: false, message: 'Credenciais incorretas' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao validar o email' });
    }
  }
});

// Instanciando o cliente fora das rotas para que seja acessível em ambas
const client = new OAuth2Client({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'https://localhost:8888/googleCallback' // URL de retorno após a autenticação
});


/**
 * Rota para realizar o login com o google
 * @name post/loginWithGoogle
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/loginWithGoogle', async (req, res) => {
  try {

    const authUrl = client.generateAuthUrl({
      access_type: 'offline', // Permite obter tokens de atualização para acesso contínuo
      scope: ['email', 'profile'] 
    });

    // Enviar a URL de autenticação como resposta
    res.send({ redirectUrl: authUrl });

  } catch (error) {
    console.error('Erro ao iniciar o login com o Google:', error);
    res.status(500).send('Erro ao iniciar o login com o Google');
  }
});

/**
 * Rota para realizar o login com o google
 * @name get/googleCallback
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.code - O code para criar o token de acesso.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/googleCallback', async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const userData = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: 'YOUR_TOKEN_AUDIENCE',
    });

    const { email } = userData.payload;

    const db = getFirestore(firebaseApp);
    if (!db) {
      throw new Error('Firestore not initialized properly');
    }

    const userCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(userCollectionRef);
    
    let userExists = false;
    let userId;
    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        userExists = true;
        userId = doc.id; 
      }
    });

    const auth = getAuth(firebaseApp);

    if (userExists) {
  
      const customToken = await adminApp.auth().createCustomToken(userId);
      await signInWithCustomToken(auth, customToken);

      await adminApp.auth().updateUser(userId,{
        email:email,
    });
    
      // Se o utilizador já existe no Firestore, armazene os dados do utilizador na sessão do Express
      req.session.user = {
        uid: userId,
        email: email,
        userType: 'User',
        emailVerified: true 
      };

      await updateDoc(doc(db, 'users', userId), {
      emailVerified: true
    });
    } else {
     
      // Se o utilizador não existe no Firestore, cria um novo documento para ele
      const newUserRef = await addDoc(collection(db, 'users'), {
        uid: '',
        userType: 'User',
        name: '',
        email: email,
        userName: '',
        phoneNumber: '',
        country: '',
        postalCode: '',
        region: '',
        city: '',
        address: '',
        address1: '',
        termsAndPrivacyPolitics: 'Aceito',
        createdAt: new Date(),
        emailVerified:true
      });

      userId = newUserRef.id;

      // Atualiza o documento com o ID gerado na criação
      await updateDoc(doc(db, 'users', userId), {
        uid: userId
      });

      const customToken = await adminApp.auth().createCustomToken(userId);
      await signInWithCustomToken(auth, customToken);

      await adminApp.auth().updateUser(userId,{
        email:email,
    });
    
      // Armazene os dados do utilizador na sessão do Express
      req.session.user = {
        uid: userId,
        email: email,
        userType: 'User',
        emailVerified: true 
      };
    }

    // Redirecionar o utilizador para a página desejada após o login
    res.redirect('/homePageUser');
  } catch (error) {
    console.error('Erro ao iniciar o login com o Google:', error);
    res.status(500).send('Erro ao iniciar o login com o Google');
  }
});

// Import do módulo crypto
const crypto = require('crypto');

/**
 * Rota para realizar o login com o twitter
 * @name get/loginWithTwitter
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/loginWithTwitter', async (req, res) => {
  try {
    // Gerar um code_verifier aleatório
    const codeVerifier = crypto.randomBytes(32).toString('hex');

    // Calcular o code_challenge usando o code_verifier
    const codeChallenge = base64url(crypto.createHash('sha256').update(codeVerifier).digest());

    // Salvar o code_verifier em algum lugar para uso posterior na rota twitterCallback
    req.session.codeVerifier = codeVerifier;

    // Construir a URL de autorização com os parâmetros adicionais para PKCE
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=https://localhost:8888/twitterCallback&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    res.redirect(authUrl);
  } catch (error) {
    console.error('Erro ao iniciar o login com o Twitter:', error);
    res.status(500).send('Erro ao iniciar o login com o Twitter');
  }
});


/**
 * Rota para realizar o login com o twitter
 * @name get/twitterCallback
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.code - O code para criar o token.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/twitterCallback', async (req, res) => {
  try {
    const { code } = req.query;

    // Recuperar o code_verifier salvo
    const codeVerifier = req.session.codeVerifier;

    const tokenResponse = await axios.post(
      'https://api.twitter.com/2/oauth2/token',
      {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://localhost:8888/twitterCallback',
        code_verifier: codeVerifier
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            'YOUR_CLIENT_ID:YOUR_SECRET_CLIENT'
          ).toString('base64')}`
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;
    
    // Fazendo a solicitação para verificar as credenciais da conta
    const response = await axios.get('https://api.twitter.com/2/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': 'YOUR_CLIENT_ID',
        'Client-Secret': 'YOUR_SECRET_CLIENT',
      }
    });

    
    const db = getFirestore(firebaseApp);
    const userCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(userCollectionRef);
    const userData = response.data.data; // Obtém os dados do usuário do objeto de resposta
    const userId = userData.id; // Obtém o ID do utilizador
    const userName = userData.name; // Obtém o nome do utilizador
    const userUsername = userData.username; // Obtém o nome de utilizador
    let userExists = false;
    let userEmail= '';
    const auth = getAuth(firebaseApp);

    querySnapshot.forEach((doc) => {
      if (doc.data().uid === userId) {
        userExists = true;
        userEmail = doc.email;
      }
    });

    if (userExists) {
      const customToken = await adminApp.auth().createCustomToken(userId);
      await signInWithCustomToken(auth, customToken);
      // Se o utilizador já existe no Firestore, armazene os dados do utilizador na sessão do Express
      req.session.user = {
        uid: userId,
        email: userEmail, 
        userType: 'User',
        emailVerified:false, 
      };
    } else {
      const userData1 = {
        uid: userId,
        userType: 'User',
        name: userName,
        email: '', 
        userName: userUsername,
        phoneNumber: '',
        country: '',
        postalCode: '',
        region: '',
        city: '',
        address: '',
        address1: '',
        termsAndPrivacyPolitics: 'Aceito',
        createdAt: new Date(),
        emailVerified:false,
      }
      await setDoc(doc(userCollectionRef, userId), userData1);

      const customToken = await adminApp.auth().createCustomToken(userId);
      await signInWithCustomToken(auth, customToken); 
      // Armazene os dados do utilizador na sessão do Express
      req.session.user = {
        uid: userId,
        email: '', 
        userType: 'User',
        emailVerified:false 
      };

    }
    res.redirect('/account');
  } catch (error) {
    console.error('Erro ao processar o callback do Twitter:', error);
    res.redirect('/login');
  }
});


/**
 * Função auxiliar para codificar uma string em base64url.
 * Base64url é uma variação da codificação base64 que é segura para URLs.
 * 
 * @param {string} str - A string a ser codificada.
 * @returns {string} - A string codificada em base64url.
 */
function base64url(str) {
  return Buffer.from(str).toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}



//Export do router do express
module.exports = router;










