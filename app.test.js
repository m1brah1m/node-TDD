const request = require("supertest");
const { response } = require("./app");
const app = require("./app");

describe("Test POST", () => {
  test("POST /notes ➡ create a note", () => {
    return request(app)
      .post("/notes")
      .send({ note_title: "Sample title", note_body: "Note!" })
      .expect(201)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Note Added",
          })
        );
      });
  });
  test("POST /notes ➡ failed to create a note", () => {
    return request(app)
      .post("/notes")
      .expect(400)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Error",
          })
        );
      });
  });
});

describe("Test GET", () => {
  test("GET /notes ➡ get an array of notes", () => {
    return request(app)
      .get("/notes")
      .expect(200)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              note_title: expect.any(String),
              note_body: expect.any(String),
            }),
          ])
        );
      });
  });

  //   test("GET /notes ➡ no notes found", () => {
  //     return request(app)
  //       .get("/notes")
  //       .expect(404)
  //       .expect("Content-type", /json/)
  //       .then((response) => {
  //         expect(response.body).toEqual(
  //           expect.objectContaining({ message: "Not Found" })
  //         );
  //       });
  //   });
  test("GET /notes/:id ➡ get a specific note", () => {
    return request(app)
      .get("/notes/10")
      .expect(200)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            note_title: expect.any(String),
            note_body: expect.any(String),
          })
        );
      });
  });
  test("GET /notes/:id ➡ note not found", () => {
    return request(app)
      .get("/notes/100")
      .expect(404)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Not Found",
          })
        );
      });
  });
});

describe("TEST PUT", () => {
  test("PUT /notes/:id ➡ update a specific note [ALL]", () => {
    return request(app)
      .put("/notes/1")
      .send({ note_title: "Note 10000", note_body: "Note 10000" })
      .expect(200)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Note Updated",
          })
        );
      });
  });
  test("PUT /notes/:id ➡ update a specific note [note title only]", () => {
    return request(app)
      .put("/notes/2")
      .send({ note_title: "Note 10000" })
      .expect(200)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Note Updated",
          })
        );
      });
  });
  test("PUT /notes/:id ➡ update a specific note [note body only]", () => {
    return request(app)
      .put("/notes/3")
      .send({ note_body: "Note 10000" })
      .expect(200)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Note Updated",
          })
        );
      });
  });
  test("PUT /notes/:id ➡ update a specific note", () => {
    return request(app)
      .put("/notes/4")
      .expect(200)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Nothing Changed",
          })
        );
      });
  });
  test("PUT /notes/:id ➡ note not found", () => {
    return request(app)
      .put("/notes/100")
      .send({ note_title: "Note 1", note_body: "Body" })
      .expect(404)
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Not Found",
          })
        );
      });
  });
});

describe("TEST DELETE", () => {
  test("DELETE /notes/:id ➡ delete a specific note", () => {
    return request(app)
      .delete("/notes/6")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Note Deleted",
          })
        );
      });
  });
  test("DELETE /notes/:id ➡ note not found", () => {
    return request(app)
      .delete("/notes/5")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Not Found",
          })
        );
      });
  });
});
