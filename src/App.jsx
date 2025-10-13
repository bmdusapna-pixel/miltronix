import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetails'

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product-details" element={<ProductDetailPage />} /> 
      </Routes>
    </Router>
  )
}

export default App