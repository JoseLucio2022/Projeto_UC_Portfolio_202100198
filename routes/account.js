/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

// Import do módulo 'express'
const express = require('express');

// Cria um router através do express
const router = express.Router();

// Import de métodos 'getAuth','signInWithEmailAndPassword','sendPasswordResetEmail' do módulo 'firebase/auth'
const { getAuth,signInWithEmailAndPassword,sendPasswordResetEmail,signOut} = require('firebase/auth');

// Import da firebase
const firebaseApp = require('../config/connectionFirebase');

// Import do módulo 'path'
var path = require('path');

// Import de métodos 'getFirestore','doc','collection','getDoc','getDocs','updateDoc','where','deleteDoc','query' do módulo 'firebase/firestore'
const { getFirestore,collection, doc, getDoc,updateDoc,getDocs,where, deleteDoc,query } = require('firebase/firestore');

// Import da firebase Admin
const adminApp = require('../config/connectionFirebase-admin');

// Import do módulo 'nodemailer'
const nodemailer = require('nodemailer');

// Configura o transporte do Nodemailer utilizando o serviço Hotmail
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'YOUR_EMAIL',
      pass: 'YOUR_PASSWORD'
    }
  });

// Obtém a instância do Firestore a partir da configuração do Firebase 
const db = getFirestore(firebaseApp);  

