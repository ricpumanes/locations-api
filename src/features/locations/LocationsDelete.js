import React from "react";
import { useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import { useDispatch, useSelector } from "react-redux";

import { name, reducer, actions } from "./slice";
import saga from "./saga";

import { DeleteModalButtonsWrapper } from "./styles";

import Modal from "../../utils/components/Modal";

const LocationsDelete = ({ info }) => {
  useInjectReducer({ key: name, reducer });
  useInjectSaga({ key: name, saga });

  const dispatch = useDispatch();

  const [showModal, setShowModal] = React.useState(false);

  const onDelete = () => {
    dispatch(actions.delete({ id: info?.id }));
    const t = setTimeout(() => {
      setShowModal(false);
      if (t) clearTimeout(t);
    }, 500);
  };

  return (
    <>
      <button
        className="edit-location-btn"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <FaTrashAlt className="icon" /> Delete
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        shouldCloseOnOverlayClick={false}
        width="35%"
      >
        <h1>Delete Item</h1>
        <p>Are you sure you want to delete this item?</p>
        <DeleteModalButtonsWrapper>
          <button type="button" onClick={() => setShowModal(false)}>
            No
          </button>

          <button type="button" onClick={onDelete}>
            Yes
          </button>
        </DeleteModalButtonsWrapper>
      </Modal>
    </>
  );
};

export default LocationsDelete;
