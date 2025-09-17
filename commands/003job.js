const { MessageEmbed } = require('discord.js');

const cooldown = new Set();
exports.execute = (client, message, args) => {

  const user = message.author;
  const emoji = client.emoji;
  const jobName = args[0];


  const work = client.db.fetch(`working_${user.id}`);
  const police = client.db.fetch(`police_${user.id}`);
  const doctor = client.db.fetch(`doctor_${user.id}`);
  const miner = client.db.fetch(`miner_${user.id}`);
  const gang = client.db.fetch(`gang_${user.id}`);

  let policeRole = message.guild.roles.cache.find(r => r.name === 'POLICE')
  let doctorRole = message.guild.roles.cache.find(r => r.name === 'DOCTOR')
  let gangRole = message.guild.roles.cache.find(r => r.name === 'GANG')
  let minerRole = message.guild.roles.cache.find(r => r.name === 'MINER')

  const jobCd = client.db.fetch(`jobCd_${user.id}`);

  const workinName = '';

  const jobMenu = new MessageEmbed()
    .setTitle(`**Jobs Menu**`)
    .setColor('BLUE')
    .setFooter('JOB LIST')
    .setTimestamp()
    .setImage('https://cdn.glitch.global/1cf686b0-913a-46e4-97b7-1fdc280c579e/shutterstock_1055044370.jpg?v=1661025445939')
    .setDescription(`👮‍♂️POLICE ${emoji.right} **${client.config.prefix}job police**
 
👩‍⚕️DOCTOR ${emoji.right} **${client.config.prefix}job doctor**

⛏️MINER ${emoji.right} **${client.config.prefix}job miner**

👹GANG ${emoji.right} **${client.config.prefix}job gang**`)

  if (police == true) {
    workingName = '**POLICE** 👮‍♂️'
  } else if (doctor == true) {
    workingName = '**DOCTOR** 👩‍⚕️'
  } else if (miner == true) {
    workingName = '**MINER** ⛏️'
  } else if (gang == true) {
    workingName = '**GANG** 👹'
  }

  if (jobName === 'leave') {
    if (cooldown.has(message.author.id)) {
      setTimeout(() => {
        message.delete();
      }, 3000)
      return message.channel.send('You cant leave your job in 1week');
    }
    client.db.set(`working_${user.id}`, false)
    client.db.set(`gang_${user.id}`, false)
    message.member.roles.remove(gangRole)
    client.db.set(`police_${user.id}`, false)
    message.member.roles.remove(policeRole)
    client.db.set(`doctor_${user.id}`, false)
    message.member.roles.remove(doctorRole)
    client.db.set(`miner_${user.id}`, false)
    message.member.roles.remove(minerRole)
    message.channel.send('You are leaved your JOB')
  } else if (work == true) {
    message.channel.send(`You are working in ${workingName}`)
  } else if (!args[0]) {
    message.channel.send({ embeds: [jobMenu] })
  } else if (jobName === 'miner') {
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id)
    }, 604800000)
    message.member.roles.add(minerRole)
    client.db.set(`working_${user.id}`, true)
    client.db.set(`miner_${user.id}`, true)
    message.channel.send('You are joined **MINER** ⛏')
  } else if (jobName === 'police') {
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id)
    }, 604800000)
    message.member.roles.add(policeRole)
    client.db.set(`working_${user.id}`, true)
    client.db.set(`police_${user.id}`, true)
    message.channel.send('You are joined **POLICE** 👮‍♂️')
  } else if (jobName === 'doctor') {
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id)
    }, 604800000)
    message.member.roles.add(doctorRole)
    client.db.set(`working_${user.id}`, true)
    client.db.set(`doctor_${user.id}`, true)
    message.channel.send('You are joined **DOCTOR** 👩‍⚕️')
  } else if (jobName === 'gang') {
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id)
    }, 604800000)
    message.member.roles.add(gangRole)
    client.db.set(`working_${user.id}`, true)
    client.db.set(`gang_${user.id}`, true)
    message.channel.send('You are joined **GANG** 👹')
  } else {
    message.channel.send(`${emoji.colorDiscord} i didnʼt find **${args[0]}** job. Please check and try again`).then(msg => {
      msg.edit({ embeds: [jobMenu] })
    })
  }
}

exports.help = {
  name: "Choose your Job",
  aliases: ["job"],
  usage: `job`
}