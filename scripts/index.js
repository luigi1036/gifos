import {expandirGif, cerrarDivExpandido, expandirGifMobile} from './generales.js';
import { focusBuscador, infocusBuscador, descargarGif} from './generales.js';
import { sugerencias} from './buscador.js';
import { mostrarMenuHamburguesa, cerrarMenuHamburguesa, modo} from './menu.js';
import {agregarFavoritos, mostrarFavoritos } from './favoritos.js';
import { mostrarCrearGifos, comenzarGif, grabarGif, finalizarVideo, subirGifs} from './crearGifos.js';



//Elmentos del DOM
const d = document,
    $linkFavoritos = d.querySelector(".favorito"),
    $linkModo = d.querySelector(".modo"),
    $linkCrearGifos = d.querySelector(".crearGif"),
    $buscador = d.querySelector(".principal-div-buscador"),
    //$divExtra = d.querySelector(".trendingGifos-divExtra"),
    $btnComenzar = d.querySelector(".comenzar"),
    $btnGrabar = d.querySelector(".grabar"),
    $btnFinalizar = d.querySelector(".finalizar"),
    $btnsubirGif =d.querySelector(".subirGif"),
    $linkRepetir = d.querySelector(".crearGifos-contenedor-botones-repetir");
  

//Menu hamburguesa
export const mostrarMenu = ()=>{
    const icono = d.querySelector(".icono");
    icono.addEventListener('click', mostrarMenuHamburguesa);
}

export const modoOscuro = ()=>{
    $linkModo.addEventListener("click", modo)
    
}

export const cerrarMenu = ()=>{
    const iconoCerrar = d.querySelector(".iconoCerrar");
    iconoCerrar.addEventListener('click', cerrarMenuHamburguesa);
}


// Buscador
export const focus = ()=>{
    $buscador.addEventListener('focus', focusBuscador);
}

export const infocus = ()=>{
    $buscador.addEventListener('blur', infocusBuscador)
}

export const busqueda =(event)=>{
    $buscador.addEventListener('keyup', (e)=>{
        sugerencias(e);
    } );
}


//tarjeta hover
export const expander = ()=>{
    const $btnexpand = d.querySelectorAll(".fa-expand-alt");
   for(let icono of $btnexpand){
       icono.addEventListener("click", expandirGif);
   }
}   

export const cerrarExpander = () =>{
    const $btnCerrarExpa = d.querySelector(".divExtrar-cerrar");
    $btnCerrarExpa.addEventListener("click", cerrarDivExpandido);
}

export const expanderMobile = ()=>{
    const $divMobile = d.querySelectorAll(".trendingGifos-contenedor-div-gif");
    for (let div of $divMobile) {
        div.addEventListener("click", expandirGifMobile);
      }
}

export const descargar = async ()=>{
    const $btnDescargar = d.querySelectorAll(".fa-arrow-to-bottom");
    for (let icono of $btnDescargar) {
        icono.addEventListener("click", descargarGif);
      }
}

export const agregarFavori = ()=>{
   const $btnCorazon = d.querySelectorAll(".fa-heart");
    for (let icono of $btnCorazon) {
        icono.addEventListener("click", agregarFavoritos);
      }
}

//favoritos
export const favoritos = ()=>{
    $linkFavoritos.addEventListener("click", mostrarFavoritos);
}

//crear Gifos
export const crearGifos = ()=>{
    $linkCrearGifos.addEventListener("click", mostrarCrearGifos);
}

export const repetirVideo = ()=>{
    $linkRepetir.addEventListener("click", comenzarGif);
  }

export const comenzar = ()=>{
    $btnComenzar.addEventListener("click", comenzarGif);
}


export const grabar = ()=>{
    $btnGrabar.addEventListener("click", grabarGif);
}

export const finalizar = () =>{
    $btnFinalizar.addEventListener("click", finalizarVideo);
}
  

export const subirGif = ()=>{
    $btnsubirGif.addEventListener("click", subirGifs);
}
