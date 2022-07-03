import React from "react";
import "./ContentItem.css";

const ContentItem = (props) => {

  const showEditWindow = ()=>{
    props.handleSelectBlock();
    props.showWindow();
  }

  return (
    <div className="main-items">
      <div className="main-item">
        <div className="main-text">
          <div>
            <h2>{props.title}</h2>
          </div>
          <div>
            <p>Tranche: {props.tranche}</p>
          </div>
          <div>
            <p>Available: {props.available}</p>
          </div>
          <div>
            <p>Annualised return: {props.annualised_return}</p>
          </div>
          <div>
            <p>Lifetime Value: {props.ltv}</p>
          </div>
          <div>
            <p>Amount: {props.amount}</p>
          </div>
        </div>
        <div className="main-btn">
          <button
            onClick={showEditWindow}
            type="button"
            className="button"
            id="btn"
          >
            <p>INVEST</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
