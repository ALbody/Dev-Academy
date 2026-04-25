
// ===============================
// LESSON DATA STRUCTURE
// ===============================
const lessonsData = {
  lesson1: { title: 'Introduction to Flutter', section: 'Flutter', content: 'Introduction to Flutter and its core features.' },
  lesson2: { title: 'Widgets Deep Dive', section: 'Flutter', content: 'Everything in Flutter is a Widget.' },
  lesson3: { title: 'Layouts System', section: 'Flutter', content: 'Row / Column / Stack - Layout Systems.' },
  lesson4: { title: 'State Management', section: 'Flutter', content: 'Managing application state.' },
  lesson5: { title: 'Navigation System', section: 'Flutter', content: 'Navigating between screens.' },
  lesson6: { title: 'Forms & Validation', section: 'Flutter', content: 'Input and data validation.' },
  lesson7: { title: 'API Integration', section: 'Flutter', content: 'Connecting APIs to your app.' },
  lesson10: { title: 'Kotlin Introduction', section: 'Kotlin', content: 'Introduction to Kotlin.' },
  lesson11: { title: 'Variables & Types', section: 'Kotlin', content: 'Variables and Types.' },
  lesson12: { title: 'Functions & OOP', section: 'Kotlin', content: 'Functions and Object-Oriented Programming.' },
  lesson13: { title: 'Android Components', section: 'Kotlin', content: 'Core Android Components.' },
  lesson15: { title: 'Dart Basics', section: 'Dart', content: 'Dart Basics.' },
  lesson16: { title: 'Control Flow', section: 'Dart', content: 'Control Flow.' },
  lesson17: { title: 'Object Oriented Programming', section: 'Dart', content: 'Object-Oriented Programming.' },
  lesson18: { title: 'Asynchronous Programming', section: 'Dart', content: 'Asynchronous Programming.' }
};

// ===============================
// SECTION-BASED ASSESSMENTS
// ===============================
const sectionsData = {
  Flutter: {
    name: 'Flutter',
    lessons: ['lesson1', 'lesson2', 'lesson3', 'lesson4', 'lesson5', 'lesson6', 'lesson7'],
    codeJudge: {
      prompt: 'Write a simple Flutter app using Widgets and State Management:',
      testPattern: /void main|runApp|StatelessWidget|StatefulWidget/i,
      hint: 'Use main(), runApp(), and one of the Widget types'
    },
    quiz: {
      questions: [
        { q: 'Flutter is:', options: ['A programming language', 'A Framework', 'An IDE'], answer: 1 },
        { q: 'The basic Widget is:', options: ['Container', 'StatelessWidget', 'BuildContext'], answer: 1 },
        { q: 'Row arranges elements:', options: ['Vertically', 'Horizontally', 'Diagonally'], answer: 1 },
        { q: 'setState is used for:', options: ['Creating Widget', 'Updating UI', 'Searching'], answer: 1 },
        { q: 'Navigator.push is used for:', options: ['Removing', 'Adding', 'Updating'], answer: 1 }
      ]
    }
  },
  Kotlin: {
    name: 'Kotlin',
    lessons: ['lesson10', 'lesson11', 'lesson12', 'lesson13'],
    codeJudge: {
      prompt: 'Write a complete Kotlin program using class and functions:',
      testPattern: /fun main|class\s+\w+|println/i,
      hint: 'Use fun, class, and println'
    },
    quiz: {
      questions: [
        { q: 'Kotlin runs on:', options: ['Flutter', 'Android', 'Web'], answer: 1 },
        { q: 'val means:', options: ['Variable', 'Constant', 'Function'], answer: 1 },
        { q: 'init is a:', options: ['Function', 'Variable', 'Code block'], answer: 2 },
        { q: 'Activity is a:', options: ['Interface', 'Data', 'Service'], answer: 0 },
        { q: 'Kotlin is safe from:', options: ['Errors', 'NullPointerException', 'Warnings'], answer: 1 }
      ]
    }
  },
  Dart: {
    name: 'Dart',
    lessons: ['lesson15', 'lesson16', 'lesson17', 'lesson18'],
    codeJudge: {
      prompt: 'Write a complete Dart program using classes and async/await:',
      testPattern: /void main|print|class|async|await/i,
      hint: 'Use main(), print(), class, async and await'
    },
    quiz: {
      questions: [
        { q: 'Dart is a:', options: ['Low performance', 'High performance', 'Medium'], answer: 1 },
        { q: 'for is used for:', options: ['Condition', 'Iteration', 'Function'], answer: 1 },
        { q: 'class defines:', options: ['Variable', 'Template', 'Function'], answer: 1 },
        { q: 'async/await for:', options: ['Constants', 'Long operations', 'Loops'], answer: 1 },
        { q: 'Dart develops:', options: ['Web only', 'Mobile only', 'Web and Mobile'], answer: 2 }
      ]
    }
  }
};

