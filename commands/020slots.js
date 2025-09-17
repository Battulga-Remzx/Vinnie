const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

exports.execute = (client, message, args) => {
  let user = message.author;
  let emote = client.emoji;
  let fSpin = "🎲";
  let sSpin = "🎲";
  let lSpin = "🎲";
  let emoji = ["🍋",
  "💲",
  "🃏",
  "🍒",
  "7️⃣",
  "💰",
  "🍇",
  "🍉",];
  let color = client.color;

  let infoCd = 5000;
  let spinCd = 3000;
  let lastSpinCd = 5000;

  let button = false;
  let num = [];

  let amount = parseInt(args[0])
  let money = client.db.fetch(`coin_${user.id}`)
  let amountDash = amount.toLocaleString()
  function errNumber() {
    message.channel.send(`Please enter an amount ! `)
  }
  function lowNumber() {
    message.channel.send(`it was wrong number !`)
  }

  function enoughMoney() {
    message.channel.send(`Not enough money`)
  }

  for (let i = 1; i <= 3; i++) {
    num[i] = Math.floor(Math.random() * emoji.length);
  }


  let start = new MessageEmbed()
    .setDescription(`${user.tag}
**${fSpin} | ${sSpin} | ${lSpin}**  . . . betting ${amountDash} 🪙`)
    .setThumbnail(user.displayAvatarURL())
    .setColor('ORANGE')


  let firstSpin = new MessageEmbed()
    .setDescription(`${user.tag}
**${emoji[num[1]]} | ${sSpin} | ${lSpin}**  . . . betting ${amountDash} 🪙`)
    .setThumbnail(user.displayAvatarURL())
    .setColor('ORANGE')


  let secondSpin = new MessageEmbed()
    .setDescription(`${user.tag}
**${emoji[num[1]]} | ${emoji[num[2]]} | ${lSpin}**  . . . betting ${amountDash} 🪙`)
    .setThumbnail(user.displayAvatarURL())
    .setColor('ORANGE')


  let fullWin = new MessageEmbed()
    .setDescription(`${user.tag}
**${emoji[num[1]]} | ${emoji[num[2]]} | ${emoji[num[3]]}** = Won ${(amount * 9).toLocaleString()} 🪙`)
    .setThumbnail(user.displayAvatarURL())
    .setColor('GREEN')


  let halfWin = new MessageEmbed()
    .setDescription(`${user.tag}
**${emoji[num[1]]} | ${emoji[num[2]]} | ${emoji[num[3]]}** = Won ${(amount * 2).toLocaleString()} 🪙`)
    .setThumbnail(user.displayAvatarURL())
    .setColor('GREEN')


  let lost = new MessageEmbed()
    .setDescription(`${user.tag}
**${emoji[num[1]]} | ${emoji[num[2]]} | ${emoji[num[3]]}** = Lost ${amountDash} 🪙`)
    .setThumbnail(user.displayAvatarURL())
    .setColor('RED')

  let canceled = new MessageEmbed()
    .setDescription(`Slots game canceled`)

  let ask = new MessageEmbed()
    .setDescription(`Are you sure betting ${amountDash} 🪙?`)

  let row = new MessageActionRow()
    .addComponents([
      new MessageButton()
        .setCustomId('yes')
        .setLabel('Yes')
        .setStyle(3),
      new MessageButton()
        .setCustomId('no')
        .setLabel('No')
        .setStyle(4)
    ])

  function yes() {
    const filter = i => i.customId === 'yes' && i.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
      if (i.customId === 'yes') {
        await i.deferUpdate()
        await i.message.edit({ components: [] })
        await i.message.delete()
        game()
      }
    });
  }

  function no() {
    const filter = i => i.customId === 'no' && i.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
      if (i.customId === 'no') {
        await i.deferUpdate()
        await i.message.edit({ embeds: [canceled], components: [] })
        setTimeout(() => {
          i.message.delete()
        }, 4000)
      }
    });
  }

  function game() {
    if (num[1] == num[2] && num[1] == num[3] && num[2] == num[3]) {
      client.db.subtract(`coin_${user.id}`, amount)
      message.channel.send({ embeds: [start] }).then(msg => {
        setTimeout(() => {
          msg.edit({ embeds: [firstSpin] }).then(msg => {
            setTimeout(() => {
              msg.edit({ embeds: [secondSpin] }).then(msg => {
                setTimeout(() => {
                  msg.edit({ embeds: [fullWin] })
                  client.db.add(`coin_${user.id}`, amount * 9)
                }, lastSpinCd)
              })
            }, spinCd)
          })
        }, spinCd)
      })
    } else if (num[1] == num[2] || num[1] == num[3] || num[2] == num[3]) {
      client.db.subtract(`coin_${user.id}`, amount)
      message.channel.send({ embeds: [start] }).then(msg => {
        setTimeout(() => {
          msg.edit({ embeds: [firstSpin] }).then(msg => {
            setTimeout(() => {
              msg.edit({ embeds: [secondSpin] }).then(msg => {
                setTimeout(() => {
                  msg.edit({ embeds: [halfWin] })
                  client.db.add(`coin_${user.id}`, amount * 2)
                }, lastSpinCd)
              })
            }, spinCd)
          })
        }, spinCd)
      })
    } else {
      client.db.subtract(`coin_${user.id}`, amount)
      message.channel.send({ embeds: [start] }).then(msg => {
        setTimeout(() => {
          msg.edit({ embeds: [firstSpin] }).then(msg => {
            setTimeout(() => {
              msg.edit({ embeds: [secondSpin] }).then(msg => {
                setTimeout(() => {
                  msg.edit({ embeds: [lost] })
                }, lastSpinCd)
              })
            }, spinCd)
          })
        }, spinCd)
      })
    }
  }
  if (!parseInt(amount)) return errNumber()
  if (amount < 1) return lowNumber()
  if (money < amount) return enoughMoney()
  if (button == false) {
    game();
  }
}

exports.help = {
  name: 'SLOT MACHINE',
  aliases: ['slots'],
  usage: `slots`
}