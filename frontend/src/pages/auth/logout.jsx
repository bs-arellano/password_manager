import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../reducers/authSlice"

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(logout())
        navigate("/")
    }, [dispatch, navigate])
}

export default Logout