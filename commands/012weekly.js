exports.execute = async (client, message, args) => {
  

  let tugrug = client.emoji.tugrug;

  let amount = Math.floor(Math.random() * 30000) + 1;
  let addMoney = client.eco.weekly(client.ecoAddUser, amount);
  if (addMoney.onCooldown) return message.reply(`You have already claimed your weekly credit. Come back after ${addMoney.time.days} days, ${addMoney.time.hours} hours, ${addMoney.time.minutes} minutes & ${addMoney.time.seconds} seconds to claim it again.`);
  else return message.reply(`You have claimed **${addMoney.amount}** ${tugrug} as your weekly credit & now you have **${addMoney.after}** ${tugrug}.`);
};

exports.help = {
  name: "\nWeekly Reward",
  aliases: ['weekly'],
  usage: "weekly"
}