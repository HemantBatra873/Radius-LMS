"use client";
import CourseHeader from "./course/[courseId]/_components/CourseHeader";
import { BookOpen, CheckCircle, Globe, Users } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <CourseHeader />
      <div className="container mx-auto px-6 py-16 flex flex-col items-center text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Elevate Your Learning with{" "}
            <span className="text-blue-600">Radius</span>
          </h1>
          <p className="text-lg text-zinc-300 mb-6">
            A cutting-edge Learning Management System powered by AI designed to
            make knowledge accessible, engaging, and effective.
          </p>
          <Link
            href={"/dashboard"}
            className="bg-blue-600 hover:bg-blue-500 text-primary  px-6 py-3 font-semibold text-lg rounded-lg shadow-lg"
          >
            Get Started
          </Link>
        </motion.div>

        {/* Feature Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          <FeatureCard
            icon={BookOpen}
            title="Comprehensive Courses"
            description="Create courses using AI specific to your needs."
          />
          <FeatureCard
            icon={Users}
            title="Interactive Study Tools"
            description="Learn using notes, flashcards, quizes and QnA's."
          />
          <FeatureCard
            icon={Globe}
            title="Global Accessibility"
            description="Learn from anywhere, anytime, with seamless cross-platform support."
          />
          <FeatureCard
            icon={CheckCircle}
            title="Smart Learning"
            description=" Achieve better learning outcomes with our AI-powered LMS."
          />
        </motion.div>

        {/* footer */}
        <div className="flex items-center justify-between w-full px-9 md:px-20 lg:px-24 md:mt-20">
          {"RADIUS".split("").map((letter, index) => (
            <span
              key={index}
              className="text-[60px] font-bold md:text-[100px] lg:text-[130px]"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className=" p-6 rounded-xl shadow-md flex flex-col items-center text-center ">
      <Icon className="text-blue-600 w-12 h-12 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-300">{description}</p>
    </div>
  );
};
