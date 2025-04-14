class Book {
  constructor({
    id,
    title,
    author,
    genre,
    location,
    contactInfo,
    ownerId,
    status,
    createdAt,
    coverImage,
  }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.location = location;
    this.contactInfo = contactInfo;
    this.ownerId = ownerId;
    this.status = status || "available";
    this.createdAt = createdAt || new Date();
    this.coverImage = coverImage;
  }
}

module.exports = Book;
