import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Delete, Param, Query } from '@nestjs/common/decorators';
import { from, Observable, skip } from 'rxjs';
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

    // //get method
    // @Get()
    // findAll(): Observable<FeedPost[]> {
    // return this.feedService.findAllPosts();
    // }


    //get all method by pagination
    @Get()
    findSelected(
      @Query('take') take: number = 1,
      @Query('skip') skip: number = 1,
    ): Observable<FeedPost[]> {
        take = take > 20 ? 20 : take;
      return this.feedService.findPosts(take, skip);
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
