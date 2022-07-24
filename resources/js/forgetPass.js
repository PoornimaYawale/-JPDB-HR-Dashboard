
var jpdbBaseUrl = "http://api.login2explore.com:5577";
var connToken = "90939278|-31949286959835706|90939733";

var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var userDBName = "HR-DB";
var empRelationName = "EmpData";
var userRelationName = "HRData";
var jpdbMailUrl = "/serverless/send_email";

function setCurrRecNo2LS(jsonObj)
{
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem("rec_no", data.rec_no);
}
function getCurrRecNoFromLS()
{
    return localStorage.getItem("rec_no");
}

function saveRandomPass(jsonStr)
{
    var updateRequest = createUPDATERecordRequest(connToken, jsonStr, userDBName, userRelationName,getCurrRecNoFromLS());
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(jsonObj);
    return jsonObj.status;
}

function sendMail()
{
     var email = $('#forgetemail').val();
   
    var jsonStr = { email: email};
    var jsonObj = JSON.stringify(jsonStr);
    var getRequest = createGET_BY_KEYRequest(connToken, userDBName, userRelationName, jsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommand(getRequest, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 400)
    {
        $('#wrongmail').html("Enter correct email address");
    }
    else if( resJsonObj.status === 200)
    {   
       var genratedPass = generatePassword();
       setCurrRecNo2LS(resJsonObj);  
       var jsonStrObj = {
           password: genratedPass
         };
         console.log(jsonStrObj);
         var jsonString = JSON.stringify(jsonStrObj);
         var succesStatus = saveRandomPass(jsonString);
       
        if(succesStatus === 400){
            alert("pass update status 400");
          }
          else if(succesStatus === 200){
              emailSent(genratedPass ,email);
          
          }
        
         
    }
}
function emailSent(genratedPass,email)
{
   
    var subject = "New Password";
    var content = "your new Password is " + genratedPass + ". please Change your password after login once.";
    var jsonEmailStrObj = {
        emailTo: email,
        emailSubject :subject,
        emailContent: content
        };
        
    var jsonEmailStr = JSON.stringify(jsonEmailStrObj);
    var emailsent = createEmailToSendReq(connToken, jsonEmailStr);
    jQuery.ajaxSetup({async: false});
    var resMailObj = executeCommandAtGivenBaseUrl(emailsent, jpdbBaseUrl, jpdbMailUrl);
    jQuery.ajaxSetup({async: true}); 
    if(resMailObj.status === 200)
    {
        $('#wrongmail').html("password sent on Email Successfully");
    }
}
function generatePassword() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
      
    for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
                    * str.length + 1);
          
        pass += str.charAt(char)
    }
      
    return pass;
}