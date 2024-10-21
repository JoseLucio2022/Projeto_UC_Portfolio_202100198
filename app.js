/**
 * Projeto Desenvolvido por José Lúcio , atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

//Importa o módulo 'express' 
const express = require("express");

//Importa o módulo 'path'
const path = require('path');

// Importa o módulo 'body-parser' que é usado para analisar o corpo das requisições HTTP.
const bodyParser = require('body-parser');

// Importa o módulo 'https' que é usado para criar servidores HTTPS e fazer requisições HTTPS.
const https = require('https');

// Importa o módulo 'fs' que é usado para interagir com o sistema de arquivos, permitindo leitura e escrita de arquivos.
const fs = require('fs');


/**
 *  Obter a referência à Home Page
 * @type {Object}
 */
var homePage = require('./routes/homePage.js');

/**
 * Obter a referência à Home Page de Administrador
 * @type {Object}
 */
var homePageAdmin = require('./routes/homePageAdmin.js');

/**
 * Obter a referência à Home Page do user
 * @type {Object}
 */
var homePageUser = require('./routes/homePageUser.js');

/**
 * Obter a referência da página Contact 
 * @type {Object}
 */
var contact = require('./routes/contact.js');

/**
 * Obter a referência da página Contact User 
 * @type {Object}
 */
var contactUser = require('./routes/contactUser.js');

/**
 * Obter a referência do express session 
 * @type {Object}
*/
var session = require('express-session');

/**
 * Obter a referência da página de Login 
 * @type {Object}
*/
var login = require('./routes/login.js');

/**
 * Obter a referência da página de Registo
 * @type {Object}
 */
var signUp = require('./routes/signUp.js');

/**
 * Obter a referência da página da Conta
 * @type {Object}
 */
var account = require('./routes/account.js');

/**
 * Obter a referência da página About
 * @type {Object}
 */
var about = require('./routes/about.js');

/**
 * Obter a referência da página About User
 * @type {Object}
 */
var aboutUser = require('./routes/aboutUser.js');

/**
 * Obter a referência da página Recover Password 
 * @type {Object}
*/
var recoverPassword = require('./routes/recoverPassword.js');

/**
 * Obter a referência da página Admin Services
 * @type {Object}
 */
var adminServices = require('./routes/adminServices.js');

/**
 * Obter a referência da página Services
 * @type {Object}
 */
var services = require('./routes/services.js');

/**
 * Obter a referência da página Services User 
 * @type {Object}
*/
var servicesUser = require('./routes/servicesUser.js');

/**
 * Obter a referência da página Cart 
 * @type {Object}
*/
var cart = require('./routes/cart.js');

/**
 * Obter a referência da página Privacy Policy 
 * @type {Object}
*/
var privacyPolicy = require('./routes/privacyPolicy.js');

/**
  * Obter a referência da página Terms and Conditions 
  * @type {Object}
*/
var termsAndConditions = require('./routes/termsAndConditions.js');

/**importa o módulo da aplicação Express */
const app = express();

/**
 * É necessário instalar os modulos cookie-parser, express session e body-parser
 */
app.use(session({
	secret: process.env.SESSION_SECRET || 'aguardando progressões...',
	resave: false,
	saveUninitialized: true
}));

/**
 * Configura o middleware para servir arquivos estáticos.
 */
app.use(express.static(path.join(__dirname, 'WWW')));

/**
 * Configura o middleware body-parser para analisar requisições URL-encoded.
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Configura o middleware body-parser para analisar requisições JSON.
 */
app.use(bodyParser.json());

/**
 * Middleware para adicionar o usuário da sessão à requisição, se houver.
 */
app.use((req, res, next) => {
    if (req.session && req.session.user) {
      // Se houver um usuário na sessão, adicione-o ao objeto de solicitação
      req.user = req.session.user;
    }
    next();
  });
  
//Middleware para a rota com '/' na 'homePage'
app.use('/',homePage);

