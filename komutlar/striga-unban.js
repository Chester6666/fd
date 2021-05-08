const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const moment = require('moment')
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\  
  
if(![ayarlar.BanYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author}**, komutu kullanmak için yetkin bulunmamakta.**`).setColor('000000').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

const banlog = message.guild.channels.cache.find(c => c.id === ayarlar.BanLog)

//-------------------------------------------------------------------------------\\


  
          let tumaylar = {
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
        "12": "Aralık", 
        }
  let aylar = tumaylar;
  
let kisi = await client.users.fetch(args[0]);
if(!kisi) return message.channel.send(new MessageEmbed().setDescription(`${message.author}**, bir ID belirtmelisin.**`).setColor('000000').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

message.guild.members.unban(kisi.id)
message.channel.send(new MessageEmbed().setDescription(`${message.author} **tarafından** ${kisi} **kullanıcısının yasağı kaldırıldı.**`).setColor('000000').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic:true }))).then(x => x.delete({ timeout: 5000}))
  
message.react('✅')
banlog.send(new MessageEmbed().setColor('000000').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setDescription(`**Sunucudan Yasağı Kaldırıldı !**\n**Kaldıran Yetkili:** ${message.author}\n**Banı Kaldırılan Üye:** ${kisi}\n**Ban Kaldırma Tarihi:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\` `));

}
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unban", "yasak-kaldır"],
  permLvl: 0,
}

  exports.help = {
  name: 'unban'
}

