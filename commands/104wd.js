const { MessageEmbed } = require('discord.js');

exports.execute = (client, message, args) => {
  

  let user = message.author;

  //Database
  let money = client.db.fetch(`money_${user.id}`)
  let bank = client.db.fetch(`bank_${user.id}`);

  // emoji call
  let right = client.emoji.right;
  let cD = client.emoji.colorDiscord;
  let tugrug = client.emoji.tugrug;

  //Prints
  if (money === null) money = 0;
  if (bank === null) bank = 0;

  // Embeds
  let errAmount = new MessageEmbed()
    .setTitle(`⚠️ **WARNING** ⚠️`)
    .setColor('RED')
    .setFooter(message.guild.name + ' bank', message.guild.iconURL())
    .setDescription(`Enter amount or ALL command 
example:
${right}${client.config.prefix}wd 100
or
${right}${client.config.prefix}wd all`);

  let evenNum = new MessageEmbed()
    .setTitle(`⚠️ **WARNING** ⚠️`)
    .setColor('RED')
    .setDescription(`Hey you cant use this number`);

  let enoughMoney = new MessageEmbed()
    .setTitle(`⚠️ **FAILED** ⚠️`)
    .setColor('RED')
    .setDescription(`Not enough your money in bank
===============
${right}Bank: $${bank} ${tugrug} have`);

  let allMoney = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setTitle(`${cD} **Success** ${cD}`)
    .setColor('GREEN')
    .setTimestamp()
    .setFooter(user.tag, user.displayAvatarURL())
    .setDescription(`$${parseInt(bank)} ${tugrug} IS WITHDRAW.
===============
${right}Current Money: $${money + parseInt(bank)} ${tugrug}
===============
${right}Current Bank: $${bank - parseInt(bank)} ${tugrug}`)

  let embed = new MessageEmbed()
    .setAuthor(message.guild.name + ' bank', message.guild.iconURL())
    .setTitle(`${cD} **Success** ${cD}`)
    .setColor('GREEN')
    .setTimestamp()
    .setFooter(user.tag, user.displayAvatarURL())
    .setDescription(`$${parseInt(args[0])} ${tugrug} IS WITHDRAW.
===============
${right}Current Money: $${money + parseInt(args[0])} ${tugrug}
===============
${right}Current Bank: $${bank - parseInt(args[0])} ${tugrug}`)

  //Program
  if (!args[0]) {
    message.channel.send({ embeds: [errAmount] })
  } else if (args[0] === 'all') {
    if (bank < 1) {
      message.channel.send({ embeds: [enoughMoney] })
    } else {
      client.db.subtract(`bank_${user.id}`, parseInt(bank))
      client.db.add(`money_${user.id}`, parseInt(bank))
      message.channel.send({ embeds: [allMoney] })
    }
  } else if (!parseInt(args[0])) {
    message.channel.send({ embeds: [errAmount] })
  } else if (parseInt(args[0]) < 1) {
    message.channel.send({ embeds: [evenNum] })
  } else if (bank < parseInt(args[0])) {
    message.channel.send({ embeds: [enoughMoney] })
  } else {
    client.db.subtract(`bank_${user.id}`, parseInt(args[0]))
    client.db.add(`money_${user.id}`, parseInt(args[0]))
    message.channel.send({ embeds: [embed] })
  }
}

exports.help = {
  name: "WITHDRAW",
  aliases: ['wd', 'withdraw'],
  usage: `wd <amount>`
}