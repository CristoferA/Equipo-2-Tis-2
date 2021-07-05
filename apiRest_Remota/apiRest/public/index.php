<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, Accept");
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require  '../vendor/autoload.php';
require '../src/config/db.php';


$app = new \Slim\App;




//ruta de cosas

require '../src/rutas/contacta.php';
require '../src/rutas/demandante.php';
require '../src/rutas/moderador.php';
require '../src/rutas/oferente.php';
require '../src/rutas/publica.php';
require '../src/rutas/publicacion.php';
require '../src/rutas/usuario.php';
require '../src/rutas/visitante.php';
require '../src/rutas/visualiza.php';
require '../src/rutas/login.php';


//$app->post('/login','login'); /* User login */
//$app->post('/signup','signup'); /* User Signup  */
//$app->get('/getFeed','getFeed'); /* User Feeds  */
//$app->post('/feed','feed'); /* User Feeds  */
//$app->post('/feedUpdate','feedUpdate'); /* User Feeds  */
//$app->post('/feedDelete','feedDelete'); /* User Feeds  */
//$app->post('/getImages', 'getImages');



/*
$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});
*/
$app->run();

//CORREJIR CON LOS DATOS NUESTROS SOLO ES UN COPYPASTEEEE

/************************* USER LOGIN *************************************/
/* ### User login ### */
/*
function login() {
    
    $request = \Slim\App::getInstance()->request();
    $data = json_decode($request->getBody());
    
    try {
        
        $db = getDB();
        $userData ='';
        $sql = "SELECT nombre_usuario, email_usuario, id_usuario FROM usuario 
        WHERE (id_usuario=:usuario or email_usuario=:usuario) and contrasena=:contrasena ";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id_usuario", $data->usuario, PDO::PARAM_STR);
        $password=hash('sha256',$data->contrasena);
        $stmt->bindParam("contrasena", $contrasena, PDO::PARAM_STR);
        $stmt->execute();
        $mainCount=$stmt->rowCount();
        $userData = $stmt->fetch(PDO::FETCH_OBJ);
        
        if(!empty($userData))
        {
            $user_id=$userData->user_id;
            $userData->token = apiToken($user_id);
        }
        
        $db = null;
         if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Bad request wrong username and password"}}';
            }

           
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
*/

/* ### User registration ### */
/*
function signup() {
    $request = \Slim\App::getInstance()->request();
    $data = json_decode($request->getBody());
    $email_usuario=$data->email_usuario;
    $nombre_usuario=$data->nombre_usuario;
    $id_usuario=$data->id_usuario;
    $contrasena=$data->contrasena;
    
    try {
        
        $username_check = preg_match('~^[A-Za-z0-9_]{3,20}$~i', $id_usuario);
        $email_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $email_usuario);
        $password_check = preg_match('~^[A-Za-z0-9!@#$%^&*()_]{6,20}$~i', $contrasena);
        
       
        if (strlen(trim($id_usuario))>0 && strlen(trim($contrasena))>0 && strlen(trim($email_usuario))>0 && $email_check>0 && $username_check>0 && $password_check>0)
        {
           
            $db = getDB();
            $userData = '';
            $sql = "SELECT id_usuario FROM usuario WHERE id_usuario=:id_usuario or email_usuario=:email_usuario";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id_usuario", $id_usuario,PDO::PARAM_STR);
            $stmt->bindParam("email_usuario", $email_usuario,PDO::PARAM_STR);
            $stmt->execute();
            $mainCount=$stmt->rowCount();
            $created=time();
            if($mainCount==0)
            {
                
                //Inserting user values
                $sql1="INSERT INTO usuario(id_usuario,contrasena,email_usuario,nombre_usuario)
                VALUES(:id_usuario,:contrasena,:email_usuario,:nombre_usuario)";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("id_usuario", $id_usuario,PDO::PARAM_STR);
                $password=hash('sha256',$data->password);
                $stmt1->bindParam("contrasena", $contrasena,PDO::PARAM_STR);
                $stmt1->bindParam("email_usuario", $email_usuario,PDO::PARAM_STR);
                $stmt1->bindParam("nombre_usuario", $nombre_usuario,PDO::PARAM_STR);
                $stmt1->execute();
                
                $userData=internalUserDetails($email);
                
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
}
*/
/*function email() {
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $email=$data->email;

    try {
       
        $email_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $email);
       
        if (strlen(trim($email))>0 && $email_check>0)
        {
            $db = getDB();
            $userData = '';
            $sql = "SELECT user_id FROM emailUsers WHERE email=:email";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("email", $email,PDO::PARAM_STR);
            $stmt->execute();
            $mainCount=$stmt->rowCount();
            $created=time();
            if($mainCount==0)
            {
                
                /*Inserting user values*/
                /*
                $sql1="INSERT INTO emailUsers(email)VALUES(:email)";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("email", $email,PDO::PARAM_STR);
                $stmt1->execute();
                
                
            }
            $userData=internalEmailDetails($email);
            $db = null;
            if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Enter valid dataaaa"}}';
            }
        }
        else{
            echo '{"error":{"text":"Enter valid data"}}';
        }
    }
    
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
*/

