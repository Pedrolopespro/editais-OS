/* ===== Edital: Pregão Eletrônico 24/2026 (IFB · uniformes escolares) ===== */
/* ---------------- dados ---------------- */
const REF=2754579.74;            /* valor máximo da contratação (Edital p. 1, TR 10.1) */
const PECAS=47139;
/* [nº, nome, CATMAT, quantidade, preço unitário máximo] · TR 1.1 */
const ITENS=[
 [1,'Camiseta manga curta · modelo 1','623334',3189,51.00],
 [2,'Camiseta manga curta · modelo 2','623334',22171,51.00],
 [3,'Camiseta manga longa · modelo 2','231447',10211,47.78],
 [4,'Calça de moletom · modelo 2','618815',5624,58.30],
 [5,'Casaco de moletom · modelo 2','624542',5944,108.59]
];
const ITEM_COR=['var(--steel)','var(--blue)','var(--green)','var(--gold)','var(--amber)'];
/* quantidades por campus, itens 1 a 5 · TR 1.1.1, Tabela 2 */
const CAMPI=[
 ['CPLA','Planaltina',[0,5120,5120,2560,2560]],
 ['CBRA','Brasília (Asa Norte)',[0,7560,2880,800,800]],
 ['CGAM','Gama',[1729,1729,864,864,864]],
 ['CEST','Estrutural',[0,1440,840,840,840]],
 ['CSAM','Samambaia',[0,1330,0,560,560]],
 ['CRFI','Riacho Fundo',[0,1840,0,0,0]],
 ['CTAG','Taguatinga',[0,1280,0,0,320]],
 ['CREM','Recanto das Emas',[1460,0,0,0,0]],
 ['CCEI','Ceilândia',[0,1200,0,0,0]],
 ['CSSB','São Sebastião',[0,672,507,0,0]]
];
/* grade de tamanhos somada dos 10 campi: PP, P, M, G, GG, XGG, EXGG · TR 1.1.1 */
const TAMS=['PP','P','M','G','GG','XGG','EXGG'];
const GRADE=[
 [90,496,832,918,626,132,95],
 [1358,4131,5934,5532,3595,1018,603],
 [600,1894,2561,2468,1906,447,335],
 [190,1064,1411,1500,1043,248,168],
 [190,1096,1505,1626,1095,264,168]
];
/* custo de exemplo por peça (R$): tecido, confecção, estampa, aviamentos e embalagem, frete · NÃO vem do edital */
const EX=[
 [9.00,7.00,4.00,1.50,1.00],
 [9.00,6.00,2.50,1.50,1.00],
 [11.00,7.00,2.50,2.00,1.00],
 [22.00,10.00,1.50,3.00,1.00],
 [30.00,14.00,3.00,3.50,1.00]
];
const exTot=k=>ITENS.reduce((s,it,i)=>s+it[3]*EX[i][k],0);

/* componentes do simulador: custo total de exemplo em R$ (soma do quadro EX) */
const COMPONENTS=[
 {k:'tec', nome:'Tecidos e malhas', det:'meia-malha, ribana e moletom · ≈ R$ 13,63 por peça no exemplo', v:null, cor:'var(--blue)', def:642609},
 {k:'conf',nome:'Corte, costura e acabamento', det:'produção própria: subcontratação vedada (TR 4.13)', v:null, cor:'var(--green)', def:366282},
 {k:'est', nome:'Estamparia em serigrafia', det:'marca IFB na frente e nas costas', v:null, cor:'var(--steel)', def:119979},
 {k:'avi', nome:'Aviamentos, etiquetas e embalagem', det:'ribana, cordão, elástico, etiqueta têxtil', v:null, cor:'var(--gold)', def:96138},
 {k:'fre', nome:'Frete e entrega nos 10 campi', det:'remessa única por empenho (TR 5.1, 5.3)', v:null, cor:'var(--amber)', def:47139},
 {k:'amo', nome:'Amostras e laudos', det:'18 amostras de tecido e ensaios (TR 4.7)', v:null, cor:'var(--red)', def:5000}
];

Object.assign(ILLU,{
 unif:'<path d="M66 12 44 20 28 38l12 10 10-10v44h60V38l10 10 12-10-16-18-22-8c-2 8-8 12-14 12s-12-4-14-12z"/><path d="M50 38v-6M110 38v-6" opacity=".5"/><rect class="acc" x="88" y="32" width="10" height="13" rx="1.5"/><path class="acc" d="M50 76h60" opacity=".7"/>',
 entrega:'<path d="M8 78h144" opacity=".4"/><rect x="22" y="44" width="34" height="34" rx="2"/><path d="M22 56h34M39 44v12"/><rect x="58" y="52" width="26" height="26" rx="2"/><path d="M58 62h26M71 52v10"/><rect x="34" y="20" width="26" height="24" rx="2"/><path d="M34 30h26M47 20v10"/><path class="acc" d="M118 22a12 12 0 0 1 12 12c0 10-12 22-12 22s-12-12-12-22a12 12 0 0 1 12-12z"/><circle class="acc" cx="118" cy="34" r="4"/><path d="M90 70c8-6 16-8 26-8" stroke-dasharray="3 4"/>'
});
HOME_ART='<svg class="ill" viewBox="0 0 320 170" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 150h312" opacity=".45"/><g class="drive-l"><g transform="translate(6 46) scale(1.1)"><path d="M66 12 44 20 28 38l12 10 10-10v44h60V38l10 10 12-10-16-18-22-8c-2 8-8 12-14 12s-12-4-14-12z"/><rect class="acc" x="88" y="32" width="10" height="13" rx="1.5"/></g></g><g class="drive-r"><g transform="translate(168 72)"><rect x="22" y="44" width="34" height="34" rx="2"/><path d="M22 56h34M39 44v12"/><rect x="58" y="52" width="26" height="26" rx="2"/><path d="M58 62h26M71 52v10"/><rect x="34" y="20" width="26" height="24" rx="2"/><path d="M34 30h26M47 20v10"/><path class="acc" d="M118 22a12 12 0 0 1 12 12c0 10-12 22-12 22s-12-12-12-22a12 12 0 0 1 12-12z"/><circle class="acc" cx="118" cy="34" r="4"/></g></g></svg>';

