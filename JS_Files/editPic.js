function editPic() {
        var fileElement = $("#post-file")[0];
        var filePath = $("#post-file").val();
        var fileName = filePath.split("\\").pop();
        console.log("location 1")
        if (fileElement.files.length > 0) {
          var file = fileElement.files[0];
          console.log(file);
          loadImage(file);
        }
      }

      //loadImage FUNCTION BEGINS HERE
function loadImage(src){
  //  Prevent any non-image file type from being read.
  if(!src.type.match(/image.*/)){
    console.log("The dropped file is not an image: ", src.type);
    return;
  }

  //  Create our FileReader and run the results through the render function.
  var reader = new FileReader();
  reader.onload = function(e){
    render(e.target.result);
  };
  reader.readAsDataURL(src);
}


//The rendering of the image function.
var MAX_HEIGHT = 100;
function render(src){
  var image = new Image();
  image.onload = function(){
    var canvas = document.getElementById("myCanvas");
    if(image.height > MAX_HEIGHT) {
      image.width *= MAX_HEIGHT / image.height;
      image.height = MAX_HEIGHT;
    }
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
  };
  image.src = src;
}