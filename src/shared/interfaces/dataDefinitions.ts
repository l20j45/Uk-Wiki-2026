export interface itineraryType {
  id: number;
  eventDate: string;
  eventTime: string;
  finishTime: string | null;
  title: string;
  description: string | null;
  icon: string | null;
  location: string | null;
  onlyAdmins: number;
  
}

export interface itineraries {
  itineraries: itineraryType[];
}

export interface usersTypewithoutSensibleData {
  id: number;
  username: string;
  fullName: string;
  phone: string | null;
  email: string | null;
  role: string;
  isAdmin: number;
  bio: string | null;
  avatarUrl: string | null;
  qrUrl: string | null;
  socials: any[];
}

export interface articleType {
  id?: number;
  title?: string;
  slug?: string;
  description: string | null | undefined;
  pubDate?: string;
  category: string;
  importance:string | undefined| null | number;
  content: string | undefined | null;
  image: string | null | undefined;
  isUrgent: string | undefined| null | number;
}