const CONFLITOS=[
 {g:'alta',tipo:'ETP × TR',t:'Composição do moletom: 100% algodão ou 60/40',a:['ETP p. 49, casaco e calça','Moletom "composição têxtil 100% algodão", com ribana "de composição compatível".'],b:['TR 4.7.1 · ETP p. 42 e 48','Amostras exigidas em tecido 60% algodão e 40% poliéster (verde e branco). O ETP também fala em "tecidos de moletom com composição mista".'],why:'Moletom 100% algodão custa mais que o 60/40. Se o fiscal exigir 100% algodão, quem cotou 60/40 tem as peças recusadas (critério de rejeição, ETP p. 51). Se valer o 60/40, quem cotou 100% algodão perde no preço. Casaco e calça somam 35% do valor.',todo:'O prazo para perguntar venceu em 19/11. Envie mesmo assim o pedido de esclarecimento a licitacoes@ifb.edu.br: o IFB pode responder até 24/11, mas não é obrigado. Sem resposta, cote o moletom 100% algodão (pior caso) e entregue as amostras 60/40 exigidas no TR, mais uma de moletom 100% algodão por cautela.'},
 {g:'alta',tipo:'Dentro do TR',t:'Multa por atraso de 10% ao dia',a:['TR 7.2.4.1','Multa moratória de 10% por dia de atraso injustificado sobre a parcela, até 30 dias.'],b:['TR 7.2.4.4 · Edital 14.4','Inexecução total do contrato: multa de 7% a 9% do valor. Na licitação, multas de 0,5% a 30%.'],why:'Com 10 dias de atraso a multa já soma 100% da parcela atrasada, mais que a multa por não entregar nada (7% a 9%). Parece erro de digitação (o usual é 0,1% a 0,5% ao dia), mas vale como está escrito e a garantia de 4% responde por ela (TR 4.21.2).',todo:'Planejar a produção com folga sobre os 60 dias e pedir prorrogação por escrito com 20 dias de antecedência quando houver motivo (TR 5.2). Perguntar por e-mail se o percentual está certo e, na assinatura, pedir a correção.'},
 {g:'alta',tipo:'Dentro do TR',t:'Atestado de "produção" de 5.000 unidades',a:['TR 9.30.1.1','Atestado com "produção de no mínimo 5.000 (cinco mil) unidades do objeto" e cumprimento do contrato "a contento".'],b:['TR 9.30 · ETP p. 43','Aceita fornecimento de "bens similares" e diz que 5.000 são 10,60% do total de itens.'],why:'Não diz se vale atestado de revenda ou só de fabricação, se as 5.000 unidades podem ser de qualquer peça de vestuário ou só de uniformes, nem se o atestado precisa dizer que a entrega foi "a contento". Atestado é eliminatório.',todo:'Reunir atestados que digam, de forma expressa, fabricação ou confecção de uniformes ou camisetas, a quantidade e a entrega sem ocorrências. Somar atestados de contratos simultâneos se preciso (TR 9.30.2).'},
 {g:'media',tipo:'Dentro do Edital',t:'Lance por item num julgamento por grupo',a:['Edital 1.2 · capa','Menor preço por grupo: grupo único com 5 itens e proposta obrigatória para todos.'],b:['Edital 7.5 · TR 9.3','"O lance deverá ser ofertado pelo valor unitário do item"; critério de aceitabilidade pelo preço unitário máximo de cada item.'],why:'Não fica claro se a disputa corre pelo total do grupo ou item a item. Em qualquer caso, nenhum preço unitário final pode passar do máximo do TR 1.1.',todo:'Conferir no Compras.gov.br como o grupo foi cadastrado. Ter a planilha com os 5 preços unitários pronta para ajustar ao lance final em até 2 horas (Edital 7.25.5).'},
 {g:'media',tipo:'Edital × lei',t:'Tratamento de ME/EPP',a:['Edital 3.6','Sem tratamento favorecido no grupo 1, com base no art. 4º, §1º, da Lei 14.133.'],b:['Edital 7.20 · ETP p. 42','O Edital descreve o empate ficto de 5%. O ETP só afasta a exclusividade e a cota. O grupo vale R$ 2,75 mi, abaixo do limite de receita de EPP (R$ 4,8 mi) que o art. 4º, §1º, I, usa.'],why:'Para ME/EPP, o empate ficto pode decidir a disputa. Para empresa de maior porte, a regra do Edital 3.6 é favorável.',todo:'ME/EPP: declarar o porte no sistema (Edital 5.7) e, se o benefício for negado, manifestar intenção de recurso na sessão (Edital 13.3.1).'},
 {g:'media',tipo:'TR × ETP',t:'Itens 4 e 5 com numeração trocada',a:['TR 1.1 · Edital · Ata 2.1','Item 4 = calça de moletom (R$ 58,30). Item 5 = casaco de moletom (R$ 108,59).'],b:['ETP p. 49','Especificação "Item 4 - Casaco de moletom" e "Item 5 - Calça de moletom".'],why:'Cotar pelo número do ETP põe o casaco a R$ 58,30 (prejuízo) ou a calça acima do máximo (desclassificação).',todo:'Cotar pelo nome da peça e pela tabela do TR 1.1, que prevalece sobre o ETP.'},
 {g:'media',tipo:'ETP × arquivo',t:'Desenhos dos modelos não publicados',a:['ETP p. 48–49','"As imagens ilustrativas dos modelos licitados constam no anexo deste ETP"; marca "conforme desenho acima ilustrado".'],b:['Arquivo publicado (75 páginas)','Nenhuma imagem dos modelos. Casaco e calça têm a marca "em dimensões proporcionais à peça", sem medida.'],why:'Marca com falha ou fora de posição é motivo de recusa (ETP p. 51). Sem os desenhos, o molde e a tela de serigrafia ficam incertos.',todo:'Pedir os desenhos e o manual da marca IFB por e-mail. Antes de produzir, pedir ao fiscal a aprovação de uma peça-piloto de cada item.'},
 {g:'media',tipo:'TR × ETP',t:'Capital mínimo: sempre ou só com índice ruim',a:['TR 9.25','Capital mínimo de 5% do valor estimado só se LG, LC ou SG for 1 ou menos.'],b:['ETP p. 44','"A empresa contemplada deverá apresentar 5% do valor total estimado da contratação de capital mínimo dos dois últimos exercícios", sem condição.'],why:'5% são R$ 137.728,99. Vale o TR, que é anexo do Edital, mas o pregoeiro pode ler o ETP.',todo:'Ter à mão contrato social ou balanço com capital de pelo menos R$ 137.728,99, por cautela.'},
 {g:'baixa',tipo:'TR × Ata',t:'Base da garantia de 4% num registro de preços',a:['TR 4.14','Garantia de 4% do "valor total da contratação".'],b:['Contrato 5.3 · Ata 5.2','O valor do contrato é estimativo; as compras saem por empenho, conforme a demanda.'],why:'Não fica claro se a base é o valor total registrado (R$ 110.183,19 no valor máximo) ou o de cada contrato. O Edital 14.9 ainda cita "garantia de proposta", que não é exigida.',todo:'Orçar a garantia sobre o valor total adjudicado e confirmar a base na convocação.'},
 {g:'baixa',tipo:'Dentro do ETP',t:'Tolerância das medidas',a:['ETP p. 50–51, tabelas','Medidas com tolerância de ± 2 cm.'],b:['ETP p. 51, critérios','"Tolerância máxima de ± 5%".'],why:'Num comprimento de 71 cm, 5% são 3,55 cm, mais que os 2 cm da tabela.',todo:'Produzir dentro de ± 2 cm, que atende às duas regras.'},
 {g:'baixa',tipo:'Dentro do ETP',t:'Sigla IFB nas costas com medidas diferentes',a:['ETP p. 49, item 1','Sigla com 5 cm × 3,44 cm; marca da frente a 7,25 cm do decote.'],b:['ETP p. 49, modelo 2','Sigla com 5,0 cm × 6 cm; marca da frente a 7,5 cm do decote.'],why:'Pode ser intencional ou erro. Muda a tela de serigrafia de cada modelo.',todo:'Seguir a medida de cada modelo e confirmar na peça-piloto.'},
 {g:'baixa',tipo:'Edital',t:'Número do pregão e falhas formais',a:['Edital, cabeçalho','Documento "Edital 25/2026".'],b:['Edital p. 1–2 · TR 2.2','Pregão Eletrônico nº 24/2026 (identificador 158143-24/2026). O PCA aparece na classe "7610 - Livros e folhetos".'],why:'25/2026 é o número do artefato no sistema; o pregão é o 24/2026. A classe do PCA não é de uniformes. Sem efeito no preço.',todo:'Usar "Pregão Eletrônico nº 24/2026" na proposta e nos e-mails.'}
];

