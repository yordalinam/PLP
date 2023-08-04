import { Navigation } from './Navigation'
import { Product } from './Product'
import { useState, useEffect } from 'react'
import { bags, socks, shoes } from './products.js'
import './App.css'

const keyValueProducts = {
  'Socks': socks,
  'Shoes': shoes,
  'Bags': bags
}

let filters = {
  byName: '',
  cheaperThan: ''
}
function App() {

  const [products, setProducts] = useState(socks)
  const [category, setCategory] = useState('Socks')
  const [loadedNum, setLoadedNum] = useState(5);


  useEffect(() => {
    setProducts(keyValueProducts[category])
    executeFilters();
  }, [loadedNum, category])


  const changeCategory = function (cat) {
    setCategory(cat)
    setLoadedNum(5);
  }

  const addToCart = function (name) {
    const domDialog = document.querySelector('#dialog')

    domDialog.show();
  }
  //Goes through all filters and filters the products array by them
  const executeFilters = function () {
    setProducts(() => {
      let startArray = JSON.parse(JSON.stringify(keyValueProducts[category]));

      //Filter by name

      if (filters.byName !== '') {
        startArray = startArray.filter((el) => {
          return el.productName.toUpperCase().includes(filters.byName.toUpperCase())
        })
      }

      if (filters.cheaperThan != '') {
        startArray = startArray.filter((el) => {
          return el.price < parseFloat(filters.cheaperThan)
        })
      }

      startArray = startArray.filter((el, index) => {
        return loadedNum > index
      })


      return startArray;
    })

  }

  const sortingMethod = function (e) {
    switch (e.target.value) {
      case 'priceDesc':
        setProducts((prev) => {
          const newArr = [...prev].sort((arg1, arg2) => {
            return arg1.price - arg2.price
          })
          return newArr;
        })
        break;
      case 'priceAsc':
        setProducts((prev) => {
          const newArr = [...prev].sort((arg1, arg2) => {
            return arg2.price - arg1.price
          })

          return newArr;
        })
        break;
      case 'nameAsc':
        setProducts((prev) => {
          const newArr = [...prev].sort((arg1, arg2) => {
            if (arg1.productName > arg2.productName) {
              return -1
            }
            return 1
          })

          return newArr;
        })
        break;
      case 'nameDesc':
        setProducts((prev) => {
          const newArr = [...prev].sort((arg1, arg2) => {

            if (arg1.productName > arg2.productName) {
              return 1
            }

            return -1
          })


          return newArr;
        })
        break;

    }

  }
  return (
    <>

      <dialog id="dialog">
        <p className='dialogContent'>Product succesfully added to cart!</p>
        <form method="dialog">
          <button className='dial'>OK</button>
        </form>
      </dialog>
      <Navigation sortingMethod={sortingMethod} catSelected={changeCategory} />


      <div className="mainContainer">
        <div className="filterColumn">
          <span>Filter By:</span>
          <div className="simpleRow"><label htmlFor="byName">Name : </label> <input className="byNameInput" onChange={(e) => {
            const filterString = e.target.value;
            filters = { ...filters, byName: filterString };
            executeFilters();

          }} type="text" /></div>

          <div className="simpleRow">
            <label htmlFor="byPrice">Cheaper than : </label>
            <input className="byNameInput" onChange={(e) => {
              if (e.target.value < 0) {
                e.target.value = '';
              }
              filters = { ...filters, cheaperThan: e.target.value }
              executeFilters();
            }} type="number" />
          </div>
        </div>
        <div className="productColumn">
          <div className="productGrid">

            {
              products.map((product, index) => {
                return <Product addToCart={addToCart} key={'Product' + index}
                  productName={product.productName} rating={product.rating} imageLink={product.imageLink}
                  price={product.price} productDescription={product.productDescription}></Product>
              })
            }
          </div>

          <div className="simpleRow">
            <span>{products.length} / {keyValueProducts[category].length}</span>
            <button onClick={() => {
              setLoadedNum((num) => {
                return num + 5;
              })
            }}>Load More</button>

          </div>


        </div>


      </div>

      <div className='footer'>

        <p>Contact Us🦋:
          <br></br>
          <br></br>
          The City of Barbie
          <br></br>
          Pink Street
          <br></br>
          ZIP: 1234
          <br></br>
          phone: 01234567899

        </p>
      </div>



    </>
  )
}

export default App
