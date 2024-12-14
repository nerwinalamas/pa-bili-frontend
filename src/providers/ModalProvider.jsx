import CreateProduct from "../components/modals/CreateProduct";
import UpdateProduct from "../components/modals/UpdateProduct";
import DeleteProduct from "../components/modals/DeleteProduct";

const ModalProvider = () => {
    return (
        <>
            <CreateProduct />
            <UpdateProduct />
            <DeleteProduct />
        </>
    );
};

export default ModalProvider;
