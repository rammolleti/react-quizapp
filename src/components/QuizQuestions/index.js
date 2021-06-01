import { Component } from "react";
import "./index.css";
import Question from "../Question";

let correctAnswerCount = 0;
class QuizQuestion extends Component {
  state = {
    questionCount: 0,
    questionList: [],
    time: 10,
    question: "",
    isComplectedAllQuestion: false,
  };

  componentDidMount = async () => {
    await this.getDataFromApi();
    this.startTimer();
  };

  getDataFromApi = async () => {
    const { difficulty } = this.props;
    const url = `https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}&type=multiple`;

    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    const updateData = results.map((question) => ({
      category: question.category,
      correctAnswer: question.correct_answer,
      incorrectAnswers: question.incorrect_answers,
      question: question.question,
    }));

    this.setState({
      questionList: updateData,
    });
  };

  updateTime = () => {
    const { time } = this.state;
    if (time > 0) {
      this.setState({
        time: time - 1,
      });
    } else {
      this.moveNextQuestion();
    }
  };

  shufflingOptions = (correctAnswer, incorrectAnswers) => {
    let arrayOptions = [];
    if (correctAnswer !== undefined && incorrectAnswers !== undefined) {
      arrayOptions = [correctAnswer, ...incorrectAnswers];
      for (let index = arrayOptions.length - 1; index > 0; index--) {
        let random = Math.floor(Math.random() * (index + 1));
        let temp = arrayOptions[index];
        arrayOptions[index] = arrayOptions[random];
        arrayOptions[random] = temp;
      }
    }
    return arrayOptions;
  };
  userClickCorrectAnswer = () => {
    correctAnswerCount++;
  };

  moveNextQuestion = () => {
    clearInterval(this.timeInterval);
    this.setState({
      time: 10,
    });
    const { questionCount } = this.state;
    if (questionCount < 10) {
      this.startTimer();
    } else {
      this.setState({
        isComplectedAllQuestion: true,
      });
    }
  };

  startTimer = () => {
    const { questionList, questionCount } = this.state;
    const questionDetails = questionList[questionCount];
    const { question, correctAnswer, incorrectAnswers } = questionDetails;
    const shuffledOptions = this.shufflingOptions(
      correctAnswer,
      incorrectAnswers
    );
    const modifiedQuestion = {
      question,
      correctAnswer,
      shuffledOptions,
    };
    this.setState({
      question: modifiedQuestion,
      questionCount: questionCount + 1,
    });
    this.timeInterval = setInterval(this.updateTime, 1000);
  };

  renderHeaderSection = () => {
    const { questionCount, time } = this.state;

    return (
      <div className="header-container">
        <p className="header-side-headings">
          Question : <span className="question-count">{questionCount}/10</span>
        </p>
        <p className="header-side-headings">
          Timer : <span className="timer">{time} </span>sec
        </p>
      </div>
    );
  };

  renderResult = () => (
    <div className="result-container">
      <h1 className="result-heading">
        'You Got <span className="count">{correctAnswerCount}</span> Correct
        Answer'
      </h1>
    </div>
  );

  render() {
    const { question, isComplectedAllQuestion } = this.state;
    const isComplectAllQuestion = isComplectedAllQuestion ? false : true;
    return (
      <div className="quiz-questions-container">
        {isComplectAllQuestion ? (
          <>
            {this.renderHeaderSection()}
            <Question
              questionDetails={question}
              moveNextQuestion={this.moveNextQuestion}
              userClickCorrectAnswer={this.userClickCorrectAnswer}
            />
          </>
        ) : (
          this.renderResult()
        )}
      </div>
    );
  }
}

export default QuizQuestion;
