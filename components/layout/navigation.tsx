"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reset navigation state when pathname changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 150) // Short delay to prevent flash

    return () => clearTimeout(timer)
  }, [pathname])

  const handleNavClick = () => {
    setIsNavigating(true)
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
    { href: "/resume", label: "Resume" },
  ]

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/40 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">FA</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={handleNavClick}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${
                  pathname === item.href
                    ? "text-accent"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
                {pathname === item.href && !isNavigating && (
                  <motion.div
                    className="absolute inset-x-0 -bottom-px h-px bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </div>
          ))}
          
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-accent transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleNavClick()
                }}
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-accent bg-accent/10 rounded-md"
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
