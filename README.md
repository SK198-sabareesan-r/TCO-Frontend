# Cloud Migration Cost Estimation Platform

A modern, responsive SaaS web application for intelligent cloud migration cost optimization. Built with Next.js 15, TypeScript, and Tailwind CSS featuring an ice + white premium theme.

## 🎨 Features

- **Landing Page** with hero section, features grid, and how-it-works timeline
- **Interactive Dashboard** with real-time cost metrics and savings visualization
- **Upload Interface** with drag-and-drop Excel file processing
- **Cost Comparison** across Azure, GCP, and AWS
- **Optimization Insights** with AI-powered recommendations
- **Service Breakdown Table** with expandable rows showing detailed pricing
- **Fully Responsive** design for mobile, tablet, and desktop

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd cloud-migration-ui
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
cloud-migration-ui/
├── app/
│   ├── dashboard/
│   │   ├── comparison/      # Cost comparison page
│   │   ├── optimization/    # Optimization insights
│   │   ├── reports/         # Reports listing
│   │   ├── settings/        # Settings page
│   │   ├── upload/          # File upload page
│   │   ├── layout.tsx       # Dashboard layout with sidebar
│   │   └── page.tsx         # Main dashboard
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── CostChart.tsx        # Animated cost comparison chart
│   ├── DashboardCards.tsx   # Summary metric cards
│   ├── Features.tsx         # Features grid section
│   ├── Hero.tsx             # Landing page hero
│   ├── HowItWorks.tsx       # Process timeline
│   ├── ServiceTable.tsx     # Interactive service breakdown
│   ├── Sidebar.tsx          # Dashboard navigation
│   └── UploadZone.tsx       # Drag-and-drop upload
├── public/
│   └── hero-image.svg       # Hero section illustration
└── tailwind.config.ts       # Tailwind theme configuration
```

## 🎨 Design System

### Color Palette

- **Ice Blue**: `#E0F7FF`, `#D6F3FF`, `#BEEBFF`, `#3ABEFF`
- **Savings Green**: `#00C48C`
- **Warning Orange**: `#FFB020`
- **Alert Red**: `#FF5C5C`
- **Navy Dark**: `#0A2540`

### Key Features

- Glassmorphism effects with backdrop blur
- Ice glow hover effects
- Smooth animations and transitions
- Responsive grid layouts
- Interactive components

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column layout)
- **Tablet**: 768px - 1024px (2 column layout)
- **Desktop**: > 1024px (Full grid layout)

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎯 Pages Overview

1. **Landing Page** (`/`) - Hero, features, and how-it-works sections
2. **Dashboard** (`/dashboard`) - Overview with metrics and charts
3. **Upload** (`/dashboard/upload`) - File upload with progress tracking
4. **Reports** (`/dashboard/reports`) - Generated reports listing
5. **Comparison** (`/dashboard/comparison`) - Provider cost comparison
6. **Optimization** (`/dashboard/optimization`) - AI recommendations
7. **Settings** (`/dashboard/settings`) - Configuration options

## 🌟 Key Components

### Hero Section
- Gradient background with floating shapes
- Animated statistics
- Responsive image placement

### Dashboard Cards
- Real-time cost metrics
- Animated counters
- Hover glow effects

### Service Table
- Expandable rows
- Responsive mobile cards
- Sticky header on desktop

### Upload Zone
- Drag-and-drop functionality
- Processing stage indicators
- Animated progress bar

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
