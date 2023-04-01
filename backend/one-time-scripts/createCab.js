const connectDb = require("../connect");

async function start(){
    const { Models } = await connectDb();
    const { CabList } = Models;
    const cabInstance = new CabList({
        cabId: 1,
        sourceLoc: "A",
        price: 15,
        cabStatus: false
    });

    console.log(cabInstance);
    await cabInstance.save();
    console.log({ message: "Successfully created a cab instance"});
    process.exit(0);
}

start();