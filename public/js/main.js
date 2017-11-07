$(function(){
    $("#tweet-textarea").on("keyup", function(event){
        if ($(this).val().length <= 140){
            let tweetRem = (140 - $(this).val().length)
            $('#tweet-char').text(tweetRem);
        }
    });
});