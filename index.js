console.clear()
const Discord = require('discord.js');

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES]
}); // DISCORD.JS V13


const Eco = require("quick.eco");
client.eco = new Eco.Manager(); // quick.eco
client.db = Eco.db; // quick.db
client.config = require("./botConfig");
client.shop = require('./items/shop');
client.sellprice = require('./items/sellPrice');
client.buyprice = require('./items/buyPrice')
client.emoji = require('./emoji');
client.image = require('./files/images');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const fs = require("fs");

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(f => {
    if (!f.endsWith(".js")) return;
    const event = require(`./events/${f}`);
    let eventName = f.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(f => {
    if (!f.endsWith(".js")) return;
    let command = require(`./commands/${f}`);
    client.commands.set(command.help.name, command);
    command.help.aliases.forEach(alias => {
      client.aliases.set(alias, command.help.name);
    });
  });
});

//Welcome & goodbye messages\\
client.on('guildMemberAdd', member => {
  member.roles.add(member.guild.roles.cache.find(i => i.name === 'User'));

  const welcomeEmbed = new Discord.MessageEmbed()

  welcomeEmbed.setColor('RED')
  welcomeEmbed.setTitle(`**${member.user.username}** is joined ${member.guild.name}. **${member.guild.memberCount}**th member of server`)
  welcomeEmbed.setImage('https://cdn.glitch.global/1cf686b0-913a-46e4-97b7-1fdc280c579e/7a1b84b0d02802cca66d976556d8699d.gif?v=1661717828024')
  welcomeEmbed.setThumbnail(member.user.displayAvatarURL())

  member.guild.channels.cache.find(i => i.name === '【👋】welcome').send({ embeds: [welcomeEmbed] })
})

client.on('messageCreate', (message) => {
  const { MessageEmbed } = require('discord.js');
  let embed = new MessageEmbed()
    .setDescription("hello")

  if (message.content == 'hi') {
    message.channel.send({ embeds: [embed] });
  }
})

const targetDate = new Date('2022-10-13T07:00:00Z');

// Calculate the remaining time
function calculateRemainingTime() {
  const currentDate = new Date();
  const remainingTime = currentDate - targetDate;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  // Return the remaining time as an object
  return {
    days,
    hours,
    minutes,
    seconds
  };
}

// Update the counter and send a message
function updateCounter() {
  const remainingTime = calculateRemainingTime();

  // Format the remaining time as a string
  const counterString = `${remainingTime.days} days, ${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds`;

  // Find your desired channel to send the counter message
  const channelId = '1234350080463601724';
  const channel = client.channels.cache.get(channelId);

  // Send the counter message
  channel.send(`**Started** ${targetDate.toLocaleString()}
**${counterString}**`);
}

// Trigger the counter update every second
setInterval(updateCounter, 60000);


client.login(client.config.token);

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Bot is online!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});