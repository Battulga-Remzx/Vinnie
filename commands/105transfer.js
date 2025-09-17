const { MessageEmbed } = require('discord.js');

exports.execute = (client, message, args) => {
  

  //Users and Amount Information
  let me = message.author;
  let user = message.mentions.members.first();
  let amount = args[1];

  // Database 
  let myMoney = client.db.fetch(`money_${me.id}`);

  if (myMoney == null) myMoney = 0;
  //emoji
  let right = client.emoji.right;
  let tugrug = client.emoji.tugrug;

  //Embeds
  let errUser = new MessageEmbed()
    .setTitle(`⚠️ **WARNING** ⚠️`)
    .setColor('RED')
    .setDescription(`Please @men user`)

  let errAmount = new MessageEmbed()
    .setTitle(`⚠️ **WARNING** ⚠️`)
    .setColor('RED')
    .setDescription(`Please enter amount`)

  let errNumber = new MessageEmbed()
    .setTitle(`⚠️ **WARNING** ⚠️`)
    .setColor('RED')
    .setDescription(`You cant use this number`)

  let enoughMoney = new MessageEmbed()
    .setTitle(`⚠️ **FAILED** ⚠️`)
    .setColor('RED')
    .setDescription(`Not enough your money
===============
${right}Money: $${myMoney} ${tugrug} have`)

  let success = new MessageEmbed()
    .setTitle(`SUCCESS`)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setColor('GREEN')
    .setTimestamp()
    .setFooter('TRANSFER SUCCESS', message.guild.iconURL())
    .setDescription(`${right}from: ${me}
===============
send $${amount} ${tugrug}
===============
${right}to: ${user} 
`)
  //Program
  if (!user) {
    message.channel.send({ embeds: [errUser] });
  } else if (!amount || isNaN(amount)) {
    message.channel.send({ embeds: [errAmount] });
  } else if (amount < 1) {
    message.channel.send({ embeds: [errNumber] })
  } else if (myMoney < amount) {
    message.channel.send({ embeds: [enoughMoney] });
  } else {
    client.db.subtract(`money_${me.id}`, amount);
    client.db.add(`money_${user.id}`, amount)
    message.channel.send({ embeds: [success] });
  }
}

exports.help = {
  name: "TRANSFER",
  aliases: ['give', 'transfer'],
  usage: `give @men`
}