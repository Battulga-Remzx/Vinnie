const { MessageEmbed } = require("discord.js");

exports.execute = (client, message, args) => {

  function setCd() {
    client.db.set(`pingCd_${user.id}`, 5);
  }
  const user = message.author;
  const yourping = new Date().getTime() - message.createdTimestamp
  const botping = Math.round(client.ws.ping)
  const embed = new MessageEmbed()
    .setTitle(' **Pong** ')
    .setColor('WHITE')
    .setTimestamp()
    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
    .setDescription(` Your Ping: ${yourping}ms
====================
Bot Ping: ${botping}ms`)

  let cooldown = client.db.fetch(`pingCd_${user.id}`);
  let cd = false;

  if(cooldown > 0) {
    cd = true;
    message.channel.send({content: `Please wait for ${cooldown} seconds.`})
  } else {
    message.channel.send({embeds: [embed]});
    setCd();
  }
  setInterval(down, 1000);
  function down() {
      client.db.subtract(`pingCd_${user.id}`, 1);
    }
}

exports.help = {
  name: "===============\n🤖 BOT INFORMATION\n\nCheck Latency",
  aliases: ["pong", "ping"],
  usage: `ping`
}