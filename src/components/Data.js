import React from "react";

export default class Data extends React.Component {

    render(){
        return (
            <>
            <h2>date : {this.props.date}</h2>
               <div>
                Afcancer: {this.props.afcancer} -  
                Afinf: {this.props.afinf} - 
                age: {this.props.age} - 
                alcool: {this.props.alcool} -
                avc: {this.props.avc} - 
                diab : {this.props.diab} - 
                diet : {this.props.diet} 
                </div>
                
                <div>
                glyc : {this.props.glyc} -
                hdl : {this.props.hdl} -
                height : {this.props.height} -
                inf : {this.props.inf} -
                sex : {this.props.sex} -
                smoking : {this.props.smoking} -
                sport : {this.props.sport} -
                syst : {this.props.syst} -
                weight : {this.props.weight}
                </div>

            </>
        )
    }

}