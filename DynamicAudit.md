# Sabhi Chef — Dynamic Features Audit

This is a full audit of every page and feature across the site. Each item is labeled with its current state and what needs to be built or fixed.

---

## LEGEND
- 🔴 **NOT DYNAMIC** — Hardcoded / mock data, broken if DB is added
- 🟡 **PARTIAL** — Some logic works, but needs DB integration
- 🟢 **READY** — Logic works, just needs to be wired to Supabase

---

## SECTION 1 — HOMEPAGE (`app/page.tsx` + components)

| Feature | Status | Issue |
|---|---|---|
| Hero product tiles (Masala Khichdi, Poha, etc.) | 🔴 | Hardcoded in `hero.tsx`. Should pull from `products` table with `is_featured = true` |
| Products section filtering & display | 🟡 | Reads from static `lib/products.ts`. Must read from Supabase `products` table |
| "Why Choose Us" cards | 🟢 | Static content, intended to be static — OK |
| Our Story section | 🟢 | Static content — OK |
| Contact form (Send Message button) | 🔴 | Does nothing. Needs to insert into a `contact_messages` Supabase table or trigger an email |
| Scrolling strip text | 🟢 | Static marketing text — OK |
| Audience section | 🟢 | Static — OK |
| Delivery section | 🟢 | Static — OK |
| Footer links | 🟢 | Static — OK |

---

## SECTION 2 — SHOP PAGE (`app/shop/page.tsx`)

| Feature | Status | Issue |
|---|---|---|
| Product listing | 🔴 | Reads from static `lib/products.ts`. Must query Supabase |
| Search filter | 🟡 | Works locally, but not against DB |
| Category filter | 🟡 | Works locally, but not against DB |
| Sort (price, name, popular) | 🟡 | Works locally. "Popular" sort has no actual sales data to use |
| Add to cart button | 🟢 | Works via Zustand store — OK for now |
| Product count display | 🟡 | Shows local static count, not real inventory |
| Out of Stock display | 🔴 | No UI shown when `in_stock = false` — no visual indicator, no button disabled state |

---

## SECTION 3 — PRODUCT DETAIL PAGE (`app/product/[id]/page.tsx`)

| Feature | Status | Issue |
|---|---|---|
| Product data display | 🔴 | Likely reads from static file via `products.find(id)` — needs Supabase query |
| Product images | 🔴 | Uses emoji placeholder. Needs real image from `products.image_url` or Supabase Storage |
| Ingredients & Instructions | 🔴 | May not display since static data has no content in those fields |
| Reviews section | 🔴 | Not implemented at all. Needs `reviews` table query |
| Related products | 🔴 | Not implemented or hardcoded |
| Add to cart | 🟢 | Works via Zustand |
| Product variants (500gm option) | 🔴 | Not implemented. `product_variants` table exists in schema but not connected to UI |

---

## SECTION 4 — CART PAGE (`app/cart/page.tsx`)

| Feature | Status | Issue |
|---|---|---|
| Cart item display | 🟢 | Works via Zustand cart store |
| Quantity update | 🟢 | Works via Zustand |
| Remove item | 🟢 | Works via Zustand |
| Subtotal / Shipping / Total calc | 🟢 | Works correctly — free shipping logic at ₹1500 |
| Coupon code field | 🔴 | **Missing completely** — no UI to enter a coupon code at all |
| Save cart for logged-in users | 🔴 | Cart is memory-only. Closes tab = cart lost. Needs Supabase or localStorage persistence |

---

## SECTION 5 — CHECKOUT PAGE (`app/checkout/page.tsx`)

| Feature | Status | Issue |
|---|---|---|
| Address form | 🟡 | Form works locally but doesn't save to `addresses` table or link to logged-in user's saved addresses |
| Saved address autofill | 🔴 | No autofill from user's saved addresses in DB |
| Payment method selection | 🟡 | UI works but doesn't call Razorpay SDK or any payment gateway |
| Coupon code field | 🔴 | **Missing entirely** — no coupon entry at checkout either |
| "Place Order" action | 🔴 | Generates a fake random order ID, clears cart, redirects. Does NOT write to `orders` table |
| Order confirmation email | 🔴 | No email is sent — needs Supabase Edge Function + trigger |
| Auth guard (must be logged in) | 🔴 | Any visitor can access checkout without logging in |

---

## SECTION 6 — ORDER SUCCESS PAGE (`app/order-success/page.tsx`)

| Feature | Status | Issue |
|---|---|---|
| Order ID display | 🔴 | Shows a randomly generated fake ID from URL param, not a real DB order |
| Order summary display | 🔴 | Does not fetch or display the actual placed order from Supabase |
| "Track Order" link | 🔴 | Links to `/track/[fake-id]` which won't find anything in DB |

---

## SECTION 7 — ORDER TRACKING PAGE (`app/track/[id]/page.tsx`)

| Feature | Status | Issue |
|---|---|---|
| Order lookup by ID/number | 🔴 | Likely reads from mock data or returns nothing real |
| Tracking status timeline | 🔴 | Hardcoded or mock statuses — needs real `orders.order_status` from DB |
| Tracking number / URL | 🔴 | Not connected to any real shipping API |

---

## SECTION 8 — USER ACCOUNT (`app/account/`)

### Profile (`app/account/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Profile data display | 🔴 | Hardcoded: `{ name: 'Priya Sharma', email: 'priya@example.com' }` |
| Save profile changes | 🔴 | Only updates local state, does NOT update `profiles` Supabase table |
| Avatar / initials | 🔴 | Hardcoded "PS" initials — needs to be generated from actual logged-in user name |
| "Member since" date | 🔴 | Hardcoded "November 2025" — needs `profiles.created_at` |

