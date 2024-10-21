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
        document.getElementById('homeLink2').innerText = 'Início';
        document.getElementById('aboutLink').innerText = 'Sobre nós';
        document.getElementById('servicesLink').innerText = 'Serviços';
        document.getElementById('contactLink').innerText = 'Contacto';
        document.getElementById('aboutLink1').innerText = 'Sobre nós';
        document.getElementById('servicesLink1').innerText = 'Serviços';
        document.getElementById('contactLink1').innerText = 'Contacto';
        document.getElementById('accountLink').innerText = 'Conta';
        document.getElementById('privacyPoliticsLink').innerText = 'Política de privacidade';
        document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
        document.getElementById('adminServicesLink').innerText = 'Serviços Admin';
        $(".privacyPolicy1").text('Política de Privacidade');
        document.getElementById('lastUpdate').innerText = 'Última atualização: 06 de Junho de 2024';
        document.getElementById('indice').innerText = 'Índice';
        document.getElementById('infoRecovText').innerText = '- Que informações recolhemos?';
        document.getElementById('useInfoText').innerText = '- Como e por que motivo utilizamos as suas informações';
        document.getElementById('shareInfoText').innerText = ' - Como e por que motivo partilhamos as suas informações';
        document.getElementById('rightsOptionsText').innerText = '- Os seus direitos e opções';
        document.getElementById('globalTransferText').innerText = '- As nossas Operações globais e Transferências de dados';
        document.getElementById('dataProtectionText').innerText = '- Regulamento Geral sobre a Proteção de Dados da União Europeia e leis de proteção de dados de Portugal – base jurídica';
        document.getElementById('kidsText').innerText = '- Crianças';
        document.getElementById('securityText').innerText = '- Segurança e retenção de dados';
        document.getElementById('policyChangeText').innerText = '- Alterações à Política de privacidade';
        document.getElementById('contactUs1Text').innerText = '- Contacte-nos';
        document.getElementById('infoRecov').innerText = '- Que informações recolhemos?';
        document.getElementById('useInfo').innerText = '- Como e por que motivo utilizamos as suas informações';
        document.getElementById('shareInfo').innerText = ' - Como e por que motivo partilhamos as suas informações';
        document.getElementById('rightsOptions').innerText = '- Os seus direitos e opções';
        document.getElementById('globalTransfer').innerText = '- As nossas Operações globais e Transferências de dados';
        document.getElementById('dataProtection').innerText = '- Regulamento Geral sobre a Proteção de Dados da União Europeia e leis de proteção de dados de Portugal – base jurídica';
        document.getElementById('kids').innerText = '- Crianças';
        document.getElementById('security').innerText = '- Segurança e retenção de dados';
        document.getElementById('policyChange').innerText = '- Alterações à Política de privacidade';
        document.getElementById('contactUs1').innerText = '- Contacte-nos';
        document.getElementById('infoText').innerText = 'No decurso do fornecimento e melhoria dos nossos produtos e serviços, recolhemos as suas informações pessoais para os fins descritos na presente Política de Privacidade. Seguem-se os tipos de informações pessoais que recolhemos:';
        document.getElementById('infoOfUser').innerText = 'Informações que o Utilizador fornece';
        document.getElementById('createAccount').innerText = 'Quando criar uma conta, efetuar uma encomenda ao finalizar a compra, contactar-nos diretamente ou utilizar o Serviço, poderá fornecer algumas ou todas as seguintes informações:';
        document.getElementById('perfilAndAccount').innerText = 'Conta e Perfil.';
        document.getElementById('perfilAndAccountText').innerText = ' Para criar e gerir a sua conta Lalala Utilities, poderemos recolher o seu número de telemóvel ou endereço de e-mail como as credenciais de início de sessão para a sua conta.';
        document.getElementById('shopping').innerText = 'Compras.';
        document.getElementById('shoppingText').innerText = 'Para concluir transações e processar encomendas, recolhemos dados relacionados com a sua encomenda no Serviço, informações de pagamento necessárias para concluir a transação (por exemplo, número de cartão de pagamento ou outras informações de pagamento de terceiros necessárias para o pagamento), a sua morada de envio (por exemplo, cidade, estado, país de residência, código postal) e informações de contacto do destinatário (por exemplo, nome, número de telemóvel). Também recolhemos a sua região com base no país.';
        document.getElementById('customerService').innerText = 'Atividade de atendimento ao cliente.';
        document.getElementById('customerServiceText').innerText = ' Quando comunicar com a nossa equipa de serviço de atendimento ao cliente através de funções de atendimento ao cliente, redes sociais ou qualquer outro meio, iremos recolher o seu histórico de comunicações connosco num esforço contínuo para melhorar o serviço e o atendimento ao cliente.';
        document.getElementById('contentCustomer').innerText = 'Conteúdo gerado pelo Utilizador.';
        document.getElementById('contentCustomerText').innerText = ' Como comentários, perguntas, mensagens e outros conteúdos ou informações gerados, transmitidos ou disponibilizados de outra forma no Serviço, bem como metadados associados.';
        document.getElementById('eventParticipation').innerText = 'Promoção e participação no evento.';
        document.getElementById('eventParticipationText').innerText = ' Recolhemos informações que partilha ativamente quando participa num concurso, promoção ou inquérito, tais como informações de contacto fornecidas quando participa num sorteio, concurso ou oferta através do Serviço. Fazemos isso para notificá-lo de uma vitória, para verificar a sua identidade e/ou para enviar-lhe um prémio. Em alguns casos, poderemos necessitar de informações adicionais como parte do processo de participação, como a seleção do prémio pretendido. Tais sorteios e concursos são voluntários. Recomendamos que leia as regras e outras informações relevantes para cada sorteio e concurso em que participar. Além disso, recolhemos informações sobre as suas preferências para receber comunicações de marketing da nossa parte, bem como sobre as suas interações com elas.';
        document.getElementById('otherData').innerText = 'Outros dados não listados explicitamente aqui.';
        document.getElementById('otherDataText').innerText = ' Utilizaremos outros dados que forneça conforme descrito na presente Política de privacidade ou para qualquer outro fim que lhe seja divulgado no momento em que recolhemos as suas informações.';
        document.getElementById('infoOfThirds').innerText = 'Informação de fontes de terceiros';
        document.getElementById('thirdsText').innerText = 'Poderemos recolher informações pessoais de outras fontes de terceiros, tais como:';
        document.getElementById('affiliatePartners').innerText = 'Os nossos parceiros afiliados.';
        document.getElementById('affiliatePartnersText').innerText = ' Como o nosso fornecedor de rede de afiliados e editores, influenciadores e promotores que participam nos nossos programas de afiliados pagos.';
        document.getElementById('dataProveider').innerText = 'Fornecedores de dados.';
        document.getElementById('dataProveiderText').innerText = ' Tais como os serviços de informação e os licenciadores de dados que fornecem informações demográficas e outras informações, que, entre outras finalidades, nos ajudam a detetar fraudes.';
        document.getElementById('publicAutority').innerText = 'Autoridades públicas no EEE, no Reino Unido e na Suíça, fontes públicas e titulares de direitos.';
        document.getElementById('publicAutorityText').innerText = ' Podemos obter informações de fontes de terceiros, por exemplo, conforme necessário para cumprir as nossas obrigações, prevenir, investigar ou detetar uma alegada reivindicação ou crime, ou para que uma parte exerça os seus direitos legais.';
        document.getElementById('thirdsService').innerText = 'Outros serviços de terceiros:';
        document.getElementById('thirdsServiceText').innerText = ' Poderemos obter as suas informações a partir de outros serviços de terceiros, tais como:';
        document.getElementById('socialMedia').innerText = 'Serviços de redes sociais - a partir dos quais poderemos recolher informações como o seu nome de utilizador, imagem de perfil e endereço de e-mail associados ao prestador de serviços de terceiros relevante, se optar por se registar ou iniciar sessão no Serviço utilizando esse serviço de terceiros.';
        document.getElementById('logistics').innerText = 'Prestadores de serviços de logística – para concluir eficazmente o processamento de encomendas, obteremos as suas informações de logística junto de fornecedores de logística, tais como o progresso da entrega e a morada de entrega.';
        document.getElementById('Login').innerText = 'Entrar';
        document.getElementById('autoInfo').innerText = 'Informações recolhidas automaticamente';
        document.getElementById('autoInfoText').innerText = 'Para melhorar a sua experiência com os nossos serviços e suportar as outras finalidades para as quais recolhemos informações pessoais, nós, os nossos fornecedores de serviços e os nossos parceiros comerciais podemos registar automaticamente informações sobre si, o seu computador ou dispositivo móvel e as suas interações com o Serviço, as nossas comunicações, e outros serviços online ao longo do tempo, tais como:';
        document.getElementById('deviceData').innerText = 'Dados do dispositivo:';
        document.getElementById('deviceDataText').innerText = ' Recolhemos determinadas informações sobre o dispositivo que utiliza para aceder ao Serviço, tais como o modelo do dispositivo, informações do sistema operativo.';
        document.getElementById('useInfoText1').innerText = 'Utilizamos as informações pessoais que recolhemos para vários fins, incluindo para desenvolver, melhorar, apoiar e fornecer o Serviço, permitindo-lhe utilizar as suas funcionalidades ao mesmo tempo que cumprimos e aplicamos os nossos Termos de utilização. Poderemos utilizar as suas informações pessoais para as seguintes finalidades:';
        document.getElementById('createAndMantain').innerText = 'Crie e mantenha a sua conta.';
        document.getElementById('orders1').innerText = 'Encomendas e entrega de produtos e serviços.';
        document.getElementById('otimize').innerText = 'Melhorar e otimizar os serviços e a resolução de problemas.';
        document.getElementById('infoNotIdentified').innerText = 'Informação desidentificada.';
        document.getElementById('communication').innerText = 'Comunicar consigo e fornecer atendimento ao cliente.';
        document.getElementById('giveaways').innerText = 'Sorteios, concursos e outras promoções e eventos.';
        document.getElementById('marketing1').innerText = 'Marketing.';
        document.getElementById('interestedPublicity').innerText = 'Publicidade baseada em interesses.';
        document.getElementById('fraudAndSecurity').innerText = 'Prevenção de fraudes e segurança.';
        document.getElementById('legalObligations').innerText = 'Cumprimento e obrigações legais:';
        document.getElementById('yourAgreement').innerText = 'Com o seu consentimento.';
        document.getElementById('createAndMantainText').innerText = ' Utilizamos as suas informações pessoais para criar e manter o seu perfil de utilizador no Serviço, ativar as funcionalidades de segurança da conta do Serviço (por exemplo, enviar códigos de segurança por e-mail ou SMS).';
        document.getElementById('orders1Text').innerText = ' Utilizamos as suas informações pessoais para receber e processar encomendas, fornecer produtos e serviços, processar pagamentos e comunicar consigo relativamente a encomendas, produtos e serviços e ofertas promocionais.';
        document.getElementById('otimizeText').innerText = ' Utilizamos as suas informações pessoais para otimizar funcionalidades, analisar métricas de desempenho, corrigir erros e melhorar o Serviço e o nosso negócio. Como parte destas atividades, podemos criar dados agregados ou de outra forma desidentificados com base nas informações pessoais que recolhemos.';
        document.getElementById('infoNotIdentifiedText').innerText = ' Poderemos desidentificar as suas informações de forma a que não possam ser razoavelmente utilizadas para inferir informações sobre si ou de outra forma associadas a si. Na medida em que conservemos ou tratemos quaisquer informações desidentificadas, iremos manter e utilizar essas informações de forma desidentificada e não tentar reidentificar as informações, exceto apenas para determinar se o nosso processo de desidentificação satisfaz os requisitos legais.';
        document.getElementById('communicationText').innerText = ' Utilizamos as suas informações pessoais para comunicar consigo (por exemplo, anúncios, atualizações, alertas de segurança, atendimento e mensagens administrativas) e fornecer atendimento ao cliente para os seus pedidos, perguntas e feedback.';
        document.getElementById('giveawaysText').innerText = ' Poderemos utilizar a imagem do seu perfil de utilizador e as informações da conta para o identificar em promoções e eventos relacionados e facilitar os seus convites a amigos que pretenda convidar a aderir ao Serviço.';
        document.getElementById('marketing1Text').innerText = ' Nós e os nossos prestadores de serviços podemos recolher e utilizar as suas informações pessoais para fins de marketing, de acordo com as suas preferências e a legislação aplicável. Poderemos enviar-lhe comunicações de marketing diretas e lembretes sobre carrinhos abandonados (ativados conforme descrito através da utilização de cookies que recolhemos). Pode optar por não receber as nossas comunicações de marketing ou lembretes sobre carrinhos abandonados, conforme descrito na secção "Os seus direitos e opções" abaixo.';
        document.getElementById('interestedPublicityText').innerText = ' A Lalala Utilities, os nossos prestadores de serviços e os nossos parceiros de publicidade externos podem recolher e utilizar as suas informações pessoais para fins de publicidade baseada em interesses. Ao fornecer publicidade baseada em interesses, seguimos os princípios de autorregulação da publicidade comportamental online, tal como definidos pela Digital Advertising Alliance (DAA), que é uma organização de defesa de direitos para o marketing digital responsável e a privacidade dos consumidores.';
        document.getElementById('fraudAndSecurityText').innerText = ' Utilizamos as suas informações pessoais para evitar, detetar, investigar e responder a fraudes, acesso ou uso não autorizado do Serviço, violações dos Termos de Utilização, ou outra conduta imprópria.';
        document.getElementById('legalObligationsText').innerText = ' Poderemos utilizar as suas informações pessoais para fins de conformidade e para cumprir a legislação, as leis, pedidos e processos legais aplicáveis (por exemplo responder a intimações ou pedidos de autoridades governamentais) associados ao seu país de residência; para proteger os seus direitos, privacidade, segurança ou propriedade (incluindo a apresentação e a defesa em ações judiciais), os nossos e os de outros utilizadores; auditar processos internos para garantir a conformidade com os requisitos legais e contratuais e com as nossas políticas internas; aplicar os termos e condições que regem o Serviço; prevenir, identificar, investigar e impedir atividades fraudulentas, nocivas, não autorizadas, antiéticas ou ilegais, incluindo ciberataques e roubo de identidade.';
        document.getElementById('yourAgreementText').innerText = ' Em alguns casos, poderemos solicitar especificamente o seu consentimento para recolher, utilizar ou partilhar as suas informações pessoais, quando exigido pela legislação aplicável.';
        document.getElementById('policyChangeText1').innerText = 'Reservamo-nos o direito de modificar a presente Política de Privacidade. Se fizermos alterações materiais à presente Política de Privacidade, iremos notificá-lo através da atualização da data da presente Política de Privacidade, publicando-a no Serviço e/ou fornecendo qualquer aviso exigido pela legislação aplicável. Quaisquer modificações à presente Política de Privacidade entrarão em vigor aquando da publicação da versão modificada (ou conforme indicado de outra forma no momento da publicação). Recomendamos que reveja a Política de Privacidade sempre que visita o nosso Serviço, para se manter informado sobre as nossas práticas de privacidade.';
        document.getElementById('shareInfoText1').innerText = 'Na Lalala Utilities, preocupamo-nos profundamente com a privacidade. Embora a Lalala Utilities partilhe as suas informações pessoais para fins de publicidade direcionada, o que pode ser considerado uma "venda" ao abrigo das leis de privacidade aplicáveis, a Lalala Utilities não "vende" informações pessoais no sentido tradicional. Poderemos partilhar as suas informações pessoais com as seguintes entidades com o objetivo de lhe fornecer serviços melhores, fornecer comunicações de publicidade e marketing personalizadas, proteger os seus direitos e/ou cumprir os requisitos legais:';
        document.getElementById('shareInfoText2').innerText = 'Tenha em atenção que, ao utilizar os nossos Serviços, pode partilhar informações pessoais com outras pessoas, por exemplo, quando outros utilizadores veem artigos na Lalala Utilities, podem ver comentários de artigos que deixou. Os utilizadores não verão o seu nome, apenas verão o nome de Utilizador ao deixar comentários.';
        document.getElementById('affiliatePeople').innerText = 'Afiliados.';
        document.getElementById('serviceWorkers').innerText = 'Prestadores de serviços.';
        document.getElementById('paymentWorkers').innerText = 'Processadores de pagamentos.';
        document.getElementById('thirdPeople').innerText = 'Terceiros designados por si.';
        document.getElementById('partners').innerText = 'Parceiros empresariais e de marketing.';
        document.getElementById('consultantPeople').innerText = 'Consultores profissionais, autoridades e reguladores. ';
        document.getElementById('businessAssignees').innerText = 'Cessionários empresariais.';
        document.getElementById('otherPeople').innerText = 'Parceiros de mercadorias/outros utilizadores.';
        document.getElementById('affiliatePeopleText').innerText = ' Para efeitos de processamento de encomendas, poderemos partilhar as suas informações pessoais relacionadas com a realização de encomendas, tais como a morada de envio e as informações de contacto, com as subsidiárias e afiliadas da Lalala Utilities Limited. Outras informações pessoais não relacionadas não serão partilhadas. Estas subsidiárias e afiliadas seguem as mesmas práticas descritas na presente Política de Privacidade ou seguem práticas pelo menos tão protetoras como as descritas na presente Política de Privacidade.';
        document.getElementById('serviceWorkersText').innerText = ' Terceiros que prestam serviços em nosso nome ou que nos ajudam a operar o Serviço ou o nosso negócio (como alojamento, tecnologia de informação, atendimento ao cliente, entrega por e-mail, processamento e entrega de encomendas, marketing e análise de websites). De um modo geral, exigimos que estes prestadores de serviços utilizem as informações pessoais apenas conforme necessário para prestar os serviços ou cumprir as obrigações legais aplicáveis.';
        document.getElementById('paymentWorkersText').innerText = ' Todas as informações do cartão de pagamento que utilizar para efetuar uma compra no Serviço são recolhidas e processadas diretamente pelos nossos processadores de pagamentos.';
        document.getElementById('thirdPeopleText').innerText = ' Poderemos partilhar os seus dados pessoais com terceiros quando nos tiver instruído ou fornecido o seu consentimento para o fazer. Poderemos partilhar as informações pessoais necessárias para os serviços que solicitou com terceiros designados por si. Tenha em atenção que, quando utiliza sites ou serviços de terceiros, os termos e políticas de privacidade dos mesmos regem a sua utilização desses sites ou serviços.';
        document.getElementById('partnersText').innerText = ' Terceiros especializados com os quais podemos colaborar para oferecer ou promover o Serviço.';
        document.getElementById('consultantPeopleText').innerText = ' Poderemos partilhar as suas informações com os nossos consultores profissionais (por exemplo, advogados, auditores, banqueiros e seguradoras) em resposta a processos legais (como os emitidos por tribunais ou autoridades no seu país de residência); e com outras partes para aplicar os nossos acordos ou políticas, proteger os direitos, propriedade e segurança da Lalala Utilities, dos utilizadores e de outros, e para detetar, prevenir e tratar de fraudes reais ou suspeitas, violações dos Termos de utilização da Lalala Utilities, outras atividades ilegais, problemas de segurança ou quando exigido por lei.';
        document.getElementById('businessAssigneesText').innerText = ' Adquirentes e outros participantes relevantes em transações comerciais (ou negociações ou diligências devidas para essas transações) que envolvam alienação, fusão, consolidação, aquisição, reorganização, venda de empresas ou outra disposição da totalidade ou de qualquer parte do negócio ou dos ativos da, ou participações na, Lalala Utilities ou nos nossos afiliados (incluindo, em relação a uma falência ou procedimentos semelhantes).';
        document.getElementById('otherPeopleText').innerText = ' Podemos partilhar com os parceiros de mercadorias as avaliações de produtos que o utilizador deixa, os motivos de devolução ou reembolso solicitados e as informações de personalização para artigos personalizados. O parceiro de mercadorias não receberá as suas informações de pagamento nem as suas informações de contacto.';
        document.getElementById('marketingPartners').innerText = 'Parceiros de marketing.'
        document.getElementById('marketingPartnersText').innerText = ' Por exemplo, parceiros comerciais com os quais colaboramos em eventos de marketing.'
        document.getElementById('rightsOptionsText1').innerText = 'Se for um Titular dos Dados relativamente às atividades de Tratamento descritas na presente Política de Privacidade, poderá ter os seguintes direitos e opções que podem ser exercidos de acordo com a legislação aplicável:';
        document.getElementById('rightsOptionsText2').innerText = 'Estes direitos podem ser limitados, por exemplo, se o cumprimento do seu pedido revelar dados pessoais sobre outra pessoa, se violarem os direitos de terceiros (incluindo os nossos direitos) ou se nos pedir para eliminar informações cuja conservação é exigida por lei ou em cuja conservação temos um interesse legítimo. As isenções relevantes estão incluídas no RGPD/RGPD de Portugal e na legislação local de implementação relevante.';
        document.getElementById('rightsOptionsText3').innerText = 'Pode exercer qualquer um destes direitos contactando-nos utilizando as informações fornecidas abaixo. Não o iremos discriminar por exercer qualquer um destes direitos. Poderemos ter de recolher informações suas para verificar a sua identidade antes de fornecer uma resposta substancial ao pedido. Também pode designar um agente autorizado para efetuar pedidos em seu nome para exercer os seus direitos. Antes de aceitar tal pedido de um agente, exigiremos que o agente forneça prova de que o autorizou a agir em seu nome e poderemos necessitar que o Utilizador confirme a sua identidade diretamente connosco.';
        document.getElementById('rightToKnow').innerText = 'Direito de conhecer/aceder.';
        document.getElementById('rightToDelete').innerText = 'Direito à eliminação.';
        document.getElementById('rightToRetificate').innerText = 'Direito à retificação.';
        document.getElementById('rightToRestriction').innerText = 'Direito à restrição do tratamento.';
        document.getElementById('rightToPortableData').innerText = 'Direito à portabilidade dos dados.';
        document.getElementById('rightToOpposition').innerText = 'Direito de oposição.';
        document.getElementById('rightToRetireConsent').innerText = 'Direito de retirar o consentimento.';
        document.getElementById('rightToAutomaticOpposition').innerText = 'Direito de se opor/recusar a tomada de decisões automatizadas:';
        document.getElementById('rightToComplain').innerText = 'Direito de apresentar uma reclamação a uma autoridade de controlo. ';
        document.getElementById('rightToKnowText').innerText = ' O direito de obter confirmação do responsável sobre se estão ou não a ser Tratados Dados pessoais relacionados consigo, e, quando for esse o caso, sobre o acesso aos Dados pessoais e a determinadas informações.';
        document.getElementById('rightToDeleteText').innerText = ' O direito de solicitar que eliminemos os Dados pessoais que mantemos sobre si sem demora injustificada se e na medida em que os Dados pessoais já não forem necessários em relação aos fins para os quais foram tratados, tiver retirado o seu consentimento sobre o qual se baseia o tratamento e quando não exista nenhum outro fundamento jurídico para o tratamento. Além disso, a eliminação será realizada se se opor ao tratamento e não existirem motivos legítimos prevalecentes para o tratamento, se os Dados pessoais tiverem sido tratados ilegalmente, ou se os Dados pessoais tiverem de ser apagados para cumprimento de uma obrigação legal na UE ou num Estado-Membro à qual estamos sujeitos.';
        document.getElementById('rightToRetificateText').innerText = ' O direito de solicitar a correção de Dados pessoais incorretos que mantemos sobre si.';
        document.getElementById('rightToRestrictionText').innerText = ' O direito de solicitar que restrinjamos o tratamento se contestar a precisão dos Dados pessoais ou se o tratamento for ilegal e se opuser à eliminação dos Dados pessoais e solicitar, em vez disso, a restrição da sua utilização. Além disso, o tratamento será restringido se já não precisarmos dos Dados pessoais para os fins do tratamento, mas necessitar do mesmo para o estabelecimento, exercício ou defesa de reivindicações legais. Também restringimos o tratamento se tiver contestado o tratamento enquanto é aguardada a verificação se os nossos motivos legítimos prevalecem sobre os seus.';
        document.getElementById('rightToPortableDataText').innerText = ' O direito de solicitar que os Dados Pessoais associados a si que nos tenha fornecido sejam disponibilizados num formato estruturado, de uso corrente e legível por máquina. Além disso, tem o direito de transmitir esses dados para outro responsável sem interferência da nossa parte. Isto aplica-se quando o tratamento se baseia no consentimento ou num contrato e o tratamento é realizado por meios automatizados. Além disso, tem o direito de transmitir os dados pessoais diretamente de um responsável para outro, quando tecnicamente viável.';
        document.getElementById('rightToOppositionText').innerText = ' O direito de oposição, por motivos relacionados com a sua situação específica, a qualquer momento, ao tratamento de Dados pessoais relacionados consigo baseado numa tarefa realizada no interesse público ou num interesse legítimo. Deixaremos de tratar os Dados pessoais em caso de tal objeção, exceto se demonstrarmos motivos legítimos convincentes para o tratamento que prevaleçam sobre os seus interesses, direitos e liberdades ou para o estabelecimento, exercício ou defesa de reivindicações legais. Quando tratamos Dados Pessoais para fins de marketing direto, incluindo a definição de perfis, na medida em que esteja relacionada com esse marketing direto, tem o direito de se opor, a qualquer momento, ao tratamento dos seus Dados Pessoais. Para obter mais informações, consulte a secção "Recusa de receção de comunicações de marketing".';
        document.getElementById('rightToRetireConsentText').innerText = '  O direito de retirar o seu consentimento a qualquer momento, quando o tratamento se basear no seu consentimento. A retirada do consentimento não irá afetar a legalidade do tratamento com base no consentimento antes da sua retirada.';
        document.getElementById('rightToAutomaticOppositionText').innerText = ' O direito de não ser sujeito a uma decisão quando esta se baseia no tratamento automatizado (ou seja, uma operação realizada sem qualquer intervenção humana), se esta produzir um efeito legal (ou seja, se tiver impacto nos seus direitos legais) ou se o afetar significativamente de uma forma semelhante (por exemplo, se afetar significativamente a sua situação financeira ou a sua capacidade de aceder a bens ou serviços essenciais) ou de recusar o tratamento dos seus Dados Pessoais para tais fins. A Lalala Utilities não toma decisões baseadas apenas no tratamento automatizado que produzam um efeito legal ou afetem significativamente as pessoas singulares de uma forma semelhante.';
        document.getElementById('rightToComplainText').innerText = ' Sem prejuízo de qualquer outro recurso administrativo ou judicial, o direito de apresentar uma reclamação junto da nossa autoridade de controlo principal, da Comissão Portuguesa de Proteção de Dados ou da sua autoridade de controlo local, se considerar que o tratamento dos seus Dados Pessoais infringe o RGPD.';
        document.getElementById('rightToRecuseMarketing').innerText = 'Recusa de receber Comunicações de marketing.';
        document.getElementById('emailPromo').innerText = 'Ofertas promocionais por e-mail:';
        document.getElementById('phonePromo').innerText = 'Ofertas promocionais por telemóvel:';
        document.getElementById('pushNotification').innerText = 'Notificações push:';
        document.getElementById('thirdsPlantform').innerText = 'Links para plataformas de terceiros.';
        document.getElementById('recuseInfos').innerText = 'Recusar o fornecimento de informações.';
        document.getElementById('rightToRecuseMarketingText').innerText = ' Para gerir as suas preferências ou cancelar a subscrição de comunicações de marketing, pode realizar qualquer uma das seguintes ações:';
        document.getElementById('emailPromoText').innerText = ' Se não desejar receber e-mails nossos relacionados com promoções ou ofertas especiais, pode seguir as opções de anulação da assinatura no fundo de cada e-mail.';
        document.getElementById('phonePromoText').innerText = ' Quando nos fornece o seu número de telemóvel para fins de marketing, podemos enviar-lhe determinados alertas de marketing por mensagem de texto e serão aplicadas as taxas padrão de dados e mensagens. Se já não pretender receber os nossos alertas de marketing por telemóvel, pode seguir as instruções fornecidas nessas mensagens ou responder "stop" a quaisquer alertas que enviarmos. Poderá continuar a utilizar a Lalala Utilities mesmo que deixe de autorizar ofertas promocionais por telemóvel.';
        document.getElementById('pushNotificationText').innerText = ' Poderá receber notificações push quando utilizar a aplicação para dispositivos móveis. Se pretender ajustar as definições das notificações push, incluindo desligá-las, pode fazê-lo nas definições de notificação do dispositivo móvel.';
        document.getElementById('thirdsPlantformText').innerText = ' O Serviço pode conter links para websites, aplicações móveis e outros serviços online operados por terceiros. Além disso, os nossos conteúdos podem ser integrados em páginas da Web ou noutros serviços online que não estão associados a nós. Se optar por estabelecer ligação ao Serviço através da sua conta de redes sociais ou de outra plataforma de terceiros, poderá utilizar as suas definições da sua conta nessa plataforma para limitar as informações que recebe do mesmo. No entanto, tenha em atenção que estes links e integrações não são um apoio a, ou uma representação de que somos afiliados a, terceiros. Além disso, não controlamos websites, aplicações móveis ou serviços online operados por terceiros e não somos responsáveis pelas suas ações. Por isso, recomendamos que leia as políticas de privacidade dos outros websites, aplicações móveis e serviços online que utiliza. Se revogar a nossa capacidade de aceder a informações de uma plataforma de terceiros, essa escolha não se aplicará a informações que já recebemos desse terceiro.';
        document.getElementById('recuseInfosText').innerText = ' Precisamos de recolher informações pessoais para fornecer determinados serviços. Se não fornecer as informações que identificamos como necessárias ou obrigatórias, poderemos não ser capazes de fornecer esses serviços.';
        document.getElementById('globalTransferText1').innerText = 'Para apoiar as nossas operações globais:';
        document.getElementById('globalTransferText2').innerText = 'Armazenamos as informações descritas na secção «Que informações recolhemos?» em servidores localizados no Espaço Económico Europeu (EEE).';
        document.getElementById('globalTransferText3').innerText = 'Algumas das nossas subsidiárias e afiliadas, localizadas fora da UE, do EEE, do Reino Unido e da Suíça, têm acesso remoto limitado aos seus dados pessoais. Consulte a seção "Como e por que motivo partilhamos as suas informações" acima para obter mais informações.';
        document.getElementById('globalTransferText4').innerText = 'Poderemos partilhar as suas informações com prestadores de serviços, parceiros e outras entidades descritas em "Como e por que motivo partilhamos as suas informações", que podem estar localizados fora da UE, do EEE, do Reino Unido e da Suíça.';
        document.getElementById('globalTransferText5').innerText = 'Estas partes comprometem-se a processar informações em conformidade com as leis de privacidade aplicáveis e a implementar medidas de segurança adequadas para proteger as suas informações.';
        document.getElementById('globalTransferText6').innerText = 'Quando transferimos as suas informações para fora da UE, do EEE, do Reino Unido e da Suíça, asseguramos que estas beneficiam de um nível adequado de proteção de dados, recorrendo a:';
        document.getElementById('globalTransferText7').innerText = 'Decisões de adequação. Estas são decisões da Comissão Europeia ao abrigo do artigo 45.º do RGPD (ou decisões equivalentes ao abrigo de outras leis), onde é reconhecido que um país oferece um nível adequado de proteção de dados. Transferimos as suas informações conforme descrito em "Que informações recolhemos?" para alguns países com decisões de adequação';
        document.getElementById('globalTransferText8').innerText = 'Cláusulas contratuais-tipo. A Comissão Europeia aprovou cláusulas contratuais ao abrigo do artigo 46.º do RGPD que permitem a empresas no EEE transferir dados para fora do EEE. Estas cláusulas (e o seu equivalente aprovado para o Reino Unido e a Suíça) são denominadas cláusulas contratuais-tipo. Apoiamo-nos em cláusulas contratuais-tipo para transferir informações conforme descrito em "Que informações recolhemos?" a determinadas filiais e terceiros em países sem uma decisão de adequação.';
        document.getElementById('globalTransferText9').innerText = 'Em determinadas situações, recorremos a derrogações previstas na legislação aplicável para transferir informações para um país terceiro.';
        document.getElementById('kidsText1').innerText = 'O Serviço não se destina ao uso por menores de 18 anos ou menores de idade (conforme definido pela lei aplicável). Se você é pai ou responsável por uma criança sobre a qual acredita que coletamos informações pessoais, entre em contato conosco. Se soubermos que coletamos informações pessoais de uma criança por meio do Serviço ou sem o conhecimento dos pais ou responsável da criança, conforme exigido por lei, cumpriremos os requisitos legais aplicáveis para excluir as informações.';
        document.getElementById('securityText1').innerText = 'A segurança das suas informações pessoais é importante para nós. Utilizamos medidas técnicas e administrativas para ajudar a proteger as suas informações pessoais contra perdas, roubo, utilização indevida, acesso, divulgação, alteração e/ou destruição não autorizados. Também seguimos a Norma de segurança de dados do setor de cartões de pagamento ("PCI-DSS") para lidar com as informações do seu cartão de crédito. No entanto, o risco de segurança é inerente a todas as tecnologias da Internet e da informação.';
        document.getElementById('securityText2').innerText = 'Geralmente, conservamos informações pessoais para cumprir os fins para os quais as recolhemos, bem como para cumprir quaisquer requisitos legais, contabilísticos ou de comunicação, para o exercício ou defesa de direitos legais ou para fins de prevenção de fraudes. Para determinar o período de conservação adequado para informações pessoais, podemos considerar fatores como a quantidade, a natureza e a sensibilidade das informações pessoais, o potencial risco de danos resultantes da utilização ou divulgação não autorizada das suas informações pessoais, os fins para os quais tratamos as suas informações pessoais e se podemos alcançar esses fins através de outros meios, e os requisitos legais aplicáveis. Quando já não precisarmos das informações pessoais que recolhemos sobre si, podemos eliminá-las ou anonimizá-las.';
        document.getElementById('securityText3').innerText = 'Os dados dos utilizadores da Lalala Utilities localizados na União Europeia (UE), no Espaço Económico Europeu, no Reino Unido (RU) e na Suíça serão armazenados por defeito na infraestrutura dos prestadores de serviços em nuvem no Espaço Económico Europeu (EEE). A Lalala Utilities é um destino global de compras, portanto, quando necessário, a Lalala Utilities pode transferir dados relacionados com o cumprimento de pedidos para prestadores de serviços noutros países para prestar serviços de execução de pedidos e de logística. Não serão transferidas informações pessoais (como informações sobre a conta e o perfil) não relacionadas com os serviços de execução. Ao mesmo tempo, em todos os casos, garantiremos que todas as transferências de dados pessoais cumprem os requisitos legais aplicáveis.';
        document.getElementById('contactUsText1').innerText = 'Se tiver alguma dúvida ou comentário sobre a nossa Política de privacidade ou os termos mencionados, pode contactar-nos a qualquer momento:';
        document.getElementById('contactUsText2').innerText = 'Envie um e-mail para Lalalautilities2024@hotmail.com';
        document.getElementById('contactUsText3').innerText = 'Também tem o direito de apresentar uma reclamação junto da autoridade de controlo principal da Lalala Utilities, da Comissão Portuguesa de Proteção de Dados ou da sua autoridade de controlo local.';
        document.getElementById('dataProtectionText1').innerText = 'O RGPD da UE e as leis de proteção de dados do Reino Unido requerem uma base jurídica para a nossa utilização de informações pessoais. A nossa base varia consoante o fim específico para o qual utilizamos informações pessoais. Utilizamos:';
        document.getElementById('contract').innerText = 'Execução de um contrato.';
        document.getElementById('contractText').innerText = ' quando fornecemos os nossos Serviços ou comunicamos consigo sobre os mesmos. Isto inclui quando utilizamos as suas informações pessoais para desenvolver, melhorar, apoiar e fornecer o Serviço, permitindo-lhe utilizar as suas funcionalidades ao mesmo tempo que cumprimos e aplicamos os nossos Termos de utilização.';
        document.getElementById('ourInteress').innerText = 'Os nossos interesses comerciais legítimos e os interesses de terceiros e/ou dos nossos clientes.';
        document.getElementById('ourInteressText').innerText = ' quando otimizamos funcionalidades, analisamos métricas de desempenho, corrigimos erros e melhoramos o Serviço e a nossa empresa, quando detetamos e prevenimos fraudes e abusos, de forma a proteger a segurança dos nossos clientes, de nós próprios ou de terceiros, e quando lhe fornecemos publicidade baseada em interesses.';
        document.getElementById('urConsetment').innerText = 'O seu consentimento.';
        document.getElementById('urConsetmentText').innerText = ' quando pedimos o seu consentimento para tratar as suas informações pessoais para um fim específico que lhe comunicamos. Quando autoriza o tratamento das suas informações pessoais para um fim específico, pode retirar o seu consentimento a qualquer momento e iremos parar de tratar os seus dados para esse fim.';
        document.getElementById('completeObligation').innerText = 'Cumprimento de uma obrigação legal. ';
        document.getElementById('completeObligationText').innerText = '  quando utilizamos as suas informações pessoais para fins de conformidade e para cumprir a legislação, as leis, pedidos e processos legais aplicáveis (por exemplo responder a intimações ou pedidos de autoridades governamentais) associados ao seu país de residência; para proteger os seus direitos, privacidade, segurança ou propriedade (incluindo a apresentação e a defesa em ações judiciais), os nossos e os de outros utilizadores; auditar processos internos para garantir a conformidade com os requisitos legais e contratuais e as nossas políticas internas; aplicar os termos e condições que regem o Serviço; prevenir, identificar, investigar e impedir atividades fraudulentas, nocivas, não autorizadas, antiéticas ou ilegais, incluindo ciberataques e roubo de identidade.';
        document.getElementById('juridicBase').innerText = 'Estas e outras bases jurídicas.';
        document.getElementById('juridicBaseText').innerText = ' dependendo do fim que descrevemos na secção "Como e por que motivo utilizamos as suas informações?"';
        document.getElementById('infoText1').innertText = 'Esta Política de Privacidade descreve a forma como a Lalala Utilities Limited, uma empresa registada em Portugal («Lalala Utilities», «nós», «nos» ou «nosso») trata as informações pessoais relativas a pessoas localizadas na União Europeia (UE), no Espaço Económico Europeu (EEE), no Reino Unido (RU) e na Suíça que recolhemos através das nossas propriedades digitais que remetem para a presente Política de Privacidade, incluindo o nosso website (www.lalala.3utilities.com), a aplicação móvel da Lalala Utilities (coletivamente, o «Serviço») e outras atividades, conforme descrito nesta Política de Privacidade. Na Lalala Utilities, preocupamo-nos muito com a privacidade. Esforçamo-nos por ser transparentes relativamente às nossas práticas de privacidade, incluindo a forma como tratamos as suas informações pessoais. Esta Política de Privacidade explica como recolhemos, utilizamos, partilhamos e tratamos as informações pessoais dos utilizadores relacionadas com o nosso Serviço. Nesta Política de Privacidade, também explicamos os direitos que os indivíduos afetados pelo nosso tratamento de dados podem ter em relação aos seus Dados Pessoais.';
        document.getElementById('infoText2').innertText = 'Para efeitos da presente Política de privacidade, "Dados pessoais" tem o significado indicado no Regulamento Geral de Proteção de Dados ("RGPD"), ou seja, qualquer informação relacionada com uma pessoa singular identificada ou identificável (o "Titular dos dados").';
        document.getElementById('infoText3').innertText = 'Responsável pelo Tratamento de Dados: Se estiver localizado na UE, no EEE, no Reino Unido ou na Suíça, a Lalala Utilities Limited, uma empresa portuguesa, é o fornecedor de serviços e o responsável pelo tratamento de dados relativamente às suas informações pessoais.';
    } else {
        document.getElementById('homeLink').innerText = 'Home';
        document.getElementById('homeLink1').innerText = 'Home';
        document.getElementById('homeLink2').innerText = 'Home';
        document.getElementById('aboutLink').innerText = 'About';
        document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
        document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
        document.getElementById('servicesLink').innerText = 'Services';
        document.getElementById('contactLink').innerText = 'Contact';
        document.getElementById('aboutLink1').innerText = 'About';
        document.getElementById('servicesLink1').innerText = 'Services';
        document.getElementById('contactLink1').innerText = 'Contact';
        document.getElementById('accountLink').innerText = 'Account';
        document.getElementById('adminServicesLink').innerText = 'Admin Services';
        $(".privacyPolicy1").text('Privacy Policy');
        document.getElementById('lastUpdate').innerText = 'Last Update: 06 of June of 2024';
        document.getElementById('indice').innerText = 'Index';
        document.getElementById('infoRecovText').innerText = '- What is the information we take?';
        document.getElementById('useInfoText').innerText = '- How and why we use your informations';
        document.getElementById('shareInfoText').innerText = ' - How and why we use share your information';
        document.getElementById('rightsOptionsText').innerText = '- Your Rights and Options';
        document.getElementById('globalTransferText').innerText = '- Our global Operations and data transfers';
        document.getElementById('dataProtectionText').innerText = '- General Data Protection Regulation of the European Union and data protection laws of Portugal – legal basis';
        document.getElementById('kidsText').innerText = '- Kids';
        document.getElementById('securityText').innerText = '- Security and data retencion';
        document.getElementById('policyChangeText').innerText = '- Changes in Privacy Policy';
        document.getElementById('contactUs1Text').innerText = '- Contact Us';
        document.getElementById('infoRecov').innerText = '- What is the information we take?';
        document.getElementById('useInfo').innerText = '- How and why we use your informations';
        document.getElementById('shareInfo').innerText = ' - How and why we use share your information';
        document.getElementById('rightsOptions').innerText = '- Your Rights and Options';
        document.getElementById('globalTransfer').innerText = '- Our global Operations and data transfers';
        document.getElementById('dataProtection').innerText = '- General Data Protection Regulation of the European Union and data protection laws of Portugal – legal basis';
        document.getElementById('kids').innerText = '- Kids';
        document.getElementById('security').innerText = '- Security and data retencion';
        document.getElementById('policyChange').innerText = '- Changes in Privacy Policy';
        document.getElementById('contactUs1').innerText = '- Contact Us';
        document.getElementById('infoText').innerText = 'In the course of providing and improving our products and services, we collect your personal information for the purposes described in this Privacy Policy. The following are the types of personal information we collect:';
        document.getElementById('infoOfUser').innerText = 'Information you provide';
        document.getElementById('createAccount').innerText = 'When creating an account, placing an order at checkout, contacting us directly, or using the Service, you may provide some or all of the following information:';
        document.getElementById('perfilAndAccount').innerText = 'Account and Perfil.';
        document.getElementById('perfilAndAccountText').innerText = ' To create and manage your Lalala Utilities account, we may collect your mobile phone number or email address as the login credentials for your account.';
        document.getElementById('shopping').innerText = 'Shopping.';
        document.getElementById('shoppingText').innerText = ' To complete transactions and process orders, we collect data related to your order on the Service, payment information necessary to complete the transaction (e.g., payment card number or other third-party payment information required for payment), your shipping address (e.g., city, state, country of residence, postal code), and recipient contact information (e.g., name, mobile phone number). We also collect your region based on the country.';
        document.getElementById('customerService').innerText = 'Customer Service.';
        document.getElementById('customerServiceText').innerText = ' When you communicate with our customer service team through customer service features, social media, or any other means, we will collect your communication history with us in an ongoing effort to improve our service and customer support.';
        document.getElementById('contentCustomer').innerText = 'User-generated content.';
        document.getElementById('contentCustomerText').innerText = ' As comments, questions, messages, and other content or information generated, transmitted, or otherwise made available on the Service, as well as associated metadata.';
        document.getElementById('eventParticipation').innerText = 'Promotions and event Participations.';
        document.getElementById('eventParticipationText').innerText = ' We collect information you actively share when you participate in a contest, promotion, or survey, such as contact information provided when you enter a sweepstakes, contest, or offer through the Service. We do this to notify you of a win, verify your identity, and/or send you a prize. In some cases, we may require additional information as part of the participation process, such as the selection of the desired prize. These sweepstakes and contests are voluntary. We recommend that you read the rules and other relevant information for each sweepstakes and contest you enter. Additionally, we collect information about your preferences for receiving marketing communications from us, as well as your interactions with them.';
        document.getElementById('otherData').innerText = 'Other Data not explicitly listed here.';
        document.getElementById('otherDataText').innerText = ' We will use other data you provide as described in this Privacy Policy or for any other purpose disclosed to you at the time we collect your information.';
        document.getElementById('infoOfThirds').innerText = 'Information from third-party sources';
        document.getElementById('thirdsText').innerText = 'We may collect personal information from other third-party sources, such as:';
        document.getElementById('affiliatePartners').innerText = 'Our affiliate parteners.';
        document.getElementById('affiliatePartnersText').innerText = ' Such as our affiliate network provider and publishers, influencers, and promoters who participate in our paid affiliate programs.';
        document.getElementById('dataProveider').innerText = 'Data proveiders.';
        document.getElementById('dataProveiderText').innerText = ' Such as information services and data licensors that provide demographic information and other data, which, among other purposes, help us detect fraud.';
        document.getElementById('publicAutority').innerText = 'Public authorities in the EEA, the UK, and Switzerland, public sources, and rights holders.';
        document.getElementById('publicAutorityText').innerText = ' We may obtain information from third-party sources, for example, as necessary to fulfill our obligations, prevent, investigate, or detect an alleged claim or crime, or for a party to exercise their legal rights.';
        document.getElementById('thirdsService').innerText = 'Other third-party services:';
        document.getElementById('thirdsServiceText').innerText = ' We may obtain your information from other third-party services, such as:';
        document.getElementById('socialMedia').innerText = 'Social media services – From which we may collect information such as your username, profile picture, and email address associated with the relevant third-party service provider, if you choose to register or log in to the Service using that third-party service.';
        document.getElementById('logistics').innerText = 'Logistics service providers – To effectively complete order processing, we will obtain your logistics information from logistics providers, such as delivery progress and delivery address.';
        document.getElementById('Login').innerText = 'Login';
        document.getElementById('autoInfo').innerText = 'Automatically collected information';
        document.getElementById('autoInfoText').innerText = 'To enhance your experience with our services and support the other purposes for which we collect personal information, we, our service providers, and our business partners may automatically record information about you, your computer or mobile device, and your interactions with the Service, our communications, and other online services over time, such as:';
        document.getElementById('deviceData').innerText = 'Device data:';
        document.getElementById('deviceDataText').innerText = ' We collect certain information about the device you use to access the Service, such as the device model and operating system information.';
        document.getElementById('useInfoText1').innerText = 'We use the personal information we collect for various purposes, including to develop, improve, support, and provide the Service, allowing you to use its features while complying with and enforcing our Terms of Use. We may use your personal information for the following purposes:';
        document.getElementById('createAndMantain').innerText = 'Create and maintain your account.';
        document.getElementById('orders1').innerText = 'Orders and delivery of products and services.';
        document.getElementById('otimize').innerText = 'Improve and optimize services and troubleshoot.';
        document.getElementById('infoNotIdentified').innerText = 'De-identified information.';
        document.getElementById('communication').innerText = 'Communicate with you and provide customer support.';
        document.getElementById('giveaways').innerText = 'Sweepstakes, contests, and other promotions and events.';
        document.getElementById('marketing1').innerText = 'Marketing.';
        document.getElementById('interestedPublicity').innerText = 'Interest-based advertising.';
        document.getElementById('fraudAndSecurity').innerText = 'Fraud prevention and security.';
        document.getElementById('legalObligations').innerText = 'Legal compliance and obligations:';
        document.getElementById('yourAgreement').innerText = 'With your consent.';
        document.getElementById('createAndMantainText').innerText = ' We use your personal information to create and maintain your user profile on the Service, enable account security features of the Service (e.g., sending security codes via email or SMS).';
        document.getElementById('orders1Text').innerText = ' We use your personal information to receive and process orders, provide products and services, process payments, and communicate with you regarding orders, products and services, and promotional offers.';
        document.getElementById('otimizeText').innerText = ' We use your personal information to optimize features, analyze performance metrics, correct errors, and improve the Service and our business. As part of these activities, we may create aggregated or otherwise de-identified data based on the personal information we collect.';
        document.getElementById('infoNotIdentifiedText').innerText = ' We may de-identify your information so that it cannot reasonably be used to infer information about you or otherwise be associated with you. To the extent we maintain or process any de-identified information, we will maintain and use that information in a de-identified manner and not attempt to re-identify the information, except solely to determine whether our de-identification process satisfies legal requirements.';
        document.getElementById('communicationText').innerText = ' We use your personal information to communicate with you (e.g., announcements, updates, security alerts, service and administrative messages) and provide customer support for your inquiries, questions, and feedback.';
        document.getElementById('giveawaysText').innerText = ' We may use your user profile image and account information to identify you in related promotions and events and facilitate your invitations to friends you wish to invite to join the Service.';
        document.getElementById('marketing1Text').innerText = ' We and our service providers may collect and use your personal information for marketing purposes, in accordance with your preferences and applicable law. We may send you direct marketing communications and abandoned cart reminders (enabled as described through the use of cookies we collect). You may opt out of our marketing communications or abandoned cart reminders as described in the "Your Rights and Choices" section below.';
        document.getElementById('interestedPublicityText').innerText = ' Lalala Utilities, our service providers, and our external advertising partners may collect and use your personal information for interest-based advertising purposes. In providing interest-based advertising, we follow the self-regulatory principles of online behavioral advertising as defined by the Digital Advertising Alliance (DAA), which is an advocacy organization for responsible digital marketing and consumer privacy.';
        document.getElementById('fraudAndSecurityText').innerText = ' We use your personal information to prevent, detect, investigate, and respond to fraud, unauthorized access or use of the Service, violations of the Terms of Use, or other improper conduct.';
        document.getElementById('legalObligationsText').innerText = ' We may use your personal information for compliance purposes and to comply with applicable laws, regulations, legal requests, and processes (e.g., responding to subpoenas or requests from government authorities) associated with your country of residence; to protect your rights, privacy, safety, or property (including asserting and defending against legal claims), ours, and those of others; to audit internal processes to ensure compliance with legal and contractual requirements and our internal policies; to enforce the terms and conditions governing the Service; to prevent, identify, investigate, and stop fraudulent, harmful, unauthorized, unethical, or illegal activity, including cyber-attacks and identity theft.';
        document.getElementById('yourAgreementText').innerText = ' In some cases, we may specifically ask for your consent to collect, use, or share your personal information when required by applicable law.';
        document.getElementById('policyChangeText1').innerText = 'We reserve the right to modify this Privacy Policy. If we make material changes to this Privacy Policy, we will notify you by updating the date of this Privacy Policy, posting it on the Service, and/or providing any notice required by applicable law. Any modifications to this Privacy Policy will become effective upon the posting of the revised version (or as otherwise indicated at the time of posting). We encourage you to review the Privacy Policy whenever you visit our Service to stay informed about our privacy practices.';
        document.getElementById('shareInfoText1').innerText = 'At Lalala Utilities, we deeply care about privacy. While Lalala Utilities shares your personal information for targeted advertising purposes, which may be considered a "sale" under applicable privacy laws, Lalala Utilities does not "sell" personal information in the traditional sense. We may share your personal information with the following entities to provide you with better services, deliver personalized advertising and marketing communications, protect your rights, and/or comply with legal requirements:';
        document.getElementById('shareInfoText2').innerText = 'Please note that by using our Services, you may share personal information with others, for example, when other users view items on Lalala Utilities, they can see item comments you have left. Users will not see your name, only your User name when leaving comments.';
        document.getElementById('affiliatePeople').innerText = 'Affiliates.';
        document.getElementById('serviceWorkers').innerText = 'Service providers.';
        document.getElementById('paymentWorkers').innerText = 'Payment processors.';
        document.getElementById('thirdPeople').innerText = 'Third parties designated by you.';
        document.getElementById('partners').innerText = 'Business and marketing partners.';
        document.getElementById('consultantPeople').innerText = 'Professional advisors, authorities, and regulators.';
        document.getElementById('businessAssignees').innerText = 'Business transferees.';
        document.getElementById('otherPeople').innerText = 'Merchandise partners/other users.';
        document.getElementById('affiliatePeopleText').innerText = ' For order processing purposes, we may share your personal information related to order fulfillment, such as shipping address and contact information, with Lalala Utilities Limited’s subsidiaries and affiliates. Other unrelated personal information will not be shared. These subsidiaries and affiliates follow the same practices described in this Privacy Policy or follow practices that are at least as protective as those described in this Privacy Policy.';
        document.getElementById('serviceWorkersText').innerText = ' Third parties who provide services on our behalf or who help us operate the Service or our business (such as hosting, information technology, customer support, email delivery, order processing and delivery, marketing, and website analytics). Generally, we require these service providers to use personal information only as necessary to provide the services or comply with applicable legal obligations.';
        document.getElementById('paymentWorkersText').innerText = ' All payment card information you use to make a purchase on the Service is collected and processed directly by our payment processors.';
        document.getElementById('thirdPeopleText').innerText = ' We may share your personal data with third parties when you have instructed us or given us your consent to do so. We may share the personal information necessary for the services you have requested with third parties designated by you. Please note that when you use third-party sites or services, their terms and privacy policies govern your use of those sites or services.';
        document.getElementById('partnersText').innerText = ' Specialized third parties with whom we may collaborate to offer or promote the Service.';
        document.getElementById('consultantPeopleText').innerText = ' We may share your information with our professional advisors (e.g., lawyers, auditors, bankers, and insurers) in response to legal processes (such as those issued by courts or authorities in your country of residence); and with other parties to enforce our agreements or policies, protect the rights, property, and safety of Lalala Utilities, users, and others, and to detect, prevent, and address fraud, actual or suspected violations of Lalala Utilities Terms of Use, other illegal activities, security issues, or when required by law.';
        document.getElementById('businessAssigneesText').innerText = ' Acquirers and other relevant participants in business transactions (or negotiations or due diligence for such transactions) that involve disposal, merger, consolidation, acquisition, reorganization, sale of businesses, or other disposal of all or any part of the business or assets of, or interests in, Lalala Utilities or our affiliates (including in connection with bankruptcy or similar proceedings).';
        document.getElementById('otherPeopleText').innerText = ' We may share product reviews you leave, reasons for return or refund requests, and customization information for personalized items with merchandise partners. The merchandise partner will not receive your payment information or contact information.';
        document.getElementById('marketingPartners').innerText = 'Marketing partners.'
        document.getElementById('marketingPartnersText').innerText = ' For example, business partners with whom we collaborate on marketing events.'
        document.getElementById('rightsOptionsText1').innerText = 'If you are a Data Subject with respect to the Processing activities described in this Privacy Policy, you may have the following rights and options that can be exercised in accordance with applicable law:';
        document.getElementById('rightsOptionsText2').innerText = 'These rights may be limited, for example, if fulfilling your request would reveal personal data about another person, if they infringe on the rights of others (including our rights), or if you ask us to delete information that we are required by law to keep or that we have a legitimate interest in retaining. Relevant exemptions are included in the GDPR/Portuguese GDPR and relevant local implementing legislation.';
        document.getElementById('rightsOptionsText3').innerText = 'You can exercise any of these rights by contacting us using the information provided below. We will not discriminate against you for exercising any of these rights. We may need to collect information from you to verify your identity before providing a substantive response to the request. You may also designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require the agent to provide proof that you have authorized them to act on your behalf and may need you to confirm your identity directly with us.';
        document.getElementById('rightToKnow').innerText = 'Right to know/access.';
        document.getElementById('rightToDelete').innerText = 'Right to deletion.';
        document.getElementById('rightToRetificate').innerText = 'Right to rectification.';
        document.getElementById('rightToRestriction').innerText = 'Right to restriction of processing.';
        document.getElementById('rightToPortableData').innerText = 'Right to data portability.';
        document.getElementById('rightToOpposition').innerText = 'Right to object.';
        document.getElementById('rightToRetireConsent').innerText = 'Right to withdraw consent.';
        document.getElementById('rightToAutomaticOpposition').innerText = 'Right to object/refuse automated decision-making:';
        document.getElementById('rightToComplain').innerText = 'Right to lodge a complaint with a supervisory authority.';
        document.getElementById('rightToKnowText').innerText = ' The right to obtain confirmation from the controller as to whether or not personal data concerning you are being processed, and, where that is the case, access to the personal data and certain information.';
        document.getElementById('rightToDeleteText').innerText = ' The right to request that we delete the personal data we hold about you without undue delay if and to the extent that the personal data are no longer necessary in relation to the purposes for which they were processed, you have withdrawn your consent on which the processing is based and where there is no other legal ground for the processing. Furthermore, deletion will be carried out if you object to the processing and there are no overriding legitimate grounds for the processing, if the personal data have been unlawfully processed, or if the personal data have to be erased for compliance with a legal obligation in the EU or a Member State to which we are subject.';
        document.getElementById('rightToRetificateText').innerText = ' The right to request the correction of inaccurate personal data that we hold about you.';
        document.getElementById('rightToRestrictionText').innerText = ' The right to request that we restrict processing if you contest the accuracy of the personal data or if the processing is unlawful and you oppose the erasure of the personal data and request the restriction of their use instead. Furthermore, processing will be restricted if we no longer need the personal data for the purposes of processing, but you require it for the establishment, exercise, or defense of legal claims. We will also restrict processing if you have objected to processing pending verification of whether our legitimate grounds override yours.';
        document.getElementById('rightToPortableDataText').innerText = ' The right to request that the personal data associated with you that you have provided to us be made available in a structured, commonly used, and machine-readable format. Furthermore, you have the right to transmit those data to another controller without hindrance from us. This applies where the processing is based on consent or on a contract and the processing is carried out by automated means. Additionally, you have the right to have the personal data transmitted directly from one controller to another, where technically feasible.';
        document.getElementById('rightToOppositionText').innerText = ' The right to object, on grounds relating to your particular situation, at any time to processing of personal data concerning you based on a task carried out in the public interest or in the exercise of official authority vested in the controller, or in the legitimate interests pursued by the controller or by a third party. We will no longer process the personal data in the event of such an objection unless we can demonstrate compelling legitimate grounds for the processing which override your interests, rights, and freedoms or for the establishment, exercise, or defense of legal claims. When we process personal data for direct marketing purposes, including profiling to the extent that it is related to such direct marketing, you have the right to object at any time to processing of personal data concerning you for such marketing. For more information, please refer to the "Opting out of marketing communications" section.';
        document.getElementById('rightToRetireConsentText').innerText = ' The right to withdraw your consent at any time, where the processing is based on your consent. The withdrawal of consent will not affect the lawfulness of processing based on consent before its withdrawal.';
        document.getElementById('rightToAutomaticOppositionText').innerText = ' The right not to be subject to a decision based solely on automated processing (i.e., processing carried out without any human intervention), if that decision produces legal effects concerning you (i.e., it affects your legal rights) or similarly significantly affects you (for example, it significantly affects your financial situation or your ability to access essential goods or services) or to refuse the processing of your personal data for such purposes. Lalala Utilities does not make decisions based solely on automated processing that produce legal effects or similarly significantly affect individuals.';
        document.getElementById('rightToComplainText').innerText = ' Without prejudice to any other administrative or judicial remedy, the right to lodge a complaint with our lead supervisory authority, the Portuguese Data Protection Commission, or your local supervisory authority if you consider that the processing of your personal data infringes the GDPR.';
        document.getElementById('rightToRecuseMarketing').innerText = 'Opting out of marketing communications.';
        document.getElementById('emailPromo').innerText = 'Promotional offers by email:';
        document.getElementById('phonePromo').innerText = 'Promotional offers by mobile:';
        document.getElementById('pushNotification').innerText = 'Push notifications:';
        document.getElementById('thirdsPlantform').innerText = 'Links to third-party platforms.';
        document.getElementById('recuseInfos').innerText = 'Refusal to provide information.';
        document.getElementById('rightToRecuseMarketingText').innerText = ' To manage your preferences or unsubscribe from marketing communications, you can do any of the following:';
        document.getElementById('emailPromoText').innerText = ' If you do not wish to receive emails from us related to promotions or special offers, you can follow the opt-out options at the bottom of each email.';
        document.getElementById('phonePromoText').innerText = ' When you provide us with your mobile number for marketing purposes, we may send you certain marketing alerts by text message, and standard data and message rates will apply. If you no longer wish to receive our marketing alerts by mobile, you can follow the instructions provided in those messages or reply "stop" to any alerts we send. You can continue to use Lalala Utilities even if you opt out of promotional offers by mobile.';
        document.getElementById('pushNotificationText').innerText = ' You may receive push notifications when using the mobile application. If you wish to adjust your push notification settings, including turning them off, you can do so in your mobile device notification settings.';
        document.getElementById('thirdsPlantformText').innerText = ' The Service may contain links to websites, mobile applications, and other online services operated by third parties. Additionally, our content may be integrated into web pages or other online services that are not associated with us. If you choose to connect to the Service through your social media account or another third-party platform, you may use your account settings on that platform to limit the information you receive from it. However, please note that these links and integrations are not an endorsement of, or a representation that we are affiliated with, the third parties. Additionally, we do not control third-party websites, mobile applications, or online services and are not responsible for their actions. Therefore, we recommend that you read the privacy policies of other websites, mobile applications, and online services you use. If you revoke our ability to access information from a third-party platform, that choice will not apply to information we have already received from that third party.';
        document.getElementById('recuseInfosText').innerText = ' We need to collect personal information to provide certain services. If you do not provide the information identified as necessary or mandatory, we may not be able to provide those services.';
        document.getElementById('globalTransferText1').innerText = 'To support our global operations:';
        document.getElementById('globalTransferText2').innerText = 'We store the information described in the "What information do we collect?" section on servers located in the European Economic Area (EEA).';
        document.getElementById('globalTransferText3').innerText = 'Some of our subsidiaries and affiliates, located outside the EU, EEA, UK, and Switzerland, have limited remote access to your personal data. See the "How and Why We Share Your Information" section above for more information.';
        document.getElementById('globalTransferText4').innerText = 'We may share your information with service providers, partners, and other entities described in "How and Why We Share Your Information," which may be located outside the EU, EEA, UK, and Switzerland.';
        document.getElementById('globalTransferText5').innerText = 'These parties are committed to processing information in accordance with applicable privacy laws and implementing appropriate security measures to protect your information.';
        document.getElementById('globalTransferText6').innerText = 'When we transfer your information outside the EU, EEA, UK, and Switzerland, we ensure that it benefits from an adequate level of data protection by using:';
        document.getElementById('globalTransferText7').innerText = 'Adequacy decisions. These are decisions by the European Commission under Article 45 of the GDPR (or equivalent decisions under other laws), recognizing that a country offers an adequate level of data protection. We transfer your information as described in "What information do we collect?" to some countries with adequacy decisions.';
        document.getElementById('globalTransferText8').innerText = 'Standard contractual clauses. The European Commission has approved contractual clauses under Article 46 of the GDPR, allowing companies in the EEA to transfer data outside the EEA. These clauses (and their equivalent approved for the UK and Switzerland) are known as standard contractual clauses. We rely on standard contractual clauses to transfer information as described in "What information do we collect?" to certain subsidiaries and third parties in countries without an adequacy decision.';
        document.getElementById('globalTransferText9').innerText = 'In certain situations, we rely on derogations provided by applicable law to transfer information to a third country.';
        document.getElementById('kidsText1').innerText = 'The Service is not intended for use by individuals under 18 years of age or minors (as defined by applicable law). If you are a parent or guardian of a child whom you believe we have collected personal information about, please contact us. If we become aware that we have collected personal information from a child through the Service or without the knowledge of the child\'s parent or guardian, as required by law, we will comply with applicable legal requirements to delete the information.';
        document.getElementById('securityText1').innerText = 'The security of your personal information is important to us. We use technical and administrative measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and/or destruction. We also adhere to the Payment Card Industry Data Security Standard ("PCI-DSS") when handling your credit card information. However, security risk is inherent in all internet and information technologies.';
        document.getElementById('securityText2').innerText = 'Generally, we retain personal information to fulfill the purposes for which we collected it, as well as to comply with any legal, accounting, or reporting requirements, to exercise or defend legal rights, or for fraud prevention purposes. To determine the appropriate retention period for personal information, we may consider factors such as the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure of your personal information, the purposes for which we process your personal information and whether we can achieve those purposes through other means, and the applicable legal requirements. When we no longer need the personal information we have collected about you, we may delete it or anonymize it.';
        document.getElementById('securityText3').innerText = 'Lalala Utilities user data located in the European Union (EU), European Economic Area (EEA), United Kingdom (UK), and Switzerland will be stored by default on cloud service providers\' infrastructure in the European Economic Area (EEA). Lalala Utilities is a global shopping destination, so when necessary, Lalala Utilities may transfer data related to order fulfillment to service providers in other countries to provide order fulfillment and logistics services. No personal information (such as account and profile information) unrelated to fulfillment services will be transferred. At the same time, in all cases, we will ensure that all transfers of personal data comply with applicable legal requirements.';
        document.getElementById('contactUsText1').innerText = 'If you have any questions or comments about our Privacy Policy or the terms mentioned, you can contact us at any time:';
        document.getElementById('contactUsText2').innerText = 'Send an email to Lalalautilities2024@hotmail.com';
        document.getElementById('contactUsText3').innerText = 'You also have the right to file a complaint with the principal supervisory authority of Lalala Utilities, the Portuguese Data Protection Commission, or your local supervisory authority.';
        document.getElementById('dataProtectionText1').innerText = 'The EU GDPR and UK data protection laws require a legal basis for our use of personal information. Our basis varies depending on the specific purpose for which we use personal information. We use:';
        document.getElementById('contract').innerText = 'Performance of a contract.';
        document.getElementById('contractText').innerText = ' when we provide our Services or communicate with you about them. This includes when we use your personal information to develop, improve, support, and deliver the Service, enabling you to use its features while we fulfill and enforce our Terms of Use.';
        document.getElementById('ourInteress').innerText = 'Our legitimate business interests and the interests of third parties and/or our customers.';
        document.getElementById('ourInteressText').innerText = ' when we optimize features, analyze performance metrics, fix errors, and improve the Service and our business, when we detect and prevent fraud and abuse to protect the safety of our customers, ourselves, or others, and when we provide you with interest-based advertising.';
        document.getElementById('urConsetment').innerText = 'Your consent.';
        document.getElementById('urConsetmentText').innerText = ' when we ask for your consent to process your personal information for a specific purpose that we communicate to you. When you authorize the processing of your personal information for a specific purpose, you can withdraw your consent at any time, and we will stop processing your data for that purpose.';
        document.getElementById('completeObligation').innerText = 'Compliance with a legal obligation.';
        document.getElementById('completeObligationText').innerText = ' when we use your personal information for compliance purposes and to meet applicable laws, legal requests, and processes (for example, responding to subpoenas or requests from government authorities) associated with your country of residence; to protect your rights, privacy, safety, or property (including presenting and defending legal claims), ours, and those of other users; audit internal processes to ensure compliance with legal and contractual requirements and our internal policies; enforce the terms and conditions governing the Service; prevent, identify, investigate, and stop fraudulent, harmful, unauthorized, unethical, or illegal activities, including cyberattacks and identity theft.';
        document.getElementById('juridicBase').innerText = 'These and other legal bases.';
        document.getElementById('juridicBaseText').innerText = ' depending on the purpose described in the section "How and Why We Use Your Information?"';
        document.getElementById('infoText1').innerText = 'This Privacy Policy describes how Lalala Utilities Limited, a company registered in Portugal ("Lalala Utilities", "we", "us" or "our") handles personal information relating to individuals located in the European Union (EU), the European Economic Area (EEA), the United Kingdom (UK), and Switzerland that we collect through our digital properties that link to this Privacy Policy, including our website (www.lalala.3utilities.com), the Lalala Utilities mobile application (collectively, the "Service"), and other activities as described in this Privacy Policy. At Lalala Utilities, we care deeply about privacy. We strive to be transparent about our privacy practices, including how we handle your personal information. This Privacy Policy explains how we collect, use, share, and process users’ personal information in connection with our Service. In this Privacy Policy, we also explain the rights individuals affected by our data processing may have regarding their Personal Data.';
        document.getElementById('infoText2').innerText = 'For the purposes of this Privacy Policy, "Personal Data" has the meaning set forth in the General Data Protection Regulation ("GDPR"), i.e., any information relating to an identified or identifiable natural person (the "Data Subject").';
        document.getElementById('infoText3').innerText = 'Data Controller: If you are located in the EU, EEA, UK, or Switzerland, Lalala Utilities Limited, a Portuguese company, is the service provider and the data controller with respect to your personal information.';

    }
}


