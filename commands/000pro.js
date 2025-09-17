const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  let userBalance = client.eco.fetchMoney(user.id);
  let bank = client.db.fetch(`bank_${user.id}`);

  let money = client.db.fetch(`money_${user.id}`)

  let vip = client.db.fetch(`vip_${user.id}`)
  if (vip == true) {
    vip = "Purchased ✔️";
  } else {
    vip = "Free pass ✔️";
  }
  if (bank == null) bank = 0;

  if (money == null) money = 0;
  let cD = client.emoji.colorDiscord;
  let right = client.emoji.right;
  let medal = client.image.noReward;
  let emoji = client.emoji;
  if (userBalance.position == 1) {
    userBalance.position = '1st 🥇';
    medal = client.image.onePlace;
  } else if (userBalance.position == 2) {
    userBalance.position = '2nd 🥈';
    medal = client.image.twoPlace;
  } else if (userBalance.position == 3) {
    userBalance.position = '3rd 🥉';
    medal = client.image.threePlace;
  } else {
    userBalance.position = `${userBalance.position}th`;
    medal = client.image.noReward;
  }
  const embed = new MessageEmbed()
    .setAuthor('PROFILE INFORMATION', user.displayAvatarURL())
    .setDescription(`${right}**USERNAME**: ${user.tag}

${right}**VIP PASS**: ${vip}

${right}**MONEY**: $${money} ${emoji.tugrug}

${right}**BANK**: $${bank} 🏦

${right}**LEADERBOARD MONEY**: ${userBalance.position}`)
    .setColor("WHITE")
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTimestamp()
    .setThumbnail(medal)
    .setTimestamp();
  return message.channel.send({ embeds: [embed] });
}

exports.help = {
  name: "===============\nℹ️ **INFORMATION COMMANDS**\n\nProfile Information",
  aliases: ["profile", "pro"],
  usage: `pro`
}