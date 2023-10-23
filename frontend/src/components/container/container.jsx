import './container.css'

const Container = ({ children }) => {
    
    return(
        <div className="list-container">
            {children}
        </div>
    )
}

export default Container