const lessonOrder = ['lesson1','lesson2','lesson3' , 'lesson4','lesson5','lesson6'];

let unlockedLessons = ['lesson1'];
let currentLesson = 0;

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('show');
  document.getElementById('mainContent').classList.toggle('shift');
}

function toggleSection(el) {
  const list = el.nextElementSibling;
  const arrow = el.querySelector('.arrow');
  if (list && list.style.display === 'flex') { list.style.display = 'none'; arrow.classList.remove('down'); }
  else if (list) { list.style.display = 'flex'; arrow.classList.add('down'); }
}

function canOpenLesson(id) { return unlockedLessons.includes(id); }

function showLesson(id) {
  if (!canOpenLesson(id)) { alert('يجب إنهاء الدرس السابق أولاً.'); return; }
  document.getElementById('intro').style.display = 'none';
  document.querySelectorAll('.lesson').forEach(l => l.style.display = l.id===id?'block':'none');
  currentLesson = lessonOrder.indexOf(id);
  toggleSidebar();
}

function nextLesson() {
  if (currentLesson < lessonOrder.length-1) {
    if(!unlockedLessons.includes(lessonOrder[currentLesson+1])) unlockedLessons.push(lessonOrder[currentLesson+1]);
    showLesson(lessonOrder[currentLesson+1]);
  }
}

function prevLesson() {
  if (currentLesson > 0) showLesson(lessonOrder[currentLesson-1]);
}
 // exam
function startTest() {
  if (unlockedLessons.length < lessonOrder.length) {
    alert('يجب إنهاء جميع الدروس أولاً للتمكن من الاختبار.');
    return;
  }
  const username = prompt("من فضلك أدخل اسمك لبدء الاختبار:");
  if (!username) return;

  toggleSidebar();
  document.getElementById('intro').style.display='none';
  document.querySelectorAll('.lesson').forEach(l=>l.style.display='none');

  const questions = [
    {q:"ما الوظيفة الأساسية للغة HTML?", options:["تصميم الصفحة","بناء الهيكل","إدارة البيانات","تشغيل الخادم"], answer:1},
    {q:"أي وسم يُستخدم لكتابة عنوان رئيسي؟", options:["p","div","h1","span"], answer:2},
    {q:"أي وسم يُستخدم لإضافة صورة في HTML?", options:["img","src","image","pic>"], answer:0},
    {q:"ما وظيفة CSS?", options:["تصميم الصفحة","بناء الهيكل","إدارة البيانات","تشغيل الخادم"], answer:1},
    {q:"أي خاصية تغير لون النص؟", options:["font-size","color","background","border"], answer:1},
    {q:"أي من التالي يستخدم لربط CSS?", options:["script","style","link","meta"], answer:2},
    {q:"ما لغة البرمجة المستخدمة للتفاعل؟", options:["HTML","CSS","JavaScript","SQL"], answer:2},
    {q:"أي كلمة تستخدم لتعريف متغير؟", options:["int","var","define","value"], answer:1},
    {q:"ما وظيفة if في JavaScript?", options:["تكرار الكود","تنفيذ شرط","تعريف دالة","عرض نص"], answer:1},
    {q:"ما هو DOM?", options:["لغة برمجة","نظام تشغيل","تمثيل صفحة HTML","محرر نصوص"], answer:2}
  ];

  let html = '<div class="intro"><h2>اختبار الوحدة 🌱</h2>';
  questions.forEach((qs,i)=>{
    html += `<p>${i+1}. ${qs.q}</p>`;
    qs.options.forEach((opt,j)=>{
      html += `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br>`;
    });
  });
  html += `<button onclick='checkTest("${username}", ${JSON.stringify(questions)})'>تقييم الاختبار</button></div>`;
  document.getElementById('mainContent').innerHTML = html;
}
 // test exam
function checkTest(username, questions){
  let score = 0;
  questions.forEach((qs,i)=>{
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    if(sel && parseInt(sel.value)===qs.answer) score++;
  });
  const percent = Math.round((score/questions.length)*100);
  const grade = percent>=90?"A":percent>=80?"B":percent>=70?"C":"F";

  let html = `<div class="intro"><h2>نتيجة الاختبار 🌟</h2>`;
  html += `<p>اسم الطالب: <strong>${username}</strong></p>`;
  html += `<p>الدرجة: ${percent}% (${score}/${questions.length})</p>`;
  html += `<p>التاريخ: ${new Date().toLocaleDateString('ar-EG')}</p>`;
  if(percent>=70){
    html += `<p>مبروك! لقد اجتزت الاختبار بنجاح.</p>`;
    html += `<button onclick='downloadCert({title:"وحدة العلوم"}, ${percent}, "${grade}", "${username}")'>تحميل الشهادة</button>`;
  } else {
    html += `<p>للأسف، لم تحقق الحد الأدنى 70%. حاول مرة أخرى.</p>`;
  }
  html += `</div>`;
  document.getElementById('mainContent').innerHTML = html;
}
 // الشهادة
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
