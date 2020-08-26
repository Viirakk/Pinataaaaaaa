const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(`**${message.author.username}**, please check your permssion again!`);
  
  let user = message.mentions.users.first();
  if (!user) return message.channel.send(`**${message.author.username}**, please mention a user`);
  
  let nick = args.slice(1).join(" ");
  if (!nick) return message.channel.send(`**${message.author.username}**, please enter the name that you want to put for that user`);
  
  let member = message.guild.members.cache.get(user.id);
  
  await member.setNickname(nick).then(() => {
    return message.channel.send(`**Completed**, Nickname of **${user.tag}** has been changed to **${nick}**.`);
  }).catch(err => {
    return message.channel.send(`**Error**, failed to change nickname from **${user.tag}**. \nMake sure role **${bot.user.username}** is higher than members role.`);
  });
}

exports.help = {
  name: "setnick",
  description: "Set a user nickname.",
  usage: ["setnick `<@user>` `<nickname>`"],
  example: ["setnick `@Vii_Rakk#5424` `Virak`"]
}

exports.conf = {
  aliases: ["setnickname"],
  cooldown: 5
}