import mongoose from "mongoose";

export async function connect() {
    try {
        const dbEnvUrl = process.env.MONGODB_URL?process.env.MONGODB_URL : ""

        mongoose.connect(dbEnvUrl)

        const connection = await mongoose.connection

        connection.on('connected' , () => (
           console.log('mongodb connected')
        )
        )

        connection.on('error' , (err) => {
           console.log('error in connection : '+ err)
          process.exit()
        }
        )


    } catch (error) {
        console.log("something went wrong")
        console.log(error)
    }
}