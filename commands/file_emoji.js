const { ref, getStorage, getDownloadURL } = require("firebase/storage")

const Command = require("../lib/Command")
const firebaseApp = require("../services/firebaseApp")

const storage = getStorage(firebaseApp)

module.exports = Command(
  "Sends a gif emoji.",
  async function(interaction) {
    const fileName = interaction.options.getString("name") || "verymad"
    const fileExt = interaction.options.getString("type") || "gif"

    const fileRef = ref(storage, `${fileName}.${fileExt}`)
    const fileUrl = await getDownloadURL(fileRef)

    interaction.reply(fileUrl)
  },
  [
    {
      type: "STRING",
      name: "type",
      description: "The file type.",
      required: true,
      choices: [
        {
          name: "png",
          value: "png"
        },
        {
          name: "gif",
          value: "gif"
        },
        {
          name: "jpg",
          value: "jpg"
        }
      ]
    },
    {
      type: "STRING",
      name: "name",
      description: "Name of the gif to send.",
      required: true
    }
  ]
)