// ===============================
// STATE CONSTANTS
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

// ===============================
// GLOBAL STATE
// ===============================
let lessonStates = {};
let sectionStates = {};
const lessonOrder = Object.keys(lessonsData);
const sectionOrder = ['Flutter', 'Kotlin', 'Dart'];
let currentLesson = 0;
let courseCompleted = false;

// ===============================
// INITIALIZATION
// ===============================
function initializeLessonStates() {
  lessonOrder.forEach((lessonId, index) => {
    lessonStates[lessonId] = index === 0 ? LESSON_STATES.ACTIVE : LESSON_STATES.LOCKED;
  });
  sectionOrder.forEach((sectionName, index) => {
    sectionStates[sectionName] = index === 0 ? SECTION_STATES.IN_PROGRESS : SECTION_STATES.LOCKED;
  });
  updateSidebarUI();
}

// ===============================
// SIDEBAR UI UPDATES
// ===============================
function updateSidebarUI() {
  document.querySelectorAll('.lesson-list div[data-lesson]').forEach(item => {
    const lessonId = item.getAttribute('data-lesson');
    const state = lessonStates[lessonId];
    item.classList.remove('locked', 'completed', 'active');
    if (state === LESSON_STATES.LOCKED) {
      item.classList.add('locked');
      item.style.opacity = '0.4';
    } else if (state === LESSON_STATES.COMPLETED) {
      item.classList.add('completed');
      item.style.opacity = '1';
    } else {
      item.classList.add('active');
      item.style.opacity = '1';
    }
  });
}

// ===============================
// CODE JUDGE VALIDATION
// ===============================
function validateCodeSubmission(sectionName, userCode) {
  const section = sectionsData[sectionName];
  if (!section || !section.codeJudge) return { passed: false, msg: 'Section not found' };
  const pattern = section.codeJudge.testPattern;
  const passed = pattern.test(userCode);
  return {
    passed,
    msg: passed ? 'Code validation passed!' : 'Code does not match requirements. Try again.',
    hint: section.codeJudge.hint
  };
}

