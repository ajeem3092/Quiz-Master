// =====================================
// DOM ELEMENTS
// =====================================

const subjectCards = document.querySelectorAll(".subject-card");
const difficultyCards = document.querySelectorAll(".difficulty-card");

const difficultySection = document.getElementById("difficulty-section");
const selectedSubjectName = document.getElementById("selected-subject-name");
const subjectsSection = document.getElementById("subjects");

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const questionCount = document.getElementById("question-count");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

const quizSubject = document.getElementById("quiz-subject");
const quizDifficulty = document.getElementById("quiz-difficulty");

const progressPercentage = document.getElementById("progress-percentage");

const exitQuizBtn = document.getElementById("exit-quiz-btn");
const answerFeedback = document.getElementById("answer-feedback");

const totalQuestionsElement = document.getElementById("total-questions");
const correctAnswersElement = document.getElementById("correct-answers");
const incorrectAnswersElement = document.getElementById("incorrect-answers");
const scorePercentageElement = document.getElementById("score-percentage");

const scoreCircle = document.getElementById("score-circle");
const circlePercentage = document.getElementById("circle-percentage");
const answerReviewList = document.getElementById("answer-review-list");

// =====================================
// QUIZ VARIABLES
// =====================================

let selectedSubject = "";
let selectedDifficulty = "";

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answerHistory = [];

let timeLeft = 0;
let timerInterval = null;


// =====================================
// TIME LIMITS
// =====================================

const timeLimits = {
    basic: 20,
    medium: 30,
    advanced: 45,
    expert: 60
};


// =====================================
// QUESTION BANK
// =====================================


