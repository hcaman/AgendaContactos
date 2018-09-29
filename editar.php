<?php
$id = $_GET['id'];
/*
if (isset($_GET['id'])) {
 $id = $_GET ['id'];
}*/
try {
  require_once('funciones/bd_conexion.php');
  $sql = "SELECT * FROM contactos WHERE `id` = {$id}";
  $resultado = $conn->query($sql);
} catch (Exception $e){
  $error = $e->getMessage();
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Agenda PHP</title>
    <link rel="stylesheet" href="css/estilos.css" media="screen">
  </head>
  <body>
    <div class="contenedor">
      <h1>Agenda de Contactos</h1>
        <div class="contenido">
          <h2>Editar Contacto</h2>
            <form action="actualizar.php" method="get">
              <?php while ($registros = $resultado->fetch_assoc()) { ?>
                <div class="campo">
                    <label for="nombre">Nombre</label>
                    <input type="text" value="<?php echo $registros['nombre']; ?>" name="nombre" id="nombre" placeholder="nombre">
                </div>
                <div class="campo">
                  <label for="telefono">telefono</label>
                  <input type="text" value="<?php echo $registros['telefono']; ?>" name="telefono" id="telefono" placeholder="telefono">
                </div>
              <input type="hidden" name="id" value="<?php echo $registros['id']; ?>">
              <input type="submit" value="Actualizar">
              <?php } ?>
            </form>
        </div>
    </div>
    <?php $conn->close(); ?>
  </body>
</html>
