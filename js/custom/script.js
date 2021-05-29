console.log("script...");


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