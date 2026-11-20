"""Gera o PDF do resumo do investidor para os editais com "pdf": true no investidor.json.

Rode depois de `python fonte/build.py`:
    python fonte/gerar_pdf.py            (todos os editais com pdf: true)
    python fonte/gerar_pdf.py <slug>     (só um)

Usa o Microsoft Edge (ou Chrome) em modo headless para imprimir /resumo/<slug>/ em A4.
O PDF fica em resumo/<slug>/resumo-<slug>.pdf, ao lado da página.
"""
import functools, glob, http.server, json, os, shutil, subprocess, sys, tempfile, threading, time

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)

NAVEGADORES = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    shutil.which("msedge") or "", shutil.which("google-chrome") or "", shutil.which("chromium") or "",
]


class Silencioso(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main(filtro):
    nav = next((p for p in NAVEGADORES if p and os.path.exists(p)), None)
    if not nav:
        sys.exit("Edge ou Chrome não encontrado.")
    slugs = []
    for inv in glob.glob(os.path.join(AQUI, "editais", "*", "investidor.json")):
        slug = os.path.basename(os.path.dirname(inv))
        if json.load(open(inv, encoding="utf-8")).get("pdf") and (not filtro or slug in filtro):
            slugs.append(slug)
    if not slugs:
        sys.exit("Nenhum edital com \"pdf\": true.")

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Silencioso, directory=RAIZ))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    porta = srv.server_address[1]
    try:
        for slug in slugs:
            if not os.path.exists(os.path.join(RAIZ, "resumo", slug, "index.html")):
                print("pulado (rode o build antes):", slug)
                continue
            saida = os.path.join(RAIZ, "resumo", slug, "resumo-" + slug + ".pdf")
            if os.path.exists(saida):
                os.remove(saida)
            perfil = tempfile.mkdtemp(prefix="pdf-perfil-")  # perfil novo: evita conflito com outra janela aberta
            subprocess.run([nav, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--user-data-dir=" + perfil,
                            "--virtual-time-budget=8000", "--run-all-compositor-stages-before-draw",
                            "--print-to-pdf=" + saida, f"http://127.0.0.1:{porta}/resumo/{slug}/"],
                           check=True, capture_output=True, timeout=120)
            # o Edge devolve o controle antes de terminar: espera o arquivo aparecer e parar de crescer
            tam, fim = -1, time.time() + 90
            while time.time() < fim:
                time.sleep(1)
                if os.path.exists(saida) and os.path.getsize(saida) == tam > 0:
                    break
                tam = os.path.getsize(saida) if os.path.exists(saida) else -1
            shutil.rmtree(perfil, ignore_errors=True)
            if not os.path.exists(saida):
                sys.exit("O navegador não gerou o PDF de " + slug)
            print("gerado", os.path.relpath(saida, RAIZ), os.path.getsize(saida) // 1024, "KB")
    finally:
        srv.shutdown()


if __name__ == "__main__":
    main(sys.argv[1:])
