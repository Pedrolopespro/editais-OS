// Gera o pedido de esclarecimento da Dispensa 70025-40/2026 (TRE-DF) em .docx
// Uso: node esclarecimento_dispensa.js <pasta-de-saida>  (requer o pacote npm "docx")
const fs = require("fs"), path = require("path");
const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Header, Footer, PageNumber } = require("docx");
const FONT = "Arial";
function runs(text, base = {}) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/).filter(Boolean).map(p =>
    p.startsWith("**") ? new TextRun({ text: p.slice(2, -2), bold: true, font: FONT, ...base })
    : p.startsWith("[") ? new TextRun({ text: p, bold: true, font: FONT, highlight: "yellow", ...base })
    : new TextRun({ text: p, font: FONT, ...base }));
}
const P = (t, o = {}) => new Paragraph({ children: runs(t, o.run || {}), alignment: o.align || AlignmentType.JUSTIFIED, spacing: { after: o.after ?? 140, line: 300 } });
const H = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: FONT })] });
const perguntas = [
  ["Duração do vídeo", "TR 1.1 e 3.1.1 · Anexo I ao TR (roteiro)", "O TR prevê vídeo com duração de aproximadamente 5 minutos. O roteiro anexo, porém, tem cerca de 1.400 palavras faladas, o que corresponde a 8 a 11 minutos de narração em ritmo adequado ao público infantil.", "O roteiro poderá ser condensado pela contratada para caber em aproximadamente 5 minutos, com aprovação do storyboard pela EJE-DF, ou a duração de 5 minutos é apenas estimativa e o roteiro deverá ser integralmente narrado?"],
  ["Personagens Zé Urninha e Heitor criança", "TR 1.1 e 5.6.1 · Anexo I ao TR", "Os dois personagens devem seguir o padrão de animação já utilizado pela Escola Judiciária, mas o TR prevê o fornecimento apenas da cartilha \"Ele, Heitor no Folclore\".", "A EJE-DF fornecerá os arquivos-fonte editáveis desses personagens (vetores, model sheets ou arquivos de animação)? Em caso negativo, poderá ser feita a recriação a partir de imagens de referência, sujeita à aprovação no storyboard?"],
  ["Profissionais de voz, música e animação", "TR 1.1 e 4.6.1 · minuta, cláusulas 2.5 e 5.18, c", "O TR exige locutores especializados em dublagem infantil e veda a subcontratação do objeto.", "A contratação, pela empresa e sob sua integral responsabilidade, de profissionais autônomos (dubladores, músicos e animadores) para atuar na execução é admitida, ou será considerada subcontratação vedada?"],
  ["Resolução do arquivo final", "TR 1.1 e 3.1.3", "O TR exige formato HD 16:9 compatível com o YouTube, sem indicar a resolução.", "A entrega deve ser em 1920×1080 (Full HD) ou é aceita a resolução 1280×720?"],
  ["Trilha e cessão de direitos", "TR 1.1 e 6.10.1.12", "O TR prevê trilha pesquisada e a cessão definitiva dos direitos patrimoniais ao TRE-DF.", "É aceita trilha de banco musical com licença de uso perpétua e extensível ao TRE-DF, inclusive para veiculação no YouTube, sem cessão da titularidade da obra musical?"]
];
const children = [
  P("À Assessoria de Licitações (ASLIC)", { align: AlignmentType.LEFT, after: 0, run: { bold: true } }),
  P("Tribunal Regional Eleitoral do Distrito Federal", { align: AlignmentType.LEFT, after: 0 }),
  P("Dispensa Eletrônica nº 70025-40/2026 · Processo SEI nº 0003138-13.2026.6.07.8100", { align: AlignmentType.LEFT, after: 0 }),
  P("Por e-mail: aslic@tre-df.jus.br (item 11.15 do Aviso de Contratação Direta)", { align: AlignmentType.LEFT, after: 280 }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: "PEDIDO DE ESCLARECIMENTO", bold: true, size: 30, font: FONT })] }),
  P("**[RAZÃO SOCIAL DA EMPRESA]**, inscrita no CNPJ sob o nº [00.000.000/0000-00], com sede em [ENDEREÇO COMPLETO, CIDADE/UF], e-mail [E-MAIL PARA RESPOSTA], por seu representante legal [NOME DO REPRESENTANTE], vem, com fundamento no item 11.15 do Aviso de Contratação Direta, solicitar esclarecimentos sobre os pontos abaixo, necessários à correta formulação da proposta para a fase de lances de 18/11/2026."),
  ...perguntas.flatMap((q, i) => [H((i + 1) + ". " + q[0]), P("**Dispositivos:** " + q[1], { after: 80 }), P("**Contexto:** " + q[2], { after: 80 }), P("**Pergunta:** " + q[3])]),
  P("Considerando a proximidade da fase de lances, solicita resposta até a abertura da sessão, com divulgação aos demais interessados.", {}),
  P("[CIDADE/UF], [DIA] de novembro de 2026.", { align: AlignmentType.LEFT, after: 500 }),
  P("______________________________________________", { align: AlignmentType.CENTER, after: 0 }),
  P("[NOME DO REPRESENTANTE LEGAL] · [CARGO]", { align: AlignmentType.CENTER, after: 0, run: { bold: true } }),
  P("[RAZÃO SOCIAL DA EMPRESA] · CNPJ [00.000.000/0000-00]", { align: AlignmentType.CENTER })
];
const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 22 } } }, paragraphStyles: [{ id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 23, bold: true, color: "1F2430" }, paragraph: { spacing: { before: 220, after: 100 }, keepNext: true, outlineLevel: 1 } }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1418, bottom: 1418, left: 1418, right: 1418 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Pedido de esclarecimento · Dispensa Eletrônica nº 70025-40/2026", font: FONT, size: 16, color: "777777" })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ["Página ", PageNumber.CURRENT, " de ", PageNumber.TOTAL_PAGES], font: FONT, size: 16, color: "777777" })] })] }) },
    children }]
});
Packer.toBuffer(doc).then(b => { const f = path.join(process.argv[2], "Esclarecimento_Dispensa_70025-40-2026.docx"); fs.writeFileSync(f, b); console.log("gerado", f); });
