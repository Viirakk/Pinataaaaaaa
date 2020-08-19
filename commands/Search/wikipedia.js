const Discord = require('discord.js');
const axios = require("axios");

exports.run = async (client, message, args) => {
  const query = args.join(" ").trim();
  if (!query) return message.channel.send(`<:no:736498705972068442>  **|**  __**${message.author.username}**__, Masukan judul artikel yang akan dicari!`);
  
  const headers = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36' };
  axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`, { headers }).then(res => {
    const article = res.data;
    
    const wikipedia = new Discord.MessageEmbed()
    .setColor(0xd15994)
    .setAuthor("Wikipedia", "https://i.imgur.com/a4eeEhh.png")
    .setTitle(`**${article.title}**`)
    .setURL(article.content_urls.desktop.page)
    .setDescription(`> ${article.extract}`)
    .setThumbnail(article.originalimage ? article.originalimage.source : null)
    .setTimestamp(new Date())
    .setFooter(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 64 }))
    return message.channel.send(wikipedia);
	}).catch(() => message.channel.send(`**${message.author.username}**, there is no result called **${query}**.`));
}

exports.help = {
  name: "wikipedia",
  description: "Searches Wikipedia for something.",
  usage: ["wikipedia <title>"],
  example: ["wikipedia One Piece"]
};

exports.conf = {
  aliases: ["wiki"],
  cooldown: 10
};