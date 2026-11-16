/* ===== Edital: Dispensa Eletrônica 70025-40/2026 (TRE-DF) · vídeo animado 2D ===== */
const TETO=65492.11; // limite do art. 75, II, da Lei 14.133/2021 em 2026 (Decreto 12.807/2025)
const fmtMil=n=>'R$ '+(n/1000).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mil';
Object.assign(ILLU,{
 anim:'<rect x="30" y="34" width="74" height="46" rx="4"/><path d="M30 34l70-15 4 12-70 15z"/><path class="acc" d="M44 30l6 10M62 26l6 10M80 22l6 10"/><path d="M42 54h30M42 64h40M42 72h22" opacity=".6"/><circle class="acc" cx="128" cy="58" r="14"/><path class="acc" d="M124 51v14l11-7z"/>',
 tela:'<rect x="30" y="14" width="100" height="58" rx="5"/><path d="M30 62h100" opacity=".5"/><path class="acc" d="M72 30v20l18-10z"/><path d="M70 82h20M80 72v10"/><circle class="acc" cx="52" cy="62" r="2.5"/><circle cx="80" cy="62" r="2.5"/><circle cx="108" cy="62" r="2.5"/>',
 roteiro:'<rect x="34" y="14" width="52" height="66" rx="4"/><path d="M43 28h34M43 37h34M43 46h26M43 55h30M43 64h20"/><path class="acc" d="M98 22h40a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-24l-10 9v-9h-6a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6z"/><path class="acc" d="M106 34h26M106 42h18"/>'
});
HOME_ART='<svg class="ill" viewBox="0 0 320 170" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 150h312" opacity=".45"/><path d="M30 18h150" opacity=".35"/><circle class="acc" cx="62" cy="18" r="3.5"/><circle cx="112" cy="18" r="3"/><circle cx="152" cy="18" r="3"/><g class="drive-l"><rect x="30" y="34" width="150" height="90" rx="8"/><path d="M95 124v14M70 140h50"/><path class="acc" d="M96 62v34l28-17z"/></g><g class="drive-r"><rect x="206" y="88" width="84" height="54" rx="5"/><path d="M206 88l80-18 5 14-80 18z"/><path class="acc" d="M224 84l7 11M246 79l7 11M268 74l7 11"/><path d="M220 112h40M220 124h52" opacity=".6"/></g></svg>';

const COMPONENTS=[
 {k:'pre',nome:'Pré-produção',det:'roteiro técnico, storyboard e animatic',v:null,cor:'var(--blue)',def:5000},
 {k:'design',nome:'Personagens e cenários',det:'9 personagens e até 15 cenários',v:null,cor:'var(--gold)',def:9000},
 {k:'anim',nome:'Animação 2D',det:'custo por minuto finalizado',v:null,mult:'min',multU:'min',cor:'var(--green)',def:2800},
 {k:'voz',nome:'Locução e dublagem',det:'9 vozes, inclusive infantis',v:null,cor:'var(--steel)',def:4500},
 {k:'som',nome:'Trilha e sound design',det:'trilha licenciada, efeitos e mixagem',v:null,cor:'var(--amber)',def:2500},
 {k:'final',nome:'Letterings, legendas e finalização',det:'cartela, legendas, HD 16:9',v:null,cor:'var(--red)',def:2000},
 {k:'gestao',nome:'Direção e revisões',det:'coordenação e 2 rodadas de ajuste',v:null,cor:'var(--muted)',def:3000}
];
const SIM_PARAMS=[
 {k:'min',l:'Duração da animação',h:'o TR fala em ~5 min; o roteiro rende ~9 min',u:'min',def:5},
 {k:'trib',l:'Tributos sobre o faturamento',h:'alíquota efetiva do Simples Nacional',u:'%',def:10},
 {k:'adm',l:'Despesas indiretas',h:'sobre o custo direto: estrutura, softwares, administração',u:'%',def:8},
 {k:'marg',l:'Margem líquida desejada',h:'sobre o valor do lance',u:'%',def:15},
 {k:'ciclo',l:'Ciclo até receber',h:'da assinatura ao pagamento único (TR 5.2 e cláusula 7)',u:'dias',def:95},
 {k:'juros',l:'Custo do capital de giro',h:'taxa mensal do seu financiamento',u:'%/mês',def:1.5},
 {k:'mercado',l:'Estimativa do órgão (palpite)',h:'a estimativa do TRE é sigilosa; use a sua pesquisa de mercado',u:'R$',def:55000}
];
const SIM_DEF=()=>{const o={lance:62000}; COMPONENTS.forEach(c=>{o['c_'+c.k]=c.def}); SIM_PARAMS.forEach(p=>o[p.k]=p.def); return o;};

