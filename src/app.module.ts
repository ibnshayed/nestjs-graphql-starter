import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { DBModule } from './config/db.module';
import { GraphQLConfigModule } from './config/graphql.module';
import { ApiModule } from './modules/api.module';

@Module({
  imports: [ConfigurationModule, DBModule, GraphQLConfigModule, ApiModule],
})
export class AppModule {}
