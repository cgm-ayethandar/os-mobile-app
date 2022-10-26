import React, { createContext, useContext, useEffect, useState } from 'react';

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: any) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [groupItemsInCart, setGroupItemsInCart] = useState(null);
  const [itemCount, setItemCount] = useState(0);

  const initial = { cartProducts, setCartProducts, itemCount, setItemCount };

  const getGroupItemsInCart = () => {
    return new Promise(async (resolve, reject) => {
  
      try {
        const groupItems = cartProducts.reduce((results, product) => {
          (results[product.id] = results[product.id] || []).push(product);
          return results;
        }, {});
        resolve(groupItems);
      } catch (error) {
        reject(console.log(error));
      }
    });
  };

  const updateItemCount = () => {
    // const groupItems = cartProducts.reduce((results, product) => {
    //   (results[product.id] = results[product.id] || []).push(product);
    //   return results;
    // }, {});
    getGroupItemsInCart().then((result) => {
      console.log(result);
      setGroupItemsInCart(result);
      setItemCount(Object.keys(groupItemsInCart).length);
    })
    .catch((e) => {
      // show error message
      console.log(e.message);
    });
    // setGroupItemsInCart(groupItems);
    // setItemCount(Object.keys(groupItemsInCart).length);
  }
  

  // useEffect(() => {
  //   updateItemCount();
  //   console.log("global");
  // console.log(groupItemsInCart);
  // console.log(itemCount);
  // }, [cartProducts]);

  return (
    <GlobalContext.Provider value={initial}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalValue = () => useContext(GlobalContext);
