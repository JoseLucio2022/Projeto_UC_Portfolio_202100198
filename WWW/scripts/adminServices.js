/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 23/05/2024
 */

// Apanha as modal do HTML
const modal = new bootstrap.Modal(document.getElementById('responseModal'));
const modal1 = new bootstrap.Modal(document.getElementById('confirmDropModal'));

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
    document.getElementById('privacyPoliticsLink').innerText = 'Política de privacidade';
    document.getElementById('adminServicesLink').innerText = 'Serviços Admin';
    document.getElementById('accountLink').innerText = 'Conta';
    document.getElementById('categoryLabel').innerText = 'Categoria:';
    document.getElementById('subCategoryLabel').innerText = 'Sub Categoria:';
    document.getElementById('nameLabel').innerText = 'Nome:';
    document.getElementById('addProduct').innerText = 'Adicionar Produto';
    document.getElementById('addProductBtn').innerText = 'Adicionar Produto';
    document.getElementById('descriptionLabel').innerText = 'Descrição:';
    document.getElementById('priceLabel').innerText = 'Preço:';
    document.getElementById('shippingLabel').innerText = 'Custos de envio:';
    document.getElementById('colorsLabel').innerText = 'Cores:';
    document.getElementById('sizeLabel').innerText = 'Tamanhos:';
    document.getElementById('photoLabel').innerText = 'Primeira foto:';
    document.getElementById('photo1Label').innerText = 'Segunda foto:';
    document.getElementById('photo2Label').innerText = 'Terceira foto:';
    document.getElementById('photo3Label').innerText = 'Quarta foto:';
    document.getElementById('photo4Label').innerText = 'Quinta foto:';
    document.getElementById('photo5Label').innerText = 'Sexta foto:';
    document.getElementById('products').innerText = 'Produtos';
    document.getElementById('nameServiceLabel').innerText = 'Nome:';
    document.getElementById('addService').innerText = 'Adicionar Serviço';
    document.getElementById('addServiceBtn').innerText = 'Adicionar Serviço';
    document.getElementById('descriptionServiceLabel').innerText = 'Descrição:';
    document.getElementById('photoServiceLabel').innerText = 'Primeira foto:';
    document.getElementById('photo1ServiceLabel').innerText = 'Segunda foto:';
    document.getElementById('photo2ServiceLabel').innerText = 'Terceira foto:';
    document.getElementById('photo3ServiceLabel').innerText = 'Quarta foto:';
    document.getElementById('photo4ServiceLabel').innerText = 'Quinta foto:';
    document.getElementById('photo5ServiceLabel').innerText = 'Sexta foto:';
    document.getElementById('services').innerText = 'Serviços';
    $('.dropdown-toggle').text('Escolha o queres adicionar ou ver');
    $('#productOption').text('Produtos');
    $('#serviceOption').text('Serviços');
    $('#orderOption').text('Encomendas');
    document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
  } else {
    document.getElementById('homeLink').innerText = 'Home';
    document.getElementById('aboutLink').innerText = 'About';
    document.getElementById('servicesLink').innerText = 'Services';
    document.getElementById('contactLink').innerText = 'Contact';
    document.getElementById('adminServicesLink').innerText = 'Admin Services';
    document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
    document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
    document.getElementById('accountLink').innerText = 'Account';
    document.getElementById('addProduct').innerText = 'Add product';
    document.getElementById('addProductBtn').innerText = 'Add product';
    document.getElementById('categoryLabel').innerText = 'Category:';
    document.getElementById('subCategoryLabel').innerText = 'SubCategory:';
    document.getElementById('nameLabel').innerText = 'Name:';
    document.getElementById('descriptionLabel').innerText = 'Description:';
    document.getElementById('priceLabel').innerText = 'Price:';
    document.getElementById('shippingLabel').innerText = 'Shipping Costs:';
    document.getElementById('colorsLabel').innerText = 'Colors:';
    document.getElementById('sizeLabel').innerText = 'Sizes:';
    document.getElementById('photoLabel').innerText = 'First photo:';
    document.getElementById('photo1Label').innerText = 'Second photo:';
    document.getElementById('photo2Label').innerText = 'Tirdh photo:';
    document.getElementById('photo3Label').innerText = 'Fourt photo:';
    document.getElementById('photo4Label').innerText = 'Fifth photo:';
    document.getElementById('photo5Label').innerText = 'Sixth photo:';
    document.getElementById('products').innerText = 'Products';
    document.getElementById('nameServiceLabel').innerText = 'Name:';
    document.getElementById('addService').innerText = 'Add Service';
    document.getElementById('addServiceBtn').innerText = 'Add Service';
    document.getElementById('descriptionServiceLabel').innerText = 'Description:';
    document.getElementById('photo1ServiceLabel').innerText = 'Second photo:';
    document.getElementById('photo2ServiceLabel').innerText = 'Tirdh photo:';
    document.getElementById('photo3ServiceLabel').innerText = 'Fourth photo:';
    document.getElementById('photo4ServiceLabel').innerText = 'Fifth photo:';
    document.getElementById('photo5ServiceLabel').innerText = 'Sixth photo:';
    document.getElementById('services').innerText = 'Services';
    $('.dropdown-toggle').text('Choose what u want to add or see');
    $('#productOption').text('Products');
    $('#serviceOptin').text('Services');
    $('#orderOptin').text('Orders');
  }
}

