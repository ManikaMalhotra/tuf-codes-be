import { DataTypes, Schema } from "../../core/schema-validator";

export enum CodeLanguage {
	CPP = "C++",
	JAVA = "Java",
	JAVASCRIPT = "JavaScript",
	PYTHON = "Python"
}; 

export type FormType = {
	username: string;
	codeLanguage: CodeLanguage;
	standardInput: string;
	sourceCode: string;
}

export const FormSchema: Schema = {
	username: {
		type: DataTypes.STRING
	},
	codeLanguage: {
		type: DataTypes.ENUM,
		enum: Object.values(CodeLanguage)
	},
	standardInput: {
		type: DataTypes.STRING
	},
	sourceCode: {
		type: DataTypes.STRING
	}
};