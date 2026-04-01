// fitness application logic
document.addEventListener('DOMContentLoaded', () => {
    // state
    let userGoal = null;
    let userData = JSON.parse(localStorage.getItem('fitnessData')) || {};

    // screens
    const startScreen = document.querySelector('#start-screen');
    const formScreen = document.querySelector('#form-screen');

    // buttons
    const btnLose = document.querySelector('#goal-lose');
    const btnGain = document.querySelector('#goal-gain');
    const btnBack = document.querySelector('#back-to-goal');
    const fitnessForm = document.querySelector('#fitness-form');

    // navigation
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.querySelector(`#${screenId}`).classList.add('active');
    }

    // click events
    btnLose.addEventListener('click', () => {
        userGoal = 'lose';
        showScreen('form-screen');
    });

    btnGain.addEventListener('click', () => {
        userGoal = 'gain';
        showScreen('form-screen');
    });

    btnBack.addEventListener('click', () => {
        showScreen('start-screen');
    });

    // form submission
    fitnessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const data = {
            goal: userGoal,
            age: parseInt(document.querySelector('#age').value),
            gender: document.querySelector('#gender').value,
            weight: parseFloat(document.querySelector('#weight').value),
            height: parseInt(document.querySelector('#height').value),
            activity: parseFloat(document.querySelector('#activity').value)
        };

        localStorage.setItem('fitnessData', JSON.stringify(data));
        console.log('Saved data:', data);
        
        calculateResults(data);
    });

    function calculateResults(data) {
        // BMR (Mifflin-St Jeor Equation)
        let bmr;
        if (data.gender === 'male') {
            bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
        } else {
            bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
        }

        // TDEE
        const tdee = bmr * data.activity;
        
        // Target Calories
        let targetCalories;
        if (data.goal === 'lose') {
            targetCalories = tdee - 500; // 500 kcal deficit
        } else {
            targetCalories = tdee + 300; // 300 kcal surplus
        }

        console.log({ bmr, tdee, targetCalories });
        // results screen soon...
    }
});
