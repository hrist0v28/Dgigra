
let data = {};
let currentQuestion = null;

fetch('questions.json')
.then(r=>r.json())
.then(json=>{
    data = json;
    renderCategories();
});

function renderCategories(){
    const container = document.getElementById('categories');
    container.innerHTML = '';

    Object.keys(data).forEach(category=>{
        const btn = document.createElement('button');
        btn.className='category-btn';
        btn.innerText = category;
        btn.onclick=()=>openQuestion(category);
        container.appendChild(btn);
    });
}

function openQuestion(category){
    const questions = data[category];
    currentQuestion = questions[Math.floor(Math.random()*questions.length)];

    const shuffled = [...currentQuestion.answers].sort(()=>Math.random()-0.5);

    document.getElementById('categoryTitle').innerText = category;
    document.getElementById('question').innerText = currentQuestion.question;

    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML='';

    shuffled.forEach(answer=>{
        const btn = document.createElement('button');
        btn.className='answer-btn';
        btn.innerText=answer;
        btn.onclick=()=>showFacts(answer);
        answersDiv.appendChild(btn);
    });

    document.getElementById('questionScreen').classList.remove('hidden');
    document.getElementById('videoScreen').classList.add('hidden');
    document.getElementById('categories').classList.add('hidden');
}

function showFacts(selected){
    document.getElementById('questionScreen').classList.add('hidden');
    document.getElementById('videoScreen').classList.remove('hidden');

    const factsDiv = document.getElementById('facts');
    factsDiv.innerHTML='';

    Object.entries(currentQuestion.facts).forEach(([answer,fact])=>{
        const div = document.createElement('div');
        div.className='fact';
        div.innerHTML=`<strong>${answer}</strong><br>${fact}`;
        factsDiv.appendChild(div);
    });

    document.getElementById('correctReveal').innerText =
    `🎉 Верният отговор е: ${currentQuestion.correct}`;
}

function backToMenu(){
    document.getElementById('videoScreen').classList.add('hidden');
    document.getElementById('categories').classList.remove('hidden');
}
