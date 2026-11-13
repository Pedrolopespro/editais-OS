// Gera a impugnação, o pedido de esclarecimento e a pré-análise do Pregão 319/2026 em .docx
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType,
  ShadingType, BorderStyle, Header, Footer, PageNumber, LevelFormat, HeadingLevel, PageBreak
} = require("docx");

const OUT = process.argv[2];
const NS = JSON.parse(fs.readFileSync(path.join(__dirname, "noshow.json"), "utf8"));
const FONT = "Arial";
const W = 9070; // largura útil A4 com margens de 2,5 cm
const brl = n => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// texto com **negrito** e [CAMPO] destacado
function runs(text, base = {}) {
  const out = [];
  text.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/).forEach(part => {
    if (!part) return;
    if (part.startsWith("**")) out.push(new TextRun({ text: part.slice(2, -2), bold: true, font: FONT, ...base }));
    else if (part.startsWith("[") && part.endsWith("]")) out.push(new TextRun({ text: part, bold: true, font: FONT, highlight: "yellow", ...base }));
    else out.push(new TextRun({ text: part, font: FONT, ...base }));
  });
  return out;
}
const P = (text, o = {}) => new Paragraph({ children: runs(text, o.run || {}), alignment: o.align || AlignmentType.JUSTIFIED, spacing: { after: o.after ?? 140, before: o.before ?? 0, line: 300 }, indent: o.indent, keepNext: o.keepNext });
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, font: FONT })] });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: FONT })] });
const LI = (text, ref = "bullets", level = 0) => new Paragraph({ numbering: { reference: ref, level }, children: runs(text), alignment: AlignmentType.LEFT, spacing: { after: 80, line: 290 } });
const NUM = (text, ref) => LI(text, ref);
const SP = () => new Paragraph({ children: [], spacing: { after: 60 } });

const border = { style: BorderStyle.SINGLE, size: 4, color: "C9CCD3" };
const borders = { top: border, bottom: border, left: border, right: border };
function table(widths, rows, opts = {}) {
  const sum = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: sum, type: WidthType.DXA }, columnWidths: widths,
    rows: rows.map((r, ri) => new TableRow({
      tableHeader: ri === 0,
      children: r.map((c, ci) => new TableCell({
        width: { size: widths[ci], type: WidthType.DXA }, borders,
        shading: ri === 0 ? { type: ShadingType.CLEAR, fill: "1F2430", color: "auto" } : (opts.total && ri === rows.length - 1 ? { type: ShadingType.CLEAR, fill: "ECEEF2", color: "auto" } : undefined),
        margins: { top: 70, bottom: 70, left: 100, right: 100 },
        children: [new Paragraph({ alignment: (opts.right || []).includes(ci) && ri > 0 ? AlignmentType.RIGHT : AlignmentType.LEFT, spacing: { after: 0, line: 260 },
          children: runs(String(c), { size: ri === 0 ? 18 : 19, color: ri === 0 ? "FFFFFF" : "1A1A1A", bold: ri === 0 || (opts.total && ri === rows.length - 1) }) })]
      }))
    }))
  });
}

