import {conexion } from './conexion.js';
import { expander} from './index.js';
import {descargarGif} from './generales.js';


//elementos del Dom
const d = document,
// $iconobuscador = d.querySelector(".principal-div-icono"),
$iconoCerrar = d.querySelector(".principal-div-iconoCerrar"),
$btnVerBuscador = d.getElementById("verMasBuscador"),
$divSugerencias =d.querySelector(".principal-div-sugerencias"),
$buscador = d.querySelector(".principal-div-buscador"),
$divgif = d.querySelector(".divGif"),
$titulo = d.querySelector(".resultado-gifs-titulo"), 
$gifsresultados = d.querySelector(".resultado-gifs-contenedor"),
$gifsSinContenido = d.querySelector(".principal-sinContenido"),
$divPrincipalResultados = d.querySelector(".resultado"),
$divGifContenedor = d.querySelector(".resultado-gifs-contenedor"),
$divGifUsuario = d.querySelector(".divGif-informacion-usuario"),
$divGifTitulo = d.querySelector(".divGif-informacion-titulo"),
$divGifCover = d.querySelector(".resultado-gifs-contenedor-cover");

//Variables
let paginacion=0;

export async function sugerencias(e){
    const respuesta = await conexion('search/tags', e.target.value);
    const data = respuesta.data;
    
    if(data.length>0){
        $divSugerencias.innerHTML = "";
        $divSugerencias.style.display = "block";
        for(let i=0;i<data.length;i++){
            let $div = d.createElement("div");
            let $icono = d.createElement("i");
            let $lista = d.createElement("li");
            $div.classList.add("principal-div-sugerencias-resultados");
            $icono.className = "fas fa-search principal-div-sugerencias-resultados-icono";
            $lista.className = "principal-div-sugerencias-resultados-lista";
            $lista.innerHTML=data[i].name;
            $div.appendChild($icono);
            $div.appendChild($lista);
            $divSugerencias.appendChild($div);
            
        }
        
        
        
    }else{
        $divSugerencias.innerHTML = "";
    }
    if(e.keyCode==13){
        e.valor= e.target.value;
        buscadorGifs(e);
    }
    let $listaSugerencia = d.querySelectorAll(".principal-div-sugerencias-resultados-lista");
        for(let lista of  $listaSugerencia){
            lista.addEventListener("click", ()=>{
                $buscador.value = lista.textContent;
                e.valor = lista.textContent;
                buscadorGifs(e)
            } );
        }
}


async function buscadorGifs(e) {
    let clave;
    if(e.valor){
        clave = e.valor;
    }else{
       clave = e.target.textContent;
    }
    if(clave===null){
        $buscador.value;
    }
    $divPrincipalResultados.style.display = "initial";
    $btnVerBuscador.style.display = "inline-block";
    $titulo.textContent = clave.charAt(0).toUpperCase() + clave.slice(1);
    
    let respuesta = await conexion("search", clave, null, paginacion);
    $gifsresultados.innerHTML = "";
    paginacion+=13;
    let data = respuesta.data;
    if(respuesta.pagination.offset>65){
        $btnVerBuscador.style.display = "none";
    }
    if(data.length>0){
        $divSugerencias.removeAttribute("style");
        mostrargifs(data, 12);
    }else{
        $gifsSinContenido.style.display = "block";
        $btnVerBuscador.style.display = "none";
        $titulo.textContent = "";
    }

}

function mostrargifs(data, pag){
    if($divGifCover.childNodes[1]){
        $divGifCover.removeChild($divGifCover.childNodes[1]);
    }
    for(let i=0; i<pag; i++){
        $divGifUsuario.innerText = data[i].username;
        $divGifTitulo.innerText = data[i].title;
        let $divGifCoverClone = $divGifCover.cloneNode(true);
        let $divgifClone = $divgif.cloneNode(true);
        let $imgGifResultado = d.createElement("img");
        $imgGifResultado["src"] = data[i].images.original.url;
        $imgGifResultado.style.height = "12.5em";
        $imgGifResultado.style.width = "100%";
        $divGifCoverClone.appendChild($divgifClone);
        $divGifCoverClone.appendChild($imgGifResultado);
        $divGifContenedor.appendChild($divGifCoverClone);
    }
    expander();
    const $btnDescargar = d.querySelectorAll(".fa-arrow-to-bottom");
    for (let btn of $btnDescargar) {
        btn.addEventListener("click", descargarGif)
    }
    $btnVerBuscador.addEventListener("click", (e) => {
        e.valor = $buscador.value;
        buscadorGifs(e);
    });
}

$iconoCerrar.addEventListener("click", limpiar);

function limpiar(e){
    $buscador.value = "";
    $divSugerencias.style.display = "none";
}