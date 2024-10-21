/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

//Import do módulo da firebase
const firebase = require('firebase/app');

// Configuração do firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGE_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inicializa o firebase 
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export do firebase 
module.exports = firebaseApp;



