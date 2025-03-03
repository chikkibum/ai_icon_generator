"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, LinkedIn, Twitter, YouTube } from "@/lib/icons";
import MaxWidthWrapper from "./MaxWidthWrapper";

// Hardcoded data for socials and navigation
const socials = [
  {
    name: "Twitter",
    icon: Twitter,
    href: "",
  },
  {
    name: "LinkedIn",
    icon: LinkedIn,
    href: "",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "",
  },
  {
    name: "YouTube",
    icon: YouTube,
    href: "",
  },
];

const navigation = {
  features: [
    { name: "Feature 1", href: "/feature1" },
    { name: "Feature 2", href: "/feature2" },
    { name: "Feature 3", href: "/feature3" },
  ],

  product: [
    { name: "Blog", href: "/blog" },
    { name: "Changelog", href: "/changelog" },
    { name: "Customers", href: "/customers" },
    { name: "Enterprise", href: "/enterprise" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs/introduction" },
    { name: "Help Center", href: "/help" },
    { name: "Brand", href: "/brand" },
  ],
  compare: [
    { name: "Compare 1", href: "/compare/compare1" },
    { name: "Compare 2", href: "/compare/compare2" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
  ],
  tools: [
    { name: "Tool 1", href: "/tools/tool1" },
    { name: "Tool 2", href: "/tools/tool2" },
  ],
};

const linkListHeaderClassName = "text-sm font-medium text-neutral-900";
const linkListClassName = "flex flex-col mt-2.5 gap-2.5";
const linkListItemClassName =
  "text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-75";

export function Footer({ className }: { className?: string }) {
  return (
    <MaxWidthWrapper
      className={cn(
        "relative z-10 overflow-hidden border border-b-0 border-neutral-200 bg-white/50 py-16 backdrop-blur-lg md:rounded-t-2xl",
        className
      )}
    >
      <footer>
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="flex flex-col gap-6">
            <div className="grow">
              <Link href="/" className="block max-w-fit">
                <span className="sr-only">
                  {process.env.NEXT_PUBLIC_APP_NAME} Logo
                </span>
                {/* logo */}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {socials.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-full p-1"
                >
                  <span className="sr-only">{name}</span>
                  <Icon className="size-4 text-neutral-900 transition-colors duration-75 group-hover:text-neutral-600" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-4 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2">
              <div>
                <h3 className={linkListHeaderClassName}>Product</h3>
                <ul role="list" className={linkListClassName}>
                  {navigation.features.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className={linkListItemClassName}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className={linkListHeaderClassName}>Resources</h3>
                <ul role="list" className={linkListClassName}>
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className={linkListItemClassName}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2">
              <div className="flex flex-col space-y-8">
                <div>
                  <h3 className={linkListHeaderClassName}>Compare</h3>
                  <ul role="list" className={linkListClassName}>
                    {navigation.compare.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={linkListItemClassName}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={linkListHeaderClassName}>Legal</h3>
                  <ul role="list" className={linkListClassName}>
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={linkListItemClassName}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <a
                        href=""
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          linkListItemClassName,
                          "flex items-center gap-1"
                        )}
                      >
                        {/* Trust Center <ReferredVia className="size-3.5" /> */}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 md:mt-0">
                <h3 className={linkListHeaderClassName}>Tools</h3>
                <ul role="list" className={linkListClassName}>
                  {navigation.tools.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className={linkListItemClassName}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row (status, SOC2, copyright) */}
        <div className="mt-12 grid grid-cols-1 items-center gap-8 sm:grid-cols-3">
          <StatusBadge />
          <Link href="/blog/soc2" className="flex sm:justify-center">
            <Image
              src="https://assets.dub.co/misc/soc2.svg"
              alt="AICPA SOC 2 Type II Certified"
              width={63}
              height={32}
              className="h-8 transition-[filter] duration-75 hover:brightness-90"
            />
          </Link>
          <p className="text-xs text-neutral-500 sm:text-right">
            © {new Date().getFullYear()} Ai Icon Generator
          </p>
        </div>
      </footer>
    </MaxWidthWrapper>
  );
}

function StatusBadge() {
  const [color, setColor] = useState("bg-neutral-200");
  const [status, setStatus] = useState("All systems operational");

  useEffect(() => {
    // Hardcoded status
    setStatus("Working Like a charm");
    setColor("bg-green-500");
  }, []);

  return (
    <Link
      href=""
      target="_blank"
      className="group flex max-w-fit items-center gap-2 rounded-lg border border-neutral-200 bg-white py-2 pl-2 pr-2.5 transition-colors hover:bg-neutral-50 active:bg-neutral-100"
    >
      <div className="relative size-2">
        <div
          className={cn(
            "absolute inset-0 m-auto size-2 animate-ping items-center justify-center rounded-full group-hover:animate-none",
            color,
            status === "Loading status..." && "animate-none"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 z-10 m-auto size-2 rounded-full",
            color
          )}
        />
      </div>
      <p className="text-xs font-medium leading-none text-neutral-600">
        {status}
      </p>
    </Link>
  );
}
