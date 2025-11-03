"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <div className="space-y-3">
      <ReactMarkdown
        components={{
          ul: ({ children }) => (
            <ul className="list-inside list-disc">{children}</ul>
          ),
          a: ({ href, children }) => (
            <a
              href={href ?? "#"}
              className="text-green-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