const questionBank = {

    // =====================================
    // HTML
    // =====================================
    html: {

        basic: [
            {
                question: "Which HTML tag creates a hyperlink?",
                options: ["<link>", "<a>", "<href>", "<url>"],
                answer: "<a>"
            },
            {
                question: "Which tag is used for the largest heading?",
                options: ["<h6>", "<head>", "<h1>", "<heading>"],
                answer: "<h1>"
            },
            {
                question: "Which tag inserts an image?",
                options: ["<picture>", "<image>", "<img>", "<src>"],
                answer: "<img>"
            },
            {
                question: "Which tag creates an unordered list?",
                options: ["<ol>", "<ul>", "<li>", "<list>"],
                answer: "<ul>"
            },
            {
                question: "Which HTML tag creates a paragraph?",
                options: ["<para>", "<p>", "<text>", "<pg>"],
                answer: "<p>"
            }
        ],

        medium: [
            {
                question: "Which HTML attribute provides alternative text for an image?",
                options: ["title", "src", "alt", "href"],
                answer: "alt"
            },
            {
                question: "Which input type is used for email addresses?",
                options: ["text", "mail", "email", "address"],
                answer: "email"
            },
            {
                question: "Which element represents navigation links?",
                options: ["<section>", "<nav>", "<aside>", "<main>"],
                answer: "<nav>"
            },
            {
                question: "Which attribute makes an input field mandatory?",
                options: ["validate", "required", "mandatory", "checked"],
                answer: "required"
            },
            {
                question: "Which HTML element is used to play video?",
                options: ["<media>", "<movie>", "<video>", "<play>"],
                answer: "<video>"
            }
        ],

        advanced: [
            {
                question: "Which HTML element embeds another webpage?",
                options: ["<embed>", "<iframe>", "<frame>", "<object>"],
                answer: "<iframe>"
            },
            {
                question: "What is the purpose of the data-* attributes?",
                options: [
                    "Store custom data on elements",
                    "Apply CSS styles",
                    "Create database tables",
                    "Load external scripts"
                ],
                answer: "Store custom data on elements"
            },
            {
                question: "Which attribute associates a label with a form input?",
                options: ["name", "for", "value", "target"],
                answer: "for"
            },
            {
                question: "Which element is used to define a self-contained article?",
                options: ["<div>", "<article>", "<span>", "<footer>"],
                answer: "<article>"
            },
            {
                question: "Which attribute specifies where a form submits its data?",
                options: ["method", "action", "target", "enctype"],
                answer: "action"
            }
        ],

        expert: [
            {
                question: "Which attribute prevents a form control from submitting its value?",
                options: ["readonly", "disabled", "required", "autofocus"],
                answer: "disabled"
            },
            {
                question: "What does the defer attribute do on an external script?",
                options: [
                    "Executes the script immediately",
                    "Downloads in parallel and executes after HTML parsing",
                    "Blocks HTML parsing",
                    "Executes only after a button click"
                ],
                answer: "Downloads in parallel and executes after HTML parsing"
            },
            {
                question: "Which attribute helps establish a relationship between a label and a form control?",
                options: ["for", "class", "style", "title"],
                answer: "for"
            },
            {
                question: "Which element provides fallback content for browsers without script support?",
                options: ["<fallback>", "<noscript>", "<noframe>", "<script-fallback>"],
                answer: "<noscript>"
            },
            {
                question: "What does the sandbox attribute on an iframe primarily provide?",
                options: [
                    "Image optimization",
                    "Security restrictions on embedded content",
                    "Automatic responsiveness",
                    "Database access"
                ],
                answer: "Security restrictions on embedded content"
            }
        ]
    },

    // =====================================
    // CSS
    // =====================================
    css: {

        basic: [
            {
                question: "Which property changes text color?",
                options: ["background", "font-size", "color", "text-style"],
                answer: "color"
            },
            {
                question: "Which symbol selects an element by ID?",
                options: [".", "#", "*", "&"],
                answer: "#"
            },
            {
                question: "Which property changes the background color?",
                options: ["background-color", "color", "font-color", "bg"],
                answer: "background-color"
            },
            {
                question: "Which property controls text size?",
                options: ["font-weight", "font-size", "text-size", "size"],
                answer: "font-size"
            },
            {
                question: "Which CSS property makes text bold?",
                options: ["font-style", "text-bold", "font-weight", "text-weight"],
                answer: "font-weight"
            }
        ],

        medium: [
            {
                question: "Which CSS layout system is designed for one-dimensional layouts?",
                options: ["Grid", "Flexbox", "Float", "Position"],
                answer: "Flexbox"
            },
            {
                question: "Which property adds space inside an element's border?",
                options: ["margin", "padding", "outline", "gap"],
                answer: "padding"
            },
            {
                question: "Which position value keeps an element fixed relative to the viewport?",
                options: ["absolute", "relative", "fixed", "static"],
                answer: "fixed"
            },
            {
                question: "Which pseudo-class applies styles when hovering over an element?",
                options: [":focus", ":active", ":hover", ":visited"],
                answer: ":hover"
            },
            {
                question: "Which property controls the stacking order of positioned elements?",
                options: ["display", "z-index", "overflow", "order"],
                answer: "z-index"
            }
        ],

        advanced: [
            {
                question: "Which selector has the highest specificity?",
                options: [".container", "#container", "div", "*"],
                answer: "#container"
            },
            {
                question: "What does the box-sizing: border-box property do?",
                options: [
                    "Includes padding and border in the specified dimensions",
                    "Removes all padding",
                    "Adds margin automatically",
                    "Changes an element into a flex container"
                ],
                answer: "Includes padding and border in the specified dimensions"
            },
            {
                question: "Which CSS function calculates a value using different units?",
                options: ["calc()", "size()", "measure()", "compute()"],
                answer: "calc()"
            },
            {
                question: "Which property controls how content behaves when it overflows?",
                options: ["visibility", "overflow", "position", "content"],
                answer: "overflow"
            },
            {
                question: "Which media feature checks the viewport width?",
                options: ["max-width", "screen-size", "device-width-only", "viewport"],
                answer: "max-width"
            }
        ],

        expert: [
            {
                question: "What does the CSS minmax() function do in Grid?",
                options: [
                    "Sets minimum and maximum track sizes",
                    "Creates responsive images",
                    "Changes element positioning",
                    "Controls font scaling"
                ],
                answer: "Sets minimum and maximum track sizes"
            },
            {
                question: "What is the purpose of CSS containment?",
                options: [
                    "To limit layout, style, or paint effects within an element",
                    "To automatically create HTML elements",
                    "To disable browser rendering",
                    "To replace media queries"
                ],
                answer: "To limit layout, style, or paint effects within an element"
            },
            {
                question: "Which selector targets an element with no children?",
                options: [":empty", ":blank", ":none", ":childless"],
                answer: ":empty"
            },
            {
                question: "What does the will-change property help the browser do?",
                options: [
                    "Prepare for expected changes to an element",
                    "Change HTML content",
                    "Create animations automatically",
                    "Disable transitions"
                ],
                answer: "Prepare for expected changes to an element"
            },
            {
                question: "Which CSS feature defines custom reusable property values?",
                options: [
                    "CSS variables",
                    "CSS selectors",
                    "CSS resets",
                    "CSS filters"
                ],
                answer: "CSS variables"
            }
        ]
    },

    // =====================================
    // JAVASCRIPT
    // =====================================
    javascript: {

        basic: [
            {
                question: "Which keyword declares a block-scoped variable?",
                options: ["var", "let", "static", "define"],
                answer: "let"
            },
            {
                question: "Which symbol is used for single-line comments?",
                options: ["<!--", "//", "/*", "#"],
                answer: "//"
            },
            {
                question: "Which method displays output in the console?",
                options: ["print()", "console.log()", "display()", "write()"],
                answer: "console.log()"
            },
            {
                question: "Which operator checks strict equality?",
                options: ["=", "==", "===", "!="],
                answer: "==="
            },
            {
                question: "Which data type represents true or false?",
                options: ["String", "Number", "Boolean", "Object"],
                answer: "Boolean"
            }
        ],

        medium: [
            {
                question: "Which array method creates a new array by transforming elements?",
                options: ["forEach()", "push()", "map()", "pop()"],
                answer: "map()"
            },
            {
                question: "Which method converts JSON text into a JavaScript object?",
                options: [
                    "JSON.stringify()",
                    "JSON.parse()",
                    "JSON.convert()",
                    "JSON.object()"
                ],
                answer: "JSON.parse()"
            },
            {
                question: "What does the === operator compare?",
                options: [
                    "Only values",
                    "Only data types",
                    "Value and data type",
                    "Only object references"
                ],
                answer: "Value and data type"
            },
            {
                question: "Which event occurs when a user clicks an HTML element?",
                options: ["change", "submit", "click", "load"],
                answer: "click"
            },
            {
                question: "Which array method adds an element to the end?",
                options: ["pop()", "shift()", "push()", "unshift()"],
                answer: "push()"
            }
        ],

        advanced: [
            {
                question: "What is a closure in JavaScript?",
                options: [
                    "A function bundled with its lexical environment",
                    "A method that closes browser windows",
                    "A loop inside another loop",
                    "A function without parameters"
                ],
                answer: "A function bundled with its lexical environment"
            },
            {
                question: "What does Array.prototype.filter() return?",
                options: [
                    "A single value",
                    "A new array containing matching elements",
                    "The original array only",
                    "A Boolean value"
                ],
                answer: "A new array containing matching elements"
            },
            {
                question: "What is event delegation?",
                options: [
                    "Attaching a listener to a parent to handle child events",
                    "Removing all event listeners",
                    "Creating events without JavaScript",
                    "Executing events randomly"
                ],
                answer: "Attaching a listener to a parent to handle child events"
            },
            {
                question: "What does the spread operator do with an array?",
                options: [
                    "Deletes its elements",
                    "Expands its elements",
                    "Sorts its elements",
                    "Converts it into a string"
                ],
                answer: "Expands its elements"
            },
            {
                question: "What is the purpose of the finally block in try-catch?",
                options: [
                    "Runs only when an error occurs",
                    "Runs after try/catch regardless of outcome",
                    "Prevents all errors",
                    "Creates a new exception"
                ],
                answer: "Runs after try/catch regardless of outcome"
            }
        ],

        expert: [
            {
                question: "What does Promise.all() do when one promise rejects?",
                options: [
                    "Waits for all promises to resolve",
                    "Rejects with the rejection reason",
                    "Ignores the rejected promise",
                    "Converts all promises into strings"
                ],
                answer: "Rejects with the rejection reason"
            },
            {
                question: "What is the JavaScript event loop responsible for?",
                options: [
                    "Managing asynchronous callbacks",
                    "Compiling CSS",
                    "Creating HTML elements",
                    "Managing database tables"
                ],
                answer: "Managing asynchronous callbacks"
            },
            {
                question: "What does Object.freeze() prevent?",
                options: [
                    "Reading object properties",
                    "Modifying existing properties or adding and removing properties",
                    "Creating objects",
                    "Accessing nested objects"
                ],
                answer: "Modifying existing properties or adding and removing properties"
            },
            {
                question: "What is the temporal dead zone?",
                options: [
                    "The period before let/const declarations are initialized",
                    "The time required to load JavaScript",
                    "A delay in setTimeout",
                    "A browser caching mechanism"
                ],
                answer: "The period before let/const declarations are initialized"
            },
            {
                question: "What does Promise.race() return?",
                options: [
                    "The result of every promise",
                    "The first promise that settles",
                    "Only the last promise",
                    "An array of promises"
                ],
                answer: "The first promise that settles"
            }
        ]
    },

    // =====================================
    // JAVA
    // =====================================
    java: {

        basic: [
            {
                question: "Which keyword is used to create an object in Java?",
                options: ["class", "new", "this", "static"],
                answer: "new"
            },
            {
                question: "Which method is the entry point of a Java application?",
                options: ["start()", "run()", "main()", "init()"],
                answer: "main()"
            },
            {
                question: "Which data type stores whole numbers?",
                options: ["double", "boolean", "int", "char"],
                answer: "int"
            },
            {
                question: "Which keyword is used to inherit a class?",
                options: ["implements", "extends", "inherits", "super"],
                answer: "extends"
            },
            {
                question: "Which keyword declares a constant variable?",
                options: ["static", "final", "const", "fixed"],
                answer: "final"
            }
        ],

        medium: [
            {
                question: "Which concept allows a class to inherit another class?",
                options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
                answer: "Inheritance"
            },
            {
                question: "Which collection allows duplicate elements and maintains insertion order?",
                options: ["HashSet", "ArrayList", "TreeSet", "HashMap"],
                answer: "ArrayList"
            },
            {
                question: "Which keyword refers to the current object?",
                options: ["super", "this", "self", "current"],
                answer: "this"
            },
            {
                question: "Which block is used to handle exceptions?",
                options: ["try-catch", "if-else", "for-while", "switch-case"],
                answer: "try-catch"
            },
            {
                question: "Which interface is commonly used to sort objects with custom ordering?",
                options: ["Runnable", "Comparator", "Serializable", "Cloneable"],
                answer: "Comparator"
            }
        ],

        advanced: [
            {
                question: "Which collection does not allow duplicate elements?",
                options: ["ArrayList", "LinkedList", "HashSet", "Vector"],
                answer: "HashSet"
            },
            {
                question: "What is method overriding?",
                options: [
                    "Defining a method with the same signature in a subclass",
                    "Defining multiple methods with different parameters",
                    "Creating a static method",
                    "Deleting a parent method"
                ],
                answer: "Defining a method with the same signature in a subclass"
            },
            {
                question: "Which Java feature automatically manages unused memory?",
                options: ["Serialization", "Garbage collection", "Multithreading", "Compilation"],
                answer: "Garbage collection"
            },
            {
                question: "Which keyword prevents a method from being overridden?",
                options: ["static", "private", "final", "abstract"],
                answer: "final"
            },
            {
                question: "Which interface represents a sequence of elements supporting functional operations?",
                options: ["List", "Stream", "Map", "Set"],
                answer: "Stream"
            }
        ],

        expert: [
            {
                question: "Which keyword guarantees visibility of a variable's updates across threads?",
                options: ["static", "final", "volatile", "transient"],
                answer: "volatile"
            },
            {
                question: "What is the purpose of the Java ForkJoinPool?",
                options: [
                    "Managing database connections",
                    "Executing divide-and-conquer parallel tasks",
                    "Compiling Java source files",
                    "Handling file permissions"
                ],
                answer: "Executing divide-and-conquer parallel tasks"
            },
            {
                question: "What does the happens-before relationship provide in Java concurrency?",
                options: [
                    "A guarantee of memory visibility and ordering",
                    "Automatic thread termination",
                    "Faster garbage collection",
                    "Automatic object serialization"
                ],
                answer: "A guarantee of memory visibility and ordering"
            },
            {
                question: "What is a deadlock?",
                options: [
                    "A thread running too quickly",
                    "Threads waiting indefinitely for each other's locks",
                    "A compilation failure",
                    "An object without a constructor"
                ],
                answer: "Threads waiting indefinitely for each other's locks"
            },
            {
                question: "Which feature allows Java methods to use generic type parameters?",
                options: ["Reflection", "Generics", "Serialization", "Annotations"],
                answer: "Generics"
            }
        ]
    },

    // =====================================
    // PYTHON
    // =====================================
    python: {

        basic: [
            {
                question: "Which symbol starts a comment in Python?",
                options: ["//", "#", "/*", "--"],
                answer: "#"
            },
            {
                question: "Which function displays output in Python?",
                options: ["echo()", "print()", "display()", "write()"],
                answer: "print()"
            },
            {
                question: "Which data type stores text?",
                options: ["int", "float", "str", "bool"],
                answer: "str"
            },
            {
                question: "Which keyword defines a function?",
                options: ["function", "def", "fun", "method"],
                answer: "def"
            },
            {
                question: "Which symbol is used for exponentiation?",
                options: ["^", "**", "//", "%%"],
                answer: "**"
            }
        ],

        medium: [
            {
                question: "Which Python data type stores key-value pairs?",
                options: ["List", "Tuple", "Set", "Dictionary"],
                answer: "Dictionary"
            },
            {
                question: "Which keyword is used to create a loop over a sequence?",
                options: ["repeat", "foreach", "for", "iterate"],
                answer: "for"
            },
            {
                question: "Which method adds an item to a list?",
                options: ["add()", "append()", "insertEnd()", "push()"],
                answer: "append()"
            },
            {
                question: "Which keyword handles exceptions?",
                options: ["catch", "except", "error", "handle"],
                answer: "except"
            },
            {
                question: "What does len() return?",
                options: [
                    "The memory address",
                    "The number of items",
                    "The data type",
                    "The largest item"
                ],
                answer: "The number of items"
            }
        ],

        advanced: [
            {
                question: "What does a Python decorator do?",
                options: [
                    "Modifies or extends a function's behavior",
                    "Deletes a function",
                    "Creates a database",
                    "Converts Python into Java"
                ],
                answer: "Modifies or extends a function's behavior"
            },
            {
                question: "What is a list comprehension?",
                options: [
                    "A concise way to create lists",
                    "A method for deleting lists",
                    "A way to create classes",
                    "A database query"
                ],
                answer: "A concise way to create lists"
            },
            {
                question: "Which keyword creates a generator?",
                options: ["return", "yield", "generate", "async"],
                answer: "yield"
            },
            {
                question: "What is the purpose of __init__()?",
                options: [
                    "Initialize an object's attributes",
                    "Delete an object",
                    "Import a module",
                    "Stop a loop"
                ],
                answer: "Initialize an object's attributes"
            },
            {
                question: "What does the with statement commonly manage?",
                options: [
                    "Context managers and resource cleanup",
                    "Class inheritance",
                    "Variable naming",
                    "Loop execution"
                ],
                answer: "Context managers and resource cleanup"
            }
        ],

        expert: [
            {
                question: "What is the primary purpose of Python's GIL in standard CPython?",
                options: [
                    "To manage database connections",
                    "To limit simultaneous execution of Python bytecode by multiple threads",
                    "To increase memory automatically",
                    "To compile Python into machine code"
                ],
                answer: "To limit simultaneous execution of Python bytecode by multiple threads"
            },
            {
                question: "What is the purpose of metaclasses in Python?",
                options: [
                    "To control class creation",
                    "To execute SQL queries",
                    "To manage HTML elements",
                    "To replace functions"
                ],
                answer: "To control class creation"
            },
            {
                question: "What does asyncio primarily support?",
                options: [
                    "Asynchronous programming",
                    "Image processing only",
                    "Database schema design",
                    "Static type compilation"
                ],
                answer: "Asynchronous programming"
            },
            {
                question: "What does the descriptor protocol define?",
                options: [
                    "Attribute access behavior using methods such as __get__ and __set__",
                    "File compression",
                    "Loop execution",
                    "Module installation"
                ],
                answer: "Attribute access behavior using methods such as __get__ and __set__"
            },
            {
                question: "What is the purpose of functools.lru_cache?",
                options: [
                    "Memoizing function results",
                    "Deleting old modules",
                    "Creating threads",
                    "Sorting dictionaries"
                ],
                answer: "Memoizing function results"
            }
        ]
    },

    // =====================================
    // SQL
    // =====================================
    sql: {

        basic: [
            {
                question: "Which SQL command retrieves data from a table?",
                options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
                answer: "SELECT"
            },
            {
                question: "Which command inserts new records?",
                options: ["ADD", "INSERT", "UPDATE", "CREATE"],
                answer: "INSERT"
            },
            {
                question: "Which clause filters records?",
                options: ["ORDER BY", "WHERE", "GROUP BY", "JOIN"],
                answer: "WHERE"
            },
            {
                question: "Which command removes a table completely?",
                options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
                answer: "DROP"
            },
            {
                question: "Which keyword sorts query results?",
                options: ["SORT", "ORDER BY", "GROUP BY", "ARRANGE"],
                answer: "ORDER BY"
            }
        ],

        medium: [
            {
                question: "Which clause filters grouped records?",
                options: ["WHERE", "ORDER BY", "HAVING", "LIMIT"],
                answer: "HAVING"
            },
            {
                question: "Which function counts rows?",
                options: ["SUM()", "COUNT()", "TOTAL()", "NUMBER()"],
                answer: "COUNT()"
            },
            {
                question: "Which JOIN returns only matching rows from both tables?",
                options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "CROSS JOIN"],
                answer: "INNER JOIN"
            },
            {
                question: "Which constraint uniquely identifies each record?",
                options: ["FOREIGN KEY", "PRIMARY KEY", "DEFAULT", "CHECK"],
                answer: "PRIMARY KEY"
            },
            {
                question: "Which operator checks whether a value matches a pattern?",
                options: ["IN", "BETWEEN", "LIKE", "EXISTS"],
                answer: "LIKE"
            }
        ],

        advanced: [
            {
                question: "Which JOIN returns all rows from the left table and matching rows from the right table?",
                options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"],
                answer: "LEFT JOIN"
            },
            {
                question: "What is a correlated subquery?",
                options: [
                    "A subquery that references the outer query",
                    "A query without a SELECT clause",
                    "A query that creates a database",
                    "A query that always returns one row"
                ],
                answer: "A subquery that references the outer query"
            },
            {
                question: "Which SQL function assigns a sequential number to rows within a result set?",
                options: ["RANK()", "ROW_NUMBER()", "COUNT()", "SEQUENCE()"],
                answer: "ROW_NUMBER()"
            },
            {
                question: "What is database normalization primarily used for?",
                options: [
                    "Reducing data redundancy",
                    "Increasing duplicate records",
                    "Deleting indexes",
                    "Encrypting passwords"
                ],
                answer: "Reducing data redundancy"
            },
            {
                question: "Which clause combines rows with the same values into groups?",
                options: ["ORDER BY", "GROUP BY", "HAVING", "DISTINCT"],
                answer: "GROUP BY"
            }
        ],

        expert: [
            {
                question: "What is the purpose of a database index?",
                options: [
                    "To improve data retrieval performance",
                    "To delete duplicate tables",
                    "To automatically encrypt all data",
                    "To replace primary keys"
                ],
                answer: "To improve data retrieval performance"
            },
            {
                question: "What does ACID stand for in database transactions?",
                options: [
                    "Atomicity, Consistency, Isolation, Durability",
                    "Accuracy, Control, Integrity, Data",
                    "Access, Consistency, Index, Distribution",
                    "Atomicity, Control, Isolation, Dependency"
                ],
                answer: "Atomicity, Consistency, Isolation, Durability"
            },
            {
                question: "What is a phantom read?",
                options: [
                    "A transaction retrieves additional rows matching a previous query",
                    "A table suddenly disappears",
                    "A database loses its primary key",
                    "A query returns no columns"
                ],
                answer: "A transaction retrieves additional rows matching a previous query"
            },
            {
                question: "What is a materialized view?",
                options: [
                    "A stored result of a query that can be refreshed",
                    "A temporary database connection",
                    "A type of primary key",
                    "A query without conditions"
                ],
                answer: "A stored result of a query that can be refreshed"
            },
            {
                question: "What is the main purpose of database partitioning?",
                options: [
                    "Divide a large table into smaller manageable parts",
                    "Remove all database indexes",
                    "Convert SQL into Java",
                    "Prevent all concurrent transactions"
                ],
                answer: "Divide a large table into smaller manageable parts"
            }
        ]
    },

    // =====================================
    // ANGULAR
    // =====================================
    angular: {

        basic: [
            {
                question: "Which language is primarily used to develop Angular applications?",
                options: ["Python", "Java", "TypeScript", "C++"],
                answer: "TypeScript"
            },
            {
                question: "Which command creates a new Angular project?",
                options: [
                    "ng new",
                    "ng create",
                    "ng start",
                    "ng project"
                ],
                answer: "ng new"
            },
            {
                question: "Which file commonly contains an Angular component template?",
                options: ["component.html", "component.sql", "component.json", "component.java"],
                answer: "component.html"
            },
            {
                question: "Which directive conditionally displays an element?",
                options: ["*ngFor", "*ngIf", "*ngClass", "*ngStyle"],
                answer: "*ngIf"
            },
            {
                question: "Which decorator defines an Angular component?",
                options: ["@Service", "@Component", "@Module", "@Pipe"],
                answer: "@Component"
            }
        ],

        medium: [
            {
                question: "Which decorator defines an Angular component?",
                options: ["@Injectable", "@Component", "@NgModule", "@Directive"],
                answer: "@Component"
            },
            {
                question: "Which lifecycle hook runs after component initialization?",
                options: ["ngOnDestroy", "ngOnInit", "ngAfterViewChecked", "ngDoCheck"],
                answer: "ngOnInit"
            },
            {
                question: "Which decorator is used for dependency injection services?",
                options: ["@Component", "@Input", "@Injectable", "@Output"],
                answer: "@Injectable"
            },
            {
                question: "Which decorator passes data from parent to child?",
                options: ["@Output", "@Input", "@Injectable", "@Host"],
                answer: "@Input"
            },
            {
                question: "Which Angular module is commonly used to make HTTP requests?",
                options: ["FormsModule", "HttpClientModule", "RouterModule", "CommonModule"],
                answer: "HttpClientModule"
            }
        ],

        advanced: [
            {
                question: "Which Angular feature allows lazy loading of routes?",
                options: [
                    "loadComponent or loadChildren",
                    "ngOnInit",
                    "ngOnChanges",
                    "ViewChild"
                ],
                answer: "loadComponent or loadChildren"
            },
            {
                question: "Which RxJS operator switches to a new observable and cancels the previous subscription?",
                options: ["map", "filter", "switchMap", "tap"],
                answer: "switchMap"
            },
            {
                question: "What is the purpose of Angular route guards?",
                options: [
                    "Control access to routes",
                    "Style components",
                    "Create database tables",
                    "Compile TypeScript"
                ],
                answer: "Control access to routes"
            },
            {
                question: "Which decorator allows a child component to emit events to its parent?",
                options: ["@Input", "@Output", "@Injectable", "@HostBinding"],
                answer: "@Output"
            },
            {
                question: "What does the async pipe do?",
                options: [
                    "Automatically subscribes to and unsubscribes from an observable or promise",
                    "Creates HTTP requests",
                    "Compiles templates",
                    "Changes component styles"
                ],
                answer: "Automatically subscribes to and unsubscribes from an observable or promise"
            }
        ],

        expert: [
            {
                question: "What is the purpose of Angular's OnPush change detection strategy?",
                options: [
                    "To disable all change detection",
                    "To optimize checks based on specific triggers",
                    "To automatically reload the browser",
                    "To replace dependency injection"
                ],
                answer: "To optimize checks based on specific triggers"
            },
            {
                question: "What is the purpose of Angular signals?",
                options: [
                    "Manage reactive state and notify consumers of changes",
                    "Create database connections",
                    "Replace HTML templates",
                    "Handle CSS animations only"
                ],
                answer: "Manage reactive state and notify consumers of changes"
            },
            {
                question: "What does takeUntilDestroyed() help manage?",
                options: [
                    "Automatic cleanup of observable subscriptions",
                    "Component styling",
                    "Route creation",
                    "Database migrations"
                ],
                answer: "Automatic cleanup of observable subscriptions"
            },
            {
                question: "What is the purpose of a custom Angular ControlValueAccessor?",
                options: [
                    "Integrate a custom form control with Angular Forms",
                    "Create HTTP interceptors",
                    "Configure lazy loading",
                    "Manage component animations"
                ],
                answer: "Integrate a custom form control with Angular Forms"
            },
            {
                question: "What is the main purpose of an Angular HTTP interceptor?",
                options: [
                    "Process or modify HTTP requests and responses centrally",
                    "Create component templates",
                    "Replace the router",
                    "Manage CSS variables"
                ],
                answer: "Process or modify HTTP requests and responses centrally"
            }
        ]
    },

    // =====================================
    // REACT
    // =====================================
    react: {

        basic: [
            {
                question: "Which method is commonly used to create React components?",
                options: ["function", "className", "renderHTML", "component()"],
                answer: "function"
            },
            {
                question: "Which syntax is commonly used to write HTML-like code in React?",
                options: ["XML", "JSX", "SQL", "JSON"],
                answer: "JSX"
            },
            {
                question: "Which property is used to pass data to a component?",
                options: ["state", "props", "refs", "hooks"],
                answer: "props"
            },
            {
                question: "Which method renders a list of elements from an array?",
                options: ["filter()", "map()", "reduce()", "find()"],
                answer: "map()"
            },
            {
                question: "What is the default port commonly used by Create React App?",
                options: ["3000", "4200", "8080", "5500"],
                answer: "3000"
            }
        ],

        medium: [
            {
                question: "Which React Hook manages component state?",
                options: ["useEffect", "useState", "useRef", "useMemo"],
                answer: "useState"
            },
            {
                question: "Which Hook is commonly used for side effects?",
                options: ["useState", "useEffect", "useContext", "useRef"],
                answer: "useEffect"
            },
            {
                question: "What is the purpose of the key prop when rendering lists?",
                options: [
                    "Identify elements between renders",
                    "Apply CSS styles",
                    "Store passwords",
                    "Create event handlers"
                ],
                answer: "Identify elements between renders"
            },
            {
                question: "How does a child component receive data from its parent?",
                options: ["Through props", "Through SQL", "Through CSS", "Through HTML attributes only"],
                answer: "Through props"
            },
            {
                question: "Which Hook allows access to context values?",
                options: ["useMemo", "useContext", "useRef", "useCallback"],
                answer: "useContext"
            }
        ],

        advanced: [
            {
                question: "Why are keys used when rendering lists in React?",
                options: [
                    "To style list elements",
                    "To identify elements between renders",
                    "To create CSS classes",
                    "To store component state"
                ],
                answer: "To identify elements between renders"
            },
            {
                question: "What does useMemo() help optimize?",
                options: [
                    "Expensive calculations",
                    "HTML parsing",
                    "Database storage",
                    "CSS compilation"
                ],
                answer: "Expensive calculations"
            },
            {
                question: "What is the purpose of React Context?",
                options: [
                    "Share data across components without passing props through every level",
                    "Create HTML elements",
                    "Manage CSS files",
                    "Replace JavaScript functions"
                ],
                answer: "Share data across components without passing props through every level"
            },
            {
                question: "What does useCallback() return?",
                options: [
                    "A memoized function",
                    "A new HTML element",
                    "A CSS object",
                    "A promise"
                ],
                answer: "A memoized function"
            },
            {
                question: "What is a controlled component in React?",
                options: [
                    "A form element whose value is controlled by React state",
                    "A component without props",
                    "A component that cannot re-render",
                    "A component styled with CSS"
                ],
                answer: "A form element whose value is controlled by React state"
            }
        ],

        expert: [
            {
                question: "What does React.memo() primarily help prevent?",
                options: [
                    "Unnecessary component re-renders when props are unchanged",
                    "All state updates",
                    "Browser navigation",
                    "API requests"
                ],
                answer: "Unnecessary component re-renders when props are unchanged"
            },
            {
                question: "What is the purpose of React's reconciliation process?",
                options: [
                    "Determine the necessary changes to update the DOM",
                    "Compile CSS files",
                    "Create database connections",
                    "Handle network requests"
                ],
                answer: "Determine the necessary changes to update the DOM"
            },
            {
                question: "What is the purpose of useTransition()?",
                options: [
                    "Mark state updates as non-urgent",
                    "Create CSS transitions",
                    "Replace useState",
                    "Manage database transactions"
                ],
                answer: "Mark state updates as non-urgent"
            },
            {
                question: "What is hydration in React?",
                options: [
                    "Attaching React behavior to server-rendered HTML",
                    "Removing all HTML elements",
                    "Converting CSS to JSX",
                    "Creating a database"
                ],
                answer: "Attaching React behavior to server-rendered HTML"
            },
            {
                question: "What is the purpose of an Error Boundary?",
                options: [
                    "Catch rendering errors in descendant components",
                    "Handle every JavaScript error globally",
                    "Validate database records",
                    "Prevent all network errors"
                ],
                answer: "Catch rendering errors in descendant components"
            }
        ]
    },

    // =====================================
    // C++
    // =====================================
    cpp: {

        basic: [
            {
                question: "Which header is commonly used for cout and cin?",
                options: ["<stdlib.h>", "<iostream>", "<string>", "<stdio.h>"],
                answer: "<iostream>"
            },
            {
                question: "Which symbol ends a statement in C++?",
                options: [":", ";", ".", ","],
                answer: ";"
            },
            {
                question: "Which keyword declares an integer variable?",
                options: ["integer", "int", "number", "num"],
                answer: "int"
            },
            {
                question: "Which function is the entry point of a C++ program?",
                options: ["start()", "main()", "run()", "init()"],
                answer: "main()"
            },
            {
                question: "Which operator is used to access members of an object?",
                options: ["->", ".", "::", "&"],
                answer: "."
            }
        ],

        medium: [
            {
                question: "Which operator is used to access a member through a pointer?",
                options: [".", "::", "->", "&"],
                answer: "->"
            },
            {
                question: "Which concept allows multiple functions with the same name but different parameters?",
                options: ["Overriding", "Overloading", "Inheritance", "Encapsulation"],
                answer: "Overloading"
            },
            {
                question: "Which keyword allocates memory dynamically?",
                options: ["malloc", "new", "create", "alloc"],
                answer: "new"
            },
            {
                question: "Which loop executes its body at least once?",
                options: ["for", "while", "do-while", "foreach"],
                answer: "do-while"
            },
            {
                question: "Which access specifier allows access only within the class?",
                options: ["public", "protected", "private", "global"],
                answer: "private"
            }
        ],

        advanced: [
            {
                question: "What is function overloading?",
                options: [
                    "Defining multiple functions with the same name but different parameter lists",
                    "Defining functions inside loops",
                    "Deleting overloaded functions",
                    "Calling a function recursively"
                ],
                answer: "Defining multiple functions with the same name but different parameter lists"
            },
            {
                question: "What is a virtual function?",
                options: [
                    "A function supporting runtime polymorphism",
                    "A function without a body",
                    "A function that cannot be overridden",
                    "A function that runs automatically"
                ],
                answer: "A function supporting runtime polymorphism"
            },
            {
                question: "Which container stores unique sorted elements?",
                options: ["vector", "list", "set", "queue"],
                answer: "set"
            },
            {
                question: "What is the purpose of a destructor?",
                options: [
                    "Perform cleanup when an object is destroyed",
                    "Create a new object",
                    "Overload an operator",
                    "Initialize a namespace"
                ],
                answer: "Perform cleanup when an object is destroyed"
            },
            {
                question: "Which keyword is used to prevent a class from being inherited?",
                options: ["static", "final", "sealed", "explicit"],
                answer: "final"
            }
        ],

        expert: [
            {
                question: "What does std::move() primarily enable?",
                options: [
                    "Copying an object",
                    "Moving resources from an object when move operations are available",
                    "Deleting an object immediately",
                    "Changing an object's data type"
                ],
                answer: "Moving resources from an object when move operations are available"
            },
            {
                question: "What is RAII in C++?",
                options: [
                    "Resource Acquisition Is Initialization",
                    "Runtime Array Initialization Interface",
                    "Random Access Iterator Implementation",
                    "Resource Allocation Is Immediate"
                ],
                answer: "Resource Acquisition Is Initialization"
            },
            {
                question: "What is a dangling pointer?",
                options: [
                    "A pointer referring to an object whose lifetime has ended",
                    "A pointer containing zero",
                    "A pointer to a constant value",
                    "A pointer to a function"
                ],
                answer: "A pointer referring to an object whose lifetime has ended"
            },
            {
                question: "What is the purpose of std::unique_ptr?",
                options: [
                    "Exclusive ownership of a dynamically allocated object",
                    "Shared ownership among multiple pointers",
                    "Automatic array sorting",
                    "Manual memory allocation only"
                ],
                answer: "Exclusive ownership of a dynamically allocated object"
            },
            {
                question: "What is template specialization?",
                options: [
                    "Providing a specific implementation for particular template arguments",
                    "Deleting a template",
                    "Converting templates into macros",
                    "Preventing generic programming"
                ],
                answer: "Providing a specific implementation for particular template arguments"
            }
        ]
    }

};

