import { Injectable } from '@nestjs/common';

//decorator that marks a class as available to be injected as a dependency
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

//our root app component