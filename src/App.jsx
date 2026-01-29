import React, { useState, useEffect, useRef } from 'react';

function App() {
  // --- 1. TYPEWRITER EFFECT ---
  const [text, setText] = useState('');
  const words = ["Mega Projects", "Expressways", "Metro Lines", "Growth Story"];
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

  // --- 2. SCROLL REVEAL ANIMATION ---
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

  // --- 3. STATS COUNTER (Starts when visible) ---
  const [counts, setCounts] = useState({ subs: 0, views: 0, cities: 0 });
  const statsRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted) {
        setHasStarted(true);
        // Start counting
        const duration = 2000; // 2 seconds
        const steps = 50;
        const intervalTime = duration / steps;
        
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          setCounts({
            subs: Math.min(42, Math.ceil((42 / steps) * currentStep)),
            views: Math.min(12, Math.ceil((12 / steps) * currentStep)),
            cities: Math.min(15, Math.ceil((15 / steps) * currentStep))
          });
          if (currentStep >= steps) clearInterval(timer);
        }, intervalTime);
      }
    });
    
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  return (
    <div>
      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', height: '80px', padding: '0 5%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000,
        background: 'var(--glass)', borderBottom: '1px solid var(--border-light)'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="Profile" style={{width:'40px', height:'40px', borderRadius:'50%', border:'2px solid var(--primary)', objectFit:'cover'}} />
          MR RINKU <span style={{ color: 'var(--secondary)' }}>INFRA</span>
        </div>
        
        <div className="nav-links" style={{ display: 'flex', gap: '30px' }}>
          <a href="#home" className="nav-link">Home</a>
          <a href="#videos" className="nav-link">My Videos</a>
          <a href="#series" className="nav-link">Playlists</a>
          <a href="#about" className="nav-link">About Me</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        
        <a href="https://youtube.com/@mr.rinkuinfra?si=mw5w8KlcEpHbY01_" target="_blank" style={{ background: '#cc0000', color: 'white', padding: '10px 20px', borderRadius: '4px', fontWeight: 'bold', display:'flex', alignItems:'center', gap:'8px', textDecoration:'none' }}>
          <i className="fab fa-youtube"></i> Subscribe
        </a>
      </nav>

      {/* HERO SECTION */}
      <section id="home" style={{ 
        minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 6%', paddingTop: '100px', position: 'relative',
        background: `linear-gradient(180deg, rgba(3,3,5,0.7) 0%, #030305 100%), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070') center/cover fixed`
      }}>
        <div className="hero-content reveal active" style={{ maxWidth: '800px', zIndex: 2 }}>
          <span style={{ color: 'var(--secondary)', border: '1px solid var(--secondary)', padding: '5px 10px', fontSize: '0.8rem', fontWeight: 'bold', borderRadius:'4px', background:'rgba(0, 240, 255, 0.1)' }}>YOUTUBE CONTENT CREATOR</span>
          <h1 style={{ fontSize: '3.5rem', margin: '20px 0', lineHeight: 1, fontWeight: '800' }}>
            Exploring India's <br /><span style={{ color: 'var(--primary)', borderRight:'3px solid var(--primary)' }}>{text}</span>
          </h1>
          <p style={{ color: '#d1d5db', fontSize: '1.1rem', maxWidth: '600px', marginBottom: '30px', lineHeight:'1.6', background:'rgba(0,0,0,0.5)', padding:'15px', borderRadius:'4px', borderLeft:'3px solid var(--primary)' }}>
            Hi friends! I am Rinku Nayak from Surat. I travel to construction sites across India to show you the real progress of Bullet Trains, Metros, and Expressways through my videos.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap:'wrap' }}>
            <a href="#videos" className="btn-primary" style={{ background: 'var(--primary)', color: 'black', padding: '15px 30px', fontWeight: 'bold', borderRadius:'4px', textDecoration:'none' }}>Watch My Videos</a>
            <a href="#about" style={{ border: '1px solid white', padding: '15px 30px', fontWeight: 'bold', borderRadius:'4px', textDecoration:'none', color:'white' }}>My Story</a>
          </div>
        </div>

        {/* STATS (Animated Reveal) */}
        <div ref={statsRef} className="stats-container reveal" style={{
          position: 'absolute', bottom: 0, right: 0, background: 'rgba(10,10,15,0.95)', 
          padding: '30px 50px', display: 'flex', gap: '50px', borderTopLeftRadius: '20px', border: '1px solid var(--border-light)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin:'0' }}>{counts.subs}K+</h3>
            <p style={{ color: '#aaa', fontSize: '0.8rem', textTransform:'uppercase' }}>Subscribers</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin:'0' }}>{counts.views}M+</h3>
            <p style={{ color: '#aaa', fontSize: '0.8rem', textTransform:'uppercase' }}>Total Views</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin:'0' }}>{counts.cities}+</h3>
            <p style={{ color: '#aaa', fontSize: '0.8rem', textTransform:'uppercase' }}>Cities Visited</p>
          </div>
        </div>
      </section>

      {/* LATEST VIDEOS */}
      <section id="videos" className="section-padding">
        <div className="reveal" style={{marginBottom:'40px'}}>
            <h2 style={{ fontSize: '2.5rem', marginBottom:'10px' }}>My Newest <span style={{ color: 'var(--primary)' }}>Uploads</span></h2>
            <p style={{color:'#888'}}>Check out the latest videos I just posted on the channel.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {/* Card 1 */}
          <div className="reveal" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-light)', borderRadius:'8px', overflow:'hidden' }}>
            <div style={{position:'relative', paddingTop:'56.25%'}}>
                <iframe style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} src="https://www.youtube.com/embed/0tSJHoVyCX4" title="Video" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div style={{ padding: '20px' }}>
              <span style={{color:'var(--primary)', fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase'}}>Latest Update</span>
              <h3 style={{margin:'10px 0'}}>I visited the Delhi-Mumbai Expressway</h3>
              <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" style={{ color: 'var(--secondary)', fontWeight: 'bold', fontSize:'0.9rem', textDecoration:'none' }}><i className="fab fa-youtube"></i> Watch Now</a>
            </div>
          </div>
          {/* Card 2 */}
          <div className="reveal" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-light)', borderRadius:'8px', overflow:'hidden', transitionDelay:'0.2s' }}>
            <div style={{position:'relative', paddingTop:'56.25%'}}>
                <iframe style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} src="https://www.youtube.com/embed/b11waIBNxto" title="Video" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div style={{ padding: '20px' }}>
              <span style={{color:'var(--primary)', fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase'}}>Bullet Train</span>
              <h3 style={{margin:'10px 0'}}>Narmada River Bridge Construction</h3>
              <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" style={{ color: 'var(--secondary)', fontWeight: 'bold', fontSize:'0.9rem', textDecoration:'none' }}><i className="fab fa-youtube"></i> Watch Now</a>
            </div>
          </div>
           {/* Card 3 */}
           <div className="reveal" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-light)', borderRadius:'8px', overflow:'hidden', transitionDelay:'0.4s' }}>
            <div style={{position:'relative', paddingTop:'56.25%'}}>
                <iframe style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} src="https://www.youtube.com/embed/oremyVh0eLk" title="Video" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div style={{ padding: '20px' }}>
              <span style={{color:'var(--primary)', fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase'}}>Expressway</span>
              <h3 style={{margin:'10px 0'}}>Ankleshwar Interchange Drive</h3>
              <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" style={{ color: 'var(--secondary)', fontWeight: 'bold', fontSize:'0.9rem', textDecoration:'none' }}><i className="fab fa-youtube"></i> Watch Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* SERIES SECTION */}
      <section id="series" className="section-padding" style={{background:'#08090b', borderTop:'1px solid var(--border-light)', borderBottom:'1px solid var(--border-light)'}}>
        <h2 className="reveal" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Video <span style={{ color: 'var(--primary)' }}>Playlists</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div className="reveal" style={{background:'var(--bg-panel)', padding:'30px', border:'1px solid var(--border-light)', borderRadius:'8px'}}>
                <iframe style={{width:'100%', borderRadius:'4px', marginBottom:'15px'}} src="https://www.youtube.com/embed/b11waIBNxto" title="Video" frameBorder="0" allowFullScreen></iframe>
                <h3 style={{marginBottom:'10px'}}>Bullet Train Vlogs</h3>
                <p style={{color:'#888', fontSize:'0.9rem', marginBottom:'20px'}}>All my site visits to the Mumbai-Ahmedabad High Speed Rail project.</p>
                <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" style={{color:'var(--secondary)', fontWeight:'bold', textTransform:'uppercase', fontSize:'0.8rem', textDecoration:'none'}}>View Playlist &rarr;</a>
            </div>
             <div className="reveal" style={{background:'var(--bg-panel)', padding:'30px', border:'1px solid var(--border-light)', borderRadius:'8px', transitionDelay:'0.2s'}}>
                <iframe style={{width:'100%', borderRadius:'4px', marginBottom:'15px'}} src="https://www.youtube.com/embed/0tSJHoVyCX4" title="Video" frameBorder="0" allowFullScreen></iframe>
                <h3 style={{marginBottom:'10px'}}>Expressway Updates</h3>
                <p style={{color:'#888', fontSize:'0.9rem', marginBottom:'20px'}}>My road trips and updates on new Expressways like DME & Dwarka.</p>
                <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" style={{color:'var(--secondary)', fontWeight:'bold', textTransform:'uppercase', fontSize:'0.8rem', textDecoration:'none'}}>View Playlist &rarr;</a>
            </div>
             <div className="reveal" style={{background:'var(--bg-panel)', padding:'30px', border:'1px solid var(--border-light)', borderRadius:'8px', transitionDelay:'0.4s'}}>
                <iframe style={{width:'100%', borderRadius:'4px', marginBottom:'15px'}} src="https://www.youtube.com/embed/9ECMylsM1Z8" title="Video" frameBorder="0" allowFullScreen></iframe>
                <h3 style={{marginBottom:'10px'}}>Metro City Tours</h3>
                <p style={{color:'#888', fontSize:'0.9rem', marginBottom:'20px'}}>Showing you the underground and elevated Metro work in different cities.</p>
                <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" style={{color:'var(--secondary)', fontWeight:'bold', textTransform:'uppercase', fontSize:'0.8rem', textDecoration:'none'}}>View Playlist &rarr;</a>
            </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section-padding reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'center', padding:'80px 6%', background: 'linear-gradient(90deg, #030305 0%, #08090b 100%)' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780" alt="Rinku" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-light)', height:'400px', objectFit:'cover', filter:'grayscale(20%)' }} />
        </div>
        <div style={{ flex: 1.5, minWidth: '300px' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing:'2px', fontSize:'0.9rem' }}>ABOUT ME</span>
          <h2 style={{ fontSize: '3rem', margin: '15px 0' }}>Hello, I am <span style={{ color: 'var(--primary)' }}>Rinku Nayak</span></h2>
          <p style={{ color: '#aaa', lineHeight: 1.6, fontSize: '1.1rem' }}>
            I am a content creator based in <b>Surat, Gujarat</b>. I am not a media agency or an engineer. I am just a passionate guy with a camera who loves seeing India grow.
          </p>
          <br />
          <p style={{ color: '#aaa', lineHeight: 1.6, fontSize: '1.1rem' }}>
            I started this channel to document the massive infrastructure changes happening in our country. I travel on my own expense to bring you ground-level reports of new bridges, tunnels, and highways.
          </p>
          <div style={{marginTop:'30px', display:'flex', gap:'15px', alignItems:'center'}}>
             <span style={{fontFamily:'Rajdhani', fontSize:'1.5rem', fontWeight:'bold'}}>Rinku Nayak</span>
             <span style={{color:'var(--secondary)', fontWeight:'600'}}>| YouTuber</span>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (With Form Animation) */}
      <section id="contact" className="section-padding reveal">
        <div className="contact-wrapper" style={{display:'grid', gridTemplateColumns: window.innerWidth > 992 ? '1fr 1fr' : '1fr', gap:'50px', alignItems:'center'}}>
            <div>
                <h3 style={{fontSize:'2.2rem', marginBottom:'20px'}}>Business / Sponsorships</h3>
                <p style={{color:'#888', marginBottom:'30px'}}>If you want to promote your brand on my channel or collaborate on a video, please send me a message.</p>
                <div style={{display:'flex', alignItems:'center', gap:'20px', marginBottom:'20px'}}>
                    <div style={{width:'50px', height:'50px', borderRadius:'50%', background:'rgba(255,255,255,0.05)', display:'flex', justifyContent:'center', alignItems:'center', color:'var(--primary)'}}>
                        <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                        <h4 style={{fontSize:'1rem'}}>Email Me</h4>
                        <span style={{color:'#888'}}>contact@mrrinkuinfra.com</span>
                    </div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                    <div style={{width:'50px', height:'50px', borderRadius:'50%', background:'rgba(255,255,255,0.05)', display:'flex', justifyContent:'center', alignItems:'center', color:'var(--primary)'}}>
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                        <h4 style={{fontSize:'1rem'}}>I am from</h4>
                        <span style={{color:'#888'}}>Surat, Gujarat, India</span>
                    </div>
                </div>
            </div>

            <form style={{background:'var(--bg-panel)', padding:'40px', borderRadius:'8px', border:'1px solid var(--border-light)'}}>
                {/* Name Input with Floating Label */}
                <div className="input-group">
                    <input type="text" className="form-input" placeholder=" " required />
                    <label className="form-label">Your Name</label>
                </div>
                
                {/* Email Input with Floating Label */}
                <div className="input-group">
                    <input type="email" className="form-input" placeholder=" " required />
                    <label className="form-label">Your Email</label>
                </div>
                
                {/* Message Input with Floating Label */}
                <div className="input-group">
                    <textarea rows="4" className="form-input" placeholder=" " required></textarea>
                    <label className="form-label">Message</label>
                </div>
                
                <button className="btn-primary" style={{width:'100%', padding:'15px', background:'var(--primary)', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px'}}>Send Message</button>
            </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'black', padding: '50px 6%', textAlign: 'center', borderTop: '1px solid #222' }}>
        <h2 style={{ marginBottom: '20px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
            <i className="fas fa-hard-hat" style={{color:'var(--primary)'}}></i> MR RINKU INFRA
        </h2>
        <p style={{color:'#888', maxWidth:'500px', margin:'0 auto 30px auto'}}>Just a YouTuber from Surat exploring India's growth story. Subscribe to my channel for daily updates.</p>
        
        <div style={{ borderTop:'1px solid #222', paddingTop:'30px', marginTop:'30px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="https://youtube.com/@mr.rinkuinfra" target="_blank" className="social-icon"><i className="fab fa-youtube"></i></a>
            </div>
            <p style={{ color: '#666', fontSize:'0.9rem' }}>&copy; 2025 Mr Rinku Infra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
