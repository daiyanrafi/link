import { Body, Controller, Get, Post, Request, Put } from '@nestjs/common';
import { Delete, Param, Query, UseGuards } from '@nestjs/common/decorators';
import { from, Observable, skip } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';  
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {
    feedPostRepository: any;
    constructor (private feedService: FeedService){}

    //create post
    @UseGuards(JwtGuard)
    @Post()
    create(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost>{
        return this.feedService.createPost(req.user, feedPost)
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
