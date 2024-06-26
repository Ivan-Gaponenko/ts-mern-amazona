import express, { Request, Response } from 'express'
import { ProductModel } from '../models/productModel'
import { sampleProducts, sampleUsers } from '../data'
import expressAsyncHandler from 'express-async-handler'
import { UserModel } from '../models/userModel'


export const seedRouter = express.Router()

seedRouter.get(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(sampleProducts)

    await UserModel.deleteMany({})
    const createdUsers = await UserModel.insertMany(sampleUsers)
    res.json({ createdProducts, createdUsers })
  })
)