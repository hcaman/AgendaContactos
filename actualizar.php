<?php
/*
function peticion_ajax(){
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER ['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
} 
$datos = $_GET['datos'];
$datos = json_decode($datos, true);
$nombre = $datos ['nombre'];
$telefono = $datos ['telefono'];
$id = $datos ['id'];*/  
   $nombre = $_GET['nombre'];
   $telefono  =  $_GET['telefono'];
   $id = $_GET['id'];
/*if(isset($_GET['nombre'])){
  $nombre = $_GET['nombre'];
}
if(isset($_GET['telefono'])){
  $telefono = $_GET['telefono'];
}
if(isset($_GET['id'])){
  $id = $_GET['id'];
}
if (peticion_ajax()) {*/
        try {
            require_once('funciones/bd_conexion.php');
            $sql = "UPDATE `contactos` SET ";
            $sql .= "`nombre` = '{$nombre}', ";
            $sql .= "`telefono` = '{$telefono}' ";
            $sql .= "WHERE `id` = {$id}";

            $resultado = $conn->query($sql);
            /*echo json_encode(array(
              'respuesta' => $resultado,
              'nombre' => $nombre,
              'id' => $id,
              'telefono' => $telefono
            ));*/
        } catch (Exception $e){
          $error = $e->getMessage();
        }/*
} else {
  exit;
}*/
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Agenda PHP</title>
    <link href="https://fonts.googleapis.com/css?family=Proza+Libre" rel="stylesheet">

    <link rel="stylesheet" href="css/estilos.css" media="screen" title="no title">
  </head>
  <body>

    <div class="contenedor">
      <h1>Agenda de Contactos</h1>

        <div class="contenido">
  
                <?php 
                if ($conn->query($sql) === TRUE) {
                    echo "Contacto Actualizado";
                } else {
                    echo "Error actualizando: " . $conn->error;
                }
                 ?>
                <a class="volver" href="index.php">Volver a Inicio</a>
        </div>
    </div>
<?php 
    $conn->close();
?>
  </body>
</html>
