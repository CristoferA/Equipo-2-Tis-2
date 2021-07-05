<?php
    class db {
        private $dbHost = 'localhost';
        private $dbUser = 'id17169638_admin_pulento';
        private $dbPass = 'ED6SjW){Gmo~*JIx';
        private $dbName = 'nombre: id17169638_atractivos_turisticos_bd';
        //aqui me conecto a la bd
        public function conectionDB(){
            $mysqlConnect = "mysql:host=$this->dbHost;dbname=$this->dbName";
            $dbConnection = new PDO($mysqlConnect,$this->dbUser,$this->dbPass);
            $dbConnection -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbConnection;

        }
    }

  
/* API key encryption */
function apiToken($session_uid)
{
    $key=md5('SITE_KEY'.$session_uid);
    return hash('sha256', $key);
}  