/* ### internal Username Details ### */
/*
function internalUserDetails($input) {
    
    try {
        $db = getDB();
        $sql = "SELECT user_id, name, email, username FROM users WHERE username=:input or email=:input";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("input", $input,PDO::PARAM_STR);
        $stmt->execute();
        $usernameDetails = $stmt->fetch(PDO::FETCH_OBJ);
        $usernameDetails->token = apiToken($usernameDetails->user_id);
        $db = null;
        return $usernameDetails;
        
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    
}

function getFeed(){
  
   
    try {
         
        if(1){
            $feedData = '';
            $db = getDB();
          
                $sql = "SELECT * FROM feed  ORDER BY feed_id DESC LIMIT 15";
                $stmt = $db->prepare($sql);
                $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
                $stmt->bindParam("lastCreated", $lastCreated, PDO::PARAM_STR);
          
            $stmt->execute();
            $feedData = $stmt->fetchAll(PDO::FETCH_OBJ);
           
            $db = null;

            if($feedData)
            echo '{"feedData": ' . json_encode($feedData) . '}';
            else
            echo '{"feedData": ""}';
        } else{
            echo '{"error":{"text":"No access"}}';
        }
       
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

}

function feed(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id=$data->user_id;
    $token=$data->token;
    $lastCreated = $data->lastCreated;
    $systemToken=apiToken($user_id);
   
    try {
         
        if($systemToken == $token){
            $feedData = '';
            $db = getDB();
            if($lastCreated){
                $sql = "SELECT * FROM feed WHERE user_id_fk=:user_id AND created < :lastCreated ORDER BY feed_id DESC LIMIT 5";
                $stmt = $db->prepare($sql);
                $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
                $stmt->bindParam("lastCreated", $lastCreated, PDO::PARAM_STR);
            }
            else{
                $sql = "SELECT * FROM feed WHERE user_id_fk=:user_id ORDER BY feed_id DESC LIMIT 5";
                $stmt = $db->prepare($sql);
                $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
            }
            $stmt->execute();
            $feedData = $stmt->fetchAll(PDO::FETCH_OBJ);
           
            $db = null;

            if($feedData)
            echo '{"feedData": ' . json_encode($feedData) . '}';
            else
            echo '{"feedData": ""}';
        } else{
            echo '{"error":{"text":"No access"}}';
        }
       
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

}

function feedUpdate(){

    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id=$data->user_id;
    $token=$data->token;
    $feed=$data->feed;
    
    $systemToken=apiToken($user_id);
   
    try {
         
        if($systemToken == $token){
         
            
            $feedData = '';
            $db = getDB();
            $sql = "INSERT INTO feed ( feed, created, user_id_fk) VALUES (:feed,:created,:user_id)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("feed", $feed, PDO::PARAM_STR);
            $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
            $created = time();
            $stmt->bindParam("created", $created, PDO::PARAM_INT);
            $stmt->execute();
            


            $sql1 = "SELECT * FROM feed WHERE user_id_fk=:user_id ORDER BY feed_id DESC LIMIT 1";
            $stmt1 = $db->prepare($sql1);
            $stmt1->bindParam("user_id", $user_id, PDO::PARAM_INT);
            $stmt1->execute();
            $feedData = $stmt1->fetch(PDO::FETCH_OBJ);


            $db = null;
            echo '{"feedData": ' . json_encode($feedData) . '}';
        } else{
            echo '{"error":{"text":"No access"}}';
        }
       
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

}



function feedDelete(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id=$data->user_id;
    $token=$data->token;
    $feed_id=$data->feed_id;
    
    $systemToken=apiToken($user_id);
   
    try {
         
        if($systemToken == $token){
            $feedData = '';
            $db = getDB();
            $sql = "Delete FROM feed WHERE user_id_fk=:user_id AND feed_id=:feed_id";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
            $stmt->bindParam("feed_id", $feed_id, PDO::PARAM_INT);
            $stmt->execute();
            
           
            $db = null;
            echo '{"success":{"text":"Feed deleted"}}';
        } else{
            echo '{"error":{"text":"No access"}}';
        }
       
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }   
    
}
$app->post('/userImage','userImage'); /* User Details */
/*
function userImage(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id=$data->user_id;
    $token=$data->token;
    $imageB64=$data->imageB64;
    $systemToken=apiToken($user_id);
    try {
        if(1){
            $db = getDB();
            $sql = "INSERT INTO imagesData(b64,user_id_fk) VALUES(:b64,:user_id)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
            $stmt->bindParam("b64", $imageB64, PDO::PARAM_STR);
            $stmt->execute();
            $db = null;
            echo '{"success":{"status":"uploaded"}}';
        } else{
            echo '{"error":{"text":"No access"}}';
        }
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

$app->post('/getImages', 'getImages');
function getImages(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id=$data->user_id;
    $token=$data->token;
    
    $systemToken=apiToken($user_id);
    try {
        if(1){
            $db = getDB();
            $sql = "SELECT b64 FROM imagesData";
            $stmt = $db->prepare($sql);
           
            $stmt->execute();
            $imageData = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo '{"imageData": ' . json_encode($imageData) . '}';
        } else{
            echo '{"error":{"text":"No access"}}';
        }
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}*/