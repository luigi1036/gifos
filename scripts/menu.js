// Elementos del DOM
const d = document,
$body = d.querySelectorAll("[data-body]"),
     $trending = d.querySelectorAll("[data-trending]"),
     $links = d.querySelectorAll("[data-link]"),
     $nav = d.querySelectorAll("[data-nav]"),
     $camara = d.querySelectorAll("[data-camara]"),
     $btns = d.querySelectorAll("[data-buton]"),
     $link = d.querySelectorAll("[data-navbar]"),
     $divPrincipal = d.querySelector(".principal-div"),
     $iconodestok = d.querySelector(".header-contenedorImagen-logo-desktop"),
     $luzcamara = d.querySelector(".crearGifos-grabar-luz-camara"),
     $inputBuscador = d.querySelector(".principal-div-buscador"),
     $iconoDarkDestok = d.querySelector(".header-contenedorImagen-logo-desktop-dark"),
     $icono = d.querySelector(".header-contenedorImagen-logo-mobile"),
     $iconoDark = d.querySelector(".header-contenedorImagen-logo-mobile-dark"),
     $hamburguesa = d.querySelector(".header-icono"),
     $hambuCerrar = d.querySelector(".header-iconoCerrar");


export function mostrarMenuHamburguesa(){
    d.querySelector(".navbar").classList.add("active");
    d.querySelector(".header-icono").classList.add("active");
    d.querySelector(".header-iconoCerrar").classList.add("active");
}

export function cerrarMenuHamburguesa(){
    d.querySelector(".navbar").classList.remove("active");
    d.querySelector(".header-icono").classList.remove("active");
    d.querySelector(".header-iconoCerrar").classList.remove("active");

}

export function modo(){
    theme();
}

function theme(){

     if(screen.width<728){
        $iconoDark.classList.toggle("visible");
        $icono.classList.toggle("display");
     }
     $inputBuscador.classList.toggle("inputColor");
     $divPrincipal.classList.toggle("inputDark");
     $iconoDarkDestok.classList.toggle("visibleDestok");
     $iconodestok.classList.toggle("displayDestok");
     $hambuCerrar.classList.toggle("dark");
     $hamburguesa.classList.toggle("dark");
     $luzcamara.classList.toggle("luzCamaraDark");


    $body.forEach(el=>{
        el.classList.toggle("oscuro");
    });
    $trending.forEach(el=>{
        el.classList.toggle("oscuroTrending");
    });
    $links.forEach(el=>{
        el.classList.toggle("linkdakr");
    });
    $btns.forEach(el=>{
        el.classList.toggle("btnsDark");
    });
    $nav.forEach(el=>{
        el.classList.toggle("navbardark");
    });
    $camara.forEach(el=>{
        el.classList.toggle("display");
    })
}