const { MessageEmbed } = require("discord.js");
const ayarlar = require("../ayarlar.json");
module.exports.run = (client, message, args) => {
  
//-------------------------------------------------------------------------------\\
  
if(![ayarlar.TagYetkili].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('000000').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
//-------------------------------------------------------------------------------\\  
  

let tag = ayarlar.Tag;
const ttag = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size

const embed = new MessageEmbed()
.setColor('BLACK')
message.channel.send(embed.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`**Taglı Üye ・** \`${ttag}\``));
};

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tag-say"],
  permLvl: 0,
}

  exports.help = {
  name: 'taglı'
}
