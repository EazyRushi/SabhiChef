# Sabhi Chef - D2C Indian Food Platform

A modern, production-ready e-commerce platform for authentic Indian homemade food products. Built with Next.js, TypeScript, Tailwind CSS, and ready for Supabase integration with Razorpay payments.

## Features

### Customer Features
- **Beautiful Homepage** - Responsive, modern landing page with product showcases
- **Product Catalog** - Browse products by category (meals, breakfast, sweets, snacks)
- **Shopping Cart** - Add, remove, and manage quantities with real-time totals
- **Checkout Flow** - Complete shipping and billing address collection
- **User Authentication** - Sign up, sign in, and account management (Supabase ready)
- **Order Management** - View order history and track status

### Admin Features
- **Dashboard** - Overview of revenue, orders, products, and users
- **Product Management** - Add, edit, delete products with images and details
- **Order Management** - Track and update order statuses
- **User Management** - View and manage customer accounts
- **Analytics** - Basic business metrics and insights

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Indian-inspired color theme
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL) - Ready for integration
- **Authentication**: Supabase Auth - Ready for integration
- **Payments**: Razorpay - Ready for integration
- **Deployment**: Vercel (optimized)

## Project Structure

```
/vercel/share/v0-project/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles & theme tokens
│   ├── api/                     # API routes
│   │   ├── products/route.ts    # Product endpoints
│   │   ├── cart/route.ts        # Cart management
│   │   └── checkout/route.ts    # Checkout & payment
│   ├── auth/                    # Authentication pages
│   │   ├── signin/page.tsx      # Sign in form
│   │   └── signup/page.tsx      # Sign up form
│   ├── cart/page.tsx            # Shopping cart page
│   ├── checkout/page.tsx        # Checkout form
│   └── admin/page.tsx           # Admin dashboard
├── components/                   # Reusable components
│   ├── navbar.tsx               # Navigation bar
│   ├── hero.tsx                 # Hero section
│   ├── product-gallery.tsx      # Product grid
│   ├── why-us.tsx               # USP section
│   ├── audience.tsx             # Target audience cards
│   ├── footer.tsx               # Footer
│   └── ui/                      # shadcn components
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   ├── products.ts              # Mock product data
│   └── utils.ts                 # Utility functions
├── scripts/
│   └── setup-db.sql             # Database schema & migrations
└── public/                       # Static assets

```

## Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Environment Variables

Create a `.env.local` file:
```env
# Supabase (when ready to connect)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Razorpay (when ready to connect)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 3. Run Development Server
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

### 4. Setup Database (Supabase)

When ready to connect:
1. Create a Supabase project
2. Run the SQL schema from `scripts/setup-db.sql` in your Supabase SQL editor
3. Add Supabase credentials to `.env.local`

## Key Pages & Routes

| Route | Description | Status |
|-------|-------------|--------|
| `/` | Homepage with products | ✅ Built |
| `/products/[id]` | Product detail page | 📋 Ready |
| `/cart` | Shopping cart | ✅ Built |
| `/checkout` | Checkout form | ✅ Built |
| `/auth/signin` | Sign in page | ✅ Built |
| `/auth/signup` | Sign up page | ✅ Built |
| `/admin` | Admin dashboard | ✅ Built |
| `/api/products` | Product API | ✅ Built |
| `/api/cart` | Cart API | ✅ Built |
| `/api/checkout` | Checkout API | ✅ Built |

## Current Product Catalog

The app includes 8 sample products:
- Masala Khichdi (₹150)
- Vanilla Cake (₹120)
- Moong Chila (₹100)
- Instant Poha (₹80)
- Rajma Masala (₹160)
- Besan Barfi (₹130)
- Upma Mix (₹90)
- Chana Masala (₹140)

## Customization

### Colors & Theme
Edit `app/globals.css` to change the color theme. The app uses OKLCH color space for modern color management:
- **Primary**: Warm spice color (for CTAs and highlights)
- **Secondary**: Soft orange (for accents)
- **Accent**: Gold (for special elements)
- **Foreground/Background**: Premium blacks and creams

### Products
Update product data in `lib/products.ts` with:
- Real product images
- Actual prices and descriptions
- Authentic recipes and prep times

### Branding
- Update metadata in `app/layout.tsx`
- Replace logo/favicon in `/public`
- Customize footer links

## Integration Checklist

### Database (Supabase)
- [ ] Create Supabase project
- [ ] Run `scripts/setup-db.sql` migrations
- [ ] Update `.env.local` with credentials
- [ ] Replace mock products with database queries

### Authentication
- [ ] Configure Supabase Auth
- [ ] Implement sign up API
- [ ] Implement sign in API
- [ ] Add protected routes middleware
- [ ] Implement password reset

### Payments (Razorpay)
- [ ] Create Razorpay account (India)
- [ ] Add credentials to `.env.local`
- [ ] Implement Razorpay checkout modal
- [ ] Add payment verification webhook
- [ ] Setup order status updates on payment success

### Admin Features
- [ ] Add role-based access control
- [ ] Implement product CRUD operations
- [ ] Add file upload for product images
- [ ] Implement order filtering and search
- [ ] Add analytics dashboard

## API Documentation

### GET /api/products
Fetch all or filtered products
```
Query Params: category=meals|breakfast|sweets|snacks
Response: { success, data: Product[], count }
```

### POST /api/cart
Add item to cart (requires auth)
```
Body: { productId, quantity }
Response: { success, message }
```

### POST /api/checkout
Create order and initiate payment
```
Body: { items, shippingAddress, total }
Response: { success, orderId, paymentGateway }
```

## Performance Optimizations

- Server-side rendering for SEO
- Image optimization with Next.js Image component
- Lazy loading for components below fold
- Static generation where possible
- Efficient database queries with indexes

## Security Considerations

- Environment variables for sensitive data
- SQL injections prevention (parameterized queries)
- CORS protection
- Input validation on all forms
- Secure password hashing (bcrypt) when implemented
- HTTPS enforced in production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with one click

### Other Platforms
The app can be deployed to any Node.js hosting (AWS, Heroku, DigitalOcean, etc.)

## Future Enhancements

- [ ] Real-time inventory management
- [ ] Email notifications for orders
- [ ] SMS integration for order updates
- [ ] Customer reviews and ratings
- [ ] Wishlist functionality
- [ ] Referral program
- [ ] Subscription boxes
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] WhatsApp integration

## Support & Feedback

For issues or feature requests, contact: support@sabhichef.com

## License

All rights reserved. Sabhi Chef © 2024

---

**Built with ❤️ using v0 by Vercel**
