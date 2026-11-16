/* ===== Edital: Pregão Eletrônico 319/2026 (Casa Civil) ===== */
/* ---------------- dados ---------------- */
const REF=20835706.71;
const COMPONENTS=[
 {k:'loc',  nome:'Locação de veículos', det:'22 categorias · 4 faixas de prazo', v:14456136.20, cor:'var(--blue)', def:55},
 {k:'mot',  nome:'Diárias de motoristas', det:'7.501 diárias · 2.658 com adicional · 5.344 h extras', v:4791359.20, cor:'var(--green)', def:85},
 {k:'age',  nome:'Agente de missão', det:'300 diárias · 178 com adicional de 60%', v:807024.00, cor:'var(--steel)', def:70},
 {k:'comb', nome:'Combustível', det:'repasse pelo preço ANP · não cotado', v:705552.91, cor:'var(--gold)', fixed:true},
 {k:'ns',   nome:'No show', det:'veículo reservado e não usado', v:75634.40, cor:'var(--amber)', def:30}
];
const CATS=[
 ['A','Executivo Blindado II',2400,709437.00,'atestado'],
 ['B','Camioneta I Blindada 4x4 (SUV I)',3200,1176567.00,''],
 ['C','Camioneta I Blindada 4x2 (SUV I)',3200,1770867.00,''],
 ['D','Camioneta II Blindada (SUV II)',2980,878869.00,'atestado'],
 ['E','Camioneta I 4x4 (SUV I)',2300,49764.00,''],
 ['F','Camioneta I 4x2 (SUV I)',1900,436070.00,''],
 ['G','Camioneta II (SUV II)',1500,187636.00,'atestado'],
 ['H','Camioneta III (SUV III)',1400,857142.00,''],
 ['I','Caminhonete 4x4',1800,279896.00,'atestado'],
 ['J','Caminhonete 4x2',1500,187558.00,'atestado'],
 ['K','Executivo II',1000,611295.60,'frota'],
 ['L','Sedan',680,3046115.00,'frota'],
 ['M','Van teto baixo',1100,47344.00,''],
 ['N','Van Executiva',1500,2930554.00,''],
 ['O','Van Furgão',1500,100874.00,''],
 ['P','Utilitário Furgão',850,81194.00,''],
 ['Q','Ônibus Rodoviário',3500,345633.60,''],
 ['R','Ônibus Urbano',3200,317784.00,''],
 ['S','Micro-ônibus',2800,116994.00,''],
 ['T','Microcaminhão',1500,311314.00,''],
 ['U','Guincho',1300,7994.00,''],
 ['V','Veículo para transporte de cadeirante',1000,5234.00,'']
];
const LOC_TOTAL=14456136.20;
const PL=/*PLANILHA_DATA*/null;

