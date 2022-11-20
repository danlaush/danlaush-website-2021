const errors = [
  {
    title:
      "Cannot read property of undefined/null expression a[w.checkoutSettingKeys]",
    url: "https://rollbar.com/Wise/lienzo-frontend/items/2569/",
  },
  {
    title:
      '(unknown): "[unhandledrejection] error getting `reason` from event"',
    url: "https://rollbar.com/Wise/seo-landing-pages/items/11/",
  },
  {
    title: "Cannot read property of undefined/null expression o",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/92/",
  },
  {
    title: "Can't find variable ibFindAllVideos",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/34/",
  },
  {
    title:
      "Uncaught SyntaxError: Identifier 'isMainframe' has already been declared",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/30/",
  },
  {
    title: "Can't find variable setIOSParameters",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/7/",
  },
  {
    title: "Can't find variable zaloJSV2",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/15/",
  },
  {
    title:
      "Uncaught SyntaxError: Identifier 'originalPrompt' has already been declared",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/51/",
  },
  {
    title:
      "Uncaught TypeError: Converting circular structure to JSON --> starting at object with constructor 'HTMLElement' | property '__reactFiber$yw7j7lakon' -> object with constructor '$u' --- property 'stateNode' closes the circle",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/343/",
  },
  {
    title: "Can't find variable ccbrAuthInfo",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/106/",
  },
  {
    title: "Can't find variable jwplayer",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/48/",
  },
  {
    title: "TypeError: Cannot redefine property: ethereum",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/425/",
  },
  {
    title:
      "Error: Operation not allowed, dapp doesn't have the required permissions",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/420/",
  },
  {
    title: "Error: {}",
    url: "https://rollbar.com/Wise/seo-landing-pages/items/64/",
  },
  {
    title: "SyntaxError: The string did not match the expected pattern.",
    url: "https://rollbar.com/Wise/lienzo-frontend/items/2896/",
  },
  {
    title:
      "TypeError: Argument 1 ('element') to Window.getComputedStyle must be an instance of Element",
    url: "https://rollbar.com/Wise/lienzo-frontend/items/2789/",
    traces: {
      frames: [
        {
          try_code_context: null,
          raw_item_code_context: null,
          filename: "[native code]",
          lineno: null,
          scm_link: null,
          is_project_frame: true,
          scm_provider: "",
          method: "promiseReactionJob",
        },
        {
          try_code_context: null,
          raw_item_code_context: null,
          filename: "[native code]",
          lineno: null,
          scm_link: null,
          is_project_frame: true,
          scm_provider: "",
          method: "promiseReactionJobWithoutPromise",
        },
        {
          try_code_context: null,
          raw_item_code_context: null,
          filename: "[native code]",
          lineno: null,
          scm_link: null,
          is_project_frame: true,
          scm_provider: "",
          method: "[anonymous]",
        },
        {
          try_code_context: null,
          raw_item_code_context: null,
          filename: "[native code]",
          lineno: null,
          scm_link: null,
          is_project_frame: true,
          scm_provider: "",
          method: "asyncFunctionResume",
        },
        {
          try_code_context: null,
          scm_link: null,
          raw_item_code_context: null,
          filename:
            "safari-web-extension://4BEDD15B-C2B1-4EF1-A780-D6D0EB0D577D/content/init-PN2AWDXJ.js",
          lineno: 66,
          colno: 9056,
          is_project_frame: true,
          scm_provider: "",
          method: "[anonymous]",
        },
        {
          try_code_context: null,
          scm_link: null,
          raw_item_code_context: null,
          filename:
            "safari-web-extension://4BEDD15B-C2B1-4EF1-A780-D6D0EB0D577D/content/init-PN2AWDXJ.js",
          lineno: 66,
          colno: 6298,
          is_project_frame: true,
          scm_provider: "",
          method: "F",
        },
        {
          try_code_context: null,
          scm_link: null,
          raw_item_code_context: null,
          filename:
            "safari-web-extension://4BEDD15B-C2B1-4EF1-A780-D6D0EB0D577D/content/init-PN2AWDXJ.js",
          lineno: 66,
          colno: 5457,
          is_project_frame: true,
          scm_provider: "",
          method: "ge",
        },
        {
          try_code_context: null,
          raw_item_code_context: null,
          filename: "[native code]",
          lineno: null,
          scm_link: null,
          is_project_frame: true,
          scm_provider: "",
          method: "getComputedStyle",
        },
      ],
      exception: {
        message:
          "Argument 1 ('element') to Window.getComputedStyle must be an instance of Element",
        class: "TypeError",
        description:
          "Argument 1 ('element') to Window.getComputedStyle must be an instance of Element",
      },
    },
  },
];
export default errors;
