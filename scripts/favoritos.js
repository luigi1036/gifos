import {descargarGif} from './generales.js';
import { expander} from './index.js';


//Variables 
let url;


//Elementos del DOM
const d = document,
$divgif = d.querySelector(".divGif"),
$divGifsTreinding = d.querySelector(".trendingGifos-contenedor-div-gif"),
$divFavoritos = d.querySelector(".favoritos"),
$divMisGifos = d.querySelector(".misGifos"),
$principalCover = d.querySelector(".principal-cover"),
$divTrending = d.querySelector(".trendingGifos"),
$btnFavoritos = d.getElementById("verMasFavoritos"),
$titulo = d.querySelector(".resultado-gifs-titulo"),
$btnVerBuscador = d.getElementById("verMasBuscador"),
$gifsresultados = d.querySelector(".resultado-gifs-contenedor"),
$divFavoritoContenedor = d.querySelector(".favoritos-gifs-contenedor"),
$divfavoritoSinContenido = d.querySelector(".favoritos-gifs-sinContenido"),
$divGifTitulo = d.querySelector(".divGif-informacion-titulo"),
$divGifUsuario = d.querySelector(".divGif-informacion-usuario"),
$btnMisGif = d.getElementById("verMasMisGif");




export function mostrarFavoritos(){
    $divMisGifos.style.display = "none";
    $principalCover.style.display = "none";
    $btnFavoritos.style.display = "none";
    $divTrending.style.display = "block";
    $titulo.style.display = "none";
    $btnVerBuscador.style.display = "none";
    $gifsresultados.style.display = "none";
    $btnMisGif.style.display = "none";
    $divFavoritos.style.display = "initial";
    mostrarGifsFavoritos();
}

export async function mostrarGifsFavoritos(){
    let gifsFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (gifsFavoritos.length) {
        $divFavoritoContenedor.innerHTML = "";
        $divfavoritoSinContenido.style.display = "none";
        $divFavoritoContenedor.style.display = "grid";
        gifsFavoritos.map((gif) => {
            $divGifTitulo.innerText = gif.titulo;
            $divGifUsuario.innerText = gif.usuario;
            let $divGifsTreindingClone = $divGifsTreinding.cloneNode(true);
            let $divgifclone = $divgif.cloneNode(true);
            $divgifclone.childNodes[1].firstElementChild.firstElementChild.className ="fas fa-heart";
            let $imgGif = d.createElement("img");
            $imgGif.src = gif.src;
            $imgGif.alt = "Gifs Favoritos";
            $imgGif.user = "";
            $imgGif.style.width = "100%";
            $imgGif.style.height = "100%";
            $divGifsTreindingClone.appendChild($divgifclone);
            $divGifsTreindingClone.appendChild($imgGif);
            $divFavoritoContenedor.appendChild($divGifsTreindingClone);
        });
    }
    const $btnDescargar = d.querySelectorAll(".fa-arrow-to-bottom");
    for (let btn of $btnDescargar) {
        btn.addEventListener("click", descargarGif)
    }
    const $btnExpandir = d.querySelectorAll(".fa-expand-alt");
    for (let btn of $btnExpandir) {
        btn.addEventListener("click", expander)
    }
}

export async function agregarFavoritos(e){
    if (e.target.offsetParent.nextElementSibling) {
        url = e.target.offsetParent.nextElementSibling.currentSrc;
    }
    if (e.target.offsetParent.childNodes[3].firstElementChild.currentSrc) {
        url = e.target.offsetParent.childNodes[3].firstElementChild.currentSrc;
    }

    e.target.className = "fas fa-heart";
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const favoritesInformation = {
        usuario: e.target.offsetParent.lastElementChild.children[0].innerText,
        titulo: e.target.offsetParent.lastElementChild.children[1].innerText,
        src: url
    };
    favoritos.unshift(favoritesInformation);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));


}