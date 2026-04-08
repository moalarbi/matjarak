"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   🔧 إعدادات AI — غيّر provider للاتصال بـ API
   ───────────────────────────────────────────── */
const AI_CONFIG = {
  /**
   * 'mock'     → ردود تجريبية بدون API (الوضع الافتراضي)
   * 'deepseek' → DeepSeek Chat API
   * 'gemini'   → Google Gemini API
   */
  provider: "mock" as "mock" | "deepseek" | "gemini",

  // ضع مفتاح API هنا أو في .env.local
  deepseekApiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || "",
  geminiApiKey:   process.env.NEXT_PUBLIC_GEMINI_API_KEY   || "",

  systemPrompt: `أنت مساعد مبيعات ذكي متخصص في خدمة إطلاق وتدشين متجر إلكتروني على منصة سلة.

## دورك
أنت: مساعد مبيعات + تأهيل عملاء + إجابة استفسارات + تحويل للخطوة الفعلية + جمع بيانات بشكل منظم.

## أسلوبك
- تتحدث بالعربية باللهجة السعودية (لهجة الرياض، أنيقة ومفهومة)
- واضح، لبق، سريع، مقنع
- لا رسمي زيادة، ولا آلي أو ناشف
- ما تكتب رسائل طويلة جداً
- كل رد سهل، مباشر، يقود للخطوة التالية

## الخدمة
إطلاق وتدشين متجر إلكتروني على منصة سلة، وقد تشمل:
- إعداد المتجر، تصميم الواجهة، الأقسام، الصفحات الأساسية
- إضافة المنتجات، إعداد الدفع والشحن، ربط الدومين
- الصفحات القانونية، تحسين SEO أساسي، ربط التطبيقات
- تدريب العميل على إدارة المتجر
- خدمات اختيارية: محتوى، هوية بصرية، SEO متقدم، إعلانات، تصوير

## قواعد مهمة
- لا تعطِ وعود مبالغ فيها، ولا تخترع خدمات غير موجودة
- إذا سأل عن السعر: لا تعطِ رقم ثابت، اسأل 2-3 أسئلة تأهيل أولاً ثم وجّهه
- إذا كان جاهزاً: اجمع بياناته واقترح التحويل لمختص بسرعة
- إذا غير جاهز: ساعده يعرف وش الناقص ووجّهه لخطوة بسيطة

## أسئلة التأهيل (اسأل واحد في كل مرة بشكل طبيعي)
1. نوع النشاط (ملابس، عطور، رقمي، خدمات...)
2. هل متجر جديد أو عنده بيع حالي (إنستا، واتساب)
3. عدد المنتجات تقريباً
4. هل المنتجات والصور جاهزة
5. هل عنده شعار/هوية
6. موعد الإطلاق المستهدف
7. الميزانية التقريبية

## متى تحوّل للمختص
- طلب التحدث مع شخص أو طلب واتساب
- عنده مشروع غير اعتيادي
- ظهر أنه Hot Lead (عنده منتجات جاهزة + يبغى يبدأ قريب)
- أعطى بياناته واستعد

## شكل الرد المثالي
1. جواب مباشر
2. توضيح مختصر
3. خطوة تالية أو سؤال ذكي واحد

تذكر: كل رد لا يتجاوز 3-4 جمل قصيرة.`,
};

/* ─────────────────────────────────────────────
   🎨 ألوان النظام (أخضر رولكس الملكي)
   ───────────────────────────────────────────── */
const C = {
  bg:          "#050f09",
  surface:     "#0a1a10",
  surfaceHigh: "#0f2416",
  teal:        "#00a651",
  tealDim:     "#006039",
  tealGlow:    "rgba(0,166,81,0.18)",
  tealBorder:  "rgba(0,166,81,0.30)",
  white:       "#ffffff",
  whiteAlpha70:"rgba(255,255,255,0.70)",
  whiteAlpha40:"rgba(255,255,255,0.40)",
};

const ibmArabic = "'IBM Plex Sans Arabic', Arial, sans-serif";

/* ─────────────────────────────────────────────
   📨 أسئلة شائعة سريعة
   ───────────────────────────────────────────── */
const QUICK_FAQS = [
  "كم تكلفة المتجر؟",
  "ماذا تشمل الخدمة؟",
  "كم يستغرق التنفيذ؟",
  "هل يناسب نشاطي؟",
  "هل يشمل التصميم؟",
  "هل يشمل الدفع والشحن؟",
  "كيف أبدأ؟",
  "أبغى أتواصل مع مختص",
];

