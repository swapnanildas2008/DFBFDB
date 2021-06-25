img = "";
status = "";
objects = [];

function preload(){
  song = loadSound('preview.mp3');
}

function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(640, 420);
  video.hide();
  obj = ml5.objectDetector('cocossd',modelloaded);
  document.getElementById("status").innerHTML = "status detecting objects";
}

function modelloaded(){
  console.log("modeloaded");
  status = "true";
}

function gotresult(e,r){
  if(e){
    console.error(e);
  }

  else{
    console.log(r);
    objects = r;
  }
}

function draw() {
  image(video, 0, 0, 640, 420);
  if(status != ""){
    obj.detect(video, gotresult);
    for(i = 0; i < objects.length; i++){
      document.getElementById("status").innerHTML = " status: Object detected";
      percent = floor(objects[i].confidence * 100);
      name_image = objects[i].label;
      x = objects[i].x;
      y = objects[i].y;
      width = objects[i].width;
      height = objects[i].height;
    fill("#FF0000");
    text(name_image+" "+percent+"%", x, y);
    noFill();
    stroke("#FF0000");
    rect(x, y, width, height);
    if(name_image == "person"){
      document.getElementById("object").innerHTML = "Baby found";
    }
    else{
      document.getElementById("object").innerHTML = "Baby not found";
      song.play();
    }
    }
  }
}