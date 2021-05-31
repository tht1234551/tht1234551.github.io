console.log("login module...");

$(document).ready(()=>{
    setTimeout(loginBtnClick, 1000);
});

function loginBtnClick(){
    $("#loginForm").on("submit", (e)=>{
        e.preventDefault();
        console.log("login");
        let param = getFormParams($("#loginForm"));
        console.log(param);
        login('login','user', param);
    })
}


