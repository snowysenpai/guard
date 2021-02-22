const Discord = require("discord.js");
const db = require("croxydb");
const a = require("../ayarlar.json");

exports.run = async (client, message, args, params) => {
  //Dcs Ekibi
  if (!message.member.roles.cache.has("811956030782439484"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`UYARI`)
        .setDescription(
          "**Bu Komutu Kullanmak için `YÖNETİCİ` Yetkisine Sahip Olmalısın!**"
        )
        .setColor("RED")
        .setFooter(message.author.tag)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
    );

  if (!args[0])
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`UYARI`)
        .setDescription("**Yanlış Komut Kullanımı!**")
        .setFooter(message.guild.name)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .addField(
          `Doğru Kullanım`,
          `\`${a.prefix}bot-koruma aç\` **veya** \`${a.prefix}bot-koruma kapat\``
        )
        .setColor("RED")
    );

  let rol = await db.fetch(`botk_${message.guild.id}`);
  if (args[0] == "aç") {
    if (rol) {
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`UYARI`)
        .setDescription("**__Bot Koruma Sistemi__ Zaten Aktif!**")
        .setTimestamp() //Dcs Ekibi
        .setFooter(message.guild.name)
        .setThumbnail(message.guild.iconURL);
      message.channel.send(embed);
      return;
    } else {
      db.set(`botk_${message.guild.id}`, "acik");
      const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`BAŞARILI`)
        .setDescription(
          "**__Bot Koruma Sistemi__ Başarıyla Aktif Edildi!\n \n▪ Kapatmak için: `!bot-koruma kapat`**"
        )
        .setFooter(message.guild.name)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL);

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    await db.delete(`botk_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`BAŞARILI`)
      .setDescription(
        "**__Bot Koruma Sistemi__ Başarıyla Kapatıldı!\n \n▪ Açmak için: `!bot-koruma aç`**"
      )
      .setTimestamp()
      .setFooter(message.guild.name)
      .setThumbnail(message.guild.iconURL);
    message.channel.send(embed);
  }

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 0
};
//Dcs Ekibi
exports.help = {
  name: "bot-koruma",
  description: "bot Koruma Sistemi!",
  usage: "bot-koruma"
};