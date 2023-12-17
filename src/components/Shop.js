import axios from "axios"
import { useEffect, useState } from "react"
import rupiahFormat from "../utils/rupiahFormat"

const Shop = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)

  const sumTotal = (data) => {
    let sum = 0
    data.forEach((element) => {
      sum += element.subtotal;
    });
    setTotal(sum)
  }

  const getAllData = () => {
    axios({
      method: 'GET',
      url: 'https://spe-academy.spesolution.com/api/recruitment',
      headers: {
        "Content-Type": 'application/json',
        Authorization: 'Bearer o7Ytbt9XQLI3PgtebJfKSXKEf0XHU74Y'
      }
    }).then((response) => {
      if (response.status === 200) {
        const mapResult = response.data.map((v) => {
          return {
            ...v,
            subtotal: v.quantity * v.product.price
          }
        })
        setProducts(mapResult)
      }
    })
  }

  useEffect(() => {
    getAllData()
  }, []);

  useEffect(() => {
    sumTotal(products)
  }, [products])

  const onChangeQty = (value, idx) => {
    setProducts((prevState) => {
      prevState[idx].quantity = value
      prevState[idx].subtotal = prevState[idx].quantity * prevState[idx].product.price
      return [...prevState]
    })
  }

  return <div className="wrap-shop">
    <p className="title">SPE Frontend Shop</p>
    <div className="container-tp">
      <table className="table-product">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((v, idx) =>
            <tr key={idx}>
              <td>
                <div className="col-product">
                  <img src={v.product.media_url} alt={`photo-product-${idx}`} />
                  <div>
                    <p className="code">{v.product.code}</p>
                    <p className="name">{v.product.name}</p>
                    <p className="price">{rupiahFormat(v.product.price)}</p>
                    <p className="stock">{`${v.product.stock} in stock`}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="col-qty">
                  <input type="number" min={0} max={v.product.stock} value={v.quantity} onChange={(e) => onChangeQty(e.target.value, idx)} />
                </div>
              </td>
              <td>{rupiahFormat(v.subtotal)}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="footer-table">
        <p>
          total
        </p>
        <p>
          {rupiahFormat(total)}
        </p>
      </div>
    </div>
  </div>
}

export default Shop