import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { showToast } from '../store/uiSlice';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(showToast({ message: 'Mesajınız başarıyla iletildi! Ekibimiz en kısa sürede dönüş yapacaktır.', type: 'success' }));
    reset();
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-12 animate-fade-in p-4 md:p-8">
      
      <div className="text-center flex flex-col gap-4 mb-4">
        <h1 className="text-4xl md:text-5xl font-black text-charcoal-deep">İletişime <span className="text-iris-periwinkle">Geç</span></h1>
        <p className="text-smoke-grey text-lg max-w-2xl mx-auto">Sorularınız, önerileriniz veya işbirlikleri için bizimle iletişime geçmekten çekinmeyin.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Contact Info (Sol Taraf) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-surface-white p-8 rounded-2xl border border-border-platinum shadow-sm flex flex-col gap-8 h-fit">
            <h3 className="text-2xl font-bold text-charcoal-deep mb-2">Bize Ulaşın</h3>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-iris-periwinkle/10 flex items-center justify-center text-iris-periwinkle shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-charcoal-deep">Adres</span>
                <span className="text-smoke-grey text-sm">Levent, Büyükdere Cd. No: 195,<br/>34394 Şişli/İstanbul, Türkiye</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-charcoal-deep">E-Posta</span>
                <span className="text-smoke-grey text-sm font-medium">hello@nexusnft.com</span>
                <span className="text-smoke-grey text-sm font-medium">support@nexusnft.com</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-charcoal-deep">Telefon</span>
                <span className="text-smoke-grey text-sm font-medium">+90 (212) 555 01 23</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* Form (Sağ Taraf) */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-white p-8 md:p-10 rounded-2xl border border-border-platinum shadow-sm flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group flex flex-col gap-2">
                <label className="form-label">Adınız Soyadınız</label>
                <input 
                  type="text" 
                  className={`form-input py-4 ${errors.fullName ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                  {...register('fullName', { required: 'Ad Soyad alanı zorunludur' })}
                />
                {errors.fullName && <span className="text-xs text-red-500 font-medium">⚠ {errors.fullName.message}</span>}
              </div>

              <div className="form-group flex flex-col gap-2">
                <label className="form-label">E-Posta Adresiniz</label>
                <input 
                  type="email" 
                  className={`form-input py-4 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="john@example.com"
                  {...register('email', { 
                    required: 'E-posta adresi zorunludur',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Geçerli bir e-posta adresi giriniz"
                    }
                  })}
                />
                {errors.email && <span className="text-xs text-red-500 font-medium">⚠ {errors.email.message}</span>}
              </div>
            </div>

            <div className="form-group flex flex-col gap-2">
              <label className="form-label">Konu</label>
              <input 
                type="text" 
                className={`form-input py-4 ${errors.subject ? 'border-red-500' : ''}`}
                placeholder="Nasıl yardımcı olabiliriz?"
                {...register('subject', { required: 'Konu zorunludur' })}
              />
              {errors.subject && <span className="text-xs text-red-500 font-medium">⚠ {errors.subject.message}</span>}
            </div>

            <div className="form-group flex flex-col gap-2">
              <label className="form-label">Mesajınız</label>
              <textarea 
                rows="5"
                className={`form-textarea h-40 py-4 ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Mesajınızı buraya yazın..."
                {...register('message', { required: 'Mesaj alanı zorunludur' })}
              ></textarea>
              {errors.message && <span className="text-xs text-red-500 font-medium">⚠ {errors.message.message}</span>}
            </div>

            <button type="submit" className="btn-primary w-full py-4 text-lg mt-2 group">
              <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
