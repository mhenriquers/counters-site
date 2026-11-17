/* =====================================================================
   Fragmentos de vidro do topo se mexem quando a pessoa inclina o
   celular (efeito de profundidade, o tal "parallax").
   Sem sensor, no computador ou com "reduzir movimento" ligado no
   sistema, nada acontece e o fundo fica parado.
   ===================================================================== */
(function () {
  var topo = document.querySelector(".secao-topo");
  if (!topo || !window.DeviceOrientationEvent) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var MAXIMO = 16;   // quanto os fragmentos andam, no máximo, em px
  var FORCA = 0.8;   // px por grau de inclinação
  var RECENTRAR = 0.005; // velocidade com que a posição atual vira a "neutra"

  var base = null;            // como a pessoa está segurando o celular
  var alvo = { x: 0, y: 0 };  // onde os fragmentos devem chegar
  var atual = { x: 0, y: 0 }; // onde estão agora
  var animando = false;

  function limitar(valor) {
    return Math.max(-MAXIMO, Math.min(MAXIMO, valor));
  }

  // gamma = inclinar para os lados, beta = para frente e para trás.
  // Com o celular deitado, os eixos trocam de lugar.
  function lerInclinacao(evento) {
    var angulo = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
    if (angulo === 90) return { x: evento.beta, y: -evento.gamma };
    if (angulo === -90 || angulo === 270) return { x: -evento.beta, y: evento.gamma };
    return { x: evento.gamma, y: evento.beta };
  }

  function aoInclinar(evento) {
    if (evento.gamma === null || evento.beta === null) return;
    var inclinacao = lerInclinacao(evento);

    // primeira leitura, ou um salto grande (o celular virou): recomeça daqui
    if (!base || Math.abs(inclinacao.x - base.x) > 45 || Math.abs(inclinacao.y - base.y) > 45) {
      base = { x: inclinacao.x, y: inclinacao.y };
    }

    // a posição "neutra" acompanha devagar o jeito que a pessoa segura
    // o celular, então só o movimento faz os fragmentos andarem
    base.x += (inclinacao.x - base.x) * RECENTRAR;
    base.y += (inclinacao.y - base.y) * RECENTRAR;

    alvo.x = limitar((base.x - inclinacao.x) * FORCA);
    alvo.y = limitar((base.y - inclinacao.y) * FORCA);

    if (!animando) {
      animando = true;
      requestAnimationFrame(passo);
    }
  }

  // anda um pouco por quadro em direção ao alvo, para o movimento ficar suave
  function passo() {
    atual.x += (alvo.x - atual.x) * 0.12;
    atual.y += (alvo.y - atual.y) * 0.12;
    topo.style.setProperty("--mover-x", atual.x.toFixed(2) + "px");
    topo.style.setProperty("--mover-y", atual.y.toFixed(2) + "px");

    if (Math.abs(alvo.x - atual.x) > 0.05 || Math.abs(alvo.y - atual.y) > 0.05) {
      requestAnimationFrame(passo);
    } else {
      animando = false;
    }
  }

  window.addEventListener("deviceorientation", aoInclinar);
})();
