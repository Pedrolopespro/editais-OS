/* ===== Edital: Licitação 7004688324 · Petrobras Transporte S.A. – Transpetro · Lotes 1 (NNESE) e 2 (SSPCO) ===== */
/* ---------------- dados ---------------- */
/* Orçamento sigiloso (Edital 5.1 e). REF = estimativa nossa: veículos da ET (Tabelas I e III) × preço mensal de mercado adotado × 36 meses. */
const MESES=36;
const PRECO={sedan:5000, hatch:4200, picape:10500};   /* R$ por veículo por mês · premissa nossa, não é dado do edital */
// [lote, tipo, chave de preço, quantidade, bases]
const FROTA=[
 [1,'Sedan leve','sedan',10,'Sede/RJ, Angra, Campos Elíseos (4) · São Luís (2) · Suape (2) · Belém (2)'],
 [1,'Picape 4x4 diesel','picape',3,'Sede/RJ, Angra e Campos Elíseos'],
 [2,'Sedan leve','sedan',11,'Grupo SP (10) · Guaramirim (1)'],
 [2,'Hatch','hatch',25,'Grupo SP (22) · Paranaguá, Osório e Itajaí (1 cada)'],
 [2,'Picape 4x4 diesel','picape',6,'Grupo SP (5) · Guaramirim (1)']
];
const valorLinha=x=>x[3]*PRECO[x[2]]*MESES;
const refLote=n=>FROTA.filter(x=>x[0]===n).reduce((s,x)=>s+valorLinha(x),0);
const REF1=refLote(1), REF2=refLote(2), REF=REF1+REF2;   /* 2.934.000 + 8.028.000 = 10.962.000 */
const fmtK=n=>'R$ '+Math.round(n/1000).toLocaleString('pt-BR')+' mil';
Object.assign(ILLU,{
 frota:'<path d="M14 64V46l14-2 12-14h38l10 14h46c3 0 6 3 6 6v14"/><path d="M14 64h14M52 64h60M136 64h14"/><path d="M46 44l8-10h20v10z"/><path d="M88 44V30" opacity=".45"/><circle class="acc" cx="40" cy="64" r="9"/><circle class="acc" cx="124" cy="64" r="9"/><path d="M98 52h44" opacity=".45"/>'
});
/* divisão do custo de referência por parcela: premissa nossa, igual nos 2 lotes */
const PARTES={frota:0.55, man:0.12, seg:0.13, tec:0.05, oper:0.15};
const COMPONENTS=[
 {k:'frota', nome:'Frota: depreciação e custo da compra', det:'55 veículos · 0 km no Lote 1 · até 30 mil km no Lote 2', v:REF*PARTES.frota, cor:'var(--blue)', def:70},
 {k:'man',   nome:'Manutenção, pneus e revisões', det:'≈ 4.200 km/mês por carro · concessionária autorizada', v:REF*PARTES.man, cor:'var(--green)', def:70},
 {k:'seg',   nome:'Seguro, IPVA e licenciamento', det:'RC, APP e documentos em dia', v:REF*PARTES.seg, cor:'var(--gold)', def:70},
 {k:'tec',   nome:'Rastreador, câmeras e sistema', det:'GPS com identificação do condutor · BDV-E · chips', v:REF*PARTES.tec, cor:'var(--steel)', def:60},
 {k:'oper',  nome:'Operação: substitutos, 0800 e preposto', det:'veículo substituto, guincho, entrega, adesivos, tags', v:REF*PARTES.oper, cor:'var(--amber)', def:60}
];
const LOTES=[
 {n:'Lote 1 · NNESE',ref:REF1,q:'13 veículos'},
 {n:'Lote 2 · SSPCO',ref:REF2,q:'42 veículos'}
];

