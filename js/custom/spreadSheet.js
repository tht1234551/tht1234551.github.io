console.log("exel test module...");


let url = "https://script.google.com/macros/s/AKfycbzvGu1CYpbtxnvORlmh1B8yLXp1MioY_3nCDg5pZZMr6LbaPsxvlj9RRlEvzcfc_xYYmA/exec";

function write(){
    return new Promise((res, rej)=>{
        $.ajax({
            url: url,
            data: {A:"a", B:"f"},
            type: "POST"
        }).done((result)=>{
            console.log(result);
            res(result);
        }).fail(()=>{
            console.log("fail");
            rej("fail");
        });
    });
}

function load(){
    return new Promise((res, rej)=>{
        $.ajax({
            url: url,
            type: "GET"
        }).done((result)=>{
            console.log(result);
            res(result);
        }).fail(()=>{
            console.log("fail");
            rej("fail");
        });
    })
}

