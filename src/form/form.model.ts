import { sequelize } from "../core/loaders/database";
import { DataTypes, Model } from "sequelize";
import { CodeLanguage } from "./types/form";

export class Form extends Model {
	public id!: number;
	public username!: string;
	public codeLanguage!: CodeLanguage;
	public standardInput!: string;
	public sourceCode!: string;
	public createdAt!: Date;
	public deletedAt!: Date;
}

Form.init({
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	codeLanguage: {
		type: DataTypes.ENUM(...Object.values(CodeLanguage)),
		allowNull: false
	},
	standardInput: {
		type: DataTypes.STRING,
		allowNull: false
	},
	sourceCode: {
		type: DataTypes.TEXT,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'form',
	timestamps: true,
	paranoid: true,
	updatedAt: false
});

export default Form;