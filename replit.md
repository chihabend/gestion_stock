# Product Management System

## Overview

This is a full-stack product management application built with React, Express, PostgreSQL, and TypeScript. The application provides a modern web interface for managing product inventory with features like adding, editing, deleting products, and viewing statistics.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Components**: Shadcn/UI component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database Driver**: Neon serverless PostgreSQL driver
- **API Design**: RESTful API with proper error handling
- **Development**: Hot reload with tsx and Vite integration

### Data Storage
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema**: Two main tables - `users` and `products`
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Pooled connections with WebSocket support for serverless

## Key Components

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Products Table**: Core inventory management with name, quantity, description, timestamps
- **Validation**: Zod schemas for runtime type checking and form validation

### API Endpoints
- `GET /api/products` - List products with search and sorting
- `GET /api/products/stats` - Product statistics (total, low stock, etc.)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update existing product
- `DELETE /api/products/:id` - Delete product

### Frontend Features
- **Product Management**: CRUD operations with modal forms
- **Search & Filter**: Real-time search with sorting options
- **Statistics Dashboard**: Visual cards showing inventory metrics
- **Responsive Design**: Mobile-first design with collapsible sidebar
- **Toast Notifications**: User feedback for all operations

## Data Flow

1. **Client Requests**: React components use TanStack Query for data fetching
2. **API Layer**: Express routes handle HTTP requests and validation
3. **Business Logic**: Storage layer abstracts database operations
4. **Database**: Drizzle ORM executes type-safe SQL queries
5. **Response**: JSON data flows back through the same path
6. **UI Updates**: React Query automatically updates UI state

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling with validation
- **@hookform/resolvers**: Zod integration for forms
- **zod**: Runtime type checking and validation

### UI Dependencies
- **@radix-ui/***: Headless UI components (dialogs, dropdowns, etc.)
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant utilities
- **wouter**: Lightweight React router

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production
- **@replit/***: Replit-specific development tools

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Server**: Express with Vite middleware for HMR
- **Database**: Connects to provisioned PostgreSQL instance
- **Port**: 5000 (configured in .replit)

### Production Build
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js`
- **Start**: `npm start` runs the bundled server
- **Deployment**: Configured for Replit autoscale deployment

### Database Management
- **Migrations**: `npm run db:push` applies schema changes
- **Environment**: Requires `DATABASE_URL` environment variable
- **Driver**: Configured for Neon serverless with WebSocket support

## Changelog

```
Changelog:
- June 24, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```