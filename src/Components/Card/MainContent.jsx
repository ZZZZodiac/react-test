import React from "react";
import jsonData from "../../Data/current-loans.json";
import { PrepareData } from "../../Data/DataLogic";
import ContentItem from "./ContentItem/ContentItem";
import ModalWindow from "./ContentItem/ModalWindow";
import "./MainContent.css";
import _ from "lodash";

class MainContent extends React.Component {
  state = {
    showWindow: false,
    loansArr: PrepareData(jsonData.loans),
    selectedBlock: {},
  };

  sumAvailable = () => {
    return _.sumBy(this.state.loansArr, (element) => element.available);
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
      state.showWindow = false;
      return state;
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

  handleSelectBlock = (block) => {
    this.setState((state) => {
      state.selectedBlock = block;
      return state;
    });
  };

  editSelectBlock = (updateBlock) => {
    const loan = this.state.loansArr.find(elem => elem.id === updateBlock.id);
    loan.available = loan.available - updateBlock.invested;
    loan.isInvested = true;
    this.setState((state) => state);
    this.hideWindow();
  };

  render() {
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
          isInvested={item.isInvested}
          showWindow={() => this.showWindow()}
          handleSelectBlock={() => this.handleSelectBlock(item)}
        />
      );
    });
    return (
      <>
        {this.state.showWindow ? (
          <ModalWindow
            hideWindow={this.hideWindow}
            selectedBlock={this.state.selectedBlock}
            editSelectBlock={this.editSelectBlock}
          />
        ) : null}
        {userLoans}

        <div className="amount">
          <div className="amount-block">
            <div className="amount-text">
              <p>Total amount available for investment:</p>
            </div>
            <div className="coast">
              <span>${this.sumAvailable()}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MainContent;
