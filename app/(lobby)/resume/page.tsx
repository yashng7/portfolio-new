"use client";

import { Download, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shell } from "@/components/shells/shell";
import Link from "next/link";

export default function ResumePage() {
  const handleDownload = () => {
    // Replace with your actual PDF URL
    const pdfUrl = "/resume.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Yashwant_Gawande_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Shell className="md:pb-10">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container max-w-4xl px-4 py-8 mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100">
              My Resume
            </h1>
            <p className="mb-6 text-lg text-slate-600 dark:text-slate-400">
              Software Engineer & Full Stack Developer
            </p>
            <Button onClick={handleDownload} size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Download PDF Resume
            </Button>
          </div>

          {/* Resume Content */}
          <div className="grid gap-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                    YG
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Yashwant Gawande</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Software Engineer
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span>contact@yashwantgawande.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Phone className="w-4 h-4" />
                    <span>7517486496</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>Goa, India</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Globe className="w-4 h-4" />
                    <span>yashwantgawande.com</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                  >
                    <Link href="https://www.linkedin.com/in/yashwant-gawande-01012b271/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                  >
                    <Link href="https://github.com/yashng7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      Github
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                  Software engineer skilled in full-stack development with
                  React, Next.js, Node.js, and PostgreSQL. Strong collaborator
                  and fast learner, dedicated to building scalable, maintainable
                  solutions that drive results.
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React.js",
                        "Next.js",
                        "Redux",
                        "TypeScript",
                        "JavaScript",
                        "CSS",
                        "Web Components",
                        "Shadow DOM",
                      ].map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Backend</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Node.js",
                        "Express.js",
                        "Python",
                        "Django",
                        "RESTful APIs",
                        "Authentication",
                      ].map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Database</h4>
                    <div className="flex flex-wrap gap-2">
                      {["PostgreSQL", "MySQL", "MongoDB"].map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Cloud & DevOps</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "AWS (EC2, S3, Lambda)",
                        "Docker",
                        "Service Workers",
                        "Third-party Integrations",
                      ].map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Tools & Workflow</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Git",
                        "GitHub",
                        "Jest",
                        "Webpack",
                        "CI/CD",
                        "Agile/Scrum",
                      ].map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Other</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Data Structures & Algorithms",
                        "Linux (Ubuntu)",
                        "Monitoring & Logging (ELK, Kibana)",
                        "TDD",
                        "Clean Code",
                      ].map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Software Engineer Internship
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        Electronic Arts | Remote
                      </p>
                    </div>
                    <span className="text-sm text-slate-500">June 2025</span>
                  </div>
                  <ul className="ml-4 space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                    <li>
                      Proposed a new gameplay feature for EA Sports College
                      Football, supported by a detailed feature proposal
                      communicated to stakeholders
                    </li>
                    <li>
                      Designed a class diagram and developed modular C++ header
                      files, defining 100% of the required game object classes
                      to support new functionality
                    </li>
                    <li>
                      Diagnosed and patched a key inventory bug; optimized core
                      logic by replacing fixed-size arrays with dynamic data
                      structures, improving code maintainability and scalability
                      by 40%
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Robotics & Controls Engineering Intern (Job Simulation)
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        Johnson & Johnson | Remote
                      </p>
                    </div>
                    <span className="text-sm text-slate-500">June 2025</span>
                  </div>
                  <ul className="ml-4 space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                    <li>
                      Completed a hands-on job simulation focused on optimizing
                      the performance of a surgical robotic arm (Model RBA-2201)
                    </li>
                    <li>
                      Used Python-based diagnostics to identify and resolve
                      control system inefficiencies, reducing actuator response
                      time by 15% (from 0.20s to 0.17s)
                    </li>
                    <li>
                      Proposed and documented design modifications through
                      annotated technical diagrams, contributing to a 10%
                      increase in durability score
                    </li>
                    <li>
                      Developed a professional, data-driven design proposal
                      detailing findings, solutions, and engineering
                      recommendations to improve precision, reliability, and
                      long-term operational performance of robotic systems
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">ResumeAI</h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        Personal Extension of AIResume |{" "}
                        <a
                          href="https://resume-ai-smoky-eight.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          resume-ai-smoky-eight.vercel.app
                        </a>
                      </p>
                    </div>
                    <span className="text-sm text-slate-500">
                      May 2025 - June 2025
                    </span>
                  </div>
                  <ul className="ml-4 space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                    <li>
                      Created an AI-powered resume builder with Next.js 15 and
                      Gemini-AI API, auto-filling up to 90% of resume fields
                      during internal testing
                    </li>
                    <li>
                      Designed and implemented a user-friendly multi-step form
                      workflow combined with drag-and-drop section management
                      using React Hook Form and dnd-kit, allowing users to
                      customize, complete efficiently, and export professional
                      resumes in under 10 minutes on average during testing
                    </li>
                    <li>
                      Implemented auto-save and backup features using PostgreSQL
                      and Vercel Blob, preventing data loss in 100% of simulated
                      browser crash scenarios
                    </li>
                    <li>
                      Integrated Stripe for subscription management,
                      successfully processing all test payments, and supporting
                      multiple subscription tiers
                    </li>
                    <li>
                      Ensured responsive design and real-time previews, with all
                      UI components rendering correctly across desktop and
                      mobile devices during QA testing
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Synch</h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        Personal Project |{" "}
                        <a
                          href="https://synch-sass-xi.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          synch-sass-xi.vercel.app
                        </a>
                      </p>
                    </div>
                    <span className="text-sm text-slate-500">
                      January 2025 - May 2025
                    </span>
                  </div>
                  <ul className="ml-4 space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                    <li>
                      Developed a robust real-time event monitoring platform
                      using Next.js 13, PostgreSQL, and TypeScript to ensure
                      type-safe, scalable performance, supporting accurate
                      tracking and visualization of up to 1,000 events per test
                      session
                    </li>
                    <li>
                      Built a responsive dashboard with Shadcn-UI and Tailwind
                      CSS, achieving page load times under 1.5 seconds in local
                      and staging environments
                    </li>
                    <li>
                      Integrated WebSocket updates, enabling event notifications
                      to appear within 2 seconds of occurrence during testing
                    </li>
                    <li>
                      Implemented secure user authentication with Clerk and
                      payment processing via Stripe, successfully handling
                      multiple test user accounts and simulated transactions
                      with 100% reliability during development and testing
                      phases
                    </li>
                    <li>
                      Structured the backend to maintain consistent data storage
                      and retrieval, passing all integration and unit tests with
                      over 95% code coverage
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Bachelor's of Computer Science
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400">
                      University of Mumbai
                    </p>
                  </div>
                  <span className="text-sm text-slate-500">2021</span>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">
                        Front End Development Libraries Certification
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        freeCodeCamp
                      </p>
                    </div>
                    <span className="text-sm text-slate-500">2024</span>
                  </div>
                  <p className="ml-4 text-sm text-slate-700 dark:text-slate-300">
                    Advanced proficiency in React, Redux, and SPA development
                    with expertise in dynamic content rendering and efficient
                    state management.
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">
                        Back End Development and APIs Certification
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        freeCodeCamp
                      </p>
                    </div>
                    <span className="text-sm text-slate-500">2024</span>
                  </div>
                  <p className="ml-4 text-sm text-slate-700 dark:text-slate-300">
                    300+ hours of Node.js, Express.js, and MongoDB training.
                    Expertise in RESTful API design and server-side development.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Download CTA */}
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 dark:border-blue-800">
              <CardContent className="py-8 text-center">
                <h3 className="mb-2 text-xl font-semibold">
                  Want the full details?
                </h3>
                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  Download my complete resume as a PDF for a comprehensive view
                  of my experience and qualifications.
                </p>
                <Button onClick={handleDownload} size="lg" className="gap-2">
                  <Download className="w-5 h-5" />
                  Download Complete Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
}