/**
 * Inicializa a funcionalidade de envio do formulário de produto.
 * Adiciona um listener de evento para o evento submit do formulário,
 * envia os dados do formulário via AJAX e lida com a resposta.
 */
var init = function () {
  var productForm = document.getElementById('productForm');

 
  if (productForm) {
     /**
     * Listener de evento para o evento submit do formulário de produto.
     * @param {Event} evt - O objeto de evento do submit.
     */
    productForm.addEventListener("submit", async function (evt) {
      evt.preventDefault();

      const formData = new FormData(productForm);

      
      $.ajax({
        type: 'POST',
        url: '/addProduct',
        data: formData,
        processData: false,
        contentType: false, 
        success: function (response) {
          modal.show();
          if (response.success) {
            location.reload();
          } else {
            document.getElementById('responseModalLabel').innerText = 'Erro ao adicionar produto';
          }
        },
        error: function (xhr, status, error) {
          modal.show();
          document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';
        }
      });
    });
  }

  var serviceForm = document.getElementById('serviceForm');

 
  if (serviceForm) {
    /**
      * Adiciona um listener de evento para o evento submit do formulário de serviço,
      * envia os dados do formulário via AJAX e lida com a resposta.
    */
    serviceForm.addEventListener("submit", async function (evt) {
      evt.preventDefault();

      const formData = new FormData(serviceForm);

      
      $.ajax({
        type: 'POST',
        url: '/addService',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
          modal.show();
          if (response.success) {
            location.reload();
          } else {
            modal.show();
            document.getElementById('responseModalLabel').innerText = 'Erro ao adicionar serviço';
          }
        },
        error: function (xhr, status, error) {
          modal.show();
          document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax...';
        }
      });
    });
  }

}

window.onload = init;

/**
 * Listener para o evento de clique no botão de pesquisa de produtos.
 * Envia uma solicitação AJAX para buscar produtos por nome e atualiza o container de produtos com os resultados.
 */
$(document).on('click', '#searchButtonProduct', function () {
  var productName = $('#searchInputProduct').val().trim();

  
  $.ajax({
    type: 'GET',
    url: '/searchProductsByName',
    data: { productName: productName },
    /**
     * Função de callback executada em caso de sucesso na solicitação AJAX.
     * 
     * @param {Object} response - A resposta do servidor.
     * @param {boolean} response.success - Indica se a operação foi bem-sucedida.
     * @param {Array} response.products - Lista de produtos retornados.
     */
    success: function (response) {
      if (response.success) {
    
        $('#products-container').empty();

      
        response.products.forEach(function (product) {
          
          var iconClass = product.hidden === 'No' ? 'fas fa-eye' : 'fas fa-eye-slash';
          var iconColor = product.hidden === 'No' ? 'text-primary' : 'text-danger';
          var productHtml = `
              <div class="container">
                <div class="row align-items-center" id="row1">
                  <div class="col-md-9 mb-1">
                    <div class="row align-items-center">
                      <div class="col-sm-9 mt-2">
                        <span class="fs-5">${product.name}</span>
                      </div>
                      <div class="col-sm-9 mt-2">
                        <span class="fs-5">${product.price}</span>
                      </div>
                      <div class="col-sm-3">
                        <img src="${product.photos}" alt="Imagem do Produto" class="img-fluid">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 mb-1 text-end">
                    <button type="button" class="btn btn-outline-primary hiddenBtn" data-product-name="${product.name}" data-hidden="${product.hidden}">
                      <i class="${iconClass} ${iconColor}"></i>
                    </button>
                  </div>
                  <div class="col-md text-end">
                          <button type="button" class="btn btn-outline-primary" data-product-name="${product.name}" id="removeBtn">
                              <i class="fas fa-trash-alt"></i>
                          </button>
                      </div>
                </div>
              </div>
            `;

          $('#products-container').append(productHtml);
        });
      } else {
          modal.show();
          document.getElementById('responseModalLabel').innerText = 'Erro ao pesquisar produtos';
      }
    },
    error: function (xhr, status, error) {
      modal.show();
          document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax'
    }
  });
});

/**
 * Função que inicializa a obtenção de produtos via AJAX e atualização do container de produtos.
 * É executada quando o documento está pronto.
 */
$(async function () {

  $.ajax({
    type: 'GET',
    url: '/getProducts',
    /**
     * Função de callback executada em caso de sucesso na solicitação AJAX.
     * 
     * @param {Object} response - A resposta do servidor.
     * @param {boolean} response.success - Indica se a operação foi bem-sucedida.
     * @param {Array} response.products - Lista de produtos retornados.
     */
    success: function (response) {
      if (response.success) {
        // Limpa o conteúdo anterior
        $('#products-container').empty();

        // Itera sobre os produtos e cria elementos HTML para cada um
        response.products.forEach(function (product) {
          var iconClass = product.hidden === 'No' ? 'fas fa-eye' : 'fas fa-eye-slash';
          var iconColor = product.hidden === 'No' ? 'text-primary' : 'text-danger';
          var productHtml = `
                  <div class="container">
                  <div class="row align-items-center" id="row1">
                      <div class="col-md-9 mb-1">
                          <div class="row align-items-center">
                              <div class="col-sm-9 mt-2">
                                  <span class="fs-5">${product.name}</span>
                              </div>
                              <div class="col-sm-9 mt-2">
                                   <span class="fs-5">${product.price}</span>
                              </div>
                              <div class="col-sm-3">
                                  <img src="${product.photos[0]}" alt="Imagem do Produto" class="img-fluid">
                              </div>
                          </div>
                      </div>
                      <div class="col-md-3 mb-1 text-end">
                          <button type="button" class="btn btn-outline-primary" data-product-name="${product.name}" data-hidden="${product.hidden}" id="hiddenBtn">
                              <i class="${iconClass} ${iconColor}"></i>
                          </button>
                      </div>
                      <div class="col-md text-end">
                          <button type="button" class="btn btn-outline-primary" data-product-name="${product.name}" id="removeBtn">
                              <i class="fas fa-trash-alt"></i>
                          </button>
                      </div>
                  </div>
              </div>         
                  `;

          // Adiciona o HTML do produto ao contêiner de produtos
          $('#products-container').append(productHtml);
        });
      } else {
          modal.show();
          document.getElementById('responseModalLabel').innerText = 'Erro ao obter produtos';
      }
    },
    error: function (xhr, status, error) {
      modal.show();
      document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';
    }
  });
});