const CONFLITOS=[
 {g:'alta',tipo:'TR × Roteiro',t:'Roteiro rende cerca de 9 minutos, não 5',a:['TR 1.1 e 3.1.1','Vídeo com duração de aproximadamente 5 minutos.'],b:['Anexo I ao TR (roteiro)','Cerca de 1.400 palavras faladas em 9 falas e um quiz: 8 a 11 minutos de narração.'],why:'Animação 2D é cobrada por minuto. Precificar 5 minutos e entregar 9 pode levar ao prejuízo ou a recusa por não seguir o roteiro (TR 5.4.4).',todo:'Perguntar à ASLIC se o roteiro pode ser condensado para 5 minutos ou se a duração é só estimativa. Testar o preço com 9 min no simulador.'},
 {g:'alta',tipo:'Aviso',t:'Sem preço máximo e estimativa sigilosa',a:['Aviso, preâmbulo e 5.2.4','Não foi fixado preço máximo; a pesquisa de preços ocorre junto com a disputa.'],b:['TR 9.1','O custo estimado está em anexo classificado, fora do Aviso.'],why:'A única referência pública é o teto legal da dispensa, R$ 65.492,11 em 2026. Acima da estimativa interna, o TRE pode negociar ou recusar.',todo:'Formar o preço pelo custo de produção e definir antes da disputa o lance mínimo que a empresa aceita.'},
 {g:'media',tipo:'TR',t:'Arquivos do Zé Urninha e do Heitor criança',a:['TR 1.1 e roteiro','Os dois personagens devem seguir o padrão de animação já usado pela Escola Judiciária.'],b:['TR 5.6.1','O TRE fornece apenas a cartilha "Ele, Heitor no Folclore".'],why:'Sem os arquivos-fonte (vetores, model sheet), o estúdio precisa redesenhar os personagens a partir de imagens, com risco de rejeição na aprovação.',todo:'Pedir os arquivos editáveis dos dois personagens ou precificar o redesenho.'},
 {g:'media',tipo:'TR × Contrato',t:'Subcontratação vedada e equipe de vozes',a:['TR 4.6.1 e cláusula 2.5','Não é admitida a subcontratação do objeto.'],b:['TR 1.1 e cláusula 5.18, c','Exige locutores especializados em dublagem infantil e cita "subcontratado(a)".'],why:'Estúdios pequenos costumam contratar dubladores, músicos e animadores autônomos. Se o TRE entender isso como subcontratação, há risco de penalidade.',todo:'Perguntar se a contratação de profissionais autônomos sob responsabilidade da empresa é admitida.'},
 {g:'media',tipo:'Contrato',t:'Atraso contado em dias corridos',a:['Cláusula 11.1.1','Isenção de multa para atraso de até 5 dias úteis.'],b:['Cláusula 11.1.7','O atraso, para cálculo da multa, é contado em dias corridos.'],why:'Os prazos de execução são em dias úteis, mas a multa (9% a 30%) corre em dias corridos, inclusive fins de semana.',todo:'Planejar folga no cronograma e registrar por e-mail cada entrega e cada atraso de aprovação do TRE.'},
 {g:'media',tipo:'TR',t:'45 dias úteis incluem o tempo de aprovação do TRE',a:['TR 5.1.1.1 (cronograma)','Contratada: 15 + 12 + 5 + 3 dias úteis de trabalho.'],b:['TR 5.2.1','Prazo máximo de 45 dias úteis, somando as avaliações do TRE (5 + 2 + 3).'],why:'Sobram cerca de 35 dias úteis de produção para um vídeo que pode passar de 9 minutos, com 9 personagens e 9 vozes.',todo:'Ter equipe dedicada desde a ordem de serviço e pedir prorrogação formal (TR 5.2.2) se o TRE atrasar aprovações.'},
 {g:'baixa',tipo:'TR',t:'Cessão definitiva dos direitos e trilha "pesquisada"',a:['TR 6.10.1.12 e cláusula 5.12','Cessão definitiva dos direitos patrimoniais, inclusive dos elementos visuais originais.'],b:['TR 1.1','Trilha pesquisada.'],why:'Músicas de banco têm licença de uso, não cessão. A licença precisa permitir o uso pelo TRE sem prazo, inclusive no YouTube.',todo:'Usar trilha própria ou de banco com licença extensível ao cliente final e incluir esse custo no preço.'},
 {g:'baixa',tipo:'TR',t:'"HD 16:9" sem resolução definida',a:['TR 1.1','Formato HD 16:9.'],b:['TR 3.1.3','Resoluções e formatos compatíveis com o YouTube.'],why:'HD pode ser 1280×720 ou 1920×1080. A diferença muda o tempo de renderização e o arquivo final.',todo:'Entregar em 1920×1080 (Full HD) para evitar recusa.'}
];