const MATRIZ=[
 {g:'Habilitação',itens:[
  {id:'sicaf',t:'SICAF e Compras.gov.br regulares',d:'Condições atendidas até 19/11/2026 (3º dia útil antes da sessão)',src:'Edital 3.1–3.2',elim:true},
  {id:'sozinha',t:'Participar sozinha',d:'Consórcio e cooperativa não podem participar',src:'Edital 3.7.11–3.7.12',elim:true},
  {id:'atest',t:'Atestado de produção de 5.000 peças',d:'Soma de atestados de contratos simultâneos é aceita',src:'TR 9.30',elim:true},
  {id:'indices',t:'LG, LC e SG acima de 1 nos 2 últimos exercícios',d:'Ou capital mínimo de R$ 137.728,99 (5%)',src:'TR 9.24–9.26',elim:true},
  {id:'falencia',t:'Certidão negativa de falência',d:'Da sede da empresa',src:'TR 9.23',elim:false},
  {id:'sancoes',t:'Sem sanções e sem Cadin',d:'CEIS, CNEP, lista do TCU; Cadin na assinatura',src:'Edital 8.1, 10.6',elim:true}
 ]},
 {g:'Produto e amostras',itens:[
  {id:'amostras',t:'18 amostras de tecido em 7 dias úteis',d:'6 tecidos × 3 peças de 30 × 30 cm, no Campus Planaltina',src:'TR 4.3–4.7',elim:true},
  {id:'malha',t:'Meia-malha e ribana 100% algodão, a partir de 150 g/m²',d:'Verde PANTONE 362 C e branca',src:'ETP p. 49–51',elim:true},
  {id:'moletom',t:'Moletom de 180 a 250 g/m²',d:'Composição a confirmar: 100% algodão × 60/40',src:'ETP p. 49–51 · TR 4.7.1',elim:false},
  {id:'estampa',t:'Serigrafia da marca IFB, 7 tamanhos e etiqueta têxtil',d:'PP a EXGG, tabela de medidas ± 2 cm',src:'ETP p. 49–51',elim:false}
 ]},
 {g:'Produção e entrega',itens:[
  {id:'propria',t:'Produção própria, sem subcontratar',d:'Facção terceirizada conta como subcontratação',src:'TR 4.13',elim:true},
  {id:'capacidade',t:'Capacidade para até 47.139 peças em 60 dias',d:'Se o IFB empenhar tudo de uma vez',src:'TR 5.1',elim:false},
  {id:'entrega',t:'Entrega nos 10 campi do DF',d:'Remessa única por empenho, frete por conta da empresa',src:'TR 5.1–5.3',elim:false},
  {id:'troca',t:'Troca de peças com defeito em 7 dias úteis',d:'Durante 90 dias após o recebimento definitivo',src:'TR 5.4–5.6',elim:false}
 ]},
 {g:'Finanças',itens:[
  {id:'garantia',t:'Garantia de 4% do valor contratado',d:'Cerca de R$ 110 mil no valor máximo',src:'TR 4.14–4.15',elim:false},
  {id:'giro',t:'Capital para produzir antes de receber',d:'Cerca de 110 dias entre a compra do tecido e o pagamento',src:'TR 5.1, 8.3–8.19',elim:false},
  {id:'preco',t:'Preço que aguenta até 31/08/2027 sem reajuste',d:'Depois, IPCA',src:'TR 8.28–8.29',elim:false}
 ]}
];

