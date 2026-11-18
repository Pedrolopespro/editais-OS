/* ===== Edital: Pregão Eletrônico 25/2026 (ARTESP) ===== */
/* ---------------- dados ---------------- */
const REF=74357769.52, MESES=30, MENSAL=2478592.32, ANUAL=MENSAL*12;
const COMPONENTS=[
 {k:'locC', nome:'Veículos com motorista e combustível', det:'Modalidade C · 50 veículos · fixo mensal + km (4.500 km/mês)', v:49354235.63, cor:'var(--blue)', def:75},
 {k:'locA', nome:'Veículos sem motorista', det:'Modalidade A · 52 hatches + 1 van base móvel', v:11445243.38, cor:'var(--steel)', def:65},
 {k:'base', nome:'Base operacional fixa', det:'central de operações 24 h · 30 meses', v:5678247.53, cor:'var(--green)', def:65},
 {k:'he',   nome:'Horas adicionais', det:'49.500 h normais + 18.000 h domingos e feriados (estimativa)', v:7806465.00, cor:'var(--amber)', def:70},
 {k:'desp', nome:'Despesas eventuais e pernoites', det:'reembolso · não entra no desconto', v:73577.98, cor:'var(--gold)', fixed:true}
];

const CONFLITOS=[
 {g:'alta',tipo:'Dentro do TR',t:'Renovação da frota: 24 meses × 30 meses ou 100.000 km',a:['TR 5.12.7.6','A base deve substituir de imediato os veículos que tiverem ultrapassado 24 meses de fabricação.'],b:['TR 5.2.2.1 e 5.3.9','Troca por zero km ao completar 100.000 km ou 30 meses de uso desde o primeiro licenciamento, o que vier primeiro.'],why:'Com contrato de 30 meses, a regra de 24 meses obriga trocar os 103 veículos uma vez durante a vigência. A regra de 30 meses ou 100.000 km só alcança os que rodam muito. A diferença muda o custo da frota.',todo:'Pedir esclarecimento sobre qual regra vale. Sem resposta, precificar o pior caso.'},
 {g:'alta',tipo:'TR × Planilha',t:'Reserva técnica de 12% sem preço na planilha',a:['TR 5.2.4.5','Colocar à disposição no mínimo 12% de reserva técnica de veículos físicos, entregues com os demais e guardados na base da ARTESP.'],b:['Anexo VIII','Nenhuma linha para veículos de reserva: só os 103 veículos, a base e as despesas.'],why:'12% de 103 = 12,36 veículos (13 se arredondado para cima) a comprar e manter sem receita própria. Também não está claro se o percentual vale por grupo ou só para a Modalidade C.',todo:'Pedir a quantidade exata, por grupo, e se há remuneração. Incluir o custo nos preços dos subitens.'},
 {g:'alta',tipo:'Dentro do TR',t:'Fator de pagamento do veículo provisório não publicado',a:['TR 5.2.1.15.3–4','Seminovo provisório é pago por VP = PC × F, com fatores "apresentados em tabela integrante deste item".'],b:['TR publicado','A tabela de fatores não aparece no documento; só a fórmula.'],why:'O contrato atual termina em 06/12/2026 (ETP 2) e a entrega é em 10 dias úteis. Na prática, os primeiros 30 a 60 dias serão com seminovos, pagos por um fator que ninguém conhece.',todo:'Pedir a tabela de fatores e a memória de cálculo antes da sessão.'},
 {g:'alta',tipo:'TR × ETP × Minuta',t:'Base do capital de giro e do patrimônio líquido',a:['TR 8.21 b–c','16,66% e 10% "do valor estimado da contratação": R$ 12.388.004,40 e R$ 7.435.776,95 sobre os 30 meses.'],b:['ETP 14 · Minuta 11.1','O ETP fala em "valor estimado considerado para fins de habilitação"; a garantia usa o valor anual (art. 98, parágrafo único).'],why:'Na base anual (R$ 29.743.107,84), as exigências cairiam para R$ 4.955.201,77 e R$ 2.974.310,78. A diferença decide quem é habilitado.',todo:'Pedir esclarecimento sobre a base. Sem resposta, comprovar a mais exigente.'},
 {g:'media',tipo:'TR × Minuta × Edital',t:'Unidade do lance: total ou mensal',a:['TR 1.1 · Edital 5.1.1, 6.5','Item com unidade "Unidade", valor mensal R$ 2.478.592,32 e total R$ 74.357.769,52; o lance é pelo "valor unitário do item".'],b:['Minuta 1.2','O mesmo item aparece com unidade "Mensal".'],why:'Se a unidade for o mês, o lance fica perto de R$ 2,48 milhões; se for o item inteiro, perto de R$ 74,36 milhões. Lance no formato errado pode ser desclassificado.',todo:'Conferir no Compras.gov.br a quantidade e a unidade do item e perguntar ao pregoeiro.'},
 {g:'media',tipo:'Dentro do TR',t:'Prazo de substituição no interior: 8 h × 12 h',a:['TR 5.2.4.3','Substituir em até 8 horas quando o chamado ocorrer em viagem no interior.'],b:['TR 5.3.10','O mesmo caso com prazo de até 12 horas.'],why:'Define a rede de apoio no interior e o risco de nota baixa ou sanção.',todo:'Pedir qual prazo vale. Planejar para 8 horas.'},
 {g:'media',tipo:'TR × Anexo IV',t:'Desconto do IMR: só Modalidade C ou fatura inteira',a:['Anexo IV, título e item 1','A avaliação é para a Modalidade C (com condutor e combustível).'],b:['TR 7.3.1, 7.4 · Anexo IV item 8','O percentual de liberação incide sobre "as faturas" mensais.'],why:'Com 75% de liberação, a perda mensal é de R$ 411.285 só na Modalidade C ou de R$ 619.648 na fatura inteira (conta da análise).',todo:'Pedir que fixem a base do desconto.'},
 {g:'media',tipo:'Minuta × TR × ETP',t:'Garantia: base e limite',a:['Minuta 11.1','5% do valor inicial, observando o art. 98, parágrafo único (valor anual), e limitada a 2 meses da folha dos empregados do contrato.'],b:['TR 4.2 · ETP 12','5%, sem citar a base anual nem o limite da folha.'],why:'A garantia pode ser de R$ 1.487.155,39 (5% do valor anual), R$ 3.717.888,48 (5% dos 30 meses) ou menos, se o limite da folha valer.',todo:'Pedir o valor exato e a base de cálculo.'},
 {g:'media',tipo:'TR × Lei 14.133',t:'Prazo para apresentar o seguro-garantia',a:['TR 4.3 · Edital 14.2.2','Garantia antes da assinatura, que ocorre em 5 dias da convocação.'],b:['Lei 14.133, art. 96, § 3º','O edital deve dar pelo menos 1 mês, após a homologação, para quem escolhe seguro-garantia.'],why:'Não prestar a garantia equivale a recusar o contrato, com sanções (TR 4.3.1).',todo:'Pedir que o prazo legal fique expresso. Cotar o seguro antes da sessão.'},
 {g:'media',tipo:'Edital × ETP',t:'Limite de inexequibilidade: 40% do valor × redução de 40%',a:['Edital 7.8','Indício de inexequibilidade abaixo de 40% do valor orçado.'],b:['ETP 15 e 8','"Redução de 40%" é indício (preço abaixo de 60%); na pesquisa de preços, cotações 40% abaixo da média foram descartadas.'],why:'Define a partir de que lance a empresa terá de provar exequibilidade.',todo:'Se o lance ficar abaixo de 60% da referência, ter a planilha de exequibilidade pronta.'},
 {g:'media',tipo:'Dentro do TR',t:'Grupo S-1 (sedã) × S-4 (hatch)',a:['TR 5.1.1','S-1 e S-4 descritos do mesmo modo: "sedã ou hatch de 1.0 a 1.6".'],b:['TR 5.9.2, 5.9.4 · Anexo VIII','S-1 é "sedã" e S-4 é "hatchback", com os mesmos mínimos técnicos.'],why:'Define o modelo a comprar para 17 sedãs e 80 hatches.',todo:'Pedir confirmação de que S-1 deve ser sedã e S-4 pode ser só hatch.'},
 {g:'media',tipo:'Dentro do TR',t:'Tabela de níveis de acessórios ausente',a:['TR 5.11.2','"Os veículos possuem classificações de grupo e níveis de acessórios conforme tabela abaixo".'],b:['TR publicado','Nenhuma tabela depois do item; o texto segue para o item 5.12.'],why:'Acessórios mudam o custo de cada grupo.',todo:'Pedir a tabela ou a confirmação de que vale só a versão básica (TR 5.1.3).'},
 {g:'media',tipo:'TR × Planilha',t:'Plantão noturno sem linha própria',a:['TR 5.6','Das 22h às 6h, no mínimo 5 veículos e 5 motoristas à disposição.'],b:['Anexo VIII','Os postos são de 12 h, de segunda a sexta; só há horas adicionais eventuais.'],why:'Manter 5 motoristas de plantão todas as noites tem custo fixo que a planilha não mostra.',todo:'Perguntar se o plantão é pago por hora adicional ou se deve estar no preço fixo.'},
 {g:'media',tipo:'Dentro do TR',t:'Atestado de "50% do número de veículos"',a:['TR 8.24.1.2','Contrato(s) com no mínimo 50% do número de veículos a contratar.'],b:['TR 8.24.1.3–8.24.1.4','Exigências "para os lotes que contemplem" base e veículos equipados, num pregão de item único.'],why:'Não diz se vale veículo sem motorista nem se os 52 precisam ser equipados.',todo:'Pedir esclarecimento e reunir atestados que cubram a leitura mais exigente.'},
 {g:'baixa',tipo:'Edital × TR',t:'Declaração de conhecimento do local',a:['Edital 8.1.2','Não haverá exigência de atestar que conhece o local e as condições.'],b:['TR 8.23','Exige essa declaração na qualificação técnica.'],why:'Risco pequeno de inabilitação por um documento simples.',todo:'Entregar a declaração mesmo assim.'},
 {g:'baixa',tipo:'TR × Planilha',t:'Quantidade de pernoites',a:['TR 5.2.3.9.2','Estimativa de 10 pernoites por mês (300 em 30 meses).'],b:['Anexo VIII, subitem 11','10 unidades de R$ 4.391,87, total de R$ 43.918,73 nos 30 meses.'],why:'A unidade e a quantidade não fecham. É reembolso, com efeito pequeno no preço.',todo:'Cotar como a planilha manda e pedir correção.'},
 {g:'baixa',tipo:'Edital × TR',t:'Regime de mão de obra',a:['Edital 1.1','Serviço contínuo com dedicação exclusiva de mão de obra.'],b:['TR 1.6.1','"Com regime de dedicação exclusiva de mão de obra e sem regime de dedicação exclusiva".'],why:'O regime afeta repactuação e fiscalização trabalhista.',todo:'Tratar como dedicação exclusiva, como no Edital e na Minuta.'},
 {g:'baixa',tipo:'Edital × ETP',t:'Benefícios de ME/EPP',a:['Edital 3.5.1','Não se aplica o tratamento favorecido dos arts. 42 a 49 da LC 123.'],b:['ETP 16','ME/EPP poderão usar os benefícios dos arts. 42 a 49, quando cabível.'],why:'Sem efeito prático: vale o Edital.',todo:'Nenhuma ação necessária.'},
 {g:'baixa',tipo:'Edital e anexos',t:'Referências e numeração com erro',a:['Edital 8.1 · TR 5.10.1 · Anexo VIII','Habilitação "no Anexo I"; van descrita no item "II.10.2.1" e no "Lote 02"; S-2 como "Categoria 10".'],b:['TR 8 · TR 5.9.3 · ETP 11','Habilitação está no TR item 8; não há item II nem lotes; S-2 é "Categoria 8" no TR; PCA item 108 (TR 2.2) × 233 (ETP).'],why:'Falhas formais copiadas de outros documentos, sem efeito no preço.',todo:'Nenhuma ação necessária.'}
];

