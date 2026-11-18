/* ===== Edital: Pregão Eletrônico 90029/2026 (Edital 27/2026) · Anvisa · Lotes 02 (Goiás) e 05 (Norte) ===== */
/* ---------------- dados ---------------- */
const REF=11004440.40; // TR 1.1 e 10.1 · 60 meses · Lote 02 + Lote 05
const MESES=60;
const fmtK=n=>'R$ '+Math.round(n/1000).toLocaleString('pt-BR')+' mil';
const fmtU=n=>'R$ '+n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:n<10?4:2});
Object.assign(ILLU,{
 frota:'<path d="M14 64V46l14-2 12-14h38l10 14h46c3 0 6 3 6 6v14"/><path d="M14 64h14M52 64h60M136 64h14"/><path d="M46 44l8-10h20v10z"/><path d="M88 44V30" opacity=".45"/><circle class="acc" cx="40" cy="64" r="9"/><circle class="acc" cx="124" cy="64" r="9"/><path d="M98 52h44" opacity=".45"/>',
 motor:'<circle cx="80" cy="46" r="30"/><circle class="acc" cx="80" cy="46" r="7"/><path d="M50 46h23M87 46h23M80 53v23"/><path class="acc" d="M62 22c10-6 26-6 36 0"/><path d="M28 84h104" opacity=".4"/>'
});
const COMPONENTS=[
 {k:'mot',  nome:'Motoristas', det:'11 postos · GO 5 e Norte 6 · dedicação exclusiva', v:4584782.40, cor:'var(--green)', def:70},
 {k:'ev',   nome:'Diárias avulsas e excedentes', det:'65 diárias por mês · subcontratação permitida', v:2872368.00, cor:'var(--steel)', def:65},
 {k:'fix',  nome:'Aluguel fixo dos carros', det:'10 carros 0 km · pago cheio todo mês', v:2543785.80, cor:'var(--blue)', def:55},
 {k:'km',   nome:'Km rodado dos carros fixos', det:'8.888 km por mês · combustível e manutenção', v:621616.20, cor:'var(--gold)', def:70},
 {k:'pern', nome:'Pernoites', det:'20 por mês · repasse integral ao motorista', v:381888.00, cor:'var(--amber)', fixed:true}
];
const LOTES=[
 {n:'Lote 02 · Goiás',ref:4615609.80,v:{mot:2588261.40,ev:916615.20,fix:769237.80,km:219999.00,pern:121496.40},q:{mot:'5 postos',ev:'22 diárias',fix:'4 carros',km:'3.720 km',pern:'6 pernoites'}},
 {n:'Lote 05 · Norte',ref:6388830.60,v:{mot:1996521.00,ev:1955752.80,fix:1774548.00,km:401617.20,pern:260391.60},q:{mot:'6 postos',ev:'43 diárias',fix:'6 carros',km:'5.168 km',pern:'14 pernoites'}}
];
// [item, lote, descrição, unidade, quantidade por mês, valor mensal, alerta]
const ITENS=[
 [1,2,'Posto de motorista · veículo básico permanente','posto',2,15554.52,''],
 [2,2,'Locação de veículo básico permanente (custo fixo)','unidade',2,4567.50,''],
 [3,2,'Locação de veículo básico permanente (custo variável)','km',1424,1139.39,''],
 [4,2,'Pernoite básico permanente','pernoite',2,674.98,''],
 [5,2,'Posto de motorista · veículo 4x4 permanente','posto',1,6291.27,''],
 [6,2,'Locação de veículo 4x4 permanente (custo fixo)','unidade',1,4562.62,''],
 [7,2,'Locação de veículo 4x4 permanente (custo variável)','km',824,1116.07,''],
 [8,2,'Pernoite 4x4 permanente','pernoite',1,337.49,''],
 [9,2,'Posto de motorista · veículo executivo permanente','posto',2,21291.90,''],
 [10,2,'Locação de veículo executivo permanente (custo fixo)','unidade',1,3690.51,''],
 [11,2,'Locação de veículo executivo permanente (custo variável)','km',1472,1411.19,''],
 [12,2,'Pernoite executivo permanente','pernoite',3,1012.47,''],
 [13,2,'Locação de veículo básico eventual','diária',20,12337.25,''],
 [14,2,'Km excedente básico eventual','km',75,130.46,''],
 [15,2,'Hora excedente básico eventual','hora',2,139.48,''],
 [16,2,'Locação de veículo 4x4 eventual','diária',2,2224.77,''],
 [17,2,'Km excedente 4x4 eventual','km',80,222.48,''],
 [18,2,'Hora excedente "básico" eventual','hora',2,222.48,'preço de 4x4'],
 [19,5,'Posto de motorista · veículo "4x4" permanente','posto',1,5445.88,'serve ao básico'],
 [20,5,'Locação de veículo básico permanente (custo fixo)','unidade',1,2283.75,''],
 [21,5,'Locação de veículo básico permanente (custo variável)','km',917,766.05,''],
 [22,5,'Pernoite básico permanente','pernoite',2,619.98,''],
 [23,5,'Posto de motorista · veículo 4x4 permanente','posto',5,27829.47,''],
 [24,5,'Locação de veículo 4x4 permanente (custo fixo)','unidade',5,27292.05,''],
 [25,5,'Locação de veículo 4x4 permanente (custo variável)','km',4251,5927.57,''],
 [26,5,'Pernoite 4x4 permanente','pernoite',12,3719.88,''],
 [27,5,'Locação de veículo básico eventual','diária',30,17798.30,''],
 [28,5,'Km excedente básico eventual','km',60,117.68,''],
 [29,5,'Hora excedente básico eventual','hora',2,117.68,''],
 [30,5,'Locação de veículo 4x4 eventual','diária',13,13573.23,''],
 [31,5,'Km excedente 4x4 eventual','km',226,781.51,''],
 [32,5,'Hora excedente "básico" eventual','hora',2,207.48,'preço de 4x4']
];

