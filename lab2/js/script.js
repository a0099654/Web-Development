var images = ["charger.png", "money.png", "open_book.png", "plate.png", "wallet.png"];

var input, chosenLeft, chosenRight;
var leftArray = [];
var rightArray = [];
var score = 0;
var clicks_number = 0;

$("#btn").click(function () {
    $("#gen").hide();
    $("#tbl").find('tbody').empty();  //to clear DOM
    leftArray.length = 0;
    rightArray.length = 0;
    
    input = $(document).find('#n').val();
    $("#msg").text("Now match cell from the left column with the one on the right column.");

    for (var i=0; i<input; i++) {
        leftArray.push(i);
        rightArray.push(i);
    }
    
    shuffle(leftArray);
    shuffle(rightArray);

    while(checkToReshuffle(leftArray,rightArray,input)){
        shuffle(leftArray);
    }
    
    if (input < 2 || input > 12) {
        $("#msg").text("Please enter value between 2 and 12");
    } else {
        for (var i=0; i<input; i++) {
            
            $("#tbl").find('tbody')
               .append($('<tr>')
                       .append($('<td class="left_img" id="right_move">').append($('<img class="left_target">').attr('src', 'img/' + images[leftArray[i]]).text(leftArray[i]))) //left
                       .append($('<td class="blank">&nbsp;</td>'))
                       .append($('<td class="right_img" id="left_move">').append($('<img class="right_target">').attr('src', 'img/' + images[rightArray[i]]).text(rightArray[i]))) //right
            );      
        }
    }

    $(document).ready(function(){ 
            
        $(".left_target").click(function(event){
            $("#msg").text("Now match this with...");
            $(event.target).addClass("clicked");
            chosenLeft = $(event.target).attr("src").toString();
            
            if ($( this ).hasClass( "clicked" ) &&  (chosenRight == chosenLeft)) {
                
                    $(this).addClass("silhoutte");
                    if($(this).parent().hasClass("left_img")){
                        $(this).parent().addClass("avoid-clicks");
                    }
                
                    $("#msg").text("Congratulations: Match");
                    score++;
                    
                    if(score == input){
                        $("#msg").text("Game Over. Restart?");
                        $("#gen").show();
                    }
                    //both has silhouette
                    //both can't be click
                   
            }else{
                 $(this).removeClass("silhoutte");
            }
        });//for left table


        $(".right_target").click(function(event){
            $("#msg").text("Now match this with...");
            $(event.target).addClass("clicked");
            chosenRight = $(event.target).attr("src").toString();
            
            if ($(this).hasClass( "clicked" ) && (chosenRight == chosenLeft)) {
                
                    $(this).addClass("silhoutte");
                    if($(this).parent().hasClass("right_img")){
                        $(this).parent().addClass("avoid-clicks");
                    }
                
                    $("#msg").text("Congratulations: Match");
                    score++;
                    
                    if(score == input){
                        $("#msg").text("Game Over. Restart?");
                        $("#gen").show();
                    }
                    //both has silhouette
                    //both can't be click
                   
            }else{
                $(this).removeClass("silhoutte");
            }
            
        });//for right table
        
    });//end of document function

});

function shuffle (Array){
    var length = Array.length -1;
    var toSwap;
    var tempNumber;
    
    for(var i = length; i > 0; i--){
        toSwap = Math.floor(Math.random() * i);
        tempNumber = Array[i];
        Array[i] = Array[toSwap];
        Array[toSwap] = tempNumber;
    }
    return Array;
}

function checkToReshuffle (Array_1, Array_2, length){
    for(var i = 0; i<length; i++ ){
        if(Array_1[i] == Array_2[i]){
            return true;
        }
    }
    return false;
}

