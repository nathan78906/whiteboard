var drawButton = document.getElementById('drawButton');
var eraseButton = document.getElementById('eraseButton');
var clearButton = document.getElementById('clearButton');

var indexDrag;
var isErase = false;
var isDraw = true;
var isClear = false;

var canvasHeight = $(window).height();
var canvasWidth = $(window).width();

var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function removeClick(x , y, dragging){
  var indexX = clickX.indexOf(x);
  var indexY = clickY.indexOf(y);
  indexDrag = clickDrag.indexOf(dragging);
  if (indexX == indexY && indexX != -1){
    clickX.splice(indexX, 1);
    clickY.splice(indexY, 1);
    clickDrag.splice(indexDrag, 1);
  }
  
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
      
  for(var i=0; i < clickX.length; i++) {    
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}

function erase(){

  isErase = true;
  isDraw = false;
  isClear = false;
}

function draw(){
  isDraw = true;
  isErase = false;
}

function clear(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  clickX = [];
  clickY = [];
  clickDrag = [];
  isErase = false;
}


$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
  paint = true;
  if (isErase == true){
    removeClick(mouseX, mouseY);
  }else{
    addClick(mouseX, mouseY);
  }
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint == true && isDraw == true){
    if (isDraw == true){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    }
    else if (isErase == true){
      removeClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    }
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});