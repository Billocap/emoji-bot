const AsciiEmojiParser = require("ascii-emoji-parser")

const Command = require("../lib/Command")

const emojiParser = new AsciiEmojiParser('%')

module.exports = Command(
  "Parse ascii emojis on the message. Type `%emoji_name%` to send an emoji.",
  function(interaction) {
    const text = interaction.options.getString("text")

    interaction.reply({
      embeds: [
        {
          description: emojiParser.parse(text),
          author: {
            name: interaction.user.username,
            icon_url: interaction.user.avatarURL()
          }
        }
      ]
    })
  },
  [
    {
      type: "STRING",
      name: "text",
      description: "The text to parse.",
      required: true
    }
  ]
)
