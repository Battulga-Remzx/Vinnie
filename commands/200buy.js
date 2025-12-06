const { MessageEmbed } = require('discord.js');

exports.execute = (client, message, args) => {
  
  const author = message.author;
  const items = client.buyprice;
  const money = client.db.fetch(`money_${author.id}`);
  const coinDb = client.db.fetch(`coinP_${author.id}`)
  const coinPrice = client.buyprice.coinP

  let content = [];

  for (var key in items) {
    content += `**${key}** -  ${items[key]}\n\n`
  }

  let itemMenu = new MessageEmbed()
    .setTitle(message.guild.name + " store")
    .setDescription(content)
    .setColor("BLURPLE")
    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })

  const item = args[0];
  const amount = parseInt(args[1]);

  for (let key in items) {
    if (!item) return message.channel.send(`Please enter **Item**`).then(msg => {
      setTimeout(() => {
        msg.edit({ embeds: [itemMenu] })
      }, 3000)
    })
    if (!amount) return message.channel.send(`Please enter amount`)
    if (amount < 1) return message.channel.send(`You cant use this number`)
    if (money < amount * items[key]) return message.channel.send(`Not enough your money`)
    if (key.toLowerCase() == item.toLowerCase()) {
      message.channel.send(`You purchased ${amount} **${item.toUpperCase()}**`);
      client.db.add(`${item}_${author.id}`, amount)
      client.db.subtract(`money_${author.id}`, amount * items[key])
      break;
    }
  }
}
exports.help = {
  name: "===============\n**🛒 ITEM BUY AND SELL**\n\nBuy Item",
  aliases: ['buy'],
  usage: `buy <item> <amount>`
}