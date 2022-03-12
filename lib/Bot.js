const Discord = require("discord.js")
const fs = require("fs")
const path = require("path")

const logger = require("../services/logger")

module.exports = class {
  Commands = new Map()

  /**
   * Creates a new Discord bot.
   * @param {string} token Token for the bot.
   * @param {Discord.ClientOptions} options Options for creating the Discord Client.
   */
  constructor(token, options = {}) {
    /**
     * Wrapped Discord Client.
     * @type {Discord.Client<boolean>}
     */
    this.Client = new Discord.Client(options)

    this.Client.login(token)

    // #region Auto loading for slash commands.
    const commandFiles = fs.readdirSync(path.resolve("commands"))
    /**
     * @type {Discord.ApplicationCommandDataResolvable[]}
     */
    const slashCommands = []
    const helpCommand = []

    for (const fileName of commandFiles) {
      const command = require(path.resolve("commands", fileName))

      const commandName = fileName.slice(0, -3)

      slashCommands.push({
        name: commandName,
        description: command.description,
        options: command.options
      })

      helpCommand.push(`\`/${commandName}\` ${command.description}`)

      this.Commands.set(commandName, command.action)
    }

    this.Commands.set("help", function(interaction) {
      interaction.reply({
        embeds: [
          {
            title: "Commands",
            description: helpCommand.join("\n"),
          }
        ]
      })
    })

    this.Client.on("ready", _ => {
      this.Client.application.commands.set(slashCommands).then(_ => {
        logger.info("Slash commands configured.")
      })
    })

    this.Client.on("interactionCreate", interaction => {
      if (interaction.isCommand()) {
        const command = this.Commands.get(interaction.commandName)
    
        if (command) {
          command(interaction)
        } else {
          interaction.reply("Command not implemented.")
        }
      }
    })
    // #endregion Auto loading for slash commands.
  }

  /**
   * @template {keyof Discord.ClientEvents} K
   */
  /**
   * Adds the `listener` function to the end of the listeners array for the event
   * named `eventName`. No checks are made to see if the `listener` has already
   * been added. Multiple calls passing the same combination of `eventName` and
   * `listener` will result in the `listener` being added, 
   * and called, multiple times.
   * 
   * ```js
   * server.on('connection', (stream) => {
   *    console.log('someone connected!');
   * });
   * ```
   * 
   * Returns a reference to the `EventEmitter`, so that calls can be chained.
   * 
   * By default, event listeners are invoked in the order they are added. 
   * The `emitter.prependListener()` method can be used as an alternative to 
   * add the event listener to the beginning of the listeners array.
   * 
   * @param {K} event Event name.
   * @param {(...args: Discord.ClientEvents[K]) => any} listener Event listener.
   */
  on(event, listener) {
    return this.Client.on(event, listener)
  }
}
