console.log("script Module load...");

pageInit();

$(document).ready(()=>{
    documentClick();

});


async function pageInit(){
    await loadByajax('/view/include/nav', $("#navPlace"));
    await loadByajax("/view/modal/loginModal", $("#loginModal"));
    await loadByajax('/view/main', $("#content"));
    await loadByajax('/view/include/footer', $("#footerPlace"));
    await loadByajax('/view/modal/detailsModal', $("#customModal"));
}



function loadByajax(url, place) {
    return new Promise((res, rej)=>{
        $.ajax({
            url : url + '.html',
        })
        .done(function (data, textStatus, xhr) {
            $(place).html(data);
            res();
        })
        .fail(function(data, textStatus, errorThrown){
            console.log("error!!!");
            rej();
        });
    })
    
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
