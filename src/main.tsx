import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import WhatsAppSticky from "@/components/WhatsAppSticky";
// ...in your layout or root component JSX:
<WhatsAppSticky />
createRoot(document.getElementById("root")!).render(<App />);
