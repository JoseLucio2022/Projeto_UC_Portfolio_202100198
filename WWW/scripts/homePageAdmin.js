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
        document.getElementById('adminServicesLink').innerText = 'Serviços Admin';
        $('#categoryDropdownMenuButton').text('Escolha a categoria');
        $('#subCategoryDropdownMenuButton').text('Escolha a subcategoria');
        $('.cardText1').text('Clica no icon para veres mais detalhes');
        $('#products').text('Produtos');
        $('#searchButton').text('Pesquisar');
        document.getElementById('privacyPoliticsLink').innerText = 'Política de privacidade';
        document.getElementById('searchButton1').innerText = 'Pesquisar';
        $('#searchInput').attr('placeholder', 'Pesquisar por nome de produto');
        $('#searchInput1').attr('placeholder', 'Pesquisar por categoria de produto');
        $('#customize').text('Customiza o teu produto ->');
        $('#contactUs').text('Contacta-nos');
        document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
    } else {
        document.getElementById('homeLink').innerText = 'Home';
        document.getElementById('aboutLink').innerText = 'About';
        document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
        document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
        document.getElementById('servicesLink').innerText = 'Services';
        document.getElementById('contactLink').innerText = 'Contact';
        document.getElementById('adminServicesLink').innerText = 'Admin Services';
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
    }

}

/**
 * Função para mostrar os produtos para venda.
 * Faz uma solicitação AJAX para mostrar os produtos que estão para venda.
 */
