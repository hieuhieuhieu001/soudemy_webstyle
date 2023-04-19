$(document).ready(function(){
    // opent register table
    $(".btn-user").on("click", function(){
        $(".register-form").show();
    })

    $(".btn-exit").on("click", function(){
        $(".register-form").hide();
    })
})