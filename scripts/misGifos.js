import {conexiongifoXiD} from './conexion.js';
import { expander} from './index.js';
import {descargarGif } from './generales.js';

//Elementos del DOM
const d = document,
$linkMisGif = d.querySelector(".misGif"),
$divFavoritos = d.querySelector(".favoritos"),
$divMisGifos = d.querySelector(".misGifos"),
$principalCover = d.querySelector(".principal-cover"),
$divCrearGifos = d.querySelector(".crearGifos"),
$divTrending = d.querySelector(".trendingGifos"),
$contenedorMisGifos = d.querySelector(".misGifos-gifs-contenedor"),
$divSinContenido = d.querySelector(".misGifos-gifs-sinContenido"),
$infoUsuario = d.querySelector(".divGif-informacion-usuario"),
$infoTitulo = d.querySelector(".divGif-informacion-titulo"),
$divGifCover = d.querySelector(".resultado-gifs-contenedor-cover"),
$divgif = d.querySelector(".divGif"),
$titulo = d.querySelector(".resultado-gifs-titulo"),
$btnVerBuscador = d.getElementById("verMasBuscador"),
$gifsresultados = d.querySelector(".resultado-gifs-contenedor"),
$btnMisGif = d.getElementById("verMasMisGif");


export const misGifos = ()=>{
    $linkMisGif.addEventListener("click", mostrarGifos);
}

export function mostrarGifos(){
    $divFavoritos.style.display = "none";
    $divCrearGifos.style.display = "none";
    $principalCover.style.display = "none";
    $gifsresultados.style.display = "none";
    $btnVerBuscador.style.display = "none";
    $titulo.style.display = "none";
    $divTrending.style.display = "block";
    $btnMisGif.style.display = "none";
    $divMisGifos.style.display = "initial";
    mostrarMisGifos();
}


async function mostrarMisGifos(){
    const misGifos = await traerGifos();
    if (misGifos != undefined) {
        $contenedorMisGifos.innerHTML = "";
        $divSinContenido.style.display = "none";
        $contenedorMisGifos.style.display = "grid";
        misGifos.map((gif, i) => {
          $infoUsuario.innerText = "Yo :3";
          $infoTitulo.innerText = "My Gifo";
          let $divGifCoverClone = $divGifCover.cloneNode(true);
          let $divgifClone = $divgif.cloneNode(true);
          let $imgGifResultado = d.createElement("img");
          $imgGifResultado.id = i;
          $imgGifResultado.src = gif;
          $imgGifResultado.alt = "My gifo";
          $imgGifResultado.user = "Personal";
          $imgGifResultado.style.width = "100%";
          $imgGifResultado.style.height = "100%";
          $divGifCoverClone.appendChild($divgifClone);
          $divGifCoverClone.appendChild($imgGifResultado);
          $contenedorMisGifos.appendChild($divGifCoverClone);
        });
      }
      expander();
    const $btnDescargar = d.querySelectorAll(".fa-arrow-to-bottom");
    for (let btn of $btnDescargar) {
        btn.addEventListener("click", descargarGif)
    }
}

async function traerGifos() {
    let ids = JSON.parse(localStorage.getItem("misGifos")) || [];
    //const ids2 = ids1.splice(4,1);
    if (ids.length) {
      const urls = await Promise.all(ids.map(async (id) => {
          let respuesta = await conexiongifoXiD(id);
          console.log(respuesta.data.images.original.url);
          return respuesta.data.images.original.url;
        })
      );
      return urls;
    }
  }