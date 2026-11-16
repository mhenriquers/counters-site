# task.md — passo a passo da landing page

Roteiro do site, do zero até o ar. Siga **na ordem**, uma etapa por vez, e marque `[x]` ao concluir.
Cores, links, fontes e convenções estão no `CLAUDE.md`, que é a fonte única dessas informações. Aqui fica só o que fazer.

## Pendências

- [x] **QR code:** gerado um novo, apontando para a PWA (etapa 1).
- [x] **Anúncios:** não há nenhum no código do app. O cartão "Grátis" fica como está.
- [ ] **Patch:** para qual patch os counters estão atualizados, e com que frequência você atualiza? Por enquanto, o FAQ traz "E se um counter estiver errado?" (resposta: mandar pelo Feedback) no lugar de "Os counters estão atualizados?". Só citar patch se ele for mantido em dia.
- [ ] **iPhone:** a PWA funciona bem no Safari do iPhone? O FAQ só ensina a adicionar à tela de início e não promete uso offline no iPhone.
- [ ] **Permissões do APK:** o FAQ não fala de permissões, só que o código é aberto. Se o APK não pedir nenhuma, dá para acrescentar isso.

## Rotina de toda etapa de seção

1. Se a mudança visual for grande, mostrar a ideia e confirmar antes de codar.
2. Codar: primeiro o celular, depois o desktop, em `@media (min-width: 768px)`.
3. Testar no celular: `F12` → `Ctrl+Shift+M` → "Responsive" com **384** de largura → `Ctrl+Shift+R`. Nada pode vazar para os lados.
4. Testar no desktop, com a janela maximizada, e clicar em todos os links da seção.
5. Commitar e enviar (no cmd), lendo o `git status` antes do commit:
   ```
   cd /d C:\dev\counters-site
   git add .
   git status
   git commit -m "mensagem da etapa"
   git push
   ```
6. **Parar** para revisão.

---

## Etapa 0 — Preparar

- [x] Criar as pastas e copiar os arquivos (no cmd):
  ```
  cd /d C:\dev\counters-site
  mkdir img\icones
  mkdir C:\dev\counters-site-originais
  copy "C:\dev\Counters\assets\counters.png" "C:\dev\counters-site-originais\"
  copy "C:\dev\Counters\assets\bg-Layer.png" "C:\dev\counters-site-originais\"
  copy "C:\dev\Counters\assets\hero.png" "C:\dev\counters-site-originais\"
  copy "C:\dev\Counters\assets\QRCode.png" "C:\dev\counters-site-originais\"
  copy "C:\dev\Counters\assets\heroi_ml_149.png" "C:\dev\counters-site-originais\"
  copy "C:\dev\Counters\screenshots\home.png" "C:\dev\counters-site-originais\"
  copy "C:\dev\Counters\screenshots\heroi-1.png" "C:\dev\counters-site-originais\"
  copy "C:\dev\Counters\public\icons\icon-192.png" "img\icones\"
  copy "C:\dev\Counters\public\icons\icon-512.png" "img\icones\"
  copy "C:\dev\Counters\public\icons\apple-touch-icon.png" "img\icones\"
  ```
  > Os originais ficam **fora** do repositório porque são pesados. Os ícones já são pequenos e vão direto.
- [x] Conferir: `dir img\icones` deve listar 3 arquivos e `dir C:\dev\counters-site-originais` deve listar 7.
- [x] Commit: `add project plan and icons`.

## Etapa 1 — Comprimir as imagens

Feita por script (`sharp` + `qrcode`, instalados numa pasta temporária, **fora** do projeto). Quem preferir fazer à mão pode usar o `https://squoosh.app`, que roda no navegador.

