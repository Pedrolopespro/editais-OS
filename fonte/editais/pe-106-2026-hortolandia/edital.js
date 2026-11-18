/* ===== Edital: Pregão Eletrônico 106/2026 (Prefeitura de Hortolândia/SP) ===== */
/* ---------------- dados ---------------- */
const REF=18579013.56;
const COMPONENTS=[
 {k:'pass', nome:'Passeio e passageiros', det:'96 veículos · itens 15 a 18, 21 e 22', v:7325859.36, cor:'var(--blue)', def:62},
 {k:'carga',nome:'Carga e utilitários', det:'38 veículos · itens 5, 8, 9, 12, 19, 20, 23 e 24', v:4986335.88, cor:'var(--green)', def:62},
 {k:'seg',  nome:'Viaturas sinalizadas', det:'29 veículos · itens 1 a 4, 10 e 11', v:3883035.36, cor:'var(--steel)', def:68},
 {k:'saude',nome:'Saúde e acessibilidade', det:'10 veículos · itens 6, 7, 13 e 14', v:2383782.96, cor:'var(--gold)', def:70}
];
/* [item, qtd, veículo, grupo, valor mensal unitário, valor anual do item, garantia no Edital 4.12.1, prazo de entrega (dias), ano mínimo, especificação, adaptação/caracterização] */
const ITENS=[
 [1,16,'Minivan ou SUV fechado','seg',10365.74,1990222.08,1990.22,90,'2026+','4x2, flex ou híbrido, ≥ 110 cv, 5 lugares, porta-malas ≥ 440 L, ar, airbags','Viatura da Guarda Municipal: azul-marinho, barra de LED vermelha, sirene de 100 W com megafone, preparo para rádio, cela para detidos, suporte para 2 armas longas, farol de busca, porta-tablet, para-choque de impulsão, estribos e rastreamento'],
 [2,2,'SUV (Sport Utility)','seg',28715.16,689163.84,6891.63,90,'2026+','≥ 2.694 cc turbo, 4 cilindros, automática ≥ 6 marchas, diesel ou híbrido, 4x2 ou 4x4, porta-malas ≥ 830 L','Viatura da Guarda: azul-marinho, barra de LED, sirene de 100 W, preparo para rádio, para-choque de impulsão, suporte para armas, cela para detidos, porta-tablet, estribos e rastreamento'],
 [3,1,'Picape cabine dupla','seg',15234.20,182810.40,1828.10,90,'2026+','diesel, ≥ 2.8 e 200 cv, automática, 5 lugares, 4 portas','Guarda: azul-marinho, barra de LED com luz de beco, sirene de 4 tons com megafone, cela para preso e compartimento fechado para cães'],
 [4,1,'Picape cabine dupla','seg',15489.47,185873.64,1858.73,90,'2026+','diesel, ≥ 2.8 e 200 cv, automática, ar','Guarda: azul-marinho, barra com ≥ 250 LEDs, sirene de 100 W e 4 tons, capota de alumínio para presos com bancos de aço, exaustão forçada e porta-grade'],
 [5,1,'Picape intermediária cabine dupla','carga',15681.85,188182.20,1881.82,30,'2026+','≥ 110 cv, flex ou diesel, 5 lugares, carga útil ≥ 600 kg, ABS, airbags, protetor de caçamba',''],
 [6,3,'Ambulância tipo A (furgão)','saude',21685.62,780682.32,7806.82,90,'2026+','branca, diesel, ≥ 2.000 cc e 130 cv, teto alto, entre-eixos ≥ 3.200 mm','Portaria 2.048/2002: divisória com janela, oxigênio de 7 L, maca retrátil de 1,90 m, suporte de soro, armário, sinalização vermelha com sirene e grafismo de ambulância'],
 [7,5,'Van adaptada para cadeirantes','saude',19475.01,1168500.60,11685.00,90,'2026+','branca, diesel, ≥ 2.000 cm³ e 130 cv, teto alto, ar com duto central','3 baias para cadeira de rodas, plataforma elevatória ≥ 150 kg ou rampa, cintos de 3 pontos, piso antiderrapante, corrimão e sinalização de acessibilidade'],
 [8,1,'Caminhão com plataforma aérea','carga',25649.20,307790.40,3077.90,90,'fabricação 2020+','amarelo, PBT ≥ 8.200 kg, ≥ 150 cv, entre-eixos ≥ 3.700 mm','Plataforma hidráulica tipo tesoura: ≥ 300 kg, 1,0 × 2,0 m, altura de trabalho ≥ 6,8 m, deslocamento lateral de 0,9 m, carroceria de aço carga seca, sinalização e cones'],
 [9,1,'Caminhão cabine dupla','carga',27204.09,326449.08,3264.49,90,'2026+','amarelo-ouro, diesel, ≥ 3.0 e 147 cv, carroceria de madeira carga seca','Barra de LED (≥ 180), sirene de 4 tons com megafone, strobo branco, engate e grade na carroceria'],
 [10,4,'Motocicleta adaptada','seg',9489.90,455515.20,4555.15,90,'2026+','amarelo-ouro, flex, ≥ 240 cc e 20 cv, partida elétrica, freio a disco, ≥ 5 marchas','Sinalizadores vermelhos, sirene ≥ 30 W, protetor de pernas, bagageiro, baú ≥ 27 L e dispositivo contra linha de pipa'],
 [11,5,'Picape cabine simples (viatura)','seg',6324.17,379450.20,3794.50,90,'2026+','branca, flex, ≥ 88 cv, 2 lugares, ar','Adesivagem da Mobilidade, barra de LED (≥ 180), sirene de 4 tons com megafone e strobo branco'],
 [12,3,'Furgão','carga',16984.33,611435.88,6114.35,30,'modelo 2026','branco, diesel, ≥ 2.000 cc e 130 cv, teto alto, ar, PBT até 3.500 kg',''],
 [13,1,'Furgão refrigerado compacto','saude',18000.00,216000.00,2160.00,90,'2026+','flex ou diesel, ar na cabine, ABS, airbags','Baú isotérmico refrigerado de 4 °C a 8 °C, controlador digital e indicador externo (medicamentos e vacinas)'],
 [14,1,'Furgão consultório móvel','saude',18216.67,218600.04,2186.00,90,'2026+','furgão original, altura interna ≥ 1,90 m, volume ≥ 12 m³','Consultório médico: toldo, parte elétrica 220 V, split ≥ 12.000 BTU, frigobar, mesa, maca ginecológica, pia, tanques, armários e extintor'],
 [15,7,'Veículo de 7 lugares','pass',7242.60,608378.40,6083.78,30,'2026+','SUV ou minivan, ≥ 107 cv, automático, ar dianteiro e traseiro, controle de estabilidade',''],
 [16,7,'Van de 15 passageiros','pass',21102.93,1772646.12,17726.46,30,'2026+','diesel, ≥ 130 cv, ar dianteiro e traseiro, porta lateral deslizante',''],
 [17,1,'Van de 10 lugares','pass',19475.01,233700.12,2337.00,30,'2026+','flex ou diesel, ≥ 130 cv, ar dianteiro e traseiro',''],
 [18,1,'Van de 17 passageiros','pass',20987.50,251850.00,2518.50,30,'2026+','diesel, ≥ 130 cv, ar dianteiro e traseiro, porta lateral deslizante',''],
 [19,2,'VUC (caminhão urbano de carga)','carga',20648.30,495559.20,4955.59,30,'2026+','diesel, ≥ 130 cv, carga útil ≥ 1.300 kg, PBT até 3.500 kg, ar',''],
 [20,28,'Picape leve cabine simples','carga',7321.17,2459913.12,24599.13,30,'2026+','flex, ≥ 85 cv, ar, vidros e travas elétricas, protetor de caçamba, capota marítima',''],
 [21,61,'Hatch ou sedan 1.0 (≥ 73 cv)','pass',4302.20,3149210.40,31492.10,30,'2026+','flex, ≥ 73 cv, ar, direção assistida, vidros e travas elétricas, som',''],
 [22,19,'Hatch ou sedan (≥ 98 cv)','pass',5745.94,1310074.32,13100.74,30,'2026+','5 lugares, flex, ≥ 98 cv, ar, vidros e travas elétricas, som',''],
 [23,1,'Caminhão boiadeiro','carga',34222.22,410666.64,4106.66,90,'2026+','diesel, ≥ 160 cv, 2 lugares, ar','Carroceria boiadeira: piso antiderrapante, divisórias ajustáveis, portão com trava, rampas, pontos de amarração e ventilação'],
 [24,1,'Picape média cabine dupla','carga',15528.28,186339.36,1863.39,30,'2026+','diesel, ≥ 2.694 cc e 200 cv, 4x2 ou 4x4, automática, controle de estabilidade, capota marítima','']
];
const GRUPO_NOME={pass:'Passeio e passageiros',carga:'Carga e utilitários',seg:'Viaturas sinalizadas',saude:'Saúde e acessibilidade'};
const r2=n=>Math.round(n*100)/100;
const um=n=>r2(n/100); /* 1% do valor anual, arredondado */

