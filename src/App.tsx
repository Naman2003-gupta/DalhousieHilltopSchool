// File: src/App.tsx
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";

// ==================== ICONS ====================
const HomeIcon = () => <span>🏠</span>;
const InfoIcon = () => <span>ℹ️</span>;
const BookIcon = () => <span>📚</span>;
const BuildingIcon = () => <span>🏛️</span>;
const UsersIcon = () => <span>👥</span>;
const PhoneIcon = () => <span>📞</span>;
const ImageIcon = () => <span>🖼️</span>;
const AwardIcon = () => <span>🏆</span>;
const CalendarIcon = () => <span>📅</span>;
const MapPinIcon = () => <span>📍</span>;
const MailIcon = () => <span>✉️</span>;
const ArrowRightIcon = () => <span>→</span>;
const StarIcon = () => <span>⭐</span>;
const CheckIcon = () => <span>✓</span>;
const MountainIcon = () => <span>⛰️</span>;
const GraduationIcon = () => <span>🎓</span>;
const TargetIcon = () => <span>🎯</span>;
const HeartIcon = () => <span>❤️</span>;
const ShieldIcon = () => <span>🛡️</span>;
const ZapIcon = () => <span>⚡</span>;
const GlobeIcon = () => <span>🌍</span>;
const SunIcon = () => <span>☀️</span>;
const MoonIcon = () => <span>🌙</span>;
const CloudIcon = () => <span>☁️</span>;
const TreeIcon = () => <span>🌲</span>;
const SnowflakeIcon = () => <span>❄️</span>;
const VideoIcon = () => <span>🎥</span>;
const ChatIcon = () => <span>💬</span>;
const WhatsappIcon = () => <span>💚</span>;
const ThemeIcon = () => <span>🎨</span>;

// ==================== ANIMATION COMPONENTS ====================
const AnimatedCounter = ({ end, suffix = "+", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return <span>{count}{suffix}</span>;
};

// Particle Snow Effect
const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; animationDuration: number }>>([]);
  
  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 5 + Math.random() * 10,
    }));
    setSnowflakes(flakes);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white/20 text-xl"
          style={{
            left: `${flake.left}%`,
            top: '-20px',
            animation: `fall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

// Day/Night Cycle
const DayNightCycle = () => {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  
  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 18 || hour <= 6 ? 'night' : 'day');
  }, []);
  
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 transition-all duration-3000 ${
      timeOfDay === 'night' ? 'bg-gradient-to-b from-gray-900/20 to-blue-900/10' : 'bg-gradient-to-b from-blue-400/10 to-orange-200/10'
    }`}>
      {timeOfDay === 'day' && (
        <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
      )}
      {timeOfDay === 'night' && (
        <div className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse" />
      )}
    </div>
  );
};

// Flying Birds
const FlyingBirds = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-gray-600/10 text-2xl"
          style={{
            left: `${i * 30}%`,
            top: `${15 + i * 10}%`,
            animation: `fly ${20 + i * 5}s linear infinite`,
            animationDelay: `${i * 3}s`,
          }}
        >
          🕊️
        </div>
      ))}
    </div>
  );
};

// Typewriter Effect Component
const TypewriterText = ({ text, speed, className }: { text: string, speed: number, className: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);
  
  return <span className={className}>{displayText}</span>;
};

// Floating Input Component
const FloatingInput = ({ label, type, required }: { label: string, type: string, required?: boolean }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 outline-none peer"
        required={required}
      />
      <label className={`absolute left-4 transition-all duration-200 ${
        focused || value 
          ? '-top-2 text-xs bg-white dark:bg-gray-800 px-2 text-green-500' 
          : 'top-3 text-gray-500'
      }`}>
        {label}
      </label>
    </div>
  );
};

// Floating TextArea Component
const FloatingTextArea = ({ label, rows, required }: { label: string, rows: number, required?: boolean }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 outline-none peer resize-none"
        required={required}
      />
      <label className={`absolute left-4 transition-all duration-200 ${
        focused || value 
          ? '-top-2 text-xs bg-white dark:bg-gray-800 px-2 text-green-500' 
          : 'top-3 text-gray-500'
      }`}>
        {label}
      </label>
    </div>
  );
};

