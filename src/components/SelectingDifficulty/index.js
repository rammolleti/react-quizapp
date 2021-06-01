import { Component } from "react";
import "./index.css";

class SelectingDifficulty extends Component {
  state = {
    difficulty: "NONE",
  };

  renderTheDifficultyType = (event) => {
    let difficultyLevel = event.target.value;

    this.setState({
      difficulty: difficultyLevel,
    });
  };

  setDifficultyAndStartQuiz = () => {
    const { difficulty } = this.state;
    const { setDifficulty } = this.props;
    if (difficulty !== "NONE") {
      setDifficulty(difficulty);
    }
  };

  render() {
    const { difficulty } = this.state;
    return (
      <div className="quiz-selecting-section">
        <div className="title-section">
          <h1 className="quiz-selection-section-heading">Quiz</h1>
          <p className="side-headings ">
            Category:<span className="word-highlight"> Computer-Science</span>
          </p>
        </div>
        <div className="quiz-start-section">
          <p className="difficulty-side-heading">
            Difficulty: <span className="difficulty">{difficulty}</span>
          </p>
          <div className="buttons-container">
            <button
              value="easy"
              className="button easy-button"
              type="button"
              onClick={this.renderTheDifficultyType}
            >
              EASY
            </button>
            <button
              value="medium"
              className="button medius-button"
              type="button"
              onClick={this.renderTheDifficultyType}
            >
              MEDIUM
            </button>
            <button
              value="hard"
              className="button hard-button"
              type="button"
              onClick={this.renderTheDifficultyType}
            >
              HARD
            </button>
          </div>
          <button
            className="start-button"
            onClick={this.setDifficultyAndStartQuiz}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }
}

export default SelectingDifficulty;
