import React from "react";
import jsonData from "../../Data/current-loans.json";
import { heandleClick } from "../../Data/ProjectLogic";
import ContentItem from "./ContentItem/ContentItem";
import ModalWindow from "./ContentItem/ModalWindow";
import "./MainContent.css";

class MainContent extends React.Component {
  state = {
    showWindow: false,
    loansArr: jsonData.loans,
    selectedBlock: {}
  };

  showWindow = () => {
    this.setState((state) => {
      return {
        showWindow: true,
      };
    });
  };

  hideWindow = () => {
    this.setState((state) => {
      return {
        showWindow: false,
      };
    });
  };

  heandleEscape = (e) => {
    if (e.key === "Escape" && this.state.showWindow) {
      this.hideWindow();
    }
  };

  componentDidMount = () => {
    window.addEventListener("keyup", this.heandleEscape);
  };

  componentWillUnmount() {
    window.removeEventListener("keyup", this.heandleEscape);
  }
  
  handleSelectBlock =(block)=>{
    this.setState((state) => {
      return {
        selectedBlock: block
      };
    });
  }

  render() {
    console.log(this.state.selectedBlock)
    const userLoans = this.state.loansArr.map((item) => {
      return (
        <ContentItem
          key={item.id}
          title={item.title}
          tranche={item.tranche}
          available={item.available}
          annualised_return={item.annualised_return}
          ltv={item.ltv}
          amount={item.amount}
          showWindow={() => this.showWindow()}
          handleSelectBlock = {()=>this.handleSelectBlock(item)}
        />
      );
    });
    return (
      <>
        {this.state.showWindow ? (
          <ModalWindow hideWindow={this.hideWindow} selectedBlock={this.state.selectedBlock}/>
        ) : null}
        {userLoans}

        <div className="amount">
          <div className="amount-block">
            <div className="amount-text">
              <p>Total amount available for investment:</p>
            </div>
            <div className="coast">
              <span>$238,456</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MainContent;
