Yes. For this project, your `project-rules.md` should tell Antigravity **what you're building, how the system should behave, and what engineering rules to follow**. It should not contain every implementation detail yet.

# Love NEET — Project Rules

## 1. Project Overview

Build a production-quality online test series platform called **Love NEET**.

The platform allows an administrator to upload problem-set PDFs. These PDFs may contain:

* Text
* Images
* Mathematical equations
* Diagrams
* Tables
* Mixed text and images

The system processes the uploaded PDF and converts the questions into a structured **MCQ test series**.

Candidates can then take the tests online, submit their answers, receive their score, and review their performance.

The platform must be designed for reliability, accuracy, scalability, and a clean student experience.

---

# 2. Core Product Flow

The primary workflow is:

```text
Admin uploads PDF
        ↓
PDF processing
        ↓
Extract text + images + structure
        ↓
Identify questions
        ↓
Generate/structure MCQs
        ↓
Admin reviews questions
        ↓
Admin publishes test
        ↓
Candidate starts test
        ↓
Candidate answers questions
        ↓
Timer runs
        ↓
Candidate submits test
        ↓
Evaluation
        ↓
Negative marking
        ↓
Score + result
        ↓
Performance analysis
```

The system must never blindly publish AI-generated questions without an opportunity for administrator review.

---

# 3. User Roles

The application must support at least two roles.

## Admin

Administrators can:

* Upload problem-set PDFs
* Process PDFs
* Review extracted questions
* Edit questions
* Edit options
* Set the correct answer
* Set marks
* Set negative marks
* Set test duration
* Schedule/publish tests
* Unpublish tests
* Delete tests
* View candidate results
* View test statistics

## Candidate

Candidates can:

* Register/login
* View available test series
* View test instructions
* Start a test
* Answer MCQs
* Navigate between questions
* Mark questions for review
* See remaining time
* Submit the test
* Automatically submit when time expires
* View score after submission
* Review attempted/unattempted questions when allowed
* View performance statistics

---

# 4. PDF Processing

PDF processing is a critical part of the application.

The system must support PDFs containing both text and images.

Do not assume that every PDF is text-based.

The processing pipeline should be capable of handling:

```text
PDF
 ↓
PDF validation
 ↓
Page extraction
 ↓
Text extraction
 ↓
Image extraction
 ↓
OCR when required
 ↓
Question detection
 ↓
Question + options + answer mapping
```

If a page contains an image-based question, preserve the image and associate it with the correct question.

Images may contain:

* Biology diagrams
* Chemistry structures
* Physics diagrams
* Graphs
* Mathematical expressions
* Tables
* Figures

Do not discard visual information during processing.

---

# 5. Question Structure

Every question should ultimately be represented as structured data.

A question should support:

* Question text
* Optional question image
* Four or more options when required
* Correct answer
* Explanation
* Marks
* Negative marks
* Question number
* Subject
* Topic
* Difficulty
* Source PDF/page reference

Example conceptual structure:

```text
Question
├── text
├── image
├── options[]
├── correctAnswer
├── explanation
├── marks
├── negativeMarks
├── subject
├── topic
├── difficulty
└── sourcePage
```

Do not store questions only as raw HTML.

Questions must be structured so they can be reused across multiple test series.

---

# 6. AI Usage

AI may be used for:

* Understanding extracted content
* Identifying questions
* Structuring questions
* Extracting options
* Identifying possible answers
* Generating explanations
* Classifying subject/topic/difficulty

However:

**AI output must never automatically be considered authoritative.**

The system should provide an admin review step.

The admin must be able to:

* Edit the question
* Edit options
* Change the correct answer
* Change marks
* Change negative marks
* Replace/remove an image
* Add an explanation
* Delete the question

---

# 7. Test Configuration

Administrators must be able to configure each test independently.

At minimum support:

```text
Test Name
Description
Instructions
Duration
Start Time
End Time
Total Questions
Marks Per Question
Negative Marks
Passing Score
Subjects
Status
```

The system must support configurable negative marking.

Examples:

```text
Correct answer  → +4
Wrong answer    → -1
Unattempted     → 0
```

But the values must NOT be hardcoded.

Different tests may use different marking schemes.

---

# 8. Test Timer

The test timer is a critical feature.

The timer must be based on the server/test start time rather than relying only on the candidate's browser clock.

The system should handle:

* Page refresh
* Temporary network failure
* Browser tab changes
* Candidate reconnecting
* Timer expiration

When the test duration expires:

```text
Timer reaches 0
      ↓
Automatically submit test
      ↓
Evaluate answers
      ↓
Generate result
```

Candidates must not be able to extend the test by manipulating the browser clock.

---

# 9. Test Attempt Rules

A candidate's answers must be persisted during the test.

Do not rely only on React/browser memory.

The system should protect against accidental data loss caused by:

* Page refresh
* Browser crash
* Network interruption
* Temporary disconnection

The server must validate the final submission.

Never trust:

