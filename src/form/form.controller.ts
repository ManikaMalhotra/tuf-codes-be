import { Router } from "express";
import { getForms, submitForm } from "./form.service";

const router:Router = Router();

router.route('/forms')
	.get(getForms);

router.route('/form/submit')
	.post(submitForm);

export default router;