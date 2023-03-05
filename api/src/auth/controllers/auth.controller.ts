import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from './models/user.interface';

@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService){}

    @Post('register')
    register(@Body() user: User): Observable<User>{
        return this.authService.registerAccount(user);
    }

}
