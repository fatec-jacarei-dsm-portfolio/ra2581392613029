export const filtros = {
  pt: ['Todos', 'Profissionais', 'Acadêmicos', 'Pessoais'],
  en: ['All', 'Professional', 'Academic', 'Personal'],
  values: ['all', 'profissional', 'academico', 'pessoal']
};

export const projetos = [
  {
  id: 'SCRUM',
  titulo: 'Scrum do Zero',
  categoria: 'academico',
  resumo: {
    pt: 'Projeto acadêmico desenvolvido em equipe utilizando Scrum para criar um portal de certificação em metodologias ágeis.',
    en: 'Academic team project using Scrum to develop a certification portal focused on agile methodologies.'
  },
  descricao: {
    pt: 'Primeiro projeto em equipe utilizando Scrum, desenvolvido como parte de uma Atividade Baseada em Projeto (ABP). Atuei como Product Owner, participando da estruturação do projeto, organização e acompanhamento das atividades, definição de prioridades e documentação. Ao longo de três sprints, a equipe desenvolveu e concluiu um portal de certificação em metodologias ágeis, aplicando conceitos de desenvolvimento web, banco de dados, modelagem e práticas ágeis.',
    en: 'My first team project using Scrum, developed as part of a Project-Based Learning activity. I worked as Product Owner, contributing to project structuring, task organization and tracking, prioritization, and documentation. Across three sprints, the team developed and completed a certification portal focused on agile methodologies, applying web development, database, modeling, and agile practices.'
  },
  tecnologias: ['HTML5', 'CSS', 'JavaScript', 'Node.js', 'PostgreSQL', 'Figma', 'GitHub', 'UML', 'Scrum'],
  imagens: ['assets/projetos/abp1/inicio.png', 'assets/projetos/abp1/cadastro.png', 'assets/projetos/abp1/questoes.png'],
  repositorio: 'https://github.com/teamzerodsm/ABP-1DSM',
  demonstracao: 'https://abp-1dsm.onrender.com/',
},
  
{
  id: 'RGB',
  titulo: 'RGB Lab',
  categoria: 'pessoal',
  resumo: {
    pt: 'Ferramenta interativa para criação, visualização e organização de cores no modelo RGB.',
    en: 'Interactive tool for creating, visualizing, and organizing colors using the RGB model.'
  },
  descricao: {
    pt: 'Projeto pessoal criado a partir da necessidade de visualizar e escolher cores com mais facilidade durante o desenvolvimento de outros projetos. A ferramenta permite ajustar os canais RGB em tempo real, visualizar o resultado e consultar o código da cor. Também possibilita salvar as cores escolhidas para utilizá-las como referência posteriormente durante a criação de outras aplicações.',
    en: 'Personal project created from the need to visualize and choose colors more easily during the development of other projects. The tool allows users to adjust RGB channels in real time, preview the result, and check the color code. It also allows selected colors to be saved for later reference when creating other applications.'
  },
  tecnologias: ['React', 'TypeScript', 'Vite', 'CSS'],
  imagens: ['assets/projetos/RGB-lab/inicio.png','assets/projetos/RGB-lab/exemplo.png','assets/projetos/RGB-lab/testes.png'],
  repositorio: 'https://github.com/Henri-Bueno/RGB-lab',
  demonstracao: 'https://rgb-lab-mu.vercel.app/',
  capa: 'edit'
},
  {
  id: 'CEP',
  titulo: 'Busca CEP',
  categoria: 'pessoal',
  resumo: {
    pt: 'Aplicação web para consultar endereços por CEP e localizar CEPs por endereço.',
    en: 'Web application for finding addresses by ZIP code and ZIP codes by address.'
  },
  descricao: {
    pt: 'Aplicação web criada para facilitar consultas de CEP e endereços, permitindo buscar informações de um endereço por meio do CEP ou localizar CEPs a partir de dados como estado, cidade, bairro e logradouro.',
    en: 'Web application created to simplify ZIP code and address searches, allowing users to find address information using a ZIP code or locate ZIP codes through details such as state, city, neighborhood, and street.'
  },
  tecnologias: ['Node.js', 'Express', 'Dotenv', 'HTML5', 'CSS3', 'JavaScript', 'ViaCEP'],
  imagens: ['assets/projetos/busca-CEP/inicio.png', 'assets/projetos/busca-CEP/endereco.png','assets/projetos/busca-CEP/exemplo_2.png', 'assets/projetos/busca-CEP/exemplo_1.png'],
  repositorio: 'https://github.com/Henri-Bueno/Busca-CEP',
  demonstracao: 'https://busca-cep-onuf.vercel.app/',
}
  /*
  {
    id: 'id',
    titulo: 'nome',
    categoria: 'profissional',
    resumo: {
      pt: 'resumo curto',
      en: 'resumo curto em ingles'
    },
    descricao: {
      pt: 'descricao completa, problema resolvido e onde atuei.',
      en: 'descricao completa, problema resolvido e onde atuei em ingles.'
    },
    tecnologias: ['linguagem',],
    imagens: [],
    repositorio: '#',
    demonstracao: '#',
  } */
];
