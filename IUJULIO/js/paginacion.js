//Nombre alumno: Cibrán Cores Cabaleiro
//DNI alumno: 54506586J

var listaPag = new Array(); //Array de las páginas obtenidas en cada busqueda o showall

//funcion --> es el string con el nombre de la función de búsqueda("buscarEspacios")
//filasporpagina --> es la constante del tamaño de páginas para esta entidad
//total --> número de filas resultado de la búsqueda por los criterios
//empieza --> fila en la que empieza el resultado obtenido de la búsqueda
//filas --> numero de filas que tiene el resultado obtenido en la búsqueda
function construyePaginacion(funcion, filasporpagina, total, empieza, filas) {
  var primeraFila = parseInt(empieza); //Transformamos las variables de la función en enteros
  var totalFilas = parseInt(total);    //para evitar problemas de distintos tipos de datos.
  var filasPagina = parseInt(filas);

  if (total == 0) { //Si hay 0 filas en la busqueda ocultamos el item paginación
    $("#itemPaginacion").hide();  // hide itemPaginacion -- función de jQuery equivalente a display : "none" de js puro
    actualizarDetallesPag(totalFilas, primeraFila, filasPagina); //componente id "paginación"

  } else {          //Si hay filas significa que tenemos una o más páginas y por ende mostramos el itemPaginación
    $("#itemPaginacion").show();  // show itemPaginacion

    actualizarDetallesPag(totalFilas, primeraFila, filasPagina); //actualizamos el componente id "paginación"

    listaPag = []; //Reseteamos lista de páginas cada vez que se hace una nueva busqueda

    crearListaPaginas(funcion, totalFilas, filasporpagina, listaPag);//Crear la lista de páginas

    actualizarItemPaginacion(listaPag, primeraFila, totalFilas, filasporpagina); //Actualizar el componente con id "itemPaginación"
  }
}

//Modifica el apartado "primeraFila a ultimaFila de total" ej. "1 a 5 de 101"
function actualizarDetallesPag(total, primeraFila, filas) {
  var ultimaFila = primeraFila + filas;
  if (total > 0) {
    primeraFila++; //Si la busqueda tiene elementos añadimos 1 para que la primera fila sea "1 a x de y" en vez de "0 a x de y"
  }
  let paginacion = primeraFila + " a " + ultimaFila + " de " + total;
  $("#paginacion").html(paginacion);
}

//Crea una lista con todas las páginas resultantes de la búsqueda o showall
function crearListaPaginas(funcion, totalFilas, filasporpagina, listaPag) {
  var totalPag = Math.ceil(totalFilas / filasporpagina);

  for (var i = 1; i <= totalPag; i++) {
    var num = (i-1) * filasporpagina;
    var pagina = '<a class="page-link" href="#" onclick="' + 
                  funcion + '(' + num +');">' + i +"</a>";
    listaPag.push(pagina);
  }
}

function actualizarItemPaginacion(listaPag, primeraFila, totalFilas, filasporpagina) {
  var pagActual = Math.ceil(primeraFila / filasporpagina) + 1;
  var total3Pag = Math.ceil(totalFilas / (3*filasporpagina));
  var grupo3Pag = Math.ceil(pagActual/3);

  //Anterior
  if (grupo3Pag == 1) {
    $("#anterior").addClass('disabled');
    $("#anterior").attr('onclick', "");
  } else {
    $("#anterior").removeClass('navegacion');
    $("#anterior").removeClass('disabled');
    var operacion = 'disminuir(listaPag, ' + (grupo3Pag-1) + ', ' + total3Pag + ', ' + pagActual + ')';
    $("#anterior").attr('onclick', operacion);
  }

  //Primera Pag
  $("#primerhuecopagina").html(listaPag[(0+(3*(grupo3Pag-1)))]);
  if (pagActual == (1+(3*(grupo3Pag-1)))) {
    $("#primerhuecopagina").addClass('navegacion');
    var pagina = '<a class="page-link" href="#" onclick="">' + pagActual +"</a>";
    $("#primerhuecopagina").html(pagina);
  } else {
    $("#primerhuecopagina").removeClass('navegacion');
  }

  //Segunda Pag
  if ((2+3*(grupo3Pag-1)) > listaPag.length) {
    $("#segundohuecopagina").hide();
  } else {
    $("#segundohuecopagina").show();
    $("#segundohuecopagina").html(listaPag[(1+3*(grupo3Pag-1))]);
    if (pagActual == (2+(3*(grupo3Pag-1)))) {
      $("#segundohuecopagina").addClass('navegacion');
      var pagina = '<a class="page-link" href="#" onclick="">' + pagActual +"</a>";
      $("#segundohuecopagina").html(pagina);
    } else {
      $("#segundohuecopagina").removeClass('navegacion');
    }
  }
  
  //Tercera Pag
  if ((3+3*(grupo3Pag-1)) > listaPag.length) {
    $("#tercerhuecopagina").hide();
  } else {
    $("#tercerhuecopagina").show();
    $("#tercerhuecopagina").html(listaPag[(2+3*(grupo3Pag-1))]);
    if (pagActual == (3+(3*(grupo3Pag-1)))) {
      $("#tercerhuecopagina").addClass('navegacion');
      var pagina = '<a class="page-link" href="#" onclick="">' + pagActual +"</a>";
      $("#tercerhuecopagina").html(pagina);
    } else {
      $("#tercerhuecopagina").removeClass('navegacion');
    }
  }

  //Siguiente
  if (grupo3Pag == total3Pag) {
    $("#siguiente").addClass('disabled');
    $("#siguiente").attr('onclick', "");
  } else {
    $("#siguiente").removeClass('navegacion');
    $("#siguiente").removeClass('disabled');
    var operacion = 'aumentar(listaPag, ' + (grupo3Pag+1) + ', ' + total3Pag + ', ' + pagActual + ')';
    $("#siguiente").attr('onclick', operacion);
  }
}