const numbering = { config: [
  { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
  ...["n1", "n2", "n3", "n4", "n5", "n6"].map(r => ({ reference: r, levels: [{ level: 0, format: LevelFormat.LOWER_LETTER, text: "%1)", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] })),
  { reference: "passos", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] }
] };
const styles = {
  default: { document: { run: { font: FONT, size: 22 } } },
  paragraphStyles: [
    { id: "Title", name: "Title", basedOn: "Normal", run: { font: FONT, size: 32, bold: true, color: "111111" }, paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 120, after: 200 } } },
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 26, bold: true, color: "1F2430" }, paragraph: { spacing: { before: 300, after: 140 }, keepNext: true, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 23, bold: true, color: "1F2430" }, paragraph: { spacing: { before: 220, after: 100 }, keepNext: true, outlineLevel: 1 } }
  ]
};
function doc(headerText, children) {
  return new Document({
    creator: "Painel de decisão · Pregão 319/2026", title: headerText, styles, numbering,
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1418, bottom: 1418, left: 1418, right: 1418 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: headerText, font: FONT, size: 16, color: "777777" })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ["Página ", PageNumber.CURRENT, " de ", PageNumber.TOTAL_PAGES], font: FONT, size: 16, color: "777777" })] })] }) },
      children
    }]
  });
}
const enderecamento = [
  P("À Senhora Pregoeira", { align: AlignmentType.LEFT, after: 0, run: { bold: true } }),
  P("Secretaria de Administração da Casa Civil da Presidência da República", { align: AlignmentType.LEFT, after: 0 }),
  P("Pregão Eletrônico nº 319/2026-SA · Processo Administrativo nº 00087.000909/2026-01", { align: AlignmentType.LEFT, after: 0 }),
  P("Por e-mail: cpl@presidencia.gov.br (item 12.3 do Edital)", { align: AlignmentType.LEFT, after: 280 })
];
const qualificacao = acao => P("**[RAZÃO SOCIAL DA EMPRESA]**, pessoa jurídica de direito privado inscrita no CNPJ sob o nº [00.000.000/0000-00], com sede em [ENDEREÇO COMPLETO, CIDADE/UF, CEP], endereço eletrônico [E-MAIL PARA RESPOSTA], neste ato representada por [NOME DO REPRESENTANTE LEGAL], [CARGO], inscrito(a) no CPF sob o nº [000.000.000-00], vem, tempestivamente, " + acao);
const assinatura = [
  SP(),
  P("Nestes termos, pede deferimento.", { align: AlignmentType.LEFT }),
  P("[CIDADE/UF], [DIA] de novembro de 2026.", { align: AlignmentType.LEFT, after: 600 }),
  P("______________________________________________", { align: AlignmentType.CENTER, after: 0 }),
  P("[NOME DO REPRESENTANTE LEGAL]", { align: AlignmentType.CENTER, after: 0, run: { bold: true } }),
  P("[CARGO] · [RAZÃO SOCIAL DA EMPRESA] · CNPJ [00.000.000/0000-00]", { align: AlignmentType.CENTER })
];

/* =============================== 1. IMPUGNAÇÃO =============================== */
const nsRows = [["Cód.", "Categoria", "Diária 10 h", "Teto 70%", "Planilha", "Excesso un.", "Qtde", "Excesso no ano"]]
  .concat(NS.map(r => [r.cod, r.nome, brl(r.d10), brl(r.teto), brl(r.v), brl(r.ex), String(r.q), brl(r.exAno)]))
  .concat([["", "Total", "", "", "", "", String(NS.reduce((a, r) => a + r.q, 0)), brl(NS.reduce((a, r) => a + r.exAno, 0))]]);

