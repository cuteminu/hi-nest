import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {

    constructor(private readonly podcastsService: PodcastsService) {}

    @Get()
    getAll(): Podcast[]{
        return this.podcastsService.getAll();
    }

    @Post()
    create(@Body() podcastData){
        return this.podcastsService.create(podcastData);
    }

    @Get(":id")
    getOne(@Param("id") podcastId: string): Podcast{
        return this.podcastsService.getOne(podcastId);
    }

    @Patch(":id")
    patch(@Param("id") podcastId: string, @Body() updateData){
        return this.podcastsService.patch(podcastId, updateData);
    }

    @Delete(":id")
    deleteOne(@Param("id") podcastId: string){
        return this.podcastsService.deleteOne(podcastId);
    }

    @Get(":id/episodes")
    getEpisodes(@Param("id") podcastId: string): Episode[]{
        return this.podcastsService.getEpisodes(podcastId);
    }

    @Post(":id/episodes")
    createEpisode(@Param("id") podcastId: string, @Body() newEpisode){
        return this.podcastsService.createEpisode(podcastId, newEpisode);
    }

    @Patch(":id/episodes/:episodeId")
    
    patchEpisodes(@Param("id") podcastId: string, @Param("episodeId") episodeId: string, @Body() updateEpisode) {
        return this.podcastsService.patchEpisodes(podcastId, episodeId, updateEpisode);
    }

    @Delete(":id/episodes/:episodeId")
    deleteAnEpisone(@Param("id") podcastId: string, @Param("episodeId") epId: string) {
        return this.podcastsService.deleteAnEpisode(podcastId, epId);
    }
}
