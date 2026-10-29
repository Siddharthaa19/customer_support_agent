import { MOCK_ORDERS, REFUND_POLICY } from '../data/mockData';

// Helper to extract an order ID like ORD-8492 or 8492 from user message
export function extractOrderId(text) {
  if (!text) return null;
  const directMatch = text.match(/\bORD[- ]?(\d{4})\b/i);
  if (directMatch) {
    return `ORD-${directMatch[1]}`;
  }
  // Check for standalone 4-digit numbers if text is short
  if (text.trim().match(/^\d{4}$/)) {
    return `ORD-${text.trim()}`;
  }
  return null;
}

/**
 * Intelligent customer support agent response generator.
 * Designed to easily switch to an LLM endpoint (Gemini / OpenAI) if desired.
 */
export async function generateAgentResponse(userMessage, conversationContext = {}) {
  // Simulate natural typing delay (450ms - 900ms)
  await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 300));

  const cleanText = userMessage.trim().toLowerCase();
  const foundOrderId = extractOrderId(userMessage);

  // 1. Contextual continuity: User was prompted for an Order ID in previous turn
  if (conversationContext.pendingAction === 'awaiting_order_id') {
    if (foundOrderId && MOCK_ORDERS[foundOrderId]) {
      const order = MOCK_ORDERS[foundOrderId];
      return {
        text: `Here are the latest tracking details for your order **${order.id}** (${order.item}). It is currently **${order.status}** with ${order.carrier}.`,
        cardType: 'order',
        orderData: order,
        suggestions: [
          'Change delivery address',
          'Return this item',
          'Track another order',
          'Talk to an agent',
        ],
        updatedContext: { pendingAction: null, currentOrder: order },
      };
    } else if (foundOrderId) {
      return {
        text: `I searched for **${foundOrderId}**, but I couldn't find an active order with that ID in our system. \n\nPlease double-check the number from your receipt or confirmation email. Try one of our demo sample orders below:`,
        suggestions: [
          'Track ORD-8492',
          'Track ORD-1024',
          'Track ORD-5501',
          'Speak with human support',
        ],
        updatedContext: { pendingAction: 'awaiting_order_id' },
      };
    }
  }

  // 2. Direct Order Tracking intent with order ID provided
  if (foundOrderId) {
    if (MOCK_ORDERS[foundOrderId]) {
      const order = MOCK_ORDERS[foundOrderId];
      return {
        text: `Found your order **${order.id}**! Here is the real-time shipping information for your ${order.item}.`,
        cardType: 'order',
        orderData: order,
        suggestions: [
          order.status === 'Delivered' ? 'Request return/refund' : 'Estimated delivery time',
          'Need invoice copy',
          'Track another order',
          'Contact courier support',
        ],
        updatedContext: { pendingAction: null, currentOrder: order },
      };
    } else {
      return {
        text: `I couldn't locate order **${foundOrderId}**. You can test our live order tracking with our demo orders:`,
        suggestions: [
          'Track ORD-8492 (FedEx In-Transit)',
          'Track ORD-1024 (Delivered)',
          'Track ORD-5501 (Warehouse Processing)',
          'Talk to a live agent',
        ],
        updatedContext: { pendingAction: 'awaiting_order_id' },
      };
    }
  }

  // 3. User wants to track an order but didn't provide an ID
  if (
    cleanText.includes('track') ||
    cleanText.includes('where is my order') ||
    cleanText.includes('where is my package') ||
    cleanText.includes('shipping status') ||
    cleanText.includes('delivery status') ||
    cleanText.includes('order status')
  ) {
    return {
      text: "I would be happy to check your shipment status! 📦\n\nPlease enter your **Order ID** (for example: `ORD-8492`). You can also click any of the demo orders below to test instantly:",
      suggestions: [
        'Track ORD-8492',
        'Track ORD-1024',
        'Track ORD-5501',
        'Track ORD-3320',
      ],
      updatedContext: { pendingAction: 'awaiting_order_id' },
    };
  }

  // 4. Refund & Returns Intent
  if (
    cleanText.includes('refund') ||
    cleanText.includes('return') ||
    cleanText.includes('exchange') ||
    cleanText.includes('money back') ||
    cleanText.includes('rma') ||
    cleanText.includes('send back')
  ) {
    return {
      text: "We offer a hassle-free **30-Day Money-Back Guarantee**! 🔄\n\nIf you're not completely satisfied with your purchase, you can return items within 30 days of delivery for a full refund or exchange.",
      cardType: 'refund',
      refundData: REFUND_POLICY,
      suggestions: [
        'Track ORD-1024 (Delivered)',
        'Generate return label',
        'Refund processing timeline',
        'Talk to support',
      ],
      updatedContext: { pendingAction: 'refund_inquiry' },
    };
  }

  // 5. Payment & Billing Issues Intent
  if (
    cleanText.includes('payment') ||
    cleanText.includes('declined') ||
    cleanText.includes('charged twice') ||
    cleanText.includes('double charge') ||
    cleanText.includes('credit card') ||
    cleanText.includes('billing') ||
    cleanText.includes('checkout failed') ||
    cleanText.includes('transaction failed') ||
    cleanText.includes('invoice')
  ) {
    return {
      text: "I understand how frustrating payment hiccups can be! Here are the fastest ways to resolve common payment issues: 💳\n\n" +
        "1. **Card Declined**: Ensure your card's billing address and ZIP code match your bank statement, and that 3D Secure/OTP verification is enabled.\n" +
        "2. **Charged Twice?**: Most duplicate lines are temporary **pre-authorization holds** that disappear automatically within 24–48 hours.\n" +
        "3. **Alternative Methods**: We also accept Apple Pay, Google Pay, PayPal, and major debit/credit cards.\n\n" +
        "Would you like me to connect you with our Billing Team or verify an order charge?",
      cardType: 'payment_help',
      suggestions: [
        'Verify my last charge',
        'How to update payment method',
        'Request official VAT invoice',
        'Connect with billing support',
      ],
      updatedContext: { pendingAction: null },
    };
  }

  // 6. Account & Login Issues Intent
  if (
    cleanText.includes('login') ||
    cleanText.includes('log in') ||
    cleanText.includes('password') ||
    cleanText.includes('account') ||
    cleanText.includes('forgot') ||
    cleanText.includes('2fa') ||
    cleanText.includes('authenticator')
  ) {
    return {
      text: "Here is how to resolve account and login issues quickly: 🔐\n\n" +
        "• **Reset Password**: Click on 'Sign In' → 'Forgot Password' on the login screen. We'll send a secure password reset link to your registered email.\n" +
        "• **2FA / Verification Code**: Check your spam folder or authenticator app. Codes expire after 5 minutes.\n" +
        "• **Locked Account**: For security, accounts are temporarily paused after 5 failed attempts for 15 minutes.\n\n" +
        "Still unable to access your account? I can transfer you to an account security agent.",
      suggestions: [
        'Send password reset link',
        'Update my email address',
        'Talk to human support',
      ],
      updatedContext: { pendingAction: null },
    };
  }

  // 7. Human Support Escalation Intent
  if (
    cleanText.includes('human') ||
    cleanText.includes('agent') ||
    cleanText.includes('representative') ||
    cleanText.includes('real person') ||
    cleanText.includes('operator') ||
    cleanText.includes('talk to support') ||
    cleanText.includes('escalat') ||
    cleanText.includes('supervisor')
  ) {
    const ticketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      text: "I am connecting you with our human support team right now. A live customer care specialist will assist you shortly.",
      cardType: 'escalation',
      escalationData: {
        ticketId,
        agentName: 'Sarah Jenkins',
        agentRole: 'Senior Support Specialist',
        waitTime: '< 2 minutes',
        status: 'Connecting...',
      },
      suggestions: [
        'Leave a callback number',
        'Email ticket transcript',
        'Return to automated help',
      ],
      updatedContext: { pendingAction: 'in_escalation', ticketId },
    };
  }

  // 8. Shipping & Delivery FAQs Intent
  if (
    cleanText.includes('shipping') ||
    cleanText.includes('delivery time') ||
    cleanText.includes('how long') ||
    cleanText.includes('international') ||
    cleanText.includes('fedex') ||
    cleanText.includes('ups')
  ) {
    return {
      text: "Here is everything you need to know about our shipping options: 🚚\n\n" +
        "• **Standard Shipping**: 3–5 business days (Free on orders over $50).\n" +
        "• **Express 2-Day**: 2 business days via FedEx Priority.\n" +
        "• **Next-Day Air**: Orders placed before 1:00 PM EST ship same-day for next morning delivery.\n" +
        "• **International Shipping**: Available to over 60 countries (7–12 business days with full end-to-end tracking).",
      suggestions: [
        'Track my package',
        'Change delivery address',
        'International shipping rates',
        'Talk to support',
      ],
      updatedContext: { pendingAction: null },
    };
  }

  // 9. Cancellation Intent
  if (
    cleanText.includes('cancel') ||
    cleanText.includes('stop order') ||
    cleanText.includes('wrong address')
  ) {
    return {
      text: "Orders can be modified or cancelled **within 60 minutes** of placement before they are transmitted to our fulfillment warehouse.\n\n" +
        "If your order has already shipped, you can simply refuse delivery or use our free return portal once it arrives to get a full refund.",
      suggestions: [
        'Check if order is cancellable',
        'Change shipping address',
        'Track order status',
        'Connect with agent',
      ],
      updatedContext: { pendingAction: null },
    };
  }

  // 10. Greetings & Friendly Conversation
  if (
    cleanText.match(/^(hi|hello|hey|good morning|good afternoon|good evening|greetings)\b/)
  ) {
    return {
      text: "Hello! 👋 I'm **Supportly AI**, your 24/7 customer service assistant. \n\nI can help you track orders, process returns, troubleshoot payment or login issues, and answer questions. How can I help you today?",
      suggestions: [
        'Track My Order',
        'Refund & Returns',
        'Payment Issues',
        'Talk to Support',
      ],
      updatedContext: { pendingAction: null },
    };
  }

  // 11. Gratitude & Closing
  if (
    cleanText.includes('thank') ||
    cleanText.includes('thx') ||
    cleanText.includes('great help') ||
    cleanText.includes('awesome') ||
    cleanText.includes('bye')
  ) {
    return {
      text: "You're very welcome! 😊 I'm always here if you need anything else. Have a wonderful day!",
      suggestions: [
        'Track another order',
        'Check store policies',
        'Start new inquiry',
      ],
      updatedContext: { pendingAction: null },
    };
  }

  // 12. Fallback Response for unrecognized queries
  return {
    text: `I'm not completely sure about that specific request, but I'm here to help! \n\nYou can ask me to track your order, guide you through a return or refund, troubleshoot payments, or connect you directly with our human support team.`,
    suggestions: [
      'Track My Order',
      'Refund & Returns',
      'Payment Issues',
      'Connect with a human agent',
    ],
    updatedContext: { pendingAction: null },
  };
}

