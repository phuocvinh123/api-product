import ProductService from '../services/ProductService.js'
import variable from '../variable.js'

const createProduct = async (req, res) => {
  try {
    const { imageUrl, title, description } = req.body

    if (!imageUrl || !title || !description)
      return res.status(400).json(variable.NOT_EMPTY)

    const response = await ProductService.createProduct(req.body)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json(variable.HAS_ERROR)
  }
}

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    const { imageUrl, title, description } = req.body

    if (!imageUrl || !title || !description)
      return res.status(200).json(variable.NOT_EMPTY)

    const response = await ProductService.updateProduct(id, req.body)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json(variable.HAS_ERROR)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id
    const response = await ProductService.deleteProduct(id)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json(variable.HAS_ERROR)
  }
}

const getProduct = async (req, res) => {
  try {
    const id = req.params.id
    const response = await ProductService.getProduct(id)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json(variable.HAS_ERROR)
  }
}

const getProducts = async (req, res) => {
  try {
    let { page, limit, search, category } = req.query
    page = Number(page || 1)
    limit = Number(limit || 12)
    const params = { page, limit, search, category }
    const response = await ProductService.getProducts(params)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json(variable.HAS_ERROR)
  }
}

const deleteManyProduct = async (req, res) => {
  try {
    const { ids } = req.body
    const response = await ProductService.deleteManyProduct(ids)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json(variable.HAS_ERROR)
  }
}

const ProductController = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
  deleteManyProduct,
}
export default ProductController
