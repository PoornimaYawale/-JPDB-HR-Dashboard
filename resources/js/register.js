var jpdbBaseURL= "http://api.login2explore.com:5577";
var jpdbIRL= "/api/irl";
var jpdbIML= "/api/iml";
var userDBName= "HR-DB";
var userRelationName = "HRData";
var connToken = "90939278|-31949286959835706|90939733";

setBaseUrl(jpdbBaseURL);

function registerUser()
{
    var jsonStrObj = validateData();
    if(jsonStrObj === ''){
        return '';
    }
    var putRequest =  createPUTRequest(connToken, jsonStrObj, userDBName, userRelationName);
    jQuery.ajaxSetup({async:false});
    var jsonObj = executeCommand(putRequest, imlPartUrl);
    jQuery.ajaxSetup({async:true});
    $('#successregister').html('Registration successful');
    resetForm();

}

function validateData()
{
    var hrname,hremail,phoneno,pass,cnfmpass;
    hrname=$('#name').val();
    hremail=$('#registeremail').val();
    phoneno =$('#phoneno').val();
    pass =$('#registerpassword').val();
    cnfmpass =$('#confirmpassword').val();

    if(hrname === ''){
        $('#nameerror').html('Enter Name');
        $('#nameerror').fadeOut(4000);   
        $('#name').focus();
        return "";
    }
    if(hremail === ''){
        $('#emailerror').html('Enter email'); 
        $('#emailerror').fadeOut(4000); 
        $('#registeremail').focus();
        return "";
    }
   
    if(phoneno.length < 10 || phoneno.length >10){

        $('#phoneerror').html('Phone number should be 10 digits');
        $('#phoneerror').fadeOut(4000); 
        $('#phoneno').focus();
        return "";
    }
    if(pass === '' || pass.length <8){
        $('#passerror').html('password should be at least 8 characters');
        $('#passerror').fadeOut(4000); 
        $('#registerpassword').focus();
        return "";
    }
    if(cnfmpass === '' || cnfmpass !== pass){
        $('#cnfrmpasserror').html('password should be same as entered before');
        $('#cnfrmpasserror').fadeOut(4000); 
        $('#confirmpassword').focus();
        return "";
    }
    

    var jsonStrObj = {
           name: hrname,
           email: hremail,
           phoneNo: phoneno,
           password: pass,
           confrimPassword: cnfmpass
    };
    return JSON.stringify(jsonStrObj);
}
function resetForm(){

   $('#name').val('');
   $('#registeremail').val('');
   $('#phoneno').val('');
   $('#registerpassword').val('');
   $('#confirmpassword').val('');
}