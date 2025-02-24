import axios from "axios";
import { createContext, useEffect, useState, useMemo } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [food_list, setFoodList] = useState([]);
    const [basketItems, setBasketItems] = useState({});
    const [token, setToken] = useState("");
    const url = "http://localhost:5000";

    // Fetch food list (this part can be modified to your fetching logic)
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);  // Set food list after fetching
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Fetch food list and token on component mount
    useEffect(() => {
        fetchFoodList();
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []); // Runs only once on mount

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

    // Sync basketItems to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
    }, [basketItems]);  // Runs whenever basketItems change

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
