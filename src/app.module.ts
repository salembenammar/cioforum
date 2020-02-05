import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CommunModule } from './commun/commun.module';
import { FocusModule } from './focus/focus.module';
import { FeedsModule } from './feeds/feeds.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TasksModule,
    UsersModule,
    CommunModule,
    FocusModule,
    FeedsModule,
  ],
})
export class AppModule {}
