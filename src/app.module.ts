import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GqlAuthGuard } from './common/guards/gql-auth.guard';
import { TrimPipe } from './common/pipes/trim.pipe';
import { ConfigurationModule } from './config/configuration.module';
import { DBModule } from './config/db.module';
import { GraphQLConfigModule } from './config/graphql.module';
import { ApiModule } from './modules/api.module';

@Module({
  imports: [ConfigurationModule, DBModule, GraphQLConfigModule, ApiModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },

    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionsGuard,
    // },
    {
      provide: APP_PIPE,
      useClass: TrimPipe,
    },
  ],
})
export class AppModule {}
