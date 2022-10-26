// // https://velog.io/@pk3669/typeorm-0.3.x-EntityRepository-%EB%8F%8C%EB%A0%A4%EC%A4%98

// import { DynamicModule, Provider } from '@nestjs/common';
// import { getDataSourceToken } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';
// import { TYPEORM_EX_CUSTOM_REPOSITORY } from './decorator/typeorm-ex.decorator';

// export class TypeOrmExModule {
//   public static forCustomRepository<T extends new (...args: any[]) => any>(
//     repositories: T[],
//   ): DynamicModule {
//     const providers: Provider[] = [];

//     for (const repository of repositories) {
//       // Reflect is intercepter
//       const entity = Reflect.getMetadata(
//         TYPEORM_EX_CUSTOM_REPOSITORY,
//         repository,
//       );

//       if (!entity) continue;

//       providers.push({
//         // getDataSourceToken()을 inject애서 DB데이터 연결을 얻는다.
//         inject: [getDataSourceToken()],
//         provide: repository,
//         useFactory: (dataSource: DataSource): typeof repository => {
//           const baseRepository = dataSource.getRepository<any>(entity);
//           return new repository(
//             baseRepository.target,
//             baseRepository.manager,
//             baseRepository.queryRunner,
//           );
//         },
//       });

//       return {
//         exports: providers,
//         module: TypeOrmExModule,
//         providers,
//       };
//     }
//   }
// }
