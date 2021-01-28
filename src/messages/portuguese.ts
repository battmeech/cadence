import { Messages } from '../models/messages';
import { prefix } from '../config.json';

const portuguese: Messages = {
    BOT_ACTIVITY: 'música doce',

    ADD_COMMAND_NAME: 'adicionar',
    ADD_COMMAND_HELPFUL_DESCRIPTION:
        'Adicionar uma faixa à lista de reprodução',
    ADD_COMMAND_NO_YOUTUBE_LINK:
        '🎶 Dê-me um link do YouTube e irei adicioná-lo à fila',

    HELP_COMMAND_NAME: 'ajuda',
    HELP_COMMAND_HELPFUL_DESCRIPTION: 'Retorna esta mensagem útil!',
    HELP_COMMAND_EMBED_TITLE: '🎵 Comandos disponíveis 🎵',
    HELP_COMMAND_EMBED_DESCRIPTION:
        'Cadence está aqui para todas as suas necessidades musicais. Aqui estão as funções que posso desempenhar.',
    HELP_COMMAND_PRIVATE_EMBED_TITLE: 'Comandos secretos',
    HELP_COMMAND_PRIVATE_EMBED_DESCRIPTION:
        'Você está recebendo esta mensagem porque tem permissão para comandos ocultos.',

    JOIN_COMMAND_NAME: 'juntar',
    JOIN_COMMAND_HELPFUL_DESCRIPTION:
        'Junte-se ao canal de voz em que o solicitante está atualmente.',
    JOIN_COMMAND_NO_VOICE_CHANNEL:
        '⚠️ Junte-se a um canal de voz para que eu possa me juntar a você.',

    LEAVE_COMMAND_NAME: 'sair',
    LEAVE_COMMAND_HELPFUL_DESCRIPTION:
        'Saia do canal de voz em que o bot está.',
    LEAVE_COMMAND_NO_VOICE_CHANNEL: `⚠️ Não estou em um canal de voz, use \`${prefix}juntar\` enquanto em um canal de voz e eu vou me juntar a você.`,

    LOOP_COMMAND_NAME: 'ciclo',
    LOOP_COMMAND_HELPFUL_DESCRIPTION: 'Alterne as configurações de ciclo.',

    PAUSE_COMMAND_NAME: 'pausa',
    PAUSE_COMMAND_HELPFUL_DESCRIPTION:
        'Pause qualquer música atualmente em reprodução.',
    PAUSE_COMMAND_NOT_PLAYING: `⚠️ 
    Não estou jogando nada, tenta \`${prefix}tocar\``,

    PING_COMMAND_NAME: 'ping',
    PING_COMMAND_HELPFUL_DESCRIPTION:
        'Calcula a latência entre discórdia e bot.',
    PING_COMMAND_INITIAL_MESSAGE: 'Ping?',
    PING_COMMAND_EDITED_MESSAGE: (latency: string) =>
        `Pong! Latência é ${latency}ms.`,

    PLAY_COMMAND_NAME: 'tocar',
    PLAY_COMMAND_HELPFUL_DESCRIPTION: 'Toque a música na lista de reprodução.',

    PLAYING_COMMAND_NAME: 'ouvindo',
    PLAYING_COMMAND_HELPFUL_DESCRIPTION:
        'Mostra qual música está tocando no momento.',
    PLAYING_COMMAND_UNRECOGNISED_SONG:
        'Estou tocando uma música que não está mais na fila!',
    PLAYING_COMMAND_NOT_PLAYING: `⚠️ 
    Não estou jogando nada, tenta \`${prefix}tocar\``,

    PLAYLIST_COMMAND_NAME: 'lista',
    PLAYLIST_COMMAND_HELPFUL_DESCRIPTION: 'Veja a lista de reprodução atual.',

    REMOVE_COMMAND_NAME: 'retirar',
    REMOVE_COMMAND_HELPFUL_DESCRIPTION:
        'Remova uma música da lista de reprodução.',
    REMOVE_COMMAND_NON_NUMERICAL_VALUE: `⚠️ Você deve fornecer um valor numérico para remover, veja \`${prefix}lista\` para descobrir onde está a música.`,
    REMOVE_COMMAND_UNRECOGNISED_SONG:
        '⚠️ Eu não tenho uma música nesse número.',

    RESET_COMMAND_NAME: 'redefinir',
    RESET_COMMAND_HELPFUL_DESCRIPTION:
        'Redefina todas as configurações de música.',

    SKIP_COMMAND_NAME: 'pular',
    SKIP_COMMAND_HELPFUL_DESCRIPTION:
        'Pule para uma música específica ou pule apenas uma!',
    SKIP_COMMAND_NON_NUMERICAL_VALUE: `⚠️ Você deve fornecer um valor numérico para pular, veja \`${prefix}lista\` para descobrir onde está a música.`,
    SKIP_COMMAND_UNRECOGNISED_SONG: '⚠️ Eu não tenho uma música nesse número.',

    VOLUME_COMMAND_NAME: 'volume',
    VOLUME_COMMAND_HELPFUL_DESCRIPTION:
        'Ajuste o volume da música, pode ser definido entre 1 e 10.',
    VOLUME_COMMAND_INVALID_INPUT:
        '⚠️ Por favor, dê um valor para o seu volume entre 1 e 10.',
    VOLUME_COMMAND_RESPONSE_MESSAGE: (volume: string) =>
        `🎶 O volume está definido para ${volume}`,

    ERROR_WHEN_FETCHING_VIDEO_INFO: '❌ Algo deu errado ao buscar sua música.',
    ERROR_WHEN_JOINING_VOICE_CHANNEL:
        '❌ Tive problemas para entrar nesse canal.',
    NO_MUSIC_MESSAGE: `🎶 Nenhuma música na fila ainda, tente o \`${prefix}adicionar\` comando.`,

    PLAYLIST_EMBED_HEADER: 'Lista de reprodução',
    PLAYLIST_EMBED_DESCRIPTION:
        'Bem-vindo ao melhor evento musical do Discord, aqui está a set list:',
    PLAYLIST_EMBED_FOOTER: `Usar ${prefix}ajuda descobrir mais.`,
    PLAYLIST_EMBED_LOOPING: 'Looping',
    PLAYLIST_EMBED_LOOPING_OFF: 'Fora',
    PLAYLIST_EMBED_LOOPING_ON: 'Em',
    PLAYLIST_EMBED_NOT_CONNECTED: 'Não conectado',
    PLAYLIST_EMBED_NOW_PLAYING: 'Agora jogando',
    PLAYLIST_EMBED_ON_DECK: 'No convés',
    PLAYLIST_EMBED_REQUESTED_BY: 'Requerido por',
    PLAYLIST_EMBED_SETTINGS: 'Configurações',
    PLAYLIST_EMBED_VOICE_CHANNEL: 'Canal de voz',
    PLAYLIST_EMBED_VOLUME: 'Volume',
};

export default portuguese;
