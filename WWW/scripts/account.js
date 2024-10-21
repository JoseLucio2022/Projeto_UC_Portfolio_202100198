/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 23/05/2024
 */

// Apanha as modal do HTML
const modal = new bootstrap.Modal(document.getElementById('editUserNameModal'));
const modal1 = new bootstrap.Modal(document.getElementById('editNameModal'));
const modal2 = new bootstrap.Modal(document.getElementById('editEmailModal'));
const modal3 = new bootstrap.Modal(document.getElementById('editPhoneNumberModal'));
const modal4 = new bootstrap.Modal(document.getElementById('editCountryModal'));
const modal5 = new bootstrap.Modal(document.getElementById('editRegionModal'));
const modal6 = new bootstrap.Modal(document.getElementById('editCityModal'));
const modal7 = new bootstrap.Modal(document.getElementById('editPostalCodeModal'));
const modal8 = new bootstrap.Modal(document.getElementById('deleteAccountModal'));
const modal16 = new bootstrap.Modal(document.getElementById('editPasswordModal'));
const modal17 = new bootstrap.Modal(document.getElementById('editAddressModal'));
const modal19 = new bootstrap.Modal(document.getElementById('editAddress1Modal'));
const modal21 = new bootstrap.Modal(document.getElementById('successErrorModal'));


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
        document.getElementById('privacyPoliticsLink').innerText = 'Política de privacidade';
        document.getElementById('aboutLink').innerText = 'Sobre';
        document.getElementById('servicesLink').innerText = 'Serviços';
        document.getElementById('contactLink').innerText = 'Contacto';
        document.getElementById('accountLink').innerText = 'Conta';
        document.getElementById('userNameLabel').innerText = 'Nome de usuário:';
        document.getElementById('nameLabel').innerText = 'Nome:';
        document.getElementById('emailLabel').innerText = 'Email:';
        document.getElementById('emailVerifiedLabel').innerText = 'Email verificado:';
        document.getElementById('passwordLabel').innerText = 'Palavra-passe:';
        document.getElementById('phoneNumberLabel').innerText = 'Número Telemóvel:';
        document.getElementById('deleteAccountLabel').innerText = 'Eliminar Conta:';
        document.getElementById('countryLabel').innerText = 'País:';
        document.getElementById('regionLabel').innerText = 'Distrito/Região:';
        document.getElementById('cityLabel').innerText = 'Cidade:';
        document.getElementById('addressLabel').innerText = 'Endereço:';
        document.getElementById('address1Label').innerText = 'Endereço 1:';
        document.getElementById('postalCodeLabel').innerText = 'Código postal:';
        document.getElementById('logOutLabel').innerText = 'Sair:';
        $('.address').text('Endereço:');
        $('.address1').text('Endereço 1:');
        $('.postalCode').text('Código Postal:');
        $('.region').text('Distrito/Região:');
        $('.phoneNumber').text('Número de telemóvel:');
        $('.city').text('Cidade:');
        $('.country').text('País:');
        $('.products').text('Produtos: ');
        $('.price').text('Preço: ');
        $('.size').text('Tamanho: ');
        $('.category').text('Categoria: ');
        $('.createdAt').text('Criado a: ');
        $('.color').text('Cor: ');
        $('.name').text('Nome: ');
        $('#orders').text('Encomendas ');
        $('#show-orders-button').text('Ver encomendas');
        $('.underline-button').text('Enviar email de verificação');
        $('.avaliar-button').text('Avaliar Produtos');
        document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
    } else {
        document.getElementById('homeLink').innerText = 'Home';
        document.getElementById('homeLink1').innerText = 'Home';
        document.getElementById('aboutLink').innerText = 'About';
        document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
        document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
        document.getElementById('servicesLink').innerText = 'Services';
        document.getElementById('contactLink').innerText = 'Contact';
        document.getElementById('accountLink').innerText = 'Account';
        document.getElementById('userNameLabel').innerText = 'User Name:';
        document.getElementById('nameLabel').innerText = 'Name:';
        document.getElementById('deleteAccountLabel').innerText = 'Delete Account:';
        document.getElementById('emailVerifiedLabel').innerText = 'Email verified:';
        document.getElementById('emailLabel').innerText = 'Email:';
        document.getElementById('passwordLabel').innerText = 'Password:';
        document.getElementById('phoneNumberLabel').innerText = 'Phone Number:';
        document.getElementById('countryLabel').innerText = 'Country:';
        document.getElementById('regionLabel').innerText = 'Region:';
        document.getElementById('cityLabel').innerText = 'City:';
        document.getElementById('addressLabel').innerText = 'Address:';
        document.getElementById('address1Label').innerText = 'Address 1:';
        document.getElementById('postalCodeLabel').innerText = 'Postal Code:';
        document.getElementById('logOutLabel').innerText = 'LogOut:';
        $('.address').text('Address: ');
        $('.address1').text('Address 1: ');
        $('.postalCode').text('Postal Code: ');
        $('.region').text('Region: ');
        $('.phoneNumber').text('Phone Number: ');
        $('.city').text('City: ');
        $('.country').text('Country: ');
        $('.products').text('Products: ');
        $('.price').text('Price: ');
        $('.size').text('Size: ');
        $('.category').text('Category: ');
        $('.color').text('Color: ');
        $('.createdAt').text('Created at: ');
        $('.name').text('Name: ');
        $('#orders').text('Orders');
        $('#show-orders-button').text('Show Orders');
        $('.underline-button').text('Send email verification');
        $('.avaliar-button').text('Rate the products');
    }

}

/**
 * Quando o conteúdo do DOM é carregado, esta função é acionada.
 * Envia uma solicitação AJAX para obter os dados da conta do utilizador.
 * Atualiza os elementos HTML com os dados da conta do utilizador recebidos na resposta da solicitação AJAX.
 */

