/* ===== Edital: Pregão Eletrônico 18/2026 (Casa Militar de Goiás) ===== */
/* ---------------- dados ---------------- */
const REF=9122090.40;          /* valor total estimado, 30 meses (Edital 2.7) */
const UNIT=25339.14;           /* valor por veículo por mês (Edital 2.8) */
const QTD=12, MESES=30;
const COMPONENTS=[
 {k:'frota', nome:'Custo dos 12 blindados nos 30 meses', det:'compra e blindagem menos revenda, juros, seguro, IPVA, manutenção, rastreador e guincho', v:REF, cor:'var(--blue)', def:68}
];
/* capital de giro: o motor calcula sobre 12 meses; aqui o contrato tem 30 */
const giro=r=>r.K*12/MESES;

const CONFLITOS=[
 {g:'alta',tipo:'Edital × anexos',t:'TR e minuta do contrato não estão nos arquivos',a:['Edital, Anexos I e II; 11.5–11.7','O Termo de Referência e a minuta "integram este Edital". Entrega, pagamento, índice de reajuste, capital mínimo e documentos extras são remetidos a eles.'],b:['Arquivos analisados','Só o Edital (27 p.) e o Aviso (3 p.). Nenhum dos dois anexos foi encontrado.'],why:'Sem o TR não dá para saber prazo de entrega dos 12 blindados, prazo de pagamento, multas de execução, garantia contratual nem o índice de reajuste. Tudo isso muda o preço.',todo:'Baixar o TR e a minuta no SISLOG ou no PNCP (Edital 14.14) antes de precificar. Se não estiverem publicados, impugnar até 25/11.'},
 {g:'alta',tipo:'Dentro do Edital',t:'Capital ou patrimônio líquido: quando e quanto',a:['Edital 8.4.1.1','Capital mínimo ou PL só é exigido se LG, LC ou SG for menor que 1.'],b:['Edital 8.4.1.1.2','"A licitante deverá comprovar" capital ou PL de "até 10%" do valor estimado, "conforme o TR", sem condição.'],why:'Não se sabe se a exigência vale sempre ou só com índice ruim, nem o percentual exato. No teto, são R$ 912.209,04 (R$ 1.003.429,94 para consórcio).',todo:'Pedir esclarecimento: quando se aplica e qual o percentual fixado no TR. Ter o comprovante pronto por cautela.'},
 {g:'alta',tipo:'Edital × item',t:'Base do atestado de 25%',a:['Edital 8.1.1','25% de serviço compatível "em características, quantidades e prazos", em especial blindados com manutenção, rastreamento e seguro, "quando exigido".'],b:['Edital 2.8','12 veículos por 30 meses.'],why:'Pode significar 3 blindados, 3 blindados por 7,5 meses ou só locação comum. Atestado é eliminatório e "quando exigido" deixa dúvida se a exigência vale.',todo:'Perguntar a base: número de veículos blindados, período mínimo e se rastreamento e seguro precisam constar no atestado.'},
 {g:'alta',tipo:'Dentro do Edital',t:'De quem é o Certificado do Exército',a:['Edital 8.1.3','"Deverá ter o Certificado emitido pelo Exército Brasileiro", sem dizer quem.'],b:['Edital 8.1.4','"A blindadora deverá ser certificada no Exército" (CR).'],why:'Se o pregoeiro entender que a locadora precisa de CR próprio, quem só tem a blindadora certificada é inabilitado.',todo:'Pedir esclarecimento sobre o titular e o tipo de certificado. Ter o CR da blindadora e verificar o da própria empresa.'},
 {g:'media',tipo:'Dentro do Edital',t:'Momento dos prospectos dos veículos',a:['Edital 5.1.2.1','Prospectos ou folders anexados junto com a proposta comercial, no cadastro.'],b:['Edital 8.1.2','Prospectos de todos os veículos, com imagens, marca, modelo e ano, listados entre os documentos da fase de habilitação.'],why:'Depois da abertura não se inclui documento (Edital 6.1.1). Quem deixar para a habilitação pode ter a proposta recusada.',todo:'Anexar os prospectos completos no cadastro da proposta, antes de 30/11 às 9h.'},
 {g:'media',tipo:'Edital × TR',t:'Vistoria facultativa com documento obrigatório',a:['Edital 8.13','Vistoria facultativa até o último dia útil antes da sessão.'],b:['Edital 8.13.3','Sem vistoria, "deverá ser preenchido e assinado" o Termo de Dispensa, modelo no anexo do TR, sem prazo de entrega.'],why:'Um dos dois documentos é necessário, mas o Edital não diz quando entregar e o modelo está no TR ausente.',todo:'Agendar a vistoria até 27/11 pelo (62) 3270-8848 ou assinar o termo de dispensa e anexar com a proposta.'},
 {g:'media',tipo:'Dentro do Edital',t:'Dispensa contábil para ME/EPP',a:['Edital 8.4.6','ME/EPP em "locação de materiais" fica dispensada do item 8.4.5 (declaração do contador).'],b:['Decreto 7.466/2011, art. 2º-A, citado no 8.4.6','Dispensa a apresentação do balanço patrimonial.'],why:'Não fica claro o que é dispensado (balanço ou declaração) nem se locação de veículos é "locação de materiais".',todo:'ME/EPP: pedir esclarecimento; por cautela, entregar balanço, DRE e declaração do contador.'},
 {g:'baixa',tipo:'Dentro do Edital',t:'Garantia de proposta citada e não exigida',a:['Edital 11.3','Recusa em assinar leva à "imediata perda da garantia de proposta".'],b:['Edital (todo)','Nenhum item exige garantia de proposta.'],why:'Texto padrão sem regra correspondente; pode haver exigência no TR.',todo:'Conferir no TR. Se não houver, nada a fazer.'},
 {g:'baixa',tipo:'Dentro do Edital',t:'Intervalo de lance em reais sobre o valor total',a:['Edital 2.8, 6.8','Diferença mínima de 45,61, sem unidade.'],b:['Edital 6.4','Lance pelo valor total do lote (R$ 9,12 milhões).'],why:'R$ 45,61 é 0,18% do valor mensal por veículo, mas só 0,0005% do total. O passo real depende de como o SISLOG aplica.',todo:'Testar no ambiente do SISLOG ou perguntar; planejar lances com folga.'},
 {g:'baixa',tipo:'Dentro do Edital',t:'Dois prazos de 4 horas para a proposta ajustada',a:['Edital 7.1.1','4 horas para a proposta adequada ao último lance, na fase de julgamento.'],b:['Edital 8.1','4 horas de novo para a proposta adequada e a habilitação.'],why:'Pode haver um ou dois chamados. Contar com o segundo é arriscado.',todo:'Ter proposta ajustada e documentos de habilitação prontos para o primeiro chamado.'}
];

