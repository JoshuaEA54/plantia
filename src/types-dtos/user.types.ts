export type Plant = {
  id: number;
  name: string;
  status: string;
  image: string;
};

export type Category = {
  emoji: string;
  name: string;
};

export type UserProfileData = {
  name: string;
  handle: string;
  bio: string;
  birthdate: string;
  avatarUrl: string;
  stats: {
    plants: number;
    friends: number;
    streak: number;
  };
};
