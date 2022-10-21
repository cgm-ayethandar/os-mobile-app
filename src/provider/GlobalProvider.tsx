import React, { createContext, useContext, useEffect, useState } from 'react';

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: any) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [groupItemsInCart, setGroupItemsInCart] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const initial = { cartProducts, setCartProducts, itemCount, setItemCount };

  const updateItemCount = () => {
    const groupItems = cartProducts.reduce((results, product) => {
      (results[product.id] = results[product.id] || []).push(product);
      return results;
    }, {});
    setGroupItemsInCart(groupItems);
    setItemCount(Object.keys(groupItemsInCart).length);
  }

  useEffect(() => {
    updateItemCount();
  }, [cartProducts])

  return (
    <GlobalContext.Provider value={initial}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalValue = () => useContext(GlobalContext);
