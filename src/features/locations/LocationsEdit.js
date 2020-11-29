import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import { useDispatch, useSelector } from "react-redux";

import { name, reducer, actions } from "./slice";
import saga from "./saga";

import { Form } from "./styles";

import Modal from "../../utils/components/Modal";

const LocationsEdit = ({ info }) => {
  useInjectReducer({ key: name, reducer });
  useInjectSaga({ key: name, saga });

  const dispatch = useDispatch();

  const methods = useForm();
  const { handleSubmit, control } = methods;

  const [showModal, setShowModal] = React.useState(false);

  const onSubmit = (data) => {
    dispatch(actions.edit({ id: info?.id, ...data }));
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
        <FaRegEdit className="icon" /> Edit
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        shouldCloseOnOverlayClick={false}
        width="35%"
      >
        <h1>Edit Item</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="location">Location:</label>
          <Controller
            name="location"
            control={control}
            defaultValue={info?.location}
            rules={{ required: true }}
            render={({ value, onChange }) => (
              <input type="text" value={value} onChange={onChange} />
            )}
          />
          <label htmlFor="description">Description:</label>
          <Controller
            name="description"
            control={control}
            defaultValue={info?.description}
            rules={{ required: true }}
            render={({ value, onChange }) => (
              <input type="text" value={value} onChange={onChange} />
            )}
          />
          <button type="submit">Submit</button>
        </Form>
      </Modal>
    </>
  );
};

export default LocationsEdit;