const MATRIZ=[
 {g:'Participação e habilitação',itens:[
  {id:'me-epp',t:'Empresa enquadrada como ME ou EPP',d:'Dispensa exclusiva; declaração falsa é infração grave',src:'TR 8.5 · Aviso 3.10',elim:true},
  {id:'sicaf',t:'Cadastro no Compras.gov.br e no SICAF',d:'Com a linha de fornecimento do serviço',src:'Aviso 2.1',elim:true},
  {id:'juridica',t:'Habilitação jurídica em dia',d:'Ato constitutivo, alterações e documento do representante',src:'Anexo I, 1',elim:true},
  {id:'fiscal',t:'Regularidade fiscal e trabalhista',d:'Federal, FGTS, CNDT e municipal; ME/EPP pode regularizar em 5 dias úteis',src:'Anexo I, 2',elim:false},
  {id:'falencia',t:'Certidão negativa de falência',d:'Única exigência econômico-financeira',src:'Anexo I, 3.1.1',elim:true},
  {id:'sancoes',t:'Sem sanções no CEIS, CNEP, CNJ e TCU',d:'Consulta também no CPF do sócio majoritário',src:'Anexo I, 4',elim:true},
  {id:'vinculo',t:'Sem vínculo com dirigentes ou servidores do TRE-DF',d:'Declaração do Anexo I, 6.1',src:'Anexo I, 6.1',elim:true},
  {id:'cadin',t:'Sem registro no CADIN',d:'Se houver, regularizar em até 5 dias úteis da convocação',src:'Anexo I, 7',elim:false}
 ]},
 {g:'Capacidade de produção',itens:[
  {id:'storyboard',t:'Roteiro técnico e storyboard em 15 dias úteis',d:'Primeira entrega do cronograma',src:'TR 5.1.1.1',elim:false},
  {id:'personagens',t:'Design dos 9 personagens',d:'5 do folclore, 2 livres e 2 no padrão da EJE',src:'TR 3.1.2',elim:false},
  {id:'animacao',t:'Animação 2D de 5 a 9 minutos',d:'Até 15 cenários, letterings e vinhetas',src:'TR 1.1 · roteiro',elim:false},
  {id:'vozes',t:'Elenco de 9 vozes, inclusive infantis',d:'Sem subcontratação (confirmar uso de autônomos)',src:'TR 1.1 e 4.6.1',elim:false},
  {id:'audio',t:'Trilha licenciada, sound design e mixagem',d:'Licença compatível com a cessão definitiva ao TRE',src:'TR 1.1 e 6.10.1.12',elim:false},
  {id:'finalizacao',t:'Legendas, cartela e entrega em Full HD',d:'Pen drive em 2 cópias e link',src:'TR 5.4.3',elim:false}
 ]},
 {g:'Prazo e caixa',itens:[
  {id:'equipe',t:'Equipe disponível por 45 dias úteis',d:'A partir da ordem de serviço, provavelmente dezembro a fevereiro',src:'TR 5.2.1',elim:false},
  {id:'giro',t:'Caixa para bancar a produção até o pagamento',d:'Pagamento único, até 15 dias úteis após o atesto',src:'Cláusula 7.1',elim:false},
  {id:'sei',t:'Credenciamento no SEI do TRE-DF',d:'Para assinar o contrato e receber notificações',src:'Aviso 9.1 e 9.2',elim:false}
 ]}
];

