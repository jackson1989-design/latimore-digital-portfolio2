// Production Cloudflare Worker - Latimore Command Center
// Self-contained with embedded Tailwind CSS

export default {
  async fetch(request, env, ctx) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Latimore Command Center</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; }
    .container { max-width: 1200px; margin: 0 auto; padding: 1rem; }
    .header { background: linear-gradient(135deg, #2C3E50 0%, #1a252f 100%); color: white; padding: 1.5rem; }
    .header h1 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.25rem; }
    .header .subtitle { font-size: 0.875rem; color: #cbd5e1; }
    .card { background: white; border-radius: 0.5rem; padding: 1.5rem; margin: 1rem 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 1rem 0; }
    .stat-card { background: white; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-value { font-size: 1.5rem; font-weight: bold; color: #2C3E50; }
    .stat-label { font-size: 0.875rem; color: #64748b; margin-top: 0.25rem; }
    .btn { display: inline-block; padding: 0.75rem 1.5rem; background: #2C3E50; color: white; border-radius: 0.5rem; text-decoration: none; font-weight: 600; cursor: pointer; border: none; }
    .btn:hover { background: #C49A6C; }
    .btn-primary { background: linear-gradient(to right, #3b82f6, #a855f7); }
    .btn-primary:hover { opacity: 0.9; }
    .alert { background: #dbeafe; border: 2px solid #3b82f6; padding: 1.5rem; border-radius: 0.5rem; margin: 1rem 0; }
    .alert h3 { color: #2C3E50; font-size: 1.25rem; margin-bottom: 0.5rem; }
    .success { background: #dcfce7; border-color: #22c55e; }
    .success h3 { color: #15803d; }
    .module-nav { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; }
    .module-btn { padding: 0.5rem 1rem; background: white; border: 2px solid #e5e7eb; border-radius: 0.5rem; cursor: pointer; font-size: 0.875rem; }
    .module-btn.active { background: #C49A6C; color: #2C3E50; border-color: #C49A6C; font-weight: 600; }
    .hidden { display: none !important; }
    ul { list-style: none; }
    li { padding: 0.5rem 0; }
    @media (max-width: 768px) {
      .header h1 { font-size: 1.25rem; }
      .stat-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="container">
      <h1>💛 Latimore Command Center</h1>
      <p class="subtitle">Protecting Today. Securing Tomorrow.</p>
    </div>
  </div>

  <div class="container">
    <div class="module-nav">
      <button class="module-btn active" onclick="showModule('welcome')">🎯 Home</button>
      <button class="module-btn" onclick="showModule('import')">📥 Import Contacts</button>
      <button class="module-btn" onclick="showModule('ai')">🤖 AI Assistant</button>
      <button class="module-btn" onclick="showModule('settings')">⚙️ Settings</button>
    </div>

    <div id="welcome-module">
      <div class="card">
        <h2 style="color: #2C3E50; margin-bottom: 1rem;">Welcome Back, Jackson</h2>
        <p style="color: #64748b; margin-bottom: 1rem;">Your unified business platform for Latimore Life & Legacy LLC</p>
        <p style="color: #C49A6C; font-weight: 600;">#TheBeatGoesOn 💛</p>
      </div>

      <div class="stat-grid" id="stats">
        <!-- Stats loaded by JS -->
      </div>

      <div id="get-started-alert" class="alert">
        <h3>🚀 Get Started</h3>
        <p style="margin: 0.5rem 0;">You have 5 contacts ready to import from your Global Financial Impact scorecard.</p>
        <button class="btn btn-primary" onclick="showModule('import')" style="margin-top: 1rem;">Import GFI Contacts →</button>
      </div>

      <div class="card">
        <h3 style="color: #2C3E50; margin-bottom: 0.75rem;">Mission Grounding</h3>
        <p style="color: #64748b; line-height: 1.6;">
          <strong>Protecting what matters. Building legacies that outlive them.</strong><br><br>
          Jackson M. Latimore Sr. survived sudden cardiac arrest on December 7, 2010, while playing basketball at East Stroudsburg University. 
          An AED was available and used by trainers to restart his heart. This life-altering event became the foundation for Latimore Life & Legacy LLC.
        </p>
      </div>
    </div>

    <div id="import-module" class="hidden">
      <div class="card">
        <h2 style="color: #2C3E50; margin-bottom: 1rem;">Import GFI Contacts</h2>
        <div id="import-ready">
          <p style="color: #64748b; margin-bottom: 1rem;">Load your 5 client contacts from Global Financial Impact scorecard</p>
          <ul style="background: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; margin: 1rem 0;">
            <li>✅ 5 unique contacts from GFI scorecard</li>
            <li>✅ 2 Follow-up opportunities</li>
            <li>✅ 3 New prospects</li>
            <li>✅ $750 confirmed annual premium value</li>
          </ul>
          <button class="btn btn-primary" onclick="importContacts()">Import Contacts to CRM</button>
        </div>
        <div id="import-success" class="hidden">
          <div class="alert success">
            <h3>✅ Import Successful!</h3>
            <ul id="import-stats"></ul>
          </div>
        </div>
      </div>
    </div>

    <div id="ai-module" class="hidden">
      <div class="card">
        <h2 style="color: #2C3E50; margin-bottom: 1rem;">🤖 AI Assistant</h2>
        <div class="alert">
          <h3>Your AI Hub is Ready!</h3>
          <p style="margin: 0.5rem 0;">Your full AI Content Hub with Claude Sonnet 4.5 is available locally.</p>
          <p style="margin: 0.5rem 0; color: #64748b; font-size: 0.875rem;">
            <strong>Local AI Hub Features:</strong><br>
            • Follow-up email generator<br>
            • Social media post creator<br>
            • Product upload & analysis<br>
            • Custom prompts<br>
            • CRM integration
          </p>
          <p style="margin: 1rem 0; padding: 1rem; background: #fef3c7; border-radius: 0.5rem; font-size: 0.875rem;">
            💡 <strong>Next Step:</strong> Deploy your AI Hub to Cloudflare Pages for cloud access. See deployment guide.
          </p>
        </div>
      </div>
    </div>

    <div id="settings-module" class="hidden">
      <div class="card">
        <h2 style="color: #2C3E50; margin-bottom: 1rem;">Settings</h2>
        <div style="line-height: 2;">
          <div><span style="color: #64748b;">Name:</span> <strong>Jackson M. Latimore Sr.</strong></div>
          <div><span style="color: #64748b;">Company:</span> <strong>Latimore Life & Legacy LLC</strong></div>
          <div><span style="color: #64748b;">License:</span> <strong>PA DOI #1268820</strong></div>
          <div><span style="color: #64748b;">Phone:</span> <strong>(856) 895-1457</strong></div>
          <div><span style="color: #64748b;">Email:</span> <strong>jackson1989@latimorelegacy.com</strong></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const GFI_CONTACTS = [
      {id:"1",name:"Vivian Yvonne Green",email:"viv.green1972.vg@gmail.com",phone:"+12053626495",status:"Follow-up",leadSource:"Global Financial Impact",estimatedValue:750,priority:"Medium"},
      {id:"2",name:"Tressa Peterson",email:"tressap1969@gmail.com",phone:"+15705900852",status:"Follow-up",leadSource:"Global Financial Impact",estimatedValue:0,priority:"Medium"},
      {id:"3",name:"Nicolas Elliot Milewski",email:"nicm450@gmail.com",phone:"+15709001155",status:"Prospect",leadSource:"Global Financial Impact",estimatedValue:0,priority:"Medium"},
      {id:"4",name:"James Colosimo",email:"jimcolly36@gmail.com",phone:"+15705163900",status:"Prospect",leadSource:"Global Financial Impact",estimatedValue:0,priority:"Medium"},
      {id:"5",name:"Meda Marshall",email:"mlm436a@gmail.com",phone:"+15706241765",status:"Prospect",leadSource:"Global Financial Impact",estimatedValue:0,priority:"Medium"}
    ];

    function loadData(key, def) {
      try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(def)); }
      catch(e) { return def; }
    }
    function saveData(key, data) {
      try { localStorage.setItem(key, JSON.stringify(data)); return true; }
      catch(e) { return false; }
    }

    function updateStats() {
      const contacts = loadData('crm-contacts', []);
      const stats = {
        contacts: contacts.length,
        active: contacts.filter(c => c.status === 'Active').length,
        pipeline: contacts.reduce((s, c) => s + (c.estimatedValue || 0), 0)
      };
      
      document.getElementById('stats').innerHTML = \`
        <div class="stat-card"><div class="stat-value">\${stats.contacts}</div><div class="stat-label">Contacts</div></div>
        <div class="stat-card"><div class="stat-value">\${stats.active}</div><div class="stat-label">Active</div></div>
        <div class="stat-card"><div class="stat-value">$\${stats.pipeline}</div><div class="stat-label">Pipeline</div></div>
      \`;
      
      document.getElementById('get-started-alert').style.display = stats.contacts > 0 ? 'none' : 'block';
    }

    function showModule(name) {
      ['welcome', 'import', 'ai', 'settings'].forEach(m => {
        document.getElementById(m + '-module').classList.add('hidden');
      });
      document.getElementById(name + '-module').classList.remove('hidden');
      
      document.querySelectorAll('.module-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
    }

    function importContacts() {
      const existing = loadData('crm-contacts', []);
      const existingEmails = new Set(existing.map(c => c.email.toLowerCase()));
      const newContacts = GFI_CONTACTS.filter(c => !existingEmails.has(c.email.toLowerCase()));
      const merged = [...existing, ...newContacts];
      
      saveData('crm-contacts', merged);
      
      const total = merged.reduce((s, c) => s + (c.estimatedValue || 0), 0);
      
      document.getElementById('import-ready').classList.add('hidden');
      document.getElementById('import-success').classList.remove('hidden');
      document.getElementById('import-stats').innerHTML = \`
        <li>✅ \${newContacts.length} new contacts imported</li>
        <li>✅ \${merged.length} total contacts in CRM</li>
        <li>💰 $\${total} total pipeline value</li>
      \`;
      
      setTimeout(() => {
        showModule('welcome');
        updateStats();
      }, 2000);
    }

    // Initialize
    if (!loadData('crm-contacts')) saveData('crm-contacts', []);
    updateStats();
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'public, max-age=3600'
      }
    });
  }
};
