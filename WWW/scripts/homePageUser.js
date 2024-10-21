/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 23/05/2024
 */

// Apanha a modal do HTML
const modal1 = new bootstrap.Modal(document.getElementById('addProductModal'));

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
        document.getElementById('categoryDropdownMenuButton').innerText = 'Escolha a categoria';
        document.getElementById('subCategoryDropdownMenuButton').innerText = 'Escolha a subcategoria';
        $('#categoryDropdownMenuButton').text('Escolha a categoria');
        $('#subCategoryDropdownMenuButton').text('Escolha a subcategoria');
        $('.cardText1').text('Clica no icon para veres mais detalhes');
        $('.addToCartBtn').text('Adicionar ao carrinho');
        $('.avaliation').text('Avaliação');
        $('#products').text('Produtos');
        $('#searchButton').text('Pesquisar');
        $('#customize').text('Customiza o teu produto ->');
        $('#contactUs').text('Contacta-nos');
        document.getElementById('searchButton1').innerText = 'Pesquisar';
        $('#searchInput').attr('placeholder', 'Pesquisar por nome de produto');
        $('#searchInput1').attr('placeholder', 'Pesquisar por categoria de produto');
        $('.colors1').text('Cores:');
        $('.sizes1').text('Tamanhos:');
        $('.productDescription').text('Descrição:');
        $('.productPrice').text('Preço:');
        $('.closeModal').text('Fechar');
        document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
        $('.mb-2.commentsOfUsers').text('Comentários dos utilizadores');
        $('.underline-button').text('Ver comentários dos utilizadores');
        $('.user').text('Utilizador:');
        $('.comment1').text('Comentário:');
        $('.avaliation1').text('Avaliação:');
    } else {
        document.getElementById('homeLink').innerText = 'Home';
        document.getElementById('aboutLink').innerText = 'About';
        document.getElementById('servicesLink').innerText = 'Services';
        document.getElementById('contactLink').innerText = 'Contact';
        document.getElementById('accountLink').innerText = 'Account';
        document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
        $('#categoryDropdownMenuButton').text('Choose the category');
        $('#subCategoryDropdownMenuButton').text('Choose the subcategory');
        $('.cardText1').text('Click on icon to see more details');
        $('.addToCartBtn').text('Add to cart');
        $('.avaliation').text('Avaliation');
        $('#products').text('Products');
        $('#searchButton').text('Search');
        document.getElementById('searchButton1').innerText = 'Search';
        $('#searchInput').attr('placeholder', 'Search for product name');
        $('#searchInput1').attr('placeholder', 'Search for product category');
        $('#customize').text('Customize ur product ->');
        $('#contactUs').text('Contact Us');
        $('.colors1').text('Colors:');
        $('.sizes1').text('Sizes:');
        $('.productDescription').text('Description:');
        $('.productPrice').text('Price:');
        $('.closeModal').text('Close');
        document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
        $('.mb-2.commentsOfUsers').text('Comments of Users');
        $('.underline-button').text('View users comments');
        $('.user').text('User:');
        $('.comment1').text('Comment:');
        $('.avaliation1').text('Avaliation:');
    }
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
                $(this).removeClass('far').addClass('fas'); // Estrela preenchida
            } else {
                $(this).removeClass('fas').addClass('far'); // Estrela vazia
            }
        });
    }

    $.ajax({
        type: 'GET',
        url: '/homePageUser/getProductsToSell',
        success: function (response) {
            if (response.success) {
                
                $('#products-container').empty();

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
                                        <h3 class="mb-2 commentsOfUsers" id="commentsOfUsers" >Comentários de utilizadores</h3>
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
                    }
                    $('#products-container').append(productHtml);
                    $('.subCategory1').hide();
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
 * Adiciona um evento de clique aos botões "Adicionar ao carrinho" para adicionar produtos ao carrinho.
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
        modal1.show();
        document.getElementById('text2').innerText = 'Selecione a cor';
        return;
    } else if (!selectedSize) {
        modal1.show();
        document.getElementById('text2').innerText = 'Selecione o tamanho';
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
                modal1.show();
                document.getElementById('text2').innerText = 'Produto adicionado com sucesso';
                atualizarCarrinho();
            } else {
                modal1.show();
                document.getElementById('text2').innerText = 'Erro ao adicionar o produto ao carrinho';
            }
        },
        error: function (xhr, status, error) {
            modal1.show();
            document.getElementById('text2').innerText = 'Erro ao adicionar o produto ao carrinho';
        }
    });
});

/**
 * Adiciona um evento de clique aos botões "underline-button" para exibir ou ocultar os comentários dos utilizadores de um produto.
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
           $('#editModalLabel')
        } else {
            button.text('View users comments');
        }
    } else {
       
        $.ajax({
            type: 'POST',
            url: '/showProductsComments',
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
                    // Altera o texto do botão para "Esconder comentários dos utilizadores" e atualizar os campos conforme a linguagem selecionada
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
                modal1.show();
                document.getElementById('text2').innerText = 'Este produto não tem comentários';
            }
        });
    }
});

/**
 * Manipula o evento de clique no botão de pesquisa.
 * Função que pesquisa os produtos pelo nome
 */
