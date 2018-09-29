var agregarContacto = document.getElementById('agregar');
var formulario = document.getElementById('formulario_crear_usuario');
var action = formulario.getAttribute('action');
var divCrear = document.getElementById('crear_contacto');
var tablaRegistrados = document.getElementById('registrados');
var checkboxes = document.getElementsByClassName('borrar_contacto');
var btn_borrar = document.getElementById('btn_borrar');
var tableBody = document.getElementsByTagName('tbody');
var divExistentes = document.getElementsByClassName('existentes');
var inputBuscador = document.getElementById('buscador');
var totalRegistros = document.getElementById('total');
var checkTodos = document.getElementById('borrar_todos');

function actualizartelefono(){
  var registros = tableBody[0].getElementsByTagName('tr');
  var cantidad = 0;
  var ocultos = 0;
  for (var i = 0; i < registros.length; i++) {
    var elementos = registros[i];
    if (elementos.style.display == 'table-row') {
      cantidad++;
      totalRegistros.innerHTML = cantidad;
    } else {
      if (elementos.style.display == 'none') {
        ocultos++;
        if (ocultos == registros.length) {
          ocultos -= registros.length;
          totalRegistros.innerHTML = ocultos;
        }
      }
    }
  }
}

function registroExitoso(nombre){

  //crear div y agregar id
  var divMensaje = document.createElement('DIV');
  divMensaje.setAttribute('id', "mensaje");

  //agregar texto
  var texto = document.createTextNode('Creado: '+ nombre);
  divMensaje.appendChild(texto);

  divCrear.insertBefore(divMensaje, divCrear.childNodes[4]);

  //agregar clase mostrar
  divMensaje.classList.add('mostrar');

  // ocultar el mensaje de creacion
  setTimeout(function(){
    divMensaje.classList.add('ocultar');
    setTimeout(function(){
      var divPadreMensaje = divMensaje.parentNode;
      divPadreMensaje.removeChild(divMensaje);

    }, 500);
  }, 3000);
}

//construir template para inssertar datos dinamicamente
function construirTemplate(nombre, telefono, registro_id){  
  //crear nombre de contactos
  var tdNombre = document.createElement('TD');
  var textoNombre = document.createTextNode(nombre);
  var parrafoNombre = document.createElement('P');
  tdNombre.appendChild(textoNombre);
  /*parrafoNombre.appendChild(textoNombre);
  tdNombre.appendChild(parrafoNombre);*/

  //crear telefono contactos
  var tdtelefono = document.createElement('TD');
  var textotelefono = document.createTextNode(telefono);
  var parrafotelefono = document.createElement('P');
  tdtelefono.appendChild(textotelefono);
  /*parrafotelefono.appendChild(textotelefono);
  tdtelefono.appendChild(parrafotelefono);*/

  //crear enlace para Editar
  var nodoBtn = document.createElement('A');
  var textoEnlace = document.createTextNode('Editar');
  nodoBtn.appendChild(textoEnlace);
  nodoBtn.href = 'editar.php?id=' + registro_id;
  /*nodoBtn.href = '#';
  nodoBtn.classList.add('editarBtn');*/
  
  // agregar el boton al td
  var nodoTdEditar = document.createElement('TD');
  nodoTdEditar.appendChild(nodoBtn);
  nodoTdEditar.appendChild(guardarBtn);  

  // crear boton para guardarBtn
  var btnGuardar = document.createElement('A');
  var textoGuardar = document.createTextNode('Guardar');
  btnGuardar.appendChild(textoGuardar);
  btnGuardar.href = '#';
  btnGuardar.classList.add('guardarBtn');
  
  //crear checkbox para borrar
  var checkBorrar = document.createElement('INPUT');
  checkBorrar.type = 'checkbox';
  checkBorrar.name = registro_id;
  checkBorrar.classList.add('borrar_contacto');

  //agregar td a checkbox
  var tdCheckbox = document.createElement('TD');
  tdCheckbox.classList.add('borrar');
  tdCheckbox.appendChild(checkBorrar);
  
  //crear input con el nombre
  var inputNombre = document.createElement('INPUT');
  inputNombre.type = 'text';
  inputNombre.name = 'contacto_' + registro_id;
  inputNombre.value = nombre;
  inputNombre.classList.add('nombre_contacto')

  tdNombre.appendChild(inputNombre);

  //crear input con el telefono
  var inputtelefono = document.createElement('INPUT');
  inputtelefono.type = 'text';
  inputtelefono.name = 'telefono_' + registro_id;
  inputtelefono.value = telefono;
  inputtelefono.classList.add('telefono_contacto')

  tdtelefono.appendChild(inputtelefono);
  // agregar al TR
  var trContacto = document.createElement('TR');
  trContacto.setAttribute('id', registro_id);
  trContacto.appendChild(tdNombre);
  trContacto.appendChild(tdtelefono);
  trContacto.appendChild(nodoTdEditar);
  trContacto.appendChild(tdCheckbox);

  actualizartelefono();
}