* Client-side score
* Client-side timer
* Client-provided marks
* Client-provided correct answers

The server must calculate the final result.

---

# 10. Evaluation

The backend must calculate:

```text
Correct Answers
Wrong Answers
Unattempted Questions
Positive Marks
Negative Marks
Final Score
Percentage
```

Conceptually:

```text
Score =
(correct × positiveMarks)
-
(wrong × negativeMarks)
```

The exact calculation must come from the test configuration.

Never calculate the final score exclusively on the frontend.

---

# 11. Security

The application must follow secure engineering practices.

Never expose:

* API keys
* Database credentials
* JWT secrets
* OAuth secrets
* Admin credentials

in frontend code.

Use environment variables for secrets.

Validate all incoming data on the server.

Admin APIs must require authentication and authorization.

Candidates must not be able to:

* Access admin APIs
* Modify questions
* Modify correct answers
* Modify marks
* Modify their score
* Submit another candidate's test
* Access unpublished tests

---

# 12. Database Design

Use a proper relational/document data model rather than storing the entire application state in a single document.

At minimum, the architecture should account for:

```text
User
Admin
TestSeries
Test
Question
Option
TestAttempt
Answer
Result
PDF
```

Questions should be reusable.

A question should not need to be duplicated simply because it appears in another test.

---

# 13. Admin Workflow

The preferred admin workflow is:

```text
Upload PDF
    ↓
Process PDF
    ↓
Review extracted questions
    ↓
Fix AI/extraction errors
    ↓
Configure test
    ↓
Preview test
    ↓
Publish
```

The administrator must have a clear indication of:

* Processing status
* Failed questions
* Questions requiring review
* Missing answers
* Missing options
* Missing images

Do not allow publishing when critical question data is incomplete.

---

# 14. Candidate Test Interface

The candidate interface should prioritize simplicity and speed.

The test screen should contain:

```text
------------------------------------------------
Test Name                     Remaining Time
------------------------------------------------

Question

[Optional Image]

A. Option
B. Option
C. Option
D. Option

------------------------------------------------
[Previous] [Mark for Review] [Next]

Question Navigator
1  2  3  4  5  6  7 ...
------------------------------------------------
```

Question states should be visually distinguishable:

* Not visited
* Visited
* Answered
* Marked for review
* Answered + marked for review

The interface should work well on desktop and mobile.

---

# 15. Results

After submission, candidates should see:

```text
Final Score
Percentage
Correct
Wrong
Unattempted
Total Questions
Time Taken
```

Where permitted, provide question-level analysis.

Example:

```text
Question 1 → Correct
Question 2 → Wrong
Question 3 → Unattempted
```

The result page should be clear and easy to understand.

---

# 16. UI/UX

Brand:

**Love NEET**

The design should feel appropriate for a serious NEET preparation platform.

Prioritize:

* Clean interface
* Strong readability
* Minimal distractions
* Responsive design
* Accessible colors
* Clear typography
* Fast navigation
* Mobile compatibility

Avoid unnecessary animations and visual clutter.

The candidate should always understand:

1. Which question they are answering
2. Which questions they have attempted
3. How much time remains
4. How to submit the test

---
# Visual Theme & Branding

## Brand Identity

The website name is **Love NEET**.

The visual identity should follow a **modern doctor/medical education theme** inspired by:

* Doctors
* Medical colleges
* NEET preparation
* Healthcare
* Clinical environments
* Professional medical education

The design should feel **trustworthy, clean, professional, calm, and academic**.

It should look like a serious medical education platform, not a generic quiz website.

## Visual Direction

Use a modern medical/doctor aesthetic throughout the application.

Preferred visual elements:

* Doctor/medical-inspired illustrations
* Subtle healthcare imagery
* Medical icons
* Clean cards
* Clinical-style layouts
* Professional dashboards
* Subtle medical patterns where appropriate
* Anatomy/biology-inspired visual elements when relevant

Avoid excessive medical imagery that makes the interface look like a hospital management system.

The product is primarily a **NEET preparation platform**, so education and test-taking should remain the primary focus.

## Color Direction

Prefer a medical-inspired palette built around:

* White
* Clean blue
* Medical teal
* Soft cyan
* Subtle green
* Light neutral backgrounds

Use strong contrast for important actions and readable text.

Avoid:

* Excessive neon colors
* Extremely dark themes
* Aggressive gradients
* Overly saturated backgrounds
* Random colors that conflict with the medical identity

The final palette should feel similar to a modern medical education/productivity platform.

## Typography

Typography should prioritize:

* Excellent readability
* Professional appearance
* Clear hierarchy
* Easy reading during long test sessions

Use a modern sans-serif font.

Questions and answer options must remain highly readable on both desktop and mobile.

## Illustrations & Images

When illustrations are used, prefer imagery related to:

* Doctors
* Medical students
* NEET preparation
* Biology
* Anatomy
* Science
* Medical education

Use illustrations intentionally.

