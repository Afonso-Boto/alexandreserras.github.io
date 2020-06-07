
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    var objLogin = [
        {
            username: "afonsoboto@ua.pt",
            password: "afonso"
        },
        {
            username: "tomascandeias@ua.pt",
            password: "tomas"
        },
        {
            username: "alexandreserras@ua.pt",
            password: "alexandre"
        },
        {
            username: "diogomonteiro@ua.pt",
            password: "diogo"
        },
    ]

    $('.validate-form').on('submit',function(){
        var check = true;

        if (checkCredentials(input) == false)
            check = false;
        console.log(check);
      


        
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        
        
        return check;
    });


    function checkCredentials(input) {
        var user = document.getElementById("username").value;
        var pass = document.getElementById("password").value;

        for (var i = 0; i < objLogin.length; i++) {
            if (user == objLogin[i].username && pass == objLogin[i].password) {
                console.log(username + " is logged IN!");
                return true;
            }
        }

        return false;
    }

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });


    function validate(input) {
       

        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);