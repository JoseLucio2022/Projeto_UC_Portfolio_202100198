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

// Import de métodos 'getFirestore','collection','doc','getDocs','where','query','addDoc' do módulo 'firebase/firestore
const { getFirestore,collection,getDocs,query,where,doc,addDoc} = require('firebase/firestore');

// Import de métodos 'getAuth','signOut' do módulo 'firebase/auth'
const { getAuth,signOut } = require('firebase/auth');

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
 * Rota para a página HomepageUser
 * @name get/homePageUser
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageUser',async function(req,res){
    const currentUser = req.session.user;
    if(currentUser){
        res.sendFile(path.join(__dirname + "/../WWW/HomepageUser.html"));
    }else{
    res.redirect('/');
    }
});

/**
 * Rota para obter os produtos para venda
 * @name get/homePageUser/getProductsToSell
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageUser/getProductsToSell', async function(req, res) {
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
 * Rota para procurar produtos pelo nome
 * @name get/homePageUser/searchProductsByName
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productName - O nome do produto a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageUser/searchProductsByName', async (req, res) => {
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
 * Rota para procurar os produtos por categoria
 * @name get/homePageUser/searchProductsByCategory
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productCategory - O nome da categoria a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageUser/searchProductsByCategory', async (req, res) => {
    const productCategory = req.query.productCategory;
    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');
        let querySnapshot = await getDocs(productsCollection);
        const products = [];
               
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            if(productData.categoryLowerCase.includes(productCategory.toLowerCase())){
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
 * Rota POST para adicionar um produto ao carrinho de compras do usuário.
 * Recupera os detalhes do produto da solicitação e os adiciona ao carrinho do usuário atualmente logado.
 * 
 * @param {Object} req - Objeto de requisição HTTP contendo os detalhes do produto a ser adicionado ao carrinho.
 * @param {string} req.body.name - O nome do produto a ser adicionado.
 * @param {string} req.body.color - A cor do produto a ser adicionada.
 * @param {string} req.body.size - O tamanho do produto a ser adicionado.
 * @param {Object} res - Objeto de resposta HTTP.
 * @returns {Object} - Retorna um objeto JSON indicando o sucesso ou falha da operação.
 */
router.post('/addToCart', async (req, res) => {
    const productName = req.body.name;
    const productColor = req.body.color;
    const productSize = req.body.size; 
    const formattedProductName = capitalizeFirstLetter(productName);
    
    try {
        const currentUser = req.session.user; // Obtém o utilizador atualmente logado

        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
        }

        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');

        // Consulta o produto pelo nome
        const q = query(productsCollection, where('name', '==', formattedProductName));
        const querySnapshot = await getDocs(q);

        // Verifica se o produto foi encontrado
        if (querySnapshot.empty) {
            return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
        }

        const productDoc = querySnapshot.docs[0];
        const productData = productDoc.data();

       
        const userCartRef = doc(collection(db, 'cart'), currentUser.uid);
        const productsCollectionRef = collection(userCartRef, 'products');

        // Adiciona o produto ao carrinho do utilizador
        await addDoc(productsCollectionRef, {
            ...productData,
            colors: productColor,
            size: productSize
        });
        
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Erro ao adicionar o produto ao carrinho:', error);
        return res.status(500).json({ success: false, message: 'Erro ao adicionar o produto ao carrinho.' });
    }
});

