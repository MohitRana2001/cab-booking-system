function cabController(app, Models){
    const { CabList } = Models;
    app.get("/cabs", async (req,res) => {
        try {
            const cabInstances = await CabList.find({});
            if(cabInstances){
                return res.status(200).json({ cabInstances });
            }else{
                return res.status(404).json({ message: "No records found!"});
            }
        } catch (error) {
                return res.status(500).json({ message: error });
        }
    });
    app.put("/updateCab", async (req,res)=> {
        const { newCabId, destLocVal, cabStatus } = req.body;
        const updatedCab = await CabList.findOneAndUpdate({ cabId: newCabId }, {
            sourceLoc : destLocVal,
            cabStatus : cabStatus
        });
        try {
            if(updatedCab){
                return res.status(200).json( { message: "The cab is updated"}) // add cab ID
            }
        } catch (error) {
                return res.status(404).json({ message: error});
        }
    });
}


module.exports = cabController;