export default {
  routes: [
    {
      method: "PATCH",
      path: "/blogs/:slug/views",
      handler: "blog.logView",
      config: {
        policies: [],
      },
    },
  ],
};
