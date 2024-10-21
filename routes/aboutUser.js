/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

//Import do módulo 'express'
var express = require('express');

//Import do módulo 'path'
var path = require('path');

//Cria um router através do express
var router = express.Router();
//Import de métodos 'getFirestore','doc','collection','getDoc','getDocs' do módulo 'firebase/firestore'
const {getFirestore, doc,collection, getDoc,getDocs } = require('firebase/firestore');

//Import da firebase
const firebaseApp = require('../config/connectionFirebase');

//Import dos metódos 'getAuht' e 'signOut' do módulo 'firebase/auth'
const { getAuth,signOut } = require('firebase/auth');

//Apanha a base de dados do firebase
const db = getFirestore(firebaseApp); 

/**
 * Rota para a página AboutUser
 * @name get/aboutUser
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/aboutUser',function(req,res){
    const currentUser =  req.session.user;
    if(currentUser){
        res.sendFile(path.join(__dirname + "/../WWW/AboutUser.html"));
    }else{
        res.redirect('/about');}
});

/**
 * Rota para verificar se o usuário é admin
 * @name get/aboutUser/admin
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/aboutUser/admin', async function(req, res) {
    const currentUser = req.session.user;
    if (currentUser) {
        const userUid= currentUser.uid;
        const userDoc = await getDoc(doc(db, 'users', userUid));
        const userType = userDoc.data().userType;
        if (userType === 'Admin') {
            res.status(200).json({ success: true, message: 'Admin' });
            console.log('admin');
        }
        else if(userType==='User'){
            res.status(200).json({ success: true, message: 'User' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
    }
});

/**
 * Rota para obter a contagem de itens no carrinho do usuário
 * @name get/aboutUser/cartItemCount
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/aboutUser/cartItemCount', async function (req, res) {
    try {
        // Verifica se o utilizador está autenticado
        const currentUser = req.session.user;
        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
        }

        // Obtém uma referência para a coleção produtos no carrinho do utilizador
        const db = getFirestore(firebaseApp);
        const userCartRef = doc(collection(db, 'cart'), currentUser.uid);
        const productsCollectionRef = collection(userCartRef, 'products');

        // Obtém os documentos da coleção produtos
        const snapshot = await getDocs(productsCollectionRef);

        // Mapeia os documentos para obter os dados dos produtos
        const cartProducts = snapshot.docs.map(doc => doc.data());

        // Retorna os produtos encontrados
        return res.status(200).json({ success: true, numberOfProducts: cartProducts.length });
    } catch (error) {
        // Em caso de erro, retorna uma mensagem de erro
        return res.status(500).json({ success: false, message: 'Erro ao obter produtos.', error: error.message });
    }
});

/**
 * Rota para logout do usuário
 * @name post/aboutUser/logout
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/aboutUser/logout', async function (req, res) {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
    }
        try {
           const auth =  getAuth(firebaseApp);
           await signOut(auth);
            req.session.destroy();
            res.status(200).json({ success: true, message: 'LogOut com sucesso.' });
        } catch(error) {
            console.error('Erro ao fazer o logout:', error);
            res.status(500).json({ success: false, message: 'Erro no LogOut.' });
        }
});


//Export do router 
module.exports = router;