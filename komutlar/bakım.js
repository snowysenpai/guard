const Discord = require("discord.js");
const db = require("croxydb");
module.exports.run = async (client, message, args) => {
  
  let csi = "295791590096502784";
  
  let data = "OFF";
  if (message.author.id === csi) data = "ON";
  if (data === "OFF"){
    return message.reply("**Bu Komut Bot Sahibine Özeldir!**")}
  
  let csb = db.get("csb");

  if (csb === "KAPALI") {
    await db.set("csb", "AKTİF");
    let cse = new Discord.MessageEmbed()
      .setTitle(client.user.username + " Bot Bakım Modu")
      .setColor("GREEN")
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setDescription(
        "**Bakım Modu Aktif Edildi!\nBakım Modunu Kapatmak İçin Tekrar `.bakım` Yazın!**")
    message.channel.send(cse);
    message.react("🔨");
  }

  if (csb === "AKTİF") {
    await db.set("csb", "KAPALI");
    let cse = new Discord.MessageEmbed()
      .setTitle(client.user.username + " Bot Bakım Modu")
      .setColor("RED")
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setDescription(
        "**Bakım Modu Kapatıldı!\nBakım Modunu Açmam İçin Tekrar `.bakım` Yazın!**"
      );
    message.channel.send(cse);
    message.react("🔌");
  }
};
module.exports.conf = {
  aliases: ["gb"]
};

module.exports.help = {
  name: "bakım"
};