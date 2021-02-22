const Discord = require("discord.js");
module.exports.run = async (client, message) => {
  if(message.guild.id === "811935924405403658"){
  const dcsb = message.guild.roles.cache.get("811949673178595369")

  const dcsu = dcsb.members.map(dcsus => dcsus.displayName).join("\n");

  const dcsuc = dcsb.members.size;
  const dcse = new Discord.MessageEmbed()
    .setTitle(message.guild.name + " Boost Info")
    .setColor(dcsb.hexColor)
    .setTimestamp()
    .addField(
      "Sunucu Boost Seviyesi",
      "```" + message.guild.premiumTier + "```"
    )
    .addField(
      "Boost Sayısı",
      "```" + message.guild.premiumSubscriptionCount + "```"
    )
    .addField("Booster Sayısı", "```" + dcsuc + "```")
    .addField("Booster İsimleri", "```" + dcsu + "```");
  message.channel.send(dcse);
};
}
module.exports.conf = {
  aliases: ["boost"]
};
module.exports.help = {
  name: "booster"
};