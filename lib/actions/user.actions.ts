'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[]}) => {
  try {
    const client = clerkClient();
    const { data } = await client.users.getUserList({
      // emailAddress: userIds,
      query: userIds.join(","),
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    // const sortedUsers = userIds.map((email) => users.find((user) => user.email === email));
    const sortedUsers = userIds.map((email) => {
    const found = users.find((user) => user.email === email);
      if (found) return found;

      // return a placeholder user for pending invite
      return {
        id: email, // temporary
        name: "Pending Invite",
        email,
        avatar: "/assets/images/logo.png",
      };
    });

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
}

export const getDocumentUsers = async ({ roomId, currentUser, text }: { roomId: string, currentUser: string, text: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

    if(text.length) {
      const lowerCaseText = text.toLowerCase();

      const filteredUsers = users.filter((email: string) => email.toLowerCase().includes(lowerCaseText))

      return parseStringify(filteredUsers);
    }

    return parseStringify(users);
  } catch (error) {
    console.log(`Error fetching document users: ${error}`);
  }
}