console.log("script Module load...");

pageInit();

$(document).ready(()=>{
    documentClick();

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

function getUrlParams() {     
    var params = {};  
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
        function(str, key, value) { 
            params[key] = value; 
        }
    );     
    return params;
}

function getFormParams(obj) {  
    let arg = $(obj).serialize();
    var params = {};  
    arg.replace(/([^=&]+)=([^&]*)/gi,
        function(str, key, value) { 
            params[key] = value; 
        }
    );     
    return params;
}

function documentClick() {
    $(document).on("click",()=>{
        // console.log("document click");
    });
}