const CONFLITOS=[
 {g:'alta',tipo:'Edital × TR',t:'Garantia de proposta do item 1 dez vezes menor',a:['Edital 4.12.1','Garantia de 1% do valor estimado; para o item 1, R$ 1.990,22.'],b:['TR, quadro p. 28','Item 1 vale R$ 1.990.222,08 no ano. 1% dá R$ 19.902,22.'],why:'O comprovante é exigido sob pena de inabilitação (Edital 4.12). Se o pregoeiro aplicar a regra de 1%, a garantia de R$ 1.990,22 fica R$ 17.912,00 abaixo.',todo:'Pedir esclarecimento até 24/11. Por segurança, prestar R$ 19.902,22 no item 1: o custo extra é pequeno perto do risco.'},
 {g:'alta',tipo:'Edital × TR',t:'Prazo do contrato corre antes de o veículo começar a faturar',a:['Edital 3.1 · Contrato 2.1','Vigência de 12 meses contados da assinatura.'],b:['TR 2.3, 4.2 e 4.3','Execução só após Ordem de Serviço, que pode ser escalonada conforme o fim dos contratos atuais; entrega em até 30 dias (padrão) ou 90 dias (adaptados) após cada ordem.'],why:'O valor de referência supõe 12 meses de aluguel. Um veículo adaptado entregue no 90º dia fatura cerca de 9 meses no primeiro ano, e o edital não diz quando sairão as ordens. A Prefeitura ainda pode encerrar o contrato no aniversário com 2 meses de aviso (Contrato 13.2).',todo:'Pedir o cronograma previsto das Ordens de Serviço e se os 12 meses contam por veículo a partir da entrega. Calcule o preço com os meses que de fato vai faturar.'},
 {g:'media',tipo:'Dentro do TR',t:'Rastreamento em todos os veículos ou só em alguns',a:['TR 1.5.23 e 1.5.25','Equipamentos de rastreamento "juntamente com os veículos locados" e 3 dispositivos de identificação de motorista em cada veículo.'],b:['TR 4.5 (V) e 15.24','Rastreamento "quando exigido para a respectiva categoria". Só os itens 1 e 2 citam rastreamento, remetendo a um "Anexo I" do TR que não está no arquivo.'],why:'Muda o custo: rastreador, plataforma 24 h e 3 dispositivos em 173 veículos ou em apenas 18.',todo:'Perguntar quais itens exigem rastreamento. Na dúvida, cote para todos.'},
 {g:'media',tipo:'TR × Contrato',t:'Pode alugar de terceiros os veículos especiais?',a:['TR 13.2','Veda a subcontratação "integral" da gestão, disponibilização e responsabilidade operacional da frota.'],b:['Contrato 4.2','Veda a subcontratação "completa ou da parcela principal": disponibilização e responsabilidade operacional da frota.'],why:'Pelo TR, sublocar parte da frota parece possível; pelo contrato, não. Decide se ambulância, plataforma aérea ou boiadeiro podem vir de parceiros.',todo:'Pedir esclarecimento. Planeje frota própria ou arrendada (leasing) nos itens em que vai disputar.'},
 {g:'media',tipo:'Dentro do TR',t:'Combustível na entrega',a:['TR 1.1 e 16.5','Locação sem combustível; abastecimento é despesa da Prefeitura.'],b:['TR 4.4 e 15.2','Veículos entregues "abastecidos" ("quando aplicável" no 4.4).'],why:'Custo pequeno, mas indefinido: um tanque cheio por veículo na entrega.',todo:'Confirmar se é só o tanque cheio na entrega e incluir esse custo único no preço.'},
 {g:'media',tipo:'Dentro do TR',t:'Amostra ou projeto do preparo para rádio',a:['TR, itens 1 e 2 (letra C)','"Cabendo à contratada apresentar solução em amostra ou projeto" para o preparo do rádio.'],b:['TR 10','"Apresentação das amostras: Não se aplica".'],why:'Não diz quando nem como a solução é aprovada. Pode atrasar a entrega das 18 viaturas dentro dos 90 dias.',todo:'Perguntar o momento e o critério de aprovação. Ter um projeto técnico pronto com o instalador.'},
 {g:'media',tipo:'Edital',t:'Patrimônio líquido ou balanço com índices',a:['Edital 7.12.2','Capital ou patrimônio líquido mínimo de 10% do valor do item "ou alternativamente".'],b:['Edital 7.12.3','Balanço dos 2 últimos exercícios com ILC ≥ 1, ILG ≥ 1 e endividamento (GE) ≤ 0,50.'],why:'Não fica claro se o balanço é sempre exigido nem se, em vários itens, os 10% se somam. GE ≤ 0,50 é difícil para locadora que financia frota.',todo:'Pedir esclarecimento e preparar as duas comprovações: 10% somados dos itens disputados e balanço com índices.'},
 {g:'media',tipo:'Dentro do TR',t:'Quantidade dos atestados não fixada',a:['TR 8.1','Atestado compatível em "características, quantidades e condições" com o item.'],b:['TR 8.4','"Poderá ser exigida" experiência de até 50% do quantitativo do item, sem fixar o percentual.'],why:'Exigência eliminatória sem número certo. No item 21, até 30 veículos; no item 20, até 14.',todo:'Pedir o percentual que será aplicado. Ter atestados que cheguem a 50% em cada item disputado.'},
 {g:'baixa',tipo:'Dentro do TR',t:'Ano mínimo dos veículos',a:['TR 1.3.1 e itens em geral','Ano/modelo 2026 ou superior.'],b:['TR, itens 8 e 12','Item 8: fabricação "não inferior a 2020". Item 12: título "2026 ou superior", texto "modelo 2026".'],why:'Pode mudar o custo do caminhão-plataforma e gerar recusa de furgão 2027.',todo:'Confirmar com o órgão. Na dúvida, oferte 2026 ou mais novo.'},
 {g:'baixa',tipo:'Edital × TR',t:'Centavos e grafia da garantia',a:['Edital 4.12.1','Itens 2, 4, 7, 12 e 23 com R$ 0,01 abaixo de 1%; item 24 escrito "R$ 1.863.39".'],b:['TR, quadro p. 28–31','1% arredondado: R$ 6.891,64; R$ 1.858,74; R$ 11.685,01; R$ 6.114,36; R$ 4.106,67.'],why:'Diferença mínima, mas garantia "abaixo de 1%" pode ser questionada.',todo:'Prestar o valor arredondado para cima.'},
 {g:'baixa',tipo:'Edital × TR',t:'Endereço do órgão diferente',a:['Edital, cabeçalho','Rua Professora Celina Franceschini Bueno, 100, CEP 13184-792.'],b:['TR, cabeçalho','Rua Projetada 12, 100, CEP 13185-185.'],why:'Só importa para correspondência física.',todo:'Protocolar pelo e-mail licitacao@hortolandia.sp.gov.br ou pela BBMNET.'},
 {g:'baixa',tipo:'Dentro do TR',t:'Identificação de motorista sem motorista contratado',a:['TR 1.1 e 16.7','Locação sem condutor; motoristas são da Prefeitura, com CNH válida.'],b:['TR 1.5.2 e 1.5.25','Rastreamento com identificação de motorista e 3 dispositivos por veículo.'],why:'Não cria contratação de motorista, mas gera custo de dispositivos.',todo:'Cotar os 3 dispositivos por veículo para uso dos servidores.'}
];

