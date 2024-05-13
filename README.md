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