//Middleware para a rota com '/homePage/searchProductsByName' na 'homePage'
app.get('/homePage/searchProductsByName',homePage);

//Middleware para a rota com '/homePage/searchProductsByCategory' na 'homePage'
app.get('/homePage/searchProductsByCategory',homePage);

//Middleware para a rota com '/homePage/getCategories' na 'homePage'
app.get('/homePage/getCategories',homePage);

//Middleware para a rota com '/homePage/getSubCategories' na 'homePage'
app.get('/homePage/getSubCategories',homePage);

//Middleware para a rota com '/homePage/getProductsByCategory' na 'homePage'
app.get('/homePage/getProductsByCategory',homePage);

//Middleware para a rota com '/homePage/getProductsBySubCategory' na 'homePage'
app.get('/homePage/getProductsBySubCategory',homePage);

//Middleware para a rota com '/getProductsToSell' na 'homePage'
app.get('/getProductsToSell',homePage);

//Middleware para a rota com '/signUp' na página de 'SignUp'
app.get('/signUp',signUp);

//Middleware para a rota com '/login' na página de 'Login'
app.get('/login',login);

//Middleware para a rota com '/loginWithTwitter' na página de 'Login'
app.get('/loginWithTwitter',login);

//Middleware para a rota com '/googleCallback' na página de 'Login'
app.get('/googleCallback',login);

//Middleware para a rota com '/twitterCallback' na página de 'Login'
app.get('/twitterCallback',login);

//Middleware para a rota com '/privacyPolicy' na página 'privacyPolicy'
app.get('/privacyPolicy',privacyPolicy);

//Middleware para a rota com '/privacyPolicy/admin' na página 'privacyPolicy'
app.get('/privacyPolicy/admin',privacyPolicy);

//Middleware para a rota com '/privacyPolicy/cartItemCount' na página 'privacyPolicy'
app.get('/privacyPolicy/cartItemCount',privacyPolicy);

//Middleware para a rota com '/termsAndConditions' na página 'termsAndConditions'
app.get('/termsAndConditions',termsAndConditions);

//Middleware para a rota com '/termsAndConditions/admin' na página 'termsAndConditions'
app.get('/termsAndConditions/admin',termsAndConditions);

//Middleware para a rota com '/termsAndConditions/cartItemCount' na página 'termsAndConditions'
app.get('/termsAndConditions/cartItemCount',termsAndConditions);

//Middleware para a rota com '/recoverPassword' na página 'recoverPassword'
app.get('/recoverPassword',recoverPassword);

//Middleware para a rota com '/homePageAdmin' na página 'homePageAdmin'
app.get('/homePageAdmin',homePageAdmin);

//Middleware para a rota com '/homePageAdmin/getProductsToSell' na página 'homePageAdmin'
app.get('/homePageAdmin/getProductsToSell',homePageAdmin);

//Middleware para a rota com '/homePageAdmin/searchProductsByName' na página 'homePageAdmin'
app.get('/homePageAdmin/searchProductsByName',homePageAdmin);

//Middleware para a rota com '/homePageAdmin/searchProductsByCategory' na página 'homePageAdmin'
app.get('/homePageAdmin/searchProductsByCategory',homePageAdmin);

//Middleware para a rota com '/homePageAdmin/getProductsByCategory' na página 'homePageAdmin'
app.get('/homePageAdmin/getProductsByCategory',homePageAdmin);

//Middleware para a rota com '/homePageAdmin/getProductsBySubCategory' na página 'homePageAdmin'
app.get('/homePageAdmin/getProductsBySubCategory',homePageAdmin);

//Middleware para a rota com '/homePageAdmin/getCategories' na página 'homePageAdmin'
app.get('/homePageAdmin/getCategories',homePageAdmin);

//Middleware para a rota com '/homePageAdmin/getSubCategories' na página 'homePageAdmin'
app.get('/homePageAdmin/getSubCategories',homePageAdmin);

