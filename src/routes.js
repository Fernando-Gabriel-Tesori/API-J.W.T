import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController'; // Corrigido para CategoryController

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// Abaixo dessa linha, todas as rotas usam authMiddleware
routes.post('/products', authMiddleware, upload.single('file'), ProductController.store);
routes.get('/products', authMiddleware, ProductController.index);

routes.post('/categories', authMiddleware, CategoryController.store); // Removido upload.single('file')
routes.get('/categories', authMiddleware, CategoryController.index);

export default routes;
