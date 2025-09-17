const cooldown = new Set();
const { MessageEmbed } = require('discord.js')
exports.execute = (client, message, args) => {
  
  let author = message.author;
  let item = args[0];
  let amount = parseInt(args[1]);
  let price = client.sellprice;
  let emoji = client.emoji;
  let tugrug = emoji.tugrug;

  let antimatter = client.db.fetch(`antimatter_${author.id}`)
  let diamond = client.db.fetch(`diamond_${author.id}`)
  let gold = client.db.fetch(`gold_${author.id}`)
  let iron = client.db.fetch(`iron_${author.id}`)
  let coal = client.db.fetch(`coal_${author.id}`)
  let coin = client.db.fetch(`coin_${author.id}`)


  let items = client.sellprice;
  let content = [];
  for (let key in items) {
    content += `${emoji.right} **${key.toUpperCase()}** : ${items[key]}\n\n`
  }
  let sellMenu = new MessageEmbed()
    .setTitle(`Sell Menu`)
    .setColor('BLUE')
    .setDescription(content)

  if (!item) return message.channel.send(`Please enter your **ITEM** name.`);
  if (item == 'menu') return message.channel.send({ embeds: [sellMenu] })
  if (!amount) return message.channel.send(`Please enter amount`);
  if (amount < 1) return message.channel.send(`You cant use this number`)
  if (item == "antimatter") {
    if (antimatter == null || antimatter == 0) return message.channel.send(`You don't have this ITEM`)
    if (antimatter < amount) return message.channel.send(`You have **${antimatter} antimatter.**`)
    message.channel.send(`You selled ${amount} **ANTIMATTER** +${price.antimatter * amount}${tugrug}`)
    client.db.subtract(`antimatter_${author.id}`, amount);
    client.db.add(`money_${author.id}`, price.antimatter * amount)
  } else if (item == "diamond") {
    if (diamond == null || diamond == 0) return message.channel.send(`You don't have this ITEM`)
    if (diamond < amount) return message.channel.send(`You have **${diamond} diamonds.**`)
    message.channel.send(`You selled ${amount} **DIAMOND** +${price.diamond * amount}${tugrug}`)
    client.db.subtract(`diamond_${author.id}`, amount);
    client.db.add(`money_${author.id}`, price.diamond * amount)
  } else if (item == "gold") {
    if (gold == null || gold == 0) return message.channel.send(`You don't have this ITEM`)
    if (gold < amount) return message.channel.send(`You have **${gold} golds.**`)
    message.channel.send(`You selled ${amount} **GOLD** +${price.gold * amount}${tugrug}`)
    client.db.subtract(`gold_${author.id}`, amount)
    client.db.add(`money_${author.id}`, price.gold * amount)
  } else if (item == "iron") {
    if (iron == null || iron == 0) return message.channel.send(`You don't have this ITEM`)
    if (iron < amount) return message.channel.send(`You have **${iron} iron.**`)
    message.channel.send(`You selled ${amount} **IRON** +${price.iron * amount}${tugrug}`)
    client.db.subtract(`iron_${author.id}`, amount)
    client.db.add(`money_${author.id}`, price.iron * amount)
  } else if (item == "coal") {
    if (coal == null || coal == 0) return message.channel.send(`You don't have this ITEM`)
    if (coal < amount) return message.channel.send(`You have **${coal} coal.**`)
    message.channel.send(`You selled ${amount} **COAL** +${price.coal * amount}${tugrug}`)
    client.db.subtract(`coal_${author.id}`, amount)
    client.db.add(`money_${author.id}`, price.coal * amount)
  } else if (item == "coin") {
    if (coin == null || coin == 0) return message.channel.send(`You don't have this ITEM`)
    if (coin < amount) return message.channel.send(`You have **${coin} coal.**`)
    message.channel.send(`You selled ${amount} **COIN** +${price.coinP * amount}🪙`)
    client.db.subtract(`coin_${author.id}`, amount)
    client.db.add(`money_${author.id}`, price.coinP * amount)
  } else {
    message.channel.send(`I didnt found **${item}** item`)
  }
}
exports.help = {
  name: 'Sell ITEM',
  aliases: ['sell'],
  usage: `sell <item> <amount>`
}