const impugnacao = doc("Impugnação ao Edital · Pregão Eletrônico nº 319/2026", [
  ...enderecamento,
  new Paragraph({ style: "Title", children: [new TextRun({ text: "IMPUGNAÇÃO AO EDITAL", font: FONT })] }),
  qualificacao("com fundamento no art. 164 da Lei nº 14.133, de 1º de abril de 2021, e no item 12.1 do Edital, apresentar **IMPUGNAÇÃO** ao Edital do Pregão Eletrônico nº 319/2026, pelos fatos e fundamentos a seguir expostos."),

  H1("I. Da tempestividade"),
  P("A sessão pública está marcada para 23/11/2026, às 9h30 (horário de Brasília). Nos termos do item 12.1 do Edital e do art. 164 da Lei nº 14.133/2021, a impugnação pode ser apresentada até 3 (três) dias úteis antes da data de abertura do certame. Considerando o feriado nacional de 20 de novembro (Lei nº 14.759/2023), o terceiro dia útil anterior à sessão é 17/11/2026. A presente impugnação, protocolada até essa data, é tempestiva."),

  H1("II. Dos fatos e fundamentos"),
  H2("1. Prazo para apresentação do seguro-garantia"),
  P("**Dispositivos:** Edital, itens 9.2 a 9.4; Termo de Referência, itens 4.8 a 4.8.2."),
  P("O item 9.2 do Edital concede ao adjudicatário 5 (cinco) dias úteis, contados da convocação, para assinar o contrato. O item 4.8 do Termo de Referência, por sua vez, exige que a apólice de seguro-garantia seja apresentada, no máximo, até a data da assinatura, e o item 4.8.2 prevê a preclusão do direito de escolha dessa modalidade caso a apólice não seja entregue antes da assinatura."),
  P("O art. 96, § 3º, da Lei nº 14.133/2021 determina que o edital fixe prazo mínimo de 1 (um) mês, contado da data de homologação e anterior à assinatura do contrato, para a prestação da garantia quando o contratado optar pelo seguro-garantia. O instrumento convocatório não assegura esse prazo e, ao combinar a convocação em 5 dias úteis com a preclusão do item 4.8.2, pode suprimir na prática a opção legal pelo seguro-garantia."),
  P("**Pedido:** retificar os itens 9.2 a 9.4 do Edital e 4.8 a 4.8.2 do Termo de Referência para assegurar o prazo mínimo de 1 (um) mês, contado da homologação e anterior à assinatura, para apresentação do seguro-garantia, afastando a preclusão quando a convocação ocorrer antes do decurso desse prazo."),

  H2("2. Percentual de acréscimo para consórcios não definido"),
  P("**Dispositivos:** Edital, item 8.4.1; Termo de Referência, item 8.40.1.1."),
  P("Os dispositivos preveem, para consórcios não formados integralmente por microempresas e empresas de pequeno porte, um acréscimo \"de entre 10% a 30%\" sobre o valor exigido dos licitantes individuais na habilitação econômico-financeira, sem indicar o percentual efetivamente aplicável."),
  P("A faixa prevista no art. 15 da Lei nº 14.133/2021 orienta a Administração na fixação da exigência, mas não dispensa o edital de defini-la. Sem o percentual exato, os interessados em participar em consórcio não conseguem dimensionar o patrimônio ou o capital a comprovar, e o julgamento da habilitação deixa de ser objetivo (art. 5º da Lei nº 14.133/2021)."),
  P("**Pedido:** fixar o percentual exato de acréscimo e sua base de cálculo, ou motivar expressamente a dispensa, explicitando como será aferida a capacidade econômico-financeira do consórcio."),

  H2("3. Valores de no show e de hora extra acima dos limites do próprio Termo de Referência"),
  P("**Dispositivos:** Termo de Referência, itens 5.11.2 e 5.11.3; Apêndice IV (Planilha de Custo, p. 42 do Termo de Referência); Edital, itens 5.11 e 7.7.5."),
  P("O item 5.11.3 do Termo de Referência limita o valor do no show a 70% (setenta por cento) da diária de 10 (dez) horas, e o item 5.11.2 limita a hora extra do veículo a 20% (vinte por cento) da diária correspondente. Contudo, a planilha de referência do Apêndice IV, cujos preços unitários funcionam como máximos aceitáveis no julgamento (Edital, item 5.11), contraria essas regras:"),
  LI("em **19 das 22 categorias**, o valor de no show excede o teto de 70% da diária de 10 horas, somando excesso de " + brl(NS.reduce((a, r) => a + r.exAno, 0)) + " no ano (Anexo I);"),
  LI("na categoria **A (Executivo Blindado II)**, faixa de 15 a 29 dias, a hora extra está fixada em R$ 298,00, acima do limite de R$ 288,00 (20% da diária de R$ 1.440,00)."),
  P("A coexistência de regra limitadora e de preços máximos que a desrespeitam gera insegurança na formação das propostas, permite cotações em desacordo com o próprio Termo de Referência e compromete a isonomia e o julgamento objetivo (art. 5º da Lei nº 14.133/2021), além de afetar a aplicação do item 7.7.5 do Edital (desclassificação por descumprimento dos critérios de aceitabilidade)."),
  P("**Pedido:** corrigir o Apêndice IV para adequar os valores de no show ao teto de 70% da diária de 10 horas e a hora extra da categoria A ao limite de 20%, republicando a planilha e esclarecendo qual parâmetro prevalece no julgamento."),

  H2("4. Contradição entre as regras de subcontratação e de sublocação"),
  P("**Dispositivos:** Termo de Referência, itens 4.2 a 4.5 e 5.9.2.1.2 a 5.9.2.1.3."),
  P("O item 4.2 permite a subcontratação parcial apenas nas categorias A a J e M a V, veda a subcontratação das categorias Executivo II (K) e Sedan (L) e exige autorização prévia (item 4.4). Já os itens 5.9.2.1.2 e 5.9.2.1.3 admitem a sublocação de veículos para a prestação dos serviços, com redação que não delimita categorias. O instrumento não define se a sublocação do bem (veículo de terceiro conduzido e gerido pela própria contratada) se confunde com a subcontratação de parcela do serviço, ponto decisivo para a formação de preços e para a estrutura operacional exigida."),
  P("**Pedido:** harmonizar os dispositivos, definindo o conceito de subcontratação e de sublocação adotado, as categorias admitidas em cada hipótese e a necessidade, ou não, de autorização prévia, com base no art. 122 da Lei nº 14.133/2021."),

  H2("5. Alternativa do patrimônio líquido e índices contábeis"),
  P("**Dispositivos:** Termo de Referência, itens 8.25 a 8.27."),
  P("O item 8.26 admite a comprovação de patrimônio líquido mínimo de 10% do valor estimado (R$ 2.083.570,67) quando algum índice for igual ou inferior a 1. O item 8.27, porém, determina que os indicadores sejam atingidos em cada um dos dois últimos exercícios. Não fica claro se a alternativa do patrimônio líquido supre o resultado insuficiente de um ou de ambos os exercícios, nem qual exercício servirá de base para o patrimônio líquido."),
  P("**Pedido:** esclarecer e harmonizar os itens 8.26 e 8.27, indicando expressamente que a comprovação do patrimônio líquido mínimo supre o índice insuficiente e qual exercício e base contábil serão considerados (art. 69 da Lei nº 14.133/2021)."),

  H1("III. Dos pedidos"),
  P("Diante do exposto, requer:"),
  NUM("o recebimento e o processamento desta impugnação, por tempestiva;", "n1"),
  NUM("o acolhimento integral dos pontos 1 a 5, com a retificação do Edital e do Termo de Referência nos termos indicados;", "n1"),
  NUM("a republicação do Edital, com reabertura do prazo de apresentação das propostas, caso as alterações afetem a formulação das propostas (art. 55, § 1º, da Lei nº 14.133/2021, e item 12.6 do Edital);", "n1"),
  NUM("a divulgação da resposta no prazo previsto no art. 164, parágrafo único, da Lei nº 14.133/2021 e no item 12.2 do Edital, com envio ao endereço eletrônico indicado na qualificação.", "n1"),
  ...assinatura,

  new Paragraph({ children: [new PageBreak()] }),
  H1("Anexo I · No show acima do teto de 70% da diária de 10 horas"),
  P("Conferência aritmética dos valores do Apêndice IV do Termo de Referência (p. 42). Teto = 70% × diária de 10 horas da faixa de até 6 dias (TR, item 5.11.3).", { run: { size: 20 } }),
  table([620, 2650, 1050, 950, 950, 1000, 600, 1250], nsRows, { right: [2, 3, 4, 5, 6, 7], total: true }),
  SP(),
  H1("Anexo II · Hora extra acima do limite de 20%"),
  table([2300, 2000, 1500, 1500, 1770], [["Categoria", "Faixa", "Diária 24 h", "Limite 20%", "Hora extra na planilha"], ["A · Executivo Blindado II", "15 a 29 dias", "R$ 1.440,00", "R$ 288,00", "R$ 298,00"]], { right: [2, 3, 4] })
]);

