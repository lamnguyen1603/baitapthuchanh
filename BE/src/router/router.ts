import {Router} from "express";
import homeController from "../controller/HomeController";
export  const router = Router()
router.get('/products',homeController.getAll)
router.post('/products',homeController.create)
router.put('/products/:id',homeController.edit)
router.delete('/products/:id',homeController.move)
router.get('/products/:id',homeController.findByIdPr)
router.get('/categories',homeController.findCategory)