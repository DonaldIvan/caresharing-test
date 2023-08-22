interface Grade {
  grade: number;
  subject: string;
}

interface User {
  id: string;
  name: string;
  grades: Grade[];
}
