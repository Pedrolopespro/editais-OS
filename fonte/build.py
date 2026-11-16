"""Sistema de Análise de Editais: monta a lista de editais e um painel por edital.

Uso:
  python fonte/build.py                          -> gera /index.html (lista) e /<slug>/index.html (painéis)
  python fonte/build.py --inline SLUG SAIDA      -> gera o painel de um edital em página única (imagens embutidas)

Cada edital fica em fonte/editais/<slug>/ com:
  meta.json   textos do cabeçalho, cartão da lista e substituições de arquivos
  secoes.html seções específicas do edital (ficha, condições, conflitos, simulador, kit...)
  edital.js   dados (seções, conflitos, matriz, kit, simulador) e regras próprias (objeto E)
O desenho e o motor comuns ficam em fonte/core/modelo.html.
"""
import base64, glob, json, os, re, sys
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.dirname(AQUI)
sys.path.insert(0, AQUI)
SITE = "https://editais-os.vercel.app/"
GSHEET_URL = "https://docs.google.com/spreadsheets/d/1cFpcnjMYYELUrMDFoKkHnlAA4HsiHpNEj_zaELSsDgk/edit"
CORE = open(os.path.join(AQUI, "core", "modelo.html"), encoding="utf-8").read()
CSS = re.search(r"<style>.*?</style>", CORE, flags=re.S).group(0)

def social(title, desc, url, img="og-image.jpg"):
    t = lambda s: s.replace('"', "&quot;")
    return "\n".join([
        f'<meta name="description" content="{t(desc)}">', '<meta name="theme-color" content="#0D0D0F">',
        f'<link rel="canonical" href="{url}">', '<link rel="icon" href="/favicon.ico" sizes="any">',
        '<link rel="icon" type="image/svg+xml" href="/favicon.svg">', '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
        '<link rel="manifest" href="/site.webmanifest">', '<meta property="og:type" content="website">',
        '<meta property="og:locale" content="pt_BR">', '<meta property="og:site_name" content="Sistema de Análise de Editais">',
        f'<meta property="og:title" content="{t(title)}">', f'<meta property="og:description" content="{t(desc)}">',
        f'<meta property="og:url" content="{url}">', f'<meta property="og:image" content="{SITE}{img}">',
        '<meta property="og:image:type" content="image/jpeg">', '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">', '<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{t(title)}">', f'<meta name="twitter:description" content="{t(desc)}">',
        f'<meta name="twitter:image" content="{SITE}{img}">']) + "\n"

def montar(pasta, inline=False):
    meta = json.load(open(os.path.join(pasta, "meta.json"), encoding="utf-8"))
    sec = open(os.path.join(pasta, "secoes.html"), encoding="utf-8").read()
    js = open(os.path.join(pasta, "edital.js"), encoding="utf-8").read()
    if "/*PLANILHA_DATA*/null" in js:
        from planilha_dados import CATS, NOSHOW, MAO, COMB, TOTAIS
        js = js.replace("/*PLANILHA_DATA*/null", json.dumps({"cats": [list(c) for c in CATS], "noshow": NOSHOW, "mao": MAO, "comb": COMB, "totais": TOTAIS}, ensure_ascii=False))
    p = CORE.replace("<!--SECOES_EDITAL-->", sec).replace("/*EDITAL_JS*/", js)
    for k in ["titulo", "nome", "sub", "pergunta", "lead", "prazos_hint", "foot"]:
        p = p.replace("{{E_" + {"titulo": "TITLE"}.get(k, k.upper()) + "}}", meta[k])
    p = p.replace("{{GSHEET_URL}}", GSHEET_URL)
    rep = dict(meta.get("replace", {}))
    if inline:
        p = p.replace("{{E_BACK}}", "").replace('" download>', '" target="_blank" rel="noopener">')
        for k, v in rep.items():
            if v.startswith("/assets/"):
                f = os.path.join(RAIZ, v.lstrip("/")); mime = "image/png" if f.endswith(".png") else "image/jpeg"
                rep[k] = f"data:{mime};base64," + base64.b64encode(open(f, "rb").read()).decode()
            elif v.startswith("/"):
                rep[k] = SITE + v.lstrip("/")
    else:
        p = p.replace("{{E_BACK}}", '<a class="sys-back" href="/">← Editais</a>')
    for k, v in rep.items():
        p = p.replace(k, v)
    assert "{{" not in p, re.findall(r"\{\{[A-Z_]+\}\}", p)[:5]
    if inline:
        return meta, p
    p = p.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "")
    head = ('<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            '<meta name="robots" content="noindex, nofollow">\n'
            + social(meta["og_title"], meta["descricao"], SITE + meta["slug"] + "/", meta.get("og_image", "og-image.jpg")))
    i = p.index("</style>") + len("</style>")
    i = p.index("</style>", i) + len("</style>") if p.find("</style>", i) != -1 and p.find("</style>", i) < p.find('<div class="shell">') else i
    p = head + p[:i] + "\n</head>\n<body>\n" + p[i:].lstrip("\n") + "\n</body>\n</html>\n"
    p = p.replace("<style>\n", "<style>\nhtml{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}\nbody{margin:0}\nimg{max-width:100%}\n", 1)
    return meta, p

pastas = sorted(d for d in glob.glob(os.path.join(AQUI, "editais", "*")) if os.path.isdir(d))

if "--inline" in sys.argv:
    slug = sys.argv[sys.argv.index("--inline") + 1]; out = sys.argv[sys.argv.index("--inline") + 2]
    meta, p = montar(os.path.join(AQUI, "editais", slug), inline=True)
    open(out, "w", encoding="utf-8", newline="\n").write(p); print("gerado", out); sys.exit()

cards = []
for d in pastas:
    meta, p = montar(d)
    os.makedirs(os.path.join(RAIZ, meta["slug"]), exist_ok=True)
    open(os.path.join(RAIZ, meta["slug"], "index.html"), "w", encoding="utf-8", newline="\n").write(p)
    c = dict(meta["card"]); c["slug"] = meta["slug"]; cards.append(c)
    print("gerado", meta["slug"] + "/index.html")

sis = open(os.path.join(AQUI, "core", "sistema.html"), encoding="utf-8").read()
sis = sis.replace("{{CSS}}", CSS).replace("/*EDITAIS*/[]", json.dumps(cards, ensure_ascii=False))
sis = sis.replace("{{SOCIAL}}", social("Sistema de Análise de Editais", "Painéis de decisão para licitações e dispensas: números, riscos, conflitos, simulador de lance e parecer final de cada edital.", SITE))
open(os.path.join(RAIZ, "index.html"), "w", encoding="utf-8", newline="\n").write(sis)
print("gerado index.html (lista com", len(cards), "editais)")
