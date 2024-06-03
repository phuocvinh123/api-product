import Product from '../models/ProductModel.js';

const createProduct = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdProduct = await Product.create(payload);
      if (createdProduct) {
        resolve({
          status: 'OK',
          message: 'Thêm mới sản phẩm thành công.',
          data: createdProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = (id, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newProduct = await Product.findByIdAndUpdate(id, payload, { new: true });
      if (newProduct) {
        resolve({
          status: 'OK',
          message: 'Cập nhật sản phẩm thành công.',
          data: newProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (deletedProduct) {
        resolve({
          status: 'OK',
          message: 'Xoá sản phẩm thành công.',
          data: deletedProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedProducts = await Product.deleteMany({ _id: ids });
      if (deletedProducts) {
        resolve({
          status: 'OK',
          message: 'Xoá sản phẩm thành công.',
          data: deletedProducts,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      if (product) {
        resolve({
          status: 'OK',
          message: 'Lấy chi tiết sản phẩm thành công.',
          data: product,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getProducts = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { page, limit, search, category } = params;
      const skip = (page - 1) * limit;
      let query;
      if (search && category) query = { title: { $regex: search, $options: 'i' }, category };
      else if (search) query = { title: { $regex: search, $options: 'i' } };
      else if (category) query = { category };
      const totalProducts = await Product.countDocuments(query);
      const products = await Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
      const totalPage = Math.ceil(totalProducts / limit);

      resolve({
        status: 'OK',
        message: 'Lấy danh sách sản phẩm.',
        data: products,
        pagination: {
          currentPage: page,
          totalProducts,
          totalPage,
          limit,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const ProductService = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
  deleteManyProduct,
};
export default ProductService;
