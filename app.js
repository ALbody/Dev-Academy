// ===============================
// LESSON DATA STRUCTURE (CONTENT ONLY)
// ===============================
const lessonsData = {
  lesson1: {
    title: 'Introduction to Flutter',
    section: 'Flutter',
    content: 'مقدمة عن Flutter والمميزات الأساسية.'
  },
  lesson2: {
    title: 'Widgets Deep Dive',
    section: 'Flutter',
    content: 'كل شيء في Flutter هو Widget.'
  },
  lesson3: {
    title: 'Layouts System',
    section: 'Flutter',
    content: 'Row / Column / Stack - نظم التخطيط.'
  },
  lesson4: {
    title: 'State Management',
    section: 'Flutter',
    content: 'إدارة حالة التطبيق.'
  },
  lesson5: {
    title: 'Navigation System',
    section: 'Flutter',
    content: 'التنقل بين الشاشات.'
  },
  lesson6: {
    title: 'Forms & Validation',
    section: 'Flutter',
    content: 'إدخال واختبار البيانات.'
  },
  lesson7: {
    title: 'API Integration',
    section: 'Flutter',
    content: 'ربط API مع التطبيق.'
  },
  lesson10: {
    title: 'Kotlin Introduction',
    section: 'Kotlin',
    content: 'مقدمة عن Kotlin.'
  },
  lesson11: {
    title: 'Variables & Types',
    section: 'Kotlin',
    content: 'المتغيرات والأنواع.'
  },
  lesson12: {
    title: 'Functions & OOP',
    section: 'Kotlin',
    content: 'الدوال والبرمجة الكائنية.'
  },
  lesson13: {
    title: 'Android Components',
    section: 'Kotlin',
    content: 'مكونات Android الأساسية.'
  },
  lesson15: {
    title: 'Dart Basics',
    section: 'Dart',
    content: 'أساسيات Dart.'
  },
  lesson16: {
    title: 'Control Flow',
    section: 'Dart',
    content: 'التحكم في التدفق.'
  },
  lesson17: {
    title: 'Object Oriented Programming',
    section: 'Dart',
    content: 'البرمجة الكائنية.'
  },
  lesson18: {
    title: 'Asynchronous Programming',
    section: 'Dart',
    content: 'البرمجة غير المتزامنة.'
  }
};

// ===============================
// SECTION-BASED ASSESSMENTS
// ===============================
const sectionsData = {
  Flutter: {
    name: 'Flutter',
    lessons: ['lesson1', 'lesson2', 'lesson3', 'lesson4', 'lesson5', 'lesson6', 'lesson7'],
    codeJudge: {
      prompt: 'أكتب تطبيق Flutter بسيط يستخدم Widgets و State Management:',
      testPattern: /void main|runApp|StatelessWidget|StatefulWidget/i,
      hint: 'استخدم main(), runApp(), و أحد أنواع Widgets'
    },
    quiz: {
      questions: [
        {
          q: 'Flutter هو:',
          options: ['لغة برمجة', 'Framework', 'IDE'],
          answer: 1
        },
        {
          q: 'الWidget الأساسي هو:',
          options: ['Container', 'StatelessWidget', 'BuildContext'],
          answer: 1
        },
        {
          q: 'Row يرتب العناصر:',
          options: ['عموديًا', 'أفقيًا', 'متقاطعًا'],
          answer: 1
        },
        {
          q: 'setState يستخدم لـ:',
          options: ['إنشاء Widget', 'تحديث الواجهة', 'البحث'],
          answer: 1
        },
        {
          q: 'Navigator.push يستخدم لـ:',
          options: ['الإزالة', 'الإضافة', 'التحديث'],
          answer: 1
        }
      ]
    }
  },
  Kotlin: {
    name: 'Kotlin',
    lessons: ['lesson10', 'lesson11', 'lesson12', 'lesson13'],
    codeJudge: {
      prompt: 'أكتب برنامج Kotlin متكامل يستخدم class و functions:',
      testPattern: /fun main|class\s+\w+|println/i,
      hint: 'استخدم fun, class, و println'
    },
    quiz: {
      questions: [
        {
          q: 'Kotlin تعمل على:',
          options: ['Flutter', 'Android', 'Web'],
          answer: 1
        },
        {
          q: 'val يعني:',
          options: ['متغير', 'ثابت', 'دالة'],
          answer: 1
        },
        {
          q: 'init هو:',
          options: ['دالة', 'متغير', 'كتلة برمجية'],
          answer: 2
        },
        {
          q: 'Activity هي:',
          options: ['واجهة', 'بيانات', 'خدمة'],
          answer: 0
        },
        {
          q: 'Kotlin آمنة من:',
          options: ['Errors', 'NullPointerException', 'Warnings'],
          answer: 1
        }
      ]
    }
  },
  Dart: {
    name: 'Dart',
    lessons: ['lesson15', 'lesson16', 'lesson17', 'lesson18'],
    codeJudge: {
      prompt: 'أكتب برنامج Dart متكامل يستخدم classes و async/await:',
      testPattern: /void main|print|class|async|await/i,
      hint: 'استخدم main(), print(), class, async و await'
    },
    quiz: {
      questions: [
        {
          q: 'Dart لغة:',
          options: ['ضعيفة الأداء', 'قوية الأداء', 'وسيطة'],
          answer: 1
        },
        {
          q: 'for يستخدم للـ:',
          options: ['الشرط', 'التكرار', 'الدالة'],
          answer: 1
        },
        {
          q: 'class تعريف:',
          options: ['متغير', 'قالب', 'دالة'],
          answer: 1
        },
        {
          q: 'async/await للـ:',
          options: ['الثوابت', 'العمليات الطويلة', 'الحلقة'],
          answer: 1
        },
        {
          q: 'Dart تطوير:',
          options: ['ويب فقط', 'موبايل فقط', 'ويب وموبايل'],
          answer: 2
        }
      ]
    }
  }
};