const MATRIZ=[
 {g:'Participação e habilitação',itens:[
  {id:'bbm',t:'Cadastro ativo na BBMNET',d:'Credenciamento prévio na plataforma da Bolsa Brasileira de Mercadorias',src:'Edital 2.1, 5.1.2',elim:true},
  {id:'sozinha',t:'Participar sozinha',d:'Consórcio vedado; sem sanção no TCE-SP e na CGU (empresa e sócio majoritário)',src:'Edital 2.6.9, 7.1–7.2',elim:true},
  {id:'garantia',t:'Garantia de proposta de 1% em cada item',d:'Anexada no cadastro da proposta, validade de 90 dias da abertura',src:'Edital 4.12',elim:true},
  {id:'pl',t:'Capital ou patrimônio líquido de 10% dos itens disputados',d:'R$ 1.857.901,36 se disputar os 24 itens',src:'Edital 7.12.2',elim:true},
  {id:'indices',t:'Balanço com ILC ≥ 1, ILG ≥ 1 e GE ≤ 0,50',d:'Alternativa ou complemento ao patrimônio líquido (ver Conflitos)',src:'Edital 7.12.3',elim:true},
  {id:'atest',t:'Atestados de locação compatíveis com cada item',d:'Até 50% da quantidade do item; itens de 1 unidade sem mínimo',src:'TR 8.1–8.5',elim:true},
  {id:'catalogo',t:'Catálogo ou ficha técnica de cada veículo ofertado',d:'Marca, modelo, versão, motor, capacidades e adaptações',src:'TR 8.6–8.8',elim:true}
 ]},
 {g:'Frota e entrega',itens:[
  {id:'frota',t:'Acesso aos veículos 0 km dos itens disputados',d:'Ano/modelo 2026 ou mais novo (caminhão-plataforma 2020+)',src:'TR 1.1, 1.3.1',elim:false},
  {id:'p30',t:'Entrega dos veículos padrão em 30 dias da ordem',d:'131 veículos em 11 itens, licenciados e emplacados',src:'TR 4.3–4.4',elim:false},
  {id:'p90',t:'Adaptações prontas em 90 dias da ordem',d:'Viaturas, ambulâncias, van PcD, plataforma, refrigerado, consultório, boiadeiro',src:'TR 4.3, 1.2.2',elim:false},
  {id:'caract',t:'Caracterização e adesivagem conforme layout da Prefeitura',d:'Custo da contratada; layout aprovado antes de aplicar',src:'TR 15.6–15.7',elim:false}
 ]},
 {g:'Operação',itens:[
  {id:'assist',t:'Assistência 24 h com guincho',d:'Pane, pneus e suporte operacional',src:'TR 15.10',elim:false},
  {id:'troca',t:'Troca do veículo em até 24 h',d:'Reserva equivalente se a parada passar de 24 h',src:'TR 15.14–15.15',elim:false},
  {id:'manut',t:'Manutenção preventiva e corretiva completa',d:'Peças, pneus, baterias, funilaria e higienização',src:'TR 15.11–15.16',elim:false},
  {id:'seguro',t:'Seguro total durante toda a vigência',d:'Colisão, roubo, furto, incêndio, danos materiais, corporais, morais e terceiros',src:'TR 15.9',elim:false},
  {id:'rastreio',t:'Rastreamento 24 h com plataforma web',d:'Posição a cada 3 min, histórico de 6 meses, 3 dispositivos por veículo',src:'TR 1.5',elim:false}
 ]},
 {g:'Finanças',itens:[
  {id:'capital',t:'Capital ou crédito para comprar ou arrendar a frota',d:'Mais o capital de giro de cerca de 60 dias',src:'TR 6 · Contrato 6.3',elim:false},
  {id:'prazo',t:'Aceitar contrato de 12 meses sem garantia de renovação',d:'Extinção possível no aniversário com 2 meses de aviso',src:'Edital 3.1 · Contrato 13.2',elim:false}
 ]}
];