/**
 * Adiciona um listener de evento de clique ao botão com id 'hiddenBtn'.
 * Quando clicado, inverte o estado de visibilidade do produto e atualiza o ícone do botão.
 */
$(document).on('click', '#hiddenBtn', function () {
  
  var $button = $(this);

  // Obtém o nome do produto e o estado de visibilidade dos atributos de dados do botão
  var productName = $button.data('product-name');
  var hiddenStatus = $button.data('hidden');

  // Inverte o estado de visibilidade
  var newHiddenStatus = hiddenStatus === 'No' ? 'Yes' : 'No';

 
  $.ajax({
    type: 'POST',
    url: '/changeProduct',
    data: { productName: productName, hiddenStatus: newHiddenStatus },
    success: function (response) {
        /**
           * Função de callback executada em caso de sucesso na solicitação AJAX.
           * @param {Object} response - A resposta do servidor.
           * @param {boolean} response.success - Indica se a operação foi bem-sucedida.
        */
      if (response.success) {
        // Atualiza o ícone do botão com base no novo estado de visibilidade
        var newIconClass = newHiddenStatus === 'No' ? 'fas fa-eye' : 'fas fa-eye-slash';
        var newIconColor = newHiddenStatus === 'No' ? 'text-primary' : 'text-danger';
        $button.find('i').removeClass().addClass(newIconClass + ' ' + newIconColor);

        // Atualiza o atributo de dados 'hidden-service' do botão
        $button.data('hidden', newHiddenStatus);
      } else {
        modal.show();
        document.getElementById('responseModalLabel').innerText = 'Erro ao alterar visibilidade do produto';
      }
    },
    error: function (xhr, status, error) {
      modal.show();
      document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';
 
    }
  });
});

/**
 * Adiciona um manipulador de eventos para o clique no botão com o ID "removeBtn".
 * Obtém o nome do produto a ser removido a partir do atributo de dados do botão e
 * faz uma solicitação AJAX para remover o produto. Atualiza a página em caso de sucesso
 * ou mostra um modal com uma mensagem de erro em caso de falha.
 */
$(document).on('click', '#removeBtn', function () {
  // Obtém o nome do produto e o estado de visibilidade dos atributos de dados do botão
  var productName = $(this).data('product-name');

 
  $.ajax({
    type: 'POST',
    url: '/removeProduct',
    data: { productName: productName },
    success: function (response) {
      if (response.success) {
        location.reload();
      } else {
        modal.show();
        document.getElementById('responseModalLabel').innerText = 'Erro ao eliminar produto';
   
      }
    },
    error: function (xhr, status, error) {
      modal.show();
      document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';
 
    }
  });
});

/**
 * Função que é executada quando o DOM está completamente carregado.
 * Adiciona um manipulador de eventos para os itens do menu dropdown para alternar
 * a visibilidade de diferentes seções da página com base na opção selecionada.
 */
$(function () {
 
  $(document).on('click', '.dropdown-item', function (e) {
    e.preventDefault(); 

    var choosed = $(this).attr('id'); 

    if (choosed === 'serviceOption') {
      
      $('#addService').show();
      $('#serviceForm').show();
      $('#services-container').show();
      $('#services').show();
      $('.service').show();
      $('#searchInputService').show();
      $('#searchButtonService').show();

      
      $('#addProduct').hide();
      $('#productForm').hide();
      $('#products-container').hide();
      $('#products').hide();
      $('.product').hide();
      $('#searchInputProduct').hide();
      $('#searchButtonProduct').hide();

      $('#orders-container').hide();
      $('#orders').hide();
      $('#searchInputOrder').hide();
      $('#searchButtonOrder').hide();
      $('.status').hide();
      $('.underline-button').hide();
      $('.underline-button1').hide();
    } else if (choosed === 'productOption') {
      
      $('#addService').hide();
      $('#serviceForm').hide();
      $('#services-container').hide();
      $('#services').hide();
      $('.service').hide();
      $('#searchInputService').hide();
      $('#searchButtonService').hide();

      $('#orders-container').hide();
      $('#orders').hide();
      $('#searchInputOrder').hide();
      $('#searchButtonOrder').hide();
      $('.status').hide();
      $('.underline-button').hide();
      $('.underline-button1').hide();

      $('#addProduct').show();
      $('#productForm').show();
      $('#products-container').show();
      $('#products').show();
      $('.product').show();
      $('#searchInputProduct').show();
      $('#searchButtonProduct').show();
    } else if (choosed === 'orderOption') {
      $('#addProduct').hide();
      $('#productForm').hide();
      $('#products-container').hide();
      $('#products').hide();
      $('.product').hide();
      $('#searchInputProduct').hide();
      $('#searchButtonProduct').hide();

      $('#addService').hide();
      $('#serviceForm').hide();
      $('#services-container').hide();
      $('#services').hide();
      $('.service').hide();
      $('#searchInputService').hide();
      $('#searchButtonService').hide();

      $('#orders').show();
      $('#orders-container').show();
      $('#searchInputOrder').show();
      $('#searchButtonOrder').show();
      $('.status').show();
      $('.underline-button').show();
      $('.underline-button1').show();
    }

  });
});
/**
 * Função assíncrona que é executada quando o DOM está completamente carregado.
 * Faz uma solicitação AJAX para obter os serviços e atualiza o conteúdo da página com os serviços recebidos.
 */
