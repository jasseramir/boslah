function checkData() {
    const nameChecker = document.getElementById('nameChecker');
    const gradeChecker = document.getElementById('gradeChecker');
    const selectChecker = document.getElementById('selectChecker');
    const hoursChecker = document.getElementById('hoursChecker');

    let isValid = true;

    nameChecker.textContent = '';
    gradeChecker.textContent = '';
    selectChecker.textContent = '';
    hoursChecker.textContent = '';

    const cleanedName = subjectName.value.trim();

    if (!cleanedName) {
        nameChecker.textContent = 'يرجى ملء البيانات المطلوبة';
        isValid = false;
    }

    if (!studentGrade.value) {
        gradeChecker.textContent = 'يرجى ملء البيانات المطلوبة';
        isValid = false;
    } else {
        const gradeNum = Number(studentGrade.value);
        if (!Number.isFinite(gradeNum) || gradeNum < 0 || gradeNum > 100) {
            gradeChecker.textContent = 'البيانات غير صحيحة';
            isValid = false;
        }
    }

    if (!difficulty.value) {
        selectChecker.textContent = 'يرجى اختيار مدى صعوبة المادة بالنسبة لك';
        isValid = false;
    }

    if (!studyingHours.value) {
        hoursChecker.textContent = 'يرجى اختيار عدد ساعات مذاكرتك';
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    const nameChecker = document.getElementById('nameChecker');
    const gradeChecker = document.getElementById('gradeChecker');
    const selectChecker = document.getElementById('selectChecker');
    const hoursChecker = document.getElementById('hoursChecker');

    nameChecker.textContent = '';
    gradeChecker.textContent = '';
    selectChecker.textContent = '';
    hoursChecker.textContent = '';
}