import React from 'react';
import { Menu, Moon, Sun, User, Phone, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isDark, setIsDark] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Déconnexion réussie');
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la déconnexion");
    }
  };

  const authButton = user ? (
    <button 
      onClick={handleLogout}
      className="btn-primary flex items-center gap-2"
    >
      <LogOut size={20} />
      Déconnexion
    </button>
  ) : (
    <button 
      onClick={() => setIsAuthModalOpen(true)}
      className="btn-primary flex items-center gap-2"
    >
      <User size={20} />
      Connexion
    </button>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center py-2 border-b">
          <div className="flex items-center gap-8 text-sm">
            <a href="tel:+237674671243" className="flex items-center gap-2 text-gray-600 hover:text-[--primary]">
              <Phone size={16} />
              +237 674 67 12 43
            </a>
            <span className="text-gray-600">Lun - Sam: 6h00 - 18h00</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded-lg hover:bg-gray-100"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => scrollToSection('hero')} className="text-2xl font-bold text-[--primary]">
              General Express
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-gray-700 hover:text-[--primary]">Accueil</button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-[--primary]">Nos Services</button>
            <button onClick={() => scrollToSection('agencies')} className="text-gray-700 hover:text-[--primary]">Nos Agences</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-[--primary]">Contact</button>
            {authButton}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button onClick={() => scrollToSection('hero')} className="block w-full text-left text-gray-700 hover:text-[--primary] py-2">Accueil</button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left text-gray-700 hover:text-[--primary] py-2">Nos Services</button>
            <button onClick={() => scrollToSection('agencies')} className="block w-full text-left text-gray-700 hover:text-[--primary] py-2">Nos Agences</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-700 hover:text-[--primary] py-2">Contact</button>
            <div className="flex items-center justify-between py-2">
              <a href="tel:+237674671243" className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                +237 674 67 12 43
              </a>
              {authButton}
            </div>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </nav>
  );
}