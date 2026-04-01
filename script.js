// fitness application logic
document.addEventListener('DOMContentLoaded', () => {
    // state
    let userGoal = null;
    let userData = JSON.parse(localStorage.getItem('fitnessData')) || null;

    // screens
    const startScreen = document.querySelector('#start-screen');
    const formScreen = document.querySelector('#form-screen');
    const resultsScreen = document.querySelector('#results-screen');

    // buttons
    const btnLose = document.querySelector('#goal-lose');
    const btnGain = document.querySelector('#goal-gain');
    const btnBack = document.querySelector('#back-to-goal');
    const btnEdit = document.querySelector('#edit-data');
    const fitnessForm = document.querySelector('#fitness-form');

    // navigation
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.querySelector(`#${screenId}`).classList.add('active');
    }

    // goal selection
    btnLose.addEventListener('click', () => {
        userGoal = 'lose';
        showScreen('form-screen');
    });

    btnGain.addEventListener('click', () => {
        userGoal = 'gain';
        showScreen('form-screen');
    });

    btnBack.addEventListener('click', () => showScreen('start-screen'));
    btnEdit.addEventListener('click', () => showScreen('form-screen'));

    // tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.querySelector(`#${btn.dataset.tab}`).classList.add('active');
        });
    });

    // initial load from storage
    if (userData) {
        userGoal = userData.goal;
        populateForm(userData);
        calculateResults(userData);
        showScreen('results-screen');
    }

    function populateForm(data) {
        document.querySelector('#age').value = data.age;
        document.querySelector('#gender').value = data.gender;
        document.querySelector('#weight').value = data.weight;
        document.querySelector('#height').value = data.height;
        document.querySelector('#activity').value = data.activity;
    }

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
        calculateResults(data);
        showScreen('results-screen');
    });

    function calculateResults(data) {
        // BMR (Mifflin-St Jeor)
        let bmr;
        if (data.gender === 'male') {
            bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
        } else {
            bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
        }

        const tdee = Math.round(bmr * data.activity);
        const targetKcal = data.goal === 'lose' ? tdee - 500 : tdee + 300;

        document.querySelector('#result-title').textContent = data.goal === 'lose' ? 'Plan: Redukcja' : 'Plan: Budowa Masy';
        document.querySelector('#tdee-val').textContent = `${tdee} kcal`;
        document.querySelector('#target-kcal-val').textContent = `${targetKcal} kcal`;

        renderPlan(data.goal, targetKcal);
    }

    function renderPlan(goal, calories) {
        const dietList = document.querySelector('#diet-list');
        const foodList = document.querySelector('#food-list');
        const workoutDesc = document.querySelector('#workout-desc');
        const tipsList = document.querySelector('#tips-list');

        if (goal === 'lose') {
            // REDUKCJA
            dietList.innerHTML = `
                <div class="meal-item"><h4>Śniadanie</h4><p>Omlet z warzywami i 2 kromki chleba pełnoziarnistego.</p></div>
                <div class="meal-item"><h4>II Śniadanie</h4><p>Skyr z owocami jagodowymi i garścią orzechów.</p></div>
                <div class="meal-item"><h4>Obiad</h4><p>Pieczony kurczak (150g), kasza gryczana (50g), duża porcja surówki.</p></div>
                <div class="meal-item"><h4>Kolacja</h4><p>Twarożek z rzodkiewką i szczypiorkiem, lekka sałatka.</p></div>
            `;
            foodList.innerHTML = `
                <li>Chude mięso (kurczak, indyk)</li>
                <li>Ryby (dorsz, tuńczyk)</li>
                <li>Warzywa bez ograniczeń</li>
                <li>Owoce o niskim IG</li>
                <li>Płatki owsiane, kasze</li>
            `;
            workoutDesc.innerHTML = `
                <p><b>Cardio:</b> 3-4 razy w tygodniu po 30-40 min (marszobieg, rower).</p>
                <p><b>Siłowy:</b> 2 razy w tygodniu trening FBW (całe ciało) z mniejszym obciążeniem.</p>
                <p><b>NEAT:</b> Staraj się robić minimum 10 000 kroków dziennie.</p>
            `;
            tipsList.innerHTML = `
                <div class="tip-card"><b>Woda</b> Pij minimum 2-3 litry wody dziennie.</div>
                <div class="tip-card"><b>Sen</b> Śpij 7-8h dla regeneracji hormonalnej.</div>
                <div class="tip-card"><b>Białko</b> Dbaj o wysoką podaż białka (ok. 1.8g/kg), by chronić mięśnie.</div>
            `;
        } else {
            // MASA
            dietList.innerHTML = `
                <div class="meal-item"><h4>Śniadanie</h4><p>Owsianka na mleku z masłem orzechowym, bananem i odżywką białkową.</p></div>
                <div class="meal-item"><h4>II Śniadanie</h4><p>Serek wiejski z dżemem, 2 banany lub kanapki z szynką i serem.</p></div>
                <div class="meal-item"><h4>Obiad</h4><p>Stek wołowy lub łosoś, ryż (100g), awokado, warzywa korzeniowe.</p></div>
                <div class="meal-item"><h4>Kolacja</h4><p>Makaron pełnoziarnisty z sosem bolognese (chude mięso) i parmezanem.</p></div>
            `;
            foodList.innerHTML = `
                <li>Wołowina, tłuste ryby</li>
                <li>Ryż, makaron, ziemniaki</li>
                <li>Masło orzechowe, orzechy</li>
                <li>Odżywki białkowe / gainery</li>
                <li>Oliwa z oliwek do posiłków</li>
            `;
            workoutDesc.innerHTML = `
                <p><b>System:</b> Split (Góra/Dół) lub PPL (Push/Pull/Legs).</p>
                <p><b>Ciężar:</b> Skup się na progresji - co trening dodawaj 1-2kg na sztangę.</p>
                <p><b>Serie:</b> 3-4 serie po 8-12 powtórzeń dla hipertrofii.</p>
            `;
            tipsList.innerHTML = `
                <div class="tip-card"><b>Nadwyżka</b> Nie bój się jeść więcej, masa wymaga energii!</div>
                <div class="tip-card"><b>Progresja</b> Zapisuj swoje ciężary w notatniku.</div>
                <div class="tip-card"><b>Regeneracja</b> Mięśnie rosną podczas odpoczynku, nie na treningu.</div>
            `;
        }
    }
});
