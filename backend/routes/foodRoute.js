// routes/foodRouter.js
import express from 'express';
import { addFood, getFood, listFood, removeFood, updateFood } from '../controllers/foodController.js';
import fileUpload from 'express-fileupload';

const foodRouter = express.Router();

foodRouter.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

foodRouter.get('/get/:id', getFood);
foodRouter.post('/add', addFood);
foodRouter.put('/update/:id', updateFood);
foodRouter.get('/list', listFood);
foodRouter.delete('/delete/:id', removeFood);

export default foodRouter;
