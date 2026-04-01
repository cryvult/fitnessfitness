// fitness application logic
document.addEventListener('DOMContentLoaded', () => {
    // initial variables
    let userGoal = null;

    // elements
    const btnLose = document.querySelector('#goal-lose');
    const btnGain = document.querySelector('#goal-gain');

    // state management
    function setGoal(goal) {
        userGoal = goal;
        localStorage.setItem('fitnessGoal', goal);
        console.log('User goal set to: ' + goal);
    }

    // click events
    btnLose.addEventListener('click', () => {
        setGoal('lose');
    });

    btnGain.addEventListener('click', () => {
        setGoal('gain');
    });
});
