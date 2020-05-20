---
id: gatsby
title: Integrating Firebase with Gatsby
sidebar_label: Gatsby
---

# Getting Started

- Install [gatsby-plugin-firebase](https://www.gatsbyjs.org/packages/gatsby-plugin-firebase/)
- Register Gatsby plugin:

    ```jsx
    // gatsby-config.js

    module.exports = {
      plugins: [
        ...otherPlugins,

        {
          resolve: "gatsby-plugin-firebase",
          options: {
            credentials: {
              apiKey: "<YOUR_FIREBASE_API_KEY>",
              authDomain: "<YOUR_FIREBASE_AUTH_DOMAIN>",
              databaseURL: "<YOUR_FIREBASE_DATABASE_URL>",
              projectId: "<YOUR_FIREBASE_PROJECT_ID>",
              storageBucket: "<YOUR_FIREBASE_STORAGE_BUCKET>",
              messagingSenderId: "<YOUR_FIREBASE_MESSAGING_SENDER_ID>",
              appId: "<YOUR_FIREBASE_APP_ID>"
            }
          }
        }
      ],
    }
    ```

- Import Firebase feature packages:

    ```jsx
    // gatsby-browser.js and gatsby-ssr.js

    import "firebase/auth"
    import "firebase/firestore"
    import "firebase/functions"
    ```

    Please check the official [firebase](https://www.npmjs.com/package/firebase) package or [Firebase Documentation](https://firebase.google.com/docs/reference/js) for all available options.

- Use Firebase somewhere in your Gatsby app:

    ```jsx
    import React from "react"
    import firebase from "gatsby-plugin-firebase"

    function Component() {
      const [data, setData] = React.useState(null)

      React.useEffect(() => {
        firebase
          .database()
          .ref("/data")
          .once("value")
          .then(snapshot => {
            setData(snapshot.val())
          })
      }, [])

      return <div>{data ? data : "Loading..."}</div>
    }

    export default Component
    ```

    You can also use this package together with [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks):

    ```jsx
    import React from "react"
    import firebase from "gatsby-plugin-firebase"
    import { useObjectVal } from "react-firebase-hooks/database"

    function Component() {
      const [data, setData] = React.useState(null)
      const [data, isLoading] = useObjectVal(firebase.database().ref("data"))

      return <div>{isLoading ? "Loading..." : data}</div>
    }

    export default Component
    ```