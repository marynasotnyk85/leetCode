/*
 <div class='category'>
    <h2>HTML</h2>
    <div  class='question'>
        <h3>StopWatch</h3>
    </div>
    <div  class='question'>
        <h3>ABC</h3>
    </div>
 </div >*/

 const API_BASE_URL = 'https://www.algoexpert.io/api/fe/submissions';

 fetchAndAppendQuestions();

 async function fetchAndAppendQuestions() {
    const questions = await fetchQuestions();
    const questionsByCategory = getQuestionsByCategory(questions);

    const wrapper = document.getElementById('wrapper');
    for (const [category, questions] of Object.entries(questionsByCategory)){
        const categoryDiv = createCategory(category, questions);
        wrapper.append(categoryDiv);
    }
 }

 async function fetchQuestions(){
    const response = await fetch(API_BASE_URL);
    const questions= await response.json();
    return questions;
 }

 function getQuestionsByCategory(questions) {
    const questionsByCategory = {};
    questions.forEach(question => {
        if(questionsByCategory.hasOwnProperty(question.category)){
            questionsByCategory[question.category].push(question)
        }
        else {
          questionsByCategory[question.category] = [question]
        }
    });
    return questionsByCategory;
 }

 function createCategory(category, questions) {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    const h2 = document.createElement('h2');
    h2.textContent = category;
    categoryDiv.append(h2);

    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        const h3 = document.createElement('h3');
        h3.textContent = question.name;

        questionDiv.append(h3);
        categoryDiv.append(questionDiv);  
    });
     return categoryDiv;
 }