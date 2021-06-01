import { Component } from "react";
import "./App.css";
import SelectingDifficulty from "./components/SelectingDifficulty";
import QuizQuestions from "./components/QuizQuestions";

class QuizApp extends Component {
  state = {
    difficulty: "",
    isSelectDifficulty: false,
  };

  setDifficulty = (value) => {
    this.setState({
      difficulty: value,
      isSelectDifficulty: true,
    });
  };

  render() {
    const { isSelectDifficulty, difficulty } = this.state;
    return (
      <div className="app-container">
        <div className="quiz-container">
          {isSelectDifficulty ? (
            <QuizQuestions difficulty={difficulty} />
          ) : (
            <SelectingDifficulty setDifficulty={this.setDifficulty} />
          )}
        </div>
      </div>
    );
  }
}

export default QuizApp;
