const figlet = require("figlet")

/**
 * Converts a string of text to an ASCII banner that
 * will appear colored on Discord.
 * 
 * The color will always be red.
 * 
 * @param {string} text String to convert.
 * @param {figlet.Fonts} font Name of the font to use.
 * @returns {string} The converted banner.
 */
module.exports = function(text, font = "Poison") {
	const banner = figlet.textSync(text, {font})
	
	return `\`\`\`\n${banner}\`\`\``
}
