const { MessageEmbed } = require('discord.js');

exports.execute = (client, message, args) => {
  
  const author = message.author;

  const emoji = client.emoji;
  const items = client.buyprice;

  let content = [];

  for (let key in items) {
    content += `**${emoji.right} ${key.toUpperCase()}** -  ${items[key]}${emoji.tugrug}\n\n`
  }

  let embed = new MessageEmbed()
    .setTitle(message.guild.name + " store")
    .setDescription(content)
    .setColor("BLURPLE")
    .setFooter(`${client.prefix}buy <item>`, author.displayAvatarURL())
  return message.channel.send({ embeds: [embed] });
}
exports.help = {
  name: "Shop Information",
  aliases: ['shop'],
  usage: `shop`
}