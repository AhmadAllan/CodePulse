import { apiSlice } from "./apiSlice";

const CHAT_URL = "/api/chats";

export const ChatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => `${CHAT_URL}`,
    }),
    createGroupChat: builder.mutation({
      query: (users, name) => ({
        url: `${CHAT_URL}/group`,
        method: "POST",
        body: {
          users,
          name,
        },
      }),
    }),
    addToGroup: builder.mutation({
      query: (chatId, userId) => ({
        url: `${CHAT_URL}/groupAdd`,
        method: "PUT",
        body: {
          chatId,
          userId,
        },
      }),
    }),
    removeFromGroup: builder.mutation({
      query: (chatId, userId) => ({
        url: `${CHAT_URL}/groupRemove`,
        method: "PUT",
        body: {
          chatId,
          userId,
        },
      }),
    }),
    renameGroup: builder.mutation({
      query: (chatId, chatName) => ({
        url: `${CHAT_URL}/rename`,
        method: "PUT",
        body: {
          chatId,
          chatName,
        },
      }),
    }),
  }),
});

export const {
  useGetChatsQuery,
  useCreateGroupChatMutation,
  useAddToGroupMutation,
  useRemoveFromGroupMutation,
  useRenameGroupMutation,
} = ChatApiSlice;