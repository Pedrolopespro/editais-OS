"""Gera o site (index.html na raiz) e, opcionalmente, a versão de página única com imagens embutidas.

Uso:
  python fonte/build.py                 -> gera ../index.html (site da Vercel)
  python fonte/build.py --inline SAIDA  -> gera um HTML único com imagens em base64
"""
import base64, json, os, sys
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.dirname(AQUI)
sys.path.insert(0, AQUI)
from planilha_dados import CATS, NOSHOW, MAO, COMB, TOTAIS

GSHEET_URL = "https://docs.google.com/spreadsheets/d/1cFpcnjMYYELUrMDFoKkHnlAA4HsiHpNEj_zaELSsDgk/edit"
dados = {"cats": [list(c) for c in CATS], "noshow": NOSHOW, "mao": MAO, "comb": COMB, "totais": TOTAIS}
t = open(os.path.join(AQUI, "painel_template.html"), encoding="utf-8").read()
t = t.replace("/*PLANILHA_DATA*/null", json.dumps(dados, ensure_ascii=False)).replace("{{GSHEET_URL}}", GSHEET_URL)
DOCS_SITE, DOCS_ABS = "docs/", "https://editais-os.vercel.app/docs/"

# compartilhamento em redes sociais e favicon (só no site)
SITE = "https://editais-os.vercel.app/"
DESC = "Painel de decisão do Pregão Eletrônico 319/2026 da Casa Civil: valores, riscos, conflitos do edital, simulador de lance e parecer final para decidir se vale a pena disputar."
SOCIAL = "\n".join([
  '<meta name="description" content="' + DESC + '">',
  '<meta name="theme-color" content="#0D0D0F">',
  '<link rel="canonical" href="' + SITE + '">',
  '<link rel="icon" href="/favicon.ico" sizes="any">',
  '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
  '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
  '<link rel="manifest" href="/site.webmanifest">',
  '<meta property="og:type" content="website">',
  '<meta property="og:locale" content="pt_BR">',
  '<meta property="og:site_name" content="Painel de Decisão · Pregão 319/2026">',
  '<meta property="og:title" content="Vale a pena disputar o Pregão 319/2026?">',
  '<meta property="og:description" content="' + DESC + '">',
  '<meta property="og:url" content="' + SITE + '">',
  '<meta property="og:image" content="' + SITE + 'og-image.jpg">',
  '<meta property="og:image:type" content="image/jpeg">',
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta property="og:image:alt" content="Vale a pena disputar este pregão? Painel de decisão do Pregão Eletrônico 319/2026, locação de veículos no Sudeste.">',
  '<meta name="twitter:card" content="summary_large_image">',
  '<meta name="twitter:title" content="Vale a pena disputar o Pregão 319/2026?">',
  '<meta name="twitter:description" content="' + DESC + '">',
  '<meta name="twitter:image" content="' + SITE + 'og-image.jpg">',
]) + "\n"

if "--inline" in sys.argv:
    out = sys.argv[sys.argv.index("--inline") + 1]
    b64 = lambda p, m: f"data:{m};base64," + base64.b64encode(open(os.path.join(RAIZ, p), "rb").read()).decode()
    s = t.replace('" download>', '" target="_blank" rel="noopener">').replace("{{DOCS}}", DOCS_ABS).replace("{{LOGO}}", b64("assets/brasao.png", "image/png")).replace("{{PLANILHA}}", b64("assets/planilha-apendice-iv.jpg", "image/jpeg"))
    open(out, "w", encoding="utf-8", newline="\n").write(s); print("gerado", out); sys.exit()

s = t.replace("{{DOCS}}", DOCS_SITE).replace("{{LOGO}}", "assets/brasao.png").replace("{{PLANILHA}}", "assets/planilha-apendice-iv.jpg")
s = s.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "")
head = ('<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<meta name="robots" content="noindex, nofollow">\n' + SOCIAL)
i = s.index("</style>") + len("</style>")
s = head + s[:i] + "\n</head>\n<body>\n" + s[i:].lstrip("\n") + "\n</body>\n</html>\n"
s = s.replace("<style>\n", "<style>\nhtml{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}\nbody{margin:0}\nimg{max-width:100%}\n", 1)
open(os.path.join(RAIZ, "index.html"), "w", encoding="utf-8", newline="\n").write(s); print("gerado index.html")
