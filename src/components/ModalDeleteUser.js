import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { deleteUser } from "../services/UserService";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserEdit, handleDeleteUserFromModal } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const confirmDelete = async () => {
    let res = await deleteUser(dataUserEdit.id);
    if (res && +res.statusCode === 204) {
      handleDeleteUserFromModal(dataUserEdit);
      handleClose();
      toast.success("Delete succeed!");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
      setJob("");
    }
  }, [dataUserEdit]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Delete User: {name}?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
