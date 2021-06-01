import { Component } from "react";
import "./index.css";

class Option extends Component {
  state = {
    isOptionSelected: false,
    isCorrectOption: false,
  };
  onClickOption = (event) => {
    const userClickValue = event.target.value;
    const { correctAnswer, userClickCorrectAnswer } = this.props;
    if (userClickValue === correctAnswer) {
      this.setState({
        isCorrectOption: true,
        isOptionSelected: true,
      });
      userClickCorrectAnswer();
    } else {
      this.setState({
        isOptionSelected: true,
      });
    }
  };

  nextQuestion = () => {
    const { skipTheQuestion } = this.props;
    setTimeout(() => {
      skipTheQuestion();
    }, 1000);
  };

  render() {
    const { option } = this.props;
    const { isCorrectOption, isOptionSelected } = this.state;
    const value = isCorrectOption ? "correct" : "wrong";
    let classNameForOption = "";
    if (isOptionSelected) {
      classNameForOption = value;
      this.nextQuestion();
    }

    return (
      <button
        className={`option-button ${classNameForOption}`}
        type="button"
        value={option}
        onClick={this.onClickOption}
      >
        {option}
      </button>
    );
  }
}

export default Option;
