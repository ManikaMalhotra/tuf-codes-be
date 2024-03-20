export enum DataTypes {
	STRING = "STRING",
	ENUM = "ENUM"
};

export type Schema = {
	[key: string]: {
		type: DataTypes.STRING;
	} | {
		type: DataTypes.ENUM;
		enum: string[];
	}
};

export function validateSchema(schema: Schema, data: any): { 
	isValid: true 
} | {
	isValid: false,
	error: string,
	isISE?: boolean
} {
	if (!schema) {
		return { isValid: false, error: "Schema must be a JSON", isISE: true };
	}

	if (!data) {
		return { isValid: false, error: "Data must be a JSON" };
	}

	for (const key in schema) {
		if (schema[key].type === DataTypes.STRING) {
			if (typeof data[key] !== "string") {
				return { isValid: false, error: `${key} must be a string` };
			}
		} else if (schema[key].type === DataTypes.ENUM) {
			const enumSchema = schema[key] as { type: DataTypes.ENUM; enum: string[] }; // Type assertion
			if (!enumSchema.enum.includes(data[key])) {
				return { isValid: false, error: `${key} must be one of ${enumSchema.enum.join(", ")}` };
			}
		}
	}

	return { isValid: true };
}