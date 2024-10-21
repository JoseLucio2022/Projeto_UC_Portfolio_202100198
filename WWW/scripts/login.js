/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 23/05/2024
 */

/*
window.fbAsyncInit = function() {
 
  FB.init({
      appId      : '433793925997648', // Substitua pelo ID do seu aplicativo do Facebook
      cookie     : true,
      xfbml      : true,
      version    : 'v19.0'
  });
  
  // Chama a função loginWithFacebook() quando a janela é carregada
  document.querySelector('.fb-login-button').addEventListener('click', function() {
    loginWithFacebook();
  });
};

// Função para lidar com o login do Facebook
function loginWithFacebook() {
  FB.login(function(response) {
      if (response.authResponse) {
          // O usuário está autenticado e autorizou o aplicativo
          console.log('Usuário autenticado com sucesso:', response.authResponse);
          window.location.href = '/homePageUser';
          // Aqui você pode fazer mais ações, como enviar o token de acesso para o seu servidor para autenticação
      } else {
          // O usuário não autorizou o aplicativo ou cancelou o processo de login
          console.log('O usuário cancelou o login ou não autorizou o aplicativo.');
          alert('O usuário cancelou o login ou não autorizou o aplicativo.');
      }
  }, { scope: 'email,user_photos' }); // Especifique os escopos que sua aplicação está solicitando
}
*/

/**
 * Event listener para o botão do Google.
 * Quando o botão do Google é clicado, exibe a modal 'successErrorModal'.
 * 
 * O evento de clique é registrado no elemento com o ID 'google-button'.
 * Quando o evento é acionado, um log de console é emitido e a modal 'successErrorModal' é exibida usando jQuery.
 */
document.getElementById('google-button').addEventListener('click', function() {
  console.log('clicado');
  $('#successErrorModal').modal('show');
});

/**
 * Event listener para o botão do Twitter.
 * Quando o botão do Twitter é clicado, exibe a modal 'successErrorModal1'.
 * 
 * O evento de clique é registado no elemento com o ID 'twitter-button'.
 * Quando o evento é acionado, um log de console é emitido e a modal 'successErrorModal1' é exibida usando jQuery.
 */

document.getElementById('twitter-button').addEventListener('click', function() {
  console.log('clicado');
  $('#successErrorModal1').modal('show');
});

/**
 * Event listener para o botão de confirmação.
 * Quando o botão de confirmação é clicado, verifica se os termos e condições foram aceites.
 * Se aceites, faz uma solicitação AJAX para autenticar com o Google.
 * 
 * O evento de clique é registado no elemento com o ID 'confirmButton1'.
 * Quando o evento é acionado, o estado da checkbox dos termos é verificado.
 * Se o checkbox não estiver marcado, uma mensagem de erro é exibida.
 * Se o checkbox estiver marcado, uma solicitação AJAX é enviada para autenticar com o Google.
 */
document.getElementById('confirmButton1').addEventListener('click', function() {
  var termsCheckbox = document.getElementById('termsCheckbox');

  if (!termsCheckbox.checked) {
    $('#error-message').text('Por favor, aceite os termos e condições antes de continuar.').show();
    return; 
  }

  $.ajax({
    type: 'POST',
    url: '/loginWithGoogle',
    dataType: 'json',
    success: function(response) {
      if (response.redirectUrl) {
        // Redireciona o usuário para a URL de autenticação do Google
        window.location.href = response.redirectUrl;
      } else {
        $('#error-message').text('Url não recebida').show();
      }
    },
    error: function(xhr, status, error) {
      $('#error-message').text('Erro ao autenticar com google.').show();
    }
  });
});

/**
 * Event listener para o botão de confirmação.
 * Quando o botão de confirmação é clicado, verifica se os termos e condições foram aceites.
 * Se aceites, redireciona o utilizador para a URL de autenticação com o Twitter.
 * 
 * O evento de clique é registado no elemento com o ID 'confirmButton2'.
 * Quando o evento é acionado, o estado do checkbox dos termos é verificado.
 * Se o checkbox não estiver marcado, uma mensagem de erro é exibida.
 * Se o checkbox estiver marcado, o utilizador é redirecionado para a página de login do Twitter.
 */
document.getElementById('confirmButton2').addEventListener('click', function() {
  var termsCheckbox1 = document.getElementById('termsCheckbox1');

  if (!termsCheckbox1.checked) {
    $('#error-message').text('Por favor, aceite os termos e condições antes de continuar.').show();
    return; 
  }
  
  window.location.href = '/loginWithTwitter';
});

/**
 * Função de inicialização chamada quando o documento está pronto.
 * Verifica se o formulário de login está presente na página.
 * Se presente, adiciona um event listener para tratar a submissão do formulário.
 */
var init = function () {
  var formLogin = document.getElementById('loginForm');

  
  if (formLogin) {
    
    formLogin.addEventListener("submit", async function (evt) {
      evt.preventDefault();
      var recaptchaToken = grecaptcha.getResponse();

     
      var formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        'g-recaptcha-response': recaptchaToken
      };

      $.ajax({
        type: 'POST',
        url: '/loginForm',
        data: formData,
        dataType: 'json', 
        success: function (response) {
          if (response.success) {
            $('#error-message').hide();
            if (response.message === 'Login de user executado com sucesso') {
              window.location.href = '/HomepageUser';
            } else if (response.message === 'Login de admin executado com sucesso') {
              window.location.href = '/HomepageAdmin';
            } 
          } else {
            $('#error-message').show();
          }
        },
        error: function (xhr, status, error) {
          $('#error-message').show();
        }
      });
    });
  }
}

window.onload = init;