import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {

    const [cart, setCart] = useState({items: {}, price: 0});
    const updateCart = (idx) => {
        const item = bakeryData[idx];
        const name = item.name;
        const newCart = cart.items;
        if (newCart[name]) {
            newCart[name] += 1;
        } else {
            newCart[name] = 1;
        }
        const newPrice = cart.price + item.price
        setCart({items: newCart, price: newPrice})
        console.log(cart.items)
    }

    return (
        <div className="App">
            <h1>My Bakery</h1>

            {bakeryData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
                <BakeryItem name={item.name} description={item.description} price={item.price} image={item.image} updateCart={updateCart} index={index}/> // replace with BakeryItem component
            ))}

            <div className="cart">
                <h2>Cart</h2>
                {Object.keys(cart.items).map((key) => (
                    <p>{key}   x{cart.items[key]}</p>
                ))}
                <p>Total Price: ${Math.round(cart.price * 100) / 100}</p>
            </div>
        </div>
    );
}

export default App;