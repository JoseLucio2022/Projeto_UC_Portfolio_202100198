/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 23/05/2024
 */

/**
 * Função para alterar o idioma do conteúdo da página.
 * Esta função muda o texto dos elementos HTML da página para o português ou inglês, 
 * dependendo do idioma passado como argumento.
 * 
 * @param {string} language - O idioma para o qual a página deve ser alterada ('pt' para português, qualquer outro valor para inglês).
 */
function changeLanguage(language) {
    if (language === 'pt') {
        document.getElementById('homeLink').innerText = 'Início';
        document.getElementById('homeLink1').innerText = 'Início';
        document.getElementById('aboutLink').innerText = 'Sobre';
        document.getElementById('servicesLink').innerText = 'Serviços';
        document.getElementById('contactLink').innerText = 'Contacto';
        document.getElementById('accountLink').innerText = 'Conta';
        document.getElementById('privacyPoliticsLink').innerText = 'Política de privacidade';
        document.getElementById('contactUsText').innerText = 'Estamos sempre disponíveis para responder às suas perguntas e fornecer suporte. Se tiver alguma dúvida, feedback ou consulta, não hesite em contatar. Estamos ansiosos para ouvir-te!';
        document.getElementById('contactUsText1').innerText = 'Clica no icon que preferires para entrar em contacto connosco. Nós valorizamos o teu feedback e estamos comprometidos em providenciar-te um serviço excelente. Se tiveres questões ou sugestões estamos aqui para ouvir. Entra em contacto e começa a conversar connosco!';
        document.getElementById('adminServicesLink').innerText = 'Serviços Admin';
        document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
    } else {
        document.getElementById('homeLink').innerText = 'Home';
        document.getElementById('homeLink1').innerText = 'Home';
        document.getElementById('aboutLink').innerText = 'About';
        document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
        document.getElementById('servicesLink').innerText = 'Services';
        document.getElementById('contactLink').innerText = 'Contact';
        document.getElementById('accountLink').innerText = 'Account';
        document.getElementById('contactUsText').innerText = 'We are always available to answer your questions and resolve your problems in the best way possible. If you have any doubts, feedback, or questions, please contact us. We are grateful to hear from you.';
        document.getElementById('contactUsText1').innerText = "Click in the icon you want to redirect to us at that service. We value your feedback and are committed to providing excellent service. Whether you have a question or suggestion we're here to listen. Get in touch with us today and let's start a conversation!";
        document.getElementById('adminServicesLink').innerText = 'Admin Services';
        document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
    }
   
}

/**
 * Manipula o evento de carregamento do DOM para verificar o tipo de utilizador logado(admin ou utilizador comum).
 */
document.addEventListener('DOMContentLoaded', async function() {
    $.ajax({
        type: 'GET',
        url: '/contactUser/admin',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                if (response.message === 'Admin') {
                    $('#homeLink1').show();
                    $('#homeLink').hide();
                    $('#accountLink').hide();
                    $('#adminServicesLink').show();
                } else if(response.message==='User'){
                    $('#homeLink1').hide();
                    $('#homeLink').show();
                    $('#accountLink').show();
                    $('#adminServicesLink').hide();
                }
            } else {
                console.error('Erro na requisição AJAX:', response.message);
                alert(response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            alert(response.message);
        }
    });
});

//AJAX que é executado assim que a página carrega para obter o número de produtos no carrinho
$.ajax({
    type: 'GET',
    url: '/contactUser/cartItemCount',
    success: function (response) {
        // Verifica se a solicitação foi bem-sucedida e se o número de produtos foi retornado
        if (response.success && response.numberOfProducts !== undefined) {
            // Atualiza o conteúdo da classe cart-item-count-circle com o número de produtos
            $('.cart-item-count-circle').text(response.numberOfProducts);
        } else {
            console.error('Erro ao obter o número de itens no carrinho:', response.message);
        }
    },
    error: function (xhr, status, error) {
        console.error('Erro na solicitação AJAX:', error);
    }
});

//Botão de logOut
var logoutButton = document.querySelector('.logout-button');

/**
 * Adiciona um evento de clique ao botão de logout para efetuar logout do utilizador.
 * @param {HTMLElement} logoutButton - O botão de logout.
 */
if (logoutButton) {
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        
        fetch('/contactUser/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function (response) {
            if (response.ok) {
               
                window.location.href = '/'; 
            } else {
            
                console.error('Erro ao fazer logout:', response.statusText);
            }
        })
        .catch(function (error) {
            console.error('Erro ao fazer logout:', error);
        });
    });
}