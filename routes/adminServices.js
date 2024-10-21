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

// Import de métodos 'getAuth','signOut' do módulo 'firebase/auth'
const { getAuth,signOut } = require('firebase/auth');

// Import da firebase
const firebaseApp = require('../config/connectionFirebase');

// Import de métodos 'getFirestore','doc','collection','getDoc','getDocs','setDoc','updateDoc','where','deleteDoc','query' do módulo 'firebase/firestore'
const { getFirestore, updateDoc, doc, deleteDoc, getDoc, getDocs, setDoc, collection, query, where } = require('firebase/firestore');

// Import de métodos 'getStorage','ref','uploadBytes','getDownloadURL','deleteObject' do módulo 'firebase/storage'
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');

// Import do módulo multer
const multer = require("multer");

//Import do módulo nodemailer
const nodemailer = require('nodemailer');

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
 * Rota para a página Admin Services
 * @name get/adminServices
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/adminServices', async function (req, res) {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const currentUser = req.session.user;

    if (currentUser) {
        const userUid = currentUser.uid;
        const userDoc = await getDoc(doc(db, 'users', userUid));
        const userType = userDoc.data().userType;
        if (userType === 'Admin') {
            res.sendFile(path.join(__dirname + "/../WWW/AdminServices.html"));
        } else {
            res.redirect('/homePageUser');
        }

    } else {
        res.redirect('/');
    }
});

/**
 * Configura o middleware multer para lidar com o upload de arquivos.
 * Define o armazenamento em memória e limites de tamanho para os arquivos.
 * 
 * @type {Object} upload - Objeto que configura o middleware multer.
 * @property {Function} storage - Configura o armazenamento em memória para lidar com o buffer do arquivo.
 * @property {Object} limits - Define o limite de tamanho do arquivo em bytes.
 */
const upload = multer({
    storage: multer.memoryStorage(), // Armazenamento em memória para lidar com o buffer do arquivo
    limits: { fileSize: 1000000 }, // Limite de tamanho do arquivo em bytes
});

/**
 * Rota POST para adicionar um novo produto.
 * Realiza o upload das fotos do produto para o Firebase Storage e adiciona os dados do produto ao Firestore.
 * 
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @returns {Object} - Retorna um objeto JSON indicando o sucesso ou falha da operação.
 */
