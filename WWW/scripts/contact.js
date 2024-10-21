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
        document.getElementById('aboutLink').innerText = 'Sobre';
        document.getElementById('servicesLink').innerText = 'Serviços';
        document.getElementById('contactLink').innerText = 'Contacto';
        document.getElementById('Login').innerText = 'Entrar';
        document.getElementById('privacyPoliticsLink').innerText = 'Política de privacidade';
        document.getElementById('contactUsText').innerText = 'Estamos sempre disponíveis para responder às suas perguntas e fornecer suporte. Se tiver alguma dúvida, feedback ou consulta, não hesite em contatar. Estamos ansiosos para ouvir-te!';
        document.getElementById('contactUsText1').innerText = 'Clica no icon que preferires para entrar em contacto connosco. Nós valorizamos o teu feedback e estamos comprometidos em providenciar-te um serviço excelente. Se tiveres questões ou sugestões estamos aqui para ouvir. Entra em contacto e começa a conversar connosco!';
        document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
    } else {
        document.getElementById('homeLink').innerText = 'Home';
        document.getElementById('aboutLink').innerText = 'About';
        document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
        document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
        document.getElementById('servicesLink').innerText = 'Services';
        document.getElementById('contactLink').innerText = 'Contact';
        document.getElementById('Login').innerText = 'Login';
        document.getElementById('contactUsText').innerText = 'We are always available to answer your questions and resolve your problems in the best way possible. If you have any doubts, feedback, or questions, please contact us. We are grateful to hear from you.';
        document.getElementById('contactUsText1').innerText = "Click in the icon you want to redirect to us at that service. We value your feedback and are committed to providing excellent service. Whether you have a question or suggestion we're here to listen. Get in touch with us today and let's start a conversation!";
    }

}
