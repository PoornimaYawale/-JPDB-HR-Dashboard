var jpdbBaseUrl = "http://api.login2explore.com:5577";
var connToken = "90939278|-31949286959835706|90939733";

var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var userDBName = "HR-DB";
var empRelationName = "EmpData";
var userRelationName = "HRData";

setBaseUrl(jpdbBaseUrl);
function setCurrRecNo2LS(jsonObj)
{
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem("rec_no", data.rec_no);
}
function getCurrRecNoFromLS()
{
    return localStorage.getItem("rec_no");
}

function saveNewPass()
{
    jsonStr = validatePass();
    var updateRequest = createUPDATERecordRequest(connToken, jsonStr, userDBName, userRelationName,getCurrRecNoFromLS());
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(jsonObj);
    $('#changePassSuccess').html("Password changed Successfully");
    resetForm();
}

function validatePass()
{
   
    var currPass, newPass, cnfmNewPass;
    currPass = $('#currpass').val();
    newPass =$('#newpass').val();
    cnfmNewPass = $('#confirmnewpass').val();

    if(currPass === '' || currPass.length< 8){
        $('#cuurpasserror').html('password should be at least 8 characters');
        $('#cuurpasserror').fadeOut(4000); 
        $('#currpass').focus();
        return "";
    }
    if(newPass === '' || newPass.length< 8){
        $('#newpasserror').html('password should be at least 8 characters');
        $('#newpasserror').fadeOut(4000); 
        $('#newpass').focus();
        return "";
    }
    if(cnfmNewPass === '' || cnfmNewPass !== newPass){
    
        $('#cnfmnewpasserror').html('password should be same as entered before');
        $('#cnfmnewpasserror').fadeOut(4000); 
        $('#confirmnewpass').focus();
        return "";
    }
    var jsonStr = { password: currPass};
    var passJsonObj = JSON.stringify(jsonStr);
   
    var getRequest = createGET_BY_KEYRequest(connToken, userDBName, userRelationName, passJsonObj);
   
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});
  
    if(resJsonObj.status === 400){
        $('#cuurpasserror').html("enter correct current password");

    }
    else if(resJsonObj.status === 200){ 
        setCurrRecNo2LS(resJsonObj);  
          var  jsonStrObj = {
              password: newPass,
              confrimPassword: cnfmNewPass
            };
            console.log(jsonStrObj);
            return JSON.stringify(jsonStrObj);
           
    }
    else{
        alert("status not 400 or 200");
    }
    
   
}

function resetForm()
{
    $('#currpass').val('');
    $('#newpass').val('');
    $('#confirmnewpass').val('');
}