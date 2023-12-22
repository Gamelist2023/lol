//window.onload = function(){
$(document).ready(function () {
    var chk_agree = document.getElementById("chk_agree");
    chk_agree.checked = false;

    var ua = window.navigator.userAgent.toLowerCase();
    var osflag = false;
    var osType = "";
    var brwsflag = false;

    if (ua.indexOf("windows nt 10.0") !== -1) {
        //infoArray.OSチェック="Microsoft Windows 10";
        osflag = true;
        osType = "win"
    } else if (ua.indexOf("windows nt 6.3") !== -1) {
        //infoArray.OSチェック="Microsoft Windows 8.1";
        osflag = false;
        osType = "win"
    } else if (ua.indexOf("windows nt 6.1") !== -1) {
        //infoArray.OSチェック="Microsoft Windows 7";
        osflag = false;
        osType = "win"
    } else if (ua.indexOf('ipad') > -1) {
        //infoArray.OSチェック="ipad";
        osflag = true;
        osType = "ipad"
    } else if (ua.indexOf('macintosh') > -1 && 'ontouchend' in document) {
        //infoArray.OSチェック="ipad";
        osflag = true;
        osType = "ipad"
    } else if (ua.indexOf("mac os x") !== -1) {
        //infoArray.OSチェック="macOS";
        osflag = true;
        osType = "mac"
    } else if (ua.indexOf("cros") !== -1) {
        //infoArray.OSチェック="Chrome OS";
        osflag = true;
        osType = "chrome"
    } else {
        //infoArray.OSチェック="対象外です";
        osflag = false;
        osType = ""
    }


    if (ua.indexOf("trident/7.0") !== -1) {//ua.indexOf("msie") !== -1 || IE11からmsieは削除されたので記述を抜いた
        //infoArray.ブラウザチェック="Internet Explorer　11";
        brwsflag = false;
    } else if (ua.indexOf("edg") !== -1) {
        //infoArray.ブラウザチェック="Microsoft Edge";
        brwsflag = false;
    } else if (ua.indexOf("opr") !== -1) {
        //infoArray.ブラウザチェック="Opera";
        brwsflag = false;
    } else if ((ua.indexOf("chrome") !== -1 || ua.indexOf("crios") !== -1) && osType !== "ipad") {
        //infoArray.ブラウザチェック="Chrome";
        brwsflag = true;
    } else if (ua.indexOf("chrome") !== -1 || ua.indexOf("crios") !== -1) {
        //infoArray.ブラウザチェック="Chrome";
        brwsflag = false;
    } else if (ua.indexOf("safari") !== -1 && osType == "ipad") {
        //infoArray.ブラウザチェック="Safari";
        brwsflag = true;
    } else if (ua.indexOf("safari") !== -1 && osType == "ipad") {
        //infoArray.ブラウザチェック="Safari";
        brwsflag = true;
    } else if (ua.indexOf("safari") !== -1) {
        //infoArray.ブラウザチェック="Safari";
        brwsflag = false;
    } else {
        //infoArray.ブラウザチェック="対象外です";
        brwsflag = false;
    }
    if (osflag == true) {
        document.getElementById("div_os").style.display = "none";//.className="bg_gray";
        //document.getElementById("i_os_chk").className="ace-icon fa fa-circle-o check";
    } else {
        document.getElementById("div_os").className = "err";
        document.getElementById("i_os_chk").className = "ace-icon fa fa-remove check";
    }

    if (brwsflag == true) {
        document.getElementById("div_brws").style.display = "none";//.className="bg_gray";
        //document.getElementById("i_brws_chk").className="ace-icon fa fa-circle-o check";
    } else {
        document.getElementById("div_brws").className = "err";
        document.getElementById("i_brws_chk").className = "ace-icon fa fa-remove check";
    }

    var p_information = document.getElementById("p_information");
    var p_chk_err_msg = document.getElementById("p_chk_err_msg");
    var div_start_btn = document.getElementById("div_start_btn");
    var div_after1 = document.getElementById("div_after1");
    var div_after2 = document.getElementById("div_after2");
    var div_kakunin = document.getElementById("div_kakunin");
    var div_sound = document.getElementById("div_sound");
    var div_sound_msg = document.getElementById("div_sound_msg");

    if (osflag == true && brwsflag == true) {
        p_information.style.display = "none";

        p_chk_err_msg.style.display = "none";
        div_start_btn.style.display = "block";
        div_after1.style.display = "none";
        div_after2.style.display = "none";
        div_kakunin.style.display = "block";
        div_sound.style.display = "flex";
        div_sound_msg.style.display = "flex";
    } else {
        $(".test_information").hide();
        p_information.style.display = "block";

        p_chk_err_msg.style.display = "block";
        div_start_btn.style.display = "none";
        div_after1.style.display = "block";
        div_after2.style.display = "block";
        div_kakunin.style.display = "none";
        div_sound.style.display = "none";
        div_sound_msg.style.display = "none";
    }
});
function fnc_chk_agree() {
    var chk_agree = document.getElementById("chk_agree");
    var btn_start = document.getElementById("btn_start");
    if (chk_agree.checked == true) {
        btn_start.disabled = false;
    } else {
        btn_start.disabled = true;
    }
};
$(function () {
    var sound = null;
    var $audioButton = $("#audiobutton");
    var $audioIcon = $("#audio-icon");

    $audioButton.val('再生できません');
    $audioButton.prop('disabled', true);

    sound = new Howl({
        src: ['../files/audioCheck.mp3'],
        preload: true,
        onload: function () {
            $audioButton.val('Play');
            $audioButton.prop('disabled', false);
        }
    });

    $audioButton.on('touchstart click', function (event) {
        // touchstartとclickが二重に発生しないようにする
        event.preventDefault();

        if (sound.playing()) {
            // 再生中は一時停止する
            $audioButton.val('Play');
            $audioIcon.removeClass('audio_pause');
            $audioIcon.addClass('audio_play');
            sound.pause();
        } else {
            // 一時停止中は再生する
            $audioButton.val('Pause');
            $audioIcon.removeClass('audio_play');
            $audioIcon.addClass('audio_pause');
            sound.play();
        }
    });

    // 再生終了
    sound.on('end', function () {
        // 再生位置を先頭に移動
        sound.seek(0);

        $audioButton.val('Play');
        $audioIcon.removeClass('audio_pause');
        $audioIcon.addClass('audio_play');
    });
});