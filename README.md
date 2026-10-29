# Supportly AI — Intelligent Customer Support Agent

A modern, responsive, and interactive AI customer support chatbot built with **React**, **Vite**, **Tailwind CSS**, and **Lucide React**.

Inspired by industry-leading customer experience interfaces (such as Intercom and Zendesk), **Supportly AI** resolves common issues, answers FAQs, tracks packages with real-time visual progress bars, explains refund policies with an interactive return label generator, troubleshoots payment/login issues, and seamlessly escalates complex requests to human support specialists.

---

## 🌟 Key Features

### 1. Modern, Responsive Chat UI
- **Clean Aesthetic**: Crisp white canvas with soft blue accents, subtle shadows, rounded borders, and readable typography (*Plus Jakarta Sans*).
- **Header with Live Status**: Animated glowing green online indicator, bot avatar, reply-time badge, audio sound toggle, demo modal trigger, and clear-chat confirmation.
- **Message Bubbles & Timestamps**: Formatted message streams, distinct user/bot bubbles, message copying, and helpfulness feedback thumbs (👍 / 👎).
- **Realistic Typing Indicator**: Three-dot wave animation with "Supportly AI is typing..." delay.
- **Auto-Scroll & Session Persistence**: Chat history stays intact while the tab remains open.

### 2. Clickable Quick-Action Cards
The 4 main support actions are immediately accessible:
1. 📦 **Track My Order** — Checks shipment status, carrier, and estimated delivery.
2. 🔄 **Refund & Returns** — Explains 30-day money-back guarantee and generates prepaid return labels.
3. 💳 **Payment Issues** — Interactive troubleshooting checklist for card declines and temporary holds.
4. 🎧 **Talk to Support** — Live agent escalation ticket generator (`TCK-XXXX`) with wait time estimates and callback requests.

### 3. Rich Interactive Widget Responses
- **Order Tracker Card**:
  - Displays Order ID, product details, and price.
  - 4-stage visual progress bar (*Placed → Processing → Shipped → Delivered*).
  - Carrier info (FedEx, UPS, DHL), tracking number, and delivery date.
  - Expandable full tracking history timeline.
- **Refund Policy Card**:
  - 30-day return policy and condition criteria.
  - 4-step return roadmap.
  - Functional **Generate Free Return Shipping Label (RMA)** button with simulated PDF download.
- **Payment Troubleshooting Card**:
  - Interactive verification checklist (ZIP code match, 3D Secure/OTP, limits).
  - Explanation of temporary pre-authorization holds.
- **Human Escalation Card**:
  - Assigned agent (*Sarah Jenkins - Senior Support Specialist*).
  - Real-time queue status (#1 in line, wait time < 2 mins).
  - Functional callback request form.

### 4. Smart Multi-Turn Conversational Engine
- **Intent Recognition**: Naturally handles order tracking, returns, payments, cancellations, login/account issues, shipping policies, greetings, and closing remarks.
- **Multi-Turn Context Tracking**: If a user asks *"Where is my order?"* without an ID, the agent prompts for one and captures the subsequent response.
- **Suggested Next Actions (Chips)**: Dynamic pills at the bottom of bot responses allowing one-click follow-up questions.
- **Graceful Fallback**: Friendly guidance when queries are outside its scope.
- **Built-in Sound Effects**: Subtle, high-quality audio pings via Web Audio API on send and receive (no external sound files required, easily muted).

---

## 📦 Mock Orders Database (For Demo & Testing)

| Order ID | Product | Status | Carrier | Est. Delivery / Status |
| :--- | :--- | :--- | :--- | :--- |
| `ORD-8492` | Sony WH-1000XM5 Wireless Headphones | **Shipped** (75%) | FedEx Priority | Tomorrow by 4:00 PM |
| `ORD-1024` | Apple MacBook Air 13" M3 | **Delivered** (100%) | UPS Express | Delivered yesterday |
| `ORD-5501` | Nike Air Zoom Pegasus 40 | **Processing** (35%) | DHL SmartMail | Estimated in 3 days |
| `ORD-3320` | Logitech MX Master 3S Mouse | **Out for Delivery** (90%) | Amazon Shipping | Today before 8:00 PM |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to see Supportly AI live.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized static production build in the `dist/` directory.

### 4. Preview the Production Build
```bash
npm run preview
```

---

## 🏗️ Project Architecture

```
customer-support-agent/
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # Dependencies & scripts
├── tailwind.config.js           # Tailwind CSS theme configuration
├── postcss.config.js            # PostCSS plugins
├── vite.config.js               # Vite build configuration
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main application orchestrator & chat canvas
│   ├── index.css                # Base Tailwind & custom scrollbar styles
│   ├── data/
│   │   └── mockData.js          # Mock orders database, quick actions, policies
│   ├── services/
│   │   └── agentEngine.js       # Intent detection & conversation engine
│   ├── utils/
│   │   └── sound.js             # Web Audio API chime & pop generators
│   └── components/
│       ├── Header.jsx           # Top navbar with status & actions
│       ├── QuickActions.jsx     # 4 Quick assistance cards
│       ├── ChatMessage.jsx      # Message bubble with markdown & widgets
│       ├── TypingIndicator.jsx  # 3-dot bouncing wave indicator
│       ├── ChatInput.jsx        # Input bar with send button & quick suggestions
│       ├── OrderTrackerCard.jsx # Interactive shipment status card
│       ├── RefundPolicyCard.jsx # 30-day refund & label generator card
│       ├── PaymentHelpCard.jsx  # Interactive payment checklist card
│       ├── EscalationCard.jsx   # Live human support ticket card
│       └── SampleQueriesModal.jsx # Demo modal with test cases & guide
```

---

## 🔌 Connecting a Real LLM (Gemini / OpenAI)

Supportly AI was architected so you can plug in any LLM API with zero frontend refactoring.

Open `src/services/agentEngine.js` and update the `generateAgentResponse` function:

```javascript
// Example using Google Gemini API
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateAgentResponse(userMessage, conversationContext) {
  // If user is tracking an order, keep using the structured OrderTrackerCard
  const orderId = extractOrderId(userMessage);
  if (orderId && MOCK_ORDERS[orderId]) {
    // Return structured order widget
  }

  // Otherwise, invoke Gemini for conversational responses:
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(userMessage);
  return {
    text: result.response.text(),
    suggestions: ['Track my order', 'Return policy', 'Talk to human'],
  };
}
```

---

## 📄 License
MIT License. Free to use, adapt, and build upon for educational and commercial projects.