const KIT=[
 {g:'Antes da disputa',prazo:'até 18/11, 12h · Aviso 3.2',itens:[
  {id:'k-proposta',t:'Proposta cadastrada no Compras.gov.br',d:'Descrição do objeto e valor total do item (Aviso 3.2 e 4.2.1)'},
  {id:'k-decl-sist',t:'Declarações marcadas no sistema',d:'Itens 3.8.1 a 3.8.5 e enquadramento ME/EPP (3.10)'},
  {id:'k-sicaf',t:'SICAF atualizado com certidões válidas',d:'Aviso 6.3.1'},
  {id:'k-lance',t:'Lance mínimo definido no simulador',d:'Com a duração que a empresa vai assumir'},
  {id:'k-duvidas',t:'Dúvidas enviadas à ASLIC',d:'Duração do roteiro, personagens da EJE e vozes de terceiros'}
 ]},
 {g:'Depois dos lances',prazo:'2 horas · Aviso 5.14 e 6.4',itens:[
  {id:'k-ajustada',t:'Proposta ajustada ao último lance',d:'Validade mínima de 60 dias (Aviso 5.5)'},
  {id:'k-custos',t:'Declaração de custos trabalhistas na proposta',d:'Aviso 3.4.1'},
  {id:'k-social',t:'Contrato social consolidado e documento do representante',d:'Anexo I, 1'},
  {id:'k-falencia',t:'Certidão negativa de falência',d:'Anexo I, 3.1.1'},
  {id:'k-vinculo',t:'Declaração de inexistência de vínculo com o TRE-DF',d:'Anexo I, 6.1'},
  {id:'k-limite',t:'Declaração do limite de receita da EPP',d:'Contratos públicos do ano dentro do limite (Aviso 3.10.2)'}
 ]},
 {g:'Contratação',prazo:'5 dias úteis · Aviso 7.2',itens:[
  {id:'k-sei',t:'Credenciamento no SEI do TRE-DF',d:'Formulário e documentos do representante (Aviso 9.2)'},
  {id:'k-assinar',t:'Assinatura do contrato ou aceite da nota de empenho',d:'Aviso 7.2'},
  {id:'k-cadin',t:'CADIN sem pendência',d:'Anexo I, 7'},
  {id:'k-preposto',t:'Preposto definido para a reunião inicial',d:'Até 5 dias corridos após a assinatura (TR 5.1.1.1)'}
 ]}
];

const SECTIONS=[
 {id:'ficha',sec:'ficha',nome:'Ficha da dispensa',q:'Quais são os dados básicos da contratação?',etapa:1,min:2},
 {id:'condicoes',sec:'cond',nome:'Condições da contratação',q:'Quais regras valem para o contrato e como a empresa é paga?',etapa:1,min:3},
 {id:'producao',sec:'oper',art:'tela',nome:'Escopo de produção',q:'O que exatamente precisa ser produzido e entregue?',etapa:1,min:3},
 {id:'roteiro',sec:'plan',art:'roteiro',nome:'Roteiro e duração',q:'O roteiro cabe nos 5 minutos contratados?',etapa:2,min:2},
 {id:'habilitacao',sec:'qual',nome:'Habilitação',q:'O que a empresa precisa comprovar para ser contratada?',etapa:2,min:2},
 {id:'declaracoes',sec:'decl',nome:'Declarações',q:'Quais declarações vão além das marcadas no sistema?',etapa:2,min:2},
 {id:'conflitos',sec:'conf',nome:'Pontos de atenção',q:'Onde o Aviso, o TR e o roteiro não batem?',etapa:2,min:4},
 {id:'matriz',sec:'matriz',nome:'Matriz de aderência',q:'A empresa cumpre cada exigência? Se não, como vai suprir?',etapa:3,min:5},
 {id:'kit',sec:'kit',nome:'Kit da disputa',q:'O que deixar pronto antes das 12h de 18/11?',etapa:3,min:3},
 {id:'simulador',sec:'simul',nome:'Formação de preço',q:'Quanto custa produzir o vídeo e qual o lance mínimo?',etapa:4,min:5},
 {id:'riscos',sec:'risco',nome:'Prazo e caixa',q:'A empresa aguenta 45 dias úteis de produção até receber?',etapa:4,min:2},
 {id:'parecer',sec:'parecer',nome:'Parecer final',q:'Participar ou não participar?',etapa:5,min:3}
];