/**
 * Rota para obter as categorias dos produtos
 * @name get/homePageUser/getCategories
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageUser/getCategories', async (req, res) => {
    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');

        // Define um conjunto para armazenar as categorias únicas
        const categoriesSet = new Set();

        // Consulta os documentos na coleção de produtos
        const querySnapshot = await getDocs(productsCollection);

        // Itera sobre os documentos e adiciona as categorias ao conjunto
        querySnapshot.forEach((doc) => {
            const category = doc.data().category;
            categoriesSet.add(category);
        });

        // Converte o conjunto de categorias em um array
        const categories = Array.from(categoriesSet);

        return res.status(200).json({ success: true, categories: categories });
    } catch (error) {
        console.error('Erro ao obter categorias:', error);
        return res.status(500).json({ success: false, message: 'Erro ao obter categorias.', error: error.message });
    }
});


/**
 * Rota para obter as sub categorias dos produtos
 * @name get/homePageUser/getSubCategories
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageUser/getSubCategories', async (req, res) => {
    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');

        // Define um conjunto para armazenar as sub categorias únicas
        const subCategoriesSet = new Set();

        // Consulta os documentos na coleção de produtos
        const querySnapshot = await getDocs(productsCollection);

        // Itera sobre os documentos e adiciona as sub categorias ao conjunto
        querySnapshot.forEach((doc) => {
            if(doc.data().category ==="Resinas"){
            const subCategory = doc.data().subCategory;
           const formattedSubCategory = capitalizeFirstLetter(subCategory);
            subCategoriesSet.add(formattedSubCategory);
            }
        });

        // Converte o conjunto de sub categorias em um array
        const subCategories = Array.from(subCategoriesSet);

        return res.status(200).json({ success: true, subCategories: subCategories });
    } catch (error) {
        console.error('Erro ao obter subCategorias:', error);
        return res.status(500).json({ success: false, message: 'Erro ao obter subCategorias.', error: error.message });
    }
});


/**
 * Rota para obter os produtos pelas categorias
 * @name get/homePageUser/getProductsByCategory
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productCategory - O nome da categoria.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageUser/getProductsByCategory', async (req, res) => {
    const productCategory = req.query.productCategory;
    const formattedProductCategory = capitalizeFirstLetter(productCategory);
    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');
        
        let querySnapshot;
        const products = [];

        if (!productCategory) {
            // Se productCategory estiver vazio, execute a consulta sem filtros
            querySnapshot = await getDocs(productsCollection);
            
        } else {
            // Caso contrário, pesquise pela categoria do produto
            const q = query(productsCollection, where('category', '==', formattedProductCategory));
            querySnapshot = await getDocs(q);
        }

               
        querySnapshot.forEach((doc) => {
            products.push(doc.data());
        });

        return res.status(200).json({ success: true, products: products });
    } catch (error) {
        console.error('Erro ao pesquisar produtos:', error);
        return res.status(500).json({ success: false, message: 'Erro ao pesquisar produtos.', error: error.message });
    }
});

/**
 * Rota para obter os produtos pelas sub categorias
 * @name get/homePage/getProductsBySubCategory
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productSubCategory - O nome da sub categoria.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageUser/getProductsBySubCategory', async (req, res) => {
    const productSubCategory = req.query.productSubCategory;
    const formattedProductSubCategory = productSubCategory.toLowerCase();
    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');
        
        let querySnapshot;
        const products = [];

        if (!productSubCategory) {
            // Se productSubCategory estiver vazio, execute a consulta sem filtros
            querySnapshot = await getDocs(productsCollection);
            
        } else {
            // Caso contrário, pesquise pelo sub categoria do produto
            const q = query(productsCollection, where('subCategory', '==', formattedProductSubCategory));
            querySnapshot = await getDocs(q);
        }

               
        querySnapshot.forEach((doc) => {
            products.push(doc.data());
        });

        return res.status(200).json({ success: true, products: products });
    } catch (error) {
        console.error('Erro ao pesquisar produtos:', error);
        return res.status(500).json({ success: false, message: 'Erro ao pesquisar produtos.', error: error.message });
    }
});

/**
 * Rota para verificar a quantidade de produtos que tem no carrinho
 * @name get/cartItemCount
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/cartItemCount', async function (req, res) {
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
router.post('/homePageUser/logout', async function (req, res) {
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
 * Rota para mostrar os comentários dos produtos
 * @name post/showProductsComments
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.name - O nome do produto.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/showProductsComments', async function(req, res) {
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

// Export do router do express
module.exports = router;

