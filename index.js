console.clear();

const { Client, Intents, Collection } = require("discord.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES
  ],
  partials: ["CHANNEL"]
});

const db = require('quick.db');
client.qdb = db;

// quick.eco болон бусад файл
const Eco = require("./lib/ecoCompat");
client.eco = new Eco.Manager();
client.db = Eco.db;

client.config = require("./botConfig");
client.shop = require("./items/shop");
client.sellprice = require("./items/sellPrice");
client.buyprice = require("./items/buyPrice");
client.emoji = require("./emoji");
client.image = require("./files/images");

// Комманд цуглуулгууд
client.commands = new Collection();
client.aliases = new Collection();

const fs = require("fs");

// Events
fs.readdir("./events/", (err, files) => {
  if (err) return console.log(err);

  files.forEach((file) => {
    if (!file.endsWith(".js")) return;

    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];

    client.on(eventName, event.bind(null, client));
  });
});

// Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err);

  files.forEach((file) => {
    if (!file.endsWith(".js")) return;

    const cmd = require(`./commands/${file}`);

    client.commands.set(cmd.help.name, cmd);

    cmd.help.aliases.forEach((alias) => {
      client.aliases.set(alias, cmd.help.name);
    });
  });
});

// Simple messageCreate demo
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "hi") {
    return message.channel.send("hello");
  }
});

client.login(client.config.token);

// Optional server
const { startServer } = require("./server");
startServer();
