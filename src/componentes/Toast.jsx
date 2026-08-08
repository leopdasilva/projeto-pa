import { useEffect } from "react";
import "./Toast.css";

function Toast({ message, visible, onClose }) {
  // Mostra uma mensagem temporária para feedback de ação do usuário.
  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(() => {
      onClose();
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible || !message) return null;

  return (
    <div className="toast-wrapper">
      <div className="toast">
        <span className="toast-icon">✓</span>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
