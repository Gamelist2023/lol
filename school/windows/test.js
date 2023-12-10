(function () {
    // 新しいウィンドウを開く
    var newWindow = window.open("", "", "width=500,height=500");

    // CSSを作成
    var css = '<link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet">';
    css += '<style>';
    css += 'body { font-family: Caveat, cursive; }';
    css += 'form { background-color: #f0f0f0; padding: 20px; border-radius: 10px; }';
    css += 'button { background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border: none; border-radius: 4px; }';
    css += 'img { max-height: 300px; }';
    css += '/* scrollbar */';
    css += '::-webkit-scrollbar { background: transparent; width: 5px; }';
    css += '::-webkit-scrollbar-corner { background: transparent; }';
    css += '::-webkit-scrollbar-track { background: transparent; }';
    css += '::-webkit-scrollbar-thumb { background: linear-gradient(180deg, rgba(6,171,255,1) 5%, rgba(102,0,204,1) 97%); -webkit-border-radius: 1ex; }';
    css += '</style>';

    // HTML要素を作成
    var main = '<div>';
    main += '<h1>壁紙変更スクリプト</h1>';
    main += '<p>このスクリプトではオプションから選んだ画像をページに適応できますまたオプションで選択した画像のプレビューも表示することができるよ</p>';

    // Formを作成
    var form = '<form id="form">';
    form += '<select id="url" onchange="loadImage();">';
    form += '<option value="https://github.com/gamelist1990/gamelist1990/blob/main/%E5%A3%81%E7%B4%99/Screenshots/101669128_p0.jpg?raw=true">水族館？</option>';
    form += '<option value="https://github.com/gamelist1990/gamelist1990/blob/main/%E5%A3%81%E7%B4%99/Screenshots/2.jpg?raw=true">提灯</option>';
    form += '</select>';
    form += '<button type="button" onclick="applyImage();">適用</button>';
    form += '</form>';
    form += '<img id="preview" style="width: 100%; height: auto; object-fit: contain;">';

    // JavaScriptを作成
    var script = '<script>';
    script += 'function loadImage() {';
    script += 'var url = document.getElementById("url").value;';
    script += 'document.getElementById("preview").src = url;';
    script += '}';
    script += 'function applyImage() {';
    script += 'try {';
    script += 'window.opener.document.body.style.backgroundImage = "url(" + document.getElementById("url").value + ")";';
    script += 'window.opener.document.body.style.backgroundSize = "contain";';
    script += '} catch (e) {';
    script += 'alert("エラーが発生しました: " + e.message);';
    script += '}';
    script += '}';
    script += '</script>';

    //ver.1.0
    var end = '</div>'; // ここを修正
    end += '<footer>©ver.1.0</footer>';


    // HTMLとJavaScriptをウィンドウに書き込む
    newWindow.document.write('<head>' + css + '</head><body>' + main + form + script + end + '</body>');
    newWindow.onload = function () {
        newWindow.loadImage();
        newWindow.document.getElementById("url").onchange();
    };
})();
