$(function(){
    //character count
    $("#tweet-textarea").on("keyup change", updateCount);
    //new tweet ajax
    //$.post('/', "david");
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