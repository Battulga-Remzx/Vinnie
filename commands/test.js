const { MessageEmbed } = require('discord.js');

exports.execute = (client, message, args) => {
  const question = args.join(' ');

  if (!question) {
    return message.reply('Please provide a question.');
  }

  const filter = (response) => {
    return response.author.id === message.author.id;
  };

  message.channel.send(` Please wait for a response... `).then((msg) => {
    message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
      .then((collected) => {
        const answers = ['Yes', 'No', 'Maybe', 'I\'m not sure'];
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

        const embed = new MessageEmbed()
          .setTitle('🔮 Question')
          .setDescription(question)
          .addFields('Answer', randomAnswer)
          .setColor('RANDOM');

        msg.edit({ content: '', embeds: [embed] });
      })
      .catch(() => {
        msg.edit('❌ No response received. Please try again.');
      });
  });
};

exports.help = {
  name: 'question',
  usage: 'question <your question>',
  aliases: ['ask']
};
