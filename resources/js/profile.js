var jpdbBaseURL= "http://api.login2explore.com:5577";
var jpdbIRL= "/api/irl";
var jpdbIML= "/api/iml";
var userDBName= "HR-DB";
var userRelationName = "HRData";
var connToken = "90939278|-31949286959835706|90939733";

setBaseUrl(jpdbBaseURL);
function setCurrRecNo2LS(jsonObj)
{
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem("rec_no", data.rec_no);
}
function getCurrRecNoFromLS()
{
    return localStorage.getItem("rec_no");
}

function getUserFromEmail()
{   
  
    var emailId = localStorage.getItem('Email');
    document.getElementById("newemail").value = emailId;
    var jsonStr = { email: emailId};
    var empIdJsonObj = JSON.stringify(jsonStr);
    //showData(jsonStr);
    var getRequest = createGET_BY_KEYRequest(connToken, userDBName, userRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 400)
    {
        $('#save').prop('disabled', false);
        $('#edit').prop('disabled', false);
        
    }
    else if ( resJsonObj.status === 200)
    {
        $('#newemail').prop('disabled', true);
        showprofileData(resJsonObj);
        $('#save').prop('disabled', false);
        $('#edit').prop('disabled', false);
        $('#newname').focus();
        
    }
}

function saveChangeData()
{
    jsonChg = validateChangeData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, userDBName, userRelationName,getCurrRecNoFromLS());
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(jsonObj);
    $("#profilechange").html("Profile Changed Successfully");
    resetprofileForm();
    $('#newemail').focus();
   
}

function showprofileData(jsonObj)
{
 
    var data = (JSON.parse(jsonObj.data)).record;
    setCurrRecNo2LS(jsonObj);
    $('#newname').val(data.name);
    $('#newphone').val(data.phoneNo);
 

}
function validateChangeData()
{
    var newname, newphone;
    newname=$('#newname').val();
    newphone=$('#newphone').val();

    if(newname === ''){
        $("#newnameerror").html('Employee Name needed');
        $('#newname').focus();
        return "";
    }
    if(newphone === '' || newphone.length <10){
        $("#newphoneerror").html('Enter 10 digit phone no');
        $('#newphone').focus();
        return "";
    }
   
    var profileJsonStrObj = {
           name: newname,
           phoneNo: newphone,
          
    };
    return JSON.stringify(profileJsonStrObj);
}
function resetprofileForm()
{
    $('#newname').val('');
    $('#newphone').val('');
}
