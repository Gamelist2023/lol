"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var axios_1 = require("axios");
var cheerio = require("cheerio");
var readline = require("readline");
function downloadSource(url, htmlOnly) {
    return __awaiter(this, void 0, void 0, function () {
        var response_1, $_1, homeDir, downloadDir_1, indexPath, counter, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    response_1 = _a.sent();
                    $_1 = cheerio.load(response_1.data);
                    homeDir = process.env.HOME || process.env.USERPROFILE;
                    if (!homeDir) {
                        console.error("環境変数 HOME または USERPROFILE が設定されていません。");
                        return [2 /*return*/];
                    }
                    downloadDir_1 = path.join(homeDir, "Downloads", url.replace("https://", "").replace("http://", ""));
                    fs.mkdirSync(downloadDir_1, { recursive: true });
                    indexPath = path.join(downloadDir_1, "index.html");
                    counter = 1;
                    while (fs.existsSync(indexPath)) {
                        indexPath = path.join(downloadDir_1, "index(".concat(counter, ").html"));
                        counter++;
                    }
                    fs.writeFileSync(indexPath, $_1.html());
                    console.log("".concat(indexPath, " \u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F"));
                    if (!htmlOnly) {
                        $_1("script, link, img, source, frame, a").each(function (_, element) {
                            var srcUrl = $_1(element).attr("src");
                            var hrefUrl = $_1(element).attr("href");
                            var urls = [srcUrl, hrefUrl].filter(Boolean);
                            urls.forEach(function (url) {
                                if (url &&
                                    [
                                        "js",
                                        "css",
                                        "jpg",
                                        "jpeg",
                                        "png",
                                        "gif",
                                        "mp4",
                                        "html",
                                        "htm",
                                        "ogg",
                                        "mp3",
                                    ].includes(path.extname(url))) {
                                    var absoluteUrl_1 = new URL(url, response_1.config.url).href;
                                    var filePath_1 = path.join(downloadDir_1, absoluteUrl_1.replace(/^(?:\/\/|[^/]+)*\//, ""));
                                    fs.mkdirSync(path.dirname(filePath_1), { recursive: true });
                                    axios_1.default
                                        .get(absoluteUrl_1, { responseType: "stream" })
                                        .then(function (response) {
                                        var writer = fs.createWriteStream(filePath_1);
                                        response.data.pipe(writer);
                                        return new Promise(function (resolve, reject) {
                                            writer.on("finish", resolve);
                                            writer.on("error", reject);
                                        });
                                    })
                                        .then(function () {
                                        console.log("".concat(absoluteUrl_1, " \u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F"));
                                    })
                                        .catch(function (error) {
                                        console.error("\u30A8\u30E9\u30FC: ".concat(error));
                                    });
                                }
                            });
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("\u30A8\u30E9\u30FC: ".concat(error_1));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("URLを入力してください: ", function (url) {
    rl.question("HTMLのみをダウンロードしますか？ (y/n): ", function (answer) {
        var htmlOnly = answer.toLowerCase() === "y";
        downloadSource(url, htmlOnly).then(function () { return rl.close(); });
    });
});