const MATRIZ=[
 {g:'Habilitação',itens:[
  {id:'sicaf',t:'SICAF e Compras.gov.br regulares',d:'Credenciamento prévio, inclusive IPVA e ISS em dia',src:'Edital 3.1 · TR 8.16–8.17',elim:true},
  {id:'indices',t:'LG, LC e SG acima de 1',d:'Balanço e DRE dos 2 últimos exercícios',src:'TR 8.21 a',elim:true},
  {id:'ccl',t:'Capital de giro de R$ 12,39 milhões',d:'16,66% do valor estimado; R$ 4,96 milhões se a base for anual',src:'TR 8.21 b',elim:true},
  {id:'pl',t:'Patrimônio líquido de R$ 7,44 milhões',d:'10% do valor estimado; R$ 2,97 milhões se a base for anual',src:'TR 8.21 c',elim:true},
  {id:'contador',t:'Declaração do contador',d:'Atestando índices, capital de giro e patrimônio líquido',src:'TR 8.22',elim:false},
  {id:'at-15m',t:'Atestado: 15 meses de serviço similar',d:'Soma de períodos diferentes aceita',src:'TR 8.24.1.1',elim:true},
  {id:'at-52',t:'Atestado: contrato(s) com 52 veículos ou mais',d:'50% de 103; contratos simultâneos podem ser somados',src:'TR 8.24.1.2, 8.24.2',elim:true},
  {id:'at-base',t:'Atestado: base operacional de gerenciamento de frota',d:'Disponibilização e operação',src:'TR 8.24.1.3',elim:true},
  {id:'at-equip',t:'Atestado: veículos com equipamentos especiais',d:'Ou personalização operacional',src:'TR 8.24.1.4',elim:true},
  {id:'anexo7',t:'Declaração do Anexo VII.1',d:'Saúde e segurança no trabalho; Lei 6.019, arts. 5º-C e 5º-D',src:'TR 8.27',elim:false}
 ]},
 {g:'Frota e operação',itens:[
  {id:'frota',t:'103 veículos zero km dos grupos B, S-1, S-2 e S-4',d:'Mais a reserva técnica de 12%',src:'TR 5.1.1, 5.2.4.5',elim:false},
  {id:'provis',t:'Seminovos para começar em 10 dias úteis',d:'Zero km definitivos em 30, 45 ou 60 dias',src:'TR 5.2.1.11–5.2.1.12',elim:false},
  {id:'base',t:'Base operacional 24 h, segunda a domingo',d:'Sistema informatizado e comunicação com os veículos',src:'TR 5.12',elim:false},
  {id:'15min',t:'Metade da frota a até 15 min do Itaim Bibi',d:'Rua Iguatemi, 105, em trânsito normal',src:'TR 5.12.2',elim:false},
  {id:'equip',t:'Sinalizador, smartphone e GPS com câmera nos 80 hatches',d:'Fornecedor e instalador definidos',src:'TR 5.7.2',elim:false},
  {id:'van',t:'Van adaptada como base móvel',d:'Adaptador contratado para entregar em 60 dias',src:'TR 5.10, 5.2.1.12',elim:false},
  {id:'subst',t:'Substituição em 3 h na capital e 8 h no interior',d:'Rede de apoio no estado',src:'TR 5.2.4.3, 5.3.10',elim:false},
  {id:'seguro',t:'Seguro total com terceiros',d:'R$ 100 mil materiais, R$ 100 mil corporais, R$ 50 mil morais',src:'TR 5.2.6.2.1',elim:false}
 ]},
 {g:'Equipe',itens:[
  {id:'motoristas',t:'Motoristas para 50 postos e plantão noturno',d:'3 anos de experiência, CNH compatível, direção defensiva',src:'TR 5.6, 5.12.7.18',elim:false},
  {id:'encarreg',t:'Encarregados da base em 44 h semanais',d:'Cobertura 24 h',src:'TR 5.12.6',elim:false},
  {id:'preposto',t:'Preposto que não seja motorista',d:'Designado antes do início',src:'TR 5.2.8.1, 6.6',elim:false}
 ]},
 {g:'Finanças',itens:[
  {id:'garantia',t:'Garantia de 5%',d:'R$ 1,49 milhão (base anual) a R$ 3,72 milhões (30 meses)',src:'Minuta 11.1',elim:false},
  {id:'giro',t:'Caixa para cerca de 70 dias de custos',d:'Mais a compra ou o financiamento da frota',src:'TR 7.5–7.30',elim:false},
  {id:'capital',t:'Capital social compatível com o número de empregados',d:'Lei 6.019, art. 4º-B',src:'Edital 7.9.9.2',elim:false},
  {id:'cadin',t:'Sem registro no Cadin estadual',d:'Condição para assinar e para receber',src:'Edital 14.2.1.3 · TR 7.32.1',elim:true}
 ]}
];

