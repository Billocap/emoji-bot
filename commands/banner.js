const Command = require("../lib/Command")
const asciiBanner = require("../utils/asciiBanner")

module.exports = Command(
  "Prints an ASCII Banner on the server.",
  function(interaction) {
    const font = interaction.options.getString("font")
    const text = interaction.options.getString("text")

    interaction.reply({
      embeds: [
        {
          description: asciiBanner(text, font),
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
      description: "The text to print.",
      required: true
    },
    {
      type: "STRING",
      name: "font",
      description: "The figlet font to use."
    }
  ]
)