// ===============================
// SECTION STATE TRANSITIONS
// ===============================
function transitionSectionState(sectionName, action) {
  const currentState = sectionStates[sectionName];
  const transitions = {
    [SECTION_STATES.IN_PROGRESS]: { lessonsCompleted: SECTION_STATES.JUDGE_PENDING },
    [SECTION_STATES.JUDGE_PENDING]: { passJudge: SECTION_STATES.QUIZ_PENDING },
    [SECTION_STATES.QUIZ_PENDING]: { passQuiz: SECTION_STATES.COMPLETED }
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
  return state === SECTION_STATES.JUDGE_PENDING || state === SECTION_STATES.QUIZ_PENDING || state === SECTION_STATES.COMPLETED;
}

function canAccessSectionQuiz(sectionName) {
  const state = sectionStates[sectionName];
  return state === SECTION_STATES.QUIZ_PENDING || state === SECTION_STATES.COMPLETED;
}

function isSectionCompleted(sectionName) {
  return sectionStates[sectionName] === SECTION_STATES.COMPLETED;
}

function getAllSectionLessonsCompleted(sectionName) {
  const section = sectionsData[sectionName];
  return section.lessons.every(lessonId => lessonStates[lessonId] === LESSON_STATES.COMPLETED);
}

// ===============================
// ASSESSMENT PANEL HELPERS
// ===============================
function hideAllContent() {
  document.getElementById('intro').style.display = 'none';
  document.querySelectorAll('.lesson').forEach(l => l.style.display = 'none');
}

function showAssessmentPanel(html) {
  removeAssessmentPanel();
  const panel = document.createElement('div');
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
    el.setAttribute('aria-expanded', 'false');
  } else {
    list.style.display = 'flex';
    arrow.classList.add('down');
    el.setAttribute('aria-expanded', 'true');
  }
}

// ===============================
// LESSON NAVIGATION
// ===============================
function showLesson(id) {
  const state = lessonStates[id];
  const lessonEl = document.getElementById(id);
  if (!lessonEl) {
    console.warn('Lesson ' + id + ' not found in DOM');
    return;
  }
  if (state === LESSON_STATES.LOCKED) {
    alert('This lesson is locked - complete previous lessons first');
    return;
  }
  currentLesson = lessonOrder.indexOf(id);
  removeAssessmentPanel();
  document.getElementById('intro').style.display = 'none';
  document.querySelectorAll('.lesson').forEach(l => { l.style.display = 'none'; });
  lessonEl.style.display = 'block';
  closeSidebar();
  window.scrollTo(0, 0);
}

function move() {
  showLesson('lesson1');
}

// ===============================
// LESSON COMPLETION
// ===============================
function completeLessonContent(lessonId) {
  lessonStates[lessonId] = LESSON_STATES.COMPLETED;
  updateLessonUI(lessonId);
  updateSidebarUI();
  const lesson = lessonsData[lessonId];
  const sectionName = lesson.section;
  if (getAllSectionLessonsCompleted(sectionName)) {
    transitionSectionState(sectionName, 'lessonsCompleted');
    alert('Great! You completed all lessons in ' + sectionName + '\n\nProceed to Code Judge Assessment');
    showSectionFinalBlock(sectionName);
  }
}

