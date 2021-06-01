import { Component } from "react";

import "./index.css";
import Option from "../Option";

let key = 0;

class Question extends Component {
  state = {
    isOptionsUpdate: false,
    options: [],
  };

  skipTheQuestion = () => {
    const { moveNextQuestion } = this.props;
    moveNextQuestion();
  };

  setOptions = (shuffledOptions) => {
    this.setState({
      isOptionsUpdate: true,
    });
  };

  render() {
    const { isOptionsUpdate, options } = this.state;
    const { questionDetails, userClickCorrectAnswer } = this.props;
    const { question, shuffledOptions, correctAnswer } = questionDetails;
    let renderOptions = options;
    if (isOptionsUpdate === false && shuffledOptions !== undefined)
      this.setOptions(shuffledOptions);
    if (isOptionsUpdate) {
      renderOptions = shuffledOptions;
    }

    return (
      <div className="question-options-container">
        <h1 className="question">{question}</h1>
        <div className="option-container">
          {renderOptions.map((option) => (
            <Option
              option={option}
              correctAnswer={correctAnswer}
              skipTheQuestion={this.skipTheQuestion}
              userClickCorrectAnswer={userClickCorrectAnswer}
              key={key++}
            />
          ))}
        </div>
        <button
          className="submit-button"
          type="button"
          onClick={this.skipTheQuestion}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Question;
