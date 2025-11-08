# Currency Selection Module - Refactored Structure

## Overview
This module has been refactored following Angular best practices with proper separation of concerns, testability, and maintainability.

## Project Structure

```
src/app/
├── models/
│   └── currency.model.ts          # Type definitions and interfaces
├── constants/
│   └── currency.constants.ts      # Application constants and static data
├── services/
│   ├── currency.service.ts        # Business logic for currency operations
│   └── currency-backend.service.ts # Backend API communication
├── utils/
│   └── time-util.service.ts       # Utility functions for time operations
└── currency-sort/
    ├── currency-sort.component.ts  # Component controller
    ├── currency-sort.component.html # Component template
    └── currency-sort.component.css  # Component styles
```

## Architecture Principles

### 1. **Separation of Concerns**
- **Models**: Define data structures and types
- **Constants**: Centralize configuration and static data
- **Services**: Implement business logic and external integrations
- **Utilities**: Provide reusable helper functions
- **Components**: Handle UI logic and user interactions

### 2. **Single Responsibility Principle**
Each class/file has one clear responsibility:
- `currency.model.ts`: Type definitions only
- `currency.service.ts`: Currency-specific business logic
- `time-util.service.ts`: Time parsing and formatting
- Component: UI orchestration and user interaction

### 3. **Dependency Injection**
Services are injected into components, making them:
- Testable (can mock services in tests)
- Reusable across multiple components
- Easier to maintain and update

### 4. **Type Safety**
- Strong TypeScript typing throughout
- Interfaces for all data structures
- Type aliases for complex types

## Key Components

### Models (`currency.model.ts`)
```typescript
- Currency: Core currency data structure
- SelectedCurrency: Currency with quantity
- CurrencySubmissionRequest: Backend payload structure
- SortOrder: Type-safe sort direction
```

### Constants (`currency.constants.ts`)
```typescript
- CURRENCIES: Default currency data
- ASIAN_CURRENCY_CODES: Asian currency identifiers
- DEFAULT_CURRENCY_COUNT: Initial selection count
- MIN/MAX_CURRENCY_COUNT: Validation limits
```

### Services

#### CurrencyService
Business logic for currency operations:
- `getAllCurrencies()`: Retrieve all currencies
- `sortByClosingTime()`: Sort currencies by time
- `getAsianCurrencies()`: Filter Asian currencies
- `validateCount()`: Validate quantity input
- `calculateTotalValue()`: Calculate currency value
- `calculateGrandTotal()`: Sum all selections
- `calculateTotalItems()`: Count total items

#### TimeUtilService
Time parsing utilities:
- `parseTimeToNumber()`: Convert time string to decimal
- `formatTimeNumber()`: Format decimal back to time string

### Component (`currency-sort.component.ts`)

**Responsibilities:**
- UI state management
- User interaction handling
- Service orchestration
- Template data binding

**Key Methods:**
- `sortCurrencies()`: Trigger sort operation
- `selectDefaultAsianCurrencies()`: Auto-select Asian currencies
- `selectCurrency()`: Toggle currency selection
- `sendToBackend()`: Initiate submission flow
- `confirmSubmit()`: Handle final submission

## Benefits of This Structure

### 1. **Testability**
- Services can be unit tested independently
- Components can be tested with mocked services
- Utilities have isolated test cases

### 2. **Reusability**
- Services can be used by multiple components
- Utilities can be shared across the application
- Models provide consistent data structures

### 3. **Maintainability**
- Clear file organization
- Easy to locate specific functionality
- Changes are isolated to relevant files

### 4. **Scalability**
- Easy to add new currency operations
- Simple to extend with new features
- Can swap implementations without affecting consumers

### 5. **Code Quality**
- Reduced code duplication
- Better documentation with JSDoc comments
- Consistent patterns across the codebase

## Usage Example

```typescript
// In a component
constructor(
  private currencyService: CurrencyService,
  private timeUtil: TimeUtilService
) {}

ngOnInit() {
  // Get all currencies
  const currencies = this.currencyService.getAllCurrencies();
  
  // Sort by closing time
  const sorted = this.currencyService.sortByClosingTime(currencies, 'asc');
  
  // Get Asian currencies
  const asian = this.currencyService.getAsianCurrencies();
}
```

## Future Improvements

1. **HTTP Integration**: Replace mock backend with real API calls
2. **State Management**: Add NgRx or similar for complex state
3. **Sub-components**: Break down large template into smaller components
4. **Interceptors**: Add HTTP interceptors for auth and error handling
5. **Caching**: Implement currency data caching strategy
6. **Lazy Loading**: Consider lazy loading for this feature module

## Testing

### Unit Tests
```bash
# Test services
ng test --include='**/*.service.spec.ts'

# Test components
ng test --include='**/currency-sort.component.spec.ts'

# Test utilities
ng test --include='**/time-util.service.spec.ts'
```

### E2E Tests
```bash
ng e2e
```

## Migration Notes

**Breaking Changes:**
- `CurrencyData` interface renamed to `Currency`
- Hardcoded data moved to constants file
- Time parsing moved to utility service

**Backward Compatibility:**
- All public APIs remain the same
- Template bindings unchanged
- Component selector unchanged

## Contributing

When adding new features:
1. Add types to `currency.model.ts`
2. Add constants to `currency.constants.ts`
3. Add business logic to appropriate service
4. Update component for UI logic only
5. Add JSDoc comments for public methods
6. Write unit tests

## Code Style

- Use TypeScript strict mode
- Follow Angular style guide
- Add JSDoc comments for public methods
- Use meaningful variable names
- Keep methods small and focused
- Extract magic numbers to constants
