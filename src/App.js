import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		setCart([
			...cart, 
			item
		])
	};
	const removeItem = itemId => {
		// console.log(itemId);
		var bookPosition = cart.map((i) => {return i.id}).indexOf(itemId);
		console.log(bookPosition);
		if (cart.length > 1){
			const newCart = cart.splice(bookPosition, 1);
			setCart(newCart);
		} else if (cart.length === 1){
			setCart([]);
		}
		// return;
	}

	return (
		<ProductContext.Provider value={{ products, addItem }}>
			<CartContext.Provider value={{ cart, removeItem }}>
				<div className="App">
					<Navigation cart={cart} />
					{/* <Navigation /> */}

					{/* Routes */}
					<Route exact path="/">
						{/* <Products products={products} addItem={addItem} /> */}
						<Products  />
					</Route>

					<Route path="/cart">
						{/* <ShoppingCart cart={cart} /> */}
						<ShoppingCart />
					</Route>
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
