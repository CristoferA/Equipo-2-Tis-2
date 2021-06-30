<?php
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/*
//USUARIO OFERENTE LOGEADO GUARDADO EN SESSION

$app->post('/session_oferente',function(Request $request, Response $response){
    $id_usuario = $request->getParam('id_usuario');
    $contrasena = $request->getParam('contrasena');

    $sql = "SELECT id_usuario FROM usuario , oferente
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

    $sql="SELECT id_usuario FROM usuario, moderador
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

    $sql = "SELECT id_usuario FROM usuario, moderador 
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

//LOGIN QUE VOY A REPARAR AHORA
*/
$app->post('/login',function(Request $request, Response $response){
    $id_usuario = $request->getParam('id_usuario');
    $contrasena = $request->getParam('contrasena');
    $contrasena=hash('sha256',$contrasena);
    $sql = "SELECT id_usuario FROM usuario 
    WHERE (id_usuario='$id_usuario' OR email_usuario='$id_usuario') 
    AND contrasena ='$contrasena'";

    try{
        $db = new db();
        $db = $db -> conectionDB();  
        $data='';
        $result = $db -> prepare ($sql);

        $result->bindParam(':id_usuario',$id_usuario);
        
        $result->bindParam(':contrasena',$contrasena);
        $result->execute();
        
        $count = $result->rowCount();

        $data=$result->fetch(PDO::FETCH_OBJ);

        if(!empty($userData)){

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

//FUNCIONA LA RAJA
$app->post('/login/signup',function(Request $request, Response $response){
    $id_usuario = $request->getParam('id_usuario');
    $contrasena = $request->getParam('contrasena');
    $nombre_usuario=$request->getParam('nombre_usuario');
    $email_usuario=$data=$request->getParam('email_usuario');

    /*$sql = "SELECT id_usuario FROM usuario 
    WHERE (id_usuario='$id_usuario' OR email_usuario='$email_usuario') 
    AND contrasena =:contrasena";
    */
    try{
        $username_check = preg_match('~^[A-Za-z0-9_]{3,20}$~i', $id_usuario);
        $email_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $email_usuario);
        $password_check = preg_match('~^[A-Za-z0-9!@#$%^&*()_]{6,20}$~i', $contrasena);
        
        /*echo $email_check.'<br/>'.$email;*/
        
        if (strlen(trim($id_usuario))>0 && strlen(trim($contrasena))>0 && strlen(trim($email_usuario))>0 && $email_check>0 && $username_check>0 && $password_check>0)
        {
           /* echo 'here';*/
            $db =  new db();
            $db = $db -> conectionDB();
            $userData = '';
            $sql = "SELECT id_usuario FROM usuario WHERE id_usuario='$id_usuario' or email_usuario='$email_usuario'";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id_usuario", $id_usuario,PDO::PARAM_STR);
            $stmt->bindParam("email_usuario", $email_usuario,PDO::PARAM_STR);
            $stmt->execute();
            $mainCount=$stmt->rowCount();
            $created=time();
            if($mainCount==0)
            {
                
                /*Inserting user values*/
                $sql1="INSERT INTO usuario(id_usuario,contrasena,email_usuario,nombre_usuario)
                VALUES(:id_usuario,:contrasena,:email_usuario,:nombre_usuario)";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("id_usuario", $id_usuario,PDO::PARAM_STR);
                $contrasena=hash('sha256',$contrasena);
                //echo $contrasena;
                $stmt1->bindParam("contrasena", $contrasena,PDO::PARAM_STR);
                $stmt1->bindParam("email_usuario", $email_usuario,PDO::PARAM_STR);
                $stmt1->bindParam("nombre_usuario", $nombre_usuario,PDO::PARAM_STR);
                $stmt1->execute();
                //echo"PASE EL IF";
                $userData=internalUserDetails($email_usuario);
                
            }
            
            $db = null;
         

            if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Enter valid data"}}';
            }

           
        }
        else{
            echo '{"error":{"text":"Enter valid data"}}';
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

});


//DETALLES INTERNOS DE USUARIO
function internalUserDetails($input) {
    
    try {
        $db =  new db();
        $db = $db -> conectionDB();
        
        $sql = "SELECT id_usuario, nombre_usuario, email_usuario 
        FROM usuario WHERE id_usuario=:input or email_usuario=:input";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("input", $input,PDO::PARAM_STR);
        $stmt->execute();
        $usernameDetails = $stmt->fetch(PDO::FETCH_OBJ);
        $usernameDetails->token = apiToken($usernameDetails->id_usuario);
        $db = null;
        return $usernameDetails;
        
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    
}