// ==================== PAGE COMPONENTS ====================
const HomePage = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [weather, setWeather] = useState({ temp: '8°C', condition: 'Partly Cloudy' });
  
  const testimonials = [
    { id: 1, name: "Rahul Sharma", text: "Best school in Himalayas!", year: "2023" },
    { id: 2, name: "Priya Singh", text: "Life-changing experience", year: "2022" },
    { id: 3, name: "Amit Patel", text: "Excellent faculty & facilities", year: "2021" },
  ];
  
  const FACILITIES = [
    { id: 1, title: 'Smart Classrooms', description: 'Digitally equipped classrooms', icon: <ZapIcon />, progress: 95 },
    { id: 2, title: 'Science Labs', description: 'Modern labs for all sciences', icon: <BookIcon />, progress: 90 },
    { id: 3, title: 'Library', description: 'Extensive book collection', icon: <BookIcon />, progress: 85 },
    { id: 4, title: 'Sports Complex', description: 'Indoor & outdoor facilities', icon: <TargetIcon />, progress: 88 },
    { id: 5, title: 'Hostel', description: 'Modern residential facilities', icon: <BuildingIcon />, progress: 92 },
    { id: 6, title: 'Cafeteria', description: 'Hygienic dining area', icon: <HeartIcon />, progress: 87 },
  ];

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    // Set weather
    const hours = new Date().getHours();
    const temp = hours >= 6 && hours <= 18 ? '12°C' : '5°C';
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Clear'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    setWeather({ temp, condition });
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        <DayNightCycle />
        <SnowEffect />
        <FlyingBirds />
        
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-green-50/20 to-blue-50/10 dark:from-gray-900/20 dark:via-gray-800/20 dark:to-blue-900/10" />
        
        <div className="container mx-auto text-center relative z-10">
          {/* Animated School Seal */}
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-green-500 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl">⛰️</span>
                  <div className="text-xs font-bold">DHPS</div>
                  <div className="text-[8px] text-gray-500">1979</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-green-100 dark:from-orange-900/30 dark:to-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold mb-6 animate-pulse">
            <span>🏆</span> Excellence in Education Since 1979
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
              Dalhousie Hilltop School
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
            Inspiring Minds, Instilling Values in the Heart of Himalayas
          </p>
          
          {/* Weather Display */}
          <div className="mb-8 inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <span>☁️</span>
              <div>
                <div className="font-bold">{weather.temp}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{weather.condition}</div>
              </div>
              <div className="text-xs text-gray-500">Dalhousie</div>
            </div>
          </div>
          
          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95">
              Start Your Journey <span>→</span>
            </button>
            <button className="px-8 py-3 rounded-full border-2 border-green-500 text-green-600 dark:text-green-400 font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors transform hover:scale-105 active:scale-95">
              <span className="inline mr-2">🎥</span> Virtual Campus Tour
            </button>
          </div>
          
          {/* Live Counter */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg mb-12">
            <span>👥</span>
            <span className="font-bold">Currently on campus: </span>
            <AnimatedCounter end={356} suffix="" />
            <span className="text-sm text-gray-500">students</span>
          </div>
          
          {/* Testimonials Carousel */}
          <div className="max-w-2xl mx-auto mb-16">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">What Our Students Say</h3>
            <div className="relative overflow-hidden h-32">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === testimonialIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <p className="text-gray-600 dark:text-gray-300 italic mb-3">"{testimonial.text}"</p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{testimonial.name}</span>
                      <span className="text-sm text-gray-500">Class of {testimonial.year}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === testimonialIndex ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Years of Excellence', value: 45 },
              { label: 'Students', value: 2000 },
              { label: 'Faculty Members', value: 150 },
              { label: 'Awards', value: 50 },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.value} />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-6">
                <TypewriterText 
                  text="Shaping Future Leaders Since 1979"
                  speed={50}
                  className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent"
                />
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Nestled in the majestic Himalayas at 7600 feet, Dalhousie Hilltop School is a premier residential 
                institution dedicated to holistic education. Founded by Shri Inder Mohan Dhawan, our school combines 
                academic excellence with character building.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'CBSE Affiliated Curriculum',
                  'Co-educational Residential School',
                  'State-of-the-art Infrastructure',
                  'Global Exchange Programs',
                  'Focus on Sports & Arts',
                  'Technology-Integrated Learning'
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 transform hover:translate-x-2"
                  >
                    <span>✓</span> {feature}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <span>🎓</span>, title: 'Academic Excellence', desc: '100% Board Results', color: 'from-orange-50 to-green-50 dark:from-orange-900/20 dark:to-green-900/20' },
                { icon: <span>🎯</span>, title: 'Holistic Development', desc: 'Sports & Arts Focus', color: 'from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20' },
                { icon: <span>🌍</span>, title: 'Global Exposure', desc: 'International Programs', color: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' },
                { icon: <span>🛡️</span>, title: 'Safe Environment', desc: '24/7 Security', color: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                State-of-the-Art Facilities
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience learning in an environment equipped with modern amenities and technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACILITIES.map((facility) => (
              <div 
                key={facility.id} 
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-3xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">{facility.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{facility.description}</p>
                
                {/* Animated Progress Bar */}
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-400">
                        Quality Score
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-400">
                        {facility.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100 dark:bg-green-900/30">
                    <div
                      style={{ width: `${facility.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-400 to-green-600 animate-progress"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Reach out to us for admissions, inquiries, or to schedule a campus visit
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <form className="space-y-6">
              <FloatingInput label="Your Name" type="text" required />
              <FloatingInput label="Your Email" type="email" required />
              <FloatingInput label="Phone Number" type="tel" />
              <FloatingTextArea label="Your Message" rows={4} required />
              
              <button
                type="submit"
                className="w-full px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 ripple"
              >
                Send Message <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

const AboutPage = () => (
  <div className="pt-32 pb-20 px-4 min-h-screen">
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
        <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
          About Our School
        </span>
      </h1>
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-slide-up">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Our History & Legacy</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Dalhousie Hilltop School was established in 1979 by Shri Inder Mohan Dhawan, who dedicated 
          his entire retired life to children and the cause of education. His vision was to create a 
          society of progressive, thinking individuals who will contribute to the intellectual 
          development of the global community.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gradient-to-br from-orange-50 to-green-50 dark:from-orange-900/20 dark:to-green-900/20 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To create a society of progressive, thinking individuals who will contribute to the 
              intellectual development of the global community.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To provide holistic education that nurtures academic excellence, character building, 
              and global citizenship in a serene Himalayan environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AcademicsPage = () => (
  <div className="pt-32 pb-20 px-4 min-h-screen">
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
        <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Academics
        </span>
      </h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-slide-up">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Academic Programs</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">We offer a comprehensive CBSE-affiliated curriculum from grades 1 to 12.</p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">Primary School (I-V)</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Foundation building with activity-based learning</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">Middle School (VI-VIII)</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Subject specialization begins with lab exposure</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FacilitiesPage = () => (
  <div className="pt-32 pb-20 px-4 min-h-screen">
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Facilities
        </span>
      </h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-slide-up">
        <p className="text-gray-600 dark:text-gray-300">Our campus features state-of-the-art facilities designed for holistic development.</p>
      </div>
    </div>
  </div>
);

const AdmissionPage = () => (
  <div className="pt-32 pb-20 px-4 min-h-screen">
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Admissions
        </span>
      </h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-slide-up">
        <p className="text-gray-600 dark:text-gray-300">Admission process details coming soon...</p>
      </div>
    </div>
  </div>
);

const GalleryPage = () => (
  <div className="pt-32 pb-20 px-4 min-h-screen">
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Gallery
        </span>
      </h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-slide-up">
        <p className="text-gray-600 dark:text-gray-300">Gallery images coming soon...</p>
      </div>
    </div>
  </div>
);

const NewsPage = () => (
  <div className="pt-32 pb-20 px-4 min-h-screen">
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          News & Events
        </span>
      </h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-slide-up">
        <p className="text-gray-600 dark:text-gray-300">News and events coming soon...</p>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-32 pb-20 px-4 min-h-screen">
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Contact Us
        </span>
      </h1>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-slide-up">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">📍</span>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Address</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upper Bakrota, Dalhousie<br />
                Himachal Pradesh - 176304<br />
                India
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-2xl">📞</span>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Contact Numbers</h3>
              <p className="text-gray-600 dark:text-gray-300">+91 98054-40004</p>
              <p className="text-gray-600 dark:text-gray-300">+91 94189-96677</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-2xl">✉️</span>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">dalhousiehilltopschool@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ==================== MAIN APP COMPONENT ====================
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Nav items
  const NAV_ITEMS = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'About', path: '/about', icon: <InfoIcon /> },
    { name: 'Academics', path: '/academics', icon: <BookIcon /> },
    { name: 'Facilities', path: '/facilities', icon: <BuildingIcon /> },
    { name: 'Admissions', path: '/admissions', icon: <UsersIcon /> },
    { name: 'Gallery', path: '/gallery', icon: <ImageIcon /> },
    { name: 'News', path: '/news', icon: <CalendarIcon /> },
    { name: 'Contact', path: '/contact', icon: <PhoneIcon /> },
  ];

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading animation
  useEffect(() => {
    if (isLoading) {
      setProgress(10);
      progressTimer.current = setInterval(() => {
        setProgress(p => {
          if (p >= 95) {
            clearInterval(progressTimer.current!);
            setTimeout(() => setIsLoading(false), 300);
            return 100;
          }
          return p + Math.random() * 10;
        });
      }, 200);
    }
    
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [isLoading]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Dismiss loader
  const dismissLoader = () => {
    setIsLoading(false);
    setProgress(100);
    if (progressTimer.current) clearInterval(progressTimer.current);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Router>
        {/* Loading Overlay */}
        {isLoading && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 to-emerald-900"
            onClick={dismissLoader}
          >
            <div className="text-center">
              <div className="text-5xl mb-6 animate-bounce">⛰️</div>
              <h1 className="text-3xl font-bold text-white mb-4 animate-pulse">Dalhousie Hilltop School</h1>
              <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-green-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-white/70 mt-4">Loading... Click to skip</p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-40">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-1 z-30">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` }}
          />
        </div>

        {/* Navbar */}
        <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-3' : 'bg-white/80 dark:bg-gray-900/80 py-4'
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center animate-gradient">
                  <MountainIcon />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800 dark:text-white">Dalhousie Hilltop School</h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Since 1979</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 transition-colors duration-300 hover:text-green-600 dark:hover:text-green-400 ${
                        isActive ? 'text-green-600 dark:text-green-400 font-semibold scale-105' : 'text-gray-700 dark:text-gray-300'
                      }`
                    }
                  >
                    <span className="hover:scale-110 transition-transform">{item.icon}</span> {item.name}
                  </NavLink>
                ))}
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-green-500 text-white hover:scale-110 transition-transform"
                >
                  {darkMode ? <SunIcon /> : <MoonIcon />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gradient-to-r from-orange-500 to-green-500 text-white hover:scale-110 transition-transform"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden pt-4 pb-6 animate-slide-down">
                <div className="space-y-3">
                  {NAV_ITEMS.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block p-3 rounded-lg transition-all duration-300 ${
                          isActive ? 'bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-900/30 dark:to-green-900/30 text-green-600 dark:text-green-400' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="hover:scale-110 transition-transform">{item.icon}</span> {item.name}
                      </div>
                    </NavLink>
                  ))}
                  <button
                    onClick={() => {
                      setDarkMode(!darkMode);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full p-3 rounded-lg bg-gradient-to-r from-orange-500 to-green-500 text-white text-center hover:scale-105 transition-transform"
                  >
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Quick Action Floating Buttons */}
        <div className="fixed right-4 bottom-24 z-20 flex flex-col gap-4">
          <a 
            href="https://wa.me/919805440004" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce"
            title="WhatsApp Us"
          >
            <WhatsappIcon />
          </a>
          
          <a 
            href="tel:+919805440004" 
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300"
            title="Call Us"
          >
            <PhoneIcon />
          </a>
          
          <a 
            href="mailto:dalhousiehilltopschool@gmail.com" 
            className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300"
            title="Email Us"
          >
            <MailIcon />
          </a>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed right-4 bottom-4 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-green-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce"
            title="Back to Top"
          >
            ↑
          </button>
        )}

        {/* Main Content */}
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/admissions" element={<AdmissionPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-12 pb-8 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center animate-gradient">
                    <MountainIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Dalhousie Hilltop School</h3>
                    <p className="text-sm text-gray-400">Since 1979</p>
                  </div>
                </div>
                <p className="text-gray-400">
                  Inspiring minds and instilling values in the majestic Himalayas.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block text-gray-400 hover:text-white transition-colors hover:translate-x-2 duration-300"
                    >
                      → {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4">Contact Info</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPinIcon /> Upper Bakrota, Dalhousie
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <PhoneIcon /> +91 98054-40004
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MailIcon /> dalhousiehilltopschool@gmail.com
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center text-gray-400">
              <p>© {new Date().getFullYear()} Dalhousie Hilltop School. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;