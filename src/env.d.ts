/// <reference types="astro/client" />

export interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  phone: string;
  email: string;
  role: UserRole;
  isAdmin: number; // 0 o 1 en SQLite
  bio?: string | null; // Opcional ya que no tiene .notNull()
}
declare namespace App {
  interface Locals {
    user?: User; // Aquí definimos que 'user' puede existir en locals
  }
}