const KIT=[
 {g:'Antes da sessão',prazo:'até 27/11, 8h · Edital 4.12',itens:[
  {id:'k-bbm',t:'Cadastro ativo na BBMNET',d:'Login testado e representante credenciado (Edital 2.1)'},
  {id:'k-gar',t:'Comprovante da garantia de proposta de cada item',d:'1% do item, validade até 25/02/2027 ou mais; no item 1, R$ 19.902,22'},
  {id:'k-prop',t:'Proposta inicial de cada item, com marca e modelo',d:'Sem identificar a empresa (Edital 6.2.1)'},
  {id:'k-decl',t:'Declarações marcadas nos campos do sistema',d:'Edital 4.4 a 4.6'}
 ]},
 {g:'Habilitação',prazo:'2 horas · Edital 7.1',itens:[
  {id:'k-jur',t:'Contrato social e documentos fiscais e trabalhistas',d:'Edital 7.10–7.11 (certidões válidas por 180 dias se não houver prazo)'},
  {id:'k-fal',t:'Certidão negativa de falência',d:'Edital 7.12.1'},
  {id:'k-pl',t:'Comprovação de capital ou patrimônio líquido de 10%',d:'Somando os itens disputados (Edital 7.12.2)'},
  {id:'k-bal',t:'Balanço de 2 exercícios e demonstrativo dos índices',d:'ILC, ILG e GE em papel timbrado, assinado pelo representante (Edital 7.12.3)'},
  {id:'k-atest',t:'Atestados de capacidade técnica por item',d:'Com quantidade, período e execução satisfatória (TR 8.5)'},
  {id:'k-cat',t:'Catálogos e fichas técnicas dos veículos ofertados',d:'Em português ou com tradução simples (TR 8.6–8.8)'}
 ]},
 {g:'Proposta final',prazo:'2 horas · Edital 7.14',itens:[
  {id:'k-anx2',t:'Anexo II preenchido, um arquivo por item',d:'Validade mínima de 90 dias, dados bancários e do signatário'},
  {id:'k-plan',t:'Planilha de custos, se o agente pedir',d:'Para provar exequibilidade (Edital 6.24–6.25)'}
 ]},
 {g:'Assinatura do contrato',prazo:'5 dias úteis · Edital 3.1.1',itens:[
  {id:'k-cert',t:'Certificado digital ICP-Brasil do representante',d:'Edital 3.1.3'},
  {id:'k-tcn',t:'Termo de Ciência e de Notificação (Anexo IV)',d:'Dados dos responsáveis atualizados no CADTCESP'},
  {id:'k-crono',t:'Cronograma de entrega e fornecedores contratados',d:'30 dias para padrão e 90 dias para adaptados após cada ordem'}
 ]}
];

