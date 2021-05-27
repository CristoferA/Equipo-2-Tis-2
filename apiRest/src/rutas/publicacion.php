<?php
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


//GET de todas las publicaciones

$app->get('/publicacion', function (Request $request, Response $response){
    
    
    $sql = "SELECT * FROM publicacion";
    try {
        $db = new db();
        $db = $db -> conectionDB();
        $result = $db -> query($sql);
        
        if($result -> rowCount() > 0){
            $publicaciones = $result -> fetchAll (PDO::FETCH_OBJ);
            echo json_encode($publicaciones);

        }else{
            echo json_encode("No hay publicaciones aun!.");
        }
        $result = null;
        $db = null;

    }catch(PDOException $e){
        echo '{"error" : {"texto":'.$e->getMessage().'}';
    }
}); 

// GET Lista de una publicacion especifica por ID 
$app->get('/apiRest/publicacion/{id_publicacion}', function(Request $request, Response $response){
    $id_publicacion = $request->getAttribute('id_publicacion');
    $sql = "SELECT * FROM publicacion WHERE id_publicacion = $id_publicacion";
    try{
      $db = new db();
      $db = $db->conectionDB();
      $result = $db->query($sql);
  
      if ($result->rowCount() > 0){
        $publicacion = $result->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($publicacion);
      }else {
        echo json_encode("No existen publicaciones en la BBDD con este ID.");
      }
      $result = null;
      $db = null;
    }catch(PDOException $e){
      echo '{"error" : {"text":'.$e->getMessage().'}';
    }
  }); 

//POST Agregar nueva publicacion

$app->post('/apiRest/publicacion/new', function(Request $request, Response $response){
    $nombre_publicacion = $request->getParam('nombre_publicacion');
    $descripcion_publicacion = $request->getParam('descripcion_publicacion');
    $valor_publicacion = $request->getParam('valor_publicacion');
    $region_publicacion = $request->getParam('region_publicacion');
    $tipo_publicacion = $request->getParam('tipo_publicacion');
    $estado = $request->getParam('estado');
    $tipo_turismo = $request->getParam('tipo_turismo');
    $email_contacto = $request->getParam('email_contacto');
    $telefono_contacto = $request->getParam('telefono_contacto');
    $direccion = $request->getParam('direccion');
    $redes_sociales = $request->getParam('redes_sociales'); 
    $comuna_publicacion = $request->getParam('comuna_publicacion'); 
    $calificacion_publicacion = $request->getParam('calificacion_publicacion'); 
    $id_moderador = $request->getParam('id_moderador'); 

    $sql= "INSERT INTO publicacion (nombre_publicacion, descripcion_publicacion, valor_publicacion, region_publicacion,
    tipo_publicacion, estado, tipo_turismo, email_contacto, telefono_contacto, direccion, redes_sociales, comuna_publicacion,
    calificacion_publicacion, id_moderador) 
    VALUES (:nombre_publicacion, :descripcion_publicacion, :valor_publicacion, :region_publicacion,
    :tipo_publicacion, :estado, :tipo_turismo, :email_contacto, :telefono_contacto, :direccion, :redes_sociales, :comuna_publicacion,
    :calificacion_publicacion, :id_moderador)";

    try{
        $db = new db();
        $db = $db -> conectionDB();
        $result = $db -> prepare ($sql);

        $result->bindParam(':nombre_publicacion',$nombre_publicacion);
        $result->bindParam(':descripcion_publicacion',$descripcion_publicacion);
        $result->bindParam(':valor_publicacion',$valor_publicacion);
        $result->bindParam(':region_publicacion',$region_publicacion);
        $result->bindParam(':tipo_publicacion',$tipo_publicacion);
        $result->bindParam(':estado',$estado);
        $result->bindParam(':tipo_turismo',$tipo_turismo);
        $result->bindParam(':email_contacto',$email_contacto);
        $result->bindParam(':telefono_contacto',$telefono_contacto);
        $result->bindParam(':direccion',$direccion);
        $result->bindParam(':redes_sociales',$redes_sociales);
        $result->bindParam(':comuna_publicacion',$comuna_publicacion);
        $result->bindParam(':calificacion_publicacion',$calificacion_publicacion);
        $result->bindParam(':id_moderador',$id_moderador);


        $result->execute();
        echo json_encode("Publicacion Guardada");
        $result=null;
        $db=null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}'; 
    }

});

