const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const appImg = document.querySelector(".app__image");
const appTitle = document.querySelector(".app__title");
const musicaInput = document.querySelector("#alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
const somStart = new Audio("./sons/play.wav");
const somPause = new Audio("./sons/pause.mp3");
const alarme = new Audio("./sons/beep.mp3");
const appTimer = document.querySelector("#timer");
const startBtn = document.querySelector("#start-pause");
const comecarPausarTexto = document.querySelector("#start-pause span");
const comecarPausarImg = document.querySelector(".app__card-primary-butto-icon");

let tempoDecorridoSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBtn.addEventListener("click", () => {
  tempoDecorridoSegundos = 1500;
  alterarContexto("foco");
  focoBtn.classList.add("active");
});

curtoBtn.addEventListener("click", () => {
  tempoDecorridoSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBtn.classList.add("active");
});

longoBtn.addEventListener("click", () => {
  tempoDecorridoSegundos = 900;
  alterarContexto("descanso-longo");
  longoBtn.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  appImg.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      appTitle.innerHTML = `
      Otimize sua produtividade,<br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      break;
    case "descanso-curto":
      appTitle.innerHTML = `
      Que tal dar uma respirada?<br />
      <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `;
      break;
    case "descanso-longo":
      appTitle.innerHTML = `
      Hora de voltar à superfície.<br />
      <strong class="app__title-strong">Faça uma pausa longa.</strong>
      `;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoSegundos <= 0) {
    alarme.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoSegundos -= 1;
  mostrarTempo();
};

startBtn.addEventListener("click", iniciarPausar);

function iniciarPausar() {
  if (intervaloId) {
    somPause.play();
    comecarPausarTexto.textContent = "Começar";
    comecarPausarImg.setAttribute("src", "./imagens/play_arrow.png");
    zerar();
    return;
  }
  somStart.play();
  comecarPausarTexto.textContent = "Pausar";
  comecarPausarImg.setAttribute("src", "./imagens/pause.png");
  intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoSegundos * 1000);
  const tempoFortmatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"});
  appTimer.innerHTML = `${tempoFortmatado}`
}

mostrarTempo();