"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./dashboard.css";

export default function DashboardPage() {
  const router = useRouter();


  const DashboardContent = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get("username");

    useEffect(() => {
   
      if (!username) {
        router.push("/sign-in");
      }
    }, [username, router]);

    return (
      <main className="dashboard">
        <div className="dashboard-overlay">
          <div className="dashboard-card">
            <h1 className="dashboard-title">
              Welcome to Dashboard, Mr {username || "User"}
            </h1>

            <p className="dashboard-subtitle">
              This is your dashboard page.
            </p>

            <hr />

            <h2 className="dashboard-heading">Summary</h2>

            <p className="dashboard-text">
              This website helps people remember the work they need to do throughout the day.
            </p>

            <hr />

            <h2 className="dashboard-heading">Advantages of using this website</h2>

            <ul className="dashboard-list">
              <li>Simple and easy to use</li>
              <li>Best website for task management</li>
              <li>Saves time and improves productivity</li>
              <li>Easy Navigation</li>
              <li>Responsive & Interactive UI</li>
              <li>Consistency Across Pages</li>
              <li>Scalable Features</li>
            </ul>
          </div>
        </div>
      </main>
    );
  };

  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}