$(async function () {
    $.ajax({
        type: 'GET',
        url: '/homePageAdmin/getProductsToSell',
        success: function (response) {
            if (response.success) {
               
                $('#products-container').empty();

                
                response.products.forEach(function (product) {
                    if (product.hidden === 'No') {
                       
                        var productId = product.name.replace(/\s+/g, '_');

                        var productHtml = `
                        <div class="card card m-1" style="height: 450px; width: 16rem;" >
                        <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                        <div class="card-body text-center">
<h5 class="card-title">${product.name}</h5>
<div>
<span>${product.description}</span>
</div>
<div>
    <span>${product.price}</span>
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
                                            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Anterior</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Seguinte</span>
                                            </button>
                                        </div>
                                        <p>${product.description}</p>
                                        <div>
                                                <span>${product.price}</span>
                                    </div>
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
$(document).on('click', '#searchButton', function() {
    var productName = $('#searchInput').val().trim();
  
      
      $.ajax({
        type: 'GET',
        url: '/homePageAdmin/searchProductsByName',
        data: { productName: productName },
        success: function(response) {
          if (response.success) {
           
            $('#products-container').empty();
  
            
            response.products.forEach(function(product) {
                if(product.hidden === 'No'){
                    var productId = product.name.replace(/\s+/g, '_');

                    var productHtml = `
                    <div class="card card m-1" style="height: 450px; width: 16rem;" >
                    <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                    <div class="card-body text-center">
                    <div>
<h5 class="card-title">${product.name}</h5>
<span>${product.description}</span>
</div>
<div>
<span>${product.price}</span>
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
                                        <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Anterior</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Seguinte</span>
                                        </button>
                                    </div>
                                    <p>${product.description}</p>
                                    <div>
                                    <span class="productPrice"> </span>
                                        <span>${product.price}</span>
                            </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <!-- Add other buttons or actions here if needed -->
                                </div>
                            </div>
                        </div>
                    </div>
              `;
  
              // Adicione o HTML do produto ao contêiner de produtos
              $('#products-container').append(productHtml);
                }
            });
          } else {
            console.error('Erro ao pesquisar produtos:', response.message);
          }
        },
        error: function(xhr, status, error) {
          console.error('Erro na solicitação AJAX:', error);
        }
      });
    
  });


/**
 * Manipula o evento de clique no botão de pesquisa.
 * Função que pesquisa os produtos pela categoria
 */
  $(document).on('click', '#searchButton1', function() {
    var productCategory = $('#searchInput1').val().trim();
  
      $.ajax({
        type: 'GET',
        url: '/homePageAdmin/searchProductsByCategory',
        data: { productCategory: productCategory },
        success: function(response) {
          if (response.success) {
        
            $('#products-container').empty();
  
           
            response.products.forEach(function(product) {
                if(product.hidden === 'No'){
                    var productId = product.name.replace(/\s+/g, '_');

                    var productHtml = `
                    <div class="card card m-1" style="height: 450px; width: 16rem;" >
                            <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                            <div class="card-body text-center">
    <h5 class="card-title">${product.name}</h5>
    <div>
        <span>${product.price}</span>
    </div>
    <div>
        <span>${product.category}</span>
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
                                        <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Anterior</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Seguinte</span>
                                        </button>
                                    </div>
                                    <p>${product.description}</p>
                                    <div>
                                        <span>${product.price}</span>
                            </div>
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
                }
            });
          } else {
            console.error('Erro ao pesquisar produtos:', response.message);
          }
        },
        error: function(xhr, status, error) {
          console.error('Erro na solicitação AJAX:', error);
        }
      });
    
  });

  /**
 * Função assíncrona para inicializar a página e carregar as categorias de produtos.
 */
  $(async function() {
    $.ajax({
        type: 'GET',
        url: '/homePageAdmin/getCategories', 
        success: function(response) {
            if (response.success) {
              
                var dropdownMenu = $('.category1 .dropdown-menu');
                dropdownMenu.empty();
                
              
                response.categories.forEach(function(category) {
                    var menuItem = $('<li><a class="dropdown-item category-item" id="' + category + '">' + category + '</a></li>');
                    dropdownMenu.append(menuItem);
                });
            } else {
                console.error('Erro ao obter categorias:', response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });
});

/**
 * Função assíncrona para inicializar a página e carregar as sub categorias de produtos.
 */
$(async function() {
    
    $.ajax({
        type: 'GET',
        url: '/homePageAdmin/getSubCategories', 
        success: function(response) {
            if (response.success) {

                var dropdownMenu = $('.subCategory1 .dropdown-menu');
                dropdownMenu.empty();
                
                
                response.subCategories.forEach(function(subCategory) {
                    var menuItem = $('<li><a class="dropdown-item subcategory-item"  id="' + subCategory + '">' + subCategory + '</a></li>');
                    dropdownMenu.append(menuItem);
                });
            } else {
                console.error('Erro ao obter categorias:', response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });
});

/**
     * Função para mostrar os produtos para venda 
     * com base na categoria selecionada , 
     * e se for bijuteria, pode escolher uma sub categoria
     */
$(function() {
   
    $(document).on('click', '.dropdown-item.category-item', function(e) {
        e.preventDefault(); 

        var productCategory = $(this).attr('id');

        $.ajax({
            type: 'GET',
            url: '/homePageAdmin/getProductsByCategory',
            data: { productCategory: productCategory},
            success: function(response) {
                if (response.success) {
                 
                    $('#products-container').empty();

                    
                    response.products.forEach(function(product) {
                        if(product.hidden === 'No' && product.category !="Resinas"){
                            var productId = product.name.replace(/\s+/g, '_');
        
                            var productHtml = `
                            <div class="card card m-1" style="height: 450px; width: 16rem;" >
                            <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                            <div class="card-body text-center">
    <h5 class="card-title">${product.name}</h5>
    <div>
    <span>${product.description}</span>
</div>
    <div>
        <span>${product.price}</span>
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
                                                <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="prev">
                                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span class="visually-hidden">Anterior</span>
                                                </button>
                                                <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="next">
                                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span class="visually-hidden">Seguinte</span>
                                                </button>
                                            </div>
                                            <p>${product.description}</p>
                                            <div>
                                            <span class="productPrice"> </span>
                                                <span>${product.price}</span>
                                    </div>
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
                        } else {
                            $('.subCategory1').show();
                        }
                      });
                } else {
                    console.error('Erro ao obter produtos por categoria:', response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Erro na solicitação AJAX:', error);
            }
        });
    });
});


/**
     * Função para mostrar os produtos para venda 
     * com base na sub categoria selecionada
     */
$(document).on('click', '.dropdown-item.subcategory-item', function (e) {
    e.preventDefault(); 

    var productSubCategory = $(this).attr('id'); 

    $.ajax({
        type: 'GET',
        url: '/homePageAdmin/getProductsBySubCategory',
        data: { productSubCategory: productSubCategory },
        success: function (response) {
            if (response.success) {
                $('#products-container').empty();

              
                response.products.forEach(function (product) {
                  
                    if (product.hidden === 'No') {
                     
                        var productId = product.name.replace(/\s+/g, '_');

                        var productHtml = `
                            <div class="card card m-1" style="height: 450px; width: 16rem;">
                                <img src="${product.photos[0]}" class="card-img-top mt-4" width="30" height="110" alt="Imagem do Produto" data-bs-toggle="modal" data-bs-target="#productModal${productId}">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${product.name}</h5>
                                    <div>
                                    <span>${product.description}</span>
                                </div>
                                    <div>
                                        <span>${product.price}</span>
                                    </div>
                                </div>
                                <!-- Modal -->
                                <div class="modal fade" id="productModal${productId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-sm">
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
                                                    <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="prev">
                                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Anterior</span>
                                                    </button>
                                                    <button class="carousel-control-next" type="button" data-bs-target="#productCarousel${productId}" data-bs-slide="next">
                                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Seguinte</span>
                                                    </button>
                                                </div>
                                                <p>${product.description}</p>
                                               <div>
                                                    <span>${product.price}</span>
                                            </div>
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

