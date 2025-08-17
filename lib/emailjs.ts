import emailjs from '@emailjs/browser';

// EmailJS configuration
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

// Initialize EmailJS
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.publicKey) {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }
};

// Send email using EmailJS
export const sendEmail = async (formData: { name: string; email: string; message: string }) => {
  if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
    throw new Error('EmailJS configuration is incomplete');
  }

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_name: 'Farhan Ahmed', // Your name
  };

  return emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    templateParams,
    EMAILJS_CONFIG.publicKey
  );
};
