$(function(){

    //character count
    $("#tweet-textarea").on("keyup change", updateCount);
    //ajax
    $('#tweetSubmit').on('submit', function(e){

        e.preventDefault();
        
        let tweetMessage = $("#tweet-textarea").val();        

        if (tweetMessage.length <= 140 && tweetMessage.length !== 0 && tweetMessage.length !== null){
            console.log(tweetMessage);
            $.post('/post', {name: tweetMessage}, function(data){
                $('#most-recent-tweets').html(data);
                $("#tweet-textarea").val('');
                $('#tweet-char').text('140');
                alert('Tweet submitted!');
            });
        }

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