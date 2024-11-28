import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  let [products, setProducts] = useState([])
  async function getProducts() {
    try {
      const response = await axios.get("https://shop-ne9g.onrender.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <div style={{ overflowX: 'auto' }}>
      {Array.isArray(products) && products.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={trStyle}>
                <td style={tdStyle}>{product.id}</td>
                <td style={{ ...tdStyle, ...ellipsisStyle }}>{product.name}</td>
                <td style={{ ...tdStyle, ...ellipsisStyle }}>{product.description}</td>
                <td style={tdStyle}>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading products or no products available...</p>
      )}
    </div>
  )
}
const thStyle = {
  borderBottom: '2px solid #ddd',
  padding: '8px',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '8px',
  borderBottom: '1px solid #ddd',
};

const trStyle = {
  textAlign: 'left',
};

const ellipsisStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '150px',
};
export default App