// =====================================
// SUBJECT SELECTION
// =====================================

subjectCards.forEach(function (card) {

    card.addEventListener("click", function () {

        selectedSubject = card.dataset.subject;

        // Highlight selected subject
        subjectCards.forEach(function (item) {
            item.classList.remove("active");
        });

        card.classList.add("active");

        // Display selected subject name
        const subjectName = card.querySelector("h3").textContent;

        selectedSubjectName.textContent =
            "Selected Subject: " + subjectName;

        // Show difficulty section
        difficultySection.classList.remove("hidden");

        // Hide previous result
        resultScreen.classList.add("hidden");

        // Reset difficulty selection
        selectedDifficulty = "";

        difficultyCards.forEach(function (item) {
            item.classList.remove("active");
        });

        difficultySection.scrollIntoView({
            behavior: "smooth"
        });

        console.log("Selected Subject:", selectedSubject);

    });

});


// =====================================
// DIFFICULTY SELECTION
// =====================================

difficultyCards.forEach(function (card) {

    card.addEventListener("click", function () {

        selectedDifficulty = card.dataset.level;

        // Highlight selected difficulty
        difficultyCards.forEach(function (item) {
            item.classList.remove("active");
        });

        card.classList.add("active");

        console.log("Selected Subject:", selectedSubject);
        console.log("Selected Difficulty:", selectedDifficulty);

        startQuiz();

    });

});


