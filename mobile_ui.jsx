import React, { useState } from "react";

export default function AutoHireAI() {
  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [portfolioProjects, setPortfolioProjects] = useState([
    { id: 1, title: 'Landing Page Revamp', tags: ['React','UX'], img: null, demo: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Increased conversion by 23%', skills: {React: 0.9, Figma:0.7, CSS:0.8} },
    { id: 2, title: 'Mobile App MVP', tags: ['Flutter','API'], img: null, demo: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', description: 'Delivered MVP in 6 weeks', skills: {Dart:0.85, API:0.75} },
  ]);
  const [dragIndex, setDragIndex] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [meetingOn, setMeetingOn] = useState(false);

  const sampleMatches = [
    { id: 1, name: "Riya Sharma", role: "Frontend Dev", match: 94, skills: ["React", "TypeScript"], verified: true },
    { id: 2, name: "Aman Verma", role: "Data Scientist", match: 90, skills: ["Python", "ML"], verified: false },
    { id: 3, name: "Sara Lee", role: "Product Designer", match: 88, skills: ["Figma", "UX"], verified: true }
  ];

  const invoices = [
    { id: "INV-001", to: "Acme Ltd.", amount: 1200, status: "Paid" },
    { id: "INV-002", to: "Beta Inc.", amount: 450, status: "Pending" }
  ];

  const discussions = [
    { id: 1, title: "React performance tips", replies: 12 },
    { id: 2, title: "Pricing strategies for freelancers", replies: 8 }
  ];

  function PercentCircle({ value = 0.75, size = 80 }) {
    const r = 36;
    const c = Math.PI * 2 * r;
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} stroke="#e5e7eb" strokeWidth="10" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke="#3b82f6"
          strokeWidth="10"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 800ms ease' }}
        />
        <text x="50" y="55" textAnchor="middle" fontSize="14" fill="#0f172a" fontWeight="600">
          {Math.round(value * 100)}%
        </text>
      </svg>
    );
  }

  // Small reusable card
  function Card({ children }) {
    return <div className="bg-white rounded-xl p-3 shadow">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-slate-900 font-inter">
      <div className="max-w-md mx-auto p-4 pb-44">{/* content */}

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center">AH</div>
            <div>
              <div className="text-sm text-slate-500">Welcome back,</div>
              <div className="font-semibold">Muskan 👋</div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="p-2 rounded-lg bg-white shadow">🔔</button>
            <button className="p-2 rounded-lg bg-white shadow">⚙️</button>
          </div>
        </header>

        <main className="mt-4 space-y-4">

          {/* HOME */}
          {tab === 'home' && (
            <section>
              <Card>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-slate-500">AI Hiring Assistant</div>
                    <div className="font-semibold text-lg">Find the best freelancers — faster</div>
                  </div>
                  <PercentCircle value={0.85} />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <button onClick={() => setTab('aimatch')} className="py-2 rounded-lg bg-blue-600 text-white text-xs">AI Match</button>
                  <button onClick={() => setTab('skillGraph')} className="py-2 rounded-lg bg-white shadow text-xs">Skill Graph</button>
                  <button onClick={() => setTab('market')} className="py-2 rounded-lg bg-white shadow text-xs">Market</button>
                </div>
              </Card>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <Card>
                  <div className="text-xs text-slate-500">Ongoing Projects</div>
                  <div className="font-semibold">4</div>
                </Card>
                <Card>
                  <div className="text-xs text-slate-500">Pending Invoices</div>
                  <div className="font-semibold">{invoices.filter(i=>i.status!=='Paid').length}</div>
                </Card>
              </div>
            </section>
          )}

          {/* ADVANCED AI MATCHING */}
          {tab === 'aimatch' && (
            <section>
              <h3 className="text-sm font-semibold">Advanced AI Matching</h3>
              <p className="text-xs text-slate-500">Soft-skills, past success, communication style & industry fit</p>

              <Card>
                <div className="mb-2 text-xs text-slate-500">Describe role</div>
                <textarea value={query} onChange={(e)=>setQuery(e.target.value)} className="w-full p-3 rounded-md bg-slate-50" rows={3} placeholder="e.g. Senior React dev with mentorship experience"></textarea>
                <div className="mt-3 flex gap-2">
                  <button onClick={()=>alert('Simulate AI Matching...')} className="flex-1 py-2 rounded-lg bg-blue-600 text-white">Run Matching</button>
                  <button onClick={()=>{setQuery('');}} className="py-2 px-3 rounded-lg bg-white shadow">Clear</button>
                </div>

                {/* Example results with soft-skill scores */}
                <div className="mt-3 space-y-2">
                  {sampleMatches.map(m => (
                    <div key={m.id} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                      <div>
                        <div className="font-semibold">{m.name} <span className="text-xs text-slate-400">• {m.role}</span></div>
                        <div className="text-xs text-slate-500">Communication: {m.match>90? 'Excellent' : 'Good'}</div>
                      </div>
                      <PercentCircle value={m.match/100} />
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          )}

          {/* SKILL GRAPH */}
          {tab === 'skillGraph' && (
            <section>
              <h3 className="text-sm font-semibold">AI Skill Graph</h3>
              <p className="text-xs text-slate-500">Embedding-based visualization</p>

              <Card>
                {/* small svg network placeholder */}
                <svg viewBox="0 0 200 120" className="w-full h-40">
                  <line x1="20" y1="20" x2="180" y2="100" stroke="#c7d2fe" strokeWidth="2" />
                  <circle cx="40" cy="30" r="8" fill="#60a5fa" />
                  <circle cx="100" cy="60" r="10" fill="#3b82f6" />
                  <circle cx="160" cy="90" r="7" fill="#06b6d4" />
                </svg>
                <div className="mt-2 text-xs text-slate-500">Nodes represent skills, edges represent relatedness</div>
              </Card>
            </section>
          )}

          {/* VIDEO MEETING UI */}
          {tab === 'meeting' && (
            <section>
              <h3 className="text-sm font-semibold">In-app Video Meeting</h3>
              <p className="text-xs text-slate-500">Screen sharing & recording (UI placeholder)</p>

              <div className="mt-3 bg-black rounded-xl overflow-hidden">
                {/* local video mock */}
                <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-white">{meetingOn? 'Live Video Stream' : 'Video Placeholder'}</div>
              </div>

              <div className="mt-3 flex gap-2">
                <button onClick={() => setMeetingOn(!meetingOn)} className="flex-1 py-2 rounded-lg bg-blue-600 text-white">{meetingOn? 'End Call' : 'Start Call'}</button>
                <button className="py-2 px-3 rounded-lg bg-white shadow">Share Screen</button>
              </div>
            </section>
          )}

          {/* SCHEDULING CALENDAR UI */}
          {tab === 'calendar' && (
            <section>
              <h3 className="text-sm font-semibold">Scheduling Calendar</h3>
              <p className="text-xs text-slate-500">Pick availability across timezones</p>

              <Card>
                <div className="grid grid-cols-7 gap-1 text-xs text-center">
                  {["S","M","T","W","T","F","S"].map(d => <div key={d} className="py-2">{d}</div>)}
                  {Array.from({length:35}).map((_,i)=> (
                    <div key={i} className="py-2 h-8 rounded text-xs bg-slate-50">{i+1}</div>
                  ))}
                </div>
                <div className="mt-3 text-xs">Timezone: IST (UTC+5:30)</div>
              </Card>
            </section>
          )}

          {/* DISPUTE RESOLUTION CENTER */}
          {tab === 'dispute' && (
            <section>
              <h3 className="text-sm font-semibold">Dispute Resolution</h3>
              <p className="text-xs text-slate-500">AI-assisted mediation & escalation</p>

              <Card>
                <div className="text-sm font-semibold">Active Disputes</div>
                <div className="mt-2 space-y-2">
                  <div className="p-2 bg-slate-50 rounded">
                    <div className="flex justify-between"><div className="text-xs">Riya vs Client — Scope mismatch</div><div className="text-xs text-amber-600">AI Mediation</div></div>
                    <div className="mt-1 text-xs text-slate-500">Suggested: partial refund + extra milestone</div>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="py-2 rounded-lg bg-blue-600 text-white">Open Mediation</button>
                </div>
              </Card>
            </section>
          )}

          {/* FREELANCER ANALYTICS DASHBOARD */}
          {tab === 'freelancerAnalytics' && (
            <section>
              <h3 className="text-sm font-semibold">Freelancer Analytics</h3>
              <p className="text-xs text-slate-500">Performance, earnings, client feedback trends</p>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Earnings (30d)</div>
                    <div className="font-semibold">$3,200</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Rating</div>
                    <div className="font-semibold">4.8 ★</div>
                  </div>
                </div>
                <div className="mt-3">
                  <svg width="100%" height="60">
                    <polyline points="0,50 20,30 40,35 60,20 80,25 100,10" stroke="#3b82f6" strokeWidth="3" fill="none" />
                  </svg>
                </div>
              </Card>
            </section>
          )}

          {/* CLIENT ANALYTICS DASHBOARD */}
          {tab === 'clientAnalytics' && (
            <section>
              <h3 className="text-sm font-semibold">Client Analytics</h3>
              <p className="text-xs text-slate-500">Project success, vendor reliability, spend</p>

              <Card>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-slate-500">Avg Time to Hire</div>
                    <div className="font-semibold">3.2 days</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Repeat Hire Rate</div>
                    <div className="font-semibold">42%</div>
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* INTERACTIVE PORTFOLIO UI */}
          {tab === 'portfolio' && (
            <section>
              <h3 className="text-sm font-semibold">Interactive Portfolio</h3>
              <p className="text-xs text-slate-500">Drag, swipe, embed demos, timelines & skill heatmaps</p>

              <Card>
                {/* Draggable horizontal list */}
                <div className="overflow-x-auto -mx-3 px-3 py-2 flex gap-3">
                  {portfolioProjects.map((p, idx) => (
                    <div
                      key={p.id}
                      draggable
                      onDragStart={(e)=>{ setDragIndex(idx); e.dataTransfer.effectAllowed = 'move'; }}
                      onDragOver={(e)=>e.preventDefault()}
                      onDrop={(e)=>{
                        e.preventDefault();
                        const newList = [...portfolioProjects];
                        const moved = newList.splice(dragIndex,1)[0];
                        newList.splice(idx,0,moved);
                        setPortfolioProjects(newList);
                        setDragIndex(null);
                      }}
                      className="min-w-[220px] bg-slate-50 p-3 rounded-xl shadow transform transition-transform duration-300 hover:scale-105"
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-semibold">{p.title}</div>
                        <div className="text-xs text-slate-400">{p.tags.join(' • ')}</div>
                      </div>
                      <div className="mt-2 h-36 bg-white rounded overflow-hidden flex items-center justify-center text-xs text-slate-400">{p.img? <img src={p.img} alt="proj" className="w-full h-full object-cover"/> : 'Project preview'}</div>
                      <div className="mt-2 text-sm text-slate-600">{p.description}</div>
                      <div className="mt-3 flex gap-2">
                        <button onClick={()=>{ setGalleryIndex(idx); setTab('portfolioGallery'); }} className="flex-1 py-2 rounded bg-blue-600 text-white text-xs">Open</button>
                        <button onClick={()=>{ navigator.clipboard?.writeText(window.location.href + '#project-'+p.id); }} className="py-2 px-2 rounded bg-white shadow text-xs">Share</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Portfolio Timeline</div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                      <div>
                        <div className="font-semibold">2024 — Launched MVP</div>
                        <div className="text-xs text-slate-500">Initial freelancer onboarding and matching beta</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                      <div>
                        <div className="font-semibold">2025 — Skill Graph v1</div>
                        <div className="text-xs text-slate-500">Introduced embedding visualization & verification</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skill Heatmap (simple SVG) */}
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Skill Heatmap</div>
                  <div className="mt-2 bg-white rounded-xl p-3">
                    <svg viewBox="0 0 200 100" className="w-full h-24">
                      {Object.keys(portfolioProjects[0].skills).map((s, i)=>{
                        const val = portfolioProjects[0].skills[s];
                        const x = 10 + i*40;
                        const color = val>0.85 ? '#065f46' : val>0.75 ? '#16a34a' : '#84cc16';
                        return <rect key={s} x={x} y={50-(val*40)} width={30} height={val*40} rx={4} fill={color} />;
                      })}
                    </svg>
                    <div className="mt-2 text-xs text-slate-500">Higher bars indicate stronger skill use in highlighted project</div>
                  </div>
                </div>

              </Card>

            </section>
          )}

          {/* PORTFOLIO GALLERY */}
          {tab === 'portfolioGallery' && (
            <section>
              <h3 className="text-sm font-semibold">Portfolio Gallery</h3>
              <p className="text-xs text-slate-500">Swipe or tap to view demos — videos, live embeds, code sandboxes</p>

              <Card>
                <div className="relative overflow-hidden rounded-xl">
                  <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${galleryIndex*100}%)` }}>
                    {portfolioProjects.map((p, idx)=> (
                      <div key={p.id} className="min-w-full p-3">
                        <div className="h-40 bg-black rounded-lg overflow-hidden flex items-center justify-center text-white">
                          {/* embed video iframe (YouTube) */}
                          <iframe title={`demo-${p.id}`} src={p.demo} className="w-full h-full" frameBorder="0" allowFullScreen />
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <div>
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-xs text-slate-500">{p.description}</div>
                          </div>
                          <div className="text-xs text-slate-500">{idx+1}/{portfolioProjects.length}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* gallery controls */}
                  <button onClick={() => setGalleryIndex(Math.max(0, galleryIndex-1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full">◀</button>
                  <button onClick={() => setGalleryIndex(Math.min(portfolioProjects.length-1, galleryIndex+1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full">▶</button>
                </div>

                <div className="mt-3 flex gap-2">
                  <button onClick={()=> setTab('portfolio')} className="py-2 rounded bg-white shadow flex-1">Back</button>
                  <a href="/mnt/data/AutoHire_AI_Freelancer_Pitch_Colored.pdf" className="py-2 rounded bg-blue-600 text-white px-3">Download Pitch</a>
                </div>
              </Card>
            </section>
          )}


          {/* LEARNING PATHS & COURSES */}
          {tab === 'learning' && (
            <section>
              <h3 className="text-sm font-semibold">Learning Paths</h3>
              <p className="text-xs text-slate-500">Courses & certifications from partners</p>

              <Card>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">React Advanced — 12h</div>
                      <div className="text-xs text-slate-500">Partner: Udemy</div>
                    </div>
                    <button className="py-1 px-2 rounded bg-blue-600 text-white text-xs">Enroll</button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">ML Ops Basics — 8h</div>
                      <div className="text-xs text-slate-500">Partner: Coursera</div>
                    </div>
                    <button className="py-1 px-2 rounded bg-blue-600 text-white text-xs">Enroll</button>
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* FINANCIAL SUITE */}
          {tab === 'finance' && (
            <section>
              <h3 className="text-sm font-semibold">Financial Suite</h3>
              <p className="text-xs text-slate-500">Invoices, expenses & payouts</p>

              <Card>
                <div className="space-y-2">
                  {invoices.map(inv => (
                    <div key={inv.id} className="flex justify-between items-center bg-slate-50 p-2 rounded">
                      <div>
                        <div className="font-semibold">{inv.id} • {inv.to}</div>
                        <div className="text-xs text-slate-500">${inv.amount}</div>
                      </div>
                      <div className="text-xs text-slate-500">{inv.status}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-blue-600 text-white">Create Invoice</button>
                  <button className="py-2 px-3 rounded-lg bg-white shadow">Export</button>
                </div>
              </Card>
            </section>
          )}

          {/* COMMUNITY */}
          {tab === 'community' && (
            <section>
              <h3 className="text-sm font-semibold">Community</h3>
              <p className="text-xs text-slate-500">Forums & Mentorship</p>

              <Card>
                <div className="space-y-2">
                  {discussions.map(d => (
                    <div key={d.id} className="flex justify-between items-center bg-slate-50 p-2 rounded">
                      <div className="font-semibold">{d.title}</div>
                      <div className="text-xs text-slate-500">{d.replies} replies</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <button className="py-2 rounded-lg bg-blue-600 text-white">Start Discussion</button>
                </div>
              </Card>
            </section>
          )}

          {/* PROJECT SCOPING WIZARD */}
          {tab === 'scoping' && (
            <section>
              <h3 className="text-sm font-semibold">Project Scoping Wizard</h3>
              <p className="text-xs text-slate-500">AI-guided templates to define scope & budget</p>

              <Card>
                <div className="space-y-2">
                  <div className="text-xs">Project Title</div>
                  <input className="w-full p-2 rounded bg-slate-50" placeholder="E-commerce landing page" />
                  <div className="text-xs">Estimated Budget</div>
                  <input className="w-full p-2 rounded bg-slate-50" placeholder="$1000 - $3000" />
                  <div className="text-xs">Timeline</div>
                  <input className="w-full p-2 rounded bg-slate-50" placeholder="4 weeks" />
                </div>
                <div className="mt-3">
                  <button className="py-2 rounded-lg bg-blue-600 text-white">Generate Scope</button>
                </div>
              </Card>
            </section>
          )}

          {/* TEAM COLLABORATION */}
          {tab === 'team' && (
            <section>
              <h3 className="text-sm font-semibold">Team Collaboration</h3>
              <p className="text-xs text-slate-500">Tasks, Kanban & shared files</p>

              <Card>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-50 p-2 rounded">To Do</div>
                  <div className="flex-1 bg-slate-50 p-2 rounded">In Progress</div>
                  <div className="flex-1 bg-slate-50 p-2 rounded">Done</div>
                </div>
                <div className="mt-3 text-xs text-slate-500">Drag & drop in a full app. (UI placeholder)</div>
              </Card>
            </section>
          )}

          {/* LEGAL TEMPLATES */}
          {tab === 'legal' && (
            <section>
              <h3 className="text-sm font-semibold">Legal Templates</h3>
              <p className="text-xs text-slate-500">Contracts & NDAs</p>

              <Card>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
                    <div className="text-sm">Standard Contract</div>
                    <button className="py-1 px-2 rounded bg-white shadow text-xs">Use</button>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
                    <div className="text-sm">NDA Template</div>
                    <button className="py-1 px-2 rounded bg-white shadow text-xs">Use</button>
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* PROJECT PROGRESS DASHBOARD */}
          {tab === 'progress' && (
            <section>
              <h3 className="text-sm font-semibold">Project Progress</h3>
              <p className="text-xs text-slate-500">Milestones, burn-down & forecasts</p>

              <Card>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs"><div>Landing Page</div><div>60%</div></div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-1 overflow-hidden"><div className="h-2 bg-blue-600" style={{width:'60%'}} /></div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs"><div>Mobile App</div><div>40%</div></div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-1 overflow-hidden"><div className="h-2 bg-amber-500" style={{width:'40%'}} /></div>
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* CUSTOM: MENTOR MATCH */}
          {tab === 'mentor' && (
            <section>
              <h3 className="text-sm font-semibold">Mentor Match (Custom)</h3>
              <p className="text-xs text-slate-500">Find senior mentors for career growth</p>

              <Card>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
                    <div className="font-semibold">Alex Johnson — Senior PM</div>
                    <button className="py-1 px-2 rounded bg-blue-600 text-white text-xs">Request</button>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
                    <div className="font-semibold">Priya Singh — Lead ML Eng</div>
                    <button className="py-1 px-2 rounded bg-blue-600 text-white text-xs">Request</button>
                  </div>
                </div>
              </Card>
            </section>
          )}

        </main>

        {/* BOTTOM NAV */}
        <nav className="fixed bottom-4 z-50 left-0 right-0 mx-auto max-w-md px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow grid grid-cols-4 gap-2">
            <button onClick={() => setTab('home')} className={`py-2 ${tab==='home' ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>Home</button>
            <button onClick={() => setTab('aimatch')} className={`py-2 ${tab==='aimatch' ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>AI Match</button>
            <button onClick={() => setTab('meeting')} className={`py-2 ${tab==='meeting' ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>Meet</button>
            <button onClick={() => setTab('calendar')} className={`py-2 ${tab==='calendar' ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>Calendar</button>
          </div>
        </nav>

      </div>
    </div>
  );
}
