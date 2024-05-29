# TypeScript MERN AMAZONA

## Lessons

1. Intro
2. Tools
3. TS React App By Vite
4. Git Repo
  1. add README.md
  2. Github acc
  3. VS Code to Github
  4. publish Repo
5. List Products
  1. create Product type
  2. create products array
  3. add product images
  4. render products
6. Add React Bootstrap
  1. npm install react-bootstrap bootstrap
  2. import bootstrap css
  3. update App.tsx
7. Add page routing
  1. npm i react-router-dom
  2. create route for home page
  3. create router for product page
  4. add helmet for settting page title

8.  # Video 08: Create Node Server
8. Create Node.JS Server
   1. create backend folder and run npm init
   2. npm install express
   3. npm install -save-dev typescript ts-node-dev @types/express
   4. npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
   5. create src/index.ts
   6. create route for / return backend is ready.
   7. copy data.ts from frontend to backend
   8. create route for /api/products
   9. return products
   10. run npm start
1. create backend folder
   cd backend
   npm init

2. config typescript
   npm install --save-dev typescript ts-node-dev
   create tsconfig.json

   ```json
   {
     "compilerOptions": {
       "target": "es2015",
       "outDir": "./build",
       "strict": true,
       "module": "commonjs",
       "esModuleInterop": true
     }
   }
   ```

   add dev and build command to package.json
   `"dev": "ts-node-dev --respawn --transpile-only --files src/index.ts",`

3. config eslint
   npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
   create .eslintrc.js

   ```js
   module.exports = {
     env: {
       es2016: true,
       node: true,
     },
     extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
     parser: '@typescript-eslint/parser',
     parserOptions: {
       ecmaVersion: 'es2016',
       sourceType: 'module',
     },
     plugins: ['@typescript-eslint'],
   }
   ```

4. create express server
   npm install express
   npm install --save-sev @types/express

