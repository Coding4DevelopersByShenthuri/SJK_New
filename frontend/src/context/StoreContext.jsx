import { createContext, useEffect, useState } from "react";
import { food_list } from '../assets/assets.js';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    // Retrieve basket items from localStorage, ensuring valid data
    const initialBasketItems = (() => {
        const storedItems = JSON.parse(localStorage.getItem('basketItems')) || {};
        const validIds = food_list.map((item) => String(item._id));
        return Object.keys(storedItems).reduce((acc, key) => {
            if (validIds.includes(key)) {
                acc[key] = storedItems[key];
            }
            return acc;
        }, {});
    })();

    const [basketItems, setBasketItems] = useState(initialBasketItems);

    // Sync basketItems to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
    }, [basketItems]);

    // Add item to the basket
    const addToBasket = (itemId) => {
        const id = String(itemId); // Ensure itemId is a string
        setBasketItems((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    // Remove item from the basket or reduce its quantity
    const removeFromBasket = (itemId) => {
        const id = String(itemId); // Ensure itemId is a string
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (updatedBasket[id] > 1) {
                updatedBasket[id] -= 1; // Decrease quantity
            } else {
                delete updatedBasket[id]; // Remove item
            }
            return updatedBasket;
        });
    };

    // Update basket item quantity
    const updateBasketItem = (itemId, quantity) => {
        const id = String(itemId); // Ensure itemId is a string
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (quantity > 0) {
                updatedBasket[id] = quantity; // Set new quantity
            } else {
                delete updatedBasket[id]; // Remove item if quantity is zero
            }
            return updatedBasket;
        });
    };

    // Calculate total amount in the basket
    const getTotalBasketAmount = () => {
        return Object.entries(basketItems).reduce((total, [itemId, quantity]) => {
            const itemInfo = food_list.find((product) => String(product._id) === itemId);
            return itemInfo ? total + itemInfo.price * quantity : total;
        }, 0);
    };

    const contextValue = {
        food_list,
        basketItems,
        addToBasket,
        removeFromBasket,
        updateBasketItem, // Added this function
        getTotalBasketAmount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
