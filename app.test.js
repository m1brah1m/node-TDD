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
});
