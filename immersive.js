(() => {
  const hero = document.querySelector('.hero');
  const showcase = document.querySelector('#showcase');
  if (!hero || !showcase) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

  document.body.insertAdjacentHTML('afterbegin', '<div class="mv-progress" aria-hidden="true"></div><div class="mv-cursor" aria-hidden="true"></div>');
  hero.insertAdjacentHTML('beforeend', '<canvas id="mv-webgl" aria-hidden="true"></canvas><div class="mv-hero-vignette"></div><div class="mv-hero-copy"><p class="mv-kicker">Engineering motion since 1989</p><h1 class="mv-title">MONTANA<span>VISION</span></h1><p class="mv-subtitle">Advanced combustion technology, engineered for a cleaner and more efficient future.</p></div><div class="mv-scroll">Scroll to enter</div>');
  showcase.insertAdjacentHTML('beforebegin', '<section class="mv-world" aria-label="Montana Vision story"><div class="mv-world__sticky"><div class="mv-world__image"></div><div class="mv-world__veil"></div><div class="mv-orbit"></div><div class="mv-world__rail"><article class="mv-scene"><span class="mv-scene__no">01 / VISION</span><h2>Less fuel.<br>More force.</h2><p>A new approach to combustion turns efficiency into performance, without treating sustainability as a compromise.</p></article><article class="mv-scene"><span class="mv-scene__no">02 / ENGINEERING</span><h2>Pressure,<br>controlled.</h2><p>High-pressure injection, thermal stability and precise sealing work as one engineered system.</p></article><article class="mv-scene"><span class="mv-scene__no">03 / IMPACT</span><h2>Built beyond<br>the road.</h2><p>Automotive, marine and industrial applications connected by one goal: measurable real-world efficiency.</p></article></div></div></section>');

  const world = document.querySelector('.mv-world');
  const scenes = [...document.querySelectorAll('.mv-scene')];
  const topbar = document.querySelector('.topbar');
  const sections = [...document.querySelectorAll('main > .section')];
  sections.forEach((section, index) => {
    section.classList.add('mv-reveal');
    section.dataset.mvNumber = String(index + 1).padStart(2, '0');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-inview', entry.isIntersecting));
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  sections.forEach(section => observer.observe(section));

  const depthMedia = [...document.querySelectorAll('.mediaTile img,.mediaCard img,.ownerPortrait,.ownerBoatCard img,.officeImg img')];
  let sceneProgress = 0;
  let pageProgress = 0;
  let raf = 0;

  const updateScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    pageProgress = clamp(scrollY / max);
    root.style.setProperty('--mv-progress', pageProgress.toFixed(4));
    root.style.setProperty('--hero-progress', clamp(scrollY / Math.max(1, hero.offsetHeight)).toFixed(4));
    topbar?.classList.toggle('is-scrolled', scrollY > 30);

    const worldRect = world.getBoundingClientRect();
    sceneProgress = clamp(-worldRect.top / Math.max(1, world.offsetHeight - innerHeight));
    world.style.setProperty('--scene-progress', sceneProgress.toFixed(4));
    scenes.forEach((scene, index) => {
      const center = index / (scenes.length - 1);
      const distance = Math.abs(sceneProgress - center);
      scene.style.setProperty('--scene-opacity', clamp(1 - distance * 5.2).toFixed(3));
      scene.style.setProperty('--scene-y', `${((center - sceneProgress) * 150).toFixed(1)}px`);
      scene.style.setProperty('--scene-z', `${(-distance * 350).toFixed(1)}px`);
      scene.style.setProperty('--scene-scale', (1 - distance * .35).toFixed(3));
      scene.style.setProperty('--scene-blur', `${(distance * 14).toFixed(1)}px`);
    });

    if (!reduceMotion) {
      depthMedia.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) return;
        const centerDistance = rect.top + rect.height / 2 - innerHeight / 2;
        const depth = .018 + index % 3 * .006;
        element.style.translate = `0 ${(-centerDistance * depth).toFixed(1)}px`;
      });
    }
    raf = 0;
  };

  addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(updateScroll);
  }, { passive: true });
  addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  if (!reduceMotion) {
    addEventListener('pointermove', event => {
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
    }, { passive: true });

    document.querySelectorAll('.mediaTile,.usecaseCard,.mediaCard,.swipePanel,.ownerBoatCard,.ownerQuickGrid > div,.ownerStats > div,.ownerTimeline article').forEach(card => {
      card.classList.add('mv-tilt');
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(1100px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translate3d(0,-7px,24px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  if (reduceMotion) return;
  import('https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js').then(THREE => {
    const canvas = document.querySelector('#mv-webgl');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02050a, .047);
    const camera = new THREE.PerspectiveCamera(43, 1, .1, 100);
    camera.position.set(0, 0, 14);

    const heroGroup = new THREE.Group();
    scene.add(heroGroup);
    const core = new THREE.Mesh(
      new THREE.TorusKnotGeometry(3.15, .72, 220, 32, 2, 5),
      new THREE.MeshPhysicalMaterial({ color: 0xc8d4e8, metalness: .92, roughness: .18, clearcoat: 1, clearcoatRoughness: .1 })
    );
    heroGroup.add(core);
    const cage = new THREE.Mesh(
      new THREE.IcosahedronGeometry(4.8, 2),
      new THREE.MeshBasicMaterial({ color: 0x4dbdff, wireframe: true, transparent: true, opacity: .13 })
    );
    heroGroup.add(cage);

    const techGroup = new THREE.Group();
    scene.add(techGroup);
    const geometries = [
      new THREE.OctahedronGeometry(1.15, 1),
      new THREE.TorusGeometry(1.45, .11, 18, 96),
      new THREE.DodecahedronGeometry(.85, 0)
    ];
    const materials = [
      new THREE.MeshPhysicalMaterial({ color: 0x4aa8ff, metalness: .8, roughness: .25, transparent: true, opacity: .56 }),
      new THREE.MeshBasicMaterial({ color: 0xff4545, wireframe: true, transparent: true, opacity: .45 }),
      new THREE.MeshPhysicalMaterial({ color: 0xdceeff, metalness: .9, roughness: .2, wireframe: true, transparent: true, opacity: .35 })
    ];
    for (let i = 0; i < 12; i++) {
      const mesh = new THREE.Mesh(geometries[i % geometries.length], materials[i % materials.length]);
      const angle = i / 12 * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * (6 + i % 3), Math.sin(angle * 1.7) * 4.5, -3 - i % 4 * 2);
      mesh.scale.setScalar(.55 + i % 4 * .16);
      mesh.userData.speed = .2 + i % 5 * .08;
      techGroup.add(mesh);
    }

    const count = 1300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 17;
      const angle = Math.random() * Math.PI * 2;
      const latitude = (Math.random() - .5) * Math.PI;
      positions[i * 3] = Math.cos(angle) * Math.cos(latitude) * radius;
      positions[i * 3 + 1] = Math.sin(latitude) * radius;
      positions[i * 3 + 2] = Math.sin(angle) * Math.cos(latitude) * radius;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0x8fdfff, size: .035, transparent: true, opacity: .68 }));
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0x7297c9, 1.45));
    const blue = new THREE.PointLight(0x277dff, 90, 32); blue.position.set(6, 4, 7); scene.add(blue);
    const red = new THREE.PointLight(0xff2424, 78, 28); red.position.set(-7, -3, 5); scene.add(red);

    let mouseX = 0, mouseY = 0;
    addEventListener('pointermove', event => {
      mouseX = event.clientX / innerWidth - .5;
      mouseY = event.clientY / innerHeight - .5;
    }, { passive: true });
    const resize = () => {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    addEventListener('resize', resize);

    const clock = new THREE.Clock();
    const draw = () => {
      const time = clock.getElapsedTime();
      const heroVisibility = clamp(1 - scrollY / Math.max(1, hero.offsetHeight) * 1.25);
      heroGroup.visible = heroVisibility > .01;
      heroGroup.scale.setScalar(.72 + heroVisibility * .28);
      heroGroup.rotation.x = time * .08 + mouseY * .22;
      heroGroup.rotation.y = time * .16 + mouseX * .32 + sceneProgress * 1.8;
      cage.rotation.z = -time * .08;
      core.material.opacity = heroVisibility;
      core.material.transparent = heroVisibility < .99;
      cage.material.opacity = .13 * heroVisibility;

      techGroup.visible = pageProgress > .12;
      techGroup.rotation.y = time * .025 + pageProgress * Math.PI * 2.2;
      techGroup.rotation.x = mouseY * .12;
      techGroup.children.forEach((mesh, index) => {
        mesh.rotation.x = time * mesh.userData.speed + index;
        mesh.rotation.y = time * mesh.userData.speed * .7;
        mesh.position.y += Math.sin(time * .7 + index) * .0018;
      });
      particles.rotation.y = time * .012 + pageProgress * .45;
      particles.rotation.x = mouseY * .05;
      camera.position.x += (mouseX * .7 - camera.position.x) * .035;
      camera.position.y += (-mouseY * .45 - camera.position.y) * .035;
      camera.position.z = 14 - sceneProgress * 1.5;
      renderer.render(scene, camera);
      requestAnimationFrame(draw);
    };
    draw();
  }).catch(() => hero.classList.add('mv-webgl-fallback'));
})();
