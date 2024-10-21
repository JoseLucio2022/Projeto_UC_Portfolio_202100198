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

// Import de métodos 'getFirestore','collection','getDocs','where','query' do módulo 'firebase/firestore
const { getFirestore,collection,getDocs,query,where } = require('firebase/firestore');


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
 * Rota para a página Homepage
 * @name get/
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/',function(req,res){
    const currentUser =  req.session.user;
    if(currentUser){
        res.redirect('homePageUser');
    }else{
        res.sendFile(path.join(__dirname + "/../WWW/Homepage.html"));}
});

/**
 * Rota para obter os produtos para venda
 * @name get/getProductsToSell
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/getProductsToSell', async function(req, res) {
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
 * @name get/homePage/searchProductsByName
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productName - O nome do produto a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePage/searchProductsByName', async (req, res) => {
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
 * @name get/homePage/searchProductsByCategory
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productCategory - O nome da categoria a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePage/searchProductsByCategory', async (req, res) => {
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
 * Rota para obter as categorias dos produtos
 * @name get/homePage/getCategories
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePage/getCategories', async (req, res) => {
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
 * @name get/homePage/getSubCategories
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePage/getSubCategories', async (req, res) => {
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

        // Converte o conjunto de sub categorias num array
        const subCategories = Array.from(subCategoriesSet);

        return res.status(200).json({ success: true, subCategories: subCategories });
    } catch (error) {
        console.error('Erro ao obter subCategorias:', error);
        return res.status(500).json({ success: false, message: 'Erro ao obter subCategorias.', error: error.message });
    }
});

/**
 * Rota para obter os produtos pelas categorias
 * @name get/homePage/getProductsByCategory
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productCategory - O nome da categoria.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePage/getProductsByCategory', async (req, res) => {
    const productCategory = req.query.productCategory;
    const formattedProductCategory = capitalizeFirstLetter(productCategory);
    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');
        
        let querySnapshot;
        const products = [];

        if (!productCategory) {
            // Se productCategory estiver vazio, executa a consulta sem filtros
            querySnapshot = await getDocs(productsCollection);
            
        } else {
            // Caso contrário, pesquisa pela categoria do produto
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
router.get('/homePage/getProductsBySubCategory', async (req, res) => {
    const productSubCategory = req.query.productSubCategory;
    const formattedProductSubCategory = productSubCategory.toLowerCase();
    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');
        
        let querySnapshot;
        const products = [];

        if (!productSubCategory) {
            // Se productSubCategory estiver vazio, executa a consulta sem filtros
            querySnapshot = await getDocs(productsCollection);
            
        } else {
            // Caso contrário, pesquisa pela sub categoria do produto
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
 * Rota para mostrar os comentários dos produtos
 * @name post/homePage/showProductsComments
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.body.name - O nome do produto.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/homePage/showProductsComments', async function(req, res) {
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
