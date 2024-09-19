//=====LOCALSTORAGE====

//Traer productos localstorage
export const handleGetProductLocalStorage = () => {
  const products = JSON.parse(localStorage.getItem("products"));
  if (products) {
    return products;
  } else {
    return [];
  }
};

//guardar en localstorage
//Recibir el producto
export const setInLocalStorage = (productIn) => {
  if (productIn) {
    //Traer elementos
    let productsInLocal = handleGetProductLocalStorage();
    const existingIndex = productsInLocal.findIndex(
      (productsLocal) => productsLocal.id === productIn.id
    );

    //Verificar si el elemento existe
    if (existingIndex !== -1) {
      //si existe debe reemplazarse+
      productsInLocal[existingIndex] = productIn;
    } else {
      //si no existe agregarse
      productsInLocal.push(productIn);
    }
    localStorage.setItem("products", JSON.stringify(productsInLocal));
  }
};