const KIT=[
 {g:'Cadastro da proposta',prazo:'até 25/11 · 8h · Edital 5.2',itens:[
  {id:'k-precos',t:'Preço unitário e total dos 5 itens',d:'Cada um abaixo do máximo do TR 1.1, com a quantidade total · Edital 6.1, 6.2.1'},
  {id:'k-desc',t:'Descrição das peças conforme o ETP',d:'Tecido, gramatura, cor e estampa: a descrição vincula a empresa · Edital 6.2'},
  {id:'k-decl',t:'Declarações nos campos do sistema',d:'Edital 5.4; ME/EPP (5.7) e programa de integridade (5.9), se for o caso'},
  {id:'k-valid',t:'Validade da proposta de 60 dias',d:'Edital 6.9'}
 ]},
 {g:'Proposta ajustada ao lance',prazo:'2 horas · Edital 7.25.5',itens:[
  {id:'k-ajust',t:'Planilha dos 5 preços unitários pronta para ajustar',d:'Nenhum item acima do máximo · TR 9.3'},
  {id:'k-ficha',t:'Ficha técnica dos tecidos',d:'Por cautela: composição e gramatura; laudo pode ser pedido · ETP p. 51'}
 ]},
 {g:'Habilitação',prazo:'2 horas · Edital 9.11.1',itens:[
  {id:'k-atest',t:'Atestados de produção somando 5.000 peças',d:'TR 9.30.1.1'},
  {id:'k-contr',t:'Contratos ou notas fiscais dos atestados',d:'Podem ser pedidos · TR 9.30.4'},
  {id:'k-bal',t:'Balanço e DRE dos 2 últimos exercícios',d:'Com LG, LC e SG, se não estiverem no SICAF · TR 9.24'},
  {id:'k-cap',t:'Comprovante de capital mínimo de R$ 137.728,99',d:'Se algum índice for 1 ou menos · TR 9.25'},
  {id:'k-fal',t:'Certidão negativa de falência',d:'TR 9.23'}
 ]},
 {g:'Amostras de tecido',prazo:'7 dias úteis · TR 4.4',itens:[
  {id:'k-amo1',t:'Meia-malha 100% algodão: 3 brancas e 3 verdes',d:'30 × 30 cm · verde PANTONE 362 C'},
  {id:'k-amo2',t:'Ribana 100% algodão: 3 verdes e 3 brancas',d:'30 × 30 cm'},
  {id:'k-amo3',t:'Tecido 60% algodão e 40% poliéster: 3 verdes e 3 brancas',d:'Mais uma de moletom 100% algodão, por cautela'},
  {id:'k-envio',t:'Envio ao Campus Planaltina combinado',d:'Rodovia DF-128, km 21 · atraso é risco da empresa'}
 ]},
 {g:'Assinatura da ata e do contrato',prazo:'5 dias · Edital 10.2, 11.1',itens:[
  {id:'k-gar',t:'Garantia de 4% contratada',d:'Seguro até a assinatura; demais modalidades em 10 dias úteis · TR 4.15'},
  {id:'k-cadin',t:'Consulta ao Cadin sem pendência',d:'Edital 10.6'},
  {id:'k-piloto',t:'Desenhos da marca e peça-piloto pedidos ao IFB',d:'Por cautela, antes de cortar o tecido'}
 ]}
];

const SIM_PARAMS=[
 {k:'trib',l:'Tributos sobre o faturamento',h:'ICMS, PIS, COFINS, IRPJ e CSLL do seu regime, ou Simples',u:'%',def:16},
 {k:'adm',l:'Despesas indiretas',h:'sobre o custo direto: administração, energia, perdas de corte',u:'%',def:10},
 {k:'glosa',l:'Perdas por recusa e troca',h:'peças recusadas na entrega ou na garantia (TR 8.2, 5.6)',u:'%',def:1},
 {k:'marg',l:'Margem líquida desejada',h:'sobre o valor do lance',u:'%',def:8},
 {k:'ciclo',l:'Ciclo até receber',h:'até 60 dias de produção + cerca de 50 até o pagamento',u:'dias',def:110},
 {k:'juros',l:'Custo do capital de giro',h:'taxa mensal do seu financiamento',u:'%/mês',def:1.5},
 {k:'garan',l:'Custo anual da garantia',h:'prêmio do seguro sobre os 4% garantidos',u:'%/ano',def:1.5}
];
const SIM_DEF=()=>{const o={lance:2100000}; COMPONENTS.forEach(c=>{if(!c.fixed)o['c_'+c.k]=c.def}); SIM_PARAMS.forEach(p=>o[p.k]=p.def); return o;};

