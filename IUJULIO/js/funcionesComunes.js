/**Función que valida el usuario*/
function comprobarUser() {

	document.getElementById("txtUsuario").style.borderWidth = "2px";
		
	if (validaNoVacio("txtUsuario", "errorFormatoUser", "usuarioLogin") && comprobarLetrasNumeros("txtUsuario", 15, 3, "errorFormatoUser", "usuarioLogin")) {
		validacionOK("txtUsuario", "errorFormatoUser");
		return true;
	} else {
		validacionKO("txtUsuario", "errorFormatoUser");		
		return false;
	}

}

/**Función que valida el dni*/
function comprobarDNI() {

	document.getElementById("txtdniusuario").style.borderWidth = "2px";
		
	if (validaNoVacio("txtdniUsuario", "errorFormatoUser", "dni_usuario") && validateDNI("txtdniUsuario", "errorFormatoUser", "dni_usuario")) {
		validacionOK("txtdniusuario", "errorFormatoUser");
		return true;
	} else {
		validacionKO("txtdnisuario", "errorFormatoUser");		
		return false;
	}

}

/**Función que valida la contraseña*/
function comprobarPass() {

	document.getElementById("txtPassword").style.borderWidth = "2px";
	
	if (validaNoVacio("txtPassword", "errorFormatoPass", "passLogin") && comprobarLetrasNumeros("txtPassword", 16, 3, "errorFormatoPass", "passLogin")) {
		validacionOK("txtPassword", "errorFormatoPass");
		return true;
	} else {
		validacionKO("txtPassword", "errorFormatoPass");		
		return false;
	}

}

/**Función que valida si un campo está vacío*/
function validaNoVacio(idElemento, idElementoError, campo) {


	var codigo = "";

  	var valor = document.getElementById(idElemento).value;
  	var nombre = document.getElementById(idElemento).name;
  	var longitud = document.getElementById(idElemento).value.length;

  	if ((valor == null) || (longitud == 0)) { 		
  		switch(campo) {
	    	case 'usuarioLogin' : 
		  		codigo = "02110";
			break;
			case 'passLogin' :
				codigo = "02113"
			break;
			case 'nombreRegistro' :
				codigo = "02116"
			break;
			case 'emailRegistro' :
				codigo = "02119"
			break;
		}
		addCodeError(idElementoError, codigo);
	    return false;
	} else {
	    return true;
	 }

}

// Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).
// Acepta NIEs (Extranjeros con X, Y o Z al principio)

function validateDNI(dnivalue, idElementoError, campo) {
	
	var resultado = true;
	var codigo = '';
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = document.getElementById(idElemento).value;
    dni = dni.toUpperCase();

    if(expresion_regular_dni.test(dni) === true){
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        let = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        if (letra != let) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            resultado = false;
            codigo = 'letraNIFError';
            addCodeError(idElementoError, codigo);
        }else{
            //alert('Dni correcto');
            resultado = true;
        }
    }else{
        //alert('Dni erroneo, formato no válido');
        resultado = false;
        codigo = 'formatoNIFError';
        addCodeError(idElementoError, codigo);
    }
    return resultado;
}


function comprobarLetrasNumeros(idElemento, sizeMax, sizeMin, idElementoError, campo) {

	var codigo = "";

	var valor = document.getElementById(idElemento).value;
  	var nombre = document.getElementById(idElemento).name;
  	var longitud = document.getElementById(idElemento).value.length;
 
	if (longitud > sizeMax) {    	
  		switch(campo) {
	    	case 'usuarioLogin' : 
		  		codigo = "02111";
			break;
			case 'passLogin' :
				codigo = "02114"
			break;
		}
		addCodeError(idElementoError, codigo);
    	return false;
	} else if (longitud < sizeMin) {
		switch(campo) {
	    	case 'usuarioLogin' : 
		  		codigo = "02110";
			break;
			case 'passLogin' :
				codigo = "02113"
			break;
		}
		addCodeError(idElementoError, codigo);
    	return false;
	}
	  
 	var patron = /^[a-zA-Z0-9\u00f1\u00d1]+$/;
		
	if (!patron.test(valor)) { 
    	switch(campo) {
	    	case 'usuarioLogin' : 
		  		codigo = "02112";
			break;
			case 'passLogin' :
				codigo = "02115"
			break;
		}
		addCodeError(idElementoError, codigo);
    	return false;
  	}

	return true;  

}

/**Función para encriptar la pass en md5*/
function encriptar(idElemento){

	document.getElementById(idElemento).value = hex_md5(document.getElementById(idElemento).value);
  	return true;

}

/**Función que no muestra mensaje de error y colorea el borde del input del formulario de verde*/
function validacionOK(idElemento, idElementoError) {

	document.getElementById(idElementoError).style.display = "none";
	document.getElementById(idElemento).style.borderColor = "#00e600";

}

/**Función que muestra el mensaje de error y colorea el borde del input del formulario de rojo*/
function validacionKO(idElemento, idElementoError) { 

	document.getElementById(idElementoError).setAttribute('style', "");
	document.getElementById(idElemento).style.borderColor = "#ff0000";

}

