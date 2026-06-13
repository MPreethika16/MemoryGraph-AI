# MemoryGraph-AI

---

## Attendee Details

**Name:** Preethika
**GitHub Username:** MPreethika16
**LinkedIn Profile:** [\[Insert your LinkedIn Link here\]](https://www.linkedin.com/in/preethika-manepally/)
**GitHub Project Repository:** https://github.com/MPreethika16/MemoryGraph-AI

---

## Problem Statement Selected

Intelligent Slack Knowledge Base

---

## Project Description

MemoryGraph-AI is an Organizational Memory Intelligence Platform. It goes beyond simple document search by actively extracting meaning from uploaded data. It is built for team leads, engineering managers, and executives to combat organizational knowledge loss (the "bus factor"). Instead of just returning search results, it extracts decisions, identifies key stakeholders, calculates knowledge concentration risks, and flags contradictions across policies and documents. 

---

## Approach

I realized that the standard RAG (Retrieval-Augmented Generation) approach—where a user types a query and gets a summarized answer—is insufficient for true organizational intelligence. 

I designed a pipeline that performs "active ingestion":
1. When a document is uploaded, it is embedded using `gemini-embedding-2` for standard semantic search.
2. Simultaneously, `gemini-2.5-flash` analyzes the document structurally to extract decisions, stakeholders, and risks.
3. This structured data immediately hydrates a live command center (Dashboard) via React Context, giving leaders instant visibility into "Knowledge Concentration" (e.g., "Rahul owns 87% of the knowledge context for this project").
This approach is useful because it moves knowledge management from a passive "search" paradigm to an active "intelligence and risk-monitoring" paradigm.

---

## Tech Stack and Tools Used

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide React
**Backend:** Node.js, Express, multer, pdf-parse
**Database:** Supabase (PostgreSQL with pgvector)
**AI Tools/API:** Google Gemini (`gemini-2.5-flash`, `gemini-embedding-2`)
**Cloud/Deployment:** Vercel (Frontend) / Supabase Cloud (Database & Vectors)
**Other Tools:** GitHub, Antigravity IDE

---

## Key Features

1. **AI Discovery Panel:** Instantly extracts and visualizes Decisions, Stakeholders, Projects, and Risks from uploaded documents.
2. **Knowledge Loss Risk Monitor:** Automatically calculates knowledge concentration to warn management if critical project context is isolated to a single employee.
3. **Contradiction Detection & Confidence Scoring:** When querying the MemoryGraph, the AI synthesizes an answer, provides a trust score, and explicitly flags if it found conflicting information across different sources.

---

## What is Working?

- The end-to-end ingestion pipeline: PDF Upload -> Text Extraction -> Chunking -> Vector Storage in Supabase.
- Active AI Extraction: Gemini successfully extracts decisions and stakeholders during upload.
- Dynamic Dashboard: The UI instantly updates to reflect the newly discovered insights without page reloads.
- The `/ask` RAG query endpoint successfully searches vectors and generates synthesized answers.

---

## What is Still in Progress?

- **Decision Replay Tracing:** The UI for the Decision Replay timeline is built, but the backend traversal logic to link multiple documents into a causal graph is still in progress.
- **Ambient Connectors:** Expanding the ingestion pipeline to automatically pull from Slack, Jira, and GitHub, rather than relying on manual PDF uploads.

---

## Screenshots or Demo

**Deployed Link:** https://memory-graph-ai.vercel.app
**Demo Video Link:** https://drive.google.com/file/d/1Jx_Mtn_YjOUn6gUmVuHrEDxRkdTdKgda/view?usp=sharing
**Screenshots:** [Insert Links Here]

---

## Challenges Faced

- **Vector Dimension Mismatches:** I initially faced errors storing embeddings in Supabase because the default Gemini embedding output size didn't match the database schema. I resolved this by explicitly configuring the `gemini-embedding-2` model to output 768 dimensions to align with the `vector(768)` Supabase column.
- **ESM vs CommonJS with PDF Extraction:** Setting up `pdf-parse` in a modern TypeScript environment caused some buffer/stream issues, which I fixed by adjusting the import methods and passing raw `Uint8Array` buffers directly.

---

## Learnings

- How to build a full-stack Retrieval-Augmented Generation (RAG) app from scratch.
- Deep integration with Google Gemini SDKs, specifically understanding the difference between generating semantic embeddings and structured JSON object extraction.
- Using React Context to instantly reflect backend data processing without polling or refreshing.

---

## Future Improvements

- If I had more time, I would build the Slack Bot integration to make ingestion completely ambient. The goal is for the graph to build itself as developers chat, without them ever having to manually upload a document.

---

## Final Note

MemoryGraph-AI aims to shift the paradigm. We don't need better search engines for our company data; we need an intelligence layer that tells us what decisions we've made, who made them, and what happens if they leave.
