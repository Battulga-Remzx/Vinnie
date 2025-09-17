const { MessageEmbed } = require('discord.js');

exports.execute = (client, message, args) => {
  // Check if the user has permission to use the command (e.g., only the bot owner)
  const adminRole = message.guild.roles.cache.find(role => role.id === '1232177286791565373');

  // Check if the message author has the admin role
  if (!message.member.roles.cache.has(adminRole.id)) {
    return message.reply('You do not have the admin role to use this command.');
  }

  // Check if a user was mentioned
  const user = message.mentions.users.first();
  if (!user) {
    return message.reply('Please mention a user to set their money.');
  }

  // Parse the amount to set
  const amount = parseInt(args[1]);
  if (isNaN(amount) || amount < 0) {
    return message.reply('Please provide a valid amount to set.');
  }

  // Set the user's money in the database
  client.db.set(`money_${user.id}`, amount);

  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Set Money')
    .setDescription(`Successfully set ${user.tag}'s money to ${amount.toLocaleString()}.`);

  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: 'SETMONEY',
  aliases: ['setm'],
  usage: 'setmoney <@user> <amount>',
};
