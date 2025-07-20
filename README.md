# ElectroCart - AI-Powered E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js 14, featuring AI-powered product recognition, secure payments, and real-time order processing.

## 🚀 Features

### 🛍️ Customer Features
- **Product Browsing**: Browse products by categories (Electronics, Watches, Smartphones, etc.)
- **Smart Search**: Search products with filters and sorting options
- **Shopping Cart**: Add/remove items with persistent cart across sessions
- **User Authentication**: Secure login/signup with Clerk
- **Order Management**: Place orders and view order history
- **Multiple Payment Options**: Cash on Delivery (COD) and Stripe integration
- **Address Management**: Save and manage multiple delivery addresses

### 👨‍💼 Admin Features
- **Product Management**: Add, edit, and manage product inventory
- **AI Product Recognition**: Upload product images and auto-extract details using Google Gemini AI
- **Order Processing**: View and manage customer orders
- **Dashboard Analytics**: Track sales and inventory
- **Dual Entry Modes**: Manual product entry or AI-assisted entry

### 🤖 AI Integration
- **Gemini AI Integration**: Automatically extract product details from images
- **Smart Data Extraction**: Extract brand, description, category, price, and specifications
- **Image Recognition**: Advanced product identification and categorization

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **State Management**: React Context API
- **Authentication**: Clerk
- **Image Handling**: ImageKit integration

### Backend
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk (JWT-based)
- **File Storage**: ImageKit
- **Payment Processing**: Stripe
- **Background Jobs**: Inngest
- **AI Services**: Google Gemini AI

### Deployment & DevOps
- **Hosting**: Vercel (recommended)
- **Database**: PostgreSQL (Neon, Supabase, or Railway)
- **CDN**: ImageKit for image optimization

## 📁 Project Structure

```
ecommerce_app/
├── app/
│   ├── admin/                 # Admin dashboard pages
│   ├── api/                   # API routes
│   │   ├── order/             # Order management endpoints
│   │   ├── product/           # Product CRUD endpoints
│   │   └── stripe/            # Payment webhook handlers
│   ├── my-orders/             # Customer order history
│   └── product/               # Product pages
├── components/                # Reusable UI components
├── config/                    # Configuration files
│   └── inngest.js            # Background job definitions
├── context/                   # React Context providers
├── lib/                       # Utility functions and configurations
│   ├── prisma.js             # Database connection
│   └── authAdmin.js          # Admin authentication
├── prisma/                    # Database schema and migrations
└── assets/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Clerk account (for authentication)
- Stripe account (for payments)
- Google AI Studio account (for Gemini AI)
- ImageKit account (for image storage)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/electrocart.git
cd electrocart
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/electrocart"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# ImageKit
NEXT_PUBLIC_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id/
IMAGEKIT_PRIVATE_KEY=private_...
IMAGEKIT_PUBLIC_KEY=public_...

# Inngest
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=signkey_...
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🗄️ Database Schema

### Key Models
- **User**: Customer and admin user management
- **Product**: Product catalog with images and details
- **Order**: Customer orders with items and status
- **CartItem**: Shopping cart persistence
- **Address**: Customer delivery addresses

## 🔧 API Endpoints

### Product Management
- `POST /api/product/add` - Add new product
- `GET /api/product/list` - Get all products
- `POST /api/product/ai-search` - AI product recognition

### Order Management
- `POST /api/order/create` - Create new order
- `GET /api/order/get-order` - Get user orders

### Payment Processing
- `POST /api/stripe` - Stripe webhook handler

## 🤖 AI Features

### Product Recognition
The AI system can analyze product images and extract:
- Brand and model information
- Product category
- Detailed descriptions
- Price estimates
- Technical specifications
- Color and design details

### Usage
1. Go to Admin > Add Product
2. Switch to "AI Upload" tab
3. Upload a product image
4. AI automatically fills product details
5. Review and adjust as needed

## 🛡️ Security Features

- **Authentication**: Secure JWT-based auth with Clerk
- **Authorization**: Admin-only routes protection
- **Data Validation**: Input sanitization and validation
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **CORS**: Proper cross-origin request handling

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive navigation and layouts
- Touch-friendly interface elements
- Optimized images with ImageKit

## 🚀 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically on push

### Database Setup
1. Create PostgreSQL database (Neon/Supabase recommended)
2. Update `DATABASE_URL` in environment variables
3. Run migrations: `npx prisma migrate deploy`





## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for authentication services
- [Prisma](https://prisma.io/) for database ORM
- [Stripe](https://stripe.com/) for payment processing
- [Google AI](https://ai.google.dev/) for Gemini AI integration
- [ImageKit](https://imagekit.io/) for image optimization



**ElectroCart** - Revolutionizing e-commerce with AI-powered intelligence! 🛍️🤖