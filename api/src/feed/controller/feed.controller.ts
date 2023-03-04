import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';
import { from, Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {
    feedPostRepository: any;
    constructor (private feedService: FeedService){}

    //create post
    @Post()
    create(@Body() feedPost: FeedPost): Observable<FeedPost>{
        return this.feedService.createPost(feedPost)
    }

    //get method
    @Get()
    findAll(): Observable<FeedPost[]> {
    return this.feedService.findAllPosts();
    }

    //update post
    @Put(':id')
    update(
        @Param('id') id: number,
         @Body() feedPost): Observable<UpdateResult>{
        return this.feedService.updatePost(id, feedPost)
    }

    //delete post
    @Delete(':id')
    delete( @Param('id') id: number): Observable<DeleteResult>{
        return this.feedService.deletePost(id);
    }
}
