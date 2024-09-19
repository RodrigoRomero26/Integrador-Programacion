//PRODUCTOS ============
import { productoActivo } from "../../main";
import {handleGetProductLocalStorage,setInLocalStorage,} from "../persistence/localStorage";
import { closeModal } from "../views/modal";
import { handleGetProductsToStore, handleRenderList } from "../views/store";
import Swal from "sweetalert2";

//GUARDAR
const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener("click", () => {
  handleSaveOrModifyElements();
});

//FUNCION DE GUARDAR
export const handleSaveOrModifyElements = () => {
  const nombre = document.getElementById("nombre").value;
  const imagen = document.getElementById("img").value;
  const precio = document.getElementById("precio").value;
  const categoria = document.getElementById("categoria").value;
  let object = null;
  if (productoActivo) {
    object = {
      ...productoActivo,
      nombre,
      imagen,
      precio,
      categoria,
    };
  } else {
    object = {
      id: new Date().toISOString(),
      nombre,
      imagen,
      precio,
      categoria,
    };
  }
  Swal.fire({
    title: "Correcto!",
    text: "Producto guardado correctamente!",
    icon: "success"
  });
  setInLocalStorage(object);
  handleGetProductsToStore();
  closeModal();
};

//ELIMINAR ELEMENTO
export const handleDeleteProduct = (id) => {
  Swal.fire({
    title: "¿Desea eliminar el elemento?",
    text: "Si lo eliminas sera permanente!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const products = handleGetProductLocalStorage();
      const result = products.filter((el) => el.id !== productoActivo.id);
      localStorage.setItem("products", JSON.stringify(result));
      const newProducts = handleGetProductLocalStorage();
      handleRenderList(newProducts);
      closeModal();
    } else{
      closeModal();
    }
  });

};
