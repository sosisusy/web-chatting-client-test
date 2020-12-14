<?php

require "./vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$client = new Predis\Client([
    "scheme" => "tcp",
    "host" => "localhost",
    "port" => 6379,
]);



$dbHost = $_ENV["DB_HOST"] ?: "localhost";
$dbUser = $_ENV["DB_USER"] ?: "root";
$dbPassword = $_ENV["DB_PASSWORD"] ?: "test";
$dbDb = $_ENV["DB_DATABASE"] ?: "db";
$dbPort = $_ENV["DB_PORT"] ?: 3306;
$db = mysqli_connect($dbHost, $dbUser, $dbPassword, $dbDb, $dbPort) or die("connecting failed");


$res = $db->query("select * from STOCK_USERS LIMIT 100");

while ($row = $res->fetch_assoc()) {
    $client->set("STOCK:{$row["NO"]}::", json_encode($row));
}

// keys *
// get STOCK:1
// info keyspace