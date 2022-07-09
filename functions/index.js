const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
admin.initializeApp();
const firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const app = express();

app.use(cors({ origin: true }));

app.post("/", async (req, res) => {
  const todo = req.body;
  await admin.firestore().collection("todos").add(todo);
  res.status(201).send();
});

app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("todos").get();
  let todos = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    todos.push({ id, ...data });
  });
  res.status(200).send(JSON.stringify(todos));
});

app.get("/:id", async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("todos")
    .doc(req.params.id)
    .get();
  const todoId = snapshot.id;
  const todoData = snapshot.data();
  res.status(200).send(JSON.stringify({ id: todoId, ...todoData }));
});

app.put("/:id", async (req, res) => {
  const body = req.body;
  await admin.firestore().collection("todos").doc(req.params.id).update(body);
  res.status(200).send();
});

app.delete("/:id", async (req, res) => {
  await admin.firestore().collection("todos").doc(req.params.id).delete();

  res.status(200).send();
});

exports.todo = functions.https.onRequest(app);