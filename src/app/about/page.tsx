import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | SimpleShopping",
};

export default function About() {
  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-2xl font-bold">About this app</h1>
      <p>
        This application is a simple store that you can select your products,
        and "buy" them. This app works with Redux for the shopping cart. As a
        frontend we have NextJS and for a backend we use MongoDB Realm.
      </p>
      <p>
        As a disclaimer, I want to say that I wanted to implement Facebook Login
        as a login system, and a purchase simulation system, that is, Stripe.
      </p>
      <p>
        As a newbie, I had trouble implementing Facebook Login in my app, so I
        made the decision to abandon it, because it was too time-consuming. and{" "}
        <b>create a separate project that implements it</b> (for Stripe, I think
        I'm not going to implement anything. In due time, I think I will read
        its API documentation and implement it.). Stay tuned for my new project,
        the repo link will appear in this section when it is ready:
      </p>
      <p>#It's not ready yet#</p>

      <p className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>
        Link repo of this project:{" "}
        <a
          className="text-blue-600 hover:underline"
          href="https://github.com/deidara047/dd047-simple-shopping"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/deidara047/dd047-simple-shopping
        </a>
      </p>
      <p>This video shows all the functionalities of this app</p>
      <iframe
        className="w-full aspect-video"
        src="https://www.youtube.com/embed/I_EBPUkDvZY?si=hcH9v8JnbWJh-CZW"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
