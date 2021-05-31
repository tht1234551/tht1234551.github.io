console.log("navbar module...");


$(document).ready( function() {
    navBtnActive();
    navColorTrans();
    navTogglerAction();
    loadByajax("/view/loginModal", $("#loginModal"));
});


function navBtnActive() {
    $(".innerPage > .nav-item > .nav-link").on("click", function (e) {
        e.preventDefault();
        loadByajax(this.href, $("#content"));
        $("#content").addClass("bg-white text-dark");

        if(window.innerWidth <= 991) {
            $("#navCollapseBtn").click();
            let con = $(".navbar-toggler")[0].ariaExpanded === "true";
            navColorChange(con);
        }
        // $("#content").load(this.href);
    });

    $("#loginBtn").on("click", (e)=>{
        console.log('login');
        // $("body").css("margin-right", 17 + 'px');      
    });
}

function navColorTrans() {
    $(window).scroll(function () {
        let con = $(".navbar-toggler")[0].ariaExpanded === "true";
        if(con) return;
        navColorChange($(window).scrollTop() > 0);
    });
}

function navTogglerAction() {
    $("nav > .container-fluid > .navbar-toggler").on("click", function () {
        let con = this.ariaExpanded === "true";
        if(!($(window).scrollTop() > 0)) navColorChange(con);
    });
}

function navColorChange(condition) {
    if(condition) whiteNav();
    else notWhiteNav();
}

function whiteNav() {
    $("nav").addClass("bg-white");
    $("nav").addClass("navbar-light");
    $("nav").removeClass("navbar-dark");
}

function notWhiteNav() {
    $("nav").removeClass("bg-white");
    $("nav").removeClass("navbar-light");
    $("nav").addClass("navbar-dark");
}