<?php
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;



// GET Lista de una publicacion especifica por ID 
$app->get('/review/{id_publicacion}', function(Request $request, Response $response){
    $id_publicacion = $request->getAttribute('id_publicacion');
    $sql = "SELECT * FROM review WHERE id_publicacion = '$id_publicacion'";
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


$app->post('/review/new', function(Request $request, Response $response){
    $id_review = $request->getAttribute('id_review');
    $review = $request->getAttribute('review');


    $id_publicacion = $request->getAttribute('id_publicacion');


    

    $sql= "INSERT INTO review (id_review, review, id_publicacion) 
    VALUES (:id_review, :review, :id_publicacion)";

    try{
        $db = new db();
        $db = $db -> conectionDB();
        $result = $db -> prepare ($sql);

        $result->bindParam(':id_review',$id_review);
        $result->bindParam(':review',$review);
        $result->bindParam(':id_publicacion',$id_publicacion);
        

        $result->execute();
        echo json_encode("review Guardada");
        $result=null;
        $db=null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}'; 
    }

});