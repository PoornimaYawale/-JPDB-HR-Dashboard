var jpdbBaseURL= "http://api.login2explore.com:5577";
var jpdbIRL= "/api/irl";
var jpdbIML= "/api/iml";
var userDBName= "HR-DB";
var userRelationName = "HRData";
var connToken = "90939278|-31949286959835706|90939733";

setBaseUrl(jpdbBaseURL);

function checkUser()
{
   
    var email = $('#email').val();
    if(email === ''){
       alert("enter email address");
    }
    var pwd = $('#password').val();
    var jsonStr = {
         email: email,
         password: pwd
    };
    var getRequest = createGET_BY_KEYRequest(connToken, userDBName, userRelationName, JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommand(getRequest,irlPartUrl);
    if(jsonObj.status === 400)
    {
        $('#msg').html("Incorrect Email or Password");
        $('#msg').fadeOut(6000);        
        $('#email').val('');        
        $('#password').val('');        
        $('#email').focus();        
    }
    else if(jsonObj.status === 200)
    {
        createSession(email);
        localStorage.setItem("Email", email);
    }
    jQuery.ajaxSetup({async: true});
}

function createSession(email)
{
     var sessionTokenStatus = createJpdbSessionToken(connToken ,1, userDBName ,userRelationName , email);
     if(sessionTokenStatus === 200)
     {
        if(localStorage.getItem('req-url')!== null)
        {
            window.location.href = localStorage.getItem('req-url');
            localStorage.removeItem('req-url');
        }
        else{
            window.location.replace('/home.html');
        }
     }else {
        $('#email').val('');
        $('#password').val('');
        alert('Unable to Login');
        return;
     }
     return;
}