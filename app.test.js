const request = require("supertest");
const app = require("./app");

describe("Testing the note taking api", () => {
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
      .get("/notes/1")
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
