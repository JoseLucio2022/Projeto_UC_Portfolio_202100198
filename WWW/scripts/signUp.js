/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 23/05/2024
 */

/**
 * Função de inicialização para o formulário de cadastro.
 * Esta função configura um listener de evento para o formulário de cadastro,
 * realiza validações de entrada, obtém o token de reCAPTCHA e envia os dados
 * para o servidor via AJAX.
 */
var init = function () {
    var formSignUp = document.getElementById('signUpForm');

    // Verifique se o formulário foi encontrado
    if (formSignUp) {
        // Adicione um listener de evento para o evento submit do formulário
        formSignUp.addEventListener("submit", async function (evt) {
            evt.preventDefault();
            var recaptchaToken = grecaptcha.getResponse();

            if (!document.getElementById('termsCheckbox').checked) {
                $('#error-message').text('Por favor, aceite os termos e condições antes de continuar.').show();
                return;
            }

          
            var input = document.querySelector("#phoneNumber");
            var iti = window.intlTelInputGlobals.getInstance(input);
            var countryCode = iti.getSelectedCountryData().dialCode; 

        
            var formData = {
                userName: document.getElementById('userName').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                phoneNumber: '+' + countryCode + document.getElementById('phoneNumber').value,
                'g-recaptcha-response': recaptchaToken
            };

            
            $.ajax({
                type: 'POST',
                url: '/signUpForm',
                data: formData,
                dataType: 'json', 
                success: function (response) {
                    
                    if (response.success) {
                        $('#error-message').show().text('Email de verificação enviado, verifique-o antes de fazer o login');
                        $('#error-message').css('color', '#66FF66');
                      
                        setTimeout(function() {
                            window.location.href = '/login';
                        }, 2500); // Redireciona para a página de login após 2.5 segundos
                    }
                },
                error: function (xhr, status, errors) {
                    if (xhr.responseJSON && xhr.responseJSON.errors) {
                        var errorMessages = xhr.responseJSON.errors.map(function (error) {
                            return error.msg;
                        });
                        $('#error-message').text(errorMessages.join(', ')).show();
                        $('#error-message').css('color', 'red');
                    } else if (xhr.responseJSON && xhr.responseJSON.message) {
                        $('#error-message').text(xhr.responseJSON.message).show();
                        $('#error-message').css('color', 'red');
                    }
                }
            });
        });
    }

    // Inicialize a biblioteca intl-tel-input
    var input = document.querySelector("#phoneNumber");
    if (input) {
        window.intlTelInput(input, {
            initialCountry: "auto",
            separateDialCode: true
        });
    }
};

window.onload = init;
