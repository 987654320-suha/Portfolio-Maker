let finalHTML = "";
let photoData = "";
let resumeData = "";

/* ===== FILE UPLOAD ===== */
photo.onchange = e => {
  const r = new FileReader();
  r.onload = () => photoData = r.result;
  r.readAsDataURL(e.target.files[0]);
};

resume.onchange = e => {
  const r = new FileReader();
  r.onload = () => resumeData = r.result;
  r.readAsDataURL(e.target.files[0]);
};

/* ===== ADD PROJECT ===== */
function addProject() {
  const div = document.createElement("div");
  div.className = "project";
  div.innerHTML = `
    <input class="p-title" placeholder="Project Title">
    <input class="p-link" placeholder="Project Link">
    <textarea class="p-desc" placeholder="Short Description"></textarea>
  `;
  document.getElementById("projects").appendChild(div);
}

/* ===== URL FIX ===== */
function fixURL(url) {
  if (!url) return "";
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
}

/* ===== GENERATE ===== */
function generate() {
  const name = nameEl.value;
  const role = roleEl.value;
  const about = aboutEl.value;
  const skills = skillsEl.value.split(",");
  const github = fixURL(githubEl.value);
  const linkedin = fixURL(linkedinEl.value);
  const template = templateEl.value;

  const skillHTML = skills
    .map(s => `<span class="skill">${s.trim()}</span>`)
    .join("");

  let projectsHTML = "";
  document.querySelectorAll(".project").forEach(p => {
    const title = p.querySelector(".p-title").value;
    const desc = p.querySelector(".p-desc").value;
    const link = fixURL(p.querySelector(".p-link").value);

    if (title) {
      projectsHTML += `
        <li>
          <strong>${title}</strong><br>
          <small>${desc}</small><br>
          ${link ? `<a href="${link}" target="_blank">View Project</a>` : ""}
        </li>
      `;
    }
  });

  const templates = {
    modern: modernTemplate,
    minimal: minimalTemplate,
    corporate: corporateTemplate
  };

  finalHTML = templates[template](
    name, role, about, skillHTML, projectsHTML,
    github, linkedin, photoData, resumeData
  );

  preview.innerHTML = finalHTML;
}

