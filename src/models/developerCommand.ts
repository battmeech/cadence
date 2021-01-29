import { Cadence } from './client';
import { Command } from './command';

/**
 * Easy way to set up a command only to be run by Cadence developers
 */
export abstract class DeveloperCommand extends Command {
    cadence!: Cadence;
    roles = ['cadence developer'];
    hidden = true;
    checkAdmin = false;

    init(client: Cadence) {
        this.cadence = client;
    }
}
