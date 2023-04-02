function userController(app, Models){
    const { User } = Models;
    app.post("/bookCab", async (req,res) => {
        const { emailVal, pickUpVal, destLocVal, cabPrice, minTime } = req.body;
        const user = await User.create(({
            email : emailVal,
            source : pickUpVal,
            destination : destLocVal,
            price : cabPrice,
            time : minTime
        }));
        try{
            if(user){
                return res.status(201).json({ message: "Created"});
            }
        }catch(error){
            console.log(error)
        }
    })
}

module.exports = userController;