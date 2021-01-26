import { MessageEmbed, User } from 'discord.js';
import ytdl from 'ytdl-core';

export class Song {
    title: string;
    url: string;
    description: string;
    lengthInSeconds: string;
    thumbnailUrl: string;
    positionInQueue: number;
    requestingUser: User;

    constructor(
        videoInfo: ytdl.videoInfo,
        positionInQueue: number,
        requestingUser: User
    ) {
        this.title = videoInfo.videoDetails.title;
        this.url = videoInfo.videoDetails.video_url;
        this.description = videoInfo.videoDetails.description ?? '';
        this.lengthInSeconds = videoInfo.videoDetails.lengthSeconds;
        this.thumbnailUrl = videoInfo.videoDetails.thumbnails[0]?.url;
        this.positionInQueue = positionInQueue;
        this.requestingUser = requestingUser;
    }

    createEmbed(): MessageEmbed {
        const embed = new MessageEmbed();

        embed.setTitle(this.title);
        embed.setURL(this.url);
        embed.setFooter(
            `Requested by ${this.requestingUser.username}`,
            this.requestingUser.avatarURL() || undefined
        );
        embed.setDescription(`Position in queue: ${this.positionInQueue}`);
        if (this.thumbnailUrl) embed.setThumbnail(this.thumbnailUrl);
        return embed;
    }
}
