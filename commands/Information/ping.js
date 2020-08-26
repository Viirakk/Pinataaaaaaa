const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    try {
      const m = await message.channel.send("Pinging..."); // Make sure the async is written, top of the client.on("message", ...)
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM") // Tired of choosing the embed colors? Just type "RANDOM" on it!
      .addField("⌛ Latency", `**${m.createdTimestamp -  message.createdTimestamp}ms**`)
      .addField("💓 API", `**${Math.floor(client.ws.ping)}ms**`) // Use "client.ping" if your Discord.js is < 1.15.1 --- Use "client.ws.ping" if your Discord.js is > 12.0.0
      return m.edit(`🏓 Pong!`, embed);
    } catch (error) {
      return message.channel.send(`Something went wrong: ${error.message}`);
      // Restart the bot as usual.
    }
  }

exports.help = {
  name: "ping",
  description: "Check out the `ms`",
  usage: "ping",
  example: "ping"
}

exports.conf = {
  aliases: ["ms"],
  cooldown: 5
}