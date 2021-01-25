import { Message } from 'discord.js'

interface ICommand {
    name: string
    description?: string
}

/**
 * Represents a basic command. Plans to add future functionality
 * here e.g. roles required to perform a command
 * */
export abstract class Command implements ICommand {
    name: string
    description?: string

    constructor(command: ICommand) {
        this.name = command.name
        this.description = command.description
    }

    abstract run(message: Message, args?: string[]): void
}
