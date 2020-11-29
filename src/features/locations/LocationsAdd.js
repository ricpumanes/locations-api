import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import { useDispatch, useSelector } from "react-redux";

import { name, reducer, actions } from "./slice";
import saga from "./saga";

import { Form } from "./styles";

import Modal from "../../utils/components/Modal";

const LocationsAdd = () => {
  useInjectReducer({ key: name, reducer });
  useInjectSaga({ key: name, saga });

  const dispatch = useDispatch();

  const methods = useForm();
  const { handleSubmit, control, reset } = methods;

  const [showModal, setShowModal] = React.useState(false);

  const onSubmit = (data) => {
    dispatch(actions.create(data));
    const t = setTimeout(() => {
      reset();
      setShowModal(false);
      if (t) clearTimeout(t);
    }, 500);
  };

  return (
    <>
      <button
        id="add-location-btn"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <FaPlus className="icon" /> Add Item
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        shouldCloseOnOverlayClick={false}
        width="35%"
      >
        <h1>Add Item</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="location">Location:</label>
          <Controller
            name="location"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ value, onChange }) => (
              <input type="text" value={value} onChange={onChange} />
            )}
          />
          <label htmlFor="description">Description:</label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
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

export default LocationsAdd;
