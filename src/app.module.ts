import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { ConsultationModule } from './consultation/consultation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
      'mongodb+srv://abhiram:Abhi@1999@cluster0.fdoq5.mongodb.net/RebootBE?retryWrites=true&w=majority',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      synchronize: true,
      logging: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    UserModule,
    ConsultationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
