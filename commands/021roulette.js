const { MessageEmbed } = require('discord.js');

exports.execute = (client, message, args) => {
  
  // Available bet options
  const betOptions = ['red', 'black', 'even', 'odd'];

  // Check if a valid bet option was provided
  const bet = args[0]?.toLowerCase();
  if (!bet || !betOptions.includes(bet)) {
    return message.reply(`Please place a valid bet: ${betOptions.join(', ')}`);
  }

  // Amount to bet
  const amount = parseInt(args[1]);

  // Check if a valid amount was provided
  if (isNaN(amount) || amount <= 0) {
    return message.reply('Please provide a valid amount to bet.');
  }

  let user = message.author;
  // Fetch the user's balance from the database
  const coin = client.db.fetch(`coin_${user.id}`);

  // Check if the user has enough balance to place the bet
  if (coin < amount) {
    return message.reply('You do not have enough balance to place this bet.');
  }

  // Simulate spinning the roulette wheel
  const winningNumber = Math.floor(Math.random() * 37); // Random number between 0 and 36
  const isEven = winningNumber % 2 === 0;
  const isRed =
    winningNumber !== 0 && (winningNumber <= 10 || (winningNumber >= 19 && winningNumber <= 28));

  // Determine the outcome of the bet
  let outcome;
  if (bet === 'red' && isRed) {
    outcome = 'win';
  } else if (bet === 'black' && !isRed) {
    outcome = 'win';
  } else if (bet === 'even' && isEven) {
    outcome = 'win';
  } else if (bet === 'odd' && !isEven) {
    outcome = 'win';
  } else {
    outcome = 'lose';
  }

  // Calculate the result and update the user's balance
  let result;
  if (outcome === 'win') {
    result = `Congratulations! You won ${amount} coins.`;
    client.db.add(`coin_${user.id}`, amount);
  } else {
    result = `Oops! You lost ${amount} coins.`;
    client.db.subtract(`coin_${user.id}`, amount);
  }

  // Construct and send the result message
  const embed = new MessageEmbed()
    .setTitle('Roulette Game')
    .setDescription(`The winning number is ${winningNumber}. You bet ${bet} and ${result}`)
    .setColor('#0099ff');

  message.channel.send({embeds: [embed]});
};

exports.help = {
  name: 'roulette',
  aliases: ['rlt'],
  usage: 'roulette <bet> <amount>',
};
