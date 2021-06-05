import React, { useState } from "react";

function QuestionForm(props) {
  const newFormData = {
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  };
  const [formData, setFormData] = useState(newFormData);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function makeQuestionRecord() {
    let questionRecord = {
      prompt: "",
      answers: [],
      correctIndex:0,
    }

    questionRecord.prompt = formData.prompt;
    questionRecord.answers[0] = formData.answer1;
    questionRecord.answers[1] = formData.answer2;
    questionRecord.answers[2] = formData.answer3;
    questionRecord.answers[3] = formData.answer4;
    questionRecord.correctIndex = formData.correctIndex;

    return questionRecord;
  }

  function validateForm(event) {
    if(formData.prompt === "") {
      alert("Prompt cannot be empty !");
      event.target.prompt.focus();
      return false;
    }
    if(formData.answer1 === "") {
      alert("All Answer are required !");
      event.target.answer1.focus();
      return false;
    }
    if(formData.answer2 === "") {
      alert("All Answer are required !");
      event.target.answer2.focus();
      return false;
    }
    if(formData.answer3 === "") {
      alert("All Answer are required !");
      event.target.answer3.focus();
      return false;
    }
    if(formData.answer4 === "") {
      alert("All Answer are required !");
      event.target.answer4.focus();
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm(event)) {
      addQuestion(makeQuestionRecord());
      setFormData(newFormData);
    }
  }

  function addQuestion(record){
    let url="http://localhost:4000/questions";
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
      .then(response => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
