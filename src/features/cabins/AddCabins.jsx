import React from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddCabins = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open open="table">
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window open="table">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
    // <div>
    //   <Button onClick={() => setIsOpenModal((show) => !show)}>
    //     Add new Cabin
    //   </Button>
    //   {isOpenModal && (
    //     <Modal onClose={() => setIsOpenModal(false)}>
    //       <CreateCabinForm onClose={() => setIsOpenModal(false)} />
    //     </Modal>
    //   )}
    // </div>
  );
};

export default AddCabins;
