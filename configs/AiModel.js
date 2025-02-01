const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "All the results must be in JSON format",
});

const modelForNotes = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "All the results must be in HTML format without any html head body or title tags",
});

const modelForStudyType = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const generationConfigForNotes = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export const courseOutlineAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a study material for Python for Exam and level of difficulty will be Beginner with summary of course , list of chapters along with summary of each chapter , topic list and notes of topic in each chapter . All in JSON format .",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_name": "Introduction to Python Programming",\n  "level": "Beginner",\n  "summary": "This course provides a foundational understanding of Python programming, covering basic syntax, data types, control flow, functions, and data structures. It is designed for beginners with little to no prior programming experience.",\n  "chapters": [\n    {\n      "chapter_title": "Introduction to Python",\n      "summary": "Overview of Python, its features, and setting up the development environment.",\n      "topics": [\n        {\n          "topic_name": "What is Python?",\n          "notes": "Python is a high-level, general-purpose programming language known for its readability and versatility."\n        },\n        {\n          "topic_name": "Setting up the environment",\n          "notes": "Instructions on installing Python and a suitable IDE or text editor."\n        }\n      ]\n    },\n    {\n      "chapter_title": "Variables and Data Types",\n      "summary": "Understanding variables, data types, and operators in Python.",\n      "topics": [\n        {\n          "topic_name": "Variables",\n          "notes": "Explanation of variables and how to assign values to them."\n        },\n        {\n          "topic_name": "Data Types",\n          "notes": "Covers integers, floats, strings, booleans, and their usage."\n        },\n        {\n          "topic_name": "Operators",\n          "notes": "Arithmetic, comparison, and logical operators in Python."\n        }\n      ]\n    },\n    {\n      "chapter_title": "Control Flow",\n      "summary": "Controlling the execution of code using conditional statements and loops.",\n      "topics": [\n        {\n          "topic_name": "Conditional Statements",\n          "notes": "if, elif, and else statements for decision-making."\n        },\n        {\n          "topic_name": "Loops",\n          "notes": "for and while loops for repetitive execution of code blocks."\n        }\n      ]\n    },\n    {\n      "chapter_title": "Functions",\n      "summary": "Defining and using functions to organize and reuse code.",\n      "topics": [\n        {\n          "topic_name": "Defining Functions",\n          "notes": "Syntax and structure of function definitions."\n        },\n        {\n          "topic_name": "Calling Functions",\n          "notes": "How to call and pass arguments to functions."\n        },\n        {\n          "topic_name": "Return Values",\n          "notes": "Understanding function return values."\n        }\n\n      ]\n    },\n    {\n      "chapter_title": "Data Structures",\n      "summary": "Introduction to lists, tuples, and dictionaries for storing collections of data.",\n      "topics": [\n        {\n          "topic_name": "Lists",\n          "notes": "Mutable ordered sequences of items."\n        },\n        {\n          "topic_name": "Tuples",\n          "notes": "Immutable ordered sequences of items."\n        },\n        {\n          "topic_name": "Dictionaries",\n          "notes": "Key-value pairs for storing and retrieving data."\n        }\n      ]\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});