const CONFLITOS=[
 {g:'alta',tipo:'Edital × TR',t:'Prazo do seguro-garantia',a:['Edital 9.2–9.4','Assinatura do contrato em 5 dias úteis da convocação.'],b:['TR 4.8–4.8.2','Apólice entregue até a assinatura; se não, perde-se a opção pelo seguro.'],why:'A Lei 14.133 (art. 96, §3º) assegura prazo mínimo de 1 mês entre a homologação e a assinatura para quem escolhe seguro-garantia. O texto não deixa isso expresso.',todo:'Pedir retificação para garantir o prazo legal sem perder a modalidade.'},
 {g:'alta',tipo:'Edital × TR',t:'Acréscimo indefinido para consórcio',a:['Edital 8.4.1','Acréscimo "entre 10% a 30%" na habilitação econômico-financeira do consórcio.'],b:['TR 8.40.1.1','Repete a faixa sem fixar o percentual.'],why:'Sem o percentual, o consórcio não sabe qual patrimônio ou capital precisa comprovar.',todo:'Pedir que fixem o percentual e a base de cálculo.'},
 {g:'alta',tipo:'Dentro do TR',t:'Subcontratação × sublocação',a:['TR 4.2–4.5','Subcontratação vedada nas categorias K e L, com autorização prévia nas demais.'],b:['TR 5.9.2.1.2–3','Admite sublocar veículos, com redação que alcança todos os tipos.'],why:'Decide se veículos de terceiros podem atender Executivo II e Sedan, as categorias de maior volume.',todo:'Pedir definição dos dois conceitos e das categorias admitidas em cada um.'},
 {g:'alta',tipo:'TR × Planilha',t:'No show acima do teto de 70%',a:['TR 5.11.3','No show limitado a 70% da diária de 10 h.'],b:['Apêndice IV','19 das 22 categorias com no show acima desse limite, somando R$ 11.525,60 no ano. A hora extra da categoria A (15 a 29 dias) também passa de 20% da diária.'],why:'Os preços da planilha são máximos aceitáveis. Copiar esses valores viola o próprio TR.',todo:'Na sua planilha, respeite o teto de 70% (a Google Planilha já calcula). Pedir correção da planilha oficial.'},
 {g:'alta',tipo:'Dentro do TR',t:'Índices contábeis × patrimônio líquido',a:['TR 8.26','Se algum índice for 1 ou menos, aceita patrimônio líquido de 10% (R$ 2.083.570,67).'],b:['TR 8.27','Exige os índices nos dois exercícios, sob pena de inabilitação.'],why:'Não fica claro se o patrimônio líquido substitui índice ruim em um ou nos dois exercícios.',todo:'Pedir esclarecimento antes de contar com a alternativa do patrimônio líquido.'},
 {g:'media',tipo:'TR × Planilha',t:'Adicional de 60% do agente de missão',a:['TR 5.8','Adicional de 60% calculado sobre a diária do motorista: R$ 1.380 + 60% de R$ 380 = R$ 1.608.'],b:['Apêndice IV','Planilha usa R$ 2.208, que é 60% sobre a diária do próprio agente.'],why:'Diferença de R$ 600 por diária em 178 diárias (R$ 106.800 por ano).',todo:'Pedir uniformização e cotar conforme a resposta.'},
 {g:'media',tipo:'Edital × TR',t:'Momento das declarações de 4 h e 6 h',a:['Edital 6.23.4.1','Remete aos itens 5.9.1 e 5.9.2 do TR como documentos complementares da proposta ajustada.'],b:['TR 5.9.1–5.9.2','Exige as declarações sem dizer quando. Termos dos Apêndices V e VII também sem momento.'],why:'Documento não entregue quando pedido é infração (Edital 11.1.1).',todo:'Ter tudo pronto no Kit das 2 horas e enviar junto com a proposta ajustada.'},
 {g:'media',tipo:'ETP × TR',t:'Pagamento pelo menor cenário',a:['ETP seção 4','Compara até três cenários e paga o menor; diz que os parâmetros não podem ser questionados.'],b:['TR 5.11, 17.2','Não detalha os cenários nem a memória de cálculo.'],why:'Afeta a receita real por missão e o direito de contestar medições.',todo:'Pedir fórmulas e exemplos, e que se preserve o direito de contestar erros.'},
 {g:'media',tipo:'Dentro do TR',t:'Caminhonete 4x2 descrita com tração 4x4',a:['Apêndice II, título','Categoria J: Caminhonete 4x2.'],b:['Apêndice II, descrição','Texto da especificação cita tração 4x4.'],why:'Muda o veículo e o custo a cotar na categoria J.',todo:'Pedir qual especificação será aceita.'},
 {g:'baixa',tipo:'Dentro do TR',t:'Idade e quilometragem',a:['TR 5.9.2.1.4','Máximo de 5 anos ou 100.000 km.'],b:['Tabela de infrações, item 12','Fala em "menos de 5 anos" e abaixo de 100.000 km.'],why:'Veículo com exatamente 5 anos ou 100.000 km fica em dúvida.',todo:'Usar veículos abaixo dos limites ou pedir esclarecimento.'},
 {g:'baixa',tipo:'Dentro do TR',t:'Comprovação da blindagem',a:['TR 5.9.2.1.7','CRLV ou Termo de Responsabilidade da blindadora.'],b:['TR 11.18','Pode ser lido como exigência dos dois documentos.'],why:'Risco de recusa de veículo blindado na apresentação.',todo:'Manter os dois documentos de cada blindado.'},
 {g:'baixa',tipo:'Edital',t:'Falhas de redação no Edital',a:['Edital 1.1','A frase do objeto termina em "conforme" sem complemento.'],b:['Edital 13.1–13.2','Numeração dos itens 13.1 e 13.2 repetida.'],why:'Falhas formais sem efeito no preço.',todo:'Nenhuma ação necessária.'}
];

