import express, { Request, Response } from 'express'
import { ProductModel } from '../models/productModel'
import { sampleProducts } from '../data'
import expressAsyncHandler from 'express-async-handler'

export const seedRouter = express.Router()

seedRouter.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(sampleProducts)
    res.json({ createdProducts })
  })
)