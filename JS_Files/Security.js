Parse.initialize("5Mt93UzpajJ9GdFOswxOvfGFuKzYILLERKPjlSaR", "YqQXgTXdkxON3cfQDquL9L8A783YyZd2Ahuhvz2K");


$("#logout").click(function(event) {

  Parse.User.logOut({success: function(){//DOES NOT WORK FOR SOME REASON

    //stuff inside her for some reason does not work, therefore if this is successful I just call checkLogin.

    }, error: function(){
      console.log("Logout error :"+error.message);

    } 
  });
  checkLogin();
});

//Check if the user is logged in as soon as the page has loaded. 
document.addEventListener('DOMContentLoaded', function() {
  checkLogin();
}, false);


function checkLogin() { //Checking if logged in 

  Parse.Cloud.run('checkIfUserIsLogedIn').then(function(result) {
  console.log("cloud log in seems to work");
  $("#current-user").html("Hey, "+Parse.User.current().get("username"));
  }, function(error) {
    window.location.href = "index.html";
    console.log("err", error);
  });
}




