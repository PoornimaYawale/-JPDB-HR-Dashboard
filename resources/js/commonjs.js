
var jpdbBaseUrl = "http://api.login2explore.com:5577";
var connToken = "90939278|-31949286959835706|90939733";

var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var userDBName = "HR-DB";
var empRelationName = "EmpData";
var userRelationName = "HRData";
var sessionRelationName ="HRData_session";

setBaseUrl(jpdbBaseUrl);

var myName;
var myStatus;

function checkSession()
{
    console.log("Inside:checkSession()");
    jQuery.ajaxSetup({async: false});
    var sessionStatus = isJpdbSessionTokenExists(connToken, userDBName, userRelationName, empRelationName);
    jQuery.ajaxSetup({async: true});
    console.log("sessionStatus:" +sessionStatus);
    if(sessionStatus === 400)
    {
        if(myStatus === "in")
        {
            window.location.href = "/loginPage.html";
        }else{
            return;
        }
    } else if(sessionStatus === 200)
    {
        if(myStatus === "out"){
            window.location.href = "/home.html";
        }else{
            return;
        }
    }
       
    return;
    
}

function loadName()
{   

    var emailid = localStorage.getItem("Email");
    $("#myUser").html(emailid);
 
}
function loadHeader()
{
    currentTab();
    loadName();
}

function currentTab()
{
    if(myName === "home"){
        $('#myHome').prop('class','active');
    }
    if(myName === "profile"){
        $('#myProfile').prop('class','active');
    }
    if(myName === "change"){
        $('#myChangePass').prop('class','active');
    }
    if(myName === "empform"){
        $('#myEmployee').prop('class','active');
    }
     return;
}



function deleteSession()
{
    jQuery.ajaxSetup({async: false});
    var removeSession = removeSessionTokenFromJPDB(connToken, userDBName, userRelationName, empRelationName);
    jQuery.ajaxSetup({async: true});

    if(removeSession === 200)
    {
        console.log("Session removed");
        localStorage.removeItem('rec_no');
        window.location.href = "/loginPage.html";
       
    }else{
       return ;
    }
    
}