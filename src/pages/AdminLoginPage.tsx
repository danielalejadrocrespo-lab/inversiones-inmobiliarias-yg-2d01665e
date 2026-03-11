import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';

export default function AdminLoginPage() {
  const { isAdmin, loading, loginWithPin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!loading && isAdmin) {
      navigate('/admin', { replace: true });
      return;
    }
    // Only allow access with ?access=admin parameter, otherwise redirect to home
    if (!loading && !isAdmin && searchParams.get('access') !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [loading, isAdmin, navigate, searchParams]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError('');

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 4 digits entered
    if (value && index === 3) {
      const fullPin = newPin.join('');
      if (fullPin.length === 4) {
        const success = loginWithPin(fullPin);
        if (!success) {
          setError('PIN incorrecto');
          setPin(['', '', '', '']);
          setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasted.length === 4) {
      const newPin = pasted.split('');
      setPin(newPin);
      const success = loginWithPin(pasted);
      if (!success) {
        setError('PIN incorrecto');
        setPin(['', '', '', '']);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background">Cargando...</div>;

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl font-bold">Inversiones Inmobiliaria YG</span>
          </div>
          <CardTitle className="font-heading text-lg">Ingresa tu PIN</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-3 mb-4" onPaste={handlePaste}>
            {pin.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-14 h-14 text-center text-2xl font-bold rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              />
            ))}
          </div>
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
          <p className="text-muted-foreground text-xs text-center mt-3">Ingresa el PIN de 4 dígitos para acceder</p>
        </CardContent>
      </Card>
    </div>
  );
}