$(async function () {
 
  $.ajax({
    type: 'GET',
    url: '/getServices',
    success: function (response) {
      if (response.success) {
      
        $('#services-container').empty();

        
        response.services.forEach(function (service) {
          var iconClass = service.hidden === 'No' ? 'fas fa-eye' : 'fas fa-eye-slash';
          var iconColor = service.hidden === 'No' ? 'text-primary' : 'text-danger';
          var serviceHtml = `
                  <div class="container">
                  <div class="row align-items-center" id="row1">
                      <div class="col-md-9 mb-1">
                          <div class="row align-items-center">
                              <div class="col-sm-9 mt-2">
                                  <span class="fs-5">${service.name}</span>
                              </div>
                              <div class="col-sm-9 mt-2">
                                  <span class="fs-5">${service.description}</span>
                              </div>
                              <div class="col-sm-3">
                                  <img src="${service.photos[0]}" alt="Imagem do Serviço" class="img-fluid">
                              </div>
                          </div>
                      </div>
                      <div class="col-md-3 mb-1 text-end">
                          <button type="button" class="btn btn-outline-primary" id="hiddenServiceBtn" data-service-name="${service.name}" data-hidden-service="${service.hidden}">
                              <i class="${iconClass} ${iconColor}"></i>
                          </button>
                      </div>
                      <div class="col-md text-end">
                          <button type="button" class="btn btn-outline-primary" data-service-name="${service.name}" id="removeServiceBtn">
                              <i class="fas fa-trash-alt"></i>
                          </button>
                      </div>
                  </div>
              </div>
                       
                  `;

          $('#services-container').append(serviceHtml);
        });
      } else {
        modal.show();
        document.getElementById('responseModalLabel').innerText = 'Erro ao obter serviços';
      }
    },
    error: function (xhr, status, error) {
      modal.show();
      document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';
 
    }
  });
});

/**
 * Adiciona um manipulador de eventos para o clique no botão com o ID "removeServiceBtn".
 * Obtém o nome do serviço a ser removido a partir do atributo de dados do botão e
 * faz uma solicitação AJAX para remover o serviço. Atualiza a página em caso de sucesso
 * ou mostra um modal com uma mensagem de erro em caso de falha.
 */
$(document).on('click', '#removeServiceBtn', function () {
  // Obtém o nome do produto e o estado de visibilidade dos atributos de dados do botão
  var serviceName = $(this).data('service-name');

  $.ajax({
    type: 'POST',
    url: '/removeService', 
    data: { serviceName: serviceName },
    success: function (response) {
      if (response.success) {
        location.reload();
      } else {
        modal.show();
        document.getElementById('responseModalLabel').innerText = 'Erro ao eliminar serviço';
      }
    },
    error: function (xhr, status, error) {
      modal.show();
      document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';
    }
  });
});

/**
 * Adiciona um manipulador de eventos para o clique no botão com o ID "hiddenServiceBtn".
 * Obtém o nome do serviço e o estado de visibilidade a partir dos atributos de dados do botão.
 * Inverte o estado de visibilidade do serviço e faz uma solicitação AJAX para atualizar o estado no servidor.
 * Atualiza o ícone do botão e o atributo de dados 'hidden-service' com base no novo estado de visibilidade.
 */
$(document).on('click', '#hiddenServiceBtn', function () {
  var $this = $(this); 

  // Obtém o nome do serviço e o estado de visibilidade dos atributos de dados do botão
  var serviceName = $this.data('service-name');
  var hiddenStatus = $this.data('hidden-service');

  // Inverte o estado de visibilidade
  var newHiddenStatus = hiddenStatus === 'No' ? 'Yes' : 'No';

  
  $.ajax({
    type: 'POST',
    url: '/changeService', 
    data: { serviceName: serviceName, hiddenStatus: newHiddenStatus },
    success: function (response) {
      if (response.success) {
        // Atualiza o ícone do botão com base no novo estado de visibilidade
        var newIconClass = newHiddenStatus === 'No' ? 'fas fa-eye' : 'fas fa-eye-slash';
        var newIconColor = newHiddenStatus === 'No' ? 'text-primary' : 'text-danger';
        $this.find('i').removeClass().addClass(newIconClass + ' ' + newIconColor);

        // Atualiza o atributo de dados 'hidden-service' do botão
        $this.data('hidden-service', newHiddenStatus);
      } else {
        modal.show();
        document.getElementById('responseModalLabel').innerText = 'Erro ao alterar visibilidade do serviço';
      }
    },
    error: function (xhr, status, error) {
      modal.show();
      document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';
    }
  });
});

