import { Message, PermissionString } from 'discord.js';

interface ICommand {
    name: string;
    description?: string;
    permissions?: PermissionString[];
    roles?: string[];
}

/**
 * Represents a basic command. Plans to add future functionality
 * here e.g. roles required to perform a command
 * */
export abstract class Command implements ICommand {
    name: string;
    description?: string;
    permissions?: PermissionString[];
    roles?: string[];

    constructor(command: ICommand) {
        this.name = command.name;
        this.description = command.description;
        this.permissions = command.permissions;
        this.roles = command.roles;
    }

    abstract run(message: Message, args?: string[]): void;
}
