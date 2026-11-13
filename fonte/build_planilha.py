import sys
sys.path.insert(0, sys.argv[1])
from planilha_dados import CATS, NOSHOW, MAO, COMB, FAIXAS, rows_locacao
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.formatting.rule import FormulaRule, CellIsRule
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter as L

OUT = sys.argv[2]
INK = "17181C"; MUTED = "5D6574"; LINE = "E0E5ED"
F_HEAD = PatternFill("solid", fgColor=INK)
F_INPUT = PatternFill("solid", fgColor="FFF4CC")
F_BAND = PatternFill("solid", fgColor="F3F6FA")
F_TOTAL = PatternFill("solid", fgColor="E1E9F7")
FX_FILL = {FAIXAS[0]: "DDF3F9", FAIXAS[1]: "E2F0D9", FAIXAS[2]: "DCE6F7", FAIXAS[3]: "FBF5D2"}
thin = Side(style="thin", color=LINE)
B_ALL = Border(left=thin, right=thin, top=thin, bottom=thin)
B_INPUT = Border(left=Side(style="thin", color="E5C25E"), right=Side(style="thin", color="E5C25E"), top=Side(style="thin", color="E5C25E"), bottom=Side(style="thin", color="E5C25E"))
BRL = '"R$" #,##0.00'; QTD = '#,##0'; PCT = '0.0%'
FONT = "Arial"

def title(ws, text, sub, width_cols):
    ws["A1"] = text; ws["A1"].font = Font(name=FONT, size=15, bold=True, color=INK)
    ws["A2"] = sub; ws["A2"].font = Font(name=FONT, size=10, color=MUTED)
    ws.row_dimensions[1].height = 26
    ws.sheet_view.showGridLines = False

def header(ws, row, cols):
    for i, h in enumerate(cols, 1):
        c = ws.cell(row=row, column=i, value=h)
        c.font = Font(name=FONT, bold=True, color="FFFFFF", size=10)
        c.fill = F_HEAD; c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True); c.border = B_ALL
    ws.row_dimensions[row].height = 34

def style(c, fmt=None, bold=False, fill=None, color=INK, align=None, border=B_ALL):
    c.font = Font(name=FONT, size=10, bold=bold, color=color)
    if fmt: c.number_format = fmt
    if fill: c.fill = fill
    if align: c.alignment = Alignment(horizontal=align, vertical="center")
    else: c.alignment = Alignment(vertical="center")
    if border: c.border = border

def widths(ws, ws_w):
    for i, w in enumerate(ws_w, 1): ws.column_dimensions[L(i)].width = w

wb = Workbook()

# ------------------------------------------------------------------ Locação
loc = wb.active; loc.title = "Locação"; loc.sheet_properties.tabColor = "1A6890"
title(loc, "Locação de veículos · 22 categorias × 4 faixas de prazo",
      "Uma linha por preço a cotar. Edite só as células amarelas (Meu preço). Fonte: Apêndice IV do TR (p. 42) e regras do TR 5.11.", 12)
H = ["Cód.", "Categoria", "Faixa de prazo", "Item", "Qtde", "Preço máximo (órgão)", "Meu preço", "Regra", "Limite efetivo", "Total referência", "Meu total", "Situação"]
header(loc, 4, H)
rows = rows_locacao(); r0 = 5
RULE = {0: ("≤ preço máximo", None), 1: ("≤ 20% da diária 24 h", 0), 2: ("≤ 80% da diária 24 h", 0), 3: ("≤ 20% da diária 10 h", 2),
        4: ("≤ preço máximo", None), 5: ("≤ 20% da diária", 4), 6: ("≤ preço máximo", None), 7: ("≤ 20% da diária", 6),
        8: ("≤ preço máximo", None), 9: ("≤ 20% da diária", 8)}
