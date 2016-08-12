function uploadForms() {
	Parse.initialize("5Mt93UzpajJ9GdFOswxOvfGFuKzYILLERKPjlSaR", "YqQXgTXdkxON3cfQDquL9L8A783YyZd2Ahuhvz2K");


	var Books = Parse.Object.extend("Books");

	$("#FormArea").empty(); //Clear anything that would be inside the FormArea div.
	$("#noResultsFound").empty();
	var divRow = document.createElement("DIV");
	divRow.className = "row row-centered";
	divRow.id = "row-centered";
	document.getElementById("FormArea").appendChild(divRow);




	var query = new Parse.Query(Books);

	var pageTitle = $(document).attr('title');
	console.log(pageTitle);

	if (pageTitle != "My Forms") { //Title of the page is very important!
			var category = $(document).attr('title'); //FLIMSY. THE TITLE OF THE PAGE HAS TO MATCH THE CATEGORY OF PRODUCTS IN PARSE.

			query.equalTo("category", category); //setting a constraint on querry

	if (category == "Books") {
				var Subject = document.getElementById("ChSubject").value; //in these 2 lines I look at what the filter setting are set by thr user. But what if he did not change one of the fields? assign a default value of a space so that if not selected the reult will not be affected?
				var Course = document.getElementById("CourseInput").value;
				console.log("Subject: " + Subject);
				console.log("Course: " + Course);
				query.include("user"); // Here we also query the pointer that leads us to the user table.

				var selectionFlag = false;
				if (Subject != "Select Subject") {
					query.equalTo("subject", Subject); //setting a constraint on querry
					console.log(Subject);
					selectionFlag = true;
					console.log("Sel Flag:" + selectionFlag);
				}
				if (Course !== "") {
					query.equalTo("courseName", Course); //Course constraint on the querry
					console.log(Course);
					selectionFlag = true;
				}
				if (selectionFlag === false && category == "Books") {
					$("#noResultsFound").text("You did not select anything... so here are ALL the books listed :P");
					//return; //kill the function if there is nothing selected.
				}
	}

} else {//in other words on "My Forms" page the only query constraint is the user.
		query.equalTo("user", Parse.User.current());//RESTRICING QUERY BY DEFAULT TO ONLY THOSE RESULTS THAT WERE UPLOADED BY THAT PARTICULAR USER!!!!
	}

	query.find({
		success: function(results) { //ADD a while i<1 loop so that forms arent generated twice.
			if (results.length === 0) {
				if (pageTitle != "My Forms") {
					$("#noResultsFound").text("nothing yet");
				} else {
					$("#noResultsFound").text("Looks like you have not uploaded any forms yet :(");
				}
					return; //<--- stops the rest of the function.
				}

			for (var i in results) {

				var title = results[i].get("title");
				var description = results[i].get("description");
				//var price = results[i].get("price");
				var id = results[i].id;
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
					// console.log("url:"+url);
					// img = "<img src ="+url+">";
				} else {
					var filePresence = false;
				}
				// console.log("Title:"+title);
				//The following code generates a form that contains values of the properties of the objects each row.


				var UploadForm = document.createElement("FORM");

				UploadForm.className = "display-form col-lg-4 col-md-6 col-sm-6 col-xs-12";
				UploadForm.id = "form";

				divRow.appendChild(UploadForm);
				//Display Image fieldset being created:
				var UploadPictureField = document.createElement("FIELDSET");
				UploadPictureField.className = "field-bg uploadpicture";
				UploadForm.appendChild(UploadPictureField);
				// var InputPicture = document.createElement("IMG");
				//InputPicture.id ="displayImage";
				if (filePresence === true) {
					UploadPictureField.style.backgroundImage = 'url(' + url + ')';
					UploadPictureField.style.backgroundSize = "100% 100%";
				} else {
					UploadPictureField.style.backgroundImage = "url('Images/no-file-uploaded.png')";
					UploadPictureField.style.backgroundSize = "100% 100%";
				}


				// if (filePresence == true){
				// UploadPictureField.style.backgroundImage = 'url('url')';
				// }
				// else {
				// 	UploadPictureField.style.backgroundImage = "url('Images/no-file-uploaded.png')";
				// }
				// // UploadPictureField.appendChild(InputPicture);



				//Display text info fieldset being creted:
				var DescribeElement = document.createElement("FIELDSET");
				DescribeElement.className = "field-bg uploadcategory";

				UploadForm.appendChild(DescribeElement);
				//BeginLabel1
				//describe the title display tag:
				var titleDescriptionTag = document.createElement("P");
				titleDescriptionTag.innerHTML = "Title:";
				titleDescriptionTag.className = "descriptionP";
				DescribeElement.appendChild(titleDescriptionTag);

				var ChooseCategory = document.createElement("LABEL");
				ChooseCategory.style.height = "40px";
				DescribeElement.appendChild(ChooseCategory);
				var DescribeCat = document.createElement("P");
				DescribeCat.className = "stylingDisplayP";
				ChooseCategory.appendChild(DescribeCat);
				DescribeCat.innerHTML = title;

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
				DescribeTitle.innerHTML = description;

				// Beginl Label3
				//  var EnterDescription= document.createElement("LABEL");
				// DescribeElement.appendChild(EnterDescription);
				// var DescribeDes = document.createElement("P");
				// EnterDescription.appendChild(DescribeDes);
				// DescribeDes.innerHTML = "Enter Description";

				// //crate the price description tag
				// var priceDescriptionTag = document.createElement("P");
				// priceDescriptionTag.innerHTML = "Price:"
				// priceDescriptionTag.className = "descriptionP";
				// //DescribeElement.appendChild(priceDescriptionTag);
				// //BeginLabel4
				// var EnterPrice = document.createElement("LABEL");
				// EnterPrice.style.display = "block";
				// //DescribeElement.appendChild(EnterPrice);
				// var DescribePrice = document.createElement("P");
				// DescribePrice.className = "stylingDisplayP";
				// EnterPrice.appendChild(DescribePrice);
				// DescribePrice.innerHTML = price;

				//creating a label for the contact button.
				var contactLabel = document.createElement("LABEL");
				DescribeElement.appendChild(contactLabel);



				if (pageTitle != "My Forms") {
					//Creating a button
					var contactButton = document.createElement("BUTTON");
					contactButton.id = "contactButton";
					contactButton.className = "formButton";
					contactButton.type = "button";
					contactLabel.appendChild(contactButton);
					//creating an anchor inside the button.
					var contactAnchor = document.createElement("A");

					contactAnchor.href = "mailto:" + ownername + "?Subject=Hey,%20I%20am%20interested%20in%20that%20"+title+"%20you%20got%20there"; //here I set the gref along with the email adress and the subject
					contactAnchor.innerHTML = "Contact the owner";
					contactAnchor.id = "contactAnchor";
					contactAnchor.className = "contactAnchor";
					contactButton.appendChild(contactAnchor);
				} else {
					//Creating a button
					var editButtons = document.createElement("LABEL");
					DescribeElement.appendChild(editButtons); //this will be one of the labels - this way they will be easier to adapt for mobile versions.
					var SubmitButton = document.createElement("BUTTON");
					SubmitButton.id = id;
					SubmitButton.className = "formButton";
					SubmitButton.type = "button";
					SubmitButton.addEventListener("click", function() {
						getThisForm(this.id);
					}); //complicated AF!!
					SubmitButton.innerHTML = "Edit";
					editButtons.appendChild(SubmitButton);
					//creating the delete button.
					var deleteButton = document.createElement("BUTTON");
					deleteButton.id = id;
					deleteButton.className = "formButton";
					deleteButton.type = "button";
					deleteButton.addEventListener("click", function() {
						deleteForm(this.id);
					}); //complicated AF!!
					deleteButton.innerHTML = "Delete Form";
					editButtons.appendChild(deleteButton);
					//End of the code that generates the form
				}
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
