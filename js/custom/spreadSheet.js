console.log("database module...");


let url = "https://script.google.com/macros/s/AKfycbzgiq5_xHTEccY9LdqD6im_eiQsdKauZsrQxRBu-YcRHdOSC9MIL1ozf8DlyODVnWaqRA/exec";

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