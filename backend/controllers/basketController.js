import userModel from '../models/userModel.js';

// add items to user basket
const addToBasket = async (req, res) => {
    // implement logic to add item to basket
    try {
        let userData = await userModel.findById(req.body.userId);
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
    try {
        let userData = await userModel.findById(req.body.userId);
        let basketData = await userData.basketData;
        if (basketData[req.body.itemId]>0) {
            basketData[req.body.itemId] -=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {basketData});
        res.json({success: true, message: 'Item removed from basket successfully'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Failed to remove item from basket'});
    }
};

// fetch user basket data
const getBasket = async (req, res) => {
    // implement logic to fetch user basket data
    try {
        let userData = await userModel.findById(req.body.userId);
        let basketData = await userData.basketData;
        res.json({success: true, basketData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Failed to fetch basket data'});
    }
}

export { addToBasket, removeFromBasket, getBasket };