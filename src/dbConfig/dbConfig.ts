import mongoose from "mongoose";

export async function connect() {
    try {
        const dbEnvUrl = process.env.MONGO_URL?process.env.MONGO_URL : ""

        mongoose.connect(dbEnvUrl)

        const connection = mongoose.connection

        connection.on('connected' , () => {
          return console.log('mongodb connected')
        }
        )

        connection.on('error' , (err) => {
          return console.log('error in connection : '+ err)
          process.exit()
        }
        )


    } catch (error) {
        console.log("something went wrong")
        console.log(error)
    }
}