// =====================================
// START QUIZ
// =====================================

function startQuiz() {

    // Get questions for selected subject and difficulty
    questions = [...(questionBank[selectedSubject]?.[selectedDifficulty] || [])];

    // Shuffle questions randomly
    questions.sort(() => Math.random() - 0.5);

    if (questions.length === 0) {
        alert("No questions available for this selection.");
        return;
    }

    // =====================================
    // DISPLAY SELECTED SUBJECT AND DIFFICULTY
    // =====================================

    const selectedCard = document.querySelector(
        `.subject-card[data-subject="${selectedSubject}"]`
    );

    quizSubject.textContent =
        selectedCard.querySelector("h3").textContent + " Quiz";

    quizDifficulty.textContent =
        selectedDifficulty.charAt(0).toUpperCase() +
        selectedDifficulty.slice(1);


    clearInterval(timerInterval);

    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    answerHistory = [];

    difficultySection.classList.add("hidden");
    subjectsSection.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();

    quizScreen.scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================
// DISPLAY QUESTION
// =====================================


function showQuestion() {

    clearInterval(timerInterval);

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    questionCount.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Update question progress
    const progress =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";

    progressPercentage.textContent = Math.round(progress) + "%";

    optionsContainer.innerHTML = "";

    selectedAnswer = null;
    nextBtn.disabled = true;

    // Shuffle answer options randomly
    const shuffledOptions = [...currentQuestion.options];

    shuffledOptions.sort(() => Math.random() - 0.5);

    // Create answer buttons
    shuffledOptions.forEach(function (option) {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", function () {
            selectAnswer(button, option);
        });

        optionsContainer.appendChild(button);

    });

    // Start timer for this question
    startTimer();

}



