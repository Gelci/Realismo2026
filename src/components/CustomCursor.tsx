import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useMousePosition } from '../hooks/useMousePosition';

export const CustomCursor = () => {
    const { x, y } = useMousePosition();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mouseover', handleMouseOver);
        return () => window.removeEventListener('mouseover', handleMouseOver);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 border-2 border-graphite rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference"
            animate={{
                x: x - 12,
                y: y - 12,
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'transparent',
                borderColor: isHovering ? 'transparent' : 'white'
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
        />
    );
};
