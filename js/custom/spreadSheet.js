console.log("exel test module...");


let url = "https://script.google.com/macros/s/AKfycbwO-VrOz_JxoDsxv2aVIfIvzT10K4Ls4ZeCH2kK9n9Jq03NHCIjwxq_cjwDsvD3pKuDSg/exec";

function write(){
    $.ajax({
        url: url,
        data: {A:"a", B:"f"},
        type: "POST"
    }).done((result)=>{
        console.log(result);
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

