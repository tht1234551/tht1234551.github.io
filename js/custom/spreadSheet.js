console.log("database module...");


let url = "https://script.google.com/macros/s/AKfycbycAiPwJ4Sx1-hUQD1hyT2iW9jUgpN9Y02kgUvlWY5s6mve19_SYWc8P1py8Jj0OqsGHw/exec";

function write(){
    return new Promise((res, rej)=>{
        $.ajax({
            url: url,
            type: "POST",
            dataType : 'json',
            data: {
                A:"a",
                B:"f",
                sheetName : "test"
            }
        }).done((result)=>{
            console.log(result);
            res(result);
        }).fail(()=>{
            console.log("fail");
            rej();
        });
    });
}

function read(getType, sheetName){
    return new Promise((res, rej)=>{
        $.ajax({
            url: url,
            type: "GET",
            dataType : 'json',
            data : {
                getType : getType,
                sheetName : sheetName,
            }
        }).done((result)=>{
            console.log(result);
            res(result);
        }).fail(()=>{
            console.log("fail");
            rej();
        });
    })
}

function login(getType, sheetName, param){
    return new Promise((res, rej)=>{
        console.log(param);
        $.ajax({
            url: url,
            type: "GET",
            dataType : 'json',
            data : {
                getType : getType,
                sheetName : sheetName,
                id : param.id,
                password : param.password
            }
        }).done((result)=>{
            console.log(result);
            res(result);
        }).fail(()=>{
            console.log("fail");
            rej();
        });
    })
}