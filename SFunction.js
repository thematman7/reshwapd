function SFunction() {
  Parse.initialize("5Mt93UzpajJ9GdFOswxOvfGFuKzYILLERKPjlSaR", "YqQXgTXdkxON3cfQDquL9L8A783YyZd2Ahuhvz2K");


	var LF = Parse.Object.extend("LF");

	$("#FormAreak").empty(); //Clear anything that would be inside the FormArea div.
	$("#noResultsFound").empty();
	var divRow = document.createElement("DIV");
	divRow.className = "row row-centered";
	divRow.id = "row-centered";
	document.getElementById("FormAreak").appendChild(divRow);


	var query = new Parse.Query(LF);


      var category = document.getElementById("categoryA").value;
      var location = document.getElementById("locationA").value;


            	 // Here we also query the pointer that leads us to the user table.

        var noCategory = true;
        var noLocation = true;

				if (category != "Item Lost:") {
          console.log(category);

          noCategory = false;
				}
				if (location !== "Place Found") {

          noLocation = false;
				}

				if (noCategory === true && noLocation === true) {
					$("#noResultsFound").text("You did not select anything... so here are ALL the items found :P");
          console.log("no selection");
          console.log(category);
				}
        else if (noCategory === false && noLocation === true) {
          query.equalTo("category", category); //setting a constraint on querry
          console.log("only category");
        }

        else if (noCategory === false && noLocation === false){
          query.equalTo("category", category);
          query.equalTo("location", location);
          console.log("both selected");
        }
        else if (noCategory === true && noLocation === false){
          query.equalTo("location", location);
          console.log("only location");
        }


//why is nothing showing up
	query.find({
		success: function(results) { //ADD a while i<1 loop so that forms arent generated twice.
			if (results.length === 0) {

					$("#noResultsFound").text("nothing yet");

					return; //<--- stops the rest of the function.
				}

			for (var i in results) {

				var catee = results[i].get("category");
        console.log("everything below is proof of success");
				var local = results[i].get("location");
        var dEscription= results[i].get("description");

				//var price = results[i].get("price");
				var id = results[i].id;
        console.log(catee);
        console.log(local);
				console.log(id);
				var ownername = results[i].get("contactEmail");
				console.log(ownername);


				//Beginning to deal with the file HERE
				var img = "";
				if (results[i].get("file")) {
					var file = results[i].get("file");
					var url = file.url();
					console.log(url);
					var filePresence = true; //used to determine if the file has been uploaded
					console.log(filePresence);
				} else {
					var filePresence = false;
				}



				var UploadForm = document.createElement("FORM");

				UploadForm.className = "display-form col-lg-4 col-md-6 col-sm-6 col-xs-12";
				UploadForm.id = "form";


				divRow.appendChild(UploadForm);

				//Display Image fieldset being created:
				var UploadPictureField = document.createElement("FIELDSET");
				UploadPictureField.className = "field-bg uploadpicture";
				UploadForm.appendChild(UploadPictureField);

				if (filePresence === true) {
					UploadPictureField.style.backgroundImage = 'url(' + url + ')';
					UploadPictureField.style.backgroundSize = "100% 100%";
				} else {
					UploadPictureField.style.backgroundImage = "url('Images/no-file-uploaded.png')";
					UploadPictureField.style.backgroundSize = "100% 100%";
				}


        ///above is successful
        //problem is below//

        //Issue #2

				//Display text info fieldset being creted:
				var DescribeElement = document.createElement("FIELDSET");
				DescribeElement.className = "field-bg uploadcategory";

				UploadForm.appendChild(DescribeElement);
				//BeginLabel1
				//describe the title display tag:

        var titleDescriptionTag = document.createElement("P");
        titleDescriptionTag.innerHTML = "location:";
        titleDescriptionTag.className = "descriptionP";
        DescribeElement.appendChild(titleDescriptionTag);

        var ChooseCategory = document.createElement("LABEL");
        ChooseCategory.style.height = "40px";
        DescribeElement.appendChild(ChooseCategory);
        var DescribeCat = document.createElement("P");
        DescribeCat.className = "stylingDisplayP";
        ChooseCategory.appendChild(DescribeCat);
        DescribeCat.innerHTML = local;

        //describe the descriptiondisplay tag:
        var descriptionDescriptionTag = document.createElement("P");
        descriptionDescriptionTag.innerHTML = "Description:";
        descriptionDescriptionTag.className = "descriptionP";
        DescribeElement.appendChild(descriptionDescriptionTag);
        // Beginl Label2
        var EnterTitle = document.createElement("LABEL");
        DescribeElement.appendChild(EnterTitle);
        var DescribeTitle = document.createElement("P");
        DescribeTitle.className = "stylingDisplayP";
        DescribeTitle.id = "insideScrollingTextDisplay";
        EnterTitle.appendChild(DescribeTitle);
        DescribeTitle.innerHTML = dEscription;









				//creating a label for the contact button.
				var contactLabel = document.createElement("LABEL");
				DescribeElement.appendChild(contactLabel);




					//Creating a button
					var contactButton = document.createElement("BUTTON");
					contactButton.id = "contactButton";
					contactButton.className = "formButton";
					contactButton.type = "button";
					contactLabel.appendChild(contactButton);
					//creating an anchor inside the button.
					var contactAnchor = document.createElement("A");

					contactAnchor.href = "mailto:" + ownername + "?Subject=Hey,%20I%20think%20you%20found%20my%20"+catee; //here I set the gref along with the email adress and the subject
					contactAnchor.innerHTML = "Contact the owner";
					contactAnchor.id = "contactAnchor";
					contactAnchor.className = "contactAnchor";
					contactButton.appendChild(contactAnchor);

				// var formDetails = document.createElement("LABEL");
// 				DescribeElement.appendChild(formDetails);
// 				formDetails.style.fontSize = "10px";
// 				var formId = document.createElement("P");
// 				formDetails.appendChild(formId);
// 				var formOwner = document.createElement("P");
// 				formDetails.appendChild(formOwner);


					// if (window.permit == true) {
					// 	formId.innerHTML = "Form id:" + id;
					// 	console.log(results[i].id);
					// 	formOwner.innerHTML = "FUploader's name: " + ownername;
					// }



				//check for admin rights.
				//http://stackoverflow.com/questions/29177755/check-if-user-has-role-parse-cloud-code


			}



		},
		error: function(error) {
			console.log("Query Error:" + error.message);

		}

	});

}
