<?php
error_reporting(-1);
ini_set('display_errors', 1);
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require  '../vendor/autoload.php';
require '../src/config/db.php';

$app = new \Slim\App;

//ruta de cosas
require '../src/rutas/publicacion.php';
/*
$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});
*/
$app->run();