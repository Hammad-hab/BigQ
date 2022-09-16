import { Toast, ToastContainer } from "react-bootstrap";

function Popover({ heading, body, show }) {
  return (
    <>
      {show.value !== false ? (
        <ToastContainer>
          <Toast>
            <Toast.Header onClick={() => show.set(false)}>
              <small className="me-auto">{heading}</small>
            </Toast.Header>

            <Toast.Body>{body}</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default Popover;
