const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot\'s latency'),
  async execute(interaction) {
    const pingEmbed = new EmbedBuilder()
      .setColor(0xFFFF00)
      .setTitle('Ping!')
      .setDescription('Pinging...')
      .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp()
    const sent = await interaction.reply({ embeds: [pingEmbed], fetchReply: true });
    const ping = sent.createdTimestamp - interaction.createdTimestamp;
    const resultEmbed = new EmbedBuilder()
      .setColor(0x0FFF50)
      .setTitle('🏓 Pong!')
      .setDescription(`Latency is \`${ping}\`ms.`)
      .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp()
    await interaction.editReply({ embeds: [resultEmbed] });
  },
};