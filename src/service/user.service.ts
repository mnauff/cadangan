import { User } from "@prisma/client";
import prisma from "../util/prisma";
import { hashPassword } from "../util/hash";

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to create user: ${error.message}`);
    } else {
      throw new Error("Unable to create user: Unknown error");
    }
  }
};

/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
export const queryUsers = async <Key extends keyof User>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sort_by?: string;
    sort_type?: "asc" | "desc";
  },
  keys: Key[] = [
    "id",
    "email",
    "name",
    "password",
    "role",
    "token",
    "created_at",
    "updated_at",
  ] as Key[]
): Promise<Pick<User, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sort_by;
  const sortType = options.sort_type ?? "desc";
  const users = await prisma.user.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  return users as Pick<User, Key>[];
};

/**
 * Get user by email
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
export const getUserByEmail = async <Key extends keyof User>(
  email: string,
  keys: Key[] = [
    "id",
    "name",
    "email",
    "password",
    "token",
    "created_at",
    "updated_at",
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  try {
    return prisma.user.findUnique({
      where: { email },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    }) as Promise<Pick<User, Key> | null>;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Unable to find user with email ${email}: ${error.message}`
      );
    } else {
      throw new Error(`Unable to find user with email ${email}: Unknown error`);
    }
  }
};

/**
 * Update user token
 * @param {string} userId
 * @param {string} token
 * @returns {Promise<Pick<User, "id" | "name" | "email" | "token">>}
 */
export const updateUserToken = async (
  userId: string,
  token: string
): Promise<Pick<User, "id" | "name" | "email" | "token">> => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: { token },
      select: {
        id: true,
        name: true,
        email: true,
        token: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to update user token: ${error.message}`);
    } else {
      throw new Error("Unable to update user token: Unknown error");
    }
  }
};

/**
 * Get user by ID
 * @param {string} id
 * @returns {Promise<User | null>}
 */
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to find user with ID ${id}: ${error.message}`);
    } else {
      throw new Error(`Unable to find user with ID ${id}: Unknown error`);
    }
  }
};

/**
 * Remove user by ID
 * @param {string} id
 * @returns {Promise<User>}
 */
export const removeUser = async (id: string): Promise<User> => {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to delete user with ID ${id}: ${error.message}`);
    } else {
      throw new Error(`Unable to delete user with ID ${id}: Unknown error`);
    }
  }
};
