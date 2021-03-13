import {conexion } from './conexion.js';


// ELementos del DOM
const d = document,
$divgif = d.querySelector(".divGif"),
$divTreinding = d.querySelector(".trendingGifos-contenedor-div"),
$divGifTitulo = d.querySelector(".divGif-informacion-titulo"),
$divGifsTreinding = d.querySelector(".trendingGifos-contenedor-div-gif"),
$divGifUsuario = d.querySelector(".divGif-informacion-usuario");



// cargar los gifs trending 
export const getTrendingGif = async ()=>{
    const respuesta = await conexion("trending", null, 10);
    const gifs = await respuesta.data;
    $divTreinding.removeChild($divTreinding.childNodes[1]);
    gifs.forEach((gif,i)=>{
        $divGifTitulo.innerText = gif.title;
        $divGifUsuario.innerText = gif.username;
        let $divGifsTreindingClone = $divGifsTreinding.cloneNode(true);
        let $divgifclone = $divgif.cloneNode(true);
        let $imgGif = d.createElement("img");
        $imgGif["src"] = gif.images.original.url;
        $imgGif["alt"]= gif.title;
        $imgGif["usuario"] = gif.username;
        $imgGif["id"] = i;
        $divGifsTreindingClone.appendChild($divgifclone);
        $divGifsTreindingClone.appendChild($imgGif);
        $divTreinding.appendChild($divGifsTreindingClone);
    });
}

export const adelante = ()=>{
    const $adelante = d.querySelector(".adelante");
    $adelante.addEventListener('click', ()=>{
        $divTreinding.scrollLeft +=400;
    })
}

export const atras = ()=>{
    const $adelante = d.querySelector(".atras");
    $adelante.addEventListener('click', ()=>{
        $divTreinding.scrollLeft -=400;
    })
}