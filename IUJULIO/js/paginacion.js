//Nombre alumno: Cibrán Cores Cabaleiro
//DNI alumno: 54506586J
function construyePaginacion(funcion, filasporpagina, total, empieza, filas) {
    if (total == 0) { //Si hay 0 en la busqueda ocultamos el item paginación
        $("#itemPaginacion").hide();  // hide itemPaginacion
        actualizarDetallesPag(totalFilas, primeraFila, filasPagina); //componente id "paginación"
    
      } else {
        $("#itemPaginacion").show();  // show itemPaginacion
        actualizarDetallesPag(totalFilas, primeraFila, filasPagina);//componente id "paginación"
    }
}

function actualizarDetallesPag(total, primeraFila, filas) {
  var ultimaFila = primeraFila + filas;
  if (total > 0) {
    primeraFila++;
  }
  let paginacion = primeraFila + " a " + ultimaFila + " de " + total;
  $("#paginacion").html(paginacion);
}
