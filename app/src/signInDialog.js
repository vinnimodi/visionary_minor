import { Dialog } from '@mui/material';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { styled } from '@mui/material';
import { authenticateSignUp, authenticateLogin } from './service/api';
import { useState } from 'react';
import { useContext } from 'react';
import { DataContext } from './context/DataProvider';

const Component = styled(Box)`
  height: 65vh;
  width: 80vh;
`;

const Image = styled(Box)`
  background: #2874f0
    url(https://www.bostonsight.org/wp-content/uploads/2021/06/Person-with-low-vision.jpg)
    center 10%;
  height: 100%;
  width: 20%;
  padding: 45px 35px;
  color: #000;
  & > p,
  & > h5 {
    font-weight: 600;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #f44336;
  color: #fff;
  height: 48px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const RequestOtpButton = styled(Button)`
  text-transform: none;
  background: #0000ff;
  color: #fff;
  height: 48px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const CreateAccount = styled(Typography)`
  font-size: 14px;
  color: #008cba;
  text-align: center;
  cursor: pointer;
`;

/*              <Typography variant="h5">Login</Typography><Typography style={{ marginTop: 20 }}>
Get Access to your account
</Typography>*/
//style={{ display: 'flex', height: '100vh' }}

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  margin-top: 5px;
  font-weight: 500;
`;
const accountInitialValue = {
  login: {
    view: 'login',
  },
  signup: {
    view: 'signup',
  },
};

const CustomerDetails = {
  firstName: '',
  lastName: '',
  MobileNumber: '',
  email: '',
  password: '',
  username: '',
};

const loginInitialValue = {
  username: '',
  password: '',
};

const SignUp = ({ open, setOpen }) => {
  const [account, toggleAccount] = useState(accountInitialValue.signup);

  const [customer, setcustomerSignUp] = useState(CustomerDetails);

  const { setAccount } = useContext(DataContext);

  const [loginCustomer, setLogin] = useState(loginInitialValue);

  const [error, setError] = useState(false);
  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValue.signup);
    setError(false);
  };

  const toggleSignUp = () => {
    toggleAccount(accountInitialValue.signup);
  };

  const toggleLogin = () => {
    toggleAccount(accountInitialValue.login);
  };

  const onInputChange = (e) => {
    setcustomerSignUp({
      ...customer,
      [e.target.name]: e.target.value,
    });
    //console.log(customer);
  };

  const signUpCustomer = async () => {
    let response = await authenticateSignUp(customer);
    if (!response) return;
    handleClose();
    setAccount(customer.firstName);
  };

  const OnValueChange = (e) => {
    setLogin({ ...loginCustomer, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await authenticateLogin(loginCustomer);
    console.log(response);
    if (response.status === 200) {
      handleClose();
      setAccount(response.data.data.firstName);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 'unset', maxHeight: 'unset' },
        }}
      >
        <Component>
          <Box
            style={{
              display: 'flex',
              height: '100%',
            }}
          >
            <Image></Image>
            {account.view === 'signup' ? (
              <Wrapper>
                <TextField
                  variant="standard"
                  label="Enter First Name"
                  name="firstName"
                  onChange={(e) => onInputChange(e)}
                ></TextField>

                <TextField
                  variant="standard"
                  label="Enter Last Name"
                  name="lastName"
                  onChange={(e) => onInputChange(e)}
                ></TextField>

                <TextField
                  variant="standard"
                  label="Enter Email"
                  name="email"
                  onChange={(e) => onInputChange(e)}
                ></TextField>

                <TextField
                  variant="standard"
                  label="Enter Mobile Number"
                  name="MobileNumber"
                  onChange={(e) => onInputChange(e)}
                ></TextField>

                <TextField
                  variant="standard"
                  label="Enter Password"
                  name="password"
                  onChange={(e) => onInputChange(e)}
                ></TextField>

                <TextField
                  variant="standard"
                  label="Enter username"
                  name="username"
                  onChange={(e) => onInputChange(e)}
                ></TextField>

                <LoginButton onClick={() => signUpCustomer()}>
                  Continue
                </LoginButton>

                <Text>
                  By continuing, you agree to Flipkart's Terms of Use and
                  Privacy Policy.
                </Text>
                <RequestOtpButton onClick={() => toggleLogin()}>
                  {' '}
                  Existing User Login
                </RequestOtpButton>
              </Wrapper>
            ) : (
              <Wrapper>
                <TextField
                  variant="standard"
                  label="Enter username"
                  name="username"
                  onChange={(e) => OnValueChange(e)}
                ></TextField>
                {error && (
                  <Error>Please enter valid username or password</Error>
                )}
                <TextField
                  variant="standard"
                  label="Enter Password"
                  name="password"
                  onChange={(e) => OnValueChange(e)}
                ></TextField>

                <Text>
                  By continuing, you agree to Flipkart's Terms of Use and
                  Privacy Policy.
                </Text>

                <LoginButton onClick={() => loginUser()}>Login</LoginButton>
                <Typography style={{ textAlign: 'center', color: '#000' }}>
                  {' '}
                  Or
                </Typography>
                <RequestOtpButton>Request OTP</RequestOtpButton>
                <CreateAccount onClick={() => toggleSignUp()}>
                  New to Visionary ? Create an account
                </CreateAccount>
              </Wrapper>
            )}
          </Box>
        </Component>
      </Dialog>
    </div>
  );
};
export default SignUp;
