require("dotenv").config()

const process = require("process")

const logger = require("./services/logger")
const Bot = require("./lib/Bot")

const bot = new Bot(process.env.BOT_TOKEN, {
  intents: [
    'GUILDS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGES',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_MEMBERS',
    'GUILD_PRESENCES'
  ]
})

bot.on("ready", () => logger.info("Bot online."))
