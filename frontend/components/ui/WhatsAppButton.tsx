'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '+256704141823';
  const whatsappMessage = encodeURIComponent('Hi VAN SOUND EVENTS, I\'d like to discuss an event project.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        // Offsets upward when the ConceptBanner reminder card is visible
        // (its height is published as `--concept-stack`).
        style={{ bottom: 'calc(1.5rem + var(--concept-stack, 0px))' }}
        className="fixed right-6 z-50 transition-[bottom] duration-500 ease-out"
      >
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-all duration-300"
          >
            <MessageCircle size={28} className="text-white" />
          </motion.div>
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-surface text-foreground px-4 py-2 rounded-lg font-label text-xs tracking-wider whitespace-nowrap shadow-lg pointer-events-none"
          >
            Chat with us
          </motion.div>
        </Link>
      </motion.div>
    </>
  );
}
