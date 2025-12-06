const cooldown = new Set();
const { MessageEmbed } = require('discord.js')
exports.execute = (client, message, args) => {
  let author = message.author;
  let items = {
    Food: client.db.fetch(`food_${author.id}`),
    Water: client.db.fetch(`water_${author.id}`),
    EnergyDrink: client.db.fetch(`energyD_${author.id}`),
    Phone: client.db.fetch(`phone_${author.id}`),
    Money: client.db.fetch(`money_${author.id}`),
    CoinP: client.db.fetch(`coin_${author.id}`),
    Key: client.db.fetch(`key_${author.id}`),
    Tool: client.db.fetch(`tool_${author.id}`),
    Antimatter: client.db.fetch(`antimatter_${author.id}`),
    Diamond: client.db.fetch(`diamond_${author.id}`),
    Gold: client.db.fetch(`gold_${author.id}`),
    Iron: client.db.fetch(`iron_${author.id}`),
    Coal: client.db.fetch(`coal_${author.id}`)
  }

  let itemDb
  let content = ''
  for (let key in items) {
    if (items[key] == null || items[key] == 0) {
      key = '';
      items[key] = '';
    } else {
      content += `**${key}** : ${items[key]}\n\n`
    }
  }

  let inventory = new MessageEmbed()
    .setTitle(`INVENTORY`)
    .setColor('BLURPLE')
    .setDescription(content)
    .setThumbnail(author.displayAvatarURL())

  message.channel.send(`I will send to your **DM**`)
  setTimeout(() => {
    message.author.send({ embeds: [inventory] })
  }, 3000)
}
exports.help = {
  name: 'Inventory',
  aliases: ['inventory', 'inv'],
  usage: `inv`
}