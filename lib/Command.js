/**
 * Creates a new command descriptor.
 * @param {string} description Description to be shown on discord.
 * @param {(interaction: Discord.CommandInteraction<Discord.CacheType>) => void} action 
 * Function that handles the command.
 * @param {Discord.Discord.ApplicationCommandOptionData[]} options
 * Additional options the command can accept.
 */
module.exports = function(description, action, options = undefined) {
  return {
    description, action, options
  }
}