/**
 * Faz uma solicitação AJAX para obter as ordens de serviço dos administradores e atualiza o conteúdo da página com as ordens recebidas.
 */
$.ajax({
  type: 'GET',
  url: '/adminServices/getOrders',
  success: function (response) {
    if (response.success) {
    
      var ordersContainer = $('#orders-container');
      ordersContainer.empty();

      
      response.orders.forEach(function (order) {
        const orderId = order.orderId;
        var orderHtml = `
          <div class="container">
            <div class="row align-items-center" id="row1">
              <div class="col-md-9 mb-1">
                <div class=" row align-items-center">
                  <div class="col-sm-9 mt-5">
                  <div class="dropdown changeStatus">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Alterar estado da encomenda(${order.status})
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" data-order-id="${orderId}" id="firstOption">Por enviar</a></li>
                    <li><a class="dropdown-item" data-order-id="${orderId}" id="secondOption">Pronta para enviar</a></li>
                    <li><a class="dropdown-item" data-order-id="${orderId}" id="thirdOption">Em circulação</a></li>
                    <li><a class="dropdown-item" data-order-id="${orderId}" id="fourthOption">Finalizada</a></li>
                    <li><a class="dropdown-item" data-order-id="${orderId}" id="fifthOption">Cancelada</a></li>
                  </ul>
                </div>
                    <span class="fs-7 orderId">Order Id: </span><span class="fs-7">${order.orderId}</span><br>
                    <span class="fs-7 createdAt">Criada a: </span><span class="fs-7">${new Date(order.createdAt.seconds * 1000).toLocaleString()}</span><br>
                    <span class="fs-7 status">Status: </span><span class="fs-7">${order.status}</span><br>
                    <span class="fs-7 address">Endereço: </span><span class="fs-7">${order.address}</span><br>
                    <span class="fs-7 address1">Endereço 1: </span><span class="fs-7">${order.address1}</span><br>
                    <span class="fs-7 city">Cidade: </span><span class="fs-7">${order.city}</span><br>
                    <span class="fs-7 country">País: </span><span class="fs-7">${order.country}</span><br>
                    <span class="fs-7 phoneNumber">Número de telemóvel: </span><span class="fs-7">${order.phoneNumber}</span><br>
                    <span class="fs-7 postalCode">Código Postal: </span><span class="fs-7">${order.postalCode}</span><br>
                    <span class="fs-7">Total: </span><span class="fs-7">${order.totalAmount}</span><br>
                    <span class="fs-7 region">Distrito/Região: </span><span class="fs-7">${order.region}</span><br>
                    <span class="fs-7 products">Produtos:</span><br>
                    <ul>`;

        
        order.products.forEach(function (product) {
          orderHtml += `
            <li>
              <span class="fs-7 name">Nome: </span><span class="fs-7">${product.name}</span>, 
              <span class="fs-7 price">Preço: </span><span class="fs-7">${product.price}</span>, 
              <span class="fs-7 size">Tamanho: </span><span class="fs-7">${product.size}</span>, 
              <span class="fs-7 category">Categoria: </span><span class="fs-7">${product.category}</span>, 
              <span class="fs-7 color">Cor: </span><span class="fs-7">${product.colors}</span>
              <img src="${product.photos[0]}" width="150" height="90" alt="Imagem do Produto" class="order-product-image">
            </li>`;
        });

      
        ordersContainer.append(orderHtml);
      });
    }
  },
  error: function (xhr, status, error) {
    modal.show();
    document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';
  }
});

/**
 * Adiciona um manipulador de eventos para o clique no botão de pesquisa de serviços.
 * Obtém o nome do serviço a ser pesquisado a partir do campo de entrada e faz uma solicitação AJAX para pesquisar serviços com base no nome fornecido.
 * Atualiza o conteúdo da página com os serviços encontrados ou exibe um modal com uma mensagem de erro em caso de falha.
 */
$(document).on('click', '#searchButtonService', function () {
  var serviceName = $('#searchInputService').val().trim();

 $.ajax({
    type: 'GET',
    url: '/searchServicesByName',
    data: { serviceName: serviceName },
    success: function (response) {
      if (response.success) {
        
        $('#services-container').empty();

        
        response.services.forEach(function (service) {
          
          var iconClass = service.hidden === 'No' ? 'fas fa-eye' : 'fas fa-eye-slash';
          var iconColor = service.hidden === 'No' ? 'text-primary' : 'text-danger';
          var serviceHtml = `
              <div class="container">
                <div class="row align-items-center" id="row1">
                  <div class="col-md-9 mb-1">
                    <div class="row align-items-center">
                      <div class="col-sm-9 mt-2">
                        <span class="fs-5">${service.name}</span>
                      </div>
                      <div class="col-sm-9 mt-2">
                        <span class="fs-5">${service.description}</span>
                      </div>
                      <div class="col-sm-3">
                        <img src="${service.photos}" alt="Imagem do Serviço" class="img-fluid">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 mb-1 text-end">
                    <button type="button" class="btn btn-outline-primary hiddenServiceBtn" data-service-name="${service.name}" data-hidden-service="${service.hidden}">
                      <i class="${iconClass} ${iconColor}"></i>
                    </button>
                    <div class="col-md mt-3 text-end">
                          <button type="button" class="btn btn-outline-primary" data-service-name="${service.name} id="removeServiceBtn">
                              <i class="fas fa-trash-alt"></i>
                          </button>
                      </div>
                  </div>
                </div>
              </div>
            `;

          
          $('#services-container').append(serviceHtml);
        });
      } else {
        modal.show();
      document.getElementById('responseModalLabel').innerText = 'Erro ao pesquisar serviços';
      }
    },
    error: function (xhr, status, error) {
      modal.show();
      document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';
    }
  });
});

