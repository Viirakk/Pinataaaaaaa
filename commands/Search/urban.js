const Discord = require("discord.js");
const urban = require("relevant-urban");

exports.run= async (client, message, args) => {
  if (!args[0]) return message.channel.send("Please specify the query.")
  
  let result = await urban(args[0]).catch(e => {
    return message.channel.send(`Unknown word phrase of **${args[0]}**, please try again.`)
  })
  
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(result.word)
  .setURL(result.urbanURL)
  .setDescription(`**Definition:** \n**${result.definition}** \n\n**Example:** \n**${result.example}**`)
  .setAuthor("Author", result.author, true)
  .addField("Rating", `<:upvote:744158383631892580> ${result.thumbsUp.toLocaleString()} | <:downvote:746609467147419699> ${result.thumbsDown.toLocaleString()}`)
  
  if (result.tags.length > 0 && result.tags.join(" ").length < 1024) {
    embed.addField("Tags", result.tags.join(", "), true);
  }
  
  return message.channel.send(embed);
}

exports.help = {
  name: "urban",
  description: "Defines of a word, but with urban Dictionary.",
  usage: "urban <word>",
  example: "urban Temple"
}

exports.conf = {
  aliases: ["ud"],
  cooldown: 5
}