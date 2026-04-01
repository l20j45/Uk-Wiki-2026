/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    isAdmin: boolean;
    user?: {
      id: number;
      username: string;
      fullName: string;
      role: string;
      isAdmin: number;
      bio: string | null;
      bloodType: string | null;
      allergies: string | null;
      emergencyContact: string | null;
      avatarUrl: string | null;
      qrUrl: string | null;
    };
  }
}