start_row = {}
for i, (cod, nome, fx, item, q, p) in enumerate(rows):
    r = r0 + i; k = i % 10; s = r - k
    if k == 0: start_row[cod] = r
    band = F_BAND if (i // 10) % 2 == 0 else None
    vals = [cod, nome, fx, item, q, p, p]
    for j, v in enumerate(vals, 1): loc.cell(row=r, column=j, value=v)
    txt, base = RULE[k]
    loc.cell(row=r, column=8, value=txt)
    if base is None: loc.cell(row=r, column=9, value=f"=F{r}")
    else:
        pct = 0.8 if k == 2 else 0.2
        loc.cell(row=r, column=9, value=f"=MIN(F{r},ROUND({pct}*G{s+base},2))")
    loc.cell(row=r, column=10, value=f"=E{r}*F{r}")
    loc.cell(row=r, column=11, value=f"=E{r}*G{r}")
    loc.cell(row=r, column=12, value=f'=IF(G{r}="","Preencher",IF(G{r}>I{r}+0.004,"Acima do limite","OK"))')
    for j in range(1, 13):
        c = loc.cell(row=r, column=j)
        fmt = {5: QTD, 6: BRL, 7: BRL, 9: BRL, 10: BRL, 11: BRL}.get(j)
        style(c, fmt=fmt, fill=band, bold=(j == 1), align=("center" if j in (1, 12) else None),
              color=(MUTED if j == 8 else INK))
    fx_c = loc.cell(row=r, column=3); fx_c.fill = PatternFill("solid", fgColor=FX_FILL[fx])
    g = loc.cell(row=r, column=7); g.fill = F_INPUT; g.border = B_INPUT; g.font = Font(name=FONT, size=10, bold=True, color=INK)
last = r0 + len(rows) - 1; tot_loc = last + 2
loc.cell(row=tot_loc, column=2, value="Total da locação de veículos")
loc.cell(row=tot_loc, column=10, value=f"=SUM(J{r0}:J{last})")
loc.cell(row=tot_loc, column=11, value=f"=SUM(K{r0}:K{last})")
loc.cell(row=tot_loc, column=12, value=f'=COUNTIF(L{r0}:L{last},"Acima do limite")&" acima do limite"')
for j in range(1, 13): style(loc.cell(row=tot_loc, column=j), fmt=(BRL if j in (10, 11) else None), bold=True, fill=F_TOTAL, align=("center" if j == 12 else None))
widths(loc, [6, 34, 15, 16, 9, 15, 14, 21, 14, 17, 17, 16])
loc.freeze_panes = "C5"; loc.auto_filter.ref = f"A4:L{last}"
loc.conditional_formatting.add(f"L{r0}:L{last}", CellIsRule(operator="equal", formula=['"Acima do limite"'], fill=PatternFill("solid", fgColor="FADFDF"), font=Font(color="BC3434", bold=True)))
loc.conditional_formatting.add(f"L{r0}:L{last}", CellIsRule(operator="equal", formula=['"OK"'], font=Font(color="1C7F52", bold=True)))
loc.conditional_formatting.add(f"G{r0}:G{last}", FormulaRule(formula=[f"G{r0}>I{r0}+0.004"], fill=PatternFill("solid", fgColor="FADFDF"), font=Font(color="BC3434", bold=True)))
dv = DataValidation(type="decimal", operator="greaterThanOrEqual", formula1="0", showErrorMessage=True, errorTitle="Valor inválido", error="Digite um preço maior ou igual a zero.")
loc.add_data_validation(dv); dv.add(f"G{r0}:G{last}")

# ------------------------------------------------------------------ No show
ns = wb.create_sheet("No show"); ns.sheet_properties.tabColor = "835F00"
title(ns, "No show · veículo reservado e não usado",
      "Teto: 70% da diária de 10 h (TR 5.11.3). A coluna 'Excesso na planilha do órgão' mostra onde o Apêndice IV passa do próprio teto.", 11)
header(ns, 4, ["Cód.", "Categoria", "Qtde", "Minha diária 10 h", "Teto 70%", "Valor na planilha do órgão", "Excesso na planilha do órgão", "Meu preço", "Total referência", "Meu total", "Situação"])
n0 = 5
for i, c in enumerate(CATS):
    cod, nome = c[0], c[1]; q, v = NOSHOW[cod]; r = n0 + i; s = start_row[cod]
    ref10 = c[4][1]; teto_ref = round(ref10 * 0.7, 2)
    vals = [cod, nome, q, f"=Locação!G{s+2}", f"=ROUND(D{r}*0.7,2)", v, f"=MAX(0,F{r}-ROUND(Locação!F{s+2}*0.7,2))", min(v, teto_ref),
            f"=C{r}*F{r}", f"=C{r}*H{r}", f'=IF(H{r}="","Preencher",IF(H{r}>E{r}+0.004,"Acima do teto","OK"))']
    band = F_BAND if i % 2 == 0 else None
    for j, val in enumerate(vals, 1):
        cell = ns.cell(row=r, column=j, value=val)
        style(cell, fmt={3: QTD, 4: BRL, 5: BRL, 6: BRL, 7: BRL, 8: BRL, 9: BRL, 10: BRL}.get(j), fill=band, bold=(j == 1), align=("center" if j in (1, 11) else None))
    h = ns.cell(row=r, column=8); h.fill = F_INPUT; h.border = B_INPUT; h.font = Font(name=FONT, size=10, bold=True)
nl = n0 + len(CATS) - 1; tot_ns = nl + 2
ns.cell(row=tot_ns, column=2, value="Total de no show")
ns.cell(row=tot_ns, column=7, value=f"=SUMPRODUCT(C{n0}:C{nl},G{n0}:G{nl})")
ns.cell(row=tot_ns, column=9, value=f"=SUM(I{n0}:I{nl})")
ns.cell(row=tot_ns, column=10, value=f"=SUM(J{n0}:J{nl})")
ns.cell(row=tot_ns, column=11, value=f'=COUNTIF(K{n0}:K{nl},"Acima do teto")&" acima do teto"')
for j in range(1, 12): style(ns.cell(row=tot_ns, column=j), fmt=(BRL if j in (7, 9, 10) else None), bold=True, fill=F_TOTAL, align=("center" if j == 11 else None))
ns.cell(row=tot_ns + 1, column=2, value=f'=COUNTIF(G{n0}:G{nl},">0")&" de 22 categorias têm no show acima do teto na planilha do órgão (excesso anual na coluna G)"')
style(ns.cell(row=tot_ns + 1, column=2), color="BC3434", border=None, bold=True)
widths(ns, [6, 34, 8, 15, 13, 16, 16, 14, 16, 16, 15])
ns.freeze_panes = "C5"
ns.conditional_formatting.add(f"G{n0}:G{nl}", CellIsRule(operator="greaterThan", formula=["0"], fill=PatternFill("solid", fgColor="FADFDF"), font=Font(color="BC3434", bold=True)))
ns.conditional_formatting.add(f"K{n0}:K{nl}", CellIsRule(operator="equal", formula=['"Acima do teto"'], fill=PatternFill("solid", fgColor="FADFDF"), font=Font(color="BC3434", bold=True)))
ns.conditional_formatting.add(f"K{n0}:K{nl}", CellIsRule(operator="equal", formula=['"OK"'], font=Font(color="1C7F52", bold=True)))
dv2 = DataValidation(type="decimal", operator="greaterThanOrEqual", formula1="0", showErrorMessage=True, error="Digite um preço maior ou igual a zero.")
ns.add_data_validation(dv2); dv2.add(f"H{n0}:H{nl}")

# ------------------------------------------------------------------ Mão de obra
mo = wb.create_sheet("Mão de obra"); mo.sheet_properties.tabColor = "22744A"
title(mo, "Mão de obra · motoristas e agentes de missão",
      "Adicional de 60% em pernoite fora do domicílio (TR 5.8). As linhas com adicional são calculadas a partir da diária base.", 8)
header(mo, 4, ["Item", "Unidade", "Qtde", "Preço máximo (órgão)", "Meu preço", "Total referência", "Meu total", "Situação / observação"])
m0 = 5
for i, (item, un, q, p) in enumerate(MAO):
    r = m0 + i
    meu = p
    if item == "Motorista com adicional de 60%": meu = f"=ROUND(E{m0}*1.6,2)"
    if item == "Agente de missão com adicional de 60%": meu = f"=ROUND(E{m0+3}*1.6,2)"
    sit = f'=IF(E{r}>D{r}+0.004,"Acima do máximo","OK")'
    vals = [item, un, q, p, meu, f"=C{r}*D{r}", f"=C{r}*E{r}", sit]
    for j, val in enumerate(vals, 1):
        cell = mo.cell(row=r, column=j, value=val)
        style(cell, fmt={3: QTD, 4: BRL, 5: BRL, 6: BRL, 7: BRL}.get(j), fill=(F_BAND if i % 2 == 0 else None), bold=(j == 1))
    e = mo.cell(row=r, column=5); e.fill = F_INPUT; e.border = B_INPUT; e.font = Font(name=FONT, size=10, bold=True)
ml = m0 + len(MAO) - 1; tot_mo = ml + 2
mo.cell(row=tot_mo, column=1, value="Total de mão de obra")
mo.cell(row=tot_mo, column=6, value=f"=SUM(F{m0}:F{ml})"); mo.cell(row=tot_mo, column=7, value=f"=SUM(G{m0}:G{ml})")
for j in range(1, 9): style(mo.cell(row=tot_mo, column=j), fmt=(BRL if j in (6, 7) else None), bold=True, fill=F_TOTAL)
mo.cell(row=tot_mo + 2, column=1, value="Atenção: o TR 5.8 indica adicional de 60% sobre a diária do motorista (R$ 1.380 + 60% de R$ 380 = R$ 1.608), mas o Apêndice IV usa R$ 2.208 para o agente. Confirme com o órgão antes de cotar.")
style(mo.cell(row=tot_mo + 2, column=1), color="9A6200", border=None, bold=True)
widths(mo, [38, 10, 10, 18, 14, 18, 18, 22])
mo.conditional_formatting.add(f"H{m0}:H{ml}", CellIsRule(operator="equal", formula=['"Acima do máximo"'], fill=PatternFill("solid", fgColor="FADFDF"), font=Font(color="BC3434", bold=True)))
mo.conditional_formatting.add(f"H{m0}:H{ml}", CellIsRule(operator="equal", formula=['"OK"'], font=Font(color="1C7F52", bold=True)))

# ------------------------------------------------------------------ Combustível
cb = wb.create_sheet("Combustível"); cb.sheet_properties.tabColor = "9E521A"
title(cb, "Combustível · repasse, não cotado pelo licitante",
      "Preços ao consumidor ANP de julho/2026 + 9,45% de tributos retidos. A contratada adianta e é reembolsada (TR 5.3).", 6)
header(cb, 4, ["Combustível", "Litros", "Preço ANP (R$/L)", "Tributos", "Preço com tributos (R$/L)", "Total"])
c0 = 5
for i, (nome, l, p) in enumerate(COMB):
    r = c0 + i
    vals = [nome, l, p, 0.0945, f"=C{r}*(1+D{r})", f"=ROUND(B{r}*C{r}*(1+D{r}),2)"]
    for j, val in enumerate(vals, 1):
        style(cb.cell(row=r, column=j, value=val), fmt={2: QTD, 3: '"R$" #,##0.00', 4: '0.00%', 5: '"R$" #,##0.0000', 6: BRL}.get(j), fill=(F_BAND if i % 2 == 0 else None), bold=(j == 1))
cl = c0 + len(COMB) - 1; tot_cb = cl + 2
cb.cell(row=tot_cb, column=1, value="Total de combustível"); cb.cell(row=tot_cb, column=6, value=f"=SUM(F{c0}:F{cl})")
for j in range(1, 7): style(cb.cell(row=tot_cb, column=j), fmt=(BRL if j == 6 else None), bold=True, fill=F_TOTAL)
widths(cb, [22, 12, 16, 11, 22, 18])

# ------------------------------------------------------------------ Resumo (primeira aba)
rs = wb.create_sheet("Resumo", 0); rs.sheet_properties.tabColor = INK
title(rs, "Planilha de custos · Pregão Eletrônico nº 319/2026",
      "Casa Civil da Presidência da República · UASG 110001 · Locação de veículos com e sem motorista na Região Sudeste", 5)
header(rs, 4, ["Bloco", "Referência do órgão", "Minha proposta", "Diferença", "Desconto"])
blocos = [
    ("Locação de veículos", f"=Locação!J{tot_loc}", f"=Locação!K{tot_loc}"),
    ("No show", f"='No show'!I{tot_ns}", f"='No show'!J{tot_ns}"),
    ("Diárias de motoristas", f"=SUM('Mão de obra'!F{m0}:F{m0+2})", f"=SUM('Mão de obra'!G{m0}:G{m0+2})"),
    ("Agente de missão", f"=SUM('Mão de obra'!F{m0+3}:F{m0+4})", f"=SUM('Mão de obra'!G{m0+3}:G{m0+4})"),
    ("Combustível (repasse, não cotado)", f"=Combustível!F{tot_cb}", f"=Combustível!F{tot_cb}"),
]
b0 = 5
for i, (nome, ref, meu) in enumerate(blocos):
    r = b0 + i
    for j, val in enumerate([nome, ref, meu, f"=C{r}-B{r}", f'=IF(B{r}=0,"",1-C{r}/B{r})'], 1):
        style(rs.cell(row=r, column=j, value=val), fmt={2: BRL, 3: BRL, 4: BRL, 5: PCT}.get(j), fill=(F_BAND if i % 2 == 0 else None), bold=(j == 1))
bl = b0 + len(blocos) - 1; tr = bl + 1
for j, val in enumerate(["Total do item (valor anual)", f"=SUM(B{b0}:B{bl})", f"=SUM(C{b0}:C{bl})", f"=C{tr}-B{tr}", f'=IF(B{tr}=0,"",1-C{tr}/B{tr})'], 1):
    style(rs.cell(row=tr, column=j, value=val), fmt={2: BRL, 3: BRL, 4: BRL, 5: PCT}.get(j), bold=True, fill=F_TOTAL)
rs.row_dimensions[tr].height = 22

a0 = tr + 3
rs.cell(row=a0 - 1, column=1, value="Verificações automáticas"); rs.cell(row=a0 - 1, column=1).font = Font(name=FONT, size=12, bold=True, color=INK)
checks = [
    ("Preços de locação acima do limite", f'=COUNTIF(Locação!L{r0}:L{last},"Acima do limite")'),
    ("Preços de mão de obra acima do máximo", f"=COUNTIF('Mão de obra'!H{m0}:H{ml},\"Acima do máximo\")"),
    ("No show acima do teto de 70% (meus preços)", f"=COUNTIF('No show'!K{n0}:K{nl},\"Acima do teto\")"),
    ("Proposta acima do valor máximo?", f'=IF(C{tr}>B{tr}+0.004,"Sim: seria desclassificada (Edital 7.7.3)","Não")'),
    ("Proposta abaixo de 50% da referência?", f'=IF(C{tr}<0.5*B{tr},"Sim: exige prova de exequibilidade (Edital 7.8)","Não")'),
    ("Categorias com no show acima do teto na planilha do órgão", f"=COUNTIF('No show'!G{n0}:G{nl},\">0\")&\" de 22\""),
]
for i, (lab, f) in enumerate(checks):
    r = a0 + i
    style(rs.cell(row=r, column=1, value=lab), fill=(F_BAND if i % 2 == 0 else None))
    c = rs.cell(row=r, column=2, value=f); style(c, bold=True, fill=(F_BAND if i % 2 == 0 else None))
    rs.merge_cells(start_row=r, start_column=2, end_row=r, end_column=5)
rs.conditional_formatting.add(f"B{a0}:B{a0+2}", CellIsRule(operator="greaterThan", formula=["0"], font=Font(color="BC3434", bold=True)))
rs.conditional_formatting.add(f"B{a0+3}:B{a0+4}", FormulaRule(formula=[f'LEFT(B{a0+3},3)="Sim"'], font=Font(color="BC3434", bold=True)))

g0 = a0 + len(checks) + 2
rs.cell(row=g0, column=1, value="Como usar"); rs.cell(row=g0, column=1).font = Font(name=FONT, size=12, bold=True, color=INK)
guia = [
    "1. Edite apenas as células amarelas (coluna 'Meu preço') nas abas Locação, No show e Mão de obra.",
    "2. A coluna 'Situação' avisa quando um preço passa do máximo do órgão ou das regras do TR 5.11 (10 h ≤ 80% da 24 h; hora extra ≤ 20% da diária; no show ≤ 70% da diária de 10 h).",
    "3. Combustível é repasse pelo preço ANP: não entra no seu desconto.",
    "4. Os preços unitários do Apêndice IV são os máximos aceitáveis no julgamento (Edital 5.11).",
    "Fonte: Termo de Referência nº 236/2026, Apêndice IV (p. 42). Análise independente, não é documento oficial.",
]
for i, t in enumerate(guia):
    c = rs.cell(row=g0 + 1 + i, column=1, value=t); c.font = Font(name=FONT, size=10, color=(MUTED if i == len(guia) - 1 else INK))
widths(rs, [52, 22, 22, 18, 12])

wb.save(OUT)
print("salvo", OUT, "linhas locação", len(rows), "total loc row", tot_loc)
