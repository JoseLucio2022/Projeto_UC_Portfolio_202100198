/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

// Import do módulo 'express'
var express = require('express');

// Import do módulo 'path'
var path = require('path');

// Cria um router através do express
var router = express.Router();

// Import da firebase
const firebaseApp = require('../config/connectionFirebase');

// Import de métodos 'getFirestore','doc','collection','getDoc','getDocs','setDoc','where','deleteDoc','query' do módulo 'firebase/firestore'
const { getFirestore, collection, getDocs, getDoc, doc, setDoc,query, where,deleteDoc } = require('firebase/firestore');

// Import do módulo do sdk do paypal
const paypal = require('@paypal/checkout-server-sdk');

// Import do módulo do nodemailer
const nodemailer = require('nodemailer');

// Import de métodos 'getAuth','signOut' do módulo 'firebase/auth'
const { getAuth,signOut } = require('firebase/auth');

// Configura o transporte do Nodemailer utilizando o serviço Hotmail
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'YOUR_EMAIL', // Insira seu endereço de email do Gmail
        pass: 'YOUR_PASSWORD' // Insira sua senha do Gmail
    }
});

/**
 * Capitaliza a primeira letra de uma string e converte o restante para minúsculas.
 *
 * @param {string} string - A string a ser capitalizada.
 * @returns {string} - A string com a primeira letra maiúscula e o restante em minúsculas.
 *
 * @example
 * // returns "Hello"
 * capitalizeFirstLetter("hello");
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/**
 * Rota para a página do carrinho
 * @name get/cart
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/cart', async function (req, res) {
    const currentUser = req.session.user;
    if (currentUser) {
        res.sendFile(path.join(__dirname, '/../WWW/Cart.html'));
    } else {
        res.redirect('/');
    }
});

/**
 * Rota para a obter os produtos que estão no carrinho
 * @name get/cartProducts
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/cartProducts', async function (req, res) {
    try {
        // Verifica se o usuário está autenticado
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
        return res.status(200).json({ success: true, products: cartProducts });
    } catch (error) {
        // Em caso de erro, retorna uma mensagem de erro
        return res.status(500).json({ success: false, message: 'Erro ao obter produtos.', error: error.message });
    }
});

/**
 * Rota para remover um produto do carrinho
 * @name post/cart/removeProduct
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body - O nome do produto a remover.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/cart/removeProduct', async (req, res) => {
    try {
        const { productName } = req.body;
        const formattedProductName = capitalizeFirstLetter(productName);

        const currentUser = req.session.user;
        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
        }

        // Obtém uma referência para a base de dados Firestore
        const db = getFirestore(firebaseApp);
        const userCartRef = doc(collection(db, 'cart'), currentUser.uid);
        const productsCollectionRef = collection(userCartRef, 'products');

        // Consulta para encontrar o documento do produto pelo nome
        const q = query(productsCollectionRef, where('name', '==', formattedProductName));

        // Obtém os resultados da consulta
        const querySnapshot = await getDocs(q);

        // Verifica se encontrou algum documento
        if (!querySnapshot.empty) {
            // Exclui o documento do produto
            const productDocRef = querySnapshot.docs[0].ref;
            await deleteDoc(productDocRef);

            return res.status(200).json({ success: true, message: 'Produto ' + productName + ' e suas fotos associadas foram removidos com sucesso.' });
        } else {
            return res.status(404).json({ success: false, message: 'Nenhum produto encontrado com o nome ' + productName + '.' });
        }
    } catch (error) {
        console.error('Erro ao remover o produto:', error);
        return res.status(500).json({ success: false, message: 'Erro ao remover o produto.', error: error.message });
    }
});


/**
 * Rota para obter os dados do utilizador 
 * @name get/getData
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/getData', async function (req, res) {
    try {
        const user = req.session.user;
        if (user) {
            const db = getFirestore(firebaseApp);
            const userUid = user.uid;
            const userDoc = await getDoc(doc(db, 'users', userUid));

            // Extrair os dados do documento do utilizador
            const userData = userDoc.data();

            // Enviar os dados do utilizador como resposta
            res.status(200).json({ success: true, userData: userData });
        } else {
            res.status(400).json({ success: false, message: 'Usuário não autenticado' });
        }
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        res.status(500).json({ success: false, message: 'Erro ao processar a solicitação' });
    }
});

/**
 * Rota para fazer o checkout da compra
 * @name post/checkout
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.orderID - O Id da encomenda.
 * @param {string} req.body.country - O País.
 * @param {string} req.body.region - A Região/Distrito.
 * @param {string} req.body.phoneNumber - O número de telemóvel.
 * @param {string} req.body.city - A Cidade.
 * @param {string} req.body.address - O endereço de morada.
 * @param {string} req.body.address1 - O endereço de morada1.
 * @param {string} req.body.postalCode - O código postal.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/checkout', async function (req, res) {
    const orderId = req.body.orderID;
    try {
        // Verifica se o utilizador está autenticado
        const currentUser = req.session.user;
        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
        }

        const { country, region, phoneNumber, city, address, address1, postalCode } = req.body; // Extrai campos do req.body

        // Calcula o valor total do carrinho
        let totalAmount = 0;
        let shipping = 0;

        // Remove os produtos do carrinho
        const db = getFirestore(firebaseApp);
        const userCartRef = doc(collection(db, 'cart'), currentUser.uid);
        const productsCollectionRef = collection(userCartRef, 'products');
        const snapshot = await getDocs(productsCollectionRef);

        const cartProducts = [];

        snapshot.forEach(doc => {
            totalAmount += parseFloat(doc.data().price.replace(',', '.'));
            shipping += parseFloat(doc.data().shipping.replace(',', '.'));
            cartProducts.push(doc.data());
            deleteDoc(doc.ref); // Adiciona o produto ao array cartProducts
        });

        // Total do preço com base nos produtos remanescentes no carrinho
        if (cartProducts.length > 4) { // Verifica o comprimento de cartProducts
            shipping /= 2;
        }

        let totalPrice = totalAmount + shipping + '€';

        // Cria um novo pedido com os detalhes do carrinho
        const ordersCollectionRef = collection(db, 'orders');
        const newOrderRef = doc(ordersCollectionRef, orderId); // Usa orderId como a referência do documento
        await setDoc(newOrderRef, {
            userId: currentUser.uid,
            orderId:orderId,
            products: cartProducts,
            totalAmount: totalPrice,
            country: country,
            region: region,
            phoneNumber: phoneNumber,
            city: city,
            address: address,
            address1: address1,
            postalCode: postalCode,
            createdAt: new Date(),
            status: 'Por enviar',
        });

            const userUid = currentUser.uid;
            const userDoc = await getDoc(doc(db, 'users', userUid));

            
            const userData = userDoc.data();

            if(userData.email===''){
                return  res.status(500).json({ success: false, message: 'Utilizador não tem email.', error: error.message });
            }

            const mailOptions = {
                from: 'Lalalautilities2024@hotmail.com', 
                to: userData.email, 
                subject: 'Novo Pedido #' + orderId,
                html: `<p>Detalhes do pedido:</p>
           <p>ID do Pedido: ${orderId}</p>
           <p>Produtos: </p>
           <ul>
               ${cartProducts.map(product => `<li>${product.name}, Preço: ${product.price}</li>`).join('')}
           </ul>
           <p>Total: ${totalPrice}</p>
           <p>País: ${country}</p>
           <p>Região: ${region}</p>
           <p>Número de Telefone: ${phoneNumber}</p>
           <p>Cidade: ${city}</p>
           <p>Endereço: ${address}</p>
           <p>Endereço 1: ${address1}</p>
           <p>Código Postal: ${postalCode}</p>
           <p>Data de Criação: ${new Date()}</p>
           <p>Status: Por enviar</p>` // Corpo do email em HTML
};

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                   console.log(error);
                } else {
                    console.log('Email enviado:', info.response);
                }
            });

        return res.status(200).json({ success: true, message: 'Pedido criado e produtos removidos do carrinho.' });
    } catch (error) {
        console.error('Erro ao processar o pagamento e criar pedido:', error);
        return res.status(500).json({ success: false, message: 'Erro ao processar o pagamento e criar pedido.', error: error.message });
    }
});

/**
 * Rota para criar a encomenda
 * @name post/create-order
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/create-order', async function (req, res) {
    try {
        // Verifica se o utilizador está autenticado
        const currentUser = req.session.user;
        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
        }

        const db = getFirestore(firebaseApp);
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        
        if (!userDocSnapshot.exists() || !userDocSnapshot.data().email || !userDocSnapshot.data().emailVerified) {
            return res.status(400).json({ success: false, message: 'O usuário não tem um email válido.' });
        }
        
        // Calcula o valor total do carrinho
        let totalAmount = 0;
        let shipping = 0;

        const userCartRef = doc(db, 'cart', currentUser.uid);
        const productsCollectionRef = collection(userCartRef, 'products');
        const snapshot = await getDocs(productsCollectionRef);

        const cartProducts = [];


        snapshot.forEach(doc => {
            totalAmount += parseFloat(doc.data().price.replace(',', '.'));
            shipping += parseFloat(doc.data().shipping.replace(',', '.'));
            cartProducts.push(doc.data());
        });

        // Total do preço com base nos produtos remanescentes no carrinho
        if (cartProducts.length > 4) {
            shipping /= 2;
        }

        let totalPrice = totalAmount + shipping;

        // Cria um ambiente PayPal
        const environment = new paypal.core.SandboxEnvironment(
            'YOUR_SANDBOX_ENVIRONMENT',
            'YOUR_SANDBOX_ENVIRONMENT'
        );

        // Cria um cliente PayPal
        const client = new paypal.core.PayPalHttpClient(environment);

        // Cria uma ordem de pagamento no PayPal
        const request = new paypal.orders.OrdersCreateRequest();
        if(totalPrice>15){
        request.prefer('return=representation');
        
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: totalPrice.toFixed(2),
                }
            }]
        });
    }

        // Executa a solicitação do PayPal
        const response = await client.execute(request);
        const orderID = response.result.id;
        const approveUrl = response.result.links.find(link => link.rel === 'approve').href;

        return res.status(200).json({ success: true, message: 'Pedido criado', orderID: orderID });
    } catch (error) {
        console.error('Erro ao processar o pagamento e criar pedido:', error);
        return res.status(500).json({ success: false, message: 'Erro ao processar o pagamento e criar pedido.', error: error.message });
    }
});


/**
 * Rota para obter o número de produtos no carrinho
 * @name get/cart/cartItemCount
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/cart/cartItemCount', async function (req, res) {
    try {
        // Verifica se o usuário está autenticado
        const currentUser = req.session.user;
        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
        }

        // Obtém uma referência para a coleção de produtos no carrinho do usuário
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
 * @name post/cart/logout
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/cart/logout', async function (req, res) {
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

/**
 * Rota para obter os produtos para venda
 * @name get/cart/getProductsToSell
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/cart/getProductsToSell', async function(req, res) {
    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);

        const products = [];
        snapshot.forEach(doc => {
            products.push(doc.data());
        });

        return res.status(200).json({ success: true, products: products });
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        return res.status(500).json({ success: false, message: 'Erro ao obter produtos.', error: error.message });
    }
});


/**
 * Rota para procurar os produtos pelo nome
 * @name get/cart/searchProductsByName
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productName - O nome do produto a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/cart/searchProductsByName', async (req, res) => {
    const productName = req.query.productName;
    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');
        let querySnapshot = await getDocs(productsCollection);
        const products = [];
               
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            if(productData.lowerCaseName.includes(productName.toLowerCase())){
                products.push(doc.data());
            }
        });

        return res.status(200).json({ success: true, products: products });
    } catch (error) {
        console.error('Erro ao pesquisar produtos:', error);
        return res.status(500).json({ success: false, message: 'Erro ao pesquisar produtos.', error: error.message });
    }
});

/**
 * Rota para mostrar os comentários do produto
 * @name post/cart/showProductsComments
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.name - O nome do produto.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/cart/showProductsComments', async function(req, res) {
    const productName = req.body.name;

    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('name', '==', productName));
        const querySnapshot = await getDocs(q);

        let ratings = [];

        querySnapshot.forEach(doc => {
            const productData = doc.data();
            // Verifica se o produto tem ratings e adiciona-os ao array ratings
            if (productData.ratings && Array.isArray(productData.ratings)) {
                // Adiciona cada rating ao array ratings
                productData.ratings.forEach(rating => {
                    ratings.push(rating);
                });
            }
        });

        if (ratings.length === 0) {
            console.error('Produto não encontrado.');
            return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
        }

        return res.status(200).json({ success: true, ratings: ratings });
    } catch (error) {
        console.error('Erro ao pesquisar produtos:', error);
        return res.status(500).json({ success: false, message: 'Erro ao pesquisar produtos.', error: error.message });
    }
});

//Export do router do express
module.exports = router;


