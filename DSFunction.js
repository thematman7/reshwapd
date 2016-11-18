function DSFunction() {
  Parse.initialize("5Mt93UzpajJ9GdFOswxOvfGFuKzYILLERKPjlSaR", "YqQXgTXdkxON3cfQDquL9L8A783YyZd2Ahuhvz2K");


	var LF = Parse.Object.extend("LF");


	var query = new Parse.Query(LF);


      var Sticker = document.getElementById("stickerInput").value;

      query.equalTo("StickerNumber", Sticker);

      console.log("sticker: " + Sticker);



      if(stickerInput.value.length==0){
        $("#noResultsFound").text("You did not type anything, please try again");
        //return; //kill the function if there is nothing selected.
      }


            	 // Here we also query the pointer that leads us to the user table.

               //setting a constraint on querry
               console.log(Sticker);

//why is nothing showing up
	query.find({

		success: function(results) { //ADD a while i<1 loop so that forms arent generated twice.
			if (results.length === 0) {
					$("#noResultsFound").text("no sticker found");
          console.log(results);

					return; //<--- stops the rest of the function.
				}

        for(var i in results){
				var catee = results[i].get("StickerNumber");
        console.log("everything below is proof of success");
        console.log(catee);
        var id = results[i].id;
				console.log(id);

				var ownername = results[i].get("contactEmail");
				console.log(ownername);


}


},
error: function(error) {
  console.log("Query Error:" + error.message);

}
})
}