// =====================================
// START TIMER
// =====================================

function startTimer() {

    clearInterval(timerInterval);

    // Set time based on difficulty
    timeLeft = timeLimits[selectedDifficulty];

    updateTimerDisplay();

    timerInterval = setInterval(function () {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timeIsUp();

        }

    }, 1000);

}


// =====================================
// UPDATE TIMER DISPLAY
// =====================================

function updateTimerDisplay() {

    timerElement.textContent = "Time: " + timeLeft + "s";

    if (timeLeft <= 5) {
        timerElement.classList.add("time-warning");
    } else {
        timerElement.classList.remove("time-warning");
    }

}


// =====================================
// SELECT ANSWER
// =====================================

function selectAnswer(button, option) {

    // Prevent multiple answers
    if (selectedAnswer !== null) {
        return;
    }

    selectedAnswer = option;

    clearInterval(timerInterval);

    const currentQuestion = questions[currentQuestionIndex];

    // Check answer
    if (option === currentQuestion.answer) {

        score++;

        button.classList.add("correct");

        // Show correct feedback
        answerFeedback.textContent = "Correct! Well done!";
        answerFeedback.className = "feedback-correct";

    } else {

        button.classList.add("incorrect");

        // Show incorrect feedback
        answerFeedback.textContent = "Incorrect! Try again next time.";
        answerFeedback.className = "feedback-incorrect";

    }

    // Save this question's answer for the result review
    answerHistory.push({
        question: currentQuestion.question,
        selectedAnswer: option,
        correctAnswer: currentQuestion.answer,
        isCorrect: option === currentQuestion.answer
    });

    // Disable all options and show correct answer
    const allButtons = optionsContainer.querySelectorAll("button");

    allButtons.forEach(function (item) {

        item.disabled = true;

        if (item.textContent === currentQuestion.answer) {
            item.classList.add("correct");
        }

    });

    nextBtn.disabled = false;

}


