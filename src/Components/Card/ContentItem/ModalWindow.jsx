import React from "react";
import "./ModalWidow.css";

class ModalWindow extends React.Component {
  state = {
    investment_amount: "",
    id: this.props.selectedBlock.id,
    title: this.props.selectedBlock.title,
    available: this.props.selectedBlock.available,
    term_remaining: this.props.selectedBlock.term_remaining,
  };

  handleInvest = (e) => {
    this.setState({
      investment_amount: e.target.value,
    });
  };

  saveBlock = (e) =>{
    e.preventDefault()
    const block = {
      id: this.state.id,
      invested: this.state.investment_amount
    }

    this.props.editSelectBlock(block);
  }

  render() {
    const hideWindow = this.props.hideWindow;
    return (
      <>
        <div className="modal-widdow">
          <form action="" className="form-items" onSubmit={e => this.saveBlock(e)}>
            <div>
              <button type="button" className="cross" onClick={() => hideWindow()}>
                &#10006;
              </button>
            </div>
            <div className="invest-loan">
              <h2>Invest in Loan</h2>
            </div>
            <div>
              <p>{this.state.title}</p>
            </div>
            <div className="amount-avaible">
              <p>Amount available: ${this.state.available}</p>
            </div>
            <div className="loan-terms">
              <p>
                Loan ends in: <span>{this.state.term_remaining}</span>
                {/* didn't get how to interpret this value */}
              </p>
            </div>
            <div> </div>
            <div className="invest-title">
              <h2>Investment amount</h2>
            </div>
            <div className="input-button">
              <div>
                <input
                  type="number"
                  name="sum"
                  placeholder="1000"
                  min={1}
                  max={this.state.available}
                  value={this.state.investment_amount}
                  onChange={this.handleInvest}
                  required
                />
              </div>
              <div>
                <button type="submit" className="button">
                  <p>invest</p>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="overlay"></div>
      </>
    );
  }
}

export default ModalWindow;
