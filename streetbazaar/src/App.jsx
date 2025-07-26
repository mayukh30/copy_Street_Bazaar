import { useState } from 'react'
import { ShoppingCart, Plus } from 'lucide-react';
import './App.css'
import Cart from './components/cart/Cart'
import ProductManagementApp from './components/products/ProductManagementApp';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    // <div>
    //   <button onClick={() => setIsCartOpen(true)} className="p-2 rounded-full shadow-xl shadow-black/30">
    //     <ShoppingCart className="h-6 w-6" />
    //   </button>
    //   <Cart 
    //     isOpen={isCartOpen} 
    //     onClose={() => setIsCartOpen(false)} 
    //   />
    // </div>
    <div className="App">
      <ProductManagementApp />
    </div>
  );
}

export default App
