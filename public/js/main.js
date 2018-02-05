$(function(){

    //character count
    $("#tweet-textarea").on("keyup change", updateCount);
    //ajax
    $('#tweetSubmit').on('click', function(e){
        
        let tweetMessage = $('#tweetData').val();        

        if (tweetMessage.length <= 140 && tweetMessage.length !== 0 && tweetMessage.length !== null){
            console.log(tweetMessage);
            $.post('/post', {name: tweetMessage}, function(data){
                $('#tweetsList').html(data);
            });            
        } else {
            alert('tweet message too long please shorten....');
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