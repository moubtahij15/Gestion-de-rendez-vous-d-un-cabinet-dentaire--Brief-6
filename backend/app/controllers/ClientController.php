<?php 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


header('Access-Control-Allow-Methods: POST');
 header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

class ClientController {


  public  function index(){



        echo "heelooo";
    }
        // register client
        public function register(){
            

            if($_SERVER["REQUEST_METHOD"] == "POST"){

                    $client = new Client();
                  //get posted data
                  $data= json_decode(file_get_contents("php://input"));
                  // create client
                        $register=$client->register($data);
                  if($register){

                  echo json_encode(
                          array('message' => 'client Created and his reff is : ' .$register)
                          );
              }else { 
                      echo json_encode(
                      array('message' => 'client Not Created')
                      );
              }

            } else  echo json_encode(
                    array('message' => 'change method to Post')
                          );
             

          }

          //login client
          public function login($reff){
                $client = new Client();

                if($client->login($reff)){
                        
                   echo json_encode(
                    array('message' => 'successfuly login ' )
                     );     

                }
                else  echo json_encode(
                        array('message' => 'failed login')
                              );


          }




}