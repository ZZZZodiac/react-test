import React from "react";
import { loans } from "../../Data/Date";
import { heandleClick } from "../../Data/ProjectLogic";
import ContentItem from "./ContentItem/ContentItem";
import './MainContent.css'

 class MainContent extends React.Component{

  state={
    showWindow: false,
    loansArr: loans
  }

  togglePopUp = ()=>{
    this.setState((state )=>{
        return{
            showWindow: !state.showWindow
        }
    })
  }

    render(){
        const userLoans = this.state.loansArr.map((item)=>{
            return(
            <ContentItem
                 key={item.id}
                 title={item.title}
                 tranche={item.tranche}
                 available={item.available}
                 annualised_return={item.annualised_return}
                 ltv={item.ltv}
                 amount={item.amount}
            />
             
            )
          })
        return(
            <>
                {userLoans}
                <button onClick={this.togglePopUp}>popUp</button>
            {this.state.showWindow ? <>
                <div className="amount">
                <div className="amount-block">
                <div className="amount-text"><p>Total amount available for investment:</p></div>
                <div className="coast"><span>$238,456</span></div>
               </div>
            </div>
            </>:null}   
               
            </>
        )
    }
} 

export default MainContent;