//Middleware para a rota com '/homePageUser' na página 'homePageUser'
app.get('/homePageUser',homePageUser);

//Middleware para a rota com '/homePageUser/getProductsToSell' na página 'homePageUser'
app.get('/homePageUser/getProductsToSell',homePageUser);

//Middleware para a rota com '/homePageUser/searchProductsByName' na página 'homePageUser'
app.get('/homePageUser/searchProductsByName',homePageUser);

//Middleware para a rota com '/homePageUser/searchProductsByCategory' na página 'homePageUser'
app.get('/homePageUser/searchProductsByCategory',homePageUser);

//Middleware para a rota com '/homePageUser/getProductsByCategory' na página 'homePageUser'
app.get('/homePageUser/getProductsByCategory',homePageUser);

//Middleware para a rota com '/homePageUser/getProductsBySubCategory' na página 'homePageUser'
app.get('/homePageUser/getProductsBySubCategory',homePageUser);

//Middleware para a rota com '/homePageUser/getCategories' na página 'homePageUser'
app.get('/homePageUser/getCategories',homePageUser);

//Middleware para a rota com '/homePageUser/getSubCategories' na página 'homePageUser'
app.get('/homePageUser/getSubCategories',homePageUser);

//Middleware para a rota com '/cartItemCount' na página 'homePageUser'
app.get('/cartItemCount',homePageUser);

//Middleware para a rota com '/services' na página 'services'
app.get('/services',services);

//Middleware para a rota com '/getShowServices' na página 'services'
app.get('/getShowServices',services);

//Middleware para a rota com '/services/searchServicesByName' na página 'services'
app.get('/services/searchServicesByName',services);

//Middleware para a rota com '/servicesUser' na página 'servicesUser'
app.get('/servicesUser',servicesUser);

//Middleware para a rota com '/servicesUser/getShowServices' na página 'servicesUser'
app.get('/servicesUser/getShowServices',servicesUser);

//Middleware para a rota com '/servicesUser/searchServicesByName' na página 'servicesUser'
app.get('/servicesUser/searchServicesByName',servicesUser);

//Middleware para a rota com '/servicesUser/cartItemCount' na página 'servicesUser'
app.get('/servicesUser/cartItemCount',servicesUser);

//Middleware para a rota com '/servicesUser' na página 'servicesUser'
app.get('/servicesUser/admin',servicesUser);

//Middleware para a rota com '/contact' na página 'contact'
app.get('/contact',contact);

//Middleware para a rota com '/contactUser' na página 'contactUser'
app.get('/contactUser',contactUser);

//Middleware para a rota com '/contactUser/admin' na página 'contactUser'
app.get('/contactUser/admin',contactUser);

//Middleware para a rota com '/contactUser/cartItemCount' na página 'contactUser'
app.get('/contactUser/cartItemCount',contactUser);

//Middleware para a rota com '/adminServices' na página 'adminServices'
app.get('/adminServices',adminServices);

//Middleware para a rota com '/showOrdersWithMoreThan45Days' na página 'adminServices'
app.get('/showOrdersWithMoreThan45Days',adminServices);

//Middleware para a rota com '/getProducts' na página 'adminServices'
app.get('/getProducts',adminServices);

//Middleware para a rota com '/getServices' na página 'adminServices'
app.get('/getServices',adminServices);

//Middleware para a rota com '/adminServices/getOrders' na página 'adminServices'
app.get('/adminServices/getOrders',adminServices);

//Middleware para a rota com '/searchProductsByName' na página 'adminServices'
app.get('/searchProductsByName',adminServices);

//Middleware para a rota com '/searchByUserID' na página 'adminServices'
app.get('/searchByUserID',adminServices);

//Middleware para a rota com '/searchOrdersByStatus' na página 'adminServices'
app.get('/searchOrdersByStatus',adminServices);

