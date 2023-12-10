import { Session } from "friend-connect";
new Session({
    hostName: "Server Name", // サーバーのホスト名
    worldName: "Message of the Day: Hello World", // MOTDとして使用
    version: "1.20.2", // セッションのバージョン、任意の文字列が可能
    protocol: 565, // 接続先サーバーのプロトコル
    connectedPlayers: 0, // サーバーへのピングが失敗した場合のフォールバックとして使用
    maxConnectedPlayers: 40, // サーバーへのピングが失敗した場合のフォールバックとして使用
    ip: "tailvile.xyz", // 使用するサーバーのIP
    port: 19132, // 使用するサーバーのポート
    connectionType: 6, // これを変更することはお勧めしません
    log: true, // コンソール出力を見たい場合はtrueに設定
    joinability: "joinable_by_friends", // セッションの参加可能性、これを変更するとセッションに接続するために1つのアカウントしか使用できません
    autoFriending: true, // アカウントを自動的に追加したい場合はこれをtrueに設定
    pingServerForInfo: true, // FriendConnectがrakNetピングエラーによりエラーを出し続ける場合、これをfalseに設定できます
    tokenPath: "./auth", // 認証トークンが含まれるディレクトリへのパス
    accounts: ["foo@example.com", "bar@example.com"], // FriendConnectで使用したいアカウントに対応するメールのリスト
});