const SIM_PARAMS=[
 {k:'trib',l:'Tributos sobre o faturamento',h:'PIS, COFINS, IRPJ e CSLL do seu regime (locação de bens sem ISS)',u:'%',def:11},
 {k:'adm',l:'Despesas indiretas',h:'sobre o custo direto: escritório, central 24 h, preposto, sistema de rastreamento',u:'%',def:8},
 {k:'glosa',l:'Faturamento perdido',h:'veículos parados, atrasos de entrega e glosas',u:'%',def:2},
 {k:'marg',l:'Margem líquida desejada',h:'sobre o valor do lance',u:'%',def:8},
 {k:'ciclo',l:'Ciclo até receber',h:'mês de uso + ateste + pagamento em 10 dias "fora a dezena"',u:'dias',def:60},
 {k:'juros',l:'Custo do capital de giro',h:'taxa mensal do seu financiamento',u:'%/mês',def:1.5}
];
const SIM_DEF=()=>{const o={lance:17200000}; COMPONENTS.forEach(c=>{if(!c.fixed)o['c_'+c.k]=c.def}); SIM_PARAMS.forEach(p=>o[p.k]=p.def); return o;};

const SECTIONS=[
 {id:'ficha',sec:'ficha',nome:'Ficha do edital',q:'Quais são os dados básicos do pregão?',etapa:1,min:2},
 {id:'condicoes',sec:'cond',nome:'Condições gerais',q:'Quais regras valem para o contrato e como a empresa é paga?',etapa:1,min:4},
 {id:'garantias',sec:'risco',nome:'Garantias',q:'Quanto a empresa precisa garantir antes da disputa e depois dela?',etapa:1,min:2},
 {id:'operacao',sec:'oper',art:'kit',nome:'Entrega e operação',q:'Em quanto tempo, onde e com que estrutura os veículos são entregues e mantidos?',etapa:1,min:3},
 {id:'veiculos',sec:'oper',nome:'Veículos',q:'Que veículos, quantos e com quais adaptações?',etapa:1,min:4},
 {id:'qualificacao',sec:'qual',nome:'Qualificação',q:'O que a empresa precisa comprovar para ser habilitada em cada item?',etapa:2,min:3},
 {id:'declaracoes',sec:'decl',nome:'Declarações',q:'Quais documentos escritos acompanham a proposta e o contrato?',etapa:2,min:2},
 {id:'conflitos',sec:'conf',nome:'Conflitos',q:'Onde os documentos se contradizem e o que fazer antes de propor?',etapa:2,min:4},
 {id:'planilha',sec:'plan',nome:'Quadro de preços',q:'Como o órgão chegou aos R$ 18,6 milhões?',etapa:2,min:3},
 {id:'matriz',sec:'matriz',nome:'Matriz de aderência',q:'A empresa cumpre cada exigência? Se não, como vai suprir?',etapa:3,min:6},
 {id:'kit',sec:'kit',nome:'Kit das 2 horas',q:'O que precisa estar pronto antes da sessão para não perder depois de vencer?',etapa:3,min:4},
 {id:'simulador',sec:'simul',nome:'Simulador de lance',q:'Até onde a empresa pode baixar o preço sem ter prejuízo?',etapa:4,min:5},
 {id:'riscos',sec:'risco',nome:'Caixa e riscos',q:'A empresa aguenta o tempo sem faturar e o prazo curto do contrato?',etapa:4,min:3},
 {id:'parecer',sec:'parecer',nome:'Parecer final',q:'Participar ou não participar?',etapa:5,min:3}
];

