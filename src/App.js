import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GiChicken, GiGalaxy, GiRingedPlanet, GiSpaceship, GiAtom } from 'react-icons/gi';
import { FaFire, FaRocket, FaMoon, FaStar, FaGem } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  position: relative;
`;

const Stars = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const ShootingStar = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
`;

const Nebula = styled(motion.div)`
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  pointer-events: none;
  z-index: 2;
`;

const Star = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.size / 2}px rgba(255, 255, 255, 0.8);
`;

const LandingPage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  z-index: 10;
`;

const Title = styled(motion.h1)`
  font-size: 6rem;
  font-weight: 900;
  background: linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  margin-bottom: 2rem;
  animation: gradient 3s ease infinite;
  text-shadow: 0 0 80px rgba(255, 0, 255, 0.5);
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const PulseRing = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 3px solid #00ffff;
  border-radius: 50px;
  pointer-events: none;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
`;

const EnterButton = styled(motion.button)`
  padding: 1.5rem 4rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(45deg, #ff00ff, #8b00ff);
  border: 3px solid #00ffff;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.6), 0 0 80px rgba(0, 255, 255, 0.4);
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:hover::before {
    width: 300px;
    height: 300px;
  }
  
  &:hover {
    box-shadow: 0 0 60px rgba(255, 0, 255, 0.8), 0 0 120px rgba(0, 255, 255, 0.6);
  }
`;

