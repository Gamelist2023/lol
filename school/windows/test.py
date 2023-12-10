import os
import requests
import webbrowser
from tkinter import *
from bs4 import BeautifulSoup
from tkinter import messagebox
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

        # 成功通知
        messagebox.showinfo("成功", "ダウンロードが成功しました")
    except requests.exceptions.HTTPError as errh:  # HTTPエラーを処理
        if "403" in str(errh):  # HTTPエラーが403の場合
            messagebox.showinfo("エラー", "指定したURLはダウンロードを禁止しています")  # エラーメッセージを表示
        else:
            messagebox.showinfo("エラー", "HTTPエラーが起きました: " + str(errh))  # それ以外のHTTPエラーの場合
    except Exception as e:
        # 失敗通知
        messagebox.showinfo("エラー", "エラーが起きました: " + str(e))
    finally:  # 追加: 例外が発生しても最終的に実行されるブロック
        download_label.config(text="ダウンロード先: " + download_dir)  # ダウンロード先のURLを表示
        download_label.bind("<Button-1>", lambda e: webbrowser.open_new('file://' + os.path.realpath(download_dir)))  # ラベルをクリックするとダウンロード先を開く

root = Tk()
root.geometry("800x600")
root.title("ソースコードダウンロードソフト")  # ウィンドウのタイトルを設定
root.configure(bg='lightblue')  # 背景色を設定

# メニュー画面
menu_frame = Frame(root, bg='lightblue')
menu_frame.place(relx=0.5, rely=0.5, anchor=CENTER)  # 画面の中心に配置

Label(menu_frame, text="ソースコードダウンロードソフト", font=("Helvetica", 24), bg='lightblue').pack(pady=10)  # タイトルを追加
Label(menu_frame, text="このソフトウェアは指定したURLのウェブページからHTML、CSS、JavaScript、画像ファイルなどのクライアントサイドのソースコードをダウンロードします。", bg='lightblue').pack(pady=10)  # 機能説明を追加
Label(menu_frame, text="URLを入力してください", bg='lightblue').pack(pady=10)  # ラベルを追加
url_entry_menu = Entry(menu_frame)
url_entry_menu.pack(pady=10)

def html_button_command():
    if url_entry_menu.get() == '':
        messagebox.showinfo("エラー", "URLを設定してください")
    else:
        download_source(url_entry_menu.get(), html_only=True)

def source_button_command():
    if url_entry_menu.get() == '':
        messagebox.showinfo("エラー", "URLを設定してください")
    else:
        download_source(url_entry_menu.get())

Button(menu_frame, text="HTMLのみを取得", command=html_button_command).pack(pady=10)
Button(menu_frame, text="全てのソースコードを取得", command=source_button_command).pack(pady=10)

# ダウンロード先のURLを表示するラベル
download_label = Label(menu_frame, text="", fg="blue", cursor="hand2", bg='lightblue')
download_label.pack(pady=10)

root.mainloop()
