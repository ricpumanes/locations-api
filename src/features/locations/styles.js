import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem;

  #add-location-btn {
    margin-bottom: 2rem;
    padding: 5px 10px;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 5px;
    }
  }

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
    text-align: left;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;

  label {
    margin-bottom: 5px;
  }

  input {
    margin-bottom: 10px;
  }

  input,
  button[type="submit"] {
    padding: 0.5rem;
  }

  button[type="submit"] {
    margin-top: 15px;
  }
`;
