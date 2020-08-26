const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const guilds = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField(`**Guild Count [${client.guilds.cache.size}]:**`, `${client.guilds.cache.map(g => g.name).join("\n ")}`);
  return message.channel.send(guilds);
};

exports.help = {
  name: "guilds",
  description: "Look how many servers/guilds that the bot in",
  usage: "guilds",
  example: "guilds"
};

exports.conf = {
  aliases: ["servers"],
  cooldown: 5
};
