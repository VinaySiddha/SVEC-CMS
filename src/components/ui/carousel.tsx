import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
}

interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

interface CarouselPrevProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
interface CarouselNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CarouselContext = React.createContext<{
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  registerItem: () => number;
} | null>(null);

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ children, className = "", ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [totalItems, setTotalItems] = React.useState(0);

    const registerItem = React.useCallback(() => {
      setTotalItems((prev) => prev + 1);
      return totalItems;
    }, [totalItems]);

    const value = React.useMemo(
      () => ({ currentIndex, setCurrentIndex, totalItems, registerItem }),
      [currentIndex, totalItems, registerItem]
    );

    return (
      <CarouselContext.Provider value={value}>
        <div
          ref={ref}
          className={`relative w-full overflow-hidden ${className}`}
          {...props}
        >
          <div className="flex transition-transform duration-300 ease-in-out" 
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {children}
          </div>
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`flex w-full ${className}`} {...props} />
  )
);
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className = "", children, ...props }, ref) => {
    const context = React.useContext(CarouselContext);
    const itemIndex = React.useRef<number | null>(null);

    React.useEffect(() => {
      if (context) {
        itemIndex.current = context.registerItem();
      }
    }, [context]);

    return (
      <div
        ref={ref}
        className={`min-w-full shrink-0 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CarouselItem.displayName = "CarouselItem";

export const CarouselPrev = React.forwardRef<HTMLButtonElement, CarouselPrevProps>(
  ({ className = "", ...props }, ref) => {
    const context = React.useContext(CarouselContext);

    if (!context) {
      throw new Error("CarouselPrev must be used within a Carousel");
    }

    const { currentIndex, setCurrentIndex, totalItems } = context;

    const handlePrev = () => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
    };

    return (
      <button
        ref={ref}
        className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md hover:bg-background/90 ${className}`}
        onClick={handlePrev}
        {...props}
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Previous slide</span>
      </button>
    );
  }
);
CarouselPrev.displayName = "CarouselPrev";

export const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className = "", ...props }, ref) => {
    const context = React.useContext(CarouselContext);

    if (!context) {
      throw new Error("CarouselNext must be used within a Carousel");
    }

    const { currentIndex, setCurrentIndex, totalItems } = context;

    const handleNext = () => {
      setCurrentIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    };

    return (
      <button
        ref={ref}
        className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md hover:bg-background/90 ${className}`}
        onClick={handleNext}
        {...props}
      >
        <ArrowRight className="h-5 w-5" />
        <span className="sr-only">Next slide</span>
      </button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

export const CarouselDots = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    const context = React.useContext(CarouselContext);

    if (!context) {
      throw new Error("CarouselDots must be used within a Carousel");
    }

    const { currentIndex, setCurrentIndex, totalItems } = context;

    return (
      <div
        ref={ref}
        className={`flex justify-center gap-1 mt-2 ${className}`}
        {...props}
      >
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    );
  }
);
CarouselDots.displayName = "CarouselDots";