document.addEventListener('DOMContentLoaded', function() {
    $.ajax({
        type: 'GET',
        url: '/account/data',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                
                $('#userUid').text(response.userData.uid);
                $('#userName').text(response.userData.userName);
                $('#name').text(response.userData.name);
                $('#email').text(response.userData.email);
                $('#phoneNumber').text(response.userData.phoneNumber);
                $('#country').text(response.userData.country);
                $('#region').text(response.userData.region);
                $('#city').text(response.userData.city);
                $('#address').text(response.userData.address);
                $('#address1').text(response.userData.address1);
                $('#postalCode').text(response.userData.postalCode);
                 
                if (response.userData.emailVerified) {
                    $('#emailVerifiedIcon').html('<i id="emailIcon" class="fas fa-check-circle text-success"></i>');
                } else {
                    $('#emailVerifiedIcon').html('<i id="emailIcon" class="fas fa-times-circle text-danger"></i>');
                }

            } else {
                console.error('Erro na requisição AJAX:', response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
});

/**
 * Exibe a modal de edição de nome de utilizador e ajusta o texto com base na linguagem selecionada.
 * 
 * Esta função mostra um modal que permite que o utilizador edite o seu nome de utilizador. O texto dentro do modal 
 * muda com base na linguagem atualmente selecionada (Português ou Inglês).
 *
 * @async
 * @function editUserNameModal
 */
async function editUserNameModal(){
    modal.show();
    var language = $('input[name="language"]:checked').val();

    if (language === 'portuguese') {
        $('.editUserName').text('Editar Nome de utilizador');
        $('.newUserName').text('Novo nome de utilizador:');
        $('.cancel').text('Cancelar');
        $('.save').text('Guardar');
    } else {
        $('.editUserName').text('Edit User Name');
        $('.newUserName').text('New User Name:');
        $('.cancel').text('Cancel');
        $('.save').text('Save');
    }
}

var editUserNameBtn = document.getElementById('editUserNameBtn');

// Adiciona um ouvinte de evento de clique ao botão de edição do user name 
editUserNameBtn.addEventListener('click',editUserNameModal);

/**
 * Função assíncrona para editar o nome de utilizador.
 * 
 * Esta função envia uma solicitação AJAX para editar o nome de utilizador no servidor.
 * 
 * @async
 * @function editUserName
 */
async function editUserName() {
    
    var newUserName = document.getElementById('newUserName').value; 
    
   
    $.ajax({
        type: 'POST',
        url: '/edit-username',
        data: { newUserName: newUserName },
        success: function(response) {
            if (response.success) {
                modal.hide();
                location.reload();
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Error ao modificar Nome de usuário';
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Error ao modificar Nome de usuário, tente novamente mais tarde...';
        }
    });
}

var saveUserNameBtn = document.getElementById('saveUserNameBtn');
// Adiciona um ouvinte de evento de clique ao botão de guardar o user name
saveUserNameBtn.addEventListener('click', editUserName);


/**
 * Função assíncrona para exibir a modal de edição do nome.
 * 
 * Esta função exibe a modal de edição do nome e atualiza os textos com base no idioma selecionado.
 * 
 * @async
 * @function editNameModal
 */
async function editNameModal(){
    modal1.show();
    var language = $('input[name="language"]:checked').val();

    if (language === 'portuguese') {
        $('.editName').text('Editar Nome');
        $('.newName').text('Novo nome');
        $('.cancel1').text('Cancelar');
        $('.save1').text('Guardar');
    } else {
        $('.editName').text('Edit Name');
        $('.newName').text('New Name:');
        $('.cancel1').text('Cancel');
        $('.save1').text('Save');
    }
}


var editNameBtn = document.getElementById('editNameBtn');
// Adiciona um ouvinte de evento de clique ao botão de edição do nome
editNameBtn.addEventListener('click', editNameModal);


/**
 * Função assíncrona para editar o nome.
 * 
 * Esta função obtém o valor do campo de entrada do novo nome, faz uma solicitação para editar o nome no servidor.
 * 
 * @async
 * @function editName
 */
async function editName() {
    var newName = document.getElementById('newName').value;

   
    $.ajax({
        type: 'POST',
        url: '/edit-name',
        data: { newName: newName }, 
        success: function(response) {
            if (response.success) {
                modal1.hide();
                location.reload();
            } else {
                modal21.show();
            document.getElementById('text2').innerText = 'Error ao modificar o nome';
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Error ao modificar o nome, tente novamente mais tarde...';
        }
    });
}

var saveNameBtn = document.getElementById('saveNameBtn');
// Adiciona um ouvinte de evento de clique ao botão de guardar o nome
saveNameBtn.addEventListener('click', editName);

async function editEmailModal(){
    modal2.show();
    var language = $('input[name="language"]:checked').val();

    if (language === 'portuguese') {
        $('.editEmail').text('Editar Email');
        $('.newEmail').text('Novo Email:');
        $('.cancel2').text('Cancelar');
        $('.save2').text('Guardar');
    } else {
        $('.editEmail').text('Edit Email');
        $('.newEmail').text('New Email:');
        $('.cancel2').text('Cancel');
        $('.save2').text('Save');
    }
}

var editEmailBtn = document.getElementById('editEmailBtn');

// Adiciona um ouvinte de evento de clique ao botão de edição do email 
editEmailBtn.addEventListener('click', editEmailModal);


/**
 * Função assíncrona para editar o email do utilizador.
 * 
 * Esta função obtém o valor do campo de entrada do novo email, realiza uma verificação
 * utilizando AJAX e faz uma solicitação para editar o email no servidor.
 * 
 * @async
 * @function editEmail
 */
async function editEmail() {
    var newEmail = document.getElementById('newEmail').value; // Mudança aqui para obter o valor do campo de entrada

    $.ajax({
        type: 'POST',
        url: '/edit-email',
        data: { newEmail: newEmail }, 
        success: function(response) {
            if (response.success) {
                modal21.show();
                document.getElementById('text2').innerText = 'Ao alterar o email, faça de novo login com o novo email... Obrigado!';
                
                setTimeout(function() {
                    location.reload();
                }, 1500);
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Erro ao modificar email!';
                
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Email já a ser utilizado...';
            
        }
    });
}

var saveEmailBtn = document.getElementById('saveEmailBtn');
// Adiciona um ouvinte de evento de clique ao botão de guardar o email
saveEmailBtn.addEventListener('click', editEmail);

/**
 * Função assíncrona para enviar um email de verificação ao utilizador.
 * 
 * Esta função realiza uma requisição AJAX para enviar um email de verificação ao utilizador
 * e lida com a resposta para informar o utilizador sobre o sucesso ou falha do envio.
 * 
 * @async
 * @function sendEmailVerification
 */
async function sendEmailVerification() {
   
   
    $.ajax({
        type: 'POST',
        url: '/sendEmailVerification',
        success: function(response) {
            if (response.success) {
                modal21.show();
                document.getElementById('text2').innerText = 'Email de verificação da conta enviado!';
                
                setTimeout(function() {
                    location.reload();
                }, 1500);
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao enviar email de verificação!';
            
        }
    });
}

var sendEmailVerificationBtn = document.getElementById('sendVerificationEmail');
// Adiciona um ouvinte de evento de clique ao botão de enviar verificação de email
sendEmailVerificationBtn.addEventListener('click', sendEmailVerification);


/**
 * Função assíncrona para enviar um email de redefinição de password ao utilizador.
 * 
 * Esta função realiza uma requisição AJAX para enviar um email de redefinição de senha ao utilizador
 * e lida com a resposta para informar o utilizador sobre o sucesso ou falha do envio.
 * 
 * Antes de enviar a requisição, a função também ajusta o texto da modal de acordo com o idioma selecionado.
 * 
 * @async
 * @function editPassword
 */
async function editPassword() {

     var language = $('input[name="language"]:checked').val();

    if (language === 'portuguese') {
        $('.editPassword').text('Email de redefinição de password enviado!');
        $('.modalMessage').text('Visite o seu email para redefinir a password! O email pode estar no lixo ou correio eletrónico não solicitado!');
        $('.close').text('Fechar');
    } else {
        $('.editPassword').text('Email to redifine password was sent!');
        $('.modalMessage').text('Check ur email to redifine the password! The email can be on trash or on unsolicited emails!');
        $('.close').text('Close');
    }

   
    $.ajax({
        type: 'POST',
        url: '/edit-password', 
        success: function(response) {
            if (response.success) {
               modal16.show();
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Erro ao enviar email para alteração de password!';
                
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao enviar email para alteração de password!';
        }
    });
}

var editPasswordBtn = document.getElementById('editPasswordBtn');
// Adiciona um ouvinte de evento de clique ao botão de edição da password
editPasswordBtn.addEventListener('click', editPassword);

/**
 * Função assíncrona para exibir um modal de edição do número de telefone e ajustar o conteúdo do modal com base no idioma selecionado.
 * 
 * Esta função mostra o modal para edição do número de telemóvel e altera os textos da modal de acordo com o idioma selecionado pelo utilizador (português ou inglês).
 * 
 * @async
 * @function editPhoneNumberModal
 */
async function editPhoneNumberModal(){
    modal3.show();

    var language = $('input[name="language"]:checked').val();

    if (language === 'portuguese') {
        $('.edit-phoneNumber').text('Editar Número de Telemóvel');
        $('.newPhoneNumber').attr('placeholder', 'Digite o seu número de telemóvel');
        $('.cancel3').text('Cancelar');
        $('.save3').text('Guardar');
    } else {
        $('.edit-phoneNumber').text('Edit Phone Number');
        $('.newPhoneNumber').attr('placeholder', 'Introduce ur phone number');
        $('.cancel3').text('Cancel');
        $('.save3').text('Save');
    }
} 

var editPhoneNumberBtn = document.getElementById('editPhoneNumberBtn');
// Adiciona um ouvinte de evento de clique ao botão de edição do número de telemóvel
editPhoneNumberBtn.addEventListener('click', editPhoneNumberModal);
 

/**
 * Função assíncrona para editar o número de telemóvel do utilizador.
 * 
 * Esta função coleta o novo número de telemóvel inserido pelo utilizador, junto com o código do país selecionado, 
 * formata o número de telemóvel e envia uma solicitação AJAX para atualizar o número de telemóvel no servidor. 
 * Em caso de sucesso, a página é recarregada; em caso de erro, uma mensagem de erro é exibida.
 * 
 * @async
 * @function editPhoneNumber
 */
async function editPhoneNumber() {
    var newPhoneNumber = document.getElementById('newPhoneNumber').value;
    var countryCodeSelect = document.querySelector("#countryCodeSelect");
    var selectedCountryCode = countryCodeSelect.value;
    var formattedNewPhoneNumber = '+' + selectedCountryCode + ' ' + newPhoneNumber;

    // Verificar a senha utilizando AJAX
    $.ajax({
        type: 'POST',
        url: '/edit-phoneNumber',
        data: { newPhoneNumber: formattedNewPhoneNumber },
        success: function(response) {
            if (response.success) {
                modal3.hide();
                location.reload();
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Erro ao modificar número de telemóvel';
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao modificar número de telemóvel.... Tente novamente mais tarde';
        }
    });
}


var savePhoneNumberBtn = document.getElementById('savePhoneNumberBtn');
// Adiciona um ouvinte de evento de clique ao botão de guardar o número de telemóvel
savePhoneNumberBtn.addEventListener('click', editPhoneNumber);

/**
 * Função assíncrona para exibir um modal de edição do país e ajustar o conteúdo da modal com base no idioma selecionado.
 * 
 * Esta função mostra a modal para edição do país e altera os textos da modal de acordo com o idioma selecionado pelo utilizador (português ou inglês).
 * 
 * @async
 * @function editCountryModal
 */
async function editCountryModal(){
    modal4.show();

    var language = $('input[name="language"]:checked').val();
    
    if (language === 'portuguese') {
        $('.editCountry').text('Editar País');
        $('.newCountry').text('Selecione o País:');
        $('.cancel4').text('Cancelar');
        $('.save4').text('Guardar');
    } else {
        $('.editCountry').text('Edit Country');
        $('.newCountry').text('Select new country:');
        $('.cancel4').text('Cancel');
        $('.save4').text('Save');
    }

}

var editCountryBtn = document.getElementById('editCountryBtn');
// Adiciona um ouvinte de evento de clique ao botão de edição do país
editCountryBtn.addEventListener('click', editCountryModal);


/**
 * Função assíncrona para editar o país do utilizador.
 * 
 * Esta função coleta o novo país inserido pelo utilizador, envia uma solicitação AJAX para atualizar o país no servidor.
 * Em caso de sucesso, a página é recarregada; em caso de erro, uma mensagem de erro é exibida.
 * 
 * @async
 * @function editCountry
 */
async function editCountry() {
    var newCountry = document.getElementById('newCountry').value; 

    $.ajax({
        type: 'POST',
        url: '/edit-country',
        data: { newCountry: newCountry }, 
        success: function(response) {
            if (response.success) {
                modal4.hide();
                location.reload();
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Erro ao modificar País';
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao modificar País... Tente novamente mais tarde...';
        }
    });
}

var saveCountryBtn = document.getElementById('saveCountryBtn');
// Adiciona um ouvinte de evento de clique ao botão de guardar o país
saveCountryBtn.addEventListener('click', editCountry);

/**
 * Função assíncrona para exibir um modal de edição da região/distrito e ajustar o conteúdo do modal com base no idioma selecionado.
 * 
 * Esta função mostra o modal para edição da região/distrito e altera os textos do modal de acordo com o idioma selecionado pelo utilizador (português ou inglês).
 * 
 * @async
 * @function editRegionModal
 */
async function editRegionModal(){
    modal5.show();

    var language = $('input[name="language"]:checked').val();
    
    if (language === 'portuguese') {
        $('.editRegion').text('Editar Região/Distrito');
        $('.newRegion').text('Nova Região/Distrito:');
        $('.cancel5').text('Cancelar');
        $('.save5').text('Guardar');
    } else {
        $('.editRegion').text('Edit Region');
        $('.newRegion').text('New Region:');
        $('.cancel5').text('Cancel');
        $('.save5').text('Save');
    }

}

var editRegionBtn = document.getElementById('editRegionBtn');
// Adiciona um ouvinte de evento de clique ao botão de edição da regiã/distrito
editRegionBtn.addEventListener('click', editRegionModal);

/**
 * Função assíncrona para editar a região/distrito do utilizador.
 * 
 * Esta função coleta a nova região/distrito inserida pelo utilizador, envia uma solicitação AJAX para atualizar a região/distrito no servidor.
 * Em caso de sucesso, a página é recarregada; em caso de erro, uma mensagem de erro é exibida.
 * 
 * @async
 * @function editRegion
 */

async function editRegion() {
    var newRegion = document.getElementById('newRegion').value; 

    
    $.ajax({
        type: 'POST',
        url: '/edit-region',
        data: { newRegion: newRegion }, 
        success: function(response) {
            if (response.success) {
                modal5.hide();
                location.reload();
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Erro ao modificar Número de telemóvel';
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao modificar Número de telemóvel... Tente novamente mais tarde!';
        }
    });
}

var saveRegionBtn = document.getElementById('saveRegionBtn');
// Adiciona um ouvinte de evento de clique ao botão de guardar a região/distrito
saveRegionBtn.addEventListener('click', editRegion);

/**
 * Função assíncrona para exibir um modal de edição da cidade e ajustar o conteúdo do modal com base no idioma selecionado.
 * 
 * Esta função mostra o modal para edição da cidade e altera os textos do modal de acordo com o idioma selecionado pelo utilizador (português ou inglês).
 * 
 * @async
 * @function editCityModal
 */
async function editCityModal(){
    modal6.show();

    
    var language = $('input[name="language"]:checked').val();
    
    if (language === 'portuguese') {
        $('.editCity').text('Editar Cidade');
        $('.newCity').text('Nova Cidade:');
        $('.cancel6').text('Cancelar');
        $('.save6').text('Guardar');
    } else {
        $('.editCity').text('Edit City');
        $('.newCity').text('New City:');
        $('.cancel6').text('Cancel');
        $('.save6').text('Save');
    }
}

var editCityBtn = document.getElementById('editCityBtn');

// Adiciona um ouvinte de evento de clique ao botão de edição da cidade
editCityBtn.addEventListener('click', editCityModal);

/**
 * Função assíncrona para editar a cidade do utilizador.
 * 
 * Esta função obtém o novo valor da cidade a partir de um campo de entrada e envia uma solicitação AJAX para atualizar a cidade no servidor. 
 * Caso a atualização seja bem-sucedida, a página é recarregada. Caso contrário, uma mensagem de erro é exibida.
 * 
 * @async
 * @function editCity
 */
async function editCity() {
    var newCity = document.getElementById('newCity').value; 

   
    $.ajax({
        type: 'POST',
        url: '/edit-city',
        data: { newCity: newCity }, 
        success: function(response) {
            if (response.success) {
                modal6.hide();
                location.reload();
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Erro ao modificar a cidade!';
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao modificar a cidade! Tente novamente mais tarde...';
        }
    });
}

var saveCityBtn = document.getElementById('saveCityBtn');
// Adiciona um ouvinte de evento de clique ao botão de guardar a cidade
saveCityBtn.addEventListener('click', editCity);


/**
 * Função assíncrona para exibir o modal de edição do código postal.
 * 
 * Esta função exibe um modal que permite ao utilizador editar o código postal. 
 * A função também altera o texto dos elementos dentro do modal com base na linguagem selecionada pelo utilizador.
 * 
 * @async
 * @function editPostalCodeModal
 */
async function editPostalCodeModal(){
    modal7.show();

    
    var language = $('input[name="language"]:checked').val();
    
    if (language === 'portuguese') {
        $('.editPostalCode').text('Editar Código Postal');
        $('.newPostalCode').text('Novo Código Postal:');
        $('.cancel7').text('Cancelar');
        $('.save7').text('Guardar');
    } else {
        $('.editPostalCode').text('Edit Postal Code');
        $('.newPostalCode').text('New Postal Code:');
        $('.cancel7').text('Cancel');
        $('.save7').text('Save');
    }
}

var editPostalCodeBtn = document.getElementById('editPostalCodeBtn');
// Adicione um ouvinte de evento de clique ao botão de edição do código postal
editPostalCodeBtn.addEventListener('click', editPostalCodeModal);

/**
 * Função assíncrona para editar o código postal do utilizador.
 * 
 * Esta função obtém o novo valor do código postal a partir de um campo de entrada e envia uma solicitação AJAX para atualizar o código postal no servidor. 
 * Caso a atualização seja bem-sucedida, a página é recarregada. Caso contrário, uma mensagem de erro é exibida.
 * 
 * @async
 * @function editPostalCode
 */
async function editPostalCode() {
    var newPostalCode = document.getElementById('newPostalCode').value; 

    $.ajax({
        type: 'POST',
        url: '/edit-postalCode',
        data: { newPostalCode: newPostalCode }, 
        success: function(response) {
            if (response.success) {
                modal7.hide();
                location.reload();
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Erro ao modificar o Código Postal!';
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao modificar o Código Postal! Tente novamente mais tarde...';
        }
    });
}

var savePostalCodeBtn = document.getElementById('savePostalCodeBtn');
// Adiciona um ouvinte de evento de clique ao botão de guardar o código postal
savePostalCodeBtn.addEventListener('click', editPostalCode);

/**
 * Função assíncrona para fazer o logout do utilizador.
 * 
 * Esta função envia uma solicitação AJAX ao servidor para realizar o logout do utilizador.
 * Caso o logout seja bem-sucedido, o utilizador é redirecionado para a página inicial. 
 * Caso contrário, uma mensagem de erro é exibida.
 * 
 * @async
 * @function logOut
 */
async function logOut() {
  
   $.ajax({
       type: 'POST',
       url: '/logOut',
       success: function(response) {
           if (response.success) {
               window.location.href='/';
           } else {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao realizar o LogOut!';
           }
       },
       error: function(xhr, status, error) {
        modal21.show();
        document.getElementById('text2').innerText = 'Erro ao realizar o LogOut! Tente novamente mais tarde...';
       }
   });
}

var logOutBtn = document.getElementById('logOutBtn');
// Adiciona um ouvinte ao botão de logout 
logOutBtn.addEventListener('click', logOut);

/**
 * Função para verificar o tipo de utilizador e ajustar a interface de acordo.
 * 
 * Esta função é executada assim que a página é carregada. Ela envia uma solicitação AJAX 
 * para verificar se o utilizador é um administrador ou um utilizador comum e, com base na resposta,
 * ajusta a visibilidade de determinados links na interface.
 * 
 * @function
 */
document.addEventListener('DOMContentLoaded', async function() {

    $.ajax({
        type: 'GET',
        url: '/account/admin',
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

/**
 * Função assíncrona para exibir o modal de edição de endereço e ajustar o texto com base no idioma selecionado.
 * 
 * Esta função é chamada para exibir o modal onde o utilizador pode editar o seu endereço. O texto no modal é 
 * atualizado de acordo com o idioma selecionado (português ou inglês).
 * 
 * @async
 * @function editAddressModal
 */
async function editAddressModal(){
    modal17.show();

    
    var language = $('input[name="language"]:checked').val();
    
    if (language === 'portuguese') {
        $('.editAddress').text('Editar Endereço');
        $('.newAddress').text('Novo Endereço:');
        $('.cancel8').text('Cancelar');
        $('.save8').text('Guardar');
    } else {
        $('.editAddress').text('Edit Address');
        $('.newAddress').text('New Address:');
        $('.cancel8').text('Cancel');
        $('.save8').text('Save');
    }
}

var editAddressBtn = document.getElementById('editAddressBtn');
// Adiciona um ouvinte de evento de clique ao botão de edição do endereço de morada
editAddressBtn.addEventListener('click', editAddressModal);


/**
 * Função assíncrona para editar o endereço do utilizador.
 * 
 * Esta função é chamada quando o utilizador deseja editar o seu endereço. Ela envia uma solicitação AJAX
 * para o servidor com o novo endereço fornecido pelo utilizador e atualiza a página após o sucesso da operação.
 * 
 * @async
 * @function editAddress
 */
async function editAddress() {
    var newAddress = document.getElementById('newAddress').value; 

  
    $.ajax({
        type: 'POST',
        url: '/edit-address',
        data: { newAddress: newAddress }, 
        success: function(response) {
            if (response.success) {
                modal17.hide();
                location.reload();
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Erro ao modificar endereço!';
           
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao modificar endereço! Tente novamente mais tarde...';
        }
    });
}

var saveAddressBtn = document.getElementById('saveAddressBtn');
// Adiciona um ouvinte de evento de clique ao botão de guardar o endereço de morada
saveAddressBtn.addEventListener('click', editAddress);

/**
 * Função assíncrona para exibir o modal de edição de endereço1 e ajustar o texto com base no idioma selecionado.
 * 
 * Esta função é chamada para exibir o modal onde o utilizador pode editar o seu endereço1. O texto no modal é 
 * atualizado de acordo com o idioma selecionado (português ou inglês).
 * 
 * @async
 * @function editAddress1Modal
 */
async function editAddress1Modal(){
    modal19.show();

    
    var language = $('input[name="language"]:checked').val();
    
    if (language === 'portuguese') {
        $('.editAddress1').text('Editar Endereço');
        $('.newAddress').text('Novo Endereço:');
        $('.cancel9').text('Cancelar');
        $('.save9').text('Guardar');
    } else {
        $('.editAddress1').text('Edit Address');
        $('.newAddress1').text('New Address:');
        $('.cancel9').text('Cancel');
        $('.save').text('Save');
    }
}

var editAddress1Btn = document.getElementById('editAddress1Btn');
// Adicione um ouvinte de evento de clique ao botão de edição do endereço de morada 1
editAddress1Btn.addEventListener('click', editAddress1Modal);

async function editAddress1() {
    var newAddress1 = document.getElementById('newAddress1').value; 


    $.ajax({
        type: 'POST',
        url: '/edit-address1',
        data: { newAddress1: newAddress1 }, 
        success: function(response) {
            if (response.success) {
                modal19.hide();
                location.reload();
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Erro ao modificar endereço!';
           
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao modificar endereço! Tente novamente mais tarde...';
        }
    });
}

var saveAddress1Btn = document.getElementById('saveAddress1Btn');
// Adiciona um ouvinte de evento de clique ao botão de guardar o endereço de morada 1
saveAddress1Btn.addEventListener('click', editAddress1);

/**
 * Esta função é chamada quando o botão "Mostrar encomendas" é clicado. Ela faz uma solicitação AJAX
 * para obter os pedidos do utilizador e exibe-os na página. Dependendo do idioma selecionado pelo utilizador,
 * os elementos HTML são atualizados para exibir os detalhes do pedido no idioma correspondente.
 */
$(function () {
    $(document).on('click', '#show-orders-button', function () {
        var ordersContainer = $('#orders-container');

        var language = $('input[name="language"]:checked').val();

      
        if (ordersContainer.is(':visible')) {
            ordersContainer.hide(); 
        } else {
            
            $.ajax({
                type: 'GET',
                url: '/getOrders',
                success: function (response) {
                    if (response.success) {
                        
                        ordersContainer.empty();
                        const userId = response.userId;
                        
                        response.orders.forEach(function (order) {
                            if(order.status != 'Cancelada'){

                                const products = [];
                            const orderProducts = order.products || [];
                            for (const product of orderProducts) {
                                const productsComments = product.ratings || [];
                    
                               
                                const userReviewedProduct = productsComments.some(rating => rating.uid === userId);
                    
                                if (!userReviewedProduct) {
                                    products.push(product);
                                }
                            }
                            
                            var createdAt = new Date(order.createdAt * 1000).toLocaleString();

                            var orderHtml = `
                                <div class="container">
                                    <div class="row align-items-center">
                                        <div class="col-md-9 mb-1">
                                            <div class=" align-items-center">
                                                <div class="col-sm-9 mt-2">
                                                    <span class="fs-7 orderId">Order Id: </span><span class="fs-7">${order.orderId}</span><br>
                                                    <span class="fs-7 status">Status: </span><span class="fs-7">${order.status}</span><br>
                                                    <span class="fs-7 createdAt">Criada a: </span><span class="fs-7">${new Date(order.createdAt.seconds * 1000).toLocaleString()}</span><br>
                                                    <span class="fs-7 address">Endereço: </span><span class="fs-7">${order.address}</span><br>
                                                    <span class="fs-7 address1">Endereço 1: </span><span class="fs-7">${order.address1}</span><br>
                                                    <span class="fs-7 city">Cidade: </span><span class="fs-7">${order.city}</span><br>
                                                    <span class="fs-7 country">País: </span><span class="fs-7">${order.country}</span><br>
                                                    <span class="fs-7 phoneNumber">Número de telemóvel: </span><span class="fs-7">${order.phoneNumber}</span><br>
                                                    <span class="fs-7 postalCode">Código Postal: </span><span class="fs-7">${order.postalCode}</span><br>
                                                    <span class="fs-7 ">Total: </span><span class="fs-7">${order.totalAmount}</span><br>
                                                    <span class="fs-7 region">Distrito/Região: </span><span class="fs-7">${order.region}</span><br>
                                                    <span class="fs-7 products">Produtos:</span><br>
                                                    <ul>`;

                            
                            order.products.forEach(function (product) {
                                orderHtml += `<li><span class="fs-7 name">Nome: </span><span class="fs-7">${product.name}</span>, <span class="fs-7 price">Preço: </span><span class="fs-7">${product.price}</span>, <span class="fs-7 size">Tamanho: </span><span class="fs-7">${product.size}</span>, <span class="fs-7 category">Categoria: </span><span class="fs-7">${product.category}</span>, <span class="fs-7 color">Cor: </span><span class="fs-7">${product.colors}</span> <br><img src="${product.photos[0]}" width="150" height="90" alt="Imagem do Produto" class="order-product-image">`;


                                orderHtml += `</li>`;
                            });
                            
                            
                            orderHtml += `</ul></div></div>
                                        </div>
                                        <div class="col-md-4">`;

                             if(order.status === 'Finalizada' && products.length!==0) {
                                orderHtml += `<button class="btn btn-outline-primary avaliar-button" data-order-id="${order.orderId}">Avaliar Produtos</button>`;
                                }


                            orderHtml += `</div></div></div></div>`;

                            
                            ordersContainer.append(orderHtml);
                        }
                        });

                        if (language === 'portuguese') {
                            $('.address').text('Endereço:');
                            $('.address1').text('Endereço 1:');
                            $('.postalCode').text('Código Postal:');
                            $('.region').text('Distrito/Região:');
                            $('.phoneNumber').text('Número de telemóvel:');
                            $('.city').text('Cidade:');
                            $('.country').text('País:');
                            $('.products').text('Produtos: ');
                            $('.price').text('Preço: ');
                            $('.size').text('Tamanho: ');
                            $('.category').text('Categoria: ');
                            $('.createdAt').text('Criado a: ');
                            $('.color').text('Cor: ');
                            $('.name').text('Nome: ');
                        } else {
                            $('.address').text('Address: ');
                            $('.address1').text('Address 1: ');
                            $('.postalCode').text('Postal Code: ');
                            $('.region').text('Region: ');
                            $('.phoneNumber').text('Phone Number: ');
                            $('.city').text('City: ');
                            $('.country').text('Country: ');
                            $('.products').text('Products: ');
                            $('.price').text('Price: ');
                            $('.size').text('Size: ');
                            $('.category').text('Category: ');
                            $('.color').text('Color: ');
                            $('.createdAt').text('Created at: ');
                            $('.name').text('Name: ');
                        }

                       
                        ordersContainer.show();
                    } else {
                        console.error('Erro ao obter pedidos:', response.message);
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Erro na solicitação AJAX:', error);
                }
            });
        }
    });
});

/**
 * Esta função faz uma solicitação AJAX para obter o número de itens no carrinho do utilizador.
 * Após receber a resposta, verifica se a solicitação foi bem-sucedida e se o número de produtos foi retornado.
 * Se for o caso, atualiza o conteúdo da classe cart-item-count-circle com o número de produtos.
 */
$.ajax({
    type: 'GET',
    url: '/account/cartItemCount',
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

//LogOut button que está ao lado do Menu
var logoutButton = document.querySelector('.logout-button');

/**
 * Se o botão de logout existir, adiciona um evento de clique.
 * Quando clicado, o evento é interceptado para evitar o envio do form duas vezes.
 * Em seguida, faz uma solicitação POST para /logout usando a API Fetch.
 * Se a resposta for bem-sucedida (status 200), redireciona para a página de login.
 * Caso contrário, trata os erros de logout exibindo uma mensagem no console.
 */
if (logoutButton) {
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function (response) {
            if (response.ok) {
                // Logout bem-sucedido
                window.location.href = '/'; 
            } else {
                // Trata erros de logout
                console.error('Erro ao fazer logout:', response.statusText);
            }
        })
        .catch(function (error) {
            console.error('Erro ao fazer logout:', error);
        });
    });
}

/**
 * Quando a janela é carregada, esta função é acionada.
 * Obtém a lista de países suportados usando a função getCountryData() fornecida pelo plugin intl-tel-input.
 * Adiciona as opções de país ao elemento select com o id 'newCountry'.
 */
window.onload = function() {
    // Obtém a lista de países suportados
    var countryData = window.intlTelInputGlobals.getCountryData();
  
    // Adiciona as opções de país ao elemento select
    countryData.forEach(function(country) {
      $('#newCountry').append($('<option>', {
        value: country.iso2,
        text: country.name
      }));
    });
};

document.addEventListener("DOMContentLoaded", function() {
    var countryCodeSelect = document.querySelector("#countryCodeSelect");

    // Obtém a lista de países suportados
    var countryData = window.intlTelInputGlobals.getCountryData();

    // Adiciona as opções do dropdown com os códigos de país
    countryData.forEach(function(country) {
        var option = document.createElement("option");
        option.value = country.dialCode;
        option.text = '+' + country.dialCode + ' (' + country.name + ')';
        countryCodeSelect.appendChild(option);
    });
});

/**
 * Exibe o modal para confirmar a exclusão da conta do utilizador.
 * O texto exibido no modal é definido com base no idioma selecionado.
 */
async function deleteAccountModal(){
    modal8.show();
    
    var language = $('input[name="language"]:checked').val();
    
    if (language === 'portuguese') {
        $('.editRegion').text('Eliminar conta');
        $('.message').text('Tem a certeza que deseja eliminar a conta?');
        $('.cancel10').text('Cancelar');
        $('.delete').text('Eliminar');
    } else {
        $('.editRegion').text('Delete account');
        $('.message').text('Are u sure u want to delete the account?');
        $('.cancel10').text('Cancel');
        $('.delete').text('Delete');
    }
}

var deleteAccountBtn = document.getElementById('deleteAccountBtn');
// Adiciona um ouvinte de evento de apagar a conta
deleteAccountBtn.addEventListener('click', deleteAccountModal);

async function deleteAccount() {

   
    $.ajax({
        type: 'POST',
        url: '/deleteAccount',
        success: function(response) {
            if (response.success) {
                modal8.hide();
                window.location.href='/'
            } else {
                modal21.show();
                document.getElementById('text2').innerText = 'Erro ao modificar endereço!';
           
            }
        },
        error: function(xhr, status, error) {
            modal21.show();
            document.getElementById('text2').innerText = 'Erro ao modificar endereço! Tente novamente mais tarde...';
        }
    });
}

var saveDeleteAccountBtn = document.getElementById('saveDeleteAccountBtn');
// Adiciona um ouvinte ao botão de confirmação de exclusão de conta
saveDeleteAccountBtn.addEventListener('click', deleteAccount);

/**
 * Intercepta o envio do formulário de opinião sobre o produto e envia os dados para o servidor via AJAX.
 * Exibe mensagens de sucesso ou erro com base na resposta do servidor.
 */
$(function() {
    $(document).on('submit', '.opinion-form', function(event) {
        event.preventDefault(); 
        
        // Obtém os dados do formulário
        var productName = $(this).find('.send-opinion').data('product-name');
        var productId = $(this).find('.send-opinion').data('product-id');
        var orderId = $(this).find('.send-opinion').data('order-id');
        var comment = $('#comment' + productId).val();
        var rating = parseInt($('#rating' + productId).val());

        var currentForm = $(this);

        
        $.ajax({
            type: 'POST',
            url: '/sendOpinion',
            data: {
                name: productName,
                rating: rating,
                comment: comment,
                orderID: orderId
            },
            success: function (response) {
                if (response.success) {
                    $('#avaliarModal').modal('hide');
                    document.getElementById('text2').innerText = 'Comentário enviado com sucesso';
                    $('#comment' + productId).val(''); // Limpa o campo de comentário
                    $(`#ratingStar${productId} i`).removeClass('fas').addClass('far');

                    modal21.show();

                    setTimeout(function() {
                        location.reload();
                    }, 1500);
                } 
            },
            error: function (xhr, status, error) {
                $('#avaliarModal').modal('hide');
               
                console.error('Erro ao enviar comentário do produto:', error);
                document.getElementById('text2').innerText = 'Erro ao enviar comentário do produto';
                $('#comment' + productId).val(''); // Limpa o campo de comentário
                $(`#ratingStar${productId} i`).removeClass('fas').addClass('far');
                modal21.show();
            }
        });
    });

    /**
      * Manipula o evento de clique nas estrelas de avaliação.
      * Atualiza a aparência das estrelas e define o valor de classificação no campo de entrada oculto.
    */
    $(document).on('click', '.rating-stars i', function() {
        const ratingValue = parseInt($(this).data('rating'));
        const $stars = $(this).closest('.rating-stars').find('i');
        
        $stars.each(function(index) {
            if (index < ratingValue) {
                $(this).removeClass('far').addClass('fas'); // Estrela preenchida
            } else {
                $(this).removeClass('fas').addClass('far'); // Estrela vazia
            }
        });

        
        const productId = $(this).closest('.rating-stars').attr('id').replace('ratingStars', '');
        $('#rating' + productId).val(ratingValue);
    });

    /**
      * Manipula o clique no botão de avaliar produtos de um pedido.
      * Exibe um modal com um formulário de avaliação para cada produto do pedido.
    */
    $(document).on('click', '.avaliar-button', function(event) {
        event.preventDefault(); 
       
        var orderId = $(this).data('order-id');

        $.ajax({
            type: 'GET',
            url: '/getProductsToAvaluation',
            data: {
                orderID: orderId, 
            },
            success: function (response) {
                if (response.success) {
                    
                    $('#avaliarModal .modal-body').empty();
                    
                    
                    response.products.forEach(function (product) {
                        var productId = product.name.replace(/\s+/g, '_');
                        var formHtml = `
                            <form class="opinion-form" data-order-id="${orderId}">
                                <input type="hidden" name="productId" value="${productId}">
                                <label for="name${productId}" class="me-2 name1">Nome:</label>
                                <span id="name${productId}" class="me-4">${product.name}</span><br>
                                <label for="rating${productId}" class="me-2 avaliation2">Avaliação:</label>
                                <div id="ratingStars${productId}" class="rating-stars me-4">
                                    <i class="far fa-star" data-rating="1"></i>
                                    <i class="far fa-star" data-rating="2"></i>
                                    <i class="far fa-star" data-rating="3"></i>
                                    <i class="far fa-star" data-rating="4"></i>
                                    <i class="far fa-star" data-rating="5"></i>
                                </div>
                                <input type="hidden" id="rating${productId}" name="rating" value="0" />
                                <label for="comment${productId}" class="me-2 comment2">Comentário:</label>
                                <textarea id="comment${productId}" name="comment" rows="4" cols="50" maxlength="100" class="me-4"></textarea>
                                <button type="submit" class="btn send-opinion" data-product-name="${product.name}" data-order-id="${orderId}" data-product-id="${productId}">
                                    <i>Enviar Avaliação</i> 
                                </button>
                            </form>
                        `;
                        $('#avaliarModal .modal-body').append(formHtml);
                    });

                    
                    $('#avaliarModal').modal('show');

                } else {
                    console.error('Erro ao carregar produtos:', response.message);
                    document.getElementById('text2').innerText = 'Erro ao carregar produtos';
                    modal21.show();
                }
                var language = $('input[name="language"]:checked').val();
    
        if (language === 'portuguese') {
            $('.avaliation2').text('Avaliação:');
            $('.name1').text('Nome:');
            $('.comment2').text('Comentário:');
            $('.send-opinion').text('Enviar avaliação');
            $('.rateProducts').text('Avaliar Produtos');
            $('.close1').text('Fechar');
        } else {
            $('.avaliation2').text('Avaliation:');
            $('.name1').text('Name:');
            $('.comment2').text('Comment:');
            $('.send-opinion').text('Send avaliation');
            $('.rateProducts').text('Rate Products');
            $('.close1').text('Close');
        }
            },
            error: function (xhr, status, error) {
                console.error('Erro ao carregar produtos:', error);
                document.getElementById('text2').innerText = 'Erro ao carregar produtos';
                modal21.show();
            }
        });
    });
});

