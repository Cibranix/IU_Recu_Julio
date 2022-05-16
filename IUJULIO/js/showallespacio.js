//Función que construye cada línea que se va a rellenar en la tabla de showall
//
// parametros:
// fila : array de atributos de una fila que vienen en el recorsed
//
// devuelve:
// un string con el codigo html con toda una fila del showall
function construyeFilaTabla(fila){

    acciones = construyeAcciones(fila); 

    var filaTabla = '<tr> <td>' + fila.NOMBRE_ESPACIO + 
                '</td> <td>' + fila.DESCRIPCION_ESPACIO + 
                '</td> <td>' + fila.ID_TIPO_ESPACIO.NOMBRE_TIPO_ESPACIO +
                '</td> <td>' + fila.ID_CATEGORIA_ESPACIO.NOMBRE_CATEGORIA_ESPACIO +
                '</td> <td>' + acciones +  
                '</td> </tr>';

    return filaTabla;
}

// funcion que crea una accion de la fila del showall
//
// parametros:
// funcion : la funcion js que se ejecuta al hacer click
// etiqueta: el texto correspondiente al alt de la imagen
// imagen: la imagen que se muestra
// atributosFunciones: la lista de atributos que se pasaran a la funcion 
//
// devuelve:
// un string con el codigo html de una accion para una fila del showall
function celdaAcciones(funcion, etiqueta, imagen, atributosFunciones){

    respuesta = '<a onclick=\"' +
                funcion +
                '(' + 
                atributosFunciones + 
                ')\" ' + 
                '/><img class = \"iconAdd\" src=\"' + 
                imagen + 
                '\"  width=\"30\" height=\"30\" alt=\"' + etiqueta + '\" ></img></a>';

    return respuesta;
}

// funcion que contruye los atributos a pasar a la funcion editar
// parametros:
// fila: array de atributos de una fila que vienen en el recordset
//
// devuelve:
// un string con el valor de los atributos separados por comas
function construyeAtributosFuncionEditar(fila){

    atributostabla = ["'" + fila.ID_ESPACIO + "'","'" + fila.NOMBRE_ESPACIO + "'", "'" + fila.DESCRIPCION_ESPACIO + "'", "'" + fila.ID_TIPO_ESPACIO.ID_TIPO_ESPACIO + "'", "'" + fila.ID_CATEGORIA_ESPACIO.ID_CATEGORIA_ESPACIO + "'"];

    return atributostabla;
}

// funcion que contruye los atributos a pasar a la funcion detalle y borrar
// parametros:
// fila: array de atributos de una fila que vienen en el recordset
//
// devuelve:
// un string con el valor de los atributos separados por comas
function construyeAtributosFuncionDetalleBorrar(fila){

    atributostabla = ["'" + fila.ID_ESPACIO + "'","'" + fila.NOMBRE_ESPACIO + "'", "'" + fila.DESCRIPCION_ESPACIO + "'", "'" + fila.ID_TIPO_ESPACIO.NOMBRE_TIPO_ESPACIO + "'", "'" + fila.ID_CATEGORIA_ESPACIO.NOMBRE_CATEGORIA_ESPACIO + "'"];

    return atributostabla;
}


// funcion que crea la celda de acciones
//
// parametros:
// atributosFunciones: la lista de atributos que se pasaran a la funcion 
//
// devuelve:
// un string con el codigo html de la celda de acciones para una fila del showall

function construyeAcciones(fila){

    acciones = '<div>';
    
    acciones = acciones + celdaAcciones('showDetalleEspacio','Detalle Espacio','./images/icons/detailUser.png', construyeAtributosFuncionDetalleBorrar(fila))
    
    acciones = acciones + celdaAcciones('showEditarEspacio','Editar Espacio','./images/icons/edit.png', construyeAtributosFuncionEditar(fila))
    
    acciones = acciones + celdaAcciones('showEliminarEspacio','Eliminar Espacio','./images/icons/delete.png', construyeAtributosFuncionDetalleBorrar(fila))

    acciones = acciones + '</div>';

    return acciones;
}

function muestrafilas(datosfilas, total, empieza, filas) {

    $("#datosShow").html("");
    for (var i = 0; i < datosfilas.length; i++){
        var tr = construyeFilaTabla(datosfilas[i]);
        $("#datosShow").append(tr);
    }

}

