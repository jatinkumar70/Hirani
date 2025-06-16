"use client";

import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

interface HtmlContentProps {
  content: string;
  className?: string;
}

export default function HtmlContentRenderer({
  content,
  className = "",
}: HtmlContentProps) {
  const [processedContent, setProcessedContent] = useState("");

  useEffect(() => {
    if (content) {
      //* Process special content patterns before sanitization
      let processedHtml = content;

      //* Process location markers (text followed by semicolon)
      processedHtml = processedHtml.replace(
        /([A-Za-z\s]+);/g,
        '<span class="location-marker"><span class="location-icon">📍</span>$1</span>'
      );

      //* Process call-to-action elements (text inside square brackets)
      processedHtml = processedHtml.replace(
        /\[(.*?)\]/g,
        '<div class="cta-container"><a href="#" class="cta-button">$1</a></div>'
      );

      //* Configure DOMPurify to allow specific tags and attributes
      const purifyConfig = {
        ALLOWED_TAGS: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "span",
          "a",
          "strong",
          "em",
          "ul",
          "ol",
          "li",
          "br",
          "div",
        ],
        ALLOWED_ATTR: ["href", "target", "rel", "class", "id"],
      };

      //* Sanitize the HTML content
      const clean = DOMPurify.sanitize(processedHtml, purifyConfig);

      //* Process the content to add styling classes
      const parser = new DOMParser();
      const doc = parser.parseFromString(clean, "text/html");

      //* Apply styling to headings and paragraphs
      doc
        .querySelectorAll("h1")
        .forEach((el) =>
          el.classList.add("text-3xl", "font-bold", "mt-8", "mb-2")
        );
      doc
        .querySelectorAll("h2")
        .forEach((el) =>
          el.classList.add("text-2xl", "font-semibold", "mt-6", "mb-2")
        );
      doc
        .querySelectorAll("h3")
        .forEach((el) =>
          el.classList.add("text-xl", "font-semibold", "mt-5", "mb-2")
        );
      doc
        .querySelectorAll("h4")
        .forEach((el) =>
          el.classList.add("text-lg", "font-medium", "mt-4", "mb-2")
        );
      doc
        .querySelectorAll("h5")
        .forEach((el) =>
          el.classList.add("text-base", "font-medium", "mt-2", "mb-1")
        );
      doc
        .querySelectorAll("h6")
        .forEach((el) =>
          el.classList.add("text-sm", "font-medium", "mt-2", "mb-1")
        );
      doc
        .querySelectorAll("p")
        .forEach((el) =>
          el.classList.add("my-3", "text-base", "leading-relaxed")
        );
      doc.querySelectorAll("span").forEach((el) => el.classList.add("inline"));

      //* Style location markers
      doc.querySelectorAll(".location-marker").forEach((el) => {
        el.classList.add(
          "inline-flex",
          "items-center",
          "bg-slate-100",
          "text-slate-800",
          "px-3",
          "py-2",
          "rounded-full",
          "text-sm",
          "font-medium",
        );
      });

      //* Style CTA buttons
      doc.querySelectorAll(".cta-container").forEach((el) => {
        el.classList.add("my-4");
      });

      doc.querySelectorAll(".cta-button").forEach((el) => {
        el.classList.add(
          "inline-block",
          "bg-gray-50",
          "hover:bg-primary/90",
          "text-primary-gold",
          "font-medium",
          "py-2",
          "px-4",
          "rounded-md",
          "transition-colors",
          "shadow-sm",
          "border",
          "border-gray-300"
        );
      });

      //* Convert back to HTML string
      setProcessedContent(doc.body.innerHTML);
    }
  }, [content]);

  return (
    <div
      className={`html-content prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
