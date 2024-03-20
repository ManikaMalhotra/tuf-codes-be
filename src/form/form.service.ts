import { NextFunction, Request, RequestHandler, Response } from "express";
import Form from "./form.model";
import { FormSchema } from "./types/form";
import { validateSchema } from "../core/schema-validator";
import { client } from "../core/loaders/redis";

export const submitForm: RequestHandler = async (
	req: Request, 
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const validationResult = validateSchema(FormSchema, req.body);

		if (validationResult.isValid === false) {
			if (validationResult.isISE) {
				res.status(500).json({message: "Internal Server Error"});
				return;
			}

			res.status(400).json({message: validationResult.error});
			return;
		}

		const createdForm = await Form.create(req.body);
		res.status(200).json(createdForm);
	} catch (error) {
		next(error);
	}
} 

export const getForms: RequestHandler = async (
	req: Request, 
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const formCacheKey = 'formsData';
		const redisCache = await client.exists(formCacheKey);

		if (redisCache) {
			const forms = await client.get(formCacheKey);
			if(!forms) { 
				res.status(500).json({message: "Internal Server Error"});
				return;
			}
			
			res.status(200).json(JSON.parse(forms));
			return;
		} 

		const forms = await Form.findAll();
		client.set(formCacheKey, JSON.stringify(forms), { EX: 60 });
		res.status(200).json(forms);
	} catch (error) {
		next(error);
	}
}
