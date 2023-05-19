class DuplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicationError";
  }
}

export default DuplicationError;