export const generateNotesAiModel = modelForNotes.startChat({
  generationConfigForNotes,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate detailed exam material for each chapter Make sure to include all topics provided in the content and give all content in HTML format but dont add HTMLK , Head m, Body and title tag . The chapters : {\n      "chapter_title": "Design Patterns",\n      "summary": "Exploration of common design patterns and their applications in Java.",\n      "topics": [\n        {\n          "topic_name": "Creational Patterns",\n          "notes": "Singleton, Factory, Abstract Factory, Builder, Prototype"\n        },\n        {\n          "topic_name": "Structural Patterns",\n          "notes": "Adapter, Decorator, Facade, Proxy, Composite, Bridge"\n        },\n        {\n          "topic_name": "Behavioral Patterns",\n          "notes": "Observer, Strategy, Command, Template Method, Iterator, Chain of Responsibility, Mediator, Memento, Interpreter, State"\n        }\n      ]\n    }',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```html\n <h2>Design Patterns Exam Material</h2>\n\n <h3>Chapter 1: Design Patterns</h3>\n <p>This chapter explores common design patterns and their applications in Java.</p>\n\n <h4>1.1 Creational Patterns</h4>\n <p>Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.  The main focus is on which class is responsible for creating an object.  This helps improve flexibility and maintainability.</p>\n <ul>\n  <li><strong>Singleton:</strong> Ensures that a class has only one instance and provides a global point of access to it.  Discuss the various implementations (lazy initialization, eager initialization, static block initialization) and their thread safety implications.  Provide examples of when a Singleton pattern is appropriate and when it might be overused.</li>\n  <li><strong>Factory:</strong> Defines an interface for creating an object, but let subclasses decide which class to instantiate.  Factory Method lets a class defer instantiation to subclasses.  Explain the difference between a simple factory and a factory method.  Provide Java code examples.</li>\n  <li><strong>Abstract Factory:</strong> Provides an interface for creating families of related or dependent objects without specifying their concrete classes.  Illustrate with a concrete example, like creating UI elements for different platforms (Windows, Mac).</li>\n  <li><strong>Builder:</strong> Separates the construction of a complex object from its representation, allowing the same construction process to create various representations.  Explain the use of a director class and how it helps in managing the construction process.  Include a practical example of building a complex object like a house or a car.</li>\n  <li><strong>Prototype:</strong> Specifies the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.  Discuss the advantages and disadvantages, and how to implement this in Java using cloning.</li>\n </ul>\n\n <h4>1.2 Structural Patterns</h4>\n <p>Structural patterns concern class and object composition.  They use inheritance to compose interfaces and define ways to compose objects to obtain new functionalities.</p>\n <ul>\n  <li><strong>Adapter:</strong> Converts the interface of a class into another interface clients expect.  Lets classes work together that couldn't otherwise because of incompatible interfaces.  Illustrate with examples of adapting legacy code or third-party libraries.</li>\n  <li><strong>Decorator:</strong> Attaches additional responsibilities to an object dynamically.  Provides a flexible alternative to subclassing for extending functionality.  Show examples of adding logging or security features to an existing object.</li>\n  <li><strong>Facade:</strong> Provides a simplified interface to a complex subsystem.  Hides the complexities of the subsystem from the client.</li>\n  <li><strong>Proxy:</strong> Provides a surrogate or placeholder for another object to control access to it.  Discuss different types of proxies (remote proxy, virtual proxy, protection proxy).</li>\n  <li><strong>Composite:</strong> Composes objects into tree structures to represent part-whole hierarchies.  Lets clients treat individual objects and compositions of objects uniformly.  Illustrate with a file system example or a graphical user interface.</li>\n  <li><strong>Bridge:</strong> Decouples an abstraction from its implementation so that the two can vary independently.  Show how this improves flexibility and reduces code coupling.</li>\n </ul>\n\n <h4>1.3 Behavioral Patterns</h4>\n <p>Behavioral patterns characterize the ways in which classes or objects interact and distribute responsibility.  They are concerned with algorithms and the assignment of responsibilities between objects.</p>\n <ul>\n  <li><strong>Observer:</strong> Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.  Implement a simple observer pattern example.</li>\n  <li><strong>Strategy:</strong> Defines a family of algorithms, encapsulates each one, and makes them interchangeable.  Lets the algorithm vary independently from clients that use it.  Provide code illustrating different sorting strategies.</li>\n  <li><strong>Command:</strong> Encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.  Create an example of a command pattern for executing different operations on a document.</li>\n  <li><strong>Template Method:</strong> Defines the skeleton of an algorithm in an operation, deferring some steps to subclasses.  Lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.  Illustrate with an example of a report generation process.</li>\n  <li><strong>Iterator:</strong> Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.  Show how to implement an iterator for a custom data structure.</li>\n  <li><strong>Chain of Responsibility:</strong> Avoids coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.  Chains the receiving objects and passes the request along the chain until an object handles it.  Provide an example of a request handling system.</li>\n  <li><strong>Mediator:</strong> Defines an object that encapsulates how a set of objects interact.  Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.</li>\n  <li><strong>Memento:</strong> Without violating encapsulation, captures and externalizes an object's internal state so that the object can be restored to this state later.  Illustrate how to implement undo/redo functionality using the Memento pattern.</li>\n  <li><strong>Interpreter:</strong> Given a language, defines a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.  Give a simple example of an interpreter for a small language.</li>\n  <li><strong>State:</strong> Allows an object to alter its behavior when its internal state changes.  The object will appear to change its class.</li>\n </ul>\n```\n",
        },
      ],
    },
  ],
});

