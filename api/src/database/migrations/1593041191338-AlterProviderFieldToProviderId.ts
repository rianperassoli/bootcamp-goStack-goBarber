import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export default class AlterProviderFieldToProviderId1593041191338 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider')
    await queryRunner.addColumn('appointments', new TableColumn({
      name: "provider_id",
      type: "uuid",
      isNullable: true,
    }))

    await queryRunner.createForeignKey("appointments", new TableForeignKey({
      name: 'AppointmentProvider_FK',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider_FK')
    await queryRunner.dropColumn('appointments', 'provider_id')

    await queryRunner.addColumn('appointments', new TableColumn({
      name: "provider",
      type: "varchar",
    }))
  }

}