function crearUsuario(){
    var form_datos = new FormData(formulario);
    for([key, value] of form_datos.entries()){
      console.log(key + ": " + value);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', action, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){
        var resultado = xhr.responseText;
        console.log(resultado);
        var json = JSON.parse(resultado);
        if(json.respuesta == true){
          registroExitoso(json.nombre);
          construirTemplate(json.nombre, json.telefono, json.id);
          var totalActualizado = parseInt(totalRegistros.textContent) + 1;
          totalRegistros.innerHTML = totalActualizado;
        }
      }
    }    
    xhr.send(form_datos);
}

function mostrarEliminado() {
  //crear div y agregar id
  var divEliminado = document.createElement('DIV');
  divEliminado.setAttribute('id', 'borrado');

  //agregar texto
  var texto = document.createTextNode('Contacto eliminado');
  divEliminado.appendChild(texto);  

  divExistentes[0].insertBefore(divEliminado, divExistentes[0].childNodes[0]);

  //agregar clase CSS
  divEliminado.classList.add('mostrar');
  
  //ocultar el mensaje de borrado
  
  setTimeout(function(){
    divEliminado.classList.add('ocultar');
    setTimeout(function(){
      var divPadreMensaje = divEliminado.parentNode;
      divPadreMensaje.removeChild(divEliminado);
  }, 500);
}, 3000);
}

function eliminarHTML(ids_borrados){
  for(i=0; i < ids_borrados.length; i++){
    var elementoBorrar = document.getElementById(ids_borrados[i]);
    tableBody[0].removeChild(elementoBorrar);
  }
}  
  
function contactosEliminar(contactos){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'borrar.php?id=' + contactos, true);
  console.log('borrar.php?id=' + contactos);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  
  
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var resultadoBorrar = xhr.responseText;
      var json = JSON.parse(resultadoBorrar);
        if (json.respuesta == false) {
          alert("Selecciona un contacto");
        } else {
          console.log('Resultado: ' + resultadoBorrar);
          eliminarHTML(contactos);
          mostrarEliminado();
          var totalActualizado = parseInt(totalRegistros.textContent) - json.borrados;
          totalRegistros.innerHTML = totalActualizado;
        }
    }
  };
  xhr.send();
}

function checkboxSeleccionado(){
  var contactos = [];
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked == true) {
      contactos.push(checkboxes[i].name);
    }
  }
  contactosEliminar(contactos);
}

for (var i=0; i< checkboxes.length; i++){
  checkboxes[i].addEventListener('change', function(){
    if(this.checked){
      this.parentNode.parentNode.classList.add('activo');
    } else {
      this.parentNode.parentNode.classList.remove('activo');
    }
  });
}

agregarContacto.addEventListener('click', function(e){
  e.preventDefault();
  crearUsuario();
});
  
btn_borrar.addEventListener('click', function(){
  checkboxSeleccionado();
});
  
function ocultarRegistros(nombre_buscar){
  //variable para todos los registros
  var registros = tableBody[0].getElementsByTagName('tr');
  //expresion regular que busca el nombre
  var expression = new RegExp(nombre_buscar, "i"); //insensitive "i" o sensitive, insensitive busca indeferenciadamente si es mayus o minus
  for (var i = 0; i < registros.length; i++) {
    registros[i].classList.add('ocultar');
    registros[i].style.display = 'none';
    if (registros[i].childNodes[1].textContent.replace(/\s/g, "").search(expression) != -1 || nombre =='') {
      registros[i].classList.add('mostrar');
      registros[i].classList.remove('ocultar');
       registros[i].style.display = 'table-row';
    }
  }
  actualizartelefono();
  //recorrerBotonesEditar();
  //recorrerBotonesGuardar(registro_id);
}
  
