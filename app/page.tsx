"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Puzzle, Github, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ScrollingPage() {
  const [activeSection, setActiveSection] = useState("section1")
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
  })

  const sectionLabels: Record<string, string> = {
    section1: "Home 🏡",
    section2: "About Us 🐟",
    section3: "Setting Up 🧑🏻‍💻",
  }

  const sectionRefs = {
    section1: useRef<HTMLDivElement>(null),
    section2: useRef<HTMLDivElement>(null),
    section3: useRef<HTMLDivElement>(null),
    section4: useRef<HTMLDivElement>(null)
  }

  // Handle scroll to update active section and check visibility for animations
  useEffect(() => {
    // Set up intersection observer for fade-in animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({ ...prev, [id]: true }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    // Handle scroll for active section in nav
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for better UX

      // Check which section is in view
      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (!ref.current) return

        const element = ref.current
        const { offsetTop, offsetHeight } = element

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  // Scroll to section
  const scrollToSection = (id: string) => {
    const section = sectionRefs[id as keyof typeof sectionRefs].current
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-sm ">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl ml-5 sm:ml-20 w-10 h-10"><img src="/phishmate_logo.png"></img></div>
          <ul className="flex gap-2 text-sm sm:text-lg text-black font-semibold sm:gap-10 mr-5">
          {Object.keys(sectionRefs).map((id) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`transition-colors text-black hover:text-primary`}
              >
                {sectionLabels[id]}
              </button>
            </li>
          ))}
          </ul>
        </div>
      </nav>

      {/* Section 1*/}
      <section
        id="section1"
        ref={sectionRefs.section1}
        className={`min-h-screen flex items-center justify-center bg-background pt-16 transition-all duration-1000 ease-out ${
          visibleSections.section1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="w-40 h-50"><img src="/phishmate_logo.png"></img></div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-black">PhishMate</h1>
          <p className="max-w-[700px] text-black md:text-xl
          ">
            Your friendly neighbourhood phishing mail detector. <br></br> 100% Open Source, and on-device (no data collected).
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://github.com/keerthiparam/PhishMate"
              target="blank"
              className="text-black inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-black shadow transition-colors hover:bg-primary"
            >
              <span className="inline-block align-middle"><Github className="w-4 h-4 inline translate-y-[-1px] translate-x-[-2px]" /></span> Github 
            </Link>
            <Link
              href="#"
              className="text-black inline-flex h-10 items-center justify-center rounded-md  bg-primary px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:bg-primary"
            >
              <span className="inline-block align-middle"><Download className="w-4 h-4 inline translate-y-[-1px] translate-x-[-2px]" /></span> Download 
            </Link>
          </div>
          <div className="text-black inline-flex h-10 items-center justify-center font-medium translate-x-[1px] sm:translate-x-[70px] translate-y-[-30px]">(Coming soon!)</div>
          <button
            onClick={() => scrollToSection("section2")}
            className="absolute bottom-8 animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown className="h-8 w-8 text-black" />
          </button>
        </div>
      </section>

      {/* Section 2 */}
      <section
        id="section2"
        ref={sectionRefs.section2}
        className={`min-h-screen flex items-center justify-center bg-muted transition-all duration-1000 ease-out ${
          visibleSections.section2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl text-black font-bold tracking-tighter md:text-4xl">What is PhishMate?</h2>
              <p className="text-black md:text-xl">
                PhishMate is a fully open source and on device phishing mail detector. We use a fine-tuned BERT sequential model for text analysis
                and link extraction along with AbuseIPDB to check the reputation of links sent in your email. Available for Chrome based browsers only. 
              </p>
              <p className="text-black md:text-xl">For contributions, check out our  <a href="https://github.com/keerthiparam/PhishMate" target="blank" className="text-orange-500 underline">GitHub</a>. For the installation guide, keep scrolling.</p>
            </div>
            <div className="flex justify-center">
              <div className="w-60 sm:w-full sm:max-w-sm  aspect-video rounded-lg flex items-center justify-center text-muted-foreground">
                <img src="/phishmate_logo.png"></img>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section
        id="section3"
        ref={sectionRefs.section3}
        className={`min-h-screen flex items-center justify-center bg-background transition-all duration-1000 ease-out ${
          visibleSections.section3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-6xl aspect-video rounded-lg flex items-center justify-center text-muted-foreground">
                <img src="/ext_ss.png"></img>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-black md:text-4xl">Setting up PhishMate</h2>
              <p className="text-black md:text-xl">
                <b>One Way</b> to set up PhishMate is to directly clone the repository, the other way is by clicking the download button on the HomePage.
                If you are going to download it, make sure you unzip the files in a folder before continuing. 
                <br></br>(<b>Note:</b> Download feature coming soon, check <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository" target="blank" className="underline text-orange-500">this tutorial</a>
                {' '}by GitHub on how to clone a repository :{')'})
                <br></br>
                <br></br>
                <b>Once you have downloaded/cloned the files into a folder</b>, go to <br></br>
                Chrome {'>'} Extensions <span className="inline-block align-middle"><Puzzle className="w-5 h-5 inline translate-y-[-3px]" /></span> {'>'} Manage Extensions {'>'} Turn on developer mode (top right) {'>'} Load unpacked
                <br></br><br></br>
                Now, choose the folder where you have cloned/downloaded the project. PhishMate should now be visible in the list of extensions. Turn it on. Scroll down for
                the next step!
                </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="section4"
        ref={sectionRefs.section4}
        className={`min-h-screen flex items-center justify-center bg-muted transition-all duration-1000 ease-out ${
          visibleSections.section2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl text-black font-bold tracking-tighter md:text-4xl">Final Step!</h2>
              <p className="text-black md:text-xl">
                For the final step, click on Extensions in the top right and click on PhishMate. Once that is done, a popup will appear with a dashboard that says
                how many links and emails were tracked. You should find a key symbol on the top left. Clicking that will prompt you to a popup shown in the figure.
                <br></br><br></br>

                Go to <a href="https://www.abuseipdb.com/" target="blank" className="text-orange-500 underline">AbuseIPDB's Website</a> and get yourself an API key.
                Once that is done, copy the api key and paste it in the box.
                <br></br><br></br>

                Thats all! You can now safely browse your mails with the added safety of our extension. 
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-muted-foreground">
                <img src="/apikeypopup.png"></img>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center text-center w-full">
            <p className="text-sm sm:text-md text-black">
              Made With ❤️ by Keerthi and Aravind
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
