import { createContext, useEffect, useState } from "react";
import { food_list } from '../assets/assets.js';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Retrieve basket items from localStorage if available, otherwise set to an empty object
    const initialBasketItems = JSON.parse(localStorage.getItem('basketItems')) || {};
    const [basketItems, setBasketItems] = useState(initialBasketItems);

    // Add item to the basket
    const addToBasket = (itemId) => {
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            updatedBasket[itemId] = updatedBasket[itemId] ? updatedBasket[itemId] + 1 : 1;
            localStorage.setItem('basketItems', JSON.stringify(updatedBasket)); // Save to localStorage
            return updatedBasket;
        });
    };

    // Remove item from the basket or reduce its quantity
    const removeFromBasket = (itemId) => {
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (updatedBasket[itemId] > 1) {
                updatedBasket[itemId] -= 1; // Reduce the quantity if more than 1
            } else {
                delete updatedBasket[itemId]; // Remove item if quantity is 1 or less
            }
            localStorage.setItem('basketItems', JSON.stringify(updatedBasket)); // Save to localStorage
            return updatedBasket;
        });
    };

    // Calculate total amount in the basket
    const getTotalBasketAmount = () => {
        let totalAmount = 0;
        for (const itemId in basketItems) {
            if (basketItems[itemId] > 0) {
                const itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * basketItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        food_list,
        basketItems,
        setBasketItems,
        addToBasket,
        removeFromBasket,
        getTotalBasketAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