// ===============================
// STATE MACHINE & MANAGEMENT
// ===============================
const LESSON_STATES = {
  LOCKED: 'locked',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

const SECTION_STATES = {
  LOCKED: 'locked',
  IN_PROGRESS: 'in_progress',
  JUDGE_PENDING: 'judge_pending',
  QUIZ_PENDING: 'quiz_pending',
  COMPLETED: 'completed'
};

// Track lesson states
let lessonStates = {};
let sectionStates = {};
const lessonOrder = Object.keys(lessonsData);
const sectionOrder = ['Flutter', 'Kotlin', 'Dart'];
let currentLesson = 0;
let courseCompleted = false;

// Initialize lesson and section states
function initializeLessonStates() {
  lessonOrder.forEach((lessonId, index) => {
    lessonStates[lessonId] = index === 0 ? LESSON_STATES.ACTIVE : LESSON_STATES.LOCKED;
  });
  
  sectionOrder.forEach((sectionName, index) => {
    sectionStates[sectionName] = index === 0 ? SECTION_STATES.IN_PROGRESS : SECTION_STATES.LOCKED;
  });
}

// ===============================
// CODE JUDGE VALIDATION ENGINE
// ===============================
function validateCodeSubmission(sectionName, userCode) {
  const section = sectionsData[sectionName];
  if (!section || !section.codeJudge) return { passed: false, msg: 'Section not found' };

  const pattern = section.codeJudge.testPattern;
  const passed = pattern.test(userCode);

  return {
    passed,
    msg: passed ? 'Code validation passed! ✓' : 'Code does not match requirements. Try again.',
    hint: section.codeJudge.hint
  };
}

// ===============================
// SECTION STATE TRANSITIONS
// ===============================
function transitionSectionState(sectionName, action) {
  const currentState = sectionStates[sectionName];

  const transitions = {
    [SECTION_STATES.IN_PROGRESS]: {
      lessonsCompleted: SECTION_STATES.JUDGE_PENDING,
    },
    [SECTION_STATES.JUDGE_PENDING]: {
      passJudge: SECTION_STATES.QUIZ_PENDING,
    },
    [SECTION_STATES.QUIZ_PENDING]: {
      passQuiz: SECTION_STATES.COMPLETED,
    },
  };

  const newState = transitions[currentState]?.[action];
  if (newState) {
    sectionStates[sectionName] = newState;
    return true;
  }
  return false;
}

function canAccessSectionJudge(sectionName) {
  const state = sectionStates[sectionName];
  return state === SECTION_STATES.JUDGE_PENDING;
}

function canAccessSectionQuiz(sectionName) {
  const state = sectionStates[sectionName];
  return state === SECTION_STATES.QUIZ_PENDING;
}

function isSectionCompleted(sectionName) {
  return sectionStates[sectionName] === SECTION_STATES.COMPLETED;
}

function getAllSectionLessonsCompleted(sectionName) {
  const section = sectionsData[sectionName];
  return section.lessons.every(lessonId => 
    lessonStates[lessonId] === LESSON_STATES.COMPLETED
  );
}

// ===============================
// ASSESSMENT PANEL HELPERS
// ===============================
function hideAllContent() {
  document.getElementById('intro').style.display = 'none';
  document.querySelectorAll('.lesson').forEach(l => l.style.display = 'none');
}

function showAssessmentPanel(html) {
  let panel = document.getElementById('assessment-panel');
  if (panel) panel.remove();
  panel = document.createElement('div');
  panel.id = 'assessment-panel';
  panel.innerHTML = html;
  document.getElementById('mainContent').appendChild(panel);
}

function removeAssessmentPanel() {
  const panel = document.getElementById('assessment-panel');
  if (panel) panel.remove();
}

// ===============================
// SIDEBAR
// ===============================
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('show');
  document.getElementById('mainContent').classList.toggle('shift');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('show');
  document.getElementById('mainContent').classList.remove('shift');
}

