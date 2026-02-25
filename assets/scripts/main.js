renderPage();
updateCreateBtn();
clearSchedule();

output.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete');
    const showBtn = e.target.closest('.show-recommendation');

    if (deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        subjects = subjects.filter(subject => subject.id !== id);
        calculatePriority();
        renderPage();
        saveInfo();
        updateCreateBtn();
        if (scheduleVisible) renderSchedule();
        return;
    }

    if (showBtn) {
        const id = Number(showBtn.dataset.id);
        const subject = subjects.find(s => s.id === id);
        if (!subject) return;

        const card = showBtn.closest('.subject-container');
        const recBox = card.querySelector('.recommendations');

        recBox.innerHTML = giveARecommendation(subject);
        recBox.classList.toggle('is-visible');
        return;
    }
});

addSubject.addEventListener('click', () => {
    clearErrors();
    formContainer.classList.add('is-open');
});

reset.addEventListener('click', () => {
    subjects = [];
    idCounter = 0;
    renderPage();
    saveInfo();
    updateCreateBtn();
    clearSchedule();
});

formClose.addEventListener('click', () => {
    clearErrors();
    formContainer.classList.remove('is-open');
    form.reset();
});

formContainer.addEventListener('click', (e) => {
    if (e.target === formContainer) {
        clearErrors();
        formContainer.classList.remove('is-open');
        form.reset();
    }
});

studentGrade.addEventListener('input', () => {
    studentGrade.value = studentGrade.value.replace(/[^0-9]/g, '');
});

if (createTable) {
    createTable.addEventListener('click', toggleSchedule);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkData()) return;
    saveData();
    calculatePriority();
    renderPage();
    saveInfo();
    updateCreateBtn();
    if (scheduleVisible) renderSchedule();
    form.reset();
    formContainer.classList.remove('is-open');
});