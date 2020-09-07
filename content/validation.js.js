function validEmail(email) { if (email == ""){return false;} badStuff = ";:/,' \"\\"; for (i=0; i<badStuff.length; i++) { badCheck = badStuff.charAt(i); if (email.indexOf(badCheck,0) != -1){return false;} } posOfAtSign = email.indexOf("@",1); if (posOfAtSign == -1){return false;} if (email.indexOf("@",posOfAtSign+1) != -1){return false;} posOfPeriod = email.indexOf(".", posOfAtSign); if (posOfPeriod == -1){return false;} if (posOfPeriod+2 > email.length){return false;} return true; } 

function IsEmpty(objWord)
{ var blnIsEmpty = true; var blnObjectPrm=false; var i=0; var strWord=''; var objThis; strWord = objWord; while(i<strWord.length && blnIsEmpty) { if (strWord.charAt(i)!=' ') blnIsEmpty=false; i++; } if (blnIsEmpty) { return true; } else { return false; } }

function validURL(url)
{ if (IsEmpty(url)) { return false; } else { var j = new RegExp(); j.compile("^[A-Za-z]+://[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+"); if (!j.test(url)) { return false; } else return true; } } 


function textCounter(field,cntfield,maxlimit) { if (field.value.length > maxlimit) field.value = field.value.substring(0, maxlimit); else cntfield.value = maxlimit - field.value.length;
} 


function check_values(frm)
{ if (frm.search.value=='' && frm.id.value=='') { alert('Please Enter Item to Search'); return false; } }