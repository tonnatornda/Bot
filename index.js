const Discord = require('discord.js');

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES
	]
});

const webclient = require("request");

client.once('ready', () => {
  console.log('Ready!')
})

client.on('messageCreate', (message) => {
  console.log(message.content)
  const str = message.content;
  if (~str.indexOf('?twitch')) {
   console.log("GETコマンド実行")
   const text = message.content;
   const text2 = text.split(' ', 2 );
   const text3 = text2[text2.length -1];
   console.log("取得ID:"+text3)
    webclient.get({
     url: "https://api.twitch.tv/helix/users?login="+text3,
     headers: {
       "Authorization": "Bearer TwitchOauthToken",
       "Client-Id": "Clientid"
       },
       body: JSON.stringify({foo: "bar"})
     }, function (error, response, body){
       var get = body;
       var get2 = get.replace('{"data":[', '');
       var get3 = get2.replace('}]}', '}');
       console.log("取得結果:"+get3)
       if (get3 === "]}") {
        console.log("送信コマンドをキャンセルしました")
         } else {
          if (get3.match('{"id":')) {
            var test = JSON.parse(get3);
             if (text3 === test.display_name) {
              const embed = new Discord.MessageEmbed()
              .setTitle(test.login)
              .setURL('https://twitch.tv/'+test.login)
              .addField('説明', test.description)
              .addField(test.display_name+'のプロフィールにアクセスする', 'メッセージの1番上のタイトルの名前をクリックして下さい')
              .setColor('9146FF')
              .setThumbnail(test.profile_image_url)
              .setTimestamp()
               message.channel.send({ embeds: [embed] })
             }else {
              const embed = new Discord.MessageEmbed()
               .setTitle(test.display_name+'('+test.login+')')
               .setURL('https://twitch.tv/'+test.login)
               .addField('説明', test.description)
               .addField(test.display_name+'のプロフィールにアクセスする', 'メッセージの1番上のタイトルの名前をクリックして下さい')
               .setColor('9146FF')
               .setThumbnail(test.profile_image_url)
               .setTimestamp()
                message.channel.send({ embeds: [embed] })
              }
          }
         }
    });
   }
});

client.login('token')
  .catch(console.error)
