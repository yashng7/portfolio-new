"use client"
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <section className="flex items-center w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48">
      <SparklesCore
        className="absolute inset-0 w-full h-full -z-10"
        background="transparent"
        particleColor="#8642e3"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
      />
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-3xl font-bold leading-tight  md:text-5xl lg:text-6xl lg:leading-[1.1]">
                  A Full Stack Web Developer Who{" "}
                  <span className="text-transparent bg-clip-text animate-text bg-gradient-to-r from-rose-300 to-rose-500">
                    Loves
                  </span>{" "}
                  to Learn and Explore New{" "}
                  <span className="text-transparent animate-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text">
                    Technologies
                  </span>
                  .
                </h1>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
