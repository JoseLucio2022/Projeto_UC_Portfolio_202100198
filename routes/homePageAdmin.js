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

// Import de métodos 'getFirestore','doc','getDoc','collection','getDocs','where','query' do módulo 'firebase/firestore
const { getFirestore, doc, getDoc,collection,getDocs,where,query } = require('firebase/firestore');


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
 * Rota para a página HomePageAdmin
 * @name get/homePageAdmin
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageAdmin',async function(req,res){
const db = getFirestore(firebaseApp);
const currentUser =  req.session.user;

if(currentUser){
    const userUid = currentUser.uid;
    const userDoc = await getDoc(doc(db, 'users', userUid));
    const userType = userDoc.data().userType;
    if(userType==='Admin'){
        res.sendFile(path.join(__dirname + "/../WWW/HomepageAdmin.html"));
    } else {
        res.redirect('/homePageUser');
    }
    
}else{
res.redirect('/');
}
});


/**
 * Rota para obter os produtos para venda
 * @name get/homePageAdmin/getProductsToSell
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageAdmin/getProductsToSell', async function(req, res) {
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
 * @name get/homePageAdmin/searchProductsByName
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productName - O nome do produto a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageAdmin/searchProductsByName', async (req, res) => {
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
 * @name get/homePageAdmin/searchProductsByCategory
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productCategory - O nome da categoria a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageAdmin/searchProductsByCategory', async (req, res) => {
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
 * @name get/homePageAdmin/getCategories
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageAdmin/getCategories', async (req, res) => {
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
 * @name get/homePageAdmin/getSubCategories
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageAdmin/getSubCategories', async (req, res) => {
    try {
        const db = getFirestore(firebaseApp);
        const productsCollection = collection(db, 'products');

        // Define um conjunto para armazenar as categorias únicas
        const subCategoriesSet = new Set();

        // Consulta os documentos na coleção de produtos
        const querySnapshot = await getDocs(productsCollection);

        // Itera sobre os documentos e adiciona as subcategorias ao conjunto
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
 * @name get/homePageAdmin/getProductsByCategory
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productCategory - O nome da categoria.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageAdmin/getProductsByCategory', async (req, res) => {
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
 * @name get/homePageAdmin/getProductsBySubCategory
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.productSubCategory - O nome da sub categoria.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/homePageAdmin/getProductsBySubCategory', async (req, res) => {
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

//Export do router do express
module.exports = router;