const MATRIZ=[
 {g:'Habilitação',itens:[
  {id:'cadfor',t:'Cadastro no CADFOR pelo SISLOG',d:'Status provisório ou homologado antes da sessão',src:'Edital 3.1',elim:true},
  {id:'atest',t:'Atestado de 25% em locação de blindados',d:'Com manutenção, rastreamento e seguro; base a confirmar (ex.: 3 veículos)',src:'Edital 8.1.1',elim:true},
  {id:'cr-emp',t:'Certificado do Exército',d:'Titular indefinido: empresa ou blindadora',src:'Edital 8.1.3',elim:true},
  {id:'cr-blind',t:'Blindadora com CR do Exército',d:'Parceira que blinda os 12 veículos',src:'Edital 8.1.4',elim:true},
  {id:'indices',t:'LG, LC e SG iguais ou maiores que 1',d:'Balanço e DRE dos 2 últimos exercícios',src:'Edital 8.4–8.4.1',elim:true},
  {id:'pl',t:'Capital ou PL de até R$ 912.209,04',d:'Exigência ambígua; ter por cautela',src:'Edital 8.4.1.1–8.4.1.1.2',elim:false},
  {id:'contador',t:'Declaração do contador com os índices',d:'Fora do CADFOR, entregue em 4 h',src:'Edital 8.4.2',elim:false},
  {id:'sancoes',t:'Sem sanções e sem CADIN estadual',d:'CEIS, CNEP, CNIA, TCU, ComprasNet.GO',src:'Edital 7.2, 11.2.2',elim:true}
 ]},
 {g:'Proposta e veículo',itens:[
  {id:'modelo',t:'Modelo 0 km que atende toda a especificação',d:'6 marchas, troca no volante, 7 airbags, 4x4 reduzida, 180 cv, diesel, preto',src:'Edital 2.8, 7.10.2',elim:true},
  {id:'prosp',t:'Prospectos completos dos veículos',d:'Imagens, marca, modelo, ano; anexar no cadastro',src:'Edital 5.1.2.1, 8.1.2',elim:true},
  {id:'vist',t:'Vistoria até 27/11 ou termo de dispensa',d:'Agendar pelo (62) 3270-8848',src:'Edital 8.13',elim:false},
  {id:'tr',t:'TR e minuta lidos',d:'Prazos de entrega e pagamento, multas e garantia',src:'Edital Anexos I e II',elim:false}
 ]},
 {g:'Frota e operação',itens:[
  {id:'frota',t:'12 SUVs blindadas 0 km no prazo do TR',d:'Compra, blindagem III-A e kit strobo LED',src:'Edital 2.8',elim:true},
  {id:'rastreio',t:'Rastreador em tempo real nos 12 veículos',d:'Incluso no preço',src:'Edital 2.1',elim:false},
  {id:'manut',t:'Manutenção, guincho e seguro por 30 meses',d:'Com quilometragem livre',src:'Edital 2.1',elim:false},
  {id:'entrega',t:'Entrega no Palácio das Esmeraldas',d:'Goiânia',src:'Edital 2.8',elim:false}
 ]},
 {g:'Finanças',itens:[
  {id:'capital',t:'Capital para comprar a frota',d:'Ou financiamento aprovado antes da sessão',src:'Edital 2.8',elim:true},
  {id:'giro',t:'Capital de giro até o primeiro pagamento',d:'Prazo de pagamento no TR',src:'Edital 11.6',elim:false},
  {id:'preco',t:'Preço que aguenta 11 meses sem reajuste',d:'Fixo até 06/10/2027',src:'Edital 11.7',elim:false}
 ]}
];

