const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ayarlar = require("../ayarlar.json");
const ms = require('ms');
const moment = require("moment");

exports.run = async (client, message, args) => {
  
//-------------------------------------------------------------------------------\\  
  
if(![ayarlar.SesliMuteYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR")))  
return message.channel.send(new MessageEmbed().setDescription(`${message.author}**, komutu kullanmak için yetkin bulunmamakta.**`).setColor('000000').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
const mutelog = message.guild.channels.cache.find(c => c.id === ayarlar.SesliMuteLog)

//-------------------------------------------------------------------------------\\



let aylartoplam = {
"01": "Ocak",
"02": "Şubat",
"03": "Mart",
"04": "Nisan",
"05": "Mayıs",
"06": "Haziran",
"07": "Temmuz",
"08": "Ağustos",
"09": "Eylül",
"10": "Ekim",
"11": "Kasım",
"12": "Aralık"};
let aylar = aylartoplam;

let kullanici = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}**, bir kullanıcı etiketle.**`).setColor('000000').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}**, etiketlenen kullanıcı sizden üst/aynı pozisyondadır.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('000000').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}**, kendine bu komutu kullanamazsın.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('000000').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}**, bir bota bu komutu kullanamazsın.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('000000').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}**, sunucu sahibine bu komutu kullanamazsın.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('000000').setTimestamp()).then(x => x.delete({timeout: 5000}));
let muteler = jdb.get(`voicemute`) || [];
let sebep = args.splice(1).join(" ");
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('000000').setTimestamp()).then(x => x.delete({timeout: 5000}));


message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('000000').setTimestamp().setDescription(`${message.author} tarafından ${kullanici} \`${sebep}\` seslide susturulması bitirildi.`));
message.react('✅')
mutelog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('BLACK').setTimestamp().setDescription(`**Sesli Odalarda Susturulması Kalktı !**\n**Yetkili:** ${message.author} \n**Kullanıcı:** ${kullanici.user}\n**Sebep**: \`${sebep}\` \n**Tarih:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\``));
kullanici.voice.setMute(false);  

}
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vmute", "ses-mute-kaldır"],
  permLevel: 0,
}

exports.help = {
  name: "unvmute"
};
