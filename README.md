# Sistema de Análise de Editais

Painéis de decisão para licitações e dispensas. A página inicial lista os editais em análise, ordenados pelo prazo mais próximo; cada edital tem seu painel com números principais, riscos, conflitos, simulador de lance e parecer final.

| Endereço | Conteúdo |
|---|---|
| `/` | Lista de editais |
| `/pe-319-2026/` | Pregão Eletrônico 319/2026 · Casa Civil · locação de veículos |
| `/resumo/pe-319-2026/` | Resumo do Pregão 319 para o investidor: órgão, sessão, valor do contrato, veículos, locais e retorno em uma tela |
| `/de-70025-40-2026/` | Dispensa Eletrônica 70025-40/2026 · TRE-DF · vídeo animado 2D |

Links antigos do Pregão 319 (`/#conflitos` etc.) redirecionam para `/pe-319-2026/`.

## Como o sistema é organizado

- `fonte/core/modelo.html`: desenho e motor comuns a todos os painéis (estilo, navegação, matriz, kit, simulador, parecer, animações).
- `fonte/core/sistema.html`: página inicial com a lista de editais.
- `fonte/editais/<slug>/`: um pacote por edital.
  - `meta.json`: títulos, textos do topo, cartão da lista e arquivos usados.
  - `secoes.html`: seções próprias do edital (ficha, condições, conflitos, simulador, kit…).
  - `edital.js`: dados e regras do edital (seções, conflitos, matriz, kit, custos do simulador, números do topo) no objeto `E`.
  - `investidor.json` (opcional): dados da visão do investidor (custos, cenários de lance, linha do tempo, cuidados). Se existir, o build gera o resumo em `/resumo/<slug>/` com o modelo `fonte/core/investidor.html` e ativa o botão Resumo no cartão da lista. Use os mesmos custos do simulador para os números baterem com o painel completo.

## Como adicionar um edital

1. Copie a pasta de um edital parecido em `fonte/editais/` com o novo slug (ex.: `pe-123-2027`).
2. Preencha `meta.json`, `secoes.html` e `edital.js` com os dados do novo edital. Use `lsPrefix` e `docPrefix` próprios para não misturar as marcações.
3. Rode `python fonte/build.py`. O painel sai em `/<slug>/` e entra na lista automaticamente.

## Planilha de custos

A seção **Planilha de custo** mostra os valores do Apêndice IV organizados por bloco e tem um botão para a versão editável no Google Planilhas (abas Resumo, Locação, No show, Mão de obra e Combustível, com verificação automática dos limites do TR 5.11).

## Como atualizar

Depois de editar qualquer arquivo em `fonte/`, gere as páginas:

```bash
python fonte/build.py
```

No Pregão 319, os números da planilha ficam em `fonte/planilha_dados.py`, e `fonte/build_planilha.py` gera o .xlsx da planilha de custos.

## Onde ficam as marcações

Fora do Claude, a matriz, o kit e o simulador salvam no **navegador de quem está usando** (`localStorage`). Cada pessoa e cada computador têm as próprias marcações. Para compartilhar as marcações com a equipe, é preciso ligar o painel a um banco de dados (por exemplo, Supabase).

## Rodar localmente

```bash
python -m http.server 8000
```

Depois abra http://localhost:8000.

## Publicar na Vercel

1. Em vercel.com, clique em **Add New → Project** e importe este repositório do GitHub.
2. Em **Framework Preset**, escolha **Other**. Deixe Build Command e Output Directory vazios.
3. Clique em **Deploy**.

## Compartilhamento

`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` e `site.webmanifest` definem os ícones. `og-image.jpg` (1200×630) é a imagem das prévias de link em redes sociais; o modelo fica em `fonte/social/og.html`.

## Fontes

Edital do Pregão Eletrônico nº 319/2026 (05/11/2026) e Termo de Referência nº 236/2026 com apêndices.

Análise independente para apoio à decisão do licitante. Não é documento oficial da Presidência da República e não substitui a leitura integral do Edital e anexos.