const RealmPage = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  padding: 2rem;
`;

const LavaChicken = styled(motion.div)`
  font-size: 15rem;
  filter: drop-shadow(0 0 40px #ff4500) drop-shadow(0 0 80px #ff6347);
  position: relative;
  z-index: 5;
  
  @media (max-width: 768px) {
    font-size: 8rem;
  }
`;

const LavaContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LavaParticle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
`;

const LavaBubble = styled(LavaParticle)`
  background: radial-gradient(circle, rgba(255, 69, 0, 0.9) 0%, rgba(255, 140, 0, 0.6) 50%, transparent 100%);
  box-shadow: 0 0 20px rgba(255, 69, 0, 0.8), inset 0 0 10px rgba(255, 200, 0, 0.5);
`;

const LavaEmber = styled(LavaParticle)`
  background: radial-gradient(circle, rgba(255, 215, 0, 1) 0%, rgba(255, 69, 0, 0.8) 50%, transparent 100%);
  box-shadow: 0 0 15px rgba(255, 215, 0, 1);
`;

const LavaSplash = styled(LavaParticle)`
  background: radial-gradient(circle, rgba(255, 100, 0, 0.7) 0%, transparent 70%);
  filter: blur(3px);
`;

const LavaPool = styled(motion.div)`
  position: absolute;
  bottom: -50px;
  width: 300px;
  height: 80px;
  background: radial-gradient(ellipse at center, rgba(255, 69, 0, 0.6) 0%, rgba(139, 0, 0, 0.4) 50%, transparent 80%);
  border-radius: 50%;
  filter: blur(20px);
  z-index: 1;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 60px;
  }
`;

const FireRing = styled(motion.div)`
  position: absolute;
  border: 3px solid rgba(255, 69, 0, 0.6);
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 30px rgba(255, 69, 0, 0.8), inset 0 0 30px rgba(255, 140, 0, 0.4);
  z-index: 2;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 3rem;
  color: ${props => props.color};
  filter: drop-shadow(0 0 20px ${props => props.color});
`;

const BackgroundIcon = styled(motion.div)`
  position: fixed;
  font-size: ${props => props.size || '2rem'};
  color: ${props => props.color};
  opacity: 0.3;
  filter: drop-shadow(0 0 10px ${props => props.color});
  z-index: 3;
`;

const WelcomeText = styled(motion.h2)`
  font-size: 3rem;
  color: #00ffff;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  margin-top: 2rem;
  text-align: center;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubText = styled(motion.p)`
  font-size: 1.5rem;
  color: #ff00ff;
  text-shadow: 0 0 15px rgba(255, 0, 255, 0.6);
  margin-top: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const AudioControls = styled(motion.div)`
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ControlButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(45deg, #00ffff, #0080ff);
  border: 2px solid #ff00ff;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  
  &:hover {
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
    transform: scale(1.05);
  }
`;

function App() {
  const [entered, setEntered] = useState(false);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [lavaParticles, setLavaParticles] = useState([]);
  const [backgroundIcons, setBackgroundIcons] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);

    // Generate shooting stars periodically
    const shootingStarInterval = setInterval(() => {
      const newShootingStar = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 50,
      };
      setShootingStars(prev => [...prev, newShootingStar]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== newShootingStar.id));
      }, 2000);
    }, 3000);

    return () => clearInterval(shootingStarInterval);
  }, []);

  useEffect(() => {
    // Generate background floating icons
    const iconTypes = [
      { icon: 'moon', color: '#c0c0c0' },
      { icon: 'ringedPlanet', color: '#4169e1' },
      { icon: 'galaxy', color: '#9370db' },
      { icon: 'meteor', color: '#ff8c00' },
      { icon: 'spaceship', color: '#00ced1' },
      { icon: 'atom', color: '#00ff7f' },
      { icon: 'star', color: '#ffd700' },
      { icon: 'gem', color: '#ff69b4' },
      { icon: 'sparkles', color: '#ffff00' },
    ];

    const newBackgroundIcons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      ...iconTypes[Math.floor(Math.random() * iconTypes.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: `${Math.random() * 2 + 1}rem`,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));

    setBackgroundIcons(newBackgroundIcons);
  }, []);

  useEffect(() => {
    if (entered && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      setIsPlaying(true);
    }
  }, [entered]);

  useEffect(() => {
    if (!entered) return;

    // Generate lava particles continuously
    const lavaInterval = setInterval(() => {
      const particleTypes = ['bubble', 'ember', 'splash'];
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      const newParticle = {
        id: Date.now() + Math.random(),
        type,
        x: (Math.random() - 0.5) * 200, // -100 to 100
        size: type === 'bubble' ? Math.random() * 30 + 20 : 
              type === 'ember' ? Math.random() * 8 + 4 : 
              Math.random() * 40 + 30,
        delay: Math.random() * 0.5,
        duration: type === 'bubble' ? Math.random() * 2 + 2 :
                 type === 'ember' ? Math.random() * 3 + 2 :
                 Math.random() * 1.5 + 1,
      };

      setLavaParticles(prev => [...prev, newParticle]);

      setTimeout(() => {
        setLavaParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, (newParticle.duration + newParticle.delay) * 1000);
    }, 200); // Generate particle every 200ms

    return () => clearInterval(lavaInterval);
  }, [entered]);

  const handleEnter = () => {
    setEntered(true);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <AppContainer>
      <Stars>
        {stars.map(star => (
          <Star
            key={star.id}
            size={star.size}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
        {shootingStars.map(star => (
          <ShootingStar
            key={star.id}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: 300, y: 300, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ))}
      </Stars>

      {backgroundIcons.map(icon => {
        const IconComponent = 
          icon.icon === 'moon' ? FaMoon :
          icon.icon === 'galaxy' ? GiGalaxy :
          // icon.icon === 'meteor' ? GiMeteor :
          icon.icon === 'ringedPlanet' ? GiRingedPlanet :
          icon.icon === 'spaceship' ? GiSpaceship :
          icon.icon === 'atom' ? GiAtom :
          icon.icon === 'star' ? FaStar :
          icon.icon === 'sparkles' ? IoSparkles : FaGem;

        return (
          <BackgroundIcon
            key={icon.id}
            color={icon.color}
            size={icon.size}
            style={{ left: `${icon.x}%`, top: `${icon.y}%` }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(icon.id) * 30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: icon.duration,
              delay: icon.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <IconComponent />
          </BackgroundIcon>
        );
      })}

      <Nebula
        style={{ top: '10%', left: '20%', background: 'radial-gradient(circle, rgba(138,43,226,0.4) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <Nebula
        style={{ bottom: '15%', right: '25%', background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <audio ref={audioRef} loop>
        <source src="/Lava Chicken (MC Disk).mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence mode="wait">
        {!entered ? (
          <LandingPage
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <Title
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              PINATIC
            </Title>

            <ButtonWrapper>
              <PulseRing
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <PulseRing
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5,
                }}
              />
              <EnterButton
                onClick={handleEnter}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Enter Pinatic Realm
              </EnterButton>
            </ButtonWrapper>
          </LandingPage>
        ) : (
          <RealmPage
            key="realm"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <FloatingIcon
              color="#ff4500"
              style={{ top: '20%', left: '20%' }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaFire />
            </FloatingIcon>

            <FloatingIcon
              color="#00ffff"
              style={{ top: '30%', right: '15%' }}
              animate={{
                y: [0, 30, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaRocket />
            </FloatingIcon>

            <FloatingIcon
              color="#ffff00"
              style={{ bottom: '25%', left: '15%' }}
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IoSparkles />
            </FloatingIcon>

            <FloatingIcon
              color="#ff00ff"
              style={{ bottom: '20%', right: '20%' }}
              animate={{
                y: [0, -20, 0],
                x: [0, -20, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IoSparkles />
            </FloatingIcon>

            <LavaContainer>
              <LavaPool
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <FireRing
                style={{
                  width: '400px',
                  height: '400px',
                  top: '50%',
                  left: '50%',
                  marginTop: '-200px',
                  marginLeft: '-200px',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              <FireRing
                style={{
                  width: '350px',
                  height: '350px',
                  top: '50%',
                  left: '50%',
                  marginTop: '-175px',
                  marginLeft: '-175px',
                }}
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4],
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {lavaParticles.map(particle => {
                const ParticleComponent = 
                  particle.type === 'bubble' ? LavaBubble :
                  particle.type === 'ember' ? LavaEmber : LavaSplash;
                
                return (
                  <ParticleComponent
                    key={particle.id}
                    style={{
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      left: `calc(50% + ${particle.x}px)`,
                      bottom: particle.type === 'splash' ? '-30px' : '-50px',
                    }}
                    initial={{ 
                      y: 0,
                      x: 0,
                      opacity: particle.type === 'splash' ? 0.7 : 1,
                      scale: particle.type === 'splash' ? 0.5 : 1,
                    }}
                    animate={{
                      y: particle.type === 'bubble' ? -250 :
                         particle.type === 'ember' ? -350 :
                         -80,
                      x: particle.type === 'ember' ? (Math.random() - 0.5) * 80 : 0,
                      opacity: 0,
                      scale: particle.type === 'splash' ? 1.5 : 
                             particle.type === 'bubble' ? 0.7 : 0.3,
                    }}
                    transition={{
                      duration: particle.duration,
                      delay: particle.delay,
                      ease: particle.type === 'bubble' ? "easeOut" : "easeInOut",
                    }}
                  />
                );
              })}

              <LavaChicken
                animate={{
                  y: [0, -20, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <GiChicken />
              </LavaChicken>
            </LavaContainer>

            <WelcomeText
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Welcome to the Lava Chicken Realm
            </WelcomeText>

            <SubText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Where space meets fire and magic happens
            </SubText>

            <AudioControls
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <ControlButton
                onClick={toggleAudio}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? '⏸ Pause Music' : '▶ Play Music'}
              </ControlButton>
              <ControlButton
                onClick={restartAudio}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Restart
              </ControlButton>
            </AudioControls>
          </RealmPage>
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

export default App;