// ===============================
// SECTIONS
// ===============================
function toggleSection(el) {
  const list = el.nextElementSibling;
  const arrow = el.querySelector('.arrow');

  if (!list) return;

  if (list.style.display === 'flex') {
    list.style.display = 'none';
    arrow.classList.remove('down');
  } else {
    list.style.display = 'flex';
    arrow.classList.add('down');
  }
}

// ===============================
// LESSON NAVIGATION
// ===============================
function showLesson(id) {
  const state = lessonStates[id];
  
  // Check if lesson exists
  const lessonEl = document.getElementById(id);
  if (!lessonEl) {
    console.warn(`Lesson ${id} not found in DOM`);
    return;
  }
  
  // Check if lesson is locked
  if (state === LESSON_STATES.LOCKED) {
    alert("هذا الدرس مقفل - أكمل الدروس السابقة أولا");
    return;
  }

  currentLesson = lessonOrder.indexOf(id);
  removeAssessmentPanel();
  document.getElementById('intro').style.display = 'none';

  // Hide all lessons and show current one
  document.querySelectorAll('.lesson').forEach(l => {
    l.style.display = 'none';
  });
  
  lessonEl.style.display = 'block';
  closeSidebar();
}

function move() {
  showLesson('lesson1');
}

// ===============================
// LESSON COMPLETION & SECTION FLOW
// ===============================
function completeLessonContent(lessonId) {
  // Mark lesson as completed
  lessonStates[lessonId] = LESSON_STATES.COMPLETED;
  updateLessonUI(lessonId);
  
  // Check if all lessons in section are completed
  const lesson = lessonsData[lessonId];
  const sectionName = lesson.section;
  
  if (getAllSectionLessonsCompleted(sectionName)) {
    transitionSectionState(sectionName, 'lessonsCompleted');
    alert("أحسنت! لقد أكملت جميع دروس قسم " + sectionName + "\nانتقل إلى اختبار الكود Judge");
    showSectionAssessment(sectionName, 'judge');
  }
}

function updateLessonUI(lessonId) {
  const stateEl = document.getElementById('state_' + lessonId);
  if (stateEl) {
    stateEl.textContent = 'Stage: Completed ✓';
  }
}

// ===============================
// NEXT / PREV LESSON
// ===============================
function nextLesson() {
  const lessonId = lessonOrder[currentLesson];
  const lesson = lessonsData[lessonId];
  const sectionName = lesson.section;
  
  if (lessonStates[lessonId] !== LESSON_STATES.COMPLETED) {
    alert("You must complete this lesson first!");
    return;
  }

  // Find next lesson in same section
  const section = sectionsData[sectionName];
  const currentIndex = section.lessons.indexOf(lessonId);
  
  if (currentIndex < section.lessons.length - 1) {
    const nextId = section.lessons[currentIndex + 1];
    if (lessonStates[nextId] === LESSON_STATES.LOCKED) {
      lessonStates[nextId] = LESSON_STATES.ACTIVE;
    }
    showLesson(nextId);
  } else {
    // All lessons in section completed - show assessment entry point
    transitionSectionState(sectionName, 'lessonsCompleted');
    alert("جميع دروس القسم مكتملة! اذهب إلى قسم الاختبار والكود جدج");
    showSectionFinalBlock(sectionName);
  }
}