const CONFLITOS=[
 {g:'alta',tipo:'Edital × arquivos',t:'Planilha de Preços Unitários (PPU) ausente nos 2 lotes',a:['Edital 3.2.2 a · 11.1','A proposta é a PPU "encaminhada conforme Anexo 2 do Adendo A", e o total dela vai no campo "Preço" do portal.'],b:['Pastas Lote 1 e Lote 2','Nenhum Anexo 2 nos arquivos. A ET cita "itens 3 e 4" (Lote 1) e "4, 5 e 6" (Lote 2) da PPU para os eventuais, sem quantidade.'],why:'Sem a PPU não se sabe quantos meses de veículo eventual a Transpetro estima nem o formato exigido. Item em branco é tido como incluído nos demais preços (Edital 3.2.2 a, ii).',todo:'Baixar a PPU de cada lote no Petronect. Se não estiver lá, pedir na Sala de Colaboração até 24/11, 15h.'},
 {g:'alta',tipo:'Edital × arquivos',t:'Minuta do contrato só no Lote 1',a:['Edital p. 1, 9.1.1, 11.1','Um contrato por lote, "cuja minuta se encontra no Adendo A".'],b:['Pasta Lote 2','Tem os anexos do Adendo A (ET, check-list, nuvem, dados), mas não a minuta. Nenhum documento do Lote 2 remete à minuta do Lote 1.'],why:'Prazo, pagamento, reajuste, multas e retenção do Lote 2 não podem ser conferidos. O DFP do Lote 2 indica 36 meses, igual ao Lote 1, mas o resto é suposição.',todo:'Baixar a minuta do Lote 2 no portal ou perguntar se vale a do Lote 1. Até a resposta, cotar o Lote 2 com as regras do Lote 1.'},
 {g:'alta',tipo:'Edital × arquivos',t:'Demonstrativo de Formação de Preços (DFP) só no Lote 2',a:['Edital 3.2.2 b, 3.2.11','DFP único conforme Adendo C é obrigatório na proposta; falta de documento pode desclassificar.'],b:['Pasta Lote 1','Sem Adendo C. O modelo do Lote 2 traz no cabeçalho "LOTE 2 - ... SSPCO" e linha de hatch, que o Lote 1 não tem.'],why:'O DFP é anexado junto com a proposta e não pode ser incluído depois (Edital 10.3). Usar o modelo errado pode ser recusado ("não serão aceitos DFP em modelos diversos", DFP, Orientações 1.2).',todo:'Baixar o DFP do Lote 1 no Petronect. Se não houver, perguntar se o modelo do Lote 2 vale para o Lote 1 e para o lote virtual.'},
 {g:'media',tipo:'ET Lote 1 × ET Lote 2',t:'Mesma ET, idades de frota diferentes',a:['ET L1 4.1','Veículos definitivos 0 km, em até 60 dias da solicitação de mobilização.'],b:['ET L2 4.1, 4.1.2','Veículos com até 30 mil km e até 1 ano; nenhum prazo de entrega após a solicitação; 75% da frota até o 12º mês.'],why:'O custo da frota muda bastante entre os lotes e no Lote 2 falta o prazo de entrega que define atraso e multa.',todo:'Cotar cada lote com a sua regra. Perguntar o prazo de entrega do Lote 2 e se vale a mobilização temporária de 120 dias também ali.'},
 {g:'media',tipo:'Dentro da ET',t:'Rodagem estimada estoura o limite de troca',a:['ET 4.1.4, Tabela III','Sedans 42 mil km/mês para 10 (L1) e 46 mil para 11 (L2); hatches 106 mil para 25; picapes 17 mil para 3 e 34 mil para 6.'],b:['ET 7.7','Troca obrigatória com 4 anos ou 150 mil km (sedan e hatch) ou 200 mil km (picape).'],why:'Cálculo nosso: cerca de 151 mil km por carro e 204 mil por picape em 36 meses. No Lote 2, quem começa com 30 mil km troca por volta do 28º mês. A medição não paga km a mais (ET 4.1.4).',todo:'Embutir no preço a revenda baixa e uma eventual troca no fim do contrato. Perguntar se a Tabela III é uso real esperado ou só histórico.'},
 {g:'media',tipo:'Dentro da ET',t:'Carro de 80 cv com pacote completo de assistência',a:['ET 4.1.1 i–ii','Sedan e hatch "mínimo 80 cv", flex, com cruzeiro adaptativo, frenagem autônoma, ponto cego, visão 360°, sensor de chuva e faróis full LED.'],b:['ET 4.1.1.1','Câmera com "ventosa de fixação" e "bateria 150 mAh", mas ligada ao sistema elétrico e integrada à telemetria; resolução "1920X108".'],why:'Poucos modelos flex de entrada reúnem todos os itens; o preço real fica perto de versões topo de linha. A especificação da câmera mistura produto avulso e sistema embarcado.',todo:'Listar já os modelos que atendem a tudo e perguntar se itens equivalentes são aceitos e qual é a resolução correta da câmera frontal.'},
 {g:'media',tipo:'Dentro da minuta',t:'Reajuste sem índices definidos',a:['Minuta 7.1','Fórmula com a1 = 0,06 (mão de obra) e c1 = 0,94 (equipamentos).'],b:['Minuta 7.1','"M, MT e EQ" são "índice(s) de preço(s) considerado(s) como representativo(s)", sem dizer quais.'],why:'Num contrato de 36 meses de frota, o índice do reajuste pesa no preço dos anos 2 e 3.',todo:'Perguntar quais índices valem para M1 e EQ1 (e para o Lote 2).'},
 {g:'media',tipo:'Edital × Adendo D',t:'Patrimônio líquido de 5% "da proposta": de qual lote?',a:['Adendo D, Tabela 1','PL de 5% do valor da proposta.'],b:['Edital p. 1','Propostas por lote e pelo lote virtual (1 + 2), com contratos separados.'],why:'Quem disputa os dois lotes e o virtual pode ser medido pela soma (≈ R$ 548 mil na nossa estimativa) ou lote a lote.',todo:'Conferir o PL no cenário mais exigente (soma) ou preparar a garantia corporativa. Perguntar na Sala de Colaboração.'},
 {g:'baixa',tipo:'ET Lote 2 × PPU',t:'Numeração dos itens no Lote 2',a:['ET L2 4.1, 4.2','Itens 1, 2 e 3 (próprios) e 4, 5 e 6 (eventuais).'],b:['ET L2 4.3','Medição "conforme os itens 1.1, 1.2, 2.1 e 2.2 da PPU".'],why:'Sem a PPU não dá para saber qual numeração vale; pode gerar erro de preenchimento.',todo:'Seguir a numeração da PPU baixada no portal.'},
 {g:'baixa',tipo:'Dentro da ET',t:'Prazo do veículo eventual no Lote 1',a:['ET L1 4.2','"Em até 15 (dez) dias corridos".'],b:['ET L2 4.2','"Em até 10 (dez) dias corridos".'],why:'Número e extenso divergem no Lote 1. Vale o mais curto por cautela.',todo:'Planejar 10 dias nos 2 lotes.'},
 {g:'baixa',tipo:'Edital × DFP',t:'ISS: não incide, mas aparece no DFP',a:['Edital 3.1.2.1.4','O serviço "não se enquadra" na lista de serviços da LC 116/03.'],b:['Edital 3.1.2.1.4.1 · DFP','Regra de alíquota média de ISS; linha de ISS e código da LC 116 na aba DAT.'],why:'Locação de bens móveis não sofre ISS; incluir ISS encarece a proposta à toa.',todo:'Deixar ISS zerado e justificar no DFP, salvo orientação contrária da Transpetro.'},
 {g:'baixa',tipo:'Dentro da ET',t:'Remissões erradas e locais incompletos',a:['ET 4.1.5.2, 5 · Anexo 1A','Cita item "4.1.13.4" (não existe) e "4.1.5,3" para a participação em sinistros, que está no 4.1.5.4; o check-list se chama "Anexo E" no próprio arquivo.'],b:['ET L2 3, Tabela I','A Tabela I inclui Santos, que não está na lista de endereços.'],why:'Falhas de redação; Santos pode ser uma base de entrega a mais.',todo:'Perguntar o endereço de Santos; nas remissões, usar o item correto.'}
];

