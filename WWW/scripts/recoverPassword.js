/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 23/05/2024
 */

/**
 * Função de inicialização para realizar quando a página estiver completamente carregada
 * Submissão do form de recuperação de password, utilização de ajax para enviar o email do utilizador
 * Mostra a mensagem de erro se o email ainda não estiver registado
 */
var init = function () {
  var recoverPasswordForm = document.getElementById('recoverPasswordForm');

  if (recoverPasswordForm) {
    
    recoverPasswordForm.addEventListener("submit", async function (evt) {
      evt.preventDefault();
    
      const email = document.getElementById('email').value;

     
      var formData = {
        email: email,
      };

      
      $.ajax({
        type: 'POST',
        url: '/recoverPasswordForm',
        data: formData,
        dataType: 'json', 
        success: function (response) {
         
          if (response.success) {
            $('#error-message').hide();
            window.location.href = '/Login.html'; 
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



  