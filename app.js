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
    {q:"ما العنصر الأساسي للحياة؟", options:["الماء","النباتات","الحيوانات"], answer:0},
    {q:"ما الذي تنتجه النباتات؟", options:["الأكسجين","الفحم","المعادن"], answer:0},
    {q:"ما دور الحيوانات في البيئة؟", options:["لا دور لها","تلعب دورًا مهمًا","تسبب مشاكل"], answer:1},
    {q:"أين يوجد الماء؟", options:["في الأرض فقط","في البحر فقط","في جميع الكائنات"], answer:2},
    {q:"أي من التالي غذاء للنباتات؟", options:["الأكسجين","الضوء","الفضاء"], answer:1},
    {q:"الحيوانات تتكاثر عن طريق؟", options:["البيض","التكاثر الجنسي","الاثنان"], answer:2},
    {q:"الماء مهم لـ؟", options:["الشرب","الطعام","النوم"], answer:0},
    {q:"النباتات توفر؟", options:["المعادن","الأكسجين","الوقود"], answer:1},
    {q:"الحيوانات تعيش في؟", options:["الماء","البر والبحر","البر فقط"], answer:1},
    {q:"الماء يساهم في؟", options:["تنظيم الحرارة","الإضاءة","الصوت"], answer:0}
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
}            validate: (code) => {
              const c = code.toLowerCase();
              const ulItems = (c.match(/<ul[\s>]/g)||[]).length >= 1;
              const olItems = (c.match(/<ol[\s>]/g)||[]).length >= 1;
              const liCount = (c.match(/<li>/g)||[]).length;
              if (ulItems && olItems && liCount >= 6) return { status: 'correct', msg: '✅ Lists complete! Both ul and ol with 3 items each.' };
              if (ulItems || olItems) return { status: 'partial', msg: `⚠️ Have ${liCount} <li> items. Need both <ul> and <ol> with 3 items each.` };
              return { status: 'error', msg: '❌ Create a <ul> and an <ol>, each with 3 <li> items.' };
            }
          },
          {
            id: 'html-l7', title: 'Module Quiz', type: 'Quiz', diff: 'Beginner', xp: 30,
            quiz: [
              { q: 'Which attribute specifies the URL of a link?', options: ['src','link','url','href'], correct: 3 },
              { q: 'What attribute is required on all images for accessibility?', options: ['title','alt','caption','desc'], correct: 1 },
              { q: 'Which tag creates an ordered (numbered) list?', options: ['ul','list','ol','dl'], correct: 2 },
              { q: 'How do you open a link in a new tab?', options: ['tab="_new"','target="_blank"','open="new"','window="_blank"'], correct: 1 },
            ]
          }
        ]
      },
      {
        id: 'html-m3', title: 'Forms & Tables',
        lessons: [
          {
            id: 'html-l8', title: 'HTML Forms', type: 'Lesson', diff: 'Intermediate', xp: 35,
            mode: 'htmlmixed', editorTabs: ['HTML'],
            explanation: `<p>Forms collect user input. The <code>&lt;form&gt;</code> element wraps input fields. Key elements include <code>&lt;input&gt;</code>, <code>&lt;label&gt;</code>, <code>&lt;textarea&gt;</code>, <code>&lt;select&gt;</code>, and <code>&lt;button&gt;</code>.</p><p>Always associate <code>&lt;label&gt;</code> with inputs using the <code>for</code> and <code>id</code> attributes — this is essential for accessibility.</p>`,
            example: `<form action="/submit" method="POST">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email">\n\n  <button type="submit">Send</button>\n</form>`,
            task: 'Build a contact form with a text input for name, an email input for email, a textarea for message, and a submit button. Each input must have a matching label.',
            starterCode: `<!-- Build your form here -->\n<form>\n\n</form>`,
            validate: (code) => {
              const c = code.toLowerCase();
              const hasForm = c.includes('<form');
              const hasText = c.includes('type="text"') || c.includes("type='text'");
              const hasEmail = c.includes('type="email"') || c.includes("type='email'");
              const hasTextarea = c.includes('<textarea');
              const hasLabel = (c.match(/<label/g)||[]).length >= 2;
              const hasSubmit = c.includes('type="submit"') || c.includes('type=\'submit\'') || (c.includes('<button') && !c.includes('type='));
              const score = [hasForm, hasText, hasEmail, hasTextarea, hasLabel, hasSubmit].filter(Boolean).length;
              if (score === 6) return { status: 'correct', msg: '✅ Excellent form! All elements correctly implemented.' };
              if (score >= 4) return { status: 'partial', msg: '⚠️ Almost there! Check: text input, email input, textarea, labels, submit button.' };
              return { status: 'error', msg: '❌ Build a <form> with text, email inputs, textarea, labels, and submit button.' };
            }
          },
          {
            id: 'html-l9', title: 'HTML Tables', type: 'Lesson', diff: 'Intermediate', xp: 35,
            mode: 'htmlmixed', editorTabs: ['HTML'],
            explanation: `<p>Tables are for displaying tabular data. Use <code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tr&gt;</code> (row), <code>&lt;th&gt;</code> (header cell), and <code>&lt;td&gt;</code> (data cell).</p><p>Add a <code>&lt;caption&gt;</code> element to describe the table's purpose. This improves accessibility significantly.</p>`,
            example: `<table>\n  <caption>Monthly Budget</caption>\n  <thead>\n    <tr>\n      <th>Category</th>\n      <th>Amount</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Food</td>\n      <td>$300</td>\n    </tr>\n  </tbody>\n</table>`,
            task: 'Create a table with a <code>&lt;thead&gt;</code> containing at least 2 header cells, and a <code>&lt;tbody&gt;</code> with at least 2 data rows.',
            starterCode: `<!-- Create your table here -->\n`,
            validate: (code) => {
              const c = code.toLowerCase();
              const hasTable = c.includes('<table');
              const hasThead = c.includes('<thead>');
              const hasTbody = c.includes('<tbody>');
              const thCount = (c.match(/<th/g)||[]).length;
              const trCount = (c.match(/<tr>/g)||[]).length;
              if (hasTable && hasThead && hasTbody && thCount >= 2 && trCount >= 3) return { status: 'correct', msg: '✅ Table structure is perfect!' };
              if (hasTable && (hasThead || hasTbody)) return { status: 'partial', msg: '⚠️ Add both <thead> and <tbody>, with 2+ <th> and 2+ data rows.' };
              return { status: 'error', msg: '❌ Build a <table> with <thead> and <tbody> sections.' };
            }
          },
          {
            id: 'html-l10', title: 'Final HTML Assessment', type: 'Quiz', diff: 'Intermediate', xp: 60,
            isFinal: true,
            quiz: [
              { q: 'Which HTML5 element represents the main content area of a document?', options: ['content','main','section','article'], correct: 1 },
              { q: 'What attribute makes an input field required?', options: ['mandatory','must-fill','required','validate'], correct: 2 },
              { q: 'Which element is used to group table header cells?', options: ['header','head','thead','th-group'], correct: 2 },
              { q: 'What is the correct way to create a checkbox input?', options: ['input type="check"','input type="checkbox"','checkbox','input check'], correct: 1 },
              { q: 'Which attribute on <img> provides text for screen readers?', options: ['title','description','alt','aria-text'], correct: 2 },
            ]
          }
        ]
      }
    ]
  },
  css: {
    id: 'css', title: 'CSS Styling', icon: '🎨',
    desc: 'Make beautiful web designs with modern CSS.',
    color: 'cc-bar-css',
    modules: [
      {
        id: 'css-m1', title: 'CSS Basics',
        lessons: [
          {
            id: 'css-l1', title: 'Selectors & Properties', type: 'Lesson', diff: 'Beginner', xp: 20,
            mode: 'css', editorTabs: ['CSS'],
            explanation: `<p>CSS (Cascading Style Sheets) styles your HTML. A CSS rule has a <strong>selector</strong> and a <strong>declaration block</strong> containing property-value pairs.</p><p>Common selectors: <code>element</code>, <code>.class</code>, <code>#id</code>, and combinations like <code>p.intro</code>.</p>`,
            example: `/* Element selector */\nh1 { color: navy; font-size: 2rem; }\n\n/* Class selector */\n.highlight { background-color: yellow; }\n\n/* ID selector */\n#header { background: #333; color: white; }`,
            task: 'Write CSS that targets <code>body</code> (set background-color), <code>h1</code> (set color and font-size), and a class selector <code>.box</code> (set any 2 properties).',
            starterCode: `/* Write your CSS rules here */\n\n`,
            validate: (code) => {
              const c = code.toLowerCase();
              const hasBody = c.includes('body') && c.includes('background');
              const hasH1 = c.includes('h1') && (c.includes('color') || c.includes('font-size'));
              const hasClass = c.includes('.box') || c.includes('.container') || c.includes('.highlight');
              if (hasBody && hasH1 && hasClass) return { status: 'correct', msg: '✅ Great CSS! Selectors and properties mastered.' };
              if (hasBody || hasH1) return { status: 'partial', msg: '⚠️ Need: body{background}, h1{color/font-size}, and a .class selector.' };
              return { status: 'error', msg: '❌ Write rules for body, h1, and a class selector.' };
            }
          },
          {
            id: 'css-l2', title: 'The Box Model', type: 'Lesson', diff: 'Beginner', xp: 25,
            mode: 'css', editorTabs: ['CSS'],
            explanation: `<p>Every HTML element is a box. The <strong>CSS Box Model</strong> consists of: <strong>content</strong> → <strong>padding</strong> → <strong>border</strong> → <strong>margin</strong> (from inside out).</p><p>Use <code>box-sizing: border-box</code> to make width calculations include padding and border — this is the modern standard.</p>`,
            example: `.card {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #333;\n  margin: 16px auto;\n  box-sizing: border-box;\n}`,
            task: 'Write a <code>.card</code> class with explicit <code>padding</code>, <code>margin</code>, <code>border</code>, and <code>box-sizing: border-box</code>.',
            starterCode: `/* Style the .card class */\n\n`,
            validate: (code) => {
              const c = code.toLowerCase();
              const hasCard = c.includes('.card');
              const hasPadding = c.includes('padding');
              const hasMargin = c.includes('margin');
              const hasBorder = c.includes('border');
              const hasBBox = c.includes('box-sizing') && c.includes('border-box');
              if (hasCard && hasPadding && hasMargin && hasBorder && hasBBox) return { status: 'correct', msg: '✅ Box model mastered! All properties correct.' };
              if (hasCard && (hasPadding || hasMargin || hasBorder)) return { status: 'partial', msg: '⚠️ Almost! Need: .card with padding, margin, border, AND box-sizing:border-box.' };
              return { status: 'error', msg: '❌ Create a .card rule with padding, margin, border, box-sizing.' };
            }
          },
          {
            id: 'css-l3', title: 'Module Quiz', type: 'Quiz', diff: 'Beginner', xp: 25,
            quiz: [
              { q: 'What does CSS stand for?', options: ['Creative Style Syntax','Cascading Style Sheets','Computer Style System','Cascading System Sheets'], correct: 1 },
              { q: 'Which property sets the space INSIDE an element border?', options: ['margin','spacing','padding','gap'], correct: 2 },
              { q: 'What value of box-sizing includes border and padding in the width?', options: ['content-box','include-box','border-box','full-box'], correct: 2 },
              { q: 'How do you select all elements with class "card"?', options: ['card','#card','.card','*card'], correct: 2 },
            ]
          }
        ]
      },
      {
        id: 'css-m2', title: 'Layout with Flexbox & Grid',
        lessons: [
          {
            id: 'css-l4', title: 'Flexbox Layout', type: 'Lesson', diff: 'Intermediate', xp: 35,
            mode: 'css', editorTabs: ['CSS'],
            explanation: `<p>Flexbox is a one-dimensional layout system. Set <code>display: flex</code> on a container and its children become flex items.</p><p>Key properties: <code>justify-content</code> (main axis), <code>align-items</code> (cross axis), <code>flex-wrap</code>, <code>gap</code>. On children: <code>flex</code>, <code>order</code>.</p>`,
            example: `.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n.nav-item { flex: 1; }`,
            task: 'Write a <code>.container</code> CSS rule using Flexbox with <code>justify-content</code>, <code>align-items</code>, and <code>gap</code> properties.',
            starterCode: `/* Create your Flexbox layout */\n\n`,
            validate: (code) => {
              const c = code.toLowerCase();
              const hasFlex = c.includes('display: flex') || c.includes('display:flex');
              const hasJustify = c.includes('justify-content');
              const hasAlign = c.includes('align-items');
              const hasGap = c.includes('gap');
              if (hasFlex && hasJustify && hasAlign && hasGap) return { status: 'correct', msg: '✅ Flexbox champion! All properties set correctly.' };
              if (hasFlex && (hasJustify || hasAlign)) return { status: 'partial', msg: '⚠️ Add justify-content, align-items, AND gap to your flex container.' };
              return { status: 'error', msg: '❌ Start with display: flex, then add justify-content, align-items, gap.' };
            }
          },
          {
            id: 'css-l5', title: 'CSS Grid Layout', type: 'Lesson', diff: 'Intermediate', xp: 35,
            mode: 'css', editorTabs: ['CSS'],
            explanation: `<p>CSS Grid is a two-dimensional layout system. Use <code>display: grid</code> with <code>grid-template-columns</code> and <code>grid-template-rows</code> to define structure.</p><p>The <code>fr</code> unit distributes available space fractionally. <code>repeat()</code> and <code>minmax()</code> are powerful shorthand functions.</p>`,
            example: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto;\n  gap: 24px;\n}\n\n.feature-card {\n  grid-column: span 2;\n}`,
            task: 'Create a <code>.grid</code> layout with <code>display: grid</code>, <code>grid-template-columns</code> using <code>repeat()</code> or <code>fr</code> units, and a <code>gap</code>.',
            starterCode: `/* Create your Grid layout */\n\n`,
            validate: (code) => {
              const c = code.toLowerCase();
              const hasGrid = c.includes('display: grid') || c.includes('display:grid');
              const hasCols = c.includes('grid-template-columns');
              const hasFrOrRepeat = c.includes('fr') || c.includes('repeat(');
              const hasGap = c.includes('gap');
              if (hasGrid && hasCols && hasFrOrRepeat && hasGap) return { status: 'correct', msg: '✅ Grid layout mastered! Clean, modern layout.' };
              if (hasGrid && hasCols) return { status: 'partial', msg: '⚠️ Use fr units or repeat() in grid-template-columns, and add gap.' };
              return { status: 'error', msg: '❌ Use display: grid with grid-template-columns and gap.' };
            }
          },
          {
            id: 'css-l6', title: 'Final CSS Assessment', type: 'Quiz', diff: 'Intermediate', xp: 60,
            isFinal: true,
            quiz: [
              { q: 'Which CSS property creates a flexible container?', options: ['display: inline','display: flex','position: flex','layout: flex'], correct: 1 },
              { q: 'What does the "fr" unit represent in CSS Grid?', options: ['Fixed ratio','Fraction of available space','Frame rate','Float right'], correct: 1 },
              { q: 'Which property aligns flex items along the cross axis?', options: ['justify-content','flex-align','align-items','cross-align'], correct: 2 },
              { q: 'How do you make a grid with 3 equal columns?', options: ['grid-cols: 3','grid-template-columns: 1fr 1fr 1fr','columns: 3fr','grid: equal(3)'], correct: 1 },
              { q: 'Which property controls spacing BETWEEN flex/grid items?', options: ['margin','gutter','padding','gap'], correct: 3 },
            ]
          }
        ]
      }
    ]
  },
  js: {
    id: 'js', title: 'JavaScript Essentials', icon: '⚡',
    desc: 'Build interactive, dynamic web experiences.',
    color: 'cc-bar-js',
    modules: [
      {
        id: 'js-m1', title: 'JS Fundamentals',
        lessons: [
          {
            id: 'js-l1', title: 'Variables & Data Types', type: 'Lesson', diff: 'Beginner', xp: 20,
            mode: 'javascript', editorTabs: ['JS'],
            explanation: `<p>JavaScript has three variable declarations: <code>var</code> (legacy), <code>let</code> (reassignable), and <code>const</code> (constant). Prefer <code>const</code> by default, use <code>let</code> when reassignment is needed.</p><p>Core data types: <strong>string</strong>, <strong>number</strong>, <strong>boolean</strong>, <strong>null</strong>, <strong>undefined</strong>, <strong>object</strong>, <strong>array</strong>.</p>`,
            example: `const name = "Alice";   // string\nconst age = 25;         // number\nconst active = true;    // boolean\nlet score = 0;          // reassignable\n\nconst colors = ['red', 'green', 'blue']; // array\nconst user = { name: 'Alice', age: 25 }; // object\n\nconsole.log(typeof name); // "string"`,
            task: 'Declare a <code>const</code> string, a <code>const</code> number, a <code>let</code> boolean, and an array with at least 3 items. Log them all with <code>console.log()</code>.',
            starterCode: `// Declare your variables here\n\n`,
            validate: (code) => {
              const c = code;
              const hasConst = (c.match(/const /g)||[]).length >= 2;
              const hasLet = c.includes('let ');
              const hasArray = c.includes('[') && c.includes(']');
              const hasLog = c.includes('console.log');
              if (hasConst && hasLet && hasArray && hasLog) return { status: 'correct', msg: '✅ Variables declared correctly!' };
              if (hasConst || hasLet) return { status: 'partial', msg: '⚠️ Need: 2+ const, 1 let, an array, and console.log().' };
              return { status: 'error', msg: '❌ Declare const, let variables, an array, and use console.log().' };
            }
          },
          {
            id: 'js-l2', title: 'Functions', type: 'Lesson', diff: 'Beginner', xp: 25,
            mode: 'javascript', editorTabs: ['JS'],
            explanation: `<p>Functions are reusable blocks of code. JavaScript has <strong>function declarations</strong>, <strong>function expressions</strong>, and modern <strong>arrow functions</strong>.</p><p>Arrow functions (<code>=></code>) have a concise syntax and don't bind their own <code>this</code> — great for callbacks.</p>`,
            example: `// Declaration\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\n// Arrow function\nconst add = (a, b) => a + b;\n\n// With body\nconst multiply = (x, y) => {\n  const result = x * y;\n  return result;\n};\n\nconsole.log(greet("Alice")); // Hello, Alice!\nconsole.log(add(3, 4));       // 7`,
            task: 'Write a regular function <code>greet(name)</code> that returns a greeting string, AND an arrow function <code>add(a, b)</code> that returns the sum. Call both and log results.',
            starterCode: `// Write your functions here\n\n`,
            validate: (code) => {
              const c = code;
              const hasFunction = c.includes('function ');
              const hasArrow = c.includes('=>');
              const hasReturn = c.includes('return');
              const hasLog = c.includes('console.log');
              if (hasFunction && hasArrow && hasReturn && hasLog) return { status: 'correct', msg: '✅ Functions mastered! Both syntax styles used.' };
              if (hasFunction || hasArrow) return { status: 'partial', msg: '⚠️ Write both a regular function and an arrow function.' };
              return { status: 'error', msg: '❌ Create a regular function and an arrow function with return statements.' };
            }
          },
          {
            id: 'js-l3', title: 'Module Quiz', type: 'Quiz', diff: 'Beginner', xp: 25,
            quiz: [
              { q: 'Which keyword declares a block-scoped, reassignable variable?', options: ['var','const','let','set'], correct: 2 },
              { q: 'What does this arrow function return: `const double = x => x * 2`?', options: ['Nothing','x times 2','x plus 2','x divided by 2'], correct: 1 },
              { q: 'What is the output of: `typeof []`?', options: ['"array"','"list"','"object"','"undefined"'], correct: 2 },
              { q: 'Which statement is true about `const`?', options: ['Cannot be reassigned','Cannot be used in functions','Creates a global variable','Is the same as var'], correct: 0 },
            ]
          }
        ]
      },
      {
        id: 'js-m2', title: 'DOM & Events',
        lessons: [
          {
            id: 'js-l4', title: 'DOM Manipulation', type: 'Lesson', diff: 'Intermediate', xp: 35,
            mode: 'javascript', editorTabs: ['JS'],
            explanation: `<p>The <strong>Document Object Model</strong> (DOM) is a tree of HTML elements that JavaScript can read and modify. Use methods like <code>querySelector()</code>, <code>getElementById()</code>, and properties like <code>textContent</code>, <code>innerHTML</code>, <code>classList</code>.</p>`,
            example: `// Select elements\nconst title = document.querySelector('h1');\nconst btn = document.getElementById('myBtn');\n\n// Modify content\ntitle.textContent = "Updated Title";\ntitle.style.color = 'blue';\n\n// Create elements\nconst div = document.createElement('div');\ndiv.classList.add('box');\ndocument.body.appendChild(div);`,
            task: 'Write JS that uses <code>querySelector</code> or <code>getElementById</code>, changes an element\'s <code>textContent</code>, modifies a <code>style</code> property, and calls <code>classList.add()</code>.',
            starterCode: `// DOM manipulation code here\n// (This runs in a conceptual context)\n\n`,
            validate: (code) => {
              const c = code;
              const hasQuery = c.includes('querySelector') || c.includes('getElementById');
              const hasText = c.includes('textContent') || c.includes('innerHTML');
              const hasStyle = c.includes('.style.');
              const hasClass = c.includes('classList');
              if (hasQuery && hasText && hasStyle && hasClass) return { status: 'correct', msg: '✅ DOM manipulation skills confirmed!' };
              if (hasQuery && (hasText || hasStyle)) return { status: 'partial', msg: '⚠️ Also add style modification and classList.add().' };
              return { status: 'error', msg: '❌ Use querySelector, change textContent, modify style, and use classList.' };
            }
          },
          {
            id: 'js-l5', title: 'Event Listeners', type: 'Lesson', diff: 'Intermediate', xp: 35,
            mode: 'javascript', editorTabs: ['JS'],
            explanation: `<p>Events allow JavaScript to react to user interactions. Use <code>addEventListener(event, callback)</code> on DOM elements. Common events: <code>click</code>, <code>input</code>, <code>submit</code>, <code>keydown</code>, <code>mouseover</code>.</p><p>The callback receives an <code>event</code> object with details like <code>event.target</code> and <code>event.preventDefault()</code>.</p>`,
            example: `const btn = document.querySelector('#btn');\n\nbtn.addEventListener('click', (event) => {\n  console.log('Clicked!', event.target);\n  event.target.textContent = 'Clicked!';\n});\n\ndocument.querySelector('input')\n  .addEventListener('input', (e) => {\n    console.log('Value:', e.target.value);\n  });`,
            task: 'Write code that adds a <code>click</code> event listener to an element, and separately an <code>input</code> event listener. Use <code>event.target</code> in both callbacks.',
            starterCode: `// Add your event listeners here\n\n`,
            validate: (code) => {
              const c = code;
              const hasAddListener = (c.match(/addEventListener/g)||[]).length >= 2;
              const hasClick = c.includes("'click'") || c.includes('"click"');
              const hasInput = c.includes("'input'") || c.includes('"input"');
              const hasEventTarget = c.includes('event.target') || c.includes('e.target');
              if (hasAddListener && hasClick && hasInput && hasEventTarget) return { status: 'correct', msg: '✅ Event listeners wired up correctly!' };
              if (hasAddListener && (hasClick || hasInput)) return { status: 'partial', msg: '⚠️ Add both click and input listeners, using event.target.' };
              return { status: 'error', msg: '❌ Use addEventListener for both click and input events.' };
            }
          },
          {
            id: 'js-l6', title: 'Final JS Assessment', type: 'Quiz', diff: 'Intermediate', xp: 60,
            isFinal: true,
            quiz: [
              { q: 'What method selects the first matching CSS element?', options: ['getElementById','querySelector','getElement','selectElement'], correct: 1 },
              { q: 'How do you add a CSS class to a DOM element?', options: ['element.addStyle()','element.class.add()','element.classList.add()','element.css.add()'], correct: 2 },
              { q: 'What event fires when an input value changes?', options: ['"change" only','"modify"','"input"','"keypress"'], correct: 2 },
              { q: 'What is `event.preventDefault()` used for?', options: ['Stops event bubbling','Removes the element','Prevents default browser behavior','Pauses JavaScript'], correct: 2 },
              { q: 'Which method creates a new HTML element?', options: ['document.newElement()','document.createElement()','document.addElement()','document.buildElement()'], correct: 1 },
            ]
          }
        ]
      }
    ]
  }
};

