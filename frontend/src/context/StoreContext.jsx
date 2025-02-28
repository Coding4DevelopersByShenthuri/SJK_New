import axios from "axios";
import { createContext, useEffect, useState, useMemo } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState(() => {
        // Load basket from localStorage on initial render
        const savedBasket = localStorage.getItem('basketItems');
        return savedBasket ? JSON.parse(savedBasket) : {};
    });

    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");
    const url = "http://localhost:5000";

    useEffect(() => {
        // Save basket to localStorage whenever it changes
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
    }, [basketItems]);


    // Fetch food list (this part can be modified to your fetching logic)
    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axios.get(`${url}/api/food/list`);
                setFoodList(response.data.data);
            } catch (error) {
                console.error("Error fetching food list:", error);
            }
        };

        fetchFoodList();
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);
    

    // Initialize basketItems from localStorage or an empty object after food_list is fetched
    useEffect(() => {
        if (food_list && food_list.length > 0) {  // Check if food_list is not empty
            const storedItems = JSON.parse(localStorage.getItem('basketItems')) || {};
            const validIds = food_list.map((item) => String(item._id)) || [];
            const initialBasket = Object.keys(storedItems).reduce((acc, key) => {
                if (validIds.includes(key)) {
                    acc[key] = storedItems[key];
                }
                return acc;
            }, {});
            setBasketItems(initialBasket);  // Set basket items based on the food list
        }
    }, [food_list]);  // Runs every time food_list is updated


    // Add an item to the basket
    const addToBasket = (itemId, priceType, price, quantity, deliveryMethod) => {
        setBasketItems((prevItems) => {
            const updatedItems = { ...prevItems };

            if (!updatedItems[itemId]) {
                updatedItems[itemId] = {};
            }

            updatedItems[itemId][priceType] = {
                quantity: (updatedItems[itemId][priceType]?.quantity || 0) + quantity,
                price: price,
                deliveryMethod: deliveryMethod || 'Not specified',
            };

            return updatedItems;
        });
    };

    const removeFromBasket = (itemId, priceType) => {
        setBasketItems((prev) => {
            // Deep copy the basket state
            const updatedBasket = JSON.parse(JSON.stringify(prev));
    
            // Check if the item and price type exist
            if (updatedBasket[itemId] && updatedBasket[itemId][priceType]) {
                const item = updatedBasket[itemId][priceType];
    
                // Decrease quantity if more than 1, otherwise remove the item
                if (item.quantity > 1) {
                    updatedBasket[itemId][priceType].quantity -= 1;
                } else {
                    delete updatedBasket[itemId][priceType];
    
                    // If no price types remain, remove the item from the basket
                    if (Object.keys(updatedBasket[itemId]).length === 0) {
                        delete updatedBasket[itemId];
                    }
                }
            }
    
            return { ...updatedBasket }; // Ensure a new object reference to trigger re-render
        });
    };    
    

    // Update the quantity of a basket item
    const updateBasketItem = (itemId, priceType, quantity) => {
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (!updatedBasket[itemId]) {
                updatedBasket[itemId] = {};
            }
            if (quantity > 0) {
                updatedBasket[itemId][priceType] = {
                    quantity,
                    price: updatedBasket[itemId][priceType]?.price || 0,
                    deliveryMethod: updatedBasket[itemId][priceType]?.deliveryMethod || 'Not specified',
                };
            } else {
                delete updatedBasket[itemId][priceType];
                if (Object.keys(updatedBasket[itemId]).length === 0) {
                    delete updatedBasket[itemId];
                }
            }
            return updatedBasket;
        });
    };

    // Increase the quantity of a basket item
    const increaseQuantity = (itemId, priceType) => {
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (updatedBasket[itemId] && updatedBasket[itemId][priceType]) {
                updatedBasket[itemId][priceType].quantity += 1;
            }
            return updatedBasket;
        });
    };

    // Decrease the quantity of a basket item
    const decreaseQuantity = (itemId, priceType) => {
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (updatedBasket[itemId] && updatedBasket[itemId][priceType] && updatedBasket[itemId][priceType].quantity > 1) {
                updatedBasket[itemId][priceType].quantity -= 1;
            }
            return updatedBasket;
        });
    };

    // Calculate the total basket amount using memoization
    const getTotalBasketAmount = useMemo(() => {
        return Object.entries(basketItems).reduce((total, [itemId, priceTypes]) => {
            // Ensure priceTypes is a valid object
            if (priceTypes && typeof priceTypes === 'object') {
                return (
                    total +
                    Object.values(priceTypes).reduce((subtotal, { quantity, price }) => {
                        // Defensive check to avoid errors if price or quantity is missing
                        if (quantity && price) {
                            return subtotal + price * quantity;
                        }
                        return subtotal; // Skip if invalid data is found
                    }, 0)
                );
            }
            return total; // Return total if priceTypes is invalid
        }, 0);
    }, [basketItems]);


    // Provide context values to the components
    const contextValue = {
        food_list,
        basketItems,
        addToBasket,
        removeFromBasket,
        updateBasketItem,
        getTotalBasketAmount,
        increaseQuantity,
        decreaseQuantity,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
