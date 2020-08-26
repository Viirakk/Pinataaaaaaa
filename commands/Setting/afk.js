const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    const status = new db.table("AFKs");
    let afk = await status.fetch(message.author.id);
    const embed = new Discord.MessageEmbed().setColor("RANDOM")
    
    if (!afk) {
      embed.setDescription(`**${message.author.tag}** now AFK.`)
      embed.setFooter(`Reason: ${args.join(" ") ? args.join(" ") : "AFK"}`)
      status.set(message.author.id, args.join(" ") || `AFK`);
    } else {
      embed.setDescription("You are no longer AFK.");
      status.delete(message.author.id);
    }
    
    message.channel.send(embed)
}

exports.help = {
  name: "afk",
  description: "AFK",
  usage: ["afk <reason>"],
  example: ["afk go to poop\n afk go to pee"]
}

exports.conf = {
  aliases: [],
  cooldown: 5
}