const signalR = require("@microsoft/signalr");

async function hackSignalR() {
  try {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://chatapi-jm0g.onrender.com/chat", {
        accessTokenFactory: () =>
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2ZkMGQ5MDJhMjk3MDkxNThiZTZiNDMiLCJlbWFpbCI6ImRoaXJhamt1c2xla2FyNDVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJkaGlyYWowNTAyIiwiYXVkIjoiY2hhdGFwcGxpY2F0aW9uIiwiaXNzIjoiY2hhdGFwcERCUyIsImV4cCI6MTc0NDc0MDI1NywiaWF0IjoxNzQ0NzM2NjU3LCJuYmYiOjE3NDQ3MzY2NTd9.c3Ik19J4d7eBDUN-TqQHSuFaESqubnO4gMRu_YXH7Nk"
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Listen for incoming messages
    connection.on("ReceiveMessage", (msg) => {
      console.log("Received:", msg);
    });

    await connection.start();
    console.log("Connected to SignalR server");

    await connection.invoke("JoinSpecificChatRoom", {
      userName: "dhiraj0502",
      chatRoom: "epl",
      publicKey:
        "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqBVAC35Yj5JDzrgS2fMDZ79u8XT21yCpf/mTvKciKBEgg4hGUrQmsAs35IvOoRq8v0Ks5B6q+/x0st+zdRSBCMq7w4jcCmiGUFd1kiMIBKC9TR+VqjXbswHbNB3uoROev1JF0fmgTpqz/4gqlS6lBT++WHK8Z77RriRLRlYcR9AW2Q6YwNAgD8bMO1opDOEsQKA+HGGY8yWn41Z+RNfjUSWrMC1vbiTXKEkD0LO5ZNyU9SU8fcSjd700Uq8ksMys2easxbOODD5vlMfU1Cac/m7UrIwJvzPjuG4NvtrELTC5O+ZFUoWlj4uRxVcc8XRz9B7HAdxnJOYhMLIJ8hG1sQIDAQAB-----END PUBLIC KEY-----"
    });

    console.log("Joined chat room: epl");

    await connection.invoke("SendMessage", {
      userName: "dhiraj0502",
      chatRoom: "epl"
    }, "Hello World from Node client");

    console.log("Message sent!");

  } catch (err) {
    console.error("Error:", err);
  }
}

hackSignalR();