//Middleware para a rota com '/searchServicesByName' na página 'adminServices'
app.get('/searchServicesByName',adminServices);

//Middleware para a rota com '/account' na página 'account'
app.get('/account',account);

//Middleware para a rota com '/account/admin' na página 'account'
app.get('/account/admin',account);

//Middleware para a rota com '/getProductsToAvaluation' na página 'account'
app.get('/getProductsToAvaluation',account);

//Middleware para a rota com '/account/data' na página 'account'
app.get('/account/data',account);

//Middleware para a rota com '/account/cartItemCount' na página 'account'
app.get('/account/cartItemCount',account);

//Middleware para a rota com '/getOrders' na página 'account'
app.get('/getOrders',account);

//Middleware para a rota com '/about' na página 'about'
app.get('/about',about);

//Middleware para a rota com '/aboutUser' na página 'aboutUser'
app.get('/aboutUser',aboutUser);

//Middleware para a rota com '/aboutUser/admin' na página 'aboutUser'
app.get('/aboutUser/admin',aboutUser);

//Middleware para a rota com '/aboutUser/cartItemCount' na página 'aboutUser'
app.get('/aboutUser/cartItemCount',aboutUser);

//Middleware para a rota com '/cart' na página 'cart'
app.get('/cart',cart);

//Middleware para a rota com '/cart/cartItemCount' na página 'cart'
app.get('/cart/cartItemCount',cart);

//Middleware para a rota com '/cart/getProductsToSell' na página 'cart'
app.get('/cart/getProductsToSell',cart);

//Middleware para a rota com '/cart/searchProductsByName' na página 'cart'
app.get('/cart/searchProductsByName',cart);

//Middleware para a rota com '/cartProducts' na página 'cart'
app.get('/cartProducts',cart);

//Middleware para a rota com '/getData' na página 'cart'
app.get('/getData',cart);

//Middleware para a rota com '/checkout' na página 'cart'
app.post('/checkout',cart);

//Middleware para a rota com '/create-order' na página 'cart'
app.post('/create-order',cart);

//Middleware para a rota com '/homePage/showProductsComments' na página 'homePage'
app.post('/homePage/showProductsComments',homePage);

//Middleware para a rota com '/addToCart' na página 'homePageUser'
app.post('/addToCart',homePageUser);

//Middleware para a rota com '/homePageUser/logout' na página 'homePageUser'
app.post('/homePageUser/logout',homePageUser);

//Middleware para a rota com '/showProductsComments' na página 'homePageUser'
app.post('/showProductsComments',homePageUser);

//Middleware para a rota com '/servicesUser/logout' na página 'servicesUser'
app.post('/servicesUser/logout',servicesUser);

//Middleware para a rota com '/aboutUser/logout' na página 'aboutUser'
app.post('/aboutUser/logout',aboutUser);

//Middleware para a rota com '/contactUser/logout' na página 'contactUser'
app.post('/contactUser/logout',contactUser);

//Middleware para a rota com '/cart/logout' na página 'cart'
app.post('/cart/logout',cart);

//Middleware para a rota com '/cart/removeProduct' na página 'cart'
app.post('/cart/removeProduct',cart);

//Middleware para a rota com '/cart/showProductsComments' na página 'cart'
app.post('/cart/showProductsComments',cart);

//Middleware para a rota com '/adminServices/logout' na página 'adminServices'
app.post('/adminServices/logout',adminServices);

//Middleware para a rota com '/addProduct' na página 'adminServices'
app.post('/addProduct',adminServices);

//Middleware para a rota com '/addService' na página 'adminServices'
app.post('/addService',adminServices);

//Middleware para a rota com '/changeProduct' na página 'adminServices'
app.post('/changeProduct',adminServices);

//Middleware para a rota com '/dropOrdersWithMoreThan45Days' na página 'adminServices'
app.post('/dropOrdersWithMoreThan45Days',adminServices);

