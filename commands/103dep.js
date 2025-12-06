const { MessageEmbed } = require('discord.js');

exports.execute = (client, message, args) => {
  

  let user = message.author;

  //Database
  let money = client.db.fetch(`money_${user.id}`)
  let bank = client.db.fetch(`bank_${user.id}`);

  //Prints
  if (money === null) money = 0;
  if (bank === null) bank = 0;

  // Embeds
  let errAmount = new MessageEmbed()
    .setTitle(`⚠️ **WARNING** ⚠️`)
    .setColor('RED')
    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
    .setDescription(`Enter amount or ALL command 
example:
${client.config.prefix}dep 100
or
${client.config.prefix}dep all`);

  let evenNum = new MessageEmbed()
    .setTitle(`⚠️ **WARNING** ⚠️`)
    .setColor('RED')
    .setDescription(`Hey you cant use this number`);

  let enoughMoney = new MessageEmbed()
    .setTitle(`⚠️ **FAILED** ⚠️`)
    .setColor('RED')
    .setDescription(`Not enough your money
===============
Money: $${money} have`);

  let allMoney = new MessageEmbed()
    .setAuthor({ name: "Deposit", iconURL: client.user.displayAvatarURL() })
    .setTitle(`${cD} **Success** ${cD}`)
    .setColor('GREEN')
    .setTimestamp()
    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
    .setDescription(`$${parseInt(money)}  IS DEPOSITED.
===============
Current Money: $${money - parseInt(money)} 
===============
Current Bank: $${bank + parseInt(money)} `)

  let embed = new MessageEmbed()
    .setAuthor({ name: "Deposit", iconURL: client.user.displayAvatarURL() })
    .setTitle(`${cD} **Success** ${cD}`)
    .setColor('GREEN')
    .setTimestamp()
    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
    .setDescription(`$${parseInt(args[0])} IS DEPOSITED.
===============
Current Money: $${money - parseInt(args[0])} 
===============
Current Bank: $${bank + parseInt(args[0])}`)

  //Program
  if (!args[0]) {
    message.channel.send({ embeds: [errAmount] })
  } else if (args[0] === 'all') {
    if (money < 1) {
      message.channel.send({ embeds: [enoughMoney] })
    } else {
      client.db.subtract(`money_${user.id}`, parseInt(money))
      client.db.add(`bank_${user.id}`, parseInt(money))
      message.channel.send({ embeds: [allMoney] })
    }
  } else if (!parseInt(args[0])) {
    message.channel.send({ embeds: [errAmount] })
  } else if (parseInt(args[0]) < 1) {
    message.channel.send({ embeds: [evenNum] })
  } else if (money < parseInt(args[0])) {
    message.channel.send({ embeds: [enoughMoney] })
  } else {
    client.db.subtract(`money_${user.id}`, parseInt(args[0]))
    client.db.add(`bank_${user.id}`, parseInt(args[0]))
    message.channel.send({ embeds: [embed] })
  }
}

exports.help = {
  name: "===============\n**🏦 BANK COMMANDS**\n\nDEPOSIT",
  aliases: ['dep', 'deposit'],
  usage: `dep <amount>`
}