/**Función crea el formulario con los campos de action y controlador*/
function validaAutenticado() {

    crearformoculto('formularioAutenticacion', 'javascript:estaAutenticado()');

    addActionControler(document.formularioAutenticacion, "auth", "AUTH");

    document.formularioAutenticacion.submit();

}

/**Función para realizar la petición de validar si el usuario está autenticado*/
function estaAutenticado() {

    var idioma = getCookie('lang');
    var idSession = getCookie('sessionId');

    if (idSession == null){
    	errorAutenticado("inicio", idioma);
    } else {

	    insertacampo(document.formularioAutenticacion,'ID_SESSION', idSession);

	    $.ajax({
	        method: "POST",
	        url: urlPeticionesAjax,
	        data: $("#formularioAutenticacion").serialize(),  
	    }).done(function( response ) {       
	        if (response.ok == true) {
	            document.getElementById("usuario").innerHTML = response.resource[0].LOGIN_USUARIO;
	        } else { 
	           errorAutenticado(response.code, idioma);
	        }

	        deleteActionController();              
	    });
	}

}

/*Función que muestra el error de acceso por no estar autenticado**/
function errorAutenticado(codigoResponse, idioma){
	$("#mensajeError").removeClass();
    $("#mensajeError").addClass(codigoResponse);   
    $("#cerrar").attr('onclick', "cerrar('modal', 'login.html', '')");
    $("#imagenAviso").attr('src', "images/icons/prohibido.png");      
    setLang(idioma);
    document.getElementById("modal").style.display = "block";
}

/**Función crea el formulario con los campos de action y controlador*/

function desconectar() {

    crearformoculto('formularioDesconectar', 'javascript:desconecta()');

    addActionControler(document.formularioDesconectar, "disconect", "AUTH");
    
    document.formularioDesconectar.submit();

}

/**Función para realizar la petición para desconectar al usuario*/
function desconecta() {

	var idioma = getCookie('lang');
	var idSession = getCookie('sessionId');

    if (idSession == null){
    	errorAutenticado("02109", idioma);
    } else {
    
	    insertacampo(document.formularioDesconectar,'ID_SESSION', idSession);

	    $.ajax({
	        method: "POST",
	        url: urlPeticionesAjax,
	        data: $("#formularioDesconectar").serialize(),  
	    }).done(function( response ) {       
	        if (response.ok == true) {
	            window.location.href = 'login.html';
	       }             
	    });
	}
    
}



/**Función para añadir los mensajes de error*/
function addCodeError(idElementoError, codigo) {

	var idioma = getCookie('lang');

	$("#" + idElementoError).removeClass();
	$("#" + idElementoError).addClass(codigo);
	
	setLang(idioma);

}

/**Función que cierra la ventana modal*/
function cerrar(idElemento, accion, operacion){

	var metodoEjecutar = operacion;

	document.getElementById(idElemento).style.display = "none";

	/*if (accion != '' && accion != 'add' && accion != 'edit' && accion != 'delete' && accion != 'detail') {
		window.location.href = accion;
	}

	if (operacion != '') {
		metodoEjecutar();
	}*/

	//eliminarAtributos();

	/*if (accion != 'add' && accion != 'edit' && accion != 'delete' && accion != 'detail') {
    	eliminarContenidoSelect();
	} else {
		let campos = ["txtNombre", "txtEmail", "txtUsuario", "txtPassword", "admin", "activo"];
		habilitaCampos(campos);
		resetearFormulario("formularioGenerico", campos);
	}*/

}


/**Función que generar un sessionId*/
function generarSessionId(){

	var ahora = new Date();
	var sessionId = ahora.getTime();

	setCookie('sessionId', sessionId, 1);

	insertacampo(document.formularioLogin,'ID_SESSION', sessionId);
 }

//*
// funcion rellenaid_grupo, solicita datos de grupo al back para darselos a escoger al usuario en un select
//*
function rellenaid_grupo(id,activo) {

	var idSession = getCookie('sessionId');

	crearformoculto("formularioobtenergrupo", "");

    insertacampo(document.formularioobtenergrupo,'ID_SESSION', idSession);
    insertacampo(document.formularioobtenergrupo,'controlador', 'grupo');
    insertacampo(document.formularioobtenergrupo,'action', 'buscar');

	var idioma = getCookie('lang');

	$.ajax({
		method: "POST",
	  	url: urlPeticionesAjax,
	  	data: $("#formularioobtenergrupo").serialize(),  
	}).done(function( response ) {
		if (response.ok == true) {
			addOptions('id_grupo',response.resource);
			$("#id_grupo option[value='" + id + "'").attr("selected",true);
			$("#borrado_usuario option[value='" + activo + "'").attr("selected",true);
		} else {
			$("#mensajeError").removeClass();
	    	$("#mensajeError").addClass(response.code);
	    	setLang(idioma);
        	document.getElementById("modal").style.display = "block";
			}	
				
			deleteActionController();
	});
}
