/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { UserEntity } from '../controllers/models/user.entity';
import { User } from '../controllers/models/user.interface';
import { JwtService } from '@nestjs/jwt';
import { ok } from 'assert';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerAccount(user: User): Observable<User> {
    const { firstName, lastName, email, password } = user;

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({
            firstName,
            lastName,
            email,
            password: hashedPassword,
          }),
        ).pipe(
          map((user: User) => {
            delete user.password;
            return user;
          }),
        );
      }),
    );
  }

  //for validationg user

  validateUser(email: string, password: string): Observable<User> {
     //return from(this.userRepository.findOne.bind(this.userRepository)({ email: email }, { select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'] })).pipe(
      return from (this.userRepository.findOne({
        where: {
            email: email,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            role: true,
        },
    })).pipe(
      switchMap((user: User) =>
        from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        ),
      ),
    );
  }

  //user object for login

  login(user: User): Observable<string> {
    console.log('ooooooooooooooooook')
    const { email, password } = user;
    console.log('ooooooooooooooooook')
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          //create jwt token creditantials
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }
}
