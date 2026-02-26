function giveARecommendation(subject) {
    const { subjectName, studentGrade, difficulty, studyingHours, examSoon, priority } = subject;

    const diffMap = { 'so-easy': 1, 'easy': 2, 'normal': 3, 'hard': 4, 'so-hard': 5 };
    const hoursMap = { 'less-than-hour': 0.5, '1-hour': 1, '2-hours': 2, '3-hours': 3, '4-hours': 4, '5-hours': 5, 'more-than-5-hours': 6 };

    const diff = diffMap[difficulty] ?? 0;
    const hours = hoursMap[studyingHours] ?? 0;

    const steps = [];

    const veryWeak = studentGrade < 50;
    const weak = studentGrade >= 50 && studentGrade < 60;
    const medium = studentGrade >= 60 && studentGrade < 75;
    const good = studentGrade >= 75 && studentGrade < 90;
    const excellent = studentGrade >= 90;

    const isHard = diff >= 4;
    const isEasy = diff <= 2;

    const isNeglected = hours <= 1;
    const isLowTime = hours > 1 && hours <= 2;
    const isHighTime = hours > 4;

    let title = '';
    let focus = '';

    if (examSoon && studentGrade < 75) {
        title = 'خطة سريعة قبل الامتحان';
        focus = 'الهدف هنا تثبيت النقاط المهمة ورفع الدرجة بسرعة.';
        steps.push('ذاكر يومياً 45 دقيقة (مراجعة مركزة وليست قراءة عشوائية).');
        steps.push('حل نموذج امتحان أو راجع 20 سؤالاً كل يومين.');
        steps.push('اكتب أخطاءك في ورقة وراجعها 10 دقائق في نهاية اليوم.');
    } 
    else if (veryWeak && isHard) {
        title = 'ابدأ من الأساسيات';
        focus = 'المشكلة غالبًا في الفهم قبل التدريب، فابدأ تدريجياً.';
        steps.push('30 دقيقة: ركّز على نقطة واحدة فقط (قاعدة/قانون) واكتب ملخصاً قصيراً.');
        steps.push('بعدها: حل 10 مسائل سهلة جداً على نفس النقطة.');
        steps.push('تجنب المسائل الصعبة الآن؛ التدرج أهم من الكثرة.');
    } 
    else if (veryWeak && isEasy) {
        title = 'رفع سريع لأن المادة سهلة';
        focus = 'غالباً تحتاج تدريباً أكثر وتجنب التسرع.';
        steps.push('حل 20 سؤالاً قصيراً يومياً (متنوعًا).');
        steps.push('راجع الأخطاء فوراً، وسجل سبب الخطأ لا الإجابة فقط.');
        steps.push('قبل النوم: راجع ورقة الأخطاء 5 دقائق.');
    } 
    else if (studentGrade < 75 && isNeglected) {
        title = 'الاستمرارية أهم من الجلسة الطويلة';
        focus = 'التحسن هنا يعتمد على الثبات اليومي وليس على مرة واحدة في الأسبوع.';
        steps.push('25 دقيقة يومياً ثابتة مهما كانت الظروف.');
        steps.push('كل يوم هدف واحد: درس صغير أو 10 مسائل.');
        steps.push('مرة أسبوعياً: راجع ورقة الأخطاء/الملخصات 20 دقيقة.');
    } 
    else if (isHard && (isNeglected || isLowTime)) {
        title = 'قسّم المذاكرة لتقليل الضغط';
        focus = 'المواد الصعبة تحتاج جلسات قصيرة مع تطبيق مباشر.';
        steps.push('جلسات 25 دقيقة + 5 دقائق راحة (مرتين يومياً إن استطعت).');
        steps.push('ابدأ بالقوانين/القواعد، وبعد كل قاعدة حل 3 مسائل تطبيق.');
        steps.push('أنشئ ورقة واحدة لأهم القوانين أو القواعد للرجوع السريع.');
    } 
    else if (medium && isHard) {
        title = 'أنت قريب، ركّز على نقاط محددة';
        focus = 'التحسن هنا يأتي من اختيار صحيح للمسائل لا من زيادة الوقت فقط.';
        steps.push('حدد أكثر نقطتين تخطئ فيهما وركز عليهما فقط في البداية.');
        steps.push('حل مسائل متوسطة المستوى (لا سهلة جداً ولا صعبة جداً).');
        steps.push('آخر 10 دقائق: راجع أخطاء اليوم مع الحل الصحيح.');
    } 
    else if (good && examSoon) {
        title = 'مراجعة نهائية ذكية';
        focus = 'التركيز على نماذج الامتحان والأخطاء يعطي أفضل نتيجة في وقت قصير.';
        steps.push('حل نموذجاً كاملاً واحداً وراجع الأخطاء فقط.');
        steps.push('اكتب ملخصاً من صفحة واحدة لأهم القوانين/القواعد.');
        steps.push('قبل الامتحان بيوم: راحة نسبية + مرور خفيف على الملخص.');
    } 
    else if (excellent && isHard) {
        title = 'حافظ على المستوى دون إهدار الوقت';
        focus = 'هذه مادة قوية لديك، فاجعلها صيانة لا استنزافاً للوقت.';
        steps.push('مراجعة خفيفة مرة أسبوعياً 30 دقيقة.');
        steps.push('حل 2 إلى 3 مسائل تحدٍ فقط للتثبيت.');
        steps.push('حوّل الوقت الزائد إلى مادة أضعف.');
    } 
    else if (studentGrade >= 85 && isHighTime && !examSoon) {
        title = 'أعد توزيع وقتك بذكاء';
        focus = 'أنت تبذل وقتًا زائداً في مادة أنت جيد فيها، ويمكن استثمار الوقت في مادة أضعف.';
        steps.push('قلّل وقتها إلى النصف واجعله مراجعة وأسئلة فقط.');
        steps.push('انقل الوقت إلى مادة أولويتها أعلى.');
        steps.push('حافظ عليها بمراجعة أسبوعية بدل مذاكرة يومية.');
    } 
    else {
        title = 'خطة محافظة';
        focus = 'الوضع جيد، والمطلوب تثبيت وتحسين بسيط ومنتظم.';
        steps.push('مراجعة مرتين أسبوعياً 30 إلى 45 دقيقة.');
        steps.push('حل 10 أسئلة بعد كل جزء تراجعه.');
        steps.push('سجّل الأخطاء وارجع لها أسبوعياً.');
    }

    return `
      <div class="rec">
        <h4>${title}</h4>
        <p class="rec-focus">${focus}</p>
        <ul class="rec-steps">
          ${steps.slice(0, 3).map(step => `<li>${step}</li>`).join('')}
        </ul>
      </div>
    `;
}