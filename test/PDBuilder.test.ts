import PDBuilder, { ProblemDetails } from "../src";

test("Should create object from details", () => {
  const detail = "This is an example detail";
  const pd = PDBuilder.fromDetail(detail).build();
  expect(pd).toBeDefined();
  expect(pd).toBeInstanceOf(ProblemDetails);
  expect(pd.detail).toBe(detail);
});

test("Should create object from Error", () => {
  const err = new Error("This is an example error");
  const pd = PDBuilder.fromError(err).build();
  expect(pd).toBeDefined();
  expect(pd).toBeInstanceOf(ProblemDetails);
  expect(pd.detail).toBe(err.message);
});

test("Should create object from Details and print in json", () => {
  const detail = "This is an example detail";
  const pd = PDBuilder.fromDetail(detail).build();
  expect(pd).toBeDefined();
  expect(pd).toBeInstanceOf(ProblemDetails);
  expect(pd.detail).toBe(detail);
  expect(pd.toJson()).toBeDefined();
});
