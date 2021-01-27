import { Collection, Message } from 'discord.js';
import { Cadence } from './client';
import { Command } from './command';

export abstract class MusicCommand extends Command {
    musicSettings: Cadence['musicSettings'] = new Collection();

    init(client: Cadence) {
        // Create a reference to the client music settings
        this.musicSettings = client.musicSettings;
    }
}
