import { MusicCommand } from './musicCommand';
import { djRole } from '../config.json';

/** Quick way to create a command to only be run by DJs */
export abstract class DJCommand extends MusicCommand {
    roles = [djRole];
}
