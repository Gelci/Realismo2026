import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

interface TextRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export const TextReveal = ({ children, delay = 0, className = "" }: TextRevealProps) => {
    return (
        <div className={cn("overflow-hidden", className)}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
                viewport={{ once: true }}
            >
                {children}
            </motion.div>
        </div>
    );
};
