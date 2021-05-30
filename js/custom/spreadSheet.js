console.log("exel test module...");


let url = "https://script.google.com/macros/s/AKfycbyZr0LKevcZJcpIcbFpqijBZcxEgAMruH5L6LvV_eRpCmFrsCzZZjjtn716zWONr3mgNg/exec";

function write(){
    $.ajax({
        url: url,
        data: {A:"a", B:"f"},
        type: "POST"
    }).done(()=>{
        console.log("success");
    }).fail(()=>{
        console.log("fail");
    });
}

function load(){
    $.ajax({
        url: url,
        type: "GET"
    }).done((result)=>{
        console.log(result);
    }).fail(()=>{
        console.log("fail");
    });
}

