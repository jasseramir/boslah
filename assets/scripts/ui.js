function updateCreateBtn() {
    if (!createTable) return;
    createTable.disabled = subjects.length < 3;
    if (subjects.length < 3) {
        clearSchedule();
    } else {
        syncCreateBtnText();
    }
}

function syncCreateBtnText() {
    if (!createTable) return;
    if (scheduleVisible) {
        createTable.innerHTML = `<i class="ri-delete-bin-6-line"></i>حذف الجدول`;
    } else {
        createTable.innerHTML = `<i class="ri-calendar-schedule-line"></i>إنشاء جدول`;
    }
}

function clearSchedule() {
    scheduleVisible = false;
    if (scheduleBox) {
        scheduleBox.classList.remove('is-visible');
        scheduleBox.innerHTML = '';
    }
    syncCreateBtnText();
}

function renderPage() {
    let html = '';

    if (subjects.length === 0) {
        output.innerHTML = `<p class="message-empty">لا مواد مُضافة حتى الآن</p>`;
        return;
    }

    for (let i = 0; i < subjects.length; i++) {
        const subject = subjects[i];
        const badge = i === 0 ? `<span class="badge">(ذات أولوية)</span>` : '';

        html += `
          <div class="subject-container" data-id="${subject.id}">
            <div class="subject-header">
              <h2 class="subject-name">${subject.subjectName} ${badge}</h2>
              <div class="subject-actions">
                <button class="delete" data-id="${subject.id}">حذف</button>
                <button class="show-recommendation" data-id="${subject.id}">التوصيات</button>
              </div>
            </div>

            <div class="recommendations" data-id="${subject.id}"></div>
          </div>
        `;
    }
    
    output.innerHTML = html;
}

function saveInfo() {
    localStorage.setItem('idCount', idCounter);
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

function saveData() {
    subjects.push({
        subjectName: subjectName.value.trim(),
        studentGrade: Number(studentGrade.value),
        difficulty: difficulty.value,
        studyingHours: studyingHours.value,
        examSoon: examSoon.checked ? true : false,
        id: idCounter
    });

    idCounter++;
}