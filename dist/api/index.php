<?php

include 'db.php';

use Database\DBController;

$db = new DBController();
$db->hello();