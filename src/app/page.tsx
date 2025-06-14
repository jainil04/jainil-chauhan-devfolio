'use client';

import AnimatedHeadline from '@/components/AnimatedHeadline';
import Headline from '@/components/Headline';
import TypedHeadline from '@/components/TypedHeadline';
import Showcase from '@/components/Showcase';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import {
  isAnimatedHeadlineEnabled,
  isNewHeadline,
  isTypedHeadlineEnabled,
} from "../configs";

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.fade-in').forEach((el: any) => {
        gsap.from(el, {
          y: 50,
          autoAlpha: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="">
      <section id="home" className="min-h-screen flex justify-center items-center">
        <section className="fade-in flex justify-center">
          {isNewHeadline && <Headline />}
          {isTypedHeadlineEnabled && <TypedHeadline />}
          {isAnimatedHeadlineEnabled && <AnimatedHeadline />}
        </section>
      </section>
      <section id="showcase" className="min-h-screen flex justify-center items-center">
        <section className="fade-in flex justify-center">
          <Showcase />
        </section>
      </section>
      <section id="experience" className="min-h-screen flex justify-center items-center">
        <section className="fade-in flex justify-center">
          <Experience />
        </section>
      </section>
      <section id="contact" className="min-h-screen flex justify-center items-center">
        <section className="fade-in flex justify-center">
          <Contact />
        </section>
      </section>
    </main>
  );
}
