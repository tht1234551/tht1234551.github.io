console.log("script Module load...");


$(document).ready(function(){
    pageInit();
  
});
  
function pageInit(){
    loadByajax('/view/include/nav', $("#navPlace"));
    loadByajax('/view/main', $("#content"));
    loadByajax('/view/include/footer', $("#footerPlace"));
}



function loadByajax(url, place) {
    $.ajax({
        url : url + '.html',
    })
    .done(function (data, textStatus, xhr) {
        $(place).html(data);
    })
    .fail(function(data, textStatus, errorThrown){
        console.log("error!!!");
    });
}

function saveToFile_Chrome(fileName, content) {
    var blob = new Blob([content], { type: 'text/plain' });
    objURL = window.URL.createObjectURL(blob);
            
    // 이전에 생성된 메모리 해제
    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
    var a = document.createElement('a');
    a.download = fileName;
    a.href = objURL;
    a.click();
}

function GetgoogleSpreadSheet(sheet){
    $.ajax({
        url : "https://script.google.com/macros/s/AKfycbxEm7qiFTo-9hLwLacNAFXrJEWRQaetnFyeQL_SKqn2do8Lhuwt/exec?sheetName=" + sheet
    })
    .done((result)=>{
        console.log(result);
    })
    .fail((result)=>{
        console.log(result);
    })
    ;
}