// =====================================
// TIME IS UP
// =====================================

function timeIsUp() {

    selectedAnswer = "TIME_UP";

    const currentQuestion = questions[currentQuestionIndex];

    // Save timed-out question for the result review
    answerHistory.push({
        question: currentQuestion.question,
        selectedAnswer: null,
        correctAnswer: currentQuestion.answer,
        isCorrect: false
    });

    const allButtons = optionsContainer.querySelectorAll("button");

    // Disable options and reveal correct answer
    allButtons.forEach(function (button) {

        button.disabled = true;

        if (button.textContent === currentQuestion.answer) {
            button.classList.add("correct");
        }

    });

    // Show timeout feedback
    answerFeedback.textContent = "Time's up! Better luck next time.";
    answerFeedback.className = "feedback-incorrect";

    timerElement.textContent = "Time is up!";

    nextBtn.disabled = false;

}


// =====================================
// NEXT QUESTION
// =====================================

nextBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// =====================================
// SHOW RESULT
// =====================================


function renderAnswerReview() {

    answerReviewList.innerHTML = "";

    answerHistory.forEach(function (item, index) {

        const reviewCard = document.createElement("article");
        reviewCard.classList.add("review-card");
        reviewCard.classList.add(item.isCorrect ? "review-correct" : "review-incorrect");

        const questionTitle = document.createElement("h3");
        questionTitle.textContent = `Question ${index + 1}: ${item.question}`;

        const yourAnswer = document.createElement("p");
        yourAnswer.classList.add("review-your-answer");

        if (item.selectedAnswer === null) {
            yourAnswer.textContent = "Your answer: Not answered (time expired)";
        } else {
            yourAnswer.textContent = `Your answer: ${item.selectedAnswer}`;
        }

        const correctAnswer = document.createElement("p");
        correctAnswer.classList.add("review-correct-answer");
        correctAnswer.textContent = `Correct answer: ${item.correctAnswer}`;

        const status = document.createElement("span");
        status.classList.add("review-status");
        status.textContent = item.isCorrect ? "Correct" : "Incorrect";

        reviewCard.appendChild(questionTitle);
        reviewCard.appendChild(status);
        reviewCard.appendChild(yourAnswer);
        reviewCard.appendChild(correctAnswer);

        answerReviewList.appendChild(reviewCard);

    });

}


