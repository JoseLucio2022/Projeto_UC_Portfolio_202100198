/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 23/05/2024
 */

// Apanha as modal do HTML
const modal1 = new bootstrap.Modal(document.getElementById('SuccessErrorModal'));
const modal = new bootstrap.Modal(document.getElementById('addProductModal'));

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
        document.getElementById('accountLink').innerText = 'Conta';
        document.getElementById('privacyPoliticsLink').innerText = 'Política de privacidade';
        $('#products').text('Produtos no carrinho');
        $('#cartSummary').text('Sumário do carrinho');
        $('.city').text('Cidade:');
        $('#getDataButton').text('Obter dados da conta');
        $('.region').text('Distrito/Região:');
        $('.phoneNumber').text('Número de telemóvel:');
        $('.address').text('Endereço:');
        $('.address1').text('Endereço 1 (Opcional):');
        $('.postalCode').text('Código Postal:');
        $('#subtotalDiv').text('Subtotal do carrinho');
        $('#shippingDiv').text('Custos de envio');
        $('#buy-info').text('Precisa de pelo menos 15€ no carrinho para completar o pagamento');
        $('#buy-info1').text('A disponibilidade e o preço dos artigos não estão garantidos até ao pagamento final');
        $('#buy-info2').text('De momento apenas entregas disponíveis em Portugal. Estamos no início e esperamos compreensão de todos os utilizadores.');
        $('#buyButton').text('Comprar');
        $('.country').text('País:');
        $('.morada1').text('Morada:');
        $('#privacidade').text('Privacidade segura');
        $('#privacidadeText').text('A proteção da sua privacidade é importante para nós! Asseguramos-lhe que as suas informações serão mantidas em segurança e não serão comprometidas. Não vendemos os seus dados pessoais a troco de dinheiro e apenas utilizaremos os seus dados em conformidade com a nossa política de privacidade e de cookies para fornecer e melhorar os nossos serviços ao utilizador');
        $('#shopProteccion').text('Proteção de compras da Lalala utilities');
        $('#shopProteccionText').text('Compre com confiança na Lalala utilitites sabendo que, se algo correr mal, estará sempre protegido(a).');
        $('#shopDelivery').text('Garantia de entregas');
        $('#shopDelivery1').text('Reembolso de 15 dias sem atualizações');
        $('#shopDelivery2').text('Reembolso por artigo danificado');
        $('#shopDelivery3').text('Reembolso por 30 dias sem entrega');
        document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
        $('#searchInput').attr('placeholder', 'Pesquisar por nome de produto');
        $('#searchButton').text('Pesquisar');
        $('#customize').text('Customiza o teu produto ->');
        $('#contactUs').text('Contacta-nos');
        $('.cardText1').text('Clica no icon para veres mais detalhes e adicionar ao carrinho');
        $('.addToCartBtn').text('Adicionar ao carrinho');
        $('.colors1').text('Cores:');
        $('.sizes1').text('Tamanhos:');
        $('.productDescription').text('Descrição:');
        $('.productPrice').text('Preço:');
        $('.closeModal').text('Fechar');
        $('.mb-2.commentsOfUsers').text('Comentários dos utilizadores');
        $('.underline-button').text('Ver comentários dos utilizadores');
        $('.user').text('Utilizador:');
        $('.comment1').text('Comentário:');
        $('.avaliation1').text('Avaliação:');
        $('.avaliation').text('Avaliação');

    } else {
        document.getElementById('homeLink').innerText = 'Home';
        document.getElementById('aboutLink').innerText = 'About';
        document.getElementById('servicesLink').innerText = 'Services';
        document.getElementById('contactLink').innerText = 'Contact';
        document.getElementById('accountLink').innerText = 'Account';
        document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
        document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
        $('#products').text('Products on cart');
        $('#cartSummary').text('Cart Summary');
        $('#subtotalDiv').text('Subtotal of the cart');
        $('#shippingDiv').text('Shipping costs');
        $('#buy-info').text('Need at least 15€ in products to complete the payment');
        $('#buy-info1').text('The availability and price of items are not guaranteed until final payment.');
        $('#buy-info2').text('At the moment, only deliveries available in Portugal. We are in the early stages and hope for understanding from all users.');
        $('#buyButton').text('Buy');
        $('#getDataButton').text('Get account data');
        $('.city').text('City:');
        $('.region').text('Region:');
        $('.phoneNumber').text('Phone number:');
        $('.address').text('Address:');
        $('.address1').text('Address 1(Optional):');
        $('.postalCode').text('Postal code:');
        $('.country').text('Country:');
        $('.morada1').text('Address:');
        $('#privacidade').text('Safety privacy');
        $('#privacidadeText').text('The protection of your privacy is important to us! We assure you that your information will be kept secure and will not be compromised. We do not sell your personal data for money and will only use your data in accordance with our privacy and cookie policy to provide and enhance our services to the user');
        $('#shopProteccion').text('Shop protection at Lalala utilities');
        $('#shopProteccionText').text('Shop with confidence at Lalala Utilities knowing that if anything goes wrong, you will always be protected');
        $('#shopDelivery').text('Deliveries guarantee');
        $('#shopDelivery1').text('15-day refund without updates');
        $('#shopDelivery2').text('Refund for damaged item');
        $('#shopDelivery3').text('Refund for 30 days without delivery'); 
        $('.cardText1').text('Click on icon to see more details and add to cart');
        $('.addToCartBtn').text('Add to cart');
        $('#searchInput').attr('placeholder', 'Search for product name');
        $('#customize').text('Customize ur product ->');
        $('#contactUs').text('Contact Us');
        $('#searchButton').text('Search');
        $('.colors1').text('Colors:');
        $('.sizes1').text('Sizes:');
        $('.productDescription').text('Description:');
        $('.productPrice').text('Price:');
        $('.closeModal').text('Close');    
        $('.mb-2.commentsOfUsers').text('Comments of Users');
        $('.underline-button').text('View users comments');
        $('.user').text('User:');
        $('.comment1').text('Comment:');
        $('.avaliation1').text('Avaliation:');
        $('.avaliation').text('Avaliation');   
    }
}

