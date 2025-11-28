# Safe-Space Sisters — Hackathon Pitch & Demo Script

## 🎤 Elevator Pitch (30 seconds)

> "Safe-Space Sisters is an AI-powered platform that helps women and girls detect toxic messages in real-time, understand what makes them harmful, and get suggestions for safer ways to respond. Think of it as a digital safety co-pilot in your pocket.
>
> Using Google Gemini and OpenAI, the tool analyzes messages for harassment, hate speech, and threats with a single click. Users can save reports as evidence, access safety advice, and reclaim their voice online. It's built for the **16 Days of Activism Against Gender-Based Violence** — because digital harassment is a form of gender-based violence."

**Tagline**: *Reclaim Your Voice. Build Safer Spaces.*

---

## 🎬 Full Demo Script (2–3 minutes)

### Opening (10 seconds)
"Let me show you Safe-Space Sisters — a tool designed to empower women and girls online. Imagine you receive a concerning message. You're not sure how serious it is, or how to respond. That's where we come in."

### 1. Landing Page (20 seconds)
*Click through the landing page, highlighting:*
- Hero: "Protect Yourself. Reclaim Your Voice."
- Three feature cards: Toxicity Detection → Safer Rewrites → History Tracking
- 16 Days of Activism section
- Call-to-action: "Start Scanning Messages" button

**Say**: "Our mission is to support the global movement against gender-based violence. This tool detects digital abuse, provides practical advice, and helps document evidence."

### 2. Scanner Demo (60 seconds)

#### Step 1: Load a Demo Scenario (20 seconds)
*On the Scanner page:*
- Click **"Demo Scenarios"** button
- Select **"Medium"** severity example
- The scanner auto-fills: *"Your post is frustrating and makes me uncomfortable. Please stop."*
- Click **"Analyze Message"**

**Say**: "Let's analyze a medium-severity message. The AI is now detecting what type of harm this is and how serious it is."

#### Step 2: Review Results (30 seconds)
*Show the analysis results:*
- Toxicity Score: **55** (medium severity)
- Categories: **Harassment**
- Highlighted words in the original message
- Explanation: *"Contains disrespectful tone and implicit threat of social exclusion"*

**Say**: "See how the AI identified the harm? It scored it as medium severity, categorized it as harassment, and highlighted the key phrases. This gives you clear information to decide how to respond."

#### Step 3: Generate Safer Response (10 seconds)
- Click **"Rewrite Safely"**
- Show the safer alternative: *"I disagree with your post. I'd prefer if we kept our conversation respectful."*
- Click **"Copy"** button

**Say**: "The AI suggests a response that addresses the concern without escalating. One click copies it to your clipboard."

#### Step 4: Get Safety Advice (10 seconds)
- Click **"Get Safety Advice"**
- Show the advice card with personalized recommendations

**Say**: "Finally, get safety advice specific to this situation — what to do, when to escalate, and where to find support."

### 3. Dashboard (30 seconds)
*Navigate to Dashboard:*
- Show stats cards: Total Scans, This Week, Avg Toxicity
- Show recent scan history
- Click **"Load demo data"** button
- Show sample scans loading
- Click **"Export"** button
- Show PDF download notification

**Say**: "Users can save all their analyses and export them as reports. This is powerful for documentation — if someone is harassing you, you have clear evidence to share with platform moderators or authorities."

### 4. Demo Mode (15 seconds)
*Show the header:*
- Click **"Demo OFF"** toggle → changes to **"Demo ON"**

**Say**: "See the Demo Mode toggle in the header? This lets judges and users try the full functionality without needing API keys. Perfect for presentations like this — no rate limits, no cost."

---

## 💡 Key Talking Points

### Problem
- **Digital harassment is rampant**: 1 in 4 women experience severe harassment online
- **Victims struggle to respond**: Uncertainty, fear, escalation
- **Evidence is hard to gather**: Screenshots, but no clear documentation
- **Support is scattered**: No single tool to detect, advise, and document

### Solution
- **AI-powered detection** in real-time
- **Empowering suggestions** for safer responses
- **Personalized advice** based on context
- **Evidence export** for reporting

### Innovation
- **Multi-step AI pipeline**: detect → rewrite → advise
- **User-friendly UX**: copy, save, export in clicks
- **Privacy-first**: Supabase backend, user-controlled data
- **Hackathon-ready**: Demo mode, instant feedback, no setup needed

### Impact
- Reduces harassment escalation
- Builds confidence in online spaces
- Provides documentation for reporting
- Aligns with global movements (16 Days of Activism)

---

## 📊 Demo Data & Quick Links

### Demo Scenarios (Pre-loaded in Scanner)

1. **Low Toxicity** (Safe message)
   - Text: *"Thanks for your comment! I appreciate your perspective."*
   - Score: ~5
   - Categories: None
   - Use case: Show that the tool is intelligent and doesn't over-flag

2. **Medium Toxicity** (Harassment)
   - Text: *"Your post is frustrating and makes me uncomfortable. Please stop."*
   - Score: ~55
   - Categories: Harassment
   - Use case: Show core functionality

3. **High Toxicity** (Severe harassment)
   - Text: *"You are so stupid and should disappear. Nobody wants you here."*
   - Score: ~85
   - Categories: Harassment, Profanity
   - Use case: Show escalation and strong advice

### Quick URLs
- **Landing page**: `/`
- **Scanner with sample**: `/scanner?sample=1`
- **Demo mode enabled**: Add `?demo=1` to any URL or click "Demo ON" in header
- **Dashboard**: `/dashboard` (login required; use demo data button)

---

## 🎯 Call-to-Action (Closing)

**"Safe-Space Sisters isn't just a tool — it's a movement. We're built for PowerHacks 2025, the 16 Days of Activism, and every woman who deserves to feel safe online.**

**Try it now: click Quick Demo on the landing page. Or visit `/scanner?sample=1` to jump straight to the action.**

**Questions? We're here to empower, not judge. Reclaim your voice. Build safer spaces."**

---

## 🔧 Troubleshooting During Demo

| Issue | Fix |
|-------|-----|
| Demo scenarios not loading | Click "Demo ON" toggle in header, refresh page |
| API calls failing | Demo mode is already enabled; results are mocked |
| Can't save to history | Demo mode doesn't require login; just use the Scanner view |
| Safer version not generating | Wait 1–2 seconds, try again (simulated 600ms delay in demo) |
| Page not responding | Refresh; demo data is client-side, no backend needed |

---

## 🎁 Judges' Notes

✅ **Fully functional AI pipeline** (detect → rewrite → advise)  
✅ **Impressive UX** with copy, export, and history  
✅ **Demo-ready** (no setup, no API keys needed)  
✅ **Real-world impact** (addresses digital harassment)  
✅ **Aligned with hackathon theme** (PowerHacks 2025)  
✅ **Scalable architecture** (Supabase + Edge Functions)  
✅ **Mission-driven** (gender-based violence awareness)

---

**Good luck, team! Reclaim. Empower. Build Safer Spaces. 💜**