const CONFLITOS=[
 {g:'alta',tipo:'Dentro do TR',t:'Endereços e planilhas da Anvisa ausentes',a:['TR 5.2, 9.3.3','Locais no Anexo I, quantidades no Anexo II e custos mínimos (salário e alimentação) nos Anexos VI a X.'],b:['TR seção 13 · arquivos recebidos','"Anexo I – Não aplicável à esta contratação". Os Anexos II e VI a XI não vieram nos arquivos analisados.'],why:'Sem endereços não dá para orçar deslocamento, pernoite e rede de apoio. Sem as planilhas da Anvisa não dá para conferir o piso exigido, e piso abaixo do orçado desclassifica (TR 9.3, Edital 8.25–8.26).',todo:'Baixar hoje os anexos no Compras.gov.br e no PNCP. Se não existirem, usar a planilha de quantitativos para os locais e registrar a dúvida no chat da sessão.'},
 {g:'alta',tipo:'Dentro do TR',t:'Capital de giro e patrimônio líquido: 1 ou 2 exercícios, por lote ou somados',a:['TR 9.23.1–9.23.2','CCL de 16,66% e PL de 10% do valor de 12 meses, "tendo por base" o balanço do último exercício.'],b:['TR 9.24','"Os indicadores fixados acima deverão ser atingidos em cada um dos dois últimos exercícios", sob pena de inabilitação.'],why:'Exigência eliminatória sem regra clara. O TR também não diz se, para quem disputa os 2 lotes, os valores somam (R$ 366.667,95 de CCL e R$ 220.088,81 de PL).',todo:'Conferir o balanço no cenário mais exigente: 2 exercícios e valores somados. Se não atender, avaliar disputar só um lote.'},
 {g:'media',tipo:'Dentro do Edital',t:'Lance por item ou por grupo',a:['Edital 1.2, 6.1.1','Licitação em grupos; proposta com valor mensal e total de cada item para 60 meses.'],b:['Edital 7.5, 7.8','"O lance deverá ser ofertado pelo valor unitário do item", com diferença mínima de 1% entre lances.'],why:'Lance por preço unitário de km (cerca de R$ 0,80) ou de hora vira disputa de centavos; no grupo, quem decide é o total do lote.',todo:'Abrir a proposta no sistema antes da sessão para ver como o grupo está configurado. Ter pronta a planilha com todos os preços unitários e o total de cada lote.'},
 {g:'media',tipo:'TR × Planilha',t:'Item 19: posto "4x4" para um carro básico',a:['TR 1.1, item 19','Posto de motorista para veículo 4x4 permanente: 1 posto, R$ 5.445,88 por mês.'],b:['TR 1.1, itens 20–22 · planilha de quantitativos','O Lote 05 tem 1 carro básico sem outro posto; a planilha diz que o item 19 equivale ao veículo básico.'],why:'Afeta o enquadramento do posto e a conferência do piso desse motorista.',todo:'Cotar o item 19 como motorista do carro básico, com o piso da planilha da Anvisa, e deixar a leitura registrada na proposta.'},
 {g:'media',tipo:'Dentro do TR',t:'Itens 18 e 32: hora "básico" com preço de 4x4',a:['TR 1.1, itens 15 e 29','Hora excedente básico eventual: R$ 69,74 (GO) e R$ 58,84 (Norte) por hora.'],b:['TR 1.1, itens 18 e 32','Também chamados de "básico", mas a R$ 111,24 e R$ 103,74 por hora, logo após os itens do 4x4 eventual.'],why:'Na prática são a hora excedente do 4x4. A descrição errada pode gerar confusão ou glosa na medição.',todo:'Cotar 18 e 32 como hora excedente do 4x4, sem passar do preço máximo de cada item.'},
 {g:'media',tipo:'Dentro do TR',t:'Diária avulsa no Lote 02: 300 ou 400 km',a:['TR 1.1, 5.6.7','O Lote 02 é chamado de "Regional Goiás" e também de "Regional Centro-Oeste".'],b:['TR 5.3.2.2','Diária de 300 km nas regionais Sul, Norte, Nordeste e Sudeste e de 400 km na Centro-Oeste. "Goiás" não aparece na regra.'],why:'Define a partir de quanto o km excedente é pago no Lote 02. A planilha de quantitativos usa 400 km.',todo:'Cotar o Lote 02 com diária de 400 km e conferir no anexo de detalhamento.'},
 {g:'media',tipo:'Dentro do TR',t:'R$ 331,04 do motorista do avulso sem item próprio',a:['TR 5.3.2.2','Avulso com mais de 1 diária fora da base: motorista recebe R$ 331,04 antecipados; a empresa apresenta os comprovantes.'],b:['TR 1.1, 5.6.7','Não há item para esse valor. Pernoite só existe para carro fixo, a R$ 337,49 (GO) e R$ 309,99 (Norte).'],why:'Se não houver reembolso, o valor sai da diária avulsa (até 43 diárias por mês no Norte).',todo:'Embutir o custo na diária avulsa ou confirmar o reembolso nos anexos.'},
 {g:'media',tipo:'Dentro do TR',t:'Plantão do executivo "sem ônus adicional"',a:['TR 5.5.1, 5.5.8','Jornada de 40 h semanais; hora extra vedada nos carros básico e 4x4.'],b:['TR 5.5.11','Executivo das 7h às 21h, com plantão até 24h, noites e dias não úteis, sem ônus para a Anvisa.'],why:'Com 2 postos de 40 h, os plantões podem gerar hora extra e adicional noturno que a empresa paga sozinha.',todo:'Prever escala e custo de plantão no preço do item 9.'},
 {g:'media',tipo:'Edital × TR',t:'Seguro-garantia até a assinatura',a:['Edital 10.2','Assinatura em até 5 dias úteis da convocação.'],b:['TR 4.10, 4.10.2','Apólice entregue até a assinatura; se não, perde-se a opção pelo seguro.'],why:'A Lei 14.133 (art. 96, §3º) assegura 1 mês entre a homologação e a assinatura para quem escolhe seguro-garantia. O texto não deixa isso expresso.',todo:'Deixar a apólice pré-aprovada com a seguradora antes da sessão.'},
 {g:'baixa',tipo:'Dentro do Edital',t:'Numeração do pregão',a:['Edital p. 1','Artefato "Edital 27/2026"; pregão "90029/2026".'],b:['Edital p. 2 e 25','"Pregão Eletrônico nº 29/2026" e "Brasília, de maio de 2026", embora assinado em 05/11/2026.'],why:'Pode confundir a busca no sistema e a identificação nos documentos.',todo:'Usar "Pregão Eletrônico 90029/2026, UASG 253002" e citar o Edital 27/2026.'},
 {g:'baixa',tipo:'Edital × TR',t:'Consórcio sem permissão expressa',a:['Edital 9.4–9.4.1','Soma de quantitativos e acréscimo de 15% na parte financeira "quando permitida" a participação de consórcio.'],b:['TR · Edital 3.7','O TR não trata de consórcio e o Edital não o proíbe.'],why:'Pesa para quem pensa em se associar para cumprir atestado ou capital.',todo:'Não contar com consórcio sem confirmação no sistema.'},
 {g:'baixa',tipo:'Dentro do Edital',t:'Garantia de proposta citada, mas não exigida',a:['Edital 14.9','Recusa em assinar leva à "perda da garantia de proposta".'],b:['Edital e TR','Nenhum item exige garantia de proposta.'],why:'Texto do modelo sem efeito prático.',todo:'Nenhuma ação necessária.'},
 {g:'baixa',tipo:'Dentro do Edital',t:'ME/EPP citada para "itens 01 e 02"',a:['Edital 3.6','Sem tratamento favorecido "nos itens 01 e 02".'],b:['Edital p. 2 · TR 1.1','A capa diz "NÃO" para todo o pregão, que tem 32 itens em 2 grupos.'],why:'Vale a capa: nenhum item tem benefício para ME/EPP.',todo:'Nenhuma ação necessária.'},
 {g:'baixa',tipo:'Dentro do TR',t:'Período de faturamento',a:['TR 5.3.2.1','Medição de 26 de um mês a 25 do seguinte; documentos até o dia 30.'],b:['TR 7.10','"Período de 25 a 26 do mês subsequente".'],why:'Falha de redação; vale o ciclo de 26 a 25.',todo:'Nenhuma ação necessária.'},
 {g:'baixa',tipo:'Planilha × TR',t:'Planilha de quantitativos desatualizada',a:['Planilha de quantitativos','GO R$ 3.527.301,00 e Norte R$ 4.732.603,20; 1 posto no executivo; 13 diárias avulsas básicas no GO.'],b:['TR 1.1','GO R$ 4.615.609,80 e Norte R$ 6.388.830,60; 2 postos no executivo; 20 diárias no GO.'],why:'Usar a planilha antiga para preço levaria a erro. Os km por carro são os mesmos.',todo:'Usar só o TR para preço.'}
];

