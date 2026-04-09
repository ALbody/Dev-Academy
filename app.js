const lessonOrder = [
  'lesson1','lesson2','lesson3','lesson4','lesson5',
  'lesson6','lesson7','lesson8','lesson9','lesson10',
  'lesson11','lesson12','lesson13','lesson14','lesson15',
  'lesson16','lesson17','lesson18','lesson19'
];

let unlockedLessons = ['lesson1'];
let currentLesson = 0;

// ===============================
// Sidebar Controls
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
// Sections Toggle
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
// Lesson Navigation
// ===============================
function canOpenLesson(id) {
  return unlockedLessons.includes(id);
}

// STRICT SEQUENTIAL CONTROL
function showLesson(id) {
  const index = lessonOrder.indexOf(id);
  if (index === -1) return;

  if (!canOpenLesson(id)) {
    alert('هذا الدرس مقفل. اتبع الترتيب.');
    return;
  }

  if (index > currentLesson + 1) {
    alert('لا يمكن تخطي الدروس.');
    return;
  }

  document.getElementById('intro').style.display = 'none';

  document.querySelectorAll('.lesson').forEach(lesson => {
    lesson.style.display = (lesson.id === id) ? 'block' : 'none';
  });

  currentLesson = index;
  closeSidebar();
}

// الانتقال إلى أول درس
function move() {
  showLesson('lesson1');
}

// ===============================
// Next Lesson
// ===============================
function nextLesson() {
  if (currentLesson >= lessonOrder.length - 1) return;

  const next = lessonOrder[currentLesson + 1];

  if (!unlockedLessons.includes(next)) {
    unlockedLessons.push(next);
  }

  currentLesson++;
  showLesson(lessonOrder[currentLesson]);
}

// ===============================
// Previous Lesson
// ===============================
function prevLesson() {
  if (currentLesson <= 0) return;

  currentLesson--;
  showLesson(lessonOrder[currentLesson]);
}

// ===============================
// Start Test
// ===============================
function startTest() {
  if (unlockedLessons.length < lessonOrder.length) {
    alert('أكمل كل الدروس أولاً');
    return;
  }

  const username = prompt("ادخل اسمك:");
  if (!username) return;

  closeSidebar();

  document.getElementById('intro').style.display = 'none';
  document.querySelectorAll('.lesson').forEach(l => l.style.display = 'none');

  const questions = [
    { q: "ما وظيفة HTML?", options: ["تصميم", "هيكل", "بيانات", "سيرفر"], answer: 1 },
    { q: "وسم العنوان؟", options: ["p","div","h1","span"], answer: 2 },
    { q: "إضافة صورة؟", options: ["img","src","image","pic"], answer: 0 },
    { q: "CSS وظيفته؟", options: ["تصميم","هيكل","بيانات","سيرفر"], answer: 0 },
    { q: "لون النص؟", options: ["font","color","bg","border"], answer: 1 },
    { q: "ربط CSS؟", options: ["script","style","link","meta"], answer: 2 },
    { q: "JS للتفاعل؟", options: ["HTML","CSS","JS","SQL"], answer: 2 },
    { q: "var تعني؟", options: ["متغير","ثابت","دالة","نص"], answer: 0 },
    { q: "if معناها؟", options: ["loop","شرط","function","print"], answer: 1 },
    { q: "DOM؟", options: ["لغة","نظام","صفحة","ملف"], answer: 2 }
  ];

  let html = `<div class="intro"><h2>Exam</h2>`;

  questions.forEach((q, i) => {
    html += `<p>${i + 1}. ${q.q}</p>`;
    q.options.forEach((o, j) => {
      html += `
        <label>
          <input type="radio" name="q${i}" value="${j}"> ${o}
        </label><br>`;
    });
  });

  html += `
    <button onclick='checkTest("${username}", ${JSON.stringify(questions)})'>
      تقييم
    </button>
  </div>`;

  document.getElementById('mainContent').innerHTML = html;
}

// ===============================
// Check Test
// ===============================
function checkTest(username, questions) {
  let score = 0;

  questions.forEach((q, i) => {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    if (sel && +sel.value === q.answer) score++;
  });

  const percent = Math.round((score / questions.length) * 100);
  const grade = percent >= 90 ? "A" :
                percent >= 80 ? "B" :
                percent >= 70 ? "C" : "F";

  let html = `<div class="intro">
    <h2>Result</h2>
    <p>Student: ${username}</p>
    <p>Score: ${percent}%</p>
    <p>${score}/${questions.length}</p>`;

  if (percent >= 70) {
    html += `
      <button onclick='downloadCert({title:"Frontend Development"}, ${percent}, "${grade}", "${username}")'>
        Certificate
      </button>`;
  } else {
    html += `<p>Fail</p>`;
  }

  html += `</div>`;

  document.getElementById('mainContent').innerHTML = html;
}

// ===============================
// Download Certificate
// ===============================
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

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}
