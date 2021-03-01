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
client.on("messageDelete", async (msj) => {
  if (msj.author.bot || msj.channel.type === "dm") return;
  let messageLog = msj.guild.channels.cache.get("811948839064829992");
  if (msj.guild.id !== "811935924405403658") return;
  if (msj.attachments.first()) {
    messageLog
      .send({
        embed: {
          description:
            msj.channel +
            " kanalında " +
            msj.author +
            " tarafından bir fotoğraf silindi. \n Silinen Fotoğraf : ",
          footer: {
            text: "Silindiği Saat:"
          },
          timestamp: new Date(),
          author: {
            name: msj.author.tag,
            icon_url: msj.author.avatarURL
          },
          thumbnail: {
            url: msj.author.avatarURL
          },
          image: {
            url: msj.attachments.first().proxyURL
          },
          color: Math.floor(Math.random() * (0xffffff + 1))
        }
      })
      .catch(console.error);
  } else {
    messageLog
      .send({
        embed: {
          color: Math.floor(Math.random() * (0xffffff + 1)),
          footer: {
            text: "Silindiği Saat:"
          },
          timestamp: new Date(),
          author: {
            name: msj.author.tag,
            icon_url: msj.author.avatarURL
          },
          thumbnail: {
            url: msj.author.avatarURL
          },
          description:
            msj.channel +
            " kanalında " +
            msj.author +
            " tarafından bir mesaj silindi. \n\n Silinen Mesaj : " +
            msj.content
        }
      })
      .catch(console.error);
  }
});

client.on("messageUpdate", async (old, nev) => {
  let messageLog = nev.guild.channels.cache.get("811948839064829992");
  if (nev.author.bot || nev.channel.type === "dm") return;
  if (nev.guild.id !== "811935924405403658") return;
  if (old.content.toLowerCase() === nev.content.toLowerCase()) return;
  messageLog
    .send({
      embed: {
        description:
          nev.channel +
          " kanalında " +
          nev.author +
          " tarafından bir mesaj düzenlendi. \n\n Eski Mesaj : " +
          old.content +
          "\n\n Yeni Mesaj : " +
          nev.content,
        color: Math.floor(Math.random() * (0xffffff + 1)),
        author: {
          name: old.author.tag,
          icon_url: old.author.avatarURL
        },
        thumbnail: {
          url: old.author.avatarURL
        },
        timestamp: new Date()
      }
    })
    .catch(console.error);
});

/////////////////////////////////////////////////////////////////////
client.on("voiceStateUpdate", async (snowy, dev) => {
  let voiceLog = snowy.guild.channels.cache.get("811948812260212776");
  if (snowy.voiceChannel === dev.voiceChannel) return;
  if (snowy.guild.id !== "811935924405403658") return;

  if (snowy.voiceChannel && !dev.voiceChannel)
    return voiceLog
      .send({
        embed: {
          description:
            "<@" +
            snowy.id +
            "> adlı kullanıcı " +
            snowy.voiceChannel +
            " kanalından çıkış yaptı.",
          color: Math.floor(Math.random() * (0xffffff + 1)),
          timestamp: new Date()
        }
      })
      .catch(console.error);

  if (!snowy.voiceChannel && dev.voiceChannel)
    return voiceLog
      .send({
        embed: {
          description:
            "<@" +
            dev.id +
            "> adlı kullanıcı " +
            dev.voiceChannel +
            " kanalına giriş yaptı.",
          color: Math.floor(Math.random() * (0xffffff + 1)),
          timestamp: new Date()
        }
      })
      .catch(console.error);

  if (snowy.voiceChannel !== dev.voiceChannel)
    return voiceLog
      .send({
        embed: {
          description:
            "<@" +
            snowy.id +
            "> adlı kullanıcı " +
            snowy.voiceChannel +
            " kanalından " +
            dev.voiceChannel +
            " kanalına giriş yaptı.",
          color: Math.floor(Math.random() * (0xffffff + 1)),
          timestamp: new Date()
        }
      })
      .catch(console.error);
  });