const MATRIZ=[
 {g:'Habilitação',itens:[
  {id:'sicaf',t:'SICAF e Compras.gov.br regulares',d:'Condições atendidas até 17/11/2026 (3º dia útil antes da sessão)',src:'Edital 3.1–3.2',elim:true},
  {id:'indices',t:'LG, LC e SG acima de 1 nos 2 últimos exercícios',d:'Atestados por declaração de contador',src:'TR 9.23, 9.27',elim:true},
  {id:'ccl',t:'Capital de giro (CCL) de 16,66% do valor anual',d:'GO R$ 153.792,12 · Norte R$ 212.875,84 · os dois R$ 366.667,95',src:'TR 9.23.1, 9.24',elim:true},
  {id:'pl',t:'Patrimônio líquido de 10% do valor anual',d:'GO R$ 92.312,20 · Norte R$ 127.776,61 · os dois R$ 220.088,81',src:'TR 9.23.2, 9.24',elim:true},
  {id:'comp',t:'1/12 dos contratos vigentes não passa do patrimônio líquido',d:'Declaração de compromissos com DRE',src:'TR 9.28',elim:true},
  {id:'at-tempo',t:'Atestado: 2 anos de gestão de mão de obra com dedicação exclusiva',d:'Períodos somáveis',src:'TR 9.31.1.1',elim:true},
  {id:'at-postos',t:'Atestado: pelo menos 3 postos (50% do lote)',d:'GO 5 postos, Norte 6; o mesmo atestado vale para os 2 lotes',src:'TR 9.31.1.2',elim:true},
  {id:'simples',t:'Fora do Simples Nacional',d:'Ou comunicar o desenquadramento em 90 dias da assinatura',src:'Edital 6.8 · TR 7.37',elim:false}
 ]},
 {g:'Frota e operação',itens:[
  {id:'fr-go',t:'4 carros 0 km no Lote 02',d:'2 sedans básicos brancos, 1 caminhonete 4x4 e 1 executivo preto',src:'TR 1.1, 5.4',elim:false},
  {id:'fr-no',t:'6 carros 0 km no Lote 05',d:'1 sedan básico e 5 caminhonetes 4x4 cabine dupla',src:'TR 1.1, 5.4',elim:false},
  {id:'prazo',t:'Tudo pronto em 30 dias da assinatura',d:'Carros, GPS, seguro e motoristas; +15 dias com justificativa',src:'TR 5.1.1',elim:false},
  {id:'subst',t:'Substituição de carro em até 2 horas',d:'Em DF, MS, PA, AM, RO, AC e AP',src:'TR 5.3.2.1',elim:false},
  {id:'eventual',t:'Rede de locadoras para 65 diárias avulsas por mês',d:'Inclusive no interior do Norte; pedido com 24 h',src:'TR 4.2, 5.3.2.2',elim:false},
  {id:'portos',t:'Acesso a portos e aeroportos em 30 dias',d:'Cursos, licenças e seguros por conta da empresa',src:'TR 5.3.2.1',elim:false},
  {id:'central',t:'Central telefônica e número de emergência',d:'Horário comercial e plantão fora dele',src:'TR 5.6.6',elim:false}
 ]},
 {g:'Equipe',itens:[
  {id:'motoristas',t:'11 motoristas qualificados',d:'CNH B com EAR, 6 meses de experiência, sem falta grave em 12 meses',src:'TR 5.5.3',elim:false},
  {id:'cct',t:'CCT definida em cada base sindical',d:'Salário e alimentação iguais ou acima do orçado pela Anvisa',src:'TR 5.6.9, 9.3 · Edital 8.23',elim:false},
  {id:'exec',t:'Escala do executivo das 7h às 21h e plantões',d:'2 postos, sem pagamento extra da Anvisa',src:'TR 5.5.11',elim:false}
 ]},
 {g:'Finanças',itens:[
  {id:'garantia',t:'Garantia de 5% do valor anual',d:'R$ 110.044,40 nos 2 lotes sobre a referência',src:'TR 4.9–4.10',elim:false},
  {id:'giro',t:'Capital de giro para cerca de 83 dias de custos',d:'Mais a compra dos 10 carros 0 km',src:'TR 7.5–7.32',elim:false},
  {id:'capital',t:'Capital social integralizado compatível',d:'Com o número de empregados (art. 4º-B da Lei 6.019/1974)',src:'Edital 10.9',elim:true},
  {id:'cadin',t:'Sem registro no Cadin',d:'Impede a contratação',src:'Edital 10.8',elim:true}
 ]}
];