// ══════════════════════════════════════════════════════
//  APP STATE
// ══════════════════════════════════════════════════════
let state = {
  studentName: '',
  currentTrack: 'html',
  currentLesson: null,
  completedLessons: {},
  xp: 0,
  notes: {},
  attempts: {},
  quizAnswers: {},
  certScores: {},
};

function saveState() {
  try { localStorage.setItem('bodaacademy_state', JSON.stringify(state)); } catch(e){}
}
function loadState() {
  try {
    const s = localStorage.getItem('bodaacademy_state');
    if (s) state = { ...state, ...JSON.parse(s) };
  } catch(e){}
}
loadState();

// ══════════════════════════════════════════════════════
//  XP / LEVEL
// ══════════════════════════════════════════════════════
const LEVELS = [
  {min:0,max:100,label:'Novice'},
  {min:100,max:250,label:'Apprentice'},
  {min:250,max:500,label:'Developer'},
  {min:500,max:800,label:'Engineer'},
  {min:800,max:1200,label:'Architect'},
  {min:1200,max:Infinity,label:'Master'},
];

function getLevel(xp) {
  for (let i = LEVELS.length-1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return { num: i+1, ...LEVELS[i] };
  }
  return { num: 1, ...LEVELS[0] };
}

function updateXPDisplay() {
  const lv = getLevel(state.xp);
  const progress = ((state.xp - lv.min) / (lv.max - lv.min)) * 100;
  document.getElementById('level-badge').textContent = `Lvl ${lv.num} · ${lv.label}`;
  document.getElementById('xp-bar').style.width = Math.min(100, progress) + '%';
  document.getElementById('xp-text').textContent = `${state.xp} XP`;
}

