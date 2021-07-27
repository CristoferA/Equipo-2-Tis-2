<?php
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// GET Lista de una publicacion especifica por ID 
$app->post('/publicacion_aprobada', function(Request $request, Response $response){
    $id_publicacion = $request->getParam('id_publicacion');
    $sql = "SELECT * FROM publicacion WHERE id_publicacion = '$id_publicacion'";
    try{
      $db = new db();
      $db = $db->conectionDB();
      $result = $db->prepare($sql);

      $result->bindParam(':id_publicacion',$id_publicacion);

      $result->execute();
      echo json_encode("OJALA PESQUE");
  
     /* if ($result->rowCount() > 0){
        $publicacion = $result->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($publicacion);
      }else {
        echo json_encode("No existen publicaciones en la BBDD con este ID.");
      }*/
      $result = null;
      $db = null;
    }catch(PDOException $e){
      echo '{"error" : {"text":'.$e->getMessage().'}';
    }
  }); 



$app->get('/publicacion_moderador',function(Request $reques, Response $response){

    $sql = "SELECT * FROM publicacion ORDER BY estado ASC";
    try {
        $db = new db();
        $db = $db->conectionDB();

        $result = $db ->query($sql);

        $result ->rowCount();
        if($result ->rowCount()>0){

            $publicaciones = $result -> fetchAll(PDO::FETCH_OBJ);
            echo json_encode($publicaciones);

        }else{
            echo json_encode("WOPS");
        }
    }catch(PDOException $e){
        echo '{"error" : {"texto":'.$e->getMessage().'}';
    }
});




//LOGIN MOD


$app->post('/login-moderador',function(Request $request, Response $response){
    $id_usuario = $request->getParam('id_usuario');
    $contrasena = $request->getParam('contrasena');
    $codigo = $request ->getParam('codigo');
    $contrasena=hash('sha256',$contrasena);
    $sql = "SELECT id_usuario FROM usuario, moderador 
    WHERE (id_usuario='$id_usuario' OR email_usuario='$id_usuario') 
    AND contrasena ='$contrasena' AND codigo = '$codigo'";

    try{
        $db = new db();
        $db = $db -> conectionDB();  
        $data='';
 
        $result = $db -> prepare ($sql);
        $result->bindParam(':id_usuario',$id_usuario);        
        $result->bindParam(':contrasena',$contrasena);
        $result->bindParam(':codigo',$codigo);
        $result->execute();
        
        $count = $result->rowCount();
        $data=$result->fetch(PDO::FETCH_OBJ);       

        if(!empty($data)){
            $user_id=$data->id_usuario;
            $data->token = apiToken($user_id);
        }
        $db=null;

        if($data){
            $data=json_encode($data);
            echo '{"data": ' .$data . '}';            
        }else{
            echo '{"error":{"text":"Bad request wrong username and password"}}';
        }
    }catch(PDOException $e){
        echo '{"error" : {"texto":'.$e->getMessage().'}'; 
    }
});


//GET de todas las publicaciones

$app->get('/moderador', function (Request $request, Response $response){
    
    
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
$app->get('/moderador/{id}', function(Request $request, Response $response){
    $id_usuario = $request->getAttribute('id');
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

$app->post('/moderador/new', function(Request $request, Response $response){
    
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

$app->delete('/moderador/delete/{id}', function(Request $request, Response $response){
    $id_usuario = $request->getAttribute('id');
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