const KIT=[
 {g:'Cadastro da proposta',prazo:'até 30/11 · 9h · Edital 4.2',itens:[
  {id:'k-valor',t:'Valor total do lote definido',d:'30 meses × 12 veículos; desonerado de ICMS se aplicável (Edital 5.3)'},
  {id:'k-pdf',t:'Proposta formal em PDF',d:'Edital 5.1.2 · validade mínima de 90 dias'},
  {id:'k-prosp',t:'Prospectos de todos os veículos',d:'Imagens, marca, modelo, ano e especificações · Edital 5.1.2.1, 8.1.2'},
  {id:'k-vist',t:'Declaração de visita ou termo de dispensa',d:'Modelos no anexo do TR · Edital 8.13'},
  {id:'k-me',t:'Declaração de ME/EPP no sistema, se for o caso',d:'Edital 4.6'}
 ]},
 {g:'Proposta ajustada e habilitação',prazo:'4 horas · Edital 7.1.1, 8.1',itens:[
  {id:'k-ajust',t:'Modelo de proposta ajustada ao lance',d:'Com valores unitários e, se aplicável, valor bruto e líquido de ICMS · Edital 5.3.1, 7.14'},
  {id:'k-atest',t:'Atestados de capacidade técnica digitalizados',d:'Locação de blindados com manutenção, rastreamento e seguro · Edital 8.1.1'},
  {id:'k-cr',t:'Certificado do Exército',d:'Edital 8.1.3'},
  {id:'k-crb',t:'CR do Exército da blindadora',d:'Edital 8.1.4'},
  {id:'k-menor',t:'Declaração de que não emprega menor',d:'Edital 8.1.5'},
  {id:'k-bal',t:'Balanço e DRE dos 2 últimos exercícios',d:'Edital 8.4'},
  {id:'k-cont',t:'Declaração do contador com LG, LC e SG',d:'Edital 8.4.2'},
  {id:'k-pl',t:'Comprovante de capital ou patrimônio líquido',d:'Até 10% do estimado · Edital 8.4.1.1'},
  {id:'k-cadfor',t:'Documentos do CADFOR, se o cadastro for provisório',d:'Lista em sislog.go.gov.br · Edital 8.3.3'}
 ]},
 {g:'Assinatura do contrato',prazo:'7 dias · Edital 11.1',itens:[
  {id:'k-cadin',t:'Consulta ao CADIN estadual sem pendência',d:'Edital 11.2.2'},
  {id:'k-homol',t:'Cadastro homologado no CADFOR',d:'Edital 8.12'},
  {id:'k-sei',t:'Usuário externo no SEI/GO',d:'Para assinar digitalmente · Edital 14.12'},
  {id:'k-frota',t:'Pedido dos 12 veículos e da blindagem encaminhado',d:'Prazo de entrega no TR'}
 ]}
];

