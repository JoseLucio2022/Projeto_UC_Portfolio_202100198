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
        document.getElementById('privacyPoliticsLink').innerText = 'Política de privacidade';
        document.getElementById('accountLink').innerText = 'Conta';
        $('.cardText1').text('Clica no icon para veres mais detalhes');
        $('#services').text('Serviços');
        $('.contactUs').text('Contacta-nos');
        $('#searchButtonService').text('Pesquisar');
        $('#searchInputService').attr('placeholder', 'Pesquisar por nome do serviço');
        document.getElementById('adminServicesLink').innerText = 'Serviços Admin';
        document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
    } else {
        document.getElementById('homeLink').innerText = 'Home';
        document.getElementById('homeLink1').innerText = 'Home';
        document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
        document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
        document.getElementById('aboutLink').innerText = 'About';
        document.getElementById('servicesLink').innerText = 'Services';
        document.getElementById('contactLink').innerText = 'Contact';
        document.getElementById('accountLink').innerText = 'Account';
        $('.cardText1').text('Click on icon to see more details');
        $('.contactUs').text('Contact Us');
        $('#services').text('Services');
        $('#searchButtonService').text('Search');
        $('#searchInputService').attr('placeholder', 'Search for service name');
        document.getElementById('adminServicesLink').innerText = 'Admin Services';
    }
}

/**
 * Função para inicializar a página e carregar os serviços via AJAX.
 * Utiliza jQuery para fazer uma requisição GET para '/getShowServices' e 
 * preenche o contêiner de serviços com os dados recebidos.
 * 
 * @async
 * @function
 */
$(async function () {
    $.ajax({
        type: 'GET',
        url: '/servicesUser/getShowServices',
        success: function (response) {
            if (response.success) {
                $('#services-container').empty();

                
                response.services.forEach(function (service) {
                    if (service.hidden === 'No') {
                       
                        var serviceId = service.name.replace(/\s+/g, '_');

                        var serviceHtml = `
                        <div class="card card m-1" style="height: 370px; width: 19rem;" >
                            <img src="${service.photos[0]}" class="card-img-top mt-4" width="30" height="90" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${serviceId}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${service.name}</h5>
                        <div>
                                    <span>${service.description}</span>
                        </div>
                                <p class="card-text cardText1">Clica no icon para veres mais detalhes</p>
                                <a href="/contactUser" class="btn btn-secondary contactUs">Contacta-nos</a>
                            </div>
                        </div>  
                        <!-- Modal -->
                        <div class="modal fade" id="productModal${serviceId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-sm">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">${service.name}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div id="productCarousel${serviceId}" class="carousel slide" data-bs-ride="carousel">
                                            <div class="carousel-inner">
                                                ${service.photos.map((photo, index) => `
                                                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                        <img src="${photo}" class="d-block w-100" alt="Service Image">
                                                    </div>
                                                `).join('')}
                                            </div>
                                            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${serviceId}" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Anterior</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${serviceId}" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Seguinte</span>
                                            </button>
                                        </div>
                                        <p>${service.description}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                        <!-- Add other buttons or actions here if needed -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        `;

                       
                        $('#services-container').append(serviceHtml);
                    }
                });
            } else {
                console.error('Erro ao obter serviços:', response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });
});

/**
 * Listener para o evento de clique no botão de pesquisa de serviços.
 * Realiza uma requisição AJAX para procurar serviços pelo nome e atualiza o conteúdo da página.
 * 
 * @event click
 * @param {string} '#searchButtonService' - Seletor do botão de pesquisa de serviços.
 * @param {function} callback - Função callback para tratar o evento de clique.
 */
$(document).on('click', '#searchButtonService', function () {
    var serviceName = $('#searchInputService').val().trim();

        $.ajax({
            type: 'GET',
            url: '/servicesUser/searchServicesByName',
            data: { serviceName: serviceName },
            success: function (response) {
                if (response.success) {
                    
                    $('#services-container').empty();

                    
                    response.services.forEach(function (service) {
                        if (service.hidden === 'No') {
                            
                            var serviceId = service.name.replace(/\s+/g, '_');

                            var serviceHtml = `
                                <div class="card card m-1" style="height: 370px; width: 19rem;">
                                    <img src="${service.photos[0]}" class="card-img-top mt-4" width="30" height="90" alt="Imagem do Serviço" data-bs-toggle="modal" data-bs-target="#productModal${serviceId}">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">${service.name}</h5>
                                        <div>
                                            <span>${service.description}</span>
                                        </div>
                                        <p class="card-text cardText1">Clica no icon para ver mais detalhes</p>
                                        <a href="/contactUser" class="btn btn-secondary contactUs">Contacta-nos</a>
                                    </div>
                                </div>
                                <!-- Modal -->
                                <div class="modal fade" id="productModal${serviceId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-sm">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">${service.name}</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div id="productCarousel${serviceId}" class="carousel slide" data-bs-ride="carousel">
                                                    <div class="carousel-inner">
                                                        ${service.photos.map((photo, index) => `
                                                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                                <img src="${photo}" class="d-block w-100" alt="Service Image">
                                                            </div>
                                                        `).join('')}
                                                    </div>
                                                    <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${serviceId}" data-bs-slide="prev">
                                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Anterior</span>
                                                    </button>
                                                    <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${serviceId}" data-bs-slide="next">
                                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Seguinte</span>
                                                    </button>
                                                </div>
                                                <p>${service.description}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                                <!-- Add other buttons or actions here if needed -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;

                            
                            $('#services-container').append(serviceHtml);
                        }
                    });

                var language = $('input[name="language"]:checked').val();
                    // Função que atualiza os campos conforme a linguagem selecionada
                if (language === 'portuguese') {
                    $('.cardText1').text('Clica no icon para veres mais detalhes');
                    $('.contactUs').text('Contacta-nos');
                } else {
                    $('.cardText1').text('Click on icon to see more details');
                     $('.contactUs').text('Contact Us');
                }

                } else {
                    console.error('Erro ao obter serviços:', response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error('Erro na solicitação AJAX:', error);
            }
        });
});


// Event listener para quando o DOM estiver completamente carregado
/**
 * Função chamada quando o documento é carregado e pronto.
 * Faz uma requisição AJAX para verificar o tipo de utilizador (Admin ou User).
 * Ajusta a visibilidade de vários links e botões na página com base no tipo de utilizador.
 */
document.addEventListener('DOMContentLoaded', async function() {
    $.ajax({
        type: 'GET',
        url: '/servicesUser/admin',
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

// Requisição AJAX para obter o número de itens no carrinho
$.ajax({
    type: 'GET',
    url: '/servicesUser/cartItemCount',
    success: function (response) {
        
        if (response.success && response.numberOfProducts !== undefined) {
            $('.cart-item-count-circle').text(response.numberOfProducts);
        } else {
            console.error('Erro ao obter o número de itens no carrinho:', response.message);
        }
    },
    error: function (xhr, status, error) {
        console.error('Erro na solicitação AJAX:', error);
    }
});

// Seleciona o botão de logout utilizando a classe '.logout-button'
var logoutButton = document.querySelector('.logout-button');

if (logoutButton) {
     // Adiciona um evento de clique ao botão de logout
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Faz uma requisição para o endpoint '/servicesUser/logout' usando o método POST
        fetch('/servicesUser/logout', {
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