# Painel de Decisão · Pregão Eletrônico nº 319/2026

Painel de análise do Pregão Eletrônico nº 319/2026 (Secretaria de Administração da Casa Civil, UASG 110001), feito para apoiar a decisão de participar ou não da licitação.

O site é estático: um `index.html` com CSS e JavaScript embutidos e as imagens na pasta `assets/`. Não precisa de build.

## Seções

**Entender o edital:** Visão geral (capa com os dados básicos), Condições gerais, Estrutura operacional, Qualificação, Declarações, Conflitos e Planilha de custo.

**Decidir:** Matriz de aderência, Simulador de lance, Caixa e riscos, Kit das 2 horas.

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

## Fontes

Edital do Pregão Eletrônico nº 319/2026 (05/11/2026) e Termo de Referência nº 236/2026 com apêndices.

Análise independente para apoio à decisão do licitante. Não é documento oficial da Presidência da República e não substitui a leitura integral do Edital e anexos.
