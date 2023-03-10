import Customer from '../models/user-schema.js';

export const userSignUp = async (request, response) => {
  try {
    // to check if the username already exist
    const existUserName = await Customer.findOne({
      username: request.body.username,
    });

    if (existUserName) {
      return response.status(401).json({ message: 'username already exist' });
    }

    const existMobile = await Customer.findOne({
      MobileNumber: request.body.MobileNumber,
    });

    if (existMobile) {
      return response
        .status(401)
        .json({ message: 'MoblieNumber already exist' });
    }

    const existEmail = await Customer.findOne({
      email: request.body.email,
    });

    if (existEmail) {
      return response.status(401).json({ message: 'Email already exist' });
    }

    // if username entered is not existing one
    const customer = request.body;
    // taking the request body in customer variable
    const newCostumer = new Customer(customer);
    // creating an object of Customer type and intializing value with the request body

    // saving values in the data base
    await newCostumer.save();
    // giving status of acceptance to the user
    response.status(200).json({ message: customer });
  } catch (error) {
    // printing error respone
    response.status(500).json({ message: error });
  }
};

export const userLogin = async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    let custo = await Customer.findOne({
      username: username,
      password: password,
    });
    if (custo) {
      return response.status(200).json({ data: custo });
    } else {
      return response.status(401).json(`Invalid Login`);
    }
  } catch (error) {
    response.status(500).json(`error `, error.message);
  }
};
