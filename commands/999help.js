const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {

  let right = client.emoji.right;
  let yellowFire = client.emoji.yellowFire;

  const embed = new MessageEmbed()
    .setAuthor("Commands", client.user.displayAvatarURL())
    .setDescription(`Total Commands: ${client.commands.size}`)
    .setColor("#EB96EB")
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL)
    .setFooter(message.author.tag, message.author.displayAvatarURL());
  client.commands.forEach(cmd => {
    embed.addField(`${cmd.help.name}`, `${right}Aliases: ${cmd.help.aliases.join(", ") || "None"}\n${right}Usage: \`${client.prefix}${cmd.help.usage}\``, true);
  });
  return message.channel.send({ embeds: [embed] });
}

exports.help = {
  name: "help",
  aliases: ["h"],
  usage: `help`
}