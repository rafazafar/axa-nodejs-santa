import request from "supertest";
import app from "../../src/app";

describe("Visit /", () => {
  it("should show a userid input", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("<input");
    expect(res.text).toContain('name="userid"');
  });

  it("should show a wish message textarea", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("<textarea");
    expect(res.text).toContain('name="wish"');
  });

  it("should show a submit button", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("<button");
    expect(res.text).toContain('type="submit"');
  });
});

describe("Sending a wish", () => {
  it("should fail if userid is unregistered", async () => {
    const res = await request(app).post("/santa/wish").send({
      userid: "unregistered",
      wish: "I wish I could be a registered user",
    });
    expect(res.statusCode).toBe(302);
    expect(res.header.location).toContain("/error?msg=Invalid%20username");
  });

  it("should fail if user's age is under 10", async () => {
    const res = await request(app).post("/santa/wish").send({
      userid: "james.bond",
      wish: "I wish i was younger",
    });
    expect(res.statusCode).toBe(302);
    expect(res.header.location).toContain(
      "/error?msg=Sorry,%20you%20are%20over%2010%20years%20old."
    );
  });
});
