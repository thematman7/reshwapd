function deleteLF (clicked_id){

  Parse.initialize("5Mt93UzpajJ9GdFOswxOvfGFuKzYILLERKPjlSaR", "YqQXgTXdkxON3cfQDquL9L8A783YyZd2Ahuhvz2K");

  console.log("wasap");

  var LF = Parse.Object.extend("LF");
  var query = new Parse.Query("LF");

  query.equalTo("objectId", clicked_id);
  console.log(objectId);
  
  query.find().then(function(results) {
    return Parse.Object.destroyAll(results);
  }).then(function(){
    console.log("done");
    var done = 1;//necessary so the page is refreshed only after the object is deleted, otherwse it does not work.
    if (done == 1){
    AFunction();//This will refresh the page as soon as the page is reloaded
    //maybe also print that the form has been succesfully deleted?
  }
  }, function(error) {
    console.log("failed to upload" + error.message);
  });

}