//Middleware para a rota com '/changeService' na página 'adminServices'
app.post('/changeService',adminServices);

//Middleware para a rota com '/updateOrderStatus' na página 'adminServices'
app.post('/updateOrderStatus',adminServices);

//Middleware para a rota com '/removeProduct' na página 'adminServices'
app.post('/removeProduct',adminServices);

//Middleware para a rota com '/removeService' na página 'adminServices'
app.post('/removeService',adminServices);

//Middleware para a rota com '/verify-password' na página 'account'
app.post('/verify-password',account);

//Middleware para a rota com '/edit-username' na página 'account'
app.post('/edit-username',account);

//Middleware para a rota com '/edit-name' na página 'account'
app.post('/edit-name',account);

//Middleware para a rota com '/edit-email' na página 'account'
app.post('/edit-email',account);

//Middleware para a rota com '/edit-password' na página 'account'
app.post('/edit-password',account);

//Middleware para a rota com '/edit-phoneNumber' na página 'account'
app.post('/edit-phoneNumber',account);

//Middleware para a rota com '/edit-country' na página 'account'
app.post('/edit-country',account);

//Middleware para a rota com '/edit-region' na página 'account'
app.post('/edit-region',account);

//Middleware para a rota com '/sendOpinion' na página 'account'
app.post('/sendOpinion',account);

//Middleware para a rota com '/getProductsToAvaluation' na página 'account'
app.post('/getProductsToAvaluation',account);

//Middleware para a rota com '/edit-city' na página 'account'
app.post('/edit-city',account);

//Middleware para a rota com '/deleteAccount' na página 'account'
app.post('/deleteAccount',account);

//Middleware para a rota com '/edit-postalCode' na página 'account'
app.post('/edit-postalCode',account);

//Middleware para a rota com '/sendEmailVerification' na página 'account'
app.post('/sendEmailVerification',account);

//Middleware para a rota com '/edit-address' na página 'account'
app.post('/edit-address',account);

//Middleware para a rota com '/edit-address1' na página 'account'
app.post('/edit-address1',account);

//Middleware para a rota com '/logOut' na página 'account'
app.post('/logOut',account);

//Middleware para a rota com '/loginForm' na página 'login'
app.post('/loginForm',login);

//Middleware para a rota com '/loginWithGoogle' na página 'login'
app.post('/loginWithGoogle',login);

//Middleware para a rota com '/privacyPolitics/logout' na página 'privacyPolicy'
app.post('/privacyPolitics/logout',privacyPolicy);

//Middleware para a rota com '/termsAndConditions/logout' na página 'termsAndConditions'
app.post('/termsAndConditions/logout',termsAndConditions);

//Middleware para a rota com '/signUpForm' na página 'signUp'
app.post('/signUpForm',signUp);

//Middleware para a rota com '/recoverPasswordForm' na página 'recoverPassword'
app.post('/recoverPasswordForm',recoverPassword);

// Utiliza o fs para ler o ficheiro que contém a chave privada
const privateKey = fs.readFileSync('C:/Users/zluci/Downloads/projetoUC-Portfólio_202100198/lalala.3utilities.com/privkey.pem');

//Utiliza o fs para ler o ficheiro que contém o certificado digital
const privateCert = fs.readFileSync('C:/Users/zluci/Downloads/projetoUC-Portfólio_202100198/lalala.3utilities.com/fullchain.pem');

// O options contém a chave e o certificado e será utilizado para criar o servidor https
const options = {
    key: privateKey,
    cert: privateCert
};

/**
 * Cria e corre o servidor https
 * @param {Object} options - As opções de certificado SSL.
 * @param {Function} callback - Função de callback a ser executada após a inicialização do servidor.
 */
https.createServer(options, app).listen(8888,function () {
    console.log('Server running at https://localhost:8888');
});

//Export da aplicação express
module.exports = app;