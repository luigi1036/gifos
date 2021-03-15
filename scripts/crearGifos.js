import { conexionSubirGif} from './conexion.js';

//Elementos del DOM
const d = document,
$divCrearGifos = d.querySelector(".crearGifos"),
$divMisGifos = d.querySelector(".misGifos"),
$divFavoritos = d.querySelector(".favoritos"),
$principalCover = d.querySelector(".principal-cover"),
$grabarTitulo = d.querySelector(".crearGifos-contenedor-rectangulo-video-paso1-titulo"),
$divTrending = d.querySelector(".trendingGifos"),
$divExtraCrearGif = d.querySelector(".crearGifos-contenedor-grabadora-divExtra"),
$divInformacionGifCreado = d.querySelector(".crearGifos-contenedor-grabadora-divExtra-informacion"),
$iconoInfo = d.querySelector(".iconoInfo"),
$textoInfo = d.querySelector(".textoInfo"),
$divVideo = d.querySelector(".crearGifos-contenedor-grabadora-grabar"),
$tiempo = d.querySelector(".crearGifos-contenedor-botones-tiempo"),
$divGrabador = d.querySelector(".crearGifos-contenedor-grabadora"),
$grabarParrafo = d.querySelector(".crearGifos-contenedor-rectangulo-video-paso1-parrafo"),
$btnFinalizar = d.querySelector(".finalizar"),
$btnsubirGif =d.querySelector(".subirGif"),
$btnGrabar = d.querySelector(".grabar"),
$btnComenzar = d.querySelector(".comenzar"),
$linkRepetir = d.querySelector(".crearGifos-contenedor-botones-repetir");


//Variantes
let contenedorStream;
let video;
let intervalo;
let refresf = 30;
let idGifCreado;
let urlGifCreado;
let grabado;
let gifBlob;



export function comenzarGif(){
    $grabarTitulo.innerText = "¿Nos das acceso a tu cámara?";
    $grabarParrafo.innerText = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    $btnsubirGif.removeAttribute("style");
    $linkRepetir.removeAttribute("style");
    obtenerPermiso();
}

async function obtenerPermiso(){
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            width: 320,
            height: 200,
          }
        });
        
        $divGrabador.style.transform = "rotateX(0) scale(1)";
        $btnGrabar.style.display = "inherit";
        contenedorStream = stream;
        $divVideo.srcObject = stream;
        $divVideo.play();
        $btnGrabar.style.display = "inherit";
        $divVideo.style.display = "inherit";
        $btnComenzar.style.display = "none";
        return stream;
      } catch (error) {
        alert("Unable to capture your camera.");
      }
};

export function mostrarCrearGifos(){
    $divMisGifos.style.display = "none";
    $principalCover.style.display = "none";
    $divTrending.style.display = "none";
    $divFavoritos.style.display = "none";
    $divCrearGifos.style.display = "initial";

}

export const grabarGif = async ()=>{
    $tiempo.style.display = "block";
    $btnGrabar.style.display = "none";
    $btnFinalizar.style.display = "inherit";
    grabado = RecordRTC(contenedorStream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
        },
    });
    inicioTiempo();
    grabado.startRecording();
    grabado.camera = contenedorStream;
}

const inicioTiempo = () => {
    let timpoInicio = Date.now();
    intervalo = setInterval(() => {
      let tiempoactual = Date.now();
      let diferencia = tiempoactual - timpoInicio;
      formato(diferencia);
    }, refresf);
  }

  const formato = (tiemporefrest) => {
    const miisegundos = Math.floor((tiemporefrest % 1000) / 10);
    const segundos = Math.floor((tiemporefrest / 1000) % 60);
    const minutos = Math.floor((tiemporefrest / (1000 * 60)) % 60);
    const horas = Math.floor((tiemporefrest / (1000 * 60 * 60)) % 24);
    renderizacion(horas, minutos, segundos, miisegundos);
  }

  const renderizacion = (hh, mm, ss, mss) => {
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;
    mss = mss < 10 ? "0" + mss : mss;
    $tiempo.innerText = `${hh}:${mm}:${ss}`;
  }

  export function finalizarVideo(){
    $btnFinalizar.removeAttribute("style");
    $btnsubirGif.style.display = "inherit";
    $linkRepetir.style.display = "initial";
    $tiempo.style.display = "none";
    try {
        grabado.stopRecording(() => {
        gifBlob = grabado.getBlob();
        grabado.camera.stop();
        grabado.destroy();
        grabado = null;
      });
    } catch (error) {}
    detenerTiempo();
  }

  const detenerTiempo = () => {
    clearInterval(intervalo);
  }

  export async function subirGifs(){
    
    $divExtraCrearGif.style.display = "initial";
    $divVideo.style.display = "none";
    $btnsubirGif.removeAttribute("style");
    $linkRepetir.removeAttribute("style");
    try {
        const formData = new FormData();
        formData.append("file", gifBlob, "myGif.gif");
        const parametros = {
          method: "POST",
          body: formData,
          json: true,
        };
        let respuesta = await conexionSubirGif(parametros);
        idGifCreado = respuesta.data.id;
        urlGifCreado = `https://media.giphy.com/media/${idGifCreado}/giphy.gif`;
        actualizarMensaje();
        guardarGif(idGifCreado);
    } catch (e) {
        console.log(e)
    }
}

const actualizarMensaje = () => {
    $divInformacionGifCreado.style.display = "flex";
    $iconoInfo.className =  "fas fa-check crearGifos-contenedor-grabadora-divExtra-informacion-icono";
    $iconoInfo.style.animation = "none";
    $textoInfo.innerText = "GIFO subido con éxito";
}


export const guardarGif = (gifUrl) => {
    let actualGif = JSON.parse(localStorage.getItem("misGifos")) || [];
    actualGif.push(gifUrl);
    localStorage.setItem("misGifos", JSON.stringify(actualGif));
  };