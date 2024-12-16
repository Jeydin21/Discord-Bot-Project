const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Lists all available commands'),
  async execute(interaction) {
    const commandsPath = path.join(__dirname, '..');
    const utility = [];

    function readCommands(dir) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          readCommands(filePath);
        } else if (file.endsWith('.js')) {
          const command = require(filePath);
          if (command.data && command.data.name) {
            if (filePath.includes('utility')) utility.push(`\`${command.data.name}\``);
          }
        }
      }
    }

    readCommands(commandsPath);

    const helpEmbed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('Bot Project Commands List')
      .addFields({ name: ':tools: Utility', value: utility.join(', ') })
      .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [helpEmbed] });
  },
};