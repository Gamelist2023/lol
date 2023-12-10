import pyshark

# フィルタを定義します
filter = '(ip.src >= 172.40.100.100 && ip.src <= 172.40.100.200) && (http.request || tls.handshake.type == 1)'

# キャプチャインスタンスを作成します
capture = pyshark.LiveCapture(interface='eth0', bpf_filter=filter)

# キャプチャを開始します
for packet in capture.sniff_continuously():
    # HTTPリクエストの場合
    if 'http' in packet and 'request' in packet.http.field_names:
        print('URL: ', packet.http.request_full_uri)
    # TLSハンドシェイクの場合
    elif 'ssl' in packet and 'handshake_type' in packet.ssl.field_names:
        if packet.ssl.handshake_type == '1':
            print('TLS handshake from: ', packet.ip.src)