// Event listener para quando o DOM estiver completamente carregado
/**
 * Função chamada quando o documento é carregado e pronto.
 * Faz uma requisição AJAX para verificar o tipo de utilizador (Admin ou User).
 * Ajusta a visibilidade de vários links e botões na página com base no tipo de utilizador.
 */

document.addEventListener('DOMContentLoaded', async function () {
   
    $.ajax({
        type: 'GET',
        url: '/privacyPolicy/admin',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                
                if (response.message === 'Admin') {
                    $('#homeLink1').show();
                    $('#homeLink').hide();
                    $('#homeLink2').hide();
                    $('#accountLink').hide();
                    $('#adminServicesLink').show();
                    $('#aboutLink').show();
                    $('#servicesLink').show();
                    $('#contactLink').show();
                    $('#aboutLink1').hide();
                    $('#servicesLink1').hide();
                    $('#contactLink1').hide();
                    $('.shopping-cart').show();
                    $('.profile-button').show();
                    $('.logout-button').show();
                    $('#Login').hide();
                } else if (response.message === 'User') {
                    $('#homeLink1').hide();
                    $('#homeLink2').hide();
                    $('#homeLink').show();
                    $('#accountLink').show();
                    $('#adminServicesLink').hide();
                    $('.shopping-cart').show();
                    $('.profile-button').show();
                    $('.logout-button').show();
                    $('#aboutLink').show();
                    $('#servicesLink').show();
                    $('#contactLink').show();
                    $('#aboutLink1').hide();
                    $('#servicesLink1').hide();
                    $('#contactLink1').hide();
                    $('#Login').hide();
                }
            }
        },
        error: function (xhr, status, error) {
            $('#homeLink').hide();
            $('#homeLink1').hide();
            $('#aboutLink').hide();
            $('#servicesLink').hide();
            $('#contactLink').hide();
            $('#accountLink').hide();
            $('.shopping-cart').hide();
            $('.profile-button').hide();
            $('.logout-button').hide();
            $('#aboutLink1').show();
            $('#servicesLink1').show();
            $('#contactLink1').show();
            $('#homeLink2').show();
            $('#adminServicesLink').hide();
            $('#Login').show();
        }
    });
});

// Requisição AJAX para obter o número de itens no carrinho
$.ajax({
    type: 'GET',
    url: '/privacyPolicy/cartItemCount',
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

        // Faz uma requisição para o endpoint '/privacyPolicy/logout' usando o método POST
        fetch('/privacyPolicy/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(function (response) {
                if (response.ok) {
                    window.location.href = '/'; 
                } else {
                    // Tratar erros de logout
                    console.error('Erro ao fazer logout:', response.statusText);
                }
            })
            .catch(function (error) {
                console.error('Erro ao fazer logout:', error);
            });
    });
}

