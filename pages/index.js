import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    {
      title: "Reports & Essays",
      href: "/categories/reports-essays",
    description: "Help with writing assignments and Word documents.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="5"
            y="3.5"
            width="14"
            height="17"
            rx="2"
            ry="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <line
            x1="8"
            y1="8"
            x2="16"
            y2="8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="11"
            x2="14"
            y2="11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="14"
            x2="13"
            y2="14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Presentations & PPT",
      href: "/categories/presentations-ppt",
    description: "Slides, templates, and class presentations.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="4"
            y="5"
            width="16"
            height="11"
            rx="2"
            ry="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <rect
            x="8"
            y="8"
            width="6"
            height="3"
            rx="0.8"
            ry="0.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <line
            x1="12"
            y1="16"
            x2="12"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="9"
            y1="20"
            x2="15"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Group Projects",
      href: "/categories/group-projects",
    description: "Case studies and team assignments.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="8"
            cy="9"
            r="2.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle
            cx="15.5"
            cy="9"
            r="2.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M4.5 16c0-2.1 1.6-3.8 3.5-3.8s3.5 1.7 3.5 3.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M11.8 16c0-2.1 1.6-3.8 3.7-3.8 2.1 0 3.7 1.7 3.7 3.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Excel & Data",
      href: "/categories/excel-data",
    description: "Sheets, tables, dashboards, simple calculations.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2"
            ry="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <line
            x1="9"
            y1="4"
            x2="9"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <line
            x1="15"
            y1="4"
            x2="15"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <line
            x1="4"
            y1="9"
            x2="20"
            y2="9"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <line
            x1="4"
            y1="15"
            x2="20"
            y2="15"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      ),
    },
    {
      title: "Programming & Tech",
      href: "/categories/programming-tech",
    description: "Basic coding tasks and small tech work.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="3.5"
            y="5"
            width="17"
            height="13"
            rx="2"
            ry="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <polyline
            points="9,9 7,12 9,15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="15,9 17,12 15,15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="10.5"
            y1="17.5"
            x2="13.5"
            y2="17.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Other Tasks",
            href: "/categories/other-uni-tasks",
description: "Anything else required for your course.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="12"
            cy="7.5"
            r="2.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M7 15.5c0-2.1 2.2-3.8 5-3.8s5 1.7 5 3.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M7 19h10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Pick a creator, upload your requirements, and get your complete university project delivered with zero effort."
        />
      </Head>

      <div className="page-root">
              <Navbar />


        <main className="page-main">
          <section className="hero">
            <div className="hero-inner">
              <h1 className="hero-title">University projects, done for you.</h1>
              <p className="hero-subtitle">
                Pick a creator, upload your requirements, and get your complete
                project delivered with zero effort.
              </p>

              <form
                className="hero-search"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  className="hero-search-input"
                  type="text"
                  placeholder='Try "marketing group project"'
                />
                <button className="hero-search-button" type="submit">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle
                      cx="11"
                      cy="11"
                      r="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <line
                      x1="15"
                      y1="15"
                      x2="20"
                      y2="20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </section>

          <section className="category-section" aria-labelledby="category-heading">
            <div className="category-header">
              <h2 id="category-heading" className="section-title">
                Choose a category
              </h2>
              <p className="section-subtitle">Select what you need help with.</p>
            </div>

            <div className="category-grid">
              {categories.map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href || "#"}
                  className="category-card"
                >
                  <div className="category-icon">{cat.icon}</div>
                  <h3 className="category-card-title">{cat.title}</h3>
                  <p className="category-card-text">{cat.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="creators-section" aria-labelledby="creators-heading">
            <div className="creators-inner">
              <h2 id="creators-heading" className="section-title creators-title">
                Make it all happen with creators
              </h2>

              <div className="creators-list">
                <div className="creator-row">
                  <div className="creator-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle
                        cx="12"
                        cy="9"
                        r="2.4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M7 17c0-2.3 2.1-4 5-4s5 1.7 5 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="creator-text">
                    Access top-talented creators.
                  </p>
                </div>

                <div className="creator-row">
                  <div className="creator-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle
                        cx="12"
                        cy="12"
                        r="6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M12 9v3l2 1.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="creator-text">
                    Match easily with the right expert for your task.
                  </p>
                </div>

                <div className="creator-row">
                  <div className="creator-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect
                        x="5"
                        y="5"
                        width="14"
                        height="14"
                        rx="3"
                        ry="3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <polyline
                        points="8,12 11,14.5 16,9.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="creator-text">
                    Get high-quality work delivered fast and within budget.
                  </p>
                </div>

                <div className="creator-row">
                  <div className="creator-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect
                        x="6"
                        y="7"
                        width="12"
                        height="10"
                        rx="1.8"
                        ry="1.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <line
                        x1="9"
                        y1="11"
                        x2="15"
                        y2="11"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <line
                        x1="9"
                        y1="14"
                        x2="13"
                        y2="14"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="creator-text">
                    Release payment only after you approve the result.
                  </p>
                </div>
              </div>
            
              <div className="creators-cta">
                <button type="button" className="creators-join-btn">
                  Join now
                </button>
              </div>
</div>
          </section>
        </main>

        <footer className="site-footer">
          <span>workly.day</span>
      <p className="footer-disclaimer">
        Workly is not affiliated with any university. Users are responsible for following their institution&apos;s academic rules.
      </p>
        
        


        </footer>
      </div>
    </>
  );
}
