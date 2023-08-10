import { apiSlice } from "./apiSlice";

const MESSAGE_URL = "/api/messages";

export const MessagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (newMessage) => ({
        url: `${MESSAGE_URL}`,
        method: "POST",
        body: newMessage,
      }),
    }),
    getMessages: builder.query({
      query: (chatId) => `message/${chatId}`,
    }),

   
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
} = MessagesApiSlice;
