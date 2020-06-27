import { MessageEmbed, User } from 'discord.js';
import DiscordClient from './DiscordClient';

export default function makeScoreboard(
  client: DiscordClient,
  data: {
    player1: User,
    player2: User,
    hasPlayer2Played: boolean,
    player1Score: number,
    player2Score?: number
  }
) {
  const scoreboard = new MessageEmbed()
    .setAuthor('Hand Cricketer', client.user.avatarURL())
    .setTitle('Scoreboard')
    .setTimestamp()
    .setFooter('Stats generated by Hand Cricketer', client.user.avatarURL())
    .addField(`Opener`, `<@${data.player1.id}>`, true)
    .addField(`Chaser`, `<@${data.player2.id}>`, true)
    .setDescription(!data.hasPlayer2Played ? `Mid Innings Score` : `Match End Score`)

  if (data.hasPlayer2Played) {
    if (data.player1Score > data.player2Score) scoreboard.addField('Result', `<@${data.player1.id}> won! :trophy:`);
    else if (data.player1Score < data.player2Score) scoreboard.addField('Result', `<@${data.player2.id}> won! :trophy:`);
    else scoreboard.addField('Result', 'It was a tie :(');
  }

  scoreboard.addField(`Opener's score`, data.player1Score, true);
  if (data.hasPlayer2Played) scoreboard.addField(`Chaser's score`, data.player2Score, true);

  return scoreboard;
}