/* ===== DOWNLOAD ===== */
function download() {
  if (!finalHTML) return alert("Generate first!");
  const blob = new Blob([finalHTML], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "portfolio.html";
  a.click();
}

/* ================= TEMPLATES ================= */


/* 🔵 MODERN */
function modernTemplate(name, role, about, skills, projects, github, linkedin, photo, resume) {
return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body{
  margin:0;
  font-family:system-ui;
  background:#020617;
  color:white;
}

.hero{
  padding:80px 20px;
  text-align:center;
  background:#38bdf8;
  color:black;
}

.hero img{
  width:140px;
  height:140px;
  border-radius:50%;
  object-fit:cover;
}

.section{
  max-width:900px;
  margin:60px auto;
  padding:0 20px;
}

.skills{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
}

.skill{
  background:white;
  color:black;
  padding:10px 18px;
  border-radius:25px;
  font-weight:600;
}

a{
  color:#38bdf8;
  font-weight:600;
}

/* ===== MOBILE RESPONSIVE ===== */

@media (max-width: 768px) {

  .hero{
    padding:40px 20px;
  }

  .hero h1{
    font-size:28px;
  }

  .hero img{
    width:100px;
    height:100px;
  }

  .section{
    padding:0 15px;
  }

  .skills{
    justify-content:center;
  }
}

@media (max-width: 480px) {

  .hero h1{
    font-size:24px;
  }

  .hero p{
    font-size:14px;
  }

  .skill{
    font-size:13px;
    padding:8px 12px;
  }
}
</style>
</head>

<body>

<div class="hero">
  ${photo ? `<img src="${photo}">` : ``}
  <h1>${name}</h1>
  <p>${role}</p>
</div>

<div class="section">
  <h2>About Me</h2>
  <p>${about}</p>
</div>

<div class="section">
  <h2>Skills</h2>
  <div class="skills">${skills}</div>
</div>

<div class="section">
  <h2>Projects</h2>
  <ul>${projects}</ul>
</div>

<div class="section">
  <a href="${github}">GitHub</a> |
  <a href="${linkedin}">LinkedIn</a>
  ${resume ? ` | <a href="${resume}" download>Resume</a>` : ``}
</div>

</body>
</html>
`;
}


/* ⚪ BEAUTIFUL MINIMAL */
function minimalTemplate(name, role, about, skills, projects, github, linkedin, photo, resume) {
return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body{
  margin:0;
  font-family:system-ui;
  background:#fff;
  color:#111;
}

.hero{
  text-align:center;
  padding:80px 20px;
  border-bottom:1px solid #e5e7eb;
}

.hero img{
  width:120px;
  height:120px;
  border-radius:50%;
  object-fit:cover;
  margin-bottom:12px;
}

.container{
  max-width:900px;
  margin:60px auto;
  padding:0 20px;
}

.skills{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
}

.skill{
  border:1px solid #ddd;
  padding:10px 18px;
  border-radius:20px;
}

a{
  color:#2563eb;
  font-weight:600;
}

/* ===== MOBILE RESPONSIVE ===== */

@media (max-width: 768px) {
  .hero{
    padding:40px 20px;
  }

  .hero h1{
    font-size:28px;
  }

  .hero img{
    width:100px;
    height:100px;
  }

  .container{
    padding:0 15px;
  }
}

@media (max-width: 480px) {
  .hero h1{
    font-size:24px;
  }

  .skill{
    font-size:13px;
    padding:8px 12px;
  }
}
</style>
</head>

<body>

<div class="hero">
  ${photo ? `<img src="${photo}">` : ``}
  <h1>${name}</h1>
  <p>${role}</p>
</div>

<div class="container">
  <h2>About</h2>
  <p>${about}</p>

  <h2>Skills</h2>
  <div class="skills">${skills}</div>

  <h2>Projects</h2>
  <ul>${projects}</ul>

  <p>
    <a href="${github}">GitHub</a> |
    <a href="${linkedin}">LinkedIn</a>
    ${resume ? ` | <a href="${resume}" download>Resume</a>` : ``}
  </p>
</div>

</body>
</html>
`;
}


/* 🏢 BEAUTIFUL CORPORATE */
function corporateTemplate(name, role, about, skills, projects, github, linkedin, photo, resume) {
return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body{
  margin:0;
  font-family:Arial, sans-serif;
  background:#f1f5f9;
  color:#0f172a;
}

.header{
  background:#0f172a;
  color:white;
  padding:40px;
}

.header-content{
  max-width:1000px;
  margin:auto;
  display:flex;
  align-items:center;
  gap:30px;
}

.header img{
  width:120px;
  height:120px;
  border-radius:10px;
  object-fit:cover;
}

.section{
  max-width:1000px;
  margin:50px auto;
  background:white;
  padding:30px;
}

.skills{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}

.skill{
  background:#0f172a;
  color:white;
  padding:8px 14px;
  border-radius:4px;
  font-size:13px;
}

a{
  color:#0f172a;
  font-weight:600;
}

/* ===== MOBILE RESPONSIVE ===== */

@media (max-width: 768px) {

  .header{
    padding:30px 20px;
    text-align:center;
  }

  .header-content{
    flex-direction:column;
    text-align:center;
  }

  .header img{
    width:100px;
    height:100px;
  }

  .section{
    margin:30px 15px;
    padding:20px;
  }

  ul{
    padding-left:18px;
  }
}

@media (max-width: 480px) {

  .header h1{
    font-size:24px;
  }

  .header p{
    font-size:14px;
  }

  .skill{
    font-size:12px;
    padding:6px 10px;
  }
}
</style>
</head>

<body>

<div class="header">
  <div class="header-content">
    ${photo ? `<img src="${photo}">` : ``}
    <div>
      <h1>${name}</h1>
      <p>${role}</p>
    </div>
  </div>
</div>

<div class="section">
  <h2>Professional Summary</h2>
  <p>${about}</p>
</div>

<div class="section">
  <h2>Skills</h2>
  <div class="skills">${skills}</div>
</div>

<div class="section">
  <h2>Projects</h2>
  <ul>${projects}</ul>
</div>

<div class="section">
  <a href="${github}">GitHub</a> |
  <a href="${linkedin}">LinkedIn</a>
  ${resume ? ` | <a href="${resume}" download>Resume</a>` : ``}
</div>

</body>
</html>
`;
}


/* ===== ELEMENTS ===== */
const nameEl = document.getElementById("name");
const roleEl = document.getElementById("role");
const aboutEl = document.getElementById("about");
const skillsEl = document.getElementById("skills");
const githubEl = document.getElementById("github");
const linkedinEl = document.getElementById("linkedin");
const templateEl = document.getElementById("template");
const preview = document.getElementById("preview");
