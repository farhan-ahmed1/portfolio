'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code2 } from 'lucide-react';

interface MDXContentProps {
  content: string;
}

const StrongText = ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
  <strong className="font-semibold text-slate-900 dark:text-slate-100" {...props}>
    {children}
  </strong>
);

const isStrongOnlyParagraph = (children: React.ReactNode) => {
  const items = React.Children.toArray(children).filter((child) => {
    if (typeof child === 'string') {
      return child.trim().length > 0;
    }
    return true;
  });

  if (items.length !== 1) return false;
  const onlyChild = items[0];

  return (
    React.isValidElement(onlyChild) &&
    (onlyChild.type === 'strong' || onlyChild.type === StrongText)
  );
};

// Enhanced MDX components with animations and better styling
const mdxComponents = {
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    return (
      <motion.h1
        className="mb-6 border-b-2 border-dotted border-slate-300/80 pb-3 text-3xl font-bold tracking-tight dark:border-slate-700/80"
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
        className="mb-6 mt-10 flex justify-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        {...restProps}
      >
        <span className="inline-flex w-full items-center justify-center border-2 border-dotted border-slate-300/80 px-5 py-2 text-center text-xl font-semibold tracking-tight text-slate-900 dark:border-slate-700/80 dark:text-slate-100">
          {children}
        </span>
      </motion.h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    return (
      <motion.h3
        className="mb-3 mt-6 flex items-start gap-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100"
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        {...restProps}
      >
        <span className="mt-2 h-2 w-2 flex-shrink-0 border-2 border-dotted border-slate-500/80 dark:border-slate-400/80" />
        <span>{children}</span>
      </motion.h3>
    );
  },
  p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    const childrenArray = React.Children.toArray(children);
    const isSubheading = isStrongOnlyParagraph(children);

    if (isSubheading) {
      const onlyChild = childrenArray.find(Boolean);
      const headingText =
        React.isValidElement(onlyChild) && 'props' in onlyChild
          ? (onlyChild.props?.children ?? children)
          : children;

      return (
        <motion.p
          className="mb-3 mt-6 flex items-start gap-3 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          {...restProps}
        >
          <span className="mt-1.5 h-2 w-2 flex-shrink-0 border-2 border-dotted border-slate-500/80 dark:border-slate-400/80" />
          <span>{headingText}</span>
        </motion.p>
      );
    }

    return (
      <motion.p
        className="mb-4 text-base leading-6 text-slate-700 dark:text-slate-300"
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
        className="mb-5 ml-6 mt-2 border-l-2 border-dotted border-slate-300/80 pl-8 dark:border-slate-700/80"
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
        className="mb-5 ml-6 mt-2 border-l-2 border-dotted border-slate-300/80 pl-8 dark:border-slate-700/80"
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
    return (
      <motion.li
        className="flex items-start gap-3 py-1 leading-6"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        {...restProps}
      >
        <span className="mt-1.5 h-2 w-2 flex-shrink-0 border-2 border-dotted border-slate-500/80 dark:border-slate-400/80" />
        <div className="text-slate-700 dark:text-slate-300">{children}</div>
      </motion.li>
    );
  },
  blockquote: ({ children, ...props }: React.HTMLProps<HTMLQuoteElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    return (
      <motion.blockquote
        className="mb-6 border-l-2 border-dotted border-slate-400/80 bg-[#fffdf8] py-3 pl-6 italic text-slate-700 dark:border-slate-600/80 dark:bg-[#121317] dark:text-slate-300"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        {...restProps}
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-1 h-5 w-5 flex-shrink-0 text-slate-700 dark:text-slate-300" />
          <div>{children}</div>
        </div>
      </motion.blockquote>
    );
  },
  code: ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
    <code
      className="rounded-none border border-dotted border-slate-300/80 bg-[#fffdf8] px-1.5 py-0.5 font-mono text-sm text-slate-700 dark:border-slate-700/80 dark:bg-[#121317] dark:text-slate-300"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.HTMLProps<HTMLPreElement>) => {
    const { onAnimationStart, onAnimationEnd, ...restProps } = props as any;
    return (
      <motion.pre
        className="mb-6 overflow-x-auto rounded-none border-2 border-dotted border-slate-300/80 bg-[#fffdf8] p-4 text-sm text-slate-700 dark:border-slate-700/80 dark:bg-[#121317] dark:text-slate-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...restProps}
      >
        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
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
      className="font-semibold text-slate-900 underline decoration-dotted underline-offset-4 transition-colors duration-200 hover:text-slate-600 dark:text-slate-100 dark:hover:text-slate-300"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }: React.HTMLProps<HTMLImageElement>) => (
    <motion.div
      className="mb-6 overflow-hidden rounded-none border-2 border-dotted border-slate-300/80 dark:border-slate-700/80"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full transition-transform duration-300 hover:scale-[1.01]"
        loading="lazy"
        {...props}
      />
    </motion.div>
  ),
  strong: StrongText,
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
      className="prose prose-base max-w-none dark:prose-invert"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Component components={mdxComponents} />
    </motion.div>
  );
}
