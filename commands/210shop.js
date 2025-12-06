const { MessageEmbed } = require('discord.js');

exports.execute = (client, message, args) => {
  
  const author = message.author;

  const items = client.buyprice;

  let content = [];

  for (let key in items) {
    content += `**${key.toUpperCase()}** -  ${items[key]}\n\n`
  }

  let embed = new MessageEmbed()
    .setTitle(message.guild.name + " store")
    .setDescription(content)
    .setColor("BLURPLE")
    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
  return message.channel.send({ embeds: [embed] });
}
exports.help = {
  name: "Shop Information",
  aliases: ['shop'],
  usage: `shop`
}