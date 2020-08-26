const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have a permissions to do this.");
    let user = message.mentions.users.first();
    
    let member = message.guild.member(user);
    let reason = args.slice(22).join(" ");
    
    if (!user) return message.channel.send("Please mention the user.");
    if (user.id === message.author.id) return message.channel.send("You can't ban yourself.");
    if (user.id === client.user.id) return message.channel.send("You can't ban me.");
    
    if (!reason) reason = "No reason provided";
    member.ban(reason).then(() => {
      message.channel.send(`Successfully banned **${user.tag}**`);
    }).catch(err => {
      message.reply("I was unable to ban the member.");
    })
  }

exports.help = {
  name: "ban",
  description: "Ban some noobs away",
  usage: "ban [@user] [reason]",
  example: "ban @Vii_Rakk#5424 idiot"
};

exports.conf = {
  aliases: [],
  cooldown: 5
};