function buscarEspacios(inicio) {

        var idioma = getCookie('lang');

        stringcriterios = getCookie('criteriosbusqueda');

        criterios = stringcriterios.split`,`;
        
        $("#ID_ESPACIO").val(criterios[0]);
        $("#NOMBRE_ESPACIO").val(criterios[1]);
        $("#DESCRIPCION_ESPACIO").val(criterios[2]);
        $("#ID_TIPO_ESPACIO").val(criterios[3]);
        $("#ID_CATEGORIA_ESPACIO").val(criterios[4]);

        insertacampo(document.formgenerico,'controlador', 'ESPACIO');
        insertacampo(document.formgenerico,'action', 'buscar');
        insertacampo(document.formgenerico,'empieza', inicio);
        insertacampo(document.formgenerico,'filaspagina', filaspaginaEspacio);

        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#formgenerico").serialize(),  
        }).done(function( response ) {       
            if (response.ok == true) {
                muestrafilas(response.resource);
                construyePaginacion('buscarEspacios',filaspaginaEspacio, response.total, response.empieza, response.filas);
                setLang(idioma);
            } else { 
                $("#mensajeError").removeClass();
                $("#mensajeError").addClass(response.code);         
                $("#cerrar").attr('onclick', "cerrar('modal', '', '')");
                $("#imagenAviso").attr('src', "images/icons/error.png");
                setLang(idioma);
                $("#modal").attr('style', 'display: block');
            }              
            
            deleteActionController();
        });
}

function getLisEspacios() {

        var idioma = getCookie('lang');

        insertacampo(document.formgenerico,'controlador', 'ESPACIO');
        insertacampo(document.formgenerico,'action', 'buscar');
        insertacampo(document.formgenerico,'empieza', '0');
        insertacampo(document.formgenerico,'filaspagina', filaspaginaEspacio);

        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#formgenerico").serialize(),  
        }).done(function( response ) {       
            if (response.ok == true) {
                muestrafilas(response.resource);
                construyePaginacion('buscarEspacios', filaspaginaEspacio, response.total, response.empieza, response.filas);
                criteriosbusqueda = formateacookiecriterios(response.criteriosbusqueda);
                setCookie('criteriosbusqueda', criteriosbusqueda, 1);
                setLang(idioma);
            } else { 
                $("#mensajeError").removeClass();
                $("#mensajeError").addClass(response.code);         
                $("#cerrar").attr('onclick', "cerrar('modal', '', '')");
                $("#imagenAviso").attr('src', "images/icons/error.png");
                setLang(idioma);
                $("#modal").attr('style', 'display: block');
            }              
            
            deleteActionController();
        });
}

function showDetalleEspacio(ID_ESPACIO, NOMBRE_ESPACIO, DESCRIPCION_ESPACIO, NOMBRE_TIPO_ESPACIO, NOMBRE_CATEGORIA_ESPACIO){
    alert(ID_ESPACIO+'-'+NOMBRE_ESPACIO+'-'+DESCRIPCION_ESPACIO+'-'+NOMBRE_TIPO_ESPACIO+'-'+NOMBRE_CATEGORIA_ESPACIO);
}

function showEditarEspacio(ID_ESPACIO, NOMBRE_ESPACIO, DESCRIPCION_ESPACIO, ID_TIPO_ESPACIO, ID_CATEGORIA_ESPACIO){
    alert(ID_ESPACIO+'-'+NOMBRE_ESPACIO+'-'+DESCRIPCION_ESPACIO+'-'+ID_TIPO_ESPACIO+'-'+ID_CATEGORIA_ESPACIO);
}

function showEliminarEspacio(ID_ESPACIO, NOMBRE_ESPACIO, DESCRIPCION_ESPACIO, NOMBRE_TIPO_ESPACIO, ID_CATEGORIA_ESPACIO){
    alert(ID_ESPACIO+'-'+NOMBRE_ESPACIO+'-'+DESCRIPCION_ESPACIO+'-'+NOMBRE_TIPO_ESPACIO+'-'+NOMBRE_CATEGORIA_ESPACIO);
}


function buscarEspacio(){

    $("#divformgenerico").attr('style', 'display: block');
    $("#formgenerico").attr('action' , 'javascript:getLisEspacios();');
    //cambiar icono submit
    $("#iconoAcciones").attr('src', "./images/icons/search.png");

}

function formateacookiecriterios(criterios){

    lista = criterios.ID_ESPACIO+','+
        criterios.NOMBRE_ESPACIO+','+
        criterios.DESCRIPCION_ESPACIO+','+
        criterios.ID_TIPO_ESPACIO+','+
        criterios.ID_CATEGORIA_ESPACIO+'';

    return lista;

}


