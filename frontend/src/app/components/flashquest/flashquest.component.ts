//frontend/src/app/components/flashquest/flashquest.component.ts
//frontend/src/app/components/flashquest/flashquest.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../layout/navbar.component';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  codeExample?: string;
  tags: string[];
}

interface Deck {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  cards: Flashcard[];
}

@Component({
  selector: 'app-flashquest',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './flashquest.component.html',
  styleUrls: ['./flashquest.component.css']
})
export class FlashquestComponent {
  // Public properties - accessible from template
  decks: Deck[] = [
    {
      id: '1',
      name: 'JavaScript Fundamentals',
      description: 'Master core JavaScript concepts and syntax',
      category: 'javascript',
      icon: '⚡',
      color: '#f59e0b',
      cards: [
        {
          id: '1-1',
          question: 'What is the difference between let, const, and var?',
          answer: 'let: block-scoped, can be reassigned. const: block-scoped, cannot be reassigned. var: function-scoped, can be reassigned and redeclared.',
          category: 'javascript',
          difficulty: 'easy',
          explanation: 'Use const by default, let when reassignment is needed, and avoid var in modern code.',
          tags: ['variables', 'scope', 'es6']
        },
        {
          id: '1-2',
          question: 'What are arrow functions and how do they differ from regular functions?',
          answer: 'Arrow functions have shorter syntax, no own "this" binding, no arguments object, and cannot be used as constructors.',
          category: 'javascript',
          difficulty: 'medium',
          codeExample: `// Regular function
function add(a, b) { return a + b; }
// Arrow function
const add = (a, b) => a + b;`,
          tags: ['functions', 'es6', 'syntax']
        },
        {
          id: '1-3',
          question: 'What is closure in JavaScript?',
          answer: 'A closure is a function that has access to variables in its outer scope even after the outer function has returned.',
          category: 'javascript',
          difficulty: 'medium',
          explanation: 'Closures are created every time a function is created, at function creation time.',
          codeExample: `function outer() {
  const name = 'John';
  return function inner() {
    console.log(name); // Can access name from outer scope
  };
}`,
          tags: ['closure', 'scope', 'functions']
        },
        {
          id: '1-4',
          question: 'What is event delegation?',
          answer: 'Event delegation is a technique of attaching a single event listener to a parent element to handle events from child elements.',
          category: 'javascript',
          difficulty: 'medium',
          explanation: 'This leverages event bubbling and is more efficient for dynamic content.',
          tags: ['events', 'dom', 'performance']
        },
        {
          id: '1-5',
          question: 'What is the difference between == and ===?',
          answer: '== performs type coercion before comparison, while === checks both value and type without coercion.',
          category: 'javascript',
          difficulty: 'easy',
          tags: ['operators', 'comparison', 'type-coercion']
        },
        {
          id: '1-6',
          question: 'What are promises in JavaScript?',
          answer: 'Promises are objects representing the eventual completion or failure of an asynchronous operation.',
          category: 'javascript',
          difficulty: 'medium',
          codeExample: `const promise = new Promise((resolve, reject) => {
  // Async operation
  if (success) resolve(value);
  else reject(error);
});`,
          tags: ['async', 'promises', 'es6']
        },
        {
          id: '1-7',
          question: 'What is the event loop?',
          answer: 'The event loop is a mechanism that handles asynchronous callbacks by continuously checking the call stack and callback queue.',
          category: 'javascript',
          difficulty: 'hard',
          explanation: 'It allows JavaScript to be non-blocking despite being single-threaded.',
          tags: ['event-loop', 'async', 'concurrency']
        },
        {
          id: '1-8',
          question: 'What is hoisting in JavaScript?',
          answer: 'Hoisting is JavaScript behavior where variable and function declarations are moved to the top of their containing scope during compilation.',
          category: 'javascript',
          difficulty: 'medium',
          tags: ['hoisting', 'variables', 'functions']
        },
        {
          id: '1-9',
          question: 'What are template literals?',
          answer: 'Template literals are string literals allowing embedded expressions, multi-line strings, and string interpolation.',
          category: 'javascript',
          difficulty: 'easy',
          codeExample: 'const name = "John";\nconst greeting = `Hello, ${name}!`;',
          tags: ['es6', 'strings', 'syntax']
        },
        {
          id: '1-10',
          question: 'What is destructuring assignment?',
          answer: 'Destructuring allows extracting values from arrays or properties from objects into distinct variables.',
          category: 'javascript',
          difficulty: 'medium',
          codeExample: `// Array destructuring
const [first, second] = [1, 2];
// Object destructuring
const { name, age } = person;`,
          tags: ['es6', 'destructuring', 'syntax']
        },
        {
          id: '1-11',
          question: 'What is the spread operator?',
          answer: 'The spread operator (...) allows an iterable to be expanded in places where zero or more arguments/elements are expected.',
          category: 'javascript',
          difficulty: 'medium',
          codeExample: `const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]`,
          tags: ['es6', 'operators', 'arrays']
        },
        {
          id: '1-12',
          question: 'What are JavaScript modules?',
          answer: 'Modules are reusable pieces of code that can be exported from one file and imported into another.',
          category: 'javascript',
          difficulty: 'medium',
          codeExample: `// Export
export const name = 'value';
// Import
import { name } from './module.js';`,
          tags: ['modules', 'es6', 'import-export']
        },
        {
          id: '1-13',
          question: 'What is the "this" keyword?',
          answer: '"this" refers to the object that is executing the current function. Its value depends on how the function is called.',
          category: 'javascript',
          difficulty: 'hard',
          explanation: 'In methods, "this" refers to the object. In regular functions, it refers to the global object (or undefined in strict mode).',
          tags: ['this', 'context', 'objects']
        },
        {
          id: '1-14',
          question: 'What are generators?',
          answer: 'Generators are functions that can be exited and later re-entered, with their context saved across re-entrances.',
          category: 'javascript',
          difficulty: 'hard',
          codeExample: `function* generator() {
  yield 1;
  yield 2;
  return 3;
}`,
          tags: ['generators', 'es6', 'iterators']
        },
        {
          id: '1-15',
          question: 'What is the difference between null and undefined?',
          answer: 'undefined means a variable has been declared but not assigned a value. null is an assignment value representing no value.',
          category: 'javascript',
          difficulty: 'easy',
          tags: ['types', 'null', 'undefined']
        }
      ]
    },
    {
      id: '2',
      name: 'React Mastery',
      description: 'Advanced React patterns and best practices',
      category: 'react',
      icon: '⚛️',
      color: '#61dafb',
      cards: [
        {
          id: '2-1',
          question: 'What is JSX?',
          answer: 'JSX is a syntax extension for JavaScript that allows writing HTML-like code in JavaScript.',
          category: 'react',
          difficulty: 'easy',
          tags: ['jsx', 'syntax', 'fundamentals']
        },
        {
          id: '2-2',
          question: 'What are React hooks?',
          answer: 'Hooks are functions that let you use state and other React features in functional components.',
          category: 'react',
          difficulty: 'medium',
          tags: ['hooks', 'functional-components', 'state']
        },
        {
          id: '2-3',
          question: 'What is the virtual DOM?',
          answer: 'The virtual DOM is a lightweight copy of the real DOM that React uses for performance optimization.',
          category: 'react',
          difficulty: 'medium',
          explanation: 'React compares virtual DOM with real DOM and only updates what changed.',
          tags: ['virtual-dom', 'performance', 'rendering']
        },
        {
          id: '2-4',
          question: 'What is the difference between state and props?',
          answer: 'State is internal and mutable data managed by the component. Props are external and immutable data passed to the component.',
          category: 'react',
          difficulty: 'easy',
          tags: ['state', 'props', 'data-flow']
        },
        {
          id: '2-5',
          question: 'What are React fragments?',
          answer: 'Fragments let you group multiple elements without adding extra nodes to the DOM.',
          category: 'react',
          difficulty: 'medium',
          codeExample: `return (
  <>
    <ChildA />
    <ChildB />
  </>
);`,
          tags: ['fragments', 'jsx', 'performance']
        },
        {
          id: '2-6',
          question: 'What is context API?',
          answer: 'Context provides a way to pass data through the component tree without having to pass props down manually at every level.',
          category: 'react',
          difficulty: 'medium',
          tags: ['context', 'state-management', 'props-drilling']
        },
        {
          id: '2-7',
          question: 'What are higher-order components?',
          answer: 'HOCs are functions that take a component and return a new component with enhanced functionality.',
          category: 'react',
          difficulty: 'hard',
          tags: ['hoc', 'patterns', 'composition']
        },
        {
          id: '2-8',
          question: 'What is React.memo?',
          answer: 'React.memo is a higher-order component that memoizes functional components to prevent unnecessary re-renders.',
          category: 'react',
          difficulty: 'medium',
          tags: ['memo', 'performance', 'optimization']
        },
        {
          id: '2-9',
          question: 'What are custom hooks?',
          answer: 'Custom hooks are JavaScript functions that use other hooks and allow sharing stateful logic between components.',
          category: 'react',
          difficulty: 'medium',
          tags: ['custom-hooks', 'reusability', 'logic']
        },
        {
          id: '2-10',
          question: 'What is the key prop?',
          answer: 'The key prop helps React identify which items have changed, are added, or are removed in lists.',
          category: 'react',
          difficulty: 'easy',
          tags: ['key', 'lists', 'performance']
        },
        {
          id: '2-11',
          question: 'What is error boundary?',
          answer: 'Error boundaries are React components that catch JavaScript errors anywhere in their child component tree.',
          category: 'react',
          difficulty: 'medium',
          tags: ['error-handling', 'components', 'reliability']
        },
        {
          id: '2-12',
          question: 'What is React suspense?',
          answer: 'Suspense lets components "wait" for something before rendering, typically used with lazy loading.',
          category: 'react',
          difficulty: 'hard',
          tags: ['suspense', 'lazy-loading', 'async']
        },
        {
          id: '2-13',
          question: 'What are controlled vs uncontrolled components?',
          answer: 'Controlled components have form data handled by React state. Uncontrolled components have form data handled by the DOM.',
          category: 'react',
          difficulty: 'medium',
          tags: ['forms', 'components', 'state']
        },
        {
          id: '2-14',
          question: 'What is React portal?',
          answer: 'Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.',
          category: 'react',
          difficulty: 'hard',
          tags: ['portals', 'dom', 'modals']
        },
        {
          id: '2-15',
          question: 'What is the difference between useCallback and useMemo?',
          answer: 'useCallback memoizes functions, useMemo memoizes values. Both help with performance optimization.',
          category: 'react',
          difficulty: 'hard',
          tags: ['hooks', 'performance', 'memoization']
        }
      ]
    },
    {
      id: '3',
      name: 'Node.js & Backend',
      description: 'Server-side JavaScript and backend development',
      category: 'nodejs',
      icon: '🟢',
      color: '#68a063',
      cards: [
        {
          id: '3-1',
          question: 'What is the event-driven architecture in Node.js?',
          answer: 'Node.js uses an event-driven architecture where actions (events) trigger callbacks, enabling non-blocking I/O operations.',
          category: 'nodejs',
          difficulty: 'medium',
          tags: ['event-driven', 'architecture', 'non-blocking']
        },
        {
          id: '3-2',
          question: 'What is the difference between require and import?',
          answer: 'require is CommonJS syntax (synchronous), import is ES6 syntax (asynchronous). Import is preferred in modern code.',
          category: 'nodejs',
          difficulty: 'medium',
          tags: ['modules', 'import', 'require']
        },
        {
          id: '3-3',
          question: 'What is middleware in Express.js?',
          answer: 'Middleware are functions that have access to request and response objects, and can execute code, modify requests, or end the request-response cycle.',
          category: 'nodejs',
          difficulty: 'medium',
          tags: ['express', 'middleware', 'requests']
        },
        {
          id: '3-4',
          question: 'What is package.json?',
          answer: 'package.json is a manifest file that contains metadata about the project, dependencies, scripts, and other configurations.',
          category: 'nodejs',
          difficulty: 'easy',
          tags: ['npm', 'dependencies', 'configuration']
        },
        {
          id: '3-5',
          question: 'What is the Node.js event loop?',
          answer: 'The event loop is what allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel when possible.',
          category: 'nodejs',
          difficulty: 'hard',
          tags: ['event-loop', 'non-blocking', 'performance']
        },
        {
          id: '3-6',
          question: 'What are streams in Node.js?',
          answer: 'Streams are objects that let you read data from a source or write data to a destination in a continuous fashion.',
          category: 'nodejs',
          difficulty: 'medium',
          tags: ['streams', 'i/o', 'performance']
        },
        {
          id: '3-7',
          question: 'What is clustering in Node.js?',
          answer: 'Clustering allows you to create child processes (workers) that share server ports, enabling better utilization of multi-core systems.',
          category: 'nodejs',
          difficulty: 'hard',
          tags: ['clustering', 'performance', 'multi-core']
        },
        {
          id: '3-8',
          question: 'What is the purpose of process.env?',
          answer: 'process.env gives access to environment variables in Node.js applications.',
          category: 'nodejs',
          difficulty: 'easy',
          tags: ['environment-variables', 'configuration', 'security']
        },
        {
          id: '3-9',
          question: 'What is JWT?',
          answer: 'JSON Web Token is a standard for securely transmitting information between parties as a JSON object.',
          category: 'nodejs',
          difficulty: 'medium',
          tags: ['authentication', 'jwt', 'security']
        },
        {
          id: '3-10',
          question: 'What is CORS?',
          answer: 'Cross-Origin Resource Sharing is a mechanism that allows restricted resources on a web page to be requested from another domain.',
          category: 'nodejs',
          difficulty: 'medium',
          tags: ['cors', 'security', 'http']
        },
        {
          id: '3-11',
          question: 'What is the difference between development and production dependencies?',
          answer: 'Development dependencies are only needed during development, while production dependencies are needed for the app to run.',
          category: 'nodejs',
          difficulty: 'easy',
          tags: ['dependencies', 'npm', 'development']
        },
        {
          id: '3-12',
          question: 'What is RESTful API?',
          answer: 'RESTful API is an architectural style for designing networked applications using HTTP protocols and stateless operations.',
          category: 'nodejs',
          difficulty: 'medium',
          tags: ['rest', 'api', 'http']
        },
        {
          id: '3-13',
          question: 'What is GraphQL?',
          answer: 'GraphQL is a query language for APIs that allows clients to request exactly the data they need.',
          category: 'nodejs',
          difficulty: 'medium',
          tags: ['graphql', 'api', 'query']
        },
        {
          id: '3-14',
          question: 'What is middleware chaining?',
          answer: 'Middleware chaining is the process of executing multiple middleware functions in sequence for a single route.',
          category: 'nodejs',
          difficulty: 'medium',
          tags: ['middleware', 'express', 'routing']
        },
        {
          id: '3-15',
          question: 'What is the purpose of the next function in Express middleware?',
          answer: 'The next function passes control to the next middleware function in the stack. If not called, the request will hang.',
          category: 'nodejs',
          difficulty: 'medium',
          tags: ['middleware', 'express', 'next']
        }
      ]
    },
    {
      id: '4',
      name: 'Python Programming',
      description: 'Python syntax, data structures, and advanced features',
      category: 'python',
      icon: '🐍',
      color: '#3776ab',
      cards: [
        {
          id: '4-1',
          question: 'What are Python decorators?',
          answer: 'Decorators are functions that modify the behavior of other functions or methods without permanently modifying them.',
          category: 'python',
          difficulty: 'medium',
          codeExample: `@decorator
def my_function():
    pass`,
          tags: ['decorators', 'functions', 'syntax']
        },
        {
          id: '4-2',
          question: 'What is the difference between lists and tuples?',
          answer: 'Lists are mutable (can be modified), tuples are immutable (cannot be modified after creation).',
          category: 'python',
          difficulty: 'easy',
          tags: ['lists', 'tuples', 'data-structures']
        },
        {
          id: '4-3',
          question: 'What are list comprehensions?',
          answer: 'List comprehensions provide a concise way to create lists based on existing lists or iterables.',
          category: 'python',
          difficulty: 'medium',
          codeExample: `squares = [x**2 for x in range(10)]`,
          tags: ['list-comprehensions', 'syntax', 'lists']
        },
        {
          id: '4-4',
          question: 'What is the Global Interpreter Lock?',
          answer: 'GIL is a mutex that allows only one thread to execute Python bytecode at a time, even on multi-core systems.',
          category: 'python',
          difficulty: 'hard',
          tags: ['gil', 'multithreading', 'performance']
        },
        {
          id: '4-5',
          question: 'What are Python generators?',
          answer: 'Generators are functions that return an iterable generator object, producing values one at a time using yield.',
          category: 'python',
          difficulty: 'medium',
          tags: ['generators', 'iterators', 'memory']
        },
        {
          id: '4-6',
          question: 'What is the difference between __str__ and __repr__?',
          answer: '__str__ is for readable output for end users, __repr__ is for unambiguous output for developers.',
          category: 'python',
          difficulty: 'medium',
          tags: ['magic-methods', 'objects', 'representation']
        },
        {
          id: '4-7',
          question: 'What are context managers?',
          answer: 'Context managers manage resources using the with statement, ensuring proper acquisition and release of resources.',
          category: 'python',
          difficulty: 'medium',
          codeExample: `with open('file.txt', 'r') as file:
    content = file.read()`,
          tags: ['context-managers', 'resources', 'with']
        },
        {
          id: '4-8',
          question: 'What is the difference between shallow and deep copy?',
          answer: 'Shallow copy creates a new object but references nested objects. Deep copy creates a new object and recursively copies nested objects.',
          category: 'python',
          difficulty: 'medium',
          tags: ['copy', 'objects', 'memory']
        },
        {
          id: '4-9',
          question: 'What are Python dataclasses?',
          answer: 'Dataclasses are decorators that automatically generate special methods like __init__ and __repr__ for classes.',
          category: 'python',
          difficulty: 'medium',
          tags: ['dataclasses', 'classes', 'syntax']
        },
        {
          id: '4-10',
          question: 'What is the purpose of if __name__ == "__main__"?',
          answer: 'This condition checks if the script is being run directly (not imported), allowing code to only run when executed directly.',
          category: 'python',
          difficulty: 'easy',
          tags: ['main', 'modules', 'execution']
        },
        {
          id: '4-11',
          question: 'What are Python type hints?',
          answer: 'Type hints are optional annotations that indicate the expected types of variables, function parameters, and return values.',
          category: 'python',
          difficulty: 'medium',
          codeExample: `def greet(name: str) -> str:
    return f"Hello, {name}"`,
          tags: ['type-hints', 'typing', 'documentation']
        },
        {
          id: '4-12',
          question: 'What is the difference between @staticmethod and @classmethod?',
          answer: '@staticmethod doesn\'t receive any special first argument. @classmethod receives the class as first argument (cls).',
          category: 'python',
          difficulty: 'medium',
          tags: ['methods', 'classes', 'decorators']
        },
        {
          id: '4-13',
          question: 'What are Python async/await?',
          answer: 'async/await are keywords for writing asynchronous code that can perform non-blocking I/O operations.',
          category: 'python',
          difficulty: 'hard',
          tags: ['async', 'await', 'asyncio']
        },
        {
          id: '4-14',
          question: 'What is method resolution order?',
          answer: 'MRO is the order in which Python looks for methods in a hierarchy of classes, using C3 linearization algorithm.',
          category: 'python',
          difficulty: 'hard',
          tags: ['mro', 'inheritance', 'classes']
        },
        {
          id: '4-15',
          question: 'What are Python descriptors?',
          answer: 'Descriptors are objects that define how attribute access works for other objects, implementing __get__, __set__, or __delete__.',
          category: 'python',
          difficulty: 'hard',
          tags: ['descriptors', 'attributes', 'classes']
        }
      ]
    },
    {
      id: '5',
      name: 'Database Systems',
      description: 'SQL, NoSQL, and database design principles',
      category: 'database',
      icon: '🗄️',
      color: '#10b981',
      cards: [
        {
          id: '5-1',
          question: 'What is ACID in database transactions?',
          answer: 'ACID stands for Atomicity, Consistency, Isolation, Durability - properties that guarantee reliable processing of database transactions.',
          category: 'database',
          difficulty: 'medium',
          tags: ['acid', 'transactions', 'reliability']
        },
        {
          id: '5-2',
          question: 'What is database normalization?',
          answer: 'Normalization is the process of organizing data to reduce redundancy and improve data integrity.',
          category: 'database',
          difficulty: 'medium',
          tags: ['normalization', 'design', 'integrity']
        },
        {
          id: '5-3',
          question: 'What are database indexes?',
          answer: 'Indexes are data structures that improve the speed of data retrieval operations on database tables.',
          category: 'database',
          difficulty: 'medium',
          tags: ['indexes', 'performance', 'optimization']
        },
        {
          id: '5-4',
          question: 'What is the difference between SQL and NoSQL?',
          answer: 'SQL databases are relational with structured schema, NoSQL databases are non-relational with flexible schema.',
          category: 'database',
          difficulty: 'easy',
          tags: ['sql', 'nosql', 'databases']
        },
        {
          id: '5-5',
          question: 'What is a foreign key?',
          answer: 'A foreign key is a field in one table that uniquely identifies a row in another table, establishing a relationship between tables.',
          category: 'database',
          difficulty: 'easy',
          tags: ['foreign-key', 'relationships', 'constraints']
        },
        {
          id: '5-6',
          question: 'What are database transactions?',
          answer: 'Transactions are sequences of operations performed as a single logical unit of work, either fully completed or fully rolled back.',
          category: 'database',
          difficulty: 'medium',
          tags: ['transactions', 'acid', 'operations']
        },
        {
          id: '5-7',
          question: 'What is database sharding?',
          answer: 'Sharding is horizontal partitioning of data across multiple databases to improve scalability and performance.',
          category: 'database',
          difficulty: 'hard',
          tags: ['sharding', 'scaling', 'performance']
        },
        {
          id: '5-8',
          question: 'What is CAP theorem?',
          answer: 'CAP theorem states that a distributed system can only guarantee two of three: Consistency, Availability, Partition tolerance.',
          category: 'database',
          difficulty: 'hard',
          tags: ['cap-theorem', 'distributed-systems', 'theory']
        },
        {
          id: '5-9',
          question: 'What are database views?',
          answer: 'Views are virtual tables based on the result of a SQL query, providing a way to present data without storing it physically.',
          category: 'database',
          difficulty: 'medium',
          tags: ['views', 'queries', 'security']
        },
        {
          id: '5-10',
          question: 'What is database replication?',
          answer: 'Replication is the process of copying and maintaining database objects in multiple databases for availability and performance.',
          category: 'database',
          difficulty: 'medium',
          tags: ['replication', 'availability', 'backup']
        },
        {
          id: '5-11',
          question: 'What are stored procedures?',
          answer: 'Stored procedures are precompiled SQL statements stored in the database that can be executed as a single unit.',
          category: 'database',
          difficulty: 'medium',
          tags: ['stored-procedures', 'sql', 'performance']
        },
        {
          id: '5-12',
          question: 'What is database deadlock?',
          answer: 'Deadlock occurs when two or more transactions are waiting for each other to release locks, creating a circular wait condition.',
          category: 'database',
          difficulty: 'hard',
          tags: ['deadlock', 'concurrency', 'locks']
        },
        {
          id: '5-13',
          question: 'What is database connection pooling?',
          answer: 'Connection pooling maintains a cache of database connections that can be reused, reducing overhead of establishing new connections.',
          category: 'database',
          difficulty: 'medium',
          tags: ['connection-pooling', 'performance', 'resources']
        },
        {
          id: '5-14',
          question: 'What are database triggers?',
          answer: 'Triggers are database objects that automatically execute in response to certain events on a table or view.',
          category: 'database',
          difficulty: 'medium',
          tags: ['triggers', 'automation', 'events']
        },
        {
          id: '5-15',
          question: 'What is OLAP vs OLTP?',
          answer: 'OLTP handles transaction-oriented tasks, OLAP handles analytical processing and complex queries on historical data.',
          category: 'database',
          difficulty: 'medium',
          tags: ['olap', 'oltp', 'processing']
        }
      ]
    },
    {
      id: '6',
      name: 'System Design',
      description: 'Scalable architecture and distributed systems',
      category: 'system-design',
      icon: '🏗️',
      color: '#ef4444',
      cards: [
        {
          id: '6-1',
          question: 'What is microservices architecture?',
          answer: 'Microservices architecture structures an application as a collection of loosely coupled, independently deployable services.',
          category: 'system-design',
          difficulty: 'medium',
          tags: ['microservices', 'architecture', 'scalability']
        },
        {
          id: '6-2',
          question: 'What is load balancing?',
          answer: 'Load balancing distributes incoming network traffic across multiple servers to ensure no single server becomes overwhelmed.',
          category: 'system-design',
          difficulty: 'medium',
          tags: ['load-balancing', 'scalability', 'performance']
        },
        {
          id: '6-3',
          question: 'What is caching and why is it important?',
          answer: 'Caching stores frequently accessed data in fast storage to reduce latency and improve performance.',
          category: 'system-design',
          difficulty: 'easy',
          tags: ['caching', 'performance', 'latency']
        },
        {
          id: '6-4',
          question: 'What is CDN?',
          answer: 'Content Delivery Network is a distributed network of servers that delivers web content based on user geographic location.',
          category: 'system-design',
          difficulty: 'medium',
          tags: ['cdn', 'performance', 'content-delivery']
        },
        {
          id: '6-5',
          question: 'What is database indexing and how does it work?',
          answer: 'Indexing creates data structures that allow faster data retrieval by maintaining a sorted representation of data.',
          category: 'system-design',
          difficulty: 'medium',
          tags: ['indexing', 'database', 'performance']
        },
        {
          id: '6-6',
          question: 'What is horizontal vs vertical scaling?',
          answer: 'Horizontal scaling adds more machines, vertical scaling adds more power to existing machines.',
          category: 'system-design',
          difficulty: 'easy',
          tags: ['scaling', 'architecture', 'performance']
        },
        {
          id: '6-7',
          question: 'What is message queue?',
          answer: 'Message queues enable asynchronous communication between services by storing and forwarding messages.',
          category: 'system-design',
          difficulty: 'medium',
          tags: ['message-queue', 'async', 'communication']
        },
        {
          id: '6-8',
          question: 'What is API gateway?',
          answer: 'API gateway is a single entry point that manages and routes API requests to appropriate backend services.',
          category: 'system-design',
          difficulty: 'medium',
          tags: ['api-gateway', 'microservices', 'routing']
        },
        {
          id: '6-9',
          question: 'What is circuit breaker pattern?',
          answer: 'Circuit breaker prevents cascading failures by stopping requests to a failing service and providing fallback mechanisms.',
          category: 'system-design',
          difficulty: 'hard',
          tags: ['circuit-breaker', 'resilience', 'patterns']
        },
        {
          id: '6-10',
          question: 'What is consistent hashing?',
          answer: 'Consistent hashing minimizes reorganization when hash table size changes, important for distributed caching and load balancing.',
          category: 'system-design',
          difficulty: 'hard',
          tags: ['hashing', 'distributed-systems', 'caching']
        },
        {
          id: '6-11',
          question: 'What is database replication?',
          answer: 'Database replication involves maintaining multiple copies of data across different servers for availability and fault tolerance.',
          category: 'system-design',
          difficulty: 'medium',
          tags: ['replication', 'availability', 'backup']
        },
        {
          id: '6-12',
          question: 'What is sharding?',
          answer: 'Sharding partitions data across multiple databases to distribute load and improve performance.',
          category: 'system-design',
          difficulty: 'hard',
          tags: ['sharding', 'scaling', 'partitioning']
        },
        {
          id: '6-13',
          question: 'What is eventual consistency?',
          answer: 'Eventual consistency guarantees that if no new updates are made, eventually all accesses will return the last updated value.',
          category: 'system-design',
          difficulty: 'medium',
          tags: ['consistency', 'distributed-systems', 'cap']
        },
        {
          id: '6-14',
          question: 'What is service discovery?',
          answer: 'Service discovery automatically detects services in a distributed system and their network locations.',
          category: 'system-design',
          difficulty: 'medium',
          tags: ['service-discovery', 'microservices', 'networking']
        },
        {
          id: '6-15',
          question: 'What is rate limiting?',
          answer: 'Rate limiting controls the rate of requests a client can make to an API, preventing abuse and ensuring fair usage.',
          category: 'system-design',
          difficulty: 'medium',
          tags: ['rate-limiting', 'security', 'performance']
        }
      ]
    },
    {
      id: '7',
      name: 'Data Structures',
      description: 'Fundamental data structures and their implementations',
      category: 'dsa',
      icon: '📊',
      color: '#8b5cf6',
      cards: [
        {
          id: '7-1',
          question: 'What is the time complexity of binary search?',
          answer: 'O(log n) for search operations on sorted arrays.',
          category: 'dsa',
          difficulty: 'easy',
          tags: ['binary-search', 'time-complexity', 'algorithms']
        },
        {
          id: '7-2',
          question: 'What is a hash table and how does it work?',
          answer: 'A hash table stores key-value pairs using a hash function to compute an index into an array of buckets.',
          category: 'dsa',
          difficulty: 'medium',
          tags: ['hash-table', 'data-structures', 'hashing']
        },
        {
          id: '7-3',
          question: 'What is the difference between array and linked list?',
          answer: 'Arrays have contiguous memory and constant-time access, linked lists have non-contiguous memory and sequential access.',
          category: 'dsa',
          difficulty: 'easy',
          tags: ['array', 'linked-list', 'data-structures']
        },
        {
          id: '7-4',
          question: 'What is a binary tree?',
          answer: 'A binary tree is a tree data structure where each node has at most two children, referred to as left and right child.',
          category: 'dsa',
          difficulty: 'medium',
          tags: ['binary-tree', 'trees', 'data-structures']
        },
        {
          id: '7-5',
          question: 'What is a heap?',
          answer: 'A heap is a specialized tree-based data structure that satisfies the heap property (min-heap or max-heap).',
          category: 'dsa',
          difficulty: 'medium',
          tags: ['heap', 'priority-queue', 'data-structures']
        },
        {
          id: '7-6',
          question: 'What is a graph?',
          answer: 'A graph is a collection of nodes (vertices) connected by edges, which can be directed or undirected.',
          category: 'dsa',
          difficulty: 'medium',
          tags: ['graph', 'data-structures', 'networks']
        },
        {
          id: '7-7',
          question: 'What is the difference between BFS and DFS?',
          answer: 'BFS explores level by level, DFS explores as far as possible along each branch before backtracking.',
          category: 'dsa',
          difficulty: 'medium',
          tags: ['bfs', 'dfs', 'graph-traversal']
        },
        {
          id: '7-8',
          question: 'What is a trie?',
          answer: 'A trie is a tree-like data structure for storing strings, where each node represents a character and paths form words.',
          category: 'dsa',
          difficulty: 'hard',
          tags: ['trie', 'strings', 'data-structures']
        },
        {
          id: '7-9',
          question: 'What is dynamic programming?',
          answer: 'Dynamic programming solves complex problems by breaking them down into simpler subproblems and storing their solutions.',
          category: 'dsa',
          difficulty: 'hard',
          tags: ['dynamic-programming', 'algorithms', 'optimization']
        },
        {
          id: '7-10',
          question: 'What is a stack?',
          answer: 'A stack is a LIFO data structure that supports push (add) and pop (remove) operations.',
          category: 'dsa',
          difficulty: 'easy',
          tags: ['stack', 'data-structures', 'lifo']
        },
        {
          id: '7-11',
          question: 'What is a queue?',
          answer: 'A queue is a FIFO data structure that supports enqueue (add) and dequeue (remove) operations.',
          category: 'dsa',
          difficulty: 'easy',
          tags: ['queue', 'data-structures', 'fifo']
        },
        {
          id: '7-12',
          question: 'What is a balanced binary tree?',
          answer: 'A balanced binary tree maintains a height difference of at most 1 between left and right subtrees for all nodes.',
          category: 'dsa',
          difficulty: 'medium',
          tags: ['balanced-tree', 'trees', 'avl']
        },
        {
          id: '7-13',
          question: 'What is a hash collision?',
          answer: 'A hash collision occurs when two different keys produce the same hash value, requiring collision resolution strategies.',
          category: 'dsa',
          difficulty: 'medium',
          tags: ['hash-collision', 'hashing', 'data-structures']
        },
        {
          id: '7-14',
          question: 'What is the time complexity of quicksort?',
          answer: 'Average case: O(n log n), Worst case: O(n²) when pivot selection is poor.',
          category: 'dsa',
          difficulty: 'medium',
          tags: ['quicksort', 'sorting', 'time-complexity']
        },
        {
          id: '7-15',
          question: 'What is a red-black tree?',
          answer: 'A red-black tree is a self-balancing binary search tree with additional color properties to maintain balance.',
          category: 'dsa',
          difficulty: 'hard',
          tags: ['red-black-tree', 'balanced-trees', 'data-structures']
        }
      ]
    },
    {
      id: '8',
      name: 'Algorithms',
      description: 'Common algorithms and problem-solving patterns',
      category: 'algorithms',
      icon: '🔍',
      color: '#06b6d4',
      cards: [
        {
          id: '8-1',
          question: 'What is the time complexity of merge sort?',
          answer: 'O(n log n) in all cases (best, average, worst).',
          category: 'algorithms',
          difficulty: 'medium',
          tags: ['merge-sort', 'sorting', 'time-complexity']
        },
        {
          id: '8-2',
          question: 'What is Dijkstra\'s algorithm?',
          answer: 'Dijkstra\'s algorithm finds the shortest path between nodes in a graph with non-negative edge weights.',
          category: 'algorithms',
          difficulty: 'hard',
          tags: ['dijkstra', 'shortest-path', 'graphs']
        },
        {
          id: '8-3',
          question: 'What is the sliding window technique?',
          answer: 'Sliding window maintains a subset of data that moves through a larger dataset, useful for substring and subarray problems.',
          category: 'algorithms',
          difficulty: 'medium',
          tags: ['sliding-window', 'patterns', 'optimization']
        },
        {
          id: '8-4',
          question: 'What is the two-pointer technique?',
          answer: 'Two-pointer uses two pointers to traverse data structures from different positions, often used for searching and validation.',
          category: 'algorithms',
          difficulty: 'medium',
          tags: ['two-pointer', 'patterns', 'optimization']
        },
        {
          id: '8-5',
          question: 'What is backtracking?',
          answer: 'Backtracking builds candidates for solutions and abandons them when they cannot lead to valid solutions.',
          category: 'algorithms',
          difficulty: 'hard',
          tags: ['backtracking', 'recursion', 'search']
        },
        {
          id: '8-6',
          question: 'What is greedy algorithm?',
          answer: 'Greedy algorithms make locally optimal choices at each step hoping to find global optimum.',
          category: 'algorithms',
          difficulty: 'medium',
          tags: ['greedy', 'algorithms', 'optimization']
        },
        {
          id: '8-7',
          question: 'What is divide and conquer?',
          answer: 'Divide and conquer breaks problems into smaller subproblems, solves them recursively, and combines solutions.',
          category: 'algorithms',
          difficulty: 'medium',
          tags: ['divide-conquer', 'algorithms', 'recursion']
        },
        {
          id: '8-8',
          question: 'What is topological sort?',
          answer: 'Topological sort orders vertices in a directed acyclic graph such that for every edge u→v, u comes before v.',
          category: 'algorithms',
          difficulty: 'hard',
          tags: ['topological-sort', 'graphs', 'ordering']
        },
        {
          id: '8-9',
          question: 'What is Kadane\'s algorithm?',
          answer: 'Kadane\'s algorithm finds the maximum subarray sum in O(n) time using dynamic programming.',
          category: 'algorithms',
          difficulty: 'medium',
          tags: ['kadane', 'dynamic-programming', 'arrays']
        },
        {
          id: '8-10',
          question: 'What is Floyd\'s cycle detection?',
          answer: 'Floyd\'s algorithm detects cycles in linked lists using two pointers moving at different speeds.',
          category: 'algorithms',
          difficulty: 'medium',
          tags: ['cycle-detection', 'linked-lists', 'algorithms']
        },
        {
          id: '8-11',
          question: 'What is binary search algorithm?',
          answer: 'Binary search efficiently finds an item in a sorted array by repeatedly dividing the search interval in half.',
          category: 'algorithms',
          difficulty: 'easy',
          tags: ['binary-search', 'search', 'algorithms']
        },
        {
          id: '8-12',
          question: 'What is the Knuth-Morris-Pratt algorithm?',
          answer: 'KMP is a string searching algorithm that uses failure function to avoid unnecessary comparisons.',
          category: 'algorithms',
          difficulty: 'hard',
          tags: ['kmp', 'string-search', 'algorithms']
        },
        {
          id: '8-13',
          question: 'What is union-find data structure?',
          answer: 'Union-find tracks elements partitioned into disjoint sets and supports union and find operations efficiently.',
          category: 'algorithms',
          difficulty: 'hard',
          tags: ['union-find', 'data-structures', 'disjoint-sets']
        },
        {
          id: '8-14',
          question: 'What is the A* search algorithm?',
          answer: 'A* is a pathfinding algorithm that uses heuristics to find the shortest path more efficiently than Dijkstra.',
          category: 'algorithms',
          difficulty: 'hard',
          tags: ['a-star', 'pathfinding', 'graphs']
        },
        {
          id: '8-15',
          question: 'What is the Rabin-Karp algorithm?',
          answer: 'Rabin-Karp is a string searching algorithm that uses hashing to find any pattern in text.',
          category: 'algorithms',
          difficulty: 'hard',
          tags: ['rabin-karp', 'string-search', 'hashing']
        }
      ]
    },
    {
      id: '9',
      name: 'Operating Systems',
      description: 'OS concepts, processes, memory management',
      category: 'os',
      icon: '💻',
      color: '#6366f1',
      cards: [
        {
          id: '9-1',
          question: 'What is virtual memory?',
          answer: 'Virtual memory allows programs to use more memory than physically available by using disk space as an extension of RAM.',
          category: 'os',
          difficulty: 'medium',
          tags: ['virtual-memory', 'memory-management', 'os']
        },
        {
          id: '9-2',
          question: 'What is a process vs thread?',
          answer: 'Process is an independent execution unit with its own memory space. Thread is a lightweight process that shares memory with other threads.',
          category: 'os',
          difficulty: 'easy',
          tags: ['process', 'thread', 'concurrency']
        },
        {
          id: '9-3',
          question: 'What is deadlock?',
          answer: 'Deadlock occurs when two or more processes are waiting for each other to release resources, creating a circular wait.',
          category: 'os',
          difficulty: 'medium',
          tags: ['deadlock', 'concurrency', 'synchronization']
        },
        {
          id: '9-4',
          question: 'What is context switching?',
          answer: 'Context switching is the process of storing and restoring the state of a CPU so that multiple processes can share a single processor.',
          category: 'os',
          difficulty: 'medium',
          tags: ['context-switching', 'scheduling', 'processes']
        },
        {
          id: '9-5',
          question: 'What is paging?',
          answer: 'Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory.',
          category: 'os',
          difficulty: 'medium',
          tags: ['paging', 'memory-management', 'os']
        },
        {
          id: '9-6',
          question: 'What is a semaphore?',
          answer: 'A semaphore is a synchronization primitive that controls access to shared resources using counter-based signaling.',
          category: 'os',
          difficulty: 'hard',
          tags: ['semaphore', 'synchronization', 'concurrency']
        },
        {
          id: '9-7',
          question: 'What is thrashing?',
          answer: 'Thrashing occurs when a computer spends more time swapping pages than executing instructions due to excessive paging.',
          category: 'os',
          difficulty: 'medium',
          tags: ['thrashing', 'memory', 'performance']
        },
        {
          id: '9-8',
          question: 'What is the difference between mutex and semaphore?',
          answer: 'Mutex is a locking mechanism for one thread at a time. Semaphore is a signaling mechanism for multiple threads.',
          category: 'os',
          difficulty: 'hard',
          tags: ['mutex', 'semaphore', 'synchronization']
        },
        {
          id: '9-9',
          question: 'What is CPU scheduling?',
          answer: 'CPU scheduling is the process of selecting which process runs next on the CPU from the ready queue.',
          category: 'os',
          difficulty: 'medium',
          tags: ['scheduling', 'cpu', 'processes']
        },
        {
          id: '9-10',
          question: 'What is a system call?',
          answer: 'A system call is a programmatic way for a program to request a service from the operating system kernel.',
          category: 'os',
          difficulty: 'medium',
          tags: ['system-call', 'kernel', 'api']
        },
        {
          id: '9-11',
          question: 'What is cache memory?',
          answer: 'Cache memory is a small, fast memory that stores frequently accessed data to reduce access time to main memory.',
          category: 'os',
          difficulty: 'easy',
          tags: ['cache', 'memory', 'performance']
        },
        {
          id: '9-12',
          question: 'What is interrupt?',
          answer: 'An interrupt is a signal to the processor indicating an event that needs immediate attention.',
          category: 'os',
          difficulty: 'medium',
          tags: ['interrupt', 'hardware', 'events']
        },
        {
          id: '9-13',
          question: 'What is RAID?',
          answer: 'RAID combines multiple disk drives into a logical unit for data redundancy, performance, or both.',
          category: 'os',
          difficulty: 'medium',
          tags: ['raid', 'storage', 'redundancy']
        },
        {
          id: '9-14',
          question: 'What is a kernel?',
          answer: 'The kernel is the core component of an operating system that manages system resources and hardware communication.',
          category: 'os',
          difficulty: 'easy',
          tags: ['kernel', 'os', 'core']
        },
        {
          id: '9-15',
          question: 'What is virtual file system?',
          answer: 'VFS provides an abstraction layer that allows applications to access different types of file systems in a uniform way.',
          category: 'os',
          difficulty: 'hard',
          tags: ['vfs', 'file-system', 'abstraction']
        }
      ]
    },
    {
      id: '10',
      name: 'Networking',
      description: 'Network protocols, TCP/IP, and web fundamentals',
      category: 'networking',
      icon: '🌐',
      color: '#ec4899',
      cards: [
        {
          id: '10-1',
          question: 'What is the difference between TCP and UDP?',
          answer: 'TCP is connection-oriented, reliable, and ordered. UDP is connectionless, unreliable, and unordered but faster.',
          category: 'networking',
          difficulty: 'easy',
          tags: ['tcp', 'udp', 'protocols']
        },
        {
          id: '10-2',
          question: 'What is HTTP?',
          answer: 'HTTP is an application protocol for distributed, collaborative, hypermedia information systems.',
          category: 'networking',
          difficulty: 'easy',
          tags: ['http', 'web', 'protocols']
        },
        {
          id: '10-3',
          question: 'What is DNS?',
          answer: 'DNS translates domain names to IP addresses, acting as the phonebook of the internet.',
          category: 'networking',
          difficulty: 'easy',
          tags: ['dns', 'networking', 'domain']
        },
        {
          id: '10-4',
          question: 'What is SSL/TLS?',
          answer: 'SSL/TLS provides secure communication over a computer network using encryption and authentication.',
          category: 'networking',
          difficulty: 'medium',
          tags: ['ssl', 'tls', 'security']
        },
        {
          id: '10-5',
          question: 'What is a proxy server?',
          answer: 'A proxy server acts as an intermediary between clients and servers, providing caching, filtering, and anonymity.',
          category: 'networking',
          difficulty: 'medium',
          tags: ['proxy', 'networking', 'security']
        },
        {
          id: '10-6',
          question: 'What is load balancing?',
          answer: 'Load balancing distributes network traffic across multiple servers to ensure reliability and performance.',
          category: 'networking',
          difficulty: 'medium',
          tags: ['load-balancing', 'scalability', 'performance']
        },
        {
          id: '10-7',
          question: 'What is CDN?',
          answer: 'Content Delivery Network distributes content geographically to reduce latency and improve availability.',
          category: 'networking',
          difficulty: 'medium',
          tags: ['cdn', 'performance', 'content']
        },
        {
          id: '10-8',
          question: 'What is HTTP/2?',
          answer: 'HTTP/2 is a major revision of HTTP that includes multiplexing, header compression, and server push.',
          category: 'networking',
          difficulty: 'medium',
          tags: ['http2', 'protocols', 'performance']
        },
        {
          id: '10-9',
          question: 'What is WebSocket?',
          answer: 'WebSocket provides full-duplex communication channels over a single TCP connection for real-time applications.',
          category: 'networking',
          difficulty: 'medium',
          tags: ['websocket', 'real-time', 'communication']
        },
        {
          id: '10-10',
          question: 'What is REST?',
          answer: 'REST is an architectural style for designing networked applications using stateless, cacheable communications.',
          category: 'networking',
          difficulty: 'medium',
          tags: ['rest', 'api', 'architecture']
        },
        {
          id: '10-11',
          question: 'What is CORS?',
          answer: 'Cross-Origin Resource Sharing allows restricted resources on a web page to be requested from another domain.',
          category: 'networking',
          difficulty: 'medium',
          tags: ['cors', 'security', 'web']
        },
        {
          id: '10-12',
          question: 'What is TCP handshake?',
          answer: 'TCP uses a three-way handshake (SYN, SYN-ACK, ACK) to establish a reliable connection between client and server.',
          category: 'networking',
          difficulty: 'medium',
          tags: ['tcp', 'handshake', 'connection']
        },
        {
          id: '10-13',
          question: 'What is IP address?',
          answer: 'An IP address is a unique numerical identifier assigned to each device connected to a computer network.',
          category: 'networking',
          difficulty: 'easy',
          tags: ['ip-address', 'networking', 'identification']
        },
        {
          id: '10-14',
          question: 'What is subnetting?',
          answer: 'Subnetting divides a network into smaller, more efficient sub-networks to improve performance and security.',
          category: 'networking',
          difficulty: 'hard',
          tags: ['subnetting', 'networking', 'ip']
        },
        {
          id: '10-15',
          question: 'What is VPN?',
          answer: 'Virtual Private Network extends a private network across a public network, enabling secure remote access.',
          category: 'networking',
          difficulty: 'medium',
          tags: ['vpn', 'security', 'networking']
        }
      ]
    },
    {
      id: '11',
      name: 'Security',
      description: 'Cybersecurity principles and best practices',
      category: 'security',
      icon: '🔒',
      color: '#f97316',
      cards: [
        {
          id: '11-1',
          question: 'What is XSS?',
          answer: 'Cross-Site Scripting allows attackers to inject malicious scripts into web pages viewed by other users.',
          category: 'security',
          difficulty: 'medium',
          tags: ['xss', 'web-security', 'vulnerability']
        },
        {
          id: '11-2',
          question: 'What is CSRF?',
          answer: 'Cross-Site Request Forgery tricks users into executing unwanted actions in a web application they\'re authenticated to.',
          category: 'security',
          difficulty: 'medium',
          tags: ['csrf', 'web-security', 'vulnerability']
        },
        {
          id: '11-3',
          question: 'What is SQL injection?',
          answer: 'SQL injection allows attackers to execute malicious SQL statements that control a web application\'s database.',
          category: 'security',
          difficulty: 'medium',
          tags: ['sql-injection', 'database', 'vulnerability']
        },
        {
          id: '11-4',
          question: 'What is encryption?',
          answer: 'Encryption converts data into a coded form to prevent unauthorized access, using algorithms and keys.',
          category: 'security',
          difficulty: 'easy',
          tags: ['encryption', 'cryptography', 'security']
        },
        {
          id: '11-5',
          question: 'What is hashing?',
          answer: 'Hashing converts data into a fixed-size string of characters, which is practically impossible to reverse.',
          category: 'security',
          difficulty: 'medium',
          tags: ['hashing', 'cryptography', 'security']
        },
        {
          id: '11-6',
          question: 'What is OAuth?',
          answer: 'OAuth is an open standard for access delegation, commonly used for token-based authentication and authorization.',
          category: 'security',
          difficulty: 'medium',
          tags: ['oauth', 'authentication', 'authorization']
        },
        {
          id: '11-7',
          question: 'What is JWT?',
          answer: 'JSON Web Token is a compact, URL-safe means of representing claims to be transferred between two parties.',
          category: 'security',
          difficulty: 'medium',
          tags: ['jwt', 'tokens', 'authentication']
        },
        {
          id: '11-8',
          question: 'What is two-factor authentication?',
          answer: '2FA requires two different forms of identification to verify user identity, enhancing security.',
          category: 'security',
          difficulty: 'easy',
          tags: ['2fa', 'authentication', 'security']
        },
        {
          id: '11-9',
          question: 'What is a man-in-the-middle attack?',
          answer: 'MITM attack intercepts communication between two parties without their knowledge.',
          category: 'security',
          difficulty: 'medium',
          tags: ['mitm', 'attack', 'security']
        },
        {
          id: '11-10',
          question: 'What is HTTPS?',
          answer: 'HTTPS is HTTP secured by SSL/TLS encryption, providing secure communication over computer networks.',
          category: 'security',
          difficulty: 'easy',
          tags: ['https', 'ssl', 'security']
        },
        {
          id: '11-11',
          question: 'What is a firewall?',
          answer: 'A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules.',
          category: 'security',
          difficulty: 'easy',
          tags: ['firewall', 'security', 'networking']
        },
        {
          id: '11-12',
          question: 'What is penetration testing?',
          answer: 'Penetration testing involves authorized simulated cyber attacks to evaluate system security.',
          category: 'security',
          difficulty: 'medium',
          tags: ['penetration-testing', 'security', 'testing']
        },
        {
          id: '11-13',
          question: 'What is the principle of least privilege?',
          answer: 'Users and systems should be granted only the permissions necessary to perform their required tasks.',
          category: 'security',
          difficulty: 'medium',
          tags: ['least-privilege', 'security', 'principle']
        },
        {
          id: '11-14',
          question: 'What is input validation?',
          answer: 'Input validation ensures only properly formed data enters a system, preventing many security vulnerabilities.',
          category: 'security',
          difficulty: 'easy',
          tags: ['input-validation', 'security', 'prevention']
        },
        {
          id: '11-15',
          question: 'What is a salt in password hashing?',
          answer: 'A salt is random data added to passwords before hashing to prevent rainbow table attacks.',
          category: 'security',
          difficulty: 'medium',
          tags: ['salt', 'hashing', 'passwords']
        }
      ]
    },
    {
      id: '12',
      name: 'DevOps',
      description: 'CI/CD, containerization, and infrastructure',
      category: 'devops',
      icon: '🔧',
      color: '#7c3aed',
      cards: [
        {
          id: '12-1',
          question: 'What is Docker?',
          answer: 'Docker is a platform for developing, shipping, and running applications in containers.',
          category: 'devops',
          difficulty: 'easy',
          tags: ['docker', 'containers', 'devops']
        },
        {
          id: '12-2',
          question: 'What is Kubernetes?',
          answer: 'Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['kubernetes', 'orchestration', 'containers']
        },
        {
          id: '12-3',
          question: 'What is CI/CD?',
          answer: 'Continuous Integration/Continuous Deployment automates the process of testing and deploying code changes.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['ci-cd', 'automation', 'devops']
        },
        {
          id: '12-4',
          question: 'What is infrastructure as code?',
          answer: 'IaC manages and provisions infrastructure through machine-readable definition files rather than manual processes.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['iac', 'automation', 'infrastructure']
        },
        {
          id: '12-5',
          question: 'What is a container?',
          answer: 'A container is a lightweight, standalone, executable package that includes everything needed to run an application.',
          category: 'devops',
          difficulty: 'easy',
          tags: ['containers', 'docker', 'virtualization']
        },
        {
          id: '12-6',
          question: 'What is Jenkins?',
          answer: 'Jenkins is an open-source automation server used for building, testing, and deploying software.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['jenkins', 'ci-cd', 'automation']
        },
        {
          id: '12-7',
          question: 'What is Git?',
          answer: 'Git is a distributed version control system for tracking changes in source code during software development.',
          category: 'devops',
          difficulty: 'easy',
          tags: ['git', 'version-control', 'devops']
        },
        {
          id: '12-8',
          question: 'What is monitoring?',
          answer: 'Monitoring involves collecting and analyzing data about system performance and health to ensure reliability.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['monitoring', 'observability', 'devops']
        },
        {
          id: '12-9',
          question: 'What is a microservices architecture?',
          answer: 'Microservices structure an application as a collection of loosely coupled, independently deployable services.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['microservices', 'architecture', 'devops']
        },
        {
          id: '12-10',
          question: 'What is configuration management?',
          answer: 'Configuration management automates the process of maintaining computer systems and software in a desired state.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['configuration-management', 'automation', 'devops']
        },
        {
          id: '12-11',
          question: 'What is a pod in Kubernetes?',
          answer: 'A pod is the smallest deployable unit in Kubernetes, containing one or more containers that share storage and network.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['pods', 'kubernetes', 'containers']
        },
        {
          id: '12-12',
          question: 'What is blue-green deployment?',
          answer: 'Blue-green deployment maintains two identical production environments, switching traffic between them for zero-downtime deployments.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['blue-green', 'deployment', 'zero-downtime']
        },
        {
          id: '12-13',
          question: 'What is a service mesh?',
          answer: 'A service mesh is a dedicated infrastructure layer for handling service-to-service communication in microservices.',
          category: 'devops',
          difficulty: 'hard',
          tags: ['service-mesh', 'microservices', 'networking']
        },
        {
          id: '12-14',
          question: 'What is GitOps?',
          answer: 'GitOps uses Git as a single source of truth for declarative infrastructure and applications.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['gitops', 'git', 'automation']
        },
        {
          id: '12-15',
          question: 'What is container orchestration?',
          answer: 'Container orchestration automates the deployment, management, scaling, and networking of containers.',
          category: 'devops',
          difficulty: 'medium',
          tags: ['orchestration', 'containers', 'automation']
        }
      ]
    },
    {
      id: '13',
      name: 'Cloud Computing',
      description: 'AWS, Azure, GCP and cloud services',
      category: 'cloud',
      icon: '☁️',
      color: '#3b82f6',
      cards: [
        {
          id: '13-1',
          question: 'What is cloud computing?',
          answer: 'Cloud computing delivers computing services over the internet on a pay-as-you-go basis.',
          category: 'cloud',
          difficulty: 'easy',
          tags: ['cloud-computing', 'fundamentals', 'services']
        },
        {
          id: '13-2',
          question: 'What is IaaS?',
          answer: 'Infrastructure as a Service provides virtualized computing resources over the internet.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['iaas', 'infrastructure', 'cloud']
        },
        {
          id: '13-3',
          question: 'What is PaaS?',
          answer: 'Platform as a Service provides hardware and software tools over the internet for application development.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['paas', 'platform', 'cloud']
        },
        {
          id: '13-4',
          question: 'What is SaaS?',
          answer: 'Software as a Service delivers software applications over the internet on a subscription basis.',
          category: 'cloud',
          difficulty: 'easy',
          tags: ['saas', 'software', 'cloud']
        },
        {
          id: '13-5',
          question: 'What is auto-scaling?',
          answer: 'Auto-scaling automatically adjusts computing resources based on demand to maintain performance and minimize costs.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['auto-scaling', 'performance', 'cost']
        },
        {
          id: '13-6',
          question: 'What is serverless computing?',
          answer: 'Serverless computing runs code in response to events without managing servers, paying only for compute time consumed.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['serverless', 'computing', 'events']
        },
        {
          id: '13-7',
          question: 'What is AWS Lambda?',
          answer: 'AWS Lambda is a serverless compute service that runs code in response to events and automatically manages resources.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['lambda', 'aws', 'serverless']
        },
        {
          id: '13-8',
          question: 'What is cloud storage?',
          answer: 'Cloud storage stores data on remote servers accessed from the internet, rather than local storage devices.',
          category: 'cloud',
          difficulty: 'easy',
          tags: ['cloud-storage', 'storage', 'data']
        },
        {
          id: '13-9',
          question: 'What is VPC?',
          answer: 'Virtual Private Cloud provides an isolated section of the AWS Cloud to launch resources in a virtual network.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['vpc', 'networking', 'aws']
        },
        {
          id: '13-10',
          question: 'What is load balancing in cloud?',
          answer: 'Cloud load balancing distributes traffic across multiple targets to ensure availability and fault tolerance.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['load-balancing', 'cloud', 'availability']
        },
        {
          id: '13-11',
          question: 'What is cloud migration?',
          answer: 'Cloud migration involves moving data, applications, and other business elements to a cloud computing environment.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['migration', 'cloud', 'strategy']
        },
        {
          id: '13-12',
          question: 'What is multi-cloud?',
          answer: 'Multi-cloud strategy uses multiple cloud computing services from different providers in a single architecture.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['multi-cloud', 'strategy', 'providers']
        },
        {
          id: '13-13',
          question: 'What is cloud security?',
          answer: 'Cloud security encompasses technologies and policies that protect cloud-based systems and data.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['cloud-security', 'security', 'policies']
        },
        {
          id: '13-14',
          question: 'What is cloud cost optimization?',
          answer: 'Cloud cost optimization involves managing and reducing cloud spending while maintaining performance.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['cost-optimization', 'cloud', 'management']
        },
        {
          id: '13-15',
          question: 'What is cloud-native?',
          answer: 'Cloud-native applications are designed specifically for cloud platforms, leveraging cloud services and scalability.',
          category: 'cloud',
          difficulty: 'medium',
          tags: ['cloud-native', 'applications', 'design']
        }
      ]
    },
    {
      id: '14',
      name: 'Mobile Development',
      description: 'iOS, Android, and cross-platform frameworks',
      category: 'mobile',
      icon: '📱',
      color: '#84cc16',
      cards: [
        {
          id: '14-1',
          question: 'What is React Native?',
          answer: 'React Native is a framework for building native mobile apps using React and JavaScript.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['react-native', 'mobile', 'cross-platform']
        },
        {
          id: '14-2',
          question: 'What is Flutter?',
          answer: 'Flutter is Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['flutter', 'mobile', 'cross-platform']
        },
        {
          id: '14-3',
          question: 'What is the difference between native and hybrid apps?',
          answer: 'Native apps are built for specific platforms, hybrid apps use web technologies wrapped in a native container.',
          category: 'mobile',
          difficulty: 'easy',
          tags: ['native', 'hybrid', 'mobile']
        },
        {
          id: '14-4',
          question: 'What is Android Activity?',
          answer: 'An Activity is a single, focused thing a user can do, representing one screen with a user interface.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['android', 'activity', 'ui']
        },
        {
          id: '14-5',
          question: 'What is iOS ViewController?',
          answer: 'A ViewController manages a set of views and coordinates between the model and view layers in iOS.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['ios', 'viewcontroller', 'ui']
        },
        {
          id: '14-6',
          question: 'What is mobile app architecture?',
          answer: 'Mobile app architecture defines the structure, patterns, and components used to build mobile applications.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['architecture', 'mobile', 'patterns']
        },
        {
          id: '14-7',
          question: 'What is push notification?',
          answer: 'Push notifications are messages sent from a server to a mobile app, appearing as alerts even when the app isn\'t active.',
          category: 'mobile',
          difficulty: 'easy',
          tags: ['push-notifications', 'mobile', 'messaging']
        },
        {
          id: '14-8',
          question: 'What is mobile app performance optimization?',
          answer: 'Mobile performance optimization involves techniques to improve app speed, responsiveness, and battery efficiency.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['performance', 'optimization', 'mobile']
        },
        {
          id: '14-9',
          question: 'What is mobile security?',
          answer: 'Mobile security protects smartphones, tablets, and laptops from threats associated with wireless computing.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['security', 'mobile', 'protection']
        },
        {
          id: '14-10',
          question: 'What is app store optimization?',
          answer: 'ASO is the process of improving an app\'s visibility in app stores to increase downloads and visibility.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['aso', 'marketing', 'mobile']
        },
        {
          id: '14-11',
          question: 'What is mobile testing?',
          answer: 'Mobile testing ensures mobile apps work correctly on different devices, OS versions, and network conditions.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['testing', 'mobile', 'quality']
        },
        {
          id: '14-12',
          question: 'What is responsive design for mobile?',
          answer: 'Responsive design ensures apps adapt to different screen sizes and orientations for optimal user experience.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['responsive-design', 'ui', 'mobile']
        },
        {
          id: '14-13',
          question: 'What is mobile analytics?',
          answer: 'Mobile analytics tracks user behavior, app performance, and business metrics for mobile applications.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['analytics', 'mobile', 'tracking']
        },
        {
          id: '14-14',
          question: 'What is mobile CI/CD?',
          answer: 'Mobile CI/CD automates building, testing, and deploying mobile applications to app stores or test environments.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['ci-cd', 'mobile', 'automation']
        },
        {
          id: '14-15',
          question: 'What is mobile app monetization?',
          answer: 'Mobile app monetization involves strategies to generate revenue from mobile applications.',
          category: 'mobile',
          difficulty: 'medium',
          tags: ['monetization', 'mobile', 'revenue']
        }
      ]
    },
    {
      id: '15',
      name: 'Software Engineering',
      description: 'Design patterns, architecture, and best practices',
      category: 'software-engineering',
      icon: '💻',
      color: '#6b7280',
      cards: [
        {
          id: '15-1',
          question: 'What is the SOLID principle?',
          answer: 'SOLID is an acronym for five design principles: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['solid', 'principles', 'design']
        },
        {
          id: '15-2',
          question: 'What is design pattern?',
          answer: 'Design patterns are reusable solutions to common problems in software design.',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['design-patterns', 'patterns', 'reusability']
        },
        {
          id: '15-3',
          question: 'What is MVC pattern?',
          answer: 'Model-View-Controller separates an application into three main components: Model (data), View (UI), Controller (logic).',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['mvc', 'patterns', 'architecture']
        },
        {
          id: '15-4',
          question: 'What is agile methodology?',
          answer: 'Agile is an iterative approach to project management and software development that focuses on collaboration and flexibility.',
          category: 'software-engineering',
          difficulty: 'easy',
          tags: ['agile', 'methodology', 'development']
        },
        {
          id: '15-5',
          question: 'What is test-driven development?',
          answer: 'TDD is a software development process where tests are written before the code, driving the design and implementation.',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['tdd', 'testing', 'development']
        },
        {
          id: '15-6',
          question: 'What is version control?',
          answer: 'Version control tracks changes to source code over time, allowing multiple developers to collaborate and manage code history.',
          category: 'software-engineering',
          difficulty: 'easy',
          tags: ['version-control', 'git', 'collaboration']
        },
        {
          id: '15-7',
          question: 'What is code review?',
          answer: 'Code review is the systematic examination of source code to find and fix mistakes overlooked in initial development.',
          category: 'software-engineering',
          difficulty: 'easy',
          tags: ['code-review', 'quality', 'collaboration']
        },
        {
          id: '15-8',
          question: 'What is refactoring?',
          answer: 'Refactoring improves the design, structure, and implementation of existing code without changing its external behavior.',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['refactoring', 'code-quality', 'maintenance']
        },
        {
          id: '15-9',
          question: 'What is technical debt?',
          answer: 'Technical debt is the implied cost of additional rework caused by choosing an easy solution now instead of a better approach.',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['technical-debt', 'quality', 'maintenance']
        },
        {
          id: '15-10',
          question: 'What is continuous integration?',
          answer: 'CI is the practice of merging all developers\' working copies to a shared mainline several times a day.',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['ci', 'integration', 'automation']
        },
        {
          id: '15-11',
          question: 'What is pair programming?',
          answer: 'Pair programming involves two programmers working together at one workstation, one writing code and the other reviewing.',
          category: 'software-engineering',
          difficulty: 'easy',
          tags: ['pair-programming', 'collaboration', 'quality']
        },
        {
          id: '15-12',
          question: 'What is software architecture?',
          answer: 'Software architecture defines the fundamental structures of a software system and the discipline of creating such structures.',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['architecture', 'design', 'structure']
        },
        {
          id: '15-13',
          question: 'What is the difference between functional and object-oriented programming?',
          answer: 'OOP focuses on objects and their interactions, FP focuses on pure functions and immutable data.',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['oop', 'fp', 'paradigms']
        },
        {
          id: '15-14',
          question: 'What is dependency injection?',
          answer: 'Dependency injection is a technique where one object supplies the dependencies of another object, promoting loose coupling.',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['dependency-injection', 'design', 'coupling']
        },
        {
          id: '15-15',
          question: 'What is the observer pattern?',
          answer: 'Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.',
          category: 'software-engineering',
          difficulty: 'medium',
          tags: ['observer-pattern', 'patterns', 'events']
        }
      ]
    }
  ];

