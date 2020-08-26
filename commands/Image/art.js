const Discord = require('discord.js');
const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
    let loadingEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`<a:loading:732919805254041701> Generating a art!...`)
    let msg = await message.channel
      .send(loadingEmbed)
      .then(m => m.delete({ timeout: 2000 }));

    fetch("https://www.reddit.com/r/art/.json?sort=top&t=daily")
      .then(res => res.json())
      .then(body => {
        if (!body) return message.reply("I broke, try again!");

      const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
      if (!allowed.length) return message.channel.send('Hmm looks like an error to me...');
        const randomnumber = Math.floor(Math.random() * allowed.length)
       
    let url = `https://www.reddit.com${allowed[randomnumber].data.permalink}`
    let embed = new Discord.MessageEmbed()
      .setTitle(allowed[randomnumber].data.title)
      .setURL(url)
      .setImage(allowed[randomnumber].data.url)
      .setFooter(`👍Likes: ${allowed[randomnumber].data.ups} | 💬Comments: ${allowed[randomnumber].data.num_comments}`)
      .setColor("RANDOM")

    return message.channel.send(embed);
    })
  }
  
exports.help = {
  name: "art",
  description: "Look art",
  usage: "art",
  example: "art"
}

exports.conf = {
  aliases: [],
  cooldown: 3
}