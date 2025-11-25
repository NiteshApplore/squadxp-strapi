module.exports = {
  routes: [
    {
      method: "POST",
      path: "/enquiry/submit",
      handler: "enquiry.create",
      config: {
        auth: false, // public route
      },
    },
  ],
};
