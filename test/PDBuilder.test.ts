import PDBuilder, { ProblemDetails } from "../src";

test("Should create object from details", () => {
  const detail = "This is an example detail";
  const pd = PDBuilder.fromDetail(detail).build();
  expect(pd).toBeDefined();
  expect(pd).toBeInstanceOf(ProblemDetails);
  expect(pd.detail).toBe(detail);
});