// ══════════════════════════════════════════════════════
//  PROGRESS
// ══════════════════════════════════════════════════════
function getTotalLessons() {
  let t = 0;
  Object.values(CURRICULUM).forEach(c => c.modules.forEach(m => { t += m.lessons.length; }));
  return t;
}
function getCompletedCount() { return Object.keys(state.completedLessons).length; }

function updateProgressDisplay() {
  const total = getTotalLessons();
  const done = getCompletedCount();
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  document.getElementById('prog-bar').style.width = pct + '%';
  document.getElementById('prog-pct').textContent = `${pct}% Complete`;
}

// ══════════════════════════════════════════════════════
//  SIDEBAR BUILD
// ══════════════════════════════════════════════════════
function buildSidebar(filter = '') {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';
  const fl = filter.toLowerCase();

  Object.values(CURRICULUM).forEach(course => {
    const courseEl = document.createElement('div');
    const isOpen = true;
    const ch = document.createElement('div');
    ch.className = 'course-header' + (isOpen ? ' open' : '');
    ch.innerHTML = `${course.icon} ${course.title} <span class="ch-arrow">▶</span>`;
    ch.onclick = () => {
      ch.classList.toggle('open');
      moduleBlock.style.display = ch.classList.contains('open') ? '' : 'none';
    };
    courseEl.appendChild(ch);

    const moduleBlock = document.createElement('div');
    moduleBlock.className = 'module-block';

    course.modules.forEach(mod => {
      const filteredLessons = mod.lessons.filter(l => !fl || l.title.toLowerCase().includes(fl));
      if (fl && filteredLessons.length === 0) return;

      const mh = document.createElement('div');
      mh.className = 'module-header open';
      mh.innerHTML = `<span class="mh-arrow">▶</span>${mod.title}`;
      const ll = document.createElement('div');
      ll.className = 'lesson-list';
      mh.onclick = () => {
        mh.classList.toggle('open');
        ll.style.display = mh.classList.contains('open') ? '' : 'none';
      };
      moduleBlock.appendChild(mh);

      filteredLessons.forEach(lesson => {
        const li = document.createElement('div');
        const done = !!state.completedLessons[lesson.id];
        const active = state.currentLesson?.id === lesson.id;
        li.className = `lesson-item${active ? ' active' : ''}`;
        li.innerHTML = `<div class="lesson-dot${done ? ' done' : (active ? ' active' : '')}">${done ? '✓' : ''}</div>${lesson.title}`;
        li.onclick = () => openLesson(lesson.id);
        ll.appendChild(li);
      });
      moduleBlock.appendChild(ll);
    });

    courseEl.appendChild(moduleBlock);
    nav.appendChild(courseEl);
  });
}