const MATRIZ=[
 {g:'Habilitação',itens:[
  {id:'sicaf',t:'SICAF e Compras.gov.br regulares',d:'Condições atendidas até 17/11/2026 (3º dia útil antes da sessão)',src:'Edital 2.2',elim:true},
  {id:'indices',t:'Índices LG, LC e SG acima de 1 nos 2 últimos exercícios',d:'Ou patrimônio líquido de R$ 2.083.570,67, com regra ambígua',src:'TR 8.25–8.27',elim:true},
  {id:'contador',t:'Declaração do contador com os índices',d:'Documento fora do SICAF, entregue em 2 h',src:'TR 8.30',elim:false},
  {id:'at-blind',t:'Atestado: 1 Executivo Blindado II ou SUV II blindada',d:'Ou categoria superior',src:'TR 8.38.1.1',elim:true},
  {id:'at-cam',t:'Atestado: 2 caminhonetes 4x4/4x2 ou SUV II',d:'Locação ou sublocação',src:'TR 8.38.1.1',elim:true},
  {id:'at-exec',t:'Atestado: 6 Executivo II ou superior',d:'Locação ou sublocação',src:'TR 8.38.1.1',elim:true},
  {id:'at-sedan',t:'Atestado: 10 Sedan ou superior',d:'Locação ou sublocação',src:'TR 8.38.1.1',elim:true},
  {id:'at-regras',t:'Atestados válidos',d:'Contrato concluído ou com 1 ano de execução, dentro do objeto social',src:'TR 8.38.2–8.38.3',elim:true}
 ]},
 {g:'Frota e operação',itens:[
  {id:'fr-exec',t:'6 Executivo II ou SUV II próprios',d:'CRLV em nome da empresa na assinatura; leasing documentado aceito',src:'TR 5.9.2.1',elim:true},
  {id:'fr-sedan',t:'10 Sedan próprios',d:'Mantidos durante toda a vigência',src:'TR 5.9.2.1',elim:true},
  {id:'idade',t:'Veículos dentro da idade e quilometragem',d:'5 anos ou 100.000 km; vans executivas 6 anos; ônibus 10 anos',src:'TR 5.9.2.1.4–6',elim:false},
  {id:'blind',t:'Blindados nível III-A com documentação',d:'Categorias A a D',src:'TR 5.9.2.1.7',elim:false},
  {id:'4h',t:'Atendimento em 4 h nas capitais e RM dos 4 estados',d:'ES, MG, RJ e SP',src:'TR 5.9.1',elim:false},
  {id:'6h',t:'Atendimento em 6 h no interior',d:'Rede própria ou de parceiros',src:'TR 5.9.2',elim:false},
  {id:'subloc',t:'Rede de sublocação para as demais categorias',d:'Vans, ônibus, utilitários, guincho, veículo para cadeirante',src:'TR 5.9.2.1.3',elim:false},
  {id:'central',t:'Central e celular 24 h exclusivos',d:'Indicados na assinatura',src:'TR 12.31',elim:false}
 ]},
 {g:'Equipe',itens:[
  {id:'preposto',t:'Preposto exclusivo para o contrato',d:'Em regime de prontidão',src:'TR 6.6–6.15',elim:false},
  {id:'agente',t:'Agentes de missão disponíveis',d:'Presenciais e exclusivos por missão',src:'TR 6.21–6.31',elim:false},
  {id:'motoristas',t:'Motoristas qualificados',d:'3 anos de CNH, direção defensiva, aptos a cortejo, levantamento de segurança',src:'TR 12.26, 12.36, 5.4',elim:false}
 ]},
 {g:'Finanças',itens:[
  {id:'garantia',t:'Garantia de 5% do valor anual',d:'Cerca de R$ 1,04 milhão sobre a referência',src:'TR 4.7–4.8',elim:false},
  {id:'giro',t:'Capital de giro para cerca de 3 meses de custos',d:'Inclui combustível adiantado',src:'TR 7, 5.3',elim:false},
  {id:'seguro',t:'Seguro casco 100% FIPE e RCFV',d:'R$ 50 mil, R$ 100 mil e R$ 5 mil',src:'TR 12.37',elim:false},
  {id:'cadin',t:'Sem registro no Cadin',d:'Impede a contratação',src:'Edital 9.6',elim:true}
 ]}
];

const KIT=[
 {g:'Proposta ajustada ao lance',prazo:'2 horas · Edital 6.23.4',itens:[
  {id:'k-prop',t:'Proposta de Preços (Anexo II) preenchida',d:'Validade mínima de 60 dias, dados bancários, preposto, assinatura'},
  {id:'k-plan',t:'Planilha de custos pronta para ajustar',d:'Preços na Google Planilha do painel; versão oficial .xlsx em gov.br/compras'},
  {id:'k-4h',t:'Declaração de atendimento em 4 horas',d:'TR 5.9.1'},
  {id:'k-6h',t:'Declaração de atendimento em 6 horas',d:'TR 5.9.2'},
  {id:'k-sub',t:'Declaração de condições de sublocar',d:'TR 5.9.2.1.2'},
  {id:'k-ciencia',t:'Termo de Ciência e Concordância',d:'Apêndice VII do TR'},
  {id:'k-conf',t:'Termo de Confidencialidade',d:'Apêndice V do TR'}
 ]},
 {g:'Habilitação',prazo:'2 horas · Edital 8.12.1',itens:[
  {id:'k-cont',t:'Declaração do contador com LG, LC e SG',d:'TR 8.30'},
  {id:'k-atest',t:'Atestados de capacidade técnica digitalizados',d:'Com as quantidades da tabela do TR 8.38'},
  {id:'k-contr',t:'Cópias dos contratos que sustentam os atestados',d:'Podem ser pedidas, TR 8.38.6'},
  {id:'k-bal',t:'Balanço e DRE dos 2 últimos exercícios',d:'Se não estiverem no SICAF'},
  {id:'k-fal',t:'Certidão negativa de falência atualizada',d:'Se não estiver no SICAF'},
  {id:'k-social',t:'Contrato social consolidado',d:'Com atividade compatível com o objeto'}
 ]},
 {g:'Assinatura do contrato',prazo:'5 dias úteis · Edital 9.2',itens:[
  {id:'k-crlv',t:'CRLV dos 16 veículos próprios',d:'6 Executivo II e 10 Sedan, TR 5.9.2.1'},
  {id:'k-gar',t:'Garantia de 5% contratada',d:'Seguro até a assinatura ou outra modalidade em 10 dias úteis'},
  {id:'k-24h',t:'Central e celular 24 h definidos',d:'TR 12.31'},
  {id:'k-cadin',t:'Consulta ao Cadin sem pendência',d:'Edital 9.6'}
 ]}
];

