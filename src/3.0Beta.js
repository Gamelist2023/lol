// 画像のURLをここで指定できるよ
var images = {
    "1": "https://github.com/gamelist1990/gamelist1990/blob/main/%E5%A3%81%E7%B4%99/Screenshots/101669128_p0.jpg?raw=true",
    "2": "https://github.com/gamelist1990/gamelist1990/blob/main/%E5%A3%81%E7%B4%99/Screenshots/2.jpg?raw=true",
    "3": "https://github.com/gamelist1990/gamelist1990/blob/main/%E5%A3%81%E7%B4%99/Screenshots/IMG_2567.JPG?raw=true",
    "4": "https://rmdgames.com/wp-content/uploads/2022/04/wallpaper116-1535x818.gif",
    "5": "https://rmdgames.com/wp-content/uploads/2022/04/wallpaper5-1024x546.gif",
    "6": "https://rmdgames.com/wp-content/uploads/2022/04/wallpaper10-1535x818.gif"
};

// メニューを作成
var menu = document.createElement("div");
menu.id = "menu";
menu.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(128, 128, 128, 0.9); padding: 20px; color: black; transition: opacity 0.5s ease-in-out; opacity: 0; display: none; border-radius: 10%; z-index: 9999;";
menu.innerHTML = `
    <h1 style="text-align: center;">背景画像選択</h1>
    <p style="text-align: center;">以下のオプションから背景画像を選んでください。<br>プレビュー画像の読み込みには少し時間が掛かります</p>
    <p style="text-align: center;">スマホの解像度に合わせるように変更しました</p>
    <div style="display: flex; justify-content: center; align-items: center;">
        <select id="imageSelect" style="margin-right: 10px;">
            <option value="1">アクアリウムの夢</option>
            <option value="2">空飛ぶ夢</option>
            <option value="3">月明かりの断崖</option>
            <option value="4">海</option>
            <option value="5">夜空</option>
            <option value="6">千と千尋</option>
        </select>
        <button onclick="updateBackground()" style="margin-left: 10px;">実行</button>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
        <img id="preview" style="width: 200px; height: 150px;">
    </div>
    <footer style="text-align: center; margin-top: 20px;">©ver.3.0Beta版</footer>
    <div id="closeMenu" style="position: absolute; right: 10px; top: 10px; cursor: pointer;">×</div>
`;


// メニューをページに追加
document.body.appendChild(menu);

// プレビュー画像を更新
document.getElementById('imageSelect').addEventListener('change', function () {
    var img = new Image();
    img.onload = function () {
        document.getElementById('preview').src = this.src;
    };
    img.src = images[this.value];
});

// メニューを閉じる
document.getElementById('closeMenu').addEventListener('click', function () {
    menu.style.opacity = '0';
    setTimeout(function () {
        menu.style.display = 'none';
    }, 500);
    openMenuButton.innerText = '開く';
    openMenuButton.style.animation = '';
});

// 背景を更新する関数
function updateBackground() {
    var color = document.getElementById('imageSelect').value;
    var imageUrl = images[color];
    if (imageUrl) {
        var style = `
        body {
           background: url("${imageUrl}") center/100% fixed;
           background-repeat: no-repeat;
           background-size: cover;
        }`;
        var elem = document.createElement('style');
        elem.type = 'text/css';
        elem.innerText = style;
        document.head.appendChild(elem);
        // メニューを削除
        menu.style.opacity = '0';
        setTimeout(function () {
            menu.style.display = 'none';
        }, 500);
        openMenuButton.innerText = '開く';
        openMenuButton.style.animation = '';
    } else {
        alert("ERROR");
    }
}

// メニューのサイズを調整
function adjustMenuSize() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (width < 500) {
        menu.style.width = '80%';
        menu.style.height = '80%';
    } else {
        menu.style.width = '50%';
        menu.style.height = '50%';
    }

    if (height < 500) {
        menu.style.height = '80%';
    } else {
        menu.style.height = '50%';
    }
}

// ウィンドウのサイズが変更されたときにメニューのサイズを調整
window.addEventListener('resize', adjustMenuSize);

// 初期化時にメニューのサイズを調整
adjustMenuSize();

// メニューを開くボタンを作成
var openMenuButton = document.createElement("button");
openMenuButton.id = "openMenuButton";
openMenuButton.style = "position: fixed; right: 20px; bottom: 20px; background-color: rgba(0,0,0,0.5); color: white; border-radius: 50%; width: 50px; height: 50px; border: none; cursor: pointer; transition: transform 0.3s ease-in-out;";
openMenuButton.innerText = "開く";
openMenuButton.onclick = function () {
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
        setTimeout(function () {
            menu.style.opacity = '1';
        }, 0);
        openMenuButton.innerText = '閉じる';
        openMenuButton.style.animation = 'click 0.3s ease-in-out';
    } else {
        menu.style.opacity = '0';
        setTimeout(function () {
            menu.style.display = 'none';
        }, 500);
        openMenuButton.innerText = '開く';
        openMenuButton.style.animation = 'click 0.3s ease-in-out';
    }
};

// メニューを開くボタンをページに追加
document.body.appendChild(openMenuButton);

// ボタンのサイズを調整
function adjustButtonSize() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (width < 500) {
        openMenuButton.style.width = '40px';
        openMenuButton.style.height = '40px';
    } else {
        openMenuButton.style.width = '50px';
        openMenuButton.style.height = '50px';
    }
}

// ウィンドウのサイズが変更されたときにボタンのサイズを調整
window.addEventListener('resize', adjustButtonSize);

// 初期化時にボタンのサイズを調整
adjustButtonSize();