const TAKE={
 ficha:()=>'Dispensa eletrônica de menor preço, item único, exclusiva para ME/EPP e sem preço máximo divulgado.',
 condicoes:()=>'Contrato de 6 meses sem garantia, sem consórcio e sem subcontratação. Pagamento único, até 15 dias úteis após o atesto.',
 producao:()=>'Um vídeo de cerca de 5 min com 9 personagens, até 15 cenários e 9 vozes, entregue em até 45 dias úteis com duas rodadas de aprovação.',
 roteiro:()=>'O roteiro tem cerca de 1.400 palavras faladas: perto de 9 minutos de narração, quase o dobro do contratado.',
 habilitacao:()=>'Não exige atestado técnico. Basta habilitação jurídica, regularidade fiscal e trabalhista e a certidão de falência.',
 declaracoes:()=>'Além das declarações do sistema, prepare 3 por escrito: custos trabalhistas, limite de receita da EPP e ausência de vínculo com o TRE.',
 conflitos:()=>CONFLITOS.filter(c=>c.g==='alta').length+' pontos mudam o seu preço: a duração do roteiro e a estimativa sigilosa. Tire as dúvidas com a ASLIC até 17/11 ('+leftTxt(daysUntil(2026,11,17))+').',
 matriz:()=>{const s=matrizSummary(); return s.title+': '+s.evaluated+' de '+s.all.length+' requisitos avaliados.';},
 kit:()=>{const a=KIT.flatMap(g=>g.itens),d=a.filter(i=>state.kit.done[i.id]).length; return d+' de '+a.length+' itens prontos. A proposta precisa estar cadastrada antes das 12h de 18/11.';},
 simulador:()=>{const r=calc(state.sim); return isFinite(r.Pmin)?'Com '+NUM.format(state.sim.min)+' min de animação, o lance mínimo é '+fmt0(r.Pmin)+(r.Pmin>TETO?', acima do teto da dispensa.':', dentro do teto de R$ 65.492,11.')+(isDefault()?' Custos de exemplo.':''):'Com os percentuais atuais, nenhum preço cobre os custos.';},
 riscos:()=>{const r=calc(state.sim); return 'A empresa banca cerca de '+fmt0(r.C)+' de produção por uns '+NUM.format(state.sim.ciclo)+' dias até o pagamento único.';},
 parecer:()=>{const p=parecerCalc(); return p.title+(p.title.endsWith('…')?' ':'. ')+(state.parecer.decisao?'O parecer da empresa já foi registrado.':'Registre a decisão da empresa no fim desta página.');}
};
const HN={
 ficha:()=>[{v:'18/11',l:'lances das 12h às 18h',c:'gold'},{v:'ME/EPP',l:'participação exclusiva',c:'ink'},{v:'R$ 65,5 mil',l:'teto legal, sem preço máximo',c:'ink'}],
 condicoes:()=>[{v:'6 meses',l:'vigência do contrato',c:'gold'},{v:'Sem garantia',l:'contratual (TR 4.7.1)',c:'green'},{v:'Pagamento único',l:'até 15 dias úteis do atesto',c:'ink'}],
 producao:()=>[{v:'~5 min',l:'duração contratada',c:'gold'},{v:'9 + 15',l:'personagens e cenários',c:'ink'},{v:'45 dias úteis',l:'prazo máximo de execução',c:'blue'}],
 roteiro:()=>[{v:'~9 min',l:'de narração no roteiro',c:'red'},{v:'1.400',l:'palavras faladas, aproximadamente',c:'ink'},{v:'9',l:'personagens com fala',c:'ink'}],
 habilitacao:()=>[{v:'Dispensado',l:'atestado de capacidade técnica',c:'green'},{v:'1',l:'certidão econômico-financeira',c:'ink'},{v:'5 dias úteis',l:'para ME/EPP regularizar certidões',c:'blue'}],
 declaracoes:()=>[{v:'3',l:'declarações por escrito',c:'gold'},{v:'2 h',l:'para enviar após o pedido',c:'red'},{v:'6',l:'declarações marcadas no sistema',c:'ink'}],
 conflitos:()=>{const n=daysUntil(2026,11,17); return [{v:String(CONFLITOS.filter(c=>c.g==='alta').length),l:'de alta gravidade',c:'red'},{v:String(CONFLITOS.length),l:'pontos no total',c:'ink'},{v:n<0?'encerrado':n===0?'hoje':n+(n===1?' dia':' dias'),l:'para tirar dúvidas (até 17/11)',c:'red'}];},
 matriz:()=>{const s=matrizSummary(); return [{v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,l:'atendidos, com ou sem ajuste',c:'green'},{v:String(s.c.verificar),l:'a verificar',c:'ink'},{v:String(s.blockers.length),l:'bloqueios eliminatórios',c:'red'}];},
 kit:()=>{const g=KIT.map(x=>x.itens.filter(i=>state.kit.done[i.id]).length+' de '+x.itens.length); const a=KIT.flatMap(x=>x.itens); return [{v:a.filter(i=>state.kit.done[i.id]).length+' de '+a.length,l:'itens prontos',c:'green'},{v:g[0],l:'antes da disputa',c:'ink'},{v:g[1],l:'depois dos lances',c:'ink'}];},
 simulador:()=>{const r=calc(state.sim), ok=isFinite(r.Pmin); return [{v:ok?fmtMil(r.Pmin):'—',l:'lance mínimo viável',c:ok&&r.Pmin>TETO?'red':'blue'},{v:NUM.format(state.sim.min)+' min',l:'duração simulada',c:'ink'},{v:isFinite(r.margL)?pct(r.margL):'—',l:'margem no lance testado',c:r.margL<0?'red':'green'}];},
 riscos:()=>{const r=calc(state.sim); return [{v:fmtMil(r.C),l:'custo a financiar até receber',c:'gold'},{v:'~'+NUM.format(state.sim.ciclo)+' dias',l:'até o pagamento único',c:'ink'},{v:'até 30%',l:'multa por atraso',c:'red'}];},
 parecer:()=>{const p=parecerCalc(); return [{v:p.title,l:'recomendação calculada',c:'gold'},{v:Math.round(overallProgress()*100)+'%',l:'da análise concluída',c:'ink'},{v:String(p.steps.length),l:'próximos passos',c:'ink'}];}
};
const CARD={
 ficha:()=>({m:'18/11 · 12h',s:'lances até as 18h'}),
 condicoes:()=>({m:'6 meses',s:'sem garantia · pagamento único'}),
 producao:()=>({m:'9 personagens',s:'até 15 cenários · 45 dias úteis'}),
 roteiro:()=>({m:'~9 min',s:'o TR pede cerca de 5 min',c:'alert'}),
 habilitacao:()=>({m:'Sem atestado',s:'só exige certidão de falência',c:'ok'}),
 declaracoes:()=>({m:'3 declarações',s:'além das marcadas no sistema',c:'warn'}),
 conflitos:()=>({m:CONFLITOS.length+' pontos',s:CONFLITOS.filter(c=>c.g==='alta').length+' de alta gravidade',c:'alert'}),
 matriz:()=>{const s=matrizSummary(); return {m:(s.c.atende+s.c.ajuste)+' de '+s.all.length,s:s.title,c:s.kind==='go'?'ok':s.kind==='nogo'?'alert':'warn'};},
 kit:()=>{const a=KIT.flatMap(x=>x.itens), d=a.filter(i=>state.kit.done[i.id]).length; return {m:d+' de '+a.length,s:'itens prontos',c:d===a.length?'ok':''};},
 simulador:()=>{const r=calc(state.sim); return {m:isFinite(r.Pmin)?fmtMil(r.Pmin):'—',s:'lance mínimo com '+NUM.format(state.sim.min)+' min'+(isDefault()?' · exemplo':''),c:isFinite(r.Pmin)&&r.Pmin>TETO?'alert':''};},
 riscos:()=>{const r=calc(state.sim); return {m:fmtMil(r.C),s:'custo bancado até o pagamento'};},
 parecer:()=>{const p=parecerCalc(); return {m:p.title,s:state.parecer.decisao?'decisão registrada':'registrar a decisão',c:p.kind==='go'?'ok':p.kind==='nogo'?'alert':'warn'};}
};