/**
 * Adiciona um manipulador de eventos para o clique no botão de pesquisa de encomendas.
 * Obtém o ID do utilizador a ser pesquisado a partir do campo de entrada e faz uma solicitação AJAX para pesquisar pedidos associados a esse utilizador.
 * Atualiza o conteúdo da página com os pedidos encontrados ou exibe um modal com uma mensagem de erro em caso de falha.
 */
$(document).on('click', '#searchButtonOrder', function () {
  var userId = $('#searchInputOrder').val().trim();

  $.ajax({
    type: 'GET',
    url: '/searchByUserId',
    data:{userId:userId},
    success: function (response) {
      if (response.success) {
        var ordersContainer = $('#orders-container');
        ordersContainer.empty();

        response.orders.forEach(function (order) {
          const orderId = order.orderId;
          var orderHtml = `
            <div class="container">
              <div class="row align-items-center" id="row1">
                <div class="col-md-9 mb-1">
                  <div class="row align-items-center">
                    <div class="col-sm-9 mt-5">
                    <div class="dropdown changeStatus">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      Alterar estado da encomenda(${order.status})
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" data-order-id="${orderId}" id="firstOption">Por enviar</a></li>
                      <li><a class="dropdown-item" data-order-id="${orderId}" id="secondOption">Pronta para enviar</a></li>
                      <li><a class="dropdown-item" data-order-id="${orderId}" id="thirdOption">Em circulação</a></li>
                      <li><a class="dropdown-item" data-order-id="${orderId}" id="fourthOption">Finalizada</a></li>
                      <li><a class="dropdown-item" data-order-id="${orderId}" id="fifthOption">Cancelada</a></li>
                    </ul>
                  </div>
                      <span class="fs-7 orderId">Order Id: </span><span class="fs-7">${order.orderId}</span><br>
                      <span class="fs-7 status">Status: </span><span class="fs-7">${order.status}</span><br>
                      <span class="fs-7 createdAt">Criada a: </span><span class="fs-7">${new Date(order.createdAt.seconds * 1000).toLocaleString()}</span><br>
                      <span class="fs-7 address">Endereço: </span><span class="fs-7">${order.address}</span><br>
                      <span class="fs-7 address1">Endereço 1: </span><span class="fs-7">${order.address1}</span><br>
                      <span class="fs-7 city">Cidade: </span><span class="fs-7">${order.city}</span><br>
                      <span class="fs-7 country">País: </span><span class="fs-7">${order.country}</span><br>
                      <span class="fs-7 phoneNumber">Número de telemóvel: </span><span class="fs-7">${order.phoneNumber}</span><br>
                      <span class="fs-7 postalCode">Código Postal: </span><span class="fs-7">${order.postalCode}</span><br>
                      <span class="fs-7">Total: </span><span class="fs-7">${order.totalAmount}</span><br>
                      <span class="fs-7 region">Distrito/Região: </span><span class="fs-7">${order.region}</span><br>
                      <span class="fs-7 products">Produtos:</span><br>
                      <ul>`;

          order.products.forEach(function (product) {
            orderHtml += `
              <li>
                <span class="fs-7 name">Nome: </span><span class="fs-7">${product.name}</span>, 
                <span class="fs-7 price">Preço: </span><span class="fs-7">${product.price}</span>, 
                <span class="fs-7 size">Tamanho: </span><span class="fs-7">${product.size}</span>, 
                <span class="fs-7 category">Categoria: </span><span class="fs-7">${product.category}</span>, 
                <span class="fs-7 color">Cor: </span><span class="fs-7">${product.colors}</span>
                <img src="${product.photos[0]}" width="150" height="90" alt="Imagem do Produto" class="order-product-image">
              </li>`;
          });

          ordersContainer.append(orderHtml);
        });
      }
    },
    error: function (xhr, status, error) {
      modal.show();
      document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';
    }
  });
});

/**
 * Adiciona um manipulador de eventos para o clique nos itens do menu suspenso de alteração de status de uma encomenda.
 * Obtém o novo status da encomenda a partir do texto do item do menu suspenso e o ID da encomenda a partir do atributo de dados do item do menu suspenso.
 * Faz uma solicitação AJAX para atualizar o status da encomenda com o novo status fornecido.
 * Recarrega a página após uma atualização bem-sucedida ou exibe um modal com uma mensagem de erro em caso de falha.
 */
$(function () {
  
  $(document).on('click', '.changeStatus .dropdown-item', function (e) {
      e.preventDefault(); 

      var newStatus = $(this).text(); // Obtém o novo status do texto do item do menu suspenso
      var orderId = $(this).data('order-id'); // Obtém o ID da ordem do atributo de dados do item do menu suspenso


      $.ajax({
          type: 'POST', 
          url: '/updateOrderStatus', 
          data: { orderId: orderId, status: newStatus }, 
          success: function (response) {
              if (response.success) {
                  location.reload();
              } else {
                modal.show();
                document.getElementById('responseModalLabel').innerText = 'Erro ao modificar status da encomenda';
            }
          },
          error: function (xhr, status, error) {
            modal.show();
            document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';      
          }
      });
  });
});


