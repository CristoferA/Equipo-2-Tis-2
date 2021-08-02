<?php

$url = 'http://localhost/apiRest/public/publicacion_aprobada';
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPGET, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response_json = curl_exec($ch);
curl_close($ch);
$response = json_decode($response_json, true);
//echo '<pre>'; print_r($response); echo '</pre>';
//print_r($response);
?>
<a href="menu.php">
    <input name="submit" type="submit" value="Volver" class="btn solid" />
</a>

<hr>
<h1>ESTAS SON LAS PUBLICACIONES QUE ESTÁN APROBADAS</h1>
<hr>
<?php
foreach ($response as $key => $result) {
    //Hay que adaptar los div si sobra tiempo
    echo '<div>';
    echo 'Id de publicación: ';
    echo $result['id_publicacion'], '<br>';
    echo 'Nombre de publicación: ';
    echo $result['nombre_publicacion'], '<br>';
    echo 'Descripción publicación: ';
    echo $result['descripcion_publicacion'], '<br>';
    echo 'Valor publicación: ';
    echo $result['valor_publicacion'], '<br>';
    echo 'Tipo publicación: ';
    echo $result['tipo_publicacion'], '<br>';
    echo 'Estado: ';
    echo $result['estado'], '<br>';
    echo 'Tipo turismo: ';
    echo $result['tipo_turismo'], '<br>';
    echo 'Email contacto: ';
    echo $result['email_contacto'], '<br>';
    echo 'Teléfono contacto: ';
    echo $result['telefono_contacto'], '<br>';
    echo 'Dirección: ';
    echo $result['direccion'], '<br>';
    echo 'Redes sociales: ';
    echo $result['redes_sociales'], '<br>';
    echo 'Comuna publicación: ';
    echo $result['comuna_publicacion'], '<br>';
    echo 'Calificación publicación: ';
    echo $result['calificacion_publicacion'], '<br>';
    echo 'Visitas: ';
    echo $result['visitas'], '<br>';

    //Hay que adaptar los div si sobra tiempo 
    echo '</div>'; ?>
    <a href="aprobada.php?varname=<?php echo $result['id_publicacion'] ?>">
        <?php
        echo '<input name="submit" type="submit" value="Aprobar publicacion: ' . $result['id_publicacion'] . '" class="btn solid" />';
        ?>
    </a>


    <a href="rechazada.php?varname=<?php echo $result['id_publicacion'] ?>">
        <?php
        echo '<input name="submit" type="submit" value="Rechazar publicacion: ' . $result['id_publicacion'] . '" class="btn solid" />';
        ?>
    </a>

<?php
    echo '<div>';

    echo '</div>';
    echo '<hr>';
}
?>