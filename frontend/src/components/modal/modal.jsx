import { useSelector, useDispatch } from "react-redux";
import Container from "../container/container";

import { closeModal } from "../../reducers/modalSlice";

import './modal.css'

const Modal = () => {

    const dispatch = useDispatch();

    const isModalOpen = useSelector(state => state.modal.isModalOpen);
    const modalTitle = useSelector(state => state.modal.modalTitle);
    const modalContent = useSelector(state => state.modal.modalContent);
    const modalAction = useSelector(state => state.modal.modalAction)
    const action = modalAction ? eval(modalAction.fun) : eval('()=>{}')
    const params = modalAction ? modalAction.params : ""

    const handleClose = () => {
        dispatch(closeModal());
    };
    const tableRows = modalContent ? Object.keys(modalContent)
        .filter((key) => key !== 'title')
        .map((key) => (
            <tr key={key}>
                <td><strong>{key}:</strong></td>
                <td>{modalContent[key]}</td>
            </tr>
        )) : null

    return (
        isModalOpen && (
            <div className="modal">
                <Container className="modal-content">
                    <button className="close-button" onClick={handleClose}>X</button>
                    <h2>{modalTitle}</h2>
                    <div className="table-container">
                        <table>
                            <tbody>
                                {tableRows}
                            </tbody>
                        </table>
                    </div>
                    <button className="Button" onClick={(e) => {
                        action(params)
                    }}>{params.display}</button>
                </Container>
                <div className="modal-overlay" onClick={handleClose}></div>
            </div>
        )
    )
}

export default Modal