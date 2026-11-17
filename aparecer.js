/* =====================================================================
   Fade in dos blocos da página conforme a pessoa rola.
   O topo não entra aqui: ele tem a própria animação, só em CSS.
   As regras visuais ficam no style.css (.revelar e .visivel).
   ===================================================================== */
(function () {
  // sem suporte ou com "reduzir movimento" ligado: tudo fica como está, visível
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var blocos = document.querySelectorAll(
    ".faixa-titulo, .problema-texto, .passos li, .ficha-exemplo, " +
    ".grade-vantagens li, .lista-perguntas details, " +
    ".chamada-conteudo > *, .rodape .conteudo"
  );

  // avisa quando um bloco entra na tela (com 10% de folga embaixo, para
  // o fade começar quando o bloco já está um pouco à vista)
  var observador = new IntersectionObserver(function (entradas) {
    var ordem = 0;
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      // blocos que entram juntos aparecem em sequência, 90ms um do outro
      entrada.target.style.setProperty("--atraso", Math.min(ordem, 5) * 0.09 + "s");
      entrada.target.classList.add("visivel");
      observador.unobserve(entrada.target); // anima só uma vez
      ordem++;
    });
  }, { rootMargin: "0px 0px -10% 0px" });

  blocos.forEach(function (bloco) {
    // o que já está na tela quando a página abre fica visível direto,
    // senão ele piscaria (aparece, some e aparece de novo)
    if (bloco.getBoundingClientRect().top < window.innerHeight) return;
    bloco.classList.add("revelar");
    observador.observe(bloco);
  });
})();
