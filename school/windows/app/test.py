import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from urllib.request import urlretrieve

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
}

def download_source(url, html_only=False):
    try:
        r = requests.get(url, headers=headers)
        r.raise_for_status()  # HTTPステータスコードが200以外の場合に例外を発生させる
        soup = BeautifulSoup(r.text, 'html.parser')

        # ダウンロード先のディレクトリを作成
        download_dir = os.path.join(os.path.expanduser('~'), 'Downloads', url.replace('https://', '').replace('http://', ''))
        os.makedirs(download_dir, exist_ok=True)

        # HTMLをダウンロード
        index_path = os.path.join(download_dir, 'index.html')
        counter = 1
        while os.path.exists(index_path):  # ファイルが既に存在する場合
            index_path = os.path.join(download_dir, f'index({counter}).html')  # ファイル名にカウンターを追加
            counter += 1
        with open(index_path, 'w', encoding='utf-8') as f:  # ファイルのエンコーディングをUTF-8に設定
            f.write(str(soup.prettify()))
        print(f"{index_path} をダウンロードしました")

        if not html_only:  # html_onlyがFalseの場合のみ、他のリソースをダウンロード
            # js, css, jpg, jpeg, png, gif ファイルをダウンロード
            for resource in soup.find_all(['script', 'link', 'img', 'source', 'frame', 'a']):
                if 'src' in resource.attrs:
                    src_url = urljoin(url, resource['src'])
                    if src_url.split('.')[-1] in ['js', 'css', 'jpg', 'jpeg', 'png', 'gif', 'mp4', 'html','htm','ogg','mp3']:
                        file_path = os.path.join(download_dir, urlparse(src_url).path[1:])
                        os.makedirs(os.path.dirname(file_path), exist_ok=True)
                        urlretrieve(src_url, file_path)
                        print(f"{src_url} をダウンロードしました")
                if 'href' in resource.attrs:
                    href_url = urljoin(url, resource['href'])
                    if href_url.split('.')[-1] in ['js', 'css']:
                        file_path = os.path.join(download_dir, urlparse(href_url).path[1:])
                        os.makedirs(os.path.dirname(file_path), exist_ok=True)
                        urlretrieve(href_url, file_path)
                        print(f"{href_url} をダウンロードしました")

    except requests.exceptions.HTTPError as errh:  # HTTPエラーを処理
        if "403" in str(errh):  # HTTPエラーが403の場合
            print("エラー: 指定したURLはダウンロードを禁止しています")  # エラーメッセージを表示
        else:
            print("エラー: HTTPエラーが起きました: " + str(errh))  # それ以外のHTTPエラーの場合
    except Exception as e:
        # 失敗通知
        print("エラー: エラーが起きました: " + str(e))

url = input("URLを入力してください: ")
html_only = input("HTMLのみをダウンロードしますか？ (y/n): ")
html_only = True if html_only.lower() == 'y' else False
download_source(url, html_only)