const SIM_PARAMS=[
 {k:'trib',l:'Tributos sobre o faturamento',h:'PIS, COFINS, IRPJ e CSLL do seu regime',u:'%',def:11},
 {k:'adm',l:'Despesas indiretas',h:'sobre o custo direto: escritório, gestão da frota',u:'%',def:5},
 {k:'glosa',l:'Perdas por descontos e multas',h:'média esperada sobre o faturamento',u:'%',def:1},
 {k:'marg',l:'Margem líquida desejada',h:'sobre o valor do lance',u:'%',def:8},
 {k:'ciclo',l:'Ciclo até receber',h:'exemplo: o prazo de pagamento está no TR',u:'dias',def:45},
 {k:'juros',l:'Custo do capital de giro',h:'taxa mensal do seu financiamento',u:'%/mês',def:1.5}
];
const SIM_DEF=()=>{const o={lance:8600000}; COMPONENTS.forEach(c=>{if(!c.fixed)o['c_'+c.k]=c.def}); SIM_PARAMS.forEach(p=>o[p.k]=p.def); return o;};

const SECTIONS=[
 {id:'ficha',sec:'ficha',nome:'Ficha do edital',etapa:1},
 {id:'condicoes',sec:'cond',nome:'Condições gerais',etapa:1},
 {id:'veiculos',sec:'oper',nome:'Especificação dos veículos',etapa:1},
 {id:'operacao',sec:'oper',art:'kit',nome:'Entrega e vistoria',etapa:1},
 {id:'qualificacao',sec:'qual',nome:'Qualificação',etapa:2},
 {id:'declaracoes',sec:'decl',nome:'Declarações',etapa:2},
 {id:'conflitos',sec:'conf',nome:'Conflitos',etapa:2},
 {id:'matriz',sec:'matriz',nome:'Matriz de aderência',etapa:3},
 {id:'kit',sec:'kit',nome:'Kit das 4 horas',etapa:3},
 {id:'simulador',sec:'simul',nome:'Simulador de lance',etapa:4},
 {id:'riscos',sec:'risco',nome:'Caixa e riscos',etapa:4},
 {id:'parecer',sec:'parecer',nome:'Parecer final',etapa:5}
];