const KIT=[
 {g:'Proposta ajustada ao lance',prazo:'2 horas · Edital 6.20.4',itens:[
  {id:'k-prop',t:'Planilha de proposta (Anexo VI) preenchida',d:'11 subitens, totais em 30 meses e dados da empresa'},
  {id:'k-comp',t:'Planilha de composição de custos da mão de obra',d:'Postos de 12 h e de 16 h, com BDI e encargos (Edital 7.12)'},
  {id:'k-sind',t:'Declaração de enquadramento sindical',d:'Atividade, convenção, sindicatos, data-base e CBO (Edital 7.9.8)'},
  {id:'k-anomod',t:'Ano/modelo dos veículos e componente de locação',d:'TR 5.2.1.2 e 5.2.1.15.5'},
  {id:'k-valid',t:'Validade da proposta de 60 dias ou mais',d:'Edital 5.8'}
 ]},
 {g:'Habilitação',prazo:'2 horas, prorrogável · Edital 8.9.1',itens:[
  {id:'k-atest',t:'Atestados técnicos digitalizados',d:'15 meses, 52 veículos, base operacional e veículos equipados'},
  {id:'k-contr',t:'Cópias dos contratos dos atestados',d:'Podem ser pedidas (TR 8.24.4)'},
  {id:'k-bal',t:'Balanço e DRE dos 2 últimos exercícios',d:'Se não estiverem no SICAF'},
  {id:'k-cont',t:'Declaração do contador',d:'LG, LC, SG, capital de giro e patrimônio líquido (TR 8.22)'},
  {id:'k-fal',t:'Certidão de falência e recuperação atualizada',d:'TR 8.20'},
  {id:'k-anexo7',t:'Declaração do Anexo VII.1 assinada',d:'TR 8.27'},
  {id:'k-local',t:'Declaração de conhecimento das condições locais',d:'TR 8.23, por cautela'}
 ]},
 {g:'Assinatura do contrato',prazo:'5 dias · Edital 14.2.2',itens:[
  {id:'k-gar',t:'Garantia de 5% contratada',d:'Seguro, fiança, caução ou título (TR 4.3)'},
  {id:'k-carta',t:'Carta ou registro sindical',d:'Edital 7.9.9.1'},
  {id:'k-capital',t:'Capital social integralizado compatível',d:'Edital 7.9.9.2'},
  {id:'k-cadin',t:'Consulta ao Cadin estadual sem pendência',d:'Edital 14.2.1.3'},
  {id:'k-plano',t:'Plano de entrega dos 103 veículos em 10 dias úteis',d:'Seminovos, base e motoristas contratados'}
 ]}
];

