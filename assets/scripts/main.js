renderPage();
updateCreateBtn();
clearSchedule();

output.addEventListener('click', async (e) => {
    const deleteBtn = e.target.closest('.delete');
    const showBtn = e.target.closest('.show-recommendation');

    if (deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        const subject = subjects.find(s => s.id === id);
        if (!subject) return;

        const ok = await openConfirm({
            title: 'تأكيد الحذف',
            message: `هل أنت متأكد من حذف مادة "${subject.subjectName}"؟`,
            okText: 'حذف',
            danger: true
        });

        if (!ok) return;

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

reset.addEventListener('click', async () => {
    const ok = await openConfirm({
        title: 'تأكيد حذف الكل',
        message: 'هل أنت متأكد من حذف كل المواد؟',
        okText: 'حذف الكل',
        danger: true
    });

    if (!ok) return;

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
    let v = studentGrade.value.replace(/[^0-9.]/g, '');
    if (v.startsWith('.')) v = '0' + v;

    const firstDot = v.indexOf('.');
    if (firstDot !== -1) {
        v = v.slice(0, firstDot + 1) + v.slice(firstDot + 1).replace(/\./g, '');
    }

    studentGrade.value = v;
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