router.post('/addProduct', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'photo1', maxCount: 1 },
    { name: 'photo2', maxCount: 1 },
    { name: 'photo3', maxCount: 1 },
    { name: 'photo4', maxCount: 1 },
    { name: 'photo5', maxCount: 1 }
]), async function (req, res) {
    const { category,subCategory,colors, size,name, description,shipping, price } = req.body;
    const formattedName = capitalizeFirstLetter(name);
    const formattedCategory = capitalizeFirstLetter(category);
    const formattedDescription = capitalizeFirstLetter(description);
    const storage = getStorage(firebaseApp);

    try {
        const photoUrls = [];

        // Função para fazer upload de uma única foto
        const uploadPhoto = async (photoFile, fileName) => {
            if (photoFile && photoFile.length > 0) {
                const formattedFileName = capitalizeFirstLetter(fileName);
                const photoRef = ref(storage, `products/${formattedCategory}/${formattedFileName}.jpg`);
                const metadata = {
                    contentType: 'image/jpeg',
                };
                await uploadBytes(photoRef, photoFile[0].buffer, metadata);
                const downloadURL = await getDownloadURL(photoRef);
                return downloadURL;
            }
            return null; // Retorna null se não houver foto
        };

        // Upload da primeira foto
        const photoUrl = await uploadPhoto(req.files['photo'], formattedName);
        if (photoUrl) {
            photoUrls.push(photoUrl);
        }

        // Upload das demais fotos
        for (let i = 1; i <= 5; i++) {
            const fieldName = `photo${i}`;
            const photoUrl = await uploadPhoto(req.files[fieldName], `${formattedName}_${i}`);
            if (photoUrl) {
                photoUrls.push(photoUrl);
            }
        }

        const newPrice = price + '€';
        const newShipping = shipping + '€';
        const sanitizedLowerCaseName = name.replace(/[^\s\wÀ-ÿ]/gi, '').toLowerCase();
        const sanitizedCategoryLowerCase = category.replace(/[^\s\wÀ-ÿ]/gi, '').toLowerCase();
        const subCategoryLowerCase = subCategory.toLowerCase();
        // Dados do produto
        const productData = {
            category: formattedCategory,
            name: formattedName,
            description: formattedDescription,
            price: newPrice,
            photos: photoUrls,
            hidden: 'No',
            subCategory:subCategoryLowerCase,
            size:size.split(',').map(prodSize => prodSize.trim()+' cm'),
            colors:colors.split(',').map(prodColor => prodColor.trim()),
            shipping:newShipping,
            lowerCaseName: sanitizedLowerCaseName,
            categoryLowerCase: sanitizedCategoryLowerCase,
        };

        // Armazenar os dados do produto no Firestore
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');
        await setDoc(doc(productsCollection, formattedName), productData);

        return res.status(200).json({ success: true, message: 'Produto adicionado com sucesso.' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao adicionar produto.', error: error.message });
    }
});

/**
 * Rota para procurar produtos pelo nome
 * @name get/searchProductsByName
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productName - O nome do produto a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/searchProductsByName', async (req, res) => {
    const productName = req.query.productName;

    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');

        let querySnapshot;
        querySnapshot = await getDocs(productsCollection);
        const products = [];

        querySnapshot.forEach(doc => {
            const productData = doc.data();
            // Verifique se o nome do serviço contém a parte pesquisada
            if (productData.lowerCaseName.includes(productName.toLowerCase())) {
                products.push(productData);
            }
        });

        return res.status(200).json({ success: true, products: products });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao pesquisar produtos.', error: error.message });
    }
});


/**
 * Rota para obter os produtos
 * @name get/getProducts
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/getProducts', async function (req, res) {
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
        return res.status(500).json({ success: false, message: 'Erro ao obter produtos.', error: error.message });
    }
});


/**
 * Rota para alterar a visibilidade do produto
 * @name get/changeProduct
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.productName - O nome do produto.
 * @param {string} req.body.hiddenStatus - O status para o qual vai alterar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/changeProduct', async (req, res) => {
    try {
        const { productName, hiddenStatus } = req.body;
        const formattedProductName = capitalizeFirstLetter(productName);

        // Obtém uma referência para a base de dados Firestore
        const db = getFirestore();

        // Cria uma referência para a coleção 'products'
        const productsCollectionRef = collection(db, 'products');

        // Consulta para encontrar o documento do produto pelo nome
        const q = query(productsCollectionRef, where('name', '==', formattedProductName));

        // Obtém os resultados da consulta
        const querySnapshot = await getDocs(q);

        // Verifica se encontrou algum documento
        if (!querySnapshot.empty) {
            // Atualiza o estado de visibilidade do primeiro documento encontrado
            const productDocRef = querySnapshot.docs[0].ref;
            await updateDoc(productDocRef, { hidden: hiddenStatus });

            return res.status(200).json({ success: true, message: 'Visibilidade do produto atualizada com sucesso.' });
        } else {
            return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao alterar a visibilidade do produto.', error: error.message });
    }
});

/**
 * Rota para remover produtos
 * @name post/removeProduct
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.productName - O nome do produto.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/removeProduct', async (req, res) => {
    try {
        const { productName } = req.body;
        const formattedProductName = capitalizeFirstLetter(productName);


        // Obtém uma referência para a base de dados Firestore
        const db = getFirestore();

        // Cria uma referência para a coleção 'products'
        const productsCollectionRef = collection(db, 'products');

        // Consulta para encontrar o documento do produto pelo nome
        const q = query(productsCollectionRef, where('name', '==', formattedProductName));

        // Obtém os resultados da consulta
        const querySnapshot = await getDocs(q);

        // Verifica se encontrou algum documento
        if (!querySnapshot.empty) {
            // Exclui o documento do produto
            const productDocRef = querySnapshot.docs[0].ref;
            await deleteDoc(productDocRef);

            // Exclui as fotos associadas ao produto no armazenamento
            const productPhotos = querySnapshot.docs[0].data().photos;
            const storage = getStorage();
            const deletionPromises = [];
            productPhotos.forEach(photoUrl => {
                const photoRef = ref(storage, photoUrl);
                deletionPromises.push(deleteObject(photoRef));
            });

            // Espera todas as operações de exclusão serem concluídas
            await Promise.all(deletionPromises);

            return res.status(200).json({ success: true, message: 'Produto ' + productName + ' e suas fotos associadas foram removidos com sucesso.' });
        } else {
            return res.status(404).json({ success: false, message: 'Nenhum produto encontrado com o nome ' + productName + '.' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao remover o produto.', error: error.message });
    }
});

/**
 * Rota POST para adicionar um novo serviço.
 * Realiza o upload das fotos do serviço para o Firebase Storage e adiciona os dados do serviço ao Firestore.
 * 
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @returns {Object} - Retorna um objeto JSON indicando o sucesso ou falha da operação.
 */
router.post('/addService', upload.fields([
    { name: 'photoService', maxCount: 1 },
    { name: 'photo1Service', maxCount: 1 },
    { name: 'photo2Service', maxCount: 1 },
    { name: 'photo3Service', maxCount: 1 },
    { name: 'photo4Service', maxCount: 1 },
    { name: 'photo5Service', maxCount: 1 }
]), async function (req, res) {
    const { name, description } = req.body;
    const formattedName = capitalizeFirstLetter(name);
    const formattedDescription = capitalizeFirstLetter(description);
    const storage = getStorage(firebaseApp);

    try {
        const photoUrls = [];

        // Função para fazer upload de uma única foto
        const uploadPhoto = async (photoFile, fileName) => {
            if (photoFile && photoFile.length > 0) {
                const formattedFileName = capitalizeFirstLetter(fileName);
                const photoRef = ref(storage, `Services/${formattedName}/${formattedFileName}.jpg`);
                const metadata = {
                    contentType: 'image/jpeg',
                };
                await uploadBytes(photoRef, photoFile[0].buffer, metadata);
                const downloadURL = await getDownloadURL(photoRef);
                return downloadURL;
            }
            return null; // Retorna null se não houver foto
        };

        // Upload da foto principal
        const mainPhotoUrl = await uploadPhoto(req.files['photoService'], formattedName);
        if (mainPhotoUrl) {
            photoUrls.push(mainPhotoUrl);
        }

        // Upload das fotos adicionais
        for (let i = 1; i <= 5; i++) {
            const fieldName = `photo${i}Service`;
            const photoUrl = await uploadPhoto(req.files[fieldName], `${formattedName}_${i}`);
            if (photoUrl) {
                photoUrls.push(photoUrl);
            }
        }

        // Dados do serviço
        const sanitizedLowerCaseName = name.replace(/[^\s\wÀ-ÿ]/gi, '').toLowerCase();

        const serviceData = {
            name: formattedName,
            description: formattedDescription,
            photos: photoUrls,
            hidden: 'No',
            lowerCaseName: sanitizedLowerCaseName,
        };


        // Salvar os dados do serviço no Firestore
        const db = getFirestore(firebaseApp);
        const servicesCollection = collection(db, 'Services');
        await setDoc(doc(servicesCollection, formattedName), serviceData);

        return res.status(200).json({ success: true, message: 'Serviço adicionado com sucesso.' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao adicionar Serviço.', error: error.message });
    }
});

/**
 * Rota para obter serviços
 * @name get/getServices
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/getServices', async function (req, res) {
    try {
        const db = getFirestore(firebaseApp);
        const servicesCollection = collection(db, 'Services');
        const snapshot = await getDocs(servicesCollection);

        const services = [];
        snapshot.forEach(doc => {
            services.push(doc.data());
        });

        return res.status(200).json({ success: true, services: services });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao obter serviços.', error: error.message });
    }
});

/**
 * Rota para remover serviços
 * @name post/removeService
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.serviceName - O nome do serviço a remover.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/removeService', async (req, res) => {
    try {
        const { serviceName } = req.body;
        const formattedServiceName = capitalizeFirstLetter(serviceName);


        // Obtém uma referência para a base de dados Firestore
        const db = getFirestore();

        // Cria uma referência para a coleção 'Services'
        const servicesCollectionRef = collection(db, 'Services');

        // Consulta para encontrar o documento do produto pelo nome
        const q = query(servicesCollectionRef, where('name', '==', formattedServiceName));

        // Obtém os resultados da consulta
        const querySnapshot = await getDocs(q);

        // Verificando se encontrou algum documento
        if (!querySnapshot.empty) {
            // Exclui o documento do produto
            const serviceDocRef = querySnapshot.docs[0].ref;
            await deleteDoc(serviceDocRef);

            // Exclui as fotos associadas ao produto no armazenamento
            const servicePhotos = querySnapshot.docs[0].data().photos;
            const storage = getStorage();
            const deletionPromises = [];
            servicePhotos.forEach(photoUrl => {
                const photoRef = ref(storage, photoUrl);
                deletionPromises.push(deleteObject(photoRef));
            });

            // Espera todas as operações de exclusão serem concluídas
            await Promise.all(deletionPromises);

            return res.status(200).json({ success: true, message: 'Serviço ' + serviceName + ' e suas fotos associadas foram removidos com sucesso.' });
        } else {
            return res.status(404).json({ success: false, message: 'Nenhum serviço encontrado com o nome ' + serviceName + '.' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao remover o serviço.', error: error.message });
    }
});

/**
 * Rota para alterar a visibilidade de um serviço
 * @name post/changeService
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.serviceName - O nome do serviço.
 * @param {string} req.body.hiddenStatus - O status para o qual vai alterar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/changeService', async (req, res) => {
    try {
        const { serviceName, hiddenStatus } = req.body;
        // Se você não tem uma função capitalizeFirstLetter definida em outro lugar, remova a chamada ou implemente a função aqui

        // Obtém uma referência para a base de dados Firestore
        const db = getFirestore();

        // Criar uma referência para a coleção 'Services' 
        const servicesCollectionRef = collection(db, 'Services');

        // Consulta para encontrar o documento do serviço pelo nome
        const q = query(servicesCollectionRef, where('name', '==', serviceName));

        // Obter os resultados da consulta
        const querySnapshot = await getDocs(q);

        // Verificando se encontrou algum documento
        if (!querySnapshot.empty) {
            // Atualiza o estado de visibilidade do primeiro documento encontrado
            const serviceDocRef = querySnapshot.docs[0].ref;
            await updateDoc(serviceDocRef, { hidden: hiddenStatus });

            return res.status(200).json({ success: true, message: 'Visibilidade do serviço atualizada com sucesso.' });
        } else {
            return res.status(404).json({ success: false, message: 'Serviço não encontrado.' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao alterar a visibilidade do serviço.', error: error.message });
    }
});

/**
 * Rota para procurar serviços pelo nome
 * @name post/searchServicesByName
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.serviceName - O nome do serviço a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/searchServicesByName', async (req, res) => {
    const serviceName = req.query.serviceName;

    try {
        const db = getFirestore(firebaseApp);
        const servicesCollection = collection(db, 'Services');
        const querySnapshot = await getDocs(servicesCollection);

        const services = [];

        querySnapshot.forEach(doc => {
            const serviceData = doc.data();
            // Verifique se o nome do serviço contém a parte pesquisada
            if (serviceData.lowerCaseName.includes(serviceName.toLowerCase())) {
                services.push(serviceData);
            }
        });

        return res.status(200).json({ success: true, services: services });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao pesquisar serviços.', error: error.message });
    }
});

/**
 * Rota para obter as encomendas
 * @name get/adminServices/getOrders
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/adminServices/getOrders', async function(req, res) {
 
    try {
       
        const db = getFirestore(firebaseApp);
        const ordersCollection = collection(db, 'orders');
        const snapshot = await getDocs(ordersCollection);

        const orders = [];
        snapshot.forEach(doc => {
                orders.push(doc.data());
        });
    

        return res.status(200).json({ success: true, orders: orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao obter Encomendas.', error: error.message });
    }
});

/**
 * Rota para procurar encomendas pelo userId
 * @name get/searchByUserId
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.userId - O Id do user a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/searchByUserId', async function(req, res) {
    const userId = req.query.userId; // Alterado de req.body para req.query
    if (!userId) {
        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');
        const snapshot = await getDocs(ordersCollection);

        const orders = [];
        snapshot.forEach(doc => {
                orders.push(doc.data());
            
        });

        return res.status(200).json({ success: true, orders: orders });
    }

    try {
        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');
        const snapshot = await getDocs(ordersCollection);

        const orders = [];
        snapshot.forEach(doc => {
            const orderData = doc.data();
            if (orderData.userId.includes(userId)) {
                orders.push(doc.data());
            }
        });

        return res.status(200).json({ success: true, orders: orders });
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        return res.status(500).json({ success: false, message: 'Erro ao obter produtos.', error: error.message });
    }
});

/**
 * Rota para procurar encomendas pelo seu status
 * @name get/searchOrdersByStatus
 * @function
 * @memberof module:router
 * @inner
 * @param {status} req.query.status - O nome do produto a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/searchOrdersByStatus', async function(req, res) {
    const status = req.query.status;
    const user = req.session.user;

    // Verificar se o utilizador está autenticado
    if (!user) {
        return res.status(401).json({ success: false, error: 'Usuário não autenticado.' });
    }

    try {
        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');
        const snapshot = await getDocs(ordersCollection);

        const orders = [];
        snapshot.forEach(doc => {
            const orderData = doc.data();
            if (orderData.status === status) {
                orders.push(orderData);
            }
        });

        return res.status(200).json({ success: true, orders: orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao obter pedidos.', error: error.message });
    }
});


/**
 * Rota para alterar o status da encomenda
 * @name post/updateOrderStatus
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.status - O status novo.
 * @param {string} req.body.orderId - O id da encomenda. 
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/updateOrderStatus', async function(req, res) {
    const user = req.session.user;
    try {
        const { status, orderId } = req.body; // Extrair status e orderId do corpo da solicitação
        

        const db = getFirestore(firebaseApp);
        const ordersCollection = collection(db, 'orders');
        
        
        // Verificar se o utilizador está autenticado
        if (!user) {
            return res.status(401).json({ success: false, error: 'Usuário não autenticado.' });
        }

        
        // Atualizar o status da encomenda usando o método updateDoc
        await updateDoc(doc(ordersCollection, orderId), { status: status });

        // Enviar email de notificação sobre a alteração do status da encomenda
        const orderDoc = await getDoc(doc(ordersCollection, orderId));
        const orderData = orderDoc.data();

        // Extrair o userId da encomenda
        const userId = orderData.userId;

        // Obter os dados do utilizador usando o userId
        const userDoc = await getDoc(doc(db, 'users', userId));
        const userData = userDoc.data();

        // Verificar se o utilizador existe
        if (!userData) {
            return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
        }
         let mailOptions;
        // Enviar email de notificação sobre a alteração do status da encomenda
        if(status !== 'Finalizada' && status !=='Cancelada'){
         mailOptions = {
            from: 'Lalalautilities2024@hotmail.com', // Endereço de email do remetente
            to: userData.email, // Endereço de email do destinatário
            subject: 'Atualização do Pedido #' + orderId, // Assunto do email
            html: `<p>Olá ${userData.name || 'Cliente'},</p>
                   <p>O status do seu pedido #${orderId} foi atualizado para "${status}".</p>
                   <p>Para mais detalhes, acesse a sua conta no nosso site.</p>
                   <p>Cumprimentos a equipa Lalala Utilities.</p>`
        };
    } else if(status === 'Finalizada'){
             mailOptions = {
            from: 'Lalalautilities2024@hotmail.com', // Endereço de email do remetente
            to: userData.email, // Endereço de email do destinatário
            subject: 'Atualização do Pedido #' + orderId, // Assunto do email
            html: `<p>Olá ${userData.name || 'Cliente'},</p>
                   <p>O seu pedido #${orderId} foi Entregue. Esperemos que disfrute e volte a confiar em nós.</p>
                   <p>Cumprimentos a equipa Lalala Utilities.</p>`
        };
    } else if(status === 'Cancelada'){
        mailOptions = {
            from: 'Lalalautilities2024@hotmail.com', // Endereço de email do remetente
            to: userData.email, // Endereço de email do destinatário
            subject: 'Atualização do Pedido #' + orderId, // Assunto do email
            html: `<p>Olá ${userData.name || 'Cliente'},</p>
                   <p>O seu pedido #${orderId} foi Cancelado.</p>
                   <p>Se necessário entre em contacto com a nossa equipa para o reembolso.</p>
                   <p>Cumprimentos a equipa Lalala Utilities.</p>`
        };
    }
        // Enviar o email
        transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao atualizar status da ordem.', error: error.message });
    }
});

/**
 * Rota para fazer o logOut
 * @name post/adminServices/logout
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/adminServices/logout', async function (req, res) {
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
 * Rota para mostrar as encomendas com mais de 45 dias
 * @name get/showOrdersWithMoreThan45Days
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/showOrdersWithMoreThan45Days', async function(req, res) {
    try {
        const db = getFirestore(firebaseApp);
        const ordersCollection = collection(db, 'orders');
        const snapshot = await getDocs(ordersCollection);

        const orders = [];
        const currentDate = new Date();
        const fortyFiveDaysAgo = new Date(currentDate.getTime() - (45 * 24 * 60 * 60 * 1000)); // Calcula a data 45 dias atrás

        snapshot.forEach(doc => {
            const orderData = doc.data();
            const orderDate = new Date(orderData.createdAt.toMillis()); 

            // Verifica se a encomenda foi feita há mais de 45 dias
            if (orderDate < fortyFiveDaysAgo) {
                orders.push(orderData);
            }
        });

        return res.status(200).json({ success: true, orders: orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao obter Encomendas.', error: error.message });
    }
});

/**
 * Rota para eliminar as encomendas com mais de 45 dias
 * @name post/dropOrdersWithMoreThan45Days
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/dropOrdersWithMoreThan45Days', async function(req, res) {
    try {
        const db = getFirestore(firebaseApp);
        const ordersCollection = collection(db, 'orders');
        const snapshot = await getDocs(ordersCollection);

        const currentDate = new Date();
        const fortyFiveDaysAgo = new Date(currentDate.getTime() - (45 * 24 * 60 * 60 * 1000)); // Calcula a data 45 dias atrás

        snapshot.forEach(async doc => {
            const orderData = doc.data();
            const orderDate = new Date(orderData.createdAt.toMillis()); 

            // Verifica se a encomenda foi feita há mais de 45 dias
            if (orderDate < fortyFiveDaysAgo) {
                // Exclui a encomenda
                await deleteDoc(doc.ref);
            }
        });

        return res.status(200).json({ success: true, message: 'Encomendas com mais de 45 dias excluídas com sucesso.' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao excluir Encomendas.', error: error.message });
    }
});

//Export do router do express
module.exports = router;
