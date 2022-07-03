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

  handleSelectBlock = (block) => {
    this.setState((state) => {
      return {
        selectedBlock: block,
      };
    });
  };

  editSelectBlock = (updateBlock) => {
    const temp = [...this.state.loansArr];
    temp = updateBlock;
    console.log(temp);
    this.this.setState({
      loansArr: temp,
    });
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
            editSelectBlock={this.state.editSelectBlock}
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