const SIM_PARAMS=[
 {k:'trib',l:'Tributos sobre o faturamento',h:'PIS, COFINS, ISS, IRPJ e CSLL do seu regime',u:'%',def:13},
 {k:'adm',l:'Despesas indiretas',h:'sobre o custo direto: escritório, central 24 h, preposto',u:'%',def:8},
 {k:'glosa',l:'Desconto esperado pelo IMR',h:'perda média do faturamento por falhas',u:'%',def:1},
 {k:'marg',l:'Margem líquida desejada',h:'sobre o valor do lance',u:'%',def:6},
 {k:'ciclo',l:'Ciclo até receber',h:'dias entre o serviço e o pagamento (TR 7)',u:'dias',def:85},
 {k:'juros',l:'Custo do capital de giro',h:'taxa mensal do seu financiamento',u:'%/mês',def:1.5},
 {k:'garan',l:'Custo anual da garantia',h:'prêmio do seguro sobre os 5% garantidos',u:'%/ano',def:1.5}
];
const SIM_DEF=()=>{const o={lance:19200000}; COMPONENTS.forEach(c=>{if(!c.fixed)o['c_'+c.k]=c.def}); SIM_PARAMS.forEach(p=>o[p.k]=p.def); return o;};

const SECTIONS=[
 {id:'ficha',sec:'ficha',nome:'Ficha do edital',q:'Quais são os dados básicos do pregão?',etapa:1,min:2},
 {id:'condicoes',sec:'cond',nome:'Condições gerais',q:'Quais regras valem para o contrato e como a empresa é paga?',etapa:1,min:4},
 {id:'operacao',sec:'oper',nome:'Estrutura operacional',q:'O que a empresa precisa ter montado para atender a Presidência?',etapa:1,min:3},
 {id:'qualificacao',sec:'qual',nome:'Qualificação',q:'O que a empresa precisa comprovar para ser habilitada?',etapa:2,min:3},
 {id:'declaracoes',sec:'decl',nome:'Declarações',q:'Quais documentos escritos acompanham a proposta, além do SICAF?',etapa:2,min:2},
 {id:'conflitos',sec:'conf',nome:'Conflitos',q:'Onde os documentos se contradizem e o que fazer antes de propor?',etapa:2,min:4},
 {id:'planilha',sec:'plan',nome:'Planilha de custo',q:'Como o órgão chegou aos R$ 20,8 milhões?',etapa:2,min:3},
 {id:'matriz',sec:'matriz',nome:'Matriz de aderência',q:'A empresa cumpre cada exigência? Se não, como vai suprir?',etapa:3,min:6},
 {id:'kit',sec:'kit',nome:'Kit das 2 horas',q:'O que precisa estar pronto antes da sessão para não perder depois de vencer?',etapa:3,min:4},
 {id:'simulador',sec:'simul',nome:'Simulador de lance',q:'Até onde a empresa pode baixar o preço sem ter prejuízo?',etapa:4,min:5},
 {id:'riscos',sec:'risco',nome:'Caixa e riscos',q:'A empresa aguenta financiar a operação até o primeiro pagamento?',etapa:4,min:3},
 {id:'parecer',sec:'parecer',nome:'Parecer final',q:'Participar ou não participar?',etapa:5,min:3}
];

