const { MessageActionRow, MessageButton } = require('discord.js');

exports.execute = async (client, message, args) => {
  const question = args[0];
  const options = args.slice(1);

  const row = new MessageActionRow();
  const buttons = [];

  for (const option of options) {
    buttons.push(
      new MessageButton()
        .setCustomId(option)
        .setLabel(option)
        .setStyle('PRIMARY')
    );
  }

  row.addComponents(buttons);

  await message.channel.send({
    content: question,
    components: [row]
  });
};

exports.help = {
  name: 'vote',
  aliases: [],
  usage: 'vote <question> <option1> <option2> ...',
  description: 'Starts a vote with multiple options.'
};