import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionList, setQuestionList] = useState([]);

  useEffect(loadData,[]);
  function loadData() {
    let url="http://localhost:4000/questions";
    fetch(url)
      .then(r=>r.json())
      .then(data=>setQuestionList([...data]))
      .catch(e=>console.error("Error: " + e));
  }

  function handleDelete(id) {
    let url=`http://localhost:4000/questions`;
    fetch(url + "/" + id, {
      method: 'DELETE',
    })
      .then(r => r.json())
      .then(loadData)
      .catch((e)=>console.log("Error: " + e));
  }

  function handleChangeCorrect(id,value) {
    let url = "http://localhost:4000/questions";
    fetch(url + "/" + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "correctIndex": value
      })
    })
      .then(r=>r.json())
      .then(loadData)
      .catch(e=>console.error("Error :" + e));
  
  }
  
  const questionToDisplay = questionList.map((item,index)=>{
    return (
      <li key={index}><QuestionItem key={index} 
                                    question={item} onDelete={handleDelete}
                                    changeCorrect={handleChangeCorrect}
      /></li>
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        { questionToDisplay/* display QuestionItem components here after fetching */}
      </ul>
    </section>
  );
}

export default QuestionList;