Do not add decorative images simply to fill empty space.

## Candidate Experience

During an actual test, minimize decorative elements.

The test interface should prioritize:

1. Question readability
2. Answer selection
3. Remaining time
4. Question navigation
5. Test progress

The doctor/medical theme should remain visible through subtle branding, colors, icons, and typography without distracting the candidate.

## Consistency

The medical/doctor theme must remain consistent across:

* Landing page
* Login/signup
* Candidate dashboard
* Test listing
* Test instructions
* Test interface
* Results page
* Admin dashboard
* PDF/question review
* Settings
* Error pages
* Empty states

Do not introduce unrelated visual styles on individual pages.

## Design Principle

**Love NEET should feel like a premium medical education platform designed for future doctors.**

The visual language should communicate:

**Medical + Education + Trust + Performance + Professionalism**


# 17. Architecture Rules

Follow a clean separation of concerns.

Prefer:

```text
Frontend
    ↓
API
    ↓
Business Logic
    ↓
Database
```

Do not put business logic directly inside UI components.

Keep:

* UI logic
* API communication
* business logic
* database operations
* PDF processing
* AI processing

properly separated.

---

# 18. Development Principles

Before implementing a feature:

1. Understand the existing architecture.
2. Search for existing code that solves part of the problem.
3. Reuse existing components/utilities.
4. Avoid unnecessary dependencies.
5. Make small, testable changes.
6. Validate both success and failure cases.

Do not rewrite working parts of the application without a clear reason.

Do not introduce an abstraction unless it provides real value.

---

# 19. Error Handling

Errors must be handled explicitly.

Examples:

```text
PDF upload failure
PDF parsing failure
OCR failure
AI extraction failure
Missing question
Missing option
Invalid answer
Database failure
Network failure
Test submission failure
Timer expiration
Authentication failure
```

User-facing errors should be understandable.

Developer errors should contain enough information for debugging.

Never silently swallow errors.

---

# 20. Testing

Critical functionality must be tested.

At minimum test:

* PDF upload
* PDF processing
* Image extraction
* Question extraction
* Admin editing
* Test creation
* Test publishing
* Candidate test start
* Answer persistence
* Timer
* Automatic submission
* Manual submission
* Negative marking
* Score calculation
* Result generation
* Authorization

Particularly test edge cases involving timer expiration and network interruptions.

---

# 21. Performance

The platform should remain responsive even with large question sets.

Avoid:

* Loading every question unnecessarily
* Processing large PDFs synchronously inside normal API requests
* Sending unnecessary data to the browser
* Repeated database queries
* Large frontend state objects when unnecessary

Long-running PDF/AI processing should preferably use a background/job-based approach as the system grows.

---

# 22. File Storage

Uploaded PDFs and extracted images should not be treated as permanent temporary files on the application server.

Use an appropriate storage system when implementing production deployment.

Store references/URLs in the database.

The `.tmp/` directory should only contain disposable processing artifacts.

---

# 23. Environment Variables

All secrets must be stored in `.env`.

Examples:

```text
DATABASE_URL=
JWT_SECRET=
AI_API_KEY=
STORAGE_API_KEY=
STORAGE_SECRET=
```

Never commit `.env` to Git.

Never expose secrets through frontend environment variables unless they are explicitly safe to expose.

---

# 24. WAT Integration

This project follows the WAT architecture.

```text
WORKFLOWS
    ↓
AGENT
    ↓
TOOLS
```

Workflows define repeatable procedures.

The Agent coordinates decisions.

Tools perform deterministic execution.

For example:

```text
Admin uploads PDF
        ↓
Workflow: process_problem_set
        ↓
Agent determines required steps
        ↓
Tool: extract_pdf.py
        ↓
Tool: extract_images.py
        ↓
Tool: process_questions.py
        ↓
AI validation
        ↓
Admin review
        ↓
Test creation
```

Always check for existing tools before creating new ones.

---

# 25. Source of Truth

The backend/database is the source of truth for:

* Tests
* Questions
* Correct answers
* Marks
* Negative marks
* Test timing
* Candidate attempts
* Scores
* Results

Never treat frontend state as authoritative.

---

# 26. Production Mindset

Build this as a real product, not a demo.

Prioritize:

* Correctness
* Security
* Reliability
* Maintainability
* Scalability
* Good UX
* Clear architecture

Do not take shortcuts that compromise test integrity.

The most important requirement is:

**A candidate must not be able to manipulate the client and change their final score or test timing.**

---

# 27. Development Rule

Do not build the entire application at once.

Implement incrementally.

Recommended order:

```text
1. Project foundation
2. Authentication
3. Admin dashboard
4. PDF upload
5. PDF processing
6. Question review
7. Test creation
8. Test configuration
9. Candidate test interface
10. Timer
11. Answer persistence
12. Test submission
13. Evaluation + negative marking
14. Results
15. Performance analytics
16. Production hardening
```

Each stage should be tested before moving to the next stage.