// =====================================
// SHOW RESULT
// =====================================

function showResult() {

    clearInterval(timerInterval);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    // Show subjects again
    subjectsSection.classList.remove("hidden");

    // Calculate statistics
    const totalQuestions = questions.length;
    const correctAnswers = score;
    const incorrectAnswers = totalQuestions - correctAnswers;

    const percentage = totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    // Display statistics
    totalQuestionsElement.textContent = totalQuestions;
    correctAnswersElement.textContent = correctAnswers;
    incorrectAnswersElement.textContent = incorrectAnswers;
    scorePercentageElement.textContent = percentage + "%";

    // Display final score
    finalScore.textContent =
        `Your Score: ${score}/${totalQuestions}`;

    // Update circular score indicator
    if (circlePercentage && scoreCircle) {
        circlePercentage.textContent = percentage + "%";

        scoreCircle.style.background =
            `conic-gradient(#111 ${percentage * 3.6}deg, #e5e5e5 0deg)`;

        scoreCircle.setAttribute(
            "aria-label",
            `Quiz score: ${percentage}%`
        );
    }

    // Performance message
    let message = "";

    if (percentage >= 90) {
        message = "Excellent! Outstanding performance! 🏆";

    } else if (percentage >= 75) {
        message = "Great job! Keep it up! 🎉";

    } else if (percentage >= 50) {
        message = "Good effort! You're improving! 👍";

    } else {
        message = "Keep practicing! You can do better! 💪";
    }

    resultMessage.textContent =
        `${message} Your percentage: ${percentage}%`;

    // Display all answers from this quiz
    renderAnswerReview();

    // Scroll to result screen
    resultScreen.scrollIntoView({
        behavior: "smooth"
    });
}

