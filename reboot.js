const Discord = require('discord.js');
const db = require('croxydb')
exports.run = async (client, message, args) => { 
  
 if(message.author.id !== "295791590096502784")  return message.channel.cache.send("Sahibim değisilsin hadi işine paşam")
  
  let x = client.ws.ping + 20
  
let dcs = new Discord.MessageEmbed()
  .setTitle('Reboot')
  .setDescription("Şu an botu yeniden başlatmak üzeresin.\n")
  .addField('Şu anki Ping Değeri:', '**'+client.ws.ping+'** ms!\n')
  .addField('Reboot Sonrası Ping Değeri:', '**'+x+'** ms!')
  .addField('__SEÇENEKLER__', '**iptal** `/` **devam**')
  .setFooter(client.user.username, client.user.avatarURL)
  .setTimestamp()
  .setColor('RED')
message.channel.send(dcs).then(m => {
  
      let filtre = mes => mes.author.id === message.author.id;    
  message.channel.awaitMessages(filtre, {
          max: 1,
          time: 20000,
          errors: ["time"]
        })
        .then(collected => {
   if(collected.first().content === "iptal") {
 collected.first().delete()
 m.delete()
 message.reply('İşlemi iptal ettim aşkım')    
     
   }
   if(collected.first().content === "devam") {
 collected.first().delete()
let discordcodeshare = new Discord.MessageEmbed()
  .setTitle('⩥ Reboot')
  .setDescription("Reboot işlemi başarılı.")
  .setFooter(client.user.username, client.user.avatarURL)
  .setTimestamp()
  .setColor('GREEN')
 m.edit(discordcodeshare)
 
  setTimeout(() => {
   
    console.log(`BOT: Bot yeniden başlatılıyor...`);
    process.exit(0);
 }, 2000)      
     
   }    

    
    
  })
   
  
  
  
})
  
  
  
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['rr'], 
  permLevel: 0
};

exports.help = {
  name: 'reboot',
  description: 'Botu yeniden başlatma komududur. Botun sahibine özeldir.', 
  usage: 'r'
};