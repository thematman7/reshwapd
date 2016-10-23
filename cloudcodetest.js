//LOG IN
//This is the code that is run on the client computer when he loads the page:
$("#login").submit(function (event){
	event.preventDefault();
	var name = $("#login-name").val();
	var pass = $("#login-password").val();

	var application = { //CLOUD CODE: create the object that will pass to cloud code
		//and contain all the info neccessary for the cloud code function to run.
		email: name,
		password: pass
	};

	//console.log(application.email)

	//validating email:
	var emailAddressArray = name.split("@");
	var emailHost = emailAddressArray[1];

	// console.log(emailHost);
	if (emailHost == "lawrenceville.org") {
		var emailConfirmed = true;
		$("#login-email-missmatch-message").empty();
	}
	else {
		emailConfirmed = false;
		document.getElementById("login-email-missmatch-message").innerHTML = "wrong email following '@'";
		return;
	}

	Parse.Cloud.run('confirmLogin', application ).then(function(ratings) {
	  console.log("holy moly, it works!");
	});

	// Parse.User.logIn(name, pass, {success: function(){
	// 	console.log("Login Success");
	// 	checkLogin();
	// 	window.location.href = "books.html";

	// 	}, error: function(){
	// 		console.log("Login error :"+error.message);

	// 	}
	// });
});



// https://parse.com/docs/js/api/classes/Parse.Cloud.html#methods_run
//https://parse.com/docs/cloudcode/guide#functions

// Here is what is in the cloud code:
Parse.Cloud.define("confirmLogin", function(request, response) {
	Parse.User.logIn(application.email, application.pass, {success: function(){
			console.log("Login Success");

			}, error: function(){
				repsponse.error("Login error :"+error.message);
				console.log("Login error :"+error.message);

			}
		});
});
