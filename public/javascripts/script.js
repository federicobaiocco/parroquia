$(function() {
    $('#enviar').on("click", function(){
        var cantidad = document.getElementById("cantidad").value;
        if(cantidad>100)
        {
            $("#cantidad").addClass("temblar");
            $("#cantidad").addClass("border-red");
        }
        if(cantidad<1)
        {
            $("#cantidad").addClass("temblar");
            $("#cantidad").addClass("border-red");
        }
        if(cantidad == "")
        {
            $("#cantidad").addClass("temblar");
            $("#cantidad").addClass("border-red");
        }
    });
});

