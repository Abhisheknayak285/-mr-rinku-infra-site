import React, { useState, useEffect, useRef } from 'react';

function App() {
  // --- 1. TYPEWRITER EFFECT ---
  const [text, setText] = useState('');
  const words = ["Bullet Trains", "Metro Networks", "Expressways", "Mega Bridges"];
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 50 : 150);
      if (!isDeleting && text === fullText) setTimeout(() => setIsDeleting(true), 2000);
      else if (isDeleting && text === '') { setIsDeleting(false); setLoopNum(loopNum + 1); }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  // --- 2. SCROLL REVEAL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    return () => revealElements.forEach((el) => observer.unobserve(el));
  }, []);

  // --- 3. STATS COUNTER ---
  const [counts, setCounts] = useState({ subs: 0, views: 0, cities: 0 });
  const statsRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted) {
        setHasStarted(true);
        const duration = 2000;
        const steps = 50;
        const intervalTime = duration / steps;
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          setCounts({
            subs: Math.floor(progress * 42200),
            views: Math.floor(progress * 12000000),
            cities: Math.floor(progress * 15)
          });
          if (currentStep >= steps) {
             clearInterval(timer);
             setCounts({ subs: 42200, views: 12000000, cities: 15 }); 
          }
        }, intervalTime);
      }
    });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Helper
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
    return num + '+';
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', padding: '20px 5%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000,
        background: 'rgba(5, 5, 5, 0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ fontSize: '1.6rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px', textTransform:'uppercase', letterSpacing:'1px' }}>
          {/* DP */}
          <img src="https://uploads.onecompiler.io/43d4xt63k/43d7tx2r5/high-1734409463.jpg" alt="Profile" style={{width:'45px', height:'45px', borderRadius:'50%', border:'2px solid var(--primary)', objectFit:'cover'}} />
          MR RINKU <span style={{ color: 'var(--secondary)' }}>INFRA</span>
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: '40px' }}>
          <a href="#home" className="nav-link">Home</a>
          <a href="#videos" className="nav-link">My Videos</a>
          <a href="#series" className="nav-link">Playlists</a>
          <a href="#about" className="nav-link">About Me</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <a href="https://youtube.com/@mr.rinkuinfra?si=mw5w8KlcEpHbY01_" target="_blank" style={{ 
            padding: '10px 24px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)',
            fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' 
        }}>
          <i className="fab fa-youtube"></i> Subscribe
        </a>
      </nav>

      {/* HERO SECTION - MATCHING HTML LAYOUT */}
      <section id="home" style={{ 
        minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 10%', position: 'relative'
      }}>
        <div className="hero-content reveal active" style={{ maxWidth: '900px', zIndex: 2, marginTop:'80px' }}>
          
          {/* TAGLINE */}
          <span style={{ 
              display: 'inline-block', background: 'rgba(255, 140, 0, 0.1)', color: 'var(--primary)', padding: '5px 15px', borderRadius: '20px',
              fontFamily: 'Rajdhani', fontWeight: '700', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '20px', border: '1px solid rgba(255, 140, 0, 0.3)'
          }}>
            OFFICIAL REPORTING CHANNEL
          </span>

          {/* HEADLINE */}
          <h1 style={{ fontSize: '4.5rem', lineHeight: 1.05, marginBottom: '25px', fontWeight: '800' }}>
            Tracking India's<br />
            {/* OUTLINE TEXT STYLE FROM HTML */}
            <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--secondary)' }}>{text}</span>
          </h1>

          <p style={{ color: '#9ca3af', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '50px', lineHeight: '1.6', borderLeft: '3px solid var(--secondary)', paddingLeft: '20px' }}>
            Deep-dive technical reports from the frontlines of India's rapid urbanization. Underground tunnels to high-speed corridors—I cover it all.
          </p>

          {/* STATS BOX - INSIDE HERO CONTENT LIKE HTML */}
          <div ref={statsRef} className="hero-stats">
            <div className="stat-box">
                <h3>{formatNumber(counts.subs)}</h3>
                <span>Subscribers</span>
            </div>
            <div className="stat-box">
                <h3>{formatNumber(counts.views)}</h3>
                <span>Total Views</span>
            </div>
            <div className="stat-box">
                <h3>{formatNumber(counts.cities)}</h3>
                <span>Cities Visited</span>
            </div>
          </div>

        </div>
      </section>

      {/* LATEST VIDEOS */}
      <section id="videos" className="section-padding">
        <div className="reveal" style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'60px', flexWrap:'wrap'}}>
            <div>
                <h2 style={{ fontSize: '3rem', fontWeight:'800', lineHeight:'1', marginBottom:'10px' }}>Latest <span style={{ color: 'var(--secondary)' }}>Reports</span></h2>
                <p style={{color:'#9ca3af', marginTop:'10px'}}>Direct from the construction sites. Real footage, technical analysis.</p>
            </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {/* Card 1 */}
          <div className="project-card reveal">
            <div style={{position:'relative', paddingTop:'56.25%', background:'#000'}}>
                <iframe style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} src="https://www.youtube.com/embed/0tSJHoVyCX4" title="Video" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="card-body">
              <span style={{color:'var(--primary)', fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'1px', display:'block', marginBottom:'8px'}}>Latest Update</span>
              <h3 style={{margin:'5px 0 10px', fontSize:'1.3rem', fontWeight:'600', color:'#eee'}}>I visited the Delhi-Mumbai Expressway</h3>
              <div style={{ display:'flex', alignItems:'center', gap:'15px', fontSize:'0.8rem', color:'#666', marginTop:'15px' }}>
                <span style={{color:'var(--secondary)'}}><i className="fab fa-youtube"></i> Watch Now</span>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="project-card reveal" style={{ transitionDelay:'0.2s' }}>
            <div style={{position:'relative', paddingTop:'56.25%', background:'#000'}}>
                <iframe style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} src="https://www.youtube.com/embed/b11waIBNxto" title="Video" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="card-body">
              <span style={{color:'var(--primary)', fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'1px', display:'block', marginBottom:'8px'}}>Bullet Train</span>
              <h3 style={{margin:'5px 0 10px', fontSize:'1.3rem', fontWeight:'600', color:'#eee'}}>Narmada River Bridge Construction</h3>
              <div style={{ display:'flex', alignItems:'center', gap:'15px', fontSize:'0.8rem', color:'#666', marginTop:'15px' }}>
                <span style={{color:'var(--secondary)'}}><i className="fab fa-youtube"></i> Watch Now</span>
              </div>
            </div>
          </div>
           {/* Card 3 */}
           <div className="project-card reveal" style={{ transitionDelay:'0.4s' }}>
            <div style={{position:'relative', paddingTop:'56.25%', background:'#000'}}>
                <iframe style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} src="https://www.youtube.com/embed/oremyVh0eLk" title="Video" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="card-body">
              <span style={{color:'var(--primary)', fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'1px', display:'block', marginBottom:'8px'}}>Expressway</span>
              <h3 style={{margin:'5px 0 10px', fontSize:'1.3rem', fontWeight:'600', color:'#eee'}}>Ankleshwar Interchange Drive</h3>
              <div style={{ display:'flex', alignItems:'center', gap:'15px', fontSize:'0.8rem', color:'#666', marginTop:'15px' }}>
                <span style={{color:'var(--secondary)'}}><i className="fab fa-youtube"></i> Watch Now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERIES SECTION */}
      <section id="series" className="section-padding" style={{background:'#08090b', borderTop:'1px solid var(--border-light)', borderBottom:'1px solid var(--border-light)'}}>
        <h2 className="reveal" style={{ fontSize: '3rem', fontWeight:'800', lineHeight:'1', marginBottom: '10px' }}>Video <span style={{ color: 'var(--secondary)' }}>Playlists</span></h2>
        <p className="reveal" style={{color:'#9ca3af', marginTop:'10px', marginBottom:'60px'}}>Watch my full series on these topics.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            <div className="project-card reveal">
                <div style={{position:'relative', paddingTop:'56.25%', background:'#000'}}>
                    <iframe style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} src="https://www.youtube.com/embed/b11waIBNxto" title="Video" frameBorder="0" allowFullScreen></iframe>
                </div>
                <div className="card-body">
                    <span style={{color:'var(--secondary)', fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'1px', display:'block', marginBottom:'8px'}}>Playlist 01</span>
                    <h3 style={{margin:'5px 0 10px', fontSize:'1.3rem', fontWeight:'600', color:'#eee'}}>Bullet Train Vlogs</h3>
                    <p style={{color:'#9ca3af', fontSize:'0.9rem', marginBottom:'20px', lineHeight:'1.6'}}>All my site visits to the Mumbai-Ahmedabad High Speed Rail project.</p>
                    <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" style={{color:'#fff', fontWeight:'800', textTransform:'uppercase', fontSize:'0.7rem', letterSpacing:'1px', textDecoration:'none', background:'var(--secondary)', padding:'5px 10px', color:'black'}}>View Playlist</a>
                </div>
            </div>
             <div className="project-card reveal" style={{ transitionDelay:'0.2s' }}>
                <div style={{position:'relative', paddingTop:'56.25%', background:'#000'}}>
                    <iframe style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} src="https://www.youtube.com/embed/0tSJHoVyCX4" title="Video" frameBorder="0" allowFullScreen></iframe>
                </div>
                <div className="card-body">
                    <span style={{color:'var(--secondary)', fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'1px', display:'block', marginBottom:'8px'}}>Playlist 02</span>
                    <h3 style={{margin:'5px 0 10px', fontSize:'1.3rem', fontWeight:'600', color:'#eee'}}>Expressway Updates</h3>
                    <p style={{color:'#9ca3af', fontSize:'0.9rem', marginBottom:'20px', lineHeight:'1.6'}}>My road trips and updates on new Expressways like DME & Dwarka.</p>
                    <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" style={{color:'#fff', fontWeight:'800', textTransform:'uppercase', fontSize:'0.7rem', letterSpacing:'1px', textDecoration:'none', background:'var(--secondary)', padding:'5px 10px', color:'black'}}>View Playlist</a>
                </div>
            </div>
             <div className="project-card reveal" style={{ transitionDelay:'0.4s' }}>
                <div style={{position:'relative', paddingTop:'56.25%', background:'#000'}}>
                    <iframe style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} src="https://www.youtube.com/embed/9ECMylsM1Z8" title="Video" frameBorder="0" allowFullScreen></iframe>
                </div>
                <div className="card-body">
                    <span style={{color:'var(--secondary)', fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'1px', display:'block', marginBottom:'8px'}}>Playlist 03</span>
                    <h3 style={{margin:'5px 0 10px', fontSize:'1.3rem', fontWeight:'600', color:'#eee'}}>Metro City Tours</h3>
                    <p style={{color:'#9ca3af', fontSize:'0.9rem', marginBottom:'20px', lineHeight:'1.6'}}>Showing you the underground and elevated Metro work in different cities.</p>
                    <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" style={{color:'#fff', fontWeight:'800', textTransform:'uppercase', fontSize:'0.7rem', letterSpacing:'1px', textDecoration:'none', background:'var(--secondary)', padding:'5px 10px', color:'black'}}>View Playlist</a>
                </div>
            </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section-padding reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center', background: 'linear-gradient(90deg, #030305 0%, #08090b 100%)' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <img src="https://uploads.onecompiler.io/43d4xt63k/44bzks3xk/PHOTO-2026-01-29-14-17-43.jpg" alt="Rinku" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-light)', height:'500px', objectFit:'cover', filter:'grayscale(20%)', transition:'0.4s' }} />
        </div>
        <div style={{ flex: 1.2, minWidth: '300px' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing:'2px', fontSize:'0.8rem', textTransform:'uppercase' }}>ABOUT ME</span>
          <h2 style={{ fontSize: '3.5rem', margin: '15px 0', lineHeight:'1' }}>Hello, I am <span style={{ color: 'var(--primary)' }}>Rinku Nayak</span></h2>
          <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.1rem', marginBottom:'20px' }}>
            I am a content creator based in <b>Surat, Gujarat</b>. I am not a media agency or an engineer. I am just a passionate guy with a camera who loves seeing India grow.
          </p>
          <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.1rem' }}>
            I started this channel to document the massive infrastructure changes happening in our country. I travel on my own expense to bring you ground-level reports.
          </p>
          <div style={{marginTop:'30px', display:'flex', gap:'15px', alignItems:'center'}}>
             <span style={{fontFamily:'Rajdhani', fontSize:'1.5rem', fontWeight:'bold'}}>Rinku Nayak</span>
             <span style={{color:'var(--secondary)', fontWeight:'600'}}>| YouTuber</span>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section-padding reveal">
        <div className="contact-wrapper" style={{display:'grid', gridTemplateColumns: window.innerWidth > 992 ? '1fr 1.5fr' : '1fr', gap:'60px', marginTop:'50px'}}>
            <div>
                <h3 style={{fontSize:'2rem', marginBottom:'20px'}}>Business Inquiries</h3>
                <p style={{color:'#9ca3af', marginBottom:'40px', lineHeight:'1.6'}}>If you want to promote your brand on my channel or collaborate on a video, please send me a message.</p>
                <div style={{display:'flex', alignItems:'center', gap:'20px', marginBottom:'25px'}}>
                    <div style={{width:'50px', height:'50px', background:'rgba(255,255,255,0.05)', display:'flex', justifyContent:'center', alignItems:'center', color:'var(--secondary)', border:'1px solid var(--border-light)'}}>
                        <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                        <h4 style={{fontSize:'1rem', marginBottom:'5px'}}>Email Me</h4>
                        <span style={{color:'#888'}}>contact@mrrinkuinfra.com</span>
                    </div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                    <div style={{width:'50px', height:'50px', background:'rgba(255,255,255,0.05)', display:'flex', justifyContent:'center', alignItems:'center', color:'var(--secondary)', border:'1px solid var(--border-light)'}}>
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                        <h4 style={{fontSize:'1rem', marginBottom:'5px'}}>Location</h4>
                        <span style={{color:'#888'}}>Surat, Gujarat, India</span>
                    </div>
                </div>
            </div>

            <form style={{background:'var(--glass)', padding:'50px', border:'1px solid var(--border-light)', backdropFilter:'blur(10px)'}}>
                <div className="input-group">
                    <input type="text" className="form-input" placeholder=" " required />
                    <label className="form-label">Your Name</label>
                </div>
                <div className="input-group">
                    <input type="email" className="form-input" placeholder=" " required />
                    <label className="form-label">Your Email</label>
                </div>
                <div className="input-group">
                    <textarea rows="4" className="form-input" placeholder=" " required></textarea>
                    <label className="form-label">Message</label>
                </div>
                <button style={{padding: '10px 24px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', width:'100%', cursor:'pointer'}}>Send Message</button>
            </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#020202', padding: '80px 10% 30px', borderTop: '1px solid #111' }}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'40px', marginBottom:'60px'}}>
            <div>
                <a href="#" className="logo" style={{marginBottom:'20px', display:'flex', alignItems:'center', gap:'10px', fontSize:'1.6rem', fontWeight:'900', color:'#fff', textDecoration:'none'}}>
                    <i className="fas fa-layer-group" style={{color:'var(--primary)'}}></i> MR RINKU <span style={{color:'var(--secondary)'}}>INFRA</span>
                </a>
                <p style={{color:'#666', fontSize:'0.9rem', lineHeight:'1.6'}}>Just a YouTuber from Surat exploring India's growth story. Subscribe for updates.</p>
            </div>
            <div>
                <h4 style={{color:'#fff', fontSize:'1.1rem', marginBottom:'20px', textTransform:'uppercase', letterSpacing:'1px'}}>Quick Links</h4>
                <ul style={{listStyle:'none'}}>
                    <li style={{marginBottom:'12px'}}><a href="#videos" style={{color:'#666', fontSize:'0.9rem'}}>New Videos</a></li>
                    <li style={{marginBottom:'12px'}}><a href="#series" style={{color:'#666', fontSize:'0.9rem'}}>Playlists</a></li>
                    <li style={{marginBottom:'12px'}}><a href="#about" style={{color:'#666', fontSize:'0.9rem'}}>My Story</a></li>
                </ul>
            </div>
            <div>
                <h4 style={{color:'#fff', fontSize:'1.1rem', marginBottom:'20px', textTransform:'uppercase', letterSpacing:'1px'}}>Projects</h4>
                <ul style={{listStyle:'none'}}>
                    <li style={{marginBottom:'12px'}}><a href="#" style={{color:'#666', fontSize:'0.9rem'}}>High Speed Rail</a></li>
                    <li style={{marginBottom:'12px'}}><a href="#" style={{color:'#666', fontSize:'0.9rem'}}>Metro Systems</a></li>
                    <li style={{marginBottom:'12px'}}><a href="#" style={{color:'#666', fontSize:'0.9rem'}}>Expressways</a></li>
                </ul>
            </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop:'1px solid #111', paddingTop:'30px', color:'#444', fontSize:'0.8rem' }}>
            <span>&copy; 2026 AR InfoTech. All Rights Reserved.</span>
            <div style={{ display: 'flex', gap: '20px' }}>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" className="social-icon"><i className="fab fa-youtube"></i></a>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
