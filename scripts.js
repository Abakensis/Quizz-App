let rightAns;
  
let rightNumber;

if (localStorage.rightNumber === undefined) {
rightNumber = 0;  
} else {
    rightNumber = localStorage.rightNumber;
};
let falseNumber;
if (localStorage.falseNumber === undefined) {
    falseNumber = 0;  
    } else {
        falseNumber = localStorage.falseNumber;
    };
   
    
// ecouteur d'evennements 
document.addEventListener('DOMContentLoaded', function () {
    // on lance la fonction qui charge les question
    addQuestion();
    // on lance les ecouteurs d'evennements
    eventListeners();
});

eventListeners = () => {
    document.querySelector('#check').addEventListener('click', validateAnswer);
    document.querySelector('#clear').addEventListener('click', clear);

};

addQuestion = () => {
    //url
    const url = 'https://opentdb.com/api.php?amount=1';
    // fetch
    fetch(url)
    //recuperation des donées
        .then(data => data.json())
        //traitement des données fonction showquestion
        .then(result => showQuestion(result.results));
};
// traitement des données 
showQuestion = questions => {

    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col');

    questions.forEach(question => {
        rightAns = question.correct_answer;

        let possibleAnswers = question.incorrect_answers;
        possibleAnswers.splice(Math.floor(Math.random() * 3), 0, rightAns);

        questionHTML.innerHTML = `<div class="container justify-content-between heading bg-light mt-5">
        <div class="row">
        <div class="col-6 text-start "><p class="category  ">Category:${question.category}</p></div>
        <div class="scores col-6 text-end">  <span class="badge badge-primary bg-success pt-3 pb-3 ">${rightNumber}</span>
        <span class="badge badge-warning bg-danger pt-3 pb-3 ">${falseNumber}</span></div>

        </div>
        <div class="row">
         <h2 class="text-center">${question.question}</h2>
        </div>`

        const answerDiv = document.createElement('div');
        answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4');
        possibleAnswers.forEach(answer => {
            const answerHTML = document.createElement('div');
            answerHTML.classList.add('col-5', 'btn','btn-outline-warning','m-1','text-center','text-black');
            answerHTML.textContent = answer;

            answerHTML.onclick = (selectAnswer);
        
            answerDiv.appendChild(answerHTML);
        })
        questionHTML.appendChild(answerDiv);

        document.querySelector('#app').appendChild(questionHTML);
    })
}
selectAnswer = (e) => {
    if (document.querySelector('.active')) {
        const activeAnswer = document.querySelector('.active');
        activeAnswer.classList.remove('active');
    }

    e.target.classList.add('active');
}
validateAnswer = () => {
    if (document.querySelector('.questions .active')) {

        verifyAnswer();

    } else {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger', 'col-md-6');
        errorDiv.textContent = "Please select Answer";
        const questionsDiv = document.querySelector('.questions');
        questionsDiv.appendChild(errorDiv);

        setTimeout(() => {
            document.querySelector('.alert-danger').remove();
        }, 2000);

    }
}
// verification de la reponse
verifyAnswer = () => {
    // Incrementation des comptes 
    const userAnswer = document.querySelector('.questions .active');
    if (userAnswer.textContent === rightAns) {
       
        rightNumber++;
        localStorage.rightNumber = rightNumber;
    } else {
      
        falseNumber++;
        localStorage.falseNumber = falseNumber;
    }
// retrait de la question et des reponsense
    const app = document.querySelector('#app');
    while (app.firstChild) {
        app.removeChild(app.firstChild);
    }
    // relance d'une nouvelle question 
    addQuestion();
}
// reinitialisation des comptes 
clear = () => {
 document.getElementById('app').remove;
    localStorage.rightNumber = 0;
    rightNumber = localStorage.rightNumber
    localStorage.falseNumber = 0;
    falseNumber = localStorage.falseNumber
    console.log(rightNumber);
    console.log(falseNumber)
    // relance d'une nouvelle question 
    addQuestion();
    location.reload()
}
