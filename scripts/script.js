import { getTrendingGif, adelante, atras } from './trending.js';
import {
    mostrarMenu, expander, cerrarMenu, focus, infocus, busqueda, cerrarExpander, expanderMobile, descargar, agregarFavori,
    comenzar, grabar, finalizar, repetirVideo, subirGif, modoOscuro } from './index.js';
import { favoritos, crearGifos } from './index.js';
import { misGifos } from './misGifos.js';

async function inicio() {
    await getTrendingGif();
    adelante();
    atras();
    expander();
    expanderMobile();
    cerrarExpander();
    descargar();
    agregarFavori();

}

//menu Hamburguesa
mostrarMenu();
cerrarMenu();

favoritos();
misGifos();
crearGifos();

comenzar();
grabar();
finalizar();
repetirVideo();
subirGif();

//Buscador
focus();
infocus();
busqueda();

modoOscuro();


inicio();

