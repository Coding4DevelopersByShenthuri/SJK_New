import { createContext, useEffect, useState, useMemo } from "react";
import { food_list } from '../assets/assets.js';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    // Retrieve basket items from localStorage, ensuring valid data
    const initialBasketItems = (() => {
        const storedItems = JSON.parse(localStorage.getItem('basketItems')) || {};
        const validIds = food_list?.map((item) => String(item._id)) || [];
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

    // Add item to the basket with selected price type (normalPrice, fullPrice, etc.)
    const addToBasket = (itemId, priceType, price) => {
        const id = String(itemId);
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (!updatedBasket[id]) {
                updatedBasket[id] = {};
            }
            if (!updatedBasket[id][priceType]) {
                updatedBasket[id][priceType] = {
                    quantity: 1,
                    price,
                };
            } else {
                updatedBasket[id][priceType].quantity += 1;
            }
            return updatedBasket;
        });
    };

    // Remove item from the basket or reduce its quantity
    const removeFromBasket = (itemId, priceType) => {
        const id = String(itemId);
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (updatedBasket[id] && updatedBasket[id][priceType]) {
                if (updatedBasket[id][priceType].quantity > 1) {
                    updatedBasket[id][priceType].quantity -= 1;
                } else {
                    delete updatedBasket[id][priceType];
                    if (Object.keys(updatedBasket[id]).length === 0) {
                        delete updatedBasket[id];
                    }
                }
            }
            return updatedBasket;
        });
    };

    // Update basket item quantity
    const updateBasketItem = (itemId, priceType, quantity) => {
        const id = String(itemId);
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (!updatedBasket[id]) {
                updatedBasket[id] = {};
            }
            if (quantity > 0) {
                updatedBasket[id][priceType] = {
                    quantity,
                    price: updatedBasket[id][priceType]?.price || 0,
                };
            } else {
                delete updatedBasket[id][priceType];
                if (Object.keys(updatedBasket[id]).length === 0) {
                    delete updatedBasket[id];
                }
            }
            return updatedBasket;
        });
    };

    // Increment and Decrement Quantity Logic
    const increaseQuantity = (itemId, priceType) => {
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (updatedBasket[itemId] && updatedBasket[itemId][priceType]) {
                updatedBasket[itemId][priceType].quantity += 1;
            }
            return updatedBasket;
        });
    };

    const decreaseQuantity = (itemId, priceType) => {
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (updatedBasket[itemId] && updatedBasket[itemId][priceType] && updatedBasket[itemId][priceType].quantity > 1) {
                updatedBasket[itemId][priceType].quantity -= 1;
            }
            return updatedBasket;
        });
    };

    // Calculate total amount in the basket with memoization
    const getTotalBasketAmount = useMemo(() => {
        return Object.entries(basketItems).reduce((total, [itemId, priceTypes]) => {
            return (
                total +
                Object.values(priceTypes).reduce((subtotal, { quantity, price }) => {
                    return subtotal + price * quantity;
                }, 0)
            );
        }, 0);
    }, [basketItems]);

    // Context value (only passing required functions)
    const contextValue = {
        food_list,
        basketItems,
        addToBasket,
        removeFromBasket,
        updateBasketItem,
        getTotalBasketAmount,
        increaseQuantity,
        decreaseQuantity,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;