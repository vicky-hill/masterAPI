"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateReqdoc = migrateReqdoc;
const reqdoc_db_config_1 = __importDefault(require("../../../config/reqdoc.db.config"));
function addUniqueRestraint(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addConstraint('posts', {
            fields: ['text'],
            type: 'unique',
            name: 'posts_text_unique'
        });
    });
}
function removeUniqueRestraint(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeConstraint('posts', 'posts_text_unique');
    });
}
function addForeignKey(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addConstraint('reqs', {
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
    });
}
function addForeignKeySameTable(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addConstraint('features', {
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
    });
}
function removeForeignKey(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeConstraint('posts', 'posts_userId_fk');
    });
}
const addOrUpdateForeignKey = (tableName_1, columnName_1, referencedTable_1, referencedColumn_1, ...args_1) => __awaiter(void 0, [tableName_1, columnName_1, referencedTable_1, referencedColumn_1, ...args_1], void 0, function* (tableName, columnName, referencedTable, referencedColumn, onDelete = 'CASCADE', onUpdate = 'CASCADE') {
    // return null;
    // Step 1: Find the current foreign key constraint name
    const [constraints] = yield reqdoc_db_config_1.default.query(`
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
        yield reqdoc_db_config_1.default.query(`
            ALTER TABLE ${tableName}
            ADD CONSTRAINT ${newConstraintName}
            FOREIGN KEY (${columnName}) REFERENCES ${referencedTable}(${referencedColumn})
            ON DELETE ${onDelete}
            ON UPDATE ${onUpdate}
        `);
        console.log(`Successfully created ${onDelete} constraint on ${tableName}.${columnName}`);
        return;
    }
    const constraintName = constraints[0].CONSTRAINT_NAME;
    console.log(`Found constraint: ${constraintName} on ${tableName}.${columnName}`);
    // Step 2: Drop the old constraint
    yield reqdoc_db_config_1.default.query(`
        ALTER TABLE ${tableName} 
        DROP FOREIGN KEY ${constraintName}
    `);
    // Step 3: Add new constraint with specified behavior
    yield reqdoc_db_config_1.default.query(`
        ALTER TABLE ${tableName}
        ADD CONSTRAINT ${constraintName}
        FOREIGN KEY (${columnName}) REFERENCES ${referencedTable}(${referencedColumn})
        ON DELETE ${onDelete}
        ON UPDATE ${onUpdate}
    `);
    console.log(`Successfully updated ${onDelete} constraint on ${tableName}.${columnName}`);
});
const addCascadeConstraint = () => __awaiter(void 0, void 0, void 0, function* () {
    yield addOrUpdateForeignKey('users', 'teamId', 'teams', 'userId', 'SET NULL', 'CASCADE');
});
function migrateReqdoc() {
    return __awaiter(this, void 0, void 0, function* () {
        return addForeignKey(reqdoc_db_config_1.default.getQueryInterface());
    });
}
