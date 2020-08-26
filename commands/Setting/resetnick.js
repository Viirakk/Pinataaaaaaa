const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(`**${message.author.username}**, please check your permssion again!`);
  
  let user = message.mentions.users.first();
  if (!user) return message.channel.send(`**${message.author.username}**, please mention a user`);
  
  let member = message.guild.members.cache.get(user.id);
  
  await member.setNickname(null).then(() => {
    return message.channel.send(`**Completed**, Nickname of **${user.tag}** has been reset to default`);
  }).catch(err => {
    return message.channel.send(`**Error**, failed to reset nickname from **${user.tag}**. \nMake sure role **${bot.user.username}** is higher than members roles.`);
  });
}

exports.help = {
  name: "resetnick",
  description: "Reset a user nickname.",
  usage: ["resetnick <@user>"],
  example: ["resetnick @Vii_Rakk#5424"]
}

exports.conf = {
  aliases: ["resetnickname"],
  cooldown: 5
}