/**
 * Adiciona um manipulador de eventos para clicar nos itens do menu suspenso de status de uma encomenda.
 * Obtém o status da encomenda a partir do texto do item clicado.
 * Faz uma solicitação AJAX para buscar as encomendas pelo status selecionado.
 * Atualiza o conteúdo do container de encomendas com as encomendas encontradas.
 * Se a procura for bem-sucedida, exibe as informações das encomendas no container de encomendas.
 * Se ocorrer um erro durante o processo, exibe um modal com uma mensagem de erro.
 */

$(function () {
  
  $('.status').on('click', '.dropdown-item', function (e) {
      e.preventDefault(); 

      var status = $(this).text();

      $.ajax({
          type: 'GET',
          url: '/searchOrdersByStatus',
          data: { status: status },
          success: function(response) {
              if (response.success) {
                  
                  $('#orders-container').empty();

                
                  response.orders.forEach(function(order) {
                      
                      const orderId = order.orderId;
                      var orderHtml = `
                          <div class="container">
                              <div class="row align-items-center" id="row1">
                                  <div class="col-md-9 mb-1">
                                      <div class=" row align-items-center">
                                      <div class="col-sm-9 mt-5">
                                      <div class="dropdown changeStatus">
                                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Alterar estado da encomenda(${order.status})
                                      </button>
                                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><a class="dropdown-item" data-order-id="${orderId}" id="firstOption">Por enviar</a></li>
                                        <li><a class="dropdown-item" data-order-id="${orderId}" id="secondOption">Pronta para enviar</a></li>
                                        <li><a class="dropdown-item" data-order-id="${orderId}" id="thirdOption">Em circulação</a></li>
                                        <li><a class="dropdown-item" data-order-id="${orderId}" id="fourthOption">Finalizada</a></li>
                                        <li><a class="dropdown-item" data-order-id="${orderId}" id="fifthOption">Cancelada</a></li>
                                      </ul>
                                    </div>
                                          <span class="fs-7 orderId">Order Id: </span><span class="fs-7">${order.orderId}</span><br>
                                              <span class="fs-7 status1">Status: </span><span class="fs-7">${order.status}</span><br>
                                              <span class="fs-7 createdAt">Criada a: </span><span class="fs-7">${new Date(order.createdAt.seconds * 1000).toLocaleString()}</span><br>
                                              <span class="fs-7 address">Endereço: </span><span class="fs-7">${order.address}</span><br>
                                              <span class="fs-7 address1">Endereço 1: </span><span class="fs-7">${order.address1}</span><br>
                                              <span class="fs-7 city">Cidade: </span><span class="fs-7">${order.city}</span><br>
                                              <span class="fs-7 country">País: </span><span class="fs-7">${order.country}</span><br>
                                              <span class="fs-7 phoneNumber">Número de telemóvel: </span><span class="fs-7">${order.phoneNumber}</span><br>
                                              <span class="fs-7 postalCode">Código Postal: </span><span class="fs-7">${order.postalCode}</span><br>
                                              <span class="fs-7">Total: </span><span class="fs-7">${order.totalAmount}</span><br>
                                              <span class="fs-7 region">Distrito/Região: </span><span class="fs-7">${order.region}</span><br>
                                              <span class="fs-7 products">Produtos:</span><br>
                                              <ul>`;

                      
                      order.products.forEach(function (product) {
                          orderHtml += `
                              <li>
                                  <span class="fs-7 name">Nome: </span><span class="fs-7">${product.name}</span>, 
                                  <span class="fs-7 price">Preço: </span><span class="fs-7">${product.price}</span>, 
                                  <span class="fs-7 size">Tamanho: </span><span class="fs-7">${product.size}</span>, 
                                  <span class="fs-7 category">Categoria: </span><span class="fs-7">${product.category}</span>, 
                                  <span class="fs-7 color">Cor: </span><span class="fs-7">${product.colors}</span>
                                  <img src="${product.photos[0]}" width="150" height="90" alt="Imagem do Produto" class="order-product-image">
                              </li>`;
                      });

                      orderHtml += `</ul></div></div></div></div></div>`;

                      $('#orders-container').append(orderHtml);
                  });
              } else {
                modal.show();
                document.getElementById('responseModalLabel').innerText = 'Erro ao procurar encomendas';
              }
          },
          error: function(xhr, status, error) {
            modal.show();
            document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';      
          }
      });
  });
});

// Adiciona ouvinte ao botão de logout ao lado do menu 
var logoutButton = document.querySelector('.logout-button');

/**
 * Adiciona um evento de clique ao botão de logout.
 * Ao clicar no botão, é feita uma solicitação para efetuar o logout do usuário.
 * Se a solicitação for bem-sucedida, redireciona o usuário para a página inicial.
 * Se ocorrer algum erro durante o processo, exibe uma mensagem de erro no console.
 */
