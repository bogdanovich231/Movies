import { Component } from 'react';
import './ErrorMessage.scss';

class ShowError extends Component<Record<string, never>, { showError: boolean }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { showError: false };
  }
  showError = () => {
    this.setState({ showError: true });
  };
  render() {
    if (this.state.showError) {
      throw new Error('Test error.');
    }
    return (
      <button className="show_err_btn" onClick={this.showError}>
        Show Error
      </button>
    );
  }
}

export default ShowError;
