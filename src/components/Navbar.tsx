import dayjs from "dayjs"
import {navLinks, navIcons} from "../constants/index"

const Navbar = () =>{
    return (
        <nav>
            <div>
            <img src="/images/logo.svg" alt="apple logo"/>
            <p className="font-bold">Shubham's Portfolio</p>

            <ul>
                {
                    navLinks.map(({id, name})=>(
                        <li key={id}>{name}</li>
                    )) 
                }
            </ul>
            </div>

            <div>
                <ul>
                    {navIcons.map(({id, img})=>(
                        <li key={id}>
                                <img src={img} className="icon-hover" alt={`icon-${id}`}/>
                        </li>
                    ))}
                </ul>
                 <time>{dayjs().format("ddd MMM D h:mm A")}</time>
            </div>
           
        </nav>
    )
    
}

export default Navbar