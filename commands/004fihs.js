const { MessageEmbed } = require('discord.js');

// Create a map to track command cooldowns for each user
const cooldowns = new Map();

exports.execute = (client, message, args) => {
  let user = message.author;
  let fish = ['tuna','shark','whale','goldie','nemo'];
  let random = Math.floor(Math.random()*fish.length)+1;
  let fishdb = client.db.fetch(`${fish[random]}_${user.id}`);
  if(client.db.fetch(`${fish[random]}_${user.id}`) == null) return fishdb = 0;
  client.db.add(`${fish[random]}_${user.id}`, 1);
  message.channel.send({content: `You found ${fish[random]} + 1 \nYou have ${fishdb} ${fish[random]}`})
}

exports.help = {
  name: 'fish',
  aliases: [],
  usage: 'fish',
};