// ══════════════════════════════════════════════════════
//  CODEMIROR INSTANCE
// ══════════════════════════════════════════════════════
let cmEditor = null;

function initEditor(mode, value) {
  const wrap = document.getElementById('cm-wrap');
  wrap.innerHTML = '';
  const ta = document.createElement('textarea');
  wrap.appendChild(ta);
  if (cmEditor) { try { cmEditor.toTextArea(); } catch(e){} }
  cmEditor = CodeMirror.fromTextArea(ta, {
    mode: mode === 'javascript' ? 'javascript' : mode === 'css' ? 'css' : 'htmlmixed',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    lineWrapping: false,
    tabSize: 2,
    indentWithTabs: false,
    extraKeys: { 'Ctrl-Enter': () => runCode(), 'Cmd-Enter': () => runCode() },
  });
  cmEditor.setValue(value || '');
  setTimeout(() => cmEditor.refresh(), 50);
}

// ══════════════════════════════════════════════════════
//  LESSON RENDER
// ══════════════════════════════════════════════════════
function findLesson(id) {
  for (const c of Object.values(CURRICULUM)) {
    for (const m of c.modules) {
      for (const l of m.lessons) {
        if (l.id === id) return { lesson: l, course: c, module: m };
      }
    }
  }
  return null;
}

