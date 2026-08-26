function setCaseStudyMetadata() {
  document.title = 'Pipeline Python Scripts — Deloitte Case Study | Vidur Ramachandran';
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = 'An anonymised Deloitte USI case study by Vidur Ramachandran: Python validation scripts for earlier exception checks in a customer-data workflow.';
  }
  const socialTitle = document.querySelector('meta[property="og:title"]');
  if (socialTitle) socialTitle.content = 'Pipeline Python Scripts — Deloitte Case Study';
}

export function initFinmonitorCaseStudy() {
  const root = document.querySelector('#professionalPortfolio');
  if (!root) return;

  document.body.classList.add('professional-view', 'finmonitor-case-study-view');
  document.body.classList.remove('playground-view');
  setCaseStudyMetadata();

  root.className = 'pro-portfolio pro-v2 pro-case-study-page';
  root.innerHTML = `
    <nav class="pro-nav fin-case-nav" aria-label="Case study navigation">
      <a class="pro-wordmark" href="/" aria-label="Vidur Ramachandran portfolio"><span>V</span><b>VIDUR</b> RAMACHANDRAN</a>
      <div class="fin-case-nav-links">
        <a href="/#work">Work</a>
        <a href="/#experience">Experience</a>
        <a href="./assets/Vidur_SF_CV.pdf" download="Vidur_SF_CV.pdf">Resume</a>
        <a href="/playground">Playground <span>↗</span></a>
      </div>
    </nav>

    <main id="top">
      <section class="fin-case-hero">
        <div class="fin-case-hero-top"><a href="/#work">← Back to selected work</a><p>DELOITTE USI · LG BRAZIL · CASE STUDY</p></div>
        <div class="fin-case-heading">
          <div>
            <p class="fin-case-kicker">PYTHON VALIDATION · ENTERPRISE DATA WORKFLOW</p>
            <h1>Pipeline Python scripts for <em>earlier exception checks.</em></h1>
          </div>
          <p class="fin-case-intro">A shareable, anonymised view of the validation approach I contributed to at Deloitte—focused on finding malformed or incomplete records before they moved further downstream.</p>
        </div>
        <dl class="fin-case-facts">
          <div><dt>ROLE</dt><dd>Associate Analyst<br>Validation, investigation & documentation</dd></div>
          <div><dt>TOOLS</dt><dd>Python · Pandas · SQL<br>QA / UAT support</dd></div>
          <div><dt>CONTEXT</dt><dd>Customer-data workflow<br>LG Brazil engagement</dd></div>
          <div><dt>SHARED HERE</dt><dd>Anonymised method and artifacts<br>No client data or proprietary code</dd></div>
        </dl>
      </section>

      <section class="fin-case-section fin-case-context">
        <div class="fin-case-section-label">01 — CONTEXT</div>
        <div class="fin-case-two-column">
          <h2>Bring the exception check <em>forward.</em></h2>
          <div><p>When data-quality issues appear late in a workflow, diagnosing the source takes longer and downstream teams have less confidence in the output. The useful question was not simply “did the pipeline fail?” but “can the exception be made visible earlier and in a form someone can investigate?”</p><p>This case study shows the validation flow at a shareable level. I contributed to the work alongside investigation, stakeholder communication, QA / UAT validation, and support documentation—not as a standalone production-system claim.</p></div>
        </div>
      </section>

      <section class="fin-case-section fin-case-architecture">
        <div class="fin-case-section-label">02 — VALIDATION FLOW</div>
        <div class="fin-case-section-heading"><h2>A small, inspectable pipeline.</h2><p>Simple modules make it easier to trace a data issue, test a change, and hand a repeatable process to the next person.</p></div>
        <ol class="fin-case-flow" aria-label="Validation workflow">
          <li><span>01</span><strong>Raw data in</strong><small>Source file or incoming batch</small></li>
          <li><span>02</span><strong>Clean</strong><small><code>clean_data.py</code></small></li>
          <li><span>03</span><strong>Detect</strong><small><code>analyze_data.py</code></small></li>
          <li><span>04</span><strong>Review</strong><small><code>report.py</code></small></li>
        </ol>
      </section>

      <section class="fin-case-section fin-case-modules">
        <div class="fin-case-section-label">03 — MODULES</div>
        <div class="fin-case-module-grid">
          <article><p>01 · <code>clean_data.py</code></p><h3>Clean and normalise</h3><ul><li>Standardise incoming fields and expected formats.</li><li>Surface missing values, duplicates and incomplete records.</li><li>Keep the validation input consistent enough to review.</li></ul></article>
          <article><p>02 · <code>analyze_data.py</code></p><h3>Flag exceptions</h3><ul><li>Apply readable checks against agreed data-quality rules.</li><li>Separate records needing investigation from routine data.</li><li>Make it clear why an exception was raised.</li></ul></article>
          <article><p>03 · <code>report.py</code></p><h3>Create reviewable outputs</h3><ul><li>Structure flagged results for QA and investigation.</li><li>Support concise stakeholder updates around the issue.</li><li>Give the workflow a repeatable hand-off point.</li></ul></article>
        </div>
      </section>

      <section class="fin-case-section fin-case-beyond-code">
        <div class="fin-case-section-label">04 — THE WIDER WORK</div>
        <div class="fin-case-section-heading"><h2>The scripts were one part of the work.</h2><p>The broader Deloitte contribution connected technical investigation with the operational work needed to make a fix usable.</p></div>
        <ol class="fin-case-evidence">
          <li><span>SQL-led investigation</span><p>Used audits and root-cause analysis to narrow down recurring issues in customer-data workflows.</p></li>
          <li><span>Stakeholder communication</span><p>Shared investigation context and validation findings with engineering, product and operations stakeholders.</p></li>
          <li><span>QA and UAT support</span><p>Supported validation of fixes before and after they entered the wider workflow.</p></li>
          <li><span>SOPs and runbooks</span><p>Documented repeatable support steps so recurring issues were easier to handle consistently.</p></li>
        </ol>
      </section>

      <section class="fin-case-close">
        <p>DELOITTE USI · LG BRAZIL · ANONYMISED CASE STUDY</p>
        <h2>Good validation is not only about catching an error. It is about making the <em>next action clear.</em></h2>
        <div><a href="/#work">Back to selected work <span>←</span></a><a href="mailto:vidur2002@gmail.com">Discuss an opportunity <span>↗</span></a></div>
      </section>
    </main>

    <footer class="pro-footer fin-case-footer"><span>© 2026 Vidur Ramachandran</span><span>Based in India · Open to remote/global teams</span><a href="#top">Back to top ↑</a></footer>
  `;
}
