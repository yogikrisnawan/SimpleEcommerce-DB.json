import React,{Component} from "react"
import Axios from "../config/axios"

export default class DetailProduct extends Component{

    componentDidMount(){
        Axios.get (`/products/${this.props.match.params.idPrdct}}`)
    }

    render(){
        return(
            <div>
                <h1>DETAIL PRODUCT DENGAN ID : {this.props.match.params.idPrdct}</h1>
            </div>
        )
    }

}
