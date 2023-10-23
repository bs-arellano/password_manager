import { useDispatch, useSelector } from "react-redux";

import { openModal } from "../../reducers/modalSlice";
import { BACKEND_URL } from "../../config/constants";

import './list_item.css'

const ListItem = ({ text, data }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    return (
        <div className="list-item">
            <span>{text}</span>
            <a onClick={() => {
                const action = (params) => {
                    fetch(`${params.url}/credential/delete`, {
                        method: 'DELETE',
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'bearer ' + params.token,
                        },
                        body: JSON.stringify({ id: params.id }),
                    })
                    window.location.reload()
                }
                const displayData = {
                    title: `Sitio web: ${data.url}`,
                    content: {
                        "Nombre de usuario": data.userName,
                        "Contraseña": data.password
                    },
                    action: {
                        fun: action.toString(),
                        params: { display: "Eliminar" ,url: BACKEND_URL, id: data._id, token: token }
                    }
                }
                dispatch(openModal(displayData))
            }}>Ver</a>
        </div>
    )
}

export default ListItem