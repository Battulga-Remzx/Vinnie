const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {

  // Embed үүсгэх
  const embed = new MessageEmbed()
    .setAuthor({ name: "Commands", iconURL: client.user.displayAvatarURL() })
    .setDescription(`Total Commands: ${client.commands.size}`)
    .setColor("#EB96EB")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();

  // Бүх command-г embed-д нэмэх
  client.commands.forEach(cmd => {
    embed.addFields({
      name: cmd.help.name,
      value: `**Aliases:** ${cmd.help.aliases.join(", ") || "None"}\n` +
             `**Usage:** \`${client.config.prefix}${cmd.help.usage}\``,
      inline: true
    });
  });

  // Embed-г илгээх
  return message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "help",
  aliases: ["h"],
  usage: "help"
};
