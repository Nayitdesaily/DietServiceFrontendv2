import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function ModalObservacion({modal, toggle, observacion}) {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
        {observacion}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
