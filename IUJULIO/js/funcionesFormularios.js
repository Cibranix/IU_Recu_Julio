/**Función para crear un formulario oculto*/
function crearformoculto(name, action){

	if ( $("#" + name).length == 0) {

		var formu = document.createElement('form');
		document.body.appendChild(formu);
	    formu.name = name;
	    formu.action = action; 
	    formu.id = name;  
	    formu.style.display = "none";

	}
	
}

/**Función para insertar campos en el formulario a mayores*/
function insertacampo(form, name, value){
	
	formulario = form;
	var input = document.createElement('input');
	input.type = 'hidden';
	input.name = name;
    input.id = name;
	input.value = value;
	input.className = name;
	formulario.appendChild(input);

}

/**Función para insertar campos en el formulario visible*/
function insertacampovisible(form, name, value){
    
    formulario = form;
    var input = document.createElement('input');
    input.name = name;
    input.id = name;
    input.value = value;
    input.className = name;
    formulario.appendChild(input);

}

/**Función para eliminar campos del formulario*/
function eliminarcampo(name) {

	$("." + name).remove();	

}

/**Función que resetear los valores del formulario*/
function resetearFormulario(idFormulario, idElementoList) {

	document.getElementById(idFormulario).reset();

	idElementoList.forEach( function (idElemento) {
		document.getElementById(idElemento).style.borderColor = "#c8c8c8";
	});	

}

/**Función añade al formulario genérico con los campos de action y controlador*/
function addActionControler(form, action, controller) {

    var accion = "";

    switch(action) {
        case 'add' :
            accion = 'insertar';
        break; 
        case 'delete' :
            accion = 'borrar';
        break; 
        case 'edit' :
            accion = 'editar';
        break; 
        case 'search' :
            accion = 'buscar';
        break;
        case 'disconect' :
        	accion = 'desconectar';
        break;
        case 'auth' :
        	accion = 'estaAutenticado';
        break;
        case 'login' :
        	accion = 'login';
        break;
        case 'registrar' :
        	accion = 'registrar';
        break;
        case 'test' :
        	accion = 'test';
        break;
    }

    insertacampo(form,'action', accion); 
    insertacampo(form,'controlador', controller);

}

/**Función que elimina del formulario accion y controlado*/
function deleteActionController() {

    eliminarcampo('action');
    eliminarcampo('controlador');

}

function includeCabecera() {

	includeMenuIdioma();
	//includeUserDesconectar();
}

/**Función para incluir el menú de idioma*/
function includeUserDesconectar() {

	$("#UserDesconectar").html("");

	var UserDesconectar = '<div class="UserDesconectar">'+
							'<a onclick="desconectar();">Desconectar</a>'+
                			'<label id="usuario"></label>'+
                			'</div>';

	$("#UserDesconectar").append(UserDesconectar);
}

/**Función para incluir el menú de idioma*/
function includeMenuIdioma() {

	$("#menuIdioma").html("");

	var menuIdioma = '<div class="menuIdioma">' + 
					'<a onclick="setLang(\'ES\')" class="es" id="es">ES</a>' + 
					'<a onclick="setLang(\'EN\')" class="en" id="en">EN</a>' +
					'<a onclick="setLang(\'GA\')" class="ga" id="ga">GA</a>' +
					'</div>';

	$("#menuIdioma").append(menuIdioma);
}

/**Función que aplica los cambios necesarios cuando la respuesta de las petición Ajax ha sido OK*/
function respuestaOKAjax() {

    $("#imagenAviso").attr('src', "images/icons/ok-icon.png");
    $("#cerrar").attr('onclick', "cerrar('modal', '', '')");
    $("#formularioAcciones").attr('style', 'display: none');
    $("#mensajeError").attr('style', 'color: #005200; margin-top: 5%; margin-left: 17%');

}

/**Función que aplica los cambios necesarios cuando la respuesta de las petición Ajax ha sido KO*/
function respuestaKOAjax(opcion) {

    $("#cerrar").attr('onclick', "cerrar('modal', '" + opcion +"', '')");
    $("#imagenAviso").attr('src', "images/icons/error.png");  
    $("#mensajeError").attr('style', 'color: #ff0000; margin-top: 5%; margin-left: 17%');

}

/**Función que actualiza el mensaje con el código que nos llega de la petición Ajax y aplica estilos*/
function actualizaMensajesRespuestAjax(codigo) {

    $("#mensajeError").removeClass();
    $("#mensajeError").addClass(codigo); 
    $("#imagenAviso").attr('style', 'width: 16%; margin-top: 0');
    $("#modal").attr('style', 'background-color: rgba(1, 1, 1, 0.5); z-index: 1030; display: block'); 

}

//Función para agregar opciones a un <select>.
function addOptions(domElement, array) {
    var selector = document.getElementById(domElement);
    //Recorremos el array.
    longitud = array.length;

    for (var i=0; i < longitud; i++) {
        var opcion = document.createElement("option");
        opcion.value = array[i]['id_grupo'];
        opcion.text = array[i]['nombre_grupo'];
        selector.add(opcion);
    }
}

//Función para eliminar todas las opciones a un <select>.
function deleteoptionsSelect(domElement){

    var selector = document.getElementById(domElement);

    longitud = selector.length;

    for (var i=longitud; i >= 0; i--) {
        selector.remove(i);
    }

}

/**Función que deshabilita los campos de un formulario*/
function deshabilitaCampos(idElementoList) {

    idElementoList.forEach( function (idElemento) {
        $("#"+ idElemento).attr("disabled", true); 
    }); 

}

/**Función que habilita los campos de un formulario*/
function habilitaCampos(idElementoList) {

    idElementoList.forEach( function (idElemento) {
        $("#"+ idElemento).attr("disabled", false); 
    }); 

}

/**Función para cambiar valores del formulario*/
function cambiarFormulario(tituloForm, action, onsubmit) {

    $('#formularioAcciones').attr('style', 'display: block');
    $("#cerrarForm").attr('onclick', "cerrar('formularioAcciones', '', '')");
    $("#tituloForms").addClass(tituloForm);

    if (action != '') {
        $("#formularioGenerico").attr('action', action);
    }

    if (onsubmit != '') {
        $("#formularioGenerico").attr('onsubmit', onsubmit);
    }
    
}