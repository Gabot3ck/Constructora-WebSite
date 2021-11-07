document.addEventListener("DOMContentLoaded", e =>{
	hamburguerMenu(".boton-menu",".navbar",".enlace-menu");
});

let d = document;
	$navegador = d.getElementById("nav"),
	$logo = d.getElementById("logo"),
	$menuResponsive= d.getElementById("lista-menu"),
	$logoLight = d.getElementById("logo_principal"),
	$logoDark = d.getElementById("logo_secundario"),
	$colorBoton= d.querySelector(".hamburger-inner"),
	$colorVerde= "var(--color-principal) !important",
	$colorBlanco= "#ffffff !important",
	$enlaceMenu= d.querySelectorAll(".enlace-menu"),
	$enlaceProyectos= d.getElementById("enlace1");

function hamburguerMenu(btn,ul,enlace){

	document.addEventListener("click", e => {
		if(e.target.matches(btn) || e.target.matches(".span") ){
			document.querySelector(ul).classList.toggle("mostrar-menu");
			document.querySelector(btn).classList.toggle("is-active");
		}
		if(e.target.matches(enlace)){
			document.querySelector(ul).classList.remove("mostrar-menu");
			document.querySelector(btn).classList.remove("is-active");
		}
	})
}

	d.addEventListener("click", e => {
		if(e.target.matches("svg") || e.target.matches("span") || e.target.matches("a")){
			$enlaceProyectos.classList.remove("activo");
		}
		
	});
		
// *****   V A L I D A C I O N   D E    F O R M U L A R I O   *****
	const btnEnviar = d.getElementById("enviar");
	const nombre = d.getElementById("nombre");
	const apellido = d.getElementById("apellido");
	const email = d.getElementById("email");
	const celular = d.getElementById("celular");
	const asunto = d.getElementById("asunto");
	const mensaje = d.getElementById("mensaje");
	const formulario = d.getElementById("formulario");

	const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			

	eventListeners();
	function eventListeners(){

		addEventListener("DOMContentLoaded", iniciarApp);

		nombre.addEventListener("blur", validarFormulario);
		apellido.addEventListener("blur", validarFormulario);
		email.addEventListener("blur", validarFormulario);
		celular.addEventListener("blur", validarFormulario);
		asunto.addEventListener("blur", validarFormulario);
		mensaje.addEventListener("blur", validarFormulario);
		

		formulario.addEventListener("submit", enviarEmail);
	}




	function iniciarApp(){

		btnEnviar.disabled = true;
		btnEnviar.classList.add("bloqueado");
	}

	function validarFormulario(e){
		
		if(e.target.value.length > 0){
			e.target.classList.remove("alerta");
			e.target.classList.add("ok");
			const error = d.querySelector("p.mensaje-alerta");

			
		} else{
			e.target.classList.remove("ok");
			e.target.classList.add("alerta");

			mostrarError("¡Todos los campos son obligatorios!");
		}

		if (e.target.type === "email") {
			
			if (er.test(e.target.value)) {

				const error = d.querySelector("p.mensaje-alerta");
				if(error){
				error.remove();
				}
						
				e.target.classList.remove("alerta");
				e.target.classList.add("ok");
					
			} else {
				
				mostrarError("El correo no es válido");
				e.target.classList.remove("ok");
				e.target.classList.add("alerta");
				}
		}

		if (nombre.value !== "" && apellido.value !== "" && er.test(email.value) && celular.value !== "" && asunto.value !== "" && mensaje.value !== "" ) {

			btnEnviar.disabled = false;
			btnEnviar.classList.remove("bloqueado");

			const error = d.querySelector("p.mensaje-alerta");
			if(error){
				error.remove();
			}
			

		} 
	}

	function mostrarError(mensaje){

		const mensajeError = d.createElement("p");
		mensajeError.textContent = mensaje;
		mensajeError.classList.add("mensaje-alerta","error");

		const errores = d.querySelectorAll(".error");

		if (errores.length === 0){
			formulario.append(mensajeError);
		}
		
	}

	function enviarEmail(e){
		e.preventDefault();

		const spinner = d.getElementById("spinner");

		spinner.style.display = "block";
	
		setTimeout( () => {

			spinner.style.display = "none";

			const parrafo= d.createElement("p");
			parrafo.textContent = "Mensaje enviado con éxito.";
			parrafo.classList.add("parrafo");

			formulario.insertBefore(parrafo, spinner);

			setTimeout( () => {

				parrafo.remove();
				resetearFormulario();
     
			}, 5000)
		}, 3000);

		console.log("eniando");
	}


	function resetearFormulario(){

		formulario.reset();
		iniciarApp();
	}



	
// ***********************************************************************



function enlaceMenuAdd(){
	$enlaceMenu.forEach((e) =>{
		e.classList.add("color2");
	});
}
function enlaceMenuRemove(){
	$enlaceMenu.forEach((e) =>{
		e.classList.remove("color2");
	});
}

function mostrar(){
	if((d.documentElement.scrollTop) > 90 ){
		$navegador.classList.remove("bg-none");
		$navegador.classList.add("show");
		$logoLight.classList.add("logo_display");
		$menuResponsive.classList.add("navbar2");
		$colorBoton.style.background = "var(--color-principal)";
		d.styleSheets[0].addRule(".hamburger-inner::before","background: " + $colorVerde + ";");
		d.styleSheets[0].addRule(".hamburger-inner:after","background: " + $colorVerde + ";");
		enlaceMenuAdd();

		if($logoDark.classList.contains('logo_display')){
			$logoDark.classList.remove('logo_display');

		}
		
		
		
	}else{
		$navegador.classList.remove("show");
		$navegador.classList.add("bg-none");
		$colorBoton.style.background = "#ffffff";
		$menuResponsive.classList.remove("navbar2");
		d.styleSheets[0].addRule(".hamburger-inner::before","background: " + $colorBlanco + ";");
		d.styleSheets[0].addRule(".hamburger-inner:after","background: " + $colorBlanco + ";");
		enlaceMenuRemove();

		if($logoLight.classList.contains('logo_display') && !($logoDark.classList.contains('logo_display'))){
			$logoLight.classList.remove('logo_display');
			$logoDark.classList.add("logo_display");

		}
		
	}
}
onscroll = mostrar;