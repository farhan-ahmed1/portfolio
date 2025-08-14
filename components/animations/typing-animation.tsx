"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"

interface TypingAnimationProps {
  className?: string
  onComplete?: () => void
}

export function TypingAnimation({ className = "", onComplete }: TypingAnimationProps) {
  const [currentText, setCurrentText] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [animationStarted, setAnimationStarted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  // Define the typing sequence - memoized to prevent recreating on every render
  const sequence = useMemo(() => [
    { text: "Farhna", delay: 150, pauseAfter: 800 }, // Typo 1
    { text: "", delay: 80, pauseAfter: 200 }, // Clear quickly
    { text: "Fahran", delay: 140, pauseAfter: 700 }, // Typo 2
    { text: "", delay: 80, pauseAfter: 200 }, // Clear quickly
    { text: "Farhan Ahmde", delay: 120, pauseAfter: 1000 }, // Multiple typos
    { text: "", delay: 60, pauseAfter: 300 }, // Clear with slight frustration
    { text: "sdlkjhsdlkhjf", delay: 80, pauseAfter: 800 }, // Random mashing
    { text: "", delay: 50, pauseAfter: 500 }, // Clear
    { text: "sorry, one second", delay: 100, pauseAfter: 600 }, // More random
    { text: "", delay: 50, pauseAfter: 800 }, // Pause (taking a breath)
    { text: "Farhan Ahmed", delay: 120, pauseAfter: -1 }, // Final correct version (stays)
  ], [])

  const typeText = useCallback(async (targetText: string, typingDelay: number) => {
    for (let i = 0; i <= targetText.length; i++) {
      await new Promise<void>(resolve => {
        setTimeout(() => {
          setCurrentText(targetText.slice(0, i))
          resolve()
        }, typingDelay)
      })
    }
  }, [])

  const deleteText = useCallback(async (deletionDelay: number) => {
    return new Promise<void>((resolve) => {
      let currentLength = 0
      setCurrentText(prev => {
        currentLength = prev.length
        return prev
      })

      const deleteStep = () => {
        setCurrentText(prev => {
          const newText = prev.slice(0, -1)
          if (newText.length === 0) {
            setTimeout(resolve, deletionDelay)
            return ""
          }
          setTimeout(deleteStep, deletionDelay)
          return newText
        })
      }

      if (currentLength > 0) {
        setTimeout(deleteStep, deletionDelay)
      } else {
        resolve()
      }
    })
  }, [])

  useEffect(() => {
    // Start animation after a brief delay
    const startDelay = setTimeout(() => {
      setAnimationStarted(true)
    }, 800)

    return () => clearTimeout(startDelay)
  }, [])

  useEffect(() => {
    if (!animationStarted || isAnimating || animationComplete || currentStep >= sequence.length) return
    
    setIsAnimating(true)

    const runStep = async () => {
      const step = sequence[currentStep]
      
      if (step.text === "") {
        // Delete current text
        await deleteText(step.delay)
      } else {
        // Type new text
        await typeText(step.text, step.delay)
      }

      // Pause after typing/deleting (if not the final step)
      if (step.pauseAfter > 0) {
        await new Promise<void>(resolve => {
          setTimeout(resolve, step.pauseAfter)
        })
        setCurrentStep(prev => prev + 1)
        setIsAnimating(false)
      } else if (step.pauseAfter === -1) {
        // Final step - animation complete, don't advance
        setAnimationComplete(true)
        setIsAnimating(false)
        // Trigger completion callback with a slight delay for better UX
        setTimeout(() => {
          onComplete?.()
        }, 500)
        return
      } else {
        setCurrentStep(prev => prev + 1)
        setIsAnimating(false)
      }
    }

    runStep()
  }, [currentStep, animationStarted, isAnimating, animationComplete, sequence, typeText, deleteText, onComplete])

  // Cursor blinking effect
  useEffect(() => {
    if (animationComplete) {
      setShowCursor(false) // Hide cursor when animation is complete
      return
    }

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [animationComplete])

  return (
    <div className={className}>
      <span>{currentText}</span>
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="text-accent font-normal ml-1"
        style={{ fontSize: '0.9em' }}
      >
        |
      </motion.span>
    </div>
  )
}
