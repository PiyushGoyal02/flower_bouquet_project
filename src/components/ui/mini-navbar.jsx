import React, { useState, useEffect, useRef } from 'react';
import '../../CSS_CODE/MiniNavbarCSS.css';

/* ── Slide-up animated link ──────────────────────────────────── */
const AnimatedNavLink = ({ href, children }) => (
  <a href={href} className="mini-nav-link" style={{
    position:       'relative',
    display:        'inline-block',
    overflow:       'hidden',
    height:         '18px',
    lineHeight:     '18px',
    textDecoration: 'none',
    fontSize:       '14px',
    verticalAlign:  'middle',
  }}>
    <span className="mini-nav-link-inner" style={{
      display:       'flex',
      flexDirection: 'column',
    }}>
      <span style={{ color: 'var(--text-on-dark-muted)', lineHeight: '18px', display: 'block', whiteSpace: 'nowrap' }}>
        {children}
      </span>
      <span style={{ color: 'var(--text-on-dark)', lineHeight: '18px', display: 'block', whiteSpace: 'nowrap' }}>
        {children}
      </span>
    </span>
  </a>
);

/* ── Main Navbar ─────────────────────────────────────────────── */
export function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [isRounded, setIsRounded] = useState(true);
  const timerRef                  = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (isOpen) {
      setIsRounded(false);
    } else {
      timerRef.current = setTimeout(() => setIsRounded(true), 300);
    }
    return () => clearTimeout(timerRef.current);
  }, [isOpen]);

  const navLinks = [
    { label: 'Home',     href: '/homepage'     },
    { label: 'About',    href: '/aboutsection' },
    { label: 'Contact',  href: '/contact'      },
    { label: 'Products', href: '/products'     },
  ];

  /* ── Critical layout — inline so no global CSS can override ── */
  const headerStyle = {
    position:             'fixed',
    top:                  '20px',
    left:                 '50%',
    transform:            'translateX(-50%)',
    zIndex:               999,
    display:              'flex',
    flexDirection:        'column',
    alignItems:           'center',
    padding:              '10px 40px',
    backdropFilter:       'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius:         isRounded ? '9999px' : '16px',
    border:               '1px solid rgba(255,255,255,0.18)',
    backgroundColor:      'var(--navbar-bg-dark)',
    transition:           'border-radius 300ms ease',
    boxSizing:            'border-box',
    width:                '650px',
  };

  const innerRowStyle = {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    width:          '100%',
    gap:            '32px',
  };

  const logoStyle = {
    position:       'relative',
    width:          '20px',
    height:         '20px',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    flexShrink:     0,
    textDecoration: 'none',
  };

  const dot = (extra) => ({
    position:        'absolute',
    width:           '5px',
    height:          '5px',
    borderRadius:    '50%',
    backgroundColor: 'var(--text-on-dark)',
    opacity:         0.75,
    ...extra,
  });

  const desktopNavStyle = {
    display:    'flex',
    alignItems: 'center',
    gap:        '28px',
    flex:       1,
    justifyContent: 'center',
  };

  const btnRowStyle = {
    display:    'flex',
    alignItems: 'center',
    gap:        '10px',
    flexShrink: 0,
  };

  const loginBtnStyle = {
    padding:         '6px 18px',
    fontSize:        '13px',
    border:          '1px solid rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(28,8,16,0.62)',
    color:           'var(--text-on-dark-muted)',
    borderRadius:    '9999px',
    cursor:          'pointer',
    textDecoration:  'none',
    display:         'inline-block',
    whiteSpace:      'nowrap',
    lineHeight:      '1.5',
  };

  const signupBtnStyle = {
    padding:        '6px 18px',
    fontSize:       '13px',
    fontWeight:     '600',
    color:          'var(--ink)',
    background:     'linear-gradient(135deg, #f3f4f6, #d1d5db)',
    borderRadius:   '9999px',
    border:         'none',
    cursor:         'pointer',
    textDecoration: 'none',
    display:        'inline-block',
    whiteSpace:     'nowrap',
    lineHeight:     '1.5',
  };

  return (
    <header style={headerStyle}>

      {/* ── Main row ── */}
      <div style={innerRowStyle}>

        {/* Logo — 4 dots */}
        <a href="/homepage" style={logoStyle}>
          <span style={dot({ top: 0,    left: '50%',  transform: 'translateX(-50%)' })} />
          <span style={dot({ bottom: 0, left: '50%',  transform: 'translateX(-50%)' })} />
          <span style={dot({ left: 0,   top:  '50%',  transform: 'translateY(-50%)' })} />
          <span style={dot({ right: 0,  top:  '50%',  transform: 'translateY(-50%)' })} />
        </a>

        {/* Desktop nav links — CSS hides on mobile */}
        <nav style={desktopNavStyle} className="mini-navbar-links">
          {navLinks.map(link => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        {/* Desktop buttons — CSS hides on mobile */}
        <div style={btnRowStyle} className="mini-navbar-buttons">
          <a href="/" style={loginBtnStyle} className="mini-navbar-login-btn">LogIn</a>
          <div style={{ position: 'relative' }}>
            <div className="mini-navbar-signup-glow" />
            <a href="/" style={signupBtnStyle} className="mini-navbar-signup-btn">Signup</a>
          </div>
        </div>

        {/* Hamburger — CSS hides on desktop */}
        <button
          className="mini-navbar-hamburger"
          onClick={() => setIsOpen(p => !p)}
          aria-label={isOpen ? 'Close' : 'Open'}
          style={{ background:'none', border:'none', cursor:'pointer',
                   display:'flex', alignItems:'center', color:'var(--text-on-dark-muted)',
                   padding:0, flexShrink:0 }}
        >
          {isOpen ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      <div style={{
        overflow:      'hidden',
        width:         '100%',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        maxHeight:     isOpen ? '400px' : '0px',
        opacity:       isOpen ? 1 : 0,
        paddingTop:    isOpen ? '14px' : '0px',
        transition:    'max-height 300ms ease, opacity 300ms ease, padding-top 300ms ease',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}>
        <nav style={{ display:'flex', flexDirection:'column', alignItems:'center',
                      gap:'14px', width:'100%' }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
               style={{ color:'var(--text-on-dark-muted)', textDecoration:'none', fontSize:'15px',
                        textAlign:'center', display:'block', width:'100%' }}
               className="mini-navbar-mobile-link">
              {link.label}
            </a>
          ))}
        </nav>
        <div style={{ display:'flex', flexDirection:'column', gap:'10px',
                      marginTop:'14px', width:'100%', alignItems:'center' }}>
          <a href="/" style={{ ...loginBtnStyle, width:'100%', textAlign:'center' }}>LogIn</a>
          <a href="/" style={{ ...signupBtnStyle, width:'100%', textAlign:'center' }}>Signup</a>
        </div>
      </div>

    </header>
  );
}
