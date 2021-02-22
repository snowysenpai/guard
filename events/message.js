const ayarlar = require("../ayarlar.json");
const Discord = require("discord.js");
module.exports = async message => {
  let client = message.client;
  if (message.author.bot) return;



  let prefix = ayarlar.prefix;

  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, params);
    let csdb = require('croxydb')
    let csd = await csdb.get('csb')
    let csi = "295791590096502784"
    let data = "OFF"
    if(message.author.id === csi) data = "ON"
    if(csd === "AKTİF"){
      if(data === "OFF") return message.reply("**Botun Bakım Modu Aktif Olduğu İçin Komut Kullanamazsın!**")}
  }
};


