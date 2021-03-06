﻿//檔案拖曳結束
$(document).ready(() => {
    let fileSelect = document.getElementById('fileSelect');
    fileSelect.addEventListener('change', Drop, false);
});

let Allowdrag = function (ev) {
    event.preventDefault();
};

//檔案拖曳中
let Drop = (ev) => {
    event.preventDefault();
    let files;
    FileType = document.getElementById('hidUploadType').value,//取得可上傳附檔名
        FileTypeArray = FileType.replace(/\*./g, "").split(';'),//將可上傳附檔名切割成陣列來判斷
        ErrorFileList = "",//錯誤訊息
        saveErrorList = "",
        successCount = $("#UploadArea img").length,//檔案上傳成功的數量
        fileArryLength = 0,
        sumCount = 0;

    if (ev.target.id == 'fileDrag') {
        files = ev.dataTransfer.files;
    }
    else {
        files = ev.target.files;
    }

    for (i = 0; i < files.length; i++) { //依據檔案數量一個一個往Server上丟
        fileArryLength = files[i].name.split('.').length;//有檔名內有多個. 所以要知道該檔名的附檔名的話這邊是用split切割取最後一個為附檔名
        if (i == files.length - 1) {
            sumCount = files.length;
        }

        if ($.inArray(files[i].name.split('.')[fileArryLength - 1].toLowerCase(), FileTypeArray) !== -1) { //判斷檔案類型是否為可上傳類型
            saveErrorList = SaveFiles(files[i].name, files[i], i, sumCount);//呼叫存檔涵式
            successCount += 1;
        }
        else {
            ErrorFileList += files[i].name + "\n";
        }
    }

    $("#uploadSuccess").text(successCount);
    if (ErrorFileList !== "") {//不符合附檔名，錯誤訊息
        alert(ErrorFileList + '上傳失敗' + '\n' + '上傳檔案的類型必須是' + FileType + '\n' + '上傳結束，共上傳成功' + successCount + '個檔案');
    }

    //if (saveErrorList !== "") {//存檔失敗，錯誤訊息
    //    alert('存檔失敗：\n' + saveErrorList);
    //}
};

//存檔用
let SaveFiles = async(fileName, files, count, sumCount) => {
    let fd = new FormData(),
        t = getQueryString("t"),
        tagSrc = '',
        errorFileName = '';

    fd.append(fileName, files);

    if (document.getElementsByClassName('uploadContent').length != 0) {
        count = document.getElementsByClassName('uploadContent').length;
    }

    console.log(count);

    let div = document.createElement('div');
    div.id = "uploadContent-" + count;
    div.className = "uploadContent";
    div.innerHTML = ['<p class="loading"></>'];
    document.getElementById('fileDrag').append(div);   

    fetch('fmUpload?upLoadType=' + t + '&count=' + sumCount, {
        method: 'POST',
        body: fd
    }).then(res => {
        let fr = new FileReader();
        document.getElementById(div.id).innerHTML = "";
        if (t === "img") {            
            fr.onload = async () => {                
                let fileTag = await createImgTag(files);                
                document.getElementById(div.id).appendChild(fileTag);
            };
        }
        else if (t === "Doc" || t === "Compression") {
            tagSrc = getTagSrc(fileName);
            fr.onload = createTag(fileName, tagSrc, div.id);
        }

        fr.readAsDataURL(files);
    });

    return errorFileName;
};

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

//顯示圖片縮圖用
let createImgTag = async(files) => {
    let convertImg = await toBase64(files),//將圖片轉成base64
        fileTag = document.createElement('img');//建立img元素
    
    fileTag.src = convertImg;//指定元素連結    

    return fileTag;
};

//顯示文件icon用
let getTagSrc = (fileName) => {

    let Extansion = fileName.split(".")[fileName.split('.').length - 1],
        fileTagSrc = "";

    if (Extansion === "doc" || Extansion === "docx")
        fileTagSrc = "../../Content/img/icon/doc.ico";

    if (Extansion === "xls" || Extansion === "xlsx")
        fileTagSrc = "../../Content/img/icon/xls.ico";

    if (Extansion === "ppt" || Extansion === "pptx")
        fileTagSrc = "../../Content/img/icon/ppt.ico";

    if (Extansion === "pdf")
        fileTagSrc = "../../Content/img/icon/pdf.ico";

    if (Extansion === "zip")
        fileTagSrc = "../../Content/img/icon/zip.png";

    if (Extansion === "7z")
        fileTagSrc = "../../Content/img/icon/7zip.png";

    if (Extansion === "rar")
        fileTagSrc = "../../Content/img/icon/rar.png";

    return fileTagSrc;
};

let createTag =  (fileName, fileTagSrc , divID) => {
    let FileTag = document.createElement("img"),//建立img元素        
        fileNameDiv = document.createElement("div"),
        fileNamep = document.createElement("p"),
        fileNameDivText = document.createTextNode(fileName);

    FileTag.src = fileTagSrc;
    fileNameDiv.className = "uploadDocDiv";
    fileNameDiv.appendChild(FileTag);
    fileNamep.appendChild(fileNameDivText);
    fileNameDiv.appendChild(fileNamep);

    document.getElementById(divID).appendChild(fileNameDiv);
};

let getQueryString =  (name) => {  //取得Querystring  e.g. var s = QueryString("s");
    let hostUrl = window.location.search.substring(1),
        aQueryString = hostUrl.split("&");

    for (var i = 0; i < aQueryString.length; i++) {
        var queryString = aQueryString[i].split("=");
        if (queryString[0] === name) {
            return queryString[1];
        }
    }
    return "";
};