5. create src/index.ts
   copy data.ts and Product.ts from frontend to backend

   ```js
   import express, { Request, Response } from 'express'
   import { sampleProducts } from './data'
   const app = express()
   app.get('/api/products', (req: Request, res: Response) => {
     res.json(sampleProducts)
   })
   const PORT = 4000
   app.listen(PORT, () => {
     console.log(`server started at http://localhost:${PORT}`)
   })
   ```

6. npm start
9.  # Video 09: Fetch Products
9. Fetch Products From Backend
  1. npm install axios
  2. set axios base url
  3. use effect hook
  4. use reducer hook

1. install axios
   npm install axios
   in main.tsx

   ```js
   axios.defaults.baseURL =
     process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'
   ```

2. define types in HomePage

   ```js
   type State = {
     products: Product[],
     loading: boolean
     error: string
   }
   type Action =
     | { type: 'FETCH_REQUEST' }
     | {
         type: 'FETCH_SUCCESS'
         payload: Product[]
       }
     | { type: 'FETCH_FAIL'; payload: string }

   ```

3. define initial state and reducer in HomePage.tsx

   ```js
   const initialState: State = {
     products: [],
     loading: true,
     error: '',
   }
   const reducer = (state: State, action: Action) => {
     switch (action.type) {
       case 'FETCH_REQUEST':
         return { ...state, loading: true }
       case 'FETCH_SUCCESS':
         return { ...state, products: action.payload, loading: false }
       case 'FETCH_FAIL':
         return { ...state, loading: false, error: action.payload }
       default:
         return state
     }
   }
   ```

4. define get error function
   create types/ApiError.ts

   ```js
    export declare type ApiError = {
    message: string
    response: {
    data: {
    message: string
    }
    }
    }
   ```

   create utils.ts

   ```js
   export const getError = (error: ApiError) => {
     return error.response && error.response.data.message
       ? error.response.data.message
       : error.message
   }
   ```

5. fetch products

   ```js
   const [{ loading, error, products }, dispatch] = useReducer<
     React.Reducer<State, Action>
   >(reducer, initialState)
     useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err as ApiError) })
      }
    }
    fetchData()
   }, [])
   ```

6. create LoadingBox component
   create /components/LoadingBox.tsx

   ```js
   export declare type ApiError = {
    message: string
    response: {
    data: {
    message: string
    }
    }
   }
   ```

7. create MessageBox component
   create /components/MessageBox.tsx

   ```js
   import Alert from 'react-bootstrap/Alert'
   import React from 'react'
   export default function MessageBox({
   variant = 'info',
   children,
   }: {
    variant?: string
    children: React.ReactNode
   }) {
    return <Alert variant={variant || 'info'}>{children}</Alert>
   }
   ```

8. update return statement
   replace sampleProducts with products

   ```js
   return loading ? (
     <LoadingBox />
   ) : error ? (
     <MessageBox variant="danger">{error}</MessageBox>
   ) : (
     <Row>
       {products.map((product) => (
         <Col key={product.slug} sm={6} md={4} lg={3}>
           <Link to={'/product/' + product.slug}>
             <img
               src={product.image}
               alt={product.name}
               className="product-image"
             />
             <h2>{product.name}</h2>
             <p>${product.price}</p>
           </Link>
         </Col>
       ))}
     </Row>
   )
   ```
10. # Video-10-Create-Rating-ProductItem-Component

1. Rating.js

   ```js
      function Rating(props: {
      rating: number
      numReviews?: number
      caption?: string
    }) {
      const { rating, numReviews, caption } = props
      return (
        <div className="rating">
          <span>
            <i
              className={
                rating >= 1
                  ? 'fas fa-star'
                  : rating >= 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 2
                  ? 'fas fa-star'
                  : rating >= 1.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 3
                  ? 'fas fa-star'
                  : rating >= 2.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 4
                  ? 'fas fa-star'
                  : rating >= 3.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 5
                  ? 'fas fa-star'
                  : rating >= 4.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          {caption ? (
            <span>{caption}</span>
          ) : numReviews != 0 ? (
            <span>{' ' + numReviews + ' reviews'}</span>
          ) : (
            ''
          )}
        </div>
      )
    }
    export default Rating

   ```

2. ProductItem.js

   ```js
   function ProductItem({ product }: { product: Product }) {
     return (
       <Card>
         <Link to={`/product/${product.slug}`}>
           <img
             src={product.image}
             className="card-img-top"
             alt={product.name}
           />
         </Link>
         <Card.Body>
           <Link to={`/product/${product.slug}`}>
             <Card.Title>{product.name}</Card.Title>
           </Link>
           <Rating rating={product.rating} numReviews={product.numReviews} />
           <Card.Text>${product.price}</Card.Text>
           {product.countInStock === 0 ? (
             <Button variant="light" disabled>
               Out of stock
             </Button>
           ) : (
             <Button>Add to cart</Button>
           )}
         </Card.Body>
       </Card>
     )
   }
   export default ProductItem
   ```

3. HomePage.js

   ```js
   <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
     <ProductItem product={product}></ProductItem>
   </Col>
   ```
11. # Video-11-Set-Page-Title
  1. npm i react-helmet-async
  2. main.tsx

    ```js
    import { HelmetProvider } from 'react-helmet-async'

    ...
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
    ```

  3. HomePage.tsx

    ```js
    import { Helmet } from 'react-helmet-async'
    ...
    <Helmet>
          <title>Amazona</title>
    </Helmet>
    ```
12. # Video-12-Load-Products-By-React-Query

  1. npm i @tanstack/react-query @tanstack/react-query-devtools

  2. main.tsx

    ```js
    // remove lines
    import axios from 'axios'
    axios.defaults.baseURL =
      process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'

      ...
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

    ```

  3. apiClient.ts

    ```js
    import axios from 'axios'
    const apiClient = axios.create({
      baseURL:
        process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : '/',
      headers: {
        'Content-type': 'application/json',
      },
    })

    export default apiClient
    ```

  4. hooks/productHook.ts

    ```js
    export const useGetProductsQuery = () =>
    useQuery({
      queryKey: ['products'],
      queryFn: async () =>
        (
          await apiClient.get<Product[]>(`api/products`)
        ).data,
    })
    ```

  5. HomePage.tsx

    ```js
    const { data: products, isLoading, error } = useGetProductsQuery()
    ...
      {isLoading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
        ) : (
      <Row>
        <Helmet>
          <title>TS Amazona</title>
        </Helmet>
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
      )}

    ```
13. # Video-13-Create-Product-Page

1. index.ts

   ```js
   app.get('/api/products/:slug', (req: Request, res: Response) => {
     res.json(sampleProducts.find((x) => x.slug === req.params.slug))
   })
   ```

2. productHooks.ts

   ```js
   export const useGetProductDetailsBySlugQuery = (slug: string) =>
     useQuery({
       queryKey: ['products', slug],
       queryFn: async () =>
         ((await apiClient.get) < Product > `api/products/slug/${slug}`).data,
     })
   ```

3. ProductPage.tsx

   ```js

      function ProductPage() {
           const params = useParams()
        const { slug } = params

        const {
          data: product,
          refetch,
          isLoading,
          error,
        } = useGetProductDetailsBySlugQuery(slug!)
14. # Video-14-Create-React-Context

1. Store.ts

   ```js

      type AppState = {
        mode: string
      }

      const initialState: AppState = {
        mode: localStorage.getItem('mode')
          ? localStorage.getItem('mode')!
          : window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',

       }
      type Action =  { type: 'SWITCH_MODE' }


      function reducer(state: AppState, action: Action): AppState {
        switch (action.type) {
          case 'SWITCH_MODE':
            return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }

          default:
            return state
        }
      }

      const defaultDispatch: React.Dispatch<Action> = () => initialState

      const Store = React.createContext({
        state: initialState,
        dispatch: defaultDispatch,
      })
      function StoreProvider(props: React.PropsWithChildren<{}>) {
        const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
          reducer,
          initialState
        )
        return <Store.Provider value={{ state, dispatch }} {...props} />
      }

      export { Store, StoreProvider }

   ```

2. main.ts

   ```js
   <StoreProvider>
     <RouterProvider router={router} />
     ...
   </StoreProvider>
   ```

3. App.tsx

   ```js
   useEffect(() => {
     document.body.setAttribute('data-bs-theme', mode)
   }, [mode])
   const switchModeHandler = () => {
     ctxDispatch({ type: 'SWITCH_MODE' })
   }
   ...
   <Button variant={mode} onClick={switchModeHandler}>
                  <i
                    className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                  ></i>
                </Button>
   ```

4. Use bootstrap 5.3 or above
15. # Video-15-Connect-To-MongoDB
1. create mongodb database
2. npm install dotenv mongoose @typegoose/typegoose
3. put mongodb uri in .env
4. MONGODB_URI=mongodb://localhost/tsmernamazona
5. index.ts

   ```js
   dotenv.config()

   const MONGODB_URI =
     process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazona'
   mongoose.set('strictQuery', true)
   mongoose
     .connect(MONGODB_URI)
     .then(() => {
       console.log('connected to mongodb')
     })
     .catch(() => {
       console.log('error mongodb')
     })
   ```

6. models/productModel

   ```js
   import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

   @modelOptions({})

   @modelOptions({ schemaOptions: { timestamps: true } })
   export class Product {
     public _id!: string
     @prop({ required: true })
     public name!: string
     @prop({ required: true, unique: true })
     public slug!: string
     @prop({ required: true })
     public image!: string
     @prop()
     public images!: string[]
     @prop({ required: true })
     public brand!: string
     @prop({ required: true })
     public category!: string
     @prop({ required: true })
     public description!: string
     @prop({ required: true, default: 0 })
     public price!: number
     @prop({ required: true, default: 0 })
     public countInStock!: number
     @prop({ required: true, default: 0 })
     public rating!: number
     @prop({ required: true, default: 0 })
     public numReviews!: number
     @prop({ required: true, default: false })
     public isFeatured!: boolean
     @prop()
     public banner?: string
   }

   export const ProductModel = getModelForClass(Product)

   ```

7. npm i express-async-handler
8. productRouter.ts

   ```js
   export const productRouter = express.Router()

   productRouter.get(
     '/',
     asyncHandler(async (req, res) => {
       const products = await ProductModel.find()
       res.json(products)
     })
   )
   ```

9. index.ts

```js
app.use('/api/products', productRouter)
```

10. run <http://localhost:4000/api/products>
11. seedRouter.ts

    ```js
    const seedRouter = express.Router()

    seedRouter.get(
      '/',
      asyncHandler(async (req: Request, res: Response) => {
        await ProductModel.deleteMany({})
        const createdProducts = await ProductModel.insertMany(products)
        res.send({ createdProducts })
      })
    )
    export default seedRouter
    ```
16. # Video-16-Implement-Add-To-Cart

1. Cart.ts

   ```js
        export type CartItem = {
        image: string | undefined
        slug: any
        quantity: number
        countInStock: any
        price: number
        _id: string
        name: string
      }
      export type ShippingAddress = {
        fullName: string
        address: string
        city: string
        country: string
        postalCode: string
      }

      export type Cart = {
        itemsPrice: number
        shippingPrice: number
        taxPrice: number
        totalPrice: number
        cartItems: CartItem[]
        shippingAddress: ShippingAddress
        paymentMethod: string
      }

   ```

2. Store.js

   ```js
        type AppState = {
        mode: string
        cart: Cart
      }

      const initialState: AppState = {
        cart: {
          cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems')!)
            : [],
          shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress')!)
            : { location: {} },
          paymentMethod: localStorage.getItem('paymentMethod')
            ? localStorage.getItem('paymentMethod')!
            : 'PayPal',
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      }

      type Action =
          | { type: 'SWITCH_MODE' }
          | { type: 'CART_ADD_ITEM'; payload: CartItem }

     // reducer
        case 'CART_ADD_ITEM':
          const newItem = action.payload
          const existItem = state.cart.cartItems.find(
            (item: CartItem) => item._id === newItem._id
          )
          const cartItems = existItem
            ? state.cart.cartItems.map((item: CartItem) =>
                item._id === existItem._id ? newItem : item
              )
            : [...state.cart.cartItems, newItem]
          localStorage.setItem('cartItems', JSON.stringify(cartItems))
          return { ...state, cart: { ...state.cart, cartItems } }

   ```

3. App.tsx

   ```js

    const { {mode, cart}, dispatch } = useContext(Store)

        <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
        <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>

   ```

4. utils.ts

   ```js
   export const convertProductToCartItem = (product: Product): CartItem => {
     const cartItem: CartItem = {
       _id: product._id,
       name: product.name,
       slug: product.slug,
       image: product.image,
       price: product.price,
       countInStock: product.countInStock,
       quantity: 1,
     }
     return cartItem
   }
   ```

5. ProductItem.ts

   ```js
   const { state, dispatch: ctxDispatch } = useContext(Store)
   const {
     cart: { cartItems },
   } = state

   const addToCartHandler = async (item: CartItem) => {
     const existItem = cartItems.find((x) => x._id === product._id)
     const quantity = existItem ? existItem.quantity + 1 : 1
     if (product.countInStock < quantity) {
       toast.warn('Sorry. Product is out of stock')
       return
     }
     ctxDispatch({
       type: 'CART_ADD_ITEM',
       payload: { ...item, quantity },
     })
     toast.success('Product added to the cart')
   }
   ...
       <Button
               onClick={() => addToCartHandler(convertProductToCartItem(product))}
             >
               Add to cart
             </Button>
   ```
17. # Video-17-Add-To-Cart-In-Product-Page

1. ProductPage.ts

   ```js

      const { state, dispatch } = useContext(Store)
      const { cart } = state
      const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product!._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (product!.countInStock < quantity) {
          toast.warn('Sorry. Product is out of stock')
          return
        }
        dispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...convertProductToCartItem(product!), quantity },
        })
        toast.success('Product added to the cart')
        navigate('/cart')
      }
      ...
      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
      </Button>

   ```

2. npm i react-router-bootstrap
3. App.tsx

   ```js
   <LinkContainer to="/">
     <Navbar.Brand>amazona</Navbar.Brand>
   </LinkContainer>
   ```
18. # Video-18-Create-Cart-Page
1. CartPage.ts

   ```js
   export default function CartPage() {
     const navigate = useNavigate()
     const {
       state: {
         cart: { cartItems },
       },
       dispatch,
     } = useContext(Store)

     const updateCartHandler = async (item: CartItem, quantity: number) => {
       if (item.countInStock < quantity) {
         toast.warn('Sorry. Product is out of stock')
         return
       }
       dispatch({
         type: 'CART_ADD_ITEM',
         payload: { ...item, quantity },
       })
     }

     return (
       <div>
         <Helmet>
           <title>Shopping Cart</title>
         </Helmet>
         <h1>Shopping Cart</h1>
         <Row>
           <Col md={8}>
             {cartItems.length === 0 ? (
               <MessageBox>
                 Cart is empty. <Link to="/">Go Shopping</Link>
               </MessageBox>
             ) : (
               <ListGroup>
                 {cartItems.map((item: CartItem) => (
                   <ListGroup.Item key={item._id}>
                     <Row className="align-items-center">
                       <Col md={4}>
                         <img
                           src={item.image}
                           alt={item.name}
                           className="img-fluid rounded img-thumbnail"
                         ></img> <Link to={`/product/${item.slug}`}>{item.name}</Link>
                       </Col>
                       <Col md={3}>
                         <Button
                           onClick={() =>
                             updateCartHandler(item, item.quantity - 1)
                           }
                           variant="light"
                           disabled={item.quantity === 1}
                         >
                           <i className="fas fa-minus-circle"></i>
                         </Button>{' '}
                         <span>{item.quantity}</span>{' '}
                         <Button
                           variant="light"
                           onClick={() =>
                             updateCartHandler(item, item.quantity + 1)
                           }
                           disabled={item.quantity === item.countInStock}
                         >
                           <i className="fas fa-plus-circle"></i>
                         </Button>
                       </Col>
                       <Col md={3}>${item.price}</Col>
                       <Col md={2}>
                         <Button
                           onClick={() => removeItemHandler(item)}
                           variant="light"
                         >
                           <i className="fas fa-trash"></i>
                         </Button>
                       </Col>
                     </Row>
                   </ListGroup.Item>
                 ))}
               </ListGroup>
             )}
           </Col>
           <Col md={4}>
             <Card>
               <Card.Body>
                 <ListGroup variant="flush">
                   <ListGroup.Item>
                     <h3>
                       Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                       items) : $
                       {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                     </h3>
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <div className="d-grid">
                       <Button
                         type="button"
                         variant="primary"
                         onClick={checkoutHandler}
                         disabled={cartItems.length === 0}
                       >
                         Proceed to Checkout
                       </Button>
                     </div>
                   </ListGroup.Item>
                 </ListGroup>
               </Card.Body>
             </Card>
           </Col>
         </Row>
       </div>
     )
   }
   ```

2. main.ts

   ```js
   <Route path="/cart" element={<CartPage />} />
   ```
19. # Video-19-Implement-Remove-From-Cart


1. CartPage.ts

   ```js
   const removeItemHandler = (item: CartItem) => {
     dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
   }
   ...
    <Button
       onClick={() => removeItemHandler(item)}
           variant="light"
            >
        <i className="fas fa-trash"></i>
      </Button>
   ```

2. Store.tsx

   ```js
       case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
   ```
20. # Video-20-Create-User-Signin-Api

1. userModel.ts

   ```js
      import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

      @modelOptions({ schemaOptions: { timestamps: true } })
      export class User {
        public _id?: string;
        @prop({ required: true })
        public name!: string;
        @prop({ required: true, unique: true })
        public email!: string;
        @prop({ required: true })
        public password!: string;
        @prop({ required: true, default: false })
        public isAdmin!: boolean;
      }

      export const UserModel = getModelForClass(User);

   ```

2. npm i bcryptjs
3. data.ts

   ```js
   export const sampleUsers: User[] = [
     {
       name: 'Joe',
       email: 'admin@example.com',
       password: bcrypt.hashSync('123456'),
       isAdmin: true,
     },
     {
       name: 'John',
       email: 'user@example.com',
       password: bcrypt.hashSync('123456'),
       isAdmin: false,
     },
   ]
   ```

4. Seed users

   ```js
   await UserModel.deleteMany({})
   const createdUsers = await UserModel.insertMany(sampleUsers)
   res.send({ createdProducts, createdUsers })
   ```

5. open <http://localhost:4000/api/seed>
6. npm i jsonwebtoken
7. add JWT_SECRET to .env file
8. utils.ts

   ```js
   export const generateToken = (user: User) => {
     return jwt.sign(
       {
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
       },
       process.env.JWT_SECRET || 'somethingsecret',
       {
         expiresIn: '30d',
       }
     )
   }
   ```

9. userRouter.ts

   ```js
   userRouter.post(
     '/signin',
     asyncHandler(async (req: Request, res: Response) => {
       const user = await UserModel.findOne({ email: req.body.email })
       if (user) {
         if (bcrypt.compareSync(req.body.password, user.password)) {
           res.send({
             _id: user._id,
             name: user.name,
             email: user.email,
             isAdmin: user.isAdmin,
             token: generateToken(user),
           })
           return
         }
       }
       res.status(401).send({ message: 'Invalid email or password' })
     })
   )
   ```

10. index.ts

    ```js
    app.use('/api/users', userRouter)
    ```

11. Test using advanced-rest-client
21. # Video-21-Create-Signin-Page

1. userHooks.ts

   ```js

    export const useSigninMutation = () =>
      useMutation({
        mutationFn: async ({
          email,
          password,
        }: {
          email: string
          password: string
        }) =>
          (
            await apiClient.post<UserInfo>(`api/users/signin`, {
              email,
              password,
            })
          ).data,
      })

   ```

2. SigninPage.ts

   ```js
      export default function SigninPage() {
        const navigate = useNavigate()
        const { search } = useLocation()
        const redirectInUrl = new URLSearchParams(search).get('redirect')
        const redirect = redirectInUrl ? redirectInUrl : '/'

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const { state, dispatch } = useContext(Store)
        const { userInfo } = state

        const { mutateAsync: signin, isLoading } = useSigninMutation()

        const submitHandler = async (e: React.SyntheticEvent) => {
          e.preventDefault()
          try {
            const data = await signin({
              email,
              password,
            })
            dispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
          } catch (err) {
            toast.error(getError(err as ApiError))
          }
        }

        useEffect(() => {
          if (userInfo) {
            navigate(redirect)
          }
        }, [navigate, redirect, userInfo])

        return (
          <Container className="small-container">
            <Helmet>
              <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="mb-3">
                <Button disabled={isLoading} type="submit">
                  Sign In
                </Button>
                {isLoading && <LoadingBox />}
              </div>
              <div className="mb-3">
                New customer?{' '}
                <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
              </div>
            </Form>
          </Container>
        )
      }


   ```
3. main.tsx
   ```js
   <Route path="/signin" element={<SigninPage />} />
   ```
22. # Video-22-Register-User
1. userrouter.ts

   ```js

      userRouter.post(
        '/signup',
        asyncHandler(async (req: Request, res: Response) => {
          const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
          } as User)

          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          })
        })
      )

   ```

2. userHooks.ts

   ```js

    export const useSignupMutation = () =>
   useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signup`, {
          name,
          email,
          password,
        })
      ).data,
   })


   ```

3. SigninPage.ts

   ```js

      export default function SignupPage() {
        const navigate = useNavigate()
        const { search } = useLocation()
        const redirectInUrl = new URLSearchParams(search).get('redirect')
        const redirect = redirectInUrl ? redirectInUrl : '/'

        const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [confirmPassword, setConfirmPassword] = useState('')

        const { state, dispatch } = useContext(Store)
        const { userInfo } = state

        const { mutateAsync: signup, isLoading } = useSignupMutation()

        const submitHandler = async (e: React.SyntheticEvent) => {
          e.preventDefault()
          if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
          }
          try {
            const data = await signup({
              name,
              email,
              password,
            })
            dispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
          } catch (err) {
            toast.error(getError(err as ApiError))
          }
        }

        useEffect(() => {
          if (userInfo) {
            navigate(redirect)
          }
        }, [navigate, redirect, userInfo])

        return (
          <Container className="small-container">
            <Helmet>
              <title>Sign Up</title>
            </Helmet>
            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={(e) => setName(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
              </Form.Group>
              <div className="mb-3">
                <Button type="submit">Sign Up</Button>
              </div>
              <div className="mb-3">
                Already have an account?{' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
              </div>
            </Form>
          </Container>
        )
      }


   ```
4. main.tsx
   ```js
   <Route path="/signup" element={<SignupPage />} />
   ```
23. # Video-23-Create-Shipping-Page

1. Cart.ts

   ```js

      export type ShippingAddress = {
        fullName: string
        address: string
        city: string
        country: string
        postalCode: string
        location: Location
      }

   ```

2. Store.tsx

   ```js
    type Action = | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAddress }

    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      }
   ```

3. CheckoutSteps.ts

   ```js
      export default function CheckoutSteps(props: {
        step1?: boolean
        step2?: boolean
        step3?: boolean
        step4?: boolean
      }) {
        return (
          <Row className="checkout-steps">
            <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
            <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
            <Col className={props.step3 ? 'active' : ''}>Payment</Col>
            <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
          </Row>
        )
      }
   ```

4. ShippingAddressPage.ts

   ```js
   export default function ShippingAddressPage() {
     const navigate = useNavigate()
     const { state, dispatch } = useContext(Store)
     const {
       fullBox,
       userInfo,
       cart: { shippingAddress },
     } = state
     const [fullName, setFullName] = useState(shippingAddress.fullName || '')
     const [address, setAddress] = useState(shippingAddress.address || '')
     const [city, setCity] = useState(shippingAddress.city || '')
     const [postalCode, setPostalCode] = useState(
       shippingAddress.postalCode || ''
     )
     useEffect(() => {
       if (!userInfo) {
         navigate('/signin?redirect=/shipping')
       }
     }, [userInfo, navigate])
     const [country, setCountry] = useState(shippingAddress.country || '')
     const submitHandler = (e: React.SyntheticEvent) => {
       e.preventDefault()
       dispatch({
         type: 'SAVE_SHIPPING_ADDRESS',
         payload: {
           fullName,
           address,
           city,
           postalCode,
           country,
           location: shippingAddress.location,
         },
       })
       localStorage.setItem(
         'shippingAddress',
         JSON.stringify({
           fullName,
           address,
           city,
           postalCode,
           country,
           location: shippingAddress.location,
         })
       )
       navigate('/payment')
     }

     useEffect(() => {
       dispatch({ type: 'SET_FULLBOX_OFF' })
     }, [dispatch, fullBox])

     return (
       <div>
         <Helmet>
           <title>Shipping Address</title>
         </Helmet>

         <CheckoutSteps step1 step2></CheckoutSteps>
         <div className="container small-container">
           <h1 className="my-3">Shipping Address</h1>
           <Form onSubmit={submitHandler}>
             <Form.Group className="mb-3" controlId="fullName">
               <Form.Label>Full Name</Form.Label>
               <Form.Control
                 value={fullName}
                 onChange={(e) => setFullName(e.target.value)}
                 required
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="address">
               <Form.Label>Address</Form.Label>
               <Form.Control
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 required
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="city">
               <Form.Label>City</Form.Label>
               <Form.Control
                 value={city}
                 onChange={(e) => setCity(e.target.value)}
                 required
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="postalCode">
               <Form.Label>Postal Code</Form.Label>
               <Form.Control
                 value={postalCode}
                 onChange={(e) => setPostalCode(e.target.value)}
                 required
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="country">
               <Form.Label>Country</Form.Label>
               <Form.Control
                 value={country}
                 onChange={(e) => setCountry(e.target.value)}
                 required
               />
             </Form.Group>
             <div className="mb-3">
               <Button
                 id="chooseOnMap"
                 type="button"
                 variant="light"
                 onClick={() => navigate('/map')}
               >
                 Choose Location On Map
               </Button>
               {shippingAddress.location && shippingAddress.location.lat ? (
                 <div>
                   LAT: {shippingAddress.location.lat}
                   LNG:{shippingAddress.location.lng}
                 </div>
               ) : (
                 <div>No location</div>
               )}
             </div>

             <div className="mb-3">
               <Button variant="primary" type="submit">
                 Continue
               </Button>
             </div>
           </Form>
         </div>
       </div>
     )
   }
   ```

5. main.tsx

   ```js
   <Route path="/shipping" element={<ShippingAddressPage />} />
   ```
24. # Video-24-Create-Payment-Page

1. Store.tsx

   ```js
    type Action =
     | { type: 'SAVE_PAYMENT_METHOD'; payload: string }


    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      }
   ```

2. PaymentMethodPage.tsx

   ```js
   export default function PaymentMethodPage() {
     const navigate = useNavigate()
     const { state, dispatch } = useContext(Store)
     const {
       cart: { shippingAddress, paymentMethod },
     } = state

     const [paymentMethodName, setPaymentMethod] = useState(
       paymentMethod || 'PayPal'
     )

     useEffect(() => {
       if (!shippingAddress.address) {
         navigate('/shipping')
       }
     }, [shippingAddress, navigate])
     const submitHandler = (e: React.SyntheticEvent) => {
       e.preventDefault()
       dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
       localStorage.setItem('paymentMethod', paymentMethodName)
       navigate('/placeorder')
     }
     return (
       <div>
         <CheckoutSteps step1 step2 step3></CheckoutSteps>
         <div className="container small-container">
           <Helmet>
             <title>Payment Method</title>
           </Helmet>
           <h1 className="my-3">Payment Method</h1>
           <Form onSubmit={submitHandler}>
             <div className="mb-3">
               <Form.Check
                 type="radio"
                 id="PayPal"
                 label="PayPal"
                 value="PayPal"
                 checked={paymentMethodName === 'PayPal'}
                 onChange={(e) => setPaymentMethod(e.target.value)}
               />
             </div>
             <div className="mb-3">
               <Form.Check
                 type="radio"
                 id="Stripe"
                 label="Stripe"
                 value="Stripe"
                 checked={paymentMethodName === 'Stripe'}
                 onChange={(e) => setPaymentMethod(e.target.value)}
               />
             </div>
             <div className="mb-3">
               <Button type="submit">Continue</Button>
             </div>
           </Form>
         </div>
       </div>
     )
   }
   ```

3. main.tsx

   ```js
   <Route path="/payment" element={<PaymentMethodPage />} />
   ```
25. # Video-25-Build-Order-Api

1. orderModel.tsx

   ```js
      import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose'
      import { Product } from './productModel'
      import { User } from './userModel'

      class ShippingAddress {
        @prop()
        public fullName?: string
        @prop()
        public address?: string
        @prop()
        public city?: string
        @prop()
        public postalCode?: string
        @prop()
        public country?: string
        @prop()
        public lat?: number
        @prop()
        public lng?: number
      }

      class Item {
        @prop({ required: true })
        public name!: string
        @prop({ required: true })
        public quantity!: string
        @prop({ required: true })
        public image!: number
        @prop({ required: true })
        public price!: number
        @prop({ ref: Product })
        public product?: Ref<Product>
      }

      class PaymentResult {
        @prop()
        public paymentId!: string
        @prop()
        public status!: string
        @prop()
        public update_time!: string
        @prop()
        public email_address!: string
      }

      modelOptions({ schemaOptions: { timestamps: true } })
      export class Order {
        public _id!: string
        @prop()
        public orderItems!: Item[]
        @prop()
        public shippingAddress?: ShippingAddress

        @prop({ ref: User })
        public user?: Ref<User>

        @prop({ required: true })
        public paymentMethod!: string
        @prop()
        public paymentResult?: PaymentResult
        @prop({ required: true, default: 0 })
        public itemsPrice!: number
        @prop({ required: true, default: 0 })
        public shippingPrice!: number
        @prop({ required: true, default: 0 })
        public taxPrice!: number
        @prop({ required: true, default: 0 })
        public totalPrice!: number
        @prop({ required: true, default: false })
        public isPaid!: boolean
        @prop()
        public paidAt!: Date
        @prop({ required: true, default: false })
        public isDelivered!: boolean
        @prop()
        public deliveredAt!: Date
      }

      export const OrderModel = getModelForClass(Order)

   ```

2. orderRouter.ts

   ```js
   orderRouter.post(
     '/',
     isAuth,
     asyncHandler(async (req: Request, res: Response) => {
       if (req.body.orderItems.length === 0) {
         res.status(400).send({ message: 'Cart is empty' })
       } else {
         const createdOrder = await OrderModel.create({
           orderItems: req.body.orderItems.map((x: Product) => ({
             ...x,
             product: x._id,
           })),
           shippingAddress: req.body.shippingAddress,
           paymentMethod: req.body.paymentMethod,
           itemsPrice: req.body.itemsPrice,
           shippingPrice: req.body.shippingPrice,
           taxPrice: req.body.taxPrice,
           totalPrice: req.body.totalPrice,
           user: req.user._id,
         })
         res
           .status(201)
           .send({ message: 'Order Not Found', order: createdOrder })
       }
     })
   )
   ```

3. index.tsx

   ```js
   app.use('/api/orders', orderRouter)
   ```
26. # Video-26-Create-Place-Order-Page

1. ProtectedRoute.tsx

   ```js
   export default function ProtectedRoute() {
     const {
       state: { userInfo },
     } = useContext(Store)

     if (userInfo) {
       return <Outlet />
     } else {
       return <Navigate to="/signin" />
     }
   }
   ```

2. main.tsx

   ```js
   {
     /* Authenticated Users */
   }
   ;<Route path="" element={<ProtectedRoute />}>
     <Route path="/shipping" element={<ShippingAddressPage />} />
   </Route>
   ```

3. apiClient.ts

   ```js
      apiClient.interceptors.request.use(
        async (config) => {
          if (localStorage.getItem('userInfo'))
            config.headers.authorization = `Bearer ${
              JSON.parse(localStorage.getItem('userInfo')!).token
            }`

          return config
        },
        (error) => {
          Promise.reject(error)
        }
      )

   ```

4. orderHooks.ts

   ```js

      export const useCreateOrderMutation = () =>
        useMutation({
          mutationFn: async (order: {
            orderItems: CartItem[]
            shippingAddress: ShippingAddress
            paymentMethod: string
            itemsPrice: number
            shippingPrice: number
            taxPrice: number
            totalPrice: number
          }) =>
            (
              await apiClient.post<{ message: string; order: Order }>(
                `api/orders`,
                order
              )
            ).data,
        })

   ```

5. PlaceOrderPage.tsx

   ```js

      export default function PlaceOrderPage() {
        const navigate = useNavigate()

        const { state, dispatch } = useContext(Store)
        const { cart, userInfo } = state

        const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100 // 123.2345 => 123.23
        cart.itemsPrice = round2(
          cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
        )
        cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)
        cart.taxPrice = round2(0.15 * cart.itemsPrice)
        cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

        const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation()

        const placeOrderHandler = async () => {
          try {
            const data = await createOrder({
              orderItems: cart.cartItems,
              shippingAddress: cart.shippingAddress,
              paymentMethod: cart.paymentMethod,
              itemsPrice: cart.itemsPrice,
              shippingPrice: cart.shippingPrice,
              taxPrice: cart.taxPrice,
              totalPrice: cart.totalPrice,
            })
            dispatch({ type: 'CART_CLEAR' })
            localStorage.removeItem('cartItems')
            navigate(`/order/${data.order._id}`)
          } catch (err) {
            toast.error(getError(err as ApiError))
          }
        }

        useEffect(() => {
          if (!cart.paymentMethod) {
            navigate('/payment')
          }
        }, [cart, navigate])

        return (
          <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <Helmet>
              <title>Preview Order</title>
            </Helmet>
            <h1 className="my-3">Preview Order</h1>
            <Row>
              <Col md={8}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                    <Card.Text>
                      <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                      <strong>Address: </strong> {cart.shippingAddress.address},
                      {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                      {cart.shippingAddress.country}
                    </Card.Text>
                    <Link to="/shipping">Edit</Link>
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                      <strong>Method:</strong> {cart.paymentMethod}
                    </Card.Text>
                    <Link to="/payment">Edit</Link>
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Items</Card.Title>
                    <ListGroup variant="flush">
                      {cart.cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                          <Row className="align-items-center">
                            <Col md={6}>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="img-fluid rounded thumbnail"
                              ></img>{' '}
                              <Link to={`/product/${item.slug}`}>{item.name}</Link>
                            </Col>
                            <Col md={3}>
                              <span>{item.quantity}</span>
                            </Col>
                            <Col md={3}>${item.price}</Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <Link to="/cart">Edit</Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Order Summary</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Items</Col>
                          <Col>${cart.itemsPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Shipping</Col>
                          <Col>${cart.shippingPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Tax</Col>
                          <Col>${cart.taxPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <strong> Order Total</strong>
                          </Col>
                          <Col>
                            <strong>${cart.totalPrice.toFixed(2)}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button
                            type="button"
                            onClick={placeOrderHandler}
                            disabled={cart.cartItems.length === 0 || isLoading}
                          >
                            Place Order
                          </Button>
                        </div>
                        {isLoading && <LoadingBox></LoadingBox>}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )
      }

   ```

6. main.tsx

   ```js
   <Route path="/placeorder" element={<PlaceOrderPage />} />
   ```
27. # Video-27-Create-Order-Page

1. orderRouter.ts

   ```js
   orderRouter.get(
     '/:id',
     isAuth,
     asyncHandler(async (req: Request, res: Response) => {
       const order = await OrderModel.findById(req.params.id)
       if (order) {
         res.send(order)
       } else {
         res.status(404).send({ message: 'Order Not Found' })
       }
     })
   )
   ```

2. orderHooks.tsx

   ```js
    export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: async () =>
      (await apiClient.get<Order>(`api/orders/${id}`)).data,
  })
   ```

3. OrderPage.ts

   ```js
        export default function OrderPage() {
          const { state } = useContext(Store)
          const { userInfo } = state

          const params = useParams()
          const { id: orderId } = params

          const {
            data: order,
            isLoading,
            error,
            refetch,
          } = useGetOrderDetailsQuery(orderId!)

          return isLoading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
          ) : !order ? (
            <MessageBox variant="danger">Order Not Found</MessageBox>
          ) : (
            <div>
              <Helmet>
                <title>Order {orderId}</title>
              </Helmet>
              <h1 className="my-3">Order {orderId}</h1>
              <Row>
                <Col md={8}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Shipping</Card.Title>
                      <Card.Text>
                        <strong>Name:</strong> {order!.shippingAddress.fullName} <br />
                        <strong>Address: </strong> {order.shippingAddress.address},
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                        ,{order.shippingAddress.country}
                        &nbsp;
                        {order.shippingAddress.location &&
                          order.shippingAddress.location.lat && (
                            <a
                              target="_new"
                              href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
                            >
                              Show On Map
                            </a>
                          )}
                      </Card.Text>
                      {order.isDelivered ? (
                        <MessageBox variant="success">
                          Delivered at {order.deliveredAt}
                        </MessageBox>
                      ) : (
                        <MessageBox variant="warning">Not Delivered</MessageBox>
                      )}
                    </Card.Body>
                  </Card>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Payment</Card.Title>
                      <Card.Text>
                        <strong>Method:</strong> {order.paymentMethod}
                      </Card.Text>
                      {order.isPaid ? (
                        <MessageBox variant="success">
                          Paid at {order.paidAt}
                        </MessageBox>
                      ) : (
                        <MessageBox variant="warning">Not Paid</MessageBox>
                      )}
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Items</Card.Title>
                      <ListGroup variant="flush">
                        {order.orderItems.map((item) => (
                          <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                              <Col md={6}>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="img-fluid rounded thumbnail"
                                ></img>{' '}
                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                              </Col>
                              <Col md={3}>
                                <span>{item.quantity}</span>
                              </Col>
                              <Col md={3}>${item.price}</Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Order Summary</Card.Title>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col>Items</Col>
                            <Col>${order.itemsPrice.toFixed(2)}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice.toFixed(2)}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice.toFixed(2)}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <strong> Order Total</strong>
                            </Col>
                            <Col>
                              <strong>${order.totalPrice.toFixed(2)}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )
        }

   ```

4. main.tsx

   ```js
   <Route path="/placeorder" element={<PlaceOrderPage />} />
   ```