inputBuscador.addEventListener('input', function(){
  ocultarRegistros(this.value);
});

//seleccionar todos
checkTodos.addEventListener('click', function(){
  if (this.checked) {
    var todosRegistros = tableBody[0].getElementsByTagName('tr');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
      todosRegistros[i].classList.add('activo');
    }
  } else {
    var todosRegistros = tableBody[0].getElementsByTagName('tr');
    for (var i = 0; i < checkboxes.length; i++){
    checkboxes[i].checked = false;
    todosRegistros[i].classList.remove('activo');}
  }
});

// editar registros
function recorrerBotonesEditar() {
  var btn_editar = tableBody[0].querySelectorAll('.editarBtn');
  for (var i = 0; i < btn_editar.length; i++) {
    btn_editar[i].addEventListener('click', function(event){
      event.preventDefault();
      deshabilitarEdicion();
      var registrosActivo = this.parentNode.parentNode;
      registrosActivo.classList.add('modo-edicion');
      registrosActivo.classList.remove('desactivado')
//actualizamos el registro
      actualizarRegistro(registrosActivo.id);

    });
  }
}
/* Recorrer botones de guardar **/
function recorrerBotonesGuardar(id) {
    var btn_guardar = tableBody[0].querySelectorAll('.guardarBtn');
    for(var i = 0; i < btn_guardar.length; i++) {
        btn_guardar[i].addEventListener('click', function() {
            actualizarRegistro(id);
        });
    }
}
function deshabilitarEdicion(){
  var registrosTr = document.querySelectorAll('#registrados tbody tr');
  for (var i = 0; i < registrosTr.length; i++) {
    registrosTr[i].classList.add('desactivado')
  }
}
function habilitarEdicion(){
  var registrosTr = document.querySelectorAll('#registrados tbody tr');
  for (var i = 0; i < registrosTr.length; i++) {
    registrosTr[i].classList.remove('desactivado')
  }
}

function actualizarRegistro(idRegistro){
  //seleccionar boton de guardar el registro en especifico
  var btnGuardar = document.getElementById(idRegistro).getElementsByClassName('guardarBtn');
  btnGuardar[0].addEventListener('click', function(e){
    e.preventDefault();
    //obtiene el valor del campo nombre
    var inputNombreNuevo = document.getElementById(idRegistro).getElementsByClassName('nombre_contacto');
    var nombreNuevo = inputNombreNuevo[0].value;
    //obtiene el valor del campo telefono
    var inputtelefonoNuevo = document.getElementById(idRegistro).getElementsByClassName('telefono_contacto');
    var telefonoNuevo = inputtelefonoNuevo[0].value;
//objeto con todos los datos
    var contacto = {
      nombre : nombreNuevo,
      telefono : telefonoNuevo,
      id : idRegistro
    };
    actualizarAjax(contacto);
  });
}
function actualizarAjax(datosContacto){
  //convierte objeto a JSON
  var jsonContacto = JSON.stringify(datosContacto);
  //crear la conexion
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'actualizar.php?datos=' + jsonContacto, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var resultado = xhr.responseText;
      var resultadoJson = JSON.parse(resultado);
      if (resultadoJson.respuesta == true) {
        var registroActivo = document.getElementById(datosContacto.id);
        //inserta dinamicamente el nombre
        registroActivo.getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML = resultadoJson.nombre;
        //inserta dinamicamente el telefono
        registroActivo.getElementsByTagName('td')[1].getElementsByTagName('p')[0].innerHTML = resultadoJson.telefono;
        //borrar modo edicion
        registroActivo.classList.remove('modo-edicion');
        habilitarEdicion();
      } else {

      }
    }
  };
  xhr.send();

}
document.addEventListener('DOMContentLoaded', function(event){
  recorrerBotonesEditar();
});
