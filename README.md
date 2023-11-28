# About this app

This application is a simple store that you can select your products,
and "buy" them. This app works with **Redux** for the shopping cart (you can
test it when you navigate between the links of the app, of course if you reload the site all
the cart data will be deleted). As a
frontend we have **NextJS** and for a backend we use **MongoDB Realm**.

As a disclaimer, I want to say that I wanted to implement Facebook Login
as a login system, and a purchase simulation system, that is, Stripe.

As a newbie, I had trouble implementing Facebook Login in my app, so I
made the decision to abandon it, because it was too time-consuming. and
**create a separate project that implements it** (for Stripe, I think
I'm not going to implement anything. In due time, I think I will read
its API documentation and implement it.). Stay tuned for my new project (which implements Facebook Login),
the repo link will appear in this section when it is ready:

#It's not ready yet#

This video shows all the functionalities of this app
[https://youtu.be/I_EBPUkDvZY?si=O54whNfM71bAzB9Y](https://youtu.be/I_EBPUkDvZY?si=O54whNfM71bAzB9Y)

## How can I test this app?

1. Create a MongoDB Realm project
2. Make sure you have permissions in your MongoDB Realm app to implement this application (make sure accept the URL you will use, in this case, http://localhost:3000, and also it has to accept your IP), I'm not going to explain how to do it, but you can refer to the application documentation for more information.
3. Get a copy of the repo (clone or download)
4. Run `npm install` to install all the dependencies
5. In `src/utils.tsx` file, change the value of `REALM_APP_ID` with the `REALM_APP_ID` of your app.
6. Make sure the name of your cluster when you use mongoClient is correct, in my case (and I didn't change it), is "mongodb-atlas". As an example of its implementation, you can check `src/AppComponent.tsx`, line 27. You can check the MongoDB Realm documentation for more information.
7. If all your service implementation is correct, run NextJS frontend using `npm run dev` and finally go to the link.

## Disclaimer

At the moment you are reading this, the backend I used is deleted.
