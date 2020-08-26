const Discord = require("discord.js");
const db = require("quick.db");
let ms = require("parse-ms");

exports.run = async (bot, message, args) => {
  let randomCoin = getRandomInt(750, 1500);
  let pad_zero = num => (num < 10 ? '0' : '') + num;
  let cooldown = 2.16e+7;
  
  let lastWork = await db.get(`lastWork.${message.guild.id}.${message.author.id}`);
  let buck = await db.get(`account.${message.guild.id}.${message.author.id}.balance`);
  
  try {
    if (lastWork !== null && cooldown - (Date.now() - lastWork) > 0) {
      let timeObj = ms(cooldown - (Date.now() - lastWork));
      
      let hours = pad_zero(timeObj.hours).padStart(2, "0"),
          mins = pad_zero(timeObj.minutes).padStart(2, "0"),
          secs = pad_zero(timeObj.seconds).padStart(2, "0");
      
      let finalTime = `**${hours} hours, ${mins} minutes, and ${secs} seconds**`;
      return message.channel.send(`**${message.author.username}**, you already came to work today! please come again tomorrow`);
    } else {
      db.set(`lastWork.${message.guild.id}.${message.author.id}`, Date.now());
      db.add(`account.${message.guild.id}.${message.author.id}.balance`, randomCoin);
      return message.channel.send(`**${message.author.username}**, you have earned <:Coin:742557027313909771>${randomCoin} from your work`);
    }
  } catch (error) {
    console.log(error);
  }
}

exports.help = {
  name: "work",
  description: "Work and earn coin.",
  usage: ["work"],
  example: ["work"]
}

exports.conf = {
  aliases: [],
  cooldown: 10
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}