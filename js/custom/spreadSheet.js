console.log("database module...");


let url = "https://script.google.com/macros/s/AKfycbzazQUp_6bTyENxqQvQ7JggWael_J_vnldywywmKjYMPBbt0-GdzTCSlC3InUgEebwJFg/exec";

function write(){
    return new Promise((res, rej)=>{
        $.ajax({
            url: url,
            type: "POST",
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
            data : {
                getType : getType,
                sheetName : sheetName
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

