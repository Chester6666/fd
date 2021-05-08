const { MessageEmbed } = require('discord.js');
const data = require('quick.db');
const kdb = new data.table("kullanici");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  
//-------------------------------------------------------------------------------\\
 if(![ayarlar.SicilYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.channel.send(new MessageEmbed().setDescription(`${message.author} **Komutu kullanmak için yetkin bulunmamakta.**`).setColor('v').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
//-------------------------------------------------------------------------------\\
  
  
let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed().setDescription(`${message.author}**, Bir kullanıcı etiketlemelisin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('000000').setTimestamp()).then(x => x.delete({timeout: 5000}));

if (!member) {
let sicil = kdb.delete(`kullanici.${member.id}.sicil`) || [];
message.channel.send(new MessageEmbed().setColor('000000').setDescription(`${message.author}**, Sana sit sicil verilerini sildim!**`))
}
  
if(member) {
let sicil = kdb.delete(`kullanici.${member.id}.sicil`) || [];
message.channel.send(new MessageEmbed().setColor('000000').setDescription(`${member}**, Kullanıcısına ait sicil verilerini sildim!**`))

};
  
}
  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sicil-sıfırla"],
  PermLevel: 0
};

 

exports.help = {
  name: "sicil-sıfırla",
  description: "",
  usage: ""
};