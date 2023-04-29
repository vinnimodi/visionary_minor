import { createContext, useState } from 'react';
export const DataContext = createContext(null);

const Dataprovider = ({ children }) => {
  const [account, setAccount] = useState(JSON.parse(localStorage.getItem('account')) || {});
  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default Dataprovider;
