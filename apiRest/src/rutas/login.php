<?php
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


//USUARIO OFERENTE LOGEADO GUARDADO EN SESSION

$app->post('/session',function(Request $request, Response $response){
    $id_usuario = $request->getParam('id_usuario');
    $contrasena = $request->getParam('contrasena');

    $sql = "SELECT COUNT(id_usuario) FROM usuario , oferente
            WHERE id_usuario='$id_usuario' AND contrasena = '$contrasena' AND usuario.id_usuario = oferente.usuario";

    try{
        $db = new db();
        $db = $db -> conectionDB();
        
        
        
        $result = $db -> prepare ($sql);

        $result->bindParam(':id_usuario',$id_usuario);
        $result->bindParam(':contrasena',$contrasena);
        $result->bindParam(':usuario',$id_usuario);
        $result->execute();
        
        $count = $result->rowCount();

        $data=$result->fetch(PDO::FETCH_OBJ);
        if($count){
            $_SESSION['id_usuario']=$data->id_usuario;
            $_SESSION['usuario']=$data->usuario;
            echo "usuario logeado correctamente";
        }else{
            echo "El nombre de usuario esta incorrecto";
        }
        
        $result=null;
        $db=null;
    }catch(PDOException $e){
        echo '{"error" : {"texto":'.$e->getMessage().'}'; 
    }
});

//USUARIO MODERADOR INTENTA LOGEARSE --PRIMER INTENTO
$app->post('/primer_ingreso',function(Request $request, Response $response){
    $id_usuario=$request->getParam('id_usuario');
    $contrasena=$request->getParam('contrasena');

    $sql="SELECT COUNT(id_usuario) FROM usuario, moderador
         WHERE id_usuario='$id_usuario' AND contrasena='$contrasena' AND usuario.id_usuario = moderador.usuario";
    
    try{
        $db= new db();
        $db= $db->conectionDB();

        $result = $db-> prepare($sql);
        
        $result->bindParam(':id_usuario',$id_usuario);       
        $result->bindParam(':contrasena',$contrasena);
        $result->bindParam(':codigo',$codigo);
        $result->execute();

        
        $count=$result->rowCount();
        $data=$result->fetch(PDO::FETCH_OBJ);

        if($count){
            echo "usuario corresponde a un moderador";
        }else{
            echo "usuario normal";
        }
        
    }catch(PDOException $e){
        echo '{"error" : {"texto":'.$e->getMessage().'}'; 
    }
});


//USUARIO MODERADOR LOGEADO GUARDADO EN SESSION

$app->post('/session_moderador',function(Request $request, Response $response){
    $id_usuario = $request->getParam('id_usuario');
    $contrasena = $request->getParam('contrasena');
    $codigo=$request->getParam('codigo');

    $sql = "SELECT COUNT(id_usuario) FROM usuario, moderador 
            WHERE id_usuario='$id_usuario' AND contrasena = '$contrasena' AND usuario.id_usuario = moderador.usuario";

    try{
        $db = new db();
        $db = $db -> conectionDB();
              
        $result = $db -> prepare ($sql);

        $result->bindParam(':id_usuario',$id_usuario);
        $result->bindParam(':contrasena',$contrasena);
        $result->bindParam(':usuario',$id_usuario);
        $result->bindParam(':codigo',$codigo);
        $result->execute();
        
        $count = $result->rowCount();

        $data=$result->fetch(PDO::FETCH_OBJ);
        if($count){
            $_SESSION['id_usuario']=$data->id_usuario;
            echo "usuario logeado correctamente";
        }else{
            echo "El nombre de usuario esta incorrecto";
        }
        
        $result=null;
        $db=null;
    }catch(PDOException $e){
        echo '{"error" : {"texto":'.$e->getMessage().'}'; 
    }
});

//USUARIO GENERICO LOGEADO GUARDADO EN SESSION

$app->post('/session_oferente',function(Request $request, Response $response){
    $id_usuario = $request->getParam('id_usuario');
    $contrasena = $request->getParam('contrasena');

    $sql = "SELECT COUNT(id_usuario) FROM usuario 
            WHERE id_usuario='$id_usuario' AND contrasena = '$contrasena'";

    try{
        $db = new db();
        $db = $db -> conectionDB();
        
        
        
        $result = $db -> prepare ($sql);

        $result->bindParam(':id_usuario',$id_usuario);
        $result->bindParam(':contrasena',$contrasena);
        $result->execute();
        
        $count = $result->rowCount();

        $data=$result->fetch(PDO::FETCH_OBJ);
        if($count){
            $_SESSION['id_usuario']=$data->id_usuario;
            echo "usuario logeado correctamente";
        }else{
            echo "El nombre de usuario esta incorrecto";
        }
        
        $result=null;
        $db=null;
    }catch(PDOException $e){
        echo '{"error" : {"texto":'.$e->getMessage().'}'; 
    }
});