//PUT Editar publicacion

$app->put('/apiRest/publicacion/editar/{id_publicacion}', function(Request $request, Response $response){
    $id_publicacion = $request->getAttribute('id_publicacion');

    $nombre_publicacion = $request->getAttribute('nombre_publicacion');
    $descripcion_publicacion = $request->getAttribute('descripcion_publicacion');
    $valor_publicacion = $request->getAttribute('valor_publicacion');
    $region_publicacion = $request->getAttribute('region_publicacion');
    $tipo_publicacion = $request->getAttribute('tipo_publicacion');
    $estado = $request->getAttribute('estado');
    $tipo_turismo = $request->getAttribute('tipo_turismo');
    $email_contacto = $request->getAttribute('email_contacto');
    $telefono_contacto = $request->getAttribute('telefono_contacto');
    $direccion = $request->getAttribute('direccion');
    $redes_sociales = $request->getAttribute('redes_sociales'); 
    $comuna_publicacion = $request->getAttribute('comuna_publicacion'); 
    $calificacion_publicacion = $request->getAttribute('calificacion_publicacion'); 
    

    $sql = "UPDATE publicacion 
    SET nombre_publicacion =:nombre_publicacion,
    descripcion_publicacion =:descripcion_publicacion,
    valor_publicacion =:valor_publicacion,
    region_publicacion =:region_publicacion,
    tipo_publicacion =:tipo_publicacion,
    estado =:estado,
    tipo_turismo =:tipo_turismo,
    email_contacto =:email_contacto,
    telefono_contacto =:telefono_contacto,
    direccion =:direccion,
    redes_sociales =:redes_sociales,
    comuna_publicacion =:comuna_publicacion,
    calificacion_publicacion=:calificacion_publicacion
    WHERE id_publicacion = $id_publicacion";

    try {
        $db = new db();
        $db = $db->conectionBD();
        $result = $db->prepare($sql);

        $result->bindParam(':nombre_publicacion',$nombre_publicacion);
        $result->bindParam(':descripcion_publicacion',$descripcion_publicacion);
        $result->bindParam(':valor_publicacion',$valor_publicacion);
        $result->bindParam(':tipo_publicacion',$tipo_publicacion);
        $result->bindParam(':estado',$estado);
        $result->bindParam(':tipo_turismo',$tipo_turismo);
        $result->bindParam(':email_contacto',$email_contacto);
        $result->bindParam(':telefono_contacto',$telefono_contacto);
        $result->bindParam(':direccion',$direccion);
        $result->bindParam(':redes_sociales',$redes_sociales);
        $result->bindParam(':comuna_publicacion',$comuna_publicacion);
        $result->bindParam(':calificacion_publicacion',$calificacion_publicacion);
        
        $result->excecute();
        echo json_encode("Publicacion modificada.");

        $result = null;
        $db = null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}'; 
    }
});


//DELETE borrar publicacion

$app->delete('/apiRest/publicacion/delete/{id}', function(Request $request, Response $response){
    $id_publicacion = $request->getAttribute('id_publicacion');
    $sql = "DELETE FROM publicacion WHERE id_publicacion = $id_publicacion";

    try{
        $db = new db();
        $db = $db->conectionBD();
        $result = $db_>prepare($sql);
        $result = execute();

        if($result->rowCount()>0){
            echo json_encode("Publicacion Eliminada");
        }else{
            echo json_encode("No existe esta publicacion en la BBDD.");
        }

    }catch(PDOException $e){
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
});