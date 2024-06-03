import UserRouter from './UserRouter.js';
import ProductRouter from './ProductRouter.js';

const routes = (app) => {
  app.use('/api/user', UserRouter);
  app.use('/api/product', ProductRouter);

  app.get('/', (req, res) => {
    res.json({ name: 'Hi LofA' });
  });
};

export default routes;
