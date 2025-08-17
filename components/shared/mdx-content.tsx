'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lightbulb, Target, Code2, Zap } from 'lucide-react';

interface MDXContentProps {
  content: string;
}

// Enhanced MDX components with animations and better styling
const mdxComponents = {
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    return (
      <motion.h1
        className="mb-6 text-3xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...restProps}
      >
        {children}
      </motion.h1>
    );
  },
  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    return (
      <motion.h2
        className="mb-4 mt-8 flex items-center gap-2 text-2xl font-semibold tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        {...restProps}
      >
        <div className="h-1 w-8 rounded-full bg-accent" />
        {children}
      </motion.h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    return (
      <motion.h3
        className="mb-3 mt-6 text-xl font-semibold tracking-tight"
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        {...restProps}
      >
        {children}
      </motion.h3>
    );
  },
  p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    return (
      <motion.p
        className="mb-4 leading-7 text-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...restProps}
      >
        {children}
      </motion.p>
    );
  },
  ul: ({ children, ...props }: React.HTMLProps<HTMLUListElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    const childrenArray = React.Children.toArray(children);
    return (
      <motion.ul
        className="mb-4 ml-6 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        {...restProps}
      >
        {childrenArray.map((child, index) => 
          React.isValidElement(child) 
            ? React.cloneElement(child, { key: child.key || `ul-item-${index}` })
            : child
        )}
      </motion.ul>
    );
  },
  ol: ({
    children,
    ...props
  }: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    const childrenArray = React.Children.toArray(children);
    return (
      <motion.ol
        className="mb-4 ml-6 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        {...restProps}
      >
        {childrenArray.map((child, index) => 
          React.isValidElement(child) 
            ? React.cloneElement(child, { key: child.key || `ol-item-${index}` })
            : child
        )}
      </motion.ol>
    );
  },
  li: ({ children, ...props }: React.HTMLProps<HTMLLIElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    const content = React.Children.toArray(children);
    const hasStrong = content.some(
      (child) => React.isValidElement(child) && child.type === 'strong'
    );

    return (
      <motion.li
        className={`flex items-start gap-3 leading-7 ${hasStrong ? 'font-medium' : ''}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        {...restProps}
      >
        <div className="mt-2 flex-shrink-0">
          {hasStrong ? (
            <Zap className="h-4 w-4 text-accent" />
          ) : (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
        </div>
        <div>{children}</div>
      </motion.li>
    );
  },
  blockquote: ({ children, ...props }: React.HTMLProps<HTMLQuoteElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    return (
      <motion.blockquote
        className="mb-4 border-l-4 border-accent bg-accent/5 py-3 pl-6 italic"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        {...restProps}
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
          <div>{children}</div>
        </div>
      </motion.blockquote>
    );
  },
  code: ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
    <code
      className="rounded border bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.HTMLProps<HTMLPreElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    return (
      <motion.pre
        className="mb-4 overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...restProps}
      >
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Code2 className="h-3 w-3" />
          <span>Code</span>
        </div>
        {children}
      </motion.pre>
    );
  },
  a: ({ children, href, ...props }: React.HTMLProps<HTMLAnchorElement>) => (
    <a
      href={href}
      className="font-medium text-accent underline underline-offset-4 transition-colors duration-200 hover:text-accent/80"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }: React.HTMLProps<HTMLImageElement>) => (
    <motion.div
      className="mb-4 overflow-hidden rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
        loading="lazy"
        {...props}
      />
    </motion.div>
  ),
  strong: ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
    <strong className="font-semibold text-accent" {...props}>
      {children}
    </strong>
  ),
};

export function MDXContent({ content }: MDXContentProps) {
  // Parse and execute the compiled MDX function
  const Component = React.useMemo(() => {
    try {
      // Create a function that executes the compiled MDX code
      const fn = new Function('arguments', content);

      // Velite/MDX expects JSX runtime functions as the first argument
      const jsxRuntime = {
        Fragment: React.Fragment,
        jsx: React.createElement,
        jsxs: React.createElement,
      };

      // Execute the function with JSX runtime
      const result = fn([jsxRuntime]);
      // Return the default export (the MDX component)
      return result.default;
    } catch (error) {
      console.error('Error parsing MDX content:', error);
      const ErrorComponent = () => React.createElement('div', null, 'Error loading content');
      ErrorComponent.displayName = 'MDXErrorComponent';
      return ErrorComponent;
    }
  }, [content]);

  return (
    <motion.div
      className="prose prose-lg max-w-none dark:prose-invert"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Component components={mdxComponents} />
    </motion.div>
  );
}
