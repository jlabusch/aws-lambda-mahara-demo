<?php
$cfg = new stdClass();

$branch = 'master';

// database connection details
// valid values for dbtype are 'postgres8' and 'mysql5'
$cfg->dbtype   = 'postgres';
$cfg->dbhost   = 'postgres';
$cfg->dbuser   = 'postgres';
$cfg->dbname   = "postgres";
$cfg->dbpass   = 'maharapassword'; 

$cfg->dataroot = "/var/lib/maharadata/$branch";

$cfg->sendemail = false;
$cfg->sendallemailto = 'abc@example.com';

$cfg->productionmode = false;
$cfg->perftofoot = true;
