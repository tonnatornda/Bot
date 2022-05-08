# インストール必須なライブラリ
- discord.js
- request
# コマンド
- ```?twitch (ユーザー名)```
# 使い方
```git clone git@github.com:tonnatornda/Bot.git```

```cd Bot ```

```nano index.js```

Twitch OauthトークンとクライアントIDを入力

1番下のtokenをDiscordBotトークンに置き換え

```node index.js```
# コード改造
全然コード改造などはしてもらって構わないです。
むしろお願いします
現在確認されているbotが落ちる原因
- jsonの中身が1つでも空だとエラー落ちする(descriptionなど)
