$(document).ready(function(){

  var array = new Array(4);
  var score = 0;
  var idCell = 0;
  var idRow = 0;

  function initArray()
  {
    for (var i = 0; i < 4; i++) {
      array[i] = new Array(4);
      for (var j = 0; j < 4; j++) {
        array[i][j] = 0;
      }
    }
    return array;
  }

  function updateArray()
  {
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array.length; j++) {
        id = calculID(j, i);
//        $('#' + id).text(array[i][j]);

        switch (array[i][j]) {
          case 0:
          $('#' + id).text(array[i][j]).css("background-color"," #cdc1b4");
          break;
          case 2:
          $('#' + id).text(array[i][j]).css("background-color"," #eee4da");
          break;
          case 4:
          $('#' + id).text(array[i][j]).css("background-color"," #ede0c8");
          break;
          case 8:
          $('#' + id).text(array[i][j]).css("background-color"," #f2b179");
          break;
          case 16:
          $('#' + id).text(array[i][j]).css("background-color"," #f59563");
          break;
          case 32:
          $('#' + id).text(array[i][j]).css("background-color"," #f67c5f");
          break;
          case 64:
          $('#' + id).text(array[i][j]).css("background-color"," #f65e3b");
          break;
          case 128:
          $('#' + id).text(array[i][j]).css("background-color"," #edcf72");
          break;
          case 256:
          $('#' + id).text(array[i][j]).css("background-color"," #edcc61");
          break;
          case 512:
          $('#' + id).text(array[i][j]).css("background-color","#edc850");
          break;
          case 1024:
          $('#' + id).text(array[i][j]).css("background-color"," #edc53f");
          break;
          case 2048:
          $('#' + id).text(array[i][j]).css("background-color"," #e8ba22");
          break;
}
        if ($('#' + id).text() == "0") {
    //      console.log("hidden on i = " + i + " et pour j = " + j + "\n");
          $('#' + id).css("visibility", "hidden");
        }
        else {
          $('#' + id).css("visibility", "");
        }
      }
    }
  }

  function calculID(x, y)
  {
    return (y * 4 + x);
  }

  function printArray()
  {
   var htmlStr = "";
   htmlStr = '<table>';

   for (var i = 0; i < 4; i++)
     {
     htmlStr += '<tr class="row">';
     for (var j = 0; j < 4; j++)
       {
         if (array[i][j] == 0)
           htmlStr += '<td class="cell" id=' + idCell + '></td>';
         else
           htmlStr += '<td class="cell" id=' + idCell + '>' + array[i][j] + '</td>';
       idCell++;
       }
     htmlStr += '</tr>';
     idRow++;
   }
   htmlStr += '</table>';
   $('body').append(htmlStr);
  }

  /*function mergeCells(cellStart, cellEnd){
      cellEnd += cellStart;
      cellStart = 0;
      score += cellEnd;
      $('.score').text(score);
   }*/

   function isFull()
   {
     for (var i = 0; i < array.length; i++) {
       for (var j = 0; j < array.length; j++) {
         if (array[i][j] == 0) {
           return false;
         }
         else {
           return true;
         }
       }
     }
   }

   function random()
   {
     var randomRow = Math.floor(Math.random() * 4);
     var randomCell = Math.floor(Math.random() * 4);
     var randFour = Math.floor(Math.random() * 8);

     if (array[randomRow][randomCell] == 0) {
       if (randFour == 1) {
         array[randomRow][randomCell] = 4;
       }
       else {
         array[randomRow][randomCell] = 2;
       }
     }
     else if (array[randomRow][randomCell] != 0)
     {
       random(); // SI TABLEAU PLEIN RISQUE DE BOUCLE INF !
     }
/*     else if (!isFull()) {
console.log("on tape dedans");
       random();
     }*/
   }

   function moveRight()
   {
     for (var i = 0; i <= 3; i++)
     {
       for (var j = 0; j <= 3; j++)
       {
         if (array[i][j] == array[i][j+1] && array[i][j+1] != 0)
         {
           array[i][j+1] += array[i][j];
           array[i][j] = 0;
           score += array[i][j+1];
           $('.score').text(score);
         }
         else if (array[i][j+1] === 0)
         {
           array[i][j+1] = array[i][j];
           array[i][j] = 0;
         }
       }
     }
     random();
   }

   function moveLeft()
   {
     var mergeDone = false;
     for (var i = 3; i >= 0; i--)
     {
       for (var j = 3; j >= 0; j--)
       {
          if (array[i][j] == array[i][j-1] && array[i][j-1] != 0 && mergeDone == false)
             {
               array[i][j-1] += array[i][j];
               array[i][j] = 0;
               score += array[i][j-1];
               $('.score').text(score);
               mergeDone = true;
             }
           else if (array[i][j-1] == 0)
           {
             array[i][j-1] = array[i][j];
             array[i][j] = 0;
           }
       }
     }
     random();
   }

   function moveTop()
   {
     for (var j = 3; j >= 0; j--)
     {
       for (var i = 3; i >= 0; i--)
       {
         if (i == 0) {
           continue;
         }
         if (array[i][j] == array[i-1][j] && array[i-1][j] != 0)
         {
           array[i-1][j] += array[i][j];
           array[i][j] = 0;
           score += array[i-1][j];
           $('.score').text(score);
         }
         else if (array[i-1][j] == 0)
         {
           array[i-1][j] = array[i][j];
           array[i][j] = 0;
         }
       }
     }
     random();
   }

   function moveBottom()
   {
     for (var j = 0; j <= 3; j++)
     {
       for (var i = 0; i <= 3; i++)
        {
          if (i == 3) {
            continue;
          }
         if (array[i][j] == array[i+1][j] && array[i+1][j] != 0)
         {
           array[i+1][j] += array[i][j];
           array[i][j] = 0;
           score += array[i+1][j];
           $('.score').text(score);
         }
         else if (array[i+1][j] == 0) {
           array[i+1][j] = array[i][j];
           array[i][j] = 0;
         }
       }
     }
     random();
   }

   $(document).keydown(function(e)
   {
     var keyCode = e.keyCode || e.which,
     arrow = {left: 37, up: 38, right: 39, down: 40 };

     switch (keyCode) {

       case arrow.left:
       moveLeft();
       updateArray();
       break;

       case arrow.up:
       moveTop();
       updateArray();
       break;

       case arrow.right:
       moveRight();
       updateArray();
       break;

       case arrow.down:
       moveBottom();
       updateArray();
       break;
     }
   });

   function newGame()
   {
     score = 0;
     $('.score').text(score);
     initArray()
     random();
     random();
     updateArray();
   }

   $('.right').click(function(){
     moveRight();
     updateArray();
   });

   $('.left').click(function(){
     moveLeft();
     updateArray();
   });

   $('.top').click(function(){
     moveTop();
     updateArray();
   });

   $('.bottom').click(function(){
     moveBottom();
     updateArray();
   });

   $('.newGame').click(function(){
     newGame();
   });

   printArray(initArray());

});
