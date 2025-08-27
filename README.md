# Kroom

A modern real estate platform built with Next.js and Supabase, designed for property listings, rentals, sales, and roommate matching.

![Kroom Landing Page](LandingPage.png)

## Features

- **Multi-type Listings** - Support for rentals, sales, roomshares, and sublets
- **Interactive Maps** - Google Maps integration with location search and autocomplete
- **Advanced Search** - Filter properties by type, price, location, and amenities
- **Real-time Updates** - Live property data synchronization with Supabase
- **User Authentication** - Secure login and profile management
- **Responsive Design** - Mobile-first approach with modern UI components
- **Property Management** - Comprehensive property details with image galleries

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Shadcn UI** - Modern component library
- **Radix UI** - Accessible UI primitives

### Backend & Database

- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database with advanced schema
- **Supabase Auth** - Authentication and user management
- **Supabase Storage** - File storage and image optimization
- **Edge Functions** - Serverless API endpoints

### Integrations

- **Google Maps API** - Location services and mapping
- **Google Places** - Address autocomplete and validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Google Maps API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/echo93915/Kroom.git
   cd kroom
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Add your environment variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Set up Supabase locally (optional)**

   ```bash
   npx supabase start
   ```

5. **Use the correct Node.js version and start development server**

   ```bash
   nvm use
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
kroom/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   ├── property/          # Property detail pages
│   └── search/            # Search functionality
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── shared/           # Shared components
│   └── ui/               # UI component library
├── lib/                  # Utilities and services
│   ├── services/         # Business logic
│   ├── supabase/         # Database client configuration
│   └── types/            # TypeScript type definitions
├── supabase/             # Supabase configuration
│   ├── migrations/       # Database schema migrations
│   └── functions/        # Edge functions
└── public/               # Static assets
```

## Database Schema

The application uses a comprehensive property management schema including:

- **Properties** - Core property listings with pricing, location, and details
- **Property Images** - Image galleries for each property
- **Amenities** - Property features and amenities
- **User Profiles** - User authentication and profile data
- **Property Amenities** - Many-to-many relationship for property features

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Local Development with Supabase

The project includes a complete Supabase local development setup:

```bash
# Start Supabase services
npx supabase start

# Reset database (if needed)
npx supabase db reset

# Stop Supabase services
npx supabase stop
```

### Key Development Features

- **Hot Reload** - Instant updates during development
- **Type Safety** - Full TypeScript integration
- **Server Components** - Optimized performance with RSC
- **Real-time Data** - Live updates via Supabase subscriptions

## Deployment

### Deploy to Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Deploy to other platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

Required environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Optional: For Supabase local development
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives

---

Built with modern web technologies
