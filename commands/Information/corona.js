const Discord = require("discord.js") ;
const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
    let countries = args[0]
    
    fetch(`https://corona.lmao.ninja/v2/countries/${countries}`)
    .then(res => res.json())
    .then(data => {
      let country = data.country;
      let flag = data.countryInfo.flag; // Turns out -> Link.
      let confirmed = data.cases.toLocaleString();
      let todayconfirmed = data.todayCases.toLocaleString();
      let deaths = data.deaths.toLocaleString();
      let todaydeaths = data.todayDeaths.toLocaleString();
      let recovered = data.recovered.toLocaleString();
      let critical = data.critical.toLocaleString();
      let active = data.active.toLocaleString();
      // Add .toLocaleString() if you wanna separate 3 numbers with commas.
      
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp(new Date())
      .setAuthor("Coronavirus Statistics", flag)
      .addField(`Data for: ${country}`, `Confirmed: (Total: **${confirmed}** | Daily: **${todayconfirmed}**) \nDeaths: (Total: **${deaths}** | Daily: **${todaydeaths}**) \nRecovered: **${recovered}** \nCritical: **${critical}** \nActive: **${data.active}**`) // Sorry a little bit more complex.
      
      message.channel.send(embed);
      // Let's test it out!
    })
  }

exports.help = {
  name: "corona",
  description: "Corona Virus informaton",
  usage: "corona [country]",
  example: "corona Cambodia\ncorona Indonesia"
}

exports.conf = {
  aliases: ["covid"],
  cooldown: 5
}