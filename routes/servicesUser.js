var express = require('express');
const firebaseApp = require('../config/connectionFirebase');
const { getFirestore,collection,getDocs,query,where, getDoc,doc} = require('firebase/firestore');
var path = require('path');
const { getAuth,signOut } = require('firebase/auth');
var router = express.Router();


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/**
 * Caminho para a página Desrição(página princiapl)
 */
router.get('/servicesUser',async function(req,res){
    const currentUser =  req.session.user;
    if(currentUser){
        res.sendFile(path.join(__dirname + "/../WWW/ServicesUser.html"));
    }else{
    res.redirect('/');
    }
});


router.get('/servicesUser/getShowServices', async function(req,res){
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

router.get('/servicesUser/searchServicesByName', async (req, res) => {
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

router.get('/servicesUser/admin', async function(req, res) {
    const currentUser = req.session.user;
    if (currentUser) {
        const userUid= currentUser.uid;
        const db = getFirestore(firebaseApp);
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

router.get('/servicesUser/cartItemCount', async function (req, res) {
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
 * Rota para realizar logOut 
 * @name post/servicesUser/logout
 * @function
 * @memberof module:router
 * @inner
 * @param {callback} middleware - Função middleware que trata a requisição.
 */
router.post('/servicesUser/logout', async function (req, res) {
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