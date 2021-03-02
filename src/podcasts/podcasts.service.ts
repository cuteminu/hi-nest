import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
    private podcasts: Podcast[] = [];
    
    getAll(): Podcast[]{
        return this.podcasts;
    }

    create(podcastData) {
        this.podcasts.push({
            id: this.podcasts.length + 1,
            ...podcastData,
        });
    }

    getOne(podcastId): Podcast {
        const podcast = this.podcasts.find(podcast => podcast.id === +podcastId);
        if(!podcast) {
            throw new NotFoundException(`Podcast with ID ${podcastId} Not Found.`);
        }
        return podcast;
    }

    deleteOne(id) {
        this.getOne(id); // Checking Errors
        this.podcasts = this.podcasts.filter(podcast => podcast.id != parseInt(id));
        return true;
    }

    patch(id, updateData) {
        const podcast = this.getOne(id);
        this.deleteOne(id);
        this.podcasts.push({...podcast,...updateData});
    }

    getEpisodes(id): Episode[] {
        const podcast = this.getOne(id);
        return podcast.episodes;
    }

    createEpisode(id, newEpisode) {
        const episodes = this.getEpisodes(id);
        episodes.push({
            id: episodes.length + 1,
            ...newEpisode,
        });
    }

    deleteAnEpisode(id, epId){
        const podcast = this.getOne(id);
        podcast.episodes = podcast.episodes.filter(episode => episode.id !== +epId);
        return true;
    }

    patchEpisodes(id, epId, updateEpisode) {
        const podcast = this.getOne(id);
        const episode = podcast.episodes[parseInt(epId)-1];
        this.deleteAnEpisode(id, parseInt(epId));
        podcast.episodes.push({...episode,...updateEpisode});
    }
}
