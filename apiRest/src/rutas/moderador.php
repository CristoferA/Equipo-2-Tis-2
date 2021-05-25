<?php
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app = new \slim\App;
//GET de todas las publicaciones

$app->get('/apiRest/moderador', function (Request $request, Response $response){
    
    
    $sql = "SELECT * FROM moderador";
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
$app->get('/apiRest/moderador/{usuario}', function(Request $request, Response $response){
    $id_usuario = $request->getAttribute('usuario');
    $sql = "SELECT * FROM moderador WHERE usuario = $id_usuario";
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

//POST Agregar nueva moderador

$app->post('/apiRest/moderador/new', function(Request $request, Response $response){
    
    $usuario = $request->getParam('usuario');
    $codigo = $request->getParam('codigo');
    
     

    $sql= "INSERT INTO moderador (usuario, codigo) 
    VALUES (:usuario, :codigo)";

    try{
        $db = new db();
        $db = $db -> conectionDB();
        $result = $db -> prepare ($sql);

        $result->bindParam(':usuario',$usuario);
        $result->bindParam(':codigo',$codigo);
       
        


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
$app->put('/apiRest/oferente/editar/{usuario}', function(Request $request, Response $response){
    
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

$app->delete('/apiRest/moderador/delete/{usuario}', function(Request $request, Response $response){
    $id_usuario = $request->getAttribute('id_usuario');
    $sql = "DELETE FROM moderador WHERE usuario = $id_usuario";

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