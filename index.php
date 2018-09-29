<?php
    try {
      require_once('funciones/bd_conexion.php');
      $sql = 'SELECT * FROM contactos';
      $resultado = $conn->query($sql);
    } catch (Exception $e){
      $error = $e->getMessage();
    }
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Agenda PHP</title>
    <link href="https://fonts.googleapis.com/css?family=Proza+Libre" rel="stylesheet">
    <link rel="stylesheet" href="css/estilos.css" media="screen">
  </head>
  <body>

    <div class="contenedor">
      <h1>Agenda de Contactos</h1>

        <div class="contenido">
          <div id="crear_contacto" class="crear">
            <h2>Nuevo Contacto</h2>
            <form action="crear.php" method="post" id="formulario_crear_usuario">
                <div class="campo">
                  <label for="nombre">Nombre</label>
                  <input type="text" name="nombre" id="nombre" placeholder="nombre">

                </div>
                <div class="campo">
                  <label for="telefono">telefono</label>
                  <input type="text" name="telefono" id="telefono" placeholder="telefono">
                </div>
                <input type="submit" value="Agregar" id="agregar" class="boton">
            </form>
          </div>
        </div>
        <div class="contenido existentes">
          <div class="buscar">
            <h2>Buscar</h2>
            <input type="text" id="buscador" name="buscador" placeholder="Buscar" class="buscador">
          </div>
          <h2>Contactos existentes</h2>
          <p>telefono de contacto: <span id="total"><?php echo $resultado->num_rows;?></span> </p>
          <table id="registrados">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>telefono</th>
                <th>Editar</th>
                <th> <button type="button" name="Borrar" id="btn_borrar" class="borrar"> Borrar </button>
                <input type="checkbox" id="borrar_todos">
                </th>
              </tr>
            </thead>
          <tbody>
            <?php while ($registros = $resultado->fetch_assoc()) { ?>
              <tr id="<?php echo $registros['id']; ?>">
                <td><?php echo $registros['nombre']; ?>
                  <input type="text" class="nombre_contacto" value="<?php echo $registros['nombre']; ?>" name="contacto_<?php echo $registros['id']; ?>">
                </td>
                <td><?php echo $registros['telefono']; ?>
                  <input type="text" class="telefono_contacto" value="<?php echo $registros['telefono']; ?>" name="telefono_<?php echo $registros['id']; ?>">
                </td>
                <td>
                  <a href="<?php echo $registros['id']; ?>" class="editarBtn">Editar</a>
                  <a href="<?php echo $registros['id']; ?>" class="guardarBtn">Guardar</a>
                </td>
                <td class="borrar">
                  <input class="borrar_contacto" type="checkbox" name="<?php echo $registros['id']; ?>">
                </td>
              </tr>
            <?php } ?>
          </tbody>
        </table>
      </div>
    </div>

    <?php $conn->close(); ?>
<script src="js/app.js"> </script>
  </body>
</html>
