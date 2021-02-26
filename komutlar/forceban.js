const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("811956030782439484"))
    return message.reply("Yetersiz Yetki!");
  let dcs_user = args[0];
  if (isNaN(dcs_user)) return message.reply("Doğru ID Girmelisiniz!");
  await message.guild.members.ban(dcs_user);
  return message.reply(`\`${dcs_user}\` Sunucudan Banlandı!`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["idban"]
};

exports.help = {
  name: "forceban",
  description: "ID ile Sunucudan Birisini Banlar!",
  usage: "forceban <kullanıcı-id>"
};
