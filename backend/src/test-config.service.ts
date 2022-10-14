import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class testConfigService {
  constructor(private configService: ConfigService) {}

  // if PORT is not number, ConfigService returns undefined
  // but, if generic's second argument set up true, you can get rid of undefined
  // constructor(private configService: ConfigService<{ PORT: number }, true>) {}

  testEnv() {
    // get an environment variable
    const dbUser = this.configService.get<string>('DB_USER');
    // get a custom configuration value
    // my custom configuration(testConfig) has database.host
    // get() method second argument is default value
    // when database.host doesn't exist, use 'localhost'
    const dbHost = this.configService.get<string>(
      'database.host',
      'localhost',
    );

    // get a custom configuration object
    interface DBConfig {
      host: string;
      port: number;
    }

    // when infer is true, you can infer property type through DBConfig interface
    const dbConfig = this.configService.get<DBConfig>('database', {
      infer: true,
    });
    if (typeof dbConfig.host === 'string')
      console.log('DBHOST is string');

    // this has error because DBConfig interface has no 'url' property
    const dbUrl = this.configService.get<DBConfig>('url');
  }
}
