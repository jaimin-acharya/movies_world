import { useState, useEffect } from "react";
import { ArrowBigUp } from "lucide-react";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener with throttling
  useEffect(() => {
    const throttledToggleVisibility = () => {
      let timeoutId;
      return () => {
        if (!timeoutId) {
          timeoutId = setTimeout(() => {
            toggleVisibility();
            timeoutId = null;
          }, 100);
        }
      };
    };

    const throttled = throttledToggleVisibility();
    window.addEventListener("scroll", throttled);

    // Initial check
    toggleVisibility();

    return () => window.removeEventListener("scroll", throttled);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 md:bottom-8 md:right-8 
                     w-12 h-12 md:w-[50px] md:h-[50px]
                     bg-white/10 backdrop-blur-md border-b hover:bg-transparent
                     text-white hover:text-[#ac8bffe8]
                     border-2 border-[#ac8bffe8]
                     rounded-full cursor-pointer
                     flex items-center justify-center
                     text-xl md:text-2xl
                     shadow-lg hover:shadow-xl
                     transition-all duration-300 ease-in-out
                     hover:-translate-y-1 hover:scale-101 active:scale-95
                     z-[9999] p-0 outline-none
                
                     opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]"
        >
          <ArrowBigUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};
