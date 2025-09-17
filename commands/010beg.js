exports.execute = async (client, message, args) => {
  

  let tugrug = client.emoji.tugrug;
  let users = [`${message.guild.name}`];

  let amount = Math.floor(Math.random() * 500) + 70;
  let beg = client.eco.beg(client.ecoAddUser, amount, { canLose: true });
  if (beg.onCooldown) return message.reply(`Begon Thot! Come back after ${beg.time.seconds} seconds.`);
  if (beg.lost) return message.channel.send(`**${users[Math.floor(Math.random() * users.length)]}:** Begon Thot! Try again later.`);
  else return message.reply(`**${users[Math.floor(Math.random() * users.length)]}** donated you **${beg.amount}** ${tugrug}. Now you have **${beg.after}** ${tugrug}.`);
}

exports.help = {
  name: "===============\n**💰 EARN MONEY COMMANDS**\n\nBeg Reward",
  aliases: ['beg'],
  usage: `beg`
}