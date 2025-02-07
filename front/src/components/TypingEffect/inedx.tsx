import { useState, useEffect } from 'react';

interface TypingEffectProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  backSpeed?: number;
}

export function TypingEffect({
  words,
  className,
  typeSpeed = 100,
  backSpeed = 60,
}: TypingEffectProps) {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentWord: string = words[wordIndex];
    const currentLength: number = displayedText.length;

    let typingSpeed = isDeleting ? backSpeed : typeSpeed;

    if (!isDeleting && currentLength === currentWord.length) {
      typingSpeed = 1000;
      setTimeout(() => setIsDeleting(true), typingSpeed);
    } else if (isDeleting && currentLength === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1),
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex, words, typeSpeed, backSpeed]);

  return <span className={className}>{displayedText}|</span>;
}