const MATRIZ=[
 {g:'Habilitação',itens:[
  {id:'cad',t:'Inscrição no Petronect e Cadastro da Petrobras',d:'Critérios aprovados dispensam documentos (Edital 6.2.1)',src:'Edital p. 2, 6.2',elim:false},
  {id:'pl',t:'Patrimônio líquido de 5% da proposta',d:'≈ R$ 146,7 mil (L1), R$ 401,4 mil (L2), R$ 548,1 mil (soma)',src:'Adendo D, Tabela 1',elim:true},
  {id:'lc',t:'Liquidez corrente de 0,8 ou mais',d:'Balanço do último exercício (ou penúltimo até 180 dias)',src:'Adendo D · Anexo D.2',elim:true},
  {id:'alav',t:'Alavancagem de até 70%',d:'Ou garantia corporativa da empresa-mãe',src:'Adendo D, Nota 3 · Anexo D.2',elim:true},
  {id:'atest',t:'Atestado de locação de veículos leves para pessoas',d:'1 serviço, sem quantidade mínima (família 99005761)',src:'Anexo D.3, 3',elim:true},
  {id:'gri',t:'GRI baixo ou médio, ou questionário DDI respondido',d:'GRI alto exclui da licitação',src:'Edital 10.6.3.1, 10.6.4',elim:true},
  {id:'regular',t:'FGTS, CND federal e CNDT regulares',d:'Condição para assinar; Cadin pode excluir',src:'Edital 9.2 b–c',elim:true},
  {id:'forma',t:'Empresa isolada, não cooperativa',d:'Consórcio e cooperativa proibidos',src:'Edital 2.2, 2.3.2',elim:true}
 ]},
 {g:'Proposta',itens:[
  {id:'ppu',t:'PPU de cada lote preenchida e anexada',d:'Total igual ao campo "Preço" do portal',src:'Edital 3.2.2 a',elim:true},
  {id:'dfp',t:'DFP de cada lote no modelo do Adendo C',d:'Macros habilitadas; total = PPU',src:'Edital 3.2.2 b',elim:true},
  {id:'virtual',t:'Decisão sobre o lote virtual',d:'Proposta para 1 + 2 com desconto pela escala, se fizer sentido',src:'Edital p. 1',elim:false}
 ]},
 {g:'Frota e operação',itens:[
  {id:'l1frota',t:'Lote 1: 10 sedans e 3 picapes 0 km em 60 dias',d:'Temporários até 120 dias com até 30 mil km',src:'ET L1 4.1',elim:false},
  {id:'l2frota',t:'Lote 2: 11 sedans, 25 hatches e 6 picapes',d:'Até 30 mil km e 1 ano; 75% até o 12º mês',src:'ET L2 4.1, 4.1.2',elim:false},
  {id:'modelos',t:'Modelos que atendem a toda a lista da ET',d:'Assistência à condução, visão 360°, picape 170 cv diesel',src:'ET 4.1.1',elim:false},
  {id:'sistemas',t:'Rastreador com identificação do condutor e câmeras',d:'Ferramenta de gestão, BDV-E e nuvem no Brasil',src:'ET 4.1.1.1, 4.1.5.6, 7.9 · Anexo 5',elim:false},
  {id:'apoio',t:'Assistência 24 h por 0800 e substituto em 24 h',d:'Em RJ, MA, PE, PA, SP, PR, SC e RS',src:'ET 4.1.5.5, 7.4',elim:false},
  {id:'preposto',t:'Preposto disponível 24 h',d:'Sem dedicação exclusiva',src:'ET 7.8',elim:false}
 ]},
 {g:'Finanças',itens:[
  {id:'compra',t:'Dinheiro ou crédito para comprar a frota',d:'Até 55 veículos antes de faturar',src:'ET 4.1',elim:false},
  {id:'giro',t:'Capital de giro para cerca de 60 dias',d:'Mais a retenção de 1% de cada medição até o fim',src:'Minuta 6.1, 20.1',elim:false},
  {id:'seguro',t:'Seguro dos veículos com RC e APP',d:'Certificados entregues à Transpetro',src:'ET 7.3',elim:false}
 ]}
];