/* ─────────────────────────────────────────────
   🤖 طبقة API — يسهل تبديل المزوّد
   ───────────────────────────────────────────── */
async function callAI(messages: { role: string; content: string }[]): Promise<string> {

  if (AI_CONFIG.provider === "deepseek") {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_CONFIG.deepseekApiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: AI_CONFIG.systemPrompt },
          ...messages,
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? "عذراً، حدث خطأ.";
  }

  if (AI_CONFIG.provider === "gemini") {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AI_CONFIG.geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: AI_CONFIG.systemPrompt }] },
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
        }),
      }
    );
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "عذراً، حدث خطأ.";
  }

  // mock — ردود تجريبية مبنية على هيكلة سلة
  const last = messages[messages.length - 1]?.content ?? "";
  await new Promise((r) => setTimeout(r, 750));

  if (last.includes("السلام") || last.includes("هلا") || last.includes("مرحبا") || last.includes("صباح") || last.includes("مساء"))
    return "وعليكم السلام، ياهلا 👋\nنساعدك في إطلاق وتدشين متجر إلكتروني احترافي على منصة سلة.\nوش تحب تعرف؟";

  if (last.includes("تكلف") || last.includes("سعر") || last.includes("بكم") || last.includes("تكلفة"))
    return "التكلفة تعتمد على حجم المتجر ووش تحتاج فيه بالضبط، لأن فيه فرق بين متجر تأسيس بسيط ومتجر بتجهيز كامل.\nإذا تجاوبني على 3 أسئلة، أوجهك مباشرة للأنسب لك 🙌";

  if (last.includes("يستغرق") || last.includes("المدة") || last.includes("كم يوم") || last.includes("متى يجهز"))
    return "مدة التنفيذ تعتمد على نطاق المتجر وجاهزية المواد عندك.\nإذا كانت المنتجات والصور جاهزة، يكون التنفيذ أسرع بكثير. نعطيك تقدير أدق بعد ما نفهم احتياجك.";

  if (last.includes("تشمل") || last.includes("يشمل") || last.includes("وش داخل") || last.includes("ماذا يشمل"))
    return "الخدمة تشمل: إعداد المتجر على سلة، تصميم الواجهة، الأقسام، الصفحات الأساسية، ربط الدفع والشحن، والتهيئة الأساسية.\nوفيه إضافات اختيارية حسب احتياجك مثل كتابة المحتوى أو SEO متقدم.";

  if (last.includes("تصميم") || last.includes("واجهة") || last.includes("بنر"))
    return "نعم، يشمل تصميم وتجهيز واجهة المتجر والبنرات الأساسية حسب نطاق الخدمة.\nإذا تحتاج هوية كاملة أو تصميم أعمق، يكون كإضافة أو باقة أعلى.";

  if (last.includes("دفع") || last.includes("شحن") || last.includes("مدى") || last.includes("stc"))
    return "نعم، إعداد وسائل الدفع والشحن ممكن يكون ضمن الخدمة، ويشمل بوابات مثل مدى، فيزا، STC Pay، وApple Pay.\nنوضح من البداية وش المشمول بالضبط.";

  if (last.includes("يناسب") || last.includes("نشاطي") || last.includes("ينفع"))
    return "غالبًا نعم 👍 سلة تناسب كثير من الأنشطة مثل الملابس، العطور، التجميل، المنتجات الرقمية، والخدمات.\nوش نوع نشاطك؟ أوجهك بشكل أدق.";

  if (last.includes("أبدأ") || last.includes("ابدأ") || last.includes("البداية") || last.includes("الخطوة"))
    return "البداية تكون بفهم نشاطك واحتياجك، ثم نحدد المطلوب منك مثل المنتجات، الصور، الشعار، وإعدادات الدفع والشحن.\nوش نوع نشاطك؟";

  if (last.includes("مختص") || last.includes("واتساب") || last.includes("أتواصل") || last.includes("شخص") || last.includes("جاهز") || last.includes("ابدأ"))
    return "ممتاز! 🚀 رح أحولك لفريقنا على واتساب مباشرة الآن...";

  if (last.includes("غالي") || last.includes("مرتفع") || last.includes("كثير") || last.includes("ميزانية"))
    return "أتفهمك. الفرق عادة يكون في مستوى التجهيز، لأن المتجر إذا تأسس صح من البداية يوفر عليك مشاكل لاحقاً.\nإذا حاب، أوضح لك الحل الأنسب حسب ميزانيتك بدون تعقيد.";

  if (last.includes("إنستقرام") || last.includes("انستا") || last.includes("واتساب فقط"))
    return "وهذا شائع جداً بالبداية. لكن المتجر على سلة يساعدك ترتب الطلبات وتفعّل الدفع والشحن، ويرفع ثقة العميل بدل ما كل شيء يدوي.\nعندك طلبات حالية؟";

  if (last.includes("منتجات") || last.includes("صور") || last.includes("مو جاهز"))
    return "تمام، نقدر نفصلها: فيه أشياء تقدر تبدأ فيها الآن، وأشياء لازم تكتمل قبل الإطلاق مثل بيانات المنتجات والصور.\nإذا حاب، أرتب لك checklist مختصرة تساعدك تجهز أسرع.";

  if (last.includes("سيو") || last.includes("seo") || last.includes("محركات"))
    return "يشمل تهيئة أساسية تساعد على الظهور بشكل أفضل. أما SEO المتقدم للمنتجات أو الاستراتيجية الكاملة فيكون كخدمة إضافية.";

  if (last.includes("تدريب") || last.includes("دعم") || last.includes("بعد التسليم"))
    return "نعم، يشمل شرح وتدريب أساسي على إدارة المتجر على سلة حتى تكون قادر تدير الطلبات والمنتجات والإعدادات بنفسك.";

  return "شكراً على سؤالك! 🙌\nأقدر أساعدك تعرف وش الأنسب لك. وش نوع نشاطك؟";
}

