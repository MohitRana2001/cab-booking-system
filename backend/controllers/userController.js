function userController(app, Models){
    const { User } = Models;
    app.post("/bookCab", async (req,res) => {
        const { email, source, destination, price, time} = req.body;
        try{
            const user = await User.create(({
            email,
            source,
            destination,
            price,
            time
        }));
        return res.status(201).json({ message: "Created", email: email})
        }catch(error){
            console.log(error)
        }
    })
}

module.exports = userController;