const SIM_PARAMS=[
 {k:'trib',l:'Tributos sobre o faturamento',h:'PIS, COFINS, ISS, IRPJ e CSLL do seu regime',u:'%',def:9},
 {k:'adm',l:'Despesas indiretas',h:'sobre o custo direto: administração, preposto, sistemas',u:'%',def:5},
 {k:'glosa',l:'Desconto esperado pelo IMR',h:'perda média do faturamento pela avaliação',u:'%',def:1},
 {k:'marg',l:'Margem líquida desejada',h:'sobre o valor do lance',u:'%',def:5},
 {k:'ciclo',l:'Ciclo até receber',h:'dias entre o serviço e o pagamento (TR 7)',u:'dias',def:70},
 {k:'juros',l:'Custo do capital de giro',h:'taxa mensal do seu financiamento',u:'%/mês',def:1.5},
 {k:'garan',l:'Custo anual da garantia',h:'prêmio do seguro sobre os 5% garantidos',u:'%/ano',def:1.5}
];
const SIM_DEF=()=>{const o={lance:70000000}; COMPONENTS.forEach(c=>{if(!c.fixed)o['c_'+c.k]=c.def}); SIM_PARAMS.forEach(p=>o[p.k]=p.def); return o;};

const SECTIONS=[
 {id:'ficha',sec:'ficha',nome:'Ficha do edital',q:'Quais são os dados básicos do pregão?',etapa:1,min:2},
 {id:'condicoes',sec:'cond',nome:'Condições gerais',q:'Quais regras valem para o contrato e como a empresa é paga?',etapa:1,min:4},
 {id:'operacao',sec:'oper',nome:'Estrutura e entrega',q:'O que a empresa precisa ter montado e em quanto tempo?',etapa:1,min:3},
 {id:'veiculos',sec:'oper',nome:'Veículos e equipamentos',q:'Quais veículos, quantos e com quais equipamentos?',etapa:1,min:3},
 {id:'motoristas',sec:'oper',art:'decl',nome:'Serviço de motorista',q:'Em que condições os motoristas trabalham?',etapa:1,min:2},
 {id:'qualificacao',sec:'qual',nome:'Qualificação',q:'O que a empresa precisa comprovar para ser habilitada?',etapa:2,min:3},
 {id:'declaracoes',sec:'decl',nome:'Declarações',q:'Quais documentos vão além do SICAF e quando?',etapa:2,min:2},
 {id:'conflitos',sec:'conf',nome:'Conflitos',q:'Onde os documentos se contradizem e o que fazer antes de propor?',etapa:2,min:4},
 {id:'planilha',sec:'plan',nome:'Planilha de custo',q:'Como o órgão chegou aos R$ 74,4 milhões?',etapa:2,min:3},
 {id:'matriz',sec:'matriz',nome:'Matriz de aderência',q:'A empresa cumpre cada exigência? Se não, como vai suprir?',etapa:3,min:6},
 {id:'kit',sec:'kit',nome:'Kit das 2 horas',q:'O que precisa estar pronto antes da sessão para não perder depois de vencer?',etapa:3,min:4},
 {id:'simulador',sec:'simul',nome:'Simulador de lance',q:'Até onde a empresa pode baixar o preço sem ter prejuízo?',etapa:4,min:5},
 {id:'riscos',sec:'risco',nome:'Caixa e riscos',q:'A empresa aguenta financiar a operação até o primeiro pagamento?',etapa:4,min:3},
 {id:'parecer',sec:'parecer',nome:'Parecer final',q:'Participar ou não participar?',etapa:5,min:3}
];

