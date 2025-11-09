# Angular Authentication App# AuthApp



A modern Angular 18 authentication application with feature-based module architecture, demonstrating best practices for enterprise-level applications.This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.



## 🚀 Features## Development server



### Authentication & AuthorizationRun `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

- ✅ User login and signup

- ✅ Session management with localStorage## Code scaffolding

- ✅ Route guards (auth & guest guards)

- ✅ Protected routesRun `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

- ✅ User profile management

## Build

### User Management

- ✅ AG Grid integration for user listRun `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

- ✅ CRUD operations (Create, Read, Update, Delete)

- ✅ Advanced search and filtering## Running unit tests

- ✅ Pagination and sorting

- ✅ Form validationRun `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).



### Currency Features## Running end-to-end tests

- ✅ Currency converter

- ✅ Exchange rate displayRun `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

- ✅ Currency sorting and selection

- ✅ Asian currency focus## Further help

- ✅ Real-time calculations

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

### UI/UX
- ✅ Bootstrap 5 integration
- ✅ Responsive design
- ✅ Modern gradient themes
- ✅ Animated backgrounds
- ✅ Loading states
- ✅ Toast notifications
- ✅ Form validation feedback

## 📁 Project Structure

```
src/app/
├── currency/                      # Currency Feature Module
│   ├── components/
│   │   ├── currency/             # Currency converter
│   │   └── currency-sort/        # Currency sorting
│   ├── models/                   # Currency interfaces
│   ├── constants/                # Currency data
│   ├── services/                 # Currency services
│   └── index.ts                  # Barrel exports
│
├── user/                          # User Feature Module
│   ├── components/
│   │   ├── user-list/            # User management grid
│   │   ├── user-edit/            # Edit user form
│   │   └── user-delete/          # Delete confirmation
│   ├── models/                   # User interfaces
│   ├── constants/                # User data
│   ├── services/                 # Auth service
│   ├── guards/                   # Route guards
│   └── index.ts                  # Barrel exports
│
├── services/                      # Shared services
│   ├── toast.service.ts          # Notifications
│   └── loading.service.ts        # Loading state
│
├── utils/                         # Utilities
│   ├── validation.service.ts
│   └── time-util.service.ts
│
├── login/                         # Login component
├── signup/                        # Signup component
├── dashboard/                     # Dashboard component
├── navbar/                        # Navigation component
└── app.routes.ts                  # Route configuration
```

## 🛠️ Technologies

- **Angular 18** - Latest Angular framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **AG Grid** - Enterprise data grid
- **Bootstrap 5** - UI framework
- **Bootstrap Icons** - Icon library

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd auth-app

# Install dependencies
npm install

# Start development server
npm start
```

## 🚀 Development

```bash
# Development server (http://localhost:4200)
npm start

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

## 📚 Key Concepts

### Feature Modules
- **Currency Module**: All currency-related functionality
- **User Module**: Authentication and user management
- **Shared Services**: Cross-cutting concerns

### Route Guards
- **authGuard**: Protects authenticated routes
- **guestGuard**: Prevents logged-in users from auth pages

### Services
- **AuthService**: User authentication and management
- **ToastService**: User notifications
- **LoadingService**: Global loading state
- **ValidationService**: Form validation
- **CurrencyService**: Currency operations

## 🔐 Authentication Flow

1. User visits login page
2. Credentials validated against mock users
3. Successful login stores user in localStorage
4. Auth guard protects dashboard and other routes
5. User can access protected features
6. Logout clears session data

## 👥 Default Users

```typescript
{
  username: "john_doe",
  email: "john@example.com",
  password: "password123"
}
```

## 📝 Available Routes

- `/` - Redirects to login
- `/login` - User login (guest guard)
- `/signup` - User registration (guest guard)
- `/dashboard` - User dashboard (auth guard)
- `/currency` - Currency converter (auth guard)
- `/currency-sort` - Currency sorting (auth guard)
- `/user-list` - User management (auth guard)
- `/user-edit/:id` - Edit user (auth guard)
- `/user-delete/:id` - Delete user (auth guard)

## 🎨 Styling

The application uses a modern design with:
- Purple gradient theme (#667eea to #764ba2)
- Animated background gradients
- Glassmorphism effects
- Smooth transitions and animations
- Responsive breakpoints for mobile

## 📄 Documentation

- `REFACTORING_COMPLETE.md` - Core refactoring details
- `FEATURE_MODULES_REFACTORING.md` - Module organization guide

## 🔄 Future Enhancements

- [ ] Lazy loading for feature modules
- [ ] Real API integration
- [ ] State management (NgRx)
- [ ] Unit and E2E tests
- [ ] PWA features
- [ ] i18n support
- [ ] Dark mode
- [ ] Role-based access control

## 📧 Contact

For questions or feedback, please open an issue in the repository.

## 📝 License

This project is licensed under the MIT License.
