# Safe-Space Sisters

**Reclaim Your Voice. Build Safer Spaces.**

An AI-powered platform that helps women and girls detect toxic messages in real-time, understand what makes them harmful, and get suggestions for safer ways to respond. Built for the **16 Days of Activism Against Gender-Based Violence**.

---

## 🎯 Mission

Digital harassment is a form of gender-based violence. Safe-Space Sisters empowers users by:
- **Detecting** harmful messages with AI-powered analysis
- **Understanding** the severity and type of harassment
- **Responding** safely with AI-suggested alternatives
- **Documenting** incidents with exportable reports

---

## ✨ Features

### 🔍 **Toxicity Detection**
Analyze any message to identify harassment, hate speech, and threats. Get a toxicity score, category classification, and highlighted harmful phrases.

### ✍️ **Safer Rewrites**
Receive AI-generated alternative responses that address the concern without escalating the situation.

### 💡 **Personalized Safety Advice**
Get context-aware recommendations on how to handle the situation, when to escalate, and where to find support.

### 📊 **Dashboard & History**
Track all analyzed messages with timestamps and severity scores. View trends and statistics about incidents.

### 📥 **Export Reports**
Download detailed PDF reports of your scan history for sharing with platform moderators or authorities.

### 🎮 **Demo Mode**
Try the full functionality without API keys—perfect for testing and demonstrations.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (or use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- bun or npm (project uses bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/Nedcarol/safe-space-sisters.git

# Navigate to project directory
cd safe-space-sisters

# Install dependencies
bun install
# or
npm install

# Start development server
bun dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
bun run build
# or
npm run build
```

---

## 📁 Project Structure

```
src/
├── pages/              # Main page components (Landing, Dashboard, Scanner, etc.)
├── components/         # Reusable React components
│   └── ui/            # shadcn/ui component library
├── contexts/          # React context for global state (Language)
├── hooks/             # Custom React hooks
├── integrations/      # External service integrations (Supabase)
├── lib/               # Utility functions and API helpers
└── App.tsx            # Root application component

supabase/
├── config.toml        # Supabase project configuration
├── functions/         # Edge functions for AI analysis
│   ├── analyze-toxicity/
│   ├── generate-advice/
│   └── generate-safer-version/
└── migrations/        # Database schema migrations
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **AI Models**: Google Gemini & OpenAI
- **Form Handling**: React Hook Form
- **PDF Export**: jsPDF
- **HTTP Client**: TanStack React Query

---

## 🔧 Environment Setup

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Supabase Edge Functions require configuration in `supabase/config.toml` for API keys:
```toml
[env.local.functions.analyze-toxicity]
[env.local.functions.generate-advice]
[env.local.functions.generate-safer-version]
```

---

## 📖 Usage

### Scanning a Message
1. Navigate to the **Scanner** page
2. Paste or type a message
3. Click **"Analyze Message"**
4. View toxicity score, categories, and highlighted harmful phrases
5. Generate a safer response or get safety advice

### Dashboard
- View all your previous scans
- Filter by date range or severity
- Export your history as a PDF report

### Demo Mode
Toggle **"Demo ON"** in the header to use sample data and AI responses without rate limits.

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📞 Support & Resources

- **Report Issues**: [GitHub Issues](https://github.com/Nedcarol/safe-space-sisters/issues)
- **Safety Resources**:
  - [Cyber Civil Rights Initiative](https://www.cybercivilrights.org/)
  - [Stop Cyberbullying](https://www.stopcyberbullying.org/)
  - [16 Days of Activism](https://www.un.org/en/events/endviolenceday/)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

Built for the **16 Days of Activism Against Gender-Based Violence** campaign. Safe-Space Sisters is dedicated to empowering women and girls to reclaim their voices online and build safer digital spaces.

---

**For more information, see [PITCH.md](./PITCH.md) for the full demo script and project overview.**

**View the wireframe here: https://app.visily.ai/projects/62ad83db-c2f3-4068-8fb9-d65e36b406f6/boards/2361343**