const IMP=[2026,11,25];
const TAKE={
 ficha:()=>'Pregão eletrônico de menor preço por lote único, disputa aberta, no SISLOG. Os 12 dados básicos e o objeto completo estão abaixo.',
 condicoes:()=>'Contrato de 30 meses, R$ 25.339,14 por veículo por mês, preço fixo até 06/10/2027. Garantia contratual e prazo de pagamento não constam no Edital.',
 veiculos:()=>'12 SUVs grandes blindadas III-A, 0 km, pretas, diesel e 4x4 reduzida, sem motorista. A especificação é fechada: confirme o modelo antes de cotar.',
 operacao:()=>'Entrega no Palácio das Esmeraldas, com prazo definido no TR. Vistoria facultativa até 27/11 ('+leftTxt(daysUntil(2026,11,27))+').',
 qualificacao:()=>'Para habilitar: atestado de 25% em locação de blindados, Certificado do Exército, blindadora com CR e índices contábeis iguais ou maiores que 1.',
 declaracoes:()=>'Proposta em PDF e prospectos vão no cadastro, até 30/11 às 9h. Os demais documentos, em até 4 horas após o chamado.',
 conflitos:()=>CONFLITOS.filter(c=>c.g==='alta').length+' pontos podem mudar seu preço ou te inabilitar. O prazo para questionar vence em 25/11 ('+leftTxt(daysUntil(...IMP))+').',
 matriz:()=>{const s=matrizSummary(); return s.title+': '+s.evaluated+' de '+s.all.length+' requisitos avaliados.';},
 kit:()=>{const a=KIT.flatMap(g=>g.itens),d=a.filter(i=>state.kit.done[i.id]).length; return d+' de '+a.length+' documentos prontos. Prospectos fora do cadastro ou documento fora das 4 horas podem custar o contrato.';},
 simulador:()=>{const r=calc(state.sim); return isFinite(r.Pmin)?'Com os custos informados, seu lance mínimo é '+fmt0(r.Pmin)+' (desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+')'+(isDefault()?', ainda com custos de exemplo.':'.'):'Com os percentuais atuais, nenhum preço cobre os custos.';},
 riscos:()=>{const r=calc(state.sim); return 'Antes de faturar, a empresa compra a frota (cerca de '+fmtMi(cvFrota())+' no exemplo) e reserva cerca de '+fmt0(giro(r))+' de capital de giro.';},
 parecer:()=>{const p=parecerCalc(); return p.title+(p.title.endsWith('…')?' ':'. ')+(state.parecer.decisao?'O parecer da empresa já foi registrado.':'Registre a decisão da empresa no fim desta página.');}
};
const HN={
 ficha:()=>[{v:'R$ 9,12 mi',l:'valor total estimado (30 meses)',c:'gold'},{v:'30/11',l:'sessão pública, às 9h',c:'ink'},{v:'30 meses',l:'vigência, prorrogável',c:'ink'}],
 condicoes:()=>[{v:'R$ 25.339',l:'por veículo por mês',c:'gold'},{v:'R$ 304 mil',l:'por mês para os 12 veículos',c:'blue'},{v:'06/10/2027',l:'preço fixo até esta data',c:'ink'}],
 veiculos:()=>[{v:'12',l:'SUVs grandes blindadas',c:'ink'},{v:'III-A',l:'nível de blindagem',c:'blue'},{v:'0 km',l:'ano/modelo corrente ou posterior',c:'blue'}],
 operacao:()=>{const n=daysUntil(2026,11,27); return [{v:'No TR',l:'prazo de entrega',c:'red'},{v:'27/11',l:'último dia para vistoria',c:'ink'},{v:n<0?'encerrado':n===0?'hoje':n+(n===1?' dia':' dias'),l:'para agendar e vistoriar',c:'blue'}];},
 qualificacao:()=>[{v:'25%',l:'do serviço em atestado',c:'red'},{v:'≥ 1',l:'índices LG, LC e SG',c:'ink'},{v:'R$ 912 mil',l:'capital ou PL, no máximo',c:'gold'}],
 declaracoes:()=>[{v:'3',l:'documentos no cadastro',c:'ink'},{v:'4 h',l:'para os demais após o chamado',c:'red'},{v:'7 dias',l:'para assinar o contrato',c:'ink'}],
 conflitos:()=>{const n=daysUntil(...IMP); return [{v:String(CONFLITOS.filter(c=>c.g==='alta').length),l:'de alta gravidade',c:'red'},{v:String(CONFLITOS.length),l:'pontos no total',c:'ink'},{v:n<0?'encerrado':n===0?'hoje':n+(n===1?' dia':' dias'),l:'para questionar (até 25/11)',c:'red'}];},
 matriz:()=>{const s=matrizSummary(); return [{v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,l:'atendidos, com ou sem ajuste',c:'green'},{v:String(s.c.verificar),l:'a verificar',c:'ink'},{v:String(s.blockers.length),l:'bloqueios eliminatórios',c:'red'}];},
 kit:()=>{const g=KIT.map(x=>x.itens.filter(i=>state.kit.done[i.id]).length+' de '+x.itens.length); const a=KIT.flatMap(x=>x.itens); return [{v:a.filter(i=>state.kit.done[i.id]).length+' de '+a.length,l:'documentos prontos',c:'green'},{v:g[0],l:'cadastro da proposta',c:'ink'},{v:g[1],l:'proposta ajustada e habilitação',c:'ink'}];},
 simulador:()=>{const r=calc(state.sim), ok=isFinite(r.Pmin); return [{v:ok?fmtMi(r.Pmin):'—',l:'lance mínimo viável',c:'blue'},{v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',l:'desconto máximo',c:'blue'},{v:isFinite(r.margL)?pct(r.margL):'—',l:'margem no lance testado',c:r.margL<0?'red':'green'}];},
 riscos:()=>{const r=calc(state.sim); return [{v:fmtMi(cvFrota()),l:'compra da frota (exemplo)',c:'gold'},{v:fmtMi(giro(r)),l:'capital de giro estimado',c:'gold'},{v:'No TR',l:'prazo do 1º pagamento',c:'ink'}];},
 parecer:()=>{const p=parecerCalc(); return [{v:p.title,l:'recomendação calculada',c:'gold'},{v:Math.round(overallProgress()*100)+'%',l:'da análise concluída',c:'ink'},{v:String(p.steps.length),l:'próximos passos',c:'ink'}];}
};
const CARD={
 ficha:()=>({m:'R$ 9,12 mi',s:'sessão em 30/11 · 9h'}),
 condicoes:()=>({m:'30 meses',s:'R$ 25.339,14 por veículo/mês'}),
 veiculos:()=>({m:'12 blindados',s:'SUV grande III-A · sem motorista'}),
 operacao:()=>({m:'Prazo no TR',s:'vistoria até 27/11',c:'warn'}),
 qualificacao:()=>({m:'Atestado 25%',s:'eliminatório',c:'alert'}),
 declaracoes:()=>({m:'3 + 5 documentos',s:'no cadastro e em 4 horas',c:'warn'}),
 conflitos:()=>({m:CONFLITOS.length+' pontos',s:CONFLITOS.filter(c=>c.g==='alta').length+' de alta gravidade',c:'alert'}),
 matriz:()=>{const s=matrizSummary(); return {m:(s.c.atende+s.c.ajuste)+' de '+s.all.length,s:s.title,c:s.kind==='go'?'ok':s.kind==='nogo'?'alert':'warn'};},
 kit:()=>{const a=KIT.flatMap(x=>x.itens), d=a.filter(i=>state.kit.done[i.id]).length; return {m:d+' de '+a.length,s:'documentos prontos',c:d===a.length?'ok':''};},
 simulador:()=>{const r=calc(state.sim); return {m:isFinite(r.Pmin)?fmtMi(r.Pmin):'—',s:'lance mínimo viável'+(isDefault()?' · exemplo':'')};},
 riscos:()=>({m:fmtMi(cvFrota()),s:'compra da frota · exemplo'}),
 parecer:()=>{const p=parecerCalc(); return {m:p.title,s:state.parecer.decisao?'decisão registrada':'registrar a decisão',c:p.kind==='go'?'ok':p.kind==='nogo'?'alert':'warn'};}
};

/* ---------------- calculadora de custo por veículo (exemplo) ---------------- */
const CV=[
 {k:'preco',l:'Veículo 0 km blindado, com kit strobo',h:'preço de compra por unidade',u:'R$',def:500000},
 {k:'rev',l:'Revenda após 30 meses',h:'% do preço de compra',u:'%',def:50},
 {k:'jur',l:'Juros da frota',h:'custo do dinheiro aplicado na compra',u:'%/mês',def:1.2},
 {k:'seg',l:'Seguro do veículo',h:'% do preço ao ano',u:'%/ano',def:5},
 {k:'ipva',l:'IPVA e licenciamento',h:'% do preço ao ano',u:'%/ano',def:3},
 {k:'man',l:'Manutenção, pneus e revisões',h:'por veículo',u:'R$/mês',def:800},
 {k:'ras',l:'Rastreador, guincho e outros',h:'por veículo',u:'R$/mês',def:250}
];
const cvState={};
CV.forEach(c=>cvState[c.k]=c.def);
function cvCalc(){
  const v=cvState, P=Math.max(0,v.preco||0), rv=(v.rev||0)/100;
  const L=[
   ['Depreciação (compra − revenda) ÷ 30',P*(1-rv)/MESES],
   ['Juros sobre o valor médio da frota',P*(1+rv)/2*(v.jur||0)/100],
   ['Seguro',P*(v.seg||0)/100/12],
   ['IPVA e licenciamento',P*(v.ipva||0)/100/12],
   ['Manutenção, pneus e revisões',v.man||0],
   ['Rastreador, guincho e outros',v.ras||0]
  ];
  const tot=L.reduce((a,b)=>a+b[1],0);
  return {L,tot,pct:tot/UNIT,frota:P*QTD};
}
const cvFrota=()=>cvCalc().frota;
function renderCv(force){
  document.querySelectorAll('#cvForm [data-cv]').forEach(inp=>{ if(document.activeElement===inp && !force) return; const k=inp.dataset.cv; inp.value=k==='preco'?NUM.format(Math.round(cvState[k])):NUM.format(cvState[k]); });
  const r=cvCalc();
  $('cvMes').textContent=fmt0(r.tot);
  $('cvPct').textContent=pct(r.pct); $('cvPct').style.color=r.pct>1?'var(--bad)':'';
  $('cvFrota').textContent=fmtMi(r.frota);
  $('cvBreak').innerHTML=r.L.map(x=>'<tr><td>'+x[0]+'</td><td class="r">'+fmt0(x[1])+'</td></tr>').join('')+'<tr><td><b>Total por veículo/mês</b></td><td class="r"><b>'+fmt0(r.tot)+'</b></td></tr>';
  $('cvUse').textContent='Usar '+pct(r.pct)+' no simulador';
}
function buildCv(){
  $('cvForm').innerHTML=CV.map(c=>'<div class="field"><label for="cv-'+c.k+'">'+c.l+'</label><small>'+c.h+'</small><div class="inp">'+(c.u==='R$'?'<span class="u">R$</span>':'')+'<input id="cv-'+c.k+'" inputmode="decimal" data-cv="'+c.k+'">'+(c.u==='R$'?'':'<span class="u">'+c.u+'</span>')+'</div></div>').join('');
  try{const v=JSON.parse(localStorage.getItem(E.lsPrefix+'cv')||'null'); if(v) CV.forEach(c=>{if(typeof v[c.k]==='number') cvState[c.k]=v[c.k];});}catch(e){}
}
$('cvForm').addEventListener('input',e=>{const i=e.target.closest('[data-cv]'); if(!i)return; cvState[i.dataset.cv]=parseNum(i.value); try{localStorage.setItem(E.lsPrefix+'cv',JSON.stringify(cvState))}catch(err){} renderCv(); renderRiscos(calc(state.sim)); renderOverview(); $('cvMsg').textContent='';});
$('cvForm').addEventListener('change',()=>renderCv(true));
$('cvUse').addEventListener('click',()=>{const p=Math.round(cvCalc().pct*1000)/10; state.sim.c_frota=p; renderSim('force'); renderOverview(); persist('sim'); $('cvMsg').textContent='Simulador atualizado: custo da frota em '+NUM.format(p)+'% do estimado.';});

/* ---------------- riscos ---------------- */
function renderRiscos(r){
  const L=r.L>0?r.L:REF;
  const T=[
   ['Faturamento mensal médio',fmt0(L/MESES),'lance ÷ 30 meses'],
   ['Compra da frota (exemplo)',fmt0(cvFrota()),'12 veículos · calculadora do simulador'],
   ['Capital de giro estimado',fmt0(giro(r)),'custos de '+NUM.format(state.sim.ciclo)+' dias (exemplo)'],
   ['Multa máxima por não assinar',fmt0(L*0.15),'15% do contrato · Edital 12.4.1']
  ];
  $('riskTiles').innerHTML=T.map(t=>'<div class="tile"><span class="k">'+t[0]+'</span><span class="v">'+t[1]+'</span><span class="s">'+t[2]+'</span></div>').join('');
}

const E={
  slug:'pe-18-2026-casa-militar-go', docPrefix:'editais/pe-18-2026-casa-militar-go/', lsPrefix:'pe18go-',
  ref:REF, teto:REF, garantiaPct:0, giro:'mensal',
  sessao:[2026,11,30], sessaoNome:'Sessão', chip:'R$ 9,12 mi · lote único',
  deadlines:[
   {d:[2026,11,25],lbl:'25/11',t:'Último dia para impugnar e pedir esclarecimento',s:'Edital 13.1 · campo próprio do SISLOG'},
   {d:[2026,11,27],lbl:'27/11',t:'Último dia para a vistoria prévia',s:'Agendar: (62) 3270-8848 · Edital 8.13'},
   {d:[2026,11,27],lbl:'27/11',t:'Limite para o órgão responder',s:'Último dia útil antes da sessão · Edital 13.2'},
   {d:[2026,11,30],lbl:'30/11 · 9h',t:'Sessão pública no SISLOG',s:'Proposta e anexos até a abertura · lances às 9h10 · Edital 2.4–2.5'}
  ],
  prazoQuestionar:IMP,
  sim:{
    tetoNome:'valor estimado', refNome:'valor estimado', artExeq:'Edital 7.11 e 7.13', artAcima:'Edital 7.10.3',
    tetoLabel:()=>'Estimado<br>R$ 9,12 mi',
    minSub:r=>'≈ '+fmt0(r.Pmin/MESES)+' por mês · '+fmt0(r.Pmin/MESES/QTD)+' por veículo',
    margSub:r=>'≈ '+fmt0(r.margL*r.L)+' em 30 meses',
    descValue:(r,ok,ref)=>ok?(r.Pmin<ref?pct(1-r.Pmin/ref):'sem desconto'):'—',
    passo:()=>45.61
  },
  kpis(x){ const {s,r,exemplo,ok}=x; const dImp=daysUntil(...IMP); return [
   {href:'condicoes',k:'Valor total estimado',v:'R$ 9,12 mi',c:'gold',s:'30 meses · 12 SUVs blindadas'},
   {href:'simulador',k:'Desconto máximo viável',v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',c:'blue',s:ok?'lance mínimo '+fmtMi(r.Pmin)+(exemplo?' (custos de exemplo)':''):'revise o simulador'},
   {href:'conflitos',k:'Conflitos graves',v:String(CONFLITOS.filter(c=>c.g==='alta').length),c:'red',s:'questionar até 25/11 ('+leftTxt(dImp)+')'},
   {href:'matriz',k:'Requisitos atendidos',v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,c:'green',s:s.c.verificar?s.c.verificar+' a verificar na matriz':(s.blockers.length?s.blockers.length+' bloqueio(s)':'todos avaliados')}
  ]; },
  precoTxt:r=>'Lance mínimo de '+fmt0(r.Pmin)+', desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+'.'+(r.Pmin<0.5*REF?' Abaixo de 50% do estimado: exige prova de exequibilidade.':''),
  riscosTxt:d=>'TR e minuta ausentes, capital ou PL, atestado de 25% e Certificado do Exército. Prazo para questionar: 25/11 ('+leftTxt(d)+').',
  prepTxt:(r,L)=>'Documentos do cadastro e das 4 horas prontos. Caixa: frota de cerca de '+fmt0(cvFrota())+' (exemplo) e '+fmt0(giro(r))+' de capital de giro.',
  passoBloqueio:'Avaliar consórcio ou parceria (blindadora, locadora com atestado) que supra essas exigências antes de desistir.',
  exeqStep:'Preparar a prova de exequibilidade do preço (Edital 7.11 e 7.13).',
  questionarStep:a=>'Decidir até 25/11 se vai pedir esclarecimento ou impugnar os '+a+' pontos de alta gravidade.',
  stepsGo:['Ler o TR e a minuta (Anexos I e II) no SISLOG ou no PNCP.','Cadastrar a proposta no SISLOG, com PDF e prospectos, antes de 30/11 às 9h.'],
  init(){ buildCv(); renderCv(true); },
  onSim(r){ renderRiscos(r); }
};
