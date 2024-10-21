/**
 * Projeto Desenvolvido por José Lúcio, atualmente a estudar no Instituto Politécnico de Setúbal com o número 202100198.
 * Data: 21/05/2024
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
        document.getElementById('privacyPoliticsLink').innerText = 'Política de privacidade';
        document.getElementById('contactLink').innerText = 'Contacto';
        document.getElementById('Login').innerText = 'Entrar';
        document.getElementById('termsAndConditionsLink').innerText = 'Termos e condições';
        document.getElementById('titleAbout').innerText = 'Bem-vindo à Lalala Utilitites!';
        document.getElementById('textAboutUs').innerText = 'Somos uma equipa de apaixonados por tecnologia e entusiastas de programação dedicados a oferecer soluções criativas e inovadoras para os desafios digitais de hoje. Combinando criatividade e compromisso com a excelência, estamos aqui para transformar as suas ideias em realidade. A Nossa jornada na programação começou com a paixão por resolver problemas e a busca incessante pelo conhecimento. Os Nossos objetivos são aplicar o nosso conhecimento diversificado para criar soluções sob medida que atendam às necessidades exclusivas de cada projeto. Na Lalala utilities, acreditamos firmemente na importância da colaboração e parceria. Trabalhamos lado a lado com os nossos clientes, ouvindo atentamente as suas necessidades e objetivos, para garantir que cada solução que entregamos não apenas atenda, mas exceda as expectativas. A Nossa abordagem centrada no cliente nos permite construir relacionamentos sólidos e duradouros, fundamentados na confiança e na transparência. Além do nosso compromisso com a excelência técnica, também valorizamos a comunicação clara e eficaz. Mantemos os nossos clientes informados e envolvidos durante todo o processo de desenvolvimento, garantindo que eles tenham visibilidade total sobre o progresso do projeto e possam contribuir com um feedback valioso. Se estás à procura de uma equipa confiável para ajudar a transformar as tuas ideias em realidade digital, entre em contato conosco. Estamos ansiosos para colaborar contigo e criar algo incrível juntos!';
        document.getElementById('textAboutUs1').innerText = 'Nós somos uma equipa dinâmica dedicada a proporcionar uma experiência excepcional de compras online. Na nossa essência, acreditamos em oferecer uma variedade diversificada de produtos de alta qualidade aos nossos clientes, cuidadosamente selecionados para atender as suas necessidades e preferências. Com foco em conveniência e confiabilidade, procuramos tornar a sua experiência de compras suave e agradável. A nossa plataforma é projetada para apresentar uma ampla seleção de itens, desde moda e eletrónicos até decoração para casa e muito mais. Sejas uma pessoa que gosta de tendências ou procures itens essenciais para o dia a dia, estamos aqui para ajudar. O Nosso compromisso com a satisfação do cliente guia tudo o que fazemos, e estamos em constantemente evolução para aprimorar as nossas ofertas e melhorar a sua experiência de compra. Junte-se a nós e descubra um mundo de possibilidades na nossa loja online.';

    } else {
        document.getElementById('homeLink').innerText = 'Home';
        document.getElementById('aboutLink').innerText = 'About';
        document.getElementById('termsAndConditionsLink').innerText = 'Terms and Conditions';
        document.getElementById('servicesLink').innerText = 'Services';
        document.getElementById('privacyPoliticsLink').innerText = 'Privacy Politics';
        document.getElementById('contactLink').innerText = 'Contact';
        document.getElementById('Login').innerText = 'Login';
        document.getElementById('titleAbout').innerText = 'Welcome to Lalala Utilitites!';
        document.getElementById('textAboutUs').innerText = 'We are a team of technology enthusiasts and passionate programmers dedicated to providing creative and innovative solutions to today\'s digital challenges. By combining creativity with a commitment to excellence, we are here to turn your ideas into reality. Our journey in programming began with a passion for problem-solving and an insatiable thirst for knowledge. Our goals are to apply our diverse knowledge to create tailored solutions that meet the unique needs of each project. At Lalala utilities, we firmly believe in the importance of collaboration and partnership. We work closely with our clients, carefully listening to their needs and goals, to ensure that each solution we deliver not only meets but exceeds expectations. Our client-centered approach allows us to build strong and lasting relationships, grounded in trust and transparency. In addition to our commitment to technical excellence, we also value clear and effective communication. We keep our clients informed and engaged throughout the development process, ensuring they have full visibility into the progress of the project and can provide valuable feedback. If you are looking for a reliable team to help turn your ideas into digital reality, please contact us. We look forward to collaborating with you and creating something amazing together!';
        document.getElementById('textAboutUs1').innerText =  ' We are a dynamic team dedicated to providing an exceptional online shopping experience. At our core, we believe in offering a diverse range of high-quality products to our customers, carefully curated to meet their needs and preferences. With a focus on convenience and reliability, we strive to make your shopping journey smooth and enjoyable. Our platform is designed to showcase an extensive selection of items, from fashion and electronics to home decor and more. Whether you\'re searching for the latest trends or everyday essentials, we\'ve got you covered. Our commitment to customer satisfaction drives everything we do, and we\'re constantly working to enhance our offerings and improve your shopping experience. Join us on our journey and discover a world of possibilities at our online store.';
    }
}