const SECTIONS=[
 {id:'ficha',sec:'ficha',nome:'Ficha do edital',etapa:1},
 {id:'condicoes',sec:'cond',nome:'Condições gerais',etapa:1},
 {id:'garantias',sec:'risco',nome:'Garantias',etapa:1},
 {id:'operacao',sec:'oper',art:'entrega',nome:'Entrega e amostras',etapa:1},
 {id:'uniformes',sec:'oper',art:'unif',nome:'Especificação dos uniformes',etapa:1},
 {id:'qualificacao',sec:'qual',nome:'Qualificação',etapa:2},
 {id:'declaracoes',sec:'decl',nome:'Declarações',etapa:2},
 {id:'conflitos',sec:'conf',nome:'Conflitos',etapa:2},
 {id:'planilha',sec:'plan',nome:'Quadro de preços',etapa:2},
 {id:'matriz',sec:'matriz',nome:'Matriz de aderência',etapa:3},
 {id:'kit',sec:'kit',nome:'Kit das 2 horas',etapa:3},
 {id:'simulador',sec:'simul',nome:'Simulador de lance',etapa:4},
 {id:'riscos',sec:'risco',nome:'Caixa e riscos',etapa:4},
 {id:'parecer',sec:'parecer',nome:'Parecer final',etapa:5}
];