export const generateStudyTypeContentAiModel = modelForStudyType.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate flashcards for advanced java in JSON in front and back format . Generate a maximum of 15 flashcards.\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "front": "What is the purpose of the `volatile` keyword in Java?",\n    "back": "The `volatile` keyword ensures that changes to a variable are always immediately visible to other threads. It avoids caching issues and ensures a \'happens-before\' relationship for read/write operations."\n  },\n  {\n    "front": "Explain the difference between `synchronized` and `ReentrantLock` in Java.",\n     "back": "`synchronized` is a built-in language feature that provides implicit locking, while `ReentrantLock` is a class from the `java.util.concurrent.locks` package, offering more flexible locking mechanisms like tryLock, lockInterruptibly, and fair locking policies. `ReentrantLock` also allows for timed locks, and can support conditions."\n  },\n {\n    "front": "What is the role of the `ExecutorService` interface in Java concurrency?",\n    "back": "The `ExecutorService` interface provides an abstraction for managing a pool of threads, handling task execution and resource management. It decouples task submission from the underlying thread management, making it easier to use threads safely."\n  },\n  {\n    "front": "Describe the concept of \'happens-before\' relationship in Java Memory Model.",\n     "back": "The \'happens-before\' relationship is a partial ordering that guarantees the visibility of memory writes by one thread to reads by another. It defines the conditions under which actions of one thread are guaranteed to be visible to other threads, ensuring consistent behavior in concurrent programs."\n  },\n {\n    "front": "Explain the purpose of Java NIO (Non-blocking I/O)?",\n     "back": "Java NIO allows non-blocking I/O operations using channels and selectors. It is designed for handling high-concurrency network connections efficiently using a single thread, making it suitable for applications that need to handle many concurrent connections without dedicated threads for each."\n  },\n  {\n    "front": "What are the benefits of using lambda expressions in Java?",\n     "back": "Lambda expressions enable functional programming in Java by providing a concise way to represent anonymous functions (e.g., for passing behavior as parameters). They reduce boilerplate code, allow functional style programming and facilitate parallel operations through Streams."\n  },\n  {\n    "front": "How does the Java Stream API work, and what are its main advantages?",\n    "back": "The Java Stream API provides a declarative and functional approach for processing collections. It enables efficient operations like filtering, mapping, and reducing by utilizing lazy evaluations and parallel processing when appropriate."\n  },\n  {\n    "front": "What is the purpose of the `CompletableFuture` class in Java?",\n     "back": "The `CompletableFuture` class allows asynchronous programming in Java. It represents the result of an asynchronous computation and provides methods for chaining, combining, handling, and completing asynchronous tasks efficiently."\n  },\n   {\n    "front": "Explain the purpose of a Java `ClassLoader` and describe the delegation model.",\n     "back": "A `ClassLoader` is responsible for loading class files into the Java Virtual Machine (JVM). The delegation model is a mechanism where a `ClassLoader` first asks its parent to load a class before attempting to load it itself. This ensures that the core Java classes are loaded by the bootstrap `ClassLoader`."\n   },\n  {\n    "front": "What are the key features of Java modules (Project Jigsaw)?",\n    "back": "Java modules provide stronger encapsulation and dependency management than JAR files. Modules define clear dependencies, control access to internal packages (module boundary). It enhances code maintainability, security, and modularity."\n  },\n    {\n    "front": "What is the role of the `MethodHandle` API in Java?",\n    "back": "The `MethodHandle` API provides a low-level mechanism for dynamic method invocation. It\'s a typed, directly executable reference to an underlying method, allowing for more flexible invocation patterns than standard reflection API. This is used by frameworks needing advanced dynamic behaviour. "\n  },\n   {\n    "front": "Describe the concept of a Java Garbage Collector and different GC algorithms?",\n    "back": "The Java Garbage Collector (GC) is responsible for automatically reclaiming memory occupied by objects that are no longer in use. Common algorithms include serial, parallel, concurrent mark sweep (CMS), and G1, each with different characteristics in terms of throughput and pause times."\n  },\n    {\n    "front": "How can you achieve thread safety with collections in Java?",\n    "back": "Thread safety can be achieved using synchronized collections (e.g., `Collections.synchronizedList()`), concurrent collections (e.g., `ConcurrentHashMap`), and using explicit locking (e.g., using `ReentrantLock`) when performing compound operations on standard collections."\n  },\n  {\n    "front": "Explain the difference between checked and unchecked exceptions in Java.",\n    "back": "Checked exceptions must be handled either by `try-catch` block or declared in method signature using `throws` keyword, they are checked at compile time (e.g., `IOException`). Unchecked exceptions are runtime exceptions or errors, do not require handling or declaration, and indicate programming errors (e.g., `NullPointerException`)."\n  },\n  {\n    "front": "What are annotations in Java and how do they work with reflection?",\n    "back":"Annotations provide metadata about code and can be accessed during runtime using Reflection API. They can be used for various purposes, including code generation, configuration, validation, etc. With reflection you can read annotations attached to classes, methods, fields, etc. and act based on the annotations."\n  }\n]\n```\n',
        },
      ],
    },
  ],
});

export const generateQuizAiModel = modelForStudyType.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Quiz on the topic Java with questions and options along with correct answer in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "quizTitle": "Java Programming Quiz",\n  "questions": [\n    {\n      "questionNumber": 1,\n      "question": "What is the primary purpose of the Java Virtual Machine (JVM)?",\n      "options": [\n        "To compile Java source code into bytecode.",\n        "To execute Java bytecode and provide a platform-independent environment.",\n        "To manage memory allocation for Java programs.",\n        "To act as a text editor for writing Java code."\n      ],\n      "correctAnswer": "To execute Java bytecode and provide a platform-independent environment."\n    },\n    {\n      "questionNumber": 2,\n      "question": "Which keyword is used to declare a constant in Java?",\n      "options": [\n        "const",\n        "final",\n        "static",\n        "immutable"\n      ],\n      "correctAnswer": "final"\n    },\n    {\n        "questionNumber": 3,\n        "question": "Which of the following is NOT a primitive data type in Java?",\n        "options": [\n            "int",\n            "boolean",\n            "String",\n            "char"\n        ],\n        "correctAnswer": "String"\n    },\n    {\n      "questionNumber": 4,\n      "question": "What does the \'OOP\' stand for in the context of Java?",\n      "options": [\n        "Object-Oriented Programming",\n        "Out-of-Place Programming",\n        "Operating-Oriented Processing",\n        "Open Object Platform"\n      ],\n      "correctAnswer": "Object-Oriented Programming"\n    },\n    {\n      "questionNumber": 5,\n      "question": "Which of these is a method used for printing output to the console in Java?",\n      "options": [\n        "System.out.print()",\n        "console.log()",\n        "print.console()",\n        "output.console()"\n      ],\n      "correctAnswer": "System.out.print()"\n    },\n     {\n      "questionNumber": 6,\n      "question": "What is the purpose of the \'this\' keyword in Java?",\n      "options": [\n        "It refers to the current class instance.",\n        "It refers to the superclass.",\n        "It is used to declare a variable as static.",\n        "It is used to import a package."\n      ],\n      "correctAnswer": "It refers to the current class instance."\n    },\n    {\n      "questionNumber": 7,\n        "question": "Which keyword is used to inherit a class in Java?",\n        "options":[\n            "implements",\n            "extends",\n            "inherits",\n            "include"\n        ],\n      "correctAnswer": "extends"\n    },\n    {\n      "questionNumber": 8,\n       "question": "What is an interface in Java?",\n        "options": [\n            "A class that can be instantiated.",\n             "A blueprint for classes that specifies methods a class must implement.",\n             "A concrete class with no methods.",\n             "A data type."\n           ],\n      "correctAnswer": "A blueprint for classes that specifies methods a class must implement."\n    },\n    {\n     "questionNumber": 9,\n      "question": "Which exception is thrown when trying to access an array element with an invalid index?",\n        "options": [\n            "IOException",\n            "ArrayIndexOutOfBoundsException",\n            "NullPointerException",\n            "IllegalArgumentException"\n            ],\n      "correctAnswer": "ArrayIndexOutOfBoundsException"\n    },\n    {\n      "questionNumber": 10,\n      "question": "What is the purpose of the \'static\' keyword in Java?",\n      "options": [\n        "To declare a constant.",\n        "To make a method instance-specific.",\n        "To make a variable or method belong to the class rather than an instance.",\n        "To create a new object."\n      ],\n      "correctAnswer": "To make a variable or method belong to the class rather than an instance."\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const generateQaAiModel = modelForStudyType.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate questions and answers for the topic Java in JSON format . (Max 10)",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "questions": [\n    {\n      "id": 1,\n      "question": "What is the primary purpose of the Java Virtual Machine (JVM)?",\n      "answer": "The JVM is responsible for executing Java bytecode, enabling platform independence by abstracting away the underlying hardware and operating system."\n    },\n    {\n      "id": 2,\n      "question": "What is the difference between `==` and `.equals()` when comparing objects in Java?",\n      "answer": "`==` compares object references (memory addresses), while `.equals()` compares the actual content of objects. You should generally use `.equals()` for content comparison."\n    },\n     {\n      "id": 3,\n      "question": "Explain the concept of Object-Oriented Programming (OOP) and list some of its core principles in Java?",\n      "answer": "OOP is a programming paradigm based on the concept of \\"objects\\" which can contain data and code. Core principles include Encapsulation, Inheritance, Polymorphism, and Abstraction."\n    },\n     {\n      "id": 4,\n       "question":"What are the different access modifiers in Java, and what do they control?",\n       "answer":"The access modifiers are `public`, `private`, `protected`, and default (no modifier). They control the visibility and accessibility of class members (variables and methods) from other classes and packages."\n     },\n     {\n        "id": 5,\n        "question": "What is the role of the `static` keyword in Java?",\n        "answer": "The `static` keyword indicates that a member (variable or method) belongs to the class itself rather than to an instance of the class. Static members can be accessed directly through the class name."\n     },\n     {\n      "id": 6,\n      "question": "What is an interface in Java, and how does it differ from an abstract class?",\n       "answer":"An interface defines a contract for classes to implement, specifying methods that must be implemented. It cannot have method implementations other than default ones and cannot have instance variables. An abstract class can have method implementations and can have instance variables. An interface can be used to achieve multiple inheritence."\n    },\n     {\n      "id": 7,\n      "question": "What are exceptions in Java and how are they handled?",\n      "answer": "Exceptions represent runtime errors or exceptional conditions. They are handled using `try`, `catch`, `finally` blocks. The `try` block contains code that might throw an exception; the `catch` block handles the exception; and the `finally` block executes regardless of whether an exception was thrown."\n    },\n    {\n      "id": 8,\n      "question": "What is multithreading, and how can it be implemented in Java?",\n      "answer": "Multithreading is a way to execute multiple tasks concurrently within a single program. In Java, it can be implemented using the `Thread` class or the `Runnable` interface."\n    },\n    {\n      "id": 9,\n       "question": "Explain the purpose of Java Collections Framework.",\n       "answer": "The Java Collections Framework provides a set of interfaces and classes for storing and manipulating groups of objects. It offers various data structures like lists, sets, maps, and queues that are reusable and optimized."\n     },\n      {\n      "id": 10,\n      "question":"What is the purpose of `super` keyword in Java?",\n      "answer":"The `super` keyword is used to refer to the parent class\'s members (variables and methods) from within the subclass. It can also be used to call the parent class constructor."\n    }\n\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