function openLesson(id) {
  const found = findLesson(id);
  if (!found) return;
  const { lesson, course, module } = found;
  state.currentLesson = lesson;
  saveState();

  if (lesson.type === 'Quiz' || lesson.type === 'Final') {
    openQuiz(lesson, course);
    return;
  }

  showView('lesson');
  document.getElementById('lesson-breadcrumb').textContent = `${course.icon} ${course.title} / ${module.title}`;
  document.getElementById('lesson-title').textContent = lesson.title;
  document.getElementById('lesson-meta').innerHTML = `
    <span class="meta-tag tag-xp">⚡ ${lesson.xp} XP</span>
    <span class="meta-tag tag-type">${lesson.type}</span>
    <span class="meta-tag tag-diff">${lesson.diff}</span>
  `;

  // Left panel
  const left = document.getElementById('lesson-left');
  left.innerHTML = `
    <div class="section-title">📖 Explanation</div>
    <div class="explanation">${lesson.explanation}</div>
    <div class="section-title">💻 Example</div>
    <div class="example-block">
      <div class="example-header"><span>example.${lesson.mode === 'css' ? 'css' : lesson.mode === 'javascript' ? 'js' : 'html'}</span></div>
      <div class="example-code">${escapeHtml(lesson.example)}</div>
    </div>
    <div class="section-title">🎯 Your Task</div>
    <div class="task-block">
      <div class="task-title">Challenge</div>
      <div class="task-desc">${lesson.task}</div>
    </div>
    <div class="notes-area">
      <div class="section-title" style="margin-bottom:8px">📝 Notes</div>
      <textarea class="notes-textarea" id="lesson-notes" placeholder="Write your notes here...">${state.notes[lesson.id] || ''}</textarea>
    </div>
  `;
  document.getElementById('lesson-notes').addEventListener('input', e => {
    state.notes[lesson.id] = e.target.value;
    saveState();
  });

  // Editor tabs
  const tabs = document.getElementById('editor-tabs');
  tabs.innerHTML = lesson.editorTabs.map((t, i) => `<div class="editor-tab${i===0?' active':''}">${t}</div>`).join('');

  // Init CodeMirror
  const savedCode = state.attempts[lesson.id] || lesson.starterCode;
  initEditor(lesson.mode, savedCode);
  setFeedback('idle', '💡 Write your code and click Check to validate.');

  document.getElementById('btn-run').onclick = runCode;
  document.getElementById('btn-check').onclick = () => checkCode(lesson);
  document.getElementById('btn-reset').onclick = () => {
    if (confirm('Reset code to starter?')) { cmEditor.setValue(lesson.starterCode); runCode(); }
  };

  // Auto-run preview
  setTimeout(runCode, 300);
  buildSidebar();
  updateProgressDisplay();
}