const KIT=[
 {g:'Antes da sessão',prazo:'até 23/11 · 14h',itens:[
  {id:'k-anexos',t:'Anexos I a XIII do TR baixados',d:'Endereços, planilhas da Anvisa, CCTs e ANS (Compras.gov.br ou PNCP)'},
  {id:'k-pisos',t:'Pisos de salário e alimentação conferidos',d:'Iguais ou acima dos Anexos VI e VII (TR 9.3)'},
  {id:'k-cad',t:'Proposta cadastrada no Compras.gov.br',d:'Valor mensal e total de cada item, 60 meses (Edital 6.1)'},
  {id:'k-lance',t:'Lance mínimo de cada lote definido',d:'No Simulador, com os custos reais'}
 ]},
 {g:'Proposta ajustada ao lance',prazo:'2 horas · Edital 7.24.4',itens:[
  {id:'k-plan',t:'Planilha de custos de cada lote',d:'Modelo dos Anexos VIII e IX, ajustada ao último lance (Edital 8.14)'},
  {id:'k-prop',t:'Proposta com validade de 180 dias',d:'Edital 6.10'},
  {id:'k-sind',t:'Indicação dos sindicatos e CCTs',d:'Com data-base e vigência (Edital 6.15)'},
  {id:'k-enq',t:'Declaração de enquadramento sindical',d:'Edital 8.23.1'},
  {id:'k-carta',t:'Carta ou registro sindical',d:'Edital 8.23.2'},
  {id:'k-cct',t:'Cópia da CCT usada na planilha',d:'Edital 8.23.3'},
  {id:'k-resp',t:'Declaração de responsabilidade (Anexo IV)',d:'Edital 8.23.4'}
 ]},
 {g:'Habilitação',prazo:'2 horas · Edital 9.12.1',itens:[
  {id:'k-cont',t:'Declaração do contador com LG, LC, SG, CCL e PL',d:'TR 9.27'},
  {id:'k-bal',t:'Balanço e DRE dos 2 últimos exercícios',d:'Se não estiverem no SICAF (TR 9.23)'},
  {id:'k-compr',t:'Declaração de compromissos assumidos com DRE',d:'TR 9.28'},
  {id:'k-atest',t:'Atestados digitalizados',d:'2 anos de dedicação exclusiva e 3 postos ou mais (TR 9.31)'},
  {id:'k-contr',t:'Cópias dos contratos dos atestados',d:'Podem ser pedidas (TR 9.31.1.5)'},
  {id:'k-local',t:'Declaração de conhecimento das condições locais',d:'TR 9.30'}
 ]},
 {g:'Assinatura e início',prazo:'5 dias úteis + 30 dias · Edital 10.2 · TR 5.1.1',itens:[
  {id:'k-sei',t:'Cadastro de usuário externo no SEI-Anvisa',d:'Assinatura em até 2 dias úteis (Edital 10.4–10.5)'},
  {id:'k-cap',t:'Capital social compatível comprovado',d:'Edital 10.9'},
  {id:'k-gar',t:'Garantia de 5% do valor anual',d:'Seguro até a assinatura ou outra modalidade em 10 dias úteis'},
  {id:'k-carros',t:'10 carros 0 km encomendados',d:'Com GPS, ENCE A e seguro; CRLV peticionado no 1º dia'},
  {id:'k-mot',t:'11 motoristas recrutados',d:'Carteira assinada, exames e declaração de não parentesco'}
 ]}
];

