

const { MessageEmbed } = require('discord.js')

exports.execute = (client, message, args) => {
  if (!args[0]) return message.channel.send(`**LB Commands**

${client.config.prefix}lb money
${client.config.prefix}lb bank`);
  if (args[0] === 'money') {
    let money = client.db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
    if (!money.length) {
      let noEmbed = new MessageEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL())
        .setColor("GREEN")
        .setFooter("Nothing To See Here Yet!")
      message.channel.send({ embeds: [noEmbed] })
    };

    money.length = 10;
    var finalLb = "";
    for (var i in money) {
      if (money[i].data === null) money[i].data = 0
      finalLb += `**${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - $${money[i].data} :dollar:\n`;
    };

    const embed = new MessageEmbed()
      .setTitle(`Leaderboard Of ${message.guild.name}`)
      .setColor("GREEN")
      .setDescription(finalLb)
      .setFooter(client.user.tag, client.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send({ embeds: [embed] });
  } else if (args[0] === 'bank') {
    let money = client.db.all().filter(data => data.ID.startsWith(`bank_`)).sort((a, b) => b.data - a.data);
    if (!money.length) {
      let noEmbed = new MessageEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL())
        .setColor("GREEN")
        .setFooter("Nothing To See Here Yet!")
      message.channel.send({ embeds: [noEmbed] })
    };

    money.length = 10;
    var finalLb = "";
    for (var i in money) {
      if (money[i].data === null) money[i].data = 0
      finalLb += `**${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - $${money[i].data} :dollar:\n`;
    };

    const embed = new MessageEmbed()
      .setTitle(`Leaderboard Of ${message.guild.name}`)
      .setColor("GREEN")
      .setDescription(finalLb)
      .setFooter(client.user.tag, client.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send({ embeds: [embed] });
  } else {
    message.channel.send('error')
  }
}

exports.help = {
  name: '\nLeaderboard Information',
  aliases: ['lb', 'leaderboard '],
  usage: `lb`
}