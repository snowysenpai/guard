const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const db = require("croxydb");
const chalk = require("chalk");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");

var prefix = ayarlar.prefix;


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Komut Var!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name} İsimli Komut Aktif!`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

client.on("ready", async () => {
  client.channels.cache.get("811937347213590528").join()
});

client.on("message", async msg => {
  
  
    const i = await db.fetch(`kufur_${msg.guild.id}`)
       if (i == "acik") {
           const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
           if (kufur.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("BAN_MEMBERS")) {
                     msg.delete();
                             
                         return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
     
               }              
             } catch(err) {
               console.log(err);
             }
           }
       }
       if (!i) return;
   });
   
   client.on("messageUpdate", (oldMessage, newMessage) => {
     
     
    const i = db.fetch(`${oldMessage.guild.id}.kufur`)
       if (i) {
           const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel"];
           if (kufur.some(word => newMessage.content.includes(word))) {
             try {
               if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                     oldMessage.delete();
                             
                         return oldMessage.channel.send(new Discord.MessageEmbed().setDescription(`${oldMessage.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(oldMessage.member.displayName, oldMessage.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
     
               }              
             } catch(err) {
               console.log(err);
             }
           }
       }
       if (!i) return;
   });
   //////////////////////////////////////////////////////////////////////////
   client.on("guildMemberAdd", async member => {
    let bot_koruma = await db.fetch(`botk_${member.guild.id}`);
    if (bot_koruma == "acik") {
      const log = member.guild.channels.cache.get("811937328812785744");
      if (!log) return;
      const rol = member.guild.roles.cache.get("811937225733701672");
      const rol2 = member.guild.roles.cache.get("811937275746189312")
      if (!member.user.bot) return;
      const entry = await member.guild
        .fetchAuditLogs({ type: "MEMBER_BOT_ADD" })
        .then(audit => audit.entries.first());
  
      if (entry.executor.id == member.guild.owner.id) return;
      if (entry.executor.id == ayarlar.sahip) return;
      let kisi = member.guild.member(entry.executor);
      await kisi.roles.cache.forEach(x =>
        kisi.roles.remove(x).then(f => kisi.roles.add(rol).then(y => kisi.roles.add(rol2)))
      );
  
      await member.kick("Anti Raid Sistemi!");
  
      const embed = new Discord.MessageEmbed()
        .setTitle(`Bot Koruma Sistemi`)
        .setColor("RED")
        .setDescription(
          `Sunucuya bir bot eklendi botu sunucudan attım bütün rollerini aldım ve ayarladığınız cezalı rolünü verdim. \n\n**Eklenen Bot Bilgileri** \nBot İsmi: \`${member.user.tag}\` \nBot ID: \`${member.user.id}\` \n\n**Botu Ekleyen Kullanıcı Kullanıcı Bilgileri** \nEkleyen Kullanıcı: \`${entry.executor.tag}\` \nEkleyen Kullanıcı ID: \`${entry.executor.id}\``
        )
        .setTimestamp()
        .setFooter(client.user.tag, client.user.avatarURL);
      log.send(embed);
   
      var owner = new Discord.MessageEmbed()
        .setTitle(`Bot Koruma Koruma Sistemi`)
        .setColor("RED")
        .setDescription(
          `Sunucuya bir bot eklendi botu sunucudan attım bütün rollerini aldım ve ayarladığınız cezalı rolünü verdim. \n\n**Eklenen Bot Bilgileri** \nBot İsmi: \`${member.user.tag}\` \nBot ID: \`${member.user.id}\` \n\n**Botu Ekleyen Kullanıcı Kullanıcı Bilgileri** \nEkleyen Kullanıcı: \`${entry.executor.tag}\` \nEkleyen Kullanıcı ID: \`${entry.executor.id}\``
        )
        .setTimestamp()
        .setFooter(client.user.tag, client.user.avatarURL);
      member.guild.owner.send(owner);
    }
  });