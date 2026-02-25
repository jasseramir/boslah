function calculatePriority() {
    for (let i = 0; i < subjects.length; i++) {
        const subject = subjects[i];
        const { studentGrade, difficulty, studyingHours, examSoon } = subject;

        const averageGrade = studentGrade;
        let priority = 0;

        if (averageGrade >= 95) priority += 0;
        else if (averageGrade >= 85) priority += 5;
        else if (averageGrade >= 70) priority += 10;
        else if (averageGrade >= 60) priority += 20;
        else if (averageGrade >= 50) priority += 30;
        else priority += 40;

        switch (difficulty) {
            case 'so-easy': priority -= 5; break;
            case 'easy': break;
            case 'normal': priority += 3; break;
            case 'hard': priority += 6; break;
            case 'so-hard': priority += 9; break;
        }

        if (averageGrade > 80 && difficulty === 'so-hard') priority -= 10;
        else if (averageGrade < 50 && difficulty === 'so-easy') priority += 30;
        else if (averageGrade < 50 && difficulty === 'so-hard') priority += 50;

        switch (studyingHours) {
            case 'less-than-hour': priority += 18; break;
            case '1-hour': priority += 14; break;
            case '2-hours': priority += 10; break;
            case '3-hours': priority += 6; break;
            case '4-hours': priority += 3; break;
            case '5-hours': priority += 1; break;
            case 'more-than-5-hours': priority -= 4; break;
        }

        if (examSoon) priority += 12;

        subject.priority = priority;
    }

    subjects.sort((a, b) => b.priority - a.priority);
}