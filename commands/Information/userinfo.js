const Discord = require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || message.author;
  const member = message.guild.member(user);
  const nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "None";
  const createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY at h:mm:ss a");
  const joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY at h:mm:ss a");
  
  const status = {
    online: "<:online:742557148730359819> Online",
    idle: "<:idle:742557093432655905> Idle",
    dnd: "<:dnd:742557115876638762> DND",
    offline: "<:offline:742557131026464768> Offline"
  }
  
  const flags = {
		DISCORD_EMPLOYEE: "<:Discord_Employee:745480143346335865> Discord Employee",
		DISCORD_PARTNER: "<:Discord_Partner:745480206424473730> Discord Partner",
		BUGHUNTER_LEVEL_1: "<:Bug_Hunter_1:745480035477094523> Bug Hunter (Level 1)",
		BUGHUNTER_LEVEL_2: "<:Bug_Hunter_2:745480098051784755> Bug Hunter (Level 2)",
		HYPESQUAD_EVENTS: "<:HypeSquad_Event:745478653739270225> HypeSquad Events",
		HOUSE_BRAVERY: "<:House_of_Bravery:745475037305372694> House of Bravery",
		HOUSE_BRILLIANCE: "<:House_of_Brilliance:745475049082847232> House of Brilliance",
		HOUSE_BALANCE: "<:House_of_Balance:745475028828554080> House of Balance",
		EARLY_SUPPORTER: "<:Early_Supporter:745480247339909190> Early Supporter",
		TEAM_USER: "Team User",
		SYSTEM: "System",
		VERIFIED_BOT: "<:Discord_Verified:745473650186256415> Verified Bot",
		VERIFIED_DEVELOPER: "<:Bot_Developer_Badge:742556995323822130> Verified Bot Developer"
	}
  
  const bots = {
    true: "<:tick:699481911587897416> Yes",
    false: "<:wrong:699481910765944902> No"
  }
  
  const userFlags = member.user.flags.toArray();
  
  const Mapping = {
    web: "<:mdGlobe:568466408137031691> Browser",
    desktop: ":desktop: Desktop",
    mobile: ":iphone: Mobile",
  }
  
  const client2 = Object.entries(message.member.presence.clientStatus || {}).map(entry => entry[0]).map(entry => Mapping[entry]).join("\n") || "No Client";
  
  const info = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(user.tag, user.displayAvatarURL({ format: "png", dynamic: true, size: 64 }))
  .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
  .addField("**Username:**", `${user.username}`, true)
  .addField("**Nickname:**", `${nickname}`, true)
  .addField("**Status:**", `${status[user.presence.status]}`, true)
  .addField("**Account ID:**", `${user.id}`)
  .addField("**Account Created:**", `${createdate}`)
  .addField("**Join Date:**", `${joindate}`)
  .addField("**Badges:**", `${userFlags.length ? userFlags.map(flag => flags[flag]).join("\n") : "No Badges"}`)
  .addField("**Activity:**", `${member.user.presence.activities.length > 0 ? member.user.presence.activities.join("\n") : "No Activity"}`, true)
  .addField("**Client Status:**", `${client}`, true)
  .addField("**Bot:**", `${bots[member.user.bot]}`, true)
  .addField(`**Roles [${member.roles.cache.sort((a, b) => b.position - a.position).filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]:**`, `Highest: ${member.roles.highest ? member.roles.highest : "None"}\nList: ${member.roles.cache.sort((a, b) => b.position - a.position).filter(r => r.id !== message.guild.id).map(r => `${r}`).join(", ") || "No Roles"}`)
  .setTimestamp(new Date())
  .setFooter(user.username, user.displayAvatarURL({ format: "png", dynamic: true, size: 64 }))
  return message.channel.send(info);
}

exports.help = {
  name: "userinfo",
  description: "Information of the user",
  usage: "userinfo [@user]",
  example: "userinfo @Vii_Rakk#5424"
};

exports.conf = {
  aliases: [],
  cooldown: 5
};