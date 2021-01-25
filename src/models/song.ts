import { MessageEmbed, User } from 'discord.js'

export class Song {
    title: string
    url: string
    description: string
    lengthInSeconds: string
    thumbnailUrl: string
    positionInQueue: number
    requestingUser: User

    constructor(
        title: string,
        url: string,
        description: string,
        lengthInSeconds: string,
        thumbnailUrl: string,
        positionInQueue: number,
        requestingUser: User
    ) {
        this.title = title
        this.url = url
        this.description = description
        this.lengthInSeconds = lengthInSeconds
        this.thumbnailUrl = thumbnailUrl
        this.positionInQueue = positionInQueue
        this.requestingUser = requestingUser
    }

    createEmbed(): MessageEmbed {
        const embed = new MessageEmbed()

        embed.setTitle(this.title)
        embed.setURL(this.url)
        embed.setFooter(
            `Requested by ${this.requestingUser.username}`,
            this.requestingUser.avatarURL() || undefined
        )
        embed.setDescription(`Position in queue: ${this.positionInQueue}`)
        if (this.thumbnailUrl) embed.setThumbnail(this.thumbnailUrl)
        return embed
    }
}
