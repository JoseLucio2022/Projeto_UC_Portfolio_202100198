/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
 */

// Import do módulo 'express'
var express = require('express');

// Import da firebase
const firebaseApp = require('../config/connectionFirebase');

// Import de métodos 'getFirestore','collection','getDocs' do módulo 'firebase/firestore
const { getFirestore,collection,getDocs} = require('firebase/firestore');

// Import do módulo 'path'
var path = require('path');

// Cria um router através do express
var router = express.Router();


/**
 * Rota para a página Services
 * @name get/services
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Rota da URL.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/services',function(req,res){
res.sendFile(path.join(__dirname + "/../WWW/Services.html"));
});

/**
 * Rota para obter os serviços
 * @name get/getShowServices
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/getShowServices', async function(req,res){
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
        console.error('Erro ao obter serviços:', error);
        return res.status(500).json({ success: false, message: 'Erro ao obter serviços.', error: error.message });
    }
});


/**
 * Rota para a página Services
 * @name get/services
 * @function
 * @memberof module:router
 * @inner
 * @param {string} req.query.serviceName - O nome a do serviço a procurar.
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.get('/services/searchServicesByName', async (req, res) => {
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
        console.error('Erro ao pesquisar serviços:', error);
        return res.status(500).json({ success: false, message: 'Erro ao pesquisar serviços.', error: error.message });
    }
});

// Export do router do express
module.exports = router;
