import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { login } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.email === "admin@gmail.com" && data.password === "123456") {
      login(data.email, data.password);
      reset();
      onClose();
    } else {
      setError("root.serverError", {
        type: "custom",
        message: "eposta veya sifre hatalı",
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="drawer-close" onClick={handleClose}>
            &times;
          </span>
          <h2 className="form-title">Giris yap</h2>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="form-group">
              <label className="form-label">E-posta</label>
              <input
                className="form-input"
                type="email"
                placeholder="ferhat@yilmaz.com"
                {...register("email", {
                  required: "Eposta Zorunludur",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Geçerli e-posta adresi",
                  },
                })}
              />
              {errors.email &&(
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Sifre</label>
              <input
                className="form-input"
                placeholder="*******"
                type="password"
                {...register('password',{
                    required:'Sifre Zorunludur',
                    minLength:{
                        value:6,
                        message:'Sifre en az 6 karakter olmalıdır',
                    }
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.passsword.message}</span>
              )}
            </div>
            <button type="submit" className="form-submit">
              Giris yap
            </button>
            {errors.root?.serverError && (
                <span className="form-error mt-3">{errors.root.serverError.message}</span>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