$(document).on('click', '#searchButton', function () {

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

    var productName = $('#searchInput').val().trim();


    $.ajax({
        type: 'GET',
        url: '/homePageUser/searchProductsByName',
        data: { productName: productName },
        success: function (response) {
            if (response.success) {
                
                $('#products-container').empty();

                
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
                    }

                    $('#products-container').append(productHtml);
                    $('.subCategory1').hide();
                    updateRatingStars(productId, product.ratings);
                    
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
    

                });
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
 * Manipula o evento de clique no botão de pesquisa.
 * Função que pesquisa os produtos pela categoria
 */
$(document).on('click', '#searchButton1', function () {

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
    
    var productCategory = $('#searchInput1').val().trim();

   
    $.ajax({
        type: 'GET',
        url: '/homePageUser/searchProductsByCategory',
        data: { productCategory: productCategory },
        success: function (response) {
            if (response.success) {
                
                $('#products-container').empty();

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
                                    <div for="ratingInput" ><span class="avaliation">Avaliação</span><span>(${numberOfAvaliations})</span>:</div>
                                    <div id="ratingStars${productId}" class="rating-stars">
                                            <i class="far fa-star" data-rating="1"></i>
                                            <i class="far fa-star" data-rating="2"></i>
                                            <i class="far fa-star" data-rating="3"></i>
                                            <i class="far fa-star" data-rating="4"></i>
                                            <i class="far fa-star" data-rating="5"></i>
                                        </div>
                                    <h3 class="mb-2 commentsOfUsers" id="commentsOfUsers" >Comentários de utilizadores</h3>
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
                    } else if (product.hidden === 'No' && product.category ==='Resinas') {
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

                    }

                      
                       $('#products-container').append(productHtml);
                       $('.subCategory1').hide();
                       updateRatingStars(productId, product.ratings);
                        
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
    
                });
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
 * Função assíncrona para inicializar a página e carregar as categorias de produtos.
 */
$(async function () {
    
    $.ajax({
        type: 'GET',
        url: '/homePageUser/getCategories', 
        success: function (response) {
            if (response.success) {
               
                var dropdownMenu = $('.category1 .dropdown-menu');
                dropdownMenu.empty();

                
                response.categories.forEach(function (category) {
                   
                    var menuItem = $('<li><a class="dropdown-item category-item" id="' + category + '">' + category + '</a></li>');
                    dropdownMenu.append(menuItem);
                });
            } else {
                console.error('Erro ao obter categorias:', response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });
});

/**
 * Função assíncrona para inicializar a página e carregar as sub categorias de produtos.
 */
$(async function () {
 
    $.ajax({
        type: 'GET',
        url: '/homePageUser/getSubCategories', 
        success: function (response) {
            if (response.success) {

                var dropdownMenu = $('.subCategory1 .dropdown-menu');
                dropdownMenu.empty();

                
                response.subCategories.forEach(function (subCategory) {
                   
                    var menuItem = $('<li><a class="dropdown-item subcategory-item" id="' + subCategory + '">' + subCategory + '</a></li>');
                    dropdownMenu.append(menuItem);
                });
            } else {
                console.error('Erro ao obter subcategorias:', response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });


    /**
     * Função para mostrar os produtos para venda 
     * com base na categoria selecionada , 
     * e se for bijuteria, pode escolher uma sub categoria
     */
    $(function () {

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

        
        $(document).on('click', '.dropdown-item.category-item', function (e) {
            e.preventDefault(); 

            var productCategory = $(this).attr('id'); // Obtém o ID da categoria clicada

            
            $.ajax({
                type: 'GET',
                url: '/homePageUser/getProductsByCategory',
                data: { productCategory: productCategory },
                success: function (response) {
                    if (response.success) {
                        
                        $('#products-container').empty();

                        
                        response.products.forEach(function (product) {
                            if (product.hidden === 'No' && product.category != "Resinas") {
                                var productId = product.name.replace(/\s+/g, '_');

                                if(!product.ratings){
                                    var numberOfAvaliations = 0;
                                }else{
                                    var numberOfAvaliations = product.ratings.length;
                                }

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
                                $('#products-container').append(productHtml);
                                $('.subCategory1').hide();
                                updateRatingStars(productId, product.ratings);
                            } else if (product.hidden == 'No') {
                                $('.subCategory1').show();
                            }

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
            
                        });
                    } else {
                        console.error('Erro ao obter produtos por categoria:', response.message);
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Erro na solicitação AJAX:', error);
                }
            });
        });
    });
});

/**
     * Função para mostrar os produtos para venda 
     * com base na sub categoria selecionada
     */
$(document).on('click', '.dropdown-item.subcategory-item', function (e) {
    e.preventDefault(); 

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

    var productSubCategory = $(this).attr('id'); 

    $.ajax({
        type: 'GET',
        url: '/homePageUser/getProductsBySubCategory',
        data: { productSubCategory: productSubCategory },
        success: function (response) {
            if (response.success) {
                $('#products-container').empty();

               
                response.products.forEach(function (product) {
                   
                    var productId = product.name.replace(/\s+/g, '_');
                    if(!product.ratings){
                        var numberOfAvaliations = 0;
                    }else{
                        var numberOfAvaliations = product.ratings.length;
                    }

                    if (product.hidden === 'No') {
                        
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
                        $('#products-container').append(productHtml);
                        updateRatingStars(productId, product.ratings);
                    }

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
                    
                });


            } else {
                alert('Erro ao obter produtos por subcategoria:', response.message);
            }
        },
        error: function (xhr, status, error) {
            alert('Erro na solicitação AJAX:', error);
        }
    });
}); 

/**
 * Função para atualizar o contador de itens no carrinho.
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

/**
 * Assim que a página é inicializada, vai buscar o número de produtos no carrinho
 */
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

// Botão de logOut
var logoutButton = document.querySelector('.logout-button');

if (logoutButton) {
    /**
 * Adiciona um listener de evento ao botão de logout, se estiver presente, para efetuar o logout do utilizador.
 */
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        
        fetch('/homePageUser/logout', {
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
