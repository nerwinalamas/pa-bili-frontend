import CreateProduct from "../components/modals/CreateProduct";
import UpdateProduct from "../components/modals/UpdateProduct";
import DeleteProduct from "../components/modals/DeleteProduct";
import ViewOrder from "../components/modals/ViewOrder";
import UpdateOrder from "../components/modals/UpdateOrder";

const ModalProvider = () => {
    return (
        <>
            <CreateProduct />
            <UpdateProduct />
            <DeleteProduct />
            <ViewOrder />
            <UpdateOrder />
        </>
    );
};

export default ModalProvider;
