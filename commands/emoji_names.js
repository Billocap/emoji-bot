const AsciiEmojiParser = require("ascii-emoji-parser")

const Command = require("../lib/Command")

module.exports = Command(
  "Prints all the emojis available to the command `/ascii_emoji`",
  function(interaction) {
    const emojiNames = AsciiEmojiParser
      .getKeywords()
      .sort()
      .map(emoji => `_${emoji}_`)
      .join(", ")
    
    interaction.reply({
      embeds: [
        {
          title: "Emoji Names",
          description: emojiNames
        }
      ]
    })
  }
)
