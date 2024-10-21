/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

// Import do módulo 'express'
const express = require('express');

// Cria um router através do express
const router = express.Router();

// Import da firebase
const firebaseApp = require('../config/connectionFirebase');

// Import do módulo 'path'
var path = require('path');

// Import de métodos 'getFirestore','doc','collection','getDoc','getDocs' do módulo 'firebase/firestore'
const { getFirestore, doc, getDoc,getDocs,collection } = require('firebase/firestore');

// Import de métodos 'getAuth','signOut' do módulo 'firebase/auth'
const { getAuth,signOut } = require('firebase/auth');

// Obtém a instância do Firestore a partir da configuração do Firebase 
const db = getFirestore(firebaseApp);  

/**
 * Rota para a página ContactUser
 * @name get/contactUser
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/contactUser', function (req, res) {
   const currentUser = req.session.user;
    if(currentUser){
        res.sendFile(path.join(__dirname + "/../WWW/ContactUser.html"));
    } else {
            res.redirect('/contact');
    }
});

/**
 * Rota para verificar se o user é admin
 * @name get/contactUser/admin
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/contactUser/admin', async function(req, res) {
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
 * Rota para verificar o número de produtos que estão no carrinho
 * @name get/contactUser/cartItemCount
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/contactUser/cartItemCount', async function (req, res) {
    try {
        // Verifica se o utilizador está autenticado
        const currentUser = req.session.user;
        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
        }

        // Obtém uma referência para a coleção de produtos no carrinho do utilizador
        const db = getFirestore(firebaseApp);
        const userCartRef = doc(collection(db, 'cart'), currentUser.uid);
        const productsCollectionRef = collection(userCartRef, 'products');

        // Obtém os documentos da coleção de produtos
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
 * Rota para fazer o logout
 * @name post/contactUser/logout
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/contactUser/logout', async function (req, res) {
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

// Export do router do express
module.exports = router;