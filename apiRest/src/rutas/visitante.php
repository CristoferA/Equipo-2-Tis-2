<?php
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//GET de todas las publicaciones

$app->get('/visitante', function (Request $request, Response $response){
    
    
    $sql = "SELECT * FROM visitante";
    try {
        $db = new db();
        $db = $db -> conectionDB();
        $result = $db -> query($sql);
        
        if($result -> rowCount() > 0){
            $usuarios = $result -> fetchAll (PDO::FETCH_OBJ);
            echo json_encode($usuarios);

        }else{
            echo json_encode("No hay usuarios aun!.");
        }
        $result = null;
        $db = null;

    }catch(PDOException $e){
        echo '{"error" : {"texto":'.$e->getMessage().'}';
    }
}); 

// GET Lista de una publicacion especifica por ID 
$app->get('/visitante/{usuario}', function(Request $request, Response $response){
    $id_oferente = $request->getAttribute('id_visita');
    $id_publicacion = $request->getAttribute('id_publicacion');
    $sql = "SELECT * FROM visitante WHERE id_visita = $id_visita OR id_publicacion = $id_publicacion";
    try{
      $db = new db();
      $db = $db->conectionDB();
      $result = $db->query($sql);
  
      if ($result->rowCount() > 0){
        $usuario = $result->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($usuario);
      }else {
        echo json_encode("No existen usuarios en la BBDD con este ID.");
      }
      $result = null;
      $db = null;
    }catch(PDOException $e){
      echo '{"error" : {"text":'.$e->getMessage().'}';
    }
  }); 

//POST Agregar nueva publicacion

$app->post('/visitante/new', function(Request $request, Response $response){
    
    $id_visita = $request->getParam('id_visita');
    $id_publicacion = $request->getParam('id_publicacion');
    
     

    $sql= "INSERT INTO visitante (id_visita, id_publicacion) 
    VALUES (:id_visita, :id_publicacion)";

    try{
        $db = new db();
        $db = $db -> conectionDB();
        $result = $db -> prepare ($sql);

        $result->bindParam(':id_visita',$id_visita);
        $result->bindParam(':id_publicacion',$id_publicacion);
       
        


        $result->execute();
        echo json_encode("Moderador Guardado");
        $result=null;
        $db=null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}'; 
    }

});

//PUT Editar publicacion
/*
$app->put('/oferente/editar/{usuario}', function(Request $request, Response $response){
    
    $usuario = $request->getAttribute('usuario');
    
     
    

    $sql = "UPDATE usuario 
    SET nombre_usuario =:nombre_usuario,
    email_usuario =:email_usuario,
    contraseña =:contraseña
    WHERE usuario = $usuario";

    try {
        $db = new db();
        $db = $db->conectionBD();
        $result = $db->prepare($sql);

        $result->bindParam(':usuario',$usuario);
        $result->bindParam(':nombre_usuario',$nombre_usuario);
        $result->bindParam(':email_usuario',$email_usuario);
        $result->bindParam(':contraseña',$contraseña);
        
        
        $result->excecute();
        echo json_encode("Usuario modificado.");

        $result = null;
        $db = null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}'; 
    }
});
*/

//DELETE borrar publicacion

$app->delete('/visitante/delete/{id}', function(Request $request, Response $response){
    
    $id_visita = $request->getParam('id_visita');
    $id_publicacion = $request->getParam('id_publicacion');
    
    $sql = "DELETE FROM visitante WHERE id_visita = $id_visita OR id_publicacion = $id_publicacion";

    try{
        $db = new db();
        $db = $db->conectionBD();
        $result = $db_>prepare($sql);
        $result = execute();

        if($result->rowCount()>0){
            echo json_encode("Usuario Eliminado");
        }else{
            echo json_encode("No existe esta publicacion en la BBDD.");
        }

    }catch(PDOException $e){
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
});