/**
 * Função executada quando o documento está pronto.
 * Faz uma solicitação para obter os produtos no carrinho.
 * Se a solicitação for bem-sucedida, os produtos são exibidos no container de produtos.
 * Se ocorrer algum erro durante o processo, exibe uma mensagem de erro no console.
 */
$(function () {
    $.ajax({
        type: 'GET',
        url: '/cartProducts',
        success: function (response) {
            if (response.success) {
                $('#products-container').empty();
                let subtotal = 0;
                let totalShipping = 0;
                
                
                response.products.forEach(function (product) {
                   
                    var price = parseFloat(product.price.replace(',', '.'));
                    var shipping = parseFloat(product.shipping.replace(',', '.'));
                    
                    
                    subtotal += price;
                    totalShipping += shipping;
                    
                    var productHtml = `
                    <div class="container sm-2">
                        <div class="row align-items-center" id="row1">
                            <div class="col-md-10 "> 
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <span class="fs-9">${product.name}</span>
                                    </div>
                                    <div class="col-sm-2">
                                        <span class="fs-9">${product.price}</span>
                                    </div>
                                    <div class="col-sm-2">
                                        <span class="fs-9">${product.colors}</span>
                                    </div>
                                    <div class="col-sm-2">
                                        <span class="fs-9">${product.size}</span>
                                    </div>
                                    <div class="col-sm-2 "> 
                                 <img src="${product.photos[0]}"  alt="Imagem do Produto" class="img-fluid">
                            </div>
                            <div class="col-sm-1 "> 
                                    <button type="button" class="btn btn-primary" data-product-name="${product.name}" id="removeBtn">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    
                   
                    $('#products-container').append(productHtml);
                });
                
                
                if (response.products.length > 4) {
                    totalShipping /= 2;
                }
                

                var totalPrice = subtotal + totalShipping;
                
                $('#subtotal').text(subtotal.toFixed(2) + '€');
                $('#shipping-costs').text(totalShipping.toFixed(2) + '€');
                $('#total-price').text(totalPrice.toFixed(2) + '€');
            } else {
                console.error('Erro ao obter produtos:', response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });
});

/**
 * Adiciona um evento de clique ao botão de remoção de produto.
 * Ao clicar no botão, obtém o nome do produto e faz uma solicitação para removê-lo do carrinho.
 * Se a solicitação for bem-sucedida, a página é recarregada e o carrinho é atualizado.
 * Se ocorrer algum erro durante o processo, exibe uma mensagem de erro no modal de alerta e atualiza o carrinho.
 */
$(document).on('click', '#removeBtn', function () {
    // Obtém o nome do produto e o estado de visibilidade dos atributos de dados do botão
    var productName = $(this).data('product-name');


    $.ajax({
        type: 'POST',
        url: '/cart/removeProduct', 
        data: { productName: productName },
        success: function (response) {
            if (response.success) {
                location.reload();
                atualizarCarrinho();
            } else {
                modal1.show();
                document.getElementById('text2').innerText = 'Erro ao remover produto';
                atualizarCarrinho();
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });
});

/**
 * Adiciona um evento de clique ao botão para obter dados da conta do utilizador.
 * Ao clicar no botão, faz uma solicitação AJAX para obter os dados da conta do utilizador.
 * Se a solicitação for bem-sucedida, preenche os campos do formulário com os dados obtidos.
 * Se ocorrer algum erro durante o processo, exibe uma mensagem de erro no modal de alerta.
 */
$(document).on('click', '#getDataButton', function () {
    
    $.ajax({
        type: 'GET',
        url: '/getData',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
               
                $('#phoneNumber').val(response.userData.phoneNumber);
                $('#country').val(response.userData.country);
                $('#region').val(response.userData.region);
                $('#city').val(response.userData.city);
                $('#address').val(response.userData.address);
                $('#address1').val(response.userData.address1);
                $('#postalCode').val(response.userData.postalCode);
            } else {
                modal1.show();
                document.getElementById('text2').innerText = 'Erro ao obter dados da conta';
            }
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
});

/**
 * Aguarda até que o conteúdo da página seja completamente carregado para inicializar o pagamento PayPal.
 * Cria e exibe o botão do PayPal para iniciar o processo de pagamento quando o DOM estiver pronto.
 */
document.addEventListener('DOMContentLoaded', function() {
    paypal.Buttons({
        createOrder: async function(data, actions) {
            const country = document.getElementById('country').value;
                const region = document.getElementById('region').value;
                   const phoneNumber = document.getElementById('phoneNumber').value;
                   const city = document.getElementById('city').value;
                   const address = document.getElementById('address').value;
                   const postalCode = document.getElementById('postalCode').value;
                    if(country !=='' && region !== '' && phoneNumber !=='' && city !=='' && address != '' && postalCode !=''){
            
            if(country==="Portugal" || country==="portugal" || country==="PT" || country ==="pt" || country ==="Pt"){
                const response = await fetch('/create-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const responseData = await response.json();
                return responseData.orderID;
            }
            else{
                modal1.show();
                document.getElementById('text2').innerText = 'Entregas apenas em Portugal';
                document.getElementById('paypal-button-container').style.backgroundColor = '#212529';
            } 
        } else {
            modal1.show();
            document.getElementById('text2').innerText = 'Insira produtos ou preencha o formulário de morada';
            document.getElementById('paypal-button-container').style.backgroundColor = '#212529';
        }
        },
        onApprove:async function(data, actions) {
           
            const orderID = data.orderID;
           
            const response = await fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderID: orderID,
                    country: document.getElementById('country').value,
                    region: document.getElementById('region').value,
                    phoneNumber: document.getElementById('phoneNumber').value,
                    city: document.getElementById('city').value,
                    address: document.getElementById('address').value,
                    address1: document.getElementById('address1').value,
                    postalCode: document.getElementById('postalCode').value
                   
                })
            });
            const responseData = await response.json();
            if (responseData.success) {
               
                modal1.show();
                document.getElementById('text2').innerText = 'Pagamento bem sucedido!';
                document.getElementById('paypal-button-container').style.backgroundColor = '#212529';

                setTimeout(function() {
                    location.reload();
                }, 1500);
            } else {
                modal1.show();
                document.getElementById('text2').innerText = 'Erro ao processar pagamento';
                document.getElementById('paypal-button-container').style.backgroundColor = '#212529';
            }
        },
        onError: function(err) {
            modal1.show();
            document.getElementById('text2').innerText = 'Insira produtos ou preencha o formulário de morada, verifique sem tem email adicionado à conta!';
            document.getElementById('paypal-button-container').style.backgroundColor = '#212529';
        },
        onClose: function(data) {
            document.getElementById('paypal-button-container').style.backgroundColor = '#212529';
          },
          onCancel: function(data) {
            document.getElementById('paypal-button-container').style.backgroundColor = '#212529';
          },
        onClick: function(data, actions) {
              document.getElementById('paypal-button-container').style.backgroundColor = 'white';
              document.getElementById('paypal-button-container').style.borderRadius = '10px';
          }
          
    }).render('#paypal-button-container'); 
});

/**
 * Função para atualizar o número de itens no carrinho.
 * Faz uma solicitação AJAX para obter o número de itens no carrinho e atualiza a exibição do contador.
 */
function atualizarCarrinho(){
    $.ajax({
        type: 'GET',
        url: '/cartItemCount',
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
    }


//Assim que a página é carregada, ele faz o count do carrinho
$.ajax({
    type: 'GET',
    url: '/cart/cartItemCount',
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

// Apanha o logOut button
var logoutButton = document.querySelector('.logout-button');

/**
 * Evento de clique para efetuar logout.
 * Faz uma solicitação fetch para fazer logout na página do carrinho de compras.
 */
if (logoutButton) {
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        
        fetch('/cart/logout', {
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

/**
 * Função para mostrar os produtos para venda.
 * Faz uma solicitação AJAX para mostrar os produtos que estão para venda.
 */
$(async function () {

    /**
        * Função para calcular a classificação média com base nas avaliações.
        * @param {Object} ratings - As avaliações do produto.
        * @returns {number} - A classificação média calculada.
    */
    function calculateAverageRating(ratings) {
        if (!ratings || Object.keys(ratings).length === 0) return 0;
        const ratingValues = Object.values(ratings).map(rating => parseInt(rating.rating));
        const sum = ratingValues.reduce((total, rating) => total + rating, 0);
        return sum / ratingValues.length;
    }

    /**
        * Função para atualizar as estrelas de classificação de um produto.
        * @param {string} productId - O ID do produto.
        * @param {Object} ratings - As avaliações do produto.
    */
    function updateRatingStars(productId, ratings) {
        const averageRating = calculateAverageRating(ratings);
        const roundedRating = Math.round(averageRating);
        $(`#productModal${productId} #ratingStars${productId} i`).each(function(index) {
            if (index < roundedRating) {
                $(this).removeClass('far').addClass('fas'); 
            } else {
                $(this).removeClass('fas').addClass('far'); 
            }
        });
    }

    $.ajax({
        type: 'GET',
        url: '/cart/getProductsToSell',
        success: function (response) {
            if (response.success) {
                
                $('#products-container1').empty();

                
                response.products.forEach(function (product) {
                    var productId = product.name.replace(/\s+/g, '_');
                    if(!product.ratings){
                        var numberOfAvaliations = 0;
                    }else{
                        var numberOfAvaliations = product.ratings.length;
                    }

                    if (product.hidden === 'No' && product.category != "Resinas") {
                    var productHtml = `
                        <div class="card card m-1" style="height: 310px; width: 16rem;">
                            <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                            <div class="card-body text-center">
                                <h6 class="card-title">${product.name}</h6>
                                <span>${product.price}</span><br>
                                <p class="card-text cardText1">Clica no ícone do produto para ver mais detalhes e adicionar ao carrinho</p>
                            </div>
                        </div>  
                        <!-- Modal -->
                        <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">${product.name}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div id="productCarousel${productId}" class="carousel slide" data-bs-ride="carousel">
                                            <div class="carousel-inner">
                                                ${product.photos.map((photo, index) => `
                                                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                        <img src="${photo}" class="d-block w-100" height="300" alt="Product Image">
                                                    </div>
                                                `).join('')}
                                            </div>
                                            <div class="mt-2 colors">
                                                <span class="colors1">Cores:</span>
                                                ${product.colors.map(color => `
                                                    <button type="button" class="btn btn-sm btn-primary mx-1 color-btn" data-product-id="${productId}">${color}</button>
                                                `).join('')}
                                            </div>
                                            <div class="mt-2 sizes">
                                                <span class="sizes1">Tamanhos:</span>
                                                ${product.size.map(size1 => `
                                                    <button type="button" class="btn btn-sm btn-primary mx-1 size-btn" data-product-id="${productId}">${size1}</button>
                                                `).join('')}
                                            </div>
                                            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Anterior</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Seguinte</span>
                                            </button>
                                        </div>
                                        <span class="productDescription">Descrição:</span>
                                        ${product.description}
                                        <div>
                                            <span class="productPrice">Preço:</span>
                                            ${product.price}
                                        </div>
                                        <div for="ratingInput"><span class="avaliation">Avaliação</span><span>(${numberOfAvaliations})</span>:</div>
                                        <div id="ratingStars${productId}" class="rating-stars">
                                            <i class="far fa-star" data-rating="1"></i>
                                            <i class="far fa-star" data-rating="2"></i>
                                            <i class="far fa-star" data-rating="3"></i>
                                            <i class="far fa-star" data-rating="4"></i>
                                            <i class="far fa-star" data-rating="5"></i>
                                        </div>
                                        <h3 class="mb-2 commentsOfUsers" id="commentsOfUsers">Comentários de utilizadores</h3>
                                        <button id="show-comments-button" class="underline-button" data-product-name="${product.name}" data-product-id="${productId}">Ver comentários dos utilizadores</button>
                                        <div id="comments-container${productId}"></div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary addToCartBtn" data-product-name="${product.name}" data-product-id="${productId}">
                                            <i>Adicionar ao carrinho</i> 
                                        </button>
                                        <button type="button" class="btn btn-secondary closeModal" data-bs-dismiss="modal">Fechar</button>
                                        <!-- Add other buttons or actions here if needed -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    } else if(product.hidden === 'No' && product.category === "Resinas"){
                        var productHtml = `
                        <div class="card card m-1" style="height: 400px; width: 16rem;">
                            <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                            <div class="card-body text-center">
                                <h6 class="card-title">${product.name}</h6>
                                <span>${product.price}</span><br>
                                <div>
                                <p id="customize">Customiza o teu produto -></p>
                                <a href="/contactUser" id="contactUs">Contacta-nos</a>
                                </div><br>
                                <p class="card-text cardText1">Clica no ícone do produto para ver mais detalhes e adicionar ao carrinho</p>
                            </div>
                        </div>  
                        <!-- Modal -->
                        <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">${product.name}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div id="productCarousel${productId}" class="carousel slide" data-bs-ride="carousel">
                                            <div class="carousel-inner">
                                                ${product.photos.map((photo, index) => `
                                                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                        <img src="${photo}" class="d-block w-100" height="300" alt="Product Image">
                                                    </div>
                                                `).join('')}
                                            </div>
                                            <div class="mt-2 colors">
                                                <span class="colors1">Cores:</span>
                                                ${product.colors.map(color => `
                                                    <button type="button" class="btn btn-sm btn-primary mx-1 color-btn" data-product-id="${productId}">${color}</button>
                                                `).join('')}
                                            </div>
                                            <div class="mt-2 sizes">
                                                <span class="sizes1">Tamanhos:</span>
                                                ${product.size.map(size1 => `
                                                    <button type="button" class="btn btn-sm btn-primary mx-1 size-btn" data-product-id="${productId}">${size1}</button>
                                                `).join('')}
                                            </div>
                                            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Anterior</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Seguinte</span>
                                            </button>
                                        </div>
                                        <span id="productDescription">Descrição:</span>
                                        ${product.description}
                                        <div>
                                            <span id="productPrice">Preço:</span>
                                            ${product.price}
                                        </div>
                                        <div for="ratingInput"> <span class="avaliation">Avaliação</span><span>(${numberOfAvaliations})</span>:</div>
                                        <div id="ratingStars${productId}" class="rating-stars">
                                            <i class="far fa-star" data-rating="1"></i>
                                            <i class="far fa-star" data-rating="2"></i>
                                            <i class="far fa-star" data-rating="3"></i>
                                            <i class="far fa-star" data-rating="4"></i>
                                            <i class="far fa-star" data-rating="5"></i>
                                        </div>
                                        <h3 class="mb-2 commentsOfUsers" id="commentsOfUsers">Comentários de utilizadores</h3>
                                        <button id="show-comments-button" class="underline-button" data-product-name="${product.name}" data-product-id="${productId}">Ver comentários dos utilizadores</button>
                                        <div id="comments-container${productId}"></div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary addToCartBtn" data-product-name="${product.name}" data-product-id="${productId}">
                                            <i>Adicionar ao carrinho</i> 
                                        </button>
                                        <button type="button" class="btn btn-secondary closeModal" data-bs-dismiss="modal">Fechar</button>
                                        <!-- Add other buttons or actions here if needed -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    }
                   
                    $('#products-container1').append(productHtml);
                    updateRatingStars(productId, product.ratings);
                });
                
                /**
                 * Função para adicionar a classe de selected à cor escolhida 
                 */
                $(document).on('click', '.color-btn', function () {
                    var productId = $(this).data('product-id');
                    var productColors = $(`.colors .color-btn[data-product-id="${productId}"]`);
                    productColors.removeClass('selected');
                    $(this).addClass('selected');
                });

                /**
                 * Função para adicionar a classe de selected ao tamanho escolhido
                 */
                $(document).on('click', '.size-btn', function () {
                    var productId = $(this).data('product-id');
                    var productSizes = $(`.sizes .size-btn[data-product-id="${productId}"]`);
                    productSizes.removeClass('selected');
                    $(this).addClass('selected');
                });

            } else {
                console.error('Erro ao obter produtos:', response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });
});

/**
 * Manipula o evento de clique no botão "Adicionar ao carrinho".
 * Função que adiciona o produto ao carrinho
 */
$(document).on('click', '.addToCartBtn', function () {
    // Obtém o nome do produto do atributo data-product-name do botão
    var productName = $(this).data('product-name');
    var productId = $(this).data('product-id');

    // Obtém a cor selecionada para o produto correspondente ao ID
    var selectedColor = $(`.color-btn[data-product-id="${productId}"].selected`).text();

    // Obtém o tamanho selecionado para o produto correspondente ao ID
    var selectedSize = $(`.size-btn[data-product-id="${productId}"].selected`).text();

    // Verifica se uma cor e um tamanho foram selecionados
    if (!selectedColor) {
        modal.show();
        document.getElementById('text3').innerText = 'Selecione a cor';
        return;
    } else if (!selectedSize) {
        modal.show();
        document.getElementById('text3').innerText = 'Selecione o tamanho';
        return;
    }


    $.ajax({
        type: 'POST',
        url: '/addToCart',
        data: {
            name: productName,
            color: selectedColor,
            size: selectedSize
        },
        success: function (response) {
            if (response.success) {
                modal.show();
                document.getElementById('text3').innerText = 'Produto adicionado com sucesso';
                atualizarCarrinho();
                setTimeout(function() {
                    location.reload();
                }, 1500);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
                modal.show();
                document.getElementById('text3').innerText = 'Erro ao adicionar o produto ao carrinho';
                atualizarCarrinho();
        }
    });
});

/**
 * Manipula o evento de clique no botão de pesquisa.
 * Função que pesquisa os produtos pelo nome
 */
$(document).on('click', '#searchButton', function () {
    var productName = $('#searchInput').val().trim();

       /**
        * Função para calcular a classificação média com base nas avaliações.
        * @param {Object} ratings - As avaliações do produto.
        * @returns {number} - A classificação média calculada.
       */
    function calculateAverageRating(ratings) {
        if (!ratings || Object.keys(ratings).length === 0) return 0;
        const ratingValues = Object.values(ratings).map(rating => parseInt(rating.rating));
        const sum = ratingValues.reduce((total, rating) => total + rating, 0);
        return sum / ratingValues.length;
    }

     /**
        * Função para atualizar as estrelas de classificação de um produto.
        * @param {string} productId - O ID do produto.
        * @param {Object} ratings - As avaliações do produto.
     */
    function updateRatingStars(productId, ratings) {
        const averageRating = calculateAverageRating(ratings);
        const roundedRating = Math.round(averageRating);
        $(`#productModal${productId} #ratingStars${productId} i`).each(function(index) {
            if (index < roundedRating) {
                $(this).removeClass('far').addClass('fas'); // Estrela preenchida
            } else {
                $(this).removeClass('fas').addClass('far'); // Estrela vazia
            }
        });
    }

    $.ajax({
        type: 'GET',
        url: '/cart/searchProductsByName',
        data: { productName: productName },
        success: function (response) {
            if (response.success) {
                // Limpe o conteúdo anterior
                $('#products-container1').empty();

                // Itera sobre os produtos encontrados e exibe-os
                response.products.forEach(function (product) {
                        var productId = product.name.replace(/\s+/g, '_');
                        
                        var numberOfAvaliations = 0; // Define o número de avaliações como 0 por padrão

                        if (product.ratings && Object.keys(product.ratings).length > 0) {
                            numberOfAvaliations = Object.keys(product.ratings).length;
                        }
                        

                 if (product.hidden === 'No' && product.category != "Resinas") {
                        var productHtml = `
                    <div class="card card m-1" style="height: 310px; width: 16rem;">
                            <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                            <div class="card-body text-center">
                                <h6 class="card-title">${product.name}</h6>
                                <span>${product.price}</span><br>
                                <p class="card-text cardText1">Clica no ícone do produto para ver mais detalhes e adicionar ao carrinho</p>
                            </div>
                        </div>  
                        <!-- Modal -->
                        <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">${product.name}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div id="productCarousel${productId}" class="carousel slide" data-bs-ride="carousel">
                                            <div class="carousel-inner">
                                                ${product.photos.map((photo, index) => `
                                                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                        <img src="${photo}" class="d-block w-100" height="300" alt="Product Image">
                                                    </div>
                                                `).join('')}
                                            </div>
                                            <div class="mt-2 colors">
                                                <span class="colors1">Cores:</span>
                                                ${product.colors.map(color => `
                                                    <button type="button" class="btn btn-sm btn-primary mx-1 color-btn" data-product-id="${productId}">${color}</button>
                                                `).join('')}
                                            </div>
                                            <div class="mt-2 sizes">
                                                <span class="sizes1">Tamanhos:</span>
                                                ${product.size.map(size1 => `
                                                    <button type="button" class="btn btn-sm btn-primary mx-1 size-btn" data-product-id="${productId}">${size1}</button>
                                                `).join('')}
                                            </div>
                                            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Anterior</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Seguinte</span>
                                            </button>
                                        </div>
                                        <span class="productDescription">Descrição:</span>
                                        ${product.description}
                                        <div>
                                            <span class="productPrice">Preço:</span>
                                            ${product.price}
                                        </div>
                                        <div for="ratingInput"> <span class="avaliation">Avaliação</span><span>(${numberOfAvaliations})</span>:</div>
                                        <div id="ratingStars${productId}" class="rating-stars">
                                            <i class="far fa-star" data-rating="1"></i>
                                            <i class="far fa-star" data-rating="2"></i>
                                            <i class="far fa-star" data-rating="3"></i>
                                            <i class="far fa-star" data-rating="4"></i>
                                            <i class="far fa-star" data-rating="5"></i>
                                        </div>
                                        <h3 class="mb-2 commentsOfUsers" id="commentsOfUsers">Comentários de utilizadores</h3>
                                        <button id="show-comments-button" class="underline-button" data-product-name="${product.name}" data-product-id="${productId}">Ver comentários dos utilizadores</button>
                                        <div id="comments-container${productId}"></div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary addToCartBtn" data-product-name="${product.name}" data-product-id="${productId}">
                                            <i>Adicionar ao carrinho</i> 
                                        </button>
                                        <button type="button" class="btn btn-secondary closeModal" data-bs-dismiss="modal">Fechar</button>
                                        <!-- Add other buttons or actions here if needed -->
                                    </div>
                                </div>
                            </div>
                        </div>
              `;
                    } else if (product.hidden === 'No' && product.category==='Resinas') {
                        

                        var productHtml = `
                        <div class="card card m-1" style="height: 400px; width: 16rem;">
                            <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                            <div class="card-body text-center">
                                <h6 class="card-title">${product.name}</h6>
                                <span>${product.price}</span><br>
                                <div>
                                <p id="customize">Customiza o teu produto -></p>
                                <a href="/contactUser" id="contactUs">Contacta-nos</a>
                                </div><br>
                                <p class="card-text cardText1">Clica no ícone do produto para ver mais detalhes e adicionar ao carrinho</p>
                            </div>
                        </div>  
                        <!-- Modal -->
                        <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">${product.name}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div id="productCarousel${productId}" class="carousel slide" data-bs-ride="carousel">
                                            <div class="carousel-inner">
                                                ${product.photos.map((photo, index) => `
                                                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                        <img src="${photo}" class="d-block w-100" height="300" alt="Product Image">
                                                    </div>
                                                `).join('')}
                                            </div>
                                            <div class="mt-2 colors">
                                                <span class="colors1">Cores:</span>
                                                ${product.colors.map(color => `
                                                    <button type="button" class="btn btn-sm btn-primary mx-1 color-btn" data-product-id="${productId}">${color}</button>
                                                `).join('')}
                                            </div>
                                            <div class="mt-2 sizes">
                                                <span class="sizes1">Tamanhos:</span>
                                                ${product.size.map(size1 => `
                                                    <button type="button" class="btn btn-sm btn-primary mx-1 size-btn" data-product-id="${productId}">${size1}</button>
                                                `).join('')}
                                            </div>
                                            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Anterior</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Seguinte</span>
                                            </button>
                                        </div>
                                        <span class="productDescription">Descrição:</span>
                                        ${product.description}
                                        <div>
                                            <span class="productPrice">Preço:</span>
                                            ${product.price}
                                        </div>
                                        <div for="ratingInput"> <span class="avaliation">Avaliação</span><span>(${numberOfAvaliations})</span>:</div>
                                        <div id="ratingStars${productId}" class="rating-stars">
                                            <i class="far fa-star" data-rating="1"></i>
                                            <i class="far fa-star" data-rating="2"></i>
                                            <i class="far fa-star" data-rating="3"></i>
                                            <i class="far fa-star" data-rating="4"></i>
                                            <i class="far fa-star" data-rating="5"></i>
                                        </div>
                                        <h3 class="mb-2 commentsOfUsers" id="commentsOfUsers">Comentários de utilizadores</h3>
                                        <button id="show-comments-button" class="underline-button" data-product-name="${product.name}" data-product-id="${productId}">Ver comentários dos utilizadores</button>
                                        <div id="comments-container${productId}"></div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary addToCartBtn" data-product-name="${product.name}" data-product-id="${productId}">
                                            <i>Adicionar ao carrinho</i> 
                                        </button>
                                        <button type="button" class="btn btn-secondary closeModal" data-bs-dismiss="modal">Fechar</button>
                                        <!-- Add other buttons or actions here if needed -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                    }

                    $('#products-container1').append(productHtml);
                    updateRatingStars(productId, product.ratings);
                });

                // Adiciona a classe selected ao botão de cor selecionado
                $(document).on('click', '.color-btn', function () {
                    var productId = $(this).data('product-id');
                    var productColors = $(`.colors .color-btn[data-product-id="${productId}"]`);

                    productColors.removeClass('selected');
                    $(this).addClass('selected');
                });

                 // Adiciona a classe selected ao botão de tamanho selecionado
                $(document).on('click', '.size-btn', function () {
                    var productId = $(this).data('product-id');
                    var productSizes = $(`.sizes .size-btn[data-product-id="${productId}"]`);

                    productSizes.removeClass('selected');

                    $(this).addClass('selected');
                });

                var language = $('input[name="language"]:checked').val();
                // Função que atualiza os campos conforme a linguagem selecionada
                if (language === 'portuguese') {
                    $('.colors1').text('Cores:');
                    $('.sizes1').text('Tamanhos:');
                    $('.productDescription').text('Descrição:');
                    $('.productPrice').text('Preço:');
                    $('.closeModal').text('Fechar');
                    $('.mb-2.commentsOfUsers').text('Comentários dos utilizadores');
                    $('.underline-button').text('Ver comentários dos utilizadores');
                    $('.avaliation').text('Avaliação');
                    $('#customize').text('Customiza o teu produto ->');
                    $('#contactUs').text('Contacta-nos');
                    $('.cardText1').text('Clica no icon para ver mais detalhes');
                    $('.addToCartBtn').text('Adicionar ao carrinho');
                } else {
                    $('.colors1').text('Colors:');
                    $('.sizes1').text('Sizes:');
                    $('.productDescription').text('Description:');
                    $('.productPrice').text('Price:');
                    $('.closeModal').text('Close');
                    $('.mb-2.commentsOfUsers').text('Comments of Users');
                    $('.underline-button').text('View users comments');
                    $('.avaliation').text('Avaliation');
                    $('#customize').text('Customize ur product ->');
                    $('#contactUs').text('Contact Us');
                    $('.cardText1').text('Click on icon to see more details');
                    $('.addToCartBtn').text('Add to cart');
                }
                
            } else {
                console.error('Erro ao pesquisar produtos:', response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });

});

/**
 * Manipula o evento de clique no botão de sublinhado para mostrar/ocultar os comentários dos utilizadores.
 */
$(document).on('click', '.underline-button', function () {
    // Obtém o nome do produto do atributo data-product-name do botão
    var productName = $(this).data('product-name');
    var productId = $(this).data('product-id');
    var commentsContainer = $('#comments-container' + productId);
    var button = $(this);

    var language = $('input[name="language"]:checked').val();

   
    if (commentsContainer.is(':visible')) {
       
        commentsContainer.hide();

        if (language === 'portuguese') {
            button.text('Ver comentários dos utilizadores');
        } else {
            button.text('View users comments');
        }
    } else {
        
        $.ajax({
            type: 'POST',
            url: '/cart/showProductsComments',
            data: {
                name: productName,
            },
            success: function (response) {
                commentsContainer.empty();
                if (response.success) {
                    var comments = response.ratings; 
                    comments.forEach(function (comment) {
                        
                        var commentHtml = `
                            <div class="comment">
                                <p><strong class="user">Utilizador:</strong> ${comment.user}</p>
                                <p><strong class="comment1">Comentário:</strong> ${comment.comment}</p>
                                <p><strong class="avaliation1">Avaliação:</strong> ${comment.rating}</p>
                            </div>
                        `;
                       
                        commentsContainer.append(commentHtml);
                    });
                  
                    commentsContainer.show();

                    // Altera o texto do botão para "Esconder comentários dos utilizadores" e atualiza consoante a linguagem os campos 
                    if (language === 'portuguese') {
                        button.text('Esconder comentários dos utilizadores');
                        $('.user').text('Utilizador:');
                        $('.comment1').text('Comentário:');
                        $('.avaliation1').text('Avaliação:');
                    } else {
                        button.text('Hide users comments');
                        $('.user').text('User:');
                        $('.comment1').text('Comment:');
                        $('.avaliation1').text('Avaliation:');
                    }
                } 
            },
            error: function (xhr, status, error) {
                // Em caso de erro, mostra uma mensagem de erro
                modal1.show();
                document.getElementById('text2').innerText = 'Este produto não tem comentários';
            }
        });
    }
});