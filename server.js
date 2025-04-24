const signalR = require("@microsoft/signalr");

async function hackSignalR() {
  try {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://chatapi-jm0g.onrender.com/chat", {
        accessTokenFactory: () =>
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2Q2MTFmN2YxNWNiNTgyYzM0NWM0MmIiLCJlbWFpbCI6InNoaXZhbXNzMTcuOThAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJzaGl2YW0tc3NpbmdoIiwiYXVkIjoiY2hhdGFwcGxpY2F0aW9uIiwiaXNzIjoiY2hhdGFwcERCUyIsImV4cCI6MTc0NDgxMzM3NSwiaWF0IjoxNzQ0ODA5Nzc1LCJuYmYiOjE3NDQ4MDk3NzV9.QVIVFtlDDoeNv1-2v-aA8KhYChtg4HflAlFgjCTbq-M"
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Listen for incoming messages
    await connection.on("ReceiveEncryptedMessage", (user, message) => {
      console.log("Received from:", user);
      console.log("Received message:", message);
    });

    await connection.on('NewJoinee', (publicKeyDetail) => {
      console.log(publicKeyDetail)
    });

    await connection.on('ReceiveMessage', (user, message) => {
      console.log("Received from:", user);
      console.log("Received message:", message);
    });


    await connection.start();
    console.log("Connected to SignalR server");

   await connection.invoke("JoinSpecificChatRoom", {
     userName: "shivam-ssingh",
     chatRoom: "epl",
      publicKey:
        "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqBVAC35Yj5JDzrgS2fMDZ79u8XT21yCpf/mTvKciKBEgg4hGUrQmsAs35IvOoRq8v0Ks5B6q+/x0st+zdRSBCMq7w4jcCmiGUFd1kiMIBKC9TR+VqjXbswHbNB3uoROev1JF0fmgTpqz/4gqlS6lBT++WHK8Z77RriRLRlYcR9AW2Q6YwNAgD8bMO1opDOEsQKA+HGGY8yWn41Z+RNfjUSWrMC1vbiTXKEkD0LO5ZNyU9SU8fcSjd700Uq8ksMys2easxbOODD5vlMfU1Cac/m7UrIwJvzPjuG4NvtrELTC5O+ZFUoWlj4uRxVcc8XRz9B7HAdxnJOYhMLIJ8hG1sQIDAQAB-----END PUBLIC KEY-----"
   });

    console.log("Joined chat room: epl");

    // await connection.invoke("SendMessage", {
    //   userName: "hacker",
    //   chatRoom: "epl"
    // }, "I am legit");

 //   console.log("Message sent!");

  } catch (err) {
    console.error("Error:", err);
  }
}

hackSignalR();
