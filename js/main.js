const splash = document.getElementById('splash');
    function dismissSplash() { splash.classList.add('is-hidden'); }
    // auto-advance from the title/splash screen to the menu after 4s, but a
    // tap still dismisses it immediately (whichever happens first)
    let splashTimer = setTimeout(dismissSplash, 4000);
    splash.addEventListener('click', () => { clearTimeout(splashTimer); dismissSplash(); });

    // ---- category tabs: one continuous vertical list of all categories,
    // the sticky tabs row is a scroll-spy INDICATOR (highlights whichever
    // category is currently under it as you scroll) rather than a
    // show/hide switch. Tapping a tab still quick-jumps to that section.
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');
    const tabsWrap = document.getElementById('tabs-wrap');

    function setActiveTab(targetId) {
      let changed = false;
      tabs.forEach(t => {
        const isMatch = t.dataset.target === targetId;
        if (isMatch && !t.classList.contains('active')) changed = true;
        t.classList.toggle('active', isMatch);
      });
      if (changed) {
        const activeTab = document.querySelector('.tab.active');
        if (activeTab) activeTab.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
      }
    }

    let stickyH = 0;
    function applyScrollMargin() {
      stickyH = tabsWrap.getBoundingClientRect().height;
      panels.forEach(p => { p.style.scrollMarginTop = stickyH + 'px'; });
    }
    applyScrollMargin();
    window.addEventListener('resize', applyScrollMargin);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        setActiveTab(targetId);
        document.getElementById(targetId).scrollIntoView({behavior:'smooth', block:'start'});
      });
    });

    function updateActiveOnScroll() {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let activeId;
      if (atBottom) {
        activeId = panels[panels.length - 1].id;
      } else {
        activeId = panels[0].id;
        for (let i = 0; i < panels.length; i++) {
          if (panels[i].getBoundingClientRect().top - stickyH <= 2) {
            activeId = panels[i].id;
          } else {
            break;
          }
        }
      }
      setActiveTab(activeId);
    }
    let tickingScroll = false;
    window.addEventListener('scroll', () => {
      if (!tickingScroll) {
        window.requestAnimationFrame(() => { updateActiveOnScroll(); tickingScroll = false; });
        tickingScroll = true;
      }
    }, {passive:true});
    updateActiveOnScroll();

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.body.className = document.body.className.replace(/lang-\S+/g, '').trim();
        document.body.classList.add('lang-' + btn.dataset.lang);
      });
    });
