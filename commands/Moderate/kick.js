const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have a permissions to do this.");
    let user = message.mentions.users.first();
    
    let member = message.guild.member(user);
    let reason = args.slice(1).join(" ");
    
    if (!user) return message.channel.send("Please mention the user.");
    if (user.id === message.author.id) return message.channel.send("You can't kick yourself.");
    if (user.id === client.user.id) return message.channel.send("You can't kick me.");
    
    if (!reason) reason = "No reason provided";
    
    member.kick(reason).then(() => {
      message.channel.send(`Successfully kicked **${user.tag}**`);
    }).catch(err => {
      message.reply("I was unable to kick the member.");
    })
  }

exports.help = {
  name: "kick",
  description: "Kick some noobs away",
  usage: "kick [@user] [reason]",
  example: "kick @Vii_Rakk#5424 idiot"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}