function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function decideStudyDays(perDay, uniqueCount) {
    const minDays = 5;
    const maxDays = 7;
    const needDays = Math.ceil(uniqueCount / perDay);
    return Math.max(minDays, Math.min(maxDays, needDays));
}

function buildSchedule(items, perDay) {
    const allDays = ['السبت','الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];

    const uniqueMap = new Map();
    for (const s of items) {
        const name = (s.subjectName ?? '').trim();
        if (!name) continue;
        const key = name.toLowerCase();
        if (!uniqueMap.has(key)) uniqueMap.set(key, name);
    }

    const uniques = Array.from(uniqueMap.entries()).map(([key, name]) => ({ key, name }));
    shuffle(uniques);

    const daysCount = decideStudyDays(perDay, uniques.length);
    const days = allDays.slice(0, daysCount);

    const schedule = days.map(day => ({ day, subjects: [] }));

    let d = 0;
    for (let i = 0; i < uniques.length; i++) {
        let placed = false;
        let tries = 0;

        while (!placed && tries < days.length) {
            const day = schedule[d];
            if (day.subjects.length < perDay) {
                day.subjects.push(uniques[i].name);
                placed = true;
            }
            d = (d + 1) % days.length;
            tries++;
        }

        if (!placed) {
            let best = 0;
            for (let k = 1; k < schedule.length; k++) {
                if (schedule[k].subjects.length < schedule[best].subjects.length) best = k;
            }
            if (schedule[best].subjects.length < perDay) schedule[best].subjects.push(uniques[i].name);
        }
    }

    return schedule.filter(d => d.subjects.length > 0);
}

function renderSchedule() {
    if (!scheduleBox) return;

    if (subjects.length < 3) {
        clearSchedule();
        return;
    }

    const perDay = subjects.length < 10 ? 3 : 4;
    const schedule = buildSchedule(subjects, perDay);

    if (schedule.length === 0) {
        clearSchedule();
        return;
    }

    const dayText = schedule.length === 7 ? '7 أيام' : `${schedule.length} أيام`;

    scheduleBox.innerHTML = `
      <div class="schedule-header">
        <div class="schedule-title"><i class="ri-calendar-2-line"></i>الجدول</div>
        <div class="schedule-meta">${dayText}</div>
      </div>

      <table class="schedule-table">
        <tbody>
          ${schedule.map(d => `
            <tr>
              <th>${d.day}</th>
              <td>
                <ul class="day-list">
                  ${d.subjects.map(n => `<li>${n}</li>`).join('')}
                </ul>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    scheduleBox.classList.add('is-visible');
    scheduleVisible = true;
    syncCreateBtnText();
}

function toggleSchedule() {
    if (!createTable) return;

    if (subjects.length < 3) {
        clearSchedule();
        updateCreateBtn();
        return;
    }

    if (scheduleVisible) {
        clearSchedule();
        return;
    }

    calculatePriority();
    renderSchedule();
}