function prevLesson() {
  if (currentLesson <= 0) return;
  showLesson(lessonOrder[currentLesson - 1]);
}

// ===============================
// SECTION ASSESSMENT DISPLAY
// ===============================
function showSectionFinalBlock(sectionName) {
  transitionSectionState(sectionName, 'lessonsCompleted');
  hideAllContent();
  
  let html = `
    <div class="section-final-block">
      <h2>${sectionName} - قسم التقييم النهائي</h2>
      <p>لقد أكملت جميع دروس قسم ${sectionName}!</p>
      <div class="assessment-options">
        <button onclick="showSectionCodeJudge('${sectionName}')" class="assessment-btn judge-btn">
          <span class="btn-icon">💻</span>
          Code Judge
          <span class="btn-desc">اختبار الكود العملي</span>
        </button>
        <button onclick="showSectionQuiz('${sectionName}')" class="assessment-btn quiz-btn">
          <span class="btn-icon">📝</span>
          Quiz
          <span class="btn-desc">اختبار نظري</span>
        </button>
      </div>
    </div>
  `;
  
  showAssessmentPanel(html);
}

function showSectionAssessment(sectionName, type) {
  if (type === 'judge') {
    showSectionCodeJudge(sectionName);
  } else {
    showSectionQuiz(sectionName);
  }
}

// ===============================
// SECTION CODE JUDGE
// ===============================
function showSectionCodeJudge(sectionName) {
  if (!canAccessSectionJudge(sectionName) && sectionStates[sectionName] !== SECTION_STATES.JUDGE_PENDING && sectionStates[sectionName] !== SECTION_STATES.QUIZ_PENDING) {
    alert("Complete all lessons in this section first!");
    return;
  }

  const section = sectionsData[sectionName];
  const task = section.codeJudge;

  let html = `
    <div class="code-judge">
      <div class="assessment-header">
        <h2>${sectionName} - Code Judge</h2>
        <p class="assessment-subtitle">اختبار الكود العملي لقسم ${sectionName}</p>
      </div>
      <p class="prompt">${task.prompt}</p>
      <textarea 
        id="codeInput" 
        class="code-editor" 
        placeholder="اكتب الحل هنا..."
        spellcheck="false"></textarea>
      <p class="hint">💡 ${task.hint}</p>
      <div class="action-buttons">
        <button onclick="submitSectionCodeJudge('${sectionName}')" class="submit-btn">Submit Code</button>
        <button onclick="goBackToLessons('${sectionName}')" class="cancel-btn">Back to Lessons</button>
      </div>
    </div>
  `;

  hideAllContent();
  showAssessmentPanel(html);
}

function submitSectionCodeJudge(sectionName) {
  const codeInput = document.getElementById('codeInput');
  if (!codeInput) {
    alert("Editor not found");
    return;
  }

  const userCode = codeInput.value;
  const validation = validateCodeSubmission(sectionName, userCode);

  if (validation.passed) {
    if (transitionSectionState(sectionName, 'passJudge')) {
      alert("Code validation PASSED! ✓\n\nالآن انتقل إلى الاختبار النظري");
      showSectionQuiz(sectionName);
    }
  } else {
    alert(validation.msg + "\n\nHint: " + validation.hint);
  }
}

// ===============================
// SECTION QUIZ
// ===============================
function showSectionQuiz(sectionName) {
  if (!canAccessSectionQuiz(sectionName)) {
    alert("Complete Code Judge first!");
    return;
  }

  const section = sectionsData[sectionName];
  const quiz = section.quiz;

  let html = `
    <div class="quiz">
      <div class="assessment-header">
        <h2>${sectionName} - Quiz</h2>
        <p class="assessment-subtitle">الاختبار النظري لقسم ${sectionName}</p>
      </div>
  `;

  quiz.questions.forEach((q, idx) => {
    html += `<div class="quiz-question">`;
    html += `<p><strong>Q${idx + 1}: ${q.q}</strong></p>`;
    q.options.forEach((opt, optIdx) => {
      html += `<label>
        <input type="radio" name="quiz_q${idx}" value="${optIdx}">
        ${opt}
      </label><br>`;
    });
    html += `</div>`;
  });

  html += `
    <div class="action-buttons">
      <button onclick="submitSectionQuiz('${sectionName}')" class="submit-btn">Submit Quiz</button>
      <button onclick="goBackToCodeJudge('${sectionName}')" class="cancel-btn">Back to Code Judge</button>
    </div>
    </div>`;

  hideAllContent();
  showAssessmentPanel(html);
}