  selectedDeck: Deck | null = null;
  currentCardIndex = 0;
  isFlipped = false;
  showRating = false;
  
  // Animation states
  cardState: 'entering' | 'active' | 'exiting' = 'entering';
  confettiActive = false;

  // Simple session tracking
  sessionScore = 0;
  correctAnswers = 0;
  totalAnswered = 0;

  selectDeck(deck: Deck) {
    this.selectedDeck = deck;
    this.currentCardIndex = 0;
    this.isFlipped = false;
    this.showRating = false;
    this.sessionScore = 0;
    this.correctAnswers = 0;
    this.totalAnswered = 0;
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  nextCard() {
    this.cardState = 'exiting';
    
    setTimeout(() => {
      this.currentCardIndex++;
      this.isFlipped = false;
      this.showRating = false;
      
      if (this.currentCardIndex >= (this.selectedDeck?.cards.length || 0)) {
        this.triggerConfetti();
        setTimeout(() => {
          this.cardState = 'entering';
        }, 2000);
      } else {
        this.cardState = 'entering';
        setTimeout(() => this.cardState = 'active', 300);
      }
    }, 500);
  }

  rateCard(correct: boolean) {
    if (correct) {
      this.correctAnswers++;
      this.sessionScore += 100;
    }
    this.totalAnswered++;
    this.showRating = false;
    this.nextCard();
  }

  getProgressPercent(): number {
    if (!this.selectedDeck) return 0;
    return ((this.currentCardIndex + 1) / this.selectedDeck.cards.length) * 100;
  }

  getSessionAccuracy(): number {
    if (this.totalAnswered === 0) return 0;
    return (this.correctAnswers / this.totalAnswered) * 100;
  }

  triggerConfetti() {
    this.confettiActive = true;
    setTimeout(() => {
      this.confettiActive = false;
    }, 3000);
  }

  getCurrentCard(): Flashcard | null {
    if (!this.selectedDeck || this.currentCardIndex >= this.selectedDeck.cards.length) {
      return null;
    }
    return this.selectedDeck.cards[this.currentCardIndex];
  }

  getTotalCards(): number {
    return this.decks.reduce((total, deck) => total + deck.cards.length, 0);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.selectedDeck && !this.showRating) {
      if (event.key === ' ' || event.key === 'Enter') {
        this.flipCard();
      } else if (event.key === 'ArrowRight' && this.isFlipped) {
        this.showRating = true;
      }
    }
  }
}