function runCode() {
  const code = cmEditor ? cmEditor.getValue() : '';
  const lesson = state.currentLesson;
  if (!lesson) return;
  if (lesson.id) { state.attempts[lesson.id] = code; saveState(); }

  const frame = document.getElementById('preview-frame');
  let html = '';
  if (lesson.mode === 'htmlmixed') {
    html = code;
  } else if (lesson.mode === 'css') {
    html = `<style>${code}</style><div style="padding:16px;font-family:sans-serif"><h1>Heading 1</h1><h2>Heading 2</h2><p>Paragraph text here.</p><div class="card box container">A div element</div><div class="highlight">Highlighted</div><nav class="nav"><span class="nav-item">Nav 1</span><span class="nav-item">Nav 2</span></nav><div class="grid"><div style="background:#eef;padding:8px">Grid Item 1</div><div style="background:#efe;padding:8px">Grid Item 2</div><div style="background:#fee;padding:8px">Grid Item 3</div></div></div>`;
  } else if (lesson.mode === 'javascript') {
    html = `<html><body style="font-family:monospace;padding:16px;background:#1e1e2e;color:#cdd6f4"><h1 id="h1" style="color:#89b4fa">Preview Title</h1><p id="para">Paragraph</p><input id="inp" type="text" placeholder="Type here" style="padding:8px;border-radius:4px"><button id="btn" style="padding:8px 16px;border-radius:4px;cursor:pointer;margin-left:8px">Button</button><div id="output" style="margin-top:16px;color:#a6e3a1"></div><script>const _log=console.log;const _out=[];console.log=(...a)=>{_out.push(a.map(x=>JSON.stringify(x)).join(' '));document.getElementById('output').innerHTML='<b>Console:</b><br>'+_out.join('<br>');_log(...a)};try{${code}}catch(e){document.getElementById('output').innerHTML='<span style=color:#f38ba8>Error: '+e.message+'</span>';}<\/script></body></html>`;
  }
  try { frame.srcdoc = html; } catch(e){}
}