function submitSectionQuiz(sectionName) {
  const section = sectionsData[sectionName];
  const quiz = section.quiz;

  let score = 0;
  let answered = 0;

  quiz.questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="quiz_q${idx}"]:checked`);
    if (selected) {
      answered++;
      if (+selected.value === q.answer) {
        score++;
      }
    }
  });

  if (answered !== quiz.questions.length) {
    alert("الرجاء الإجابة على جميع الأسئلة");
    return;
  }

  const percent = Math.round((score / quiz.questions.length) * 100);

  if (percent >= 70) {
    if (transitionSectionState(sectionName, 'passQuiz')) {
      const sectionIndex = sectionOrder.indexOf(sectionName);
      const nextSectionIndex = sectionIndex + 1;
      
      let message = `Quiz PASSED! Score: ${percent}%\n\nقسم ${sectionName} مكتمل!`;
      
      if (nextSectionIndex >= sectionOrder.length) {
        courseCompleted = true;
        message += "\n\nتهاني! اكملت البرنامج التعليمي بالكامل!";
        alert(message);
        
        // Show completion screen
        hideAllContent();
        showAssessmentPanel(`
          <div class="section-final-block">
            <h2>تم إكمال البرنامج بنجاح! 🎉</h2>
            <p>لقد أكملت جميع الأقسام والتقييمات</p>
            <button class="menu-btn" onclick="startFinalAssessment()">إجراء التقييم النهائي</button>
            <button class="menu-btn" onclick="goBackHome()">العودة للرئيسية</button>
          </div>
        `);
      } else {
        const nextSectionName = sectionOrder[nextSectionIndex];
        message += `\n\nالآن انتقل إلى قسم ${nextSectionName}`;
        alert(message);
        
        // Unlock next section and show first lesson
        if (sectionStates[nextSectionName] === SECTION_STATES.LOCKED) {
          sectionStates[nextSectionName] = SECTION_STATES.IN_PROGRESS;
        }
        
        // Unlock and show the first lesson of next section
        const nextLessonId = sectionsData[nextSectionName].lessons[0];
        if (lessonStates[nextLessonId] === LESSON_STATES.LOCKED) {
          lessonStates[nextLessonId] = LESSON_STATES.ACTIVE;
        }
        
        showLesson(nextLessonId);
      }
    }
  } else {
    alert(`Quiz FAILED! Score: ${percent}%\n\nأنت بحاجة إلى 70% لتمرير الاختبار. حاول مرة أخرى.`);
  }
}

function goBackToLessons(sectionName) {
  const section = sectionsData[sectionName];
  showLesson(section.lessons[0]);
}

function goBackToCodeJudge(sectionName) {
  showSectionCodeJudge(sectionName);
}

// ===============================
// FINAL ASSESSMENT
// ===============================
function startFinalAssessment() {
  if (!courseCompleted) {
    alert("You must complete all sections first!");
    return;
  }

  const username = prompt("اكتب اسمك:");
  if (!username) return;

  // Create final exam from all sections
  const finalQuestions = sectionOrder
    .map((sectionName) => {
      const section = sectionsData[sectionName];
      return section.quiz.questions.slice(0, 1); // Take first question from each section
    })
    .flat();

  let html = `<div class="intro"><h2>Final Comprehensive Assessment</h2>`;
  html += `<p>Student: ${username}</p>`;

  finalQuestions.forEach((q, i) => {
    html += `<p>${q.q}</p>`;
    q.options.forEach((o, j) => {
      html += `<label>
        <input type="radio" name="final_q${i}" value="${j}">
        ${o}
      </label><br>`;
    });
  });

  html += `<button onclick='checkFinalAssessment("${username}", ${JSON.stringify(finalQuestions)})'>Submit Assessment</button></div>`;

  hideAllContent();
  showAssessmentPanel(html);
}

function checkFinalAssessment(username, questions) {
  let score = 0;

  questions.forEach((q, i) => {
    const sel = document.querySelector(`input[name="final_q${i}"]:checked`);
    if (sel && +sel.value === q.answer) score++;
  });

  const percent = Math.round((score / questions.length) * 100);

  let html = `<div class="intro">
    <h2>Final Assessment Result</h2>
    <p><strong>${username}</strong></p>
    <p>Score: <strong>${percent}%</strong></p>`;

  if (percent >= 70) {
    html += `<p style="color: #16A34A;">✓ PASSED</p>
      <button onclick="downloadCertificate('${username}', ${percent})">Download Certificate</button>`;
  } else {
    html += `<p style="color: #DC2626;">✗ FAILED</p>
      <button onclick="goBackHome()">Back to Home</button>`;
  }

  html += `</div>`;

  hideAllContent();
  showAssessmentPanel(html);
}

function downloadCert(course, score, grade, studentName) {
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Certificate</title><style>
body{font-family:'Georgia',serif;background:#f5f5f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.cert{border:5px solid #ffd60a;border-radius:20px;padding:60px 100px;max-width:750px;text-align:center;position:relative;background:linear-gradient(145deg,#ffffff,#fff8dc);box-shadow:0 8px 20px rgba(0,0,0,0.2)}
.cert::before{content:'';position:absolute;top:10px;left:10px;right:10px;bottom:10px;border:2px solid #ffd60a;border-radius:16px;pointer-events:none}
h1{color:#ff6b35;font-size:2.5rem;margin-bottom:12px}
.badge{font-size:5rem;margin:20px 0}
.student{font-size:2.2rem;color:#7c3aed;font-weight:700;margin:16px 0}
.grade{color:#06d6a0;font-size:1.5rem;font-weight:700;margin-top:14px}
.date{color:#555;font-size:0.95rem;margin-top:12px}
.signature{margin-top:40px}
.cert-seal { width: 90px; height: 90px; border-radius: 50%; position: absolute; top: 10px; right: 20px; background: radial-gradient(circle at 30% 30%, #ffd700, #cfa000 80%); border: 2px solid #b8860b; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; color: #fff; text-align: center; transform: rotate(-10deg); text-shadow: 0 1px 2px rgba(0,0,0,0.4); z-index: 10; }
.signature .line{width:180px;margin:0 auto 6px;border-top:1.5px solid #000}
.signature .name{font-size:1rem;color:#000;font-weight:600}
.signature .role{font-size:0.8rem;color:#555}
.seal{width:120px;height:120px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:0.85rem;text-align:center;line-height:1.2;position:absolute;top:20px;right:40px;background:radial-gradient(circle at 30% 30%,#ffd700,#cfa000 80%);box-shadow:0 6px 15px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,255,255,0.4);border:3px solid #b8860b;transform:rotate(-10deg);text-shadow:0 1px 2px rgba(0,0,0,0.4)}
</style></head><body>
<div class="cert">
  <div class="seal">عبدالله صلاح<br>Instructor</div>
  <div class="badge">🏆</div>
  <p style="font-size:.85rem;text-transform:uppercase;letter-spacing:.25em;color:#888">Certificate of Completion</p>
  <h1>${course.title}</h1>
  <p style="color:#666;margin-bottom:10px">Awarded to</p>
  <div class="student">${studentName}</div>
  <p style="color:#666;margin-bottom:10px">has successfully completed this course</p>
  <div class="grade">Grade: ${grade} · ${score}%</div>
  <div class="date">Issued: ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</div>
  <div class="date">BodaAcademy · Frontend Mastery Program</div>
  <div class="signature"><div class="line"></div><div class="name">عبدالله صلاح</div><div class="role">Instructor / Supervisor</div></div>
</div>
</body></html>`;

function goBackHome() {
  removeAssessmentPanel();
  document.getElementById('intro').style.display = 'block';
}

// ===============================
// SEARCH FUNCTIONALITY
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize lesson and section states
  initializeLessonStates();

  const input = document.getElementById("searchInput");

  if (!input) return;

  input.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    document.querySelectorAll(".lesson-list div").forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(value) ? "block" : "none";
    });
  });

});
}
