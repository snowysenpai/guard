const Discord = require("discord.js");
module.exports.run = async (client, message, args, guild, member) => {
  let kullanıcı = message.mentions.members.first();
  let sebep = args.slice(1).join(" ");

if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.reply(
      "❌ Bu Komutu Kullana Bilmek için `Ban Moderatör` Rolüne Sahip Olmalısın!"
    );
  
  if (!kullanıcı) return message.channel.send("Bir Kullanıcı Etiketlemelisin!");
  if (kullanıcı.roles.cache.has("811937227248500786")) return message.reply("Yetkili birini kickleyemezsin!")
  if (!sebep) {
    sebep = "Sebep Belirtilmedi!";
  }
  let dcs = new Discord.MessageEmbed()
    .setColor("AQUA")
    .setDescription(
      "**__Atılan Kullanıcı:__** <@" +
        kullanıcı.id +
        ">\n\n **__Atan Yetkili:__** <@" +
        message.author.id +
        ">\n\n**__Atılma Sebebi:__** `" +
        sebep +
        "`"
    )
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp();
  message.delete();
  message.channel.send(dcs);
  message.guild.channels.cache.get("811937328812785744").send(dcs)
  kullanıcı.kick(sebep);
};
module.exports.conf = {
  aliases: []
};

module.exports.help = {
  name: "kick"
};