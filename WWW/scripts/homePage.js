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
        $('.cardText').text('Faz o resgisto/login para adicionares o produto ao carrinho');
        $('#categoryDropdownMenuButton').text('Escolha a categoria');
        $('#subCategoryDropdownMenuButton').text('Escolha a subcategoria');
        $('.cardText1').text('Clica no icon para ver mais detalhes');
        $('#products').text('Produtos');
        $('#searchButton').text('Pesquisar');
        document.getElementById('searchButton1').innerText = 'Pesquisar';
        $('#searchInput').attr('placeholder', 'Pesquisar por nome de produto');
        $('#searchInput1').attr('placeholder', 'Pesquisar por categoria de produto');
        $('#customize').text('Customiza o teu produto ->');
        $('#contactUs').text('Contacta-nos');
        document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
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
        document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
        document.getElementById('servicesLink').innerText = 'Services';
        document.getElementById('contactLink').innerText = 'Contact';
        document.getElementById('Login').innerText = 'Login';
        $('.cardText').text('Sign In to can add the product to cart');
        $('#categoryDropdownMenuButton').text('Choose the category');
        $('#subCategoryDropdownMenuButton').text('Choose the subcategory');
        $('.cardText1').text('Click on icon to see more details');
        $('#products').text('Products');
        $('#searchButton').text('Search');
        document.getElementById('searchButton1').innerText = 'Search';
        $('#searchInput').attr('placeholder', 'Search for product name');
        $('#searchInput1').attr('placeholder', 'Search for product category');
        $('#customize').text('Customize ur product ->');
        $('#contactUs').text('Contact Us');
        document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
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
        url: '/getProductsToSell',
        success: function (response) {
            if (response.success) {
                $('#products-container').empty();

                response.products.forEach(function (product) {
                    if(!product.ratings){
                        var numberOfAvaliations = 0;
                    }else{
                        var numberOfAvaliations = product.ratings.length;
                    }

                    var productId = product.name.replace(/\s+/g, '_');

                    if (product.hidden === 'No' && product.category != "Resinas") {
                        var productHtml = `
                        <div class="card card m-1" style="height: 370px; width: 16rem;" >
                            <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                            <div class="card-body text-center">
    <h6 class="card-title">${product.name}</h6>
    <div>
        <span>${product.price}</span>
    </div>
    <p class="card-text cardText">Faz o registo/login para adicionares produtos ao carrinho</p>
    <p class="card-text cardText1">Clica no icon para veres mais detalhes</p>
</div>

                        <!-- Modal -->
                        <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" id="productModal">
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
                                                <button type="button" class="btn btn-sm btn-primary mx-1">${color}</button>
                                            `).join('')}
                                        </div>
                                        <div class="mt-2 sizes">
                                        <span class="sizes1">Tamanhos:</span>
                                            ${product.size.map(size1 => `
                                                <button type="button" class="btn btn-sm btn-primary mx-1">${size1}</button>
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
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                        <!-- Add other buttons or actions here if needed -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        `;

                        $('#products-container').append(productHtml);
                        $('.subCategory1').hide();
                        updateRatingStars(productId, product.ratings);
                    } else if (product.hidden === 'No') {
                        var productHtml = `
                        <div class="card card m-1" style="height: 450px; width: 16rem;" >
                        <img src="${product.photos[0]}" class="card-img-top mt-3" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                        <div class="card-body text-center">
<h6 class="card-title">${product.name}</h6>
    <span>${product.price}</span><br>
<div>
<p id="customize">Customiza o teu produto -></p>
<a href="/contactUser" id="contactUs">Contacta-nos</a></div><br>

<p class="card-text cardText">Faz o registo/login para adicionares o produto ao carrinho</p>
                                <p class="card-text cardText1">Clica no icon para veres mais detalhes</p>
                            </div>
                        </div>  
                        <!-- Modal -->
                        <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" id="productModal">
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
                                                <button type="button" class="btn btn-sm btn-primary mx-1">${color}</button>
                                            `).join('')}
                                        </div>
                                        <div class="mt-2 sizes">
                                        <span class="sizes1">Tamanhos:</span>
                                            ${product.size.map(size1 => `
                                                <button type="button" class="btn btn-sm btn-primary mx-1">${size1}</button>
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
                                        <span class="productPrice"> Preço:</span>

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
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                        <!-- Add other buttons or actions here if needed -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        `;

                        $('#products-container').append(productHtml);
                        $('.subCategory1').hide();
                        updateRatingStars(productId, product.ratings);
                    }

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
        url: '/homePage/searchProductsByName',
        data: { productName: productName },
        success: function (response) {
            if (response.success) {
               
                $('#products-container').empty();

                
                response.products.forEach(function (product) {
                    if(!product.ratings){
                        var numberOfAvaliations = 0;
                    }else{
                        var numberOfAvaliations = product.ratings.length;
                    }

                    var productId = product.name.replace(/\s+/g, '_');

                    if (product.hidden === 'No' && product.category != "Resinas") {

                        var productHtml = `
                    <div class="card card m-1" style="height: 370px; width: 16rem;" >
                    <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="90" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                    <div class="card-body text-center">
<h6 class="card-title">${product.name}</h6>
<div>
<span>${product.price}</span>
</div>
<p class="card-text cardText">Faz o resgisto/login para adicionares o produto ao carrinho</p>
<p class="card-text cardText1">Clica no icon para veres mais detalhes</p>
</div>
                    <!-- Modal -->
                    <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" id="productModal">
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
                                            <button type="button" class="btn btn-sm btn-primary mx-1">${color}</button>
                                        `).join('')}
                                        </div>
                                        <div class="mt-2 sizes">
                                        <span class="sizes1">Tamanhos:</span>
                                        ${product.size.map(size1 => `
                                            <button type="button" class="btn btn-sm btn-primary mx-1">${size1}</button>
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
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <!-- Add other buttons or actions here if needed -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    `;

                        
                        $('#products-container').append(productHtml);
                        $('.subCategory1').hide();
                        updateRatingStars(productId, product.ratings);
                    } else if (product.hidden === 'No') {

                        var productHtml = `
                    <div class="card card m-1" style="height: 450px; width: 16rem;" >
                    <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                    <div class="card-body text-center">
<h6 class="card-title">${product.name}</h6>
<span>${product.price}</span><br>
<div>
<p id="customize">Customiza o teu produto -></p>
<a href="/contactUser" id="contactUs">Contacta-nos</a>
</div><br>
<p class="card-text cardText">Faz o resgisto/login para adicionares o produto ao carrinho</p>
                            <p class="card-text cardText1">Clica no icon para ver mais detalhes</p>
                        </div>
                    </div>  
                    <!-- Modal -->
                    <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" id="productModal">
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
                                            <button type="button" class="btn btn-sm btn-primary mx-1">${color}</button>
                                        `).join('')}
                                        </div>
                                        <div class="mt-2 sizes">
                                        <span class="sizes1">Tamanhos:</span>
                                        ${product.size.map(size1 => `
                                            <button type="button" class="btn btn-sm btn-primary mx-1">${size1}</button>
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
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <!-- Add other buttons or actions here if needed -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    `;

                        
                        $('#products-container').append(productHtml);
                        $('.subCategory1').hide();
                        updateRatingStars(productId, product.ratings);
                    }

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
                        $('.cardText').text('Faz o resgisto/login para adicionares o produto ao carrinho');
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
                        $('.cardText').text('Sign In to can add the product to cart');
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
    var productCategory = $('#searchInput1').val().trim();

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
        url: '/homePage/searchProductsByCategory',
        data: { productCategory: productCategory },
        success: function (response) {
            if (response.success) {
               
                $('#products-container').empty();

        
                response.products.forEach(function (product) {
                    
                    if(!product.ratings){
                        var numberOfAvaliations = 0;
                    }else{
                        var numberOfAvaliations = product.ratings.length;
                    }

                    var productId = product.name.replace(/\s+/g, '_');

                    if (product.hidden === 'No' && product.category != "Resinas") {

                        var productHtml = `
                    <div class="card card m-1" style="height: 370px; width: 16rem;" >
                            <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="90" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                            <div class="card-body text-center">
    <h6 class="card-title">${product.name}</h6>
    <div>
        <span>${product.price}</span>
    </div>
    <p class="card-text cardText">Faz o resgisto/login para adicionar o produto ao carrinho</p>
    <p class="card-text cardText1">Clica no icon para ver mais detalhes</p>
</div>  
                    <!-- Modal -->
                    <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" id="productModal">
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
                                            <button type="button" class="btn btn-sm btn-primary mx-1">${color}</button>
                                        `).join('')}
                                    </div>
                                    <div class="mt-2 sizes">
                                    <span class="sizes1">Tamanhos:</span>
                                        ${product.size.map(size1 => `
                                            <button type="button" class="btn btn-sm btn-primary mx-1">${size1}</button>
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
                                    <div>
                                    <span class="productDescription">Descrição:</span>
                                        <span>${product.description}</span>
                            </div>
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
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <!-- Add other buttons or actions here if needed -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    `;

            
                        $('#products-container').append(productHtml);
                        $('.subCategory1').hide();
                        updateRatingStars(productId, product.ratings);
                    } else if (product.hidden === 'No') {

                        var productHtml = `
                    <div class="card card m-1" style="height: 450px; width: 16rem;" >
                    <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                    <div class="card-body text-center">
<h6 class="card-title">${product.name}</h6>
<span>${product.price}</span><br>
<div>
<p id="customize">Customiza o teu produto -></p>
<a href="/contactUser" id="contactUs">Contacta-nos</a>
</div><br>
<p class="card-text cardText">Faz o registo/login para adicionar o produto ao carrinho</p>
                            <p class="card-text cardText1">Clica no icon para ver mais detalhes</p>
                        </div>
                    </div>  
                    <!-- Modal -->
                    <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" id="productModal">
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
                                            <button type="button" class="btn btn-sm btn-primary mx-1">${color}</button>
                                        `).join('')}
                                        </div>
                                        <div class="mt-2 sizes">
                                        <span class="sizesq">Tamanhos:</span>
                                        ${product.size.map(size1 => `
                                            <button type="button" class="btn btn-sm btn-primary mx-1">${size1}</button>
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
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <!-- Add other buttons or actions here if needed -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    `;

                        
                        $('#products-container').append(productHtml);
                        $('.subCategory1').hide();
                        updateRatingStars(productId, product.ratings);
                    }
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
                        $('.cardText').text('Faz o resgisto/login para adicionares o produto ao carrinho');
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
                        $('.cardText').text('Sign In to can add the product to cart');
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
        url: '/homePage/getCategories',
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

    /**
 * Ao inicializar a página, carregar as sub categorias de produtos.
 */
    $.ajax({
        type: 'GET',
        url: '/homePage/getSubCategories',
        success: function (response) {
            if (response.success) {
                // Limpa o conteúdo anterior da lista de subcategorias
                var dropdownMenu = $('.subCategory1 .dropdown-menu');
                dropdownMenu.empty();

                // Itera sobre as subcategorias e adiciona cada uma como um item de menu
                response.subCategories.forEach(function (subCategory) {
                    // Cria um item de menu com o nome da subcategoria como texto e o ID igual ao nome da subcategoria
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
});


   /**
     * Função para mostrar os produtos para venda 
     * com base na categoria selecionada , 
     * e se for bijuteria, pode escolher uma sub categoria
     */
    $(document).on('click', '.dropdown-item.category-item', function (e) {
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

        var productCategory = $(this).attr('id'); // Obtém o ID da categoria clicada

       
        $.ajax({
            type: 'GET',
            url: '/homePage/getProductsByCategory',
            data: { productCategory: productCategory },
            success: function (response) {
                if (response.success) {
                  
                    $('#products-container').empty();

                   
                    response.products.forEach(function (product) {
                        if (product.hidden === 'No' && product.category != "Resinas") {
                           
                            if(!product.ratings){
                                var numberOfAvaliations = 0;
                            }else{
                                var numberOfAvaliations = product.ratings.length;
                            }

                           
                            var productId = product.name.replace(/\s+/g, '_');

                            var productHtml = `
                                <div class="card card m-1" style="height: 370px; width: 16rem;">
                                    <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="90" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                                    <div class="card-body text-center">
                                        <h6 class="card-title">${product.name}</h6>
                                        <div>
                                            <span>${product.price}</span>
                                        </div>
                                        <p class="card-text cardText">Faz o registo/login para adicionares o produto ao carrinho</p>
                                        <p class="card-text cardText1">Clica no icon para veres mais detalhes</p>
                                    </div>
                                    <!-- Modal -->
                                    <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" id="productModal">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">${product.name}</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div id="productCarousel${productId}" class="carousel slide" data-bs-ride="carousel">
                                                        <div class="carousel-inner">
                                                            ${product.photos.map((photo, index) => `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                            <img src="${photo}" class="d-block w-100" height="300" alt="Product Image"></div>`).join('')}
                                                        </div>
                                                        <div class="mt-2 colors">
                                                        <span class="colors1">Cores:</span>
                                            ${product.colors.map(color => `<button type="button" class="btn btn-sm btn-primary mx-1">${color}</button>`).join('')}
                                        </div>
                                        <div class="mt-2 sizes">
                                        <span class="sizes1">Tamanhos:</span>
                                            ${product.size.map(size1 => `<button type="button" class="btn btn-sm btn-primary mx-1">${size1}</button>`).join('')}
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
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <!-- Add other buttons or actions here if needed -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;

                            $('#products-container').append(productHtml);
                            $('.subCategory1').hide();
                            updateRatingStars(productId, product.ratings);
                        } else{
                            $('.subCategory1').show();
                        }

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
                        $('.cardText').text('Faz o resgisto/login para adicionares o produto ao carrinho');
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
                        $('.cardText').text('Sign In to can add the product to cart');
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
                $(this).removeClass('far').addClass('fas'); 
            } else {
                $(this).removeClass('fas').addClass('far'); 
            }
        });
    }

    var productSubCategory = $(this).attr('id'); 

    $.ajax({
        type: 'GET',
        url: '/homePage/getProductsBySubCategory',
        data: { productSubCategory: productSubCategory },
        success: function (response) {
            if (response.success) {
                $('#products-container').empty();

               
                response.products.forEach(function (product) {
                    
                    if (product.hidden === 'No') {
                        if(!product.ratings){
                            var numberOfAvaliations = 0;
                        }else{
                            var numberOfAvaliations = product.ratings.length;
                        }
                        
                        var productId = product.name.replace(/\s+/g, '_');

                        var productHtml = `
                            <div class="card card m-1" style="height: 450px; width: 16rem;">
                                <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="90" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                                <div class="card-body text-center">
                                    <h6 class="card-title">${product.name}</h6>
                                    <span>${product.description}</span><br>
                                        <span>${product.price}</span> <br>
                                    <div>
                                        <p id="customize">Customiza o teu produto -></p>
                                        <a href="/contactUser" id="contactUs">Contacta-nos</a>
                                    </div><br>
                                    <p class="card-text cardText">Faz o registo/login para adicionares o produto ao carrinho</p>
                                    <p class="card-text cardText1">Clica no icon para veres mais detalhes</p>
                                </div>
                                <!-- Modal -->
                                <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" id="productModal">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">${product.name}</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div id="productCarousel${productId}" class="carousel slide" data-bs-ride="carousel">
                                                    <div class="carousel-inner">
                                                        ${product.photos.map((photo, index) => `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                        <img src="${photo}" class="d-block w-100" height="300" alt="Product Image"></div>`).join('')}
                                                    </div>
                                                    <div class="mt-2 colors">
                                                    <span class="colors1">Cores:</span>
                                                        ${product.colors.map(color => `<button type="button" class="btn btn-sm btn-primary mx-1">${color}</button>`).join('')}
                                                    </div>
                                                    <div class="mt-2 sizes">
                                                    <span class="sizes">Tamanhos:</span>
                                                        ${product.size.map(size1 => `<button type="button" class="btn btn-sm btn-primary mx-1">${size1}</button>`).join('')}
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
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                                <!-- Add other buttons or actions here if needed -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;

                       
                        $('#products-container').append(productHtml);
                        updateRatingStars(productId, product.ratings);
                    }

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
                        $('.cardText').text('Faz o resgisto/login para adicionares o produto ao carrinho');
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
                        $('.cardText').text('Sign In to can add the product to cart');
                    }
                });

            
            } else {
                console.error('Erro ao obter produtos por subcategoria:', response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
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
        // Altera o texto do botão para "Mostrar comentários dos utilizadores"
        if (language === 'portuguese') {
            button.text('Ver comentários dos utilizadores');
        } else {
            button.text('View users comments');
        }
    } else {
        $.ajax({
            type: 'POST',
            url: '/homePage/showProductsComments',
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
                    // Altera o texto do botão para "Esconder comentários dos utilizadores" e os campos conforme a linguagem selecionada
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