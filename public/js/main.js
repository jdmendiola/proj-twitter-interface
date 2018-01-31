$(function(){
    //character count
    $("#tweet-textarea").on("keyup change", updateCount);
    //ajax
    $('#ajaxTest').on('click', function(e){
        console.log("fire");
        $.post('/post', {name: "Jack Nicholson played the joker"}, function(data){
            $('body').html(data);
        });
    });
});

function updateCount(){
    let tweetRem = (140 - $(this).val().length);
    $('#tweet-char').text(tweetRem);
    if (tweetRem < 0){
        $('#tweet-char').css("color", "red");
    } else {
        $('#tweet-char').css("color", "inherit");
    }        
}