/**
 * Rota para a página Account
 * @name get/account
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/account', function (req, res) {
   const user = req.session.user;
    if(user){
        res.sendFile(path.join(__dirname + "/../WWW/Account.html"));
    } else {
            res.redirect('/');
    }
});

/**
 * Rota para obter os dados do utilizador
 * @name get/account/data
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/account/data', async function (req, res) {
    try {
        const user = req.session.user;
        if (user) {
            const userUid = user.uid;
            const userDocRef = doc(db, 'users', userUid);
            const userDoc = await getDoc(userDocRef);
            const userRecord = await adminApp.auth().getUser(userUid);
            
            if (!userDoc.exists()) {
                return res.status(404).json({ success: false, message: 'Documento do utilizador não encontrado' });
            }

            // Extrair os dados do documento do utilizador
            const userData = userDoc.data();

            // Enviar os dados do utilizador como resposta
            res.status(200).json({ success: true, userData: userData });
        } else {
            res.status(400).json({ success: false, message: 'Utilizador não autenticado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao processar a solicitação' });
    }
});

/**
 * Rota para verificar a password
 * @name post/verify-password
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.password - A password do utilizador para verificar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/verify-password', async function (req, res) {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }

    const auth = getAuth(firebaseApp);
    const password = req.body.password;
    const email = user.email;
    await signInWithEmailAndPassword(auth, email, password)
    .then( (userCredential) => {
        res.status(200).json({success: true});
    })
    .catch((error) => {
        res.status(500).json({ success: false, message: 'Erro ao validar o email.' });
      });
});

/**
 * Rota para editar o nome de utilizador
 * @name post/edit-username
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.newUserName - O novo nome de utilizador.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-username', async function (req, res) {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
    }

    try {
        const newUserName = req.body.newUserName; 
        const userId = user.uid;
        const myCollection = collection(db, 'users');
        const userDocRef = doc(myCollection, userId);

        await updateDoc(userDocRef, { userName: newUserName });

        res.status(200).json({ success: true, message: 'Nome de usuário atualizado com sucesso.' });
    } catch(error) {
        res.status(500).json({ success: false, message: 'Erro ao alterar o nome de usuário.' });
    }
});

/**
 * Rota para a editar o nome 
 * @name post/edit-name
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.newName - O novo nome.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-name', async function (req, res) {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
    }

    try {
        const newName = req.body.newName;
        const userId = user.uid;
        const myCollection = collection(db, 'users');
        const userDocRef = doc(myCollection, userId);

        await updateDoc(userDocRef, { name: newName });

        res.status(200).json({ success: true, message: 'Nome atualizado com sucesso.' });
    } catch(error) {
        res.status(500).json({ success: false, message: 'Erro ao alterar o nome.' });
    }
});

/**
 * Rota para editar o email
 * @name post/edit-email
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.newEmail - O novo email.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-email', async function (req, res) {
    const user = req.session.user;
    const newEmail = req.body.newEmail;
    if (!user) {
        return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
    }
        try {
          
            const userId = user.uid;
            const myCollection = collection(db, 'users');
            const userDocRef = doc(myCollection, userId);
  
            await updateDoc(userDocRef, { 
                email: newEmail, 
                emailVerified: false // Definindo emailVerified como false
            });

            await adminApp.auth().updateUser(userId,{
                email:newEmail,
            });

            const link = await adminApp.auth().generateEmailVerificationLink(newEmail);

            const mailOptions = {
                from: 'Lalalautilities2024@hotmail.com',
                to: newEmail,
                subject: 'Verificação de e-mail',
                html: `Olá,<br><br>Por favor, clique no link abaixo para verificar seu e-mail:<br><br><a href="${link}">Verificar E-mail</a>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.error('Erro ao enviar e-mail:', error);
                  res.status(500).json({ success: false, message: 'Erro ao enviar e-mail de verificação.' });
                } else {
                  console.log('E-mail enviado:', info.response);
                  res.status(200).json({ success: true, message: 'E-mail de verificação enviado com sucesso.' });
                }
              });

            res.status(200).json({ success: true, message: 'Email atualizado com sucesso.' });
        } catch(error) {
            res.status(500).json({ success: false, message: 'Erro ao alterar o Email do utilizador.' });
        }
});

/**
 * Rota para enviar o email de verificação
 * @name post/sendEmailVerification
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/sendEmailVerification', async function (req, res) {
    try {
        const user = req.session.user;
        if (user) {
            const userUid = user.uid;
            const userDocRef = doc(db, 'users', userUid);
            const userDoc = await getDoc(userDocRef);
            const userEmail = userDoc.data().email;
            
            if (!userDoc.exists()) {
                return res.status(404).json({ success: false, message: 'Documento do utilizador não encontrado' });
            }
            
            const link = await adminApp.auth().generateEmailVerificationLink(userEmail);

            const mailOptions = {
                from: 'Lalalautilities2024@hotmail.com',
                to: userEmail,
                subject: 'Verificação de e-mail',
                html: `Olá,<br><br>Por favor, clique no link abaixo para verificar seu e-mail:<br><br><a href="${link}">Verificar E-mail</a>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  res.status(500).json({ success: false, message: 'Erro ao enviar e-mail de verificação.' });
                } else {
                  res.status(200).json({ success: true, message: 'E-mail de verificação enviado com sucesso.' });
                }
              });

            res.status(200).json({ success: true, message:'Email enviado com sucesso'});
        } 
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao processar a solicitação' });
    }
});

/**
 * Rota para editar a password
 * @name post/edit-password
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-password', async function (req, res) {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }
        try {
           const currentEmail = user.email;
           const auth = getAuth(firebaseApp);
           await sendPasswordResetEmail(auth, currentEmail);
            
            res.status(200).json({ success: true, message: 'Email enviado com sucesso' });
        } catch(error) {
            res.status(500).json({ success: false, message: 'Erro ao enviar o email.' });
        }
});


/**
 * Rota para editar o número de telemóvel
 * @name post/edit-phoneNumber
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.newPhoneNumber - O novo número de telemóvel.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-phoneNumber', async function (req, res) {

    const newPhoneNumber = req.body.newPhoneNumber;
    const user = req.session.user;

    if (!user) {
        return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }
        try {
           const userId = user.uid;
           const myCollection = collection(db, 'users');
           const userDocRef = doc(myCollection, userId);
   
           await updateDoc(userDocRef, { phoneNumber: newPhoneNumber });
            
            res.status(200).json({ success: true, message: 'Número de telemóvel atualizado com sucesso.' });
        } catch(error) {
            console.error('Erro ao alterar o nome de usuário:', error);
            res.status(500).json({ success: false, message: 'Erro ao alterar o nome de usuário.' });
        }
});

/**
 * Rota para editar o País
 * @name post/edit-country
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.newCountry - O novo País.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-country', async function (req, res) {
    const user = req.session.user;
    const newCountry = req.body.newCountry;
    if (!user) {
        return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }
        try {
           const userId = user.uid;
           const myCollection = collection(db, 'users');
           const userDocRef = doc(myCollection, userId);
   
           await updateDoc(userDocRef, { country: newCountry });
            
            res.status(200).json({ success: true, message: 'País atualizado com sucesso.' });
        } catch(error) {
            res.status(500).json({ success: false, message: 'Erro ao alterar País.' });
        }
});

/**
 * Rota para editar o Distrito/Região
 * @name post/edit-region
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.newRegion - A nova Região/Distrito.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-region', async function (req, res) {
    const user = req.session.user;
    const newRegion = req.body.newRegion;
    if (!user) {
        return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }
        try {
           const userId = user.uid;
           const myCollection = collection(db, 'users');
           const userDocRef = doc(myCollection, userId);
   
           await updateDoc(userDocRef, { region: newRegion });
            
            res.status(200).json({ success: true, message: 'Região atualizada com sucesso.' });
        } catch(error) {
            res.status(500).json({ success: false, message: 'Erro ao alterar Região.' });
        }
});

/**
 * Rota para editar a cidade
 * @name post/edit-city
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.newCity - A nova cidade.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-city', async function (req, res) {
    const user = req.session.user;
    const newCity = req.body.newCity;
    if (!user) {
        return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }
        try {
           const userId = user.uid;
           const myCollection = collection(db, 'users');
           const userDocRef = doc(myCollection, userId);
   
           await updateDoc(userDocRef, { city: newCity });
            
            res.status(200).json({ success: true, message: 'Cidade atualizada com sucesso.' });
        } catch(error) {
            res.status(500).json({ success: false, message: 'Erro ao alterar Cidade.' });
        }
});

/**
 * Rota para editar o endereço de morada
 * @name post/edit-address
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.newAddress - O novo endereço de morada.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-address', async function (req, res) {
    const currentUser = req.session.user;
    const newAddress = req.body.newAddress;
    if (!currentUser) {
        return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }
        try {
           const userId = currentUser.uid;
           const myCollection = collection(db, 'users');
           const userDocRef = doc(myCollection, userId);
   
           await updateDoc(userDocRef, { address: newAddress });
            
            res.status(200).json({ success: true, message: 'Endereço atualizado com sucesso.' });
        } catch(error) {
            res.status(500).json({ success: false, message: 'Erro ao alterar Endereço.' });
        }
});

/**
 * Rota para editar o endereço de morada 1 
 * @name post/edit-address1
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.newAddress1 - O novo endereço de morada 1.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-address1', async function (req, res) {
    const currentUser = req.session.user;
    const newAddress1 = req.body.newAddress1;
    if (!currentUser) {
       return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }
        try {
           const userId = currentUser.uid;
           const myCollection = collection(db, 'users');
           const userDocRef = doc(myCollection, userId);
   
           await updateDoc(userDocRef, { address1: newAddress1 });
            
            res.status(200).json({ success: true, message: 'Endereço atualizado com sucesso.' });
        } catch(error) {
            res.status(500).json({ success: false, message: 'Erro ao alterar Endereço.' });
        }
});


/**
 * Rota para editar o Código Postal
 * @name post/edit-postalCode
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.newPostalCode - O novo código de postal.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/edit-postalCode', async function (req, res) {
    const currentUser = req.session.user;
    const newPostalCode = req.body.newPostalCode;
    if (!currentUser) {
        return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }
        try {
           const userId = currentUser.uid;
           const myCollection = collection(db, 'users');
           const userDocRef = doc(myCollection, userId);
   
           await updateDoc(userDocRef, { postalCode: newPostalCode });
            
            res.status(200).json({ success: true, message: 'Código Postal atualizado com sucesso.' });
        } catch(error) {
            res.status(500).json({ success: false, message: 'Erro ao alterar Código Postal.' });
        }
});

/**
 * Rota para fazer o logOut
 * @name post/logOut
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/logOut', async function (req, res) {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }
        try {
           const auth =  getAuth(firebaseApp);
           await signOut(auth);
            req.session.destroy();
            res.status(200).json({ success: true, message: 'LogOut com sucesso.' });
        } catch(error) {
            res.status(500).json({ success: false, message: 'Erro no LogOut.' });
        }
});

/**
 * Rota para verificar se o user é admin
 * @name get/account/admin
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/account/admin', async function(req, res) {
    const currentUser = req.session.user;
    if (currentUser) {
        const userUid= currentUser.uid;
        const userDoc = await getDoc(doc(db, 'users', userUid));
        const userType = userDoc.data().userType;
        if (userType === 'Admin') {
            res.status(200).json({ success: true, message: 'Admin' });
        }
        else if(userType==='User'){
            res.status(200).json({ success: true, message: 'User' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
    }
});

/**
 * Rota para ir apanhar à bd as encomendas
 * @name get/getOrders
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/getOrders', async function(req, res) {
    const currentUser = req.session.user;
    try {
        const userId = currentUser.uid;
        const db = getFirestore(firebaseApp);
        const ordersCollection = collection(db, 'orders');
        const snapshot = await getDocs(ordersCollection);

        const orders = [];
        snapshot.forEach(doc => {
            const orderUserId = doc.data().userId;
            if(orderUserId === userId){
                orders.push(doc.data());
            }
        });
    

        return res.status(200).json({ success: true, orders: orders,userId: userId });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao obter produtos.', error: error.message });
    }
});

/**
 * Rota para verificar quantos itens tem no carrinho
 * @name get/account/cartItemCount
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/account/cartItemCount', async function (req, res) {
    try {
        // Verifica se o utilizador está autenticado
        const currentUser = req.session.user;
        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
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
 * Rota para eliminar a conta
 * @name post/deleteAccount
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/deleteAccount', async function (req, res) {
    try {
        // Verifica se o utilizador está autenticado
        const currentUser = req.session.user;
        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
        }

        // Obtém uma referência para a coleção produtos no carrinho do utilizador
        const db = getFirestore(firebaseApp);
        const userCartRef = doc(db, 'cart', currentUser.uid);
        await deleteDoc(userCartRef);

        // Obtém os documentos da coleção produtos
        const userDocRef = doc(db, 'users', currentUser.uid);
        await deleteDoc(userDocRef);
        await adminApp.auth().deleteUser(currentUser.uid);

        req.session.destroy();

        // Retorna os produtos encontrados
        return res.status(200).json({ success: true, message: 'Utilizador eliminado com sucesso' });
    } catch (error) {
        // Em caso de erro, retorna uma mensagem de erro
        return res.status(500).json({ success: false, message: 'Erro ao eliminar utilizador', error: error.message });
    }
});

/**
 * Rota para enviar o opinião sobre um produto
 * @name post/sendOpinion
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.name - O nome do produto a adicionar o comentário.
 * @param {string} req.body.comment - O comentário adicionado pelo utilizador.
 * @param {string} req.body.rating - O rating atribuido pelo utilizador.
 * @param {string} req.body.orderId - O id da encomenda.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/sendOpinion', async (req, res) => {
    const productName = req.body.name;
    const comment = req.body.comment;
    const rating = req.body.rating;
    const orderId = req.body.orderID;
    
    try {
        const currentUser = req.session.user; // Obtém o utilizador atualmente logado

        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Utilizador não autenticado.' });
        }

        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');
        
        // Procura o produto pelo nome
        const querySnapshot = await getDocs(query(productsCollection, where('name', '==', productName)));
        
        if (querySnapshot.empty) {
            return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
        }
        
        // Obtém o ID do produto
        const productId = querySnapshot.docs[0].id;
        
        // Atualiza o array de classificações do produto
        const productRef = doc(db, 'products', productId);
        const productDoc = await getDoc(productRef);
        
        if (!productDoc.exists()) {
            return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
        }

        const productData = productDoc.data();
        const ratings = productData.ratings || [];
            
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);

        const userData = userDoc.data();
        
        // Adiciona o novo comentário e classificação ao array
        ratings.push({ user: userData.userName, comment: comment, rating: rating, uid: userData.uid});
        
        // Atualiza os dados do produto na base de dados
        await updateDoc(productRef, { ratings: ratings });

        const ordersCollection = collection(db, 'orders');
        const orderRef = doc(ordersCollection, orderId); // Referência do documento da ordem
        const orderDoc = await getDoc(orderRef);

        if (!orderDoc.exists()) {
            return res.status(404).json({ success: false, message: 'Ordem não encontrada.' });
        }

        const orderData = orderDoc.data();
        const products = orderData.products;

        // Encontra o índice do produto no array de produtos
        const productIndex = products.findIndex(product => product.name === productName);

        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: 'Produto não encontrado na ordem.' });
        }

        // Verifica se o nome de usuário e o ID do usuário estão definidos
        if (!userData.userName || !userData.uid) {
            return res.status(500).json({ success: false, message: 'Nome de utilizador ou ID de utilizador não estão definidos.' });
        }

       // Verifica se o campo 'ratings' está definido para o produto
    if (!products[productIndex].ratings) {
        // Se 'ratings' não estiver definido, inicializa como um array vazio
        products[productIndex].ratings = [];
        }

        // Adiciona o novo rating ao array de ratings do produto na ordem
        products[productIndex].ratings.push({ user: userData.userName, comment: comment, rating: rating, uid: userData.uid });

        // Atualiza o documento da encomenda com o novo array de produtos
        await updateDoc(orderRef, { products: products });
        
        // Retorna todos os ratings atualizados como newRatings
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao adicionar o comentário e a classificação.' });
    }
});

/**
 * Rota para ir buscar os produtos para avaliação
 * @name get/getProductsToAvaluation
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.orderID - O id da encomenda.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */

router.get('/getProductsToAvaluation', async function(req, res) {
    const currentUser = req.session.user;
    const orderId = req.query.orderID;

    try {
        const userId = currentUser.uid;
        const db = getFirestore(firebaseApp);
        const ordersCollection = collection(db, 'orders');
        const orderDocRef = doc(ordersCollection, orderId);
        const orderDoc = await getDoc(orderDocRef);

        if (!orderDoc.exists()) {
            return res.status(404).json({ success: false, message: 'Ordem não encontrada.' });
        }

        const orderData = orderDoc.data();
        const products = [];

        const orderProducts = orderData.products || [];
        for (const product of orderProducts) {
            const productsComments = product.ratings || [];

            const userReviewedProduct = productsComments.some(rating => rating.uid === userId);

            if (!userReviewedProduct) {
                products.push(product);
            }
        }

        return res.status(200).json({ success: true, products: products });
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        return res.status(500).json({ success: false, message: error.message, error: error.message });
    }
});


//Export do express router
module.exports = router;