const IMP=[2026,11,19];
const nAlta=()=>CONFLITOS.filter(c=>c.g==='alta').length;
const prazoTxt=()=>{const n=daysUntil(...IMP); return n<0?'encerrado':n===0?'hoje':n+(n===1?' dia':' dias');};
const TAKE={
 ficha:()=>'Pregão eletrônico para registro de preços, menor preço por grupo (grupo único com 5 itens), disputa aberta e fechada, sem benefício para ME/EPP. Os dados básicos e o objeto completo estão abaixo.',
 condicoes:()=>'Ata de 12 meses, sem adesão de outros órgãos e sem acréscimo de quantidades. O IFB não é obrigado a comprar tudo. A camiseta manga curta modelo 2 é 41% do valor.',
 garantias:()=>'Não há garantia de proposta. A garantia de contrato é de 4% (R$ 110.183,19 no valor máximo) e os uniformes têm garantia de 90 dias.',
 operacao:()=>'Entrega em até 60 dias após cada empenho, em remessa única, nos 10 campi do DF. Amostras de tecido em 7 dias úteis no Campus Planaltina.',
 uniformes:()=>'5 peças em malha de algodão e moletom, verde PANTONE 362 C, 7 tamanhos, marca IFB em serigrafia. A composição do moletom é ambígua (ver Conflitos).',
 qualificacao:()=>'Para habilitar: atestado de produção de 5.000 peças e índices LG, LC e SG acima de 1 (ou capital mínimo de R$ 137.728,99).',
 declaracoes:()=>'As declarações padrão vão em campos do sistema. Fora do SICAF: atestados, demonstrações contábeis, amostras de tecido e, na assinatura, a garantia.',
 conflitos:()=>nAlta()+' pontos podem mudar seu preço ou te inabilitar. O prazo para questionar venceu em 19/11 ('+leftTxt(daysUntil(...IMP))+'); o IFB não é obrigado a responder pedido fora do prazo.',
 planilha:()=>'Os preços unitários do TR 1.1 são o máximo aceitável por item. Planaltina e Brasília recebem 58% das peças.',
 matriz:()=>{const s=matrizSummary(); return s.title+': '+s.evaluated+' de '+s.all.length+' requisitos avaliados.';},
 kit:()=>{const a=KIT.flatMap(g=>g.itens),d=a.filter(i=>state.kit.done[i.id]).length; return d+' de '+a.length+' documentos prontos. Documento fora das 2 horas ou amostra fora dos 7 dias úteis pode custar a vaga.';},
 simulador:()=>{const r=calc(state.sim); return isFinite(r.Pmin)?'Com os custos informados, seu lance mínimo é '+fmt0(r.Pmin)+' (desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+')'+(isDefault()?', ainda com custos de exemplo.':'.'):'Com os percentuais atuais, nenhum preço cobre os custos.';},
 riscos:()=>{const r=calc(state.sim); return 'Com pedidos ao longo do ano, reserve cerca de '+fmt0(r.K)+' de capital de giro. Se o IFB empenhar tudo de uma vez, a produção inteira (cerca de '+fmt0(r.C)+') sai do caixa antes do pagamento.';},
 parecer:()=>{const p=parecerCalc(); return p.title+(p.title.endsWith('…')?' ':'. ')+(state.parecer.decisao?'O parecer da empresa já foi registrado.':'Registre a decisão da empresa no fim desta página.');}
};
const HN={
 ficha:()=>[{v:'R$ 2,75 mi',l:'valor máximo da ata',c:'gold'},{v:'25/11',l:'sessão pública, às 8h',c:'ink'},{v:'47.139',l:'peças em 5 itens',c:'ink'}],
 condicoes:()=>[{v:'12 meses',l:'validade da ata, prorrogável',c:'ink'},{v:'41%',l:'do valor na camiseta manga curta modelo 2',c:'blue'},{v:'31/08/2027',l:'preço fixo até esta data',c:'ink'}],
 garantias:()=>[{v:'4%',l:'garantia do contrato',c:'gold'},{v:'R$ 110 mil',l:'no valor máximo',c:'gold'},{v:'90 dias',l:'garantia dos uniformes',c:'ink'}],
 operacao:()=>[{v:'60 dias',l:'para entregar cada empenho',c:'blue'},{v:'10',l:'campi para entregar',c:'ink'},{v:'7 dias úteis',l:'para entregar as amostras',c:'red'}],
 uniformes:()=>[{v:'5',l:'modelos de peça',c:'ink'},{v:'7',l:'tamanhos, de PP a EXGG',c:'ink'},{v:'362 C',l:'verde PANTONE do IFB',c:'green'}],
 qualificacao:()=>[{v:'5.000',l:'peças em atestado',c:'red'},{v:'> 1',l:'índices LG, LC e SG',c:'ink'},{v:'R$ 138 mil',l:'capital mínimo alternativo',c:'gold'}],
 declaracoes:()=>[{v:'2 h',l:'para a proposta ajustada',c:'red'},{v:'2 h',l:'para a habilitação fora do SICAF',c:'red'},{v:'18',l:'amostras de tecido',c:'ink'}],
 conflitos:()=>[{v:String(nAlta()),l:'de alta gravidade',c:'red'},{v:String(CONFLITOS.length),l:'pontos no total',c:'ink'},{v:prazoTxt(),l:'prazo para questionar (até 19/11)',c:'red'}],
 planilha:()=>[{v:'R$ 2,75 mi',l:'valor máximo do grupo',c:'gold'},{v:'R$ 58,43',l:'preço médio por peça',c:'ink'},{v:'58%',l:'das peças em Planaltina e Brasília',c:'blue'}],
 matriz:()=>{const s=matrizSummary(); return [{v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,l:'atendidos, com ou sem ajuste',c:'green'},{v:String(s.c.verificar),l:'a verificar',c:'ink'},{v:String(s.blockers.length),l:'bloqueios eliminatórios',c:'red'}];},
 kit:()=>{const g=KIT.map(x=>x.itens.filter(i=>state.kit.done[i.id]).length+' de '+x.itens.length); const a=KIT.flatMap(x=>x.itens); return [{v:a.filter(i=>state.kit.done[i.id]).length+' de '+a.length,l:'documentos prontos',c:'green'},{v:g[2],l:'habilitação',c:'ink'},{v:g[3],l:'amostras',c:'ink'}];},
 simulador:()=>{const r=calc(state.sim), ok=isFinite(r.Pmin); return [{v:ok?fmtMi(r.Pmin):'—',l:'lance mínimo viável',c:'blue'},{v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',l:'desconto máximo',c:'blue'},{v:isFinite(r.margL)?pct(r.margL):'—',l:'margem no lance testado',c:r.margL<0?'red':'green'}];},
 riscos:()=>{const r=calc(state.sim); return [{v:fmtMi(r.K),l:'capital de giro (pedidos no ano)',c:'gold'},{v:fmtMi(r.C),l:'custo se pedir tudo de uma vez',c:'red'},{v:'~110 dias',l:'da compra do tecido ao pagamento',c:'ink'}];},
 parecer:()=>{const p=parecerCalc(); return [{v:p.title,l:'recomendação calculada',c:'gold'},{v:Math.round(overallProgress()*100)+'%',l:'da análise concluída',c:'ink'},{v:String(p.steps.length),l:'próximos passos',c:'ink'}];}
};
const CARD={
 ficha:()=>({m:'R$ 2,75 mi',s:'sessão em 25/11 · 8h'}),
 condicoes:()=>({m:'Ata de 12 meses',s:'sem adesão · compra não obrigatória'}),
 garantias:()=>({m:'4% do contrato',s:'sem garantia de proposta'}),
 operacao:()=>({m:'60 dias',s:'por empenho · 10 campi',c:'warn'}),
 uniformes:()=>({m:'5 peças',s:'malha e moletom · 7 tamanhos'}),
 qualificacao:()=>({m:'5.000 peças',s:'atestado eliminatório',c:'alert'}),
 declaracoes:()=>({m:'2 horas',s:'proposta ajustada e habilitação',c:'warn'}),
 conflitos:()=>({m:CONFLITOS.length+' pontos',s:nAlta()+' de alta gravidade · prazo encerrado',c:'alert'}),
 planilha:()=>({m:'5 itens',s:'47.139 peças em 10 campi'}),
 matriz:()=>{const s=matrizSummary(); return {m:(s.c.atende+s.c.ajuste)+' de '+s.all.length,s:s.title,c:s.kind==='go'?'ok':s.kind==='nogo'?'alert':'warn'};},
 kit:()=>{const a=KIT.flatMap(x=>x.itens), d=a.filter(i=>state.kit.done[i.id]).length; return {m:d+' de '+a.length,s:'documentos prontos',c:d===a.length?'ok':''};},
 simulador:()=>{const r=calc(state.sim); return {m:isFinite(r.Pmin)?fmtMi(r.Pmin):'—',s:'lance mínimo viável'+(isDefault()?' · exemplo':'')};},
 riscos:()=>{const r=calc(state.sim); return {m:fmtMi(r.K),s:'capital de giro até receber'};},
 parecer:()=>{const p=parecerCalc(); return {m:p.title,s:state.parecer.decisao?'decisão registrada':'registrar a decisão',c:p.kind==='go'?'ok':p.kind==='nogo'?'alert':'warn'};}
};

/* ---------------- tabelas do edital ---------------- */
const NUM0=n=>NUM.format(n);
function renderTabelas(){
  const tot=ITENS.map(it=>Math.round(it[3]*it[4]*100)/100);
  /* composição do valor por item (Condições gerais) */
  $('stack').innerHTML=ITENS.map((it,i)=>'<i style="width:'+(tot[i]/REF*100)+'%;background:'+ITEM_COR[i]+'" title="'+esc(it[1])+'"></i>').join('');
  $('legend').innerHTML=ITENS.map((it,i)=>'<li><span class="sw" style="background:'+ITEM_COR[i]+'"></span><span><b>'+it[0]+'. '+it[1]+'</b> <span class="hint">· '+NUM0(it[3])+' peças a '+fmt(it[4])+'</span></span><span class="r">'+fmt(tot[i])+'</span><span class="r p">'+pct(tot[i]/REF)+'</span></li>').join('')+'<li><span></span><span><b>Total do grupo</b> <span class="hint">· '+NUM0(PECAS)+' peças</span></span><span class="r"><b>'+fmt(REF)+'</b></span><span class="r p">100%</span></li>';
  /* quadro de preços */
  $('planTiles').innerHTML=ITENS.map((it,i)=>'<div class="tile t'+(i+1)+'"><span class="k">'+it[0]+'. '+it[1]+'</span><span class="v">'+fmt0(tot[i])+'</span><span class="s">'+NUM0(it[3])+' × '+fmt(it[4])+' · '+pct(tot[i]/REF)+'</span></div>').join('')+'<div class="tile t6"><span class="k">Total do grupo</span><span class="v">'+fmt0(REF)+'</span><span class="s">'+NUM0(PECAS)+' peças · valor máximo</span></div>';
  $('itTable').querySelector('tbody').innerHTML=ITENS.map((it,i)=>'<tr><td>'+it[0]+'</td><td><b>'+it[1]+'</b></td><td>'+it[2]+'</td><td class="r">'+NUM0(it[3])+'</td><td class="r">'+fmt(it[4])+'</td><td class="r">'+fmt(tot[i])+'</td></tr>').join('')+'<tr class="tot"><td></td><td><b>Total do grupo 1</b></td><td></td><td class="r"><b>'+NUM0(PECAS)+'</b></td><td></td><td class="r"><b>'+fmt(REF)+'</b></td></tr>';
  let h='', sq=[0,0,0,0,0];
  CAMPI.forEach(c=>{const p=c[2].reduce((a,b)=>a+b,0), v=c[2].reduce((a,q,i)=>a+q*ITENS[i][4],0); c[2].forEach((q,i)=>sq[i]+=q); h+='<tr><td><b>'+c[1]+'</b><span class="sub">'+c[0]+'</span></td>'+c[2].map(q=>'<td class="r">'+(q?NUM0(q):'—')+'</td>').join('')+'<td class="r"><b>'+NUM0(p)+'</b></td><td class="r">'+fmt0(v)+'</td><td class="r">'+pct(p/PECAS)+'</td></tr>';});
  h+='<tr class="tot"><td>Total</td>'+sq.map(q=>'<td class="r">'+NUM0(q)+'</td>').join('')+'<td class="r">'+NUM0(PECAS)+'</td><td class="r">'+fmt0(REF)+'</td><td class="r">100%</td></tr>';
  $('campTable').querySelector('tbody').innerHTML=h;
  /* grade de tamanhos */
  const st=TAMS.map((t,j)=>GRADE.reduce((a,g)=>a+g[j],0));
  $('gradeTable').querySelector('tbody').innerHTML=ITENS.map((it,i)=>'<tr><td><b>'+it[0]+'. '+it[1]+'</b></td>'+GRADE[i].map(q=>'<td class="r">'+NUM0(q)+'</td>').join('')+'<td class="r"><b>'+NUM0(it[3])+'</b></td></tr>').join('')+'<tr class="tot"><td>Total</td>'+st.map(q=>'<td class="r">'+NUM0(q)+'</td>').join('')+'<td class="r">'+NUM0(PECAS)+'</td></tr>';
  /* custo de exemplo por peça */
  const lab=['Tecido','Confecção','Estampa','Aviamentos e embalagem','Frete'];
  let e='<thead><tr><th>Item</th>'+lab.map(l=>'<th class="r">'+l+'</th>').join('')+'<th class="r">Custo por peça</th><th class="r">Preço máximo</th><th class="r">Custo ÷ máximo</th></tr></thead><tbody>';
  ITENS.forEach((it,i)=>{const c=EX[i].reduce((a,b)=>a+b,0); e+='<tr><td><b>'+it[0]+'. '+it[1]+'</b></td>'+EX[i].map(x=>'<td class="r">'+fmt(x)+'</td>').join('')+'<td class="r"><b>'+fmt(c)+'</b></td><td class="r">'+fmt(it[4])+'</td><td class="r">'+pct(c/it[4])+'</td></tr>';});
  const ct=[0,1,2,3,4].map(exTot), cs=ct.reduce((a,b)=>a+b,0);
  e+='<tr class="tot"><td>Total (× quantidades)</td>'+ct.map(x=>'<td class="r">'+fmt0(x)+'</td>').join('')+'<td class="r">'+fmt0(cs)+'</td><td class="r">'+fmt0(REF)+'</td><td class="r">'+pct(cs/REF)+'</td></tr></tbody>';
  $('exTable').innerHTML=e;
}

/* ---------------- riscos ---------------- */
function renderRiscos(r){
  const L=r.L>0?r.L:REF;
  const T=[
   ['Faturamento médio por mês',fmt0(L/12),'lance ÷ 12 meses da ata','t4'],
   ['Garantia de 4%',fmt0(L*0.04),'seguro até a assinatura · TR 4.14','t1'],
   ['Capital de giro estimado',fmt0(r.K),'pedidos espalhados no ano · '+NUM.format(state.sim.ciclo)+' dias','t5'],
   ['Pedido único (pior caso)',fmt0(r.C),'custo de produzir tudo antes de receber','t3']
  ];
  $('riskTiles').innerHTML=T.map(t=>'<div class="tile '+t[3]+'"><span class="k">'+t[0]+'</span><span class="v">'+t[1]+'</span><span class="s">'+t[2]+'</span></div>').join('');
}
function renderMulta(){
  const v=parseNum($('mul-v').value), d=Math.max(0,Math.min(30,parseNum($('mul-d').value)));
  const m=v*0.10*d;
  $('mulOut').innerHTML=svg('alert')+'<p>'+NUM.format(d)+' dia(s) de atraso sobre uma parcela de '+fmt(v)+': multa de <b>'+fmt(m)+'</b> ('+pct(m/(v||1),0)+' da parcela). Pela regra de inexecução total, a multa seria de '+fmt(v*0.07)+' a '+fmt(v*0.09)+' (7% a 9%).</p>';
}
['mul-v','mul-d'].forEach(id=>$(id).addEventListener('input',renderMulta));

const E={
  slug:'pe-24-2026-ifb', docPrefix:'editais/pe-24-2026-ifb/', lsPrefix:'pe24ifb-',
  ref:REF, teto:REF, garantiaPct:0.04, giro:'mensal',
  sessao:[2026,11,25], sessaoNome:'Sessão', chip:'R$ 2,75 mi · grupo único',
  deadlines:[
   {d:[2026,11,19],lbl:'19/11',t:'Último dia para impugnar e pedir esclarecimento',s:'3 dias úteis antes da sessão · Edital 15.1 · e-mail ',mail:'licitacoes@ifb.edu.br'},
   {d:[2026,11,19],lbl:'19/11',t:'SICAF com condições atendidas',s:'3º dia útil antes da sessão · Edital 3.2'},
   {d:[2026,11,24],lbl:'24/11',t:'Limite para o IFB responder',s:'Último dia útil antes da sessão · Edital 15.2'},
   {d:[2026,11,25],lbl:'25/11 · 8h',t:'Sessão pública no Compras.gov.br',s:'Proposta cadastrada até a abertura · Edital 5.2'}
  ],
  prazoQuestionar:IMP,
  sim:{
    tetoNome:'valor máximo', refNome:'valor máximo', artExeq:'Edital 8.8–8.10', artAcima:'Edital 8.7.3',
    tetoLabel:()=>'Máximo<br>R$ 2,75 mi',
    minSub:r=>'≈ '+fmt(r.Pmin/PECAS)+' por peça, em média',
    margSub:r=>'≈ '+fmt0(r.margL*r.L)+' se o IFB comprar tudo',
    descValue:(r,ok,ref)=>ok?(r.Pmin<ref?pct(1-r.Pmin/ref):'sem desconto'):'—',
    passo:()=>0.05,
    extraAlerts:r=>{ if(!(r.L>0)) return []; const f=r.L/REF; return [['warn','Na proposta ajustada, cada preço unitário fica abaixo do máximo do item (TR 9.3). Com desconto igual em todos os itens, este lance dá '+fmt(51*f)+' na camiseta manga curta, '+fmt(58.30*f)+' na calça e '+fmt(108.59*f)+' no casaco.']]; }
  },
  kpis(x){ const {s,r,exemplo,ok}=x; const dImp=daysUntil(...IMP); return [
   {href:'planilha',k:'Valor máximo da ata',v:'R$ 2,75 mi',c:'gold',s:'grupo único · 5 itens · 47.139 peças'},
   {href:'simulador',k:'Desconto máximo viável',v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',c:'blue',s:ok?'lance mínimo '+fmtMi(r.Pmin)+(exemplo?' (custos de exemplo)':''):'revise o simulador'},
   {href:'conflitos',k:'Conflitos graves',v:String(nAlta()),c:'red',s:'prazo para questionar: 19/11 ('+leftTxt(dImp)+')'},
   {href:'matriz',k:'Requisitos atendidos',v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,c:'green',s:s.c.verificar?s.c.verificar+' a verificar na matriz':(s.blockers.length?s.blockers.length+' bloqueio(s)':'todos avaliados')}
  ]; },
  precoTxt:r=>'Lance mínimo de '+fmt0(r.Pmin)+', desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+'.'+(r.Pmin<0.5*REF?' Abaixo de 50% do valor máximo: exige prova de exequibilidade.':''),
  riscosTxt:d=>'Composição do moletom, multa de 10% ao dia e atestado de produção. Prazo para questionar: 19/11 ('+leftTxt(d)+').',
  prepTxt:(r,L)=>'Documentos das 2 horas e amostras prontos. Caixa: cerca de '+fmt0(r.K)+' de capital de giro e '+fmt0(L*0.04)+' de garantia.',
  passoBloqueio:'Avaliar parceria que supra essas exigências (sem consórcio nem subcontratação, que o edital veda) antes de desistir.',
  exeqStep:'Preparar a prova de exequibilidade do preço (Edital 8.8 a 8.10).',
  questionarStep:a=>'Decidir até 19/11 se vai pedir esclarecimento ou impugnar os '+a+' pontos de alta gravidade.',
  stepsGo:['Separar as 18 amostras de tecido para enviar em até 7 dias úteis.','Cadastrar a proposta no Compras.gov.br antes de 25/11, às 8h.'],
  init(){ renderTabelas(); renderMulta(); },
  onSim(r){ renderRiscos(r); }
};