if (logoutButton) {
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        
        fetch('/adminServices/logout', {
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

//Apanha o botão de ver as encomendas com mais de 45 dias
var underlineButton = document.querySelector('.underline-button');

/**
 * Adiciona um evento de clique ao botão de sublinhado.
 * Ao clicar no botão, faz uma solicitação para procurar encomendas com mais de 45 dias.
 * Se a solicitação for bem-sucedida, os pedidos são exibidos no container de pedidos.
 * Se ocorrer algum erro durante o processo, exibe uma mensagem de erro no modal.
 */
if (underlineButton) {
    underlineButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        
        $.ajax({
            type: 'GET',
            url: '/showOrdersWithMoreThan45Days',
            success: function(response) {
                if (response.success) {
                    
                    $('#orders-container').empty();

                  
                    response.orders.forEach(function(order) {
                        
                        const orderId = order.orderId;
                        var orderHtml = `
                            <div class="container">
                                <div class="row align-items-center" id="row1">
                                    <div class="col-md-9 mb-1">
                                        <div class=" row align-items-center">
                                            <div class="col-sm-9 mt-5">
                                                <div class="dropdown changeStatus">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Alterar estado da encomenda(${order.status})
                                                    </button>
                                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a class="dropdown-item" data-order-id="${orderId}" id="firstOption">Por enviar</a></li>
                                                        <li><a class="dropdown-item" data-order-id="${orderId}" id="secondOption">Pronta para enviar</a></li>
                                                        <li><a class="dropdown-item" data-order-id="${orderId}" id="thirdOption">Em circulação</a></li>
                                                        <li><a class="dropdown-item" data-order-id="${orderId}" id="fourthOption">Finalizada</a></li>
                                                        <li><a class="dropdown-item" data-order-id="${orderId}" id="fifthOption">Cancelada</a></li>
                                                    </ul>
                                                </div>
                                                <span class="fs-7 orderId">Order Id: </span><span class="fs-7">${order.orderId}</span><br>
                                                <span class="fs-7 status1">Status: </span><span class="fs-7">${order.status}</span><br>
                                                <span class="fs-7 createdAt">Criada a: </span><span class="fs-7">${new Date(order.createdAt.seconds * 1000).toLocaleString()}</span><br>
                                                <span class="fs-7 address">Endereço: </span><span class="fs-7">${order.address}</span><br>
                                                <span class="fs-7 address1">Endereço 1: </span><span class="fs-7">${order.address1}</span><br>
                                                <span class="fs-7 city">Cidade: </span><span class="fs-7">${order.city}</span><br>
                                                <span class="fs-7 country">País: </span><span class="fs-7">${order.country}</span><br>
                                                <span class="fs-7 phoneNumber">Número de telemóvel: </span><span class="fs-7">${order.phoneNumber}</span><br>
                                                <span class="fs-7 postalCode">Código Postal: </span><span class="fs-7">${order.postalCode}</span><br>
                                                <span class="fs-7">Total: </span><span class="fs-7">${order.totalAmount}</span><br>
                                                <span class="fs-7 region">Distrito/Região: </span><span class="fs-7">${order.region}</span><br>
                                                <span class="fs-7 products">Produtos:</span><br>
                                                <ul>`;

                        
                        order.products.forEach(function (product) {
                            orderHtml += `
                                <li>
                                    <span class="fs-7 name">Nome: </span><span class="fs-7">${product.name}</span>, 
                                    <span class="fs-7 price">Preço: </span><span class="fs-7">${product.price}</span>, 
                                    <span class="fs-7 size">Tamanho: </span><span class="fs-7">${product.size}</span>, 
                                    <span class="fs-7 category">Categoria: </span><span class="fs-7">${product.category}</span>, 
                                    <span class="fs-7 color">Cor: </span><span class="fs-7">${product.colors}</span>
                                    <img src="${product.photos[0]}" width="150" height="90" alt="Imagem do Produto" class="order-product-image">
                                </li>`;
                        });

                        orderHtml += `</ul></div></div></div></div></div>`;

                        $('#orders-container').append(orderHtml);
                    });
                } else {
                    modal.show();
                    document.getElementById('responseModalLabel').innerText = 'Erro ao procurar encomendas com mais de 45 dias';
                }
            },
            error: function(xhr, status, error) {
                modal.show();
                document.getElementById('responseModalLabel').innerText = 'Erro na solicitação ajax';      
            }
        });
    });
}

// Apanha o botão de eliminar as encomendas com mais de 45 dias
var underlineButton1 = document.querySelector('.underline-button1');

/**
 * Adiciona um evento de clique ao botão de sublinhado 1.
 * Ao clicar no botão, exibe um modal de confirmação para eliminar encomendas com mais de 45 dias.
 * Se o admin confirmar a exclusão, faz uma solicitação para eliminar as encomendas.
 * Se a solicitação for bem-sucedida, atualiza a página após um curto intervalo.
 * Se ocorrer algum erro durante o processo, exibe uma mensagem de erro no modal principal.
 */
if (underlineButton1) {
    underlineButton1.addEventListener('click', function (event) {
        event.preventDefault(); 
        
      
        modal1.show();


        $('#confirmDeleteButton').on('click', function() {
            
            $.ajax({
                type: 'POST',
                url: '/dropOrdersWithMoreThan45Days',
                success: function(response) {
                    if (response.success) {
                        modal1.hide();
                        modal.show();
                        document.getElementById('responseModalLabel').innerText = 'Encomendas com mais de 45 dias eliminadas';
                        setTimeout(function() {
                            location.reload();
                        }, 1500); 
                    } else {
                       modal1.hide();
                        modal.show();
                        document.getElementById('responseModalLabel').innerText = 'Erro ao eliminar encomendas com mais de 45 dias';
                    }
                },
                error: function(xhr, status, error) {
                    modal1.hide();
                    modal.show();
                    document.getElementById('responseModalLabel').innerText = 'Erro ao eliminar encomendas com mais de 45 dias';      
                }
            });
        });

       
        $('#cancelDeleteButton').on('click', function() {
            
            modal1.hide();
        });
    });
}
