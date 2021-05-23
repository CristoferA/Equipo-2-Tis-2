<?php
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app = new \slim\App;
//GET de todas las publicaciones

$app->get('/apiRest/publicacion', function (Request $request, Response $response){
    
    
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