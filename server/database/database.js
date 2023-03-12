import mongoose from 'mongoose';
export const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@ecom.zncf0hw.mongodb.net/ecomm?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.log(`error ${error}`);
  }
};

export default Connection;
