const Discord = require("discord.js");
const tutorialBot = require("./handler/ClientBuilder.js"); // We're gonna create this soon.
const client = new tutorialBot();

require("./handler/module.js")(client);
require("./handler/Event.js")(client);
require("./uptime.js")

client.package = require("./package.json");
client.on("warn", console.warn); // This will warn you via logs if there was something wrong with your bot.
client.on("error", console.error); // This will send you an error message via logs if there was something missing with your coding.

let memberlog = "747654034508349530";

client.on("guildMemberAdd", member => {
  if (member.guild.id !== "725952860076113962") return;
  
  client.channels.cache.get(memberlog).send(`Welcome to the **${member.guild.name}**, <@!${member.user.id}> !!!`);
})

client.on("guildMemberRemove", member => {
  if (member.guild.id !== "725952860076113962") return;
  
  client.channels.cache.get(memberlog).send(`**${member.user.tag}** left **${member.guild.name}**.`);
});

client.login(process.env.SECRET).catch(console.error); // This token will leads to the .env file. It's safe in there.