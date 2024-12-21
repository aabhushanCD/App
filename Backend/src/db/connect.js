import mongoose from "mongoose";
import { DB_name } from "../constants.js";
async function connect_DB() {
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGOOSE_URI}/${DB_name}`
    );
    console.log(
      `\n Database connected successfuly !!! DB HOST: ${ConnectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(
      `There is problem in connecting to Database mongoDB`,
      error.message
    );
    process.exit(1);
  }
}
export default connect_DB;
