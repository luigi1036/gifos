// Elementos del DOM
const d = document,
$divExtra = d.querySelector(".trendingGifos-divExtra"),
$buscador = d.querySelector(".principal-div-buscador"),
$iconobuscador = d.querySelector(".principal-div-icono"),
$iconoCorazonExpa = d.querySelector(".trendingGifos-divExtra-contenedor-iconos-favorito"),
$imgDivExtra = d.querySelector(".trendingGifos-divExtra-imagenes-imagen"),
$usuarioExpa = d.querySelector(".trendingGifos-divExtra-contenedor-informacion-usuario"), 
$divInformacion = d.querySelector(".divGif-informacion"),
$tituloExpa = d.querySelector(".trendingGifos-divExtra-contenedor-informacion-titulo"),
$iconoCerrar = d.querySelector(".principal-div-iconoCerrar");

    
//variables
let url;
let resultado;


//focus del buscador   
export function focusBuscador(){
    $buscador.style.marginLeft = "4em";
    $iconobuscador.style.left = "1.1em";
    $iconoCerrar.style.opacity = "1";
}

export function infocusBuscador(){
    $buscador.removeAttribute("style");
    $iconobuscador.removeAttribute("style");
    $iconoCerrar.removeAttribute("style");
}


//tarjeta hover
export function expandirGif(e){
    $imgDivExtra["src"] = e.target.offsetParent.nextElementSibling.currentSrc;
    $iconoCorazonExpa.firstElementChild.className =e.target.offsetParent.childNodes[1].childNodes[1].firstElementChild.className;
    $usuarioExpa.innerText = e.target.offsetParent.lastElementChild.childNodes[1].innerText;
    $tituloExpa.innerText = e.target.offsetParent.lastElementChild.childNodes[3].innerText;
    $divExtra.style.display = "block";
}

export function cerrarDivExpandido(){
    $divExtra.removeAttribute("style");
}

export function expandirGifMobile(e){
    if (screen.width < 1024) {
        const $divGif = d.getElementById(e.target.id);
        $imgDivExtra["src"] = $divGif.src;
        $usuarioExpa.innerText = $divInformacion.childNodes[1].innerText;
        $tituloExpa.innerText = $divInformacion.childNodes[3].innerText;
        $divExtra.style.display = "initial";
    }
}

export async function descargarGif(e){
    if (e.target.offsetParent.nextElementSibling) {
      url = e.target.offsetParent.nextElementSibling.currentSrc;
    }
    if (e.target.offsetParent.childNodes[3].firstElementChild.currentSrc) {
      url = e.target.offsetParent.childNodes[3].firstElementChild.currentSrc;
    }
   
    if (url) {
      let respuesta = await fetch(url);
      resultado = await respuesta.blob();
    } else {
      Resultado = await conexionXId(gifCreatedId);
    }
    const gifUrl = URL.createObjectURL(resultado);
    const guardarGif = d.createElement("a");
    guardarGif.href = gifUrl;
    guardarGif.download = "myGifo.gif";
    guardarGif.style.display = "none";
    d.body.appendChild(guardarGif);
    guardarGif.click();
    d.body.removeChild(guardarGif);
}
