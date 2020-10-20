import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1603205589721 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "user",
        columns: [
            {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: "name",
                type: "varchar",
            },
            {
                name: "age",
                type: "int",
            }
        ]
    }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropDatabase('typeorm', true)
    }

}