const TAKE={
 ficha:()=>'Pregão eletrônico de menor preço, item único, sem benefício para ME/EPP. Os 11 dados básicos e o objeto completo estão abaixo.',
 condicoes:()=>'Contrato de 12 meses (até 10 anos), garantia de 5% e pagamento por diária. Sedan e Van Executiva somam 41% da locação.',
 operacao:()=>'Exige atender em 4 h nas capitais e 6 h no interior dos 4 estados, com 16 veículos próprios já na assinatura.',
 qualificacao:()=>'Para habilitar: atestados com 1 blindado, 2 caminhonetes, 6 Executivo II e 10 Sedan, e índices contábeis acima de 1.',
 declaracoes:()=>'3 declarações e 2 termos precisam estar prontos para enviar em até 2 horas depois do lance.',
 conflitos:()=>CONFLITOS.filter(c=>c.g==='alta').length+' pontos podem mudar seu preço ou te inabilitar. O prazo para questionar o órgão vence em 17/11 ('+leftTxt(daysUntil(2026,11,17))+').',
 planilha:()=>'Os preços do órgão são o teto da sua proposta. A própria planilha tem no show acima do limite em 19 de 22 categorias.',
 matriz:()=>{const s=matrizSummary(); return s.title+': '+s.evaluated+' de '+s.all.length+' requisitos avaliados.';},
 kit:()=>{const a=KIT.flatMap(g=>g.itens),d=a.filter(i=>state.kit.done[i.id]).length; return d+' de '+a.length+' documentos prontos. Cada um que faltar no prazo de 2 horas pode custar o contrato.';},
 simulador:()=>{const r=calc(state.sim); return isFinite(r.Pmin)?'Com os custos informados, seu lance mínimo é '+fmt0(r.Pmin)+' (desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+')'+(isDefault()?', ainda com custos de exemplo.':'.'):'Com os percentuais atuais, nenhum preço cobre os custos.';},
 riscos:()=>{const r=calc(state.sim); const L=r.L>0?r.L:REF; return 'Antes de assinar, reserve cerca de '+fmt0(r.K)+' de capital de giro e '+fmt0(L*0.05)+' de garantia.';},
 parecer:()=>{const p=parecerCalc(); return p.title+(p.title.endsWith('…')?' ':'. ')+(state.parecer.decisao?'O parecer da empresa já foi registrado.':'Registre a decisão da empresa no fim desta página.');}
};
const HN={
 ficha:()=>[{v:'R$ 20,8 mi',l:'valor anual estimado',c:'gold'},{v:'23/11',l:'sessão pública, às 9h30',c:'ink'},{v:'12 meses',l:'vigência, prorrogável até 10 anos',c:'ink'}],
 condicoes:()=>[{v:'R$ 1,04 mi',l:'garantia contratual de 5%',c:'gold'},{v:'41%',l:'da locação em Sedan e Van Executiva',c:'blue'},{v:'IPCA',l:'reajuste após 12 meses',c:'ink'}],
 operacao:()=>[{v:'16',l:'veículos próprios na assinatura',c:'ink'},{v:'4 h',l:'para atender nas capitais',c:'blue'},{v:'6 h',l:'para atender no interior',c:'blue'}],
 qualificacao:()=>[{v:'19',l:'veículos a comprovar em atestados',c:'red'},{v:'> 1',l:'índices LG, LC e SG exigidos',c:'ink'},{v:'R$ 2,08 mi',l:'patrimônio líquido alternativo',c:'gold'}],
 declaracoes:()=>[{v:'3',l:'declarações exigidas',c:'ink'},{v:'2',l:'termos enviados por cautela',c:'ink'},{v:'2 h',l:'prazo depois do lance',c:'red'}],
 conflitos:()=>{const n=daysUntil(2026,11,17); return [{v:String(CONFLITOS.filter(c=>c.g==='alta').length),l:'de alta gravidade',c:'red'},{v:String(CONFLITOS.length),l:'pontos no total',c:'ink'},{v:n<0?'encerrado':n===0?'hoje':n+(n===1?' dia':' dias'),l:'para questionar (até 17/11)',c:'red'}];},
 planilha:()=>[{v:'R$ 20,8 mi',l:'total de referência',c:'gold'},{v:'220',l:'preços de locação a cotar',c:'ink'},{v:'19 de 22',l:'no show acima do teto',c:'red'}],
 matriz:()=>{const s=matrizSummary(); return [{v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,l:'atendidos, com ou sem ajuste',c:'green'},{v:String(s.c.verificar),l:'a verificar',c:'ink'},{v:String(s.blockers.length),l:'bloqueios eliminatórios',c:'red'}];},
 kit:()=>{const g=KIT.map(x=>x.itens.filter(i=>state.kit.done[i.id]).length+' de '+x.itens.length); const a=KIT.flatMap(x=>x.itens); return [{v:a.filter(i=>state.kit.done[i.id]).length+' de '+a.length,l:'documentos prontos',c:'green'},{v:g[0],l:'proposta ajustada',c:'ink'},{v:g[1],l:'habilitação',c:'ink'}];},
 simulador:()=>{const r=calc(state.sim), ok=isFinite(r.Pmin); return [{v:ok?fmtMi(r.Pmin):'—',l:'lance mínimo viável',c:'blue'},{v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',l:'desconto máximo',c:'blue'},{v:isFinite(r.margL)?pct(r.margL):'—',l:'margem no lance testado',c:r.margL<0?'red':'green'}];},
 riscos:()=>{const r=calc(state.sim), L=r.L>0?r.L:REF; return [{v:fmtMi(r.K),l:'capital de giro estimado',c:'gold'},{v:fmtMi(L*0.05),l:'garantia contratual',c:'gold'},{v:'~85 dias',l:'até o primeiro pagamento',c:'ink'}];},
 parecer:()=>{const p=parecerCalc(); return [{v:p.title,l:'recomendação calculada',c:'gold'},{v:Math.round(overallProgress()*100)+'%',l:'da análise concluída',c:'ink'},{v:String(p.steps.length),l:'próximos passos',c:'ink'}];}
};
const CARD={
 ficha:()=>({m:'R$ 20,8 mi',s:'sessão em 23/11 · 9h30'}),
 condicoes:()=>({m:'12 meses',s:'garantia de 5% · até 10 anos'}),
 operacao:()=>({m:'16 veículos',s:'4 h nas capitais · 6 h no interior'}),
 qualificacao:()=>({m:'4 atestados',s:'eliminatório',c:'alert'}),
 declaracoes:()=>({m:'5 documentos',s:'enviar em até 2 horas',c:'warn'}),
 conflitos:()=>({m:CONFLITOS.length+' pontos',s:CONFLITOS.filter(c=>c.g==='alta').length+' de alta gravidade',c:'alert'}),
 planilha:()=>({m:'220 preços',s:'19 de 22 no show acima do teto',c:'alert'}),
 matriz:()=>{const s=matrizSummary(); return {m:(s.c.atende+s.c.ajuste)+' de '+s.all.length,s:s.title,c:s.kind==='go'?'ok':s.kind==='nogo'?'alert':'warn'};},
 kit:()=>{const a=KIT.flatMap(x=>x.itens), d=a.filter(i=>state.kit.done[i.id]).length; return {m:d+' de '+a.length,s:'documentos prontos',c:d===a.length?'ok':''};},
 simulador:()=>{const r=calc(state.sim); return {m:isFinite(r.Pmin)?fmtMi(r.Pmin):'—',s:'lance mínimo viável'+(isDefault()?' · exemplo':'')};},
 riscos:()=>{const r=calc(state.sim); return {m:fmtMi(r.K),s:'capital de giro até receber'};},
 parecer:()=>{const p=parecerCalc(); return {m:p.title,s:state.parecer.decisao?'decisão registrada':'registrar a decisão',c:p.kind==='go'?'ok':p.kind==='nogo'?'alert':'warn'};}
};
/* ---------------- condições gerais ---------------- */
function renderComposition(){
  $('stack').innerHTML=COMPONENTS.map(c=>'<i style="width:'+(c.v/REF*100)+'%;background:'+c.cor+'" title="'+esc(c.nome)+'"></i>').join('');
  $('legend').innerHTML=COMPONENTS.map(c=>'<li><span class="sw" style="background:'+c.cor+'"></span><span><b>'+c.nome+'</b> <span class="hint">· '+c.det+'</span></span><span class="r">'+fmt(c.v)+'</span><span class="r p">'+pct(c.v/REF)+'</span></li>').join('')+'<li><span></span><span><b>Total do item</b></span><span class="r"><b>'+fmt(REF)+'</b></span><span class="r p">100%</span></li>';
  const max=Math.max(...CATS.map(c=>c[3]));
  $('catTable').querySelector('tbody').innerHTML=CATS.map(c=>{const sh=c[3]/LOC_TOTAL; const tag=c[4]==='frota'?'<span class="pill elim">Atestado + frota própria</span>':c[4]==='atestado'?'<span class="pill att">Atestado</span>':''; return '<tr'+(c[4]?' class="hl"':'')+'><td><span class="cat-code">'+c[0]+'</span></td><td>'+c[1]+'</td><td class="r">'+fmt(c[2])+'</td><td class="r">'+fmt(c[3])+'</td><td><div class="barcell"><div class="bar"><i style="width:'+(c[3]/max*100)+'%"></i></div><span class="num" style="font-size:12.5px;text-align:right">'+pct(sh)+'</span></div></td><td>'+tag+'</td></tr>';}).join('')+'<tr><td></td><td><b>Subtotal locação</b></td><td></td><td class="r"><b>'+fmt(LOC_TOTAL)+'</b></td><td></td><td></td></tr>';
  $('planTiles').innerHTML=COMPONENTS.map((c,i)=>'<div class="tile t'+(i+1)+'"><span class="k">'+c.nome+'</span><span class="v">'+fmt0(c.v)+'</span><span class="s">'+pct(c.v/REF)+' do total</span></div>').join('')+'<div class="tile t6"><span class="k">Total do item</span><span class="v">'+fmt0(REF)+'</span><span class="s">valor anual estimado</span></div>';
}

/* ---------------- planilha ---------------- */
function renderPlanilha(){
  if(!PL) return;
  const r2=n=>Math.round(n*100)/100;
  // locação
  let h='<thead><tr><th rowspan="2">Cód.</th><th rowspan="2">Categoria</th><th class="fx fx1" colspan="3">Até 6 dias</th><th class="fx fx2">7 a 14 dias</th><th class="fx fx3">15 a 29 dias</th><th class="fx fx4">30 dias ou mais</th><th class="r" rowspan="2">Valor anual</th></tr>'
   +'<tr><th class="fx fx1 r">Diária 24 h</th><th class="fx fx1 r">Diária 10 h</th><th class="fx fx1 r">Hora extra</th><th class="fx fx2 r">Diária 24 h</th><th class="fx fx3 r">Diária 24 h</th><th class="fx fx4 r">Diária 24 h</th></tr></thead><tbody>';
  PL.cats.forEach(c=>{
    const [cod,nome,d24,he24,d10,he10,f2,f3,f4,tot]=c;
    h+='<tr><td><span class="cat-code">'+cod+'</span></td><td>'+esc(nome)+'</td>'
      +'<td class="r fx1">'+fmt(d24[1])+'<span class="sub">'+NUM.format(d24[0])+' diárias</span></td>'
      +'<td class="r fx1">'+fmt(d10[1])+'<span class="sub">'+NUM.format(d10[0])+' diárias</span></td>'
      +'<td class="r fx1">'+fmt(he24[1])+'<span class="sub">'+NUM.format(he24[0]+he10[0])+' h</span></td>'
      +'<td class="r fx2">'+fmt(f2[1])+'</td>'
      +'<td class="r fx3'+(f3[2]>r2(f3[1]*0.2)+0.004?' warn':'')+'">'+fmt(f3[1])+(f3[2]>r2(f3[1]*0.2)+0.004?'<span class="sub" style="color:var(--bad)">HE '+fmt(f3[2])+' &gt; 20%</span>':'')+'</td>'
      +'<td class="r fx4">'+fmt(f4[1])+'</td><td class="r"><b>'+fmt(tot)+'</b></td></tr>';
  });
  h+='<tr class="tot"><td></td><td>Total da locação</td><td colspan="6"></td><td class="r">'+fmt(PL.totais.loc)+'</td></tr></tbody>';
  $('plLoc').innerHTML=h;
  // no show
  let bad=0, exc=0;
  let n='<thead><tr><th>Cód.</th><th>Categoria</th><th class="r">Qtde</th><th class="r">Diária 10 h</th><th class="r">Teto 70%</th><th class="r">Planilha do órgão</th><th class="r">Excesso por unidade</th></tr></thead><tbody>';
  PL.cats.forEach(c=>{
    const cod=c[0], d10=c[4][1], teto=r2(d10*0.7), ns=PL.noshow[cod], ex=r2(Math.max(0,ns[1]-teto));
    if(ex>0){bad++; exc+=ex*ns[0];}
    n+='<tr'+(ex>0?' class="bad"':'')+'><td><span class="cat-code">'+cod+'</span></td><td>'+esc(c[1])+'</td><td class="r">'+NUM.format(ns[0])+'</td><td class="r">'+fmt(d10)+'</td><td class="r">'+fmt(teto)+'</td><td class="r">'+fmt(ns[1])+'</td><td class="r'+(ex>0?' warn':'')+'">'+(ex>0?fmt(ex):'—')+'</td></tr>';
  });
  n+='<tr class="tot"><td></td><td>Total no ano</td><td colspan="3"></td><td class="r">'+fmt(PL.totais.ns)+'</td><td class="r">'+fmt(exc)+'</td></tr></tbody>';
  $('plNs').innerHTML=n; $('plNsBadge').textContent=bad+' de '+PL.cats.length+' acima do teto';
  // mão de obra
  $('plMo').innerHTML='<thead><tr><th>Item</th><th class="r">Qtde</th><th class="r">Preço máximo</th><th class="r">Total</th></tr></thead><tbody>'
    +PL.mao.map(m=>'<tr><td>'+esc(m[0])+'<span class="sub">por '+m[1]+'</span></td><td class="r">'+NUM.format(m[2])+'</td><td class="r">'+fmt(m[3])+'</td><td class="r">'+fmt(r2(m[2]*m[3]))+'</td></tr>').join('')
    +'<tr class="tot"><td>Total</td><td></td><td></td><td class="r">'+fmt(PL.totais.mot+PL.totais.age)+'</td></tr></tbody>';
  $('plMo').style.minWidth='0';
  $('plComb').innerHTML='<thead><tr><th>Combustível</th><th class="r">Litros</th><th class="r">ANP (R$/L)</th><th class="r">Total</th></tr></thead><tbody>'
    +PL.comb.map(c=>'<tr><td>'+esc(c[0])+'</td><td class="r">'+NUM.format(c[1])+'</td><td class="r">'+fmt(c[2])+'</td><td class="r">'+fmt(r2(c[1]*c[2]*1.0945))+'</td></tr>').join('')
    +'<tr class="tot"><td>Total</td><td></td><td></td><td class="r">'+fmt(PL.totais.comb)+'</td></tr></tbody>';
  $('plComb').style.minWidth='0';
}
function toggleZoom(){const s=$('sheet'); s.classList.toggle('zoom'); $('zoomBtn').textContent=s.classList.contains('zoom')?'Ajustar à largura':'Ampliar';}
$('zoomBtn').addEventListener('click',toggleZoom); $('sheetImg').addEventListener('click',toggleZoom);

/* ---------------- riscos ---------------- */
function renderRiscos(r){
  const L=r.L>0?r.L:REF;
  const T=[
   ['Faturamento mensal médio',fmt0(L/12),'lance ÷ 12','t4'],
   ['Garantia de 5%',fmt0(L*0.05),'até a assinatura ou 10 dias úteis','t1'],
   ['Capital de giro estimado',fmt0(r.K),'custos de '+NUM.format(state.sim.ciclo)+' dias','t5'],
   ['Combustível adiantado',fmt0(705552.91/12),'por mês, reembolsado depois','t3']
  ];
  $('riskTiles').innerHTML=T.map(t=>'<div class="tile '+t[3]+'"><span class="k">'+t[0]+'</span><span class="v">'+t[1]+'</span><span class="s">'+t[2]+'</span></div>').join('');
}
function renderImr(){
  const v=parseNum($('imr-v').value), d=parseNum($('imr-d').value), n=parseNum($('imr-n').value), m=parseNum($('imr-m').value);
  const tot=v*d; const y=tot>0?Math.min(1,n/tot):0;
  $('imrOut').innerHTML=svg('alert')+'<p>Total de '+NUM.format(tot)+' veículos-dia. Y = '+pct(y,2)+'. A ordem de serviço cai de '+fmt(m)+' para <b>'+fmt(m*(1-y))+'</b> (desconto de '+fmt(m*y)+'). No comboio presidencial, abre também processo de penalidade.</p>';
}
['imr-v','imr-d','imr-n','imr-m'].forEach(id=>$(id).addEventListener('input',renderImr));


const E={
  slug:'pe-319-2026', docPrefix:'', lsPrefix:'pe319-',
  ref:REF, teto:REF, garantiaPct:0.05, giro:'mensal',
  sessao:[2026,11,23], sessaoNome:'Sessão', chip:'R$ 20,8 mi · item único',
  deadlines:[
   {d:[2026,11,17],lbl:'17/11',t:'Último dia para impugnar e pedir esclarecimento',s:'Edital 12.1 · e-mail ',mail:'cpl@presidencia.gov.br'},
   {d:[2026,11,17],lbl:'17/11',t:'SICAF com condições atendidas',s:'3º dia útil antes da sessão · Edital 2.2'},
   {d:[2026,11,19],lbl:'19/11',t:'Limite para o órgão responder',s:'Último dia útil antes da sessão · Edital 12.2'},
   {d:[2026,11,23],lbl:'23/11 · 9h30',t:'Sessão pública no Compras.gov.br',s:'Envio da proposta até a abertura · Edital 4.2'}
  ],
  prazoQuestionar:[2026,11,17],
  sim:{
    tetoNome:'valor máximo', refNome:'referência', artExeq:'Edital 7.8–7.10', artAcima:'Edital 7.7.3',
    tetoLabel:()=>'Referência<br>R$ 20,8 mi',
    minSub:r=>'≈ '+fmt0(r.Pmin/12)+' por mês',
    margSub:r=>'≈ '+fmt0(r.margL*r.L)+' por ano',
    descValue:(r,ok,ref)=>ok?(r.Pmin<ref?pct(1-r.Pmin/ref):'sem desconto'):'—',
    passo:L=>L*0.001
  },
  kpis(x){ const {s,r,exemplo,ok}=x; const dImp=daysUntil(2026,11,17); return [
   {href:'planilha',k:'Valor anual estimado',v:'R$ 20,8 mi',c:'gold',s:'item único · 22 categorias de veículos'},
   {href:'simulador',k:'Desconto máximo viável',v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',c:'blue',s:ok?'lance mínimo '+fmtMi(r.Pmin)+(exemplo?' (custos de exemplo)':''):'revise o simulador'},
   {href:'conflitos',k:'Conflitos graves',v:String(CONFLITOS.filter(c=>c.g==='alta').length),c:'red',s:'questionar até 17/11 ('+leftTxt(dImp)+')'},
   {href:'matriz',k:'Requisitos atendidos',v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,c:'green',s:s.c.verificar?s.c.verificar+' a verificar na matriz':(s.blockers.length?s.blockers.length+' bloqueio(s)':'todos avaliados')}
  ]; },
  precoTxt:r=>'Lance mínimo de '+fmt0(r.Pmin)+', desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+'.'+(r.Pmin<0.5*REF?' Abaixo de 50% da referência: exige prova de exequibilidade.':''),
  riscosTxt:d=>'Seguro-garantia, consórcio, subcontratação, no show e patrimônio líquido. Prazo para questionar: 17/11 ('+leftTxt(d)+').',
  prepTxt:(r,L)=>'Documentos do kit das 2 horas prontos. Caixa: cerca de '+fmt0(r.K)+' de capital de giro e '+fmt0(L*0.05)+' de garantia.',
  passoBloqueio:'Avaliar consórcio ou parceria que supra essas exigências antes de desistir.',
  exeqStep:'Preparar a prova de exequibilidade do preço (Edital 7.8 a 7.10).',
  questionarStep:a=>'Decidir até 17/11 se vai pedir esclarecimento ou impugnar os '+a+' pontos de alta gravidade.',
  stepsGo:['Revisar os preços finais na Google Planilha.','Cadastrar a proposta no Compras.gov.br antes de 23/11, às 9h30.'],
  init(){ renderComposition(); renderPlanilha(); renderImr(); },
  onSim(r){ renderRiscos(r); }
};