const DPRAZO=()=>daysUntil(2026,11,24);
const TAKE={
 ficha:()=>'Pregão eletrônico de menor preço por item, 24 itens independentes na BBMNET, com empate ficto para ME/EPP. Os dados básicos e o objeto completo estão abaixo.',
 condicoes:()=>'Contrato de 12 meses da assinatura, com início por Ordem de Serviço e pagamento em 10 dias "fora a dezena". Passeio e passageiros somam 39% do valor.',
 garantias:()=>'Só há garantia de proposta: 1% de cada item, anexada até 27/11 às 8h. Não há garantia de contrato. No item 1 o edital traz valor 10 vezes menor.',
 operacao:()=>'Entrega em 30 dias (padrão) ou 90 dias (adaptados) após cada ordem, em Hortolândia, com assistência e troca em 24 h. Sem motorista e sem escritório local exigido.',
 veiculos:()=>'173 veículos em 24 itens, quase todos 0 km (2026+). 42 veículos em 13 itens exigem adaptação ou caracterização.',
 qualificacao:()=>'Para habilitar em cada item: atestado de locação com até 50% da quantidade, catálogo do veículo e capital ou patrimônio líquido de 10% do item.',
 declaracoes:()=>'Garantia e declarações vão no cadastro da proposta; demonstrativo de índices na habilitação; Anexo II na proposta final; Anexo IV na assinatura.',
 conflitos:()=>CONFLITOS.filter(c=>c.g==='alta').length+' pontos podem mudar seu preço ou te inabilitar. O prazo para questionar o órgão vence em 24/11 ('+leftTxt(DPRAZO())+').',
 planilha:()=>'Os preços do quadro do TR são o teto de cada item. Não há planilha de composição de custos: só o valor mensal por veículo.',
 matriz:()=>{const s=matrizSummary(); return s.title+': '+s.evaluated+' de '+s.all.length+' requisitos avaliados.';},
 kit:()=>{const a=KIT.flatMap(g=>g.itens),d=a.filter(i=>state.kit.done[i.id]).length; return d+' de '+a.length+' documentos prontos. A garantia precisa estar anexada antes da sessão.';},
 simulador:()=>{const r=calc(state.sim); return isFinite(r.Pmin)?'Com os custos informados, seu lance mínimo para os 24 itens é '+fmt0(r.Pmin)+' (desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+')'+(isDefault()?', ainda com custos de exemplo.':'.'):'Com os percentuais atuais, nenhum preço cobre os custos.';},
 riscos:()=>{const r=calc(state.sim); return 'Reserve cerca de '+fmt0(r.K)+' de capital de giro, além da compra ou do arrendamento da frota, e conte com até 90 dias sem faturar por veículo.';},
 parecer:()=>{const p=parecerCalc(); return p.title+(p.title.endsWith('…')?' ':'. ')+(state.parecer.decisao?'O parecer da empresa já foi registrado.':'Registre a decisão da empresa no fim desta página.');}
};
const HN={
 ficha:()=>[{v:'R$ 18,6 mi',l:'valor anual estimado',c:'gold'},{v:'27/11',l:'sessão pública, às 8h30',c:'ink'},{v:'24 itens',l:'disputados separadamente',c:'ink'}],
 condicoes:()=>[{v:'12 meses',l:'vigência da assinatura',c:'ink'},{v:'39%',l:'do valor em passeio e passageiros',c:'blue'},{v:'IPCA',l:'reajuste após 30/07/2027',c:'ink'}],
 garantias:()=>[{v:'1%',l:'de cada item, antes da sessão',c:'gold'},{v:'R$ 185,8 mil',l:'se disputar os 24 itens (1% exato)',c:'gold'},{v:'Não há',l:'garantia de contrato',c:'green'}],
 operacao:()=>[{v:'30 dias',l:'para entregar veículo padrão',c:'blue'},{v:'90 dias',l:'para entregar veículo adaptado',c:'blue'},{v:'24 h',l:'para trocar veículo parado',c:'red'}],
 veiculos:()=>[{v:'173',l:'veículos no total',c:'ink'},{v:'42',l:'adaptados ou caracterizados',c:'red'},{v:'2026+',l:'ano/modelo mínimo (quase todos)',c:'ink'}],
 qualificacao:()=>[{v:'até 50%',l:'da quantidade do item em atestado',c:'red'},{v:'10%',l:'do item em capital ou patrimônio líquido',c:'gold'},{v:'≤ 0,50',l:'grau de endividamento no balanço',c:'ink'}],
 declaracoes:()=>[{v:'6',l:'declarações no campo do sistema',c:'ink'},{v:'2 h',l:'para habilitação e para proposta final',c:'red'},{v:'Anexo IV',l:'na assinatura',c:'ink'}],
 conflitos:()=>{const n=DPRAZO(); return [{v:String(CONFLITOS.filter(c=>c.g==='alta').length),l:'de alta gravidade',c:'red'},{v:String(CONFLITOS.length),l:'pontos no total',c:'ink'},{v:n<0?'encerrado':n===0?'hoje':n+(n===1?' dia':' dias'),l:'para questionar (até 24/11)',c:'red'}];},
 planilha:()=>[{v:'R$ 18,6 mi',l:'total anual de referência',c:'gold'},{v:'R$ 1,55 mi',l:'por mês, todos os itens',c:'ink'},{v:'17%',l:'do valor no item 21 (61 carros)',c:'blue'}],
 matriz:()=>{const s=matrizSummary(); return [{v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,l:'atendidos, com ou sem ajuste',c:'green'},{v:String(s.c.verificar),l:'a verificar',c:'ink'},{v:String(s.blockers.length),l:'bloqueios eliminatórios',c:'red'}];},
 kit:()=>{const g=KIT.map(x=>x.itens.filter(i=>state.kit.done[i.id]).length+' de '+x.itens.length); const a=KIT.flatMap(x=>x.itens); return [{v:a.filter(i=>state.kit.done[i.id]).length+' de '+a.length,l:'documentos prontos',c:'green'},{v:g[0],l:'antes da sessão',c:'ink'},{v:g[1],l:'habilitação',c:'ink'}];},
 simulador:()=>{const r=calc(state.sim), ok=isFinite(r.Pmin); return [{v:ok?fmtMi(r.Pmin):'—',l:'lance mínimo viável',c:'blue'},{v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',l:'desconto máximo',c:'blue'},{v:isFinite(r.margL)?pct(r.margL):'—',l:'margem no lance testado',c:r.margL<0?'red':'green'}];},
 riscos:()=>{const r=calc(state.sim); return [{v:fmtMi(r.K),l:'capital de giro estimado',c:'gold'},{v:'até 90 dias',l:'sem faturar após a ordem',c:'red'},{v:'~'+NUM.format(state.sim.ciclo)+' dias',l:'até o primeiro pagamento',c:'ink'}];},
 parecer:()=>{const p=parecerCalc(); return [{v:p.title,l:'recomendação calculada',c:'gold'},{v:Math.round(overallProgress()*100)+'%',l:'da análise concluída',c:'ink'},{v:String(p.steps.length),l:'próximos passos',c:'ink'}];}
};
const CARD={
 ficha:()=>({m:'R$ 18,6 mi',s:'sessão em 27/11 · 8h30 · BBMNET'}),
 condicoes:()=>({m:'12 meses',s:'início por Ordem de Serviço'}),
 garantias:()=>({m:'1% por item',s:'anexar antes da sessão',c:'warn'}),
 operacao:()=>({m:'30 / 90 dias',s:'para entregar após cada ordem'}),
 veiculos:()=>({m:'173 veículos',s:'42 com adaptação'}),
 qualificacao:()=>({m:'Por item',s:'atestado eliminatório',c:'alert'}),
 declaracoes:()=>({m:'4 momentos',s:'cadastro, habilitação, proposta, contrato',c:'warn'}),
 conflitos:()=>({m:CONFLITOS.length+' pontos',s:CONFLITOS.filter(c=>c.g==='alta').length+' de alta gravidade',c:'alert'}),
 planilha:()=>({m:'24 preços',s:'teto mensal por veículo'}),
 matriz:()=>{const s=matrizSummary(); return {m:(s.c.atende+s.c.ajuste)+' de '+s.all.length,s:s.title,c:s.kind==='go'?'ok':s.kind==='nogo'?'alert':'warn'};},
 kit:()=>{const a=KIT.flatMap(x=>x.itens), d=a.filter(i=>state.kit.done[i.id]).length; return {m:d+' de '+a.length,s:'documentos prontos',c:d===a.length?'ok':''};},
 simulador:()=>{const r=calc(state.sim); return {m:isFinite(r.Pmin)?fmtMi(r.Pmin):'—',s:'lance mínimo viável'+(isDefault()?' · exemplo':'')};},
 riscos:()=>{const r=calc(state.sim); return {m:fmtMi(r.K),s:'capital de giro até receber'};},
 parecer:()=>{const p=parecerCalc(); return {m:p.title,s:state.parecer.decisao?'decisão registrada':'registrar a decisão',c:p.kind==='go'?'ok':p.kind==='nogo'?'alert':'warn'};}
};

/* ---------------- tabelas ---------------- */
function renderComposition(){
  $('stack').innerHTML=COMPONENTS.map(c=>'<i style="width:'+(c.v/REF*100)+'%;background:'+c.cor+'" title="'+esc(c.nome)+'"></i>').join('');
  $('legend').innerHTML=COMPONENTS.map(c=>'<li><span class="sw" style="background:'+c.cor+'"></span><span><b>'+c.nome+'</b> <span class="hint">· '+c.det+'</span></span><span class="r">'+fmt(c.v)+'</span><span class="r p">'+pct(c.v/REF)+'</span></li>').join('')+'<li><span></span><span><b>Total dos 24 itens</b></span><span class="r"><b>'+fmt(REF)+'</b></span><span class="r p">100%</span></li>';
}
function renderVeiculos(){
  $('vehTable').querySelector('tbody').innerHTML=ITENS.map(i=>'<tr'+(i[10]?' class="hl"':'')+'><td><span class="cat-code">'+i[0]+'</span></td><td><b>'+esc(i[2])+'</b><span class="sub">'+esc(GRUPO_NOME[i[3]])+'</span></td><td class="r">'+i[1]+'</td><td>'+esc(i[8])+'</td><td>'+esc(i[9])+'</td><td>'+(i[10]?esc(i[10]):'<span class="hint">Configuração de série</span>')+'</td><td class="r">'+(i[7]===90?'<span class="pill att">90 dias</span>':'<span class="pill info">30 dias</span>')+'</td></tr>').join('');
}
function renderPlanilha(){
  const max=Math.max(...ITENS.map(i=>i[5]));
  $('plItens').querySelector('tbody').innerHTML=ITENS.map(i=>'<tr><td><span class="cat-code">'+i[0]+'</span></td><td>'+esc(i[2])+'</td><td class="r">'+i[1]+'</td><td class="r">'+fmt(i[4])+'</td><td class="r">'+fmt(r2(i[4]*i[1]))+'</td><td class="r"><b>'+fmt(i[5])+'</b></td><td><div class="barcell"><div class="bar"><i style="width:'+(i[5]/max*100)+'%"></i></div><span class="num" style="font-size:12.5px;text-align:right">'+pct(i[5]/REF)+'</span></div></td></tr>').join('')
    +'<tr class="tot"><td></td><td><b>Total</b></td><td class="r"><b>173</b></td><td></td><td class="r"><b>'+fmt(1548251.13)+'</b></td><td class="r"><b>'+fmt(REF)+'</b></td><td></td></tr>';
  $('planTiles').innerHTML=COMPONENTS.map((c,i)=>'<div class="tile t'+(i+1)+'"><span class="k">'+c.nome+'</span><span class="v">'+fmt0(c.v)+'</span><span class="s">'+pct(c.v/REF)+' do total · '+c.det.split(' · ')[0]+'</span></div>').join('')
    +'<div class="tile t5"><span class="k">Por mês</span><span class="v">'+fmt0(1548251.13)+'</span><span class="s">soma dos 24 itens</span></div><div class="tile t6"><span class="k">Total anual</span><span class="v">'+fmt0(REF)+'</span><span class="s">valor estimado · 12 meses</span></div>';
}
function renderGarantias(){
  let te=0, tc=0;
  $('garTable').querySelector('tbody').innerHTML=ITENS.map(i=>{const c=um(i[5]), d=r2(c-i[6]); te+=i[6]; tc+=c; const bad=Math.abs(d)>0.004; return '<tr'+(Math.abs(d)>1?' class="bad"':'')+'><td><span class="cat-code">'+i[0]+'</span></td><td>'+esc(i[2])+'</td><td class="r">'+fmt(i[5])+'</td><td class="r">'+fmt(i[6])+'</td><td class="r">'+fmt(c)+'</td><td class="r'+(bad?' warn':'')+'">'+(bad?fmt(d):'—')+'</td></tr>';}).join('')
    +'<tr class="tot"><td></td><td><b>Total</b></td><td class="r">'+fmt(REF)+'</td><td class="r"><b>'+fmt(r2(te))+'</b></td><td class="r"><b>'+fmt(r2(tc))+'</b></td><td class="r">'+fmt(r2(tc-te))+'</td></tr>';
}
function renderQual(){
  $('qualTable').querySelector('tbody').innerHTML=ITENS.map(i=>'<tr><td><span class="cat-code">'+i[0]+'</span></td><td>'+esc(i[2])+'</td><td class="r">'+i[1]+'</td><td class="r">'+(i[1]>1?'<b>até '+Math.floor(i[1]/2)+'</b>':'<span class="hint">sem mínimo</span>')+'</td><td class="r">'+fmt(r2(i[5]/10))+'</td></tr>').join('')
    +'<tr class="tot"><td></td><td><b>Todos os itens</b></td><td class="r"><b>173</b></td><td></td><td class="r"><b>'+fmt(r2(REF/10))+'</b></td></tr>';
}

/* ---------------- riscos ---------------- */
function renderRiscos(r){
  const L=r.L>0?r.L:REF;
  const T=[
   ['Faturamento mensal médio',fmt0(L/12),'lance ÷ 12, com a frota completa','t4'],
   ['Capital de giro estimado',fmt0(r.K),'custos de '+NUM.format(state.sim.ciclo)+' dias','t5'],
   ['Garantias de proposta',fmt0(185790.11),'1% exato dos 24 itens, devolvida após a assinatura','t1'],
   ['Patrimônio líquido mínimo',fmt0(REF/10),'10% dos 24 itens (Edital 7.12.2)','t3']
  ];
  $('riskTiles').innerHTML=T.map(t=>'<div class="tile '+t[3]+'"><span class="k">'+t[0]+'</span><span class="v">'+t[1]+'</span><span class="s">'+t[2]+'</span></div>').join('');
}
function renderRamp(){
  const os=parseNum($('rp-os').value), ent=parseNum($('rp-ent').value), v=parseNum($('rp-v').value);
  const parado=Math.max(0,os+ent), meses=Math.max(0,12-parado/30), perda=v*Math.min(12,parado/30);
  $('rpOut').innerHTML=svg('alert')+'<p>Se os 12 meses contarem da assinatura, o item fatura cerca de <b>'+NUM.format(Math.round(meses*10)/10)+' meses</b> no primeiro ano. Receita que deixa de entrar: <b>'+fmt0(perda)+'</b> ('+pct(Math.min(1,parado/360))+' do valor anual do item).</p>';
}
['rp-os','rp-ent','rp-v'].forEach(id=>$(id).addEventListener('input',renderRamp));

const E={
  slug:'pe-106-2026-hortolandia', docPrefix:'editais/pe-106-2026-hortolandia/', lsPrefix:'pe106hor-',
  ref:REF, teto:REF, garantiaPct:0, giro:'mensal',
  sessao:[2026,11,27], sessaoNome:'Sessão', chip:'R$ 18,6 mi · 24 itens',
  deadlines:[
   {d:[2026,11,24],lbl:'24/11',t:'Último dia para impugnar e pedir esclarecimento',s:'Edital 10.1 e 10.3 · BBMNET ou e-mail ',mail:'licitacao@hortolandia.sp.gov.br'},
   {d:[2026,11,26],lbl:'26/11',t:'Limite para o órgão responder',s:'Último dia útil antes da sessão · Edital 10.2'},
   {d:[2026,11,27],lbl:'27/11 · 8h',t:'Fim do envio das propostas, com garantia de 1% anexada',s:'Capa do Edital e item 4.12'},
   {d:[2026,11,27],lbl:'27/11 · 8h30',t:'Sessão pública na BBMNET',s:'www.bbmnet.com.br · Edital 2.1 e 6.1'}
  ],
  prazoQuestionar:[2026,11,24],
  sim:{
    tetoNome:'valor de referência', refNome:'referência', artExeq:'Edital 6.23–6.24', artAcima:'Edital 1.3.1 e 6.22.3',
    tetoLabel:()=>'Referência<br>R$ 18,6 mi',
    minSub:r=>'≈ '+fmt0(r.Pmin/12)+' por mês, 24 itens',
    margSub:r=>'≈ '+fmt0(r.margL*r.L)+' por ano',
    descValue:(r,ok,ref)=>ok?(r.Pmin<ref?pct(1-r.Pmin/ref):'sem desconto'):'—',
    passo:L=>L*0.001,
    extraAlerts:()=>[['warn','A disputa é item a item. Aplique o desconto escolhido em cada item que for disputar; nenhum preço mensal pode passar do quadro do TR (Edital 1.3.1).']]
  },
  kpis(x){ const {s,r,exemplo,ok}=x; const dImp=DPRAZO(); return [
   {href:'planilha',k:'Valor anual estimado',v:'R$ 18,6 mi',c:'gold',s:'24 itens · 173 veículos'},
   {href:'simulador',k:'Desconto máximo viável',v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',c:'blue',s:ok?'lance mínimo '+fmtMi(r.Pmin)+(exemplo?' (custos de exemplo)':''):'revise o simulador'},
   {href:'conflitos',k:'Conflitos graves',v:String(CONFLITOS.filter(c=>c.g==='alta').length),c:'red',s:'questionar até 24/11 ('+leftTxt(dImp)+')'},
   {href:'matriz',k:'Requisitos atendidos',v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,c:'green',s:s.c.verificar?s.c.verificar+' a verificar na matriz':(s.blockers.length?s.blockers.length+' bloqueio(s)':'todos avaliados')}
  ]; },
  precoTxt:r=>'Lance mínimo de '+fmt0(r.Pmin)+' para os 24 itens, desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+'.'+(r.Pmin<0.5*REF?' Abaixo de 50% da referência: indício de inexequibilidade.':''),
  riscosTxt:d=>'Garantia do item 1, vigência que corre antes da entrega, rastreamento, sublocação e qualificação econômica. Prazo para questionar: 24/11 ('+leftTxt(d)+').',
  prepTxt:(r)=>'Garantia anexada antes da sessão e documentos das 2 horas prontos. Caixa: cerca de '+fmt0(r.K)+' de capital de giro, fora a frota.',
  passoBloqueio:'Consórcio é vedado (Edital 2.6.9): avalie disputar só os itens em que a empresa cumpre tudo.',
  exeqStep:'Preparar a prova de exequibilidade do preço (Edital 6.23 a 6.25).',
  questionarStep:a=>'Decidir até 24/11 se vai pedir esclarecimento ou impugnar os '+a+' pontos de alta gravidade.',
  stepsGo:['Definir os itens que vai disputar e o preço mensal de cada um.','Anexar a garantia e cadastrar as propostas na BBMNET até 27/11, às 8h.'],
  init(){ renderComposition(); renderVeiculos(); renderPlanilha(); renderGarantias(); renderQual(); renderRamp(); },
  onSim(r){ renderRiscos(r); }
};