const SIM_PARAMS=[
 {k:'trib',l:'Tributos sobre o faturamento',h:'PIS, COFINS, ISS, IRPJ e CSLL (Simples vedado)',u:'%',def:13},
 {k:'adm',l:'Despesas indiretas',h:'sobre o custo direto: gestão, central telefônica, preposto',u:'%',def:8},
 {k:'glosa',l:'Desconto esperado pelo ANS',h:'perda média do faturamento por falhas (TR 7.1)',u:'%',def:1},
 {k:'marg',l:'Margem líquida desejada',h:'sobre o valor do lance',u:'%',def:6},
 {k:'ciclo',l:'Ciclo até receber',h:'dias entre o início da medição e o pagamento (TR 7)',u:'dias',def:83},
 {k:'juros',l:'Custo do capital de giro',h:'taxa mensal do seu financiamento',u:'%/mês',def:1.5},
 {k:'garan',l:'Custo anual da garantia',h:'prêmio do seguro sobre os 5% garantidos',u:'%/ano',def:1.5}
];
const SIM_DEF=()=>{const o={lance:10500000}; COMPONENTS.forEach(c=>{if(!c.fixed)o['c_'+c.k]=c.def}); SIM_PARAMS.forEach(p=>o[p.k]=p.def); return o;};

/* capital de giro: o contrato é de 60 meses, então o custo mensal é C ÷ 60 */
const giro=r=>r.C/MESES*((state.sim.ciclo||0)/30);
function calcLote(L,sv){
  let cdir=0; COMPONENTS.forEach(c=>{const v=L.v[c.k]; cdir+=c.fixed?v:v*Math.max(0,sv['c_'+c.k]||0)/100;});
  const C=cdir*(1+(sv.adm||0)/100), K=C/12*((sv.ciclo||0)/30), F=K*((sv.juros||0)/100)*12;
  const g=(sv.glosa||0)/100,t=(sv.trib||0)/100,m=(sv.marg||0)/100,rg=(sv.garan||0)/100;
  const den=(1-g)*(1-t)-m-0.05*rg;
  return den>0?(C+F)/den:Infinity;
}

const SECTIONS=[
 {id:'ficha',sec:'ficha',nome:'Ficha do edital',q:'Quais são os dados básicos do pregão?',etapa:1,min:2},
 {id:'condicoes',sec:'cond',nome:'Condições gerais',q:'Quais regras valem para o contrato e como a empresa é paga?',etapa:1,min:4},
 {id:'operacao',sec:'oper',art:'kit',nome:'Estrutura operacional',q:'O que a empresa precisa ter montado e em quanto tempo?',etapa:1,min:3},
 {id:'veiculos',sec:'oper',art:'frota',nome:'Veículos',q:'Quais carros, quantos e com que especificação?',etapa:1,min:3},
 {id:'motoristas',sec:'decl',art:'motor',nome:'Motoristas',q:'Como devem ser contratados os 11 motoristas?',etapa:1,min:3},
 {id:'qualificacao',sec:'qual',nome:'Qualificação',q:'O que a empresa precisa comprovar para ser habilitada?',etapa:2,min:3},
 {id:'declaracoes',sec:'decl',nome:'Declarações',q:'Quais documentos escritos acompanham a proposta, além do SICAF?',etapa:2,min:2},
 {id:'conflitos',sec:'conf',nome:'Conflitos',q:'Onde os documentos se contradizem e o que fazer antes de propor?',etapa:2,min:4},
 {id:'planilha',sec:'plan',nome:'Planilha de custo',q:'Como a Anvisa chegou aos R$ 11,0 milhões?',etapa:2,min:3},
 {id:'matriz',sec:'matriz',nome:'Matriz de aderência',q:'A empresa cumpre cada exigência? Se não, como vai suprir?',etapa:3,min:6},
 {id:'kit',sec:'kit',nome:'Kit das 2 horas',q:'O que precisa estar pronto antes da sessão para não perder depois de vencer?',etapa:3,min:4},
 {id:'simulador',sec:'simul',nome:'Simulador de lance',q:'Até onde a empresa pode baixar o preço sem ter prejuízo?',etapa:4,min:5},
 {id:'riscos',sec:'risco',nome:'Caixa e riscos',q:'A empresa aguenta comprar a frota e financiar a operação?',etapa:4,min:3},
 {id:'parecer',sec:'parecer',nome:'Parecer final',q:'Participar ou não participar?',etapa:5,min:3}
];

