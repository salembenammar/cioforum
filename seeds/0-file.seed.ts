import {Connection, ObjectType} from 'typeorm';
import {Seeder} from 'typeorm-seeding';
import {EntityFactory} from 'typeorm-seeding/dist/entity-factory';
import {File} from '../src/commun/entities/file.entity';

export default class CreateFiles implements Seeder {
    run(factory: <Entity, Settings>(entity: ObjectType<Entity>) => (settings?: Settings) => EntityFactory<Entity, Settings>,
        connection: Connection): Promise<any> {
        return connection.createQueryBuilder()
            .insert()
            .into(File)
            .values([{
                name: '2f838e109dce662ad59435a6911506b7',
                path: '/home/uploads/2f838e109dce662ad59435a6911506b7',
                originalFileName: 'Profile_avatar_placeholder_large.png',
                id: 0,
            }, {
                name: '4f40d10d85ab177d91963736325c98c2',
                path: '/home/uploads/4f40d10d85ab177d91963736325c98c2',
                originalFileName: 'logo-placeholder-png-2.png',
                id: 1,
            }])
            .execute();
    }
}
