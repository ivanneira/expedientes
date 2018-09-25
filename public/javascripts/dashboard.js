$(function(){

    $('#salir').click(function(){

        $.ajax({
            method: "GET",
            url: "logout",
            success: function(data){

                console.log(data);

                window.location.href = "/";
            }

        });
    });
});