function renderCaixa(r){
  const L=r.L>0?r.L:(isFinite(r.Pmin)?r.Pmin:TETO);
  const T=[
   ['Custo a financiar',fmt0(r.C),'produção inteira antes de receber'],
   ['Custo financeiro',fmt0(r.F),'em '+NUM.format(state.sim.ciclo)+' dias, a '+NUM.format(state.sim.juros)+'% ao mês'],
   ['Valor a receber',fmt0(L),'pagamento único após o atesto'],
   ['Multa máxima por atraso',fmt0(L*0.30),'30% do valor (cláusula 11.1)']
  ];
  $('riskTiles').innerHTML=T.map(t=>'<div class="tile"><span class="k">'+t[0]+'</span><span class="v">'+t[1]+'</span><span class="s">'+t[2]+'</span></div>').join('');
}

const E={
  slug:'de-70025-40-2026', docPrefix:'editais/de-70025-40-2026/', lsPrefix:'de70025-',
  ref:null, teto:TETO, garantiaPct:0, giro:'unico',
  sessao:[2026,11,18], sessaoNome:'Disputa', chip:'Teto R$ 65,5 mil · item único',
  deadlines:[
   {d:[2026,11,17],lbl:'17/11',t:'Enviar dúvidas à ASLIC',s:'Sem prazo formal no Aviso · 13h às 18h · ',mail:'aslic@tre-df.jus.br'},
   {d:[2026,11,18],lbl:'18/11 · até 12h',t:'Proposta cadastrada e declarações marcadas',s:'Antes da abertura dos lances · Aviso 3.2 e 3.8'},
   {d:[2026,11,18],lbl:'18/11 · 12h às 18h',t:'Fase de lances no Compras.gov.br',s:'Encerra às 18h em ponto · Aviso 4.7.1'},
   {d:[2026,11,18],lbl:'Após os lances',t:'Proposta ajustada e documentos em 2 horas',s:'Quando a ASLIC pedir · Aviso 5.14 e 6.4'}
  ],
  prazoQuestionar:[2026,11,17],
  sim:{
    tetoNome:'teto legal da dispensa', refNome:'estimativa do órgão', artExeq:'Aviso 5.7 e 5.8', artAcima:'art. 75, II, da Lei 14.133/2021',
    tetoLabel:()=>'Teto<br>R$ 65,5 mil',
    minSub:()=>'valor total do vídeo',
    margSub:r=>'≈ '+fmt0(r.margL*r.L)+' de lucro',
    descValue:(r,ok,ref,teto)=>ok?(r.Pmin<=teto?fmt0(teto-r.Pmin):'acima do teto'):'—',
    passo:()=>50,
    extraAlerts:()=>{const m=state.sim.min||0; return m<8?[['warn','A simulação usa '+NUM.format(m)+' min, mas o roteiro tem cerca de 1.400 palavras faladas, perto de 9 min de narração. Teste com 9 min antes de definir o lance.']]:[];}
  },
  kpis(x){ const {s,r,exemplo,ok}=x; return [
   {href:'simulador',k:'Teto da dispensa',v:'R$ 65,5 mil',c:'gold',s:'limite do art. 75, II em 2026 · sem preço máximo'},
   {href:'simulador',k:'Lance mínimo viável',v:ok?fmtMil(r.Pmin):'—',c:ok&&r.Pmin>TETO?'red':'blue',s:'com '+NUM.format(state.sim.min)+' min de animação'+(exemplo?' (exemplo)':'')},
   {href:'roteiro',k:'Duração do roteiro',v:'~9 min',c:'red',s:'o TR pede cerca de 5 min'},
   {href:'matriz',k:'Requisitos atendidos',v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,c:'green',s:s.c.verificar?s.c.verificar+' a verificar na matriz':(s.blockers.length?s.blockers.length+' bloqueio(s)':'todos avaliados')}
  ]; },
  precoTxt:r=>'Lance mínimo de '+fmt0(r.Pmin)+' com '+NUM.format(state.sim.min)+' min de animação'+(r.Pmin<=TETO?'; folga de '+fmt0(TETO-r.Pmin)+' até o teto da dispensa.':', acima do teto da dispensa.'),
  riscosTxt:d=>'Duração do roteiro, estimativa sigilosa, arquivos dos personagens da EJE, vozes de terceiros e multa em dias corridos. Tirar dúvidas até 17/11 ('+leftTxt(d)+').',
  prepTxt:r=>'Itens para a disputa e para as 2 horas seguintes. Caixa: cerca de '+fmt0(r.C)+' de produção bancada até o pagamento único.',
  passoBloqueio:'Sem resolver esses requisitos não há como participar desta dispensa.',
  exeqStep:'Preparar a demonstração de exequibilidade do preço (Aviso 5.7 e 5.8).',
  questionarStep:()=>'Enviar à ASLIC até 17/11 as dúvidas sobre a duração do roteiro, os personagens da EJE e as vozes de terceiros.',
  stepsGo:['Cadastrar a proposta e marcar as declarações no Compras.gov.br antes das 12h de 18/11.','Acompanhar a disputa das 12h às 18h com o lance mínimo definido.'],
  onSim(r){ renderCaixa(r); }
};
