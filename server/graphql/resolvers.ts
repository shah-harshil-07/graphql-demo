interface Book {
    id: string;
    year: number;
    genre: string;
    title: string;
    author: string;
};

const books: Book[] = [
    {
        id: '1',
        year: 2000,
        genre: 'Fiction',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
    },
    {
        id: '2',
        year: 2010,
        genre: 'Non-fiction',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
    },
    {
        id: '3',
        year: 2015,
        genre: 'Fiction',
        title: '1984',
        author: 'George Orwell',
    }
];

const rootValue = {
    books: () => books,
    book: ({ id }: { id: string }) => {
        return books.find(book => book.id === id);
    },
    searchBooks: ({ query }: { query: string }) => {
        return books.filter(book => {
            return book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query);
        });
    },
    addBook: ({ book }: { book: Book }) => {
        console.log('book => ', book);
        books.push(book);
        console.log('books => ', books);
        return book;
    },
};

export default rootValue;
