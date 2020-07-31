import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCustomers1596148857299
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // criando uma tabela com o nome consumers
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        // colunas
        columns: [
          // campo id
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          // campo nome
          {
            name: 'name',
            type: 'varchar',
          },
          // campo email
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          // campo de quando for criado uma informação
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          // campo de quando a informação for alterada
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // caso tudo de errado, exclua a tabela
    await queryRunner.dropTable('customers');
  }
}
