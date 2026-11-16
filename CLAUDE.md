# CLAUDE.md

Contexto do projeto para o Claude Code. Escrito em português, assim como o código.

## Visão geral

**Landing page do Counters MLBB.** Página para "vender o peixe" do app: explicar o que ele faz e convencer a pessoa a usar, com botões para abrir a PWA e baixar o APK.

O app em si fica em outro repositório: `c:\dev\Counters` (https://github.com/mhenriquers/Counters). Ele mostra, para cada herói do Mobile Legends: Bang Bang, contra quem o herói é forte e contra quem é fraco. É grátis, funciona offline, não pede cadastro e está em português e inglês.

- **Este repositório:** https://github.com/mhenriquers/counters-site
- **Links do app:**
  - PWA: https://counters-peach-one.vercel.app
  - APK, sempre a versão mais nova: https://github.com/mhenriquers/Counters/releases/latest/download/Counters.apk
    (funciona enquanto o arquivo da release se chamar `Counters.apk`)

## Decisões

- **HTML e CSS puros**, numa página só. Sem framework, sem build, sem npm. JavaScript só se for indispensável.
- **Deploy:** projeto próprio na Vercel, com Framework Preset **Other** e sem comando de build. Cada `git push` na `main` publica.
- **Seções**, em ordem:
  1. topo: frase de impacto + botões "Abrir o app" e "Baixar APK";
  2. o problema: escolher herói sem saber quem ganha de quem;
  3. como funciona, em 3 passos (busca → herói → fortes e fracos);
  4. vantagens: 133 heróis, offline, grátis, sem cadastro, pt/en;
  5. perguntas frequentes;
  6. chamada final;
  7. rodapé.
- **Obrigatório no rodapé:** aviso de que é um projeto de fã, sem vínculo com a Moonton, e de que Mobile Legends: Bang Bang é marca da Moonton.
- **Visual igual ao do app**, que segue o site oficial do MLBB. Os valores vêm de `c:\dev\Counters\src\tema.js`:

  | Uso | Cor |
  |---|---|
  | fundo | `#0d1424` |
  | cartões | `rgba(10, 17, 32, 0.72)` com borda `rgba(155, 209, 253, 0.16)` |
  | texto | `#ffffff` |
  | texto secundário | `#9bd1fd` |
  | títulos e bordas de destaque | `#D3AF37` |
  | botões | `#ffd700` |
  | "forte contra" | `#4fd8eb` |
  | "fraco contra" | `#ff6b7a` |

  Guarde as cores como variáveis CSS (`--fundo`, `--dourado`...) no `:root`, nunca soltas pelo arquivo.
- **Imagens:** copiadas do app (`c:\dev\Counters`), nunca referenciadas de lá:
  - logo: `assets/logo.png` (o da Home, com fundo transparente; o `counters.png` tem fundo preto);
  - fundo do topo: `assets/bgbg.png`, o mesmo da Home;
  - faixas: `assets/bg-Layer.png` + `assets/hero.png`, o capacete;
  - ícones e favicon: `public/icons/`;
  - prints das telas: `screenshots/`, com 384x832. São gerados com `npm run shots` no repositório do app.

  Comprima as imagens antes de commitar (WebP ou PNG otimizado).
- **Fonte:** a padrão do sistema (`system-ui, sans-serif`). Sem Google Fonts, para carregar rápido.
- Funcionar bem no celular primeiro (a maioria vai abrir pelo celular) e depois no desktop.
- SEO básico: `<title>`, `meta description`, Open Graph (imagem de prévia para WhatsApp e Discord), `lang` no `<html>`.

- **Frase de impacto:** "Saiba quem ganha de quem antes do draft."
- **Idioma:** só português por enquanto. O inglês vem depois, em `/en/index.html`, sem trocar o texto por JavaScript.
- **Passo a passo:** o roteiro completo, etapa por etapa, está em `task.md`.

## Ainda não decidido (perguntar ao dono antes de assumir)

- **Domínio próprio** ou subdomínio da Vercel (por ora, subdomínio da Vercel).
- As pendências listadas no topo do `task.md`.

## Estrutura planejada

```
index.html     a página
style.css      todo o visual
img/           imagens copiadas do app
CLAUDE.md
README.md
```

## Convenções

- Nomes de classes CSS, comentários e textos em **português** (`.secao-vantagens`, `.botao-principal`).
- Commits curtos, em inglês informal (ex.: "add hero section"), a cada seção ou arquivo finalizado.
- Testar abrindo o `index.html` no navegador e no modo celular do DevTools (F12 → ícone de celular, 384px de largura).

## Jeito de trabalhar com o dono

- Fazer uma seção por vez, commitar e **parar** para ele ver o resultado antes da próxima, a não ser que ele peça para seguir até o fim.
- Deixar as perguntas para o **final** da resposta.
- Ele está aprendendo: quando pedir para ensinar, explicar o porquê e mostrar os comandos, para ele mesmo rodar.
- Ele usa o **cmd** do Windows. Comandos para ele vão na sintaxe do cmd: aspas duplas, `C:\caminho`, `cd /d`.
- Antes de uma mudança visual grande, mostrar a ideia e confirmar.