### My Orders (`app/account/orders/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Order listing | 🔴 | Pulls from `mockOrders` filtered by hardcoded `user_id === 'u1'` |
| Reorder button | 🔴 | Does nothing — needs to re-add items to cart from a past order |
| Track button | 🔴 | Links to `/track/[order_number]` which uses mock data |

### Addresses (`app/account/addresses/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Address display | 🔴 | Almost certainly hardcoded mock — needs to query `addresses` table |
| Add / Edit / Delete address | 🔴 | Needs full CRUD wired to Supabase `addresses` table |
| Set default address | 🔴 | Not implemented in DB |

### Wishlist (`app/account/wishlist/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Wishlist items display | 🔴 | Likely mock or empty — needs `wishlist_items` table query |
| Add to wishlist (from shop/product page) | 🔴 | No "Add to Wishlist" button exists anywhere on the site |
| Remove from wishlist | 🔴 | Not implemented |

### Settings (`app/account/settings/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Change password | 🔴 | Not hooked to Supabase Auth `updateUser` |
| Email notification preferences | 🔴 | No such field in schema or UI |
| Delete account | 🔴 | Not implemented |

---

## SECTION 9 — AUTH (`app/login/`, `app/signup/`)

| Feature | Status | Issue |
|---|---|---|
| Login form | 🔴 | Unknown — likely fake/no Supabase Auth call |
| Signup form | 🔴 | Unknown — likely does not create `profiles` row after `auth.signUp` |
| Session persistence | 🔴 | No auth guard on protected pages (account, checkout) |
| Google OAuth | 🔴 | Not implemented |
| "Forgot password" flow | 🔴 | Not implemented |

---

## SECTION 10 — ADMIN PANEL (`app/admin/`)

### Dashboard (`app/admin/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Revenue stat | 🔴 | From `mockDashboardStats` in `lib/mock-data.ts` |
| Total orders stat | 🔴 | Mock data |
| Pending orders stat | 🔴 | Mock data |
| Total customers stat | 🔴 | Mock data |
| Revenue bar chart (6 months) | 🔴 | From `revenueData` mock — needs real `orders` aggregation query |
| Category sales pie chart | 🔴 | From `categoryBreakdown` mock — needs real query |
| Recent orders list | 🔴 | From `mockOrders` — needs `SELECT * FROM orders ORDER BY created_at DESC LIMIT 5` |
| Top selling products | 🔴 | From `topProducts` mock — needs real `order_items` aggregation |

### Products (`app/admin/products/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Product listing | 🔴 | Reads from static `lib/products.ts` file |
| Add product | 🔴 | Only updates local React state — NOT saved to Supabase |
| Edit product | 🔴 | Only updates local React state — NOT saved to Supabase |
| Delete product | 🔴 | Only removes from local state — NOT deleted in Supabase |
| Image upload | 🔴 | No image upload field — needs Supabase Storage integration |
| `beverage` and `snack` category options | 🔴 | Missing from the category dropdown in the Add/Edit form |

### Orders (`app/admin/orders/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Orders listing | 🔴 | From `mockOrders` in `lib/mock-data.ts` |
| Status update (dropdown) | 🔴 | Only updates local state — NOT saved to Supabase `orders` table |
| Search orders | 🟡 | Works on local mock data |
| Order detail modal | 🔴 | Shows mock data |
| Add tracking number | 🔴 | Not implemented — no input field for it in the detail view |

### Customers (`app/admin/customers/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Customer listing | 🔴 | Mock data |
| Customer order history | 🔴 | Mock data |
| Customer search | 🟡 | Works on mock data |

### Coupons (`app/admin/coupons/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Coupon listing | 🔴 | Mock data |
| Create coupon | 🔴 | Only local state — NOT saved to Supabase |
| Activate / deactivate coupon | 🔴 | Local state only |
| Coupon usage count | 🔴 | Hardcoded, `used_count` not incremented on real orders |

### Analytics (`app/admin/analytics/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| All charts & metrics | 🔴 | All mock data — needs real Supabase aggregation queries |

### Settings (`app/admin/settings/page.tsx`)
| Feature | Status | Issue |
|---|---|---|
| Store settings save | 🔴 | Unknown — likely local state only |
| Admin auth guard | 🔴 | Any user can access `/admin` — no role check implemented |

---

## PRIORITY BUILD ORDER

### Phase 1 — Core Auth & DB Connection (Blocker for everything else)
1. Wire Supabase Auth to login/signup pages
2. Create `profiles` row on signup trigger
3. Add auth guard middleware for `/account` and `/admin` routes
4. Add admin role check for all `/admin` routes

### Phase 2 — Products & Shop (Revenue-critical)
5. Replace `lib/products.ts` with Supabase query in shop + homepage
6. Admin: Wire Add/Edit/Delete product to Supabase
7. Add Supabase Storage image upload in admin product form
8. Show Out of Stock state on product cards

### Phase 3 — Orders & Checkout (Revenue-critical)
9. Wire checkout to actually INSERT into `orders` + `order_items` tables
10. Add coupon code field to cart + checkout, validate against `coupons` table
11. Integrate Razorpay (or COD flow) properly
12. Order success page to fetch and display real order from DB
13. Admin: Wire order status updates to Supabase

### Phase 4 — User Account
14. Profile page: load & save from Supabase `profiles`
15. My Orders: query real orders by `auth.uid()`
16. Addresses: Full CRUD on `addresses` table
17. Wishlist: Add button on shop/product page, wire to `wishlist_items` table

### Phase 5 — Admin Dashboard & Analytics
18. Replace all mock data in Admin Dashboard with real Supabase queries
19. Replace Analytics mock charts with real data
20. Add tracking number input in Order detail modal
21. Wire coupon CRUD to `coupons` table