const KIT=[
 {g:'Antes da abertura',prazo:'até 01/12 · 12h',itens:[
  {id:'k-baixar',t:'PPU, minuta do Lote 2 e DFP do Lote 1 baixados',d:'Oportunidade 7004688324 no Petronect'},
  {id:'k-duvidas',t:'Dúvidas enviadas na Sala de Colaboração',d:'Até 24/11 às 15h, no texto da mensagem (Edital p. 2)'},
  {id:'k-ppu',t:'PPU de cada lote preenchida',d:'Anexada em Notas e Anexos, tipo "Anexos" (Edital 3.2.2 a)'},
  {id:'k-dfp',t:'DFP de cada lote preenchido',d:'Anexado como tipo "DFP"; total igual ao da PPU (Edital 3.2.2 b)'},
  {id:'k-preco',t:'Preço total digitado na aba "Itens"',d:'É o que vale para julgamento (Edital 5.3.1)'},
  {id:'k-aceite',t:'Aceite digital da Declaração Unificada',d:'E autodeclaração de ME/EPP, se for o caso (Edital 3.2.1)'},
  {id:'k-status',t:'Status "Cotação Apresentada" conferido',d:'Edital 3.2.10'}
 ]},
 {g:'Habilitação e efetividade',prazo:'1 dia útil · Edital 3.3, 6.3.1',itens:[
  {id:'k-legal',t:'Certidão da Junta, contrato social e CNPJ',d:'Se não aprovados no Cadastro (Anexo D.1)'},
  {id:'k-balanco',t:'Balanço e DRE com recibo e hash do SPED',d:'Auditoria se for grande porte (Anexo D.2)'},
  {id:'k-pcg',t:'Carta de garantia corporativa',d:'Só se não atingir os índices (Adendo D, Nota 3)'},
  {id:'k-atest',t:'Atestado de locação de veículos leves',d:'Assinado, com CNPJ e escopo (Anexo D.3)'},
  {id:'k-d0',t:'Check-list do Anexo D.0 preenchido',d:'Indica qual arquivo comprova cada requisito'},
  {id:'k-ddi',t:'Questionário DDI (Adendo E)',d:'Se a empresa não tiver GRI (Edital 10.6.3.1)'},
  {id:'k-exeq',t:'Prova de exequibilidade pronta',d:'Cotações dos veículos, memória de cálculo, seguro (Edital 5.2.3)'},
  {id:'k-me',t:'ME/EPP: DRE, Anexo B.2 e certidão da Junta',d:'Edital 3.2.1.3.2, 3.4'}
 ]},
 {g:'Assinatura e início',prazo:'2 dias úteis · Edital 9.1.1',itens:[
  {id:'k-decl',t:'Declaração Unificada assinada',d:'Assinatura qualificada ou avançada (Edital 3.2.1.1, 10.10.1)'},
  {id:'k-dfc',t:'Aba DFC do DFP preenchida',d:'Dados bancários, signatários e sócios (Edital 9.2.3)'},
  {id:'k-cert',t:'FGTS, CND e CNDT em dia',d:'Edital 9.2 b'},
  {id:'k-frota',t:'Frota encomendada e seguro contratado',d:'Lote 1: 0 km em 60 dias da solicitação'},
  {id:'k-sist',t:'Rastreadores, câmeras e sistema de gestão',d:'Com certificado de homologação (ET 4.1.5.6)'},
  {id:'k-manut',t:'Plano de manutenção dos veículos',d:'Entregue na data de início (ET 4.1.5)'}
 ]}
];

const SIM_PARAMS=[
 {k:'trib',l:'Tributos sobre o faturamento',h:'PIS, COFINS, IRPJ e CSLL do seu regime · sem ISS (Edital 3.1.2.1.4)',u:'%',def:11},
 {k:'adm',l:'Despesas indiretas',h:'sobre o custo direto: administração central, gestão da frota',u:'%',def:6},
 {k:'glosa',l:'Perdas na medição',h:'veículo parado, multas e descontos, sobre o faturamento',u:'%',def:1},
 {k:'marg',l:'Margem líquida desejada',h:'sobre o valor da proposta',u:'%',def:8},
 {k:'ciclo',l:'Ciclo até receber',h:'do 1º dia da medição ao pagamento (Minuta 6.1)',u:'dias',def:60},
 {k:'juros',l:'Custo do capital de giro',h:'taxa mensal do seu financiamento',u:'%/mês',def:1.5}
];
const SIM_DEF=()=>{const o={lance:10400000}; COMPONENTS.forEach(c=>{if(!c.fixed)o['c_'+c.k]=c.def}); SIM_PARAMS.forEach(p=>o[p.k]=p.def); return o;};

/* capital de giro: o motor calcula sobre 12 meses; aqui o contrato tem 36 */
const giro=r=>r.K*12/MESES;
function calcLote(L,sv){
  let cdir=0; COMPONENTS.forEach(c=>{cdir+=L.ref*PARTES[c.k]*Math.max(0,sv['c_'+c.k]||0)/100;});
  const C=cdir*(1+(sv.adm||0)/100), F=C*((sv.ciclo||0)/30)*((sv.juros||0)/100);
  const g=(sv.glosa||0)/100,t=(sv.trib||0)/100,m=(sv.marg||0)/100;
  const den=(1-g)*(1-t)-m;
  return den>0?(C+F)/den:Infinity;
}

const SECTIONS=[
 {id:'ficha',sec:'ficha',nome:'Ficha do edital',etapa:1},
 {id:'condicoes',sec:'cond',nome:'Condições gerais',etapa:1},
 {id:'operacao',sec:'oper',art:'kit',nome:'Entrega e operação',etapa:1},
 {id:'veiculos',sec:'oper',art:'frota',nome:'Veículos',etapa:1},
 {id:'qualificacao',sec:'qual',nome:'Qualificação',etapa:2},
 {id:'declaracoes',sec:'decl',nome:'Declarações',etapa:2},
 {id:'conflitos',sec:'conf',nome:'Conflitos',etapa:2},
 {id:'planilha',sec:'plan',nome:'Planilha e valor',etapa:2},
 {id:'matriz',sec:'matriz',nome:'Matriz de aderência',etapa:3},
 {id:'kit',sec:'kit',nome:'Kit do 1 dia útil',etapa:3},
 {id:'simulador',sec:'simul',nome:'Simulador de proposta',etapa:4},
 {id:'riscos',sec:'risco',nome:'Caixa e riscos',etapa:4},
 {id:'parecer',sec:'parecer',nome:'Parecer final',etapa:5}
];

