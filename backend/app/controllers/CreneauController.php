<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

class CreneauController
{


    public  function index()
    {



        echo "heelooo";
    }



    //read all creneau dispo
    public function read($date)
    {
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            $creneau = new Creneau();

            $result = $creneau->read($date);

            if ($result) {
                echo json_encode($result);
            } else {
                echo json_decode(
                    array('message' => 'aucun crenel dipso pour le moment')
                );
            }
        } else  echo json_encode(
            array('message' => 'change method to GET')
        );
    }
}
