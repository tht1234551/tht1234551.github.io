console.log("login module...");

$(document).ready(()=>{
    setTimeout(loginBtnClick, 1000);
});

function loginBtnClick(){
    $("#loginForm").on("submit", (e)=>{
        e.preventDefault();
        let param = getFormParams($("#loginForm"));
        login('login','user', param).then((result)=>{
            if(result.isLogin === true) {
                console.log("login!");
                let cookieValue = JSON.stringify({id:result.id, key:"어떤값"});
                setCookie("user", cookieValue, 30);
                $(location).attr('href','/');
            }
            else if(result.isLogin !== true) console.log("login fail!");
        });
    })
}


function isLogin() {
    if(user !== null && user !== undefined && user !== '') return true;
    else return false;
}