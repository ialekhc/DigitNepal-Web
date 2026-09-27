import { type Transition, type Variants } from 'framer-motion';

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
export const MOTION_DURATION = 0.6;

export const motionTransition: Transition = {
  duration: MOTION_DURATION,
  ease: MOTION_EASE,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: motionTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: motionTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const scaleOnHover: Variants = {
  rest: { scale: 1, transition: { duration: 0.24, ease: MOTION_EASE } },
  hover: { scale: 1.03, transition: { duration: 0.24, ease: MOTION_EASE } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: motionTransition },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: motionTransition },
};

export const navbarBlur: Variants = {
  top: {
    backdropFilter: 'blur(0px)',
    backgroundColor: 'rgba(5, 8, 22, 0.12)',
    borderColor: 'rgba(255,255,255,0.08)',
  },
  scrolled: {
    backdropFilter: 'blur(18px)',
    backgroundColor: 'rgba(5, 8, 22, 0.82)',
    borderColor: 'rgba(255,255,255,0.14)',
    transition: { duration: 0.3, ease: MOTION_EASE },
  },
};

export const mobileMenuSlide: Variants = {
  closed: {
    x: '105%',
    opacity: 0,
    transition: { duration: 0.26, ease: MOTION_EASE },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.32, ease: MOTION_EASE },
  },
};

export const cardHover: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 0 0 rgba(255, 45, 111, 0)',
    transition: { duration: 0.22, ease: MOTION_EASE },
  },
  hover: {
    y: -6,
    scale: 1.01,
    boxShadow: '0 16px 42px rgba(255, 45, 111, 0.2)',
    transition: { duration: 0.24, ease: MOTION_EASE },
  },
};

export const buttonHoverGlow: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 0 0 rgba(255, 45, 111, 0)',
    transition: { duration: 0.22, ease: MOTION_EASE },
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 14px 30px rgba(255, 45, 111, 0.3)',
    transition: { duration: 0.24, ease: MOTION_EASE },
  },
};
