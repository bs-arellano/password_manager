import './listItem.css'

const ListItem = ({text, data}) => {
    return(
        <div className="list-item">
            <span>{text}</span>
            <a onClick={()=>{
                console.log(data);
            }}>Ir</a>
        </div>
    )
}

export default ListItem