/* =============================== 2. ESCLARECIMENTO =============================== */
const perguntas = [
  ["Adicional de 60% do agente de missão", "TR 5.8 · Apêndice IV", "O TR indica adicional de 60% sobre a diária do motorista (R$ 1.380,00 + 60% de R$ 380,00 = R$ 1.608,00), enquanto a planilha adota R$ 2.208,00 (60% sobre a diária do próprio agente).", "Qual base de cálculo do adicional deve ser adotada na proposta? Aplica-se o adicional no último dia da missão?"],
  ["Momento de entrega das declarações e termos", "Edital 6.23.4.1 · TR 5.9.1, 5.9.2, 5.9.2.1.2 · Apêndices V e VII", "As declarações de atendimento em 4 e 6 horas e a de condições de sublocar não têm momento expresso, assim como os Termos de Confidencialidade e de Ciência e Concordância.", "Esses documentos devem acompanhar a proposta inicial, a proposta ajustada ao último lance ou ser entregues apenas na assinatura do contrato?"],
  ["Pagamento pelo menor cenário", "ETP, seção 4 · TR 5.11 e 17.2", "O ETP menciona a comparação de até três cenários para pagar o menor valor de diárias e horas extras e afirma que os parâmetros não poderão ser questionados pela contratada.", "O mecanismo integra a contratação? Quais são as fórmulas, os cenários e um exemplo de cálculo? Fica preservado o direito de contestar erros de medição?"],
  ["Tração da categoria J", "Apêndice II", "O título indica Caminhonete 4x2, mas a descrição da especificação menciona tração 4x4.", "Qual especificação será aceita para a categoria J?"],
  ["Idade e quilometragem", "TR 5.9.2.1.4 a 5.9.2.1.6 · tabela de infrações, item 12", "O requisito fala em no máximo 5 anos ou 100.000 km; a tabela de infrações menciona menos de 5 anos e abaixo de 100.000 km.", "Veículo com exatamente 5 anos ou 100.000 km é aceito? As exceções de 6 e 10 anos alteram o limite de quilometragem?"],
  ["Comprovação da blindagem", "TR 5.9.2.1.7 e 11.18 · Apêndice II", "O item 5.9.2.1.7 admite o CRLV ou o Termo de Responsabilidade de Blindagem; o item 11.18 pode ser lido como exigência dos dois.", "Basta um dos documentos ou ambos serão exigidos? Aceitam-se documentos eletrônicos?"],
  ["Jornada e início das horas extras", "TR 5.7, 5.17, 11.10 e 12.25.1.2", "A jornada de 10 horas menciona 2 horas de refeição descontadas.", "As 10 horas incluem as 2 horas de refeição (8 horas efetivas) ou são 10 horas efetivas? A partir de qual marco é paga a hora extra? Como se aplica o revezamento em trajetos longos?"],
  ["Fórmula do Instrumento de Medição de Resultado", "TR 7.1 a 7.5 · Apêndice I", "Y = veículos não atendidos ÷ Σ veículos por dia.", "O numerador é contado por veículo e por dia, na mesma unidade do denominador? Podem enviar exemplo de missão de vários dias, com atraso parcial, demonstrando que não há desconto em duplicidade?"],
  ["Combustível e tributos de 9,45%", "TR 5.3, 7.34 e 12.22.2 · Apêndice IV", "Os preços de combustível incluem 9,45% de tributos retidos.", "Como a taxa se aplica a cada regime tributário, inclusive ao Simples Nacional? Quais células da planilha devem permanecer inalteradas?"],
  ["Prazos de atendimento de 4 e 6 horas", "TR 5.9 a 5.9.2 · Apêndice I", "Os prazos valem para capitais/regiões metropolitanas e interior dos quatro estados.", "Qual o marco inicial da contagem? Há limite de demanda simultânea por acionamento? Como serão tratadas impossibilidades logísticas comprovadas?"],
  ["Frota própria na assinatura", "TR 5.9.2.1 e 5.9.2.1.1", "Exige-se a comprovação de 6 veículos Executivo II ou SUV II e 10 Sedan em nome da adjudicatária, admitido o arrendamento mercantil.", "Em caso de consórcio, os veículos podem estar em nome de qualquer consorciada? Aceita-se CRLV digital? Outros títulos de disponibilidade (locação de longo prazo) são admitidos?"],
  ["Planilha editável e minuta do contrato", "Edital 13.2.2 e 13.2.3 · Anexos II e III", "A planilha .xlsx e a minuta do contrato são citadas como anexos.", "Podem informar os links oficiais da planilha editável e da minuta do contrato vigentes para esta licitação?"]
];
const esclarecimento = doc("Pedido de esclarecimento · Pregão Eletrônico nº 319/2026", [
  ...enderecamento,
  new Paragraph({ style: "Title", children: [new TextRun({ text: "PEDIDO DE ESCLARECIMENTO", font: FONT })] }),
  qualificacao("com fundamento no art. 164 da Lei nº 14.133/2021 e nos itens 12.1 a 12.3 do Edital, apresentar **PEDIDO DE ESCLARECIMENTO** sobre os pontos abaixo, cuja resposta é necessária para a correta formulação da proposta."),
  P("O pedido é tempestivo: a sessão pública está marcada para 23/11/2026 e o prazo para esclarecimentos se encerra em 17/11/2026, terceiro dia útil anterior, considerado o feriado nacional de 20 de novembro (Lei nº 14.759/2023)."),
  H1("Questionamentos"),
  ...perguntas.flatMap((q, i) => [
    H2((i + 1) + ". " + q[0]),
    P("**Dispositivos:** " + q[1], { after: 80 }),
    P("**Contexto:** " + q[2], { after: 80 }),
    P("**Pergunta:** " + q[3])
  ]),
  H1("Requerimento"),
  P("Requer que as respostas sejam divulgadas no prazo do art. 164, parágrafo único, da Lei nº 14.133/2021 e do item 12.2 do Edital, com envio ao endereço eletrônico indicado na qualificação. Caso alguma resposta altere a formulação das propostas, requer a republicação do Edital e a reabertura dos prazos (art. 55, § 1º, da Lei nº 14.133/2021)."),
  ...assinatura
]);

