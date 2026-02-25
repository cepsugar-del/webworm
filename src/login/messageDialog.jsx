import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function MessageDialog(person){
    return (
        <Modal {...person} show = {person.message} centered>
            <Modal.Body>{person.message}</Modal.Body>
            <Modal.Footer>
                <Button onClick={person.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}