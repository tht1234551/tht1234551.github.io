console.log("database module...");


let url = "https://script.google.com/macros/s/AKfycbxKCGItNBQVzfh3m1yRms1bcXAHlxVrmmEi5Sh4Kq-NOfNvhHP8i3Ji7nmqS3UMvZqdLg/exec";

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

