import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  //create post
  createPost(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feedPostRepository.save(feedPost));
  }

  //find all post
  findAllPosts(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  //find selected post by pagination
  findPosts(take: number = 10, skip: number = 0): Observable<FeedPost[]> {
    return from(
      this.feedPostRepository.findAndCount({ take, skip }).then(([posts]) => {
        return <FeedPost[]>posts;
      }),
    );
  }

  //update post
  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  //delete post
  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }
}
