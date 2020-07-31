import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProducts1596145689064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // criando uma tabela com o nome consumers
    await queryRunner.createTable(
      new Table({
        name: 'products',
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
          // campo price
          {
            name: 'price',
            type: 'numeric',
            precision: 10,
            scale: 2,
          },
          // campo quantity
          {
            name: 'quantity',
            type: 'integer',
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
    await queryRunner.dropTable('products');
  }
}