/* capital de giro do ciclo: custo mensal (30 meses) × ciclo */
const giroK=r=>r.C/MESES*((state.sim.ciclo||0)/30);
const garVal=L=>0.05*L*12/MESES;
const PRAZO=[2026,11,19];

const TAKE={
 ficha:()=>'Pregão eletrônico de menor preço global, item único, sem benefício para ME/EPP, com contrato de 30 meses. Os dados básicos e o objeto completo estão abaixo.',
 condicoes:()=>'Contrato de 30 meses (até 10 anos), garantia de 5% e pagamento em até 30 dias da nota. Os veículos com motorista são 66% do valor.',
 operacao:()=>'Central 24 h, metade da frota a 15 min do Itaim Bibi e 10 dias úteis para começar, com seminovos até chegarem os zero km.',
 veiculos:()=>'103 veículos zero km: 80 hatches equipados para fiscalização, 17 sedãs, 4 caminhonetes, 1 sedã executivo e 1 van base móvel.',
 motoristas:()=>'50 postos com motorista de 12 h (e um de 16 h), mais plantão noturno de 5, com motoristas de 3 anos de experiência.',
 qualificacao:()=>'Para habilitar: atestados de 15 meses e 52 veículos, índices acima de 1, capital de giro de R$ 12,39 mi e patrimônio líquido de R$ 7,44 mi.',
 declaracoes:()=>'Planilhas e declaração sindical em 2 horas depois do lance; declarações do contador e do Anexo VII.1 na habilitação.',
 conflitos:()=>CONFLITOS.filter(c=>c.g==='alta').length+' pontos podem mudar seu preço ou te inabilitar. O prazo para questionar o órgão vence em 19/11 ('+leftTxt(daysUntil(...PRAZO))+').',
 planilha:()=>'Os 11 subitens somam o teto da proposta. Reserva técnica e plantão noturno não têm linha própria e entram nos seus preços.',
 matriz:()=>{const s=matrizSummary(); return s.title+': '+s.evaluated+' de '+s.all.length+' requisitos avaliados.';},
 kit:()=>{const a=KIT.flatMap(g=>g.itens),d=a.filter(i=>state.kit.done[i.id]).length; return d+' de '+a.length+' documentos prontos. Cada um que faltar no prazo de 2 horas pode custar o contrato.';},
 simulador:()=>{const r=calc(state.sim); return isFinite(r.Pmin)?'Com os custos informados, seu lance mínimo é '+fmt0(r.Pmin)+' em 30 meses (desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+')'+(isDefault()?', ainda com custos de exemplo.':'.'):'Com os percentuais atuais, nenhum preço cobre os custos.';},
 riscos:()=>{const r=calc(state.sim); const L=r.L>0?r.L:REF; return 'Antes de assinar, reserve cerca de '+fmt0(giroK(r))+' de capital de giro e '+fmt0(garVal(L))+' de garantia, além da frota.';},
 parecer:()=>{const p=parecerCalc(); return p.title+(p.title.endsWith('…')?' ':'. ')+(state.parecer.decisao?'O parecer da empresa já foi registrado.':'Registre a decisão da empresa no fim desta página.');}
};
const HN={
 ficha:()=>[{v:'R$ 74,4 mi',l:'valor total em 30 meses',c:'gold'},{v:'25/11',l:'sessão pública, às 9h30',c:'ink'},{v:'103',l:'veículos zero km',c:'ink'}],
 condicoes:()=>[{v:'5%',l:'garantia contratual',c:'gold'},{v:'66%',l:'do valor nos veículos com motorista',c:'blue'},{v:'30 dias',l:'para pagar após a nota',c:'ink'}],
 operacao:()=>[{v:'24 h',l:'central de operações',c:'ink'},{v:'10 dias úteis',l:'para começar',c:'blue'},{v:'12%',l:'de reserva técnica',c:'red'}],
 veiculos:()=>[{v:'103',l:'veículos zero km',c:'ink'},{v:'80',l:'hatches com giroflex e GPS',c:'blue'},{v:'1',l:'van base móvel',c:'ink'}],
 motoristas:()=>[{v:'50',l:'postos com motorista',c:'ink'},{v:'12 h',l:'por dia, segunda a sexta',c:'blue'},{v:'5',l:'no plantão noturno',c:'red'}],
 qualificacao:()=>[{v:'52',l:'veículos a comprovar em atestado',c:'red'},{v:'R$ 12,39 mi',l:'capital de giro exigido',c:'gold'},{v:'R$ 7,44 mi',l:'patrimônio líquido exigido',c:'gold'}],
 declaracoes:()=>[{v:'4',l:'documentos com a proposta',c:'ink'},{v:'5',l:'na habilitação',c:'ink'},{v:'2 h',l:'prazo depois do lance',c:'red'}],
 conflitos:()=>{const n=daysUntil(...PRAZO); return [{v:String(CONFLITOS.filter(c=>c.g==='alta').length),l:'de alta gravidade',c:'red'},{v:String(CONFLITOS.length),l:'pontos no total',c:'ink'},{v:n<0?'encerrado':n===0?'hoje':n+(n===1?' dia':' dias'),l:'para questionar (até 19/11)',c:'red'}];},
 planilha:()=>[{v:'R$ 74,4 mi',l:'total de referência',c:'gold'},{v:'11',l:'subitens a cotar',c:'ink'},{v:'R$ 32,9 mil',l:'por veículo com motorista ao mês',c:'blue'}],
 matriz:()=>{const s=matrizSummary(); return [{v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,l:'atendidos, com ou sem ajuste',c:'green'},{v:String(s.c.verificar),l:'a verificar',c:'ink'},{v:String(s.blockers.length),l:'bloqueios eliminatórios',c:'red'}];},
 kit:()=>{const g=KIT.map(x=>x.itens.filter(i=>state.kit.done[i.id]).length+' de '+x.itens.length); const a=KIT.flatMap(x=>x.itens); return [{v:a.filter(i=>state.kit.done[i.id]).length+' de '+a.length,l:'documentos prontos',c:'green'},{v:g[0],l:'proposta ajustada',c:'ink'},{v:g[1],l:'habilitação',c:'ink'}];},
 simulador:()=>{const r=calc(state.sim), ok=isFinite(r.Pmin); return [{v:ok?fmtMi(r.Pmin):'—',l:'lance mínimo viável',c:'blue'},{v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',l:'desconto máximo',c:'blue'},{v:isFinite(r.margL)?pct(r.margL):'—',l:'margem no lance testado',c:r.margL<0?'red':'green'}];},
 riscos:()=>{const r=calc(state.sim), L=r.L>0?r.L:REF; return [{v:fmtMi(giroK(r)),l:'capital de giro estimado',c:'gold'},{v:fmtMi(garVal(L)),l:'garantia (5% do valor anual)',c:'gold'},{v:'~'+NUM.format(state.sim.ciclo||0)+' dias',l:'até o primeiro pagamento',c:'ink'}];},
 parecer:()=>{const p=parecerCalc(); return [{v:p.title,l:'recomendação calculada',c:'gold'},{v:Math.round(overallProgress()*100)+'%',l:'da análise concluída',c:'ink'},{v:String(p.steps.length),l:'próximos passos',c:'ink'}];}
};
const CARD={
 ficha:()=>({m:'R$ 74,4 mi',s:'sessão em 25/11 · 9h30'}),
 condicoes:()=>({m:'30 meses',s:'garantia de 5% · até 10 anos'}),
 operacao:()=>({m:'Central 24 h',s:'início em 10 dias úteis'}),
 veiculos:()=>({m:'103 veículos',s:'zero km · 80 equipados'}),
 motoristas:()=>({m:'50 postos',s:'12 h por dia + plantão noturno'}),
 qualificacao:()=>({m:'4 atestados',s:'e R$ 12,39 mi de capital de giro',c:'alert'}),
 declaracoes:()=>({m:'9 documentos',s:'2 horas na proposta e na habilitação',c:'warn'}),
 conflitos:()=>({m:CONFLITOS.length+' pontos',s:CONFLITOS.filter(c=>c.g==='alta').length+' de alta gravidade',c:'alert'}),
 planilha:()=>({m:'11 subitens',s:'reserva técnica sem linha própria',c:'alert'}),
 matriz:()=>{const s=matrizSummary(); return {m:(s.c.atende+s.c.ajuste)+' de '+s.all.length,s:s.title,c:s.kind==='go'?'ok':s.kind==='nogo'?'alert':'warn'};},
 kit:()=>{const a=KIT.flatMap(x=>x.itens), d=a.filter(i=>state.kit.done[i.id]).length; return {m:d+' de '+a.length,s:'documentos prontos',c:d===a.length?'ok':''};},
 simulador:()=>{const r=calc(state.sim); return {m:isFinite(r.Pmin)?fmtMi(r.Pmin):'—',s:'lance mínimo viável'+(isDefault()?' · exemplo':'')};},
 riscos:()=>{const r=calc(state.sim); return {m:fmtMi(giroK(r)),s:'capital de giro até receber'};},
 parecer:()=>{const p=parecerCalc(); return {m:p.title,s:state.parecer.decisao?'decisão registrada':'registrar a decisão',c:p.kind==='go'?'ok':p.kind==='nogo'?'alert':'warn'};}
};

/* ---------------- condições gerais e planilha ---------------- */
function renderComposition(){
  $('stack').innerHTML=COMPONENTS.map(c=>'<i style="width:'+(c.v/REF*100)+'%;background:'+c.cor+'" title="'+esc(c.nome)+'"></i>').join('');
  $('legend').innerHTML=COMPONENTS.map(c=>'<li><span class="sw" style="background:'+c.cor+'"></span><span><b>'+c.nome+'</b> <span class="hint">· '+c.det+'</span></span><span class="r">'+fmt(c.v)+'</span><span class="r p">'+pct(c.v/REF)+'</span></li>').join('')+'<li><span></span><span><b>Total do item (30 meses)</b></span><span class="r"><b>'+fmt(REF)+'</b></span><span class="r p">100%</span></li>';
  $('planTiles').innerHTML=COMPONENTS.map((c,i)=>'<div class="tile t'+(i+1)+'"><span class="k">'+c.nome+'</span><span class="v">'+fmt0(c.v)+'</span><span class="s">'+pct(c.v/REF)+' do total</span></div>').join('')+'<div class="tile t6"><span class="k">Total do item</span><span class="v">'+fmt0(REF)+'</span><span class="s">'+fmt0(MENSAL)+' por mês</span></div>';
}
function toggleZoom(){const s=$('sheet'); s.classList.toggle('zoom'); $('zoomBtn').textContent=s.classList.contains('zoom')?'Ajustar à largura':'Ampliar';}
$('zoomBtn').addEventListener('click',toggleZoom); $('sheetImg').addEventListener('click',toggleZoom);

/* ---------------- riscos ---------------- */
function renderRiscos(r){
  const L=r.L>0?r.L:REF;
  const T=[
   ['Faturamento mensal médio',fmt0(L/MESES),'lance ÷ 30 meses','t4'],
   ['Garantia de 5%',fmt0(garVal(L)),'base anual · até '+fmt0(0.05*L)+' sobre 30 meses','t1'],
   ['Capital de giro estimado',fmt0(giroK(r)),'custos de '+NUM.format(state.sim.ciclo)+' dias, sem a frota','t5'],
   ['Reserva técnica',String(Math.ceil(103*0.12))+' veículos','12% de 103, sem preço na planilha','t3']
  ];
  $('riskTiles').innerHTML=T.map(t=>'<div class="tile '+t[3]+'"><span class="k">'+t[0]+'</span><span class="v">'+t[1]+'</span><span class="s">'+t[2]+'</span></div>').join('');
}
function renderImr(){
  const f=parseNum($('imr-f').value), n=parseNum($('imr-n').value), z=parseNum($('imr-z').value);
  const lib=(n<5||z>1)?0.75:(n<6.75||z===1)?0.9:1;
  $('imrOut').innerHTML=svg('alert')+'<p>Com nota '+NUM.format(n)+(z?' e '+NUM.format(z)+' nota(s) zero':'')+', a ARTESP libera <b>'+pct(lib,0)+'</b> da fatura: '+fmt(f*lib)+' (desconto de '+fmt(f*(1-lib))+' no mês).</p>';
}
['imr-f','imr-n','imr-z'].forEach(id=>$(id).addEventListener('input',renderImr));


const E={
  slug:'pe-25-2026-artesp', docPrefix:'', lsPrefix:'pe25art-',
  ref:REF, teto:REF, garantiaPct:0.05*MESES/12, giro:'mensal', /* 5% do total mantido por 30 meses: prêmio anual × 2,5 (igual ao resumo do investidor) */
  sessao:[2026,11,25], sessaoNome:'Sessão', chip:'R$ 74,4 mi · 30 meses',
  deadlines:[
   {d:[2026,11,19],lbl:'19/11',t:'Último dia para impugnar e pedir esclarecimento',s:'Edital 13.1–13.2 · e-mail, com os 4 endereços em cópia: ',mail:'andrea.paradela@artesp.sp.gov.br'},
   {d:[2026,11,24],lbl:'24/11',t:'Limite para a ARTESP responder',s:'Último dia útil antes da sessão · Edital 13.4'},
   {d:[2026,11,25],lbl:'25/11 · 9h30',t:'Sessão pública no Compras.gov.br',s:'Envio da proposta até a abertura · Edital 4.2'},
   {d:[2026,12,6],lbl:'06/12',t:'Fim do contrato atual da ARTESP',s:'Pressão para início rápido, com seminovos · ETP item 2'}
  ],
  prazoQuestionar:PRAZO,
  sim:{
    tetoNome:'valor estimado', refNome:'referência', artExeq:'Edital 7.8–7.10', artAcima:'Edital 7.7.3',
    tetoLabel:()=>'Referência<br>R$ 74,4 mi',
    minSub:r=>'≈ '+fmt0(r.Pmin/MESES)+' por mês',
    margSub:r=>'≈ '+fmt0(r.margL*r.L)+' em 30 meses',
    descValue:(r,ok,ref)=>ok?(r.Pmin<ref?pct(1-r.Pmin/ref):'sem desconto'):'—',
    passo:L=>L*0.01,
    extraAlerts:r=>{const A=[]; if(r.L>0&&r.L<0.6*REF) A.push(['warn','O lance está abaixo de 60% da referência: o ETP 15 trata isso como indício de inexequibilidade; o Edital 7.8 usa 40%. Tenha a planilha de exequibilidade pronta.']); return A;}
  },
  kpis(x){ const {s,r,exemplo,ok}=x; const dImp=daysUntil(...PRAZO); return [
   {href:'planilha',k:'Valor total estimado',v:'R$ 74,4 mi',c:'gold',s:'30 meses · 103 veículos · item único'},
   {href:'simulador',k:'Desconto máximo viável',v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',c:'blue',s:ok?'lance mínimo '+fmtMi(r.Pmin)+(exemplo?' (custos de exemplo)':''):'revise o simulador'},
   {href:'conflitos',k:'Conflitos graves',v:String(CONFLITOS.filter(c=>c.g==='alta').length),c:'red',s:'questionar até 19/11 ('+leftTxt(dImp)+')'},
   {href:'matriz',k:'Requisitos atendidos',v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,c:'green',s:s.c.verificar?s.c.verificar+' a verificar na matriz':(s.blockers.length?s.blockers.length+' bloqueio(s)':'todos avaliados')}
  ]; },
  precoTxt:r=>'Lance mínimo de '+fmt0(r.Pmin)+' em 30 meses, desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+'.'+(r.Pmin<0.6*REF?' Abaixo de 60% da referência: prepare a prova de exequibilidade.':''),
  riscosTxt:d=>'Renovação da frota, reserva técnica, fator do provisório e base do capital de giro. Prazo para questionar: 19/11 ('+leftTxt(d)+').',
  prepTxt:(r,L)=>'Documentos do kit das 2 horas prontos. Caixa: cerca de '+fmt0(giroK(r))+' de capital de giro e '+fmt0(garVal(L))+' de garantia, além da frota.',
  passoBloqueio:'Avaliar consórcio (soma de atestados e de valores, com +10% na exigência financeira) antes de desistir.',
  exeqStep:'Preparar a prova de exequibilidade do preço (Edital 7.8 a 7.10).',
  questionarStep:a=>'Decidir até 19/11 se vai pedir esclarecimento ou impugnar os '+a+' pontos de alta gravidade.',
  stepsGo:['Revisar os preços dos 11 subitens da planilha de proposta.','Cadastrar a proposta no Compras.gov.br antes de 25/11, às 9h30.'],
  init(){ renderComposition(); renderImr(); },
  onSim(r){ renderRiscos(r); }
};