// =====================================
// RESTART QUIZ
// =====================================

restartBtn.addEventListener("click", function () {

    // Ask for confirmation
    const confirmRestart = confirm(
        "Are you sure you want to restart the quiz?"
    );

    // Stop if user clicks Cancel
    if (!confirmRestart) {
        return;
    }

    clearInterval(timerInterval);

    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    answerHistory = [];

    resultScreen.classList.add("hidden");

    // Return to difficulty selection
    subjectsSection.classList.add("hidden");
    difficultySection.classList.remove("hidden");

    // Reset timer display
    timerElement.textContent =
        "Time: " + timeLimits[selectedDifficulty] + "s";

    timerElement.classList.remove("time-warning");

    difficultySection.scrollIntoView({
        behavior: "smooth"
    });

});

// =====================================
// EXIT QUIZ
// =====================================

exitQuizBtn.addEventListener("click", function () {

    const confirmExit = confirm(
        "Are you sure you want to leave this quiz? Your current progress will be lost."
    );

    if (confirmExit) {

        // Stop timer
        clearInterval(timerInterval);

        // Reset quiz variables
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        answerHistory = [];

        // Hide quiz
        quizScreen.classList.add("hidden");

        // Show subjects and difficulty section
        subjectsSection.classList.remove("hidden");
        difficultySection.classList.remove("hidden");

        // Reset timer display
        timerElement.textContent =
            "Time: " + timeLimits[selectedDifficulty] + "s";

        timerElement.classList.remove("time-warning");

        // Return to difficulty selection
        difficultySection.scrollIntoView({
            behavior: "smooth"
        });

    }

});



/* =====================================
   DARK / LIGHT MODE FUNCTIONALITY
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const themeText = document.getElementById("theme-text");

    // Apply saved theme when the page loads
    const savedTheme = localStorage.getItem("quizTheme") || "light";

    applyTheme(savedTheme);

    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", () => {

        const isDarkMode = document.body.classList.contains("dark-mode");

        const newTheme = isDarkMode ? "light" : "dark";

        applyTheme(newTheme);

        // Save selected theme
        localStorage.setItem("quizTheme", newTheme);

    });

    // Apply selected theme
    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add("dark-mode");

            themeIcon.textContent = "☀";
            themeText.textContent = "Light Mode";

            themeToggle.setAttribute("aria-label", "Switch to light mode");
            themeToggle.setAttribute("aria-pressed", "true");

        } else {

            document.body.classList.remove("dark-mode");

            themeIcon.textContent = "☾";
            themeText.textContent = "Dark Mode";

            themeToggle.setAttribute("aria-label", "Switch to dark mode");
            themeToggle.setAttribute("aria-pressed", "false");

        }
    }

});
