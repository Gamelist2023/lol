import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import * as cheerio from "cheerio";
import * as readline from "readline";

async function downloadSource(url: string, htmlOnly: boolean) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const homeDir = process.env.HOME || process.env.USERPROFILE;
    if (!homeDir) {
      console.error("環境変数 HOME または USERPROFILE が設定されていません。");
      return;
    }

    const downloadDir = path.join(
      homeDir,
      "Downloads",
      url.replace("https://", "").replace("http://", "")
    );
    fs.mkdirSync(downloadDir, { recursive: true });

    let indexPath = path.join(downloadDir, "index.html");
    let counter = 1;
    while (fs.existsSync(indexPath)) {
      indexPath = path.join(downloadDir, `index(${counter}).html`);
      counter++;
    }
    fs.writeFileSync(indexPath, $.html());
    console.log(`${indexPath} をダウンロードしました`);

    if (!htmlOnly) {
      $("script, link, img, source, frame, a").each((_, element) => {
        const srcUrl = $(element).attr("src");
        const hrefUrl = $(element).attr("href");
        const urls = [srcUrl, hrefUrl].filter(Boolean);
        urls.forEach((url) => {
          if (
            url &&
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
            ].includes(path.extname(url))
          ) {
            const absoluteUrl = new URL(url, response.config.url).href;
            const filePath = path.join(
              downloadDir,
              absoluteUrl.replace(/^(?:\/\/|[^/]+)*\//, "")
            );
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            axios
              .get(absoluteUrl, { responseType: "stream" })
              .then((response) => {
                const writer = fs.createWriteStream(filePath);
                response.data.pipe(writer);
                return new Promise((resolve, reject) => {
                  writer.on("finish", resolve);
                  writer.on("error", reject);
                });
              })
              .then(() => {
                console.log(`${absoluteUrl} をダウンロードしました`);
              })
              .catch((error) => {
                console.error(`エラー: ${error}`);
              });
          }
        });
      });
    }
  } catch (error) {
    console.error(`エラー: ${error}`);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("URLを入力してください: ", (url) => {
  rl.question("HTMLのみをダウンロードしますか？ (y/n): ", (answer) => {
    const htmlOnly = answer.toLowerCase() === "y";
    downloadSource(url, htmlOnly).then(() => rl.close());
  });
});
