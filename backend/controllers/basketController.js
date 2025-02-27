import userModel from '../models/userModel.js';

// add items to user basket
const addToBasket = async (req, res) => {
    // implement logic to add item to basket
    try {
        let userData = await userModel.findOne({ email: req.body.userId });
        let basketData = userData.basketData;
        if(!basketData[req.body.itemId])
        {
            basketData[req.body.itemId] = 1;
        }
        else{
            basketData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { basketData });
        res.json({ success: true, message: 'Item added to basket successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Failed to add item to basket' });
    }
};

// remove items from user basket
const removeFromBasket = async (req, res) => {
    // implement logic to remove item from basket
};

// fetch user basket data
const getBasket = async (req, res) => {
    // implement logic to fetch user basket data
}

export { addToBasket, removeFromBasket, getBasket };