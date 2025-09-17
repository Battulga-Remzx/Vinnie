const { MessageEmbed } = require('discord.js');

const cooldown = new Set();
const robCd = new Set();

exports.execute = (client, message, args) => {
  const user = message.author;
  let member = message.mentions.members.first();
  let emoji = client.emoji;

  const police = client.db.fetch(`police_${user.id}`);
  const doctor = client.db.fetch(`doctor_${user.id}`);
  const miner = client.db.fetch(`miner_${user.id}`);
  const gang = client.db.fetch(`gang_${user.id}`);

  let miningEmbed = new MessageEmbed()
    .setDescription(`. . . ${emoji.mining} ${user.tag} mining`)
    .setColor('ORANGE')

  let miningCd = 10000;

  let fndAntimatter = new MessageEmbed()
    .setTitle(`Congratulations`)
    .setDescription(`${user.tag} 
  ||${emoji.antimatter} You found **ANTIMATTER**||`)
    .setColor('ORANGE')
    .setFooter('Click to spoiler ⬆️', user.displayAvatarURL())

  let fndDiamond = new MessageEmbed()
    .setTitle(`Congratulations`)
    .setDescription(`${user.tag} 
  ||${emoji.diamond} You found **DIAMOND**||`)
    .setColor('ORANGE')
    .setFooter('Click to spoiler ⬆️', user.displayAvatarURL())

  let fndGold = new MessageEmbed()
    .setTitle(`Congratulations`)
    .setDescription(`${user.tag} 
  ||${emoji.gold} You found **GOLD**||`)
    .setColor('ORANGE')
    .setFooter('Click to spoiler ⬆️', user.displayAvatarURL())

  let fndIron = new MessageEmbed()
    .setTitle(`Congratulations`)
    .setDescription(`${user.tag} 
  ||${emoji.iron} You found **IRON**||`)
    .setColor('ORANGE')
    .setFooter('Click to spoiler ⬆️', user.displayAvatarURL())

  let fndCoal = new MessageEmbed()
    .setTitle(`Congratulations`)
    .setDescription(`${user.tag} 
  ||${emoji.coal} You found **COAL**|| `)
    .setColor('ORANGE')
    .setFooter('Click to spoiler ⬆️', user.displayAvatarURL())

  if (police == true) {
    if (!message.channel.id.includes('1010653830645547098')) {
      setTimeout(() => {
        message.delete();
      }, 5000)
      message.channel.send('Go to <#1010653830645547098> channel').then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 5000)
      })
    }
    message.channel.send('Police work')
  } else if (doctor == true) {
    if (!message.channel.id.includes('1010654381563183104')) {
      setTimeout(() => {
        message.delete();
      }, 5000)
      message.channel.send('Go to <#1010654381563183104> channel').then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 5000)
      })
    }
    message.channel.send('Doctor work')
  } else if (miner == true) {
    if (!message.channel.id.includes('1010654972007952414')) return message.channel.send('Go to <#1010654972007952414> channel').then(msg => {
      setTimeout(() => {
        msg.delete();
      }, 5000)
    })

    const mine = Math.floor(Math.random() * 10000) + 1
    if (mine == 10000) {
      if (cooldown.has(user.id)) return message.channel.send(`Wait for 1 minute.`)
      message.channel.send({ embeds: [miningEmbed] }).then(msg => {
        setTimeout(() => {
          msg.edit({ embeds: [fndAntimatter] })
          client.db.add(`antimatter_${user.id}`, 1)
        }, miningCd)
      })
      cooldown.add(user.id);
      setTimeout(() => {
        cooldown.delete(user.id)
      }, 60000)
    } else if (mine <= 9999 && mine >= 9989) {
      if (cooldown.has(user.id)) return message.channel.send(`Wait for 1 minute.`)
      message.channel.send({ embeds: [miningEmbed] }).then(msg => {
        setTimeout(() => {
          msg.edit({ embeds: [fndDiamond] })
          client.db.add(`diamond_${user.id}`, 1)
        }, miningCd)
      })
      cooldown.add(user.id);
      setTimeout(() => {
        cooldown.delete(user.id)
      }, 60000)
    } else if (mine <= 9988 && mine >= 9888) {
      if (cooldown.has(user.id)) return message.channel.send(`Wait for 1 minute.`)
      message.channel.send({ embeds: [miningEmbed] }).then(msg => {
        setTimeout(() => {
          msg.edit({ embeds: [fndGold] })
          client.db.add(`gold_${user.id}`, 1)
        }, miningCd)
      })
      cooldown.add(user.id);
      setTimeout(() => {
        cooldown.delete(user.id)
      }, 60000)
    } else if (mine <= 9887 && mine >= 8887) {
      if (cooldown.has(user.id)) return message.channel.send(`Wait for 1 minute.`)
      message.channel.send({ embeds: [miningEmbed] }).then(msg => {
        setTimeout(() => {
          msg.edit({ embeds: [fndIron] })
          client.db.add(`iron_${user.id}`, 1)
        }, miningCd)
      })
      cooldown.add(user.id);
      setTimeout(() => {
        cooldown.delete(user.id)
      }, 60000)
    } else {
      if (cooldown.has(user.id)) return message.channel.send(`Wait for 30 seconds.`)
      message.channel.send({ embeds: [miningEmbed] }).then(msg => {
        setTimeout(() => {
          msg.edit({ embeds: [fndCoal] })
          client.db.add(`coal_${user.id}`, 1)
        }, miningCd)
      })
      cooldown.add(user.id);
      setTimeout(() => {
        cooldown.delete(user.id)
      }, 30000)
    }
  } else if (gang == true) {

    let authorMoney = client.db.fetch(`money_${user.id}`);
    let tool = client.db.fetch(`robTool_${user.id}`)
    if (tool == null) tool = 1;
    let amount = Math.floor(Math.random() * 2000) + 1;
    let tugrug = client.emoji.tugrug;
    let robCall;
    let callRandom = Math.floor(Math.random() * 4) + 1;
    if (callRandom == 1) {
      robCall = user.tag;
    } else {
      robCall = '``error user``'
    }
    if (robCd.has(user.id)) return message.delete().then(msg => {
      setTimeout(() => {
        msg.channel.send(`Wait for 1 minute cooldown.`).then(msg => {
          setTimeout(() => {
            msg.delete();
          }, 5000)
        })
      }, 0)
    })
    if (!member) return message.channel.send(`Please select member`);
    if (member.id == user.id) return message.channel.send(`What? are you stupid?`)
    if (tool == null || tool == 0) return message.channel.send(`You need **1 TOOL**.`);
    if (memberMoney < 2000) return message.channel.send(`His money is very little`)
    robCd.add(user.id);
    setTimeout(() => {
      robCd.delete(user.id)
    }, 60000)
    message.delete();
    message.channel.send(`${robCall} was robbed ${member}
    ${amount}${tugrug} robbed.`)
  } else {
    message.channel.send('You not working')
  }
}

exports.help = {
  name: 'Your work',
  aliases: ['work'],
  usage: `work`
}