function updateLessonUI(lessonId) {
  const stateEl = document.getElementById('state_' + lessonId);
  if (stateEl) {
    stateEl.textContent = 'Stage: Completed OK';
    stateEl.style.background = 'var(--color-success)';
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
    alert('You must complete this lesson first!');
    return;
  }
  const section = sectionsData[sectionName];
  const currentIndex = section.lessons.indexOf(lessonId);
  if (currentIndex < section.lessons.length - 1) {
    const nextId = section.lessons[currentIndex + 1];
    if (lessonStates[nextId] === LESSON_STATES.LOCKED) {
      lessonStates[nextId] = LESSON_STATES.ACTIVE;
    }
    showLesson(nextId);
  } else {
    transitionSectionState(sectionName, 'lessonsCompleted');
    alert('All section lessons completed! Go to Assessment section');
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
  hideAllContent();
  let html = '<div class="section-final-block">';
  html += '<h2>' + sectionName + ' - Final Assessment Section</h2>';
  html += '<p>You have completed all lessons in ' + sectionName + '!</p>';
  html += '<div class="assessment-options">';
  html += '<button onclick="showSectionCodeJudge(\'' + sectionName + '\')" class="assessment-btn judge-btn">';
  html += '<span class="btn-icon">&lt;/&gt;</span>Code Judge<span class="btn-desc">Practical Code Test</span></button>';
  html += '<button onclick="showSectionQuiz(\'' + sectionName + '\')" class="assessment-btn quiz-btn">';
  html += '<span class="btn-icon">?</span>Quiz<span class="btn-desc">Theoretical Test</span></button>';
  html += '</div></div>';
  showAssessmentPanel(html);
}

// ===============================
// SECTION CODE JUDGE
// ===============================
function showSectionCodeJudge(sectionName) {
  if (!canAccessSectionJudge(sectionName)) {
    alert('Complete all lessons in this section first!');
    return;
  }
  const section = sectionsData[sectionName];
  const task = section.codeJudge;
  let html = '<div class="code-judge">';
  html += '<div class="assessment-header"><h2>' + sectionName + ' - Code Judge</h2>';
  html += '<p class="assessment-subtitle">Practical code test for ' + sectionName + '</p></div>';
  html += '<p class="prompt">' + task.prompt + '</p>';
  html += '<textarea id="codeInput" class="code-editor" placeholder="Write your solution here..." spellcheck="false"></textarea>';
  html += '<p class="hint">Hint: ' + task.hint + '</p>';
  html += '<div class="action-buttons">';
  html += '<button onclick="submitSectionCodeJudge(\'' + sectionName + '\')" class="submit-btn">Submit Code</button>';
  html += '<button onclick="goBackToLessons(\'' + sectionName + '\')" class="cancel-btn">Back to Lessons</button>';
  html += '</div></div>';
  hideAllContent();
  showAssessmentPanel(html);
}

function submitSectionCodeJudge(sectionName) {
  const codeInput = document.getElementById('codeInput');
  if (!codeInput) {
    alert('Editor not found');
    return;
  }
  const userCode = codeInput.value;
  if (!userCode.trim()) {
    alert('Please write code first');
    return;
  }
  const validation = validateCodeSubmission(sectionName, userCode);
  if (validation.passed) {
    if (transitionSectionState(sectionName, 'passJudge')) {
      alert('Code validation PASSED!\n\nNow proceed to the Quiz');
      showSectionQuiz(sectionName);
    }
  } else {
    alert(validation.msg + '\n\nHint: ' + validation.hint);
  }
}

// ===============================
// SECTION QUIZ
// ===============================
function showSectionQuiz(sectionName) {
  if (!canAccessSectionQuiz(sectionName)) {
    alert('Complete Code Judge first!');
    return;
  }
  const section = sectionsData[sectionName];
  const quiz = section.quiz;
  let html = '<div class="quiz">';
  html += '<div class="assessment-header"><h2>' + sectionName + ' - Quiz</h2>';
  html += '<p class="assessment-subtitle">Theoretical test for ' + sectionName + '</p></div>';
  quiz.questions.forEach((q, idx) => {
    html += '<div class="quiz-question">';
    html += '<p><strong>Q' + (idx + 1) + ': ' + q.q + '</strong></p>';
    q.options.forEach((opt, optIdx) => {
      html += '<label><input type="radio" name="quiz_q' + idx + '" value="' + optIdx + '">' + opt + '</label>';
    });
    html += '</div>';
  });
  html += '<div class="action-buttons">';
  html += '<button onclick="submitSectionQuiz(\'' + sectionName + '\')" class="submit-btn">Submit Quiz</button>';
  html += '<button onclick="goBackToCodeJudge(\'' + sectionName + '\')" class="cancel-btn">Back to Code Judge</button>';
  html += '</div></div>';
  hideAllContent();
  showAssessmentPanel(html);
}

function submitSectionQuiz(sectionName) {
  const section = sectionsData[sectionName];
  const quiz = section.quiz;
  let score = 0;
  let answered = 0;
  quiz.questions.forEach((q, idx) => {
    const selected = document.querySelector('input[name="quiz_q' + idx + '"]:checked');
    if (selected) {
      answered++;
      if (+selected.value === q.answer) score++;
    }
  });
  if (answered !== quiz.questions.length) {
    alert('Please answer all questions');
    return;
  }
  const percent = Math.round((score / quiz.questions.length) * 100);
  if (percent >= 70) {
    if (transitionSectionState(sectionName, 'passQuiz')) {
      const sectionIndex = sectionOrder.indexOf(sectionName);
      const nextSectionIndex = sectionIndex + 1;
      let message = 'Quiz PASSED! Score: ' + percent + '%\n\nSection ' + sectionName + ' completed!';
      if (nextSectionIndex >= sectionOrder.length) {
        courseCompleted = true;
        message += '\n\nCongratulations! You completed the entire course!';
        alert(message);
        hideAllContent();
        showAssessmentPanel('<div class="section-final-block"><h2>Course Completed Successfully!</h2><p>You have completed all sections and assessments</p><button class="menu-btn" onclick="startFinalAssessment()">Take Final Assessment</button><button class="menu-btn" onclick="goBackHome()">Back to Home</button></div>');
      } else {
        const nextSectionName = sectionOrder[nextSectionIndex];
        message += '\n\nNow proceed to ' + nextSectionName + ' section';
        alert(message);
        if (sectionStates[nextSectionName] === SECTION_STATES.LOCKED) {
          sectionStates[nextSectionName] = SECTION_STATES.IN_PROGRESS;
        }
        const nextLessonId = sectionsData[nextSectionName].lessons[0];
        if (lessonStates[nextLessonId] === LESSON_STATES.LOCKED) {
          lessonStates[nextLessonId] = LESSON_STATES.ACTIVE;
        }
        updateSidebarUI();
        showLesson(nextLessonId);
      }
    }
  } else {
    alert('Quiz FAILED! Score: ' + percent + '%\n\nYou need 70% to pass. Try again.');
  }
}

function goBackToLessons(sectionName) {
  const section = sectionsData[sectionName];
  showLesson(section.lessons[0]);
}

function goBackToCodeJudge(sectionName) {
  showSectionCodeJudge(sectionName);
}

function goBackHome() {
  removeAssessmentPanel();
  document.getElementById('intro').style.display = 'block';
  window.scrollTo(0, 0);
}

// ===============================
// FINAL ASSESSMENT
// ===============================
function startFinalAssessment() {
  if (!courseCompleted) {
    alert('You must complete all sections first!');
    return;
  }
  const username = prompt('Enter your name:');
  if (!username) return;
  const finalQuestions = sectionOrder.map((sectionName) => {
    const section = sectionsData[sectionName];
    return section.quiz.questions.slice(0, 1);
  }).flat();
  let html = '<div class="intro"><h2>Final Comprehensive Assessment</h2>';
  html += '<p>Student: ' + username + '</p>';
  finalQuestions.forEach((q, i) => {
    html += '<div class="quiz-question" style="margin:16px 0;"><p><strong>Q' + (i + 1) + ': ' + q.q + '</strong></p>';
    q.options.forEach((o, j) => {
      html += '<label><input type="radio" name="final_q' + i + '" value="' + j + '">' + o + '</label>';
    });
    html += '</div>';
  });
  html += '<button onclick="checkFinalAssessment()" class="submit-btn">Submit Assessment</button></div>';
  hideAllContent();
  showAssessmentPanel(html);
  window._finalData = { username: username, questions: finalQuestions };
}

function checkFinalAssessment() {
  const data = window._finalData;
  if (!data) return;
  const username = data.username;
  const questions = data.questions;
  let score = 0;
  questions.forEach((q, i) => {
    const sel = document.querySelector('input[name="final_q' + i + '"]:checked');
    if (sel && +sel.value === q.answer) score++;
  });
  const percent = Math.round((score / questions.length) * 100);
  let grade = 'F';
  if (percent >= 90) grade = 'A';
  else if (percent >= 80) grade = 'B';
  else if (percent >= 70) grade = 'C';
  else if (percent >= 60) grade = 'D';
  let html = '<div class="intro"><h2>Final Assessment Result</h2>';
  html += '<p><strong>' + username + '</strong></p>';
  html += '<p>Score: <strong>' + percent + '%</strong></p>';
  html += '<p>Grade: <strong>' + grade + '</strong></p>';
  if (percent >= 70) {
    html += '<p class="result-pass">OK PASSED</p>';
    html += '<button onclick="downloadCertificate(\'' + username + '\', ' + percent + ', \'' + grade + '\')" class="submit-btn">Download Certificate</button>';
  } else {
    html += '<p class="result-fail">X FAILED</p>';
    html += '<button onclick="goBackHome()" class="cancel-btn">Back to Home</button>';
  }
  html += '</div>';
  hideAllContent();
  showAssessmentPanel(html);
}

// ===============================
// CERTIFICATE DOWNLOAD
// ===============================
function downloadCertificate(studentName, score, grade) {
  const courseTitle = 'Mobile Development Assessment';
  const certHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Certificate - ${studentName}</title>
<style>
body {
  font-family: 'Georgia', serif;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}
.cert {
  border: 5px solid #ffd60a;
  border-radius: 20px;
  padding: 60px 80px;
  max-width: 750px;
  text-align: center;
  position: relative;
  background: linear-gradient(145deg, #ffffff, #fff8dc);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
.cert::before {
  content: '';
  position: absolute;
  top: 10px; left: 10px; right: 10px; bottom: 10px;
  border: 2px solid #ffd60a;
  border-radius: 16px;
  pointer-events: none;
}
h1 {
  color: #ff6b35;
  font-size: 2.5rem;
  margin-bottom: 12px;
}
.badge {
  font-size: 4rem;
  margin: 20px 0;
}
.student {
  font-size: 2.2rem;
  color: #7c3aed;
  font-weight: 700;
  margin: 16px 0;
}
.grade {
  color: #06d6a0;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 14px;
}
.date {
  color: #555;
  font-size: 0.95rem;
  margin-top: 12px;
}
.signature {
  margin-top: 40px;
}
.signature .line {
  width: 180px;
  margin: 0 auto 6px;
  border-top: 1.5px solid #000;
}
.signature .name {
  font-size: 1rem;
  color: #000;
  font-weight: 600;
}
.signature .role {
  font-size: 0.8rem;
  color: #555;
}
.seal {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #fff;
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.2;
  position: absolute;
  top: 20px;
  right: 40px;
  background: radial-gradient(circle at 30% 30%, #ffd700, #cfa000 80%);
  box-shadow: 0 6px 15px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,255,255,0.4);
  border: 3px solid #b8860b;
  transform: rotate(-10deg);
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
}
</style>
</head>
<body>
<div class="cert">
  <div class="seal">Boda<br>Academy</div>
  <div class="badge">*</div>
  <p style="font-size:.85rem;text-transform:uppercase;letter-spacing:.25em;color:#888">Certificate of Completion</p>
  <h1>${courseTitle}</h1>
  <p style="color:#666;margin-bottom:10px">Awarded to</p>
  <div class="student">${studentName}</div>
  <p style="color:#666;margin-bottom:10px">has successfully completed this course</p>
  <div class="grade">Grade: ${grade} * ${score}%</div>
  <div class="date">Issued: ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</div>
  <div class="date">BodaAcademy * Mobile Development Program</div>
  <div class="signature">
    <div class="line"></div>
    <div class="name">Abdullah Salah</div>
    <div class="role">Instructor / Supervisor</div>
  </div>
</div>
</body>
</html>`;

  const blob = new Blob([certHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'BodaAcademy_Certificate_' + studentName.replace(/\s+/g, '_') + '.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  alert('Certificate downloaded successfully!');
}

// ===============================
// SEARCH FUNCTIONALITY
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initializeLessonStates();
  const input = document.getElementById("searchInput");
  if (input) {
    input.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      document.querySelectorAll(".lesson-list div[data-lesson]").forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(value) ? "block" : "none";
      });
    });
  }
});
