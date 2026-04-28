import { db } from "@db/db";

import type { usersTypewithoutSensibleData } from "@shared/interfaces/dataDefinitions";

export const getAllUsers = async (): Promise<
  usersTypewithoutSensibleData[]
> => {
  return db.query.users.findMany({
    columns: {
      password: false,
      bloodType: false,
      allergies: false,
      extraInfo: false,
    },
    with: {
      socials: true,
    },
  });
};
