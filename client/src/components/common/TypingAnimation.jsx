import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function TypingAnimation({ text, className = '', names = null, nameClassName = '' }) {
  const [displayedName, setDisplayedName] = useState('');
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [nameCharIndex, setNameCharIndex] = useState(0);
  const [showName, setShowName] = useState(false);

  const currentName = names && names.length > 0 ? names[currentNameIndex] : '';

  useEffect(() => {
    const textLength = text.length;
    let timeout;

    if (!showName) {
      timeout = setTimeout(() => {
        setShowName(true);
      }, textLength * 50);
    } else if (!isDeleting && nameCharIndex < currentName.length) {
      timeout = setTimeout(() => {
        setDisplayedName((prev) => prev + currentName[nameCharIndex]);
        setNameCharIndex((prev) => prev + 1);
      }, 50);
    } else if (!isDeleting && nameCharIndex === currentName.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && nameCharIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedName((prev) => prev.slice(0, -1));
        setNameCharIndex((prev) => prev - 1);
      }, 30);
    } else if (isDeleting && nameCharIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentNameIndex((prev) => (prev + 1) % names.length);
        setShowName(false);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [nameCharIndex, isDeleting, currentName, text, showName, names]);

  return (
    <>
      <span className={className}>{text}</span>
      {showName && (
        <span className={nameClassName}>
          {' '}
          {displayedName}
          {nameCharIndex < currentName.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-1 inline-block w-1 h-8 bg-current"
            />
          )}
        </span>
      )}
    </>
  );
}