const altas=()=>CONFLITOS.filter(c=>c.g==='alta').length;
const TAKE={
 ficha:()=>'Pregão eletrônico de menor preço em 2 lotes (Goiás e Norte), contrato de 60 meses, sem benefício para ME/EPP. Sessão em 23/11, às 14h.',
 condicoes:()=>'Contrato de 60 meses com garantia de 5% do valor anual. Cerca de 65% do valor é fixo e 35% depende do uso.',
 operacao:()=>'Começar em 30 dias com tudo pronto e substituir carro parado em 2 horas, em 6 estados e no DF, sem precisar de escritório local.',
 veiculos:()=>'10 carros fixos 0 km (6 deles caminhonetes 4x4) e 65 diárias avulsas por mês, que podem ser subcontratadas.',
 motoristas:()=>'11 postos de motorista em dedicação exclusiva, com piso mínimo fixado pela Anvisa e conta vinculada.',
 qualificacao:()=>'Atestado de 2 anos de mão de obra dedicada com 3 postos por lote, e balanço com CCL de 16,66% e PL de 10% do valor anual.',
 declaracoes:()=>'4 documentos sindicais e a planilha seguem com a proposta; 3 declarações na habilitação. Tudo em 2 horas.',
 conflitos:()=>altas()+' pontos podem mudar seu preço ou te inabilitar. O prazo para questionar a Anvisa encerrou em 17/11 ('+leftTxt(daysUntil(2026,11,17))+').',
 planilha:()=>'Os preços do TR são o teto de cada um dos 32 itens. As planilhas detalhadas da Anvisa (Anexos VI a IX) precisam ser baixadas.',
 matriz:()=>{const s=matrizSummary(); return s.title+': '+s.evaluated+' de '+s.all.length+' requisitos avaliados.';},
 kit:()=>{const a=KIT.flatMap(g=>g.itens),d=a.filter(i=>state.kit.done[i.id]).length; return d+' de '+a.length+' itens prontos. Cada documento que faltar no prazo de 2 horas pode custar o contrato.';},
 simulador:()=>{const r=calc(state.sim); return isFinite(r.Pmin)?'Com os custos informados, o lance mínimo nos 2 lotes é '+fmt0(r.Pmin)+' (desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+')'+(isDefault()?', ainda com custos de exemplo.':'.'):'Com os percentuais atuais, nenhum preço cobre os custos.';},
 riscos:()=>{const r=calc(state.sim); const L=r.L>0?r.L:REF; return 'Antes de começar, reserve cerca de '+fmt0(giro(r))+' de capital de giro, '+fmt0(L/5*0.05)+' de garantia e o dinheiro (ou crédito) para 10 carros 0 km.';},
 parecer:()=>{const p=parecerCalc(); return p.title+(p.title.endsWith('…')?' ':'. ')+(state.parecer.decisao?'O parecer da empresa já foi registrado.':'Registre a decisão da empresa no fim desta página.');}
};
const HN={
 ficha:()=>[{v:'R$ 11,0 mi',l:'valor total em 60 meses',c:'gold'},{v:'23/11',l:'sessão pública, às 14h',c:'ink'},{v:'2 lotes',l:'Goiás e Norte',c:'ink'}],
 condicoes:()=>[{v:'R$ 110 mil',l:'garantia de 5% do valor anual',c:'gold'},{v:'35%',l:'do valor depende do uso',c:'blue'},{v:'60 meses',l:'vigência, até 10 anos',c:'ink'}],
 operacao:()=>[{v:'30 dias',l:'para começar após assinar',c:'blue'},{v:'2 h',l:'para substituir carro parado',c:'red'},{v:'Sem base',l:'escritório local não exigido',c:'green'}],
 veiculos:()=>[{v:'10',l:'carros fixos 0 km',c:'ink'},{v:'65',l:'diárias avulsas por mês',c:'blue'},{v:'ENCE A',l:'etiqueta de eficiência',c:'ink'}],
 motoristas:()=>[{v:'11',l:'postos de motorista',c:'ink'},{v:'42%',l:'do valor do pregão',c:'gold'},{v:'40 h',l:'jornada semanal',c:'ink'}],
 qualificacao:()=>[{v:'2 anos',l:'de gestão de mão de obra',c:'red'},{v:'3 postos',l:'por lote em atestado',c:'red'},{v:'16,66%',l:'do valor anual em capital de giro',c:'gold'}],
 declaracoes:()=>[{v:'6',l:'documentos com a proposta',c:'ink'},{v:'3',l:'declarações na habilitação',c:'ink'},{v:'2 h',l:'prazo em cada fase',c:'red'}],
 conflitos:()=>{const n=daysUntil(2026,11,17); return [{v:String(altas()),l:'de alta gravidade',c:'red'},{v:String(CONFLITOS.length),l:'pontos no total',c:'ink'},{v:n<0?'encerrado':n===0?'hoje':n+(n===1?' dia':' dias'),l:'prazo para questionar (17/11)',c:'red'}];},
 planilha:()=>[{v:'32',l:'preços máximos a cotar',c:'ink'},{v:'R$ 183 mil',l:'por mês nos 2 lotes',c:'gold'},{v:'4',l:'anexos de planilha a baixar',c:'red'}],
 matriz:()=>{const s=matrizSummary(); return [{v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,l:'atendidos, com ou sem ajuste',c:'green'},{v:String(s.c.verificar),l:'a verificar',c:'ink'},{v:String(s.blockers.length),l:'bloqueios eliminatórios',c:'red'}];},
 kit:()=>{const a=KIT.flatMap(x=>x.itens); return [{v:a.filter(i=>state.kit.done[i.id]).length+' de '+a.length,l:'itens prontos',c:'green'},{v:KIT[1].itens.filter(i=>state.kit.done[i.id]).length+' de '+KIT[1].itens.length,l:'proposta ajustada',c:'ink'},{v:KIT[2].itens.filter(i=>state.kit.done[i.id]).length+' de '+KIT[2].itens.length,l:'habilitação',c:'ink'}];},
 simulador:()=>{const r=calc(state.sim), ok=isFinite(r.Pmin); return [{v:ok?fmtMi(r.Pmin):'—',l:'lance mínimo nos 2 lotes',c:'blue'},{v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',l:'desconto máximo',c:'blue'},{v:isFinite(r.margL)?pct(r.margL):'—',l:'margem no lance testado',c:r.margL<0?'red':'green'}];},
 riscos:()=>{const r=calc(state.sim), L=r.L>0?r.L:REF; return [{v:fmtK(giro(r)),l:'capital de giro estimado',c:'gold'},{v:fmtK(L/5*0.05),l:'garantia contratual',c:'gold'},{v:'~83 dias',l:'do início da medição ao pagamento',c:'ink'}];},
 parecer:()=>{const p=parecerCalc(); return [{v:p.title,l:'recomendação calculada',c:'gold'},{v:Math.round(overallProgress()*100)+'%',l:'da análise concluída',c:'ink'},{v:String(p.steps.length),l:'próximos passos',c:'ink'}];}
};
const CARD={
 ficha:()=>({m:'R$ 11,0 mi',s:'sessão em 23/11 · 14h'}),
 condicoes:()=>({m:'60 meses',s:'garantia de 5% do valor anual'}),
 operacao:()=>({m:'30 dias',s:'para começar · troca de carro em 2 h'}),
 veiculos:()=>({m:'10 carros 0 km',s:'mais 65 diárias avulsas por mês'}),
 motoristas:()=>({m:'11 postos',s:'piso mínimo da Anvisa',c:'warn'}),
 qualificacao:()=>({m:'2 anos · 3 postos',s:'eliminatório',c:'alert'}),
 declaracoes:()=>({m:'9 documentos',s:'enviar em até 2 horas',c:'warn'}),
 conflitos:()=>({m:CONFLITOS.length+' pontos',s:altas()+' de alta gravidade',c:'alert'}),
 planilha:()=>({m:'32 preços',s:'anexos de planilha a baixar',c:'alert'}),
 matriz:()=>{const s=matrizSummary(); return {m:(s.c.atende+s.c.ajuste)+' de '+s.all.length,s:s.title,c:s.kind==='go'?'ok':s.kind==='nogo'?'alert':'warn'};},
 kit:()=>{const a=KIT.flatMap(x=>x.itens), d=a.filter(i=>state.kit.done[i.id]).length; return {m:d+' de '+a.length,s:'itens prontos',c:d===a.length?'ok':''};},
 simulador:()=>{const r=calc(state.sim); return {m:isFinite(r.Pmin)?fmtMi(r.Pmin):'—',s:'lance mínimo nos 2 lotes'+(isDefault()?' · exemplo':'')};},
 riscos:()=>{const r=calc(state.sim); return {m:fmtK(giro(r)),s:'capital de giro + 10 carros 0 km'};},
 parecer:()=>{const p=parecerCalc(); return {m:p.title,s:state.parecer.decisao?'decisão registrada':'registrar a decisão',c:p.kind==='go'?'ok':p.kind==='nogo'?'alert':'warn'};}
};

/* ---------------- condições gerais ---------------- */
function renderComposition(){
  $('stack').innerHTML=COMPONENTS.map(c=>'<i style="width:'+(c.v/REF*100)+'%;background:'+c.cor+'" title="'+esc(c.nome)+'"></i>').join('');
  $('legend').innerHTML=COMPONENTS.map(c=>'<li><span class="sw" style="background:'+c.cor+'"></span><span><b>'+c.nome+'</b> <span class="hint">· '+c.det+'</span></span><span class="r">'+fmt(c.v)+'</span><span class="r p">'+pct(c.v/REF)+'</span></li>').join('')+'<li><span></span><span><b>Total dos 2 lotes</b></span><span class="r"><b>'+fmt(REF)+'</b></span><span class="r p">100%</span></li>';
  let h='';
  COMPONENTS.forEach(c=>{const a=LOTES[0].v[c.k], b=LOTES[1].v[c.k]; h+='<tr><td><b>'+c.nome+'</b><span class="sub">'+LOTES[0].q[c.k]+' · '+LOTES[1].q[c.k]+' por mês</span></td><td class="r">'+fmt(a)+'</td><td class="r">'+fmt(b)+'</td><td class="r">'+fmt(a+b)+'</td></tr>';});
  h+='<tr><td><b>Por mês</b></td><td class="r">'+fmt(LOTES[0].ref/MESES)+'</td><td class="r">'+fmt(LOTES[1].ref/MESES)+'</td><td class="r">'+fmt(REF/MESES)+'</td></tr>';
  h+='<tr><td><b>Total em 60 meses</b></td><td class="r"><b>'+fmt(LOTES[0].ref)+'</b></td><td class="r"><b>'+fmt(LOTES[1].ref)+'</b></td><td class="r"><b>'+fmt(REF)+'</b></td></tr>';
  $('loteTable').querySelector('tbody').innerHTML=h;
  $('planTiles').innerHTML=COMPONENTS.map((c,i)=>'<div class="tile t'+(i+1)+'"><span class="k">'+c.nome+'</span><span class="v">'+fmt0(c.v)+'</span><span class="s">'+pct(c.v/REF)+' do total</span></div>').join('')+'<div class="tile t6"><span class="k">Total dos 2 lotes</span><span class="v">'+fmt0(REF)+'</span><span class="s">60 meses · '+fmt0(REF/MESES)+' por mês</span></div>';
}

/* ---------------- planilha ---------------- */
function renderPlanilha(){
  const tab=(lote,id)=>{
    const L=ITENS.filter(x=>x[1]===lote); let tm=0;
    let h='<thead><tr><th>Item</th><th>Descrição</th><th>Unidade</th><th class="r">Qtd/mês</th><th class="r">Preço unitário máx.</th><th class="r">Mensal</th><th class="r">60 meses</th></tr></thead><tbody>';
    L.forEach(x=>{const [it,,ds,un,q,m,al]=x; tm+=m;
      h+='<tr'+(al?' class="hl"':'')+'><td><span class="cat-code">'+it+'</span></td><td>'+esc(ds)+(al?' <span class="pill att">'+al+'</span>':'')+'</td><td>'+un+'</td><td class="r">'+NUM.format(q)+'</td><td class="r">≈ '+fmtU(m/q)+'</td><td class="r">'+fmt(m)+'</td><td class="r"><b>'+fmt(m*MESES)+'</b></td></tr>';});
    h+='<tr class="tot"><td></td><td>Total do lote</td><td colspan="3"></td><td class="r">'+fmt(tm)+'</td><td class="r">'+fmt(tm*MESES)+'</td></tr></tbody>';
    $(id).innerHTML=h;
  };
  tab(2,'plGo'); tab(5,'plNo');
}

/* ---------------- simulador por lote e riscos ---------------- */
function renderLotes(r){
  const rows=LOTES.map(L=>{const p=calcLote(L,state.sim), ok=isFinite(p); return '<tr><td>'+L.n+'</td><td class="r">'+fmt0(L.ref)+'</td><td class="r"><b>'+(ok?fmt0(p):'—')+'</b></td><td class="r"'+(ok&&p>L.ref?' style="color:var(--bad)"':'')+'>'+(ok?(p<L.ref?pct(1-p/L.ref):'acima do máximo'):'—')+'</td></tr>';});
  rows.push('<tr><td><b>Os 2 lotes</b></td><td class="r">'+fmt0(REF)+'</td><td class="r"><b>'+(isFinite(r.Pmin)?fmt0(r.Pmin):'—')+'</b></td><td class="r">'+(isFinite(r.Pmin)?(r.Pmin<REF?pct(1-r.Pmin/REF):'acima do máximo'):'—')+'</td></tr>');
  $('simLotes').innerHTML=rows.join('');
}
function renderRiscos(r){
  const L=r.L>0?r.L:REF;
  const T=[
   ['Faturamento mensal médio',fmt0(L/MESES),'lance ÷ 60 meses','t4'],
   ['Garantia de 5% do valor anual',fmt0(L/5*0.05),'até a assinatura (seguro) ou 10 dias úteis','t1'],
   ['Capital de giro estimado',fmt0(giro(r)),'custos de '+NUM.format(state.sim.ciclo)+' dias','t5'],
   ['Carros 0 km a comprar','10','4 no GO e 6 no Norte · antes do início','t3']
  ];
  $('riskTiles').innerHTML=T.map(t=>'<div class="tile '+t[3]+'"><span class="k">'+t[0]+'</span><span class="v">'+t[1]+'</span><span class="s">'+t[2]+'</span></div>').join('');
}

const E={
  slug:'pe-27-2026-anvisa', docPrefix:'editais/pe-27-2026-anvisa/', lsPrefix:'pe27anv-',
  ref:REF, teto:REF, garantiaPct:0.05, giro:'mensal',
  sessao:[2026,11,23], sessaoNome:'Sessão', chip:'R$ 11,0 mi · 2 lotes · 60 meses',
  deadlines:[
   {d:[2026,11,17],lbl:'17/11',t:'Último dia para impugnar e pedir esclarecimento',s:'Edital 15.1 · e-mail ',mail:'licita@anvisa.gov.br'},
   {d:[2026,11,17],lbl:'17/11',t:'SICAF com condições atendidas',s:'3º dia útil antes da sessão · Edital 3.2'},
   {d:[2026,11,19],lbl:'19/11',t:'Limite para a Anvisa publicar respostas',s:'Último dia útil antes da sessão · Edital 15.2'},
   {d:[2026,11,23],lbl:'23/11 · 14h',t:'Sessão pública no Compras.gov.br',s:'Envio da proposta até a abertura · Edital 5.2'}
  ],
  prazoQuestionar:[2026,11,17],
  sim:{
    tetoNome:'valor máximo', refNome:'referência', artExeq:'Edital 8.11–8.13', artAcima:'Edital 8.10.3',
    tetoLabel:()=>'Referência<br>R$ 11,0 mi',
    minSub:r=>'≈ '+fmt0(r.Pmin/MESES)+' por mês, 2 lotes',
    margSub:r=>'≈ '+fmt0(r.margL*r.L/5)+' por ano',
    descValue:(r,ok,ref)=>ok?(r.Pmin<ref?pct(1-r.Pmin/ref):'sem desconto'):'—',
    passo:L=>L*0.01,
    extraAlerts:()=>LOTES.filter(L=>{const p=calcLote(L,state.sim); return isFinite(p)&&p>L.ref;}).map(L=>['bad','No '+L.n+', o lance mínimo passa do valor máximo do lote. Revise os custos desse lote.'])
  },
  kpis(x){ const {s,r,exemplo,ok}=x; const dImp=daysUntil(2026,11,17); return [
   {href:'planilha',k:'Valor total em 60 meses',v:'R$ 11,0 mi',c:'gold',s:'Lote 02 GO R$ 4,62 mi · Lote 05 Norte R$ 6,39 mi'},
   {href:'simulador',k:'Desconto máximo viável',v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',c:'blue',s:ok?'lance mínimo '+fmtMi(r.Pmin)+(exemplo?' (custos de exemplo)':''):'revise o simulador'},
   {href:'conflitos',k:'Conflitos graves',v:String(altas()),c:'red',s:'prazo para questionar: 17/11 ('+leftTxt(dImp)+')'},
   {href:'matriz',k:'Requisitos atendidos',v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,c:'green',s:s.c.verificar?s.c.verificar+' a verificar na matriz':(s.blockers.length?s.blockers.length+' bloqueio(s)':'todos avaliados')}
  ]; },
  precoTxt:r=>'Lance mínimo de '+fmt0(r.Pmin)+' nos 2 lotes, desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+'.'+(r.Pmin<0.5*REF?' Abaixo de 50% da referência: exige prova de exequibilidade.':''),
  riscosTxt:d=>'Anexos ausentes, CCL e PL ambíguos, lance por item, item 19 e plantão do executivo. Prazo para questionar: 17/11 ('+leftTxt(d)+').',
  prepTxt:(r,L)=>'Documentos do kit prontos. Caixa: cerca de '+fmt0(giro(r))+' de capital de giro, '+fmt0(L/5*0.05)+' de garantia e a compra de 10 carros 0 km.',
  passoBloqueio:'Avaliar disputar só um lote, somar atestados ou formar parceria antes de desistir.',
  exeqStep:'Preparar a prova de exequibilidade do preço (Edital 8.11 a 8.13).',
  questionarStep:a=>'Registrar no chat da sessão as dúvidas dos '+a+' pontos de alta gravidade.',
  stepsGo:['Conferir os pisos dos Anexos VI e VII e preencher a planilha dos Anexos VIII e IX.','Cadastrar a proposta no Compras.gov.br antes de 23/11, às 14h.'],
  init(){ renderComposition(); renderPlanilha(); },
  onSim(r){ renderRiscos(r); renderLotes(r); }
};
