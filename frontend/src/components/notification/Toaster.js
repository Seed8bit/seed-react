import React, {useState} from 'react';
import {Toast} from 'react-bootstrap';

export default function Toaster() {
  const [show, setShow] = useState(true);

  return (
    <Toast onClose={() => setShow(false)} show={show}>
      <Toast.Header>
        <strong className="mr-auto">Bootstrap</strong>
      </Toast.Header>
      <Toast.Body>Woohoo, you are reading this text in a Toast!</Toast.Body>
    </Toast>
  );
}
