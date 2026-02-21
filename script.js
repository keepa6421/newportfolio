document.addEventListener("DOMContentLoaded", () => {

    /* ------------------ STATUS ------------------ */
    const statusEl = document.getElementById("lib-status");
    if (typeof JSZip !== "undefined") {
        statusEl.textContent = "● Systems Ready";
        statusEl.classList.add("ready");
    } else {
        statusEl.textContent = "● JSZip not loaded";
        statusEl.classList.add("error");
    }

    /* ------------------ INPUTS ------------------ */
    const inputs = {
        name: document.getElementById("input-name"),
        role: document.getElementById("input-role"),
        bio: document.getElementById("input-bio"),
        skills: document.getElementById("input-skills"),
        expTitle: document.getElementById("input-exp-title"),
        expCompany: document.getElementById("input-exp-company"),
        expDate: document.getElementById("input-exp-date")
    };

    const preview = {
        name: document.getElementById("p-name"),
        brand: document.getElementById("p-name-brand"),
        footer: document.getElementById("p-foot-name"),
        role: document.getElementById("p-role"),
        bio: document.getElementById("p-bio"),
        skills: document.getElementById("p-skills-grid"),
        expTitle: document.getElementById("p-exp-title"),
        expCompany: document.getElementById("p-exp-company"),
        expDate: document.getElementById("p-exp-date"),
        projects: document.getElementById("p-projects-grid"),
        container: document.getElementById("preview-container")
    };

    /* ------------------ LIVE UPDATE ------------------ */
    function updatePreview() {
        preview.name.textContent = inputs.name.value;
        preview.brand.textContent = inputs.name.value;
        preview.footer.textContent = inputs.name.value;
        preview.role.textContent = inputs.role.value;
        preview.bio.textContent = inputs.bio.value;

        preview.expTitle.textContent = inputs.expTitle.value;
        preview.expCompany.textContent = inputs.expCompany.value;
        preview.expDate.textContent = inputs.expDate.value;

        preview.skills.innerHTML = inputs.skills.value
            .split(",")
            .map(s => s.trim())
            .filter(Boolean)
            .map(s => `<span class="skill-tag">${s}</span>`)
            .join("");

        preview.projects.innerHTML = Array.from(
            document.querySelectorAll(".project-entry")
        ).map(p => `
            <div class="project-card">
                <h4>${p.querySelector(".input-project-title").value}</h4>
                <p>${p.querySelector(".input-project-desc").value}</p>
            </div>
        `).join("");
    }

    Object.values(inputs).forEach(i =>
        i.addEventListener("input", updatePreview)
    );
    document.getElementById("projects-list")
        .addEventListener("input", updatePreview);

    /* ------------------ PROJECTS ------------------ */
    document.getElementById("add-project-btn").addEventListener("click", () => {
        const wrap = document.createElement("div");
        wrap.className = "project-entry";
        wrap.innerHTML = `
            <input class="input-project-title" placeholder="Project Name">
            <textarea class="input-project-desc" placeholder="Project Description"></textarea>
            <button class="remove-project-btn secondary-btn">Remove</button>
        `;
        document.getElementById("projects-list").appendChild(wrap);
        updatePreview();
    });

    document.getElementById("projects-list").addEventListener("click", e => {
        if (e.target.classList.contains("remove-project-btn")) {
            e.target.parentElement.remove();
            updatePreview();
        }
    });

    /* ------------------ THEMES ------------------ */
    document.querySelectorAll(".tpl-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tpl-btn")
                .forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            preview.container.className =
                `preview-viewport theme-${btn.dataset.template}`;
        });
    });

    /* ------------------ EXPORT HELPERS ------------------ */

    function getThemeClass() {
        return preview.container.className
            .split(" ")
            .find(c => c.startsWith("theme-"));
    }

    function generateHTML() {
        const themeClass = getThemeClass();
        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${inputs.name.value} | Portfolio</title>
<link rel="stylesheet" href="style.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="${themeClass}">
    <div class="portfolio-web-output">
        ${document.querySelector('.portfolio-web-output').innerHTML}
    </div>
    <script src="script.js"></script>
</body>
</html>`;
    }

    function generateCSS() {
        return `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
body { min-height: 100vh; overflow-x: hidden; }

.portfolio-web-output { height: 100vh; overflow-y: auto; position: relative; scroll-behavior: smooth; }
.p-section { padding: 100px 40px; }
.p-section-title { font-family: 'Outfit'; font-size: 2.5rem; margin-bottom: 4rem; text-align: center; }

/* --- MODERN DARK THEME --- */
.theme-modern { background: radial-gradient(circle at 0% 0%, #1e1b4b 0%, #0f172a 50%, #020617 100%); color: white; }
.theme-modern .p-nav { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 4rem; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 100; border-bottom: 1px solid rgba(255,255,255,0.05); }
.theme-modern .p-brand { font-weight: 800; font-size: 1.4rem; font-family: 'Outfit'; background: linear-gradient(to right, #6366f1, #a855f7); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.theme-modern .p-links { display: flex; list-style: none; gap: 2.5rem; }
.theme-modern .p-links a { color: #94a3b8; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: all 0.3s; }
.theme-modern .p-links a:hover { color: #818cf8; }
.theme-modern .p-hero { text-align: center; padding: 160px 40px; background: radial-gradient(circle at 50% 50%, rgba(99,102, 241, 0.1) 0%, transparent 70%); }
.theme-modern h1 { font-size: 6rem; font-family: 'Outfit'; font-weight: 800; letter-spacing: -0.04em; line-height: 0.9; background: linear-gradient(to bottom, #fff, #94a3b8); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; }
.theme-modern h2 { color: #818cf8; font-size: 2rem; font-weight: 500; }
.theme-modern .p-btn-main { display: inline-block; margin-top: 3.5rem; padding: 1.25rem 3rem; background: #6366f1; color: white; text-decoration: none; border-radius: 100px; font-weight: 600; box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.4); transition: all 0.4s; }
.theme-modern .skill-tag { background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); padding: 0.6rem 1.5rem; border-radius: 100px; color: #a5b4fc; }
.theme-modern .project-card { background: rgba(30, 41, 59, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 32px; padding: 3rem; transition: all 0.5s; position: relative; overflow: hidden; }
.theme-modern .project-card:hover { transform: translateY(-12px); background: rgba(30, 41, 59, 0.5); border-color: rgba(99, 102, 241, 0.3); }

/* --- MINIMAL LIGHT THEME --- */
.theme-minimal { background: #fafafa; color: #1a1a1a; }
.theme-minimal .p-nav { display: flex; justify-content: space-between; align-items: center; padding: 2.5rem 5rem; border-bottom: 1px solid #eee; background: white; }
.theme-minimal .p-brand { font-weight: 700; text-transform: uppercase; letter-spacing: 0.3em; font-size: 1.1rem; }
.theme-minimal .p-links { display: flex; gap: 3rem; list-style: none; }
.theme-minimal .p-links a { color: #666; text-decoration: none; text-transform: uppercase; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; }
.theme-minimal .p-hero { padding: 160px 40px; max-width: 900px; margin: 0 auto; }
.theme-minimal h1 { font-size: 5rem; font-weight: 300; line-height: 1.1; margin-bottom: 1.5rem; }
.theme-minimal h2 { font-weight: 600; text-transform: uppercase; letter-spacing: 0.4em; color: #999; font-size: 0.85rem; }
.theme-minimal .skill-tag { border: 1px solid #eee; background: white; padding: 0.75rem 1.5rem; margin: 0 0.75rem 0.75rem 0; display: inline-block; border-radius: 4px; }
.theme-minimal .project-card { border: 1px solid #eee; background: white; padding: 4rem; border-radius: 4px; margin-bottom: 3rem; transition: all 0.4s; }
.theme-minimal .p-btn-main { display: inline-block; padding: 1.25rem 3rem; background: #000; color: white; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; font-size: 0.8rem; }

/* --- VIBRANT GLASS THEME --- */
.theme-gradient { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #db2777 100%); color: white; min-height: 100vh; }
.theme-gradient .p-nav { padding: 2.5rem; display: flex; justify-content: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
.theme-gradient .p-brand { font-size: 2.5rem; font-family: 'Outfit'; font-weight: 900; text-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.theme-gradient .p-links { display: flex; gap: 3rem; list-style: none; margin-top: 1rem; }
.theme-gradient .p-links a { color: rgba(255,255,255,0.7); text-decoration: none; font-weight: 600; }
.theme-gradient .p-section { background: rgba(255, 255, 255, 0.08); margin: 3rem 2rem; padding: 6rem 4rem; border-radius: 40px; backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.15); }
.theme-gradient h1 { font-size: 5.5rem; font-weight: 900; letter-spacing: -0.04em; }
.theme-gradient .p-btn-main { background: white; color: #4f46e5; padding: 1.25rem 3.5rem; border-radius: 20px; text-decoration: none; font-weight: 800; display: inline-block; }
.theme-gradient .skill-tag { background: rgba(255, 255, 255, 0.15); color: white; padding: 0.75rem 1.75rem; border-radius: 16px; margin: 0.5rem; display: inline-block; font-weight: 700; border: 1px solid rgba(255,255,255,0.2); }
.theme-gradient .project-card { background: rgba(255, 255, 255, 0.1); border-radius: 32px; padding: 3rem; border: 1px solid rgba(255,255,255,0.15); }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
.p-section, .p-hero { animation: fadeInUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        `;
    }

    function generateJS() {
        return `
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
console.log("Portfolio Loaded Ready!");`;
    }

    /* ------------------ SINGLE FILE DOWNLOAD ------------------ */
    document.getElementById("download-btn").addEventListener("click", () => {
        const themeClass = getThemeClass();
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${inputs.name.value} | Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
${generateCSS()}
</style>
</head>
<body class="${themeClass}">
    <div class="portfolio-web-output">
        ${document.querySelector('.portfolio-web-output').innerHTML}
    </div>
    <script>
${generateJS()}
    </script>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `portfolio-${inputs.name.value.toLowerCase().replace(/\s+/g, '-')}.html`;
        a.click();
    });

    updatePreview();
});
