import { QueryInterface, Sequelize } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'

async function addUniqueRestraint(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addConstraint('posts', {
    fields: ['text'],
    type: 'unique',
    name: 'posts_text_unique'
  });
}

async function removeUniqueRestraint(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeConstraint('posts', 'posts_text_unique');
}

async function addForeignKey(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addConstraint('reqs', {
    fields: ['projectId'],
    type: 'foreign key',
    name: 'reqs_projectId_fk',
    references: {
      table: 'projects',
      field: 'projectId'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}

async function addForeignKeySameTable(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addConstraint('features', {
    fields: ['parentId'],
    type: 'foreign key',
    name: 'features_parentId_fk',
    references: {
      table: 'features',
      field: 'featureId'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });
}


async function removeForeignKey(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeConstraint('posts', 'posts_userId_fk');
}

const addOrUpdateForeignKey = async (
    tableName: string,
    columnName: string,
    referencedTable: string,
    referencedColumn: string,
    onDelete: 'CASCADE' | 'SET NULL' | 'NO ACTION' | 'RESTRICT' = 'CASCADE',
    onUpdate: 'CASCADE' | 'SET NULL' | 'NO ACTION' | 'RESTRICT' = 'CASCADE'
) => {

    // return null;

    // Step 1: Find the current foreign key constraint name
    const [constraints] = await sequelize.query(`
        SELECT CONSTRAINT_NAME 
        FROM information_schema.KEY_COLUMN_USAGE 
        WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = '${tableName}' 
        AND COLUMN_NAME = '${columnName}'
        AND REFERENCED_TABLE_NAME = '${referencedTable}'
    `);

    const newConstraintName = `${tableName}_${columnName}_fk`;

    if (constraints.length === 0) {
        // No constraint exists, create a new one
        console.log(`No foreign key constraint found on ${tableName}.${columnName}, creating new one...`);
        await sequelize.query(`
            ALTER TABLE ${tableName}
            ADD CONSTRAINT ${newConstraintName}
            FOREIGN KEY (${columnName}) REFERENCES ${referencedTable}(${referencedColumn})
            ON DELETE ${onDelete}
            ON UPDATE ${onUpdate}
        `);
        console.log(`Successfully created ${onDelete} constraint on ${tableName}.${columnName}`);
        return;
    }

    const constraintName = (constraints[0] as any).CONSTRAINT_NAME;
    console.log(`Found constraint: ${constraintName} on ${tableName}.${columnName}`);

    // Step 2: Drop the old constraint
    await sequelize.query(`
        ALTER TABLE ${tableName} 
        DROP FOREIGN KEY ${constraintName}
    `);

    // Step 3: Add new constraint with specified behavior
    await sequelize.query(`
        ALTER TABLE ${tableName}
        ADD CONSTRAINT ${constraintName}
        FOREIGN KEY (${columnName}) REFERENCES ${referencedTable}(${referencedColumn})
        ON DELETE ${onDelete}
        ON UPDATE ${onUpdate}
    `);

    console.log(`Successfully updated ${onDelete} constraint on ${tableName}.${columnName}`);
}

const addCascadeConstraint = async () => {
    await addOrUpdateForeignKey('users', 'teamId', 'teams', 'userId', 'SET NULL', 'CASCADE');
}

export async function migrateReqdoc() {
    return addForeignKey(sequelize.getQueryInterface());
}