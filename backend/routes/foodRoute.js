// routes/foodRouter.js
import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import fileUpload from 'express-fileupload';

const foodRouter = express.Router();

foodRouter.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

foodRouter.post('/add', addFood);
foodRouter.get('/list', listFood);
foodRouter.delete('/remove/:id', removeFood);

export default foodRouter;