const IMP=[2026,11,24];
const altas=()=>CONFLITOS.filter(c=>c.g==='alta').length;
const diasTxt=n=>n<0?'encerrado':n===0?'hoje':n+(n===1?' dia':' dias');
const TAKE={
 ficha:()=>'Licitação da Lei 13.303 no Petronect, disputa fechada, menor preço por lote, com lote virtual. Abertura das propostas em 01/12, às 12h.',
 condicoes:()=>'Contrato de 36 meses por lote, pago por veículo mobilizado, sem garantia contratual. Orçamento sigiloso: estimamos cerca de R$ 11,0 mi nos 2 lotes.',
 operacao:()=>'Lote 1 com veículos 0 km em 60 dias do pedido; Lote 2 com até 30 mil km. Sem escritório local, mas com 0800, substituto e preposto 24 h.',
 veiculos:()=>'55 veículos sem motorista: 21 sedans, 25 hatches e 9 picapes 4x4 diesel, com pacote completo de assistência à condução e uso de ~4.200 km por mês.',
 qualificacao:()=>'Para habilitar: 1 atestado de locação de veículos leves, PL de 5% da proposta, liquidez de 0,8 e alavancagem de até 70%.',
 declaracoes:()=>'PPU, DFP e aceite da Declaração Unificada vão com a proposta. Habilitação e DDI em 1 dia útil após o chamado.',
 conflitos:()=>altas()+' pontos de alta gravidade: faltam PPU, minuta do Lote 2 e DFP do Lote 1. Dúvidas e impugnação até 24/11 ('+leftTxt(daysUntil(...IMP))+').',
 planilha:()=>'Orçamento sigiloso e DFP sem valores. Nossa estimativa: R$ 10.962.000 em 36 meses (Lote 1 R$ 2,93 mi, Lote 2 R$ 8,03 mi).',
 matriz:()=>{const s=matrizSummary(); return s.title+': '+s.evaluated+' de '+s.all.length+' requisitos avaliados.';},
 kit:()=>{const a=KIT.flatMap(g=>g.itens),d=a.filter(i=>state.kit.done[i.id]).length; return d+' de '+a.length+' itens prontos. Na disputa fechada, o que faltar na proposta não entra depois.';},
 simulador:()=>{const r=calc(state.sim); return isFinite(r.Pmin)?'Com os custos informados, a proposta mínima nos 2 lotes é '+fmt0(r.Pmin)+' (desconto máximo de '+pct(Math.max(0,1-r.Pmin/REF))+' sobre a nossa estimativa)'+(isDefault()?', ainda com custos de exemplo.':'.'):'Com os percentuais atuais, nenhum preço cobre os custos.';},
 riscos:()=>{const r=calc(state.sim); return 'Antes de faturar: comprar a frota (cerca de '+fmtMi(frTotal())+' no exemplo) e reservar cerca de '+fmt0(giro(r))+' de capital de giro.';},
 parecer:()=>{const p=parecerCalc(); return p.title+(p.title.endsWith('…')?' ':'. ')+(state.parecer.decisao?'O parecer da empresa já foi registrado.':'Registre a decisão da empresa no fim desta página.');}
};
const HN={
 ficha:()=>[{v:'01/12',l:'abertura das propostas, às 12h',c:'ink'},{v:'2 + 1',l:'lotes e lote virtual',c:'ink'},{v:'Sigiloso',l:'orçamento da Transpetro',c:'gold'}],
 condicoes:()=>[{v:'≈ R$ 11,0 mi',l:'estimativa nossa em 36 meses',c:'gold'},{v:'Sem garantia',l:'retenção de 1% por medição',c:'green'},{v:'30 dias',l:'para pagar após a medição',c:'ink'}],
 operacao:()=>[{v:'60 dias',l:'para entregar 0 km no Lote 1',c:'blue'},{v:'24 h',l:'para pôr veículo substituto',c:'red'},{v:'Sem base',l:'escritório local não exigido',c:'green'}],
 veiculos:()=>[{v:'55',l:'veículos fixos nos 2 lotes',c:'ink'},{v:'9',l:'picapes 4x4 diesel',c:'blue'},{v:'~4.200 km',l:'por mês por carro',c:'red'}],
 qualificacao:()=>[{v:'1',l:'atestado, sem quantidade mínima',c:'green'},{v:'5%',l:'da proposta em patrimônio líquido',c:'gold'},{v:'0,8',l:'liquidez corrente mínima',c:'ink'}],
 declaracoes:()=>[{v:'3',l:'arquivos com a proposta',c:'ink'},{v:'1 dia útil',l:'para a habilitação',c:'red'},{v:'2 dias úteis',l:'para assinar',c:'ink'}],
 conflitos:()=>{const n=daysUntil(...IMP); return [{v:String(altas()),l:'de alta gravidade',c:'red'},{v:String(CONFLITOS.length),l:'pontos no total',c:'ink'},{v:diasTxt(n),l:'para questionar (até 24/11)',c:n<0?'red':'blue'}];},
 planilha:()=>[{v:'R$ 304.500',l:'por mês nos 2 lotes (estimativa)',c:'gold'},{v:'55',l:'veículos × 36 meses',c:'ink'},{v:'70%',l:'abaixo disso, indício de inexequível',c:'red'}],
 matriz:()=>{const s=matrizSummary(); return [{v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,l:'atendidos, com ou sem ajuste',c:'green'},{v:String(s.c.verificar),l:'a verificar',c:'ink'},{v:String(s.blockers.length),l:'bloqueios eliminatórios',c:'red'}];},
 kit:()=>{const a=KIT.flatMap(x=>x.itens); const g=KIT.map(x=>x.itens.filter(i=>state.kit.done[i.id]).length+' de '+x.itens.length); return [{v:a.filter(i=>state.kit.done[i.id]).length+' de '+a.length,l:'itens prontos',c:'green'},{v:g[0],l:'antes da abertura',c:'ink'},{v:g[1],l:'habilitação',c:'ink'}];},
 simulador:()=>{const r=calc(state.sim), ok=isFinite(r.Pmin); return [{v:ok?fmtMi(r.Pmin):'—',l:'proposta mínima nos 2 lotes',c:'blue'},{v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',l:'desconto máximo sobre a estimativa',c:'blue'},{v:isFinite(r.margL)?pct(r.margL):'—',l:'margem na proposta testada',c:r.margL<0?'red':'green'}];},
 riscos:()=>{const r=calc(state.sim); return [{v:fmtMi(frTotal()),l:'compra da frota (exemplo)',c:'gold'},{v:fmtK(giro(r)),l:'capital de giro estimado',c:'gold'},{v:'~60 dias',l:'do início da medição ao pagamento',c:'ink'}];},
 parecer:()=>{const p=parecerCalc(); return [{v:p.title,l:'recomendação calculada',c:'gold'},{v:Math.round(overallProgress()*100)+'%',l:'da análise concluída',c:'ink'},{v:String(p.steps.length),l:'próximos passos',c:'ink'}];}
};
const CARD={
 ficha:()=>({m:'01/12 · 12h',s:'abertura no Petronect'}),
 condicoes:()=>({m:'36 meses',s:'sem garantia · orçamento sigiloso',c:'warn'}),
 operacao:()=>({m:'60 dias',s:'0 km no Lote 1 · substituto em 24 h'}),
 veiculos:()=>({m:'55 veículos',s:'sem motorista · 2 lotes'}),
 qualificacao:()=>({m:'1 atestado',s:'PL de 5% da proposta',c:'warn'}),
 declaracoes:()=>({m:'PPU + DFP',s:'com a proposta · habilitação em 1 dia útil',c:'warn'}),
 conflitos:()=>({m:CONFLITOS.length+' pontos',s:altas()+' de alta gravidade',c:'alert'}),
 planilha:()=>({m:'≈ R$ 11,0 mi',s:'estimativa nossa · orçamento sigiloso',c:'alert'}),
 matriz:()=>{const s=matrizSummary(); return {m:(s.c.atende+s.c.ajuste)+' de '+s.all.length,s:s.title,c:s.kind==='go'?'ok':s.kind==='nogo'?'alert':'warn'};},
 kit:()=>{const a=KIT.flatMap(x=>x.itens), d=a.filter(i=>state.kit.done[i.id]).length; return {m:d+' de '+a.length,s:'itens prontos',c:d===a.length?'ok':''};},
 simulador:()=>{const r=calc(state.sim); return {m:isFinite(r.Pmin)?fmtMi(r.Pmin):'—',s:'proposta mínima nos 2 lotes'+(isDefault()?' · exemplo':'')};},
 riscos:()=>({m:fmtMi(frTotal()),s:'compra da frota · exemplo'}),
 parecer:()=>{const p=parecerCalc(); return {m:p.title,s:state.parecer.decisao?'decisão registrada':'registrar a decisão',c:p.kind==='go'?'ok':p.kind==='nogo'?'alert':'warn'};}
};

/* ---------------- condições gerais e planilha ---------------- */
function renderComposition(){
  $('stack').innerHTML=COMPONENTS.map(c=>'<i style="width:'+(c.v/REF*100)+'%;background:'+c.cor+'" title="'+esc(c.nome)+'"></i>').join('');
  $('legend').innerHTML=COMPONENTS.map(c=>'<li><span class="sw" style="background:'+c.cor+'"></span><span><b>'+c.nome+'</b> <span class="hint">· '+c.det+'</span></span><span class="r">'+fmt(c.v)+'</span><span class="r p">'+pct(c.v/REF)+'</span></li>').join('')+'<li><span></span><span><b>Total estimado dos 2 lotes</b></span><span class="r"><b>'+fmt(REF)+'</b></span><span class="r p">100%</span></li>';
  let h='';
  COMPONENTS.forEach(c=>{const p=PARTES[c.k]; h+='<tr><td><b>'+c.nome+'</b></td><td class="r">'+fmt(REF1*p)+'</td><td class="r">'+fmt(REF2*p)+'</td><td class="r">'+fmt(REF*p)+'</td></tr>';});
  h+='<tr><td><b>Veículos fixos</b></td><td class="r">13</td><td class="r">42</td><td class="r">55</td></tr>';
  h+='<tr><td><b>Por mês</b></td><td class="r">'+fmt(REF1/MESES)+'</td><td class="r">'+fmt(REF2/MESES)+'</td><td class="r">'+fmt(REF/MESES)+'</td></tr>';
  h+='<tr><td><b>Total em 36 meses</b></td><td class="r"><b>'+fmt(REF1)+'</b></td><td class="r"><b>'+fmt(REF2)+'</b></td><td class="r"><b>'+fmt(REF)+'</b></td></tr>';
  $('loteTable').querySelector('tbody').innerHTML=h;
  $('planTiles').innerHTML=[
    ['Lote 1 · NNESE',fmt0(REF1),'13 veículos · '+fmt0(REF1/MESES)+' por mês','t1'],
    ['Lote 2 · SSPCO',fmt0(REF2),'42 veículos · '+fmt0(REF2/MESES)+' por mês','t2'],
    ['Lote virtual (1 + 2)',fmt0(REF),'55 veículos · 36 meses','t6'],
    ['Sedan (premissa)',fmt0(PRECO.sedan),'por veículo por mês','t3'],
    ['Hatch (premissa)',fmt0(PRECO.hatch),'por veículo por mês','t4'],
    ['Picape 4x4 (premissa)',fmt0(PRECO.picape),'por veículo por mês','t5']
  ].map(t=>'<div class="tile '+t[3]+'"><span class="k">'+t[0]+'</span><span class="v">'+t[1]+'</span><span class="s">'+t[2]+'</span></div>').join('');
}
function renderPlanilha(){
  let h='<thead><tr><th>Lote</th><th>Veículo</th><th>Bases</th><th class="r">Qtd</th><th class="r">R$/mês (premissa)</th><th class="r">Mensal</th><th class="r">36 meses</th></tr></thead><tbody>';
  [1,2].forEach(n=>{
    FROTA.filter(x=>x[0]===n).forEach(x=>{const m=x[3]*PRECO[x[2]]; h+='<tr><td><span class="cat-code">'+n+'</span></td><td>'+esc(x[1])+'</td><td>'+esc(x[4])+'</td><td class="r">'+x[3]+'</td><td class="r">'+fmt(PRECO[x[2]])+'</td><td class="r">'+fmt(m)+'</td><td class="r"><b>'+fmt(m*MESES)+'</b></td></tr>';});
    const R=n===1?REF1:REF2; h+='<tr class="tot"><td></td><td>Total do Lote '+n+'</td><td></td><td class="r">'+(n===1?13:42)+'</td><td></td><td class="r">'+fmt(R/MESES)+'</td><td class="r">'+fmt(R)+'</td></tr>';
  });
  h+='<tr class="tot"><td></td><td>Lote virtual (1 + 2)</td><td></td><td class="r">55</td><td></td><td class="r">'+fmt(REF/MESES)+'</td><td class="r">'+fmt(REF)+'</td></tr></tbody>';
  $('plEst').innerHTML=h;
}

/* ---------------- compra da frota (exemplo) ---------------- */
const FR=[
 {k:'sedan',l:'Sedan com o pacote da ET',h:'preço de compra por unidade (exemplo)',def:140000},
 {k:'hatch',l:'Hatch com o pacote da ET',h:'preço de compra por unidade (exemplo)',def:110000},
 {k:'picape',l:'Picape 4x4 diesel, cabine dupla',h:'preço de compra por unidade (exemplo)',def:280000}
];
const frState={}; FR.forEach(f=>frState[f.k]=f.def);
const frLote=n=>FROTA.filter(x=>x[0]===n).reduce((s,x)=>s+x[3]*(frState[x[2]]||0),0);
const frTotal=()=>frLote(1)+frLote(2);
function buildFr(){
  try{const v=JSON.parse(localStorage.getItem(E.lsPrefix+'fr')||'null'); if(v) FR.forEach(f=>{if(typeof v[f.k]==='number') frState[f.k]=v[f.k];});}catch(e){}
  $('frForm').innerHTML=FR.map(f=>'<div class="field"><label for="fr-'+f.k+'">'+f.l+'</label><small>'+f.h+'</small><div class="inp"><span class="u">R$</span><input id="fr-'+f.k+'" inputmode="decimal" data-fr="'+f.k+'"></div></div>').join('');
  $('frForm').addEventListener('input',e=>{const i=e.target.closest('[data-fr]'); if(!i)return; frState[i.dataset.fr]=parseNum(i.value); try{localStorage.setItem(E.lsPrefix+'fr',JSON.stringify(frState))}catch(err){} renderFr(); renderRiscos(calc(state.sim)); renderOverview();});
  $('frForm').addEventListener('change',()=>renderFr(true));
}
function renderFr(force){
  document.querySelectorAll('#frForm [data-fr]').forEach(inp=>{ if(document.activeElement===inp && !force) return; inp.value=NUM.format(Math.round(frState[inp.dataset.fr]||0)); });
  $('frOut').innerHTML='<tr><td>Lote 1 · 10 sedans e 3 picapes 0 km</td><td class="r">13</td><td class="r">'+fmt0(frLote(1))+'</td></tr><tr><td>Lote 2 · 11 sedans, 25 hatches e 6 picapes</td><td class="r">42</td><td class="r">'+fmt0(frLote(2))+'</td></tr><tr><td><b>Os 2 lotes</b></td><td class="r"><b>55</b></td><td class="r"><b>'+fmt0(frTotal())+'</b></td></tr>';
}

/* ---------------- simulador por lote e riscos ---------------- */
function renderLotes(r){
  const rows=LOTES.map(L=>{const p=calcLote(L,state.sim), ok=isFinite(p); return '<tr><td>'+L.n+' <span class="hint">· '+L.q+'</span></td><td class="r">'+fmt0(L.ref)+'</td><td class="r"><b>'+(ok?fmt0(p):'—')+'</b></td><td class="r"'+(ok&&p>L.ref?' style="color:var(--bad)"':'')+'>'+(ok?(p<L.ref?pct(1-p/L.ref):'acima da estimativa'):'—')+'</td></tr>';});
  rows.push('<tr><td><b>Lote virtual (1 + 2)</b></td><td class="r">'+fmt0(REF)+'</td><td class="r"><b>'+(isFinite(r.Pmin)?fmt0(r.Pmin):'—')+'</b></td><td class="r">'+(isFinite(r.Pmin)?(r.Pmin<REF?pct(1-r.Pmin/REF):'acima da estimativa'):'—')+'</td></tr>');
  $('simLotes').innerHTML=rows.join('');
}
function renderRiscos(r){
  const L=r.L>0?r.L:REF;
  const T=[
   ['Faturamento mensal médio',fmt0(L/MESES),'proposta ÷ 36 meses, frota completa','t4'],
   ['Compra da frota (exemplo)',fmt0(frTotal()),'55 veículos · preços do quadro abaixo','t3'],
   ['Capital de giro estimado',fmt0(giro(r)),'custos de '+NUM.format(state.sim.ciclo)+' dias','t5'],
   ['Retenção de 1% no fim',fmt0(L*0.01),'devolvida após o contrato · Minuta 20','t1']
  ];
  $('riskTiles').innerHTML=T.map(t=>'<div class="tile '+t[3]+'"><span class="k">'+t[0]+'</span><span class="v">'+t[1]+'</span><span class="s">'+t[2]+'</span></div>').join('');
}

const E={
  slug:'lic-7004688324-transpetro', docPrefix:'editais/lic-7004688324-transpetro/', lsPrefix:'tp7004-',
  ref:REF, teto:REF, garantiaPct:0, giro:'mensal',
  sessao:[2026,12,1], sessaoNome:'Abertura', chip:'≈ R$ 11,0 mi (estimado) · 2 lotes · 36 meses',
  deadlines:[
   {d:[2026,11,18],lbl:'18/11',t:'Pedido justificado de visita técnica (opcional)',s:'3 dias úteis antes do prazo de dúvidas, contagem nossa · Edital 2.4.1'},
   {d:[2026,11,24],lbl:'24/11 · 15h',t:'Último prazo para dúvidas na Sala de Colaboração',s:'No texto da mensagem, sem anexos · Edital p. 2'},
   {d:[2026,11,24],lbl:'24/11',t:'Último dia para impugnar o Edital',s:'5 dias úteis antes da abertura, contagem nossa · Edital 10.1 · Sala de Colaboração'},
   {d:[2026,12,1],lbl:'01/12 · 12h',t:'Abertura das propostas no Petronect',s:'PPU, DFP e preço no portal até a "Data Fim" · Edital p. 1, 3.2.8'}
  ],
  prazoQuestionar:IMP,
  sim:{
    tetoNome:'valor estimado (orçamento sigiloso)', refNome:'estimativa', artExeq:'Edital 5.2 a 5.2.5', artAcima:'Edital 5.1 e',
    tetoLabel:()=>'Estimativa<br>R$ 11,0 mi',
    minSub:r=>'≈ '+fmt0(r.Pmin/MESES)+' por mês, 2 lotes',
    margSub:r=>'≈ '+fmt0(r.margL*r.L)+' em 36 meses',
    descValue:(r,ok,ref)=>ok?(r.Pmin<ref?pct(1-r.Pmin/ref):'sem desconto'):'—',
    passo:L=>L*0.01,
    extraAlerts:r=>{
      const A=[];
      if(isFinite(r.Pmin)&&r.Pmin<0.7*REF) A.push(['warn','Sua proposta mínima fica abaixo de 70% da estimativa. Na Transpetro, abaixo de 70% do orçamento já é indício de inexequibilidade e abre diligência de 1 dia útil (Edital 5.2, 5.2.4).']);
      if(r.L>0&&r.L<0.7*REF) A.push(['warn','A proposta testada está abaixo de 70% da estimativa: prepare a prova de exequibilidade (Edital 5.2.3).']);
      A.push(['warn','A referência é estimativa nossa. O orçamento real da Transpetro é sigiloso; acima dele, após a negociação, a proposta é desclassificada (Edital 5.1 e).']);
      LOTES.forEach(L=>{const p=calcLote(L,state.sim); if(isFinite(p)&&p>L.ref) A.push(['bad','No '+L.n+', a proposta mínima passa da estimativa do lote. Revise os custos desse lote.']);});
      return A;
    }
  },
  kpis(x){ const {s,r,exemplo,ok}=x; const dImp=daysUntil(...IMP); return [
   {href:'planilha',k:'Valor estimado (sigiloso)',v:'R$ 11,0 mi',c:'gold',s:'estimativa nossa · Lote 1 R$ 2,93 mi · Lote 2 R$ 8,03 mi'},
   {href:'simulador',k:'Desconto máximo viável',v:ok?pct(Math.max(0,1-r.Pmin/REF)):'—',c:'blue',s:ok?'proposta mínima '+fmtMi(r.Pmin)+(exemplo?' (custos de exemplo)':''):'revise o simulador'},
   {href:'conflitos',k:'Conflitos graves',v:String(altas()),c:'red',s:'dúvidas e impugnação até 24/11 ('+leftTxt(dImp)+')'},
   {href:'matriz',k:'Requisitos atendidos',v:(s.c.atende+s.c.ajuste)+' de '+s.all.length,c:'green',s:s.c.verificar?s.c.verificar+' a verificar na matriz':(s.blockers.length?s.blockers.length+' bloqueio(s)':'todos avaliados')}
  ]; },
  precoTxt:r=>'Proposta mínima de '+fmt0(r.Pmin)+' nos 2 lotes, '+pct(Math.max(0,1-r.Pmin/REF))+' abaixo da nossa estimativa (o orçamento real é sigiloso).'+(r.Pmin<0.7*REF?' Abaixo de 70%: exige prova de exequibilidade.':''),
  riscosTxt:d=>'Faltam PPU, minuta do Lote 2 e DFP do Lote 1; orçamento sigiloso; rodagem alta e frota sofisticada. Dúvidas até 24/11 ('+leftTxt(d)+').',
  prepTxt:(r,L)=>'Proposta completa no Petronect antes de 01/12, 12h. Caixa: frota de cerca de '+fmt0(frTotal())+' (exemplo) e '+fmt0(giro(r))+' de capital de giro.',
  passoBloqueio:'Avaliar garantia corporativa da empresa-mãe, atestado de empresa do mesmo grupo ou disputar só o Lote 1 antes de desistir.',
  exeqStep:'Preparar a prova de exequibilidade (cotações de veículos e memória de cálculo) para responder em 1 dia útil (Edital 5.2.3–5.2.4).',
  questionarStep:a=>'Mandar na Sala de Colaboração, até 24/11 às 15h, as dúvidas dos '+a+' pontos de alta gravidade.',
  stepsGo:['Baixar no Petronect a PPU, a minuta do Lote 2 e o DFP do Lote 1.','Anexar PPU e DFP, digitar o preço na aba Itens e conferir o status "Cotação Apresentada" antes de 01/12, 12h.'],
  init(){ renderComposition(); renderPlanilha(); buildFr(); renderFr(true); },
  onSim(r){ renderRiscos(r); renderLotes(r); }
};