| Original (no app) | Formato | Largura | Nome final em `img/` |
|---|---|---|---|
| `assets/logo.png` (logo da Home, fundo transparente) | WebP 90 | — | `logo.webp` |
| `assets/bgbg.png` (fundo da Home) | WebP 70 | 900 | `fundo-topo.webp` |
| `assets/bg-Layer.png` | WebP 80 | — | `faixa-fundo.webp` |
| `assets/hero.png` | WebP 90 | — | `capacete.webp` |
| `screenshots/home.png` | WebP 80 | — | `print-inicio.webp` |
| `screenshots/heroi-1.png` | WebP 80 | — | `print-heroi.webp` |
| `assets/heroi_ml_149.png` (Akai) | WebP 80 | 192 | `herois/akai.webp` |
| fotos dos 10 heróis do cartão do Akai | WebP 80 | 96 | `herois/<nome>.webp` |
| — (gerado para a PWA) | SVG | — | `qrcode.svg` |

> `counters.png` **não** foi usado: é o ícone do Android, com fundo preto.
> `QRCode.png` **não** foi usado: não aparece no código do app e pode ser o QR do Pix. O QR novo é SVG, então fica nítido em qualquer tamanho.

- [x] Cada arquivo com **menos de 100 KB** (o maior tem 43 KB).
- [x] Commit: `add compressed images`.

## Etapa 2 — Esqueleto

- [x] `index.html` com `lang="pt-BR"`, viewport, `<title>`, meta description, `theme-color`, favicon e apple-touch-icon (de `img/icones/`) e um comentário marcando onde entra o Open Graph (etapa 11).
- [x] As 7 seções vazias: `header.secao-topo`, `main` com `.secao-problema`, `.secao-como-funciona`, `.secao-vantagens`, `.secao-perguntas` e `.secao-chamada-final`, e `footer.rodape`.
- [x] `style.css` com as variáveis de cor no `:root` (tabela do CLAUDE.md), `box-sizing`, fundo e fonte do sistema.
- [x] Teste: a página abre azul-escura e vazia, com o ícone do app na aba.
- [x] Commit: `add page skeleton`.

## Etapa 3 — Topo

- Logo `img/logo.webp`.
- **h1:** Saiba quem ganha de quem antes do draft.
- **Subtítulo:** Os counters dos 133 heróis do Mobile Legends, no bolso e sem internet.
- Botões (são links `<a>`): **Abrir o app** (PWA, `.botao-principal`) e **Baixar APK** (`.botao-secundario`).
- Abaixo dos botões: *Tem iPhone? Toque em "Abrir o app" e adicione à tela de início.*
- Print `img/print-inicio.webp` numa moldura de celular feita em CSS.
- QR `img/qrcode.png` com a legenda *No computador? Aponte a câmera do celular.* Aparece **só no desktop**.
- Fundo da faixa: `faixa-fundo.webp` + `capacete.webp`, como no app.
- Celular: tudo em uma coluna. Desktop: texto à esquerda, print à direita.
- [x] Feito. Commit: `add hero section`.

## Etapa 4 — O problema

- **h2:** Você já perdeu a partida no draft?
- **Texto:** Você escolhe seu herói, a partida começa e só então descobre que o time inimigo tem o counter perfeito contra ele. Saber quem ganha de quem decide boa parte do jogo antes mesmo de ele começar. Só que ninguém decora os confrontos de 133 heróis.
- [x] Feito. Commit: `add problem section`.

## Etapa 5 — Como funciona

- **h2:** Como funciona
- 3 passos numerados: **Busque o herói** pelo nome → **Toque nele** para abrir a ficha → **Veja contra quem ele é forte e contra quem é fraco.**
- Cartão de demonstração (só HTML e CSS): foto `akai.webp`, **Akai**, classe Tanque.
  - **Forte contra** (cor "forte"): Guinevere, Eudora, Argus, Atlas, Alucard
  - **Fraco contra** (cor "fraco"): Esmeralda, Alice, Hanabi, Cyclops, Karrie
  - Dados conferidos em `src/dados/banco_herois.js` do app (id 2). Se o app mudar, conferir de novo.
- Opcional: `print-heroi.webp` ao lado do cartão no desktop.
- [x] Feito. Commit: `add how it works section`.

## Etapa 6 — Vantagens

**h2:** Por que usar. Cinco cartões; no desktop, em grade de 3 colunas:

| Título | Linha |
|---|---|
| 133 heróis | Todos os heróis do jogo, com counters a favor e contra. |
| Funciona offline | Depois de aberto uma vez, funciona sem internet. |
| Grátis | Sem anúncios e sem pagar nada. *(Ajustar conforme a pendência.)* |
| Sem cadastro | Abriu, usou. Nada de conta, e-mail ou senha. |
| Português e inglês | Troque o idioma quando quiser, nas configurações. |

- [x] Feito. Commit: `add features section`.

## Etapa 7 — Perguntas frequentes

Cada pergunta é um `<details>` + `<summary>`, que abre e fecha sem JavaScript.

1. **É grátis mesmo?** Sim. Não tem versão paga, assinatura nem cadastro.
2. **É seguro instalar o APK?** Sim. O código é aberto no GitHub (com link). O Android avisa porque o app não vem da Play Store, e isso é normal para qualquer APK baixado fora dela.
3. **Como instalo o APK?** Toque em "Baixar APK" → abra o arquivo → se o Android pedir, permita "instalar apps desta fonte" → Instalar.
4. **Tenho iPhone. Funciona?** Sim, pela versão web: abra no Safari → Compartilhar → Adicionar à Tela de Início. *(Ajustar conforme a pendência.)*
5. **Precisa de internet?** Só para baixar ou abrir pela primeira vez.
6. **E se um counter estiver errado?** Mande pela tela de Feedback, no menu do app. *(Provisória: trocar por "Os counters estão atualizados?" depois da pendência do patch.)*
7. **É um app oficial do Mobile Legends?** Não. É um projeto de fã, sem vínculo com a Moonton.

- [x] Feito; testar que cada pergunta abre e fecha. Commit: `add faq section`.

## Etapa 8 — Chamada final

- **h2:** Pronto para o próximo draft?
- Os mesmos dois botões e a mesma linha do iPhone do topo.
- Faixa com o fundo e o capacete, com borda dourada em cima e embaixo.
- [x] Feito. Commit: `add final call section`.

## Etapa 9 — Rodapé

- *Counters é um projeto de fã, sem vínculo com a Moonton. Mobile Legends: Bang Bang é marca registrada da Moonton.* (obrigatório)
- Link **Código no GitHub** → repositório do app.
- [x] Feito. Commit: `add footer`.

## Etapa 10 — Deploy na Vercel

- [ ] vercel.com → entrar com o GitHub → **Add New… → Project** → importar `counters-site`.
- [ ] Framework Preset **Other**; Build Command e Output Directory **vazios** → **Deploy**.
- [ ] Anotar o endereço aqui: `https://________________.vercel.app`
- [ ] Abrir no **celular de verdade** e testar os botões. A partir daqui, todo `git push` na `main` publica sozinho.

## Etapa 11 — Prévia para WhatsApp e Discord (Open Graph)

- [ ] Criar `extras/og.html`, com 1200x630: fundo, logo, capacete e a frase.
- [ ] Capturar: `F12` → modo celular → Responsive **1200 x 630** → menu ⋮ → **Capture screenshot**.
- [ ] Passar a captura no Squoosh com OxiPNG e salvar como `img/og.png` (menos de 300 KB; PNG porque o WhatsApp não lê WebP direito).
- [ ] No `<head>`: `og:type`, `og:title`, `og:description`, `og:url`, `og:image` (+ width/height), `og:locale` (`pt_BR`) e `twitter:card` (`summary_large_image`).
      **`og:url` e `og:image` com o endereço completo** (`https://...`), anotado na etapa 10.
- [ ] Commit `add open graph preview` → mandar o link para você mesmo no WhatsApp. Se a prévia não aparecer, testar com `?v=1` no final do link.

## Etapa 12 — Revisão final

- [ ] Nada vaza para os lados em 384px; no desktop, o QR aparece.
- [ ] Todos os links funcionam e toda `<img>` tem `alt`.
- [ ] Nenhuma cor solta no `style.css` fora do `:root` (procurar `#` e `rgba(`).
- [ ] Lighthouse (`F12` → Lighthouse → Mobile): as 4 notas acima de 90.
- [ ] README com o endereço do site. Commit: `final review fixes`.

---

**Depois:** versão em inglês (`/en/index.html`), domínio próprio e o link do site no README e na release do app.
