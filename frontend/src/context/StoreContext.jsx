import { createContext, useEffect, useState, useMemo } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [food_list, setFoodList] = useState([]);
    const [basketItems, setBasketItems] = useState({});
    const [token, setToken] = useState("");
    const url = "http://localhost:5000";

    // Fetch food list (this part can be modified to your fetching logic)
    useEffect(() => {
        // Simulating fetching food list from an API
        const fetchFoodList = async () => {
            const response = await fetch(`${url}/food-list`);
            const data = await response.json();
            setFoodList(data);  // Set food list after fetching
        };
        fetchFoodList();
    }, []);

    // Initialize basketItems from localStorage or an empty object after food_list is fetched
    useEffect(() => {
        if (food_list.length > 0) {
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
    }, [food_list]);

    // Sync basketItems to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
    }, [basketItems]);

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

    // Remove an item from the basket
    const removeFromBasket = (itemId, priceType) => {
        setBasketItems((prev) => {
            const updatedBasket = { ...prev };
            if (updatedBasket[itemId] && updatedBasket[itemId][priceType]) {
                if (updatedBasket[itemId][priceType].quantity > 1) {
                    updatedBasket[itemId][priceType].quantity -= 1;
                } else {
                    delete updatedBasket[itemId][priceType];
                    if (Object.keys(updatedBasket[itemId]).length === 0) {
                        delete updatedBasket[itemId];
                    }
                }
            }
            return updatedBasket;
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
            return (
                total +
                Object.values(priceTypes).reduce((subtotal, { quantity, price }) => {
                    return subtotal + price * quantity;
                }, 0)
            );
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
