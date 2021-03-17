const URL = "https://api.giphy.com/v1/gifs/";
const API_KEY = "rsNq1VjElnQ7kv1DybuqiaMayUtFRqtZ";
const URL_SUBIRGIF = "https://upload.giphy.com/v1/gifs";
const URL_GETBYID = "https://media.giphy.com/media/";


export const conexion = async (ruta, clave, limite, offset) => {
  if(limite===undefined){
    limite=20;
  }
  try {
    let respuesta = await fetch(`${URL}${ruta}?api_key=${API_KEY}&q=${clave}&limit=${limite}&offset=${offset}`);
    const data = await respuesta.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const conexionSubirGif = async (parametros) => {
  try {
    let respuesta = await fetch( `${URL_SUBIRGIF}?api_key=${API_KEY}&tags=MiGuifo`,parametros );
    let data = await respuesta.json();
    return data;
  } catch (e) {
    console.log(e)
  }
};

export const conexionXId = async (parametros) => {
  try {
    let respuesta = await fetch(`${URL_GETBYID}${parametros}/giphy.gif`);
    let data = await respuesta.blob();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const conexiongifoXiD = async (id) => {
  console.log(id)
  try {
    let respuesta = await fetch(`${URL}${id}?api_key=${API_KEY}`);
    let data = await respuesta.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
