<?php
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//GET de todas los contactos

$app->get('/contacta', function (Request $request, Response $response){
    
    
    $sql = "SELECT * FROM contacta";
    try {
        $db = new db();
        $db = $db -> conectionDB();
        $result = $db -> query($sql);
        
        if($result -> rowCount() > 0){
            $contacto = $result -> fetchAll (PDO::FETCH_OBJ);
            echo json_encode($contacto);

        }else{
            echo json_encode("No hay contacto aun!.");
        }
        $result = null;
        $db = null;

    }catch(PDOException $e){
        echo '{"error" : {"texto":'.$e->getMessage().'}';
    }
}); 

// GET Lista de un contacto especifico por ID 
$app->get('/contacta/{usuario}', function(Request $request, Response $response){
    $id_usuario = $request->getAttribute('usuario');
    $sql = "SELECT * FROM contacta WHERE id_oferente = $id_usuario OR id_demandante = $id_usuario";
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

$app->post('/contacta/new', function(Request $request, Response $response){
    
    $id_oferente = $request->getParam('id_oferente');
    $id_demandante = $request->getParam('id_demandante');
    
     

    $sql= "INSERT INTO contacta (id_oferente, id_demandante) 
    VALUES (:id_oferente, :id_demandante)";

    try{
        $db = new db();
        $db = $db -> conectionDB();
        $result = $db -> prepare ($sql);

        $result->bindParam(':id_oferente',$id_oferente);
        $result->bindParam(':id_oferente',$id_demandante);
       
        


        $result->execute();
        echo json_encode("Contacto Guardado");
        $result=null;
        $db=null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}'; 
    }

});

//PUT Editar publicacion
/*
$app->put('/contacta/editar/{usuario}', function(Request $request, Response $response){
    
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

$app->delete('/contacta/delete/{usuario}', function(Request $request, Response $response){
    $id_oferente = $request->getAttribute('id_oferente');
    $id_demandante = $request->getAttribute('id_publicacion');
    $sql = "DELETE FROM oferente WHERE id_oferente = $id_oferente OR id_demandante = $id_demandante";

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