function checkCode(lesson) {
  const code = cmEditor ? cmEditor.getValue() : '';
  const result = lesson.validate(code);
  setFeedback(result.status, result.msg);
  if (result.status === 'correct' && !state.completedLessons[lesson.id]) {
    state.completedLessons[lesson.id] = true;
    state.xp += lesson.xp;
    saveState();
    updateXPDisplay();
    updateProgressDisplay();
    buildSidebar();
    showToast(`🎉 +${lesson.xp} XP — Lesson Complete!`, 'green');
  }
}

function setFeedback(status, msg) {
  const el = document.getElementById('feedback');
  el.className = 'feedback-strip ' + status;
  el.textContent = msg;
}

// ══════════════════════════════════════════════════════
//  QUIZ
// ══════════════════════════════════════════════════════
let quizState = { lesson: null, answers: {}, submitted: false };

function openQuiz(lesson, course) {
  quizState = { lesson, course, answers: {}, submitted: false };
  showView('quiz');
  document.getElementById('quiz-title').textContent = lesson.title;
  document.getElementById('quiz-subtitle').textContent = `${course.title} · ${lesson.xp} XP`;
  document.getElementById('quiz-result').classList.remove('show');
  document.getElementById('btn-submit-quiz').style.display = '';

  const qContainer = document.getElementById('quiz-questions');
  qContainer.innerHTML = '';

  lesson.quiz.forEach((q, qi) => {
    const qEl = document.createElement('div');
    qEl.className = 'quiz-question';
    qEl.innerHTML = `
      <div class="q-num">Question ${qi+1} of ${lesson.quiz.length}</div>
      <div class="q-text">${q.q}</div>
      <div class="q-options" id="opts-${qi}">
        ${q.options.map((o, oi) => `
          <div class="q-option" data-qi="${qi}" data-oi="${oi}">
            <div class="q-radio"></div>${o}
          </div>`).join('')}
      </div>`;
    qContainer.appendChild(qEl);
  });

  qContainer.querySelectorAll('.q-option').forEach(opt => {
    opt.addEventListener('click', () => {
      if (quizState.submitted) return;
      const qi = +opt.dataset.qi;
      const oi = +opt.dataset.oi;
      quizState.answers[qi] = oi;
      document.querySelectorAll(`#opts-${qi} .q-option`).forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  document.getElementById('btn-submit-quiz').onclick = submitQuiz;
  buildSidebar();
}

function submitQuiz() {
  const { lesson, course } = quizState;
  let correct = 0;
  lesson.quiz.forEach((q, qi) => {
    const userAnswer = quizState.answers[qi];
    document.querySelectorAll(`#opts-${qi} .q-option`).forEach((opt, oi) => {
      if (oi === q.correct) opt.classList.add('correct');
      else if (oi === userAnswer && userAnswer !== q.correct) opt.classList.add('wrong');
    });
    if (userAnswer === q.correct) correct++;
  });
  quizState.submitted = true;
  const score = Math.round((correct / lesson.quiz.length) * 100);
  const passed = score >= 60;

  document.getElementById('btn-submit-quiz').style.display = 'none';
  const res = document.getElementById('quiz-result');
  document.getElementById('qr-score').textContent = `${score}%`;
  document.getElementById('qr-msg').textContent = passed
    ? `✅ Passed! You got ${correct}/${lesson.quiz.length} correct. +${lesson.xp} XP earned.`
    : `❌ Score too low (need 60%). You got ${correct}/${lesson.quiz.length}. Review and retry!`;
  res.classList.add('show');

  if (passed && !state.completedLessons[lesson.id]) {
    state.completedLessons[lesson.id] = true;
    state.xp += lesson.xp;
    saveState();
    updateXPDisplay();
    updateProgressDisplay();
    showToast(`🏆 +${lesson.xp} XP — Quiz Passed!`, 'purple');
  }

  if (lesson.isFinal && passed) {
    state.certScores[course.id] = score;
    saveState();
    document.getElementById('btn-after-quiz').textContent = '🏆 Get Certificate →';
    document.getElementById('btn-after-quiz').onclick = () => showCertificate(course, score);
  } else {
    document.getElementById('btn-after-quiz').textContent = 'Continue →';
    document.getElementById('btn-after-quiz').onclick = () => showView('dashboard');
  }
  buildSidebar();
}

// ══════════════════════════════════════════════════════
//  CERTIFICATE
// ══════════════════════════════════════════════════════
function showCertificate(course, score) {
  showView('cert');
  const grade = score >= 90 ? 'A · Distinction' : score >= 75 ? 'B · Merit' : 'C · Pass';
  document.getElementById('cert-course-name').textContent = course.title;
  document.getElementById('cert-student').textContent = state.studentName;
  document.getElementById('cert-course-desc').textContent = `has successfully completed the ${course.title} course`;
  document.getElementById('cert-grade').textContent = `Grade: ${grade} (${score}%)`;
  document.getElementById('cert-date').textContent = `Issued: ${new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}`;

  document.getElementById('btn-dl-cert').onclick = () => downloadCert(course, score, grade);
}

function downloadCert(course, score, grade) {
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Certificate</title><style>body{font-family:'Georgia',serif;background:#f5f5f5;display:flex;align-items:center;
  justify-content:center;min-height:100vh;margin:0}.cert{border:5px solid #ffd60a;border-radius:20px;padding:60px 100px;max-width:750px;text-align:center;position:relative;background:linear-gradient(145deg,
  #ffffff,#fff8dc);box-shadow:0 8px 20px rgba(0,0,0,0.2)}.cert::before{content:'';position:absolute;top:10px;left:10px;right:10px;bottom:10px;border:2px solid #ffd60a;border-radius:16px;pointer-events:none}h1{color:#ff6b35;
  font-size:2.5rem;margin-bottom:12px}.badge{font-size:5rem;margin:20px 0}.student{font-size:2.2rem;color:#7c3aed;font-weight:700;margin:16px 0}.grade{color:#06d6a0;font-size:1.5rem;font-weight:700;margin-top:14px}.date{color:#555;font-size:0.95rem;margin-top:12px}
  .signature{margin-top:40px}.cert-seal { width: 90px; height: 90px; border-radius: 50%; position: absolute; top: 10px; right: 20px; background: radial-gradient(circle at 30% 30%, #ffd700, #cfa000 80%); border: 2px solid #b8860b; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; color: #fff; text-align: center; transform: rotate(-10deg); text-shadow: 0 1px 2px rgba(0,0,0,0.4); z-index: 10; }
.signature .line{width:180px;margin:0 auto 6px;border-top:1.5px solid #000}.signature .name{font-size:1rem;color:#000;font-weight:600}.signature .role{font-size:0.8rem;color:#555}.seal{width:120px;height:120px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:0.85rem;text-align:center;line-height:1.2;position:absolute;top:20px;right:40px;background:radial-gradient(circle at 30% 30%,
  #ffd700,#cfa000 80%);box-shadow:0 6px 15px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,255,255,0.4);border:3px solid #b8860b;transform:rotate(-10deg);
  text-shadow:0 1px 2px rgba(0,0,0,0.4)}</style></head><body><div class="cert"><div class="seal">عبدالله صلاح<br>Instructor</div><div class="badge">🏆</div><p style="font-size:.85rem;text-transform:uppercase;letter-spacing:.25em;color:#888">Certificate of Completion</p><h1>${course.title}</h1><p style="color:#666;margin-bottom:10px">Awarded to</p>
  <div class="student">${state.studentName}</div><p style="color:#666;margin-bottom:10px">has successfully completed this course</p>
  <div class="grade">Grade: ${grade} · ${score}%</div><div class="date">Issued: ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</div><div class="date">BodaAcademy · Frontend Mastery Program</div><div class="signature"><div class="line"></div><div class="name">عبدالله صلاح</div><div class="role">Instructor / Supervisor</div></div></div></body></html>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `certificate-${course.id}-${state.studentName.replace(/\s+/g,'-')}.html`;
  a.click();
  showToast('📜 Certificate downloaded!', 'yellow');
}

// ══════════════════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════════════════
function renderDashboard() {
  document.getElementById('dash-greeting').textContent = `Hey, ${state.studentName}! 👋`;
  const lv = getLevel(state.xp);
  const total = getTotalLessons();
  const done = getCompletedCount();

  document.getElementById('dash-stats').innerHTML = `
    <div class="stat-card"><div class="stat-label">Total XP</div><div class="stat-val orange">${state.xp}</div></div>
    <div class="stat-card"><div class="stat-label">Level</div><div class="stat-val purple">Lvl ${lv.num}</div></div>
    <div class="stat-card"><div class="stat-label">Lessons Done</div><div class="stat-val green">${done}/${total}</div></div>
    <div class="stat-card"><div class="stat-label">Certificates</div><div class="stat-val yellow">${Object.keys(state.certScores).length}</div></div>
  `;

  const cards = document.getElementById('course-cards');
  cards.innerHTML = '';
  Object.values(CURRICULUM).forEach(course => {
    const total = course.modules.reduce((s, m) => s + m.lessons.length, 0);
    const done = course.modules.reduce((s, m) => s + m.lessons.filter(l => state.completedLessons[l.id]).length, 0);
    const pct = Math.round((done/total)*100);
    const firstLesson = course.modules[0].lessons[0];

    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <span class="cc-icon">${course.icon}</span>
      <div class="cc-title">${course.title}</div>
      <div class="cc-desc">${course.desc}</div>
      <div class="cc-progress-label">${done}/${total} lessons · ${pct}%</div>
      <div class="cc-bar-outer"><div class="cc-bar-inner ${course.color}" style="width:${pct}%"></div></div>
      <span class="cc-start">Continue →</span>
    `;
    card.onclick = () => openLesson(firstLesson.id);
    cards.appendChild(card);
  });
}

// ══════════════════════════════════════════════════════
//  VIEW MANAGEMENT
// ══════════════════════════════════════════════════════
function showView(view) {
  document.getElementById('dashboard').classList.toggle('active', view === 'dashboard');
  document.getElementById('lesson-view').classList.toggle('active', view === 'lesson');
  document.getElementById('quiz-view').classList.toggle('active', view === 'quiz');
  document.getElementById('cert-view').classList.toggle('active', view === 'cert');
  if (view === 'dashboard') renderDashboard();
}

// ══════════════════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════════════════
function showToast(msg, type = 'green') {
  const t = document.getElementById('toast');
  const colors = { green: '#06d6a0', purple: '#a78bfa', yellow: '#ffd60a', orange: '#ff6b35' };
  t.style.borderColor = colors[type] || colors.green;
  t.style.color = colors[type] || colors.green;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ══════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ══════════════════════════════════════════════════════
//  ONBOARDING
// ══════════════════════════════════════════════════════
let selectedTrack = 'html';
document.querySelectorAll('.track-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.track-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedTrack = chip.dataset.track;
  });
});

document.getElementById('start-btn').addEventListener('click', () => {
  const name = document.getElementById('name-input').value.trim();
  if (!name) { document.getElementById('name-input').focus(); return; }
  state.studentName = name;
  state.currentTrack = selectedTrack;
  saveState();
  launchApp();
});

document.getElementById('name-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('start-btn').click();
});

// ══════════════════════════════════════════════════════
//  APP LAUNCH
// ══════════════════════════════════════════════════════
function launchApp() {
  document.getElementById('onboarding').style.display = 'none';
  document.getElementById('header').style.display = '';
  document.getElementById('app').style.display = '';
  document.getElementById('student-label').textContent = state.studentName;

  updateXPDisplay();
  updateProgressDisplay();
  buildSidebar();
  showView('dashboard');

  document.getElementById('toggle-sidebar').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
  });

  document.getElementById('search-input').addEventListener('input', e => {
    buildSidebar(e.target.value);
  });
}

// Auto-launch if returning user
if (state.studentName) {
  document.getElementById('name-input').value = state.studentName;
  launchApp();
}