/* ─────────────────────────────────────────────
   📦 Types
   ───────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: Date;
}

/* ─────────────────────────────────────────────
   🟢 Orb — الكرة الخضراء المتحركة
   ───────────────────────────────────────────── */
function GreenOrb({ size = 28 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, #4ddb8f, #00a651 50%, #006039)`,
        boxShadow: "0 0 12px rgba(0,166,81,0.6)",
        flexShrink: 0,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   💬 فقاعة رسالة
   ───────────────────────────────────────────── */
function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-2 items-end", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {!isUser && <GreenOrb size={22} />}
      <div
        style={{
          fontFamily: ibmArabic,
          fontSize: "13px",
          lineHeight: "1.6",
          maxWidth: "78%",
          padding: "8px 12px",
          borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          background: isUser
            ? `linear-gradient(135deg, ${C.teal}, ${C.tealDim})`
            : C.surfaceHigh,
          color: isUser ? C.bg : C.white,
          border: isUser ? "none" : `1px solid ${C.tealBorder}`,
          boxShadow: isUser ? `0 2px 12px rgba(0,166,81,0.3)` : "none",
          direction: "rtl",
        }}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ⌨️ مؤشر الكتابة
   ───────────────────────────────────────────── */
function TypingDots() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex gap-2 items-end"
    >
      <GreenOrb size={22} />
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "14px 14px 14px 4px",
          background: C.surfaceHigh,
          border: `1px solid ${C.tealBorder}`,
          display: "flex",
          gap: "4px",
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, display: "block" }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   🤖 المكوّن الرئيسي
   ───────────────────────────────────────────── */
export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "ياهلا 👋 أنا مساعد متجرك الذكي، أساعدك في إطلاق متجرك الإلكتروني على منصة سلة بشكل احترافي.\nوش تحب تعرف؟",
      ts: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);
  const panelRef  = useRef<HTMLDivElement>(null);

  // إغلاق عند الضغط خارج اللوحة
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (open && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // تمرير للأسفل عند رسالة جديدة
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // تركيز على الـ input عند الفتح
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // فتح واتساب مباشرة
  const openWhatsApp = useCallback((customText?: string) => {
    const msg = customText ?? "السلام عليكم، أبغى أتواصل مع مختص بخصوص إطلاق متجري على سلة 👋";
    window.open(`https://wa.me/966537311886?text=${encodeURIComponent(msg)}`, "_blank");
  }, []);

  // كلمات تشير لطلب التواصل
  const isHandoffRequest = (text: string) =>
    /مختص|واتساب|whatsapp|تواصل|اتصال|كلم|شخص|حولني|ابدأ الآن|جاهز|بدأ|ابدا/.test(text);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: trimmed, ts: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // إذا كان طلب تواصل — رد سريع + فتح واتساب
    if (isHandoffRequest(trimmed)) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "r",
          role: "assistant",
          content: "ممتاز! 🚀 رح أحولك لفريقنا على واتساب مباشرة الآن...",
          ts: new Date(),
        },
      ]);
      setTimeout(() => openWhatsApp(), 800);
      return;
    }

    setLoading(true);
    try {
      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
      const reply = await callAI(history);

      // إذا الرد يحتوي على إشارة للتحويل — افتح واتساب تلقائياً
      if (isHandoffRequest(reply)) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString() + "r", role: "assistant", content: reply, ts: new Date() },
        ]);
        setTimeout(() => openWhatsApp(), 1200);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString() + "r", role: "assistant", content: reply, ts: new Date() },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: "err", role: "assistant", content: "حدث خطأ في الاتصال. حاول مجدداً.", ts: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, openWhatsApp]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <div
      ref={panelRef}
      dir="rtl"
      className="chatbot-root"
    >
      <style>{`
        .chatbot-root {
          position: fixed;
          bottom: 16px;
          right: 16px;
          z-index: 9999;
          font-family: ${ibmArabic};
        }
        .chatbot-panel {
          width: 250px;
          height: 340px;
          margin-bottom: 8px;
        }
        @media (max-width: 480px) {
          .chatbot-root {
            bottom: 10px;
            right: 10px;
            left: 10px;
          }
          .chatbot-panel {
            width: calc(100vw - 20px);
            height: min(320px, calc(100dvh - 80px));
          }
        }
      `}</style>

      {/* ─── لوحة الشات ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{
              background: C.bg,
              border: `1px solid ${C.tealBorder}`,
              borderRadius: 14,
              boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 32px rgba(0,166,81,0.07)`,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              background: `linear-gradient(135deg, ${C.surfaceHigh}, ${C.surface})`,
              borderBottom: `1px solid ${C.tealBorder}`,
              padding: "9px 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}>
              <GreenOrb size={26} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.white }}>مساعد سلة الذكي</div>
                <div style={{ fontSize: 10, color: C.teal, display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.teal, display: "inline-block", boxShadow: "0 0 5px #00a651" }} />
                  متصل الآن
                </div>
              </div>
              {/* زر واتساب في الهيدر */}
              <button
                onClick={() => openWhatsApp()}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "4px 8px", borderRadius: 20,
                  background: "rgba(37,211,102,0.15)",
                  border: "1px solid rgba(37,211,102,0.35)",
                  color: "#25d366", fontSize: 10, fontWeight: 600,
                  fontFamily: ibmArabic, cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                واتساب
              </button>

              <button
                onClick={() => setOpen(false)}
                style={{ color: C.whiteAlpha40, fontSize: 15, lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: 4 }}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 10px", display: "flex", flexDirection: "column", gap: 9 }}>
              {messages.map((m) => <MessageBubble key={m.id} msg={m} />)}
              <AnimatePresence>{loading && <TypingDots />}</AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Quick FAQs */}
            <div style={{
              padding: "6px 10px",
              borderTop: `1px solid rgba(0,166,81,0.12)`,
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
              flexShrink: 0,
            }}>
              {QUICK_FAQS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                  style={{
                    fontFamily: ibmArabic,
                    fontSize: 10,
                    padding: "3px 8px",
                    borderRadius: 20,
                    border: `1px solid ${C.tealBorder}`,
                    background: C.tealGlow,
                    color: C.teal,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} style={{
              borderTop: `1px solid ${C.tealBorder}`,
              padding: "8px 10px",
              display: "flex",
              gap: 6,
              background: C.surface,
              flexShrink: 0,
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب سؤالك هنا..."
                rows={1}
                style={{
                  flex: 1,
                  resize: "none",
                  background: C.surfaceHigh,
                  border: `1px solid ${C.tealBorder}`,
                  borderRadius: 8,
                  padding: "6px 10px",
                  color: C.white,
                  fontFamily: ibmArabic,
                  fontSize: 12,
                  outline: "none",
                  lineHeight: 1.5,
                  direction: "rtl",
                }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: !input.trim() || loading
                    ? "rgba(0,166,81,0.2)"
                    : `linear-gradient(135deg, ${C.teal}, ${C.tealDim})`,
                  border: "none",
                  cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                  boxShadow: !input.trim() || loading ? "none" : "0 2px 12px rgba(0,166,81,0.4)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── زر الفتح ─── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.teal}, ${C.tealDim})`,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 20px rgba(0,166,81,0.5), 0 0 0 3px rgba(0,166,81,0.15)`,
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close"
              initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}
              style={{ color: "white", fontSize: 20, lineHeight: 1 }}>✕</motion.span>
          ) : (
            <motion.svg key="chat"
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.1)" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* نقطة إشعار */}
        {!open && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{
              position: "absolute", top: 2, right: 2,
              width: 12, height: 12, borderRadius: "50%",
              background: "#4ddb8f",
              border: `2px solid ${C.bg}`,
              boxShadow: "0 0 8px rgba(77,219,143,0.8)",
            }}
          />
        )}
      </motion.button>
    </div>
  );
}

export default AIChatbot;