function aumentar(listaPag, grupo, totalGrupos, pagActual) {
  //Anterior
  $("#anterior").removeClass('navegacion');
  $("#anterior").removeClass('disabled');
  var operacion = 'disminuir(listaPag, ' + (grupo-1) + ', ' + totalGrupos + ', ' + pagActual + ')';
  $("#anterior").attr('onclick', operacion);

  //Primera Pag
  $("#primerhuecopagina").html(listaPag[(0+(3*(grupo-1)))]);
  if (pagActual == (1+(3*(grupo-1)))) {
    $("#primerhuecopagina").addClass('navegacion');
    var pagina = '<a class="page-link" href="#" onclick="">' + pagActual +"</a>";
    $("#primerhuecopagina").html(pagina);
  } else {
    $("#primerhuecopagina").removeClass('navegacion');
  }

  //Segunda Pag
  if ((2+3*(grupo-1)) > listaPag.length) {
    $("#segundohuecopagina").hide();
  } else {
    $("#segundohuecopagina").show();
    $("#segundohuecopagina").html(listaPag[(1+3*(grupo-1))]);
    if (pagActual == (2+(3*(grupo-1)))) {
      $("#segundohuecopagina").addClass('navegacion');
      var pagina = '<a class="page-link" href="#" onclick="">' + pagActual +"</a>";
      $("#segundohuecopagina").html(pagina);
    } else {
      $("#segundohuecopagina").removeClass('navegacion');
    }
  }
  
  //Tercera Pag
  if ((3+3*(grupo-1)) > listaPag.length) {
    $("#tercerhuecopagina").hide();
  } else {
    $("#tercerhuecopagina").show();
    $("#tercerhuecopagina").html(listaPag[(2+3*(grupo-1))]);
    if (pagActual == (3+(3*(grupo-1)))) {
      $("#tercerhuecopagina").addClass('navegacion');
      var pagina = '<a class="page-link" href="#" onclick="">' + pagActual +"</a>";
      $("#tercerhuecopagina").html(pagina);
    } else {
      $("#tercerhuecopagina").removeClass('navegacion');
    }
  }

  //Siguiente
  if (grupo == totalGrupos) {
    $("#siguiente").addClass('disabled');
    $("#siguiente").attr('onclick', "");
  } else {
    $("#siguiente").removeClass('navegacion');
    $("#siguiente").removeClass('disabled');
    var operacion = 'aumentar(listaPag, ' + (grupo+1) + ', ' + totalGrupos + ', ' + pagActual +  ')';
    $("#siguiente").attr('onclick', operacion);
  }
}

function disminuir(listaPag, grupo, totalGrupos, pagActual) {
  //Anterior
  if (grupo == 1) {
    $("#anterior").addClass('disabled');
    $("#anterior").attr('onclick', "");
  } else {
    $("#anterior").removeClass('navegacion');
    $("#anterior").removeClass('disabled');
    var operacion = 'disminuir(listaPag, ' + (grupo-1) + ', ' + totalGrupos + ', ' + pagActual + ')';
    $("#anterior").attr('onclick', operacion);
  }

  //Primera Pag
  $("#primerhuecopagina").html(listaPag[(0+(3*(grupo-1)))]);
  if (pagActual == (1+(3*(grupo-1)))) {
    $("#primerhuecopagina").addClass('navegacion');
    var pagina = '<a class="page-link" href="#" onclick="">' + pagActual +"</a>";
    $("#primerhuecopagina").html(pagina);
  } else {
    $("#primerhuecopagina").removeClass('navegacion');
  }

  //Segunda Pag
  if ((2+3*(grupo-1)) > listaPag.length) {
    $("#segundohuecopagina").hide();
  } else {
    $("#segundohuecopagina").show();
    $("#segundohuecopagina").html(listaPag[(1+3*(grupo-1))]);
    if (pagActual == (2+(3*(grupo-1)))) {
      $("#segundohuecopagina").addClass('navegacion');
      var pagina = '<a class="page-link" href="#" onclick="">' + pagActual +"</a>";
      $("#segundohuecopagina").html(pagina);
    } else {
      $("#segundohuecopagina").removeClass('navegacion');
    }
  }
  
  //Tercera Pag
  if ((3+3*(grupo-1)) > listaPag.length) {
    $("#tercerhuecopagina").hide();
  } else {
    $("#tercerhuecopagina").show();
    $("#tercerhuecopagina").html(listaPag[(2+3*(grupo-1))]);
    if (pagActual == (3+(3*(grupo-1)))) {
      $("#tercerhuecopagina").addClass('navegacion');
      var pagina = '<a class="page-link" href="#" onclick="">' + pagActual +"</a>";
      $("#tercerhuecopagina").html(pagina);
    } else {
      $("#tercerhuecopagina").removeClass('navegacion');
    }
  }

  //Siguiente
  $("#siguiente").removeClass('navegacion');
  $("#siguiente").removeClass('disabled');
  var operacion = 'aumentar(listaPag, ' + (grupo+1) + ', ' + totalGrupos + ', ' + pagActual + ')';
  $("#siguiente").attr('onclick', operacion);
}