/* =============================== 3. PRÉ-ANÁLISE =============================== */
const prioridades = [
  ["Ponto", "Instrumento", "Força do argumento", "Impacto se não questionar"],
  ["1. Prazo do seguro-garantia", "Impugnação", "Alta: texto legal expresso", "Perder a opção pelo seguro-garantia na assinatura"],
  ["2. Percentual para consórcio", "Impugnação", "Alta: omissão objetiva", "Não saber quanto o consórcio precisa comprovar"],
  ["3. No show e hora extra da planilha", "Impugnação", "Alta: conferência aritmética", "Cotar valores que o próprio TR proíbe"],
  ["4. Subcontratação × sublocação", "Impugnação", "Média-alta: contradição interna", "Insegurança ao usar veículos de terceiros em K e L"],
  ["5. Patrimônio líquido × índices", "Impugnação", "Média-alta: regras contraditórias", "Inabilitação mesmo com patrimônio suficiente"],
  ["6 a 17. Dúvidas técnicas", "Esclarecimento", "Pergunta objetiva", "Preço ou documentação mal dimensionados"]
];
const preanalise = doc("Pré-análise de impugnações e esclarecimentos · Pregão Eletrônico nº 319/2026", [
  new Paragraph({ style: "Title", children: [new TextRun({ text: "Pré-análise de impugnações e esclarecimentos", font: FONT })] }),
  P("Pregão Eletrônico nº 319/2026-SA · Secretaria de Administração da Casa Civil · UASG 110001 · Processo 00087.000909/2026-01 · Atualizada em 13/11/2026", { align: AlignmentType.CENTER, run: { size: 19, color: "555555" }, after: 280 }),

  H1("1. Recomendação"),
  P("Protocolar **até 17/11/2026** (de preferência até 16/11) dois documentos separados pelo e-mail cpl@presidencia.gov.br:"),
  LI("**Impugnação ao Edital** com 5 pontos que afetam preço, garantia e habilitação;"),
  LI("**Pedido de esclarecimento** com 12 perguntas técnicas."),
  P("Separar os documentos facilita respostas objetivas e evita que dúvidas simples fiquem presas à análise da impugnação. O protocolo não suspende o certame (Edital, item 12.4): a preparação da proposta e do kit de documentos deve continuar em paralelo."),

  H1("2. O que mudou desde a análise de 09/11/2026"),
  LI("**No show:** a conferência completa do Apêndice IV mostrou excesso em **19 das 22 categorias** (antes eram apontadas 3), somando " + brl(NS.reduce((a, r) => a + r.exAno, 0)) + " no ano."),
  LI("**Hora extra:** a categoria A, faixa de 15 a 29 dias, está R$ 10,00 acima do limite de 20% da diária."),
  LI("**Subcontratação e patrimônio líquido** passaram para a impugnação, por serem contradições entre dispositivos e não apenas dúvidas."),

  H1("3. Quadro de prioridades"),
  table([2550, 1450, 2350, 2720], prioridades),
  P("Força do argumento é uma avaliação qualitativa da clareza do apontamento, não uma previsão do resultado. A decisão cabe à Administração.", { run: { size: 18, color: "555555" }, before: 100 }),

  H1("4. Análise ponto a ponto"),
  H2("1. Prazo do seguro-garantia"),
  P("Edital 9.2 a 9.4 × TR 4.8 a 4.8.2. A convocação em 5 dias úteis, somada à preclusão do seguro-garantia, contraria o prazo mínimo de 1 mês do art. 96, § 3º, da Lei nº 14.133/2021. É o ponto de base legal mais direta."),
  H2("2. Percentual de acréscimo para consórcios"),
  P("Edital 8.4.1 × TR 8.40.1.1. A faixa de 10% a 30% foi copiada sem escolha do percentual. Relevante se a empresa pretende disputar em consórcio para somar atestados ou capacidade financeira."),
  H2("3. No show e hora extra da planilha"),
  P("TR 5.11.2 e 5.11.3 × Apêndice IV. Os preços do Apêndice IV são máximos aceitáveis, mas desrespeitam os limites do próprio TR. Na proposta, cotar no máximo o teto de 70% da diária de 10 horas, independentemente da resposta. A Google Planilha do painel já calcula esse teto."),
  H2("4. Subcontratação × sublocação"),
  P("TR 4.2 a 4.5 × 5.9.2.1.2 e 5.9.2.1.3. Decisivo para quem pretende atender Executivo II e Sedan com veículos de terceiros. A resposta muda a estrutura de custos e a necessidade de frota própria além dos 16 veículos."),
  H2("5. Patrimônio líquido × índices"),
  P("TR 8.26 × 8.27. Só é crítico se algum índice (LG, LC ou SG) da empresa for igual ou inferior a 1 em algum dos dois últimos exercícios. Se os índices estiverem acima de 1 nos dois, este ponto pode sair da impugnação."),
  H2("6 a 17. Esclarecimentos"),
  P("Adicional do agente de missão, momento das declarações, pagamento pelo menor cenário, tração da categoria J, idade e quilometragem, blindagem, jornada e horas extras, fórmula do IMR, tributos do combustível, prazos de 4 e 6 horas, frota própria e links da planilha e da minuta. Todos afetam preço ou documentação, mas não exigem alteração do Edital para a disputa acontecer."),

  H1("5. Como protocolar, passo a passo"),
  NUM("**Revise e complete os campos destacados em amarelo** nos dois documentos: razão social, CNPJ, endereço, e-mail para resposta, nome, cargo e CPF do representante legal, cidade e data.", "passos"),
  NUM("**Ajuste o conteúdo à estratégia da empresa.** Retire pontos que não interessam (por exemplo, o item 5 se os índices contábeis estiverem acima de 1, ou o item 2 se a empresa não pretende disputar em consórcio).", "passos"),
  NUM("**Peça revisão do jurídico** antes de assinar. Estes documentos são minutas técnicas, não parecer jurídico.", "passos"),
  NUM("**Gere o PDF e assine** com certificado digital ICP-Brasil ou pelo assinador gov.br, pelo representante legal com poderes. Anexe o contrato social ou a procuração que comprove os poderes.", "passos"),
  NUM("**Envie dois e-mails separados** para cpl@presidencia.gov.br, um com a impugnação e outro com o pedido de esclarecimento. Assuntos sugeridos: \"Impugnação ao Edital · Pregão Eletrônico nº 319/2026 · [RAZÃO SOCIAL]\" e \"Pedido de esclarecimento · Pregão Eletrônico nº 319/2026 · [RAZÃO SOCIAL]\". No corpo, informe o número do pregão e o nome do responsável.", "passos"),
  NUM("**Respeite o prazo:** até 17/11/2026, terceiro dia útil antes da sessão. O Edital não fixa horário-limite; envie dentro do expediente e evite deixar para o fim do dia.", "passos"),
  NUM("**Guarde a prova do envio:** salve o e-mail enviado (com data e hora) e peça confirmação de recebimento.", "passos"),
  NUM("**Acompanhe as respostas:** a Administração deve responder em até 3 dias úteis, limitado ao último dia útil antes da sessão, ou seja, até 19/11/2026 (Edital, item 12.2). Consulte o Compras.gov.br, o PNCP e a página de licitações da Casa Civil.", "passos"),
  NUM("**Continue preparando a proposta:** o protocolo não suspende os prazos (item 12.4). Se a impugnação for acolhida com alteração que afete as propostas, será publicada nova data (item 12.6).", "passos"),

  H1("6. Cuidados"),
  LI("Antes de enviar, confira no PNCP se já houve retificação ou resposta a pedidos de outros licitantes sobre os mesmos pontos."),
  LI("Qualquer pessoa pode impugnar (item 12.1), não é preciso estar cadastrado no SICAF para protocolar."),
  LI("Mantenha tom técnico e objetivo: aponte o dispositivo, a contradição e o pedido. Evite juízos sobre a condução do certame."),
  LI("Respostas a esclarecimentos vinculam a Administração e todos os licitantes: guarde-as junto com a proposta.")
]);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const files = [["Impugnacao_Edital_PE_319-2026.docx", impugnacao], ["Pedido_Esclarecimento_PE_319-2026.docx", esclarecimento], ["Pre-analise_Impugnacoes_PE_319-2026.docx", preanalise]];
  for (const [name, d] of files) { fs.writeFileSync(path.join(OUT, name), await Packer.toBuffer(d)); console.log("gerado", name); }
})();
